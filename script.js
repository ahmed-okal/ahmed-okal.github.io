document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const closeMenuBtn = document.querySelector('.close-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    function toggleMenu() {
        mobileNavOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateScrollProgress();
    });

    // Scroll Progress Bar
    const scrollProgressObj = document.querySelector('.scroll-progress');
    
    function updateScrollProgress() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        scrollProgressObj.style.width = scrollHeight > 0 ? `${scrolled}%` : '0%';
    }

    // GSAP Advanced Animations (Optional extra flair)
    if (typeof gsap !== 'undefined') {
        
        // Hover effect for project cards using GSAP
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { y: -10, duration: 0.3, ease: 'power2.out' });
                gsap.to(card.querySelector('.project-img-placeholder'), { scale: 1.05, duration: 0.5 });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
                gsap.to(card.querySelector('.project-img-placeholder'), { scale: 1, duration: 0.5 });
            });
        });

        // Skill icon floating animation (subtle)
        const skillIcons = document.querySelectorAll('.skill-icon');
        skillIcons.forEach(icon => {
            // Random start delay
            const delay = Math.random() * 2;
            
            gsap.to(icon, {
                y: -5,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: delay
            });
        });
    }

    // Active Link Highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Glitch Effect logic (Simple random character replacement usually, but for simple CSS we used animation. 
    // Here allows adding more complex js glitch only on hover if requested, keeping it simple for now)
});
