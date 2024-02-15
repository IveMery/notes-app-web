import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { SearchFormProvider } from './contexts/SearchFormContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <SearchFormProvider>
      <App />
      </SearchFormProvider>
    </ThemeProvider>
  </React.StrictMode>
)
