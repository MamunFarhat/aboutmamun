// Theme Management
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Initialize theme from localStorage or default to light
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

// Theme toggle functionality
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Navigation
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .info-item, .stat-item');
animateElements.forEach(el => {
    observer.observe(el);
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
};

// Stats counter observer
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
        }
    });
}, { threshold: 0.5 });

const statNumbers = document.querySelectorAll('.stat-number');
statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Skill bar animation
const skillBarsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const width = entry.target.getAttribute('data-width');
            setTimeout(() => {
                entry.target.style.width = width + '%';
            }, 100);
        }
    });
}, { threshold: 0.5 });

const skillBars = document.querySelectorAll('.skill-progress');
skillBars.forEach(bar => {
    skillBarsObserver.observe(bar);
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Show success message (replace with actual form submission logic)
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        
        // Reset form
        this.reset();
    });
}

// Newsletter form submission
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        // Show success message (replace with actual subscription logic)
        showNotification('Thanks for subscribing! You\'ll receive updates soon.', 'success');
        
        // Reset form
        this.reset();
    });
}

// Email Pre-registration Modal
const emailModal = document.getElementById('emailModal');
const openEmailModalBtn = document.getElementById('openEmailModal');
const closeEmailModalBtn = document.getElementById('closeEmailModal');
const emailPreRegForm = document.getElementById('emailPreRegForm');
const successModal = document.getElementById('successModal');
const closeSuccessModalBtn = document.getElementById('closeSuccessModal');

