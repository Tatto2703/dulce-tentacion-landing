/**
 * script.js - Dulce Tentación
 * Lógica para efectos de scroll, animaciones de entrada y manejo del formulario.
 */

document.addEventListener('DOMContentLoaded', () => {
    /* =========================
       DETECCIÓN DE USUARIO CONVERTIDO
    ========================= */

    const usuarioConvertido = localStorage.getItem("lp_dulce_convertido");

    if (usuarioConvertido === "true") {

        const formContainer = document.querySelector('.contact-form');

        formContainer.innerHTML = `
            <div style="text-align:center; padding:40px;">
                <h3>¡Gracias por tu pedido! 🍰</h3>
                <p>Ya recibimos tu solicitud anteriormente.</p>
            </div>
        `;
    }
    const navbar = document.getElementById('navbar');
    const form = document.getElementById('landing-form');
    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('correo');
    const tipoPedido = document.getElementById('tipoPedido');
    const mensaje = document.getElementById('mensaje');
    // 1. Cambio de estilo del Navbar al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Animación de revelación suave al hacer scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                // Dejamos de observar después de la animación inicial
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplicamos animación a elementos clave
    const revealElements = document.querySelectorAll('.benefit-card, .product-card, .section-header');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        revealObserver.observe(el);
    });

    // Definimos la clase visible por JS para no romper el layout si el JS falla
    document.styleSheets[0].insertRule(`
        .reveal-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `, 0);

    // 3. Manejo de envío de formulario (Simulación)
    /* =========================
       RESTAURAR DATOS
    ========================= */

    window.addEventListener("load", () => {

        nombre.value = localStorage.getItem("lp_dulce_nombre") || "";
        correo.value = localStorage.getItem("lp_dulce_correo") || "";
        tipoPedido.value = localStorage.getItem("lp_dulce_tipo") || "";
        mensaje.value = localStorage.getItem("lp_dulce_mensaje") || "";

    });
    /* =========================
      GUARDAR AUTOMÁTICAMENTE
    ========================= */

    nombre.addEventListener("input", () => {
        localStorage.setItem("lp_dulce_nombre", nombre.value);
    });

    correo.addEventListener("input", () => {
      localStorage.setItem("lp_dulce_correo", correo.value);
    });

    tipoPedido.addEventListener("change", () => {
     localStorage.setItem("lp_dulce_tipo", tipoPedido.value);
    });

    mensaje.addEventListener("input", () => {
      localStorage.setItem("lp_dulce_mensaje", mensaje.value);
    });
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Animación de botón durante el envío
            const submitBtn = form.querySelector('button');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;

            // Simulación de API call (2 segundos de espera)
            localStorage.setItem("lp_dulce_convertido", "true");

            localStorage.removeItem("lp_dulce_nombre");
            localStorage.removeItem("lp_dulce_correo");
            localStorage.removeItem("lp_dulce_tipo");
            localStorage.removeItem("lp_dulce_mensaje");
            setTimeout(() => {
                form.innerHTML = `
                    <div style="text-align: center; padding: 40px; background: #E8F5E9; border-radius: 20px;">
                        <ion-icon name="checkmark-circle-outline" style="font-size: 50px; color: #4CAF50"></ion-icon>
                        <h3 style="margin-top: 15px; color: #2E7D32">¡Solicitud Enviada!</h3>
                        <p style="margin-top: 10px">Nos pondremos en contacto contigo en las próximas 24 horas.</p>
                        <button class="btn btn-primary" style="margin-top: 20px" onclick="location.reload()">Regresar</button>
                    </div>
                `;
            }, 2000);
        });
    }

    // 4. Smooth scroll para navegadores antiguos (opcional, ya manejado por CSS)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            //e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});