# GreenLock - Sitio Web Modular de Ciberseguridad

## 🚀 Descripción del Proyecto

Una página web profesional y modular para GreenLock, empresa especializada en auditorías de ciberseguridad. El proyecto está diseñado con **páginas independientes** accesibles desde el navbar principal, permitiendo navegación directa a cada sección sin scroll.

## 🎨 Características Principales

- **Arquitectura de Páginas Independientes**: Cada sección es una página completa y autónoma
- **Navegación SPA**: React Router para transiciones suaves entre páginas
- **Diseño Modular**: Componentes reutilizables y fácil mantenimiento
- **Animaciones Avanzadas**: Efectos visuales atractivos usando Framer Motion
- **Responsive**: Optimizado para todos los dispositivos
- **Performance**: Componentes optimizados y lazy loading
- **Accesibilidad**: Cumple con estándares de accesibilidad web

## 📁 Estructura del Proyecto

```
src/
├── App.tsx                     # Router principal con rutas
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Navegación principal (actualizada)
│   │   ├── Footer.tsx          # Pie de página
│   │   └── Layout.tsx          # Layout principal
│   ├── sections/
│   │   └── HeroSection.tsx     # Solo para la página de inicio
│   └── ui/
│       ├── Button.tsx          # Componente de botón (actualizado)
│       ├── Section.tsx         # Wrapper de sección
│       ├── SectionTitle.tsx    # Títulos de sección
│       └── HackerEffect.tsx    # Efecto de texto hacker
├── pages/
│   ├── HomePage.tsx            # Página de inicio (solo Hero)
│   ├── ServicesPage.tsx        # Página de servicios
│   ├── MethodologyPage.tsx     # Página de metodología
│   ├── WhyChooseUsPage.tsx     # Página "por qué elegirnos"
│   ├── ImpactPage.tsx          # Página de impacto
│   └── ContactPage.tsx         # Página de contacto
└── assets/
    └── Logo-Web.png           # Logo de la empresa
```

## 🛠️ Dependencias Principales

```json
{
  "react": "^18.0.0",
  "react-router-dom": "^6.0.0",
  "framer-motion": "^10.0.0",
  "react-intersection-observer": "^9.0.0",
  "react-hook-form": "^7.0.0",
  "zod": "^3.0.0",
  "@hookform/resolvers": "^3.0.0",
  "lucide-react": "^0.263.1",
  "tailwindcss": "^3.0.0"
}
```

## 🎯 Páginas Implementadas

### 1. HomePage (`/`)
- **Propósito**: Página de bienvenida con Hero Section
- **Características**:
  - Fondo animado con red de nodos
  - Terminal de código en tiempo real
  - Typewriter effect rotativo
  - CTAs hacia otras páginas

### 2. ServicesPage (`/servicios`)
- **Propósito**: Detalle completo de servicios de ciberseguridad
- **Características**:
  - Tabs interactivos con auto-rotación
  - Descripción detallada de cada servicio
  - Advertencias de riesgo por no actuar
  - Fondo animado con partículas

### 3. MethodologyPage (`/metodologia`)
- **Propósito**: Explicación del proceso de trabajo
- **Características**:
  - Timeline interactivo con 4 fases
  - Progreso visual automático
  - Detalles de cada fase con actividades
  - Estadísticas de proceso

### 4. WhyChooseUsPage (`/porque-elegirnos`)
- **Propósito**: Ventajas competitivas y diferenciadores
- **Características**:
  - Grid de 8 razones principales
  - Hover effects con glow y animaciones
  - Estadísticas impactantes de empresa
  - Fondo con hexágonos animados

### 5. ImpactPage (`/impacto`)
- **Propósito**: Consecuencias de no actuar
- **Características**:
  - 3 tipos de impacto (financiero, reputacional, operativo)
  - Contadores animados con datos reales
  - Comparación de costos visualizada
  - Ondas de impacto animadas en el fondo

### 6. ContactPage (`/contacto`)
- **Propósito**: Generación de leads y conversiones
- **Características**:
  - Formulario completo con validaciones
  - Información de contacto detallada
  - Línea de emergencias 24/7
  - Animaciones de partículas flotantes

## 🧭 Navegación

La navegación se realiza a través del **Header principal**:

