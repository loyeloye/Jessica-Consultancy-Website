// Single source of truth for site copy and facts.
export const siteConfig = {
  name: "Summer Et Al",
  fullName: "Summer Et Al",
  tagline: "Shoot Coordinator · Talent Booker · Creative Director",
  metaDescription:
    "Summer Et Al is a Dubai-based production coordination, talent booking, and creative direction studio for commercial, fashion, and editorial shoots — also available for strategic growth consulting.",
  email: "jaychukwu18@gmail.com",
  phone: "+971 58 897 9350",
  phoneHref: "+971588979350",
  linkedin: "https://www.linkedin.com/in/jessica-chukwu-661974358",
  location: "Dubai, UAE",
};

export const stats = [
  { value: "75+", label: "Talents sourced & booked" },
  { value: "25+", label: "Commercial shoots supported" },
  { value: "Middle East + Asia", label: "International production reach" },
];

export const heroCredibilityLine =
  "Trusted across banking, fashion, and lifestyle brands — with an active network of 1,000+ UAE and international talent, and a growing footprint in Dubai's fashion and retail industry.";

export const aboutPortrait = {
  src: "/images/about/portrait.webp",
  alt: "Editorial portrait from Jessica's portfolio",
};

export const services = [
  {
    slug: "production-coordination",
    title: "Production Coordination",
    short:
      "End-to-end coordination for commercial, fashion, branded content, and editorial shoots — from first call sheet to final delivery.",
    icon: "clapperboard",
    breakdown: [
      {
        phase: "Pre-Production",
        items: [
          "Scheduling",
          "Crew booking",
          "Talent sourcing & booking",
          "Call sheets",
          "Location sourcing",
        ],
      },
      {
        phase: "Production",
        items: [
          "Talent management",
          "On-set coordination",
          "Client support",
          "Vendor management",
        ],
      },
      {
        phase: "Post-Production",
        items: ["Asset tracking", "Deliverables", "Approvals", "Project closure"],
      },
    ],
  },
  {
    slug: "talent-booking",
    title: "Talent Booking",
    short:
      "Sourcing and booking models, actors, presenters, and lifestyle talent — with an established roster across the Middle East and internationally.",
    icon: "users",
    breakdown: [
      {
        phase: "What's included",
        items: [
          "Talent sourcing and casting against brief",
          "Booking and contract coordination",
          "Roster and availability management",
          "Talent logistics and scheduling",
          "On-set talent management and welfare",
          "Access to 1,000+ UAE and international talent",
        ],
      },
    ],
  },
  {
    slug: "creative-direction",
    title: "Creative Direction",
    short:
      "Concept-to-image creative direction for commercial and lifestyle campaigns — moodboarding, styling direction, and final image selection.",
    icon: "sparkles",
    breakdown: [
      {
        phase: "What's included",
        items: [
          "Concept development",
          "Moodboarding and visual reference",
          "Styling direction",
          "Creative supervision during production",
          "Talent direction",
          "Final image selection",
        ],
      },
    ],
  },
  {
    slug: "strategic-growth-consulting",
    title: "Strategic & Growth Consulting",
    short:
      "Strategic growth consulting for brands entering or expanding within the Dubai market — drawing on an established fashion, retail, and production network.",
    icon: "trending-up",
    breakdown: [
      {
        phase: "Focus areas",
        items: [
          "Procurement & product strategy",
          "Retail expansion planning",
          "Brand acquisition & partnerships",
          "Marketing & visibility strategy",
          "Market & audience expansion",
          "Dubai image & industry influence",
        ],
      },
    ],
    note: "Currently engaged as a strategic growth consultant for a Nigerian luxury retail group expanding into new markets.",
  },
];

export const aboutHighlights = [
  {
    title: "Talent Management",
    items: [
      "75+ talents sourced and booked — models, actors, presenters, and lifestyle talent",
      "Active network of 1,000+ UAE and international talent",
      "Managed talent logistics and scheduling",
      "Coordinated contracts and production requirements",
    ],
  },
  {
    title: "Production Operations",
    items: [
      "25+ commercial shoots supported across the Middle East and Asia",
      "Managed call sheets and shoot schedules",
      "Coordinated vendors and suppliers",
      "Oversaw shoot-day logistics from pre-production through delivery",
    ],
  },
  {
    title: "Client Management",
    items: [
      "Commercial campaigns and fashion editorials",
      "Lifestyle campaigns",
      "Banking and corporate productions",
      "Clear, calm communication under production pressure",
    ],
  },
];

export const aboutConsultingNote =
  "Alongside her production and talent work, Jessica also operates as a Strategic Growth Consultant, currently engaged on a 12-month retail consultancy with a Lagos-based luxury retail group expanding its brand influence into Dubai.";

export const sectors = [
  "Fashion editorials",
  "Commercial & lifestyle campaigns",
  "Banking & corporate productions",
];

export type SiteImage = { src: string; alt: string };

export type Campaign = {
  slug: string;
  client: string;
  category: string;
  role: string;
  summary: string;
  image: SiteImage;
  gallery: SiteImage[];
  scope: string[];
  deliverables: string[];
  stakeholders: string[];
  facts?: { label: string; value: string }[];
  objectives?: string[];
  outcome: string;
};

