


/* ----
   1. VARIABLES — DOM ELEMENTS
   ---- */

// Subscription popup
const overlay = document.getElementById('popupOverlay');
const openSubscribeBtn = document.getElementById('subscribeButton');
const closeSubscribeBtn = document.querySelector('.close-btn');
const subscribeForm = document.getElementById('subscribeForm');

// Contact form
const contactForm = document.getElementById('contactForm');
const contactName = document.getElementById('nameInput');
const contactEmail = document.getElementById('emailInput');
const contactPassword = document.getElementById('passwordInput');
const contactDestination = document.getElementById('destinationSelect');
const contactMessage = document.getElementById('messageTextarea');
const contactStatus = document.getElementById('contact-status');

// Background colour changer
const bgColorChangeBtn = document.getElementById('bg-color-change-btn');

// Travel tips
const travelTipsList = document.getElementById('travel-tips-list');

// Day/Night theme
const themeButtons = document.querySelectorAll('.theme-toggle');

// Keyboard navigation
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

// Transport
const transportItems = document.querySelectorAll('.transport-item');
const transportButtons = document.querySelectorAll('[data-filter]');
const toggleTransportButton = document.getElementById(
    'toggle-transport-details'
);


/* ----
   2. SHARED DATA
   ---- */

// Colours for the background colour changer
const colors = [
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#F333FF',
    '#33FFF5'
];

let currentColorIndex = 0;

// Transport options
const transportData = [
    {
        name: 'Train',
        category: 'train',
        description: 'Comfortable railway travel'
    },
    {
        name: 'Air',
        category: 'air',
        description: 'Fast travel over long distances'
    },
    {
        name: 'Bus',
        category: 'bus',
        description: 'Affordable intercity travel'
    },
    {
        name: 'Car',
        category: 'car',
        description: 'Flexible travel at your own pace'
    }
];


/* ----
   3. SHARED FUNCTIONS
   ---- */

// Validate an email address
function isValidEmail(email) {
    const emailPattern =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailPattern.test(email);
}

// Update the live clock
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


/* ----
   4. SUBSCRIPTION POPUP
   ---- */

// Open the subscription popup
if (openSubscribeBtn && overlay) {
    openSubscribeBtn.addEventListener('click', () => {
        overlay.style.display = 'flex';
    });
}


// Close the popup using the close button
if (closeSubscribeBtn && overlay) {
    closeSubscribeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
    });
}


// Close the popup when clicking outside its content
if (overlay) {
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            overlay.style.display = 'none';
        }
    });
}


// Handle subscription form submission
if (subscribeForm && overlay) {
    subscribeForm.addEventListener('submit', (event) => {
        event.preventDefault();

        alert('Thank you for subscribing!');

        overlay.style.display = 'none';
    });
}

/* ----
   5. CONTACT FORM
   ---- */

// Show success message after successful validation
function showContactSuccess() {
    if (contactStatus) {
        contactStatus.textContent =
            'Successfully submitted! Thank you for contacting us.';

        contactStatus.className = 'mt-3 alert alert-success';
    }

    contactForm.reset();
}


// Validate form fields and call the callback if valid
function processContactForm(callback) {
    // Check that all required elements exist
    if (
        !contactName ||
        !contactEmail ||
        !contactPassword ||
        !contactMessage ||
        !contactDestination
    ) {
        alert('The contact form is missing a required field.');
        return;
    }

    // Password validation rules
    const passwordValue = contactPassword.value;

    const isValidLength =
        passwordValue.length >= 8 &&
        passwordValue.length <= 32;

    const hasUppercase = /[A-Z]/.test(passwordValue);
    const hasNumber = /[0-9]/.test(passwordValue);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue);

    // Validate name
    if (contactName.value.trim() === '') {
        alert('Please enter your name.');
        return;
    }

    // Validate email
    if (!isValidEmail(contactEmail.value.trim())) {
        alert('Please enter a valid email address.');
        return;
    }

    // Validate password
    if (
        !isValidLength ||
        !hasUppercase ||
        !hasNumber ||
        !hasSpecial
    ) {
        alert(
            'Weak password. Use 8–32 characters, including an uppercase letter, a number, and a special character.'
        );
        return;
    }

    // Validate message
    if (contactMessage.value.trim() === '') {
        alert('Please enter your contact message.');
        return;
    }

    // Validate destination
    if (contactDestination.value === '') {
        alert('Please choose your destination.');
        return;
    }

    // All checks passed
    callback();
}


