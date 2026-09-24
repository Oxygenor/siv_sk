// Каталог офіційних документів. Кожен пункт — це "слот" для файлу.
// Спосіб 1: завантажте файл у public/documents/, додайте поле `filename` з точною назвою.
// Спосіб 2: додайте поле `driveUrl` — пряме посилання на Google Drive (для документів,
// які поки не перенесені локально; кнопка тоді веде на Drive замість завантаження).
// Спосіб 3: додайте поле `pageSlug` — веде на внутрішню сторінку розділу
// (/rozdily/:slug, дані в src/data/sections.js). Використовуйте, коли "документ" —
// це кілька фото чи текст, а не один файл для завантаження.
// Пріоритет: filename > driveUrl > pageSlug. Якщо нема жодного —
// показується позначка "документ буде додано найближчим часом".
export const documentCategories = [
  {
    id: 'public-info',
    title: 'Публічна інформація',
    items: [
      {
        slug: 'terytoriya-obslugovuvannya',
        title: 'Територія обслуговування закладу',
        filename: 'Територія обслуговування закладу.jpg',
      },
      {
        slug: 'statut-licenziya',
        title: 'Статут та ліцензія закладу',
        driveUrl: 'https://docs.google.com/folderview?id=1zFg0QSnW8SRU4r7NutnlgXjZ9j3dHr3Q',
      },
      {
        slug: 'materialno-tehnichne',
        title: 'Матеріально-технічне забезпечення',
        driveUrl: 'https://drive.google.com/file/d/1QaLWuzZUVD6_qcLRoEAupy3AlKp4zTiJ/view',
      },
      { slug: 'finansova-zvitnist', title: 'Фінансова звітність' },
      { slug: 'zvit-kerivnyka', title: 'Звіт керівника закладу' },
      { slug: 'finansovo-gospodarska', title: 'Фінансово-господарська діяльність' },
    ],
  },
  {
    id: 'edu-process',
    title: 'Освітній процес',
    items: [
      { slug: 'rezhym-roboty', title: 'Режим роботи закладу' },
      {
        slug: 'osvitnya-programa',
        title: 'Освітня програма',
        driveUrl: 'https://docs.google.com/folderview?id=1-weCiCT0lKlNsYiBefNpre2kdaSpMYa4',
      },
      { slug: 'richnyi-plan', title: 'Річний план роботи закладу' },
      { slug: 'struktura-navch-roku', title: 'Структура навчального року' },
      {
        slug: 'shtatnyi-rozpys',
        title: 'Штатний розпис',
        driveUrl: 'https://drive.google.com/file/d/1i5ej40TEWeCjI-rhJZZiBwTGy3gpLSTq/view',
      },
      { slug: 'licenzovanyi-obsyag', title: 'Ліцензований обсяг' },
      { slug: 'mova-osvitnogo-procesu', title: 'Мова освітнього процесу' },
      { slug: 'struktura-upravlinnya', title: 'Структура управління закладу' },
      { slug: 'monitoryng-yakosti', title: 'Моніторинг якості освіти' },
      { slug: 'atestaciya-uchyteliv', title: 'Атестація учителів' },
      { slug: 'akademichna-dobrochesnist', title: 'Положення про академічну доброчесність' },
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
        title: 'Критерії оцінювання',
        filename: 'критерії оцінювання.pdf',
      },
      { slug: 'obovyazky-zdobuvachiv', title: 'Обов’язки здобувачів освіти' },
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
      { slug: 'organizaciya-harchuvannya', title: 'Організація харчування' },
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
        title: 'Порядок подання заяв про випадки булінгу',
        driveUrl: 'https://drive.google.com/file/d/1GGYVysXscLKF09nJGyLGQ-vUoP9G_Gc0/view',
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
    title: 'Індивідуальне навчання',
    items: [
      {
        slug: 'dostupnist-osoblyvi-potreby',
        title: 'Умови доступності закладу для дітей з особливими потребами',
        pageSlug: 'dostupnist-osoblyvi-potreby',
      },
    ],
  },
]

export const allDocumentSlots = documentCategories.flatMap((cat) =>
  cat.items.map((item) => ({ ...item, category: cat.title, categoryId: cat.id })),
)
