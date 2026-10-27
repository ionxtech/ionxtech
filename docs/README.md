# ionXtech Official Website

The official static website for **ionXtech** (`ionxtech.dpdns.org`), showcasing Android utility applications (**QR Solutions**, **Privacy Display**, **Auto Call Scheduler**, **LED Scroller**) and digital infrastructure divisions.

---

## 1. Dependencies

### Core Website (Required)
* **Runtime Dependencies:** **None** — The website is built with pure HTML5, CSS3 (`assets/css/style.css`), and Vanilla JavaScript (`assets/js/site-data.js`, `assets/js/layout.js`). No `npm install` or build step is required to view or deploy the site.
* **Local Development Server (Recommended):** Any lightweight static HTTP server so directory links (such as `/apps/` or `/apps/qr-solution/`) automatically resolve to their `index.html` files:
  * **Python 3** (built-in `http.server`), *or*
  * **Node.js** (`npx serve` / `live-server`), *or*
  * **VS Code Live Server** extension.

### Asset & Image Utilities (Optional)
Located in the `tools/` directory for converting images to `.webp` and generating Open Graph (`og-image`) banners:
* **Python 3.8+**
* **Pillow (PIL)** image library:
  ```bash
  pip install Pillow
  ```

---

## 2. How to Run the Project Locally

Navigate to the project root directory:
```bash
cd c:\Users\Lenovo\ionxtech\ionxtech
```

Choose **any** of the following methods to start the site:

### Option A: Using Python (Recommended)
If you have Python installed, run its built-in HTTP server:
```bash
python -m http.server 8000
```
Then open **[http://localhost:8000](http://localhost:8000)** in your browser.

### Option B: Using Node.js (`npx`)
If you have Node.js installed, you can serve the folder without installing global packages:
```bash
npx serve . -l 8000
```
Then open **[http://localhost:8000](http://localhost:8000)** in your browser.

### Option C: Using VS Code Live Server
1. Open the project folder in **VS Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and select **"Open with Live Server"**.

### Option D: Direct File Open
You can double-click `index.html` to open it directly in a browser (`file://`), though using a local server (Options A–C) is recommended so clean folder URLs like `apps/` resolve `apps/index.html` automatically.

---

## 3. Running the Optional Asset Scripts

Run these commands from the **project root directory** (`c:\Users\Lenovo\ionxtech\ionxtech`) after installing `Pillow` (`pip install Pillow`):

* **Convert `.png` and `.jpg` images in `assets/images/` to `.webp`:**
  ```bash
  python tools/convert_to_webp.py
  ```

* **Generate Open Graph (`og-image`) banner variants:**
  ```bash
  python tools/generate_og_variants.py
  ```

---

## 4. Project Structure

```text
ionxtech/
├── index.html                  # Homepage
├── domains.html                # ionXdomains waitlist & division page
├── hosting.html                # ionXhosting waitlist & division page
├── services.html               # ionXservices waitlist & division page
├── about.html                  # About ionXtech
├── careers.html                # Careers page
├── contact.html                # Contact page & support hub
├── faqs.html                   # Company & product FAQs
├── team.html                   # Leadership & team profiles
├── terms.html                  # Terms & Conditions
├── 404.html                    # Custom 404 error page
├── apps/                       # Applications directory & product pages
│   ├── index.html
│   ├── qr-solution/index.html
│   ├── privacy-display/index.html
│   ├── call-message-scheduler/index.html
│   └── led-scroller/index.html
├── privacy-policy/             # General & per-app privacy policies
│   ├── index.html
│   ├── qr-solution.html
│   ├── privacy-display.html
│   ├── auto-call-scheduler.html
│   └── led-scroller.html
├── assets/
│   ├── css/style.css           # Global stylesheet
│   ├── js/site-data.js         # Central data store (apps, FAQs, team, links)
│   ├── js/layout.js            # Shared header/footer & component renderer
│   ├── js/cloudflare-r2-worker.js # Cloudflare Worker script for R2 + Slack
│   └── images/                 # WebP/SVG logos, icons, and OG banners
└── tools/                      # Optional Python image processing scripts
    ├── convert_to_webp.py
    └── generate_og_variants.py
```

---

## 5. How to Create a New Git Branch and Push Code to GitHub

Open a terminal (PowerShell or Command Prompt) in the project root directory:
```powershell
cd c:\Users\Lenovo\ionxtech\ionxtech
```

### Step 1: Check Current Git Status & Branch
```powershell
git status
git branch
```

### Step 2: Create and Switch to a New Branch
Replace `feature/website-v2` with your desired branch name:
```powershell
git checkout -b feature/website-v2
```
*(Or using the modern Git command: `git switch -c feature/website-v2`)*

### Step 3: Stage All Modified and New Files
```powershell
git add .
```

### Step 4: Commit Your Changes
```powershell
git commit -m "Rebuild ionXtech website with waitlist pages and Cloudflare R2 + Slack integration"
```

### Step 5: Push the New Branch to GitHub
The `-u` (`--set-upstream`) flag links your local branch to the remote GitHub branch on the first push:
```powershell
git push -u origin feature/website-v2
```
For any subsequent commits on the same branch, simply run:
```powershell
git add .
git commit -m "Your commit message"
git push
```

### Step 6: Merge into `main` (When Ready for Production)
You can either open a **Pull Request** on GitHub from `feature/website-v2` into `main`, or merge locally:
```powershell
git checkout main
git pull origin main
git merge feature/website-v2
git push origin main
```

---

## 6. Deploying to Cloudflare Pages (Free Tier)

1. Go to **Cloudflare Dashboard** → **Compute (Workers)** → **Workers & Pages**.
2. Click **Create** → click **Continue to Pages** at the bottom → **Connect to Git**.
3. Select your GitHub repository (`ionxtech`).
4. Configure build settings:
   * **Project name:** `ionxtech`
   * **Production branch:** `main` (or your new branch name)
   * **Framework preset:** `None`
   * **Build command:** *(Leave blank)*
   * **Build output directory:** `/`
5. Click **Save and Deploy**. Every future `git push` to your branch will automatically deploy to Cloudflare Pages.