```tsx
const navItems = [
  { name: 'Servicios', href: '/servicios' },
  { name: 'Metodología', href: '/metodologia' },
  { name: 'Por qué elegirnos', href: '/porque-elegirnos' },
  { name: 'Impacto', href: '/impacto' }
];
```

El botón "Contacto" está siempre visible en el header con estilos destacados.

## 🚀 Instalación y Uso

1. **Instalar dependencias**:
```bash
npm install
```

2. **Configurar Tailwind CSS** (si no está configurado):
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. **Añadir configuración de colores personalizados** en `tailwind.config.js`:
```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        greenlock: {
          300: '#25cc59',
          400: '#1fa84d',
          500: '#17993f',
          600: '#138a37',
          700: '#0f7530',
        }
      }
    }
  }
}
```

4. **Ejecutar en desarrollo**:
```bash
npm run dev
```

## 🎨 Personalización

### Añadir Nueva Página
1. Crear componente en `src/pages/NuevaPagina.tsx`
2. Añadir ruta en `App.tsx`:
```tsx
<Route path="/nueva-pagina" element={<NuevaPagina />} />
```
3. Actualizar navegación en `Header.tsx`:
```tsx
{ name: 'Nueva Página', href: '/nueva-pagina' }
```

### Modificar Rutas
Las rutas se configuran en `App.tsx`:
```tsx
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<HomePage />} />
    <Route path="/servicios" element={<ServicesPage />} />
    // ... más rutas
  </Route>
</Routes>
```

### Actualizar Navegación
El componente `Header.tsx` maneja:
- **Detección de ruta activa**: `useLocation()` de React Router
- **Estados hover y activo**: Estilos diferentes según la página actual
- **Menú móvil**: Responsive con animaciones

## 📱 Responsive Design

Breakpoints utilizados:
- `sm`: 640px+
- `md`: 768px+
- `lg`: 1024px+
- `xl`: 1280px+

Cada página se adapta completamente a dispositivos móviles con:
- Layouts de grid responsive
- Menú móvil colapsible
- Imágenes y elementos escalables

## ⚡ Optimizaciones

### Performance
- **Code splitting automático**: React Router divide el código por páginas
- **Intersection Observer**: Para animaciones eficientes
- **Componentes optimizados**: Sin re-renders innecesarios

### SEO
- **Títulos únicos por página**: Cada página puede tener su meta título
- **URLs semánticas**: `/servicios`, `/contacto`, etc.
- **Estructura HTML semántica**: Headers, sections, nav apropiados

## 🔧 Mantenimiento

### Añadir Nuevo Servicio
1. Modificar array `services` en `ServicesPage.tsx`
2. Añadir opción en formulario de `ContactPage.tsx`

### Actualizar Información de Contacto
Modificar constantes en `ContactPage.tsx`:
- Información de la empresa
- Números de teléfono
- Direcciones de email

### Cambiar Estadísticas
Actualizar arrays en cada página:
- `ImpactPage.tsx` - Costos y estadísticas de brechas
- `WhyChooseUsPage.tsx` - Números de empresa
- `MethodologyPage.tsx` - Tiempos de proceso

## 🎯 Ventajas de esta Arquitectura

### ✅ Ventajas
- **SEO mejorado**: URLs específicas para cada sección
- **Navegación intuitiva**: Los usuarios pueden acceder directamente a cualquier página
- **Carga más rápida**: Code splitting automático
- **Facilidad de mantenimiento**: Cada página es independiente
- **Escalabilidad**: Fácil añadir nuevas páginas

### ⚠️ Consideraciones
- **Más archivos**: Mayor número de componentes de página
- **Duplicación menor**: Algunos elementos como headers se repiten
- **Navegación**: Los usuarios deben usar el menú para moverse entre secciones

## 🔮 Próximas Mejoras

1. **Blog/Recursos**: Página con artículos de ciberseguridad
2. **Portfolio**: Casos de estudio detallados
3. **Equipo**: Página del equipo y certificaciones
4. **FAQ**: Preguntas frecuentes
5. **Recursos**: Descargas, whitepapers, guías

## 📞 Soporte

Para cualquier duda sobre la implementación:
- Revisar estructura de rutas en `App.tsx`
- Verificar navegación en `Header.tsx`
- Comprobar componentes UI en `src/components/ui/`

---

**Nota**: Esta arquitectura de páginas independientes es ideal para sitios web corporativos donde cada sección tiene suficiente contenido para justificar una página completa, mejorando la navegación y el SEO.