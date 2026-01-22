// ===================================
// DOM Elements
// ===================================
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelectorAll('.nav-link');
const scrollToTopBtn = document.getElementById('scrollToTop');
const contactForm = document.getElementById('contactForm');

// ===================================
// Navigation Functionality
// ===================================

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow to navbar when scrolled
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignore empty # links
        if (href === '#' || !href) {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Scroll to Top Button
// ===================================
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Scroll Animations (Intersection Observer)
// ===================================
const animateElements = document.querySelectorAll('[data-animate]');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            // Optional: Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animateElements.forEach(element => {
    observer.observe(element);
});

// ===================================
// Contact Form Validation & Submission
// ===================================
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Basic validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !subject || !message) {
            e.preventDefault();
            alert('Please fill in all fields.');
            return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            return false;
        }
        
        // If using Netlify Forms, the form will submit automatically
        // Show success message (you can customize this)
        console.log('Form submitted successfully!');
    });
}

// ===================================
// Dynamic Year in Footer
// ===================================
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ===================================
// Skill Tags Stagger Animation
// ===================================
const skillCategories = document.querySelectorAll('.skill-category');

skillCategories.forEach((category, categoryIndex) => {
    const skillTags = category.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, tagIndex) => {
        tag.style.animationDelay = `${categoryIndex * 0.1 + tagIndex * 0.05}s`;
    });
});

// ===================================
// Project Cards Hover Effect Enhancement
// ===================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===================================
// Prevent animations from running on page load
// ===================================
window.addEventListener('load', () => {
    // Remove preload class if you add one
    document.body.classList.remove('preload');
    
    // Trigger initial navigation highlight
    highlightNavigation();
});

// ===================================
// Handle Window Resize (for responsive adjustments)
// ===================================
let resizeTimer;

window.addEventListener('resize', () => {
    // Clear mobile menu when resizing to desktop
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }, 250);
});

// ===================================
// Console Message (Optional - for developers)
// ===================================
console.log('%c👋 Welcome to Alfiya\'s Portfolio!', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%c🔒 Cyber Security Enthusiast | Full Stack Developer', 'color: #06b6d4; font-size: 14px;');
console.log('%cInterested in collaboration? Reach out via the contact form!', 'color: #64748b; font-size: 12px;');

// ===================================
// Performance: Debounce Scroll Events
// ===================================
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedHighlight = debounce(highlightNavigation, 15);
window.addEventListener('scroll', debouncedHighlight);

// ===================================
// Accessibility: Keyboard Navigation
// ===================================
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ===================================
// Lazy Loading Images (if you add profile photo)
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===================================
// Enhanced Form Feedback
// ===================================
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

formInputs.forEach(input => {
    // Add visual feedback on focus
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
        
        // Validate on blur
        if (this.required && !this.value.trim()) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '';
        }
    });
    
    // Real-time validation
    input.addEventListener('input', function() {
        if (this.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(this.value)) {
                this.style.borderColor = '#10b981';
            } else if (this.value.length > 0) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '';
            }
        }
    });
});

// ===================================
// Print Styles Support
// ===================================
window.addEventListener('beforeprint', () => {
    // Expand all collapsed sections before printing
    console.log('Preparing document for print...');
});

// ===================================
// Easter Egg: Konami Code (Optional Fun Feature)
// ===================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        console.log('%c🎉 Konami Code Activated! You found the easter egg!', 'color: #8b5cf6; font-size: 24px; font-weight: bold;');
        console.log('%c🔐 Security Level: Expert Hacker Detected!', 'color: #06b6d4; font-size: 16px;');
        
        // Optional: Add a fun animation or effect
        document.body.style.animation = 'rainbow 2s ease-in-out';
    }
});

// ===================================
// Performance Monitoring (Development)
// ===================================
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const connectTime = perfData.responseEnd - perfData.requestStart;
            const renderTime = perfData.domComplete - perfData.domLoading;
            
            console.log('%c⚡ Performance Metrics:', 'color: #10b981; font-size: 14px; font-weight: bold;');
            console.log(`Page Load Time: ${pageLoadTime}ms`);
            console.log(`Server Response: ${connectTime}ms`);
            console.log(`DOM Render Time: ${renderTime}ms`);
        }, 0);
    });
}
