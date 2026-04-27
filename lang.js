/* ============================================================
   lang.js  –  EN / KH language switcher
   ============================================================ */

const TRANSLATIONS = {
    en: {
        /* ── Nav ── */
        'nav.home':        'Home',
        'nav.features':    'Features',
        'nav.portfolio':   'Portfolio',
        'nav.resume':      'Resume',
        'nav.report':      'Report',
        'nav.cad':         '3D CAD',
        'nav.project':     'Project',
        'nav.battery':     'Battery Pack',
        'nav.blog':        'Blog',
        'nav.contact':     'Contact Me',
        'nav.hire':        'Hire Me',

        /* ── Home ── */
        'home.subtitle':   'Welcome to my world',
        'home.hi':         "Hi, I'm",
        'home.desc':       'Passionate about Telecommunications & Electronic Engineering — designing circuits, building drones, creating 3D models, and developing IoT systems that solve real-world problems.',
        'home.find':       'Find with me',
        'home.skills':     'Top Skills',
        'home.projects':   'View Projects',
        'home.cv':         'Download CV',

        /* ── Features ── */
        'feat.label':      'Features',
        'feat.title':      'What I Do',
        'feat.elec.title': 'Electronic',
        'feat.elec.desc':  'Designing and building electronic circuits, PCB layouts, microcontroller programming ESP32, Arduino UNO and embedded systems for real-world applications.',
        'feat.cad.title':  '3D CAD',
        'feat.cad.desc':   'Creating detailed 3D models and technical drawings using Fusion 360 / SolidWorks for engineering components, enclosures, and mechanical parts.',
        'feat.drone.title':'Drone',
        'feat.drone.desc': 'Frame prototype, battery drone, frame assembly, flight controller and ESC configuration for custom drone builds.',
        'feat.bat.title':  'Battery Pack',
        'feat.bat.desc':   'Designing custom lithium battery packs with BMS circuits, spot welding, capacity balancing, and safety protection for e-bikes, drones, and power walls.',
        'feat.iot.title':  'IoT Project',
        'feat.iot.desc':   'Developing Internet of Things solutions using ESP32, Arduino, and cloud platforms for smart monitoring, automation, and remote control systems.',
        'feat.print.title':'3D Design & Printing Services',
        'feat.print.desc': 'Full service from 3D model design to physical print — prototyping custom parts, housings, brackets and props with FDM and resin printers.',

        /* ── Portfolio ── */
        'port.label':      'Visit my portfolio and keep your feedback',
        'port.title':      'My Portfolio',
        'port.files':      'Portfolio Files & Projects',

        /* ── Resume ── */
        'res.label':       'Resume',
        'res.title':       'My Background',
        'res.tab.edu':     'Education',
        'res.tab.exp':     'Experience',
        'res.tab.skills':  'Skills',

        /* Education */
        'edu.1.date':      '2021 – 2025',
        'edu.1.title':     'Telecommunications & Electronic Engineering',
        'edu.1.place':     'Royal University of Phnom Penh',
        'edu.1.desc':      'Studying signal processing, circuit design, Networking, RF communications, and power electronics.',
        'edu.2.date':      '2015 – 2021',
        'edu.2.title':     'High School Diploma',
        'edu.2.place':     'Sok An Khvav High School, Takeo Province',
        'edu.2.desc':      '',

        /* Experience */
        'exp.1.date':      'Present',
        'exp.1.title':     'Technician – Battery & Solar Power Systems',
        'exp.1.place':     'BS Power',
        'exp.1.desc':      'Worked on battery pack assembly ranging from 7.2V to 98V (5kWh – 15kWh). Knowledgeable about BMS, battery management, solar systems, and inverters. Hands-on experience with e-bike batteries, EV batteries, and solar energy installations.',
        'exp.2.date':      'Year 3, Semester 1',
        'exp.2.title':     'Internship – Process DIY',
        'exp.2.place':     'Process DIY',
        'exp.2.desc':      'Worked on DIY projects related to 3D design (CAD) and design services. Operated 3D printing machines and laser cutting machines. Gained hands-on ability to design and build drone prototypes.',
        'exp.3.date':      '2023 – 2024',
        'exp.3.title':     'Member – Robot Club',
        'exp.3.place':     'Royal University of Phnom Penh',
        'exp.3.desc':      'Active member of the RUPP Robot Club. Gained new experiences in teamwork and collaboration, and learned new concepts about the engineering process.',
        'exp.4.date':      '2021 – Present',
        'exp.4.title':     'School Experience – Theory & Practice',
        'exp.4.place':     'Royal University of Phnom Penh',
        'exp.4.desc':      'Hands-on coursework covering electronic circuits, antenna design & frequency analysis, robotics & data structures, PCB design, 3D design with Fusion 360, 3D printing, and PLC for automation systems.',
        'exp.5.date':      '2022 – 2023',
        'exp.5.title':     'Volunteer – Coordinating Team for First-Year Students',
        'exp.5.place':     'Royal University of Phnom Penh',
        'exp.5.desc':      'Coordinated and supported incoming first-year students. Developed teamwork skills, built connections with fellow students, and gained valuable new experiences from peers.',

        /* ── Report ── */
        'rep.label':       'Academic',
        'rep.title':       'Report',
        'rep.files':       'Files',

        /* ── 3D CAD ── */
        'cad.label':       'Engineering Design',
        'cad.title':       '3D CAD Models',
        'cad.files':       'CAD Files & Downloads',

        /* ── Project ── */
        'proj.label':      'Personal Work',
        'proj.title':      'Projects',
        'proj.files':      'Project Files & Schematics',

        /* ── Battery ── */
        'bat.label':       'Energy Storage',
        'bat.title':       'Battery Pack',
        'bat.files':       'Battery Pack',

        /* ── Blog ── */
        'blog.label':      'Blog',
        'blog.title':      'Latest Posts',
        'blog.files':      'Blog Posts & Articles',

        /* ── Contact ── */
        'con.label':       'Contact',
        'con.title':       'Contact Me',
        'con.location':    'Location',
        'con.loc.val':     'Phnom Penh, Cambodia',
        'con.email':       'Email',
        'con.telegram':    'Telegram',

        /* ── Footer ── */
        'foot.copy':       '© 2025 PHORN SOVANNARA. All rights reserved. Made with',
        'foot.home':       'Home',
        'foot.port':       'Portfolio',
        'foot.contact':    'Contact',
    },

    kh: {
        /* ── Nav ── */
        'nav.home':        'ទំព័រដើម',
        'nav.features':    'សមត្ថភាព',
        'nav.portfolio':   'ស្នាដៃ',
        'nav.resume':      'ប្រវត្តិរូប',
        'nav.report':      'របាយការណ៍',
        'nav.cad':         '3D CAD',
        'nav.project':     'គម្រោង',
        'nav.battery':     'ថ្មអគ្គិសនី',
        'nav.blog':        'អត្ថបទ',
        'nav.contact':     'ទំនាក់ទំនង',
        'nav.hire':        'ជួលខ្ញុំ',

        /* ── Home ── */
        'home.subtitle':   'សូមស្វាគមន៍មកកាន់ពិភពរបស់ខ្ញុំ',
        'home.hi':         'សួស្ដី, ខ្ញុំឈ្មោះ',
        'home.desc':       'ចូលចិត្តវិស័យទូរគមនាគមន៍ និងអេឡិចត្រូនិក — រចនាសៀគ្វី, កសាងដ្រូន, បង្កើតម៉ូដែល 3D, និងអភិវឌ្ឍប្រព័ន្ធ IoT ដើម្បីដោះស្រាយបញ្ហាក្នុងជីវិតពិត។',
        'home.find':       'ស្វែងរកខ្ញុំ',
        'home.skills':     'ជំនាញសំខាន់',
        'home.projects':   'មើលគម្រោង',
        'home.cv':         'ទាញយក CV',

        /* ── Features ── */
        'feat.label':      'សមត្ថភាព',
        'feat.title':      'អ្វីដែលខ្ញុំធ្វើ',
        'feat.elec.title': 'អេឡិចត្រូនិក',
        'feat.elec.desc':  'រចនា និងបង្កើតសៀគ្វីអេឡិចត្រូនិក, ផ្ទាំង PCB, កម្មវិធី microcontroller ESP32, Arduino UNO និងប្រព័ន្ធ embedded សម្រាប់ប្រើប្រាស់ជាក់ស្ដែង។',
        'feat.cad.title':  '3D CAD',
        'feat.cad.desc':   'បង្កើតម៉ូដែល 3D លម្អិត និងគំនូររចនាសាស្ត្រ ដោយប្រើ Fusion 360 / SolidWorks សម្រាប់គ្រឿងបន្លាស់ វ៉ែនតា និងផ្នែកមេកានិច។',
        'feat.drone.title':'ដ្រូន',
        'feat.drone.desc': 'ប្រ៉ូតូតាយប៍ស៊ុម, ថ្មដ្រូន, ការประกอบ ស៊ុម, ការកំណត់ flight controller និង ESC សម្រាប់ដ្រូនតាមបញ្ជា។',
        'feat.bat.title':  'ថ្មអគ្គិសនី',
        'feat.bat.desc':   'រចនាថ្មលីចូម ជាមួយ BMS, ការបំបែក, ការស្មើសមតុល្យ, និងការការពារសុវត្ថិភាព សម្រាប់ e-bike, ដ្រូន, និង powerwall។',
        'feat.iot.title':  'គម្រោង IoT',
        'feat.iot.desc':   'អភិវឌ្ឍដំណោះស្រាយ IoT ដោយប្រើ ESP32, Arduino, និង cloud platform សម្រាប់ការត្រួតពិនិត្យ ស្វ័យប្រវត្តិ និងប្រព័ន្ធគ្រប់គ្រងពីចម្ងាយ។',
        'feat.print.title':'សេវាកម្មរចនា និងបោះពុម្ព 3D',
        'feat.print.desc': 'សេវាកម្មពេញលេញ ចាប់ពីរចនាម៉ូដែល 3D រហូតដល់ការបោះពុម្ព — ប្រ៉ូតូតាយប៍ផ្នែក, ប្រអប់, ជំនើប, និងប្រើប្រើ FDM និង resin printer។',

        /* ── Portfolio ── */
        'port.label':      'ចូលមើលស្នាដៃ ហើយចែករំលែកយោបល់',
        'port.title':      'ស្នាដៃរបស់ខ្ញុំ',
        'port.files':      'ឯកសារ និងគម្រោង',

        /* ── Resume ── */
        'res.label':       'ប្រវត្តិរូប',
        'res.title':       'មូលដ្ឋានរបស់ខ្ញុំ',
        'res.tab.edu':     'ការសិក្សា',
        'res.tab.exp':     'បទពិសោធន៍',
        'res.tab.skills':  'ជំនាញ',

        /* Education */
        'edu.1.date':      '២០២១ – ២០២៥',
        'edu.1.title':     'វិស្វកម្មទូរគមនាគមន៍ និងអេឡិចត្រូនិក',
        'edu.1.place':     'សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ',
        'edu.1.desc':      'សិក្សាអំពីដំណើរការសញ្ញា, រចនាសៀគ្វី, បណ្តាញ, ទំនាក់ទំនង RF, និងអគ្គិសនីថាមពល។',
        'edu.2.date':      '២០១៥ – ២០២១',
        'edu.2.title':     'សញ្ញាបត្រមធ្យមសិក្សា',
        'edu.2.place':     'វិទ្យាល័យសុខអាន ខ្វាវ, ខេត្តតាកែវ',
        'edu.2.desc':      '',

        /* Experience */
        'exp.1.date':      'បច្ចុប្បន្ន',
        'exp.1.title':     'បច្ចេកទេស – ប្រព័ន្ធថ្ម និងថាមពលព្រះអាទិត្យ',
        'exp.1.place':     'BS Power',
        'exp.1.desc':      'ធ្វើការលើការประกอบ ថ្ម ចាប់ពី 7.2V ដល់ 98V (5kWh – 15kWh)។ មានចំណេះដឹងអំពី BMS, ការគ្រប់គ្រងថ្ម, ប្រព័ន្ធព្រះអាទិត្យ, និង inverter។',
        'exp.2.date':      'ឆ្នាំទី ៣, វគ្គទី ១',
        'exp.2.title':     'ហាត់ការ – Process DIY',
        'exp.2.place':     'Process DIY',
        'exp.2.desc':      'ធ្វើការលើគម្រោង DIY ទាក់ទងនឹងការរចនា 3D (CAD) និងសេវាកម្មរចនា។ បានប្រើ machine បោះពុម្ព 3D និង machine កាត់ laser ។',
        'exp.3.date':      '២០២៣ – ២០២៤',
        'exp.3.title':     'សមាជិក – ក្លឹបរ៉ូបូ',
        'exp.3.place':     'សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ',
        'exp.3.desc':      'សមាជិកសកម្មនៃក្លឹបរ៉ូបូ RUPP។ ទទួលបានបទពិសោធន៍ថ្មី ការងារជាក្រុម និងយល់ដឹងអំពីដំណើរការ engineering ។',
        'exp.4.date':      '២០២១ – បច្ចុប្បន្ន',
        'exp.4.title':     'បទពិសោធន៍ Teacher – ទ្រឹស្ដី និងអនុវត្ត',
        'exp.4.place':     'សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ',
        'exp.4.desc':      'ការសិក្សាទ្រឹស្ដី-អនុវត្ត: សៀគ្វីអេឡិចត្រូនិក, អង់តែននា, រ៉ូបូ, PCB, 3D Fusion 360, បោះពុម្ព 3D, PLC។',
        'exp.5.date':      '២០២២ – ២០២៣',
        'exp.5.title':     'អ្នកស្ម័គ្រចិត្ត – ក្រុមសំរបសំរួលសិស្សឆ្នាំទី ១',
        'exp.5.place':     'សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ',
        'exp.5.desc':      'ធ្វើការសំរបសំរួល និងជួយ​ដល់​សិស្ស​ចូលថ្មី​ឆ្នាំ​ទី ១ ។ បានពង្រឹងជំនាញ teamwork និងបានទទួលបទពិសោធន៍ថ្មីៗ។',

        /* ── Report ── */
        'rep.label':       'សិក្សា',
        'rep.title':       'របាយការណ៍',
        'rep.files':       'ឯកសារ',

        /* ── 3D CAD ── */
        'cad.label':       'ការរចនាវិស្វកម្ម',
        'cad.title':       'ម៉ូដែល 3D CAD',
        'cad.files':       'ឯកសារ CAD & ទាញយក',

        /* ── Project ── */
        'proj.label':      'ការងារផ្ទាល់ខ្លួន',
        'proj.title':      'គម្រោង',
        'proj.files':      'ឯកសារ & Schema',

        /* ── Battery ── */
        'bat.label':       'ការផ្ទុកថាមពល',
        'bat.title':       'ថ្មអគ្គិសនី',
        'bat.files':       'ថ្មអគ្គិសនី',

        /* ── Blog ── */
        'blog.label':      'អត្ថបទ',
        'blog.title':      'អត្ថបទថ្មីៗ',
        'blog.files':      'អត្ថបទ & ការសរសេរ',

        /* ── Contact ── */
        'con.label':       'ទំនាក់ទំនង',
        'con.title':       'ទំនាក់ទំនងខ្ញុំ',
        'con.location':    'ទីតាំង',
        'con.loc.val':     'ភ្នំពេញ, កម្ពុជា',
        'con.email':       'អ៊ីម៉ែល',
        'con.telegram':    'តេឡេក្រាម',

        /* ── Footer ── */
        'foot.copy':       '© 2025 ភន សុវណ្ណារ៉ា។ រក្សាសិទ្ធិគ្រប់យ៉ាង។ បង្កើតដោយ',
        'foot.home':       'ទំព័រដើម',
        'foot.port':       'ស្នាដៃ',
        'foot.contact':    'ទំនាក់ទំនង',
    }
};

