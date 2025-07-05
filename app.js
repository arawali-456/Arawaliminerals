// Navigation functionality
class Navigation {
    constructor() {
        this.currentPage = 'home';
        this.init();
    }

    init() {
        this.bindEvents();
        this.showPage('home');
    }

    bindEvents() {
        // Handle navigation links
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-page]')) {
                e.preventDefault();
                const page = e.target.getAttribute('data-page');
                this.showPage(page);
            }
        });

        // Handle mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mobileNavList = document.querySelector('.mobile-nav__list');
        
        if (mobileToggle && mobileNavList) {
            mobileToggle.addEventListener('click', (e) => {
                // Don't toggle if clicking on a navigation link
                if (e.target.classList.contains('mobile-nav__link')) {
                    return;
                }
                mobileNavList.classList.toggle('active');
                mobileToggle.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const mobileNavList = document.querySelector('.mobile-nav__list');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            
            if (mobileNavList && mobileNavList.classList.contains('active') && 
                !mobileNavList.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileNavList.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }

    showPage(pageId) {
        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => page.classList.remove('active'));

        // Show target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageId;
        }

        // Update navigation active state
        this.updateNavigation(pageId);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Close mobile menu if open
        const mobileNavList = document.querySelector('.mobile-nav__list');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileNavList && mobileNavList.classList.contains('active')) {
            mobileNavList.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    }

    updateNavigation(activePageId) {
        const navLinks = document.querySelectorAll('.nav__link, .mobile-nav__link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === activePageId) {
                link.classList.add('active');
            }
        });
    }
}

// Contact form functionality
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.bindEvents();
        }
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Add real-time validation
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        this.clearFieldError(field);

        // Required field validation
        if (isRequired && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add new error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'var(--color-error)';
        errorElement.style.fontSize = 'var(--font-size-sm)';
        errorElement.style.marginTop = 'var(--space-4)';
        
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    validateForm() {
        const fields = this.form.querySelectorAll('input[required], textarea[required]');
        let isFormValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    handleSubmit() {
        if (!this.validateForm()) {
            this.showMessage('Please correct the errors below.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Get form data
        const formData = new FormData(this.form);
        
        // Send to Google Sheets
        fetch(this.form.action, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Required for Google Apps Script
        })
        .then((response) => {
            // With no-cors, we can't read the response, so we assume success
            this.showMessage('Thank you for your message! We will get back to you soon.', 'success');
            this.form.reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            // Fallback: try traditional form submission
            this.showMessage('Sending message...', 'info');
            setTimeout(() => {
                this.form.submit();
            }, 1000);
        })
        .finally(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }

    showMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageElement = document.createElement('div');
        messageElement.className = `form-message status status--${type}`;
        messageElement.textContent = message;
        messageElement.style.marginTop = 'var(--space-16)';

        this.form.appendChild(messageElement);

        // Auto-remove success messages
        if (type === 'success') {
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.remove();
                }
            }, 5000);
        }
    }
}

// Smooth scrolling for anchor links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]') && !e.target.hasAttribute('data-page')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }
}

// Loading animation
class LoadingAnimation {
    constructor() {
        this.init();
    }

    init() {
        // Add loading class to body on page load
        document.body.classList.add('loading');
        
        window.addEventListener('load', () => {
            // Remove loading class after a short delay
            setTimeout(() => {
                document.body.classList.remove('loading');
            }, 500);
        });
    }
}

// Intersection Observer for animations
class AnimationObserver {
    constructor() {
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.setupObserver();
        }
    }

    setupObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements that should animate in
        const animateElements = document.querySelectorAll(
            '.overview__card, .service-card, .sustainability-card, .value-item'
        );
        
        animateElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }
}

// Theme detection
class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        // Detect system theme preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-color-scheme', 'dark');
        } else {
            document.documentElement.setAttribute('data-color-scheme', 'light');
        }

        // Listen for theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (e.matches) {
                    document.documentElement.setAttribute('data-color-scheme', 'dark');
                } else {
                    document.documentElement.setAttribute('data-color-scheme', 'light');
                }
            });
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
    new ContactForm();
    new SmoothScroll();
    new LoadingAnimation();
    new AnimationObserver();
    new ThemeManager();
    
    // Check for form submission success
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('submit') === 'success') {
        // Show success message if redirected from Google Apps Script
        const contactForm = document.querySelector('#contactForm');
        if (contactForm) {
            const messageElement = document.createElement('div');
            messageElement.className = 'form-message status status--success';
            messageElement.textContent = 'Thank you for your message! We will get back to you soon.';
            messageElement.style.marginTop = 'var(--space-16)';
            contactForm.appendChild(messageElement);
            
            // Remove success parameter from URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }
});

// Add some CSS for animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    .loading {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }
    
    .loading.loaded {
        opacity: 1;
    }
    
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .form-control.error {
        border-color: var(--color-error);
        box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.1);
    }
`;
document.head.appendChild(style);