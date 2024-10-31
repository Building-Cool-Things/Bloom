import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import ReactQueryProvider from './providers/ReactQueryProvider.tsx'
import { UserProvider } from './providers/UserProvider.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <BrowserRouter>
      <ReactQueryProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ReactQueryProvider>
    </BrowserRouter>

  </StrictMode>,
)
