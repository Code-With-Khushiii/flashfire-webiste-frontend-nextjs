export interface PricingFeature {
  title: string;
  description: string;
}

export interface PricingPlan {
  title: string;
  tag?: string;
  subTitle: string;
  description: string;
  price: string;
  oldPrice?: string;
  features: PricingFeature[];
  inheritsFrom?: string;
  addOn?: boolean;
  highlight?: boolean;
  paymentLink?: string;
}

export const usPricingPlans: PricingPlan[] = [
  {
    title: "IGNITE",
    subTitle: "250 Applications",
    description: "For senior professionals & executives",
    price: "$139",
    oldPrice: "$299",
    features: [
      { title:"No Time Constraint", description: "Until your applications are completed" },
      { title:"We Find Jobs", description: "We find & apply to jobs for you" },
      { title:"AI Custom Resumes", description: "Tailored resume for every application" },
      { title:"Expert Resume Writing", description: "Our professional team reviews & builds your resume from scratch" },
    ],
    addOn: true,
    highlight: false,
    paymentLink: "https://buy.stripe.com/9B6fZj5deaD03M4goL3AY21",
  },
  {
    title: "PROFESSIONAL",
    tag: "ECONOMICAL",
    subTitle: "500 Applications",
    description: "Best for mid-level professionals",
    price: "$244",
    oldPrice: "$449",
    inheritsFrom: "IGNITE",
    features: [
      { title:"No Time Constraint", description: "Until your applications are completed" },
      { title:"We Find Jobs", description: "We find & apply to jobs for you" },
      { title:"LinkedIn Makeover", description: "Let recruiters come to you" },
      { title:"Interview Prep Material", description: "Resources to help you ace interviews" },
    ],
    addOn: true,
    highlight: false,
    paymentLink: "https://buy.stripe.com/00wcN7gVW5iG6Yg6Ob3AY22",
  },
  {
    title: "EXECUTIVE",
    tag: "MOST POPULAR",
    subTitle: "1200 Applications",
    description: "For new grads & early professionals",
    price: "$419",
    oldPrice: "$699",
    inheritsFrom: "PROFESSIONAL",
    features: [
      { title:"1 Cover Letter", description: "1 cover letter used for all applications" },
      { title:"Emailing Recruiters", description: "We personally reach out to recruiters for you" },
      { title:"Portfolio Website", description: "We build a personal site to showcase your projects, skills & achievements" },
    ],
    addOn: true,
    highlight: true,
    paymentLink: "https://buy.stripe.com/bJe3cxgVW3ay0zS2xV3AY23",
  },
];

/** UK / EU checkout links, charged in GBP. */
export const UK_STRIPE_LINKS = {
  IGNITE: "https://buy.stripe.com/4gM28t7lm6mK6Yg1tR3AY1S",
  PROFESSIONAL: "https://buy.stripe.com/cNi5kF356h1o6Ygc8v3AY1T",
  EXECUTIVE: "https://buy.stripe.com/6oUfZj8pq5iGciA4G33AY1U",
} as const;

export const ukPricingPlans: PricingPlan[] = [
  {
    title: "IGNITE",
    subTitle: "250 Applications",
    description: "For senior professionals & executives",
    price: "£104",
    oldPrice: "£229",
    features: [
      { title:"No Time Constraint", description: "Until your applications are completed" },
      { title:"We Find Jobs", description: "We find & apply to jobs for you" },
      { title:"AI Custom CVs", description: "Tailored CV for every application" },
      { title:"Expert CV Writing", description: "Our professional team reviews & builds your CV from scratch" },
    ],
    addOn: true,
    highlight: false,
    paymentLink: UK_STRIPE_LINKS.IGNITE,
  },
  {
    title: "PROFESSIONAL",
    tag: "ECONOMICAL",
    subTitle: "500 Applications",
    description: "Best for mid-level professionals",
    price: "£209",
    oldPrice: "£339",
    inheritsFrom: "IGNITE",
    features: [
      { title:"No Time Constraint", description: "Until your applications are completed" },
      { title:"We Find Jobs", description: "We find & apply to jobs for you" },
      { title:"LinkedIn Makeover", description: "Let recruiters come to you" },
      { title:"Interview Prep Material", description: "Resources to help you ace interviews" },
    ],
    addOn: true,
    highlight: false,
    paymentLink: UK_STRIPE_LINKS.PROFESSIONAL,
  },
  {
    title: "EXECUTIVE",
    tag: "MOST POPULAR",
    subTitle: "1200 Applications",
    description: "For new grads & early professionals",
    price: "£349",
    oldPrice: "£529",
    inheritsFrom: "PROFESSIONAL",
    features: [
      { title:"1 Cover Letter", description: "1 cover letter used for all applications" },
      { title:"Emailing Recruiters", description: "We personally reach out to recruiters for you" },
      { title:"Portfolio Website", description: "We build a personal site to showcase your projects, skills & achievements" },
    ],
    addOn: true,
    highlight: true,
    paymentLink: UK_STRIPE_LINKS.EXECUTIVE,
  },
];

