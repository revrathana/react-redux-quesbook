import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router'
import reducers from '../reducers';
import rootSaga from '../sagas';
const history = createHashHistory({});
history.listen((location, action) => {
  if (action === 'PUSH') {
    window.scrollTo(0,0);
  }
});
const sagaMiddleware = createSagaMiddleware();
const reduxRouterMiddleware = routerMiddleware(history);
const enhancers = composeWithDevTools(
  applyMiddleware(sagaMiddleware),
  applyMiddleware(reduxRouterMiddleware)
);
const store = createStore(
  reducers(history),
  enhancers
);

sagaMiddleware.run(rootSaga);

export default store;
export { history };
