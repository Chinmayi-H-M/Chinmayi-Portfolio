document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader Logic
    const loader = document.getElementById('loader');
    const hideLoader = () => {
        setTimeout(() => {
            if (loader) {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 1000);
            }
        }, 1500);
    };

    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
    }

    // 2. Custom Cursor Glow
    const cursorGlow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // 3. Navbar Scroll Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 4. Scroll Reveal Animations
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 5. 3D Tilt Effect for Project Cards
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });
    });

    // 6. Typewriter Effect
    const typewriter = document.getElementById('typewriter');
    if (typewriter) {
        const roles = [
            "Full Stack Developer", 
            "MERN Stack Specialist", 
            "Python Developer", 
            "AI & ML Enthusiast",
            "Problem Solver"
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typewriter.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typewriter.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }

    // 7. Premium Form Submission (AJAX)
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    submitBtn.textContent = 'Message Sent!';
                    submitBtn.style.background = '#10b981';
                    contactForm.reset();
                    
                    // Create confetti effect (optional placeholder for premium feel)
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 5000);
                } else {
                    throw new Error('Submission failed');
                }
            } catch (err) {
                console.error('Submission Error:', err);
                submitBtn.textContent = 'Error! Try Again';
                submitBtn.style.background = '#ef4444';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 5000);
            }
        });
    }
});
