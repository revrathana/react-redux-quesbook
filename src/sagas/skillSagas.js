import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import types from '../actions/types';
import {
  getSkillStatusApi,
  getWeakestSkillStatusApi
} from '../graphql/skill';

export function* skillRequestFetch({skill_id}) {
  const data = yield call(getSkillStatusApi, skill_id);
  try {
    yield put({
      type: types.SKILL.REQUEST_RESULT,
      data: data
    });
  } catch(e) {
    console.log("error: ", e)
  }
}

export function* weakestSkillRequestFetch({section_id}) {
  const data = yield call(getWeakestSkillStatusApi, section_id);
  try {
    yield put({
      type: types.SKILL.WEAKEST_REQUEST_RESULT,
      data: data
    });
  } catch(e) {
    console.log("error: ", e)
  }
}

export default function* skillSagas() {
  yield takeLatest(types.SKILL.REQUEST, skillRequestFetch),
  yield takeEvery(types.SKILL.WEAKEST_REQUEST, weakestSkillRequestFetch)
}
