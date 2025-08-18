import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { StateComponent } from './globalState/StateContex.jsx'
import {Provider} from 'react-redux'
import store from './store/StoreConfig.js'
import { BrowserRouter } from 'react-router-dom'


 createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store} >
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
)