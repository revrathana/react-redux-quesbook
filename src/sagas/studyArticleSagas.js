import { call, put, takeLatest } from 'redux-saga/effects';
import types from '../actions/types';
import {
  getStudyArticleStatusApi
} from '../graphql/study_article';

export function* studyArticleRequestFetch({study_article_id}) {
  const data = yield call(getStudyArticleStatusApi, study_article_id);
  try {
    yield put({
      type: types.STUDY_ARTICLE.REQUEST_RESULT,
      data: data
    });
  } catch(e) {
    console.log("error: ", e)
  }
}

export default function* studyArticleSagas() {
  yield takeLatest(types.STUDY_ARTICLE.REQUEST, studyArticleRequestFetch)
}