export const canadaPricingPlans: PricingPlan[] = [
  {
    title: "IGNITE",
    subTitle: "250 Applications",
    description: "For senior professionals & executives",
    price: "CA$167",
    oldPrice: "CA$389",
    features: [
      { title:"No Time Constraint", description: "Until your applications are completed" },
      { title:"We Find Jobs", description: "We find & apply to jobs for you" },
      { title:"AI Custom Resumes", description: "Tailored resume for every application" },
      { title:"Expert Resume Writing", description: "Our professional team reviews & builds your resume from scratch" },
    ],
    addOn: true,
    highlight: false,
    paymentLink: "https://buy.stripe.com/cNidRb49a26u96ogoL3AY24",
  },
  {
    title: "PROFESSIONAL",
    tag: "ECONOMICAL",
    subTitle: "500 Applications",
    description: "Best for mid-level professionals",
    price: "CA$286",
    oldPrice: "CA$619",
    inheritsFrom: "IGNITE",
    features: [
      { title:"No Time Constraint", description: "Until your applications are completed" },
      { title:"We Find Jobs", description: "We find & apply to jobs for you" },
      { title:"LinkedIn Makeover", description: "Let recruiters come to you" },
      { title:"Interview Prep Material", description: "Resources to help you ace interviews" },
    ],
    addOn: true,
    highlight: false,
    paymentLink: "https://buy.stripe.com/9B65kFcFG26ufuMegD3AY25",
  },
  {
    title: "EXECUTIVE",
    tag: "MOST POPULAR",
    subTitle: "1200 Applications",
    description: "For new grads & early professionals",
    price: "CA$559",
    oldPrice: "CA$949",
    inheritsFrom: "PROFESSIONAL",
    features: [
      { title:"1 Cover Letter", description: "1 cover letter used for all applications" },
      { title:"Emailing Recruiters", description: "We personally reach out to recruiters for you" },
      { title:"Portfolio Website", description: "We build a personal site to showcase your projects, skills & achievements" },
    ],
    addOn: true,
    highlight: true,
    paymentLink: "https://buy.stripe.com/4gMeVfbBCbH43M44G33AY26",
  },
];

/** Australia checkout links, charged in AUD. */
export const AU_STRIPE_LINKS = {
  IGNITE: "https://buy.stripe.com/bJebJ349afXk3M41tR3AY1V",
  PROFESSIONAL: "https://buy.stripe.com/fZubJ33566mKeqIdcz3AY1W",
  EXECUTIVE: "https://buy.stripe.com/eVq28tdJK9yW2I06Ob3AY1X",
} as const;

/** Europe (/en-eu) checkout links, charged in EUR. */
export const EU_STRIPE_LINKS = {
  IGNITE: "https://buy.stripe.com/dRm9AV49a6mK6Yg3BZ3AY1Y",
  PROFESSIONAL: "https://buy.stripe.com/eVqfZj8pqbH482k4G33AY1Z",
  EXECUTIVE: "https://buy.stripe.com/cNi9AV6hi6mK96oc8v3AY20",
} as const;

const EU_PRICES: Record<string, { price: string; oldPrice: string; link: string }> = {
  IGNITE: { price: "€118", oldPrice: "€249", link: EU_STRIPE_LINKS.IGNITE },
  PROFESSIONAL: { price: "€209", oldPrice: "€399", link: EU_STRIPE_LINKS.PROFESSIONAL },
  EXECUTIVE: { price: "€349", oldPrice: "€649", link: EU_STRIPE_LINKS.EXECUTIVE },
};

export const euPricingPlans: PricingPlan[] = ukPricingPlans.map((plan) => {
  const eu = EU_PRICES[plan.title];
  return eu ? { ...plan, price: eu.price, oldPrice: eu.oldPrice, paymentLink: eu.link } : plan;
});

export const australiaPricingPlans: PricingPlan[] = [
  {
    title: "IGNITE",
    subTitle: "250 Applications",
    description: "For senior professionals & executives",
    price: "AUD$209",
    oldPrice: "AUD$399",
    features: [
      { title:"No Time Constraint", description: "Until your applications are completed" },
      { title:"We Find Jobs", description: "We find & apply to jobs for you" },
      { title:"AI Custom Resumes", description: "Tailored resume for every application" },
      { title:"Expert Resume Writing", description: "Our professional team reviews & builds your resume from scratch" },
    ],
    addOn: true,
    highlight: false,
    paymentLink: AU_STRIPE_LINKS.IGNITE,
  },
  {
    title: "PROFESSIONAL",
    tag: "BEST VALUE",
    subTitle: "500 Applications",
    description: "Best for mid-level professionals",
    price: "AUD$384",
    oldPrice: "AUD$699",
    inheritsFrom: "IGNITE",
    features: [
      { title:"No Time Constraint", description: "Until your applications are completed" },
      { title:"We Find Jobs", description: "We find & apply to jobs for you" },
      { title:"LinkedIn Makeover", description: "Let recruiters come to you" },
      { title:"Interview Prep Material", description: "Resources to help you ace interviews" },
    ],
    addOn: true,
    highlight: false,
    paymentLink: AU_STRIPE_LINKS.PROFESSIONAL,
  },
  {
    title: "EXECUTIVE",
    tag: "MOST POPULAR",
    subTitle: "1200 Applications",
    description: "For new grads & early professionals",
    price: "AUD$629",
    oldPrice: "AUD$1,099",
    inheritsFrom: "PROFESSIONAL",
    features: [
      { title:"1 Cover Letter", description: "1 cover letter used for all applications" },
      { title:"Emailing Recruiters", description: "We personally reach out to recruiters for you" },
      { title:"Portfolio Website", description: "We build a personal site to showcase your projects, skills & achievements" },
    ],
    addOn: true,
    highlight: true,
    paymentLink: AU_STRIPE_LINKS.EXECUTIVE,
  },
];
