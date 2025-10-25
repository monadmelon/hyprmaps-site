// Dark mode logic
function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) { return savedTheme; }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    // Note: Icon update is now handled by CSS, not this function
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
        // Handle other paths
        else if (link.getAttribute('href') !== '/' && currentPath.includes(link.getAttribute('href'))) {
             link.classList.add('active');
        }
    });
});

// NOTE: The extra '}' at the end of the original file has been removed.