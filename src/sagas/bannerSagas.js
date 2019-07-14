import { call, put, takeLatest } from "redux-saga/effects";
import types from "../actions/types";
import Api from "../util/Api";
import endpoints from "../constants/endpoints.json";
import { Redirect } from 'react-router-dom';
import { API_URL } from '../constants/urls';

export function* updateUserSetting(user) {
  const endpoint = endpoints.PATCH_UPDATE_USER;
  const { result, error } = yield call(Api.patch, {
    url: `/${endpoint.version}${endpoint.url}`,
    data: {
      data: {
        attributes: {
          new_home_page: false
        }
      }
    }
  });
  try {
    if (result) {
      window.open(`${API_URL}/start/#/studyPlan/` ,"_self");
    }
    throw error;
  } catch (error) {

  }
}

export default function* bannerSagas() {
  yield takeLatest(types.USER.UPDATE_SETTING, updateUserSetting);
}
