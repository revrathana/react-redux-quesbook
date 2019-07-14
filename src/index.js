import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './stores';
import ConnectedApp from './components/App/ConnectedApp';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('app-root')
);
