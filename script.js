/**
 * LUXBIN × Tesla Website - Interactive Features
 * Futuristic space-themed interactions
 */

// ========================================
// Smooth Scrolling for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Intersection Observer for Fade-In Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');

            // Trigger counter animations for stat numbers
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.tech-card, .impact-card, .research-category, .paper, .timeline-phase, .stat-number').forEach(el => {
    el.classList.add('fade-in-element');
    observer.observe(el);
});

// ========================================
// Animated Counter for Statistics
// ========================================
function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = formatNumber(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = formatNumber(target);
        }
    };

    updateCounter();
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return num.toFixed(1);
    }
}

// ========================================
// Tech Card Interactive Glow Effect
// ========================================
document.querySelectorAll('.tech-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ========================================
// Parallax Effect for Space Background
// ========================================
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const stars = document.querySelector('.stars');
            const twinkling = document.querySelector('.twinkling');

            if (stars) {
                stars.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            if (twinkling) {
                twinkling.style.transform = `translateY(${scrolled * 0.3}px)`;
            }

            ticking = false;
        });
        ticking = true;
    }
});

// ========================================
// Mobile Menu Toggle
// ========================================
function createMobileMenu() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelector('.nav-links');

    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.classList.add('hamburger');
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    hamburger.setAttribute('aria-label', 'Toggle menu');

    // Insert before nav links
    nav.insertBefore(hamburger, navLinks);

    // Toggle menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking nav link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

// Initialize mobile menu on small screens
if (window.innerWidth <= 768) {
    createMobileMenu();
}

window.addEventListener('resize', () => {
    if (window.innerWidth <= 768 && !document.querySelector('.hamburger')) {
        createMobileMenu();
    } else if (window.innerWidth > 768 && document.querySelector('.hamburger')) {
        document.querySelector('.hamburger').remove();
        document.querySelector('.nav-links').classList.remove('active');
    }
});

// ========================================
// Dynamic Power Reduction Visualization
// ========================================
function createPowerFlow() {
    const systemDiagram = document.querySelector('.system-diagram');
    if (!systemDiagram) return;

    // Create animated energy particles
    setInterval(() => {
        const particle = document.createElement('div');
        particle.classList.add('energy-particle');
        particle.style.left = '0%';
        particle.style.top = `${Math.random() * 100}%`;

        systemDiagram.appendChild(particle);

        // Animate across diagram
        setTimeout(() => {
            particle.style.left = '100%';
        }, 50);

        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }, 500);
}

createPowerFlow();

// ========================================
// Research Paper Expand/Collapse
// ========================================
document.querySelectorAll('.paper').forEach(paper => {
    const title = paper.querySelector('.paper-title');
    if (title) {
        title.style.cursor = 'pointer';
        title.addEventListener('click', () => {
            paper.classList.toggle('expanded');
        });
    }
});

// ========================================
// Scroll Progress Indicator
// ========================================
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

createScrollProgress();

// ========================================
// Tesla Red Glow on Hover for Important Stats
// ========================================
document.querySelectorAll('.tech-stat, .impact-stats div, .phase-result').forEach(stat => {
    stat.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 20px #E82127, 0 0 40px #E82127';
        this.style.transform = 'scale(1.05)';
    });

    stat.addEventListener('mouseleave', function() {
        this.style.textShadow = '';
        this.style.transform = '';
    });
});

// ========================================
// Dynamic Timeline Animation
// ========================================
function animateTimeline() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    const phases = timeline.querySelectorAll('.timeline-phase');

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('timeline-visible');
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });

    phases.forEach(phase => {
        timelineObserver.observe(phase);
    });
}

animateTimeline();

// ========================================
// Photonic Encoding Visualization (Light Rays)
// ========================================
function createPhotonicEffect() {
    const photonicCard = document.querySelector('.tech-card:nth-child(3)'); // Photonic card
    if (!photonicCard) return;

    photonicCard.addEventListener('mouseenter', () => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const ray = document.createElement('div');
                ray.classList.add('light-ray');
                ray.style.top = `${Math.random() * 100}%`;
                ray.style.animationDelay = `${Math.random() * 0.5}s`;
                photonicCard.appendChild(ray);

                setTimeout(() => ray.remove(), 1000);
            }, i * 100);
        }
    });
}

createPhotonicEffect();

// ========================================
// Quartz Crystal Resonance Effect
// ========================================
function createResonanceEffect() {
    const piezoCard = document.querySelector('.tech-card:nth-child(2)'); // Piezoelectric card
    if (!piezoCard) return;

    piezoCard.addEventListener('mouseenter', () => {
        piezoCard.classList.add('resonating');
    });

    piezoCard.addEventListener('mouseleave', () => {
        piezoCard.classList.remove('resonating');
    });
}

createResonanceEffect();

// ========================================
// LDD Wave Function Visualization
// ========================================
function createWaveEffect() {
    const lddCard = document.querySelector('.tech-card:nth-child(1)'); // LDD card
    if (!lddCard) return;

    const formula = lddCard.querySelector('.tech-formula');
    if (!formula) return;

    lddCard.addEventListener('mouseenter', () => {
        formula.classList.add('wave-active');
    });

    lddCard.addEventListener('mouseleave', () => {
        formula.classList.remove('wave-active');
    });
}

createWaveEffect();

// ========================================
// Contact Form Validation (if form exists)
// ========================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Show success message with futuristic effect
        const successMsg = document.createElement('div');
        successMsg.classList.add('success-message');
        successMsg.innerHTML = '✅ Message sent! Tesla will contact you soon.';
        successMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #00D4FF, #9D4EDD);
            padding: 2rem 3rem;
            border-radius: 15px;
            font-size: 1.5rem;
            color: white;
            box-shadow: 0 20px 60px rgba(0, 212, 255, 0.5);
            z-index: 10000;
            animation: slideIn 0.5s ease;
        `;

        document.body.appendChild(successMsg);

        setTimeout(() => {
            successMsg.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => successMsg.remove(), 500);
        }, 3000);
    });
}

// ========================================
// Easter Egg: Konami Code for Tesla Mode
// ========================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateTeslaMode();
    }
});

function activateTeslaMode() {
    document.body.classList.add('tesla-mode');

    const teslaMsg = document.createElement('div');
    teslaMsg.innerHTML = '⚡ LUDICROUS MODE ACTIVATED ⚡';
    teslaMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #E82127;
        padding: 3rem 5rem;
        border-radius: 20px;
        font-family: 'Orbitron', monospace;
        font-size: 3rem;
        color: white;
        box-shadow: 0 0 100px #E82127;
        z-index: 10000;
        animation: pulse 1s infinite;
    `;

    document.body.appendChild(teslaMsg);

    setTimeout(() => {
        teslaMsg.remove();
        document.body.classList.remove('tesla-mode');
    }, 5000);
}

// ========================================
// Initialize All Features on DOM Load
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔷 LUXBIN × Tesla website initialized');
    console.log('⚡ Self-sustaining FSD computer online');
    console.log('💎 LDD crystallographic optimization active');
    console.log('🌟 Photonic neural computing enabled');

    // Add subtle glow to hero on load
    const hero = document.querySelector('.hero');
    if (hero) {
        setTimeout(() => {
            hero.classList.add('hero-loaded');
        }, 500);
    }
});

// ========================================
// Performance Monitoring
// ========================================
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.duration > 100) {
                console.warn(`Slow operation detected: ${entry.name} took ${entry.duration}ms`);
            }
        }
    });

    try {
        perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
    } catch (e) {
        console.log('Performance monitoring not available');
    }
}

console.log('✅ LUXBIN × Tesla interactive features loaded successfully');
