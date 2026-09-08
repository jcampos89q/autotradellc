// theme-lang.js

// 1. Language Data
const translations = {
    es: {
        "nav.usa": "USA: +1 (786) 365-1165",
        "nav.hnd": "HND: +504 9684-1000",
        "hero.title1": "SI TIENE MOTOR, ",
        "hero.title2": "LO IMPORTAMOS!",
        "hero.subtitle1": "Soluciones integrales para llevar lo que necesitas, ",
        "hero.subtitle2": "donde lo necesitas.",
        "hero.hn": " Honduras",
        "hero.gt": " Guatemala",
        "hero.sv": " El Salvador",
        "gallery.title": "Nuestra Experiencia en Acción",
        "gallery.subtitle": "Un vistazo a nuestro trabajo diario, logística y vehículos listos para exportación.",
        "services.title": "Nuestros Servicios",
        "services.s1.title": "Compra de Vehículos en Subastas de Estados Unidos",
        "services.s1.desc": "Compramos por ti en las mejores subastas de Estados Unidos al mejor precio, asegurando una inversión inteligente y transparente.",
        "services.s2.title": "Servicio de Grúa en Todo Estados Unidos",
        "services.s2.desc": "Recogemos tu vehículo en cualquier estado y lo llevamos de manera segura hasta el puerto de salida para su exportación.",
        "services.s3.title": "Servicio de Aduanas en País de Destino",
        "services.s3.desc": "Manejamos todo el proceso aduanero en Honduras, Guatemala y El Salvador para que recibas tu vehículo sin complicaciones ni retrasos.",
        "services.s4.title": "Mudanzas desde Estados Unidos",
        "services.s4.desc": "Llevamos tus pertenencias de forma segura y confiable a Honduras, Guatemala y El Salvador con atención personalizada en cada caja.",
        "motivational.h2": "Tu historia no termina aquí, <br>es solo el comienzo de algo mejor.",
        "motivational.p1": "Cada desafío te hace más fuerte, cada paso te acerca a tus sueños. Hoy regresas a tu país, pero llevas contigo experiencia, valentía y un futuro lleno de oportunidades.",
        "motivational.p2": "¡Cree en ti, trabaja por tus metas y construye la vida que tú y tu familia merecen!",
        "motivational.h3": "¡Tú puedes, nosotros te acompañamos!",
        "values.v1": " Confianza",
        "values.v2": " Experiencia",
        "values.v3": " Compromiso",
        "footer.desc": "Tu aliado estratégico en logística e importación automotriz.",
        "footer.contact": "Contáctanos",
        "footer.coverage": "Cobertura Centroamérica",
        "footer.rights": "© 2026 AUTOTRADE MIAMI LLC. Todos los derechos reservados."
    },
    en: {
        "nav.usa": "USA: +1 (786) 365-1165",
        "nav.hnd": "HND: +504 9684-1000",
        "hero.title1": "IF IT HAS AN ENGINE, ",
        "hero.title2": "WE IMPORT IT!",
        "hero.subtitle1": "Comprehensive solutions to take what you need, ",
        "hero.subtitle2": "where you need it.",
        "hero.hn": " Honduras",
        "hero.gt": " Guatemala",
        "hero.sv": " El Salvador",
        "gallery.title": "Our Experience in Action",
        "gallery.subtitle": "A glimpse of our daily work, logistics, and vehicles ready for export.",
        "services.title": "Our Services",
        "services.s1.title": "Vehicle Purchases at US Auctions",
        "services.s1.desc": "We buy for you at the best US auctions at the best price, ensuring a smart and transparent investment.",
        "services.s2.title": "Towing Service Across the US",
        "services.s2.desc": "We pick up your vehicle in any state and safely transport it to the departure port for export.",
        "services.s3.title": "Customs Service at Destination",
        "services.s3.desc": "We handle the entire customs process in Honduras, Guatemala, and El Salvador so you receive your vehicle without complications or delays.",
        "services.s4.title": "Moving Services from the US",
        "services.s4.desc": "We safely and reliably transport your belongings to Honduras, Guatemala, and El Salvador with personalized care for every box.",
        "motivational.h2": "Your story doesn't end here, <br>it's just the beginning of something better.",
        "motivational.p1": "Every challenge makes you stronger, every step brings you closer to your dreams. Today you return to your country, but you bring experience, courage, and a future full of opportunities.",
        "motivational.p2": "Believe in yourself, work for your goals and build the life you and your family deserve!",
        "motivational.h3": "You can do it, we are with you!",
        "values.v1": " Trust",
        "values.v2": " Experience",
        "values.v3": " Commitment",
        "footer.desc": "Your strategic partner in logistics and automotive import.",
        "footer.contact": "Contact Us",
        "footer.coverage": "Central America Coverage",
        "footer.rights": "© 2026 AUTOTRADE MIAMI LLC. All rights reserved."
    }
};

// 2. Language Logic
const langBtn = document.getElementById('langToggle');
let currentLang = localStorage.getItem('autotrade_lang') || 'es';

function applyLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (translations[lang][key].includes('<br>') || translations[lang][key].includes('<strong>') || translations[lang][key].includes('</i>') || translations[lang][key].includes('<img')) {
                el.innerHTML = translations[lang][key];
            } else {
                const icon = el.querySelector('i');
                const img = el.querySelector('img');
                if (icon) {
                    el.innerHTML = '';
                    el.appendChild(icon);
                    el.appendChild(document.createTextNode(translations[lang][key]));
                } else if (img) {
                    el.innerHTML = '';
                    el.appendChild(img);
                    el.appendChild(document.createTextNode(translations[lang][key]));
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        }
    });
    
    if (langBtn) {
        langBtn.textContent = lang === 'es' ? 'ES' : 'EN';
    }
    
    document.documentElement.lang = lang;
}

if (langBtn) {
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        localStorage.setItem('autotrade_lang', currentLang);
        applyLanguage(currentLang);
    });
}

// 3. Theme Logic
const themeBtn = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

const savedTheme = localStorage.getItem('autotrade_theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let currentTheme = savedTheme || (systemDark ? 'dark' : 'light');

function applyTheme(theme) {
    if (theme === 'dark') {
        htmlEl.classList.add('dark-theme');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        htmlEl.classList.remove('dark-theme');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('autotrade_theme', currentTheme);
        applyTheme(currentTheme);
    });
}

// 4. Initialize
document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(currentLang);
    applyTheme(currentTheme);
});
