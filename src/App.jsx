import { lazy, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Loader from './components/Loader'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Students = lazy(() => import('./pages/Students'))
const Parents = lazy(() => import('./pages/Parents'))
const Documents = lazy(() => import('./pages/Documents'))
const Library = lazy(() => import('./pages/Library'))
const LearningForms = lazy(() => import('./pages/LearningForms'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Links = lazy(() => import('./pages/Links'))
const Contact = lazy(() => import('./pages/Contact'))
const News = lazy(() => import('./pages/News'))
const NewsDetail = lazy(() => import('./pages/NewsDetail'))
const Search = lazy(() => import('./pages/Search'))
const Sections = lazy(() => import('./pages/Sections'))
const CustomSection = lazy(() => import('./pages/CustomSection'))
const NotFound = lazy(() => import('./pages/NotFound'))

function Fallback() {
  return (
    <div className="container" style={{ padding: '80px 20px' }}>
      <Loader />
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/pro-gimnaziyu" element={<About />} />
            <Route path="/novyny" element={<News />} />
            <Route path="/novyny/:id" element={<NewsDetail />} />
            <Route path="/uchnyam" element={<Students />} />
            <Route path="/batkam" element={<Parents />} />
            <Route path="/dokumenty" element={<Documents />} />
            <Route path="/biblioteka" element={<Library />} />
            <Route path="/formy-navchannya" element={<LearningForms />} />
            <Route path="/fotogalereya" element={<Gallery />} />
            <Route path="/korysni-posylannya" element={<Links />} />
            <Route path="/kontakty" element={<Contact />} />
            <Route path="/poshuk" element={<Search />} />
            <Route path="/rozdily" element={<Sections />} />
            <Route path="/rozdily/:slug" element={<CustomSection />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  )
}
