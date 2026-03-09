export interface KnowledgeChunk {
  id: string;
  category: string;
  content: string;
}

export const knowledgeChunks: KnowledgeChunk[] = [
  // ─── STUDIO ───────────────────────────────────────────────────────────────
  {
    id: "studio-about",
    category: "studio",
    content: `FormaInk is a graphic design studio based in Trenčín, Slovakia. Founded and run by Anastasia Kolesnik. The studio specializes in brand identity, print design, restaurant visual packages, and social media management. We work with small and medium businesses, restaurants, and entrepreneurs across Slovakia, Czech Republic, and internationally. Languages: Slovak, English, German, Czech, Russian, Ukrainian.`,
  },
  {
    id: "studio-contacts",
    category: "studio",
    content: `Contact FormaInk: Email: trencinreklama@gmail.com | WhatsApp: +421 951 813 809 | Telegram: @formaink | Instagram: @forma_ink | Website: formaink.com | Location: Trenčín, Slovakia. Response time: within 24 hours on business days.`,
  },
  {
    id: "studio-process",
    category: "process",
    content: `How we work at FormaInk: 1) Brief — client fills contact form or messages us directly. 2) Consultation — free 30-minute call to understand the project. 3) Proposal — we send a detailed offer with timeline and price. 4) Prepayment — 50% upfront before work begins. 5) Design — first concepts in 3-5 business days. 6) Revisions — 2 rounds included in base price. 7) Final delivery — source files + print-ready files. 8) Balance payment — remaining 50% on delivery.`,
  },
  {
    id: "studio-timeline",
    category: "process",
    content: `Typical project timelines at FormaInk: Logo design: 5-7 business days. Brand identity package: 10-14 business days. Business cards design: 2-3 business days. Restaurant menu design: 5-7 business days. Full restaurant package: 14-21 business days. SMM monthly package: starts within 3 business days. Brandbook: 14-21 business days. Rush delivery available for +30% surcharge.`,
  },

  // ─── BRAND IDENTITY ───────────────────────────────────────────────────────
  {
    id: "service-logo",
    category: "design",
    content: `Logo design service at FormaInk. Basic logo: €50–€150, includes 1 concept, 2 revisions, PNG/SVG files. Logo + brand guide: €150–€400, includes logo + color palette + typography + usage rules. Logo + mini identity: €400–€800, includes logo + business card + letterhead + social media kit. All logos delivered in vector format (AI, EPS, SVG) and PNG/JPG.`,
  },
  {
    id: "service-brand-identity",
    category: "design",
    content: `Brand identity packages at FormaInk. Visual Basic: €1,500–€3,500, includes logo + color system + typography + stationery (cards, letterhead, envelope) + brand guidelines PDF. Visual Pro: €2,000–€4,000, adds social media templates + presentation template + 3 print items. Brand Identity Premium: €4,000–€7,000, full brand system including photography style guide + website mockup + full brand manual. Brandbook standalone: €450–€1,000.`,
  },

  // ─── PRINT ────────────────────────────────────────────────────────────────
  {
    id: "service-print-cards",
    category: "print",
    content: `Business card design and print at FormaInk. Design only: €30–€50. Design + print 100 pcs (double-sided): €50–€75. Design + print 250 pcs: €70–€100. Premium/pearl finish 100 pcs: €80–€130. All cards print-ready in CMYK, 3.5×2 inch or EU standard 85×55mm. Print partners: Expresta, Blumi, vizitkylacno.sk. Typical delivery: 2-3 business days design + 3-5 business days print.`,
  },
  {
    id: "service-print-other",
    category: "print",
    content: `Print design services at FormaInk. Poster A3/A4 design: €50–€80. Flyer design: €30–€60. Banner/citylight design: €50–€80. Sticker design: €30–€50. Calendar design (12 months): €150–€250. T-shirt/apparel print design: €40–€80. Label design (bottle, jar, packaging): €60–€120. All files delivered print-ready in CMYK at 300 DPI.`,
  },
  {
    id: "service-outdoor",
    category: "print",
    content: `Outdoor advertising design at FormaInk. Billboard design: €80–€150. Car wrap design: €120–€250. Shop sign/facade design: €80–€200. Citylight/backlit banner: €60–€120. Roll-up banner: €50–€80. Portfolio includes: S-MAK billboard (Trenčín), Taystra outdoor advertising, Taxi Trenčín car wrap and stickers.`,
  },

  // ─── RESTAURANT ───────────────────────────────────────────────────────────
  {
    id: "service-restaurant",
    category: "restaurant",
    content: `Restaurant design packages at FormaInk. Menu design (up to 6 pages): €150–€280. Seasonal menu update: €40–€80. Drinks menu (up to 4 pages): €50–€130. Restaurant business cards: €50–€80. Full restaurant package: €350–€550 — includes menu + business cards + social media kit + loyalty card. Annual support package: €600–€900/year — includes 4 seasonal menu updates + monthly social posts + print coordination. Portfolio includes: Adriano Restaurant (Trenčín + Vienna), Star Food.`,
  },
  {
    id: "service-restaurant-faq",
    category: "restaurant",
    content: `Restaurant FAQ at FormaInk. Q: Can you handle printing too? A: Yes, we coordinate with trusted print partners in Slovakia — client pays only for design, we manage print delivery. Q: Do you do photography? A: We can recommend local photographers and integrate their photos into the design. Q: Can you update the menu seasonally? A: Yes, seasonal update service starts at €40. Q: Do you work with chains? A: Yes, we worked with Adriano which has locations in Trenčín and Vienna.`,
  },

  // ─── SMM ──────────────────────────────────────────────────────────────────
  {
    id: "service-smm",
    category: "smm",
    content: `Social media management (SMM) at FormaInk. Basic package: €150–€200/month — 12 posts, feed design, captions in 1 language. Standard package: €250–€350/month — 20 posts + 4 reels/stories, 2 languages, hashtag strategy. Restaurant Instagram package: €400–€600/month — daily stories, seasonal campaigns, menu photography coordination, engagement management. All packages include: content calendar, branded templates, monthly analytics report.`,
  },

  // ─── PORTFOLIO ────────────────────────────────────────────────────────────
  {
    id: "portfolio-adriano",
    category: "portfolio",
    content: `Adriano Restaurant — portfolio case at FormaInk. Project: full visual identity for Italian restaurant with locations in Trenčín (Slovakia) and Vienna (Austria). Deliverables: logo redesign, menu design (Slovak + German versions), business cards, seasonal menu updates, Instagram templates. Result: consistent brand across 2 countries, 2 languages. One of our signature restaurant cases.`,
  },
  {
    id: "portfolio-ub-market",
    category: "portfolio",
    content: `UB Market / Star Food — portfolio case at FormaInk. Project: brand identity for food market. Deliverables: logo, packaging labels, promotional materials, business cards. Demonstrates expertise in food & retail branding.`,
  },
  {
    id: "portfolio-outdoor",
    category: "portfolio",
    content: `Outdoor advertising portfolio at FormaInk. S-MAK: billboard design for local business in Trenčín. Taystra: outdoor advertising campaign. Taxi Trenčín: full car wrap design + door stickers + business cards. Shows capability for large-format print and vehicle branding.`,
  },
  {
    id: "portfolio-diagectu",
    category: "portfolio",
    content: `Diagectu — portfolio case at FormaInk. Project: premium business card design. Style: black marble texture with gold foil accents. Demonstrates capability for luxury print design and premium brand materials.`,
  },

  // ─── FAQ ──────────────────────────────────────────────────────────────────
  {
    id: "faq-general",
    category: "faq",
    content: `Frequently asked questions about FormaInk. Q: Where are you located? A: Trenčín, Slovakia. We work with clients across Slovakia, Czech Republic, and internationally via online collaboration. Q: Do you work remotely? A: Yes, most projects are done fully online — brief via form, communication via WhatsApp/Telegram/email. Q: What files do you deliver? A: All source files (AI, PSD, Figma) + web-ready (PNG, JPG, SVG) + print-ready (PDF, CMYK). Q: Do you offer revisions? A: Yes, 2 rounds of revisions are included in every project. Additional revisions: €30/round.`,
  },
  {
    id: "faq-pricing",
    category: "faq",
    content: `FAQ about pricing at FormaInk. Q: What is your minimum project size? A: €30 for simple designs like stickers or social media graphics. Q: Do you require a deposit? A: Yes, 50% prepayment before work begins, 50% on delivery. Q: Do you offer discounts? A: Yes, for package deals (e.g., logo + business cards + menu together). Q: Can I get a custom quote? A: Always — contact us and we'll prepare a detailed offer within 24 hours. Q: What payment methods? A: Bank transfer (SEPA), online payment via Stripe (card, Apple Pay, Google Pay).`,
  },
  {
    id: "faq-languages",
    category: "faq",
    content: `FormaInk works in 6 languages: Slovak, English, German, Czech, Russian, Ukrainian. Design materials can be produced in any language. Menu and print materials in multiple languages available (e.g., Adriano menu in SK + DE). All communication possible in your preferred language.`,
  },
];
