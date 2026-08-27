import Breadcrumbs from '../components/Breadcrumbs'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import DocumentList from '../components/DocumentList'
import { allDocumentSlots } from '../data/documents'
import { faq } from '../data/faq'
import '../styles/faq.css'

function slots(...ids) {
  return allDocumentSlots.filter((d) => ids.includes(d.slug))
}

export default function Parents() {
  return (
    <>
      <PageHero
        eyebrow="Батькам"
        title="Інформація для батьків"
        lead="Зарахування, харчування, безпека дітей та відповіді на найчастіші запитання."
      />
      <Breadcrumbs items={[{ label: 'Батькам' }]} />

      <Section id="zarahuvannya" title="Правила прийому до школи">
        <DocumentList items={slots('pravyla-pryyomu')} />
      </Section>

      <Section id="harchuvannya" title="Організація харчування" alt>
        <p>У закладі організоване гаряче харчування для всіх здобувачів освіти.</p>
        <DocumentList items={slots('organizaciya-harchuvannya')} />
      </Section>

      <Section id="zno-dpa" title="ЗНО / ДПА">
        <p>
          Інформація про організацію зовнішнього незалежного оцінювання (ЗНО/НМТ) та державної
          підсумкової атестації (ДПА) публікується Українським центром оцінювання якості освіти. Для
          підготовки та реєстрації скористайтесь{' '}
          <a href="https://testportal.gov.ua/" target="_blank" rel="noreferrer">
            офіційним тестовим порталом
          </a>
          . Актуальні терміни й оголошення для випускників гімназії публікуються в розділі «Новини».
        </p>
      </Section>

      <Section id="bezpeka" title="Безпека в школі" alt>
        <h3>Стоп булінг</h3>
        <DocumentList items={slots('plan-zahodiv-buling', 'poryadok-zayav-buling')} />
        <h3 style={{ marginTop: '28px' }}>Covid-19</h3>
        <DocumentList items={slots('covid-19')} />
      </Section>

      <Section id="faq" title="Часті запитання">
        <div className="faq-list">
          {faq.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  )
}
