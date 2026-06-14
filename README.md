# Sri Sai Sathvik Pidikiti — Personal Portfolio

A production-ready personal portfolio website built with vanilla HTML, CSS, and JavaScript. Designed with a dark, sleek, editorial aesthetic featuring an interactive particle network background, scroll-triggered animations, and a fully responsive layout.

## 🌐 Live Site

**[sssathvik.dev](https://sssathvik.dev)** *(update after deployment)*

---

## 📁 File Structure

```
portfolio/
├── index.html              # Main HTML — all sections
├── css/
│   └── style.css           # Complete stylesheet & design system
├── js/
│   ├── main.js             # Interactions, animations, cursor
│   └── particles.js        # Interactive particle network canvas
├── assets/
│   └── images/
│       └── profile.jpg     # Profile photo
├── app.yaml                # Google Cloud App Engine config
└── README.md               # This file
```

---

## 🚀 Deploy to Google Cloud App Engine

### Prerequisites

1. **Google Cloud SDK** — Install from [cloud.google.com/sdk](https://cloud.google.com/sdk/docs/install)
2. **GCP Project** — Create or select a project in the [Google Cloud Console](https://console.cloud.google.com/)
3. **Billing enabled** — App Engine requires a billing account (free tier is available)

### Step-by-step

```bash
# 1. Authenticate with Google Cloud
gcloud auth login

# 2. Set your project (replace YOUR_PROJECT_ID)
gcloud config set project YOUR_PROJECT_ID

# 3. Navigate to the portfolio directory
cd portfolio

# 4. Deploy to App Engine
gcloud app deploy app.yaml --project=YOUR_PROJECT_ID

# 5. Open the deployed site
gcloud app browse
```

### Custom Domain (optional)

1. Go to **App Engine → Settings → Custom domains** in the GCP Console
2. Click **Add a custom domain**
3. Verify domain ownership (via DNS TXT record)
4. Add the DNS records shown by GCP to your domain registrar
5. Wait for SSL certificate provisioning (automatic, may take a few minutes)

---

## 🎨 Design Features

- **Particle network** — Interactive canvas background that reacts to mouse movement
- **Custom cursor** — Cyan dot + ring cursor on desktop
- **Typing animation** — Loops through roles in the hero section
- **Scroll animations** — Fade-in, slide-up reveal on every section
- **Timeline draw** — Animated line for research & experience sections
- **Skill pop-in** — Staggered tag animations on scroll
- **Responsive** — Mobile-first, works on all screen sizes
- **Sticky navbar** — Transparent → solid with blur on scroll

## 🛠 Tech Stack

- HTML5 (semantic, accessible)
- CSS3 (custom properties, grid, flexbox, animations)
- Vanilla JavaScript (ES6+, IntersectionObserver, Canvas API)
- Google Fonts (Syne, JetBrains Mono, Inter)
- Font Awesome 6.4.0

## 📄 License

© 2026 Sri Sai Sathvik Pidikiti. All rights reserved.
