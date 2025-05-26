document.addEventListener('DOMContentLoaded', () => {
    // Menu Responsivo (Hamburger)
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

        // Fechar menu ao clicar em um link
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navList.setAttribute('data-visible', 'false');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Fechar menu ao clicar fora dele
        document.addEventListener('click', (event) => {
            // Verifica se o clique não foi dentro do navList e nem no navToggle
            if (!navList.contains(event.target) && !navToggle.contains(event.target) && navList.getAttribute('data-visible') === 'true') {
                navList.setAttribute('data-visible', 'false');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Animação de seções ao scroll (Intersection Observer API)
    // Aplica a animação slideInUp para a maioria das seções e scaleIn para a imagem "sobre"
    const sections = document.querySelectorAll('section:not(.hero-section)'); // Exclui a hero-section
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // Quando 20% da seção estiver visível
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated'); // Adiciona uma classe para ativar a animação CSS
                if (entry.target.id === 'sobre') {
                    entry.target.querySelector('.about-image img').classList.add('animated-scale');
                }
                observer.unobserve(entry.target); // Para animar apenas uma vez
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0'; // Define opacidade inicial para 0
        section.style.transform = 'translateY(50px)'; // Define a posição inicial para animação slideUp
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'; // Transição suave
        section.classList.add('animate-on-scroll'); // Adiciona uma classe para facilitar o CSS
        sectionObserver.observe(section);
    });

    // Adiciona as classes CSS para as animações controladas por JS
    const styleSheet = document.styleSheets[0]; // Pega a primeira folha de estilo
    styleSheet.insertRule(`
        .animate-on-scroll.animated {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `, styleSheet.cssRules.length);

    styleSheet.insertRule(`
        .about-image img.animated-scale {
            animation: scaleIn 1s forwards;
        }
    `, styleSheet.cssRules.length);


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

    // Lazy loading para todas as imagens (usando Intersection Observer)
    const lazyImages = document.querySelectorAll('img');

    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    // Se você usar data-src e data-srcset
                    // if (lazyImage.dataset.src) {
                    //     lazyImage.src = lazyImage.dataset.src;
                    // }
                    // if (lazyImage.dataset.srcset) {
                    //     lazyImage.srcset = lazyImage.dataset.srcset;
                    // }
                    lazyImage.classList.add('loaded'); // Adiciona classe para possíveis animações CSS após o carregamento
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback simples para navegadores sem Intersection Observer
        console.log('Intersection Observer não suportado, imagens carregadas normalmente.');
    }
});
