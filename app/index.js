import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.global.css';

import { persistStore } from 'redux-persist';
import localForage from 'localForage';
localForage.config({
    driver      : localForage.INDEXEDDB,
    name        : 'Molecule',
    storeName   : 'app_db',
    description : 'Contains configured listing of project repositories'
});

export const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);
persistStore(store, {storage: localForage});

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