/* ── Apply translations ── */
function applyLang(lang) {
    const t = TRANSLATIONS[lang];
    if (!t) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) {
            /* Preserve child elements (icons etc) that are NOT text */
            if (el.children.length === 0) {
                el.textContent = t[key];
            } else {
                /* replace only the first text node */
                const tn = [...el.childNodes].find(n => n.nodeType === 3);
                if (tn) tn.textContent = t[key];
                else el.insertBefore(document.createTextNode(t[key]), el.firstChild);
            }
        }
    });

    /* Typed.js role lines don't use data-i18n — update them separately */
    if (lang === 'kh') {
        document.documentElement.lang = 'km';
    } else {
        document.documentElement.lang = 'en';
    }

    /* Save preference */
    localStorage.setItem('lang', lang);

    /* Update button label */
    const btn = document.getElementById('langToggle');
    if (btn) {
        btn.querySelector('.lang-label').textContent = lang === 'en' ? 'ខ្មែរ' : 'ENG';
        btn.querySelector('.lang-flag').textContent  = lang === 'en' ? '🇰🇭' : '🇬🇧';
    }

    /* Khmer font — load Noto Sans Khmer once, toggle body class each time */
    if (lang === 'kh') {
        if (!document.getElementById('khmerFont')) {
            const link = document.createElement('link');
            link.id   = 'khmerFont';
            link.rel  = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer:wght@300;400;500;600;700;800;900&display=swap';
            document.head.appendChild(link);
        }
        document.body.classList.add('lang-kh');
    } else {
        document.body.classList.remove('lang-kh');
    }
}

