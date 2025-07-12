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
        
        {/* Ruta 404 - página no encontrada (opcional) */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
              <p className="text-gray-600 mb-8">Página no encontrada</p>
              <a 
                href="/" 
                className="bg-greenlock-500 text-white px-6 py-3 rounded-md hover:bg-greenlock-600 transition-colors"
              >
                Volver al inicio
              </a>
            </div>
          </div>
        } />
      </Route>
    </Routes>
  )
}

export default App