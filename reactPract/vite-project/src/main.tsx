import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { StateComponent } from './globalState/StateContex'
import {Provider} from 'react-redux'
import store from './store/StoreConfig'
import { HashRouter } from 'react-router-dom'


 createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Provider store={store} >
        <App />
      </Provider>
    </HashRouter>
  </StrictMode>
)
