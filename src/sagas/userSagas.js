import { call, put, takeLatest } from 'redux-saga/effects';
import types from '../actions/types';
import Api from '../util/Api';
import endpoints from '../constants/endpoints.json';
import * as userActions from '../actions/userActions';
import moment from 'moment';
import Cookies from 'js-cookie';
import config from 'config';
import {
  getCurrentUserAPI,
  getCurrentUserTestInfoAPI,
  saveChangeStudent
} from '../graphql/user';

export function* userFetch(action) {
  const result = yield call(getCurrentUserAPI);
  try {
    if (result) {
      return yield put(
        userActions.userRequestSuccess({ user: result.currentUser })
      );
    }
    throw error;
  } catch (e) {
    console.log('error: ', e);
    const destroyUser = true;
    yield put(userActions.userRequestFailure(e, destroyUser));
  }
}

export function* userTestInfoFetch(action) {
  const result = yield call(getCurrentUserTestInfoAPI);
  try {
    if (result) {
      return yield put(
        userActions.userTestInfoRequestSuccess(result.currentStudent)
      );
    }
    throw error;
  } catch (e) {
    console.log('error: ', e);
    yield put(userActions.userTestInfoRequestFailure(e, destroyUser));
  }
}

export function* updateUser(action) {
  const result = yield call(saveChangeStudent(action.payload));

  try {
    console.log(result);
    if (result) {
      return yield put(userActions.updateUserSuccess(result.user));
    }
    throw error;
  } catch (error) {
    yield put(userActions.updateUserFailure(error));
  }
}

export function* updateCurrentTest(action) {
  const endpoint = endpoints.PATCH_UPDATE_USER;
  const { result, error } = yield call(Api.patch, {
    url: `/${endpoint.version}${endpoint.url}`,
    data: {
      data: {
        attributes: { current_test: action.payload }
      }
    }
  });

  try {
    if (result) {
      return yield put(
        userActions.updateCurrentTestSuccess(action.payload)
      );
    }
    throw error;
  } catch (error) {
    console.log(error);
  }
}

export function* fetchPayments(action) {
  const endpoint = endpoints.GET_LAST_PAYMENT_TRANSACTION;
  const { result, error } = yield call(Api.get, {
    url: `/${endpoint.version}${endpoint.url}`
  });

  try {
    if (result) {
      return yield put(userActions.userFetchPaymentsSuccess(result.data));
    }
    throw error;
  } catch (error) {
    console.error(error);
    yield put(userActions.userFetchPaymentsFailure(error));
  }
}

export function* updatePaymentMethod(action) {
  const endpoint = endpoints.POST_UPDATE_PAYMENT_SOURCE;
  const { result, error } = yield call(Api.post, {
    url: `/${endpoint.version}${endpoint.url}`,
    data: action.payload
  });

  try {
    if (result) {
      yield put(userActions.userUpdatePaymentSourceSuccess());
      return yield put(userActions.userFetchPayments());
    }
    throw error;
  } catch (error) {
    console.error(error);
    yield put(userActions.userUpdatePaymentSourceFailure(error));
  }
}

export function* updatePassword(action) {
  console.log(action);
  const endpoint = endpoints.PATCH_UPDATE_USER_PASSWORD;
  const { result, error } = yield call(Api.patch, {
    url: `/${endpoint.version}${endpoint.url}`,
    data: {
      data: {
        type: 'user',
        attributes: action.payload
      }
    }
  });

  try {
    if (result) {
      if(result.data.state == "success"){
        return yield put(
          userActions.userUpdatePasswordSuccess(result.data)
        );   
      }else {
        yield put(userActions.userUpdatePasswordFailure(result.data.state));
      }
    }
  } catch (error) {
    console.error(error);
    yield put(userActions.userUpdatePasswordFailure(error));
  }
}

export function* userSignOut(action) {
  const endpoint = endpoints.POST_SIGNOUT_USER;
  const { result, error } = yield call(Api.post, {
    url: `/${endpoint.version}${endpoint.url}`
  });

  try {
    if (result) {
      yield put(userActions.userSignOutSuccess());
    } else {
      yield put(userActions.userSignOutFailure(error));
    }
  } catch (error) {
    yield put(userActions.userSignOutFailure(error));
    if (error.response && error.response.status === 401) {
      yield put(userSessionExpire());
    }
  }
}

