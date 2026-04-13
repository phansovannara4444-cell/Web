/* ============ PHORN SOVANNARA – Portfolio JS ============ */

/* ===== Theme Toggle ===== */
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') document.body.classList.add('light-mode');

themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
});

/* ===== Nav Toggle ===== */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navToggle.innerHTML = navMenu.classList.contains('open')
        ? '<i class="ri-close-line"></i>'
        : '<i class="ri-menu-3-line"></i>';
});

/* ===== Header scroll ===== */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
    document.getElementById('backTop')?.classList.toggle('show', window.scrollY > 400);
});

/* ===== Active nav link ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
            });
        }
    });
}, { threshold: 0.3 }).observe !== undefined && (() => {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
                });
            }
        });
    }, { threshold: 0.25 });
    sections.forEach(s => obs.observe(s));
})();

/* ===== Typed.js ===== */
window.addEventListener('load', () => {
    if (typeof Typed !== 'undefined') {
        new Typed('#typed-role', {
            strings: ['Telecommunications &'],
            typeSpeed: 60,
            backSpeed: 0,
            loop: false,
            showCursor: false,
            onComplete: function() {
                new Typed('#typed-role2', {
                    strings: ['Electronic Engineering'],
                    typeSpeed: 60,
                    backSpeed: 0,
                    loop: false,
                    showCursor: true,
                    cursorChar: '|',
                    onComplete: function(self) {
                        setTimeout(() => { self.cursor.style.display = 'none'; }, 1500);
                    }
                });
            }
        });
    }
});

/* ===== Portfolio Filter ===== */
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.portfolio-item').forEach(item => {
            const show = filter === 'all' || item.dataset.category === filter;
            item.style.display = show ? 'block' : 'none';
            if (show) item.style.animation = 'fadeIn .35s ease forwards';
        });
    });
});

/* ===== Resume Tabs ===== */
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab)?.classList.add('active');
        if (btn.dataset.tab === 'skills') animateSkillBars();
    });
});

/* ===== Skill bars ===== */
function animateSkillBars() {
    document.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 100);
    });
}
const resumeObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateSkillBars(); resumeObs.disconnect(); }
}, { threshold: 0.3 });
const resumeEl = document.getElementById('resume');
if (resumeEl) resumeObs.observe(resumeEl);

/* ===== Close menu on link click ===== */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        if (navToggle) navToggle.innerHTML = '<i class="ri-menu-3-line"></i>';
    });
});

/* ===== Contact form ===== */
function submitForm(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type=submit]');
    const suc = document.getElementById('formSuccess');
    btn.disabled = true;
    btn.innerHTML = '<i class="ri-loader-4-line" style="animation:spin 1s linear infinite;display:inline-block"></i> Sending...';
    setTimeout(() => {
        btn.innerHTML = '<i class="ri-send-plane-fill"></i> Send Message';
        btn.disabled = false;
        suc.style.display = 'flex';
        e.target.reset();
        setTimeout(() => { suc.style.display = 'none'; }, 4000);
    }, 1500);
}

/* CV and report downloads now use direct Google Drive links */

/* ===== Toast ===== */
function showToast(msg, color) {
    document.querySelector('.toast')?.remove();
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<i class="ri-checkbox-circle-fill"></i> ${msg}`;
    t.style.cssText = `position:fixed;bottom:5rem;left:50%;transform:translateX(-50%);background:${color||'#10b981'};color:#fff;padding:.7rem 1.4rem;border-radius:.5rem;font-size:.875rem;font-weight:500;display:flex;align-items:center;gap:.5rem;box-shadow:0 4px 20px rgba(16,185,129,.35);z-index:9999;animation:slideIn .3s ease;white-space:nowrap;`;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

/* File upload removed — Google Drive handles all file sharing */

/* ===== Scroll animation for cards ===== */
const animObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0)';
            animObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll(
    '.feature-card, .portfolio-item, .blog-card, .timeline-card, .cad-card, .project-item, .battery-card, .report-card'
).forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    animObs.observe(el);
});

/* ===== CSS spin keyframe inject ===== */
const style = document.createElement('style');
style.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
document.head.appendChild(style);
