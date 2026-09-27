import Breadcrumbs from '../components/Breadcrumbs'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import DocumentList from '../components/DocumentList'
import { allDocumentSlots } from '../data/documents'

export default function LearningForms() {
  const accessibility = allDocumentSlots.filter((d) => d.slug === 'dostupnist-osoblyvi-potreby')
  return (
    <>
      <PageHero
        eyebrow="Форми навчання"
        title="Інклюзивне, сімейне та дистанційне навчання"
        lead="Альтернативні форми здобуття освіти для учнів гімназії."
      />
      <Breadcrumbs items={[{ label: 'Форми навчання' }]} />

      <Section id="indyvidualne" title="Інклюзивне навчання">
        <p>
          Гімназія забезпечує умови доступності закладу для дітей з особливими освітніми потребами та
          організовує інклюзивне навчання відповідно до чинного законодавства.
        </p>
        <DocumentList items={accessibility} />
      </Section>

      <Section id="simeyne" title="Сімейне навчання" alt>
        <p>
          Батьки можуть обрати сімейну (домашню) форму здобуття освіти для своєї дитини. Для оформлення
          зверніться до адміністрації гімназії — контакти вказані на сторінці «Контакти».
        </p>
      </Section>

      <Section id="dystanciyna-osvita" title="Дистанційна освіта">
        <p>
          Дистанційна освіта організовується за допомогою сервісів <strong>Google Classroom</strong> та{' '}
          <strong>Google Meet</strong>. Детальніше про порядок дистанційного навчання — у розділі
          «Учням».
        </p>
      </Section>
    </>
  )
}
