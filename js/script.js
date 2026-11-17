/* =========================================================
   1. DOM ELEMENTS
   ========================================================= */

const overlay = document.getElementById('popupOverlay');
const openSubscribeBtn = document.getElementById('subscribeButton');
const closeSubscribeBtn = document.querySelector('.close-btn');
const subscribeForm = document.getElementById('subscribeForm');

const contactForm = document.getElementById('contactForm');
const contactName = document.getElementById('nameInput');
const contactEmail = document.getElementById('emailInput');
const contactPhone = document.getElementById('phoneInput');
const contactDestination = document.getElementById('destinationSelect');
const contactMessage = document.getElementById('messageTextarea');
const contactStatus = document.getElementById('contact-status');

const travelTipsList = document.getElementById('travel-tips-list');
const themeButtons = document.querySelectorAll('.theme-toggle');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

const transportItems = document.querySelectorAll('.transport-item');
const toggleTransportButton = document.getElementById('toggle-transport-details');

const destinationList = document.getElementById('destination-list');
const destinationCount = document.getElementById('destination-count');
const destinationFilters = document.querySelectorAll('.destination-filter');
const destinationItems = document.querySelectorAll('.destination-item');
const destinationToggleButtons = document.querySelectorAll('.destination-toggle');

const loginForm = document.getElementById('loginForm');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginStatus = document.getElementById('loginStatus');
const signupForm = document.getElementById('signupForm');
const signupName = document.getElementById('signupName');
const signupEmail = document.getElementById('signupEmail');
const signupPhone = document.getElementById('signupPhone');
const signupPassword = document.getElementById('signupPassword');
const signupConfirm = document.getElementById('signupConfirm');
const profileCard = document.getElementById('profileCard');
const logoutButton = document.getElementById('logoutButton');
const authNavLink = document.querySelector('.auth-nav-link');


/* =========================================================
   2. SHARED HELPERS
   ========================================================= */

function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Custom Toast Notification System (Task 7)
function showToast(message, type = 'success') {
  let $container = $('#toastContainer');
  if ($container.length === 0) {
    $container = $('<div id="toastContainer"></div>').appendTo('body');
  }

  const bgClass = type === 'success' ? 'bg-success' : 'bg-primary';
  const $toast = $(`
    <div class="toast align-items-center text-white ${bgClass} border-0 mb-2 show" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `);

  $container.append($toast);

  setTimeout(function () {
    $toast.fadeOut(400, function () {
      $(this).remove();
    });
  }, 3000);
}


/* =========================================================
   3. SUBSCRIPTION POPUP
   ========================================================= */

if (openSubscribeBtn && overlay) {
  openSubscribeBtn.addEventListener('click', () => {
    overlay.style.display = 'flex';
  });
}

if (closeSubscribeBtn && overlay) {
  closeSubscribeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
  });
}

if (overlay) {
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      overlay.style.display = 'none';
    }
  });
}

if (subscribeForm && overlay) {
  subscribeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    showToast('Thank you for subscribing!', 'success');
    overlay.style.display = 'none';
  });
}


/* =========================================================
   4. CONTACT FORM & SUBMIT SPINNER (Task 6)
   ========================================================= */

function showContactSuccess() {
  if (contactStatus) {
    contactStatus.textContent = 'Successfully submitted! Thank you for contacting us.';
    contactStatus.className = 'mt-3 alert alert-success';
  }
  contactForm.reset();
}

function processContactForm(callback) {
  if (!contactName || !contactEmail || !contactPhone || !contactMessage || !contactDestination) {
    return false;
  }

  const fieldsValid = [
    setFieldError(contactName, getNameError(contactName.value.trim())),
    setFieldError(contactEmail, getEmailError(contactEmail.value.trim())),
    setFieldError(contactPhone, getPhoneError(contactPhone.value.trim())),
    setFieldError(contactDestination, contactDestination.value === '' ? 'Choose a destination.' : ''),
    setFieldError(contactMessage, contactMessage.value.trim() === '' ? 'Enter your message.' : '')
  ].every(Boolean);

  if (!fieldsValid) return false;

  callback();
  return true;
}

