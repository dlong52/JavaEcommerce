import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>,
      <ReactQueryDevtools initialIsOpen={false} />
    </Router>
  </QueryClientProvider>
  // </React.StrictMode>,  
)
