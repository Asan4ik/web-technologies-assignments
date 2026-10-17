// --- VARIABLES ---

// Subscribe button
const overlay = document.getElementById('popupOverlay');
const openSubscribeBtn = document.getElementById('subscribeButton');
const closeSubscribeBtn = document.querySelector('.close-btn');
const subscribeForm = document.getElementById('subscribeForm');

// Contact us form
const contactForm = document.getElementById('contactForm');
const contactName = document.getElementById('nameInput');
const contactEmail = document.getElementById('emailInput');
const contactPassword = document.getElementById('passwordInput');
const contactDestination = document.getElementById('destinationSelect');
const contactMessage = document.getElementById('messageTextarea');
const openContactBtn = document.getElementById('contactButton')

const bgColorChangeBtn = document.getElementById('bg-color-change-btn');

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF5'];
let currentColorIndex = 0;


// --- FUNCTIONS ---
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


// --- EVENT LISTENERS ---

// Open popup
if (openSubscribeBtn && overlay) {
    openSubscribeBtn.addEventListener('click', () => {
        overlay.style.display = 'flex';
    });
}

// Close popup
if (closeSubscribeBtn && overlay) {
    closeSubscribeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
    });
}

// Close popup when clicking outside
if (overlay) {
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            overlay.style.display = 'none';
        }
    });
}

// Submit subscribe form
if (subscribeForm && overlay) {
    subscribeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Thank you for subscribing!');
        overlay.style.display = 'none';
    });
}

// Change background button
if (bgColorChangeBtn) {
    bgColorChangeBtn.addEventListener('click', () => {
        bgColorChangeBtn.closest('div').style.background =
            colors[currentColorIndex];
        currentColorIndex = (currentColorIndex + 1) % colors.length;
    });
}

// Contact form
if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let passwordValue = contactPassword.value;
        let isValidLength = passwordValue.length >= 8 && passwordValue.length <= 32;
        let hasUppercase = /[A-Z]/.test(passwordValue);
        let hasNumber = /[0-9]/.test(passwordValue);
        let hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue);
        let isValid = true;

        if (!contactName || contactName.value.trim() === '') {
            alert('Please enter your name');
            isValid = false;
        }
        if (!contactEmail || contactEmail.value.trim() === '') {
            alert('Please enter your email');
            isValid = false;
        }

        if (!contactPassword || !isValidLength || !hasUppercase || !hasNumber || !hasSpecial) {
            alert('Weak password');
            isValid = false;
        }

        if (!contactMessage || contactMessage.value.trim() === '') {
            alert('Please enter your contact message');
            isValid = false;
        }
        if (!contactDestination || contactDestination.value === '') {
            alert('Please choose your destination');
            isValid = false;
        }

        if (isValid) {
            alert('Successfully submitted!');
            contactForm.reset();
        }
    });
}

document.getElementById('travel-tips-list').addEventListener('click', function(e) {
    const card = e.target.closest('.tip-card') ;
    if (!card) return;

    card.classList.toggle('open');

    const content = card.querySelector('.tip-content');
    content.classList.toggle('d-none');
})



updateClock();
setInterval(updateClock, 1000);