// Attach the submit event listener
if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        processContactForm(showContactSuccess);
    });
}

/* ----
   6. BACKGROUND COLOUR CHANGER
   ---- */

if (bgColorChangeBtn) {
    bgColorChangeBtn.addEventListener('click', () => {
        const targetSection = bgColorChangeBtn.closest('div');

        if (!targetSection) {
            return;
        }

        // Apply the current colour
        targetSection.style.background = colors[currentColorIndex];

        // Move to the next colour
        currentColorIndex = (currentColorIndex + 1) % colors.length;
    });
}


/* ----
   7. TRAVEL TIPS ACCORDION
   ---- */

if (travelTipsList) {
    travelTipsList.addEventListener('click', (event) => {
        // Find the clicked tip card
        const card = event.target.closest('.tip-card');

        if (!card || !travelTipsList.contains(card)) {
            return;
        }

        // Toggle the card state
        card.classList.toggle('open');

        // Show or hide the tip content
        const content = card.querySelector('.tip-content');

        if (content) {
            content.classList.toggle('d-none');
        }
    });
}


/* ----
   8. LIVE CLOCK
   ---- */

// Display the time immediately
updateClock();

// Refresh the time every second
setInterval(updateClock, 1000);


/* ----
   9. DAY/NIGHT THEME
   ---- */

// Restore the saved theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}


// Update the text and accessibility state of all theme buttons
function updateThemeButtons() {
    const isDark = document.body.classList.contains('dark-theme');

    themeButtons.forEach((button) => {
        button.textContent = isDark ? 'Day Mode' : 'Night Mode';
        button.setAttribute('aria-pressed', String(isDark));
    });
}


// Initialize the theme buttons
updateThemeButtons();


// Toggle between Day and Night modes
themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');

        const isDark = document.body.classList.contains('dark-theme');

        // Save the selected theme
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        // Update all theme buttons
        updateThemeButtons();
    });
});

/* ----
   10. KEYBOARD NAVIGATION
   ---- */

// Move between navigation links using arrow keys
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

/* ----
   11. TRANSPORT SYSTEM
   Filter, counter, sound, animation and details toggle
   ---- */


/* ---------------------------------------------------------
   11.1. TRANSPORT COUNTER
   Use filter() and map() to display selected options
   --------------------------------------------------------- */

function updateTransportCount(category) {
    const filteredTransport = category === 'all'
        ? transportData
        : transportData.filter(
            (transport) => transport.category === category
        );

    // Get the names of the selected transport options
    const transportNames = filteredTransport.map(
        (transport) => transport.name
    );

    const countElement = document.getElementById('transport-count');

    if (countElement) {
        countElement.textContent =
            `Showing ${filteredTransport.length} of ${transportData.length} transport options: ` +
            transportNames.join(', ');
    }
}


/* ---------------------------------------------------------
   11.2. TRANSPORT SOUND
   Play a short sound using the Web Audio API
   --------------------------------------------------------- */

function playTransportFilterSound() {
    const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
        return;
    }

    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = 660;

    gainNode.gain.setValueAtTime(
        0.12,
        audioContext.currentTime
    );

    gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.15
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.15);

    oscillator.onended = () => {
        audioContext.close();
    };
}


/* ---------------------------------------------------------
   11.3. FILTER TRANSPORT CARDS
   Show matching cards and animate visible items
   --------------------------------------------------------- */

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

    // Show or hide cards and animate visible ones
    transportItems.forEach((item) => {
        const shouldShow = selectedTransport.includes(item);

        item.style.display = shouldShow ? '' : 'none';

        if (shouldShow) {
            item.classList.remove('card-enter');

            // Restart the animation
            void item.offsetWidth;

            item.classList.add('card-enter');
        }
    });

    // Update the active filter button
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


