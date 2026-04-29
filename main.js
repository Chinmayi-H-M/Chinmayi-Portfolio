document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animations
    const sections = document.querySelectorAll('section:not(.hero)');
    const observerOptions = {
        threshold: 0.1,
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

    // 2. Navbar Background on Scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = '1.2rem 0';
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            nav.style.padding = '2rem 0';
            nav.style.background = 'rgba(10, 10, 10, 0.8)';
        }
    });

    // 3. Typewriter Effect
    const typewriter = document.getElementById('typewriter');
    if (typewriter) {
        const roles = ["Full Stack Developer", "MERN Specialist", "AI Enthusiast", "Python Developer"];
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

    // 4. AJAX Form Submission
    const form = document.getElementById('contact-form');
    const btn = document.getElementById('submit-btn');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const originalText = btn.textContent;
            btn.textContent = 'SENDING...';
            btn.disabled = true;

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
                });

                if (response.ok) {
                    btn.textContent = 'MESSAGE SENT!';
                    btn.style.color = '#2dd4bf';
                    form.reset();
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.color = '';
                        btn.disabled = false;
                    }, 5000);
                } else {
                    throw new Error('Failed');
                }
            } catch (err) {
                btn.textContent = 'ERROR! TRY AGAIN';
                btn.style.color = '#ef4444';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.color = '';
                    btn.disabled = false;
                }, 5000);
            }
        });
    }
});