if (contactForm) {
  contactForm.addEventListener('input', (event) => {
    event.target.classList.remove('is-invalid');
  });
}


/* =========================================================
   5. TRAVEL TIPS ACCORDION
   ========================================================= */


if (travelTipsList) {
  travelTipsList.addEventListener('click', (event) => {
    const header = event.target.closest('.tip-header');
    if (!header) return;

    const card = header.closest('.tip-card');
    if (!card || !travelTipsList.contains(card)) return;

    const isOpen = card.classList.toggle('open');

    const content = card.querySelector('.tip-content');

    if (content) {
      content.classList.toggle('d-none', !isOpen);
    }

    header.setAttribute('aria-expanded', String(isOpen));
  });
}



/* =========================================================
   6. DAY / NIGHT THEME
   ========================================================= */

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
}

function updateThemeButtons() {
  const isDark = document.body.classList.contains('dark-theme');
  themeButtons.forEach((button) => {
    const label = isDark ? 'Switch to day mode' : 'Switch to night mode';
    button.setAttribute('aria-label', label);
    button.title = label;
    button.setAttribute('aria-pressed', String(isDark));
  });
}

updateThemeButtons();

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeButtons();
  });
});


/* =========================================================
   7. KEYBOARD NAVIGATION
   ========================================================= */

navLinks.forEach((link, index) => {
  link.addEventListener('keydown', (event) => {
    let nextIndex;

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % navLinks.length;
        break;
      case 'ArrowLeft':
        nextIndex = (index - 1 + navLinks.length) % navLinks.length;
        break;
      default:
        return;
    }

    event.preventDefault();
    navLinks[nextIndex].focus();
  });
});


/* =========================================================
   8. TRANSPORT DETAILS TOGGLE
   ========================================================= */

if (toggleTransportButton) {
  toggleTransportButton.addEventListener('click', () => {
    const isExpanded = toggleTransportButton.getAttribute('aria-expanded') === 'true';

    transportItems.forEach((card) => {
      const description = card.querySelector('.card-text');
      if (description) {
        description.hidden = isExpanded;
      }
    });

    toggleTransportButton.setAttribute('aria-expanded', String(!isExpanded));
    toggleTransportButton.textContent = isExpanded
      ? 'Show transport details'
      : 'Hide transport details';
  });
}


/* =========================================================
   9. DESTINATIONS
   ========================================================= */

function updateDestinationCount(category) {
  const filteredDestinations = category === 'all'
    ? Array.from(destinationItems)
    : Array.from(destinationItems).filter(
      (item) => item.dataset.category === category
    );

  if (destinationCount) {
    destinationCount.textContent = `Showing ${filteredDestinations.length} of ${destinationItems.length} destinations`;
  }
}

function filterDestinations(category) {
  destinationItems.forEach((item) => {
    const shouldShow = category === 'all' || item.dataset.category === category;
    item.classList.toggle('d-none', !shouldShow);

    if (shouldShow) {
      item.classList.remove('destination-card-enter');
      void item.offsetWidth;
      item.classList.add('destination-card-enter');
    }
  });

  destinationFilters.forEach((button) => {
    const isActive = button.dataset.destinationFilter === category;
    button.classList.toggle('active', isActive);
    button.classList.toggle('btn-success', isActive);
    button.classList.toggle('btn-outline-success', !isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  updateDestinationCount(category);
}

destinationFilters.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.destinationFilter;
    filterDestinations(category);
  });
});

destinationToggleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const cardBody = button.closest('.card-body');
    if (!cardBody) return;

    const extraInfo = cardBody.querySelector('.destination-extra');
    if (!extraInfo) return;

    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    extraInfo.classList.toggle('d-none', isExpanded);
    button.setAttribute('aria-expanded', String(!isExpanded));
    button.textContent = isExpanded ? 'Read more' : 'Show less';
  });
});

