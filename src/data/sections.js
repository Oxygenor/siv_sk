// Довільні розділи сайту (доступні за адресою /rozdily/:slug). `filename` —
// опційний прикріплений файл з public/sections/, `photos` — опційний масив
// назв зображень з public/sections/ (показуються сіткою на сторінці розділу).
//
// Приклад:
// {
//   slug: 'moya-storinka',
//   title: 'Моя сторінка',
//   body: 'Текст розділу...',
//   filename: '',
//   photos: ['photo1.jpg', 'photo2.jpg'],
// },
export const sections = [
  {
    slug: 'dostupnist-osoblyvi-potreby',
    title: 'Умови доступності закладу для дітей з особливими потребами',
    body: '',
    photos: ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  },
]
