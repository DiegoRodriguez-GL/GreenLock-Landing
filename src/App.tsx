
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import MethodologyPage from './pages/MethodologyPage'
import WhyChooseUsPage from './pages/WhyChooseUsPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'
import Page404 from './pages/Page404'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {}
        <Route index element={<HomePage />} />
        
        {}
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/metodologia" element={<MethodologyPage />} />
        <Route path="/porque-elegirnos" element={<WhyChooseUsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        
        {}
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  )
}

export default App