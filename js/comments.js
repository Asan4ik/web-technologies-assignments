/* =========================================================
   KAZTOUR COMMUNITY COMMENTS (LocalStorage demo)
   ========================================================= */
(() => {
  const USERS_KEY = 'kaztourUsers';
  const SESSION_KEY = 'kaztourSession';
  const COMMENTS_KEY = 'kaztourComments';

  const form = document.getElementById('commentForm');
  const loginPrompt = document.getElementById('commentLoginPrompt');
  const textInput = document.getElementById('commentText');
  const list = document.getElementById('commentsList');
  const count = document.getElementById('commentCount');
  const charCount = document.getElementById('commentCharCount');
  const status = document.getElementById('commentStatus');

  if (!form || !list) return;

  function readJSON(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return Array.isArray(value) ? value : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function getCurrentUser() {
    const email = localStorage.getItem(SESSION_KEY);
    return readJSON(USERS_KEY, []).find((user) => user.email === email) || null;
  }

  function getComments() {
    return readJSON(COMMENTS_KEY, []);
  }

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Date unavailable';
    return date.toLocaleString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }

  function renderComments() {
    const comments = getComments().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    count.textContent = `${comments.length} ${comments.length === 1 ? 'comment' : 'comments'}`;
    list.replaceChildren();

    if (comments.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'text-secondary';
      empty.textContent = 'No comments yet. Be the first to share your travel experience!';
      list.appendChild(empty);
      return;
    }

    comments.forEach((comment) => {
      const card = document.createElement('article');
      card.className = 'comment-card card border-0 shadow-sm rounded-4';
      const body = document.createElement('div');
      body.className = 'card-body p-4';
      const header = document.createElement('div');
      header.className = 'd-flex justify-content-between align-items-start flex-wrap gap-2 mb-2';
      const author = document.createElement('strong');
      author.className = 'comment-author';
      author.textContent = comment.authorName || 'KazTour traveler';
      const date = document.createElement('time');
      date.className = 'small text-secondary';
      date.dateTime = comment.createdAt || '';
      date.textContent = formatDate(comment.createdAt);
      const message = document.createElement('p');
      message.className = 'mb-0 comment-message';
      // Never interpret visitor-submitted text as HTML.
      message.textContent = comment.text || '';
      header.append(author, date);
      body.append(header, message);
      card.appendChild(body);
      list.appendChild(card);
    });
  }

  function updateAccess() {
    const user = getCurrentUser();
    form.classList.toggle('d-none', !user);
    loginPrompt.classList.toggle('d-none', Boolean(user));
  }

  textInput.addEventListener('input', () => {
    charCount.textContent = String(textInput.value.length);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = getCurrentUser();
    if (!user) {
      updateAccess();
      return;
    }

    const text = textInput.value.trim();
    if (!text) {
      status.className = 'small mt-2 text-danger';
      status.textContent = 'Please write a comment before posting.';
      return;
    }
    if (text.length > 500) return;

    const comments = getComments();
    comments.push({
      id: (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      authorName: user.name,
      authorEmail: user.email,
      text,
      createdAt: new Date().toISOString()
    });

    try {
      localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
      textInput.value = '';
      charCount.textContent = '0';
      status.className = 'small mt-2 text-success';
      status.textContent = 'Your comment has been published on this browser.';
      renderComments();
    } catch (error) {
      status.className = 'small mt-2 text-danger';
      status.textContent = 'Could not save the comment. Browser storage may be full or unavailable.';
    }
  });

  window.addEventListener('storage', (event) => {
    if ([COMMENTS_KEY, USERS_KEY, SESSION_KEY].includes(event.key)) {
      updateAccess();
      renderComments();
    }
  });

  updateAccess();
  renderComments();
})();