/* ---------------------------------------------------------
   11.4. INITIALIZE TRANSPORT FILTERS
   --------------------------------------------------------- */

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


/* ---------------------------------------------------------
   11.5. SHOW OR HIDE TRANSPORT DETAILS
   Update aria-expanded for accessibility
   --------------------------------------------------------- */

if (toggleTransportButton) {
    toggleTransportButton.addEventListener('click', () => {
        const isExpanded =
            toggleTransportButton.getAttribute('aria-expanded') === 'true';

        transportItems.forEach((card) => {
            const description = card.querySelector('.card-text');

            if (description) {
                description.hidden = isExpanded;
            }
        });

        toggleTransportButton.setAttribute(
            'aria-expanded',
            String(!isExpanded)
        );

        toggleTransportButton.textContent = isExpanded
            ? 'Show transport details'
            : 'Hide transport details';
    });
}


/* =========================================================
   12. DESTINATIONS
   Filters, counter, details and animations
   ========================================================= */

// Get elements from the Destinations page
const destinationList = document.getElementById('destination-list');
const destinationCount = document.getElementById('destination-count');

const destinationFilters = document.querySelectorAll(
    '.destination-filter'
);

const destinationItems = document.querySelectorAll(
    '.destination-item'
);

const destinationToggleButtons = document.querySelectorAll(
    '.destination-toggle'
);

/* ---------------------------------------------------------
   12.1. DESTINATION COUNTER
   --------------------------------------------------------- */

function updateDestinationCount(category) {
    const filteredDestinations = category === 'all'
        ? Array.from(destinationItems)
        : Array.from(destinationItems).filter(
            (item) => item.dataset.category === category
        );

    if (destinationCount) {
        destinationCount.textContent =
            `Showing ${filteredDestinations.length} of ${destinationItems.length} destinations`;
    }
}

/* ---------------------------------------------------------
   12.2. FILTER DESTINATIONS
   --------------------------------------------------------- */

function filterDestinations(category) {
    destinationItems.forEach((item) => {
        const shouldShow =
            category === 'all' ||
            item.dataset.category === category;

        item.classList.toggle('d-none', !shouldShow);

        if (shouldShow) {
            // Restart the animation
            item.classList.remove('destination-card-enter');
            void item.offsetWidth;
            item.classList.add('destination-card-enter');
        }
    });

    // Update the active filter button
    destinationFilters.forEach((button) => {
        const isActive =
            button.dataset.destinationFilter === category;

        button.classList.toggle('active', isActive);

        button.classList.toggle(
            'btn-success',
            isActive
        );

        button.classList.toggle(
            'btn-outline-success',
            !isActive
        );

        button.setAttribute(
            'aria-pressed',
            String(isActive)
        );
    });

    updateDestinationCount(category);
}

/* ---------------------------------------------------------
   12.3. FILTER BUTTON EVENTS
   --------------------------------------------------------- */

destinationFilters.forEach((button) => {
    button.addEventListener('click', () => {
        const category = button.dataset.destinationFilter;
        filterDestinations(category);
    });
});

/* ---------------------------------------------------------
   12.4. READ MORE BUTTONS
   --------------------------------------------------------- */

destinationToggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const cardBody = button.closest('.card-body');

        if (!cardBody) {
            return;
        }

        const extraInfo = cardBody.querySelector(
            '.destination-extra'
        );

        if (!extraInfo) {
            return;
        }

        const isExpanded =
            button.getAttribute('aria-expanded') === 'true';

        extraInfo.classList.toggle('d-none', isExpanded);

        button.setAttribute(
            'aria-expanded',
            String(!isExpanded)
        );

        button.textContent = isExpanded
            ? 'Read more'
            : 'Show less';
    });
});

/* ---------------------------------------------------------
   12.5. INITIALIZE DESTINATIONS
   --------------------------------------------------------- */

if (destinationList) {
    filterDestinations('all');
}
