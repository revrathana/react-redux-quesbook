import { all, spawn } from 'redux-saga/effects';
import userSagas from './userSagas';
import diagnosticSagas from './diagnosticSagas';
import topicSagas from './topicSagas';
import skillSagas from './skillSagas';
import studyArticleSagas from './studyArticleSagas';
import bannerSagas from './bannerSagas';
import simulationSagas from './simulationSagas';

export default function* rootSaga () {
  yield all([
    spawn(userSagas),
    spawn(skillSagas),
    spawn(topicSagas),
    spawn(studyArticleSagas),
    spawn(bannerSagas),
    spawn(diagnosticSagas),
    spawn(simulationSagas)
  ]);
}
