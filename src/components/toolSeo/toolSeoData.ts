export type ToolSeoCopy = {
  name: string;
  intro: string;
  steps: string[];
  tips: string[];
  faqs: { q: string; a: string }[];
  deepDive?: string[];
};

const generic = (name: string, what: string, who: string): Pick<ToolSeoCopy, "faqs"> => ({
  faqs: [
    { q: `Is the ${name} free to use?`, a: `Yes. The ${name} is free to use and does not require you to create an account. You can run it as many times as you like while you compare options or refine your numbers.` },
    { q: `Is my data stored when I use the ${name}?`, a: `Your inputs are used only to produce your result in the page. We do not sell personal information, and you can read how we handle data in our privacy policy.` },
    { q: `Who is the ${name} for?`, a: `${who} It is built for ${what}, so you can make faster, better-informed decisions during your job search.` },
  ],
});

export const toolSeoCopy: Record<string, ToolSeoCopy> = {
  "gross-pay-calculator": {
    name: "Gross Pay Calculator",
    deepDive: [
      "Gross pay is the number every employer quotes and every payslip starts from, yet many candidates mix it up with take-home pay. Offers, contracts and job ads almost always state gross figures, so converting between hourly, weekly, monthly and annual gross is the first step in judging whether a role meets your target.",
      "Overtime and bonuses change the picture quickly. A role with a lower base rate but guaranteed overtime or an annual bonus can out-earn a higher flat salary, so enter all pay components before you compare. Once you know your gross figure, move on to the after-tax and take-home calculators to see what actually lands in your bank account.",
    ],
    intro: "Gross pay is your total earnings before taxes and deductions. Whether you are comparing a salaried offer with an hourly role or checking a payslip, knowing your gross pay is the starting point for every other pay calculation, from take-home pay to budgeting and salary negotiation.",
    steps: ["Choose how you are paid: hourly, weekly, bi-weekly, monthly or annually.", "Enter your rate and the hours you work per week, plus any overtime or bonus pay.", "Review your gross pay across every pay period, then use the figure to estimate your net income."],
    tips: ["Always compare offers on the same basis, such as annual gross pay.", "Include bonuses, overtime and commissions to see your true earning potential.", "Use the result as the opening number when you negotiate a salary."],
    ...generic("Gross Pay Calculator", "job seekers, contractors and employees", "Anyone comparing job offers or checking a payslip can use it."),
  },
  "salary-estimator": {
    name: "Salary Estimator",
    deepDive: [
      "Salary data is scattered across job boards, surveys and word of mouth, and the numbers rarely agree. An estimator brings role, seniority, location and skills into one range so you can sanity-check an offer before you reply to a recruiter.",
      "Use the range at two moments: when a recruiter asks for your expectations, and when you receive an offer. Quoting a figure grounded in the middle to upper part of the range keeps you credible while leaving room to negotiate. If your skills sit at the top of the demand curve, lean towards the upper end and be ready to explain why.",
    ],
    intro: "Walking into a negotiation without a realistic range is risky. The Salary Estimator combines role, experience, location and skill premium to give you a grounded salary range, so you can judge an offer and ask for what you are worth.",
    steps: ["Select your job role and seniority level.", "Add your location and years of experience.", "Include in-demand skills that raise your market value to see an estimated range."],
    tips: ["Treat the output as a range, not a single number.", "Adjust for cost of living when you compare cities or countries.", "Pair the estimate with recent job postings for the same role."],
    ...generic("Salary Estimator", "candidates planning an offer discussion", "Job seekers, career changers and professionals asking for a raise can use it."),
  },
  "cv-keyword-scanner": {
    name: "CV Keyword Scanner",
    deepDive: [
      "Most mid-size and large employers pass applications through an applicant tracking system before a person reads them. These systems match the words in your CV against the words in the job description, so a strong CV can still be filtered out when it uses different terminology from the posting.",
      "Paste the full job description, scan your CV, and look at which skills and tools appear in the posting but not in your document. Add the missing ones only where they are true, ideally inside your experience bullets with real context. Re-scan for every role you apply to, because each description emphasises different requirements.",
    ],
    intro: "Most employers use applicant tracking systems (ATS) that filter CVs by keywords before a human reads them. The CV Keyword Scanner compares your CV with a job description and shows which important keywords you already cover and which are missing.",
    steps: ["Paste or upload your CV.", "Paste the job description you are applying for.", "Review matched and missing keywords, then update your CV with the relevant ones in a natural way."],
    tips: ["Mirror the exact wording of the job description where it is truthful.", "Place key skills in your summary, experience bullets and skills section.", "Scan again after editing to confirm your match improved."],
    ...generic("CV Keyword Scanner", "job seekers tailoring a CV to a role", "Anyone applying to jobs through online portals can use it."),
  },
  "resume-headline-generator": {
    name: "Resume Headline Generator",
    deepDive: [
      "The headline is the first line a recruiter reads under your name, and it often decides whether they keep scrolling. A good headline names your role, your strongest skill area and a proof point, in under a dozen words.",
      "Generate several options, then combine the best parts. Match the job title used in the posting so search filters and applicant tracking systems recognise you, and avoid vague words such as passionate or hardworking. Update the headline when you change target roles, because one generic line rarely fits every application.",
    ],
    intro: "Your resume headline is the first line a recruiter reads. A strong one states who you are, what you do best and the value you bring in a few words. The Resume Headline Generator turns your role and strengths into clear, recruiter-ready headline options.",
    steps: ["Enter your target job title and years of experience.", "Add two or three core skills or achievements.", "Generate several headline options and pick the one that fits your voice."],
    tips: ["Keep it under 12 words and lead with your job title.", "Use concrete strengths instead of vague adjectives.", "Match the headline to the role you are applying for."],
    ...generic("Resume Headline Generator", "professionals polishing the top of their resume", "Fresh graduates and experienced candidates alike can use it."),
  },
  "ai-resume-summary-generator": {
    name: "AI Resume Summary Generator",
    deepDive: [
      "A resume summary is your three to four line pitch at the top of the page. Recruiters spend only seconds on a first pass, so the summary has to state who you are, what you have achieved and what you want to do next without filler.",
      "Give the generator your current role, years of experience and two or three real achievements. Edit the output so it uses your own numbers, such as revenue saved or users supported, and mirrors the language of the job posting. Keep it honest: every claim in the summary should be something you can talk about confidently in an interview.",
    ],
    intro: "A resume summary gives recruiters a quick answer to the question: why should we hire you? The AI Resume Summary Generator drafts a concise, professional summary from your experience, skills and goals so you can start from a strong first paragraph.",
    steps: ["Enter your role, industry and years of experience.", "List your key skills and a notable achievement.", "Generate the summary, then edit it so it sounds like you."],
    tips: ["Keep the summary to three or four lines.", "Include a measurable result where you can.", "Customise it for each application rather than reusing one version."],
    ...generic("AI Resume Summary Generator", "candidates writing or refreshing a resume", "Students, career changers and senior professionals can use it."),
  },
  "salary-comparison": {
    name: "Salary Comparison Tool",
    deepDive: [
      "Two offers rarely differ only in base salary. Benefits, bonuses, equity, commute and location all change the real value of a job, so a side-by-side comparison is more useful than looking at headline pay alone.",
      "Enter both offers with the same assumptions, then look at the annual difference and the monthly difference. A smaller salary with lower commute cost or stronger benefits may leave you better off. Use the result to prepare a negotiation: if one offer is clearly stronger, it gives you a documented reason to ask the other employer to improve their terms.",
    ],
    intro: "A higher salary does not always mean higher purchasing power. The Salary Comparison tool lets you compare two pay figures or locations side by side so you can see which offer really leaves you better off.",
    steps: ["Enter the salary and location for each option.", "Compare gross pay and the effect of local living costs.", "Use the comparison to prioritise offers or plan a negotiation."],
    tips: ["Compare after-tax income, not just headline salary.", "Consider benefits, bonuses and equity alongside base pay.", "Revisit the comparison whenever an offer changes."],
    ...generic("Salary Comparison Tool", "people weighing job offers or relocations", "Job seekers considering a move to another city or country can use it."),
  },
  "resume-bullet-point-generator": {
    name: "Resume Bullet Point Generator",
    deepDive: [
      "Strong resume bullets show what you did, how you did it and what changed because of it. Weak bullets list duties, which every other candidate for the role can also list.",
      "Describe the task in plain words and let the generator turn it into an action-led bullet. Then add a number: percentage improved, hours saved, customers served. Keep each bullet to one or two lines, start with a strong verb and vary the verbs across the page. Review every line so it reflects work you actually did.",
    ],
    intro: "Strong resume bullets show impact, not duties. The Resume Bullet Point Generator turns your responsibilities into action-led, results-focused bullet points that recruiters and ATS software can scan quickly.",
    steps: ["Describe what you did in a role or project.", "Add numbers such as time saved, revenue or users where possible.", "Generate bullet options and keep the ones that are accurate."],
    tips: ["Start each bullet with a strong action verb.", "Quantify results whenever you can.", "Keep every bullet to one or two lines."],
    ...generic("Resume Bullet Point Generator", "candidates improving their experience section", "Anyone updating a resume can use it."),
  },
  "ai-interview-answer-generator": {
    name: "AI Interview Answer Generator",
    deepDive: [
      "Interviewers ask behavioural questions to see how you think under pressure, and most strong answers follow the same structure: situation, task, action and result. Practising that structure is the fastest way to stop rambling.",
      "Enter the question and a short note about your experience, then use the draft as a starting point, not a script. Replace generic details with your own story, rehearse it aloud and time it to about two minutes. Prepare five or six flexible stories that you can adapt to different questions, such as conflict, failure, leadership and a proud achievement.",
    ],
    intro: "Interviews reward preparation. The AI Interview Answer Generator helps you structure clear, confident answers to common and behavioural questions using your own experience, so you walk into the room ready.",
    steps: ["Choose or type the interview question.", "Add the role and a short note on your background.", "Generate a structured answer and practise it in your own words."],
    tips: ["Use the STAR method: situation, task, action, result.", "Rehearse out loud rather than memorising a script.", "Prepare two or three stories you can adapt to many questions."],
    ...generic("AI Interview Answer Generator", "candidates preparing for interviews", "Graduates, career changers and experienced hires can use it."),
  },
  "contact-us": {
    name: "Flashfire Support",
    deepDive: [
      "Whether you are a job seeker with a question about how Flashfire applies on your behalf, a student comparing plans, or a partner interested in working together, this page is the quickest way to reach the team.",
      "When you write in, include your target role, location and the email you used to register so we can respond faster. For product demos, use the booking page to pick a time that suits you. For account or billing questions, mention the plan you are on. We read every message and aim to reply within one business day.",
    ],
    intro: "Our team helps job seekers every day, from choosing a plan to understanding how our AI applies to jobs on your behalf. Use this page to reach us with questions about pricing, onboarding, your account or partnerships.",
    steps: ["Fill in the contact form with your name, email and question.", "Or message us on WhatsApp for a quick answer.", "Our team replies as soon as possible, usually within one business day."],
    tips: ["Include the email you used to sign up so we can find your account.", "Mention the country you are applying in so we can give relevant advice.", "Book a demo if you would like a walkthrough of the service."],
    faqs: [
      { q: "How quickly will Flashfire reply?", a: "We aim to respond within one business day. WhatsApp is usually the fastest way to reach us." },
      { q: "Can I talk to someone before I sign up?", a: "Yes. You can book a free demo call, where we explain the process, pricing and what to expect." },
      { q: "Where can I find answers to common questions?", a: "Visit our FAQ page for answers on pricing, how the service works and refunds." },
    ],
  },
  "after-tax-income-calculator": {
    name: "After-Tax Income Calculator",
    deepDive: [
      "Gross salary tells you what an employer pays; after-tax income tells you what you can spend. The gap depends on your country or state, filing status, deductions and contributions, which is why two people on the same salary can take home very different amounts.",
      "Enter your annual or hourly pay and location to see an estimate after income tax and common deductions. Use it when comparing offers in different cities, planning rent and savings, or deciding whether a raise is worth a move. Remember that this is an estimate; confirm exact figures with a payroll or tax professional before making major financial commitments.",
    ],
    intro: "Your salary is only part of the story. The After-Tax Income Calculator estimates what is left of your pay once income tax and deductions are taken out, helping you plan a budget around real take-home money.",
    steps: ["Enter your annual or hourly gross pay.", "Select your location or state for the relevant tax rules.", "See your estimated net income by year, month and week."],
    tips: ["Check whether benefits or retirement contributions change your net pay.", "Rerun the numbers for different offers.", "Treat the result as an estimate and confirm with official tax guidance."],
    ...generic("After-Tax Income Calculator", "employees comparing net pay", "Job seekers reviewing offers can use it."),
  },
  "salary-calculator": {
    name: "Salary Calculator",
    deepDive: [
      "A salary calculator converts one pay figure into every other period you might need: hourly, daily, weekly, monthly and yearly. This helps when a recruiter quotes one format and your budget works in another.",
      "Enter your pay and working hours to see the equivalents, then compare them against your expenses and savings goals. If you are moving from hourly to salaried work, check that the annual figure covers the benefits and paid leave you may be giving up or gaining. The result is a quick reference you can reuse in every negotiation.",
    ],
    intro: "Convert any pay figure into the period that matters to you. The Salary Calculator turns annual, monthly, weekly, daily or hourly pay into the other formats so you can compare jobs on equal terms.",
    steps: ["Enter your pay and select its period.", "Set your hours per week and weeks per year.", "Read the equivalent hourly, daily, weekly, monthly and annual amounts."],
    tips: ["Use realistic working hours, including unpaid overtime.", "Remember that holidays can change effective hourly pay.", "Compare roles using the same pay period."],
    ...generic("Salary Calculator", "people comparing hourly and salaried roles", "Anyone weighing job offers can use it."),
  },
  "take-home-pay-calculator": {
    name: "Take Home Pay Calculator",
    deepDive: [
      "Take-home pay is the amount that reaches your bank account after tax and deductions, and it is the number that actually pays your rent. Offers are quoted gross, so candidates who skip this step often overestimate what they can afford.",
      "Enter your gross pay, pay frequency and location to estimate net income per period. Compare it against your monthly costs, then decide the minimum gross salary you would accept. Revisit the calculator whenever you consider a new city, because tax rates and living costs can shift your net income more than the salary difference suggests.",
    ],
    intro: "Take-home pay is the amount that lands in your bank account after taxes and deductions. This calculator estimates your net paycheck from your gross pay, pay frequency and state tax so you can plan with confidence.",
    steps: ["Enter your gross pay and how often you are paid.", "Select your state for local tax rates.", "View your estimated net paycheck and total deductions."],
    tips: ["Account for health insurance and retirement contributions.", "Recalculate when your salary or state changes.", "Use the estimate to set a monthly budget."],
    ...generic("Take Home Pay Calculator", "employees planning a monthly budget", "New hires and people changing jobs can use it."),
  },
  "hourly-to-salary-calculator": {
    name: "Hourly to Salary Calculator",
    deepDive: [
      "Moving between hourly and salaried roles is common for contractors, shift workers and people changing careers. The maths looks simple, but hours per week, paid holidays and unpaid time off all change the real annual figure.",
      "Enter your hourly rate and typical weekly hours to see the yearly equivalent, and adjust the weeks worked if you take unpaid leave. When comparing a contract rate with a permanent salary, remember that contractors usually cover their own benefits, so the hourly rate should be meaningfully higher to match the same total value.",
    ],
    intro: "Moving between hourly and salaried work means translating pay correctly. The Hourly to Salary Calculator converts your hourly rate into an annual salary, and back, so you can judge whether an offer matches your expectations.",
    steps: ["Enter your hourly rate.", "Set hours per week and paid weeks per year.", "See the equivalent weekly, monthly and annual salary."],
    tips: ["Include paid time off when you compare to a salaried role.", "Factor in overtime if it is regular.", "Check benefits, because they can outweigh a small pay difference."],
    ...generic("Hourly to Salary Calculator", "contractors and hourly workers", "People moving between hourly and salaried roles can use it."),
  },
};
