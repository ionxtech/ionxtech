document.addEventListener("DOMContentLoaded", function () {
    // 1. Determine relative path to root based on current folder depth
    // If we are in 'privacy-policy/', we need to go up one level ('../')
    // If we are at root, we need nothing ('./')
    const path = window.location.pathname;
    let rootPath = "./";
    
    if (path.includes("/privacy-policy/")) {
        rootPath = "../";
    } else if (path.includes("/apps/")) {
        if (path.endsWith("/apps/") || path.endsWith("/apps/index.html")) {
            rootPath = "../";
        } else {
            rootPath = "../../";
        }
    }

    // 2. Define the Header HTML
    const headerHTML = `
    <div class="container navbar">
        <a href="${rootPath}index.html" class="brand">
            <img src="${rootPath}assets/images/IonXtech.png" alt="ionXtech" class="brand-logo-img">
            <span class="brand-text">ionXtech</span>
        </a>
        <button class="nav-toggle" aria-controls="nav-menu" aria-expanded="false" aria-label="Toggle menu">
            <i class="fa-solid fa-bars"></i>
        </button>
        <nav id="nav-menu" class="nav-menu" aria-hidden="true">
            <ul>
                <li class="nav-item dropdown">
                    <a href="${rootPath}apps/" class="dropdown-toggle" aria-haspopup="true" aria-expanded="false">Apps</a>
                    <ul class="dropdown-menu" role="menu" aria-label="Apps submenu">
                        <li><a href="${rootPath}apps/qr-solution/">QR Solutions</a></li>
                        <li><a href="${rootPath}apps/privacy-display/">Privacy Display</a></li>
                        <li><a href="${rootPath}privacy-policy/led-scroller.html">LED Scroller</a></li>
                        <li><a href="${rootPath}privacy-policy/auto-call-scheduler.html">Auto Call Scheduler</a></li>
                    </ul>
                </li>
                <li class="nav-item"><a href="${rootPath}about.html">About</a></li>
            </ul>
        </nav>
    </div>
    `;

    // 3. Define the Footer HTML
    const footerHTML = `
    <div class="container footer-grid">
        <div class="footer-left">
            <h4>Company Address</h4>
            <p>Anoop Nagar<br>Indore, Madhya Pradesh- 452018</p>
        </div>
        <div class="footer-center">
            <div class="footer-links">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="${rootPath}about.html">About Us</a></li>
                    <li><a href="${rootPath}team.html">Our Team</a></li>
                    <li><a href="${rootPath}careers.html">Careers</a></li>
                    <li><a href="${rootPath}contact.html">Contact Us</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-right">
            <div class="footer-company">
                <h4>AboutCompany</h4>
                <ul>
                    <li><a href="${rootPath}privacy-policy/">Privacy Policy</a></li>
                    <li><a href="${rootPath}terms.html">Terms Of Use</a></li>
                    <li><a href="${rootPath}faqs.html">FAQs</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="container footer-bottom">
        <div class="bottom-left">&copy; 2025 - 2026 ionXtech. All rights reserved.</div>
        <div class="bottom-center">
            <span class="footer-socials" aria-label="Follow ionXtech on social media">
                <a href="#" class="social" aria-label="Facebook"><img src="${rootPath}assets/images/social-facebook.svg" alt="Facebook" class="social-icon"></a>
                <a href="#" class="social" aria-label="Instagram"><img src="${rootPath}assets/images/social-instagram.svg" alt="Instagram" class="social-icon"></a>
                <a href="#" class="social" aria-label="X"><img src="${rootPath}assets/images/social-x.svg" alt="X" class="social-icon"></a>
                <a href="#" class="social" aria-label="LinkedIn"><img src="${rootPath}assets/images/social-linkedin.svg" alt="LinkedIn" class="social-icon"></a>
            </span>
        </div>
        <div class="bottom-right"></div>
    </div>
    `;

    // 4. Inject into DOM
    // Add skip link at top of body for keyboard users
    if (!document.querySelector('.skip-link')) {
        document.body.insertAdjacentHTML('afterbegin', '<a href="#main" class="skip-link">Skip to main content</a>');
    }
    document.querySelector("header").innerHTML = headerHTML;
    document.querySelector("footer").innerHTML = footerHTML;

    // Add header interactivity (hamburger toggle)
    const toggleBtn = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const isOpen = navMenu.classList.contains('open');
            toggleBtn.setAttribute('aria-expanded', isOpen);
            navMenu.setAttribute('aria-hidden', !isOpen);
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target) && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                toggleBtn.setAttribute('aria-expanded', false);
                navMenu.setAttribute('aria-hidden', true);
            }
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                toggleBtn.setAttribute('aria-expanded', false);
                navMenu.setAttribute('aria-hidden', true);
                toggleBtn.focus();
            }
            // Close any open dropdowns on Escape
            if (e.key === 'Escape') {
                document.querySelectorAll('.nav-item.dropdown.open').forEach(d => {
                    d.classList.remove('open');
                    const ddToggle = d.querySelector('.dropdown-toggle');
                    if (ddToggle) ddToggle.setAttribute('aria-expanded', 'false');
                });
            }
        });

        // Dropdown behavior for Apps menu (hover on desktop, click on mobile)
        const dropdowns = document.querySelectorAll('.nav-item.dropdown');
        dropdowns.forEach(dd => {
            let openTimer = null;
            let closeTimer = null;
            const toggle = dd.querySelector('.dropdown-toggle');

            // Delayed open on mouse enter
            dd.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    clearTimeout(closeTimer);
                    openTimer = setTimeout(() => {
                        dd.classList.add('open');
                        if (toggle) toggle.setAttribute('aria-expanded','true');
                    }, 200); // 200ms delay to avoid accidental opens
                }
            });

            // Delayed close on mouse leave
            dd.addEventListener('mouseleave', () => {
                if (window.innerWidth > 768) {
                    clearTimeout(openTimer);
                    closeTimer = setTimeout(() => {
                        dd.classList.remove('open');
                        if (toggle) toggle.setAttribute('aria-expanded','false');
                    }, 250); // small delay so moving near the menu doesn't close it immediately
                }
            });

            if (toggle) {
                // Click toggles the dropdown on mobile and keyboard
                toggle.addEventListener('click', (ev) => {
                    if (window.innerWidth <= 768) {
                        ev.preventDefault();
                        dd.classList.toggle('open');
                        const expanded = dd.classList.contains('open');
                        toggle.setAttribute('aria-expanded', expanded);
                    }
                });

                toggle.addEventListener('keydown', (ev) => {
                    if (ev.key === 'Enter' || ev.key === ' ') {
                        ev.preventDefault();
                        dd.classList.toggle('open');
                        toggle.setAttribute('aria-expanded', dd.classList.contains('open'));
                    }
                });

                // Make focus open/blur close with short delays for keyboard users
                toggle.addEventListener('focus', () => {
                    if (window.innerWidth > 768) {
                        clearTimeout(closeTimer);
                        openTimer = setTimeout(() => {
                            dd.classList.add('open');
                            toggle.setAttribute('aria-expanded','true');
                        }, 150);
                    }
                });
                toggle.addEventListener('blur', () => {
                    if (window.innerWidth > 768) {
                        clearTimeout(openTimer);
                        closeTimer = setTimeout(() => {
                            dd.classList.remove('open');
                            toggle.setAttribute('aria-expanded','false');
                        }, 200);
                    }
                });
            }
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            document.querySelectorAll('.nav-item.dropdown.open').forEach(o => {
                if (!o.contains(e.target)) {
                    o.classList.remove('open');
                    const t = o.querySelector('.dropdown-toggle'); if (t) t.setAttribute('aria-expanded','false');
                }
            });
        });
    }

    // Make entire card clickable when it has .card-link, but ignore clicks on actual anchors/buttons inside
    document.addEventListener('click', (e) => {
        const card = e.target.closest && e.target.closest('.card-link');
        if (!card) return;
        if (e.target.closest('a') || e.target.closest('button')) return; // let link/button handle it
        const page = card.getAttribute('data-page');
        if (page) {
            window.location.href = page;
        }
    });

    // Keyboard activation for card links (Enter or Space)
    document.addEventListener('keydown', (e) => {
        const active = document.activeElement;
        if (!active || !active.classList) return;
        if (!active.classList.contains('card-link')) return;
        if (e.key === 'Enter' || e.key === ' ') {
            const page = active.getAttribute('data-page');
            if (page) {
                window.location.href = page;
            }
        }
    });
});
