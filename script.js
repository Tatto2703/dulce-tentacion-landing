/**
 * script.js - Dulce Tentación
 * Lógica para efectos de scroll, animaciones de entrada y manejo del formulario.
 */

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const form = document.getElementById('landing-form');

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
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Animación de botón durante el envío
            const submitBtn = form.querySelector('button');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;

            // Simulación de API call (2 segundos de espera)
            setTimeout(() => {
                form.innerHTML = `
                    <div style="text-align: center; padding: 40px; background: #E8F5E9; border-radius: 20px;">
                        <ion-icon name="checkmark-circle-outline" style="font-size: 50px; color: #4CAF50"></ion-icon>
                        <h3 style="margin-top: 15px; color: #2E7D32">¡Solicitud Enviada!</h3>
                        <p style="margin-top: 10px">Nos pondremos en contacto contigo en las próximas 24 horas.</p>
                        <button class="btn btn-primary" style="margin-top: 20px" onclick="location.reload()">Regresar</button>
                    </div>git add .
                `;
            }, 2000);
        });
    }

    // 4. Smooth scroll para navegadores antiguos (opcional, ya manejado por CSS)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
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