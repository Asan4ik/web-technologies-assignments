
const overlay = document.getElementById('popupOverlay');
const openBtn = document.getElementById('subscribeButton');
const closeBtn = document.querySelector('.close-btn');
const form = document.getElementById('subscribeForm');

// Open popup
if (openBtn && overlay) {
    openBtn.addEventListener('click', () => {
        overlay.style.display = 'flex';
    });
}

// Close popup
if (closeBtn && overlay) {
    closeBtn.addEventListener('click', () => {
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

// Submit form
if (form && overlay) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Thank you for subscribing!');
        overlay.style.display = 'none';
    });
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

updateClock();
setInterval(updateClock, 1000);



const bgColorChangeBtn = document.getElementById('bg-color-change-btn');

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF5'];
let currentColorIndex = 0;

if (bgColorChangeBtn) {
    bgColorChangeBtn.addEventListener('click', () => {
        bgColorChangeBtn.closest('div').style.background =
            colors[currentColorIndex];
        currentColorIndex = (currentColorIndex + 1) % colors.length;
    });
}