if (destinationList) {
  filterDestinations('all');
}


/* =========================================================
   10. AUTHENTICATION (localStorage simulation)
   ========================================================= */

// Demo only: there is no backend, so passwords sit in localStorage as plain text.
const USERS_KEY = 'kaztourUsers';
const SESSION_KEY = 'kaztourSession';

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function getCurrentUser() {
  const email = localStorage.getItem(SESSION_KEY);
  return getUsers().find((user) => user.email === email) || null;
}

// Each validator returns an error message, or an empty string when the value is fine.
function getNameError(name) {
  if (name === '') return 'Enter your name.';
  if (name.length < 2) return 'Your name must be at least 2 characters long.';
  return '';
}

function getEmailError(email) {
  if (email === '') return 'Enter your email address.';
  if (!isValidEmail(email)) return 'Enter a valid email address, such as name@example.com.';
  return '';
}

function getPhoneError(phone) {
  if (phone === '') return 'Enter your phone number.';
  const hasOnlyPhoneCharacters = /^\+?[\d\s\-()]+$/.test(phone);
  const digits = phone.replace(/\D/g, '');
  // Kazakhstan numbers have 11 digits and start with 7 (or 8 when written locally).
  if (!hasOnlyPhoneCharacters || !/^[78]\d{10}$/.test(digits)) {
    return 'Enter a Kazakhstan phone number, for example +7 701 123 45 67.';
  }
  return '';
}

function getPasswordError(password) {
  if (password === '') return 'Enter a password.';
  if (password.length < 8 || password.length > 32) return 'The password must be 8 to 32 characters long.';
  if (!/[A-Z]/.test(password)) return 'Add at least one uppercase letter.';
  if (!/[0-9]/.test(password)) return 'Add at least one number.';
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Add at least one special character, such as ! or @.';
  return '';
}

// Shows or clears the message under a field and reports whether the field is valid.
function setFieldError(input, message) {
  const feedback = input.parentElement.querySelector('.invalid-feedback');
  input.classList.toggle('is-invalid', message !== '');
  feedback.textContent = message;
  return message === '';
}

function showStatus(element, message, type) {
  element.className = `alert alert-${type}`;
  element.textContent = message;
}

function hideStatus(element) {
  element.className = 'alert d-none';
  element.textContent = '';
}

if (loginForm && signupForm) {
  if (getCurrentUser()) {
    window.location.replace('profile.html');
  }

  [loginForm, signupForm].forEach((form) => {
    form.addEventListener('input', (event) => {
      event.target.classList.remove('is-invalid');
    });
  });

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    hideStatus(loginStatus);

    const email = loginEmail.value.trim().toLowerCase();
    const password = loginPassword.value;

    const fieldsValid = [
      setFieldError(loginEmail, getEmailError(email)),
      setFieldError(loginPassword, password === '' ? 'Enter your password.' : '')
    ].every(Boolean);

    if (!fieldsValid) return;

    const user = getUsers().find((item) => item.email === email && item.password === password);
    if (!user) {
      showStatus(loginStatus, 'Incorrect email or password.', 'danger');
      return;
    }

    localStorage.setItem(SESSION_KEY, user.email);
    window.location.href = 'profile.html';
  });

  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = signupName.value.trim();
    const email = signupEmail.value.trim().toLowerCase();
    const phone = signupPhone.value.trim();
    const password = signupPassword.value;
    const confirmation = signupConfirm.value;

    let confirmationError = '';
    if (confirmation === '') {
      confirmationError = 'Repeat your password.';
    } else if (confirmation !== password) {
      confirmationError = 'The passwords do not match.';
    }

    const fieldsValid = [
      setFieldError(signupName, getNameError(name)),
      setFieldError(signupEmail, getEmailError(email)),
      setFieldError(signupPhone, getPhoneError(phone)),
      setFieldError(signupPassword, getPasswordError(password)),
      setFieldError(signupConfirm, confirmationError)
    ].every(Boolean);

    if (!fieldsValid) return;

    const users = getUsers();
    if (users.some((item) => item.email === email)) {
      setFieldError(signupEmail, 'An account with this email already exists.');
      return;
    }

    const newUser = { name, email, phone, password, createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(SESSION_KEY, email);

    // Sign the user in immediately after a successful registration.
    window.location.href = 'profile.html';
  });
}

