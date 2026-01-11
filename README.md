# ⚡ Shopifolio - High-Performance Shopify Agency Portfolio

**Shopifolio** is a premium, high-conversion portfolio website designed for a specialized Shopify agency/freelancer. It combines high-end aesthetics with "business-first" messaging to attract high-net-worth clients.

![Project Preview](/public/opengraph-image.png)

## ✨ Key Features (The "Kickass" Suite)

This project implements "Studio Quality" frontend techniques to elevate perceived value:

*   **🌊 Smooth Scrolling (Lenis)**: Integrated `lenis` for a weighted, premium scroll feel.
*   **🎞️ Cinematic Noise Overlay**: A subtle SVG turbulence filter adds organic texture, removing the "flat digital" look.
*   **🖱️ Custom Cursor**: Interactive cursor that tracks movement with fluid spring physics.
*   **⚡ High-Speed Preloader**: A punchy 1.5s entrance animation ("Loading High Performance Experience").
*   **🧲 Magnetic Buttons**: CTA buttons physically pull towards the cursor for a tactile feel.
*   **🌑 Dark Mode Default**: Forces a professional, high-contrast dark theme on load.

## 🛠️ Tech Stack

Built with the modern "T3-adjacent" stack for speed and scalability:

*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Animation**: 
    *   [Framer Motion](https://www.framer.com/motion/) (gestures, layout animations)
    *   [Lenis](https://github.com/darkroomengineering/lenis) (smooth scroll)
*   **Icons**: `react-icons`, `lucide-react`, `@phosphor-icons/react`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/shopifolio.git
    cd shopifolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open locally:**
    Visit `http://localhost:3000` to see the site.

## 📂 Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout (SmoothScroll, Noise, Cursor, Preloader)
│   ├── page.tsx         # Main landing page (Sections orchestration)
│   └── globals.css      # Tailwind imports & custom animations
├── components/
│   └── ui/              # Reusable UI components
│       ├── creative-pricing.tsx  # Value-based pricing tiers
│       ├── industries.tsx        # 3D interactive cards
│       ├── services-card.tsx     # 2x2 mobile grid services
│       ├── magnetic-button.tsx   # Interactive buttons
│       └── ...
└── lib/                 # Utilities (cn, etc.)
```

## 🎨 Customization Guide

### Changing Pricing
Edit `src/components/ui/pricing-section.tsx`. The data is structured in the `shopifyTiers` array.

### Updating Services
Edit `src/components/ui/services.tsx` and `services-card.tsx`.

### Improving SEO
Update the metadata in `src/app/layout.tsx` or `page.tsx` with your actual agency details.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
