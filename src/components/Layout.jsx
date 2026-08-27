import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToHash from './ScrollToHash'

export default function Layout() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Перейти до основного контенту
      </a>
      <ScrollToHash />
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
