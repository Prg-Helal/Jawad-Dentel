/**
 * Jawad Dental Website - Main Script File
 * 
 * This script handles all interactive functionality for the Jawad Dental website
 * including navigation, sliders, animations, and form handling.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components when DOM is fully loaded
    initMobileMenu();
    initStickyHeader();
    initBeforeAfterSlider();
    initTestimonialsSlider();
    initScrollReveal();
    initFormValidation();
    initWhatsAppButton();
    
    // GSAP animations for hero section
    initHeroAnimations();
});

/**
 * Initialize mobile menu toggle functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    const navListLogo = document.getElementById('navListLogo');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        navListLogo.classList.toggle('active');
        
        // Toggle aria-expanded attribute for accessibility
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

/**
 * Make header sticky and add blur effect on scroll
 */
function initStickyHeader() {
    const header = document.querySelector('.header-container');
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Initialize before/after image comparison slider
 */
function initBeforeAfterSlider() {
    const sliders = document.querySelectorAll('.image-comparison');
    
    if (sliders.length === 0) return;
    
    sliders.forEach(slider => {
        const beforeImage = slider.querySelector('.before-image');
        const afterImage = slider.querySelector('.after-image');
        const handle = slider.querySelector('.slider-handle');
        
        let isDragging = false;
        
        // Set initial position (50%)
        updateSliderPosition(50, slider, beforeImage, afterImage, handle);
        
        // Mouse events
        handle.addEventListener('mousedown', () => {
            isDragging = true;
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const rect = slider.getBoundingClientRect();
            let x = e.clientX - rect.left;
            
            // Constrain within slider bounds
            x = Math.max(0, Math.min(x, rect.width));
            
            const percent = (x / rect.width) * 100;
            updateSliderPosition(percent, slider, beforeImage, afterImage, handle);
        });
        
        // Touch events for mobile
        handle.addEventListener('touchstart', () => {
            isDragging = true;
        });
        
        document.addEventListener('touchend', () => {
            isDragging = false;
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const rect = slider.getBoundingClientRect();
            let x = e.touches[0].clientX - rect.left;
            
            // Constrain within slider bounds
            x = Math.max(0, Math.min(x, rect.width));
            
            const percent = (x / rect.width) * 100;
            updateSliderPosition(percent, slider, beforeImage, afterImage, handle);
        });
    });
    
    // Initialize slider navigation
    const sliderContainer = document.querySelector('.before-after-slider');
    const prevBtn = document.querySelector('.before-after-section .slider-prev');
    const nextBtn = document.querySelector('.before-after-section .slider-next');
    const dotsContainer = document.querySelector('.before-after-section .slider-dots');
    
    if (sliderContainer && prevBtn && nextBtn) {
        const slides = document.querySelectorAll('.slider-item');
        let currentSlide = 0;
        
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        // Navigation functions
        function goToSlide(index) {
            sliderContainer.scrollTo({
                left: sliderContainer.offsetWidth * index,
                behavior: 'smooth'
            });
            
            currentSlide = index;
            updateDots();
        }
        
        function updateDots() {
            const dots = document.querySelectorAll('.before-after-section .slider-dot');
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(currentSlide);
        });
        
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            goToSlide(currentSlide);
        });
        
        // Auto-scroll to current slide when window resizes
        window.addEventListener('resize', () => {
            goToSlide(currentSlide);
        });
    }
}

/**
 * Update slider position based on percentage
 */
function updateSliderPosition(percent, slider, beforeImage, afterImage, handle) {
    // Constrain between 5% and 95% for better UX
    percent = Math.max(5, Math.min(percent, 95));
    
    // Update image clipping
    afterImage.style.clipPath = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0% 100%)`;
    
    // Update handle position
    handle.style.left = `${percent}%`;
    
    // Show handle text when dragging
    const handleText = handle.querySelector('.handle-text');
    if (handleText) {
        handleText.style.opacity = '1';
        setTimeout(() => {
            handleText.style.opacity = '0';
        }, 1000);
    }
}

/**
 * Initialize testimonials slider
 */
function initTestimonialsSlider() {
    const sliderContainer = document.querySelector('.testimonials-track');
    const prevBtn = document.querySelector('.testimonials-section .slider-prev');
    const nextBtn = document.querySelector('.testimonials-section .slider-next');
    const dotsContainer = document.querySelector('.testimonials-section .slider-dots');
    
    if (!sliderContainer || !prevBtn || !nextBtn) return;
    
    const slides = document.querySelectorAll('.testimonial-card');
    let currentSlide = 0;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // Navigation functions
    function goToSlide(index) {
        sliderContainer.scrollTo({
            left: sliderContainer.offsetWidth * index,
            behavior: 'smooth'
        });
        
        currentSlide = index;
        updateDots();
    }
    
    function updateDots() {
        const dots = document.querySelectorAll('.testimonials-section .slider-dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
    });
    
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    });
    
    // Auto-scroll to current slide when window resizes
    window.addEventListener('resize', () => {
        goToSlide(currentSlide);
    });
    
    // Auto-rotate slides every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }, 5000);
}

/**
 * Initialize scroll reveal animations using Intersection Observer
 */
function initScrollReveal() {
    const sections = document.querySelectorAll('section');
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
}

/**
 * Initialize form validation for contact form
 */
function initFormValidation() {
    const form = document.getElementById('appointment-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
        
        // Simple validation
        if (nameInput.value.trim() === '') {
            isValid = false;
            showError(nameInput, 'الرجاء إدخال الاسم الكامل');
        } else {
            clearError(nameInput);
        }
        
        if (phoneInput.value.trim() === '') {
            isValid = false;
            showError(phoneInput, 'الرجاء إدخال رقم الهاتف');
        } else if (!/^[0-9]{10,15}$/.test(phoneInput.value)) {
            isValid = false;
            showError(phoneInput, 'رقم الهاتف غير صحيح');
        } else {
            clearError(phoneInput);
        }
        
        if (isValid) {
            // Here you would typically send the form data to a server
            alert('تم إرسال طلبك بنجاح! سوف نتصل بك قريبًا لتأكيد الموعد.');
            form.reset();
        }
    });
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('p');
            errorElement.className = 'error-message';
            errorElement.style.color = '#ff6b6b';
            errorElement.style.marginTop = '0.25rem';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.style.borderColor = '#ff6b6b';
    }
    
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.style.borderColor = '#ddd';
    }
}

/**
 * Initialize WhatsApp button functionality
 */
function initWhatsAppButton() {
    const whatsappButton = document.querySelector('.whatsapp-button');
    
    if (!whatsappButton) return;
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            whatsappButton.style.opacity = '1';
            whatsappButton.style.visibility = 'visible';
        } else {
            whatsappButton.style.opacity = '0';
            whatsappButton.style.visibility = 'hidden';
        }
    });
    
    // Initial state
    whatsappButton.style.opacity = '0';
    whatsappButton.style.visibility = 'hidden';
    setTimeout(() => {
        if (window.scrollY > 300) {
            whatsappButton.style.opacity = '1';
            whatsappButton.style.visibility = 'visible';
        }
    }, 1000);
}

/**
 * Initialize GSAP animations for hero section
 */
function initHeroAnimations() {
    // Only run if GSAP is loaded
    if (typeof gsap !== 'undefined') {
        // Hero text animation
        gsap.from('.hero-text h1', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.3
        });
        
        gsap.from('.hero-subtitle', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.6
        });
        
        gsap.from('.hero-buttons', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.9
        });
        
        // Hero image animation
        gsap.from('.hero-image', {
            duration: 1.5,
            scale: 0.9,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.6
        });
    }
}