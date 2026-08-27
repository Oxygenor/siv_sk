import Breadcrumbs from '../components/Breadcrumbs'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import DocumentList from '../components/DocumentList'
import { allDocumentSlots } from '../data/documents'

export default function Library() {
  const items = allDocumentSlots.filter((d) => d.categoryId === 'library')
  return (
    <>
      <PageHero eyebrow="Бібліотека" title="Бібліотека гімназії" lead="Інформація про вибір підручників та бібліотечні ресурси." />
      <Breadcrumbs items={[{ label: 'Бібліотека' }]} />
      <Section id="vybir-pidruchnykiv" title="Вибір підручників">
        <p className="muted">
          Перелік підручників, рекомендованих Міністерством освіти і науки України, та порядок їх
          отримання — у документі нижче.
        </p>
        <DocumentList items={items} />
      </Section>
    </>
  )
}
