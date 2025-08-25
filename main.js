// JavaScript for interactive elements

document.addEventListener('DOMContentLoaded', function() {
    // Select elements
    const header = document.getElementById('main-header');
    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.getElementById('nav-links');
    const ctaButton = document.querySelector('.primary-cta');
    const heroContent = document.querySelector('.hero-content');
    const bookingSection = document.getElementById('booking-section');

    // Sticky Header on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Burger Menu Toggle for Mobile
    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burgerMenu.classList.toggle('active');
    });

    // Smooth Scroll for CTA Button
    ctaButton.addEventListener('click', function(e) {
        e.preventDefault();
        bookingSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Target elements for observation
    document.querySelectorAll('.fade-in-up, .slide-in-up').forEach(element => {
        observer.observe(element);
    });
});