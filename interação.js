// Espera todo o conteúdo do HTML ser carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // ==================================================
    // FUNCIONALIDADE 1: BOTÃO DE TEMA (DARK/LIGHT MODE)
    // ==================================================
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const body = document.body;
        const themeIcon = themeToggle.querySelector('i');

        // Função para aplicar o tema salvo no localStorage
        const applySavedTheme = () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                body.classList.add('dark-theme');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                body.classList.remove('dark-theme');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        };

        // Evento de clique para o botão
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');

            // Salva a preferência do usuário e atualiza o ícone
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                localStorage.setItem('theme', 'light');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        });

        // Aplica o tema salvo quando a página carrega
        applySavedTheme();
    }


    // ==================================================
    // FUNCIONALIDADE 2: CARROSSEL AUTOMÁTICO DE CARDS
    // (Funciona na página inicial)
    // ==================================================
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        const cards = sliderContainer.querySelectorAll('.project-card');
        let currentIndex = 0;

        const showCard = (index) => {
            cards.forEach((card, i) => {
                card.classList.remove('active');
                if (i === index) {
                    card.classList.add('active');
                }
            });
        };

        const nextCard = () => {
            currentIndex = (currentIndex + 1) % cards.length;
            showCard(currentIndex);
        };

        if (cards.length > 0) {
            showCard(0); // Mostra o primeiro card inicialmente
            setInterval(nextCard, 15000); // Muda de card a cada 15 segundos
        }
    }


    // ==================================================
    // FUNCIONALIDADE 3: ANIMAÇÕES AO ROLAR A PÁGINA
    // (Fade-in/Slide-in para vários elementos)
    // ==================================================
    const elementsToAnimate = document.querySelectorAll('.problem-card, .solution-card, .case-section');
    if (elementsToAnimate.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        elementsToAnimate.forEach(el => observer.observe(el));
    }


    // ==================================================
    // FUNCIONALIDADE 4: CONTADOR ANIMADO PARA RESULTADOS
    // (Funciona na página de soluções/estudo de caso)
    // ==================================================
    const resultsList = document.querySelector('.results-list');
    if (resultsList) {
        const counters = resultsList.querySelectorAll('.result-value');

        const animateCounters = () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const speed = 200; // Quanto menor, mais rápido.
                const increment = target / speed;

                const updateCount = () => {
                    if (count < target) {
                        count += increment;
                        counter.innerText = Math.ceil(count);
                        requestAnimationFrame(updateCount); // Animação mais suave
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target); // Anima apenas uma vez
                }
            });
        }, {
            threshold: 0.5
        });

        counterObserver.observe(resultsList);
    }
    
    // ==================================================
    // FUNCIONALIDADE 5: FILTRO DA PÁGINA DE PORTFÓLIO
    // (Funciona na página de portfólio/filtros)
    // ==================================================
    const portfolioFilters = document.querySelector('.portfolio-filters');
    if (portfolioFilters) {
        const filterButtons = portfolioFilters.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.portfolio-grid-full .project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove a classe 'active' de todos os botões
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Adiciona a classe 'active' ao botão clicado
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                });
            });
        });
    }

});