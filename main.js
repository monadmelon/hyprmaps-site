// Dark mode logic
function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) { return savedTheme; }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
}
function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-icon');
    if (icon) { icon.textContent = theme === 'dark' ? '🌙' : '☀️'; }
}
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}
setTheme(getPreferredTheme());

// Hamburger menu logic
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}