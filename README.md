# Shift2Dynamic | Enterprise Shopify Solutions

![Shift2Dynamic Banner](/public/opengraph-image.png)

**Where High-Performance Engineering meets Aesthetic Dominance.**

Shift2Dynamic is a premium digital agency codebase designed for **outcome-based** Shopify solutions. We don't just build stores; we engineer 7-figure digital ecosystems using bleeding-edge technology.

---

## ⚡ The "Heavy Hitter" Tech Stack

Built for speed, scalability, and "wow" factor.

*   **Core**: [Next.js 15](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **CMS**: [Sanity.io](https://www.sanity.io/) (Headless Content Management)
*   **Motion**: `framer-motion` + `lenis` (Smooth Scroll)
*   **Deployment**: Vercel

---

## 💎 Dynamic Content Management (Sanity CMS)

This project is **100% connected** to Sanity CMS. Every section of the homepage can be edited without touching the code.

To manage content, run:
```bash
npm run dev
# Go to: http://localhost:3000/studio
```

### 🎛️ Content Schemas
| Schema Name | Section | What You Can Edit |
| :--- | :--- | :--- |
| **Hero** | Top Section | Title, Dynamic Rotating Words, Subtext. |
| **Gallery** | 3D Showcase | The 3 floating images in the circular gallery. |
| **Impact** | Stats Bar | Revenue numbers, Speed metrics, Client counts. |
| **Industries** | Accordion List | The list of sectors (Fashion, Beauty, etc.) + Images. |
| **Showcase Project** | Recent Work | Detailed case study cards with "View Live" links. |
| **About** | Personal Bio | Name, Role, Bio paragraphs, Profile Image, Signature. |
| **Services** | Service Grid | The 4 main pillars (Migration, Design, etc.) + Icons. |
| **Testimonials** | Reviews | Client Name, Role, Company, Quote, Avatar. |
| **Process** | Workflow Cards | "Discovery", "Build", "Launch" steps + colors. |
| **Pricing** | Pricing Tables | Brand vs Dropshipping tiers, prices, features. |
| **FAQ** | Q&A | Questions, Answers, Categories (General, Technical, etc.). |
| **Footer** | Contact Info | Email, Social Links, Address, Navigation Links. |
| **Marquee** | Scrolling Text | The infinite scrolling keywords band. |

---

## ✨ Key Features (Audited & Refined)

This project has undergone a "Deadly Audit" to ensure maximum conversion and premium perception.

### 1. 🎨 Visual Dominance
*   **Cinematic Noise Overlay**: Eliminates the "flat digital" look.
*   **Neon/Toxic Green Aesthetic**: A custom `oklch` color palette that pops against the deep black background.
*   **3D Gallery**: Interactive, centered image showcase with "Black-Green Mix" matte gradients.
*   **Typography**: `Syne` (Display) + `Manrope` (Body) for a distinct, non-template feel.

### 2. 🧠 Outcome-Based Messaging
We shifted from "Labor" language to "Value" language:
*   *Store Setup* → **Enterprise Migration Systems**
*   *Theme Dev* → **High-Performance Experience Design**
*   *App Dev* → **Custom Functionality Engines**

### 3. 🛡️ Trust & Conversion
*   **Real Data Integration**: All stats, pricing, and reviews flow directly from Sanity.
*   **Interactive Pricing**: Toggle between "Brand" and "Dropshipping" models dynamically.
*   **Verification**: "Trusted by 50+ Brands" (integrated `AvatarCircles` with real user avatars).
*   **Lead Magnets**: Footer "Strategy Call" trap to capture high-intent leads.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Sanity CLI (`npm install -g sanity@latest`)

### Installation

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/your-org/shift2dynamic.git
    cd shift2dynamic
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Create a `.env.local` file:
    ```env
    NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
    NEXT_PUBLIC_SANITY_DATASET=production
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    - Website: `http://localhost:3000`
    - Content Studio: `http://localhost:3000/studio`

---

## 📂 Architecture

```
src/
├── app/
│   ├── layout.tsx       # Root Layout (Fonts, Metadata, Providers)
│   ├── globals.css      # Tailwind & Custom Variables
│   └── page.tsx         # Home Route (Fetches COMPLETE Sanity Data)
├── components/
│   ├── home-client.tsx  # Main Client Orchestrator (Receives Data)
│   ├── sections/        # Dynamic Sections (Services, Pricing, etc.)
│   └── ui/              # Reusable Atoms (AvatarCircles, Buttons...)
└── sanity/
    ├── schemas/         # Content Models (The Brain)
    └── lib/             # Client & Queries
```

---

## 📄 License

Private Proprietary Software. All rights reserved.
