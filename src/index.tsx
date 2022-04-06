import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App';
import {store} from './app/store';
// import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

const root = createRoot(document.getElementById('root')!)

root.render(
    <Provider store={store}>
      <App />
    </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();