export function* setUserTimeOnPlatform(action) {
  console.log(action);
  const endpoint = endpoints.POST_TOTAL_TIME_ON_PLATFORM;
  const { result, error } = yield call(Api.post, {
    url: `/${endpoint.version}${endpoint.url}`,
    data: {
      data: {
        attributes: {
          total_time: moment.utc( new Date() ).format()
        }
      }
    }
  });

  try {
    console.log({ result, error });
    if (result) {
      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
}

export function* userOldFetch(action) {
  const endpoint = endpoints.GET_USER;
  const destoryUser = true;
  const { result, error } = yield call(Api.get, {
    url: `/${endpoint.version}${endpoint.url}`
  });

  try {
    if (result) {
      yield put(userRequestSuccess(result.data));
    } else {
      yield put(userRequestFailure(error, destoryUser));
      if (error.response && error.response.status === 401) {
        yield put(userSessionExpire());
      }
    }
  } catch (error) {
    const destoryUser = true;
    yield put(userRequestFailure(error, destoryUser));
    if (error.response && error.response.status === 401) {
      yield put(userSessionExpire());
    }
  }
}

export function* updatePlan(action) {
  const endpoint = endpoints.POST_UPDATE_PLAN;
  const { result, error } = yield call(Api.post, {
    url: `/${endpoint.version}${endpoint.url}`,
    data: {
      plan: {
        plan: action.payload
      }
    }
  });

  try {
    if (result) {
      yield put(userActions.updatePlanSuccess());
      return yield put(userActions.userFetchPayments());
    }
    throw error;
  } catch (error) {
    console.error(error);
    yield put(userActions.updatePlanFailure(error));
  }
}

export function* submitFeedback(action) {
  const endpoint = endpoints.POST_SEND_FEEDBACK;
  const { result, error } = yield call(Api.post, {
    url: `/${endpoint.version}${endpoint.url}`,
    data: {
      feedback: {
        state: 'pending',
        reportable_id: null,
        reportable_type: 'PlanCancellation',
        description: action.payload.description,
        reportor_id: action.payload.id,
        resolver_id: null,
        resolved_at: null,
        created_at: null,
        updated_at: null
      }
    }
  });

  try {
    if (result) {
      return yield put(userActions.submitFeedbackSuccess());
    }
    throw error;
  } catch (error) {
    console.error(error);
    yield put(userActions.submitFeedbackFailure(error));
  }
}

export function* cancelPlan(action) {
  const endpoint = endpoints.POST_CANCEL_PLAN;
  const { result, error } = yield call(Api.post, {
    url: `/${endpoint.version}${endpoint.url}`,
    data: {
      plan_transaction: {
        plan: 'C',
        user_id: action.payload
      }
    }
  });

  try {
    if (result) {
      yield put(userActions.cancelPlanSuccess());
      return yield put(userActions.userFetchPayments());
    }
    throw error;
  } catch (error) {
    console.error(error);
    yield put(userActions.cancelPlanFailure(error));
  }
}

export function* sessionExpire() {
  Cookies.remove("jwt");
  const time = new Date();
  yield call(() => window.location.href = config.redirectUrl + '?t=' + time.getTime());
}

export default function* userSagas() {
  yield takeLatest(types.USER.REQUEST, userFetch);
  yield takeLatest(types.USER.REQUEST_TEST_INFO, userTestInfoFetch);
  yield takeLatest(types.USER.UPDATE, updateUser);
  yield takeLatest(types.USER.UPDATE_CURRENT_TEST, updateCurrentTest);
  yield takeLatest(types.USER.SIGN_OUT, userSignOut);
  yield takeLatest(types.USER.FETCH_PAYMENTS, fetchPayments);
  yield takeLatest(types.USER.TIME_ON_PLATFORM, setUserTimeOnPlatform);
  yield takeLatest(types.USER.UPDATE_PAYMENT_SOURCE, updatePaymentMethod);
  yield takeLatest(types.USER.UPDATE_PASSWORD, updatePassword);
  yield takeLatest(types.USER.OLD_REQUEST, userOldFetch);
  yield takeLatest(types.USER.UPDATE_PLAN, updatePlan);
  yield takeLatest(types.USER.SUBMIT_FEEDBACK, submitFeedback);
  yield takeLatest(types.USER.CANCEL_PLAN, cancelPlan);
  yield takeLatest(types.USER.SIGN_OUT_SUCCESS, sessionExpire);
}