/* ── Boot ── */
(function () {
    const saved = localStorage.getItem('lang') || 'en';

    /* Inject toggle button into nav-actions */
    function injectBtn() {
        const actions = document.querySelector('.nav-actions');
        if (!actions || document.getElementById('langToggle')) return;

        const btn = document.createElement('button');
        btn.id        = 'langToggle';
        btn.className = 'lang-toggle';
        btn.setAttribute('aria-label', 'Toggle language');
        btn.innerHTML = `<span class="lang-flag">🇬🇧</span><span class="lang-label">ខ្មែរ</span>`;

        /* Insert before theme toggle */
        const themeBtn = document.getElementById('themeToggle');
        actions.insertBefore(btn, themeBtn || actions.firstChild);

        btn.addEventListener('click', () => {
            const current = localStorage.getItem('lang') || 'en';
            applyLang(current === 'en' ? 'kh' : 'en');
        });
    }

    /* Inject CSS for the button */
    const style = document.createElement('style');
    style.textContent = `
.lang-toggle {
    display: inline-flex;
    align-items: center;
    gap: .3rem;
    padding: .3rem .7rem;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--card);
    color: var(--text);
    font-family: var(--font-body);
    font-size: .78rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: var(--shadow-sm);
    transition: var(--t);
    white-space: nowrap;
    line-height: 1;
    letter-spacing: .01em;
}
.lang-toggle:hover {
    border-color: var(--red);
    color: var(--red);
    transform: translateY(-1px);
}
.lang-flag { font-size: .95rem; }

/* Khmer body font override — Noto Sans Khmer replaces Poppins when lang-kh active */
body.lang-kh,
body.lang-kh p,
body.lang-kh span,
body.lang-kh a,
body.lang-kh li,
body.lang-kh .home-description,
body.lang-kh .feature-card p,
body.lang-kh .timeline-card p,
body.lang-kh .timeline-company,
body.lang-kh .section-intro,
body.lang-kh .gdv-proj-desc,
body.lang-kh .gdv-card-desc,
body.lang-kh .gdv-proj-title,
body.lang-kh .gdv-card-title,
body.lang-kh .nav-link,
body.lang-kh .home-subtitle,
body.lang-kh .meta-label,
body.lang-kh .btn,
body.lang-kh .tab-btn,
body.lang-kh .filter-btn,
body.lang-kh .footer-text,
body.lang-kh .footer-links a {
    font-family: 'Noto Sans Khmer', sans-serif;
    line-height: 1.9;
}
body.lang-kh h1,
body.lang-kh h2,
body.lang-kh h3,
body.lang-kh h4,
body.lang-kh .home-title,
body.lang-kh #typed-role,
body.lang-kh .typed-line2,
body.lang-kh .section-title h1,
body.lang-kh .timeline-card h3,
body.lang-kh .feature-card h3,
body.lang-kh .gdv-proj-title,
body.lang-kh .contact-card h4 {
    font-family: 'Noto Sans Khmer', sans-serif;
    font-weight: 700;
    line-height: 1.6;
    letter-spacing: 0;
}
/* Light-mode lang toggle */
body.light-mode .lang-toggle {
    background: #FFFBFE;
    border-color: #CAC4D0;
    color: #49454F;
}
body.light-mode .lang-toggle:hover {
    border-color: #B3001B;
    color: #B3001B;
    background: rgba(179,0,27,.05);
}
    `;
    document.head.appendChild(style);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => { injectBtn(); applyLang(saved); });
    } else {
        injectBtn();
        applyLang(saved);
    }
})();
