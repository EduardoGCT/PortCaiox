document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active');
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação do Slider Principal (Hero)
    const slides = document.querySelectorAll('.slide');
    const paginationDots = document.getElementById('pagination-dots');

    if (slides.length > 0 && paginationDots) {
        let currentSlide = 0;

        const updateActiveDot = (currentIndex) => {
            paginationDots.querySelectorAll('.dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
                dot.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
            });
        };

        const goToSlide = (slideIndex) => {
            if (slideIndex < 0 || slideIndex >= slides.length) {
                return;
            }

            slides[currentSlide].classList.remove('active');
            currentSlide = slideIndex;
            slides[currentSlide].classList.add('active');
            updateActiveDot(currentSlide);
        };

        slides.forEach((slide, index) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'dot';
            dot.setAttribute('aria-label', `Ir para o slide ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            paginationDots.appendChild(dot);
        });

        updateActiveDot(currentSlide);

        setInterval(() => {
            goToSlide((currentSlide + 1) % slides.length);
        }, 5000); // Troca de foto a cada 5 segundos
    }

    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Form submission simulation
    const form = document.getElementById('form-orcamento');
    const formMsg = document.querySelector('.form-message');

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            formMsg.innerHTML = '<p style="color: green; margin-top: 15px;">Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.</p>';
            form.reset();
            setTimeout(() => {
                formMsg.innerHTML = '';
            }, 5000);
        });
    }
});