if (profileCard) {
  const user = getCurrentUser();

  if (!user) {
    window.location.replace('login.html');
  } else {
    const values = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      joined: new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    // textContent keeps anything the user typed from being read as HTML.
    profileCard.querySelectorAll('[data-profile-field]').forEach((element) => {
      element.textContent = values[element.dataset.profileField];
    });
    profileCard.hidden = false;
  }
}

if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = 'index.html';
  });
}

// The navbar button leads to the profile once someone is logged in.
if (authNavLink) {
  const currentUser = getCurrentUser();
  if (currentUser) {
    authNavLink.textContent = currentUser.name;
    authNavLink.href = 'profile.html';
    authNavLink.setAttribute('aria-label', `Open profile for ${currentUser.name}`);
  }
}


/* =========================================================
   11. JQUERY ASSIGNMENT TASKS (Parts 1, 2 & 3)
   ========================================================= */

$(document).ready(function () {
  console.log("jQuery is ready!");

  /* ---------------------------------------------------------
     TASK 1, 2, 3: Search, Suggestions & Highlighting
     --------------------------------------------------------- */
  if ($("#destinationInput").length > 0) {
    $(".destination-item").each(function () {
      const $title = $(this).find(".card-title");
      const $text = $(this).find(".card-text");

      $title.data("original-html", $title.html());
      $text.data("original-html", $text.html());
    });

    if ($("#noDestinationResults").length === 0) {
      $("#destination-list").after('<div id="noDestinationResults" class="text-center text-muted fs-5 my-4" style="display: none;">No matching destinations found.</div>');
    }

    $("#destinationInput").wrap('<div class="position-relative d-inline-block w-100" style="max-width: 300px;"></div>');
    const $suggestionBox = $('<ul id="searchSuggestions" class="dropdown-menu w-100 shadow-sm bg-white border" style="display: none; position: absolute; top: 100%; left: 0; z-index: 1000;"></ul>');
    $("#destinationInput").after($suggestionBox);

    $("#destinationInput").on("input keyup", function () {
      const rawSearchTerm = $(this).val();
      const searchTerm = rawSearchTerm.toLowerCase().trim();
      let visibleCount = 0;
      const suggestions = [];

      $(".destination-item").filter(function () {
        const $card = $(this);
        const $title = $card.find(".card-title");
        const $text = $card.find(".card-text");

        $title.html($title.data("original-html"));
        $text.html($text.data("original-html"));

        const titleText = $title.text().toLowerCase();
        const descriptionText = $text.text().toLowerCase();
        const isMatch = titleText.includes(searchTerm) || descriptionText.includes(searchTerm);

        $card.toggle(isMatch);

        if (isMatch) {
          visibleCount++;
          const originalTitleText = $title.text();
          if (searchTerm.length > 0 && !suggestions.includes(originalTitleText)) {
            suggestions.push(originalTitleText);
          }

          if (searchTerm.length > 0) {
            const regex = new RegExp("(" + escapeRegExp(rawSearchTerm.trim()) + ")", "gi");
            $title.html($title.html().replace(regex, '<mark class="bg-warning px-1 rounded">$1</mark>'));
            $text.html($text.html().replace(regex, '<mark class="bg-warning px-1 rounded">$1</mark>'));
          }
        }

        return isMatch;
      });

      $suggestionBox.empty();
      if (searchTerm.length > 0 && suggestions.length > 0) {
        suggestions.forEach(function (item) {
          $suggestionBox.append(`<li><a class="dropdown-item text-dark suggestion-item" href="#">${item}</a></li>`);
        });
        $suggestionBox.show();
      } else {
        $suggestionBox.hide();
      }

      $("#destination-count").text(`Showing ${visibleCount} destinations`);
      $("#noDestinationResults").toggle(visibleCount === 0);
    });

    $(document).on("click", ".suggestion-item", function (e) {
      e.preventDefault();
      $("#destinationInput").val($(this).text()).trigger("input");
      $suggestionBox.hide();
    });

    $(document).on("click", function (e) {
      if (!$(e.target).closest("#destinationInput, #searchSuggestions").length) {
        $suggestionBox.hide();
      }
    });
  }


  /* ---------------------------------------------------------
     TASK 4: Scroll Progress Bar
     --------------------------------------------------------- */
  if ($("#scrollProgressBarContainer").length === 0) {
    $("body").prepend(`
      <div id="scrollProgressBarContainer">
        <div id="scrollProgressBar"></div>
      </div>
    `);
  }

  $(window).on("scroll", function () {
    const scrollTop = $(window).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    $("#scrollProgressBar").css("width", scrollPercent + "%");
  });


  /* ---------------------------------------------------------
     TASK 5: Animated Number Counter
     --------------------------------------------------------- */
  let counterAnimated = false;

  function runCounters() {
    $(".stat-counter").each(function () {
      const $this = $(this);
      const target = parseInt($this.attr("data-target"), 10);

      $({ countNum: 0 }).animate({ countNum: target }, {
        duration: 2000,
        easing: "swing",
        step: function () {
          $this.text(Math.floor(this.countNum));
        },
        complete: function () {
          $this.text(this.countNum + "+");
        }
      });
    });
  }

  if ($(".stat-counter").length > 0) {
    $(window).on("scroll", function () {
      const hT = $(".stat-counter").first().offset().top;
      const hH = $(".stat-counter").first().outerHeight();
      const wH = $(window).height();
      const wS = $(this).scrollTop();

      if (wS > (hT + hH - wH) && !counterAnimated) {
        counterAnimated = true;
        runCounters();
      }
    }).trigger("scroll");
  }


  /* ---------------------------------------------------------
     TASK 6: Loading Spinner on Submit
     --------------------------------------------------------- */
  if ($("#contactForm").length > 0) {
    $("#contactForm").off("submit").on("submit", function (e) {
      e.preventDefault();

      const $submitBtn = $("#contactButton");
      const originalText = $submitBtn.text();

      const isValid = processContactForm(function () { });
      if (!isValid) return;

      $submitBtn.prop("disabled", true).html(`
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Please wait...
      `);

      setTimeout(function () {
        $submitBtn.prop("disabled", false).text(originalText);
        showContactSuccess();
        showToast("Form submitted successfully!", "success");
      }, 1500);
    });
  }


  /* ---------------------------------------------------------
     TASK 8: Copied to Clipboard Button
     --------------------------------------------------------- */
  $(".copy-btn").each(function () {
    const $btn = $(this);
    if (!$btn.parent().hasClass("copy-btn-wrapper")) {
      $btn.wrap('<div class="copy-btn-wrapper"></div>');
      $btn.after('<span class="copy-tooltip">Copied!</span>');
    }
  });

  $(document).on("click", ".copy-btn", function () {
    const $btn = $(this);
    const targetSelector = $btn.attr("data-copy-target");
    const textToCopy = targetSelector ? $(targetSelector).text().trim() : $btn.prev().text().trim();

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).then(function () {
        triggerCopyFeedback($btn);
      });
    } else {
      const $temp = $("<textarea>");
      $("body").append($temp);
      $temp.val(textToCopy).select();
      document.execCommand("copy");
      $temp.remove();
      triggerCopyFeedback($btn);
    }
  });

  function triggerCopyFeedback($btn) {
    const $tooltip = $btn.next(".copy-tooltip");
    const originalText = $btn.html();

    $btn.html("✓ Copied");
    $tooltip.stop(true, true).fadeIn(200);

    showToast("Copied to clipboard!", "primary");

    setTimeout(function () {
      $btn.html(originalText);
      $tooltip.fadeOut(300);
    }, 2000);
  }


  /* ---------------------------------------------------------
     TASK 9: Image Lazy Loading
     --------------------------------------------------------- */
  function lazyLoadImages() {
    $("img.lazy-img").each(function () {
      const $img = $(this);
      const dataSrc = $img.attr("data-src");

      if (!dataSrc) return;

      const windowTop = $(window).scrollTop();
      const windowBottom = windowTop + $(window).height();
      const imgTop = $img.offset().top;

      if (imgTop < windowBottom + 100) {
        $img.attr("src", dataSrc).removeAttr("data-src").addClass("loaded");
      }
    });
  }

  if ($("img.lazy-img").length > 0) {
    lazyLoadImages();
    $(window).on("scroll resize", lazyLoadImages);
  }
});

