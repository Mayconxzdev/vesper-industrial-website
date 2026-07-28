import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.css'
import './i18n'
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { QuoteProvider } from './contexts/QuoteContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <QuoteProvider>
        <App />
      </QuoteProvider>
      <Toaster 
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            fontFamily: 'Inter, system-ui, sans-serif',
          },
        }}
      />
    </ThemeProvider>
  </StrictMode>,
)
