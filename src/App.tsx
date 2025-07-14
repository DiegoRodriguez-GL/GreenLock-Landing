// src/App.tsx - CONFIGURACIÓN COMPLETA DE RUTAS
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.tsx'

// Importar todas las páginas
import HomePage from './pages/HomePage.tsx'
import ServicesPage from './pages/ServicesPage.tsx'
import MethodologyPage from './pages/MethodologyPage.tsx'
import WhyChooseUsPage from './pages/WhyChooseUsPage.tsx'
import ImpactPage from './pages/ImpactPage.tsx'
import ContactPage from './pages/ContactPage.tsx'
import Page404 from './pages/Page404.tsx' // Importar la nueva página 404

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Página de inicio - Solo Hero Section */}
        <Route index element={<HomePage />} />
        
        {/* Páginas principales accesibles desde el navbar */}
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/metodologia" element={<MethodologyPage />} />
        <Route path="/porque-elegirnos" element={<WhyChooseUsPage />} />
        <Route path="/impacto" element={<ImpactPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        
        {/* Ruta 404 - página no encontrada mejorada */}
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  )
}

export default App