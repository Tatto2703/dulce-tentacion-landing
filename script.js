/**
 * script.js - Dulce Tentación
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       VARIABLES
    ========================= */

    const navbar = document.getElementById('navbar');
    const form = document.getElementById('landing-form');

    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('correo');
    const tipoPedido = document.getElementById('tipoPedido');
    const mensaje = document.getElementById('mensaje');

    /* =========================
       NAVBAR SCROLL
    ========================= */

    window.addEventListener('scroll', () => {

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

    });

    /* =========================
       ANIMACIONES
    ========================= */

    const observerOptions = {
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('reveal-visible');
                revealObserver.unobserve(entry.target);

            }

        });

    }, observerOptions);

    const revealElements = document.querySelectorAll(
        '.benefit-card, .product-card, .section-header'
    );

    revealElements.forEach(el => {

        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';

        revealObserver.observe(el);

    });

    /* =========================
       RESTAURAR DATOS
    ========================= */

    if (nombre) {
        nombre.value = localStorage.getItem("lp_dulce_nombre") || "";
    }

    if (correo) {
        correo.value = localStorage.getItem("lp_dulce_correo") || "";
    }

    if (tipoPedido) {
        tipoPedido.value = localStorage.getItem("lp_dulce_tipo") || "";
    }

    if (mensaje) {
        mensaje.value = localStorage.getItem("lp_dulce_mensaje") || "";
    }

    /* =========================
       GUARDAR DATOS
    ========================= */

    if (nombre) {

        nombre.addEventListener("input", () => {

            localStorage.setItem(
                "lp_dulce_nombre",
                nombre.value
            );

        });

    }

    if (correo) {

        correo.addEventListener("input", () => {

            localStorage.setItem(
                "lp_dulce_correo",
                correo.value
            );

        });

    }

    if (tipoPedido) {

        tipoPedido.addEventListener("change", () => {

            localStorage.setItem(
                "lp_dulce_tipo",
                tipoPedido.value
            );

        });

    }

    if (mensaje) {

        mensaje.addEventListener("input", () => {

            localStorage.setItem(
                "lp_dulce_mensaje",
                mensaje.value
            );

        });

    }

    /* =========================
       ENVÍO FORMULARIO
    ========================= */

    if (form) {

        form.addEventListener('submit', (e) => {

            e.preventDefault();

            localStorage.setItem(
                "lp_dulce_convertido",
                "true"
            );

            localStorage.removeItem("lp_dulce_nombre");
            localStorage.removeItem("lp_dulce_correo");
            localStorage.removeItem("lp_dulce_tipo");
            localStorage.removeItem("lp_dulce_mensaje");

            const submitBtn = form.querySelector('button');

            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;

            setTimeout(() => {

                form.innerHTML = `
                    <div style="text-align: center; padding: 40px; background: #E8F5E9; border-radius: 20px;">
                        
                        <h3 style="margin-top: 15px; color: #2E7D32">
                            ¡Solicitud Enviada!
                        </h3>

                        <p style="margin-top: 10px">
                            Nos pondremos en contacto contigo en las próximas 24 horas.
                        </p>

                        <button 
                            class="btn btn-primary" 
                            style="margin-top: 20px"
                            onclick="location.reload()"
                        >
                            Regresar
                        </button>

                    </div>
                `;

            }, 2000);

        });

    }

    /* =========================
       SMOOTH SCROLL
    ========================= */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener('click', function (e) {

            e.preventDefault();

            const target = document.querySelector(
                this.getAttribute('href')
            );

            if (target) {

                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });

            }

        });

    });

    /* =========================
       SLIDER TESTIMONIOS
    ========================= */

    const track = document.getElementById('dtTestimonialTrack');
    const cards = document.querySelectorAll('.dt-testimonial-card');
    const nextBtn = document.getElementById('dtNextBtn');
    const prevBtn = document.getElementById('dtPrevBtn');

    if (track && nextBtn && prevBtn) {

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

    }

});