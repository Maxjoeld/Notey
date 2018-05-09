import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import Cookies from 'js-cookie';
import { createCookieMiddleware } from 'redux-cookie';
import ReactDOM from 'react-dom';
import App from './App';
import rootReducer from './reducers';
// import { CookiesProvider } from 'react-cookie';

require('./sass/main.css');

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, createCookieMiddleware(Cookies))),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
