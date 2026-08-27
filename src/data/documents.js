// Каталог офіційних документів. Кожен пункт — це "слот" для файлу,
// який адміністратор завантажує через адмін-панель (Документи).
// Поки файл не завантажено, на сайті показується позначка "документ буде додано найближчим часом".
export const documentCategories = [
  {
    id: 'public-info',
    title: 'Публічна інформація',
    items: [
      { slug: 'terytoriya-obslugovuvannya', title: 'Територія обслуговування закладу' },
      { slug: 'statut-licenziya', title: 'Статут та ліцензія закладу' },
      { slug: 'materialno-tehnichne', title: 'Матеріально-технічне забезпечення' },
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
      { slug: 'osvitnya-programa', title: 'Освітня програма' },
      { slug: 'richnyi-plan', title: 'Річний план роботи закладу' },
      { slug: 'struktura-navch-roku', title: 'Структура навчального року' },
      { slug: 'shtatnyi-rozpys', title: 'Штатний розпис' },
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
      { slug: 'rozklad-urokiv', title: 'Розклад уроків' },
      { slug: 'pravyla-povedinky', title: 'Правила поведінки здобувачів освіти' },
      { slug: 'kryterii-ocinyuvannya', title: 'Критерії оцінювання' },
      { slug: 'obovyazky-zdobuvachiv', title: 'Обов’язки здобувачів освіти' },
    ],
  },
  {
    id: 'parents',
    title: 'Батькам',
    items: [
      { slug: 'pravyla-pryyomu', title: 'Правила прийому до школи' },
      { slug: 'organizaciya-harchuvannya', title: 'Організація харчування' },
    ],
  },
  {
    id: 'safety',
    title: 'Безпека в школі',
    items: [
      { slug: 'plan-zahodiv-buling', title: 'Стоп булінг — план заходів' },
      { slug: 'poryadok-zayav-buling', title: 'Порядок подання заяв про випадки булінгу' },
      { slug: 'covid-19', title: 'Covid-19 — рекомендації' },
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
      },
    ],
  },
]

export const allDocumentSlots = documentCategories.flatMap((cat) =>
  cat.items.map((item) => ({ ...item, category: cat.title, categoryId: cat.id })),
)
