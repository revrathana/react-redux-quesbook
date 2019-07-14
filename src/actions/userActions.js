import types from './types';

const handleErrors = response => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

export const userRequest = () => {
    return {
        type: types.USER.REQUEST
    };
};
export const userRequestSuccess = result => {
    return {
        type: types.USER.REQUEST_SUCCESS,
        result
    };
};
export const userRequestFailure = (error, destroyUser) => {
    return {
        type: types.USER.REQUEST_FAILURE,
        error,
        destroyUser
    };
};

export const updateUserSetting = user => {
    return {
        type: types.USER.UPDATE_SETTING,
        user
    };
};

export const userTestInfoRequest = () => {
    return {
        type: types.USER.REQUEST_TEST_INFO
    };
};
export const userTestInfoRequestSuccess = result => {
    return {
        type: types.USER.REQUEST_TEST_INFO_SUCCESS,
        result
    };
};
export const userTestInfoRequestFailure = error => {
    return {
        type: types.USER.REQUEST_TEST_INFO_FAILURE,
        error
    };
};

export const updateUser = payload => {
    return {
        type: types.USER.UPDATE,
        payload
    };
};
export const updateUserSuccess = user => {
    return {
        type: types.USER.UPDATE_SUCCESS,
        user
    };
};
export const updateUserFailure = error => {
    return {
        type: types.USER.UPDATE_FAILURE,
        error
    };
};

export const updateCurrentTest = payload => {
    return {
        type: types.USER.UPDATE_CURRENT_TEST,
        payload
    };
};
export const updateCurrentTestSuccess = current_test => {
    return {
        type: types.USER.UPDATE_CURRENT_TEST_SUCCESS,
        current_test
    };
};

export const userSignOut = user => {
    return {
        type: types.USER.SIGN_OUT,
        user
    };
};
export const userSignOutSuccess = () => {
    return {
        type: types.USER.SIGN_OUT_SUCCESS
    };
};
export const userSignOutFailure = error => {
    return {
        type: types.USER.SIGN_OUT_FAILURE,
        error
    };
};

export const userTimeOnPlatform = user => {
    return {
        type: types.USER.TIME_ON_PLATFORM,
        user
    };
};

export const userFetchPayments = () => {
    return {
        type: types.USER.FETCH_PAYMENTS
    };
};
export const userFetchPaymentsSuccess = payments => {
    return {
        type: types.USER.FETCH_PAYMENTS_SUCCESS,
        payments
    };
};
export const userFetchPaymentsFailure = error => {
    return {
        type: types.USER.FETCH_PAYMENTS_FAILURE,
        error
    };
};

export const userUpdatePaymentSource = payload => {
    return {
        type: types.USER.UPDATE_PAYMENT_SOURCE,
        payload
    };
};
export const userUpdatePaymentSourceSuccess = paymentObj => {
    return {
        type: types.USER.UPDATE_PAYMENT_SOURCE_SUCCESS,
        paymentObj
    };
};
export const userUpdatePaymentSourceFailure = error => {
    return {
        type: types.USER.UPDATE_PAYMENT_SOURCE_FAILURE,
        error
    };
};
 
export const userUpdatePassword = payload => {
    return {
        type: types.USER.UPDATE_PASSWORD,
        payload
    };
};
export const userUpdatePasswordSuccess = () => {
    return {
        type: types.USER.UPDATE_PASSWORD_SUCCESS
    };
};
export const userUpdatePasswordFailure = error => {
    return {
        type: types.USER.UPDATE_PASSWORD_FAILURE,
        error
    };
};

export const updatePlan = payload => {
    return {
        type: types.USER.UPDATE_PLAN,
        payload
    };
};
export const updatePlanSuccess = () => {
    return {
        type: types.USER.UPDATE_PLAN_SUCCESS
    };
};
export const updatePlanFailure = error => {
    return {
        type: types.USER.UPDATE_PLAN_FAILURE,
        error
    };
};

export const cancelPlan = payload => {
    return {
        type: types.USER.CANCEL_PLAN,
        payload
    };
};
export const cancelPlanSuccess = () => {
    return {
        type: types.USER.CANCEL_PLAN_SUCCESS
    };
};
export const cancelPlanFailure = error => {
    return {
        type: types.USER.CANCEL_PLAN_FAILURE,
        error
    };
};

export const submitFeedback = payload => {
    return {
        type: types.USER.SUBMIT_FEEDBACK,
        payload
    };
};
export const submitFeedbackSuccess = () => {
    return {
        type: types.USER.SUBMIT_FEEDBACK_SUCCESS
    };
};
export const submitFeedbackFailure = error => {
    return {
        type: types.USER.SUBMIT_FEEDBACK_FAILURE,
        error
    };
};
