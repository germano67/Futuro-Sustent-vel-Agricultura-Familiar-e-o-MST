/* ============================================================
   AGRINHO 2026 — MODO ESCURO COM TEMA NATUREZA
   JavaScript Completo — Interatividade e Animações
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ========== NAVEGAÇÃO ==========
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleNavScroll() {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleNavScroll);

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', updateActiveLink);

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPos = target.offsetTop - navHeight - 20;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });

    // ========== ANIMAÇÕES AO SCROLL ==========
    const animatedElements = document.querySelectorAll('[data-animate]');
    const observerOptions = { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 };
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    animatedElements.forEach(el => animationObserver.observe(el));

    // ========== CONTADORES ANIMADOS ==========
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    function animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * easeOut);
            element.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        requestAnimationFrame(updateCounter);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    statNumbers.forEach(num => counterObserver.observe(num));

    // ========== BOTÃO VOLTAR AO TOPO ==========
    const backToTop = document.getElementById('backToTop');

    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    window.addEventListener('scroll', handleBackToTop);

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========== PARTÍCULAS DE FOLHAS ==========
    const particlesContainer = document.getElementById('particles-bg');
    const leafEmojis = ['🍃', '🌿', '🍂', '🌱', '☘️'];
    const maxParticles = 12;

    function createLeaf() {
        if (particlesContainer.children.length >= maxParticles) return;
        const leaf = document.createElement('span');
        leaf.classList.add('leaf-particle');
        leaf.textContent = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
        const leftPos = Math.random() * 100;
        const size = 14 + Math.random() * 16;
        const duration = 12 + Math.random() * 18;
        const delay = Math.random() * 5;
        leaf.style.left = leftPos + '%';
        leaf.style.fontSize = size + 'px';
        leaf.style.animationDuration = duration + 's';
        leaf.style.animationDelay = delay + 's';
        particlesContainer.appendChild(leaf);
        setTimeout(() => {
            if (leaf.parentNode) leaf.parentNode.removeChild(leaf);
        }, (duration + delay) * 1000);
    }

    for (let i = 0; i < 5; i++) setTimeout(createLeaf, i * 600);
    setInterval(createLeaf, 3000);

    // ========== PARALLAX NO HERO ==========
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    function handleParallax() {
        const scrolled = window.scrollY;
        const heroHeight = hero.offsetHeight;
        if (scrolled < heroHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / heroHeight) * 0.8;
        }
    }
    window.addEventListener('scroll', handleParallax);

    // ========== EFEITO DE INCLINAÇÃO NOS CARDS ==========
    const tiltCards = document.querySelectorAll('.intro-card, .data-card, .pillar-card, .product-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -3;
            const rotateY = (x - centerX) / centerX * 3;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ========== SCROLL PROGRESS BAR ==========
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed; top: 0; left: 0; height: 3px;
        background: linear-gradient(90deg, #2dd36f, #1a8a42, #e6b830);
        z-index: 9999; transition: width 0.1s linear; border-radius: 0 2px 2px 0;
        box-shadow: 0 0 10px rgba(45, 211, 111, 0.4);
    `;
    document.body.appendChild(progressBar);

    function updateProgressBar() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }
    window.addEventListener('scroll', updateProgressBar);

    // ========== TECLADO — ACESSIBILIDADE ==========
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ========== CURSOR PERSONALIZADO (DESKTOP) ==========
    if (window.matchMedia('(pointer: fine)').matches) {
        const cursor = document.createElement('div');
        cursor.style.cssText = `
            position: fixed; width: 20px; height: 20px;
            border: 2px solid rgba(45, 211, 111, 0.4); border-radius: 50%;
            pointer-events: none; z-index: 9998;
            transition: transform 0.15s ease, border-color 0.3s ease, box-shadow 0.3s ease;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        const interactiveElements = document.querySelectorAll('a, button, .intro-card, .data-card, .pillar-card, .product-card, .connection-node');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursor.style.borderColor = 'rgba(45, 211, 111, 0.7)';
                cursor.style.boxShadow = '0 0 15px rgba(45, 211, 111, 0.3)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = 'rgba(45, 211, 111, 0.4)';
                cursor.style.boxShadow = 'none';
            });
        });
    }

    // ========== EFEITO DE GLOW NOS TÍTULOS AO HOVER ==========
    const sectionTitles = document.querySelectorAll('.section-title, .timeline-title, .pillars-title, .products-title, .comparison-title');
    sectionTitles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            title.style.textShadow = '0 0 30px rgba(45, 211, 111, 0.2)';
        });
        title.addEventListener('mouseleave', () => {
            title.style.textShadow = 'none';
        });
    });

});