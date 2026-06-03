import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppContextProvider } from './context/AppContext.jsx'
import { BrowserRouter} from 'react-router-dom'
import {ClerkProvider} from '@clerk/clerk-react'


const pulishableKey=import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if(!pulishableKey){
  throw new Error("Please provide the pulishable key")
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ClerkProvider publishableKey={pulishableKey} afterSignOutUrl='/'>
    <AppContextProvider>
    <App />
    </AppContextProvider>
    </ClerkProvider>
  </BrowserRouter>,
)
