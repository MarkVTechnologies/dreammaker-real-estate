export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  photo: string;
  /** One-line summary used on the homepage teaser card. */
  summary: string;
  /** Full-length paragraphs for the leadership page. */
  bio: string[];
  expertise?: string[];
}

export const executiveTeam: TeamMember[] = [
  {
    slug: "ejieh-paradise-godstime",
    name: "Ejieh Paradise Godstime",
    role: "CEO & Managing Director",
    photo: "/images/team/ejieh-paradise-godstime.jpg",
    summary:
      "Founder and Managing Director, leading DreamMaker's growth across Lagos and Ogun's fastest-developing corridors.",
    bio: [
      "Ejieh Paradise Godstime founded DreamMaker Real Estate to bring transparency and delivery discipline to Nigeria's property market. Based in Lekki, Lagos, he has built the company from a single plot on the Lekki–Epe corridor into a developer with an active pipeline across Lagos and Ogun State, with a focus on properties in high-growth economic areas.",
      "His leadership has driven flagship developments including Epe Club Estate in Igboye, Epe — a serene estate blending comfort with urban living — Big City Estate in Igbonla, Epe, and Orakle's Garden in Ijebu Ode, a heritage-inspired development built around modern infrastructure.",
      "He holds a Bachelor of Science in Accounting and is currently pursuing a second degree at the University of Lagos. Before founding DreamMaker, he built and ran Paradise Global Enterprise, a pest-control company serving top-tier clients across Lagos State — an experience that shaped his focus on operational discipline and client service.",
      "Raised in a Christian home in Delta State, Paradise is happily married and a father, balancing a growing real estate business with a strong sense of family responsibility.",
    ],
    expertise: [
      "Real Estate Advisory & Investment Strategy",
      "Commercial & Residential Property Development",
      "Sales, Marketing & Negotiation",
      "Client Relationship Management",
      "Strategic Business Growth & Expansion",
      "Land Retailing",
    ],
  },
  {
    slug: "mary-william",
    name: "Mary William",
    role: "Chief Operating Officer",
    photo: "/images/team/mary-william.jpg",
    summary: "Chief Operating Officer, overseeing day-to-day operations and organizational growth.",
    bio: [
      "Mary William serves as Chief Operating Officer at DreamMaker Real Estate, where she leads operational strategy and talent development across the company. A graduate of Public Administration, she brings a versatile, hands-on approach that keeps teams aligned as the company scales.",
      "Beyond her operational role, Mary is an active writer, speaker, and researcher, known for communication that translates strategy into action. Colleagues describe her leadership style as one that pairs accountability with genuine care — fostering a culture where the team is supported to grow.",
    ],
  },
  {
    slug: "ejieh-mercy-ogho",
    name: "Ejieh Mercy Ogho",
    role: "General Manager",
    photo: "/images/team/ejieh-mercy-ogho.jpg",
    summary: "General Manager, translating company strategy into day-to-day execution.",
    bio: [
      "Ejieh Mercy Ogho is General Manager at DreamMaker Real Estate, where she turns the company's growth strategy into daily execution. She holds a Higher National Diploma in Business Administration from Delta State Polytechnic and draws on a background in marketing and styling to combine creativity with operational rigor.",
      "Mercy is known for building trust quickly — with clients, teams, and stakeholders alike — and for problem-solving instincts that have measurably improved efficiency and customer satisfaction across the company. She is currently pursuing a certification in Health and Safety as part of her continued professional development.",
    ],
  },
];

export const advisoryBoard: TeamMember[] = [
  {
    slug: "femi-adisa",
    name: "Femi Adisa",
    role: "Advisory Board Member",
    photo: "/images/team/femi-adisa.jpg",
    summary: "Founder and head coach, The Biblical Billionaire Club.",
    bio: [
      "Femi Adisa is the founder and head coach of The Biblical Billionaire Club, a business community of more than 45,000 members focused on developing Christian leaders across industry and policy. He is a graduate of Redeemer's University and serves as a Youth Pastor with The Redeemed Christian Church of God.",
      "He also works in the entertainment industry as a filmmaker and musician, and is the author of \"How to Get Rich, Stay Rich and Get Richer,\" alongside several business and finance courses on wealth creation. Femi is married to Tomi Adisa, and together they have two sets of twins.",
    ],
  },
  {
    slug: "olorunfemi-joshua-diamond",
    name: "Olorunfemi Joshua Diamond",
    role: "Advisory Board Member",
    photo: "/images/team/joshua-diamond.jpg",
    summary: "Group Head of Sales & Digital Media, Silverbird Group.",
    bio: [
      "Josh Diamond brings over a decade of experience in digital media, marketing, and sales to DreamMaker's Advisory Board. As Group Head of Sales & Digital Media for Silverbird Group — one of Africa's leading entertainment conglomerates — he has led campaigns for brands including MTN Nigeria, Access Bank, and Janssen Pharmaceuticals, working across a marketing network of more than 320 partners.",
      "At DreamMaker, Josh advises on digital strategy and brand positioning, helping the company reach investors and homebuyers across its target markets.",
    ],
  },
  {
    slug: "oliver-eyah",
    name: "Oliver Eyah",
    role: "Senior Associate / Attorney & Policy Advisor",
    photo: "/images/team/oliver-eyah.jpg",
    summary: "Senior Associate and Attorney, commercial law and real estate compliance.",
    bio: [
      "Oliver Eyah is a Senior Associate and Attorney with more than ten years of experience in commercial law, real estate, and regulatory compliance. He advises DreamMaker on contract structuring, dispute resolution, and financial risk.",
      "His experience spans Senior Associate/Head of Chambers at Eubena Amedu & Co, Legal & Business Operations Lead Consultant at Finflux Nigeria, and Legal Liaison Officer (External Consultant) at FoxPay.",
    ],
    expertise: [
      "Regulatory Compliance",
      "Corporate & Commercial Law",
      "Contract Negotiation & Drafting",
      "Policy Advisory",
      "Dispute Resolution",
      "Financial Risk Management",
      "Real Estate Deal Structuring",
    ],
  },
];

export const allTeamMembers: TeamMember[] = [...executiveTeam, ...advisoryBoard];
