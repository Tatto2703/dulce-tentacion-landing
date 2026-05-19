/**
 * ==========================================
 * Dulce Tentación - script.js
 * ==========================================
 * ✔ IIFE para evitar variables globales
 * ✔ Namespace encapsulado
 * ✔ ES6+ moderno
 * ✔ FAQ interactivo
 * ✔ Slider dinámico
 * ✔ Countdown persistente
 * ✔ Popup newsletter
 * ✔ Persistencia avanzada formulario
 * ✔ Restauración automática de datos
 * ✔ Estado persistente de envío
 * ✔ Modal legal
 * ✔ Reveal animations
 * ✔ Scroll suave
 * ✔ Mejoras de accesibilidad
 * ==========================================
 */

(() => {

    'use strict';

    /**
     * ==========================================
     * SNIPPET 1 - Template literals + parámetros
     * ==========================================
     */
    const renderOffersFeed = ({
        label = "Especial",
        name,
        promo = 0
    }) => {

        const today = new Date().toLocaleDateString(
            'es-ES',
            {
                weekday: 'long'
            }
        );

        return `
            ✨ [${label}]
            Celebramos este ${today}
            con "${name}" con -${promo}%
        `;

    };

    /**
     * ==========================================
     * SNIPPET 2 - Spread + map
     * ==========================================
     */
    const logSectionIdentifiers = () => {

        const sections = [
            ...document.querySelectorAll('section')
        ];

        const ids = sections.map(
            section => section.id || 'sin-id'
        );

        console.log(
            '🍰 Secciones detectadas:',
            ids
        );

    };

    /**
     * ==========================================
     * SNIPPET 3 - filter + reduce
     * ==========================================
     */
    const computeStats = () => {

        const reviews = [
            { stars: 5, active: true },
            { stars: 4, active: true },
            { stars: 5, active: false },
            { stars: 5, active: true }
        ];

        const activeReviews = reviews.filter(
            review => review.active
        );

        const total = activeReviews.reduce(
            (acc, review) => acc + review.stars,
            0
        );

        const average =
            activeReviews.length > 0
                ? (total / activeReviews.length).toFixed(1)
                : '5.0';

        console.log(
            `⭐ Promedio actual: ${average}/5`
        );

    };

    /**
     * ==========================================
     * NAMESPACE PRINCIPAL
     * ==========================================
     */
    const DulceTentacion = {

        /**
         * ==========================================
         * ESTADO GLOBAL
         * ==========================================
         */
        state: {

            currentSliderIndex: 0,

            timeRemaining: 3600,

            formStorageKey: 'dt_form_data',

            formSentKey: 'dt_form_sent'

        },

        /**
         * ==========================================
         * INIT
         * ==========================================
         */
        init() {

            logSectionIdentifiers();

            computeStats();

            this.showGreeting();

            this.initNavbar();

            this.initReveal();

            this.initSmoothScroll();

            this.initFormPersistence();

            this.initSlider();

            this.initFAQ();

            this.initCountdown();

            this.initPopup();

            this.initLegalModal();

        },

        /**
         * ==========================================
         * MENSAJE CONSOLA
         * ==========================================
         */
        showGreeting() {

            const message = renderOffersFeed({

                label: 'DELICIA DEL DÍA',

                name: 'Mousse de Chocolate Belga',

                promo: 15

            });

            console.log(message);

        },

        /**
         * ==========================================
         * NAVBAR DINÁMICA
         * ==========================================
         */
        initNavbar() {

            const navbar =
                document.getElementById('navbar');

            if (!navbar) return;

            window.addEventListener(
                'scroll',
                () => {

                    if (window.scrollY > 50) {

                        navbar.classList.add('scrolled');

                    } else {

                        navbar.classList.remove('scrolled');

                    }

                }
            );

        },

        /**
         * ==========================================
         * REVEAL ANIMATIONS
         * ==========================================
         */
        initReveal() {

            const observer = new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                'reveal-visible'
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.15
                }

            );

            const elements = document.querySelectorAll(
                '.benefit-card, .product-card, .section-header'
            );

            elements.forEach(el => {

                el.style.opacity = '0';

                el.style.transform =
                    'translateY(20px)';

                el.style.transition =
                    'all 0.6s ease-out';

                observer.observe(el);

            });

        },

        /**
         * ==========================================
         * SCROLL SUAVE
         * ==========================================
         */
        initSmoothScroll() {

            const anchors =
                document.querySelectorAll(
                    'a[href^="#"]'
                );

            anchors.forEach(anchor => {

                anchor.addEventListener(
                    'click',
                    e => {

                        const href =
                            anchor.getAttribute('href');

                        if (
                            !href ||
                            href === '#'
                        ) {
                            return;
                        }

                        const target =
                            document.querySelector(href);

                        if (!target) return;

                        e.preventDefault();

                        window.scrollTo({

                            top:
                                target.offsetTop - 85,

                            behavior: 'smooth'

                        });

                    }
                );

            });

        },

        /**
        * ==========================================
        * FORMULARIO PERSISTENTE (CORREGIDO)
        * ==========================================
        */
        initFormPersistence() {

            const form = document.getElementById('landing-form');

            if (!form) return;

            const formSubmittedKey =
                this.state.formSubmittedKey;

            /**
            * Mostrar estado exitoso
            */
            const showSuccessState = () => {

                form.innerHTML = `
                    <div class="success-message">

                        <ion-icon
                            name="checkmark-circle-outline"
                            class="success-icon">
                        </ion-icon>

                        <h3>
                            ¡Gracias por tu solicitud! 🍰
                        </h3>

                        <p>
                            Tu formulario ya fue enviado correctamente.
                        </p>

                        <button id="resetFormState">
                            Enviar otra solicitud
                        </button>

                    </div>
                `;

                const resetBtn =
                    document.getElementById('resetFormState');

                if (!resetBtn) return;

                resetBtn.addEventListener('click', () => {

                    /**
                    * Limpiar datos guardados
                    */
                    localStorage.removeItem(formSubmittedKey);

                    this.state.inputsToPersist.forEach(id => {
                        localStorage.removeItem(id);
                    });

                    /**
                    * Recargar página
                    */
                    location.reload();

                });

            };

            /**
            * ==========================================
            * VERIFICAR SI YA FUE ENVIADO
            * ==========================================
            */
            const alreadySubmitted =
                localStorage.getItem(formSubmittedKey);

            if (alreadySubmitted === 'true') {

                showSuccessState();

                return;
            }

            /**
            * ==========================================
            * RECUPERAR DATOS GUARDADOS
            * ==========================================
            */
            this.state.inputsToPersist.forEach(id => {

                const field =
                    document.getElementById(id);

                if (!field) return;

                /**
                * Restaurar valor
                */
                const savedValue =
                    localStorage.getItem(id);

                if (savedValue) {
                    field.value = savedValue;
                }

                /**
                * Guardar mientras escribe
                */
                field.addEventListener('input', () => {

                    localStorage.setItem(
                        id,
                        field.value
                    );

                });

            });

            /**
            * ==========================================
            * SUBMIT DEL FORMULARIO
            * ==========================================
            */
            form.addEventListener('submit', e => {

                e.preventDefault();

                /**
                * Guardar estado enviado
                */
                localStorage.setItem(
                    formSubmittedKey,
                    'true'
                );

                /**
                * Guardar inputs finales
                */
                this.state.inputsToPersist.forEach(id => {

                    const field =
                        document.getElementById(id);

                    if (field) {

                        localStorage.setItem(
                            id,
                            field.value
                        );

                    }

                });

                /**
                * Mostrar mensaje inmediatamente
                */
                showSuccessState();

            });

        },

        /**
         * ==========================================
         * SLIDER TESTIMONIOS
         * ==========================================
         */
        initSlider() {

            const track =
                document.getElementById(
                    'dtTestimonialTrack'
                );

            const cards =
                document.querySelectorAll(
                    '.dt-testimonial-card'
                );

            const nextBtn =
                document.getElementById(
                    'dtNextBtn'
                );

            const prevBtn =
                document.getElementById(
                    'dtPrevBtn'
                );

            if (
                !track ||
                !nextBtn ||
                !prevBtn ||
                cards.length === 0
            ) {
                return;
            }

            const updateSlider = () => {

                track.style.transform =
                    `translateX(-${this.state.currentSliderIndex * 100}%)`;

            };

            nextBtn.addEventListener(
                'click',
                () => {

                    this.state.currentSliderIndex =
                        (
                            this.state.currentSliderIndex + 1
                        ) % cards.length;

                    updateSlider();

                }
            );

            prevBtn.addEventListener(
                'click',
                () => {

                    this.state.currentSliderIndex =
                        (
                            this.state.currentSliderIndex - 1 + cards.length
                        ) % cards.length;

                    updateSlider();

                }
            );

        },

        /**
         * ==========================================
         * FAQ ACCORDION
         * ==========================================
         */
        initFAQ() {

            const headers =
                document.querySelectorAll(
                    '.faq-header'
                );

            headers.forEach(header => {

                header.addEventListener(
                    'click',
                    () => {

                        const item =
                            header.parentElement;

                        if (!item) return;

                        const expanded =
                            header.getAttribute(
                                'aria-expanded'
                            ) === 'true';

                        document
                            .querySelectorAll('.faq-item')
                            .forEach(faq => {

                                faq.classList.remove(
                                    'active'
                                );

                                const faqHeader =
                                    faq.querySelector(
                                        '.faq-header'
                                    );

                                if (faqHeader) {

                                    faqHeader.setAttribute(
                                        'aria-expanded',
                                        'false'
                                    );

                                }

                            });

                        if (!expanded) {

                            item.classList.add(
                                'active'
                            );

                            header.setAttribute(
                                'aria-expanded',
                                'true'
                            );

                        }

                    }
                );

                /**
                 * Teclado accesible
                 */
                header.addEventListener(
                    'keydown',
                    e => {

                        if (
                            e.key === 'Enter' ||
                            e.key === ' '
                        ) {

                            e.preventDefault();

                            header.click();

                        }

                    }
                );

            });

        },

        /**
         * ==========================================
         * COUNTDOWN
         * ==========================================
         */
        initCountdown() {

            const saved =
                sessionStorage.getItem(
                    'dt_countdown'
                );

            if (saved) {

                this.state.timeRemaining =
                    parseInt(saved, 10);

            }

            const timerEl =
                document.getElementById(
                    'countdown-timer'
                );

            if (!timerEl) return;

            const updateDisplay = () => {

                const h =
                    Math.floor(
                        this.state.timeRemaining / 3600
                    );

                const m =
                    Math.floor(
                        (
                            this.state.timeRemaining % 3600
                        ) / 60
                    );

                const s =
                    this.state.timeRemaining % 60;

                timerEl.textContent =
                    `${String(h).padStart(2, '0')}:` +
                    `${String(m).padStart(2, '0')}:` +
                    `${String(s).padStart(2, '0')}`;

            };

            updateDisplay();

            const interval = setInterval(
                () => {

                    if (
                        this.state.timeRemaining <= 0
                    ) {

                        clearInterval(interval);

                        timerEl.textContent =
                            '00:00:00';

                        return;

                    }

                    this.state.timeRemaining--;

                    sessionStorage.setItem(
                        'dt_countdown',
                        this.state.timeRemaining
                    );

                    updateDisplay();

                },
                1000
            );

        },

        /**
         * ==========================================
         * POPUP NEWSLETTER
         * ==========================================
         */
        initPopup() {

            const popup =
                document.getElementById(
                    'dt-newsletter'
                );

            if (!popup) return;

            /**
             * Mostrar popup
             */
            setTimeout(() => {

                if (
                    sessionStorage.getItem(
                        'dt_popup_closed'
                    ) !== 'true'
                ) {

                    popup.classList.add('show');

                }

            }, 5000);

            /**
             * Botón cerrar
             */
            const closeBtn =
                document.querySelector(
                    '.close-popup'
                );

            if (closeBtn) {

                closeBtn.addEventListener(
                    'click',
                    () => {

                        popup.classList.remove(
                            'show'
                        );

                        sessionStorage.setItem(
                            'dt_popup_closed',
                            'true'
                        );

                    }
                );

            }

            /**
             * Persistencia email
             */
            const popupEmail =
                document.getElementById(
                    'popup-email'
                );

            if (popupEmail) {

                popupEmail.value =
                    localStorage.getItem(
                        'dt_newsletter_email'
                    ) || '';

                popupEmail.addEventListener(
                    'input',
                    () => {

                        localStorage.setItem(
                            'dt_newsletter_email',
                            popupEmail.value
                        );

                    }
                );

            }

            /**
             * Submit popup
             */
            const popupForm =
                document.getElementById(
                    'popup-form'
                );

            if (popupForm) {

                popupForm.addEventListener(
                    'submit',
                    e => {

                        e.preventDefault();

                        popup.innerHTML = `
                            <div class="popup-success">

                                <h4>
                                    ¡Inscripción exitosa! 💌
                                </h4>

                                <p>
                                    Ya haces parte de nuestra comunidad dulce.
                                </p>

                            </div>
                        `;

                        setTimeout(() => {

                            popup.classList.remove(
                                'show'
                            );

                            sessionStorage.setItem(
                                'dt_popup_closed',
                                'true'
                            );

                        }, 3000);

                    }
                );

            }

        },

        /**
         * ==========================================
         * MODAL LEGAL
         * ==========================================
         */
        initLegalModal() {

            const trigger =
                document.getElementById(
                    'legal-trigger'
                );

            const modal =
                document.getElementById(
                    'legal-modal'
                );

            const closeBtn =
                document.getElementById(
                    'close-legal-modal'
                );

            if (
                !trigger ||
                !modal ||
                !closeBtn
            ) {
                return;
            }

            /**
             * Abrir modal
             */
            trigger.addEventListener(
                'click',
                e => {

                    e.preventDefault();

                    modal.classList.add(
                        'active'
                    );

                    document.body.style.overflow =
                        'hidden';

                }
            );

            /**
             * Función cerrar
             */
            const closeModal = () => {

                modal.classList.remove(
                    'active'
                );

                document.body.style.overflow = '';

            };

            /**
             * Botón cerrar
             */
            closeBtn.addEventListener(
                'click',
                closeModal
            );

            /**
             * Click fuera
             */
            modal.addEventListener(
                'click',
                e => {

                    if (e.target === modal) {

                        closeModal();

                    }

                }
            );

            /**
             * Escape
             */
            document.addEventListener(
                'keydown',
                e => {

                    if (
                        e.key === 'Escape' &&
                        modal.classList.contains('active')
                    ) {

                        closeModal();

                    }

                }
            );

        }

    };

    /**
     * ==========================================
     * INICIALIZAR APP
     * ==========================================
     */
    document.addEventListener(
        'DOMContentLoaded',
        () => {

            DulceTentacion.init();

        }
    );

})();