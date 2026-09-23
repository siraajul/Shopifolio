import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60; // Revalidate every 60 seconds

type PortableProps = { children?: React.ReactNode };

/** Shape of a case study, whether it comes from Sanity or the placeholder set. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CaseStudy = Record<string, any>;

const caseStudyComponents = {
    block: {
      h2: ({ children }: PortableProps) => <h2 className="text-3xl font-bold font-display mt-12 mb-6 text-foreground">{children}</h2>,
      normal: ({ children }: PortableProps) => <p className="text-lg text-muted-foreground leading-relaxed mb-6">{children}</p>,
    },
    list: {
      bullet: ({ children }: PortableProps) => <ul className="space-y-3 mb-8">{children}</ul>,
    },
    listItem: {
      bullet: ({ children }: PortableProps) => (
        <li className="flex items-start text-muted-foreground">
          <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
          <span>{children}</span>
        </li>
      ),
    },
};

async function getCaseStudy(slug: string) {
  // Check for dummy slugs
  if (slug.startsWith('dummy-')) {
    const dummyData: Record<string, CaseStudy> = {
        "dummy-1": {
            title: "Scaling NeonGrade to $10M ARR",
            description: "How a headless Shopify build reduced load times by 3s and boosted mobile conversion by 45%.",
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            projectUrl: "#",
            beforeImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            afterImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            stats: [
                { label: "Conversion Rate", beforeValue: "1.2%", afterValue: "3.8%" },
                { label: "Page Load Time", beforeValue: "4.5s", afterValue: "0.4s" },
                { label: "Bounce Rate", beforeValue: "65%", afterValue: "28%" }
            ],
            overview: "NeonGrade is a high-street fashion retailer that was struggling with a slow, bloated monolithic e-commerce site. As they prepared for their biggest Q4 yet, they needed a platform that could handle high traffic spikes without compromising on speed or user experience.",
            clientRequirements: [
                "Reduce mobile load times to under 1 second",
                "Implement a fully custom, brand-aligned checkout flow",
                "Seamless integration with their existing ERP system",
                "Scalable infrastructure to handle 50k+ concurrent users"
            ],
            keyFeatures: [
                "Headless Shopify Architecture",
                "Real-time Inventory Sync",
                "AI-Powered Product Recommendations",
                "Instant Page Transitions (SPA feel)"
            ],
            technologies: ["Next.js 14", "Shopify Plus", "Sanity CMS", "Tailwind CSS", "Vercel"],
            howWeBuiltIt: [
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'We decoupled the frontend from Shopify using Next.js to gain full control over the performance and UX. We utilized Static Site Generation (SSG) for high-traffic product pages and Incremental Static Regeneration (ISR) to keep prices and inventory fresh without hitting the Shopify API on every request.', marks: [] }],
                    style: 'normal',
                }
            ],
            content: [
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'The Challenge', marks: [] }],
                    style: 'h2',
                },
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'NeonGrade detailed a severe drop in mobile conversions. Their legacy liquid theme was taking 4.5s to load on 4G networks, causing a bounce rate of over 65%. They needed a solution that was instant, engaging, and scalable for their Q4 push.', marks: [] }],
                    style: 'normal',
                },
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'The Solution', marks: [] }],
                    style: 'h2',
                },
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'We migrated them to a Headless Shopify architecture using Next.js 14 and Sanity CMS. This allowed us to pre-render critical pages while keeping the checkout flow secure on Shopify Plus.', marks: [] }],
                    style: 'normal',
                },
                {
                     _type: 'block',
                    children: [{ _type: 'span', text: 'The Results', marks: [] }],
                    style: 'h2',
                },
                {
                    _type: 'block',
                    listItem: 'bullet',
                    children: [{ _type: 'span', text: '45% Increase in Mobile Conversion Rate', marks: [] }],
                    style: 'normal',
                    level: 1
                },
                {
                    _type: 'block',
                    listItem: 'bullet',
                    children: [{ _type: 'span', text: '0.4s Average Load Time (down from 4.5s)', marks: [] }],
                    style: 'normal',
                    level: 1
                },
                {
                     _type: 'block',
                    listItem: 'bullet',
                    children: [{ _type: 'span', text: '$10M+ ARR reached within 6 months of launch', marks: [] }],
                    style: 'normal',
                    level: 1
                }
            ]
        },
        "dummy-2": {
            title: "FlowState: From Confusing to Iconic",
            description: "Redesigning a Fintech dashboard to reduce churn by 20% and secure Series A funding.",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            projectUrl: "#",
            beforeImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            afterImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            stats: [
                { label: "User Churn", beforeValue: "8.5%", afterValue: "1.5%" },
                { label: "NPS Score", beforeValue: "20", afterValue: "75" },
                { label: "Time to Task", beforeValue: "45s", afterValue: "12s" }
            ],
            overview: "FlowState is a financial analytics platform that was losing users due to a cluttered, unintuitive interface. Despite having powerful data features, customers couldn't figure out how to use them to drive value.",
            clientRequirements: [
                "Simplify complex data visualization",
                "Create a distinct, 'futuristic' visual identity",
                "Improve user onboarding completion rates",
                "Mobile-responsive dashboard view"
            ],
            keyFeatures: [
                "Task-First Information Architecture",
                "Dark Mode with Neon Data Accents",
                "Interactive Financial Graphs",
                "Onboarding Wizard"
            ],
            technologies: ["React", "D3.js", "Framer Motion", "Material UI Custom", "Node.js"],
            howWeBuiltIt: [
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'We started with a complete UX audit and user interviews to identify friction points. We then moved to low-fidelity wireframes to test the new "Task-First" flow before applying a high-fidelity dark UI system designed to reduce eye strain for power users.', marks: [] }],
                    style: 'normal',
                }
            ],
             content: [
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'The Problem', marks: [] }],
                    style: 'h2',
                },
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'FlowState had a powerful backend but a UI that users found overwhelming. Churn was high (8%) because users couldn not find the features they paid for.', marks: [] }],
                    style: 'normal',
                },
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'The Redesign', marks: [] }],
                    style: 'h2',
                },
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'We implemented a "Task-First" architecture, hiding complexity behind progressive disclosure. We used a dark-mode aesthetic with neon accents to signal speed and precision.', marks: [] }],
                    style: 'normal',
                },
                {
                     _type: 'block',
                    children: [{ _type: 'span', text: 'Impact', marks: [] }],
                    style: 'h2',
                },
                 {
                    _type: 'block',
                    listItem: 'bullet',
                    children: [{ _type: 'span', text: 'Churn dropped to 1.5% in 90 days', marks: [] }],
                    style: 'normal',
                    level: 1
                },
                 {
                    _type: 'block',
                    listItem: 'bullet',
                    children: [{ _type: 'span', text: 'NPS score rose from 20 to 75', marks: [] }],
                    style: 'normal',
                    level: 1
                },
                 {
                    _type: 'block',
                    listItem: 'bullet',
                    children: [{ _type: 'span', text: 'Successfully raised $5M Series A using the new design', marks: [] }],
                    style: 'normal',
                    level: 1
                }
            ]
        },
        "dummy-3": {
            title: "The Viral 3D Portfolio",
             description: "An interactive WebGL experience that won Awwwards SOTD and generated 5 FAANG offers.",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            projectUrl: "#",
            beforeImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            afterImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            stats: [
                { label: "Daily Visitors", beforeValue: "50", afterValue: "5,000+" },
                { label: "Avg Session", beforeValue: "30s", afterValue: "4m 12s" },
                { label: "Job Offers", beforeValue: "0", afterValue: "5 (FAANG)" }
            ],
            overview: "A creative developer wanted a portfolio that would break the internet. The goal was to move away from standard grids and create an immersive world that showcased technical prowess immediately.",
            clientRequirements: [
                "Gamified user experience (WASD controls)",
                "Stable 60FPS on mobile devices",
                "Hidden 'easter eggs' to encourage exploration",
                "Seamless integration with content management"
            ],
            keyFeatures: [
                "3D Open World Environment",
                "Physics-based Interactions",
                "Dynamic Lighting & Shadows",
                "Spatial Audio System"
            ],
            technologies: ["Three.js", "React Three Fiber", "GSAP", "Blender", "WebGL"],
            howWeBuiltIt: [
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'We modeled the world in Blender, baking lighting into textures to save on performance. We then used React Three Fiber to bring it to life in the browser, using a custom LOD (Level of Detail) system to ensure it ran smoothly on low-end devices.', marks: [] }],
                    style: 'normal',
                }
            ],
            content: [
                { _type: 'block', children: [{ _type: 'span', text: 'The Goal', marks: [] }], style: 'h2' },
                { _type: 'block', children: [{ _type: 'span', text: 'Stand out in a sea of generic grid-based portfolios.', marks: [] }], style: 'normal' },
                 { _type: 'block', children: [{ _type: 'span', text: 'Recognition', marks: [] }], style: 'h2' },
                 { _type: 'block', listItem: 'bullet', children: [{ _type: 'span', text: 'Awwwards Site of the Day', marks: [] }], style: 'normal', level: 1 }
            ]
        },
        "dummy-4": {
            title: "LuxeInterior: AR-Powered Shopping",
            description: "Integrating Augmented Reality into a furniture store, increasing average order value by 30%.",
            image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            projectUrl: "#",
            beforeImage: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            afterImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            stats: [
                { label: "Return Rate", beforeValue: "15%", afterValue: "4%" },
                { label: "Add to Cart", beforeValue: "3.2%", afterValue: "8.5%" },
                { label: "Avg. Order Value", beforeValue: "$450", afterValue: "$620" }
            ],
            overview: "LuxeInterior faced a common e-commerce problem: customers hesitated to buy furniture online because they couldn't visualize it in their homes. Returns were eating into their margins.",
            clientRequirements: [
                "Browser-based AR (no app download required)",
                "High-fidelity texture rendering",
                "Instant size calibration",
                "Seamless 'View in Room' button on PDP"
            ],
            keyFeatures: [
                "WebXR Integration",
                "Real-time Lighting Estimation",
                "Andorid & iOS Compatible",
                "360-degree Product Viewer"
            ],
            technologies: ["WebXR", "Three.js", "React-Three-Fiber", "AWS S3", "Next.js"],
            howWeBuiltIt: [
                { _type: 'block', children: [{ _type: 'span', text: 'We leveraged WebXR to provide an app-free AR experience. Using optimized GLTF models, we ensured 3D assets loaded instantly. We also implemented a fallback 360-viewer for unsupported devices.', marks: [] }], style: 'normal' }
            ],
            content: [
                 { _type: 'block', children: [{ _type: 'span', text: 'The Impact', marks: [] }], style: 'h2' },
                 { _type: 'block', listItem: 'bullet', children: [{ _type: 'span', text: '30% Increase in AOV', marks: [] }], style: 'normal', level: 1 }
            ]
        },
        "dummy-5": {
            title: "HealthSync: Telemedicine Reimagined",
            description: "A secure, HIPAA-compliant patient portal that reduced appointment no-shows by 60%.",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            projectUrl: "#",
            beforeImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            afterImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            stats: [
                { label: "No-Show Rate", beforeValue: "15%", afterValue: "6%" },
                { label: "Patient Sat.", beforeValue: "65/100", afterValue: "92/100" },
                { label: "Admin Time", beforeValue: "20h/wk", afterValue: "4h/wk" }
            ],
            overview: "HealthSync's manual booking system was causing chaos. Patients forgot appointments, and doctors were overwhelmed with paperwork. They needed a digital transformation.",
            clientRequirements: [
                "HIPAA-compliant video conferencing",
                "Automated SMS/Email reminders",
                "Digital prescription management",
                "Easy elderly-friendly UI"
            ],
            keyFeatures: [
                "End-to-End Encryption",
                "One-Click Video Join",
                "Automated Calendar Sync",
                "Digital Intake Forms"
            ],
            technologies: ["WebRTC", "Socket.io", "React", "Node.js", "PostgreSQL"],
            howWeBuiltIt: [
                { _type: 'block', children: [{ _type: 'span', text: 'Security was paramount. We built a custom WebRTC implementation ensuring peer-to-peer encryption for all video calls. We redesigned the booking flow with big buttons and clear contrast to assist elderly patients.', marks: [] }], style: 'normal' }
            ],
            content: [
                 { _type: 'block', children: [{ _type: 'span', text: 'Results', marks: [] }], style: 'h2' },
                 { _type: 'block', listItem: 'bullet', children: [{ _type: 'span', text: '60% Reduction in No-Shows', marks: [] }], style: 'normal', level: 1 }
            ]
        },
        "dummy-6": {
            title: "FitTrack: AI Personal Trainer",
            description: "Using computer vision to warn users about bad posture in real-time during workouts.",
            image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            projectUrl: "#",
            beforeImage: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            afterImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            stats: [
                { label: "Active Users", beforeValue: "1k", afterValue: "50k" },
                { label: "Retention D30", beforeValue: "12%", afterValue: "44%" },
                { label: "Bug Reports", beforeValue: "High", afterValue: "Low" }
            ],
            overview: "FitTrack wanted to differentiate themselves in a crowded fitness app market. They had the idea of an 'AI spotter', but didn't know how to implement it technically.",
            clientRequirements: [
                "Real-time pose estimation on mobile",
                "Offline functionality",
                "Voice feedback integration",
                "Gamified progress tracking"
            ],
            keyFeatures: [
                "TensorFlow.js Integration",
                "PoseNet Models",
                "Privacy-First (On-device processing)",
                "Social Leaderboards"
            ],
            technologies: ["TensorFlow.js", "React Native", "Firebase", "Redux", "TypeScript"],
            howWeBuiltIt: [
                { _type: 'block', children: [{ _type: 'span', text: 'We used TensorFlow.js to run PoseNet models directly on the user’s device. This ensured zero latency for coaching feedback and protected user privacy since no video feed was sent to the cloud.', marks: [] }], style: 'normal' }
            ],
            content: [
                 { _type: 'block', children: [{ _type: 'span', text: 'Outcomes', marks: [] }], style: 'h2' },
                 { _type: 'block', listItem: 'bullet', children: [{ _type: 'span', text: 'Viral growth on TikTok due to AI challenge', marks: [] }], style: 'normal', level: 1 }
            ]
        },
        "dummy-7": {
            title: "GourmetGo: Hyper-local Delivery",
            description: "Optimizing last-mile delivery algorithms to ensure hot food arrival, every time.",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            projectUrl: "#",
            beforeImage: "https://images.unsplash.com/photo-1585759032420-b30758418f4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            afterImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            stats: [
                { label: "Avg Delivery", beforeValue: "45m", afterValue: "22m" },
                { label: "Driver Earning", beforeValue: "$12/h", afterValue: "$18/h" },
                { label: "Food Complaints", beforeValue: "8%", afterValue: "0.5%" }
            ],
             overview: "GourmetGo focused on high-end restaurant delivery but was failing on logistics. Cold food meant refunded orders and angry chefs.",
            clientRequirements: [
                "Route optimization algorithm",
                "Real-time driver tracking",
                "Heatmap demand prediction",
                "Restaurant tablet app"
            ],
            keyFeatures: [
                "Geospatial Routing Engine",
                "Live Websocket Notifications",
                "Smart Batching System",
                "Driver Performance Analytics"
            ],
            technologies: ["Mapbox", "Node.js", "Redis", "React", "PostGIS"],
             howWeBuiltIt: [
                { _type: 'block', children: [{ _type: 'span', text: 'We implemented a custom routing engine using Mapbox and OSRM. By batching orders based on kitchen prep time and delivery proximity, we maximized driver efficiency and ensured food stayed hot.', marks: [] }], style: 'normal' }
            ],
             content: [
                 { _type: 'block', children: [{ _type: 'span', text: 'Success', marks: [] }], style: 'h2' },
                 { _type: 'block', listItem: 'bullet', children: [{ _type: 'span', text: 'Acquired by major food app within 18 months', marks: [] }], style: 'normal', level: 1 }
            ]
        },
        "dummy-8": {
            title: "CryptoDash: Pro Trading Terminal",
            description: "Handling millions of WebSocket messages per second for a real-time crypto trading deck.",
            image: "https://images.unsplash.com/photo-1621504450168-b8c4375361aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            projectUrl: "#",
            beforeImage: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            afterImage: "https://images.unsplash.com/photo-1621504450168-b8c4375361aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            stats: [
                { label: "Latency", beforeValue: "500ms", afterValue: "30ms" },
                { label: "Data Uptime", beforeValue: "95%", afterValue: "99.99%" },
                { label: "Daily Vol.", beforeValue: "$100k", afterValue: "$50M" }
            ],
            overview: "Professional traders demanded a terminal that didn't freeze during market volatility. CryptoDash needed a backend robustness overhaul.",
             clientRequirements: [
                "Sub-50ms latency updates",
                "Advanced charting library integration",
                "Multi-exchange API aggregation",
                "Sleek, dark-mode UI"
            ],
             keyFeatures: [
                "Custom WebSocket Server (Rust)",
                "TradingView Library",
                "Order Book Heatmap",
                "Portfolio Analytics"
            ],
             technologies: ["Rust", "React", "WebSockets", "TimescaleDB", "Go"],
             howWeBuiltIt: [
                { _type: 'block', children: [{ _type: 'span', text: 'We rewrote the matching engine in Rust for raw performance. On the frontend, we optimized React re-renders using web workers to handle the data stream without blocking the main UI thread.', marks: [] }], style: 'normal' }
            ],
             content: [
                 { _type: 'block', children: [{ _type: 'span', text: 'Outcome', marks: [] }], style: 'h2' },
                 { _type: 'block', listItem: 'bullet', children: [{ _type: 'span', text: '$50M Daily Volume Handled', marks: [] }], style: 'normal', level: 1 }
            ]
        },
        "dummy-9": {
            title: "EduLearn: Gamified Education",
            description: "Making learning addictive with RPG mechanics, increasing daily active users by 200%.",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            projectUrl: "#",
            beforeImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            afterImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            stats: [
                { label: "Completion Rate", beforeValue: "10%", afterValue: "65%" },
                { label: "DAU", beforeValue: "500", afterValue: "5,000" },
                { label: "Time on Site", beforeValue: "5m", afterValue: "25m" }
            ],
             overview: "EduLearn had great content but boring delivery. Students were dropping out after the first module. We needed to make it fun.",
            clientRequirements: [
                "Experience Points (XP) & Leveling system",
                "Interactive quizzes with instant feedback",
                "Social study groups",
                "Mobile-first design"
            ],
             keyFeatures: [
                "RPG Progression System",
                "Real-time Multiplayer Quizzes",
                "Streak Mechanics",
                "Certificate Generation"
            ],
             technologies: ["Next.js", "MongoDB", "Framer Motion", "Stripe", "Auth.js"],
             howWeBuiltIt: [
                { _type: 'block', children: [{ _type: 'span', text: 'We gamified the entire experience. Every lesson completed earns XP. We used Framer Motion to add juicy animations for leveling up, triggering a dopamine hit that keeps students coming back.', marks: [] }], style: 'normal' }
            ],
             content: [
                 { _type: 'block', children: [{ _type: 'span', text: 'Result', marks: [] }], style: 'h2' },
                 { _type: 'block', listItem: 'bullet', children: [{ _type: 'span', text: '200% Increase in DAU', marks: [] }], style: 'normal', level: 1 }
            ]
        },
        "dummy-10": {
            title: "EcoMarket: Sustainable Choices",
            description: "An e-commerce platform that calculates the carbon footprint of every purchase cart.",
            image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            projectUrl: "#",
            beforeImage: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            afterImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            stats: [
                { label: "Carbon Saved", beforeValue: "0t", afterValue: "500t" },
                { label: "Cart Conversion", beforeValue: "1.8%", afterValue: "4.2%" },
                { label: "Brand Trust", beforeValue: "Med", afterValue: "High" }
            ],
             overview: "EcoMarket wanted to empower consumers to make greener choices. The challenge was visualizing abstract carbon data in a way that influenced buying behavior.",
            clientRequirements: [
                "Real-time carbon calculator API",
                "Tree planting integration at checkout",
                "Transparent supply chain tracking",
                "Minimalist, earth-toned UI"
            ],
             keyFeatures: [
                "Carbon Footprint API",
                "Blockchain Supply Chain",
                "One-Click Offset",
                "Eco-Badges for Products"
            ],
             technologies: ["Vue.js", "Python (Django)", "PostgreSQL", "Stripe Climate"],
             howWeBuiltIt: [
                { _type: 'block', children: [{ _type: 'span', text: 'We built a backend service that estimates carbon impact based on shipping distance and product weight. This data is displayed instantly in the cart, with a simple toggle to offset it for a few cents.', marks: [] }], style: 'normal' }
            ],
             content: [
                 { _type: 'block', children: [{ _type: 'span', text: 'Impact', marks: [] }], style: 'h2' },
                 { _type: 'block', listItem: 'bullet', children: [{ _type: 'span', text: '500 Tons of CO2 Offset in Year 1', marks: [] }], style: 'normal', level: 1 }
            ]
        }
    }
    
    return dummyData[slug] || dummyData["dummy-1"];
  }

  const query = `*[_type == "caseStudy" && slug.current == $slug][0]`;
  const data = await client.fetch(query, { slug });
  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: caseStudy.title,
    description: caseStudy.description,
  };
}


export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);

  if (!caseStudy) {
    return notFound();
  }

  return (
    <article className="relative min-h-screen overflow-hidden py-12 md:py-24">
       {/* Ambient Background Glow */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
       
      <div className="container relative z-10 mx-auto max-w-5xl px-4">
        <Link href="/" className="group mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Case Studies
        </Link>
        
        <div className="grid gap-12 lg:grid-cols-[1fr_300px] lg:gap-16">
            <div className="space-y-8">
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold font-display tracking-tight lg:text-6xl text-foreground">
                    {caseStudy.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                    {caseStudy.description}
                    </p>
                </div>

                {caseStudy.image && (
                    <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                         <Image
                            src={typeof caseStudy.image === 'string' ? caseStudy.image : urlFor(caseStudy.image).url()}
                            alt={caseStudy.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                )}

                {/* 1. Overview */}
                {caseStudy.overview && (
                     <div className="mb-12">
                        <h2 className="text-3xl font-bold font-display mt-10 mb-6 text-foreground">Overview</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">{caseStudy.overview}</p>
                    </div>
                )}

                {/* 2. Client Requirement */}
                {caseStudy.clientRequirements && caseStudy.clientRequirements.length > 0 && (
                     <div className="mb-12">
                        <h2 className="text-3xl font-bold font-display mt-10 mb-6 text-foreground">Client Requirements</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {caseStudy.clientRequirements.map((req: string, i: number) => (
                                <li key={i} className="flex items-start rounded-lg border border-white/5 bg-white/5 p-4 text-muted-foreground transition-colors hover:border-primary/20 hover:bg-white/10">
                                    <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                                    {req}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* 3. Key Features - Grid Layout */}
                 {caseStudy.keyFeatures && caseStudy.keyFeatures.length > 0 && (
                     <div className="mb-16">
                        <h2 className="text-3xl font-bold font-display mt-12 mb-8 text-foreground">Key Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {caseStudy.keyFeatures.map((feature: string, i: number) => (
                                <div key={i} className="group flex flex-col p-6 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-primary/30 hover:bg-white/10 hover:-translate-y-1">
                                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <span className="text-lg font-medium text-foreground">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Testimonial Block */}
                {caseStudy.testimonial && (
                    <div className="my-20 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-transparent p-[1px]">
                         <div className="h-full w-full rounded-3xl bg-black/40 backdrop-blur-md p-8 md:p-12 text-center md:text-left">
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                {caseStudy.testimonial.avatar && (
                                    <div className="shrink-0">
                                        <div className="relative h-20 w-20 md:h-24 md:w-24 overflow-hidden rounded-full border-2 border-primary/20">
                                            <Image 
                                                src={typeof caseStudy.testimonial.avatar === 'string' ? caseStudy.testimonial.avatar : urlFor(caseStudy.testimonial.avatar).url()}
                                                alt={caseStudy.testimonial.author}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="space-y-4">
                                     <blockquote className="text-xl md:text-2xl font-medium leading-relaxed font-display text-white">
                                        &ldquo;{caseStudy.testimonial.quote}&rdquo;
                                    </blockquote>
                                    <div>
                                        <div className="font-bold text-primary text-lg">{caseStudy.testimonial.author}</div>
                                        <div className="text-sm text-muted-foreground">{caseStudy.testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                         </div>
                    </div>
                )}

                {/* 4. How We Built It */}
                {caseStudy.howWeBuiltIt && (
                     <div className="mb-12">
                        <h2 className="text-3xl font-bold font-display mt-10 mb-6 text-foreground">How We Built It</h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-muted-foreground">
                             <PortableText value={caseStudy.howWeBuiltIt} components={caseStudyComponents} />
                        </div>
                    </div>
                )}

                 {/* 5. Technologies */}
                 {caseStudy.technologies && caseStudy.technologies.length > 0 && (
                     <div className="mb-16">
                        <h2 className="text-3xl font-bold font-display mt-10 mb-6 text-foreground">Technologies</h2>
                        <div className="flex flex-wrap gap-2">
                            {caseStudy.technologies.map((tech: string, i: number) => (
                                <span key={i} className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="border-t border-white/10 pt-10"></div>

                <div className="prose prose-lg dark:prose-invert max-w-none 
                    prose-headings:font-display prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 
                    prose-p:text-muted-foreground prose-p:leading-relaxed 
                    prose-strong:text-primary prose-strong:font-semibold
                    prose-li:text-muted-foreground
                    ">
                    {caseStudy.content && <PortableText value={caseStudy.content} components={caseStudyComponents} />}
                </div>

                {/* Business Impact Stats */}
                {caseStudy.stats && caseStudy.stats.length > 0 && (
                    <div className="mt-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                         <h2 className="text-3xl font-bold font-display mb-8 text-foreground">Business Impact</h2>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {caseStudy.stats.map((stat: { label: string; beforeValue: string; afterValue: string }, index: number) => (
                                <div key={index} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                                    <div className="text-sm font-medium text-muted-foreground mb-4">{stat.label}</div>
                                    <div className="flex items-end gap-3">
                                        <div className="text-3xl font-bold text-white tabular-nums">{stat.afterValue}</div>
                                        <div className="text-sm font-medium text-red-400/80 mb-1.5 line-through decoration-red-400/50 decoration-2">{stat.beforeValue}</div>
                                    </div>
                                    <div className="mt-2 text-xs font-medium text-green-400">
                                        {/* Simple growth calc or static label */}
                                        Improved
                                    </div>
                                </div>
                            ))}
                         </div>
                    </div>
                )}

                 {/* Visual Transformation */}
                 {caseStudy.beforeImage && caseStudy.afterImage && (
                    <div className="mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                        <h2 className="text-3xl font-bold font-display mb-8 text-foreground">Visual Transformation</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
                                    Before
                                </div>
                                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-white/5 grayscale-[0.5] transition-all hover:grayscale-0">
                                    <Image
                                        src={typeof caseStudy.beforeImage === 'string' ? caseStudy.beforeImage : urlFor(caseStudy.beforeImage).url()}
                                        alt="Before redesign"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="inline-flex items-center rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                                    After
                                </div>
                                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-primary/30 bg-primary/5 shadow-2xl shadow-primary/10">
                                     <Image
                                        src={typeof caseStudy.afterImage === 'string' ? caseStudy.afterImage : urlFor(caseStudy.afterImage).url()}
                                        alt="After redesign"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                 )}
            </div>

            {/* Sidebar / Sticky Info */}
            <div className="lg:block">
                <div className="sticky top-24 space-y-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Client</h3>
                        <p className="font-display font-semibold text-lg">{caseStudy.title.split(':')[0]}</p>
                    </div>
                    
                    {/* Add dummy date/industry if available in schema later, for now static or derived */}
                     <div>
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Services</h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Web Design</span>
                            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Development</span>
                            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Strategy</span>
                        </div>
                    </div>

                    {caseStudy.projectUrl && (
                        <div className="pt-4 border-t border-white/10">
                            <a 
                                href={caseStudy.projectUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex w-full h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-primary-foreground shadow-[0_0_20px_-5px_hsl(var(--primary)/0.5)] transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.7)] hover:-translate-y-0.5"
                            >
                                Visit Live Site <ArrowUpRight className="ml-2 h-4 w-4" />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </article>
  );
}
