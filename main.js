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
        threshold: 0.15, // Trigger a bit later for better effect
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

    const revealElements = document.querySelectorAll('.reveal, .reveal-blur, .reveal-text');
    revealElements.forEach(el => observer.observe(el));

    // NEW: Dynamic Typewriter 
    const typeWriterElement = document.getElementById('typewriter-text');
    const cursorElement = document.querySelector('.typewriter-cursor');
    
    if (typeWriterElement) {
        const phrases = [
            "Your Destination.",
            "Your Data.",
            "Your Rules.",
            "Tourism Infrastructure\nfor Destinations"
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            // Determine highlighting/text content
            if (isDeleting) {
                typeWriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typeWriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            // Text content updated, styling handled by CSS
            
            // Dynamic speed
            let typeSpeed = isDeleting ? 40 : 80;
            
            // Random jitter for realism
            if (!isDeleting) typeSpeed += Math.random() * 40;

            if (!isDeleting && charIndex === currentPhrase.length) {
                // Phrase complete
                if (phraseIndex === phrases.length - 1) {
                    // Final phrase, stop.
                    if (cursorElement) cursorElement.classList.add('done');
                    return; 
                }
                
                // Pause before deleting
                typeSpeed = 1500;
                isDeleting = true;
                
            } else if (isDeleting && charIndex === 0) {
                // Deletion complete, move to next
                isDeleting = false;
                phraseIndex++;
                typeSpeed = 400; // Pause before typing next
            }

            setTimeout(type, typeSpeed);
        }

        // Start delay
        setTimeout(type, 800);
    }
});