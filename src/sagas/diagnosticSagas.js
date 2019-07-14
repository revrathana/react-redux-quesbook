import { call, put, takeLatest } from 'redux-saga/effects';
import fileSaver from 'file-saver';
import types from '../actions/types';
import Api from "../util/Api";
import { API_URL } from '../constants/urls';
import {
  getDiagnosticStatusApi,
  getDiagnosticApi
} from '../graphql/diagnostic';

export function* diagnosticsRequestFetch(action) {
  const data = yield call(getDiagnosticStatusApi);
  try {
    yield put({
      type: types.DIAGNOSTIC.REQUEST_RESULT,
      data: data
    });
  } catch(e) {
    console.log("error: ", e)
  }
}

export function* diagnosticSingleRequestFetch({section}) {
  const data = yield call(getDiagnosticApi, section);
  try {
    yield put({
      type: types.DIAGNOSTIC.SINGLE_REQUEST_RESULT,
      data: data
    });
  } catch(e) {
    console.log("error: ", e)
  }
}

function* exportData(action) {
  console.log("exporting.....")
  const { result, error } = yield call(Api.download, {
    'url': '/v1/pdf/diagnostic_report',
    data: {
      data: {
        attributes: { current_test: action.payload }
      }
    },
  });

  try {
    if(result) {
      yield call(fileSaver.saveAs, new Blob([result.data], {type: 'application/pdf', disposition: 'inline'}), 'export.pdf');
    } else {
      console.log("error saving PDF")
    }
  } catch(error) {
    console.log(error);
  }
}

export default function* diagnosticSagas() {
  yield takeLatest(types.DIAGNOSTIC.REQUEST, diagnosticsRequestFetch),
  yield takeLatest(types.DIAGNOSTIC.SINGLE_REQUEST, diagnosticSingleRequestFetch),
  yield takeLatest(types.DIAGNOSTIC.CREATE_PDF, exportData)
}
