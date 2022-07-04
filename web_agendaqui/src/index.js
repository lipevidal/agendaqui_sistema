import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './variaveis.css'
import './animation.css';
import 'normalize.css';
import Root from './Components/Root';
import { Provider } from 'react-redux'
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>
);


