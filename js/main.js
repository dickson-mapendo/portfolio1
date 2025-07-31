// ===== MAIN JAVASCRIPT FILE =====

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initAnimations();
    initSkillBars();
    initContactForm();
    initSmoothScrolling();
    initMobileMenu();
    initBackToTop();
});

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Handle scroll effect on navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Update active nav link based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !navMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections and elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-in-up');
    animatedElements.forEach(el => observer.observe(el));
}

// ===== SKILL BARS ANIMATION =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const level = skillBar.getAttribute('data-level');
                
                // Animate skill bar
                setTimeout(() => {
                    skillBar.style.width = level + '%';
                }, 200);
                
                skillObserver.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        bar.style.width = '0%';
        bar.style.transition = 'width 1.5s ease-in-out';
        skillObserver.observe(bar);
    });
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Add animation classes to elements
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // Animate sections on scroll
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => sectionObserver.observe(section));
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (since it's non-functional)
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }
}

// ===== UTILITY FUNCTIONS =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#10B981';
            break;
        case 'error':
            notification.style.backgroundColor = '#EF4444';
            break;
        case 'warning':
            notification.style.backgroundColor = '#F59E0B';
            break;
        default:
            notification.style.backgroundColor = '#3B82F6';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce function for resize events
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
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

// ===== LAZY LOADING =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function initAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 10001;
        border-radius: 4px;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// ===== BROWSER COMPATIBILITY =====
// Polyfill for IntersectionObserver
if (!window.IntersectionObserver) {
    // Fallback for older browsers
    console.warn('IntersectionObserver not supported. Some animations may not work.');
}

// ===== ADDITIONAL FEATURES =====

// Typing animation for hero section
function initTypingAnimation() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const titles = [
            'Junior Software Developer',
            'Self-Taught Programmer',
            'Innovation Enthusiast',
            'Future Tech Leader'
        ];
        let currentIndex = 0;
        let currentText = '';
        let isDeleting = false;

        function typeText() {
            const fullText = titles[currentIndex];

            if (isDeleting) {
                currentText = fullText.substring(0, currentText.length - 1);
            } else {
                currentText = fullText.substring(0, currentText.length + 1);
            }

            heroSubtitle.textContent = currentText;

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && currentText === fullText) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && currentText === '') {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % titles.length;
                typeSpeed = 500; // Pause before next word
            }

            setTimeout(typeText, typeSpeed);
        }

        // Start typing animation after a delay
        setTimeout(typeText, 1000);
    }
}

// Parallax scrolling effect
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero-avatar, .hero-content');

    window.addEventListener('scroll', throttle(function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        parallaxElements.forEach(element => {
            if (element.classList.contains('hero-avatar')) {
                element.style.transform = `translateY(${rate * 0.3}px)`;
            } else if (element.classList.contains('hero-content')) {
                element.style.transform = `translateY(${rate * 0.1}px)`;
            }
        });
    }, 10));
}

// Cursor trail effect
function initCursorTrail() {
    const trail = [];
    const trailLength = 20;

    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - i / trailLength};
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }

    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        let x = mouseX, y = mouseY;

        trail.forEach((dot, index) => {
            const nextDot = trail[index + 1] || trail[0];

            dot.style.left = x - 2 + 'px';
            dot.style.top = y - 2 + 'px';

            if (nextDot) {
                x += (parseFloat(nextDot.style.left) - x) * 0.3;
                y += (parseFloat(nextDot.style.top) - y) * 0.3;
            }
        });

        requestAnimationFrame(animateTrail);
    }

    animateTrail();
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initTypingAnimation();
    initParallaxEffect();

    // Only add cursor trail on desktop
    if (window.innerWidth > 768) {
        initCursorTrail();
    }
});

// ===== PERFORMANCE MONITORING =====
function initPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);

        // Track Core Web Vitals
        if ('web-vitals' in window) {
            // This would require the web-vitals library
            // For now, we'll just log basic metrics
            const navigation = performance.getEntriesByType('navigation')[0];
            if (navigation) {
                console.log('Navigation timing:', {
                    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                    loadComplete: navigation.loadEventEnd - navigation.loadEventStart
                });
            }
        }
    });
}

// Initialize performance monitoring
initPerformanceMonitoring();

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');

    if (!backToTopButton) return;

    // Show/hide button based on scroll position
    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }

    // Smooth scroll to top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Event listeners
    window.addEventListener('scroll', toggleBackToTopButton);
    backToTopButton.addEventListener('click', scrollToTop);

    // Initial check
    toggleBackToTopButton();
}
