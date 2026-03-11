// src/data/serviceFaqs.ts
// FAQ content for service pages — derived from knowledge.ts
// Used for: visible FAQ sections + auto FAQPage JSON-LD schema
// Format: question headings end with "?" → blog/[slug]/page.tsx extractFAQs() pattern

export interface FAQ {
  question: string;
  answer: string;
}

export type ServiceKey = "logos" | "design" | "print" | "restaurant" | "smm";
export type Locale = "sk" | "en" | "de" | "cs" | "ru" | "ua";

export const serviceFaqs: Record<ServiceKey, Record<Locale, FAQ[]>> = {
  // ─── LOGOS ────────────────────────────────────────────────────────────────
  logos: {
    sk: [
      {
        question: "Koľko stojí dizajn loga?",
        answer:
          "Dizajn loga stojí od €50 (jednoduchý logotyp) do €800 (logo + kompletná mini-identita). Najpopulárnejší balík Logo + brand guide vychádza na €150–€400 a obsahuje logo, farebnú paletu, typografiu a pravidlá použitia.",
      },
      {
        question: "Čo je zahrnuté v cene?",
        answer:
          "Každý projekt obsahuje 2 kolá opráv. Základný balík: 1 koncept, PNG/SVG súbory. Logo + brand guide: logo + farebná paleta + typografia + PDF s pravidlami. Mini-identita: logo + vizitky + hlavičkový papier + súprava pre sociálne siete.",
      },
      {
        question: "Ako dlho trvá vytvorenie loga?",
        answer:
          "Štandardný čas realizácie je 5–7 pracovných dní. Expresná realizácia je dostupná s príplatkom 30 %. Prvé koncepty dostanete do 3–5 pracovných dní od zaplatenia zálohy.",
      },
      {
        question: "Aké súbory dostanem po dokončení?",
        answer:
          "Všetky logá sú dodané vo vektorovom formáte (AI, EPS, SVG) aj rastrových formátoch (PNG, JPG). Pre balíky Brand guide a vyššie dodávame aj zdrojové súbory (Adobe Illustrator).",
      },
      {
        question: "Koľko revízií je zahrnutých?",
        answer:
          "V každom projekte sú zahrnuté 2 kolá revízií. Ďalšie revízie sú dostupné za príplatok €30 za kolo.",
      },
    ],
    en: [
      {
        question: "How much does logo design cost?",
        answer:
          "Logo design starts at €50 (simple logotype) and goes up to €800 (logo + full mini identity). The most popular package — Logo + brand guide — costs €150–€400 and includes logo, color palette, typography, and usage rules.",
      },
      {
        question: "What is included in the price?",
        answer:
          "Every project includes 2 revision rounds. Basic package: 1 concept, PNG/SVG files. Logo + brand guide: logo + color palette + typography + PDF guidelines. Mini identity: logo + business card + letterhead + social media kit.",
      },
      {
        question: "How long does logo design take?",
        answer:
          "Standard delivery is 5–7 business days. Rush delivery is available with a 30% surcharge. First concepts are delivered within 3–5 business days after prepayment.",
      },
      {
        question: "What files will I receive?",
        answer:
          "All logos are delivered in vector format (AI, EPS, SVG) and raster formats (PNG, JPG). Brand guide and higher packages also include source files (Adobe Illustrator).",
      },
      {
        question: "How many revisions are included?",
        answer:
          "Every project includes 2 rounds of revisions. Additional revisions are available at €30 per round.",
      },
    ],
    de: [
      {
        question: "Was kostet ein Logo-Design?",
        answer:
          "Logo-Design beginnt bei €50 (einfacher Logotyp) und reicht bis €800 (Logo + vollständige Mini-Identität). Das beliebteste Paket — Logo + Brand Guide — kostet €150–€400 und enthält Logo, Farbpalette, Typografie und Nutzungsregeln.",
      },
      {
        question: "Was ist im Preis enthalten?",
        answer:
          "Jedes Projekt beinhaltet 2 Korrekturschleifen. Basispaket: 1 Konzept, PNG/SVG-Dateien. Logo + Brand Guide: Logo + Farbpalette + Typografie + PDF-Richtlinien. Mini-Identität: Logo + Visitenkarte + Briefkopf + Social-Media-Kit.",
      },
      {
        question: "Wie lange dauert die Logo-Erstellung?",
        answer:
          "Die Standardlieferzeit beträgt 5–7 Werktage. Expresslieferung ist mit einem Aufpreis von 30 % verfügbar. Erste Konzepte werden innerhalb von 3–5 Werktagen nach Anzahlung geliefert.",
      },
      {
        question: "Welche Dateien erhalte ich?",
        answer:
          "Alle Logos werden im Vektorformat (AI, EPS, SVG) und als Rasterdateien (PNG, JPG) geliefert. Brand-Guide-Pakete und höher beinhalten auch Quelldateien (Adobe Illustrator).",
      },
      {
        question: "Wie viele Korrekturen sind inbegriffen?",
        answer:
          "Jedes Projekt beinhaltet 2 Korrekturschleifen. Zusätzliche Korrekturen sind für €30 pro Schleife erhältlich.",
      },
    ],
    cs: [
      {
        question: "Kolik stojí návrh loga?",
        answer:
          "Návrh loga začíná na €50 (jednoduchý logotyp) a dosahuje až €800 (logo + kompletní mini-identita). Nejoblíbenější balíček — Logo + brand guide — vychází na €150–€400 a zahrnuje logo, barevnou paletu, typografii a pravidla použití.",
      },
      {
        question: "Co je zahrnuto v ceně?",
        answer:
          "Každý projekt zahrnuje 2 kola úprav. Základní balíček: 1 koncept, soubory PNG/SVG. Logo + brand guide: logo + barevná paleta + typografie + PDF s pravidly. Mini-identita: logo + vizitka + hlavičkový papír + sada pro sociální sítě.",
      },
      {
        question: "Jak dlouho trvá tvorba loga?",
        answer:
          "Standardní doba dodání je 5–7 pracovních dní. Expresní dodání je k dispozici s příplatkem 30 %. První koncepty jsou dodány do 3–5 pracovních dní po zaplacení zálohy.",
      },
      {
        question: "Jaké soubory obdržím?",
        answer:
          "Všechna loga jsou dodána ve vektorovém formátu (AI, EPS, SVG) i rastrových formátech (PNG, JPG). Balíčky Brand guide a vyšší zahrnují také zdrojové soubory (Adobe Illustrator).",
      },
      {
        question: "Kolik revizí je zahrnuto?",
        answer:
          "Každý projekt zahrnuje 2 kola revizí. Další revize jsou k dispozici za příplatek €30 za kolo.",
      },
    ],
    ru: [
      {
        question: "Сколько стоит разработка логотипа?",
        answer:
          "Дизайн логотипа стоит от €50 (простой логотип) до €800 (логотип + полная мини-айдентика). Самый популярный пакет — Логотип + бренд-гайд — стоит €150–€400 и включает логотип, цветовую палитру, типографику и правила использования.",
      },
      {
        question: "Что включено в стоимость?",
        answer:
          "Каждый проект включает 2 раунда правок. Базовый пакет: 1 концепт, файлы PNG/SVG. Логотип + бренд-гайд: логотип + цветовая палитра + типографика + PDF с правилами. Мини-айдентика: логотип + визитка + бланк + набор для соцсетей.",
      },
      {
        question: "Сколько времени занимает создание логотипа?",
        answer:
          "Стандартный срок — 5–7 рабочих дней. Срочное выполнение доступно с доплатой 30%. Первые концепты предоставляются в течение 3–5 рабочих дней после оплаты аванса.",
      },
      {
        question: "Какие файлы я получу?",
        answer:
          "Все логотипы поставляются в векторном формате (AI, EPS, SVG) и растровых форматах (PNG, JPG). Пакеты с бренд-гайдом и выше включают также исходные файлы (Adobe Illustrator).",
      },
      {
        question: "Сколько правок включено?",
        answer:
          "Каждый проект включает 2 раунда правок. Дополнительные правки доступны за €30 за раунд.",
      },
    ],
    ua: [
      {
        question: "Скільки коштує розробка логотипу?",
        answer:
          "Дизайн логотипу коштує від €50 (простий логотип) до €800 (логотип + повна міні-айдентика). Найпопулярніший пакет — Логотип + бренд-гайд — коштує €150–€400 і включає логотип, колірну палітру, типографіку та правила використання.",
      },
      {
        question: "Що включено у вартість?",
        answer:
          "Кожен проект включає 2 раунди правок. Базовий пакет: 1 концепт, файли PNG/SVG. Логотип + бренд-гайд: логотип + колірна палітра + типографіка + PDF з правилами. Міні-айдентика: логотип + візитка + бланк + набір для соцмереж.",
      },
      {
        question: "Скільки часу займає створення логотипу?",
        answer:
          "Стандартний термін — 5–7 робочих днів. Термінове виконання доступне з доплатою 30%. Перші концепти надаються протягом 3–5 робочих днів після оплати авансу.",
      },
      {
        question: "Які файли я отримаю?",
        answer:
          "Всі логотипи поставляються у векторному форматі (AI, EPS, SVG) та растрових форматах (PNG, JPG). Пакети з бренд-гайдом і вище включають також вихідні файли (Adobe Illustrator).",
      },
      {
        question: "Скільки правок включено?",
        answer:
          "Кожен проект включає 2 раунди правок. Додаткові правки доступні за €30 за раунд.",
      },
    ],
  },

  // ─── BRAND IDENTITY / DESIGN ──────────────────────────────────────────────
  design: {
    sk: [
      {
        question: "Čo je súčasťou vizuálnej identity?",
        answer:
          "Vizuálna identita zahŕňa logo, farebnú sústavu (CMYK/RGB/HEX), typografiu, pravidlá použitia a brandbook. Balík Visual Basic (€1 500–€3 500) obsahuje aj papiernické predmety — vizitky, hlavičkový papier, obálku.",
      },
      {
        question: "Aký je rozdiel medzi logom a vizuálnou identitou?",
        answer:
          "Logo je symbol alebo písmo. Vizuálna identita je kompletný systém — logo + farby + fonty + pravidlá + šablóny. Konzistentná identita zvyšuje rozpoznateľnosť značky o 80 % (Nielsen Norman Group).",
      },
      {
        question: "Koľko stojí kompletná vizuálna identita?",
        answer:
          "Visual Basic: €1 500–€3 500. Visual Pro: €2 000–€4 000 (+ šablóny pre sociálne siete a 3 tlačové predmety). Brand Identity Premium: €4 000–€7 000 (+ fotografia, mockup webu, kompletná príručka). Brandbook samostatne: €450–€1 000.",
      },
      {
        question: "Ako dlho trvá tvorba vizuálnej identity?",
        answer:
          "Brand identity balík: 10–14 pracovných dní. Brandbook: 14–21 pracovných dní. Expresná realizácia je dostupná s príplatkom 30 %.",
      },
      {
        question: "Navrhli ste identity pre reštaurácie?",
        answer:
          "Áno — kompletný branding sme vytvorili pre Adriano Restaurant s pobočkami v Trenčíne a Viedni. Dodávky zahŕňali logo, menu (SK + DE verzia), vizitky a šablóny pre Instagram.",
      },
    ],
    en: [
      {
        question: "What is included in a brand identity package?",
        answer:
          "Brand identity includes logo, color system (CMYK/RGB/HEX), typography, usage rules, and a brand guide. The Visual Basic package (€1,500–€3,500) also includes stationery — business cards, letterhead, and envelope.",
      },
      {
        question: "What is the difference between a logo and brand identity?",
        answer:
          "A logo is a symbol or wordmark. Brand identity is the complete system — logo + colors + fonts + rules + templates. Consistent identity increases brand recognition by 80% (Nielsen Norman Group research).",
      },
      {
        question: "How much does a complete brand identity cost?",
        answer:
          "Visual Basic: €1,500–€3,500. Visual Pro: €2,000–€4,000 (adds social media templates + 3 print items). Brand Identity Premium: €4,000–€7,000 (adds photography style guide + website mockup + full brand manual). Brandbook standalone: €450–€1,000.",
      },
      {
        question: "How long does brand identity creation take?",
        answer:
          "Brand identity package: 10–14 business days. Brandbook: 14–21 business days. Rush delivery is available with a 30% surcharge.",
      },
      {
        question: "Have you designed identities for restaurants?",
        answer:
          "Yes — we created the complete branding for Adriano Restaurant with locations in Trenčín (Slovakia) and Vienna (Austria). Deliverables included logo redesign, menu (SK + DE versions), business cards, and Instagram templates.",
      },
    ],
    de: [
      {
        question: "Was ist in einem Markenidentitätspaket enthalten?",
        answer:
          "Markenidentität umfasst Logo, Farbsystem (CMYK/RGB/HEX), Typografie, Nutzungsregeln und einen Markenleitfaden. Das Visual-Basic-Paket (€1.500–€3.500) beinhaltet auch Geschäftsausstattung — Visitenkarten, Briefkopf und Umschlag.",
      },
      {
        question:
          "Was ist der Unterschied zwischen Logo und Corporate Identity?",
        answer:
          "Ein Logo ist ein Symbol oder Schriftzug. Eine Corporate Identity ist das vollständige System — Logo + Farben + Schriften + Regeln + Vorlagen. Eine konsistente Identität steigert die Markenbekanntheit um 80 % (Nielsen Norman Group).",
      },
      {
        question: "Was kostet eine vollständige Corporate Identity?",
        answer:
          "Visual Basic: €1.500–€3.500. Visual Pro: €2.000–€4.000 (+ Social-Media-Vorlagen + 3 Drucksachen). Brand Identity Premium: €4.000–€7.000 (+ Fotografie-Stilguide + Website-Mockup + vollständiges Markenhandbuch). Markenbuch einzeln: €450–€1.000.",
      },
      {
        question: "Wie lange dauert die Erstellung einer Corporate Identity?",
        answer:
          "Corporate-Identity-Paket: 10–14 Werktage. Markenbuch: 14–21 Werktage. Expresslieferung mit 30 % Aufpreis verfügbar.",
      },
      {
        question: "Haben Sie Identitäten für Restaurants gestaltet?",
        answer:
          "Ja — wir haben das komplette Branding für das Adriano Restaurant mit Standorten in Trenčín (Slowakei) und Wien (Österreich) erstellt. Leistungen: Logo-Redesign, Speisekarte (SK + DE), Visitenkarten und Instagram-Vorlagen.",
      },
    ],
    cs: [
      {
        question: "Co je součástí balíčku vizuální identity?",
        answer:
          "Vizuální identita zahrnuje logo, barevný systém (CMYK/RGB/HEX), typografii, pravidla použití a brand guide. Balíček Visual Basic (€1 500–€3 500) zahrnuje také kancelářské potřeby — vizitky, hlavičkový papír a obálku.",
      },
      {
        question: "Jaký je rozdíl mezi logem a vizuální identitou?",
        answer:
          "Logo je symbol nebo písmo. Vizuální identita je kompletní systém — logo + barvy + písma + pravidla + šablony. Konzistentní identita zvyšuje rozpoznatelnost značky o 80 % (Nielsen Norman Group).",
      },
      {
        question: "Kolik stojí kompletní vizuální identita?",
        answer:
          "Visual Basic: €1 500–€3 500. Visual Pro: €2 000–€4 000 (+ šablony pro sociální sítě + 3 tiskové předměty). Brand Identity Premium: €4 000–€7 000 (+ fotografický průvodce stylem + mockup webu + kompletní příručka značky). Brandbook samostatně: €450–€1 000.",
      },
      {
        question: "Jak dlouho trvá tvorba vizuální identity?",
        answer:
          "Balíček brand identity: 10–14 pracovních dní. Brandbook: 14–21 pracovních dní. Expresní realizace dostupná s příplatkem 30 %.",
      },
      {
        question: "Navrhli jste identity pro restaurace?",
        answer:
          "Ano — vytvořili jsme kompletní branding pro restauraci Adriano s pobočkami v Trenčíně (Slovensko) a Vídni (Rakousko). Dodávky zahrnovaly redesign loga, jídelní lístek (SK + DE verze), vizitky a šablony pro Instagram.",
      },
    ],
    ru: [
      {
        question: "Что входит в пакет фирменного стиля?",
        answer:
          "Фирменный стиль включает логотип, цветовую систему (CMYK/RGB/HEX), типографику, правила использования и бренд-гайд. Пакет Visual Basic (€1 500–€3 500) также включает деловую документацию — визитки, бланк, конверт.",
      },
      {
        question: "В чём разница между логотипом и фирменным стилем?",
        answer:
          "Логотип — это символ или шрифтовое начертание. Фирменный стиль — это полная система: логотип + цвета + шрифты + правила + шаблоны. Последовательный стиль повышает узнаваемость бренда на 80% (Nielsen Norman Group).",
      },
      {
        question: "Сколько стоит полный фирменный стиль?",
        answer:
          "Visual Basic: €1 500–€3 500. Visual Pro: €2 000–€4 000 (+ шаблоны для соцсетей + 3 печатных предмета). Brand Identity Premium: €4 000–€7 000 (+ гайд по фотографии + мокап сайта + полное руководство по бренду). Брендбук отдельно: €450–€1 000.",
      },
      {
        question: "Сколько времени занимает создание фирменного стиля?",
        answer:
          "Пакет фирменного стиля: 10–14 рабочих дней. Брендбук: 14–21 рабочий день. Срочное выполнение доступно с доплатой 30%.",
      },
      {
        question: "Вы разрабатывали айдентику для ресторанов?",
        answer:
          "Да — мы создали полный брендинг для ресторана Adriano с филиалами в Тренчине (Словакия) и Вене (Австрия). В рамках проекта: редизайн логотипа, меню (SK + DE версии), визитки и шаблоны для Instagram.",
      },
    ],
    ua: [
      {
        question: "Що входить до пакету фірмового стилю?",
        answer:
          "Фірмовий стиль включає логотип, колірну систему (CMYK/RGB/HEX), типографіку, правила використання та бренд-гайд. Пакет Visual Basic (€1 500–€3 500) також включає ділову документацію — візитки, бланк, конверт.",
      },
      {
        question: "У чому різниця між логотипом і фірмовим стилем?",
        answer:
          "Логотип — це символ або шрифтове написання. Фірмовий стиль — це повна система: логотип + кольори + шрифти + правила + шаблони. Послідовний стиль підвищує впізнаваність бренду на 80% (Nielsen Norman Group).",
      },
      {
        question: "Скільки коштує повний фірмовий стиль?",
        answer:
          "Visual Basic: €1 500–€3 500. Visual Pro: €2 000–€4 000 (+ шаблони для соцмереж + 3 друкованих предмети). Brand Identity Premium: €4 000–€7 000 (+ гайд з фотографії + макет сайту + повний посібник бренду). Брендбук окремо: €450–€1 000.",
      },
      {
        question: "Скільки часу займає створення фірмового стилю?",
        answer:
          "Пакет фірмового стилю: 10–14 робочих днів. Брендбук: 14–21 робочий день. Термінове виконання доступне з доплатою 30%.",
      },
      {
        question: "Ви розробляли айдентику для ресторанів?",
        answer:
          "Так — ми створили повний брендинг для ресторану Adriano з філіями в Тренчині (Словаччина) та Відні (Австрія). У рамках проекту: редизайн логотипу, меню (SK + DE версії), візитки та шаблони для Instagram.",
      },
    ],
  },

  // ─── PRINT ────────────────────────────────────────────────────────────────
  print: {
    sk: [
      {
        question: "Koľko stojí dizajn a tlač vizitiek?",
        answer:
          "Len dizajn vizitiek: €30–€50. Dizajn + tlač 100 ks (obojstranné): €50–€75. Dizajn + tlač 250 ks: €70–€100. Prémiové/perleťové vizitky 100 ks: €80–€130. Štandard EU: 85×55 mm.",
      },
      {
        question: "Aké tlačové materiály navrhujete?",
        answer:
          "Plagáty A3/A4 (€50–€80), letáky (€30–€60), bannery/citylighty (€50–€80), nálepky (€30–€50), kalendáre 12 mesiacov (€150–€250), tričká a oblečenie (€40–€80), etikety (€60–€120). Všetky súbory v CMYK, 300 DPI.",
      },
      {
        question: "Zabezpečujete aj samotnú tlač?",
        answer:
          "Áno, spolupracujeme s overenými tlačiarňami — Expresta, Blumi, vizitkylacno.sk. Klient platí len za dizajn, tlač koordinujeme my. Typický čas: 2–3 pracovné dni na dizajn + 3–5 pracovných dní na tlač.",
      },
      {
        question: "V akom formáte dostanem finálne súbory?",
        answer:
          "Všetky tlačové materiály sú dodané print-ready v CMYK pri 300 DPI vo formáte PDF. Webové verzie (RGB, PNG, JPG) sú dostupné na požiadanie.",
      },
      {
        question: "Navrhujete aj vonkajšiu reklamu?",
        answer:
          "Áno — billboardy (€80–€150), polepy áut (€120–€250), fasádne tabule (€80–€200), citylighty (€60–€120), roll-up bannery (€50–€80). Naše portfólio zahŕňa billboard S-MAK, Taystra a polep auta Taxi Trenčín.",
      },
    ],
    en: [
      {
        question: "How much does business card design and print cost?",
        answer:
          "Design only: €30–€50. Design + print 100 pcs (double-sided): €50–€75. Design + print 250 pcs: €70–€100. Premium/pearl finish 100 pcs: €80–€130. EU standard size: 85×55mm.",
      },
      {
        question: "What print materials do you design?",
        answer:
          "Posters A3/A4 (€50–€80), flyers (€30–€60), banners/citylights (€50–€80), stickers (€30–€50), 12-month calendars (€150–€250), t-shirts and apparel (€40–€80), labels (€60–€120). All files in CMYK at 300 DPI.",
      },
      {
        question: "Do you also handle printing?",
        answer:
          "Yes, we coordinate with trusted print partners — Expresta, Blumi, vizitkylacno.sk. The client pays only for design; we manage print delivery. Typical timeline: 2–3 business days for design + 3–5 business days for print.",
      },
      {
        question: "What format will I receive the final files in?",
        answer:
          "All print materials are delivered print-ready in CMYK at 300 DPI as PDF files. Web versions (RGB, PNG, JPG) are available on request.",
      },
      {
        question: "Do you design outdoor advertising?",
        answer:
          "Yes — billboards (€80–€150), car wraps (€120–€250), shop signs/facades (€80–€200), citylights (€60–€120), roll-up banners (€50–€80). Our portfolio includes S-MAK billboard, Taystra outdoor, and Taxi Trenčín car wrap.",
      },
    ],
    de: [
      {
        question: "Was kostet Visitenkarten-Design und Druck?",
        answer:
          "Nur Design: €30–€50. Design + Druck 100 Stück (beidseitig): €50–€75. Design + Druck 250 Stück: €70–€100. Premium/Perlglanz 100 Stück: €80–€130. EU-Standardformat: 85×55 mm.",
      },
      {
        question: "Welche Druckmaterialien gestalten Sie?",
        answer:
          "Poster A3/A4 (€50–€80), Flyer (€30–€60), Banner/Citylights (€50–€80), Aufkleber (€30–€50), 12-Monats-Kalender (€150–€250), T-Shirts und Bekleidung (€40–€80), Etiketten (€60–€120). Alle Dateien in CMYK bei 300 DPI.",
      },
      {
        question: "Übernehmen Sie auch den Druck?",
        answer:
          "Ja, wir arbeiten mit zuverlässigen Druckpartnern zusammen — Expresta, Blumi, vizitkylacno.sk. Der Kunde zahlt nur für das Design; wir koordinieren die Drucklieferung. Typische Vorlaufzeit: 2–3 Werktage für Design + 3–5 Werktage für Druck.",
      },
      {
        question: "In welchem Format erhalte ich die fertigen Dateien?",
        answer:
          "Alle Druckmaterialien werden druckfertig in CMYK bei 300 DPI als PDF-Dateien geliefert. Webversionen (RGB, PNG, JPG) sind auf Anfrage erhältlich.",
      },
      {
        question: "Gestalten Sie auch Außenwerbung?",
        answer:
          "Ja — Werbetafeln (€80–€150), Fahrzeugbeklebung (€120–€250), Ladenschilder/Fassaden (€80–€200), Citylights (€60–€120), Roll-up-Banner (€50–€80). Unser Portfolio umfasst das S-MAK-Billboard, Taystra Außenwerbung und die Taxi-Trenčín-Fahrzeugbeklebung.",
      },
    ],
    cs: [
      {
        question: "Kolik stojí návrh a tisk vizitek?",
        answer:
          "Pouze návrh: €30–€50. Návrh + tisk 100 ks (oboustranné): €50–€75. Návrh + tisk 250 ks: €70–€100. Prémiové/perleťové vizitky 100 ks: €80–€130. EU standard: 85×55 mm.",
      },
      {
        question: "Jaké tiskové materiály navrhujete?",
        answer:
          "Plakáty A3/A4 (€50–€80), letáky (€30–€60), bannery/citylighty (€50–€80), nálepky (€30–€50), kalendáře 12 měsíců (€150–€250), trička a oblečení (€40–€80), etikety (€60–€120). Všechny soubory v CMYK, 300 DPI.",
      },
      {
        question: "Zajišťujete také samotný tisk?",
        answer:
          "Ano, spolupracujeme s osvědčenými tiskárnami — Expresta, Blumi, vizitkylacno.sk. Klient platí pouze za návrh; tisk koordinujeme my. Typická doba: 2–3 pracovní dny na návrh + 3–5 pracovních dní na tisk.",
      },
      {
        question: "V jakém formátu obdržím finální soubory?",
        answer:
          "Všechny tiskové materiály jsou dodány tiskově připravené v CMYK při 300 DPI ve formátu PDF. Webové verze (RGB, PNG, JPG) jsou k dispozici na vyžádání.",
      },
      {
        question: "Navrhujete také venkovní reklamu?",
        answer:
          "Ano — billboardy (€80–€150), polepy aut (€120–€250), fasádní tabule (€80–€200), citylighty (€60–€120), roll-up bannery (€50–€80). Naše portfolio zahrnuje billboard S-MAK, Taystra outdoor a polep auta Taxi Trenčín.",
      },
    ],
    ru: [
      {
        question: "Сколько стоит дизайн и печать визиток?",
        answer:
          "Только дизайн: €30–€50. Дизайн + печать 100 шт (двусторонние): €50–€75. Дизайн + печать 250 шт: €70–€100. Премиум/перламутровые визитки 100 шт: €80–€130. Стандарт ЕС: 85×55 мм.",
      },
      {
        question: "Какие печатные материалы вы разрабатываете?",
        answer:
          "Плакаты A3/A4 (€50–€80), листовки (€30–€60), баннеры/ситилайты (€50–€80), наклейки (€30–€50), календари на 12 месяцев (€150–€250), футболки и одежда (€40–€80), этикетки (€60–€120). Все файлы в CMYK, 300 DPI.",
      },
      {
        question: "Вы также занимаетесь печатью?",
        answer:
          "Да, мы сотрудничаем с проверенными типографиями — Expresta, Blumi, vizitkylacno.sk. Клиент платит только за дизайн; печать координируем мы. Типичные сроки: 2–3 рабочих дня на дизайн + 3–5 рабочих дней на печать.",
      },
      {
        question: "В каком формате я получу финальные файлы?",
        answer:
          "Все печатные материалы поставляются print-ready в CMYK при 300 DPI в формате PDF. Веб-версии (RGB, PNG, JPG) доступны по запросу.",
      },
      {
        question: "Вы разрабатываете наружную рекламу?",
        answer:
          "Да — билборды (€80–€150), автомобильная реклама (€120–€250), вывески/фасады (€80–€200), ситилайты (€60–€120), roll-up баннеры (€50–€80). Наше портфолио включает билборд S-MAK, Taystra outdoor и оклейку Taxi Trenčín.",
      },
    ],
    ua: [
      {
        question: "Скільки коштує дизайн і друк візиток?",
        answer:
          "Тільки дизайн: €30–€50. Дизайн + друк 100 шт (двосторонні): €50–€75. Дизайн + друк 250 шт: €70–€100. Преміум/перламутрові візитки 100 шт: €80–€130. Стандарт ЄС: 85×55 мм.",
      },
      {
        question: "Які друковані матеріали ви розробляєте?",
        answer:
          "Плакати A3/A4 (€50–€80), листівки (€30–€60), банери/ситілайти (€50–€80), наклейки (€30–€50), календарі на 12 місяців (€150–€250), футболки та одяг (€40–€80), етикетки (€60–€120). Всі файли в CMYK, 300 DPI.",
      },
      {
        question: "Ви також займаєтеся друком?",
        answer:
          "Так, ми співпрацюємо з перевіреними друкарнями — Expresta, Blumi, vizitkylacno.sk. Клієнт платить лише за дизайн; друк координуємо ми. Типові терміни: 2–3 робочих дні на дизайн + 3–5 робочих днів на друк.",
      },
      {
        question: "У якому форматі я отримаю фінальні файли?",
        answer:
          "Всі друковані матеріали постачаються print-ready в CMYK при 300 DPI у форматі PDF. Веб-версії (RGB, PNG, JPG) доступні на запит.",
      },
      {
        question: "Ви розробляєте зовнішню рекламу?",
        answer:
          "Так — білборди (€80–€150), автомобільна реклама (€120–€250), вивіски/фасади (€80–€200), ситілайти (€60–€120), roll-up банери (€50–€80). Наше портфоліо включає білборд S-MAK, Taystra outdoor та оклейку Taxi Trenčín.",
      },
    ],
  },

  // ─── RESTAURANT ───────────────────────────────────────────────────────────
  restaurant: {
    sk: [
      {
        question: "Koľko stojí dizajn jedálneho lístka?",
        answer:
          "Dizajn menu (do 6 strán): €150–€280. Sezónna aktualizácia menu: €40–€80. Nápojový lístok (do 4 strán): €50–€130. Kompletný reštauračný balík (menu + vizitky + sociálne siete + vernostná karta): €350–€550.",
      },
      {
        question: "Zabezpečujete aj tlač menu?",
        answer:
          "Áno, koordinujeme tlač cez overených partnerov na Slovensku. Klient platí len za dizajn, o tlač a doručenie sa staráme my.",
      },
      {
        question: "Môžete aktualizovať menu každú sezónu?",
        answer:
          "Áno, sezónna aktualizácia menu začína od €40. Ročný podporný balík (€600–€900/rok) zahŕňa 4 sezónne aktualizácie menu + mesačné príspevky na sociálne siete + koordináciu tlače.",
      },
      {
        question: "Pracujete aj pre reťazce reštaurácií?",
        answer:
          "Áno — vytvorili sme kompletnú vizuálnu identitu pre reštauráciu Adriano s pobočkami v Trenčíne aj vo Viedni. Materiály sme pripravili v slovenčine aj nemčine.",
      },
      {
        question: "Čo všetko obsahuje kompletný reštauračný balík?",
        answer:
          "Kompletný balík (€350–€550) obsahuje: menu, vizitky, súpravu pre sociálne siete a vernostnú kartu. Šetrí 15–20 % v porovnaní s objednávkou každej položky samostatne.",
      },
    ],
    en: [
      {
        question: "How much does restaurant menu design cost?",
        answer:
          "Menu design (up to 6 pages): €150–€280. Seasonal menu update: €40–€80. Drinks menu (up to 4 pages): €50–€130. Full restaurant package (menu + business cards + social media kit + loyalty card): €350–€550.",
      },
      {
        question: "Do you handle menu printing?",
        answer:
          "Yes, we coordinate printing through trusted partners in Slovakia. The client pays only for design; we manage print and delivery.",
      },
      {
        question: "Can you update the menu each season?",
        answer:
          "Yes, seasonal menu updates start at €40. The annual support package (€600–€900/year) includes 4 seasonal menu updates + monthly social media posts + print coordination.",
      },
      {
        question: "Do you work with restaurant chains?",
        answer:
          "Yes — we created the complete visual identity for Adriano Restaurant with locations in Trenčín and Vienna. Materials were prepared in both Slovak and German.",
      },
      {
        question: "What does the full restaurant package include?",
        answer:
          "The full package (€350–€550) includes: menu, business cards, social media kit, and loyalty card. It saves 15–20% compared to ordering each item separately.",
      },
    ],
    de: [
      {
        question: "Was kostet das Design einer Speisekarte?",
        answer:
          "Speisekarten-Design (bis 6 Seiten): €150–€280. Saisonale Speisekarten-Aktualisierung: €40–€80. Getränkekarte (bis 4 Seiten): €50–€130. Vollständiges Restaurantpaket (Speisekarte + Visitenkarten + Social-Media-Kit + Kundenkarte): €350–€550.",
      },
      {
        question: "Übernehmen Sie auch den Druck der Speisekarte?",
        answer:
          "Ja, wir koordinieren den Druck über vertrauenswürdige Partner in der Slowakei. Der Kunde zahlt nur für das Design; wir kümmern uns um Druck und Lieferung.",
      },
      {
        question: "Können Sie die Speisekarte jede Saison aktualisieren?",
        answer:
          "Ja, saisonale Speisekarten-Aktualisierungen beginnen bei €40. Das Jahres-Support-Paket (€600–€900/Jahr) umfasst 4 saisonale Aktualisierungen + monatliche Social-Media-Beiträge + Druckkoordination.",
      },
      {
        question: "Arbeiten Sie mit Restaurantketten zusammen?",
        answer:
          "Ja — wir haben die komplette visuelle Identität für das Adriano Restaurant mit Standorten in Trenčín und Wien erstellt. Materialien wurden auf Slowakisch und Deutsch vorbereitet.",
      },
      {
        question: "Was ist im vollständigen Restaurantpaket enthalten?",
        answer:
          "Das Komplettpaket (€350–€550) umfasst: Speisekarte, Visitenkarten, Social-Media-Kit und Kundenkarte. Es spart 15–20 % im Vergleich zur Einzelbestellung.",
      },
    ],
    cs: [
      {
        question: "Kolik stojí návrh jídelního lístku?",
        answer:
          "Návrh menu (do 6 stran): €150–€280. Sezónní aktualizace menu: €40–€80. Nápojový lístek (do 4 stran): €50–€130. Kompletní restaurační balíček (menu + vizitky + sada pro sociální sítě + věrnostní karta): €350–€550.",
      },
      {
        question: "Zajišťujete také tisk menu?",
        answer:
          "Ano, koordinujeme tisk přes osvědčené partnery na Slovensku. Klient platí pouze za návrh; o tisk a doručení se staráme my.",
      },
      {
        question: "Můžete menu každou sezónu aktualizovat?",
        answer:
          "Ano, sezónní aktualizace menu začínají od €40. Roční podpůrný balíček (€600–€900/rok) zahrnuje 4 sezónní aktualizace menu + měsíční příspěvky na sociálních sítích + koordinaci tisku.",
      },
      {
        question: "Pracujete také pro řetězce restaurací?",
        answer:
          "Ano — vytvořili jsme kompletní vizuální identitu pro restauraci Adriano s pobočkami v Trenčíně a Vídni. Materiály byly připraveny ve slovenštině i němčině.",
      },
      {
        question: "Co vše obsahuje kompletní restaurační balíček?",
        answer:
          "Kompletní balíček (€350–€550) obsahuje: menu, vizitky, sadu pro sociální sítě a věrnostní kartu. Ušetří 15–20 % oproti objednávce každé položky samostatně.",
      },
    ],
    ru: [
      {
        question: "Сколько стоит дизайн меню ресторана?",
        answer:
          "Дизайн меню (до 6 страниц): €150–€280. Сезонное обновление меню: €40–€80. Меню напитков (до 4 страниц): €50–€130. Полный ресторанный пакет (меню + визитки + набор для соцсетей + карта лояльности): €350–€550.",
      },
      {
        question: "Вы занимаетесь печатью меню?",
        answer:
          "Да, мы координируем печать через проверенных партнёров в Словакии. Клиент платит только за дизайн; печатью и доставкой занимаемся мы.",
      },
      {
        question: "Можете обновлять меню каждый сезон?",
        answer:
          "Да, сезонное обновление меню начинается от €40. Годовой пакет поддержки (€600–€900/год) включает 4 сезонных обновления меню + ежемесячные публикации в соцсетях + координацию печати.",
      },
      {
        question: "Вы работаете с сетями ресторанов?",
        answer:
          "Да — мы создали полную визуальную айдентику для ресторана Adriano с филиалами в Тренчине и Вене. Материалы были подготовлены на словацком и немецком языках.",
      },
      {
        question: "Что включает полный ресторанный пакет?",
        answer:
          "Полный пакет (€350–€550) включает: меню, визитки, набор для соцсетей и карту лояльности. Экономия 15–20% по сравнению с заказом каждого элемента отдельно.",
      },
    ],
    ua: [
      {
        question: "Скільки коштує дизайн меню ресторану?",
        answer:
          "Дизайн меню (до 6 сторінок): €150–€280. Сезонне оновлення меню: €40–€80. Меню напоїв (до 4 сторінок): €50–€130. Повний ресторанний пакет (меню + візитки + набір для соцмереж + карта лояльності): €350–€550.",
      },
      {
        question: "Ви займаєтеся друком меню?",
        answer:
          "Так, ми координуємо друк через перевірених партнерів у Словаччині. Клієнт платить лише за дизайн; друком та доставкою займаємося ми.",
      },
      {
        question: "Можете оновлювати меню щосезону?",
        answer:
          "Так, сезонне оновлення меню починається від €40. Річний пакет підтримки (€600–€900/рік) включає 4 сезонних оновлення меню + щомісячні публікації в соцмережах + координацію друку.",
      },
      {
        question: "Ви працюєте з мережами ресторанів?",
        answer:
          "Так — ми створили повну візуальну айдентику для ресторану Adriano з філіями в Тренчині та Відні. Матеріали були підготовлені словацькою та німецькою мовами.",
      },
      {
        question: "Що включає повний ресторанний пакет?",
        answer:
          "Повний пакет (€350–€550) включає: меню, візитки, набір для соцмереж та карту лояльності. Економія 15–20% порівняно із замовленням кожного елемента окремо.",
      },
    ],
  },

  // ─── SMM ──────────────────────────────────────────────────────────────────
  smm: {
    sk: [
      {
        question: "Koľko stojí správa sociálnych sietí?",
        answer:
          "Základný balík: €150–€200/mesiac — 12 príspevkov, dizajn feedu, titulky v 1 jazyku. Štandardný balík: €250–€350/mesiac — 20 príspevkov + 4 reels/stories, 2 jazyky. Reštauračný Instagram balík: €400–€600/mesiac — denné stories, sezónne kampane, koordinácia fotografií.",
      },
      {
        question: "Čo je zahrnuté v každom balíku?",
        answer:
          "Všetky balíky zahŕňajú: kalendár obsahu, brandované šablóny a mesačný analytický report. Vyššie balíky zahŕňajú aj prácu v 2 jazykoch, reels a stories.",
      },
      {
        question: "Robíte aj fotografie pre Instagram?",
        answer:
          "Vieme odporučiť miestnych fotografov a ich fotografie integrovať do dizajnu. Reštauračný balík zahŕňa koordináciu fotografovania menu.",
      },
      {
        question: "V akom jazyku vytvárate obsah?",
        answer:
          "Obsah môžeme vytvárať v slovenčine, češtine, angličtine, nemčine, ruštine a ukrajinskej. Štandardný a vyšší balík zahŕňa 2 jazyky.",
      },
      {
        question: "Ako rýchlo môžeme začať?",
        answer:
          "SMM balík štartuje do 3 pracovných dní od uhradenia zálohy. Prvý obsahový kalendár dostanete na schválenie pred spustením.",
      },
    ],
    en: [
      {
        question: "How much does social media management cost?",
        answer:
          "Basic package: €150–€200/month — 12 posts, feed design, captions in 1 language. Standard package: €250–€350/month — 20 posts + 4 reels/stories, 2 languages. Restaurant Instagram package: €400–€600/month — daily stories, seasonal campaigns, photo coordination.",
      },
      {
        question: "What is included in every package?",
        answer:
          "All packages include: content calendar, branded templates, and monthly analytics report. Higher packages also include work in 2 languages, reels, and stories.",
      },
      {
        question: "Do you do photography for Instagram?",
        answer:
          "We can recommend local photographers and integrate their photos into the design. The restaurant package includes menu photography coordination.",
      },
      {
        question: "In what language do you create content?",
        answer:
          "We can create content in Slovak, Czech, English, German, Russian, and Ukrainian. Standard and higher packages include 2 languages.",
      },
      {
        question: "How quickly can we start?",
        answer:
          "The SMM package starts within 3 business days of prepayment. You will receive the first content calendar for approval before launch.",
      },
    ],
    de: [
      {
        question: "Was kostet Social-Media-Management?",
        answer:
          "Basispaket: €150–€200/Monat — 12 Beiträge, Feed-Design, Bildunterschriften in 1 Sprache. Standardpaket: €250–€350/Monat — 20 Beiträge + 4 Reels/Stories, 2 Sprachen. Restaurant-Instagram-Paket: €400–€600/Monat — tägliche Stories, saisonale Kampagnen, Fotokoordination.",
      },
      {
        question: "Was ist in jedem Paket enthalten?",
        answer:
          "Alle Pakete beinhalten: Inhaltskalender, gebrandete Vorlagen und monatlichen Analysebericht. Höhere Pakete beinhalten auch Arbeit in 2 Sprachen, Reels und Stories.",
      },
      {
        question: "Machen Sie auch Fotos für Instagram?",
        answer:
          "Wir können lokale Fotografen empfehlen und deren Fotos in das Design integrieren. Das Restaurantpaket beinhaltet die Koordination der Speisenkartenfotografie.",
      },
      {
        question: "In welcher Sprache erstellen Sie Inhalte?",
        answer:
          "Wir können Inhalte auf Slowakisch, Tschechisch, Englisch, Deutsch, Russisch und Ukrainisch erstellen. Standard- und höhere Pakete beinhalten 2 Sprachen.",
      },
      {
        question: "Wie schnell können wir beginnen?",
        answer:
          "Das SMM-Paket startet innerhalb von 3 Werktagen nach Anzahlung. Sie erhalten den ersten Inhaltskalender zur Genehmigung vor dem Start.",
      },
    ],
    cs: [
      {
        question: "Kolik stojí správa sociálních sítí?",
        answer:
          "Základní balíček: €150–€200/měsíc — 12 příspěvků, design feedu, popisky v 1 jazyce. Standardní balíček: €250–€350/měsíc — 20 příspěvků + 4 reels/stories, 2 jazyky. Restaurační Instagram balíček: €400–€600/měsíc — denní stories, sezónní kampaně, koordinace fotografií.",
      },
      {
        question: "Co je zahrnuto v každém balíčku?",
        answer:
          "Všechny balíčky zahrnují: kalendář obsahu, brandované šablony a měsíční analytický report. Vyšší balíčky zahrnují také práci ve 2 jazycích, reels a stories.",
      },
      {
        question: "Děláte také fotografie pro Instagram?",
        answer:
          "Dokážeme doporučit místní fotografy a jejich fotografie integrovat do designu. Restaurační balíček zahrnuje koordinaci fotografování menu.",
      },
      {
        question: "V jakém jazyce vytváříte obsah?",
        answer:
          "Obsah můžeme vytvářet ve slovenštině, češtině, angličtině, němčině, ruštině a ukrajinštině. Standardní a vyšší balíček zahrnuje 2 jazyky.",
      },
      {
        question: "Jak rychle můžeme začít?",
        answer:
          "SMM balíček startuje do 3 pracovních dní od zaplacení zálohy. První obsahový kalendář dostanete ke schválení před spuštěním.",
      },
    ],
    ru: [
      {
        question: "Сколько стоит ведение социальных сетей?",
        answer:
          "Базовый пакет: €150–€200/мес — 12 постов, дизайн ленты, подписи на 1 языке. Стандартный пакет: €250–€350/мес — 20 постов + 4 reels/stories, 2 языка. Ресторанный Instagram-пакет: €400–€600/мес — ежедневные stories, сезонные кампании, координация фотосъёмки.",
      },
      {
        question: "Что включено в каждый пакет?",
        answer:
          "Все пакеты включают: контент-план, брендированные шаблоны и ежемесячный аналитический отчёт. Более высокие пакеты также включают работу на 2 языках, reels и stories.",
      },
      {
        question: "Вы делаете фотографии для Instagram?",
        answer:
          "Мы можем порекомендовать местных фотографов и интегрировать их фото в дизайн. Ресторанный пакет включает координацию фотосъёмки меню.",
      },
      {
        question: "На каком языке вы создаёте контент?",
        answer:
          "Мы создаём контент на словацком, чешском, английском, немецком, русском и украинском языках. Стандартный пакет и выше включают 2 языка.",
      },
      {
        question: "Как быстро можно начать?",
        answer:
          "SMM-пакет запускается в течение 3 рабочих дней после предоплаты. Первый контент-план вы получите на согласование до запуска.",
      },
    ],
    ua: [
      {
        question: "Скільки коштує ведення соціальних мереж?",
        answer:
          "Базовий пакет: €150–€200/міс — 12 постів, дизайн стрічки, підписи на 1 мові. Стандартний пакет: €250–€350/міс — 20 постів + 4 reels/stories, 2 мови. Ресторанний Instagram-пакет: €400–€600/міс — щоденні stories, сезонні кампанії, координація фотозйомки.",
      },
      {
        question: "Що включено до кожного пакету?",
        answer:
          "Всі пакети включають: контент-план, брендовані шаблони та щомісячний аналітичний звіт. Вищі пакети також включають роботу на 2 мовах, reels та stories.",
      },
      {
        question: "Ви робите фотографії для Instagram?",
        answer:
          "Ми можемо порекомендувати місцевих фотографів та інтегрувати їхні фото в дизайн. Ресторанний пакет включає координацію фотозйомки меню.",
      },
      {
        question: "Якою мовою ви створюєте контент?",
        answer:
          "Ми створюємо контент словацькою, чеською, англійською, німецькою, російською та українською мовами. Стандартний пакет і вище включають 2 мови.",
      },
      {
        question: "Як швидко можна розпочати?",
        answer:
          "SMM-пакет запускається протягом 3 робочих днів після передоплати. Перший контент-план ви отримаєте на погодження до запуску.",
      },
    ],
  },
};