/* =========================================================
   12. COMMUNITY COMMENTS (localStorage demo)
   Reuses USERS_KEY, SESSION_KEY and getCurrentUser() from section 10.
   ========================================================= */

(() => {
  const COMMENTS_KEY = 'kaztourComments';

  const form = document.getElementById('commentForm');
  const loginPrompt = document.getElementById('commentLoginPrompt');
  const textInput = document.getElementById('commentText');
  const list = document.getElementById('commentsList');
  const count = document.getElementById('commentCount');
  const charCount = document.getElementById('commentCharCount');
  const status = document.getElementById('commentStatus');

  if (!form || !list) return;

  function getComments() {
    try {
      const value = JSON.parse(localStorage.getItem(COMMENTS_KEY));
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
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


/* =========================================================
   13. TRIP GUIDE: LIVE WEATHER (Open-Meteo)
   ========================================================= */

(() => {
  const citySelect = document.getElementById('weatherCity');
  const loading = document.getElementById('weatherLoading');
  const errorBox = document.getElementById('weatherError');
  const errorText = document.getElementById('weatherErrorText');
  const content = document.getElementById('weatherContent');
  const retryButton = document.getElementById('weatherRetry');

  if (!citySelect || !loading || !errorBox || !errorText || !content || !retryButton) return;

  // Coordinates are used to request a forecast for each selectable destination.
  const cities = {
    astana: { name: 'Astana', latitude: 51.1694, longitude: 71.4491 },
    almaty: { name: 'Almaty', latitude: 43.2389, longitude: 76.8897 },
    turkistan: { name: 'Turkistan', latitude: 43.2973, longitude: 68.2518 },
    aktau: { name: 'Aktau', latitude: 43.6532, longitude: 51.1975 },
    shymkent: { name: 'Shymkent', latitude: 42.3417, longitude: 69.5901 }
  };
  const REQUEST_TIMEOUT_MS = 10000;

  const weatherCodes = {
    0: ['Clear sky', '☀'],
    1: ['Mainly clear', '🌤'],
    2: ['Partly cloudy', '⛅'],
    3: ['Overcast', '☁'],
    45: ['Fog', '🌫'],
    48: ['Depositing rime fog', '🌫'],
    51: ['Light drizzle', '🌦'],
    53: ['Drizzle', '🌦'],
    55: ['Dense drizzle', '🌧'],
    56: ['Freezing drizzle', '🌧'],
    57: ['Dense freezing drizzle', '🌧'],
    61: ['Light rain', '🌦'],
    63: ['Rain', '🌧'],
    65: ['Heavy rain', '🌧'],
    66: ['Freezing rain', '🌧'],
    67: ['Heavy freezing rain', '🌧'],
    71: ['Light snow', '🌨'],
    73: ['Snow', '🌨'],
    75: ['Heavy snow', '❄'],
    77: ['Snow grains', '❄'],
    80: ['Rain showers', '🌦'],
    81: ['Rain showers', '🌧'],
    82: ['Heavy rain showers', '🌧'],
    85: ['Snow showers', '🌨'],
    86: ['Heavy snow showers', '❄'],
    95: ['Thunderstorm', '⛈'],
    96: ['Thunderstorm with hail', '⛈'],
    99: ['Thunderstorm with heavy hail', '⛈']
  };

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function showLoading() {
    loading.classList.remove('d-none');
    errorBox.classList.add('d-none');
    content.classList.add('d-none');
    retryButton.disabled = true;
  }

  function showError(message) {
    loading.classList.add('d-none');
    content.classList.add('d-none');
    errorText.textContent = message;
    errorBox.classList.remove('d-none');
    retryButton.disabled = false;
  }

  function formatDay(dateString) {
    const date = new Date(`${dateString}T12:00:00`);
    return new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date);
  }

  function renderForecast(data, city) {
    const current = data.current;
    const daily = data.daily;
    const [description, icon] = weatherCodes[current.weather_code] || ['Weather conditions', '🌡'];

    setText('weatherTemperature', `${Math.round(current.temperature_2m)}°C`);
    setText('weatherDescription', description);
    setText('weatherFeelsLike', `Feels like ${Math.round(current.apparent_temperature)}°C`);
    setText('weatherWind', `${Math.round(current.wind_speed_10m)} km/h`);
    setText('weatherRain', `${daily.precipitation_probability_max[0] ?? 0}% chance`);
    setText('weatherRange', `${Math.round(daily.temperature_2m_min[0])}° / ${Math.round(daily.temperature_2m_max[0])}°C`);
    setText('weatherIcon', icon);
    setText('travel-weather-title', `Weather in ${city.name}`);

    const forecast = document.getElementById('weatherForecast');
    forecast.replaceChildren();
    daily.time.slice(0, 3).forEach((date, index) => {
      const [dayDescription, dayIcon] = weatherCodes[daily.weather_code[index]] || ['Weather', '🌡'];
      const col = document.createElement('div');
      col.className = 'col-4';
      const card = document.createElement('div');
      card.className = 'weather-day h-100';
      const day = document.createElement('div');
      day.className = 'small text-secondary';
      day.textContent = formatDay(date);
      const symbol = document.createElement('div');
      symbol.className = 'fs-4 my-1';
      symbol.textContent = dayIcon;
      symbol.setAttribute('aria-label', dayDescription);
      const temperature = document.createElement('strong');
      temperature.className = 'small';
      temperature.textContent = `${Math.round(daily.temperature_2m_min[index])}° / ${Math.round(daily.temperature_2m_max[index])}°`;
      card.append(day, symbol, temperature);
      col.append(card);
      forecast.append(col);
    });
  }

  async function loadWeather() {
    const city = cities[citySelect.value];
    if (!city) return;
    showLoading();

    const params = new URLSearchParams({
      latitude: city.latitude,
      longitude: city.longitude,
      current: 'temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
      forecast_days: '3',
      timezone: 'auto'
    });
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, {
        signal: controller.signal
      });
      if (!response.ok) throw new Error(`Weather service returned ${response.status}`);
      const data = await response.json();
      if (!data.current || !data.daily || !Array.isArray(data.daily.time)) {
        throw new Error('Weather data is incomplete');
      }
      renderForecast(data, city);
      loading.classList.add('d-none');
      errorBox.classList.add('d-none');
      content.classList.remove('d-none');
    } catch (error) {
      console.error('Open-Meteo request failed:', error);
      if (error.name === 'AbortError') {
        showError('The request took too long. Check your connection and try again.');
      } else {
        showError('Weather data is temporarily unavailable. Please try again.');
      }
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  citySelect.addEventListener('change', loadWeather);
  retryButton.addEventListener('click', loadWeather);
  loadWeather();
})();

