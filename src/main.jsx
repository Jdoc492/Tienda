import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Activa las animaciones de entrada solo si el navegador puede hacerlas
// y la persona no pidió reducir el movimiento.
const sinMovimiento = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !sinMovimiento) {
  document.documentElement.classList.add('anima');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
