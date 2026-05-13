import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Authcontextprovider } from './context/authcontext.jsx'
import { Todocontextprovider } from './context/todocontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authcontextprovider>
      <Todocontextprovider>
        <App />
      </Todocontextprovider>
    </Authcontextprovider>
  </StrictMode>,
)
