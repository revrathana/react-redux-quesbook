import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import userReducer from './userReducer';
import bannerReducer from './bannerReducer';
import diagnosticReducer from './diagnosticReducer';
import topicReducer from './topicReducer';
import skillReducer from './skillReducer';
import studyArticleReducer from './studyArticleReducer';
import simulationReducer from './simulationReducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  userReducer,
  bannerReducer,
  studyArticleReducer,
  skillReducer,
  topicReducer,
  diagnosticReducer,
  simulationReducer
})
