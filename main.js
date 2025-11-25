// Dark mode logic
function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) { return savedTheme; }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}
// Set initial theme on load
setTheme(getPreferredTheme());


// Hamburger menu logic
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');

            // NEW: Toggle ARIA attribute
            const isExpanded = navToggle.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // NEW: Active navigation link logic
    const currentPath = window.location.pathname;
    const allNavLinks = document.querySelectorAll('.nav-links a, .footer-nav a');

    allNavLinks.forEach(link => {
        // Handle root path ("/") exactly
        if (link.getAttribute('href') === '/' && currentPath === '/') {
            link.classList.add('active');
        }
        // Handle other paths (make sure it's not just '/')
        else if (link.getAttribute('href') !== '/' && currentPath.startsWith(link.getAttribute('href'))) {
             link.classList.add('active');
        }
    });

    // NEW: Navbar scroll effect
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // NEW: Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
});