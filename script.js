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
            const img = card.querySelector('.project-img');
            
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { y: -10, duration: 0.3, ease: 'power2.out' });
                if(img) gsap.to(img, { scale: 1.05, duration: 0.5 });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
                if(img) gsap.to(img, { scale: 1, duration: 0.5 });
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

    // --- Interactive Background Script ---
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        const particleCount = 60; // Adjust for density
        const connectionDistance = 120;
        const mouseDistance = 200;

        let mouse = { x: null, y: null };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });
        
        // Handle resizing
        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles(); 
        }

        window.addEventListener('resize', resize);

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5; // slow speed
                this.vy = (Math.random() - 0.5) * 0.5; 
                this.size = Math.random() * 1.5 + 0.5;
                this.color = 'rgba(0, 242, 255, 0.3)'; // Cyan accent
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Mouse interaction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx*dx + dy*dy);

                if (distance < mouseDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDistance - distance) / mouseDistance;
                    const directionX = forceDirectionX * force * 1; // Pushing factor
                    const directionY = forceDirectionY * force * 1;

                    // Move away from mouse gently
                    this.x -= directionX;
                    this.y -= directionY;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Connect particles
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 242, 255, ${1 - distance/connectionDistance})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }

        // Init
        resize();
        animate();
    }
});
