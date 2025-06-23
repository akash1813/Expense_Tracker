import { StrictMode } from './node_modules/react'
import { createRoot } from './node_modules/react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
