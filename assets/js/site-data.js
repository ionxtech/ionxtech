window.IONX_DATA = {
    company: {
        name: "ionXtech",
        legalName: "ionXtech",
        domain: "https://ionxtech.in",
        r2WorkerEndpoint: "https://ionxtech-forms.ionxtechsolution.workers.dev/",
        tagline: "Building reliable tech for modern Digital Needs",
        heroSubtitle: "Building reliable tech for modern Digital Needs",
        heroRotatingWords: ["tech", "apps", "hosting", "domains", "services"],
        metrics: [
            { value: "15K+", label: "Installs on Google Play" },
            { value: "4", label: "Production Android apps" },
            { value: "100%", label: "Core features work offline" },
            { value: "0", label: "Personal data sold, ever" }
        ],
        email: "hello@ionxtech.in",
        address: {
            street: "Anoop Nagar",
            city: "Indore",
            state: "Madhya Pradesh",
            postalCode: "452018",
            country: "India",
            formatted: "Anoop Nagar, Indore, Madhya Pradesh - 452018, India"
        },
        logo: {
            path: "assets/images/IonXtech.webp",
            alt: "ionXtech official brand logo for Android apps and cloud infrastructure"
        },
        socials: [
            {
                name: "LinkedIn",
                url: "https://in.linkedin.com/company/ionxtechnology",
                icon: "assets/images/social-linkedin.svg",
                alt: "ionXtech on LinkedIn"
            },
            {
                name: "Instagram",
                url: "https://www.instagram.com/ionxtech/",
                icon: "assets/images/social-instagram.svg",
                alt: "ionXtech on Instagram"
            },
            {
                name: "YouTube",
                url: "https://www.youtube.com/@ionXtechsolution",
                icon: "assets/images/social-youtube.svg",
                alt: "ionXtech on YouTube"
            }
        ]
    },

    divisions: [
        {
            index: "01",
            key: "tech",
            title: "ionXtech",
            status: "Parent Company",
            description: "The engineering company behind every ionX product. We set the standards for privacy, performance, and reliability across all divisions."
        },
        {
            index: "02",
            key: "apps",
            title: "ionXapps",
            status: "Live on Google Play",
            description: "Lightweight, local-first Android utility applications engineered for daily productivity, automation, and screen privacy."
        },
        {
            index: "03",
            key: "hosting",
            title: "ionXhosting",
            status: "Coming Soon",
            description: "High-availability web application hosting designed for fast static and dynamic deployments with zero configuration overhead."
        },
        {
            index: "04",
            key: "domains",
            title: "ionXdomains",
            status: "Coming Soon",
            description: "Streamlined domain registration, DNS routing, and automated SSL certificate management for modern businesses."
        },
        {
            index: "05",
            key: "services",
            title: "ionXservices",
            status: "Coming Soon",
            description: "Managed cloud servers, custom software development, and technical consulting for teams that need dependable infrastructure."
        }
    ],

    principles: [
        {
            index: "01",
            title: "Local-First Privacy",
            description: "Core application workflows execute directly on your device. Sensitive inputs, scan histories, and call schedules stay under your control."
        },
        {
            index: "02",
            title: "Zero-Bloat Performance",
            description: "Minimal APK footprints, fast cold-start times, and strict battery discipline across entry-level and flagship Android devices."
        },
        {
            index: "03",
            title: "Transparent Permissions",
            description: "Every system permission we request is documented clearly and mapped strictly to a user-initiated feature."
        },
        {
            index: "04",
            title: "Long-Term Reliability",
            description: "Tested across modern Android SDK targets with deterministic background scheduling and offline-ready architecture."
        }
    ],

    apps: [
        {
            id: "qr-solution",
            order: 1,
            name: "QR Solutions",
            tagline: "Fast QR Code Generator and Barcode Scanner for Android",
            category: "Productivity & Utilities",
            packageId: "com.ionxtech.qrsolution",
            rating: "4.6 / 5.0",
            ratingValue: "4.6",
            ratingCount: "640",
            downloads: "500+",
            dataPolicy: "On-device camera & local history",
            offlineSupport: "100% Offline scanning & generation",
            androidVersion: "Android 8.0 and up",
            logo: "assets/images/QR Solution Logo.webp",
            logoAlt: "QR Solutions Android app icon by ionXtech for scanning and generating QR codes",
            banner: "assets/images/QR Solution.webp",
            bannerAlt: "QR Solutions app interface showing instant QR code scanning and generation features",
            pageSlug: "apps/qr-solution/",
            privacySlug: "privacy-policy/qr-solution.html",
            playStoreUrl: "https://play.google.com/store/apps/details?id=com.ionxtech.qrsolution",
            shortDescription: "Instant QR code scanner and custom generator with local scan history, multi-format barcode support, and offline execution.",
            overview: [
                "QR Solutions is a lightweight, high-speed QR code scanner and generator engineered by ionXtech for Android devices. It eliminates cluttered interfaces and slow camera initialization so you can decode or create QR codes in under a second.",
                "Whether you are scanning Wi-Fi credentials, URLs, vCards, or product barcodes, all image frames are processed directly in device memory. Your scan history is stored locally on your phone for quick retrieval without uploading your activity to external cloud servers."
            ],
            features: [
                {
                    title: "Instant Camera Decoding",
                    description: "Hardware-accelerated barcode and QR detection that locks onto codes quickly, even in low-light environments or at angled distances."
                },
                {
                    title: "Custom QR Code Generator",
                    description: "Create shareable QR codes for website URLs, Wi-Fi networks, plain text, contact cards, phone numbers, and SMS templates."
                },
                {
                    title: "Local Scan & Creation History",
                    description: "Automatically logs scanned and generated codes in on-device storage so you can revisit, copy, or export past codes anytime."
                },
                {
                    title: "Direct Export & Sharing",
                    description: "Save high-resolution QR images directly to your gallery or share them across messaging and document workflows in one tap."
                }
            ],
            specs: [
                { label: "Application Name", value: "QR Solutions" },
                { label: "Package Identifier", value: "com.ionxtech.qrsolution" },
                { label: "Category", value: "Tools / Productivity" },
                { label: "Data Processing", value: "On-Device Local Processing" },
                { label: "Network Requirement", value: "Works Offline" },
                { label: "Required Permissions", value: "Camera (for scanning only)" }
            ],
            faqs: [
                {
                    question: "Is QR Solutions completely free to use on Android?",
                    answer: "Yes, QR Solutions is free to download and use from the Google Play Store. Core QR scanning, barcode reading, and QR code generation features are accessible without mandatory subscriptions."
                },
                {
                    question: "Why does QR Solutions request camera permission?",
                    answer: "Camera permission is required strictly to read QR codes and barcodes in real time. Camera frames are analyzed locally on your Android device and are never uploaded or stored on ionXtech servers."
                },
                {
                    question: "Can I generate QR codes without an internet connection?",
                    answer: "Yes. Both scanning existing QR codes and generating new QR codes for text, URLs, Wi-Fi, or contacts work completely offline."
                },
                {
                    question: "Where is my QR scan history stored?",
                    answer: "Your scan and creation history is saved exclusively in your device's local application storage. You can clear individual entries or wipe the entire history at any time from inside the app."
                },
                {
                    question: "What types of QR codes and barcodes does QR Solutions support?",
                    answer: "QR Solutions supports standard QR codes, URL links, Wi-Fi network configurations, contact vCards, email links, plain text, and common retail barcode formats."
                },
                {
                    question: "How can I review the full privacy policy for QR Solutions?",
                    answer: "You can read the dedicated QR Solutions Privacy Policy directly on our website at any time via the Privacy Policy button on this page."
                }
            ]
        },
        {
            id: "privacy-display",
            order: 2,
            name: "Privacy Display",
            tagline: "On-Screen Privacy Filter and Anti-Spy Screen Overlay for Android",
            category: "Security & Privacy Utility",
            packageId: "com.ionxtech.privacydisplay",
            rating: "4.5 / 5.0",
            ratingValue: "4.5",
            ratingCount: "190",
            downloads: "5,000+",
            dataPolicy: "Zero data collection, 100% offline",
            offlineSupport: "100% Offline operation",
            androidVersion: "Android 8.0 and up",
            logo: "assets/images/PrivacyDisplayLogo.webp",
            logoAlt: "Privacy Display Android app logo by ionXtech for screen privacy overlay protection",
            banner: "assets/images/PrivacyDisplayLogo.webp",
            bannerAlt: "Privacy Display screen filter utility icon by ionXtech",
            pageSlug: "apps/privacy-display/",
            privacySlug: "privacy-policy/privacy-display.html",
            playStoreUrl: "https://play.google.com/store/apps/details?id=com.ionxtech.privacydisplay",
            shortDescription: "Protect sensitive on-screen information in public spaces with an adjustable privacy overlay and anti-shoulder-surfing filter.",
            overview: [
                "Privacy Display is a specialized screen privacy utility built by ionXtech that helps prevent shoulder-surfing when you use your phone in public transit, cafes, offices, or airports. It renders a customizable darkening or masking overlay above your active apps so only the person looking directly at the portion of the screen you expose can read sensitive content.",
                "Engineered with a strict zero-telemetry architecture, Privacy Display operates completely offline. It contains no advertising SDKs, no analytics trackers, and never reads or captures the underlying content displayed on your screen."
            ],
            features: [
                {
                    title: "Adjustable Screen Privacy Overlay",
                    description: "Customize overlay opacity, coverage height, and viewing window position to shield chats, banking apps, or confidential documents."
                },
                {
                    title: "Quick Notification Toggle",
                    description: "Enable, pause, or adjust the privacy screen filter immediately from your Android notification shade without leaving your current app."
                },
                {
                    title: "Optional App-Aware Automation",
                    description: "Configure the privacy filter to activate automatically when specific sensitive applications are opened in the foreground."
                },
                {
                    title: "Zero Network Access or Tracking",
                    description: "Runs 100% locally on your device with no internet permission, no third-party analytics, and no advertising networks."
                }
            ],
            specs: [
                { label: "Application Name", value: "Privacy Display" },
                { label: "Package Identifier", value: "com.ionxtech.privacydisplay" },
                { label: "Category", value: "Privacy & Security Utility" },
                { label: "Data Collection", value: "None (Zero Telemetry)" },
                { label: "Network Requirement", value: "100% Offline" },
                { label: "Core Permission", value: "Display Over Other Apps (Overlay)" }
            ],
            faqs: [
                {
                    question: "How does Privacy Display protect my screen in public?",
                    answer: "Privacy Display draws a configurable dimming or masking layer over your screen using Android's standard overlay system, reducing off-angle visibility and hiding parts of the display you are not actively reading."
                },
                {
                    question: "Can Privacy Display read my messages, passwords, or screen content?",
                    answer: "No. Privacy Display only renders a visual layer on top of the screen. It does not capture screenshots, log keystrokes, or read any text or media from other apps."
                },
                {
                    question: "Why does Privacy Display need the 'Display over other apps' permission?",
                    answer: "Android requires the Display Over Other Apps permission for any utility that keeps a visual filter visible while you switch between other applications."
                },
                {
                    question: "Does Privacy Display collect analytics or show ads?",
                    answer: "No. Privacy Display operates entirely offline and does not include any third-party analytics SDKs or advertising networks."
                },
                {
                    question: "Why is Foreground Service permission used in Privacy Display?",
                    answer: "A foreground service with a persistent notification ensures that Android does not unexpectedly close your active privacy shield while you are using another app."
                },
                {
                    question: "How do I uninstall or clear my Privacy Display settings?",
                    answer: "All preferences such as opacity and window position are stored locally on your phone. Clearing app storage in Android Settings or uninstalling the app removes all saved preferences immediately."
                }
            ]
        },
        {
            id: "call-message-scheduler",
            order: 3,
            name: "Auto Call Scheduler",
            tagline: "Automated Phone Call Scheduler and Reminder Utility for Android",
            category: "Communication & Automation",
            packageId: "com.ionxtech.callscheduler",
            rating: "4.2 / 5.0",
            ratingValue: "4.2",
            ratingCount: "310",
            downloads: "5,000+",
            dataPolicy: "On-device call schedules & contacts",
            offlineSupport: "Offline scheduling engine",
            androidVersion: "Android 8.0 and up",
            logo: "assets/images/CallMessageLogo.webp",
            logoAlt: "Auto Call Scheduler Android app logo by ionXtech for scheduling automatic phone calls",
            banner: "assets/images/CallMessageImage.webp",
            bannerAlt: "Auto Call Scheduler Android app preview showing scheduled phone call automation",
            pageSlug: "apps/call-message-scheduler/",
            privacySlug: "privacy-policy/auto-call-scheduler.html",
            playStoreUrl: "https://play.google.com/store/apps/details?id=com.ionxtech.callscheduler&hl=en_IN",
            shortDescription: "Schedule automatic phone calls and follow-up reminders at exact dates and times with persistent reboot recovery.",
            overview: [
                "Auto Call Scheduler (also listed on Google Play as Call & Message Scheduler) is a precision communication automation tool developed by ionXtech. It enables professionals and busy individuals to schedule outbound phone calls in advance so critical client follow-ups, family check-ins, and timed calls happen right on schedule.",
                "Built on Android's exact alarm and boot-recovery APIs, your scheduled calls persist reliably even if your device restarts. All phone numbers, contact selections, and schedule logs remain stored exclusively inside your device's local database."
            ],
            features: [
                {
                    title: "Exact-Time Call Automation",
                    description: "Schedule calls to initiate automatically at a specific minute, hour, and date using Android's exact alarm scheduling system."
                },
                {
                    title: "One-Time & Recurring Schedules",
                    description: "Set single follow-up calls or configure daily, weekly, and custom repeating call routines for regular check-ins."
                },
                {
                    title: "Automatic Reboot Recovery",
                    description: "Restores all pending call schedules automatically when your phone powers back on after a restart or battery drain."
                },
                {
                    title: "Local Contact Picker Integration",
                    description: "Select recipients directly from your address book on-device without uploading your contact list to any external server."
                }
            ],
            specs: [
                { label: "Application Name", value: "Auto Call Scheduler" },
                { label: "Package Identifier", value: "com.ionxtech.callscheduler" },
                { label: "Category", value: "Communication / Productivity" },
                { label: "Schedule Storage", value: "100% Local On-Device Database" },
                { label: "Reboot Persistence", value: "Supported (BOOT_COMPLETED)" },
                { label: "Core Permissions", value: "CALL_PHONE, SCHEDULE_EXACT_ALARM" }
            ],
            faqs: [
                {
                    question: "What does Auto Call Scheduler do on Android?",
                    answer: "Auto Call Scheduler allows you to set a phone number, date, and exact time for your phone to automatically place a call or trigger a call reminder so you never miss an important follow-up."
                },
                {
                    question: "Why does Auto Call Scheduler request CALL_PHONE and SCHEDULE_EXACT_ALARM permissions?",
                    answer: "CALL_PHONE is required to place the scheduled phone call at the time you configure, and SCHEDULE_EXACT_ALARM ensures the Android operating system triggers the schedule at the exact minute you selected."
                },
                {
                    question: "Are my contacts or scheduled phone numbers uploaded to ionXtech servers?",
                    answer: "No. All scheduled phone numbers, dates, times, and selected contact numbers are stored exclusively in local storage on your device and are never transmitted to ionXtech."
                },
                {
                    question: "Will my scheduled calls still work if my phone restarts?",
                    answer: "Yes. Auto Call Scheduler uses the RECEIVE_BOOT_COMPLETED permission to automatically re-register your pending call schedules whenever your Android device reboots."
                },
                {
                    question: "Is the Contacts permission mandatory to schedule a call?",
                    answer: "No. Reading contacts is optional and only used if you want to pick a number from your address book instead of typing the phone number manually."
                },
                {
                    question: "Can I opt out of analytics and crash diagnostics in Auto Call Scheduler?",
                    answer: "Yes. Any anonymised crash diagnostics or usage analytics are optional, ephemerally processed, and can be disabled at any time from the application's Settings screen."
                }
            ]
        },
        {
            id: "led-scroller",
            order: 4,
            name: "LED Scroller",
            tagline: "Full-Screen Scrolling LED Banner and Digital Signboard for Android",
            category: "Display & Event Utility",
            packageId: "com.ionxtech.ledscroller",
            rating: "4.8 / 5.0",
            ratingValue: "4.8",
            ratingCount: "1250",
            downloads: "500+",
            dataPolicy: "100% local text rendering",
            offlineSupport: "Works offline anytime",
            androidVersion: "Android 8.0 and up",
            logo: "assets/images/LEDScrollerLogo.webp",
            logoAlt: "LED Scroller Android app logo by ionXtech for digital scrolling LED text banners",
            banner: "assets/images/LEDScrollerImage.webp",
            bannerAlt: "LED Scroller app display banner showing customizable scrolling text on an Android phone",
            pageSlug: "apps/led-scroller/",
            privacySlug: "privacy-policy/led-scroller.html",
            playStoreUrl: "https://play.google.com/store/apps/details?id=com.ionxtech.ledscroller",
            shortDescription: "Transform your phone into a high-visibility scrolling LED matrix sign for concerts, airport pickups, live events, and noisy venues.",
            overview: [
                "LED Scroller turns any Android smartphone or tablet into a high-contrast, smooth scrolling LED banner. Designed for noisy environments, airport pickups, concerts, sporting events, and visual announcements, it lets you communicate clearly across a room when voice communication is impossible.",
                "With granular control over scroll direction, speed, font scale, LED matrix dot styles, and color contrast, LED Scroller renders every frame locally on your GPU without collecting or transmitting any of the messages you type."
            ],
            features: [
                {
                    title: "Smooth High-FPS Scrolling Engine",
                    description: "Hardware-accelerated marquee rendering with adjustable scroll speeds, left-to-right or right-to-left directions, and pause controls."
                },
                {
                    title: "Customizable Typography & Matrix Styles",
                    description: "Scale text size for long-distance legibility and switch between crisp solid text or realistic LED dot-matrix grid patterns."
                },
                {
                    title: "High-Contrast Color Combinations",
                    description: "Choose from high-visibility foreground and background palettes optimized for dark venues, stadiums, and daylight readability."
                },
                {
                    title: "Offline & Private Text Input",
                    description: "Every message you enter is rendered strictly in local device memory with zero network requirement for display playback."
                }
            ],
            specs: [
                { label: "Application Name", value: "LED Scroller" },
                { label: "Package Identifier", value: "com.ionxtech.ledscroller" },
                { label: "Category", value: "Tools / Event Display" },
                { label: "Text Processing", value: "100% Local On-Device Rendering" },
                { label: "Network Requirement", value: "Offline Ready" },
                { label: "Special Permissions", value: "None Required for Core Display" }
            ],
            faqs: [
                {
                    question: "How do I use LED Scroller to display a scrolling message?",
                    answer: "Open LED Scroller, type your message into the text field, adjust your preferred text size, scroll speed, and colors, and tap fullscreen to turn your phone into a scrolling LED banner."
                },
                {
                    question: "Does LED Scroller store or upload the messages I type?",
                    answer: "No. All text you enter is processed strictly in your phone's local memory to render the visual banner and is never transmitted to ionXtech or any external server."
                },
                {
                    question: "Does LED Scroller work without Wi-Fi or mobile data?",
                    answer: "Yes. All core LED banner rendering, speed controls, and color customizations work completely offline."
                },
                {
                    question: "Can I change the scrolling speed and direction of the LED banner?",
                    answer: "Yes. You can adjust the marquee speed from static display to fast scrolling and toggle the scroll direction between left and right."
                },
                {
                    question: "Why does the LED Scroller Privacy Policy mention Google AdMob?",
                    answer: "To keep LED Scroller free for everyone, the app uses Google AdMob to display advertisements when an internet connection is present. AdMob may use standard device advertising identifiers in accordance with your Android privacy settings."
                },
                {
                    question: "Does LED Scroller require camera or microphone permissions?",
                    answer: "No. LED Scroller does not request access to your camera, microphone, contacts, or location."
                }
            ]
        }
    ],

    companyFaqs: [
        {
            question: "What does ionXtech build and offer?",
            answer: "ionXtech is a technology startup building local-first Android utility applications (QR Solutions, Privacy Display, Auto Call Scheduler, and LED Scroller) while expanding into developer-friendly web infrastructure across hosting, domains, and services."
        },
        {
            question: "Which Android applications are currently published by ionXtech?",
            answer: "We currently publish four production Android applications on Google Play: QR Solutions (QR code scanner and generator), Privacy Display (on-screen privacy filter), Auto Call Scheduler (automated phone call scheduler), and LED Scroller (digital LED marquee banner)."
        },
        {
            question: "How does ionXtech handle user privacy across its apps?",
            answer: "We engineer our utilities around a local-first architecture. Core user data such as scanned QR codes, screen overlays, scheduled call numbers, and banner text remain on your device rather than being uploaded to external servers."
        },
        {
            question: "Are ionXtech apps free to download on Google Play?",
            answer: "Yes, all four of our Android apps are free to download on the official Google Play Store. Some apps include non-intrusive ads or optional upgrades to support ongoing development and maintenance."
        },
        {
            question: "Why does QR Solutions request camera access?",
            answer: "QR Solutions uses your device camera solely to detect and decode QR codes and barcodes on your device in real time. Camera images are never transmitted off your phone."
        },
        {
            question: "Why does Auto Call Scheduler need phone call and alarm permissions?",
            answer: "Auto Call Scheduler requires CALL_PHONE and SCHEDULE_EXACT_ALARM permissions so Android can initiate your scheduled phone call at the exact date and time you specify. Your contact list and call schedules remain stored locally on your device."
        },
        {
            question: "Does Privacy Display capture or read my screen content?",
            answer: "No. Privacy Display operates 100% offline with zero telemetry. It simply draws an adjustable visual overlay on top of your screen to block side-angle viewing in public places and never reads or records underlying screen content."
        },
        {
            question: "Do ionXtech applications work offline without an internet connection?",
            answer: "Yes. Every core utility feature across QR Solutions, Privacy Display, Auto Call Scheduler, and LED Scroller functions offline without requiring an active internet connection."
        },
        {
            question: "How can I delete my application data?",
            answer: "Because application data is stored locally on your Android device, you can delete your data at any time by clearing the app's storage in Android Settings or by uninstalling the application."
        },
        {
            question: "Where can I view the individual Privacy Policy for each app?",
            answer: "Every app card on our Apps page and every dedicated app detail page includes a direct 'Privacy Policy' button. You can also visit our central Privacy Policies directory at /privacy-policy/."
        },
        {
            question: "What are ionXhosting, ionXdomains, and ionXservices?",
            answer: "Alongside our mobile applications division (ionXapps), ionXtech is building infrastructure products for businesses and builders: ionXhosting for web hosting, ionXdomains for domain management, and ionXservices for managed cloud servers and custom development."
        },
        {
            question: "How can I contact ionXtech support or report a bug?",
            answer: "You can reach our team via our Contact Us page or by emailing hello@ionxtech.in directly. We typically respond to all technical and support inquiries within 2 to 3 business days."
        }
    ],

    team: [
        {
            name: "Arshan Mansuri",
            role: "Founder & Chief Executive Officer",
            photo: "assets/images/photo.webp",
            photoAlt: "Arshan Mansuri, Founder and CEO of ionXtech",
            linkedin: "https://www.linkedin.com/in/arshanmansuri/",
            bio: "Arshan founded ionXtech to build fast, dependable Android utilities and scalable digital infrastructure that help people accomplish daily tasks without friction or privacy trade-offs.",
            highlights: [
                "Product-focused engineer solving practical everyday utility and automation challenges.",
                "Hands-on Android systems development with strict attention to startup speed, memory efficiency, and OS compatibility.",
                "Privacy-first architect ensuring core user data is processed locally on-device whenever possible.",
                "Leads product design, release engineering, and infrastructure expansion across ionXapps, ionXhosting, ionXdomains, and ionXservices."
            ]
        }
    ],

    careers: {
        intro: "We build practical software used by over 165,000+ users worldwide. At ionXtech, we value clean engineering, autonomous execution, and respect for user privacy.",
        email: "hello@ionxtech.in",
        openRoles: [
            {
                title: "Android Application Engineering Intern",
                department: "Mobile Engineering (ionXapps)",
                location: "Indore, MP / Hybrid",
                type: "Internship",
                summary: "Work directly on production Android applications used by tens of thousands of daily users across QR Solutions, Privacy Display, Auto Call Scheduler, and LED Scroller.",
                responsibilities: [
                    "Develop, test, and refine native Android features with a focus on clean UI and low memory usage.",
                    "Optimize performance, cold-start speed, and compatibility across modern Android OS versions.",
                    "Participate in code reviews, Play Store release workflows, and crash diagnostics."
                ]
            }
        ]
    }
};

