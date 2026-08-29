import Breadcrumbs from '../components/Breadcrumbs'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import { administration, teachers } from '../data/staff'
import { assetUrl } from '../utils/assetUrl'
import '../styles/person-card.css'

function PersonAvatar({ person }) {
  const photoUrl = assetUrl('staff', person.photo)
  if (photoUrl) {
    return <img className="person-card-avatar" src={photoUrl} alt="" />
  }
  return (
    <div className="person-card-avatar person-card-avatar-fallback" aria-hidden="true">
      {person.name.charAt(0)}
    </div>
  )
}

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="Про гімназію"
        title="Про гімназію"
        lead="Адміністрація, педагогічний колектив, досягнення закладу та актуальні вакансії."
      />
      <Breadcrumbs items={[{ label: 'Про гімназію' }]} />

      <Section id="zagalna-informatsiya" title="Про заклад">
        <p>
          Комунальний заклад «Сиваковецька гімназія» — заклад загальної середньої освіти, що забезпечує
          навчання та виховання дітей села Сиваківці. Гімназія створює безпечне освітнє середовище,
          підтримує учнів психологічно та організаційно, а також розвиває дистанційні й індивідуальні
          форми здобуття освіти.
        </p>
        <p className="muted">
          Повну офіційну інформацію про заклад — статут, ліцензію, освітню програму, режим роботи та
          іншу публічну інформацію — дивіться у розділі «Документи».
        </p>
      </Section>

      <Section id="administratsiya" title="Адміністрація" alt>
        <div className="grid grid-2">
          {administration.map((person) => (
            <div className="card person-card" key={person.name}>
              <PersonAvatar person={person} />
              <div>
                <h3>{person.name}</h3>
                <p className="muted">{person.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="pedkolektyv" title="Педагогічний колектив">
        <div className="grid grid-3">
          {teachers.map((person) => (
            <div className="card person-card" key={person.name}>
              <PersonAvatar person={person} />
              <div>
                <h3>{person.name}</h3>
                <p className="muted">{person.subject}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="dosyagnennya" title="Наші досягнення" alt>
        <p>
          Учні та педагоги гімназії щороку беруть участь в олімпіадах, змаганнях і тематичних заходах —
          від «Олімпійського тижня» до Всеукраїнського радіодиктанту національної єдності. Найсвіжіші
          здобутки та фоторепортажі публікуються у розділах «Новини та події» і «Фотогалерея» — це
          дозволяє поповнювати перелік досягнень без затримок, одразу після події.
        </p>
      </Section>

      <Section id="vakansii" title="Вакансії">
        <p>
          Актуальна інформація про відкриті вакансії публікується у розділі «Новини та події». Якщо
          вакансій наразі немає — резюме можна надіслати на електронну пошту гімназії, і ми зв’яжемося з
          вами, щойно з’явиться підходяща позиція.
        </p>
      </Section>
    </>
  )
}
