(function () {
    function getRootPath() {
        const explicitRoot = document.documentElement.getAttribute("data-root");
        if (explicitRoot) return explicitRoot;

        const path = window.location.pathname.replace(/\\/g, "/");
        if (path.includes("/privacy-policy/")) {
            return "../";
        }
        if (path.includes("/apps/")) {
            if (path.endsWith("/apps/") || path.endsWith("/apps/index.html")) {
                return "../";
            }
            return "../../";
        }
        return "./";
    }

    function escapeHtml(str) {
        return String(str || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function buildHeaderHTML(data, rootPath) {
        const path = window.location.pathname.replace(/\\/g, "/");
        const isApps = path.includes("/apps/");
        const isDomains = path.endsWith("/domains.html") || path.endsWith("/domains/");
        const isHosting = path.endsWith("/hosting.html") || path.endsWith("/hosting/");
        const isServices = path.endsWith("/services.html") || path.endsWith("/services/");

        return (
            '<div class="container navbar">' +
                '<a href="' + rootPath + 'index.html" class="brand" aria-label="ionXtech Home">' +
                    '<img src="' + rootPath + data.company.logo.path + '" alt="' + escapeHtml(data.company.logo.alt) + '" width="36" height="36" class="brand-logo-img">' +
                    '<span class="brand-text">ionXtech</span>' +
                '</a>' +
                '<nav id="nav-menu" class="nav-menu" aria-label="Primary Navigation">' +
                    '<ul>' +
                        '<li class="nav-item"><a href="' + rootPath + 'apps/" class="' + (isApps ? 'active' : '') + '">ionXapps</a></li>' +
                        '<li class="nav-item"><a href="' + rootPath + 'domains.html" class="' + (isDomains ? 'active' : '') + '">ionXdomains</a></li>' +
                        '<li class="nav-item"><a href="' + rootPath + 'hosting.html" class="' + (isHosting ? 'active' : '') + '">ionXhosting</a></li>' +
                        '<li class="nav-item"><a href="' + rootPath + 'services.html" class="' + (isServices ? 'active' : '') + '">ionXservices</a></li>' +
                    '</ul>' +
                '</nav>' +
                '<div class="header-actions">' +
                    '<a href="' + rootPath + 'contact.html" class="btn btn-sm">Talk to Sales</a>' +
                    '<button class="nav-toggle" aria-controls="nav-menu" aria-expanded="false" aria-label="Toggle navigation menu">Menu</button>' +
                '</div>' +
            '</div>'
        );
    }

    function buildFooterHTML(data, rootPath) {
        const socialItems = data.company.socials.map(function (s) {
            return (
                '<a href="' + escapeHtml(s.url) + '" class="social" target="_blank" rel="noopener noreferrer" aria-label="' + escapeHtml(s.alt) + '">' +
                    '<img src="' + rootPath + s.icon + '" alt="' + escapeHtml(s.alt) + '" width="20" height="20" class="social-icon">' +
                '</a>'
            );
        }).join("");

        return (
            '<div class="container footer-horizontal">' +
                '<div class="footer-brand-wrap">' +
                    '<a href="' + rootPath + 'index.html" class="brand">' +
                        '<img src="' + rootPath + data.company.logo.path + '" alt="' + escapeHtml(data.company.logo.alt) + '" width="32" height="32" class="brand-logo-img">' +
                        '<span class="brand-text">ionXtech</span>' +
                    '</a>' +
                    '<span class="footer-tagline">' + escapeHtml(data.company.tagline) + '</span>' +
                '</div>' +
                '<nav class="footer-company-nav" aria-label="Company Links">' +
                    '<a href="' + rootPath + 'about.html">About</a>' +
                    '<a href="' + rootPath + 'team.html">Our Team</a>' +
                    '<a href="' + rootPath + 'careers.html">Careers</a>' +
                    '<a href="' + rootPath + 'faqs.html">FAQs</a>' +
                    '<a href="' + rootPath + 'contact.html">Contact Us</a>' +
                '</nav>' +
                '<div class="footer-socials-inline" aria-label="Connect with ionXtech on social media">' +
                    socialItems +
                '</div>' +
            '</div>' +
            '<div class="container footer-bottom">' +
                '<div class="bottom-left">&copy; 2025 - 2026</div>' +
                '<div class="bottom-right">ionXtech. All rights reserved.</div>' +
            '</div>'
        );
    }

    function getRatingStars(ratingVal) {
        const val = parseFloat(ratingVal) || 0;
        const fullStars = Math.floor(val);
        const hasHalf = (val - fullStars) >= 0.3;
        let stars = "";
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars += "★";
            } else if (i === fullStars && hasHalf) {
                stars += "★";
            } else {
                stars += "☆";
            }
        }
        return stars;
    }

    function renderHomeShowcaseCard(app, rootPath) {
        const stars = getRatingStars(app.ratingValue);
        const taglineText = app.tagline || app.shortDescription;

        return (
            '<article class="knowledge-panel home-showcase-card card-link" data-page="' + rootPath + app.pageSlug + '" tabindex="0" role="link" aria-label="' + escapeHtml(app.name) + ' - Click to view app details">' +
                '<div>' +
                    '<div class="kp-top">' +
                        '<div class="app-header">' +
                            '<img src="' + rootPath + app.logo + '" alt="' + escapeHtml(app.logoAlt) + '" width="68" height="68" loading="lazy" class="app-logo">' +
                            '<div class="app-title-group">' +
                                '<h3>' + escapeHtml(app.name) + '</h3>' +
                                '<div class="app-rating-strip" aria-label="Rating ' + escapeHtml(app.ratingValue) + ' out of 5 stars, ' + escapeHtml(app.downloads) + ' downloads">' +
                                    '<span class="stars" aria-hidden="true">' + stars + '</span>' +
                                    '<span class="rating-num">' + escapeHtml(app.ratingValue) + '</span>' +
                                    '<span class="rating-divider">•</span>' +
                                    '<span class="downloads-count">' + escapeHtml(app.downloads) + ' Downloads</span>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<p class="kp-description">' + escapeHtml(taglineText) + '</p>' +
                '</div>' +
                '<div class="kp-footer">' +
                    '<div class="card-actions">' +
                        '<a href="' + escapeHtml(app.playStoreUrl) + '" class="btn btn-sm" target="_blank" rel="noopener noreferrer">Download app</a>' +
                        '<a href="' + rootPath + app.pageSlug + '" class="btn btn-secondary btn-sm">View App</a>' +
                    '</div>' +
                '</div>' +
            '</article>'
        );
    }

    function renderKnowledgePanelCard(app, rootPath) {
        return (
            '<article class="knowledge-panel card-link" data-page="' + rootPath + app.pageSlug + '" tabindex="0" role="link" aria-label="' + escapeHtml(app.name) + ' Knowledge Panel - Click to open dedicated app page">' +
                '<div>' +
                    '<div class="kp-top">' +
                        '<div class="app-header">' +
                            '<img src="' + rootPath + app.logo + '" alt="' + escapeHtml(app.logoAlt) + '" width="56" height="56" loading="lazy" class="app-logo">' +
                            '<div class="app-title-group">' +
                                '<h3>' + escapeHtml(app.name) + '</h3>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<p class="kp-description">' + escapeHtml(app.shortDescription) + '</p>' +
                    '<div class="kp-meta-table" aria-label="App Knowledge Panel Specifications">' +
                        '<div class="kp-meta-item">' +
                            '<span class="kp-meta-label">Rating &amp; Installs</span>' +
                            '<span class="kp-meta-value">' + escapeHtml(app.rating) + ' (' + escapeHtml(app.downloads) + ')</span>' +
                        '</div>' +
                        '<div class="kp-meta-item">' +
                            '<span class="kp-meta-label">Data Architecture</span>' +
                            '<span class="kp-meta-value">' + escapeHtml(app.dataPolicy) + '</span>' +
                        '</div>' +
                        '<div class="kp-meta-item">' +
                            '<span class="kp-meta-label">Package ID</span>' +
                            '<span class="kp-meta-value"><code>' + escapeHtml(app.packageId) + '</code></span>' +
                        '</div>' +
                        '<div class="kp-meta-item">' +
                            '<span class="kp-meta-label">Offline Mode</span>' +
                            '<span class="kp-meta-value">' + escapeHtml(app.offlineSupport) + '</span>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="kp-footer">' +
                    '<div class="card-actions">' +
                        '<a href="' + escapeHtml(app.playStoreUrl) + '" class="btn btn-sm" target="_blank" rel="noopener noreferrer">Google Play Store</a>' +
                        '<a href="' + rootPath + app.privacySlug + '" class="btn btn-secondary btn-sm">Privacy Policy</a>' +
                    '</div>' +
                '</div>' +
            '</article>'
        );
    }

    function renderFaqAccordionList(faqs) {
        return faqs.map(function (item, idx) {
            return (
                '<details class="faq-accordion"' + (idx === 0 ? ' open' : '') + '>' +
                    '<summary>' + escapeHtml(item.question) + '</summary>' +
                    '<div class="faq-content"><p>' + escapeHtml(item.answer) + '</p></div>' +
                '</details>'
            );
        }).join("");
    }

    function injectFaqSchema(faqs, idSuffix) {
        if (!faqs || !faqs.length) return;
        const scriptId = "schema-faq-" + (idSuffix || "page");
        if (document.getElementById(scriptId)) return;

        const schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(function (f) {
                return {
                    "@type": "Question",
                    "name": f.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": f.answer
                    }
                };
            })
        };

        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = scriptId;
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    }

    function injectAppSchema(app) {
        const scriptId = "schema-app-" + app.id;
        if (document.getElementById(scriptId)) return;

        const schema = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": app.name,
            "operatingSystem": "Android",
            "applicationCategory": "UtilitiesApplication",
            "downloadUrl": app.playStoreUrl,
            "softwareVersion": "Latest",
            "description": app.shortDescription,
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": app.ratingValue,
                "ratingCount": app.ratingCount
            },
            "author": {
                "@type": "Organization",
                "name": "ionXtech",
                "url": "https://ionxtech.in"
            }
        };

        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = scriptId;
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    }

    function renderAppDetailPage(container, data, rootPath) {
        const appId = container.getAttribute("data-app-detail");
        const app = data.apps.find(function (a) { return a.id === appId; });
        if (!app) return;

        const overviewHtml = app.overview.map(function (p) {
            return '<p style="margin-bottom: 14px;">' + escapeHtml(p) + '</p>';
        }).join("");

        const featuresHtml = app.features.map(function (f) {
            return (
                '<li>' +
                    '<strong>' + escapeHtml(f.title) + '</strong>' +
                    '<span>' + escapeHtml(f.description) + '</span>' +
                '</li>'
            );
        }).join("");

        const specsHtml = app.specs.map(function (s) {
            return (
                '<tr>' +
                    '<th>' + escapeHtml(s.label) + '</th>' +
                    '<td>' + escapeHtml(s.value) + '</td>' +
                '</tr>'
            );
        }).join("");

        const otherAppsHtml = data.apps
            .filter(function (a) { return a.id !== app.id; })
            .map(function (a) {
                return renderKnowledgePanelCard(a, rootPath);
            }).join("");

        container.innerHTML =
            '<div class="page-header">' +
                '<div class="container">' +
                    '<h1>' + escapeHtml(app.name) + '</h1>' +
                    '<p>' + escapeHtml(app.tagline) + '</p>' +
                '</div>' +
            '</div>' +
            '<div class="container">' +
                '<section class="app-detail-hero" aria-label="Application Knowledge Overview">' +
                    '<div class="app-detail-top">' +
                        '<div class="app-detail-identity">' +
                            '<img src="' + rootPath + app.logo + '" alt="' + escapeHtml(app.logoAlt) + '" width="76" height="76" class="app-detail-logo">' +
                            '<div>' +
                                '<h2 style="margin-bottom: 4px; font-size: 1.6rem;">' + escapeHtml(app.name) + '</h2>' +
                                '<p style="font-family: var(--font-mono); font-size: 0.84rem; color: var(--text-muted);">Package: ' + escapeHtml(app.packageId) + '</p>' +
                            '</div>' +
                        '</div>' +
                        '<div class="app-detail-actions">' +
                            '<a href="' + escapeHtml(app.playStoreUrl) + '" class="btn" target="_blank" rel="noopener noreferrer">Download on Google Play</a>' +
                            '<a href="' + rootPath + app.privacySlug + '" class="btn btn-secondary">Privacy Policy</a>' +
                        '</div>' +
                    '</div>' +
                    '<div class="app-specs-strip">' +
                        '<div>' +
                            '<span class="kp-meta-label">User Rating</span>' +
                            '<div class="kp-meta-value" style="margin-top: 4px;">' + escapeHtml(app.rating) + '</div>' +
                        '</div>' +
                        '<div>' +
                            '<span class="kp-meta-label">Total Installs</span>' +
                            '<div class="kp-meta-value" style="margin-top: 4px;">' + escapeHtml(app.downloads) + ' Downloads</div>' +
                        '</div>' +
                        '<div>' +
                            '<span class="kp-meta-label">Compatibility</span>' +
                            '<div class="kp-meta-value" style="margin-top: 4px;">' + escapeHtml(app.androidVersion) + '</div>' +
                        '</div>' +
                        '<div>' +
                            '<span class="kp-meta-label">Privacy Model</span>' +
                            '<div class="kp-meta-value" style="margin-top: 4px;">' + escapeHtml(app.dataPolicy) + '</div>' +
                        '</div>' +
                    '</div>' +
                '</section>' +

                '<section class="app-detail-columns">' +
                    '<div class="card">' +
                        '<span class="mono-label">Product Documentation</span>' +
                        '<h2 style="margin-top: 6px;">About ' + escapeHtml(app.name) + '</h2>' +
                        overviewHtml +
                        '<h3 style="margin-top: 24px;">Key Capabilities</h3>' +
                        '<ul class="feature-list">' +
                            featuresHtml +
                        '</ul>' +
                    '</div>' +
                    '<div style="display: flex; flex-direction: column; gap: 24px;">' +
                        '<div class="card">' +
                            '<span class="mono-label">Technical Profile</span>' +
                            '<h3 style="margin-top: 6px;">Specifications</h3>' +
                            '<table class="spec-table">' +
                                '<tbody>' + specsHtml + '</tbody>' +
                            '</table>' +
                        '</div>' +
                        '<div class="card">' +
                            '<span class="mono-label">Data Governance</span>' +
                            '<h3 style="margin-top: 6px;">Privacy &amp; Permissions</h3>' +
                            '<p style="margin-bottom: 16px;">We document every Android system permission requested by ' + escapeHtml(app.name) + ' and explain how your data stays protected on your device.</p>' +
                            '<div style="display: flex; flex-wrap: wrap; gap: 10px;">' +
                                '<a href="' + rootPath + app.privacySlug + '" class="btn btn-secondary btn-sm">Read ' + escapeHtml(app.name) + ' Privacy Policy</a>' +
                                '<a href="' + escapeHtml(app.playStoreUrl) + '" class="btn btn-sm" target="_blank" rel="noopener noreferrer">Get App on Play Store</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</section>' +

                '<section class="section" style="padding-top: 16px;">' +
                    '<div class="section-header">' +
                        '<div class="section-header-left">' +
                            '<span class="mono-label">Knowledge Base &amp; Search Console FAQ</span>' +
                            '<h2>Frequently Asked Questions: ' + escapeHtml(app.name) + '</h2>' +
                            '<p>Common questions about features, offline usage, Android permissions, and data privacy for ' + escapeHtml(app.name) + '.</p>' +
                        '</div>' +
                    '</div>' +
                    '<div class="faq-list">' +
                        renderFaqAccordionList(app.faqs) +
                    '</div>' +
                '</section>' +

                '<section class="section">' +
                    '<div class="section-header">' +
                        '<div class="section-header-left">' +
                            '<span class="mono-label">More from ionXtech</span>' +
                            '<h2>Explore Other Applications</h2>' +
                        '</div>' +
                        '<a href="' + rootPath + 'apps/" class="btn btn-secondary btn-sm">All Apps</a>' +
                    '</div>' +
                    '<div class="app-grid">' +
                        otherAppsHtml +
                    '</div>' +
                '</section>' +
            '</div>';

        injectAppSchema(app);
        injectFaqSchema(app.faqs, app.id);
    }

    function initHeroWordRotator(data) {
        const wordEl = document.getElementById("hero-rotating-word");
        if (!wordEl) return;

        const words = (data && data.company && data.company.heroRotatingWords) || ["tech", "apps", "hosting", "domains", "services"];
        const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let currentIndex = 0;

        wordEl.textContent = words[0];

        setInterval(function () {
            currentIndex = (currentIndex + 1) % words.length;
            const nextWord = words[currentIndex];
            if (reduceMotion) {
                wordEl.textContent = nextWord;
                return;
            }
            wordEl.classList.add("is-leaving");
            setTimeout(function () {
                wordEl.textContent = nextWord;
                wordEl.classList.remove("is-leaving");
            }, 260);
        }, 2400);
    }

    function initNavigationEvents() {
        const toggleBtn = document.querySelector(".nav-toggle");
        const navMenu = document.querySelector(".nav-menu");
        if (!toggleBtn || !navMenu) return;

        toggleBtn.addEventListener("click", function () {
            navMenu.classList.toggle("open");
            const isOpen = navMenu.classList.contains("open");
            toggleBtn.setAttribute("aria-expanded", String(isOpen));
            toggleBtn.textContent = isOpen ? "Close" : "Menu";
        });

        document.addEventListener("click", function (e) {
            if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target) && navMenu.classList.contains("open")) {
                navMenu.classList.remove("open");
                toggleBtn.setAttribute("aria-expanded", "false");
                toggleBtn.textContent = "Menu";
            }
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
                if (navMenu.classList.contains("open")) {
                    navMenu.classList.remove("open");
                    toggleBtn.setAttribute("aria-expanded", "false");
                    toggleBtn.textContent = "Menu";
                    toggleBtn.focus();
                }
                document.querySelectorAll(".nav-item.dropdown.open").forEach(function (d) {
                    d.classList.remove("open");
                    const ddToggle = d.querySelector(".dropdown-toggle");
                    if (ddToggle) ddToggle.setAttribute("aria-expanded", "false");
                });
            }
        });

        const dropdowns = document.querySelectorAll(".nav-item.dropdown");
        dropdowns.forEach(function (dd) {
            let closeTimer = null;
            const toggle = dd.querySelector(".dropdown-toggle");

            dd.addEventListener("mouseenter", function () {
                if (window.innerWidth > 768) {
                    clearTimeout(closeTimer);
                    dd.classList.add("open");
                    if (toggle) toggle.setAttribute("aria-expanded", "true");
                }
            });

            dd.addEventListener("mouseleave", function () {
                if (window.innerWidth > 768) {
                    closeTimer = setTimeout(function () {
                        dd.classList.remove("open");
                        if (toggle) toggle.setAttribute("aria-expanded", "false");
                    }, 180);
                }
            });

            if (toggle) {
                toggle.addEventListener("click", function (ev) {
                    if (window.innerWidth <= 768) {
                        ev.preventDefault();
                        dd.classList.toggle("open");
                        toggle.setAttribute("aria-expanded", String(dd.classList.contains("open")));
                    }
                });
            }
        });
    }

    function initCardLinkDelegation() {
        document.addEventListener("click", function (e) {
            const card = e.target.closest && e.target.closest(".card-link");
            if (!card) return;
            if (e.target.closest("a") || e.target.closest("button")) return;
            const page = card.getAttribute("data-page");
            if (page) {
                window.location.href = page;
            }
        });

        document.addEventListener("keydown", function (e) {
            const active = document.activeElement;
            if (!active || !active.classList || !active.classList.contains("card-link")) return;
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                const page = active.getAttribute("data-page");
                if (page) {
                    window.location.href = page;
                }
            }
        });
    }

    function renderReusableSections(data, rootPath) {
        if (!document.querySelector(".skip-link")) {
            document.body.insertAdjacentHTML("afterbegin", '<a href="#main" class="skip-link">Skip to main content</a>');
        }

        const headerEl = document.querySelector("header");
        if (headerEl) {
            headerEl.innerHTML = buildHeaderHTML(data, rootPath);
        }

        const footerEl = document.querySelector("footer");
        if (footerEl) {
            footerEl.innerHTML = buildFooterHTML(data, rootPath);
        }

        document.querySelectorAll('[data-component="app-knowledge-grid"]').forEach(function (gridEl) {
            const filterAttr = gridEl.getAttribute("data-apps");
            const ids = filterAttr ? filterAttr.split(",").map(function (s) { return s.trim(); }) : null;
            const list = ids
                ? ids.map(function (id) { return data.apps.find(function (a) { return a.id === id; }); }).filter(Boolean)
                : data.apps;
            const isHomeShowcase = gridEl.getAttribute("data-variant") === "home" || Boolean(filterAttr);
            gridEl.innerHTML = list.map(function (app) {
                return isHomeShowcase
                    ? renderHomeShowcaseCard(app, rootPath)
                    : renderKnowledgePanelCard(app, rootPath);
            }).join("");
        });

        document.querySelectorAll('[data-component="metrics-strip"]').forEach(function (el) {
            const metrics = data.company.metrics || [];
            el.innerHTML = metrics.map(function (m) {
                return (
                    '<div class="metric">' +
                        '<span class="metric-value">' + escapeHtml(m.value) + '</span>' +
                        '<span class="metric-label">' + escapeHtml(m.label) + '</span>' +
                    '</div>'
                );
            }).join("");
        });

        document.querySelectorAll('[data-component="divisions-grid"]').forEach(function (el) {
            el.innerHTML = data.divisions.map(function (d) {
                const live = d.status === "Live on Google Play" || d.status === "Parent Company";
                return (
                    '<div class="division-row">' +
                        '<span class="division-index">' + escapeHtml(d.index) + '</span>' +
                        '<h3 class="division-name">ionX<span>' + escapeHtml(d.key) + '</span></h3>' +
                        '<p class="division-desc">' + escapeHtml(d.description) + '</p>' +
                        '<span class="badge' + (live ? ' badge-accent' : '') + ' division-status">' + escapeHtml(d.status) + '</span>' +
                    '</div>'
                );
            }).join("");
        });

        document.querySelectorAll('[data-component="principles-grid"]').forEach(function (el) {
            el.innerHTML = data.principles.map(function (p) {
                return (
                    '<div class="spec-box">' +
                        '<span class="spec-index">PRINCIPLE ' + escapeHtml(p.index) + '</span>' +
                        '<h3>' + escapeHtml(p.title) + '</h3>' +
                        '<p>' + escapeHtml(p.description) + '</p>' +
                    '</div>'
                );
            }).join("");
        });

        document.querySelectorAll('[data-component="company-faqs"]').forEach(function (el) {
            const limit = parseInt(el.getAttribute("data-limit") || "0", 10);
            const list = limit > 0 ? data.companyFaqs.slice(0, limit) : data.companyFaqs;
            el.innerHTML = renderFaqAccordionList(list);
            injectFaqSchema(list, "company");
        });

        document.querySelectorAll('[data-component="privacy-grid"]').forEach(function (el) {
            el.innerHTML = data.apps.map(function (app) {
                return (
                    '<article class="knowledge-panel card-link" data-page="' + rootPath + app.privacySlug + '" tabindex="0" role="link" aria-label="Privacy Policy for ' + escapeHtml(app.name) + '">' +
                        '<div>' +
                            '<div class="kp-top">' +
                                '<div class="app-header">' +
                                    '<img src="' + rootPath + app.logo + '" alt="' + escapeHtml(app.logoAlt) + '" width="52" height="52" loading="lazy" class="app-logo">' +
                                    '<div class="app-title-group">' +
                                        '<span class="app-category">' + escapeHtml(app.packageId) + '</span>' +
                                        '<h3>' + escapeHtml(app.name) + '</h3>' +
                                    '</div>' +
                                '</div>' +
                                '<span class="badge">POLICY</span>' +
                            '</div>' +
                            '<p class="kp-description">Read the complete privacy policy, Android permission disclosures, and local data storage practices for ' + escapeHtml(app.name) + '.</p>' +
                        '</div>' +
                        '<div class="card-actions">' +
                            '<a href="' + rootPath + app.privacySlug + '" class="btn btn-sm">Read Privacy Policy</a>' +
                            '<a href="' + rootPath + app.pageSlug + '" class="btn btn-secondary btn-sm">App Knowledge Page</a>' +
                        '</div>' +
                    '</article>'
                );
            }).join("");
        });

        document.querySelectorAll('[data-app-detail]').forEach(function (el) {
            renderAppDetailPage(el, data, rootPath);
        });

        document.querySelectorAll('[data-component="waitlist-coming-soon"]').forEach(function (el) {
            renderWaitlistComingSoon(el, data);
        });

        document.querySelectorAll('.breadcrumb, .page-header .mono-label').forEach(function (el) {
            el.remove();
        });

        initNavigationEvents();
        initCardLinkDelegation();
        initHeroWordRotator(data);
        initInfinityLoopAnimations();
    }

    function renderWaitlistComingSoon(container, data) {
        document.body.classList.add("waitlist-page");
        if (window.innerWidth >= 992) {
            document.body.style.height = "100vh";
            document.body.style.overflow = "hidden";
            document.body.style.display = "flex";
            document.body.style.flexDirection = "column";
            document.body.style.justifyContent = "space-between";
            const mainEl = document.querySelector("main");
            if (mainEl) {
                mainEl.style.flex = "1";
                mainEl.style.display = "flex";
                mainEl.style.alignItems = "center";
                mainEl.style.justifyContent = "center";
                mainEl.style.minHeight = "0";
                mainEl.style.width = "100%";
            }
            const footerEl = document.querySelector("footer");
            if (footerEl) {
                footerEl.style.marginTop = "0";
                footerEl.style.padding = "18px 0 14px";
                footerEl.style.flexShrink = "0";
            }
        }
        container.style.width = "100%";
        container.style.display = "flex";
        container.style.alignItems = "center";
        container.style.justifyContent = "center";

        const divKey = container.getAttribute("data-division") || "domains";
        const division = (data.divisions || []).find(function (d) { return d.key === divKey; }) || {
            key: divKey,
            title: "ionX" + divKey,
            description: "Reliable digital infrastructure built for modern businesses."
        };
        const infinityPath = "M 91,31 L 149,89 A 41.01,41.01 0 1,0 149,31 L 91,89 A 41.01,41.01 0 1,1 91,31 Z";

        container.innerHTML =
            '<div class="container" style="display: flex; justify-content: center; align-items: center; width: 100%;">' +
                '<div class="waitlist-card" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; max-width: 680px; width: 100%; margin: 0 auto; padding: 8px 20px; background: transparent; border: none;">' +
                    '<div class="infinity-loop-wrap" aria-hidden="true" style="display: flex; justify-content: center; align-items: center; width: 100%; margin: 0 auto 8px;">' +
                        '<svg class="infinity-loop-svg" width="500" height="250" style="width: min(500px, 86vw); height: auto; max-height: 230px; display: block; margin: 0 auto;" viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">' +
                            '<defs>' +
                                '<filter id="infinity-red-glow-' + escapeHtml(divKey) + '" x="-60%" y="-60%" width="220%" height="220%">' +
                                    '<feGaussianBlur stdDeviation="3.2" result="blur" />' +
                                    '<feMerge>' +
                                        '<feMergeNode in="blur" />' +
                                        '<feMergeNode in="SourceGraphic" />' +
                                    '</feMerge>' +
                                '</filter>' +
                            '</defs>' +
                            '<path class="infinity-track" d="' + infinityPath + '" fill="none" stroke="#2B2B29" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />' +
                            '<g class="infinity-dot" filter="url(#infinity-red-glow-' + escapeHtml(divKey) + ')">' +
                                '<circle r="14" fill="#FF0000" opacity="0.35" />' +
                                '<circle r="11.5" fill="#FF0000" />' +
                            '</g>' +
                        '</svg>' +
                    '</div>' +
                    '<h1 class="waitlist-title" style="text-align: center; width: 100%; font-size: clamp(1.9rem, 3.8vw, 2.5rem); font-weight: 800; letter-spacing: -0.04em; margin: 0 auto 6px; color: var(--text);">ionX<span style="color: var(--accent);">' + escapeHtml(division.key) + '</span></h1>' +
                    '<p class="waitlist-loop-heading" style="text-align: center; width: 100%; font-size: 1.12rem; font-weight: 700; color: var(--text); margin: 0 auto 8px;">Stay in the loop</p>' +
                    '<p class="waitlist-subtitle" style="text-align: center; width: 100%; max-width: 560px; color: var(--text-secondary); font-size: 0.96rem; line-height: 1.6; margin: 0 auto 6px;">' + escapeHtml(division.description) + '</p>' +
                    '<p class="waitlist-cta-line" style="text-align: center; width: 100%; max-width: 540px; color: var(--text); font-size: 0.93rem; font-weight: 600; line-height: 1.55; margin: 0 auto 16px;">Enter your email below to join the waitlist and be the first to know when we launch.</p>' +
                    '<form class="waitlist-form" data-division="' + escapeHtml(division.key) + '" style="display: flex; justify-content: center; align-items: center; width: 100%; margin: 0 auto;">' +
                        '<div class="waitlist-input-shell" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; margin: 0 auto; padding: 5px; background: #FFFFFF; border: 1.5px solid #D5D2C8; border-radius: 8px; box-shadow: 0 2px 8px rgba(20, 20, 19, 0.04);">' +
                            '<input type="email" class="waitlist-input" name="email" required placeholder="Enter your email address" aria-label="Email address for waitlist" style="width: 230px; max-width: 58vw; height: 36px; border: 1px solid #E4E2DD; border-radius: 6px; background: #F8F7F4; padding: 6px 12px; font-family: var(--font-sans); font-size: 0.86rem; font-weight: 500; color: var(--text); text-align: center; outline: none; box-sizing: border-box;">' +
                            '<button type="submit" class="btn btn-sm waitlist-btn" style="height: 36px; padding: 0 18px; font-size: 0.86rem; background-color: var(--accent); border-color: var(--accent); color: #FFFFFF; flex-shrink: 0;">Join Waitlist</button>' +
                        '</div>' +
                    '</form>' +
                    '<p class="waitlist-note" style="text-align: center; width: 100%; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); margin: 12px auto 0;">Zero spam. Priority launch updates for ionX' + escapeHtml(division.key) + '.</p>' +
                '</div>' +
            '</div>';

        const formEl = container.querySelector(".waitlist-form");
        const inputEl = container.querySelector(".waitlist-input");

        if (formEl) {
            formEl.addEventListener("submit", function (e) {
                e.preventDefault();
                const emailVal = (inputEl && inputEl.value ? inputEl.value.trim() : "");
                if (!emailVal) return;
                try {
                    localStorage.setItem("ionx_waitlist_" + divKey, emailVal);
                } catch (err) {
                    // ignore storage errors
                }
                const endpoint = data && data.company && data.company.r2WorkerEndpoint;
                if (endpoint && !endpoint.includes("YOUR-SUBDOMAIN")) {
                    fetch(endpoint, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            type: "waitlist",
                            division: divKey,
                            email: emailVal
                        })
                    }).catch(function () {
                        // silent fallback if offline
                    });
                }
                if (inputEl) {
                    inputEl.value = "";
                }
                showWaitlistPopup(emailVal, division.key);
            });
        }
    }

    function showWaitlistPopup(email, divKey) {
        const existing = document.getElementById("waitlist-modal-overlay");
        if (existing) {
            existing.remove();
        }

        const overlay = document.createElement("div");
        overlay.id = "waitlist-modal-overlay";
        overlay.className = "waitlist-modal-overlay";
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-modal", "true");
        overlay.setAttribute("aria-labelledby", "waitlist-modal-title");
        overlay.style.cssText = "position: fixed; inset: 0; z-index: 9999; background: rgba(20, 20, 19, 0.48); display: flex; align-items: center; justify-content: center; padding: 24px;";

        overlay.innerHTML =
            '<div class="waitlist-modal" style="background: #FFFFFF; border: 1px solid #D5D2C8; border-radius: 12px; padding: 36px 32px; max-width: 440px; width: 100%; text-align: center; box-shadow: 0 20px 50px rgba(20, 20, 19, 0.16); display: flex; flex-direction: column; align-items: center;">' +
                '<span class="badge badge-accent waitlist-modal-badge" style="margin-bottom: 12px;">WAITLIST CONFIRMED</span>' +
                '<h2 id="waitlist-modal-title" class="waitlist-modal-title" style="font-size: 1.55rem; font-weight: 800; letter-spacing: -0.03em; color: var(--text); margin-bottom: 10px; text-align: center;">You\'re on the waitlist!</h2>' +
                '<p class="waitlist-modal-text" style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px; text-align: center;">We\'ve added <strong style="color: var(--text);">' + escapeHtml(email) + '</strong> to the <strong style="color: var(--text);">ionX<span style="color: var(--accent);">' + escapeHtml(divKey) + '</span></strong> priority list. You\'re officially in the loop and will be notified first as soon as early access opens.</p>' +
                '<button type="button" class="btn waitlist-modal-close" style="min-width: 160px; background-color: var(--accent); border-color: var(--accent); color: #FFFFFF;">Got it, thanks</button>' +
            '</div>';

        document.body.appendChild(overlay);

        const closeBtn = overlay.querySelector(".waitlist-modal-close");
        function closeModal() {
            overlay.remove();
            document.removeEventListener("keydown", onKeyDown);
        }
        function onKeyDown(ev) {
            if (ev.key === "Escape") {
                closeModal();
            }
        }

        if (closeBtn) {
            closeBtn.focus();
            closeBtn.addEventListener("click", closeModal);
        }
        overlay.addEventListener("click", function (ev) {
            if (ev.target === overlay) {
                closeModal();
            }
        });
        document.addEventListener("keydown", onKeyDown);
    }

    function initInfinityLoopAnimations() {
        const svgs = document.querySelectorAll(".infinity-loop-svg");
        if (!svgs.length) return;

        svgs.forEach(function (svg) {
            const track = svg.querySelector(".infinity-track");
            const dot = svg.querySelector(".infinity-dot");
            if (!track || !dot || typeof track.getTotalLength !== "function") return;

            const totalLen = track.getTotalLength();
            if (!totalLen) return;

            const durationMs = 3800;
            let startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                const elapsed = (timestamp - startTime) % durationMs;
                const progress = elapsed / durationMs;
                const pt = track.getPointAtLength(progress * totalLen);
                dot.setAttribute("transform", "translate(" + pt.x.toFixed(2) + "," + pt.y.toFixed(2) + ")");
                window.requestAnimationFrame(step);
            }

            window.requestAnimationFrame(step);
        });
    }

    function initDesktopScrollSnap() {
        if (!document.body.classList.contains("home-page")) return;
        
        // Validation: verify if client is desktop (non-touch and screen width >= 992px)
        const isDesktop = window.matchMedia("(min-width: 992px) and (hover: hover) and (pointer: fine)").matches;
        if (!isDesktop) return;

        const sections = Array.from(document.querySelectorAll(".hero, .section, footer"));
        if (!sections.length) return;

        let isAnimating = false;
        let lastWheelTime = 0;

        function getCurrentSectionIndex() {
            const scrollPos = window.scrollY + 100;
            let current = 0;
            sections.forEach(function (sec, idx) {
                if (sec.offsetTop <= scrollPos) {
                    current = idx;
                }
            });
            return current;
        }

        function scrollToSection(index) {
            if (index < 0 || index >= sections.length) return;
            isAnimating = true;
            const targetSection = sections[index];
            const headerOffset = 68;
            
            // If targeting footer or bottom CTA, scroll to bottom so both remain visible together
            let targetY;
            if (targetSection.tagName === "FOOTER" || targetSection.classList.contains("home-cta-section")) {
                targetY = document.documentElement.scrollHeight - window.innerHeight;
            } else {
                targetY = Math.max(0, targetSection.offsetTop - headerOffset);
            }

            window.scrollTo({
                top: targetY,
                behavior: "smooth"
            });

            setTimeout(function () {
                isAnimating = false;
            }, 750);
        }

        window.addEventListener("wheel", function (e) {
            const now = Date.now();
            if (Math.abs(e.deltaY) < 25) return; // ignore minor trackpad inertia/noise

            if (isAnimating || now - lastWheelTime < 700) {
                e.preventDefault();
                return;
            }

            const currentIndex = getCurrentSectionIndex();
            if (e.deltaY > 0) {
                // Scroll down
                if (currentIndex < sections.length - 1) {
                    e.preventDefault();
                    lastWheelTime = now;
                    scrollToSection(currentIndex + 1);
                }
            } else if (e.deltaY < 0) {
                // Scroll up
                if (currentIndex > 0) {
                    e.preventDefault();
                    lastWheelTime = now;
                    scrollToSection(currentIndex - 1);
                }
            }
        }, { passive: false });

        // Keyboard arrow/Page navigation support for snap sections
        window.addEventListener("keydown", function (e) {
            if (e.key === "PageDown" || e.key === "ArrowDown") {
                const currentIndex = getCurrentSectionIndex();
                if (currentIndex < sections.length - 1) {
                    e.preventDefault();
                    scrollToSection(currentIndex + 1);
                }
            } else if (e.key === "PageUp" || e.key === "ArrowUp") {
                const currentIndex = getCurrentSectionIndex();
                if (currentIndex > 0) {
                    e.preventDefault();
                    scrollToSection(currentIndex - 1);
                }
            }
        });
    }

    function boot() {
        const rootPath = getRootPath();
        if (window.IONX_DATA) {
            renderReusableSections(window.IONX_DATA, rootPath);
            initDesktopScrollSnap();
        } else {
            const script = document.createElement("script");
            script.src = rootPath + "assets/js/site-data.js";
            script.onload = function () {
                if (window.IONX_DATA) {
                    renderReusableSections(window.IONX_DATA, rootPath);
                    initDesktopScrollSnap();
                }
            };
            document.head.appendChild(script);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
