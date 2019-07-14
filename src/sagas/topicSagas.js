import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import types from '../actions/types';
import {
  getTopicStatusApi,
  getWeakestTopicStatusApi,
  getUserTopics
} from '../graphql/topic';

export function* topicRequestFetch({section_id}) {
  const data = yield call(getTopicStatusApi, section_id);
  try {
    yield put({
      type: types.TOPIC.REQUEST_RESULT,
      data: data
    });
  } catch(e) {
    console.log("error: ", e)
  }
}

export function* userTopicRequestFetch({user_id, category_id}) {
  const data = yield call(getUserTopics, user_id, category_id);
  try {
    yield put({
      type: types.TOPIC.USER_REQUEST_RESULT,
      data: data
    });
  } catch(e) {
    console.log("error: ", e)
  }
}

export function* weakestTopicRequestFetch({section_id}) {
  const data = yield call(getWeakestTopicStatusApi, section_id);
  try {
    yield put({
      type: types.TOPIC.WEAKEST_REQUEST_RESULT,
      data: data
    });
  } catch(e) {
    console.log("error: ", e)
  }
}

export default function* topicSagas() {
  yield takeLatest(types.TOPIC.REQUEST, topicRequestFetch),
  yield takeEvery(types.TOPIC.WEAKEST_REQUEST, weakestTopicRequestFetch),
  yield takeEvery(types.TOPIC.USER_REQUEST, userTopicRequestFetch)
}
