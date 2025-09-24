// Automatic carousel for stack section
const carouselTrack = document.querySelector('.carousel-track');
if (carouselTrack) {
    const items = document.querySelectorAll('.carousel-item');
    const total = items.length;
    const visible = 2;
    let index = 0;

    // Clone first 'visible' items and append to the end for seamless loop
    for (let i = 0; i < visible; i++) {
        const clone = items[i].cloneNode(true);
        carouselTrack.appendChild(clone);
    }

    function moveCarousel() {
        index++;
        carouselTrack.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
        carouselTrack.style.transform = `translateX(-${index * 96}px)`;

        // Cuando llegue al final, reinicia el carrusel
        if (index * visible >= total + visible) {
            setTimeout(() => {
                carouselTrack.style.transition = 'none';
                carouselTrack.style.transform = 'translateX(0)';
                index = 0;
            }, 500);
        }
    }
    setInterval(moveCarousel, 2000);
}

// Simple smooth scroll for navigation
const links = document.querySelectorAll('nav a');
links.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const translations = {
    es: {
        aboutTitle: "Hola, soy Ignacio Freitas",
        aboutText: `Desarrollador web frontend con experiencia freelance creando interfaces modernas y funcionales en React,
HTML, CSS y JavaScript. Apasionado por el diseño centrado en el usuario y el código limpio. Comprometido
con el aprendizaje continuo y la mejora constante, busco mi primer rol en una empresa donde pueda
aportar valor y seguir creciendo profesionalmente. Gran capacidad para trabajar en equipo, adaptarme a
nuevos entornos y entregar soluciones efectivas.`,
        projectsTitle: "Proyectos",
        projects: [
            {
                title: "Congreso Cuore",
                desc: "Landing page realizada para congreso de cardiología dictado por el Hospital Italiano. Diseñado con HTML, CSS y Javascript.",
                link: "Ver Demo"
            },
            {
                title: "Memotest",
                desc: "Juego de memoria construido con JavaScript, HTML y CSS. Presenta un diseño limpio y animaciones suaves.",
                link: "Ver Demo"
            },
            {
                title: "Encontrarte",
                desc: "Aplicación en React para que los niños mejoren su inteligencia emocional a través de juegos interactivos.",
                link: "Próximamente"
            }
        ],
        stackTitle: "Tecnologías",
        footer: "Todos los derechos reservados." // español
    },
    en: {
        aboutTitle: "Hi, I'm Ignacio Freitas",
        aboutText: `Frontend web developer with freelance experience creating modern and functional interfaces using React,
HTML, CSS, and JavaScript. Passionate about user-centered design and clean code. Committed to continuous learning and improvement, I am seeking my first role in a company where I can add value and continue to grow professionally. Strong ability to work in teams, adapt to new environments, and deliver effective solutions.`,
        projectsTitle: "Projects",
        projects: [
            {
                title: "Cuore Congress",
                desc: "Landing page for a cardiology congress organized by Hospital Italiano. Designed with HTML, CSS, and JavaScript.",
                link: "View Demo"
            },
            {
                title: "Memotest",
                desc: "Memory game built with JavaScript, HTML, and CSS. Features a clean design and smooth animations.",
                link: "View Demo"
            },
            {
                title: "Encontrarte",
                desc: "React app for children to improve emotional intelligence through interactive games.",
                link: "Coming soon"
            }
        ],
        stackTitle: "Stack",
        footer: "All rights reserved."           // inglés
    }
};

let currentLang = 'es';

function updateLanguage() {
    // About section
    document.querySelector('#about h2').textContent = translations[currentLang].aboutTitle;
    if (document.querySelector('#about p')) {
        document.querySelector('#about p').textContent = translations[currentLang].aboutText;
    }
    // Projects section
    if (document.querySelector('#projects h2')) {
        document.querySelector('#projects h2').textContent = translations[currentLang].projectsTitle;
        const cards = document.querySelectorAll('.project-card');
        translations[currentLang].projects.forEach((proj, idx) => {
            if(cards[idx]) {
                cards[idx].querySelector('h3').textContent = proj.title;
                cards[idx].querySelector('p').textContent = proj.desc;
                const cardLink = cards[idx].querySelector('.card-link');
                if (cardLink) {
                    cardLink.textContent = proj.link;
                    cardLink.style.display = proj.link === "Próximamente" || proj.link === "Coming soon" ? "none" : "";
                }
                // Si hay un segundo <p> (para "Próximamente"/"Coming soon"), lo actualiza
                const ps = cards[idx].querySelectorAll('p');
                if (ps.length > 1) {
                    ps[1].textContent = proj.link;
                }
            }
        });
    }
    // Stack section
    const stackH2 = document.querySelector('#stack h2');
    if (stackH2) {
        stackH2.textContent = translations[currentLang].stackTitle;
    }
    const stackH2Span = document.querySelector('#stack h2 span');
    if (stackH2Span) {
        stackH2Span.textContent = translations[currentLang].stackTitle;
    }
    // Footer (texto estático)
    const footerP = document.getElementById('footer-text');
    if (footerP) {
        footerP.textContent = "© Ignacio Freitas. All rights reserved.";
    }
}

// Toggle button logic
const toggleBtn = document.getElementById('toggle-lang-btn');
toggleBtn.addEventListener('click', function () {
    toggleBtn.classList.toggle('active');
    currentLang = toggleBtn.classList.contains('active') ? 'en' : 'es';
    updateLanguage();
});

