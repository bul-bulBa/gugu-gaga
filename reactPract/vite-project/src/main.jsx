import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { StateComponent } from './globalState/StateContex.jsx'
import {Provider} from 'react-redux'
import store from './store/StoreConfig.js'
import { HashRouter } from 'react-router-dom'


 createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Provider store={store} >
        <App />
      </Provider>
    </HashRouter>
  </StrictMode>
)
