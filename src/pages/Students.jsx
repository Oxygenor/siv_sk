import Breadcrumbs from '../components/Breadcrumbs'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import DocumentList from '../components/DocumentList'
import BellSchedule from '../components/BellSchedule'
import { allDocumentSlots } from '../data/documents'

function slots(...ids) {
  return allDocumentSlots.filter((d) => ids.includes(d.slug))
}

export default function Students() {
  return (
    <>
      <PageHero
        eyebrow="Учням"
        title="Здобувачам освіти"
        lead="Розклад, правила, критерії оцінювання та підтримка — усе, що потрібно знати учням гімназії."
      />
      <Breadcrumbs items={[{ label: 'Учням' }]} />

      <Section id="rozklad" title="Розклад уроків">
        <h3 id="dzvinky" className="anchor-section">
          Розклад дзвінків
        </h3>
        <BellSchedule />
        <h3>Розклад уроків по класах</h3>
        <p className="muted">
          Актуальний розклад публікується адміністрацією гімназії у вигляді документа нижче.
        </p>
        <DocumentList items={slots('rozklad-urokiv-1-4', 'rozklad-urokiv-5-9')} />
      </Section>

      <Section id="pravyla-povedinky" title="Правила поведінки здобувачів освіти" alt>
        <DocumentList items={slots('pravyla-povedinky')} />
      </Section>

      <Section id="kryterii-ocinyuvannya" title="Критерії оцінювання">
        <p>
          З 2026/2027 навчального року в 1–9 класах діють нові система та загальні критерії
          оцінювання результатів навчання учнів, затверджені наказом МОН України від 04.05.2026
          № 722. У 1–2 класах оцінювання вербальне, у 3–4 класах підсумкові оцінки виставляють за
          рівнями (початковий, середній, достатній, високий), у 5–9 класах поточне й підсумкове
          оцінювання — за 12-бальною шкалою.
        </p>
        <DocumentList items={slots('kryterii-ocinyuvannya')} />
      </Section>

      <Section id="obovyazky" title="Обов’язки здобувачів освіти" alt>
        <ul>
          <li>
            Відповідально та дбайливо ставитися до власного здоров’я, здоров’я оточуючих та довкілля.
          </li>
          <li>
            Дотримуватися установчих документів, правил внутрішнього розпорядку закладу освіти.
          </li>
        </ul>
        <DocumentList items={slots('obovyazky-zdobuvachiv')} />
      </Section>

      <Section id="buling" title="Протидія булінгу">
        <p>
          Гімназія дотримується політики нульової толерантності до булінгу (цькування). Порядок
          реагування на випадки булінгу та план профілактичних заходів наведені нижче.
        </p>
        <DocumentList items={slots('plan-zahodiv-buling', 'poryadok-zayav-buling')} />
      </Section>

      <Section id="psyhologichna-pidtrymka" title="Психологічна підтримка" alt>
        <p>
          У гімназії учні можуть звернутися по психологічну підтримку до педагога-організатора,
          соціального педагога та психолога — Буртника Ярослава Михайловича, а також через свого
          класного керівника.
        </p>
        <p className="muted">
          Загальнонаціональні безкоштовні лінії допомоги: Національна дитяча «гаряча лінія» —{' '}
          <a href="tel:116111">116 111</a>; Урядова гаряча лінія з питань протидії домашньому насильству —{' '}
          <a href="tel:1547">15 47</a>.
        </p>
      </Section>

      <Section id="dystanciyne" title="Дистанційне навчання">
        <p>
          Дистанційне навчання в гімназії проводиться через <strong>Google Meet</strong> (відеозаняття) та{' '}
          <strong>Google Classroom</strong> (завдання й матеріали). Посилання на заняття та інструкції
          надає класний керівник або вчитель-предметник.
        </p>
      </Section>
    </>
  )
}