export const campaigns: Campaign[] = [
  {
    slug: "standard-chartered",
    client: "Standard Chartered",
    category: "International Commercial Campaign",
    role: "Talent Booker",
    summary:
      "Sourced and booked talent for a multi-market commercial campaign spanning out-of-home, digital, and in-branch placements.",
    image: {
      src: "/images/campaigns/standard-chartered-01.webp",
      alt: "Standard Chartered campaign creative featuring booked talent in a lifestyle setting",
    },
    gallery: [
      {
        src: "/images/campaigns/standard-chartered-02.webp",
        alt: "Standard Chartered Priority Banking campaign creative — sailing scenario",
      },
      {
        src: "/images/campaigns/standard-chartered-03.webp",
        alt: "Standard Chartered investment insights campaign creative — alpine scenario",
      },
    ],
    scope: [
      "Talent sourcing",
      "Booking & contract coordination",
      "Talent coordination",
      "Talent logistics",
      "Client liaison",
      "Daily schedule management",
    ],
    deliverables: [
      "Billboards",
      "ATM screens",
      "Social media",
      "Digital marketing",
      "Branch displays",
    ],
    stakeholders: ["Client team", "Production team", "Talent"],
    facts: [
      { label: "Talent managed", value: "8" },
      { label: "Production phases", value: "2" },
      { label: "Regions", value: "Middle East & Asia" },
    ],
    outcome:
      "Talent delivered across every placement on schedule, supporting a campaign visible across billboards, digital, and branch touchpoints.",
  },
  {
    slug: "olarsgrace-nyfw",
    client: "Olarsgrace",
    category: "Fashion Editorial — NYFW Campaign",
    role: "Shoot & Production Coordinator",
    summary:
      "Coordinated production for a fashion editorial campaign tied to New York Fashion Week, managing talent, studio operations, vendor communications, and shoot logistics.",
    image: {
      src: "/images/campaigns/olarsgrace-nyfw-01.webp",
      alt: "Olarsgrace look photographed for the NYFW campaign — tailored check suiting",
    },
    gallery: [
      {
        src: "/images/campaigns/olarsgrace-nyfw-02.webp",
        alt: "Olarsgrace editorial look on set — tailored check suiting",
      },
      {
        src: "/images/campaigns/olarsgrace-nyfw-03.webp",
        alt: "Olarsgrace editorial look — tailored dress with styling detail",
      },
      {
        src: "/images/campaigns/olarsgrace-nyfw-04.webp",
        alt: "Olarsgrace campaign imagery published to the brand's social channels",
      },
    ],
    scope: [
      "Talent sourcing & booking",
      "Talent coordination",
      "Studio coordination",
      "Vendor communication",
      "Shoot-day logistics",
    ],
    deliverables: [
      "Editorial imagery",
      "Campaign assets",
      "Social media content",
      "Brand marketing materials",
    ],
    stakeholders: ["Brand team", "Creative team", "Photographers", "Talent"],
    outcome:
      "Supported the successful execution of a high-profile New York Fashion Week campaign, coordinating every production element ahead of shoot day so creative teams could focus on content. Contributed to the timely delivery of editorial and campaign assets supporting the brand's Fashion Week marketing, publicity, and digital objectives.",
  },
  {
    slug: "oh-mobility",
    client: "OH Mobility",
    category: "Commercial Lifestyle Campaign",
    role: "Creative Director",
    summary:
      "Led creative direction from concept through final image selection — moodboarding, styling direction, talent, and creative supervision on set.",
    image: {
      src: "/images/campaigns/oh-mobility-01.webp",
      alt: "OH Mobility lifestyle campaign — selected campaign imagery",
    },
    gallery: [
      {
        src: "/images/campaigns/oh-mobility-02.webp",
        alt: "OH Mobility lifestyle campaign — outdoor active scenario",
      },
      {
        src: "/images/campaigns/oh-mobility-03.webp",
        alt: "OH Mobility lifestyle campaign — relaxed everyday scenario",
      },
    ],
    scope: [
      "Concept development",
      "Moodboarding",
      "Styling direction",
      "Talent sourcing & booking",
      "Talent logistics",
      "Creative supervision during production",
      "Final image selection",
    ],
    deliverables: [
      "Campaign photography",
      "Social media assets",
      "Digital marketing content",
      "Brand content library",
    ],
    stakeholders: ["Client marketing team", "Photography team", "Talent"],
    objectives: [
      "Increase brand awareness",
      "Strengthen lifestyle positioning",
      "Create social-first content",
      "Showcase product integration in real-life scenarios",
    ],
    outcome:
      "Established a cohesive visual identity for the campaign and delivered a versatile suite of creative assets supporting ongoing brand and marketing initiatives.",
  },
];

export const highlights: SiteImage[] = [
  { src: "/images/highlights/01.webp", alt: "Studio editorial — tailored suiting on set" },
  { src: "/images/highlights/02.webp", alt: "Low-key beauty and jewellery editorial" },
  { src: "/images/highlights/03.webp", alt: "Lifestyle product detail — watch styling" },
  { src: "/images/highlights/04.webp", alt: "Fine jewellery campaign detail" },
  { src: "/images/highlights/05.webp", alt: "Beauty and jewellery editorial portrait" },
  { src: "/images/highlights/06.webp", alt: "Family lifestyle campaign scenario" },
  { src: "/images/highlights/07.webp", alt: "Street-style lifestyle campaign scenario" },
  { src: "/images/highlights/08.webp", alt: "Studio lighting setup on a production day" },
];

export const projectTypes = [
  "Production Coordination",
  "Talent Booking",
  "Creative Direction",
  "Strategic Consulting",
] as const;

export const budgetRanges = [
  "Under AED 20,000",
  "AED 20,000 – 50,000",
  "AED 50,000 – 150,000",
  "AED 150,000+",
  "Prefer to discuss",
] as const;
