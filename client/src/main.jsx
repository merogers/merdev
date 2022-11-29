import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { store } from './app/store';
import './styles/global.scss';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
