document.addEventListener('DOMContentLoaded', () => {
    // Menu Responsivo
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.getElementById('primary-navigation');

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            const visibility = navList.getAttribute('data-visible');
            if (visibility === 'false') {
                navList.setAttribute('data-visible', 'true');
                navToggle.setAttribute('aria-expanded', 'true');
            } else {
                navList.setAttribute('data-visible', 'false');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Fechar menu ao clicar fora (opcional, mas bom para UX)
        document.addEventListener('click', (event) => {
            if (!navList.contains(event.target) && !navToggle.contains(event.target) && navList.getAttribute('data-visible') === 'true') {
                navList.setAttribute('data-visible', 'false');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Fechar menu ao clicar em um link (para single-page applications)
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navList.setAttribute('data-visible', 'false');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Animação de seções ao scroll (Intersection Observer API)
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Quando 10% da seção estiver visível
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Adicione classes específicas para animações mais complexas por seção
                if (entry.target.id === 'sobre') {
                    entry.target.querySelector('.about-image img').style.animation = 'scaleIn 1s forwards';
                }
                // Adicione mais animações para outras seções conforme necessário
                observer.unobserve(entry.target); // Para animar apenas uma vez
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        // Excluímos a hero-section da animação inicial, pois ela já tem a sua
        if (section.id !== 'hero-section') {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            sectionObserver.observe(section);
        }
    });

    // Adicionando animação específica para o about-image
    const styleSheet = document.styleSheets[0];
    const keyframesRule = `@keyframes scaleIn {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }`;
    styleSheet.insertRule(keyframesRule, styleSheet.cssRules.length);

    // Validação de formulário de contato (exemplo básico)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                alert('Por favor, preencha todos os campos do formulário.');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Por favor, insira um endereço de e-mail válido.');
                return;
            }

            // Simular envio (em um ambiente real, você enviaria para um backend)
            console.log('Formulário enviado!', { name, email, message });
            alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');

            contactForm.reset(); // Limpa o formulário
        });
    }

    // Carregamento progressivo de imagens (lazy loading)
    const lazyImages = document.querySelectorAll('img');

    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    // lazyImage.src = lazyImage.dataset.src; // Se usar data-src
                    // lazyImage.srcset = lazyImage.dataset.srcset; // Se usar data-srcset
                    lazyImage.classList.add('loaded'); // Adiciona classe para animações CSS pós-carregamento
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback para navegadores sem Intersection Observer
        console.log('Intersection Observer não suportado, imagens carregadas normalmente.');
    }
});
