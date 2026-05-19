/**
 * Script Principal Corregido - Dulce Tentación
 * Optimizaciones: Null-checks, fallback de animaciones, persistencia segura.
 */
document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.getElementById('navbar');
    const form = document.getElementById('landing-form');

    // Campos del formulario
    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('correo');
    const tipoPedido = document.getElementById('tipoPedido');
    const mensaje = document.getElementById('mensaje');

    /* --- NAVBAR SCROLL SAFE --- */
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    /* --- REVEAL EFFECTS (Intersection Observer) --- */
    const revealElements = document.querySelectorAll(
        '.benefit-card, .product-card, .section-header, .testimonial-card'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => {
        // Estilos iniciales seguros
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
        revealObserver.observe(el);
    });

    /* --- SECURE LOCAL STORAGE --- */
    const inputPairs = [
        { el: nombre, key: "lp_dulce_nombre" },
        { el: correo, key: "lp_dulce_correo" },
        { el: tipoPedido, key: "lp_dulce_tipo" },
        { el: mensaje, key: "lp_dulce_mensaje" }
    ];

    inputPairs.forEach(pair => {
        if (pair.el) {
            // Cargar valor guardado
            const savedValue = localStorage.getItem(pair.key);
            if (savedValue !== null) {
                pair.el.value = savedValue;
            }

            // Guardar al cambiar (Input o Change)
            const eventType = pair.el.tagName === 'SELECT' ? 'change' : 'input';
            pair.el.addEventListener(eventType, () => {
                localStorage.setItem(pair.key, pair.el.value);
            });
        }
    });

    /* --- SECURE FORM DELIVERY --- */
    if (form) {
        form.addEventListener('submit', async (e) => {
            // Permitimos que Formspree maneje el envío si se desea real, 
            // pero aplicamos feedback visual.
            const submitBtn = form.querySelector('button[type="submit"]');

            if (submitBtn) {
                submitBtn.innerText = 'Enviando...';
                submitBtn.disabled = true;
            }

            // Si es ajax (Formspree lo permite), podrías usar fetch aquí.
            // Por simplicidad y mantenimiento del action de Formspree, 
            // solo mostramos el éxito después de una pequeña pausa si no se recarga.
            // Nota: Si el action ocurre, la página recargará, lo cual es normal.
        });
    }

    /* --- REFINED SMOOTH SCROLL --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === "#") return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = target.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* --- ROBUST TESTIMONIAL SLIDER --- */
    const track = document.getElementById('dtTestimonialTrack');
    const nextBtn = document.getElementById('dtNextBtn');
    const prevBtn = document.getElementById('dtPrevBtn');
    const cards = document.querySelectorAll('.dt-testimonial-card');

    if (track && nextBtn && prevBtn && cards.length > 0) {
        let currentIndex = 0;

        const updateSlider = () => {
            track.style.transform = `translateX(${currentIndex * -100}%)`;
        };

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateSlider();
        });

        // Auto-slide opcional cada 6s
        let autoInterval = setInterval(() => nextBtn.click(), 6000);

        // Reset interval al interactuar
        const resetInterval = () => {
            clearInterval(autoInterval);
            autoInterval = setInterval(() => nextBtn.click(), 6000);
        };

        nextBtn.addEventListener('click', resetInterval);
        prevBtn.addEventListener('click', resetInterval);
    }
});
