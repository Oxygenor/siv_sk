import Breadcrumbs from '../components/Breadcrumbs'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import DocumentList from '../components/DocumentList'
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
        <p className="muted">
          Актуальний розклад публікується адміністрацією гімназії у вигляді документа нижче.
        </p>
        <DocumentList items={slots('rozklad-urokiv')} />
      </Section>

      <Section id="pravyla-povedinky" title="Правила поведінки здобувачів освіти" alt>
        <DocumentList items={slots('pravyla-povedinky')} />
      </Section>

      <Section id="kryterii-ocinyuvannya" title="Критерії оцінювання">
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
          Гімназія дотримується політики нульової толерантності до булінгу (цькування). Порядок подання
          заяв про випадки булінгу та план профілактичних заходів наведені нижче.
        </p>
        <DocumentList items={slots('plan-zahodiv-buling', 'poryadok-zayav-buling')} />
      </Section>

      <Section id="psyhologichna-pidtrymka" title="Психологічна підтримка" alt>
        <p>
          У гімназії учні можуть звернутися по психологічну підтримку до педагога-організатора,
          соціального педагога та психолога — Бортника Ярослава Михайловича, а також через свого
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
