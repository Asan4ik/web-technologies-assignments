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
const contactPassword = document.getElementById('passwordInput');
const contactDestination = document.getElementById('destinationSelect');
const contactMessage = document.getElementById('messageTextarea');
const contactStatus = document.getElementById('contact-status');

const bgColorChangeBtn = document.getElementById('bg-color-change-btn');
const travelTipsList = document.getElementById('travel-tips-list');
const themeButtons = document.querySelectorAll('.theme-toggle');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

const transportItems = document.querySelectorAll('.transport-item');
const transportButtons = document.querySelectorAll('[data-filter]');
const toggleTransportButton = document.getElementById('toggle-transport-details');

const destinationList = document.getElementById('destination-list');
const destinationCount = document.getElementById('destination-count');
const destinationFilters = document.querySelectorAll('.destination-filter');
const destinationItems = document.querySelectorAll('.destination-item');
const destinationToggleButtons = document.querySelectorAll('.destination-toggle');


/* =========================================================
   2. SHARED DATA & HELPERS
   ========================================================= */

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF5'];
let currentColorIndex = 0;

const transportData = [
  { name: 'Train', category: 'train', description: 'Comfortable railway travel' },
  { name: 'Air', category: 'air', description: 'Fast travel over long distances' },
  { name: 'Bus', category: 'bus', description: 'Affordable intercity travel' },
  { name: 'Car', category: 'car', description: 'Flexible travel at your own pace' }
];

function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

function updateClock() {
  const clocks = document.querySelectorAll('.clock');
  clocks.forEach((clock) => {
    clock.textContent = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  });
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
  if (!contactName || !contactEmail || !contactPassword || !contactMessage || !contactDestination) {
    alert('The contact form is missing a required field.');
    return false;
  }

  const passwordValue = contactPassword.value;
  const isValidLength = passwordValue.length >= 8 && passwordValue.length <= 32;
  const hasUppercase = /[A-Z]/.test(passwordValue);
  const hasNumber = /[0-9]/.test(passwordValue);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue);

  if (contactName.value.trim() === '') {
    alert('Please enter your name.');
    return false;
  }

  if (!isValidEmail(contactEmail.value.trim())) {
    alert('Please enter a valid email address.');
    return false;
  }

  if (!isValidLength || !hasUppercase || !hasNumber || !hasSpecial) {
    alert('Weak password. Use 8–32 characters, including an uppercase letter, a number, and a special character.');
    return false;
  }

  if (contactMessage.value.trim() === '') {
    alert('Please enter your contact message.');
    return false;
  }

  if (contactDestination.value === '') {
    alert('Please choose your destination.');
    return false;
  }

  callback();
  return true;
}


/* =========================================================
   5. BACKGROUND COLOUR CHANGER
   ========================================================= */

if (bgColorChangeBtn) {
  bgColorChangeBtn.addEventListener('click', () => {
    const targetSection = bgColorChangeBtn.closest('div');
    if (!targetSection) return;

    targetSection.style.background = colors[currentColorIndex];
    currentColorIndex = (currentColorIndex + 1) % colors.length;
  });
}


/* =========================================================
   6. TRAVEL TIPS ACCORDION
   ========================================================= */

if (travelTipsList) {
  travelTipsList.addEventListener('click', (event) => {
    const card = event.target.closest('.tip-card');
    if (!card || !travelTipsList.contains(card)) return;

    card.classList.toggle('open');
    const content = card.querySelector('.tip-content');
    if (content) {
      content.classList.toggle('d-none');
    }
  });
}


/* =========================================================
   7. LIVE CLOCK
   ========================================================= */

updateClock();
setInterval(updateClock, 1000);


/* =========================================================
   8. DAY / NIGHT THEME
   ========================================================= */

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
}

function updateThemeButtons() {
  const isDark = document.body.classList.contains('dark-theme');
  themeButtons.forEach((button) => {
    button.textContent = isDark ? 'Day Mode' : 'Night Mode';
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
   9. KEYBOARD NAVIGATION
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
   10. TRANSPORT SYSTEM
   ========================================================= */

function updateTransportCount(category) {
  const filteredTransport = category === 'all'
    ? transportData
    : transportData.filter((t) => t.category === category);

  const transportNames = filteredTransport.map((t) => t.name);
  const countElement = document.getElementById('transport-count');

  if (countElement) {
    countElement.textContent =
      `Showing ${filteredTransport.length} of ${transportData.length} transport options: ` +
      transportNames.join(', ');
  }
}

function playTransportFilterSound() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  const audioContext = new AudioContextClass();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.value = 660;

  gainNode.gain.setValueAtTime(0.12, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.15);

  oscillator.onended = () => {
    audioContext.close();
  };
}

function filterTransportCards(category) {
  let selectedTransport;

  switch (category) {
    case 'all':
      selectedTransport = Array.from(transportItems);
      break;
    case 'train':
    case 'air':
    case 'bus':
    case 'car':
      selectedTransport = Array.from(transportItems).filter(
        (item) => item.dataset.transport === category
      );
      break;
    default:
      return;
  }

  transportItems.forEach((item) => {
    const shouldShow = selectedTransport.includes(item);
    item.style.display = shouldShow ? '' : 'none';

    if (shouldShow) {
      item.classList.remove('card-enter');
      void item.offsetWidth;
      item.classList.add('card-enter');
    }
  });

  transportButtons.forEach((button) => {
    button.classList.remove('active');
  });

  const activeButton = Array.from(transportButtons).find(
    (button) => button.dataset.filter === category
  );

  if (activeButton) {
    activeButton.classList.add('active');
  }
}

if (transportItems.length > 0) {
  updateTransportCount('all');
}

transportButtons.forEach((button) => {
  button.addEventListener('click', function () {
    const category = this.dataset.filter;
    updateTransportCount(category);
    filterTransportCards(category);
    playTransportFilterSound();
  });
});

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
   11. DESTINATIONS
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
   12. JQUERY ASSIGNMENT TASKS (Parts 1, 2 & 3)
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

      const isValid = processContactForm(function () {});
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