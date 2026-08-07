// Single source of truth for site copy and facts.
// Update the brand name here if Jessica settles on a formal business name.
export const siteConfig = {
  name: "Jessica",
  fullName: "Jessica Chukwu",
  tagline: "Shoot Coordinator · Talent Booker · Creative Director",
  metaDescription:
    "Jessica is a Dubai-based production coordinator, talent booker, and creative director for commercial, fashion, and editorial shoots — also available for strategic growth consulting.",
  email: "jaychukwu18@gmail.com",
  phone: "+971 58 897 9350",
  phoneHref: "+971588979350",
  linkedin: "https://www.linkedin.com/in/jessica-chukwu-661974358",
  location: "Dubai, UAE",
};

export const stats = [
  { value: "75+", label: "Talents sourced & booked" },
  { value: "25+", label: "Commercial shoots supported" },
  { value: "UAE + Thailand", label: "International production reach" },
];

export const heroCredibilityLine =
  "Trusted across banking, fashion, and lifestyle brands — with an active network of 30+ UAE and international talent, and a growing footprint in Dubai's fashion and retail industry.";

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
          "Scheduling and timeline planning",
          "Crew and vendor sourcing and management",
          "Location scouting coordination and permits liaison",
          "Budget tracking and cost management",
          "Talent and casting coordination",
        ],
      },
      {
        phase: "Production",
        items: [
          "On-set coordination and run-of-show management",
          "Crew logistics and call sheet management",
          "Talent handling and on-set client liaison",
          "Real-time problem-solving to keep shoots on schedule",
        ],
      },
      {
        phase: "Post-Production",
        items: [
          "Delivery coordination with editors and retouchers",
          "Asset management and organized handover",
          "Client review cycles and final sign-off",
        ],
      },
    ],
  },
  {
    slug: "talent-booking",
    title: "Talent Booking",
    short:
      "Sourcing and booking models, actors, presenters, and lifestyle talent — with an established roster across the UAE and internationally.",
    icon: "users",
    breakdown: [
      {
        phase: "What's included",
        items: [
          "Talent sourcing and casting against brief",
          "Roster and availability management",
          "Rate and contract liaison",
          "On-set talent management and welfare",
          "Access to 30+ UAE and international talent",
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
          "Styling and art direction on set",
          "Talent direction",
          "Final image selection and sequencing",
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
      "Active network of 30+ UAE and international talent",
      "Casting, contract liaison, and on-set talent care from booking through wrap",
    ],
  },
  {
    title: "Production Operations",
    items: [
      "25+ commercial shoots supported across the UAE and Thailand",
      "Scheduling, crew logistics, and vendor management",
      "On-set coordination and production troubleshooting",
    ],
  },
  {
    title: "Client Management",
    items: [
      "Client communication and stakeholder management across banking, fashion, and lifestyle brands",
      "Trusted delivery partner for agencies and in-house marketing teams",
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

export type Campaign = {
  slug: string;
  client: string;
  category: string;
  role: string;
  summary: string;
  deliverables: string[];
  stakeholders: string[];
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
    deliverables: [
      "Billboards",
      "ATM screen displays",
      "Social media assets",
      "Digital placements",
      "In-branch displays",
    ],
    stakeholders: ["Bank client team", "Creative agency", "Production crew"],
    outcome:
      "Talent delivered across every placement on schedule, supporting a campaign visible across billboards, digital, and branch touchpoints.",
  },
  {
    slug: "olarsgrace-nyfw",
    client: "Olarsgrace",
    category: "Fashion Editorial — NYFW Campaign",
    role: "Shoot & Production Coordinator",
    summary:
      "Coordinated production for a fashion editorial campaign tied to New York Fashion Week, managing schedule, crew, and on-set logistics.",
    deliverables: ["Editorial imagery", "Campaign look book assets"],
    stakeholders: ["Design house", "Photography team", "Styling team"],
    outcome:
      "Delivered a fully coordinated editorial shoot on schedule, supporting the brand's NYFW presence.",
  },
  {
    slug: "oh-mobility",
    client: "OH Mobility",
    category: "Commercial Lifestyle Campaign",
    role: "Creative Director",
    summary:
      "Led creative direction from concept through final image selection — moodboarding, styling direction, and talent direction on a lifestyle commercial campaign.",
    deliverables: ["Concept & moodboard", "Campaign imagery", "Final image selects"],
    stakeholders: ["Client marketing team", "Photography team", "Talent"],
    outcome:
      "Delivered a cohesive campaign look from concept to final selects, aligned to brand positioning.",
  },
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
