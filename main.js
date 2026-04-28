document.addEventListener('DOMContentLoaded', () => {
    // Hide loader
    const loader = document.getElementById('loader');
    const hideLoader = () => {
        setTimeout(() => {
            loader.classList.add('fade-out');
        }, 1000);
    };

    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
    }

    // Reveal sections on scroll
    const sections = document.querySelectorAll('section');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // Keep observing if we want it to repeat
            }
        });
    }, revealOptions);

    sections.forEach(section => {
        revealObserver.observe(section);
    });

    // Navbar background change on scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = "0.8rem 0";
            nav.style.background = "rgba(3, 3, 3, 0.9)";
        } else {
            nav.style.padding = "1.2rem 0";
            nav.style.background = "rgba(3, 3, 3, 0.7)";
        }
    });

    // Form submission (AJAX)
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.disabled = true;
            
            const formData = new FormData(form);
            
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    btn.textContent = 'Message Sent!';
                    btn.style.background = '#10b981'; // Success green
                    form.reset();
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 3000);
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                btn.textContent = 'Error!';
                btn.style.background = '#ef4444'; // Error red
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            });
        });
    }

    // Subtle background particles effect
    createParticles();

    // Typewriter Effect
    const typewriterElement = document.getElementById('typewriter');
    const roles = ["Full Stack Developer", "MERN Stack Specialist", "Python Developer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 150;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 100;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
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
});

function createParticles() {
    const hero = document.getElementById('home');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random styles
        const size = Math.random() * 5 + 2 + 'px';
        const posX = Math.random() * 100 + '%';
        const posY = Math.random() * 100 + '%';
        const delay = Math.random() * 5 + 's';
        const duration = Math.random() * 10 + 10 + 's';
        
        Object.assign(particle.style, {
            position: 'absolute',
            width: size,
            height: size,
            backgroundColor: Math.random() > 0.5 ? '#3b82f6' : '#a855f7',
            borderRadius: '50%',
            top: posY,
            left: posX,
            opacity: '0.1',
            filter: 'blur(1px)',
            pointerEvents: 'none',
            zIndex: '0',
            animation: `float ${duration} linear infinite ${delay}`
        });

        hero.appendChild(particle);
    }

    // Add keyframes for floating particles
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes float {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            20% { opacity: 0.2; }
            80% { opacity: 0.2; }
            100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}
