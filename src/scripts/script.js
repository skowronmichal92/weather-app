// import libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './other/polyfills';

// import modules
import App from './containers/App/App';

import auth from './store/reducers/auth';
import weather from './store/reducers/weather';

const rootReducer = combineReducers({
  weather,
  auth
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <Route component={App}/>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('app'));
