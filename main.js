document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Close menu on link click
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // 2. Navbar Sticky Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Logic (Performant)
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => revealObserver.observe(reveal));

    // 4. Typewriter Effect
    const typewriter = document.getElementById('typewriter');
    if (typewriter) {
        const roles = ["Full Stack Developer", "MERN Specialist", "Python Developer", "AI Enthusiast"];
        let roleIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let speed = 100;

        function type() {
            const current = roles[roleIdx];
            if (isDeleting) {
                typewriter.textContent = current.substring(0, charIdx - 1);
                charIdx--;
                speed = 50;
            } else {
                typewriter.textContent = current.substring(0, charIdx + 1);
                charIdx++;
                speed = 100;
            }

            if (!isDeleting && charIdx === current.length) {
                isDeleting = true;
                speed = 2000;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
                speed = 500;
            }
            setTimeout(type, speed);
        }
        type();
    }

    // 5. AJAX Form Submission
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'SENDING...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
                });

                if (response.ok) {
                    submitBtn.textContent = 'MESSAGE SENT!';
                    submitBtn.style.color = '#8b5cf6';
                    contactForm.reset();
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.color = '';
                        submitBtn.disabled = false;
                    }, 5000);
                } else {
                    throw new Error('Failed');
                }
            } catch (err) {
                submitBtn.textContent = 'ERROR! TRY AGAIN';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 5000);
            }
        });
    }
});