// Open email modal
if (openEmailModalBtn) {
    openEmailModalBtn.addEventListener('click', () => {
        emailModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close email modal
if (closeEmailModalBtn) {
    closeEmailModalBtn.addEventListener('click', () => {
        emailModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close modal when clicking outside
if (emailModal) {
    emailModal.addEventListener('click', (e) => {
        if (e.target === emailModal) {
            emailModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Email pre-registration form submission
if (emailPreRegForm) {
    emailPreRegForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        // Close email modal
        emailModal.classList.remove('active');
        
        // Show success modal
        setTimeout(() => {
            successModal.classList.add('active');
        }, 300);
        
        // Reset form
        this.reset();
    });
}

// Close success modal
if (closeSuccessModalBtn) {
    closeSuccessModalBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close success modal when clicking outside
if (successModal) {
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (emailModal && emailModal.classList.contains('active')) {
            emailModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (successModal && successModal.classList.contains('active')) {
            successModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#d4af37' : '#e74c3c'};
        color: #0a0a0a;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 600;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .project-card,
    .skill-category,
    .timeline-item,
    .info-item,
    .stat-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .project-card.animate,
    .skill-category.animate,
    .timeline-item.animate,
    .info-item.animate,
    .stat-item.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// Add fade-in animation on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Project card hover effect enhancement
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth reveal animation for sections
const sections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    sectionObserver.observe(section);
});

// Add active state to navigation links based on scroll position
const updateActiveNavLink = () => {
    const sections = document.querySelectorAll('.section, #home');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', updateActiveNavLink);

// Add active class styles
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-link.active {
        color: var(--accent) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(activeStyle);

// Language Translation System
const translations = {
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            gallery: 'Gallery',
            projects: 'Projects',
            news: 'News',
            skills: 'Skills',
            experience: 'Experience',
            contact: 'Contact'
        },
        hero: {
            badge: 'GROUNDBREAKING CREATIVE PORTFOLIO',
            title1: 'COMMANDING',
            title2: 'ATTENTION.',
            subtitle: 'I don\'t just design; I command digital attention. Crafting luxury experiences that dominate the screen.',
            location: 'Based in India',
            profession: 'Full Stack & Editor',
            established: 'Est. 2023',
            viewWork: 'View My Work',
            getInTouch: 'Get In Touch',
            emailPreReg: 'Email Pre-registration'
        },
        about: {
            title: 'About Me',
            subtitle: 'Discover the journey behind the work',
            name: 'MD Mamun Akhtar',
            quote: 'I don\'t build websites; I build',
            quoteEmpire: 'empires',
            description: 'I don\'t just design; I command digital attention. Crafting luxury experiences that dominate the screen. On the way to Full Stack Dev & Editor, I transform ideas into reality through innovative design and cutting-edge technology.',
            featuredProjects: 'Featured Projects',
            yearsExperience: 'Years Experience',
            technologies: 'Technologies'
        },
        gallery: {
            title: 'Gallery',
            subtitle: 'Visual showcase of my work',
            projectShowcase: 'Project Showcase',
            designWork: 'Design Work',
            development: 'Development',
            mobileApps: 'Mobile Apps',
            webProjects: 'Web Projects',
            branding: 'Branding'
        },
        projects: {
            title: 'Featured Projects',
            subtitle: 'A showcase of my recent work',
            ecofoodwise: 'EcoFoodWise',
            ecofoodwiseDesc: 'Strategy & Design - App Development',
            dynamicEdit: 'Dynamic Edit',
            dynamicEditDesc: 'Interactive Content - Video Production',
            cinematicVisuals: 'Cinematic Visuals',
            cinematicVisualsDesc: 'Brand Identity - Art Direction',
            viewProject: 'View Project'
        },
        skills: {
            title: 'Skills & Expertise',
            subtitle: 'Domain Expertise - Web & Digital, Brand Authority',
            frontend: 'Frontend Development',
            backend: 'Backend & Database',
            design: 'Design & Video Editing'
        },
        news: {
            title: 'News & Events',
            subtitle: 'Latest updates and milestones',
            news: '【NEWS】',
            event: '【EVENT】',
            news1Title: 'EcoFoodWise Launch - Strategy & Design Excellence',
            news1Desc: 'Proud to announce the launch of EcoFoodWise, a revolutionary app development project showcasing strategic thinking and exceptional design. This project demonstrates my expertise in creating impactful digital experiences.',
            news2Title: 'Dynamic Edit - Video Production Mastery',
            news2Desc: 'Released Dynamic Edit, showcasing my skills in interactive content creation and video production. This project highlights the fusion of technical expertise and creative vision.',
            news3Title: 'Cinematic Visuals - Brand Identity Excellence',
            news3Desc: 'Completed Cinematic Visuals project, demonstrating mastery in brand identity and art direction. This work showcases the ability to create compelling visual narratives that command attention.',
            news4Title: 'Portfolio Established - Beginning the Journey',
            news4Desc: 'Established in 2023, beginning the journey as a Full Stack Developer & Editor. Committed to building digital empires and commanding attention through exceptional work.'
        },
        partners: {
            title: 'Partners & Clients',
            subtitle: 'Trusted by leading organizations'
        },
        experience: {
            title: 'Experience & Timeline',
            subtitle: 'My professional journey',
            exp1Title: 'B.Sc. Computer Science',
            exp1Company: 'Malda College',
            exp1Desc: 'Pursuing Bachelor\'s degree in Computer Science, building expertise in full-stack development and software engineering.',
            exp2Title: 'Higher Secondary',
            exp2Company: 'Naimouza High School',
            exp2Desc: 'Completed Higher Secondary education, laying the foundation for advanced studies in computer science.',
            exp3Title: 'Madhyamik',
            exp3Company: 'Bright Institute',
            exp3Desc: 'Completed secondary education, marking the beginning of my journey in technology and creative work.'
        },
        tags: {
            strategy: 'Strategy',
            design: 'Design',
            video: 'Video',
            editing: 'Editing',
            branding: 'Branding',
            visuals: 'Visuals'
        },
        modal: {
            emailPreRegTitle: 'Email Pre-registration',
            emailPreRegSubtitle: 'Stay updated with my latest projects and insights',
            checkbox1: 'Yes, I would like to receive newsletters, information and promotions. I will be able to withdraw my consent at any time.',
            checkbox2: 'By clicking on Pre-register, I confirm that I am 12 years old or over and that I accept the Privacy Policy and Terms of Use.',
            enterEmail: 'Enter your email address',
            preRegister: 'Pre-register',
            thanksTitle: 'THANKS FOR SUBSCRIBING!',
            thanksMessage: 'You have successfully registered!',
            thanksNote: 'More updates will be coming soon, please stay tuned!',
            headToDiscord: 'HEAD TO DISCORD',
            headToX: 'HEAD TO X',
            joinCommunity: 'Join the community for the latest updates!'
        },
        contact: {
            title: 'Get In Touch',
            subtitle: 'Let\'s create something amazing together',
            email: 'Email',
            location: 'Location',
            profession: 'Profession',
            stayUpdated: 'Stay Updated',
            subscribeDesc: 'Subscribe to receive updates on new projects and insights',
            enterEmail: 'Enter your email',
            subscribe: 'Subscribe',
            yourName: 'Your Name',
            yourEmail: 'Your Email',
            subject: 'Subject',
            yourMessage: 'Your Message',
            sendMessage: 'Send Message'
        },
        footer: {
            description: 'Full Stack Developer & Editor. Creating digital experiences that command attention.',
            quickLinks: 'Quick Links',
            legal: 'Legal',
            privacyPolicy: 'Privacy Policy',
            termsOfUse: 'Terms of Use',
            followUs: 'Follow Us',
            copyright: 'Imperial Edition. All rights reserved.'
        }
    },
    es: {
        nav: { home: 'Inicio', about: 'Acerca de', gallery: 'Galería', projects: 'Proyectos', news: 'Noticias', skills: 'Habilidades', experience: 'Experiencia', contact: 'Contacto' },
        hero: { badge: 'PORTFOLIO CREATIVO INNOVADOR', title1: 'COMANDANDO', title2: 'ATENCIÓN.', subtitle: 'No solo diseño; comando atención digital. Creando experiencias de lujo que dominan la pantalla.', location: 'Ubicado en India', profession: 'Full Stack y Editor', established: 'Est. 2023', viewWork: 'Ver Mi Trabajo', getInTouch: 'Contáctame', emailPreReg: 'Pre-registro de Email' },
        about: { title: 'Acerca de Mí', subtitle: 'Descubre el viaje detrás del trabajo', name: 'MD Mamun Akhtar', quote: 'No construyo sitios web; construyo', quoteEmpire: 'imperios', description: 'No solo diseño; comando atención digital. Creando experiencias de lujo que dominan la pantalla. En el camino a Full Stack Dev y Editor, transformo ideas en realidad a través de diseño innovador y tecnología de vanguardia.', featuredProjects: 'Proyectos Destacados', yearsExperience: 'Años de Experiencia', technologies: 'Tecnologías' },
        gallery: { title: 'Galería', subtitle: 'Muestra visual de mi trabajo', projectShowcase: 'Muestra de Proyectos', designWork: 'Trabajo de Diseño', development: 'Desarrollo', mobileApps: 'Aplicaciones Móviles', webProjects: 'Proyectos Web', branding: 'Marca' },
        projects: { title: 'Proyectos Destacados', subtitle: 'Una muestra de mi trabajo reciente', ecofoodwise: 'EcoFoodWise', ecofoodwiseDesc: 'Estrategia y Diseño - Desarrollo de Aplicaciones', dynamicEdit: 'Edición Dinámica', dynamicEditDesc: 'Contenido Interactivo - Producción de Video', cinematicVisuals: 'Visuales Cinematográficos', cinematicVisualsDesc: 'Identidad de Marca - Dirección de Arte', viewProject: 'Ver Proyecto' },
        skills: { title: 'Habilidades y Experiencia', subtitle: 'Experiencia en Dominio - Web y Digital, Autoridad de Marca', frontend: 'Desarrollo Frontend', backend: 'Backend y Base de Datos', design: 'Diseño y Edición de Video' },
        news: { 
            title: 'Noticias y Eventos', 
            subtitle: 'Últimas actualizaciones e hitos', 
            news: '【NOTICIAS】', 
            event: '【EVENTO】',
            news1Title: 'Lanzamiento de EcoFoodWise - Excelencia en Estrategia y Diseño',
            news1Desc: 'Orgulloso de anunciar el lanzamiento de EcoFoodWise, un proyecto revolucionario de desarrollo de aplicaciones que muestra pensamiento estratégico y diseño excepcional. Este proyecto demuestra mi experiencia en la creación de experiencias digitales impactantes.',
            news2Title: 'Dynamic Edit - Maestría en Producción de Video',
            news2Desc: 'Lanzado Dynamic Edit, mostrando mis habilidades en la creación de contenido interactivo y producción de video. Este proyecto destaca la fusión de experiencia técnica y visión creativa.',
            news3Title: 'Visuales Cinematográficos - Excelencia en Identidad de Marca',
            news3Desc: 'Completado el proyecto Cinematic Visuals, demostrando maestría en identidad de marca y dirección de arte. Este trabajo muestra la capacidad de crear narrativas visuales convincentes que captan la atención.',
            news4Title: 'Portafolio Establecido - Comenzando el Viaje',
            news4Desc: 'Establecido en 2023, comenzando el viaje como Desarrollador Full Stack y Editor. Comprometido a construir imperios digitales y captar atención a través de un trabajo excepcional.'
        },
        partners: { title: 'Socios y Clientes', subtitle: 'Confiado por organizaciones líderes' },
        experience: { 
            title: 'Experiencia y Cronología', 
            subtitle: 'Mi viaje profesional',
            exp1Title: 'B.Sc. Ciencias de la Computación',
            exp1Company: 'Colegio Malda',
            exp1Desc: 'Pursuing Bachelor\'s degree in Computer Science, building expertise in full-stack development and software engineering.',
            exp2Title: 'Educación Secundaria Superior',
            exp2Company: 'Escuela Secundaria Naimouza',
            exp2Desc: 'Completada la educación secundaria superior, sentando las bases para estudios avanzados en ciencias de la computación.',
            exp3Title: 'Madhyamik',
            exp3Company: 'Instituto Bright',
            exp3Desc: 'Completada la educación secundaria, marcando el comienzo de mi viaje en tecnología y trabajo creativo.'
        },
        tags: {
            strategy: 'Estrategia',
            design: 'Diseño',
            video: 'Video',
            editing: 'Edición',
            branding: 'Marca',
            visuals: 'Visuales'
        },
        modal: {
            emailPreRegTitle: 'Pre-registro de Email',
            emailPreRegSubtitle: 'Mantente actualizado con mis últimos proyectos e ideas',
            checkbox1: 'Sí, me gustaría recibir boletines, información y promociones. Podré retirar mi consentimiento en cualquier momento.',
            checkbox2: 'Al hacer clic en Pre-registrarse, confirmo que tengo 12 años o más y que acepto la Política de Privacidad y los Términos de Uso.',
            enterEmail: 'Ingresa tu dirección de correo electrónico',
            preRegister: 'Pre-registrarse',
            thanksTitle: '¡GRACIAS POR SUSCRIBIRTE!',
            thanksMessage: '¡Te has registrado exitosamente!',
            thanksNote: '¡Pronto habrá más actualizaciones, mantente atento!',
            headToDiscord: 'IR A DISCORD',
            headToX: 'IR A X',
            joinCommunity: '¡Únete a la comunidad para las últimas actualizaciones!'
        },
        contact: { title: 'Contáctame', subtitle: 'Creemos algo increíble juntos', email: 'Correo', location: 'Ubicación', profession: 'Profesión', stayUpdated: 'Mantente Actualizado', subscribeDesc: 'Suscríbete para recibir actualizaciones sobre nuevos proyectos e ideas', enterEmail: 'Ingresa tu correo', subscribe: 'Suscribirse', yourName: 'Tu Nombre', yourEmail: 'Tu Correo', subject: 'Asunto', yourMessage: 'Tu Mensaje', sendMessage: 'Enviar Mensaje' },
        footer: { description: 'Desarrollador Full Stack y Editor. Creando experiencias digitales que comandan atención.', quickLinks: 'Enlaces Rápidos', legal: 'Legal', privacyPolicy: 'Política de Privacidad', termsOfUse: 'Términos de Uso', followUs: 'Síguenos', copyright: 'Edición Imperial. Todos los derechos reservados.' }
    },
    fr: {
        nav: { home: 'Accueil', about: 'À Propos', gallery: 'Galerie', projects: 'Projets', news: 'Actualités', skills: 'Compétences', experience: 'Expérience', contact: 'Contact' },
        hero: { badge: 'PORTFOLIO CRÉATIF RÉVOLUTIONNAIRE', title1: 'COMMANDANT', title2: 'L\'ATTENTION.', subtitle: 'Je ne fais pas que concevoir; je commande l\'attention numérique. Créant des expériences de luxe qui dominent l\'écran.', location: 'Basé en Inde', profession: 'Full Stack et Éditeur', established: 'Étab. 2023', viewWork: 'Voir Mon Travail', getInTouch: 'Me Contacter', emailPreReg: 'Pré-inscription Email' },
        about: { title: 'À Propos de Moi', subtitle: 'Découvrez le parcours derrière le travail', name: 'MD Mamun Akhtar', quote: 'Je ne construis pas de sites web; je construis des', quoteEmpire: 'empires', description: 'Je ne fais pas que concevoir; je commande l\'attention numérique. Créant des expériences de luxe qui dominent l\'écran. Sur le chemin du Full Stack Dev et Éditeur, je transforme les idées en réalité grâce à un design innovant et une technologie de pointe.', featuredProjects: 'Projets en Vedette', yearsExperience: 'Années d\'Expérience', technologies: 'Technologies' },
        gallery: { title: 'Galerie', subtitle: 'Présentation visuelle de mon travail', projectShowcase: 'Présentation de Projets', designWork: 'Travail de Design', development: 'Développement', mobileApps: 'Applications Mobiles', webProjects: 'Projets Web', branding: 'Image de Marque' },
        projects: { title: 'Projets en Vedette', subtitle: 'Une présentation de mon travail récent', ecofoodwise: 'EcoFoodWise', ecofoodwiseDesc: 'Stratégie et Design - Développement d\'Applications', dynamicEdit: 'Édition Dynamique', dynamicEditDesc: 'Contenu Interactif - Production Vidéo', cinematicVisuals: 'Visuels Cinématographiques', cinematicVisualsDesc: 'Identité de Marque - Direction Artistique', viewProject: 'Voir le Projet' },
        skills: { title: 'Compétences et Expertise', subtitle: 'Expertise de Domaine - Web et Numérique, Autorité de Marque', frontend: 'Développement Frontend', backend: 'Backend et Base de Données', design: 'Design et Montage Vidéo' },
        news: { 
            title: 'Actualités et Événements', 
            subtitle: 'Dernières mises à jour et jalons', 
            news: '【ACTUALITÉS】', 
            event: '【ÉVÉNEMENT】',
            news1Title: 'Lancement d\'EcoFoodWise - Excellence en Stratégie et Design',
            news1Desc: 'Fier d\'annoncer le lancement d\'EcoFoodWise, un projet révolutionnaire de développement d\'applications démontrant une réflexion stratégique et un design exceptionnel. Ce projet démontre mon expertise dans la création d\'expériences numériques percutantes.',
            news2Title: 'Dynamic Edit - Maîtrise de la Production Vidéo',
            news2Desc: 'Sortie de Dynamic Edit, mettant en valeur mes compétences en création de contenu interactif et production vidéo. Ce projet met en lumière la fusion de l\'expertise technique et de la vision créative.',
            news3Title: 'Visuels Cinématographiques - Excellence de l\'Identité de Marque',
            news3Desc: 'Projet Cinematic Visuals terminé, démontrant la maîtrise de l\'identité de marque et de la direction artistique. Ce travail montre la capacité à créer des récits visuels convaincants qui captent l\'attention.',
            news4Title: 'Portfolio Établi - Début du Voyage',
            news4Desc: 'Établi en 2023, début du voyage en tant que Développeur Full Stack et Éditeur. Engagé à construire des empires numériques et à capturer l\'attention grâce à un travail exceptionnel.'
        },
        partners: { title: 'Partenaires et Clients', subtitle: 'Fait confiance par les organisations leaders' },
        experience: { 
            title: 'Expérience et Chronologie', 
            subtitle: 'Mon parcours professionnel',
            exp1Title: 'B.Sc. Informatique',
            exp1Company: 'Collège Malda',
            exp1Desc: 'Poursuivant un baccalauréat en informatique, développant une expertise en développement full-stack et en génie logiciel.',
            exp2Title: 'Enseignement Secondaire Supérieur',
            exp2Company: 'Lycée Naimouza',
            exp2Desc: 'Terminé l\'enseignement secondaire supérieur, posant les bases d\'études avancées en informatique.',
            exp3Title: 'Madhyamik',
            exp3Company: 'Institut Bright',
            exp3Desc: 'Terminé l\'enseignement secondaire, marquant le début de mon parcours dans la technologie et le travail créatif.'
        },
        tags: {
            strategy: 'Stratégie',
            design: 'Design',
            video: 'Vidéo',
            editing: 'Montage',
            branding: 'Image de Marque',
            visuals: 'Visuels'
        },
        modal: {
            emailPreRegTitle: 'Pré-inscription Email',
            emailPreRegSubtitle: 'Restez informé de mes derniers projets et idées',
            checkbox1: 'Oui, je souhaite recevoir des newsletters, des informations et des promotions. Je pourrai retirer mon consentement à tout moment.',
            checkbox2: 'En cliquant sur Pré-inscrire, je confirme que j\'ai 12 ans ou plus et que j\'accepte la Politique de Confidentialité et les Conditions d\'Utilisation.',
            enterEmail: 'Entrez votre adresse email',
            preRegister: 'Pré-inscrire',
            thanksTitle: 'MERCI DE VOUS ÊTRE INSCRIT!',
            thanksMessage: 'Vous vous êtes inscrit avec succès!',
            thanksNote: 'Plus de mises à jour arriveront bientôt, restez à l\'écoute!',
            headToDiscord: 'ALLER À DISCORD',
            headToX: 'ALLER À X',
            joinCommunity: 'Rejoignez la communauté pour les dernières mises à jour!'
        },
        contact: { title: 'Me Contacter', subtitle: 'Créons quelque chose d\'incroyable ensemble', email: 'Email', location: 'Localisation', profession: 'Profession', stayUpdated: 'Restez Informé', subscribeDesc: 'Abonnez-vous pour recevoir des mises à jour sur les nouveaux projets et idées', enterEmail: 'Entrez votre email', subscribe: 'S\'abonner', yourName: 'Votre Nom', yourEmail: 'Votre Email', subject: 'Sujet', yourMessage: 'Votre Message', sendMessage: 'Envoyer le Message' },
        footer: { description: 'Développeur Full Stack et Éditeur. Créant des expériences numériques qui commandent l\'attention.', quickLinks: 'Liens Rapides', legal: 'Légal', privacyPolicy: 'Politique de Confidentialité', termsOfUse: 'Conditions d\'Utilisation', followUs: 'Suivez-nous', copyright: 'Édition Impériale. Tous droits réservés.' }
    },
    de: {
        nav: { home: 'Startseite', about: 'Über Mich', gallery: 'Galerie', projects: 'Projekte', news: 'Neuigkeiten', skills: 'Fähigkeiten', experience: 'Erfahrung', contact: 'Kontakt' },
        hero: { badge: 'REVOLUTIONÄRES KREATIVES PORTFOLIO', title1: 'AUFMERKSAMKEIT', title2: 'KOMMANDIEREN.', subtitle: 'Ich entwerfe nicht nur; ich kommandiere digitale Aufmerksamkeit. Erschaffe Luxuserlebnisse, die den Bildschirm dominieren.', location: 'Basiert in Indien', profession: 'Full Stack & Editor', established: 'Est. 2023', viewWork: 'Meine Arbeit Ansehen', getInTouch: 'Kontakt Aufnehmen', emailPreReg: 'E-Mail Voranmeldung' },
        about: { title: 'Über Mich', subtitle: 'Entdecke die Reise hinter der Arbeit', name: 'MD Mamun Akhtar', quote: 'Ich baue keine Websites; ich baue', quoteEmpire: 'Imperien', description: 'Ich entwerfe nicht nur; ich kommandiere digitale Aufmerksamkeit. Erschaffe Luxuserlebnisse, die den Bildschirm dominieren. Auf dem Weg zum Full Stack Dev & Editor verwandle ich Ideen durch innovatives Design und modernste Technologie in Realität.', featuredProjects: 'Ausgewählte Projekte', yearsExperience: 'Jahre Erfahrung', technologies: 'Technologien' },
        gallery: { title: 'Galerie', subtitle: 'Visuelle Präsentation meiner Arbeit', projectShowcase: 'Projektpräsentation', designWork: 'Designarbeit', development: 'Entwicklung', mobileApps: 'Mobile Apps', webProjects: 'Webprojekte', branding: 'Markenbildung' },
        projects: { title: 'Ausgewählte Projekte', subtitle: 'Eine Präsentation meiner neuesten Arbeit', ecofoodwise: 'EcoFoodWise', ecofoodwiseDesc: 'Strategie & Design - App-Entwicklung', dynamicEdit: 'Dynamischer Schnitt', dynamicEditDesc: 'Interaktiver Inhalt - Videoproduktion', cinematicVisuals: 'Kinematische Visuals', cinematicVisualsDesc: 'Markenidentität - Art Direction', viewProject: 'Projekt Ansehen' },
        skills: { title: 'Fähigkeiten & Expertise', subtitle: 'Domain-Expertise - Web & Digital, Markenautorität', frontend: 'Frontend-Entwicklung', backend: 'Backend & Datenbank', design: 'Design & Videobearbeitung' },
        news: { 
            title: 'Neuigkeiten & Veranstaltungen', 
            subtitle: 'Neueste Updates und Meilensteine', 
            news: '【NEUIGKEITEN】', 
            event: '【VERANSTALTUNG】',
            news1Title: 'EcoFoodWise Launch - Strategie & Design Exzellenz',
            news1Desc: 'Stolz, den Launch von EcoFoodWise anzukündigen, ein revolutionäres App-Entwicklungsprojekt, das strategisches Denken und außergewöhnliches Design zeigt. Dieses Projekt demonstriert meine Expertise in der Erstellung wirkungsvoller digitaler Erfahrungen.',
            news2Title: 'Dynamic Edit - Videoproduktion Meisterschaft',
            news2Desc: 'Dynamic Edit veröffentlicht, zeigt meine Fähigkeiten in der Erstellung interaktiver Inhalte und Videoproduktion. Dieses Projekt hebt die Fusion von technischer Expertise und kreativer Vision hervor.',
            news3Title: 'Kinematische Visuals - Markenidentität Exzellenz',
            news3Desc: 'Cinematic Visuals Projekt abgeschlossen, zeigt Meisterschaft in Markenidentität und Art Direction. Diese Arbeit zeigt die Fähigkeit, überzeugende visuelle Erzählungen zu erstellen, die Aufmerksamkeit erregen.',
            news4Title: 'Portfolio Etabliert - Beginn der Reise',
            news4Desc: 'Etabliert im Jahr 2023, Beginn der Reise als Full Stack Entwickler & Editor. Verpflichtet, digitale Imperien aufzubauen und Aufmerksamkeit durch außergewöhnliche Arbeit zu erregen.'
        },
        partners: { title: 'Partner & Kunden', subtitle: 'Vertraut von führenden Organisationen' },
        experience: { 
            title: 'Erfahrung & Zeitachse', 
            subtitle: 'Meine berufliche Reise',
            exp1Title: 'B.Sc. Informatik',
            exp1Company: 'Malda College',
            exp1Desc: 'Bachelor-Abschluss in Informatik anstreben, Expertise in Full-Stack-Entwicklung und Software-Engineering aufbauen.',
            exp2Title: 'Höhere Sekundarstufe',
            exp2Company: 'Naimouza High School',
            exp2Desc: 'Höhere Sekundarstufe abgeschlossen, Grundlage für fortgeschrittene Studien in Informatik gelegt.',
            exp3Title: 'Madhyamik',
            exp3Company: 'Bright Institute',
            exp3Desc: 'Sekundarstufe abgeschlossen, markiert den Beginn meiner Reise in Technologie und kreativer Arbeit.'
        },
        tags: {
            strategy: 'Strategie',
            design: 'Design',
            video: 'Video',
            editing: 'Schnitt',
            branding: 'Markenbildung',
            visuals: 'Visuals'
        },
        modal: {
            emailPreRegTitle: 'E-Mail Voranmeldung',
            emailPreRegSubtitle: 'Bleiben Sie auf dem Laufenden mit meinen neuesten Projekten und Einblicken',
            checkbox1: 'Ja, ich möchte Newsletter, Informationen und Werbeaktionen erhalten. Ich kann meine Einwilligung jederzeit widerrufen.',
            checkbox2: 'Durch Klicken auf Voranmelden bestätige ich, dass ich 12 Jahre oder älter bin und die Datenschutzrichtlinie und Nutzungsbedingungen akzeptiere.',
            enterEmail: 'Geben Sie Ihre E-Mail-Adresse ein',
            preRegister: 'Voranmelden',
            thanksTitle: 'DANKE FÜR DIE ANMELDUNG!',
            thanksMessage: 'Sie haben sich erfolgreich registriert!',
            thanksNote: 'Weitere Updates kommen bald, bitte bleiben Sie dran!',
            headToDiscord: 'ZU DISCORD GEHEN',
            headToX: 'ZU X GEHEN',
            joinCommunity: 'Treten Sie der Community bei, um die neuesten Updates zu erhalten!'
        },
        contact: { title: 'Kontakt Aufnehmen', subtitle: 'Lass uns gemeinsam etwas Erstaunliches schaffen', email: 'E-Mail', location: 'Standort', profession: 'Beruf', stayUpdated: 'Auf dem Laufenden Bleiben', subscribeDesc: 'Abonnieren Sie, um Updates zu neuen Projekten und Einblicken zu erhalten', enterEmail: 'E-Mail eingeben', subscribe: 'Abonnieren', yourName: 'Ihr Name', yourEmail: 'Ihre E-Mail', subject: 'Betreff', yourMessage: 'Ihre Nachricht', sendMessage: 'Nachricht Senden' },
        footer: { description: 'Full Stack Entwickler & Editor. Erstelle digitale Erlebnisse, die Aufmerksamkeit kommandieren.', quickLinks: 'Schnelllinks', legal: 'Rechtliches', privacyPolicy: 'Datenschutzrichtlinie', termsOfUse: 'Nutzungsbedingungen', followUs: 'Folgen Sie Uns', copyright: 'Kaiserliche Ausgabe. Alle Rechte vorbehalten.' }
    },
    zh: {
        nav: { home: '首页', about: '关于', gallery: '画廊', projects: '项目', news: '新闻', skills: '技能', experience: '经验', contact: '联系' },
        hero: { badge: '突破性创意作品集', title1: '掌控', title2: '注意力。', subtitle: '我不仅仅是设计；我掌控数字注意力。打造主导屏幕的奢华体验。', location: '位于印度', profession: '全栈开发与编辑', established: '成立于 2023', viewWork: '查看我的作品', getInTouch: '联系我', emailPreReg: '邮件预注册' },
        about: { title: '关于我', subtitle: '发现作品背后的旅程', name: 'MD Mamun Akhtar', quote: '我不只是构建网站；我构建', quoteEmpire: '帝国', description: '我不仅仅是设计；我掌控数字注意力。打造主导屏幕的奢华体验。在成为全栈开发者和编辑的路上，我通过创新设计和前沿技术将想法转化为现实。', featuredProjects: '精选项目', yearsExperience: '年经验', technologies: '技术' },
        gallery: { title: '画廊', subtitle: '我的作品视觉展示', projectShowcase: '项目展示', designWork: '设计作品', development: '开发', mobileApps: '移动应用', webProjects: '网络项目', branding: '品牌' },
        projects: { title: '精选项目', subtitle: '我最近作品的展示', ecofoodwise: 'EcoFoodWise', ecofoodwiseDesc: '策略与设计 - 应用开发', dynamicEdit: '动态编辑', dynamicEditDesc: '互动内容 - 视频制作', cinematicVisuals: '电影视觉效果', cinematicVisualsDesc: '品牌标识 - 艺术指导', viewProject: '查看项目' },
        skills: { title: '技能与专长', subtitle: '领域专长 - 网络与数字，品牌权威', frontend: '前端开发', backend: '后端与数据库', design: '设计与视频编辑' },
        news: { 
            title: '新闻与活动', 
            subtitle: '最新更新和里程碑', 
            news: '【新闻】', 
            event: '【活动】',
            news1Title: 'EcoFoodWise 发布 - 策略与设计卓越',
            news1Desc: '很高兴宣布 EcoFoodWise 的发布，这是一个革命性的应用程序开发项目，展示了战略思维和卓越的设计。这个项目展示了我创建有影响力的数字体验的专业知识。',
            news2Title: 'Dynamic Edit - 视频制作精通',
            news2Desc: '发布了 Dynamic Edit，展示我在互动内容创作和视频制作方面的技能。这个项目突出了技术专长和创意愿景的融合。',
            news3Title: '电影视觉效果 - 品牌标识卓越',
            news3Desc: '完成了 Cinematic Visuals 项目，展示了在品牌标识和艺术指导方面的精通。这项工作展示了创建引人注目的视觉叙事的能力。',
            news4Title: '作品集建立 - 旅程开始',
            news4Desc: '成立于 2023 年，开始了作为全栈开发者和编辑的旅程。致力于通过卓越的工作构建数字帝国并吸引注意力。'
        },
        partners: { title: '合作伙伴与客户', subtitle: '受到领先组织信任' },
        experience: { 
            title: '经验与时间线', 
            subtitle: '我的职业旅程',
            exp1Title: '计算机科学学士',
            exp1Company: '马尔达学院',
            exp1Desc: '攻读计算机科学学士学位，在全栈开发和软件工程方面建立专业知识。',
            exp2Title: '高中',
            exp2Company: '奈莫扎高中',
            exp2Desc: '完成高中学业，为计算机科学的深入学习奠定了基础。',
            exp3Title: '中学',
            exp3Company: '光明学院',
            exp3Desc: '完成中学教育，标志着我技术和创意工作旅程的开始。'
        },
        tags: {
            strategy: '策略',
            design: '设计',
            video: '视频',
            editing: '编辑',
            branding: '品牌',
            visuals: '视觉效果'
        },
        modal: {
            emailPreRegTitle: '邮件预注册',
            emailPreRegSubtitle: '了解我的最新项目和见解',
            checkbox1: '是的，我希望接收新闻通讯、信息和促销活动。我可以随时撤回我的同意。',
            checkbox2: '点击预注册，我确认我年满 12 岁或以上，并且我接受隐私政策和使用条款。',
            enterEmail: '输入您的电子邮件地址',
            preRegister: '预注册',
            thanksTitle: '感谢订阅！',
            thanksMessage: '您已成功注册！',
            thanksNote: '更多更新即将推出，请继续关注！',
            headToDiscord: '前往 DISCORD',
            headToX: '前往 X',
            joinCommunity: '加入社区以获取最新更新！'
        },
        contact: { title: '联系我', subtitle: '让我们一起创造一些令人惊叹的东西', email: '电子邮件', location: '位置', profession: '职业', stayUpdated: '保持更新', subscribeDesc: '订阅以接收新项目和见解的更新', enterEmail: '输入您的电子邮件', subscribe: '订阅', yourName: '您的姓名', yourEmail: '您的电子邮件', subject: '主题', yourMessage: '您的消息', sendMessage: '发送消息' },
        footer: { description: '全栈开发者和编辑。创造掌控注意力的数字体验。', quickLinks: '快速链接', legal: '法律', privacyPolicy: '隐私政策', termsOfUse: '使用条款', followUs: '关注我们', copyright: '帝国版。保留所有权利。' }
    },
    ja: {
        nav: { home: 'ホーム', about: 'について', gallery: 'ギャラリー', projects: 'プロジェクト', news: 'ニュース', skills: 'スキル', experience: '経験', contact: 'お問い合わせ' },
        hero: { badge: '画期的なクリエイティブポートフォリオ', title1: '注目を', title2: '集める。', subtitle: '私は単にデザインするだけではありません。デジタルの注目を集めます。画面を支配する高級な体験を創造します。', location: 'インド在住', profession: 'フルスタック開発者＆エディター', established: '2023年設立', viewWork: '作品を見る', getInTouch: 'お問い合わせ', emailPreReg: 'メール事前登録' },
        about: { title: '私について', subtitle: '作品の背後にある旅を発見', name: 'MD Mamun Akhtar', quote: '私はウェブサイトを構築するのではなく、', quoteEmpire: '帝国', description: '私は単にデザインするだけではありません。デジタルの注目を集めます。画面を支配する高級な体験を創造します。フルスタック開発者＆エディターへの道のりで、革新的なデザインと最先端の技術を通じてアイデアを現実に変えます。', featuredProjects: '注目のプロジェクト', yearsExperience: '年の経験', technologies: 'テクノロジー' },
        gallery: { title: 'ギャラリー', subtitle: '私の作品の視覚的な展示', projectShowcase: 'プロジェクト展示', designWork: 'デザイン作品', development: '開発', mobileApps: 'モバイルアプリ', webProjects: 'ウェブプロジェクト', branding: 'ブランディング' },
        projects: { title: '注目のプロジェクト', subtitle: '最近の作品の展示', ecofoodwise: 'EcoFoodWise', ecofoodwiseDesc: '戦略とデザイン - アプリ開発', dynamicEdit: 'ダイナミック編集', dynamicEditDesc: 'インタラクティブコンテンツ - 動画制作', cinematicVisuals: 'シネマティックビジュアル', cinematicVisualsDesc: 'ブランドアイデンティティ - アートディレクション', viewProject: 'プロジェクトを見る' },
        skills: { title: 'スキルと専門知識', subtitle: 'ドメイン専門知識 - ウェブ＆デジタル、ブランド権威', frontend: 'フロントエンド開発', backend: 'バックエンド＆データベース', design: 'デザイン＆動画編集' },
        news: { 
            title: 'ニュース＆イベント', 
            subtitle: '最新の更新とマイルストーン', 
            news: '【ニュース】', 
            event: '【イベント】',
            news1Title: 'EcoFoodWise ローンチ - 戦略とデザインの卓越性',
            news1Desc: 'EcoFoodWise のローンチを発表できることを誇りに思います。これは戦略的思考と卓越したデザインを示す革新的なアプリ開発プロジェクトです。このプロジェクトは、影響力のあるデジタル体験を作成する私の専門知識を示しています。',
            news2Title: 'Dynamic Edit - 動画制作の熟練',
            news2Desc: 'Dynamic Edit をリリースし、インタラクティブコンテンツの作成と動画制作における私のスキルを示しています。このプロジェクトは、技術的専門知識と創造的ビジョンの融合を強調しています。',
            news3Title: 'シネマティックビジュアル - ブランドアイデンティティの卓越性',
            news3Desc: 'Cinematic Visuals プロジェクトを完了し、ブランドアイデンティティとアートディレクションにおける熟練を示しています。この作品は、注目を集める説得力のある視覚的物語を作成する能力を示しています。',
            news4Title: 'ポートフォリオ確立 - 旅の始まり',
            news4Desc: '2023年に確立され、Full Stack 開発者＆エディターとしての旅を始めました。卓越した作品を通じてデジタル帝国を構築し、注目を集めることに取り組んでいます。'
        },
        partners: { title: 'パートナー＆クライアント', subtitle: '主要組織から信頼されています' },
        experience: { 
            title: '経験とタイムライン', 
            subtitle: '私の専門的な旅',
            exp1Title: 'B.Sc. コンピュータサイエンス',
            exp1Company: 'マルダ大学',
            exp1Desc: 'コンピュータサイエンスの学士号を取得中で、フルスタック開発とソフトウェアエンジニアリングの専門知識を構築しています。',
            exp2Title: '高等学校',
            exp2Company: 'ナイモウザ高校',
            exp2Desc: '高等学校を修了し、コンピュータサイエンスの高度な研究の基盤を築きました。',
            exp3Title: 'マドヤミク',
            exp3Company: 'ブライト研究所',
            exp3Desc: '中等教育を修了し、テクノロジーと創造的な仕事における私の旅の始まりを示しました。'
        },
        tags: {
            strategy: '戦略',
            design: 'デザイン',
            video: '動画',
            editing: '編集',
            branding: 'ブランディング',
            visuals: 'ビジュアル'
        },
        modal: {
            emailPreRegTitle: 'メール事前登録',
            emailPreRegSubtitle: '私の最新のプロジェクトとインサイトで最新情報を入手',
            checkbox1: 'はい、ニュースレター、情報、プロモーションを受け取りたいと思います。いつでも同意を撤回できます。',
            checkbox2: '事前登録をクリックすることで、私は12歳以上であることを確認し、プライバシーポリシーと利用規約に同意します。',
            enterEmail: 'メールアドレスを入力',
            preRegister: '事前登録',
            thanksTitle: 'ご登録ありがとうございます！',
            thanksMessage: '登録が完了しました！',
            thanksNote: 'さらに多くの更新が間もなく公開されますので、お楽しみに！',
            headToDiscord: 'DISCORD へ',
            headToX: 'X へ',
            joinCommunity: '最新の更新のためにコミュニティに参加してください！'
        },
        contact: { title: 'お問い合わせ', subtitle: '一緒に素晴らしいものを作りましょう', email: 'メール', location: '場所', profession: '職業', stayUpdated: '最新情報を受け取る', subscribeDesc: '新しいプロジェクトとインサイトの更新を受け取るために購読', enterEmail: 'メールアドレスを入力', subscribe: '購読', yourName: 'お名前', yourEmail: 'メールアドレス', subject: '件名', yourMessage: 'メッセージ', sendMessage: 'メッセージを送信' },
        footer: { description: 'フルスタック開発者＆エディター。注目を集めるデジタル体験を創造します。', quickLinks: 'クイックリンク', legal: '法的', privacyPolicy: 'プライバシーポリシー', termsOfUse: '利用規約', followUs: 'フォローする', copyright: 'インペリアル版。全著作権所有。' }
    },
    ko: {
        nav: { home: '홈', about: '소개', gallery: '갤러리', projects: '프로젝트', news: '뉴스', skills: '기술', experience: '경험', contact: '연락처' },
        hero: { badge: '혁신적인 크리에이티브 포트폴리오', title1: '주의를', title2: '사로잡다.', subtitle: '저는 단순히 디자인하는 것이 아닙니다. 디지털 주의를 사로잡습니다. 화면을 지배하는 럭셔리한 경험을 만듭니다.', location: '인도 거주', profession: '풀스택 개발자 및 에디터', established: '2023년 설립', viewWork: '내 작품 보기', getInTouch: '연락하기', emailPreReg: '이메일 사전 등록' },
        about: { title: '소개', subtitle: '작업 뒤에 있는 여정을 발견하세요', name: 'MD Mamun Akhtar', quote: '저는 웹사이트를 구축하는 것이 아니라', quoteEmpire: '제국', description: '저는 단순히 디자인하는 것이 아닙니다. 디지털 주의를 사로잡습니다. 화면을 지배하는 럭셔리한 경험을 만듭니다. 풀스택 개발자 및 에디터로 가는 길에서 혁신적인 디자인과 최첨단 기술을 통해 아이디어를 현실로 변환합니다.', featuredProjects: '주요 프로젝트', yearsExperience: '년 경험', technologies: '기술' },
        gallery: { title: '갤러리', subtitle: '내 작품의 시각적 쇼케이스', projectShowcase: '프로젝트 쇼케이스', designWork: '디자인 작업', development: '개발', mobileApps: '모바일 앱', webProjects: '웹 프로젝트', branding: '브랜딩' },
        projects: { title: '주요 프로젝트', subtitle: '최근 작품의 쇼케이스', ecofoodwise: 'EcoFoodWise', ecofoodwiseDesc: '전략 및 디자인 - 앱 개발', dynamicEdit: '다이나믹 편집', dynamicEditDesc: '인터랙티브 콘텐츠 - 비디오 제작', cinematicVisuals: '시네마틱 비주얼', cinematicVisualsDesc: '브랜드 아이덴티티 - 아트 디렉션', viewProject: '프로젝트 보기' },
        skills: { title: '기술 및 전문성', subtitle: '도메인 전문성 - 웹 및 디지털, 브랜드 권위', frontend: '프론트엔드 개발', backend: '백엔드 및 데이터베이스', design: '디자인 및 비디오 편집' },
        news: { 
            title: '뉴스 및 이벤트', 
            subtitle: '최신 업데이트 및 마일스톤', 
            news: '【뉴스】', 
            event: '【이벤트】',
            news1Title: 'EcoFoodWise 출시 - 전략 및 디자인 우수성',
            news1Desc: '전략적 사고와 탁월한 디자인을 보여주는 혁신적인 앱 개발 프로젝트인 EcoFoodWise의 출시를 발표하게 되어 자랑스럽습니다. 이 프로젝트는 영향력 있는 디지털 경험을 만드는 제 전문성을 보여줍니다.',
            news2Title: 'Dynamic Edit - 비디오 제작 숙련도',
            news2Desc: 'Dynamic Edit를 출시하여 인터랙티브 콘텐츠 제작 및 비디오 제작에서의 제 기술을 보여줍니다. 이 프로젝트는 기술적 전문성과 창의적 비전의 융합을 강조합니다.',
            news3Title: '시네마틱 비주얼 - 브랜드 아이덴티티 우수성',
            news3Desc: 'Cinematic Visuals 프로젝트를 완료하여 브랜드 아이덴티티와 아트 디렉션에서의 숙련도를 보여줍니다. 이 작업은 주의를 끄는 설득력 있는 시각적 내러티브를 만드는 능력을 보여줍니다.',
            news4Title: '포트폴리오 설립 - 여정의 시작',
            news4Desc: '2023년에 설립되어 Full Stack 개발자 및 에디터로서의 여정을 시작했습니다. 탁월한 작업을 통해 디지털 제국을 구축하고 주의를 끄는 데 전념하고 있습니다.'
        },
        partners: { title: '파트너 및 클라이언트', subtitle: '주요 조직의 신뢰를 받고 있습니다' },
        experience: { 
            title: '경험 및 타임라인', 
            subtitle: '내 전문적인 여정',
            exp1Title: 'B.Sc. 컴퓨터 과학',
            exp1Company: '말다 대학',
            exp1Desc: '컴퓨터 과학 학사 학위를 추구하며 풀스택 개발 및 소프트웨어 엔지니어링의 전문성을 구축하고 있습니다.',
            exp2Title: '고등학교',
            exp2Company: '나이모우자 고등학교',
            exp2Desc: '고등학교 교육을 완료하여 컴퓨터 과학의 고급 연구를 위한 기초를 마련했습니다.',
            exp3Title: '마드야미크',
            exp3Company: '브라이트 연구소',
            exp3Desc: '중등 교육을 완료하여 기술 및 창의적 작업에서의 제 여정의 시작을 표시했습니다.'
        },
        tags: {
            strategy: '전략',
            design: '디자인',
            video: '비디오',
            editing: '편집',
            branding: '브랜딩',
            visuals: '비주얼'
        },
        modal: {
            emailPreRegTitle: '이메일 사전 등록',
            emailPreRegSubtitle: '내 최신 프로젝트 및 인사이트로 업데이트 유지',
            checkbox1: '예, 뉴스레터, 정보 및 프로모션을 받고 싶습니다. 언제든지 동의를 철회할 수 있습니다.',
            checkbox2: '사전 등록을 클릭하면 12세 이상이며 개인정보 보호정책 및 이용약관에 동의함을 확인합니다.',
            enterEmail: '이메일 주소 입력',
            preRegister: '사전 등록',
            thanksTitle: '구독해 주셔서 감사합니다!',
            thanksMessage: '성공적으로 등록되었습니다!',
            thanksNote: '곧 더 많은 업데이트가 제공될 예정이니 계속 지켜봐 주세요!',
            headToDiscord: 'DISCORD로 이동',
            headToX: 'X로 이동',
            joinCommunity: '최신 업데이트를 위해 커뮤니티에 가입하세요!'
        },
        contact: { title: '연락하기', subtitle: '함께 놀라운 것을 만들어봅시다', email: '이메일', location: '위치', profession: '직업', stayUpdated: '업데이트 받기', subscribeDesc: '새 프로젝트 및 인사이트에 대한 업데이트를 받으려면 구독하세요', enterEmail: '이메일 입력', subscribe: '구독', yourName: '이름', yourEmail: '이메일', subject: '제목', yourMessage: '메시지', sendMessage: '메시지 보내기' },
        footer: { description: '풀스택 개발자 및 에디터. 주의를 사로잡는 디지털 경험을 만듭니다.', quickLinks: '빠른 링크', legal: '법적', privacyPolicy: '개인정보 보호정책', termsOfUse: '이용 약관', followUs: '팔로우', copyright: '임페리얼 에디션. 모든 권리 보유.' }
    },
    pt: {
        nav: { home: 'Início', about: 'Sobre', gallery: 'Galeria', projects: 'Projetos', news: 'Notícias', skills: 'Habilidades', experience: 'Experiência', contact: 'Contato' },
        hero: { badge: 'PORTFÓLIO CRIATIVO REVOLUCIONÁRIO', title1: 'COMANDANDO', title2: 'ATENÇÃO.', subtitle: 'Eu não apenas projeto; comando atenção digital. Criando experiências de luxo que dominam a tela.', location: 'Baseado na Índia', profession: 'Full Stack e Editor', established: 'Est. 2023', viewWork: 'Ver Meu Trabalho', getInTouch: 'Entre em Contato', emailPreReg: 'Pré-registro de Email' },
        about: { title: 'Sobre Mim', subtitle: 'Descubra a jornada por trás do trabalho', name: 'MD Mamun Akhtar', quote: 'Eu não construo sites; construo', quoteEmpire: 'impérios', description: 'Eu não apenas projeto; comando atenção digital. Criando experiências de luxo que dominam a tela. No caminho para Full Stack Dev e Editor, transformo ideias em realidade através de design inovador e tecnologia de ponta.', featuredProjects: 'Projetos em Destaque', yearsExperience: 'Anos de Experiência', technologies: 'Tecnologias' },
        gallery: { title: 'Galeria', subtitle: 'Mostra visual do meu trabalho', projectShowcase: 'Mostra de Projetos', designWork: 'Trabalho de Design', development: 'Desenvolvimento', mobileApps: 'Aplicativos Móveis', webProjects: 'Projetos Web', branding: 'Marca' },
        projects: { title: 'Projetos em Destaque', subtitle: 'Uma mostra do meu trabalho recente', ecofoodwise: 'EcoFoodWise', ecofoodwiseDesc: 'Estratégia e Design - Desenvolvimento de Aplicativos', dynamicEdit: 'Edição Dinâmica', dynamicEditDesc: 'Conteúdo Interativo - Produção de Vídeo', cinematicVisuals: 'Visuais Cinematográficos', cinematicVisualsDesc: 'Identidade de Marca - Direção de Arte', viewProject: 'Ver Projeto' },
        skills: { title: 'Habilidades e Expertise', subtitle: 'Expertise de Domínio - Web e Digital, Autoridade de Marca', frontend: 'Desenvolvimento Frontend', backend: 'Backend e Banco de Dados', design: 'Design e Edição de Vídeo' },
        news: { 
            title: 'Notícias e Eventos', 
            subtitle: 'Últimas atualizações e marcos', 
            news: '【NOTÍCIAS】', 
            event: '【EVENTO】',
            news1Title: 'Lançamento do EcoFoodWise - Excelência em Estratégia e Design',
            news1Desc: 'Orgulhoso de anunciar o lançamento do EcoFoodWise, um projeto revolucionário de desenvolvimento de aplicativos que demonstra pensamento estratégico e design excepcional. Este projeto demonstra minha expertise em criar experiências digitais impactantes.',
            news2Title: 'Dynamic Edit - Maestria em Produção de Vídeo',
            news2Desc: 'Lançado o Dynamic Edit, mostrando minhas habilidades em criação de conteúdo interativo e produção de vídeo. Este projeto destaca a fusão de expertise técnica e visão criativa.',
            news3Title: 'Visuais Cinematográficos - Excelência em Identidade de Marca',
            news3Desc: 'Projeto Cinematic Visuals concluído, demonstrando maestria em identidade de marca e direção de arte. Este trabalho mostra a capacidade de criar narrativas visuais convincentes que capturam atenção.',
            news4Title: 'Portfólio Estabelecido - Início da Jornada',
            news4Desc: 'Estabelecido em 2023, iniciando a jornada como Desenvolvedor Full Stack e Editor. Comprometido em construir impérios digitais e capturar atenção através de trabalho excepcional.'
        },
        partners: { title: 'Parceiros e Clientes', subtitle: 'Confiado por organizações líderes' },
        experience: { 
            title: 'Experiência e Linha do Tempo', 
            subtitle: 'Minha jornada profissional',
            exp1Title: 'B.Sc. Ciência da Computação',
            exp1Company: 'Colégio Malda',
            exp1Desc: 'Pursuing Bachelor\'s degree in Computer Science, building expertise in full-stack development and software engineering.',
            exp2Title: 'Ensino Médio',
            exp2Company: 'Escola Secundária Naimouza',
            exp2Desc: 'Completado o ensino médio, estabelecendo a base para estudos avançados em ciência da computação.',
            exp3Title: 'Madhyamik',
            exp3Company: 'Instituto Bright',
            exp3Desc: 'Completado o ensino secundário, marcando o início da minha jornada em tecnologia e trabalho criativo.'
        },
        tags: {
            strategy: 'Estratégia',
            design: 'Design',
            video: 'Vídeo',
            editing: 'Edição',
            branding: 'Marca',
            visuals: 'Visuais'
        },
        modal: {
            emailPreRegTitle: 'Pré-registro de Email',
            emailPreRegSubtitle: 'Mantenha-se atualizado com meus últimos projetos e insights',
            checkbox1: 'Sim, gostaria de receber newsletters, informações e promoções. Poderei retirar meu consentimento a qualquer momento.',
            checkbox2: 'Ao clicar em Pré-registrar, confirmo que tenho 12 anos ou mais e que aceito a Política de Privacidade e os Termos de Uso.',
            enterEmail: 'Digite seu endereço de email',
            preRegister: 'Pré-registrar',
            thanksTitle: 'OBRIGADO POR SE INSCREVER!',
            thanksMessage: 'Você se registrou com sucesso!',
            thanksNote: 'Mais atualizações em breve, fique atento!',
            headToDiscord: 'IR PARA DISCORD',
            headToX: 'IR PARA X',
            joinCommunity: 'Junte-se à comunidade para as últimas atualizações!'
        },
        contact: { title: 'Entre em Contato', subtitle: 'Vamos criar algo incrível juntos', email: 'Email', location: 'Localização', profession: 'Profissão', stayUpdated: 'Mantenha-se Atualizado', subscribeDesc: 'Inscreva-se para receber atualizações sobre novos projetos e insights', enterEmail: 'Digite seu email', subscribe: 'Inscrever-se', yourName: 'Seu Nome', yourEmail: 'Seu Email', subject: 'Assunto', yourMessage: 'Sua Mensagem', sendMessage: 'Enviar Mensagem' },
        footer: { description: 'Desenvolvedor Full Stack e Editor. Criando experiências digitais que comandam atenção.', quickLinks: 'Links Rápidos', legal: 'Legal', privacyPolicy: 'Política de Privacidade', termsOfUse: 'Termos de Uso', followUs: 'Siga-nos', copyright: 'Edição Imperial. Todos os direitos reservados.' }
    },
    it: {
        nav: { home: 'Home', about: 'Chi Sono', gallery: 'Galleria', projects: 'Progetti', news: 'Notizie', skills: 'Competenze', experience: 'Esperienza', contact: 'Contatto' },
        hero: { badge: 'PORTFOLIO CREATIVO RIVOLUZIONARIO', title1: 'COMANDANDO', title2: 'ATTENZIONE.', subtitle: 'Non progetto solo; comando l\'attenzione digitale. Creando esperienze di lusso che dominano lo schermo.', location: 'Basato in India', profession: 'Full Stack e Editor', established: 'Fond. 2023', viewWork: 'Vedi Il Mio Lavoro', getInTouch: 'Contattami', emailPreReg: 'Pre-registrazione Email' },
        about: { title: 'Chi Sono', subtitle: 'Scopri il viaggio dietro il lavoro', name: 'MD Mamun Akhtar', quote: 'Non costruisco siti web; costruisco', quoteEmpire: 'imperi', description: 'Non progetto solo; comando l\'attenzione digitale. Creando esperienze di lusso che dominano lo schermo. Sulla strada per Full Stack Dev e Editor, trasformo le idee in realtà attraverso design innovativo e tecnologia all\'avanguardia.', featuredProjects: 'Progetti in Evidenza', yearsExperience: 'Anni di Esperienza', technologies: 'Tecnologie' },
        gallery: { title: 'Galleria', subtitle: 'Mostra visiva del mio lavoro', projectShowcase: 'Mostra Progetti', designWork: 'Lavoro di Design', development: 'Sviluppo', mobileApps: 'App Mobili', webProjects: 'Progetti Web', branding: 'Branding' },
        projects: { title: 'Progetti in Evidenza', subtitle: 'Una mostra del mio lavoro recente', ecofoodwise: 'EcoFoodWise', ecofoodwiseDesc: 'Strategia e Design - Sviluppo App', dynamicEdit: 'Montaggio Dinamico', dynamicEditDesc: 'Contenuto Interattivo - Produzione Video', cinematicVisuals: 'Visuali Cinematografiche', cinematicVisualsDesc: 'Identità di Marca - Direzione Artistica', viewProject: 'Vedi Progetto' },
        skills: { title: 'Competenze e Expertise', subtitle: 'Expertise di Dominio - Web e Digitale, Autorità di Marca', frontend: 'Sviluppo Frontend', backend: 'Backend e Database', design: 'Design e Montaggio Video' },
        news: { 
            title: 'Notizie ed Eventi', 
            subtitle: 'Ultimi aggiornamenti e traguardi', 
            news: '【NOTIZIE】', 
            event: '【EVENTO】',
            news1Title: 'Lancio di EcoFoodWise - Eccellenza in Strategia e Design',
            news1Desc: 'Orgoglioso di annunciare il lancio di EcoFoodWise, un progetto rivoluzionario di sviluppo di app che dimostra pensiero strategico e design eccezionale. Questo progetto dimostra la mia competenza nella creazione di esperienze digitali di impatto.',
            news2Title: 'Dynamic Edit - Maestria nella Produzione Video',
            news2Desc: 'Rilasciato Dynamic Edit, mostrando le mie abilità nella creazione di contenuti interattivi e produzione video. Questo progetto evidenzia la fusione di competenza tecnica e visione creativa.',
            news3Title: 'Visuali Cinematografiche - Eccellenza nell\'Identità del Brand',
            news3Desc: 'Progetto Cinematic Visuals completato, dimostrando maestria nell\'identità del brand e direzione artistica. Questo lavoro mostra la capacità di creare narrative visive convincenti che catturano l\'attenzione.',
            news4Title: 'Portfolio Stabilito - Inizio del Viaggio',
            news4Desc: 'Stabilito nel 2023, iniziando il viaggio come Sviluppatore Full Stack e Editor. Impegnato a costruire imperi digitali e catturare l\'attenzione attraverso un lavoro eccezionale.'
        },
        partners: { title: 'Partner e Clienti', subtitle: 'Fidato da organizzazioni leader' },
        experience: { 
            title: 'Esperienza e Timeline', 
            subtitle: 'Il mio viaggio professionale',
            exp1Title: 'B.Sc. Informatica',
            exp1Company: 'Collegio Malda',
            exp1Desc: 'Perseguendo una laurea in Informatica, costruendo competenze nello sviluppo full-stack e ingegneria del software.',
            exp2Title: 'Scuola Superiore',
            exp2Company: 'Scuola Superiore Naimouza',
            exp2Desc: 'Completata l\'istruzione superiore, gettando le basi per studi avanzati in informatica.',
            exp3Title: 'Madhyamik',
            exp3Company: 'Istituto Bright',
            exp3Desc: 'Completata l\'istruzione secondaria, segnando l\'inizio del mio viaggio nella tecnologia e nel lavoro creativo.'
        },
        tags: {
            strategy: 'Strategia',
            design: 'Design',
            video: 'Video',
            editing: 'Montaggio',
            branding: 'Branding',
            visuals: 'Visuali'
        },
        modal: {
            emailPreRegTitle: 'Pre-registrazione Email',
            emailPreRegSubtitle: 'Resta aggiornato con i miei ultimi progetti e approfondimenti',
            checkbox1: 'Sì, vorrei ricevere newsletter, informazioni e promozioni. Potrò ritirare il mio consenso in qualsiasi momento.',
            checkbox2: 'Cliccando su Pre-registrati, confermo di avere 12 anni o più e di accettare l\'Informativa sulla Privacy e i Termini di Utilizzo.',
            enterEmail: 'Inserisci il tuo indirizzo email',
            preRegister: 'Pre-registrati',
            thanksTitle: 'GRAZIE PER ESSERTI ISCRITTO!',
            thanksMessage: 'Ti sei registrato con successo!',
            thanksNote: 'Altri aggiornamenti arriveranno presto, resta sintonizzato!',
            headToDiscord: 'VAI A DISCORD',
            headToX: 'VAI A X',
            joinCommunity: 'Unisciti alla community per gli ultimi aggiornamenti!'
        },
        contact: { title: 'Contattami', subtitle: 'Creiamo qualcosa di incredibile insieme', email: 'Email', location: 'Posizione', profession: 'Professione', stayUpdated: 'Resta Aggiornato', subscribeDesc: 'Iscriviti per ricevere aggiornamenti su nuovi progetti e approfondimenti', enterEmail: 'Inserisci la tua email', subscribe: 'Iscriviti', yourName: 'Il Tuo Nome', yourEmail: 'La Tua Email', subject: 'Oggetto', yourMessage: 'Il Tuo Messaggio', sendMessage: 'Invia Messaggio' },
        footer: { description: 'Sviluppatore Full Stack e Editor. Creando esperienze digitali che comandano attenzione.', quickLinks: 'Link Rapidi', legal: 'Legale', privacyPolicy: 'Politica sulla Privacy', termsOfUse: 'Termini di Utilizzo', followUs: 'Seguici', copyright: 'Edizione Imperiale. Tutti i diritti riservati.' }
    },
    ru: {
        nav: { home: 'Главная', about: 'О Мне', gallery: 'Галерея', projects: 'Проекты', news: 'Новости', skills: 'Навыки', experience: 'Опыт', contact: 'Контакты' },
        hero: { badge: 'РЕВОЛЮЦИОННОЕ КРЕАТИВНОЕ ПОРТФОЛИО', title1: 'ПРИВЛЕКАЮ', title2: 'ВНИМАНИЕ.', subtitle: 'Я не просто проектирую; я привлекаю цифровое внимание. Создаю роскошные впечатления, которые доминируют на экране.', location: 'Базируется в Индии', profession: 'Full Stack и Редактор', established: 'Осн. 2023', viewWork: 'Посмотреть Мою Работу', getInTouch: 'Связаться', emailPreReg: 'Предварительная Регистрация Email' },
        about: { title: 'О Мне', subtitle: 'Откройте для себя путь за работой', name: 'MD Mamun Akhtar', quote: 'Я не строю веб-сайты; я строю', quoteEmpire: 'империи', description: 'Я не просто проектирую; я привлекаю цифровое внимание. Создаю роскошные впечатления, которые доминируют на экране. На пути к Full Stack Dev и Редактору я превращаю идеи в реальность через инновационный дизайн и передовые технологии.', featuredProjects: 'Избранные Проекты', yearsExperience: 'Лет Опыта', technologies: 'Технологии' },
        gallery: { title: 'Галерея', subtitle: 'Визуальная демонстрация моей работы', projectShowcase: 'Демонстрация Проектов', designWork: 'Дизайн', development: 'Разработка', mobileApps: 'Мобильные Приложения', webProjects: 'Веб-Проекты', branding: 'Брендинг' },
        projects: { title: 'Избранные Проекты', subtitle: 'Демонстрация моей недавней работы', ecofoodwise: 'EcoFoodWise', ecofoodwiseDesc: 'Стратегия и Дизайн - Разработка Приложений', dynamicEdit: 'Динамический Монтаж', dynamicEditDesc: 'Интерактивный Контент - Видеопроизводство', cinematicVisuals: 'Кинематографические Визуалы', cinematicVisualsDesc: 'Идентичность Бренда - Арт-Дирекшн', viewProject: 'Посмотреть Проект' },
        skills: { title: 'Навыки и Экспертиза', subtitle: 'Экспертиза в Домене - Веб и Цифровой, Авторитет Бренда', frontend: 'Frontend Разработка', backend: 'Backend и База Данных', design: 'Дизайн и Видеомонтаж' },
        news: { 
            title: 'Новости и События', 
            subtitle: 'Последние обновления и вехи', 
            news: '【НОВОСТИ】', 
            event: '【СОБЫТИЕ】',
            news1Title: 'Запуск EcoFoodWise - Стратегия и Дизайн Превосходство',
            news1Desc: 'С гордостью объявляю о запуске EcoFoodWise, революционного проекта разработки приложений, демонстрирующего стратегическое мышление и исключительный дизайн. Этот проект демонстрирует мой опыт в создании впечатляющих цифровых впечатлений.',
            news2Title: 'Dynamic Edit - Мастерство Видеопроизводства',
            news2Desc: 'Выпущен Dynamic Edit, демонстрирующий мои навыки в создании интерактивного контента и видеопроизводстве. Этот проект подчеркивает слияние технического мастерства и творческого видения.',
            news3Title: 'Кинематографические Визуалы - Превосходство Бренд-Идентичности',
            news3Desc: 'Завершен проект Cinematic Visuals, демонстрирующий мастерство в бренд-идентичности и арт-дирекшене. Эта работа демонстрирует способность создавать убедительные визуальные повествования, которые привлекают внимание.',
            news4Title: 'Портфолио Создано - Начало Пути',
            news4Desc: 'Создано в 2023 году, начало пути как Full Stack Разработчик и Редактор. Привержен созданию цифровых империй и привлечению внимания через исключительную работу.'
        },
        partners: { title: 'Партнеры и Клиенты', subtitle: 'Доверяют ведущие организации' },
        experience: { 
            title: 'Опыт и Временная Линия', 
            subtitle: 'Мой профессиональный путь',
            exp1Title: 'B.Sc. Компьютерные Науки',
            exp1Company: 'Колледж Малда',
            exp1Desc: 'Получение степени бакалавра в области компьютерных наук, накопление опыта в full-stack разработке и программной инженерии.',
            exp2Title: 'Среднее Образование',
            exp2Company: 'Средняя Школа Наймоуза',
            exp2Desc: 'Завершено среднее образование, заложив основу для углубленного изучения компьютерных наук.',
            exp3Title: 'Мадхьямик',
            exp3Company: 'Институт Брайт',
            exp3Desc: 'Завершено среднее образование, ознаменовавшее начало моего пути в технологиях и творческой работе.'
        },
        tags: {
            strategy: 'Стратегия',
            design: 'Дизайн',
            video: 'Видео',
            editing: 'Редактирование',
            branding: 'Брендинг',
            visuals: 'Визуалы'
        },
        modal: {
            emailPreRegTitle: 'Предварительная Регистрация Email',
            emailPreRegSubtitle: 'Будьте в курсе моих последних проектов и идей',
            checkbox1: 'Да, я хочу получать информационные бюллетени, информацию и рекламные акции. Я смогу отозвать свое согласие в любое время.',
            checkbox2: 'Нажимая на Предварительную регистрацию, я подтверждаю, что мне 12 лет или больше, и что я принимаю Политику конфиденциальности и Условия использования.',
            enterEmail: 'Введите ваш адрес электронной почты',
            preRegister: 'Предварительная Регистрация',
            thanksTitle: 'СПАСИБО ЗА ПОДПИСКУ!',
            thanksMessage: 'Вы успешно зарегистрировались!',
            thanksNote: 'Скоро будет больше обновлений, пожалуйста, оставайтесь на связи!',
            headToDiscord: 'ПЕРЕЙТИ В DISCORD',
            headToX: 'ПЕРЕЙТИ В X',
            joinCommunity: 'Присоединяйтесь к сообществу для получения последних обновлений!'
        },
        contact: { title: 'Связаться', subtitle: 'Давайте создадим что-то удивительное вместе', email: 'Email', location: 'Местоположение', profession: 'Профессия', stayUpdated: 'Оставайтесь в Курсе', subscribeDesc: 'Подпишитесь, чтобы получать обновления о новых проектах и идеях', enterEmail: 'Введите ваш email', subscribe: 'Подписаться', yourName: 'Ваше Имя', yourEmail: 'Ваш Email', subject: 'Тема', yourMessage: 'Ваше Сообщение', sendMessage: 'Отправить Сообщение' },
        footer: { description: 'Full Stack Разработчик и Редактор. Создаю цифровые впечатления, которые привлекают внимание.', quickLinks: 'Быстрые Ссылки', legal: 'Правовые', privacyPolicy: 'Политика Конфиденциальности', termsOfUse: 'Условия Использования', followUs: 'Следуйте За Нами', copyright: 'Императорское Издание. Все права защищены.' }
    },
    ar: {
        nav: { home: 'الرئيسية', about: 'نبذة', gallery: 'المعرض', projects: 'المشاريع', news: 'الأخبار', skills: 'المهارات', experience: 'الخبرة', contact: 'اتصل' },
        hero: { badge: 'محفظة إبداعية رائدة', title1: 'جذب', title2: 'الانتباه.', subtitle: 'أنا لا أصمم فقط؛ أنا أجذب الانتباه الرقمي. إنشاء تجارب فاخرة تهيمن على الشاشة.', location: 'مقيم في الهند', profession: 'مطور Full Stack ومحرر', established: 'تأسس 2023', viewWork: 'عرض أعمالي', getInTouch: 'تواصل معي', emailPreReg: 'التسجيل المسبق للبريد الإلكتروني' },
        about: { title: 'نبذة عني', subtitle: 'اكتشف الرحلة وراء العمل', name: 'MD Mamun Akhtar', quote: 'أنا لا أبني مواقع الويب؛ أنا أبني', quoteEmpire: 'إمبراطوريات', description: 'أنا لا أصمم فقط؛ أنا أجذب الانتباه الرقمي. إنشاء تجارب فاخرة تهيمن على الشاشة. في الطريق إلى مطور Full Stack ومحرر، أحول الأفكار إلى واقع من خلال التصميم المبتكر والتكنولوجيا المتطورة.', featuredProjects: 'المشاريع المميزة', yearsExperience: 'سنوات من الخبرة', technologies: 'التقنيات' },
        gallery: { title: 'المعرض', subtitle: 'عرض بصري لأعمالي', projectShowcase: 'عرض المشاريع', designWork: 'أعمال التصميم', development: 'التطوير', mobileApps: 'تطبيقات الجوال', webProjects: 'مشاريع الويب', branding: 'العلامة التجارية' },
        projects: { title: 'المشاريع المميزة', subtitle: 'عرض لأعمالي الأخيرة', ecofoodwise: 'EcoFoodWise', ecofoodwiseDesc: 'الاستراتيجية والتصميم - تطوير التطبيقات', dynamicEdit: 'التحرير الديناميكي', dynamicEditDesc: 'المحتوى التفاعلي - إنتاج الفيديو', cinematicVisuals: 'المؤثرات البصرية السينمائية', cinematicVisualsDesc: 'هوية العلامة التجارية - الإخراج الفني', viewProject: 'عرض المشروع' },
        skills: { title: 'المهارات والخبرة', subtitle: 'الخبرة في المجال - الويب والرقمي، سلطة العلامة التجارية', frontend: 'تطوير الواجهة الأمامية', backend: 'الخلفية وقاعدة البيانات', design: 'التصميم وتحرير الفيديو' },
        news: { 
            title: 'الأخبار والفعاليات', 
            subtitle: 'آخر التحديثات والمعالم', 
            news: '【الأخبار】', 
            event: '【الفعالية】',
            news1Title: 'إطلاق EcoFoodWise - التميز في الاستراتيجية والتصميم',
            news1Desc: 'يسعدني أن أعلن عن إطلاق EcoFoodWise، مشروع تطوير تطبيقات ثوري يعرض التفكير الاستراتيجي والتصميم الاستثنائي. يوضح هذا المشروع خبرتي في إنشاء تجارب رقمية مؤثرة.',
            news2Title: 'Dynamic Edit - إتقان إنتاج الفيديو',
            news2Desc: 'تم إصدار Dynamic Edit، مما يعرض مهاراتي في إنشاء المحتوى التفاعلي وإنتاج الفيديو. يسلط هذا المشروع الضوء على اندماج الخبرة التقنية والرؤية الإبداعية.',
            news3Title: 'المؤثرات البصرية السينمائية - التميز في هوية العلامة التجارية',
            news3Desc: 'اكتمل مشروع Cinematic Visuals، مما يوضح الإتقان في هوية العلامة التجارية والإخراج الفني. يعرض هذا العمل القدرة على إنشاء سرديات بصرية مقنعة تجذب الانتباه.',
            news4Title: 'إنشاء المحفظة - بداية الرحلة',
            news4Desc: 'تم إنشاؤه في 2023، بداية الرحلة كمطور Full Stack ومحرر. ملتزم ببناء إمبراطوريات رقمية وجذب الانتباه من خلال العمل الاستثنائي.'
        },
        partners: { title: 'الشركاء والعملاء', subtitle: 'موثوق به من قبل المنظمات الرائدة' },
        experience: { 
            title: 'الخبرة والجدول الزمني', 
            subtitle: 'رحلتي المهنية',
            exp1Title: 'بكالوريوس علوم الحاسوب',
            exp1Company: 'كلية مالدا',
            exp1Desc: 'متابعة درجة البكالوريوس في علوم الحاسوب، بناء الخبرة في تطوير Full Stack وهندسة البرمجيات.',
            exp2Title: 'التعليم الثانوي',
            exp2Company: 'مدرسة نايموزا الثانوية',
            exp2Desc: 'إكمال التعليم الثانوي، مما وضع الأساس للدراسات المتقدمة في علوم الحاسوب.',
            exp3Title: 'مادهياميك',
            exp3Company: 'معهد برايت',
            exp3Desc: 'إكمال التعليم الثانوي، مما يمثل بداية رحلتي في التكنولوجيا والعمل الإبداعي.'
        },
        tags: {
            strategy: 'الاستراتيجية',
            design: 'التصميم',
            video: 'الفيديو',
            editing: 'التحرير',
            branding: 'العلامة التجارية',
            visuals: 'المؤثرات البصرية'
        },
        modal: {
            emailPreRegTitle: 'التسجيل المسبق للبريد الإلكتروني',
            emailPreRegSubtitle: 'ابق على اطلاع بآخر مشاريعي وأفكاري',
            checkbox1: 'نعم، أود أن أتلقى النشرات الإخبارية والمعلومات والعروض الترويجية. سأكون قادرًا على سحب موافقتي في أي وقت.',
            checkbox2: 'بالنقر على التسجيل المسبق، أؤكد أنني أبلغ من العمر 12 عامًا أو أكثر وأنني أقبل سياسة الخصوصية وشروط الاستخدام.',
            enterEmail: 'أدخل عنوان بريدك الإلكتروني',
            preRegister: 'التسجيل المسبق',
            thanksTitle: 'شكرًا للاشتراك!',
            thanksMessage: 'لقد تم تسجيلك بنجاح!',
            thanksNote: 'ستكون هناك المزيد من التحديثات قريبًا، يرجى البقاء على اطلاع!',
            headToDiscord: 'الانتقال إلى DISCORD',
            headToX: 'الانتقال إلى X',
            joinCommunity: 'انضم إلى المجتمع للحصول على آخر التحديثات!'
        },
        contact: { title: 'تواصل معي', subtitle: 'دعنا نخلق شيئًا مذهلاً معًا', email: 'البريد الإلكتروني', location: 'الموقع', profession: 'المهنة', stayUpdated: 'ابق على اطلاع', subscribeDesc: 'اشترك لتلقي تحديثات حول المشاريع الجديدة والأفكار', enterEmail: 'أدخل بريدك الإلكتروني', subscribe: 'اشترك', yourName: 'اسمك', yourEmail: 'بريدك الإلكتروني', subject: 'الموضوع', yourMessage: 'رسالتك', sendMessage: 'إرسال الرسالة' },
        footer: { description: 'مطور Full Stack ومحرر. إنشاء تجارب رقمية تجذب الانتباه.', quickLinks: 'روابط سريعة', legal: 'قانوني', privacyPolicy: 'سياسة الخصوصية', termsOfUse: 'شروط الاستخدام', followUs: 'تابعنا', copyright: 'النسخة الإمبراطورية. جميع الحقوق محفوظة.' }
    },
    hi: {
        nav: { home: 'होम', about: 'अबाउट', gallery: 'गैलरी', projects: 'प्रोजेक्ट्स', news: 'समाचार', skills: 'स्किल्स', experience: 'अनुभव', contact: 'संपर्क' },
        hero: { badge: 'क्रांतिकारी रचनात्मक पोर्टफोलियो', title1: 'ध्यान', title2: 'आकर्षित करना।', subtitle: 'मैं सिर्फ डिज़ाइन नहीं करता; मैं डिजिटल ध्यान आकर्षित करता हूं। लक्ज़री अनुभव बनाना जो स्क्रीन पर हावी हो।', location: 'भारत में स्थित', profession: 'फुल स्टैक और एडिटर', established: 'स्थापित 2023', viewWork: 'मेरा काम देखें', getInTouch: 'संपर्क करें', emailPreReg: 'ईमेल पूर्व-पंजीकरण' },
        about: { title: 'मेरे बारे में', subtitle: 'काम के पीछे की यात्रा खोजें', name: 'MD Mamun Akhtar', quote: 'मैं वेबसाइट नहीं बनाता; मैं', quoteEmpire: 'साम्राज्य', description: 'मैं सिर्फ डिज़ाइन नहीं करता; मैं डिजिटल ध्यान आकर्षित करता हूं। लक्ज़री अनुभव बनाना जो स्क्रीन पर हावी हो। फुल स्टैक डेव और एडिटर के रास्ते पर, मैं नवाचारी डिज़ाइन और अत्याधुनिक तकनीक के माध्यम से विचारों को वास्तविकता में बदलता हूं।', featuredProjects: 'विशेष प्रोजेक्ट्स', yearsExperience: 'वर्षों का अनुभव', technologies: 'तकनीकें' },
        gallery: { title: 'गैलरी', subtitle: 'मेरे काम का दृश्य प्रदर्शन', projectShowcase: 'प्रोजेक्ट प्रदर्शन', designWork: 'डिज़ाइन कार्य', development: 'विकास', mobileApps: 'मोबाइल ऐप्स', webProjects: 'वेब प्रोजेक्ट्स', branding: 'ब्रांडिंग' },
        projects: { title: 'विशेष प्रोजेक्ट्स', subtitle: 'मेरे हाल के काम का प्रदर्शन', ecofoodwise: 'EcoFoodWise', ecofoodwiseDesc: 'रणनीति और डिज़ाइन - ऐप विकास', dynamicEdit: 'डायनामिक एडिट', dynamicEditDesc: 'इंटरैक्टिव कंटेंट - वीडियो प्रोडक्शन', cinematicVisuals: 'सिनेमैटिक विज़ुअल्स', cinematicVisualsDesc: 'ब्रांड पहचान - आर्ट डायरेक्शन', viewProject: 'प्रोजेक्ट देखें' },
        skills: { title: 'स्किल्स और विशेषज्ञता', subtitle: 'डोमेन विशेषज्ञता - वेब और डिजिटल, ब्रांड अधिकार', frontend: 'फ्रंटएंड डेवलपमेंट', backend: 'बैकएंड और डेटाबेस', design: 'डिज़ाइन और वीडियो एडिटिंग' },
        news: { 
            title: 'समाचार और घटनाएं', 
            subtitle: 'नवीनतम अपडेट और मील के पत्थर', 
            news: '【समाचार】', 
            event: '【घटना】',
            news1Title: 'EcoFoodWise लॉन्च - रणनीति और डिज़ाइन उत्कृष्टता',
            news1Desc: 'EcoFoodWise के लॉन्च की घोषणा करते हुए गर्व हो रहा है, एक क्रांतिकारी ऐप विकास परियोजना जो रणनीतिक सोच और असाधारण डिज़ाइन प्रदर्शित करती है। यह परियोजना प्रभावशाली डिजिटल अनुभव बनाने में मेरी विशेषज्ञता को प्रदर्शित करती है।',
            news2Title: 'Dynamic Edit - वीडियो प्रोडक्शन महारत',
            news2Desc: 'Dynamic Edit जारी किया गया, जो इंटरैक्टिव सामग्री निर्माण और वीडियो प्रोडक्शन में मेरे कौशल को प्रदर्शित करता है। यह परियोजना तकनीकी विशेषज्ञता और रचनात्मक दृष्टि के संलयन को उजागर करती है।',
            news3Title: 'सिनेमैटिक विज़ुअल्स - ब्रांड पहचान उत्कृष्टता',
            news3Desc: 'Cinematic Visuals परियोजना पूरी की गई, जो ब्रांड पहचान और आर्ट डायरेक्शन में महारत को प्रदर्शित करती है। यह कार्य ध्यान आकर्षित करने वाली दृश्य कथाएं बनाने की क्षमता को प्रदर्शित करता है।',
            news4Title: 'पोर्टफोलियो स्थापित - यात्रा की शुरुआत',
            news4Desc: '2023 में स्थापित, Full Stack डेवलपर और एडिटर के रूप में यात्रा की शुरुआत। असाधारण कार्य के माध्यम से डिजिटल साम्राज्य बनाने और ध्यान आकर्षित करने के लिए प्रतिबद्ध।'
        },
        partners: { title: 'पार्टनर्स और क्लाइंट्स', subtitle: 'अग्रणी संगठनों द्वारा विश्वसनीय' },
        experience: { 
            title: 'अनुभव और समयरेखा', 
            subtitle: 'मेरी पेशेवर यात्रा',
            exp1Title: 'B.Sc. कंप्यूटर साइंस',
            exp1Company: 'मालदा कॉलेज',
            exp1Desc: 'कंप्यूटर साइंस में स्नातक की डिग्री प्राप्त करना, full-stack विकास और सॉफ्टवेयर इंजीनियरिंग में विशेषज्ञता का निर्माण।',
            exp2Title: 'उच्च माध्यमिक',
            exp2Company: 'नैमौज़ा हाई स्कूल',
            exp2Desc: 'उच्च माध्यमिक शिक्षा पूरी की, जिसने कंप्यूटर विज्ञान में उन्नत अध्ययन के लिए नींव रखी।',
            exp3Title: 'माध्यमिक',
            exp3Company: 'ब्राइट इंस्टीट्यूट',
            exp3Desc: 'माध्यमिक शिक्षा पूरी की, जो प्रौद्योगिकी और रचनात्मक कार्य में मेरी यात्रा की शुरुआत का प्रतीक है।'
        },
        tags: {
            strategy: 'रणनीति',
            design: 'डिज़ाइन',
            video: 'वीडियो',
            editing: 'संपादन',
            branding: 'ब्रांडिंग',
            visuals: 'विज़ुअल्स'
        },
        modal: {
            emailPreRegTitle: 'ईमेल पूर्व-पंजीकरण',
            emailPreRegSubtitle: 'मेरी नवीनतम परियोजनाओं और अंतर्दृष्टि के साथ अपडेट रहें',
            checkbox1: 'हां, मैं न्यूज़लेटर, जानकारी और प्रचार प्राप्त करना चाहूंगा। मैं किसी भी समय अपनी सहमति वापस ले सकूंगा।',
            checkbox2: 'पूर्व-पंजीकरण पर क्लिक करके, मैं पुष्टि करता हूं कि मैं 12 वर्ष या उससे अधिक का हूं और मैं गोपनीयता नीति और उपयोग की शर्तों को स्वीकार करता हूं।',
            enterEmail: 'अपना ईमेल पता दर्ज करें',
            preRegister: 'पूर्व-पंजीकरण',
            thanksTitle: 'सदस्यता लेने के लिए धन्यवाद!',
            thanksMessage: 'आपने सफलतापूर्वक पंजीकरण कर लिया है!',
            thanksNote: 'जल्द ही और अधिक अपडेट आएंगे, कृपया बने रहें!',
            headToDiscord: 'DISCORD पर जाएं',
            headToX: 'X पर जाएं',
            joinCommunity: 'नवीनतम अपडेट के लिए समुदाय में शामिल हों!'
        },
        contact: { title: 'संपर्क करें', subtitle: 'आइए मिलकर कुछ अद्भुत बनाएं', email: 'ईमेल', location: 'स्थान', profession: 'पेशा', stayUpdated: 'अपडेट रहें', subscribeDesc: 'नए प्रोजेक्ट्स और अंतर्दृष्टि पर अपडेट प्राप्त करने के लिए सदस्यता लें', enterEmail: 'अपना ईमेल दर्ज करें', subscribe: 'सदस्यता लें', yourName: 'आपका नाम', yourEmail: 'आपका ईमेल', subject: 'विषय', yourMessage: 'आपका संदेश', sendMessage: 'संदेश भेजें' },
        footer: { description: 'फुल स्टैक डेवलपर और एडिटर। डिजिटल अनुभव बनाना जो ध्यान आकर्षित करते हैं।', quickLinks: 'त्वरित लिंक', legal: 'कानूनी', privacyPolicy: 'गोपनीयता नीति', termsOfUse: 'उपयोग की शर्तें', followUs: 'हमें फॉलो करें', copyright: 'शाही संस्करण। सभी अधिकार सुरक्षित।' }
    }
};

// Language Switcher Functionality
const languageToggle = document.getElementById('languageToggle');
const languageDropdown = document.getElementById('languageDropdown');
const languageSelector = document.querySelector('.language-selector');
const currentLangElement = document.getElementById('currentLang');
const languageOptions = document.querySelectorAll('.language-option');

// Verify all language options are present
console.log('Total language options found:', languageOptions.length);
languageOptions.forEach(option => {
    const lang = option.getAttribute('data-lang');
    const name = option.querySelector('.lang-name')?.textContent;
    console.log(`Language: ${lang} - ${name}`);
});

// Initialize language from localStorage or default to English
let currentLanguage = localStorage.getItem('language') || 'en';
currentLangElement.textContent = currentLanguage.toUpperCase();

// Set initial HTML lang and dir attributes
document.documentElement.setAttribute('lang', currentLanguage);
if (currentLanguage === 'ar' || currentLanguage === 'he') {
    document.documentElement.setAttribute('dir', 'rtl');
} else {
    document.documentElement.setAttribute('dir', 'ltr');
}

// Update active language option
const updateActiveLanguage = () => {
    languageOptions.forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-lang') === currentLanguage) {
            option.classList.add('active');
        }
    });
};

updateActiveLanguage();

// Toggle language dropdown
if (languageToggle) {
    languageToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event from bubbling to document
        languageClickHandled = true; // Mark that this click was handled
        
        // Only toggle if clicking the button itself, not if dropdown is already open
        const isActive = languageSelector.classList.contains('active');
        
        if (isActive) {
            // Close dropdown
            languageSelector.classList.remove('active');
        } else {
            // Open dropdown
            languageSelector.classList.add('active');
            
            // Ensure dropdown is visible and scrollable
            if (languageDropdown) {
                // Check if dropdown needs to be positioned upward
                setTimeout(() => {
                    const rect = languageDropdown.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    if (rect.bottom > viewportHeight) {
                        languageDropdown.style.top = 'auto';
                        languageDropdown.style.bottom = 'calc(100% + 10px)';
                    } else {
                        languageDropdown.style.top = 'calc(100% + 10px)';
                        languageDropdown.style.bottom = 'auto';
                    }
                    
                    // Ensure all languages are accessible
                    languageDropdown.style.maxHeight = '600px';
                    languageDropdown.style.overflowY = 'auto';
                }, 10);
            }
        }
    });
}

// Close dropdown when clicking outside (with proper event handling)
let languageClickHandled = false;

document.addEventListener('click', (e) => {
    // Reset flag after a short delay
    setTimeout(() => {
        languageClickHandled = false;
    }, 100);
    
    // Only close dropdown if clicking outside the language selector
    // and the click wasn't already handled by language selector
    if (languageSelector && !languageSelector.contains(e.target) && !languageClickHandled) {
        if (languageSelector.classList.contains('active')) {
            languageSelector.classList.remove('active');
        }
    }
});

// Language selection (with proper event handling)
languageOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Stop event from bubbling up
        languageClickHandled = true; // Mark that this click was handled
        
        const selectedLang = option.getAttribute('data-lang');
        if (selectedLang && selectedLang !== currentLanguage) {
            currentLanguage = selectedLang;
            currentLangElement.textContent = currentLanguage.toUpperCase();
            localStorage.setItem('language', currentLanguage);
            updateActiveLanguage();
            translatePage(currentLanguage);
            languageSelector.classList.remove('active');
        } else if (selectedLang === currentLanguage) {
            // Even if same language, close dropdown
            languageSelector.classList.remove('active');
        }
    });
});

// Translation function
function translatePage(lang) {
    const t = translations[lang];
    if (!t) return;
    
    // Update HTML lang attribute and direction for RTL languages
    document.documentElement.setAttribute('lang', lang);
    if (lang === 'ar' || lang === 'he') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }

    // Update navigation
    document.querySelectorAll('.nav-link').forEach((link, index) => {
        const keys = ['home', 'about', 'gallery', 'projects', 'news', 'skills', 'experience', 'contact'];
        if (keys[index]) {
            link.textContent = t.nav[keys[index]];
        }
    });

    // Update hero section
    const heroBadge = document.querySelector('.hero-badge');
    const heroTitleLines = document.querySelectorAll('.title-line');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroLocation = document.querySelector('.hero-location');
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    
    if (heroBadge) heroBadge.textContent = t.hero.badge;
    if (heroTitleLines[0]) heroTitleLines[0].textContent = t.hero.title1;
    if (heroTitleLines[1]) heroTitleLines[1].textContent = t.hero.title2;
    if (heroSubtitle) heroSubtitle.textContent = t.hero.subtitle;
    if (heroLocation) {
        heroLocation.innerHTML = `<span>${t.hero.location}</span><span>${t.hero.profession}</span><span>${t.hero.established}</span>`;
    }
    if (heroButtons[0]) heroButtons[0].textContent = t.hero.viewWork;
    if (heroButtons[1]) heroButtons[1].textContent = t.hero.getInTouch;
    if (document.getElementById('openEmailModal')) {
        document.getElementById('openEmailModal').textContent = t.hero.emailPreReg;
    }

    // Update about section
    const aboutTitle = document.querySelector('#about .section-title');
    const aboutSubtitle = document.querySelector('#about .section-subtitle');
    const aboutName = document.querySelector('.about-name');
    const aboutLead = document.querySelector('.about-text .lead');
    const aboutDescription = document.querySelector('.about-text p:last-of-type');
    const statLabels = document.querySelectorAll('.stat-label');
    
    if (aboutTitle) aboutTitle.textContent = t.about.title;
    if (aboutSubtitle) aboutSubtitle.textContent = t.about.subtitle;
    if (aboutName) aboutName.textContent = t.about.name;
    if (aboutLead) {
        aboutLead.innerHTML = `"${t.about.quote} <span class="accent-text">${t.about.quoteEmpire}</span>."`;
    }
    if (aboutDescription) aboutDescription.textContent = t.about.description;
    if (statLabels[0]) statLabels[0].textContent = t.about.featuredProjects;
    if (statLabels[1]) statLabels[1].textContent = t.about.yearsExperience;
    if (statLabels[2]) statLabels[2].textContent = t.about.technologies;

    // Update gallery section
    const galleryTitle = document.querySelector('#gallery .section-title');
    const gallerySubtitle = document.querySelector('#gallery .section-subtitle');
    const galleryOverlays = document.querySelectorAll('.gallery-overlay h4');
    
    if (galleryTitle) galleryTitle.textContent = t.gallery.title;
    if (gallerySubtitle) gallerySubtitle.textContent = t.gallery.subtitle;
    if (galleryOverlays[0]) galleryOverlays[0].textContent = t.gallery.projectShowcase;
    if (galleryOverlays[1]) galleryOverlays[1].textContent = t.gallery.designWork;
    if (galleryOverlays[2]) galleryOverlays[2].textContent = t.gallery.development;
    if (galleryOverlays[3]) galleryOverlays[3].textContent = t.gallery.mobileApps;
    if (galleryOverlays[4]) galleryOverlays[4].textContent = t.gallery.webProjects;
    if (galleryOverlays[5]) galleryOverlays[5].textContent = t.gallery.branding;

    // Update projects section
    const projectsTitle = document.querySelector('#projects .section-title');
    const projectsSubtitle = document.querySelector('#projects .section-subtitle');
    const projectTitles = document.querySelectorAll('.project-title');
    const projectDescriptions = document.querySelectorAll('.project-description');
    const projectViewBtns = document.querySelectorAll('.project-view-btn span');
    const projectLinkTexts = document.querySelectorAll('.project-link-text');
    
    if (projectsTitle) projectsTitle.textContent = t.projects.title;
    if (projectsSubtitle) projectsSubtitle.textContent = t.projects.subtitle;
    if (projectTitles[0]) projectTitles[0].textContent = t.projects.ecofoodwise;
    if (projectTitles[1]) projectTitles[1].textContent = t.projects.dynamicEdit;
    if (projectTitles[2]) projectTitles[2].textContent = t.projects.cinematicVisuals;
    if (projectDescriptions[0]) projectDescriptions[0].textContent = t.projects.ecofoodwiseDesc;
    if (projectDescriptions[1]) projectDescriptions[1].textContent = t.projects.dynamicEditDesc;
    if (projectDescriptions[2]) projectDescriptions[2].textContent = t.projects.cinematicVisualsDesc;
    projectViewBtns.forEach(btn => {
        if (btn && t.projects.viewProject) btn.textContent = t.projects.viewProject;
    });
    projectLinkTexts.forEach(text => {
        if (text && t.projects.viewProject) text.textContent = t.projects.viewProject;
    });

    // Update skills section
    const skillsTitle = document.querySelector('#skills .section-title');
    const skillsSubtitle = document.querySelector('#skills .section-subtitle');
    const categoryTitles = document.querySelectorAll('.category-title');
    
    if (skillsTitle) skillsTitle.textContent = t.skills.title;
    if (skillsSubtitle) skillsSubtitle.textContent = t.skills.subtitle;
    if (categoryTitles[0]) categoryTitles[0].textContent = t.skills.frontend;
    if (categoryTitles[1]) categoryTitles[1].textContent = t.skills.backend;
    if (categoryTitles[2]) categoryTitles[2].textContent = t.skills.design;

    // Update news section
    const newsTitle = document.querySelector('#news .section-title');
    const newsSubtitle = document.querySelector('#news .section-subtitle');
    const newsItems = document.querySelectorAll('.news-item');
    const newsTitles = document.querySelectorAll('.news-title');
    const newsDescriptions = document.querySelectorAll('.news-description');
    const newsBadges = document.querySelectorAll('.news-badge');
    
    if (newsTitle) newsTitle.textContent = t.news.title;
    if (newsSubtitle) newsSubtitle.textContent = t.news.subtitle;
    if (newsTitles[0] && t.news.news1Title) newsTitles[0].textContent = t.news.news1Title;
    if (newsTitles[1] && t.news.news2Title) newsTitles[1].textContent = t.news.news2Title;
    if (newsTitles[2] && t.news.news3Title) newsTitles[2].textContent = t.news.news3Title;
    if (newsTitles[3] && t.news.news4Title) newsTitles[3].textContent = t.news.news4Title;
    if (newsDescriptions[0] && t.news.news1Desc) newsDescriptions[0].textContent = t.news.news1Desc;
    if (newsDescriptions[1] && t.news.news2Desc) newsDescriptions[1].textContent = t.news.news2Desc;
    if (newsDescriptions[2] && t.news.news3Desc) newsDescriptions[2].textContent = t.news.news3Desc;
    if (newsDescriptions[3] && t.news.news4Desc) newsDescriptions[3].textContent = t.news.news4Desc;
    // Update news badges (index 0 and 2 are NEWS, index 1 and 3 are EVENT)
    newsBadges.forEach((badge, index) => {
        if (index === 0 || index === 2) {
            if (t.news.news) badge.textContent = t.news.news;
        } else if (index === 1 || index === 3) {
            if (t.news.event) badge.textContent = t.news.event;
        }
    });

    // Update partners section
    const partnersTitle = document.querySelector('#partners .section-title');
    const partnersSubtitle = document.querySelector('#partners .section-subtitle');
    
    if (partnersTitle) partnersTitle.textContent = t.partners.title;
    if (partnersSubtitle) partnersSubtitle.textContent = t.partners.subtitle;

    // Update experience section
    const experienceTitle = document.querySelector('#experience .section-title');
    const experienceSubtitle = document.querySelector('#experience .section-subtitle');
    const timelineTitles = document.querySelectorAll('.timeline-title');
    const timelineCompanies = document.querySelectorAll('.timeline-company');
    const timelineDescriptions = document.querySelectorAll('.timeline-description');
    
    if (experienceTitle) experienceTitle.textContent = t.experience.title;
    if (experienceSubtitle) experienceSubtitle.textContent = t.experience.subtitle;
    if (timelineTitles[0] && t.experience.exp1Title) timelineTitles[0].textContent = t.experience.exp1Title;
    if (timelineTitles[1] && t.experience.exp2Title) timelineTitles[1].textContent = t.experience.exp2Title;
    if (timelineTitles[2] && t.experience.exp3Title) timelineTitles[2].textContent = t.experience.exp3Title;
    if (timelineCompanies[0] && t.experience.exp1Company) timelineCompanies[0].textContent = t.experience.exp1Company;
    if (timelineCompanies[1] && t.experience.exp2Company) timelineCompanies[1].textContent = t.experience.exp2Company;
    if (timelineCompanies[2] && t.experience.exp3Company) timelineCompanies[2].textContent = t.experience.exp3Company;
    if (timelineDescriptions[0] && t.experience.exp1Desc) timelineDescriptions[0].textContent = t.experience.exp1Desc;
    if (timelineDescriptions[1] && t.experience.exp2Desc) timelineDescriptions[1].textContent = t.experience.exp2Desc;
    if (timelineDescriptions[2] && t.experience.exp3Desc) timelineDescriptions[2].textContent = t.experience.exp3Desc;

    // Update contact section
    const contactTitle = document.querySelector('#contact .section-title');
    const contactSubtitle = document.querySelector('#contact .section-subtitle');
    const infoItems = document.querySelectorAll('.info-text h4');
    const contactInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    const subscribeBtn = document.querySelector('#newsletterForm button');
    
    if (contactTitle) contactTitle.textContent = t.contact.title;
    if (contactSubtitle) contactSubtitle.textContent = t.contact.subtitle;
    if (infoItems[0]) infoItems[0].textContent = t.contact.email;
    if (infoItems[1]) infoItems[1].textContent = t.contact.location;
    if (infoItems[2]) infoItems[2].textContent = t.contact.profession;
    if (contactInputs[0]) contactInputs[0].placeholder = t.contact.yourName;
    if (contactInputs[1]) contactInputs[1].placeholder = t.contact.yourEmail;
    if (contactInputs[2]) contactInputs[2].placeholder = t.contact.subject;
    if (contactInputs[3]) contactInputs[3].placeholder = t.contact.yourMessage;
    if (document.querySelector('#contactForm button')) {
        document.querySelector('#contactForm button').textContent = t.contact.sendMessage;
    }
    if (subscribeBtn) subscribeBtn.textContent = t.contact.subscribe;

    // Update project tags
    const projectTags = document.querySelectorAll('.project-tags .tag');
    if (t.tags) {
        projectTags.forEach(tag => {
            const tagText = tag.textContent.trim();
            if (tagText === 'Strategy' && t.tags.strategy) tag.textContent = t.tags.strategy;
            else if (tagText === 'Design' && t.tags.design) tag.textContent = t.tags.design;
            else if (tagText === 'Video' && t.tags.video) tag.textContent = t.tags.video;
            else if (tagText === 'Editing' && t.tags.editing) tag.textContent = t.tags.editing;
            else if (tagText === 'Branding' && t.tags.branding) tag.textContent = t.tags.branding;
            else if (tagText === 'Visuals' && t.tags.visuals) tag.textContent = t.tags.visuals;
        });
    }

    // Update modal content
    if (t.modal) {
        const modalTitle = document.querySelector('#emailModal .modal-header h2');
        const modalSubtitle = document.querySelector('#emailModal .modal-header p');
        const modalCheckboxes = document.querySelectorAll('#emailModal .form-checkbox span');
        const modalEmailInput = document.querySelector('#emailModal input[type="email"]');
        const modalPreRegisterBtn = document.querySelector('#emailModal button[type="submit"]');
        const successModalTitle = document.querySelector('#successModal h2');
        const successModalMessage = document.querySelector('#successModal p:not(.success-note):not(.success-footer)');
        const successModalNote = document.querySelector('#successModal .success-note');
        const successModalDiscord = document.querySelector('#successModal #headToDiscord');
        const successModalX = document.querySelector('#successModal #headToX');
        const successModalFooter = document.querySelector('#successModal .success-footer');
        
        if (modalTitle && t.modal.emailPreRegTitle) modalTitle.textContent = t.modal.emailPreRegTitle;
        if (modalSubtitle && t.modal.emailPreRegSubtitle) modalSubtitle.textContent = t.modal.emailPreRegSubtitle;
        if (modalCheckboxes[0] && t.modal.checkbox1) modalCheckboxes[0].textContent = t.modal.checkbox1;
        if (modalCheckboxes[1] && t.modal.checkbox2) modalCheckboxes[1].textContent = t.modal.checkbox2;
        if (modalEmailInput && t.modal.enterEmail) modalEmailInput.placeholder = t.modal.enterEmail;
        if (modalPreRegisterBtn && t.modal.preRegister) modalPreRegisterBtn.textContent = t.modal.preRegister;
        if (successModalTitle && t.modal.thanksTitle) successModalTitle.textContent = t.modal.thanksTitle;
        if (successModalMessage && t.modal.thanksMessage) successModalMessage.textContent = t.modal.thanksMessage;
        if (successModalNote && t.modal.thanksNote) successModalNote.textContent = t.modal.thanksNote;
        if (successModalDiscord && t.modal.headToDiscord) successModalDiscord.textContent = t.modal.headToDiscord;
        if (successModalX && t.modal.headToX) successModalX.textContent = t.modal.headToX;
        if (successModalFooter && t.modal.joinCommunity) successModalFooter.textContent = t.modal.joinCommunity;
    }

    // Update footer
    const footerDescription = document.querySelector('.footer-section p');
    const footerQuickLinks = document.querySelectorAll('.footer-section h4');
    const footerLinks = document.querySelectorAll('.footer-links a');
    
    if (footerDescription) footerDescription.textContent = t.footer.description;
    if (footerQuickLinks[1]) footerQuickLinks[1].textContent = t.footer.quickLinks;
    if (footerQuickLinks[2]) footerQuickLinks[2].textContent = t.footer.legal;
    if (footerQuickLinks[3]) footerQuickLinks[3].textContent = t.footer.followUs;
    
    // Update footer links
    if (footerLinks.length >= 4) {
        const navKeys = ['home', 'about', 'projects', 'contact'];
        footerLinks.forEach((link, index) => {
            if (index < 4 && t.nav[navKeys[index]]) {
                link.textContent = t.nav[navKeys[index]];
            } else if (index === 4 && t.footer.privacyPolicy) {
                link.textContent = t.footer.privacyPolicy;
            } else if (index === 5 && t.footer.termsOfUse) {
                link.textContent = t.footer.termsOfUse;
            }
        });
    }
    
    // Update copyright
    const footerCopyright = document.querySelector('.footer-bottom p');
    if (footerCopyright && t.footer.copyright) {
        footerCopyright.innerHTML = `&copy; 2025 MD MAMUN AKHTAR. ${t.footer.copyright}`;
    }
}

// Initialize translation on page load
if (currentLanguage !== 'en') {
    translatePage(currentLanguage);
}

console.log('Portfolio website loaded successfully!');
