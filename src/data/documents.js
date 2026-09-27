// Каталог офіційних документів. Кожен пункт — це "слот" для файлу.
// Спосіб 1: завантажте файл у public/documents/, додайте поле `filename` з точною назвою.
// Спосіб 2: додайте поле `driveUrl` — пряме посилання на Google Drive (для документів,
// які поки не перенесені локально; кнопка тоді веде на Drive замість завантаження).
// Спосіб 3: додайте поле `pageSlug` — веде на внутрішню сторінку розділу
// (/rozdily/:slug, дані в src/data/sections.js). Використовуйте, коли "документ" —
// це кілька фото чи текст, а не один файл для завантаження.
// Пріоритет: filename > driveUrl > pageSlug. Якщо нема жодного —
// показується позначка "документ буде додано найближчим часом".
// Спосіб 4: кілька файлів в одному слоті — поле `files: [{ label, filename | driveUrl }]`.
export const documentCategories = [
  {
    id: 'public-info',
    title: 'Публічна інформація',
    items: [
      {
        slug: 'terytoriya-obslugovuvannya',
        title: 'Територія обслуговування закладу',
        filename: 'Територія обслуговування закладу.pdf',
      },
      {
        slug: 'statut-licenziya',
        title: 'Статут та ліцензія закладу',
        files: [
          { label: 'Статут', filename: 'Статут.pdf' },
          {
            label: 'Наказ про переоформлення ліцензій',
            filename: 'Наказ про переоформлення ліцензій.pdf',
          },
        ],
      },
      {
        slug: 'materialno-tehnichne',
        title: 'Матеріально-технічне забезпечення',
        filename: 'Матеріально-технічне забезпечення закладу освіти.pdf',
      },
      { slug: 'finansova-zvitnist', title: 'Фінансова звітність' },
      {
        slug: 'zvit-kerivnyka',
        title: 'Звіт керівника закладу',
        filename: 'Звіт директора.pdf',
      },
      {
        slug: 'finansovo-gospodarska',
        title: 'Фінансово-господарська діяльність',
        files: [
          {
            label: 'Стаття 59 Закону України «Про повну загальну середню освіту»',
            filename: 'Стаття 59 Закону Про повну загальну середню освіту.pdf',
          },
          { label: 'Кошторис 1', filename: 'Кошторис 1.pdf' },
          { label: 'Кошторис 2', filename: 'Кошторис 2.1.pdf' },
        ],
      },
    ],
  },
  {
    id: 'edu-process',
    title: 'Освітній процес',
    items: [
      { slug: 'rezhym-roboty', title: 'Режим роботи закладу', pageSlug: 'rezhym-roboty' },
      {
        slug: 'osvitnya-programa',
        title: 'Освітня програма',
        driveUrl: 'https://docs.google.com/folderview?id=1-weCiCT0lKlNsYiBefNpre2kdaSpMYa4',
      },
      {
        slug: 'richnyi-plan',
        title: 'Річний план роботи закладу',
        driveUrl: 'https://drive.google.com/file/d/1o2YQT5H9DbeFfLmeW4HIzeEvqHx0cWnN/view',
      },
      { slug: 'struktura-navch-roku', title: 'Структура навчального року' },
      {
        slug: 'shtatnyi-rozpys',
        title: 'Штатний розпис',
        driveUrl: 'https://drive.google.com/file/d/1i5ej40TEWeCjI-rhJZZiBwTGy3gpLSTq/view',
      },
      { slug: 'licenzovanyi-obsyag', title: 'Ліцензований обсяг' },
      {
        slug: 'mova-osvitnogo-procesu',
        title: 'Мова освітнього процесу',
        pageSlug: 'mova-osvitnogo-procesu',
      },
      { slug: 'struktura-upravlinnya', title: 'Структура управління закладу' },
      {
        slug: 'monitoryng-yakosti',
        title: 'Моніторинг якості освіти',
        pageSlug: 'monitoryng-yakosti',
      },
      {
        slug: 'atestaciya-uchyteliv',
        title: 'Атестація учителів',
        pageSlug: 'atestaciya-uchyteliv',
      },
      {
        slug: 'akademichna-dobrochesnist',
        title: 'Положення про академічну доброчесність',
        filename: 'Положення про академічну доброчесність.pdf',
      },
      { slug: 'strategiya-rozvytku', title: 'Стратегія розвитку закладу' },
    ],
  },
  {
    id: 'students',
    title: 'Учням',
    items: [
      {
        slug: 'rozklad-urokiv-1-4',
        title: 'Розклад уроків 1-4 класи',
        filename: 'rozklad_1-4_klasy.pdf',
      },
      {
        slug: 'rozklad-urokiv-5-9',
        title: 'Розклад уроків 5-9 класи',
        filename: 'rozklad_5-9_klasy.pdf',
      },
      {
        slug: 'pravyla-povedinky',
        title: 'Правила поведінки здобувачів освіти',
        filename: 'правила поведінки.pdf',
      },
      {
        slug: 'kryterii-ocinyuvannya',
        title: 'Система та загальні критерії оцінювання (наказ МОН № 722 від 04.05.2026)',
        filename: 'Критерії оцінювання (наказ МОН 722).pdf',
      },
      {
        slug: 'obovyazky-zdobuvachiv',
        title: 'Обов’язки здобувачів освіти',
        pageSlug: 'obovyazky-zdobuvachiv',
      },
    ],
  },
  {
    id: 'parents',
    title: 'Батькам',
    items: [
      {
        slug: 'pravyla-pryyomu',
        title: 'Правила прийому до школи',
        filename: 'Правила прийому до закладу освіти.pdf',
      },
      {
        slug: 'organizaciya-harchuvannya',
        title: 'Організація харчування',
        pageSlug: 'organizaciya-harchuvannya',
      },
    ],
  },
  {
    id: 'safety',
    title: 'Безпека в школі',
    items: [
      {
        slug: 'plan-zahodiv-buling',
        title: 'Стоп булінг — план заходів',
        driveUrl: 'https://drive.google.com/file/d/1nioTSo_1grHGulwmxo3DrMZXjAXPwEuu/view',
      },
      {
        slug: 'poryadok-zayav-buling',
        title: 'Порядок реагування на випадки булінгу',
        files: [
          {
            label: 'Порядок реагування на випадки булінгу (документ закладу)',
            driveUrl: 'https://drive.google.com/file/d/1GGYVysXscLKF09nJGyLGQ-vUoP9G_Gc0/view',
          },
          {
            label: 'Наказ МОН № 961 від 18.06.2026 — нова редакція Порядку реагування на випадки булінгу',
            filename: 'Порядок реагування на випадки булінгу (наказ МОН 961).pdf',
          },
          {
            label:
              'План заходів щодо запобігання та протидії булінгу (цькування) на 2026-2027 навчальний рік',
            filename: 'Булінг.pdf',
          },
        ],
      },
      { slug: 'covid-19', title: 'Covid-19 — рекомендації', pageSlug: 'covid-19' },
    ],
  },
  {
    id: 'library',
    title: 'Бібліотека',
    items: [{ slug: 'vybir-pidruchnykiv', title: 'Вибір підручників' }],
  },
  {
    id: 'individual',
    title: 'Інклюзивне навчання',
    items: [
      {
        slug: 'dostupnist-osoblyvi-potreby',
        title: 'Умови доступності закладу для дітей з особливими освітніми потребами',
        pageSlug: 'dostupnist-osoblyvi-potreby',
      },
    ],
  },
]

export const allDocumentSlots = documentCategories.flatMap((cat) =>
  cat.items.map((item) => ({ ...item, category: cat.title, categoryId: cat.id })),
)
