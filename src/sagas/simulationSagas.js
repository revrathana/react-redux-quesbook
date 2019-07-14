import { call, put, takeLatest } from 'redux-saga/effects';
import types from '../actions/types';
import {
  getSimulationStatusApi
} from '../graphql/simulation';

export function* simulationRequestFetch(action) {
  const data = yield call(getSimulationStatusApi);
  try {
    yield put({
      type: types.SIMULATION.REQUEST_RESULT,
      data: data
    });
  } catch(e) {
    console.log("error: ", e)
  }
}

export default function* simulationSagas() {
  yield takeLatest(types.SIMULATION.REQUEST, simulationRequestFetch)
}
