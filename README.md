# Localcraft

A Hugo theme for small local service businesses — hairdressers, beauty salons, massage parlors, pet groomers, and more.

[![GitHub release (latest)](https://img.shields.io/github/v/release/maciejkosiarski/localcraft?sort=semver&style=for-the-badge)](https://github.com/maciejkosiarski/localcraft/releases)
[![Demo](https://img.shields.io/badge/Demo-Live-green?style=for-the-badge)](https://maciejkosiarski.github.io/localcraft/)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow?style=for-the-badge&logo=buy-me-a-coffee)](https://buymeacoffee.com/maciejkosiarski)

![Localcraft Theme Screenshot](https://raw.githubusercontent.com/maciejkosiarski/localcraft/master/images/screenshot.png)

## Features

- Organic warm minimalism design
- Fully responsive (mobile-first)
- Multi-language support (i18n)
- SEO optimized (JSON-LD, Open Graph, Twitter Cards)
- **Automatic image optimization** (WebP, responsive images, lazy loading)
- Google Tag Manager with GDPR cookie consent
- No JavaScript frameworks — vanilla JS only
- Leaflet.js integration for location maps
- Before/after image slider for galleries
- Configurable sections via front matter

## Requirements

- Hugo **0.123.0** or higher (extended version recommended)

## Installation

### Option 1: Git Submodule

```bash
git submodule add https://github.com/maciejkosiarski/localcraft.git themes/localcraft
```

### Option 2: Hugo Modules

Add to your `hugo.yaml`:

```yaml
module:
  imports:
    - path: github.com/maciejkosiarski/localcraft
```

Then run:

```bash
hugo mod get -u
```

### Option 3: Download

Download the theme and extract it to `themes/localcraft`.

## Configuration

Add to your `hugo.yaml`:

```yaml
theme: localcraft

languages:
  en:
    languageName: English
    languageCode: en-US
    contentDir: content/en
    title: "Your Business Name"
    weight: 1

params:
  logo:
    name: "Your Business"
    dot: true  # adds decorative dot after name

  business:
    name: "Your Business Name"
    type: "HairSalon"  # Schema.org type: HairSalon, BeautySalon, DaySpa, PetGroomer, HealthAndBeautyBusiness
    phone: "+1 234 567 890"
    email: "hello@example.com"
    street: "123 Main Street"
    city: "New York"
    postalCode: "10001"
    country: "US"
    lat: 40.7128
    lng: -74.0060
    start_year: 2020

  og_image: "/images/og-default.jpg"

  footer:
    description: "Your tagline here"
    social:
      - name: "Facebook"
        url: "https://facebook.com/yourbusiness"
      - name: "Instagram"
        url: "https://instagram.com/yourbusiness"
```

## Data Files

The theme uses YAML data files for dynamic content. Create these in your `data/{lang}/` directory:

### `data/en/services.yaml`
```yaml
- name: "Haircut"
  description: "Professional haircut service"
  price: "$30"
  icon: "scissors"

- name: "Styling"
  description: "Hair styling and treatment"
  price: "$50"
  icon: "hand"
```

### `data/en/testimonials.yaml`
```yaml
- name: "Jane Doe"
  rating: 5
  quote: "Amazing service! Highly recommended."
  detail: "Regular customer"
```

### `data/en/team.yaml`
```yaml
- name: "John Smith"
  role: "Senior Stylist"
  bio: "10 years of experience..."
  image: "/images/team/john.jpg"
```

### `data/en/faq.yaml`
```yaml
- question: "Do I need an appointment?"
  answer: "Yes, we recommend booking in advance."

- question: "What payment methods do you accept?"
  answer: "Cash, credit cards, and mobile payments."
```

### `data/en/pricing.yaml`
```yaml
categories:
  - name: "Haircuts"
    services:
      - name: "Men's Haircut"
        description: "30 min"
        price: "$25"
      - name: "Women's Haircut"
        description: "45 min"
        price: "$40"
```

### `data/en/opening_hours.yaml`
```yaml
- day: "Monday"
  open: "09:00"
  close: "18:00"
- day: "Tuesday"
  open: "09:00"
  close: "18:00"
# ... etc
- day: "Sunday"
  closed: true
```

## Homepage Sections

Configure sections in `content/_index.md`:

```yaml
---
title: "Home"
sections:
  - type: hero
    heading: "Welcome to Our Salon"
    heading_italic: "Salon"
    description: "Professional service since 2020"
    image: "/images/hero.jpg"
    cta_primary:
      text: "Book Now"
      url: "/contact/"
    cta_secondary:
      text: "See Pricing"
      url: "/pricing/"
    stats:
      - value: "500+"
        label: "Happy Clients"
      - value: "5"
        label: "Years Experience"

  - type: services
    heading: "Our Services"
    description: "What we offer"
    data_source: "services"

  - type: testimonials
    heading: "What Our Clients Say"
    data_source: "testimonials"

  - type: blog-preview
    heading: "From Our Blog"

  - type: cta-banner
    heading: "Ready to Book?"
    description: "Call us today"
    phone: "+1 234 567 890"
---
```

## Available Page Types

- **Homepage** (`layouts/index.html`) — Section-based landing page
- **About** (`layouts/about/single.html`) — Team and values
- **Pricing** (`layouts/pricing/section.html`) — Filterable price list
- **Gallery** (`layouts/gallery/list.html`) — Before/after image grid with lightbox
- **FAQ** (`layouts/faq/section.html`) — Accordion with JSON-LD
- **Location** (`layouts/location/single.html`) — Map with opening hours
- **Blog** (`layouts/blog/`) — List and single post layouts

## Image Optimization

The theme includes automatic image optimization with responsive images and modern formats.

### How It Works

All images referenced in templates are automatically processed through Hugo's image pipeline:

- **WebP conversion** — Modern format with ~95% size reduction
- **Multiple sizes** — Responsive variants for different screens (400px, 800px, 1200px, 1600px)
- **srcset & sizes** — Browser selects optimal image based on viewport
- **Lazy loading** — Off-screen images load on demand
- **Fallback** — Original format for browsers without WebP support

### Configuration

Customize image processing globally in `hugo.yaml`:

```yaml
params:
  images:
    quality: 80                    # Image quality (1-100), default: 80
    widths: [400, 800, 1200, 1600] # Responsive image widths, default: [400, 800, 1200, 1600]
    lazy_loading: true             # Enable lazy loading by default, default: true
```

**Quality recommendations:**
- **60-70** — Content-heavy blogs (prioritize file size)
- **80** — Balanced (default, recommended)
- **90-95** — Portfolio/galleries (prioritize quality)

**Widths recommendations:**
- Default `[400, 800, 1200, 1600]` works for most sites
- Add `2000` or `2400` for large hero images on high-DPI displays
- Remove smaller sizes if targeting desktop-only audiences

### Image Placement

**Use `assets/images/` for content images** that should be optimized:

```
assets/
└── images/
    ├── hero.jpg
    ├── blog/
    │   ├── post-1.jpg
    │   └── post-2.jpg
    └── team/
        └── member.jpg
```

**Use `static/images/` only for** images that shouldn't be processed (logos, favicons, QR codes).

### Adding Images to Content

#### Blog Posts

```yaml
---
title: "My Blog Post"
image: "/images/blog/post-image.jpg"
---
```

#### Hero Section

```yaml
sections:
  - type: hero
    heading: "Welcome"
    image: "/images/hero.jpg"
```

#### Gallery (Before/After)

```yaml
---
title: "Transformation Example"
category: "Haircut"
image_before: "/images/gallery/before.jpg"
image_after: "/images/gallery/after.jpg"
---
```

#### Team Members

```yaml
# data/en/team.yaml
- name: "John Smith"
  role: "Senior Stylist"
  image: "/images/team/john.jpg"
```

### Recommended Image Sizes

For optimal performance, upload images in these dimensions:

| Component | Recommended Size | Aspect Ratio |
|-----------|-----------------|--------------|
| Hero image | 1200×900px | 4:3 |
| Blog featured image | 1600×1000px | 16:10 |
| Blog card/preview | 800×500px | 16:10 |
| Gallery before/after | 1200×900px | 4:3 |
| Team member photo | 800×1000px | 4:5 |
| OG image (social) | 1200×630px | 1.91:1 |

### Performance Results

Example optimization for a typical blog image:

- **Original:** 2.5 MB JPEG (1920×1200)
- **WebP 1600px:** 145 KB (94% reduction)
- **WebP 800px:** 42 KB (98% reduction)
- **Total load time:** <200ms (with lazy loading)

## Internationalization (i18n)

The theme supports multiple languages. Translation files are in `i18n/`:

- `i18n/en.yaml` — English
- `i18n/pl.yaml` — Polish

Add your own translations by creating `i18n/{lang}.yaml` in your site.

## Design System

### Default Colors (CSS Variables)

```css
--cream: #FAF7F0;     /* Background */
--green: #3B5C45;     /* Primary */
--terra: #C4714A;     /* Accent */
--text: #2D2D2D;      /* Text */
```

### Custom Colors

Override the default color scheme in your `hugo.yaml`:

```yaml
params:
  colors:
    primary: "#3B5C45"      # Main brand color (buttons, links)
    primary_light: "#4A7257"
    primary_pale: "#E8F0EA"
    accent: "#C4714A"       # Secondary accent (CTAs, highlights)
    accent_dark: "#B5633D"
    accent_pale: "#F5E6E0"
    background: "#FAF7F0"   # Page background
    text: "#2D2D2D"         # Main text color
    text_muted: "#6B6B6B"   # Secondary text
```

All colors are optional — only specify the ones you want to override.

### Custom CSS

To add your own styles or override theme styles, create a file `assets/css/custom.css` in your project root:

```css
/* assets/css/custom.css */

/* Override existing styles */
.hero h1 {
  font-size: 3.5rem;
}

/* Add custom styles */
.my-custom-section {
  background: var(--green-pale);
  padding: 4rem 0;
}

/* Override CSS variables */
:root {
  --green: #2ecc71;
}
```

The custom CSS file is loaded **last** in the CSS cascade, ensuring your styles take precedence over theme defaults. It's automatically minified and bundled with other theme styles for optimal performance.

### Fonts

- **Headings:** Cormorant Garamond
- **Body:** DM Sans

## Floating Support Button

Add a floating "Buy Me a Coffee" style button to encourage visitors to support your project:

```yaml
params:
  support_button:
    enabled: true
    url: "https://buymeacoffee.com/username"
    qr_image: "/images/bmc-qr.png"  # optional
```

Text content is loaded from i18n files (`support_title`, `support_description`, `support_button`). You can override these in your site's i18n files or set custom values directly in config:

```yaml
params:
  support_button:
    enabled: true
    url: "https://ko-fi.com/username"
    title: "Support My Work"
    description: "Help me create more content!"
    button_text: "Donate on Ko-fi"
```

## Analytics (Google Tag Manager)

The theme includes built-in support for Google Tag Manager with GDPR-compliant cookie consent.

### Configuration

Add your GTM container ID in `hugo.yaml`:

```yaml
params:
  gtm:
    id: "GTM-XXXXXXX"
```

### How It Works

1. **Cookie consent banner** appears on first visit
2. **GTM loads only after user accepts** cookies
3. **Consent is stored** for 365 days
4. **dataLayer events** are pushed for GTM triggers:
   - `consent_update` event with `analytics_consent: "granted"` or `"denied"`

### GTM Configuration (Recommended)

To respect user consent in GTM:

1. Create a **Data Layer Variable** named `analytics_consent`
2. Create a **Trigger** for Custom Event `consent_update` where `analytics_consent equals granted`
3. Configure your GA4 tag to fire on:
   - "Initialization - All Pages" (for users who already consented)
   - Your consent trigger (for new consent)

### Customizing Consent Text

Edit the i18n files (`i18n/en.yaml`, `i18n/pl.yaml`):

```yaml
cookie_message: "Your custom consent message here."
cookie_accept: "Accept"
cookie_decline: "Decline"
```

## Development

Run the example site:

```bash
cd exampleSite
hugo server
```

## Support

If you find this theme useful, consider supporting its development:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow?style=for-the-badge&logo=buy-me-a-coffee)](https://buymeacoffee.com/maciejkosiarski)

## Showcase

Sites using Localcraft:

- [donpiesko.pl](https://donpiesko.pl) — grooming salon, Lublin

## License

MIT License — see [LICENSE](LICENSE) for details.

## Credits

Created by [Maciej Kosiarski](https://github.com/maciejkosiarski)
