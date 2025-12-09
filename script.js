/*═══════════════════════════════════════════════════════════════════════
  PREMIUM DIGITAL CIRCUMCISION INVITATION - JAVASCRIPT
  Interactive Features & Animations
  ═══════════════════════════════════════════════════════════════════════*/

// ─────────────────────────────────────────────────────────────────────
// INITIALIZATION & PAGE LOAD
// ─────────────────────────────────────────────────────────────────────

// Force scroll to top on page load/refresh
window.addEventListener('beforeunload', function () {
    window.scrollTo(0, 0);
});

// Immediately scroll to top
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', function () {
    // Ensure we're at the top
    window.scrollTo(0, 0);

    // Hide loading overlay after 1.5 seconds
    setTimeout(() => {
        document.getElementById('loading-overlay').classList.add('hidden');
    }, 1500);

    // Initialize all features
    initializeCountdown();
    initializeScrollAnimations();
    initializeBackgroundMusic();
});

// ─────────────────────────────────────────────────────────────────────
// COUNTDOWN TIMER TO EVENT DATE
// ─────────────────────────────────────────────────────────────────────

function initializeCountdown() {
    const eventDate = new Date('2026-01-04T10:00:00').getTime();

    const countdownInterval = setInterval(function () {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = '<p class="event-date">Acara Sedang Berlangsung!</p>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

// ─────────────────────────────────────────────────────────────────────
// SCROLL ANIMATIONS - INTERSECTION OBSERVER
// ─────────────────────────────────────────────────────────────────────

function initializeScrollAnimations() {
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// ─────────────────────────────────────────────────────────────────────
// BACKGROUND MUSIC PLAYER
// ─────────────────────────────────────────────────────────────────────

let isMusicPlaying = false;
const music = document.getElementById('backgroundMusic');
const musicIcon = document.getElementById('musicIcon');

function initializeBackgroundMusic() {
    // Try to autoplay with user interaction
    document.addEventListener('click', function autoplay() {
        if (!isMusicPlaying) {
            music.play().catch(e => console.log('Autoplay prevented:', e));
            isMusicPlaying = true;
            musicIcon.classList.add('playing');
        }
        document.removeEventListener('click', autoplay);
    }, { once: true });
}

function toggleMusic() {
    if (isMusicPlaying) {
        music.pause();
        isMusicPlaying = false;
        musicIcon.classList.remove('playing');
    } else {
        music.play().catch(e => {
            console.log('Music play error:', e);
            alert('Mohon izinkan musik untuk diputar');
        });
        isMusicPlaying = true;
        musicIcon.classList.add('playing');
    }
}

// ─────────────────────────────────────────────────────────────────────
// ADD TO CALENDAR FUNCTIONALITY
// ─────────────────────────────────────────────────────────────────────

function addToCalendar() {
    const eventDetails = {
        title: 'Tasyakuran Khitanan Rayyan Syazwan Nurdiansyah',
        description: 'Tasyakuran Khitanan putra dari Bpk. Budi Nurdiansyah & Ibu Fya Yunita',
        location: 'Perumahan Setia Residen Tarumajaya Bekasi Utara',
        start: '20260104T030000Z', // 10:00 WIB in UTC
        end: '20260104T100000Z',   // 17:00 WIB in UTC
    };

    // Create .ics file content
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Invitation//Rayyan Khitanan//EN
BEGIN:VEVENT
DTSTART:${eventDetails.start}
DTEND:${eventDetails.end}
SUMMARY:${eventDetails.title}
DESCRIPTION:${eventDetails.description}
LOCATION:${eventDetails.location}
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-PT24H
ACTION:DISPLAY
DESCRIPTION:Reminder: ${eventDetails.title}
END:VALARM
END:VEVENT
END:VCALENDAR`;

    // Download .ics file
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Khitanan_Rayyan_Syazwan.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ─────────────────────────────────────────────────────────────────────
// SMOOTH SCROLL ENHANCEMENTS
// ─────────────────────────────────────────────────────────────────────

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ─────────────────────────────────────────────────────────────────────
// INVITATION MODAL - BUKA UNDANGAN
// ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
    const invitationModal = document.getElementById('invitationModal');
    const openInvitationBtn = document.getElementById('openInvitationBtn');

    // Lock scroll when modal is open
    const updateScrollLock = () => {
        if (invitationModal && !invitationModal.classList.contains('hidden')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    // Initial scroll lock
    updateScrollLock();

    // Close modal when button is clicked
    if (openInvitationBtn) {
        openInvitationBtn.addEventListener('click', function () {
            // Add fade-out animation to modal
            invitationModal.classList.add('hidden');
            
            // Ensure scroll stays at top
            window.scrollTo({
                top: 0,
                behavior: 'auto'
            });
        });
    }

    // Listen for modal changes
    if (invitationModal) {
        const observer = new MutationObserver(updateScrollLock);
        observer.observe(invitationModal, { attributes: true, attributeFilter: ['class'] });
    }
});

