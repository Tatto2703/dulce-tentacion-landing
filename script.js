/**
 * script.js - Dulce Tentación
 * Funcionalidades:
 * - Navbar dinámica
 * - Animaciones reveal
 * - Persistencia formulario
 * - Estado enviado persistente
 * - Slider testimonios
 * - Smooth scroll
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       VARIABLES GENERALES
    ========================= */

    const navbar = document.getElementById('navbar');

    const form = document.getElementById('landing-form');

    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('correo');
    const tipoPedido = document.getElementById('tipoPedido');
    const mensaje = document.getElementById('mensaje');

    const FORM_SUBMITTED_KEY = "dt_form_already_submitted";

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
       ANIMACIONES REVEAL
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
       CLASE CSS DINÁMICA
    ========================= */

    if (document.styleSheets.length > 0) {

        document.styleSheets[0].insertRule(`
            .reveal-visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `, 0);

    }

    /* =========================
       FORMULARIO PERSISTENTE
    ========================= */

    function showSuccessState() {

        if (!form) return;

        form.innerHTML = `
            <div style="
                text-align:center;
                padding:40px;
                background: var(--white);
                border-radius:20px;
                border:1px solid var(--primary-light);
            ">

                <ion-icon 
                    name="checkmark-circle-outline"
                    style="
                        font-size:4rem;
                        color:var(--primary);
                    ">
                </ion-icon>

                <h3 style="
                    color:var(--brown);
                    margin-top:20px;
                ">
                    ¡Gracias por tu solicitud! 🍰
                </h3>

                <p style="
                    color:var(--text);
                    margin-top:10px;
                ">
                    Ya recibimos tu información correctamente.
                </p>

                <button
                    id="resetFormState"
                    style="
                        margin-top:20px;
                        background:none;
                        border:none;
                        color:var(--primary);
                        cursor:pointer;
                        text-decoration:underline;
                    "
                >
                    Enviar otra solicitud
                </button>

            </div>
        `;

        const resetBtn = document.getElementById("resetFormState");

        if (resetBtn) {

            resetBtn.addEventListener("click", () => {

                localStorage.removeItem(FORM_SUBMITTED_KEY);

                location.reload();

            });

        }

    }

    /* =========================
       SI YA ENVIÓ FORMULARIO
    ========================= */

    if (localStorage.getItem(FORM_SUBMITTED_KEY) === "true") {

        showSuccessState();

    }

    /* =========================
       GUARDAR DATOS FORMULARIO
    ========================= */

    const inputs = [
        "nombre",
        "correo",
        "tipoPedido",
        "mensaje"
    ];

    inputs.forEach(id => {

        const campo = document.getElementById(id);

        if (!campo) return;

        /* Restaurar */

        campo.value = localStorage.getItem(id) || "";

        /* Guardar */

        campo.addEventListener("input", () => {

            localStorage.setItem(id, campo.value);

        });

    });

    /* =========================
       ENVÍO FORMULARIO
    ========================= */

    if (form) {

        form.addEventListener("submit", () => {

            localStorage.setItem(
                FORM_SUBMITTED_KEY,
                "true"
            );

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

    if (track && nextBtn && prevBtn && cards.length > 0) {

        let currentIndex = 0;

        const updateSlider = () => {

            track.style.transform =
                `translateX(${currentIndex * -100}%)`;

        };

        nextBtn.addEventListener('click', () => {

            currentIndex =
                (currentIndex + 1) % cards.length;

            updateSlider();

        });

        prevBtn.addEventListener('click', () => {

            currentIndex =
                (currentIndex - 1 + cards.length) % cards.length;

            updateSlider();

        });

    }

    /* =========================
       FAQ ACCORDION
    ========================= */

    document.querySelectorAll('.faq-header').forEach(header => {

        header.addEventListener('click', () => {

            header.parentElement.classList.toggle('active');

        });

    });

    /* =========================
       COUNTDOWN
    ========================= */

    let time = 3600;

    setInterval(() => {

        if (time <= 0) return;

        time--;

        let h = Math.floor(time / 3600);

        let m = Math.floor((time % 3600) / 60);

        let s = time % 60;

        const timerEl =
            document.getElementById('countdown-timer');

        if (timerEl) {

            timerEl.innerText =
                `${h.toString().padStart(2, '0')}:` +
                `${m.toString().padStart(2, '0')}:` +
                `${s.toString().padStart(2, '0')}`;

        }

    }, 1000);

    /* =========================
       NEWSLETTER POPUP
    ========================= */

    setTimeout(() => {

        const popup =
            document.getElementById('dt-newsletter');

        if (popup) {

            popup.classList.add('show');

        }

    }, 5000);

    const closePopup =
        document.querySelector('.close-popup');

    if (closePopup) {

        closePopup.addEventListener('click', () => {

            const popup =
                document.getElementById('dt-newsletter');

            if (popup) {

                popup.classList.remove('show');

            }

        });

    }

});