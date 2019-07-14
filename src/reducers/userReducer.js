import types from "../actions/types";
import update from "immutability-helper";

const initialState = {
  user: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER.REQUEST_SUCCESS:
      return {
        ...state,
        user: action.result
      };
    case types.USER.REQUEST_FAILURE:
      return {
        ...state,
        user: !action.destroyUser ? state.user : null
      };
    case types.USER.REQUEST_TEST_INFO_SUCCESS:
      return update(state, {
        user: {
          user: { $merge: action.result }
        }
      });
    case types.USER.UPDATE_CURRENT_TEST_SUCCESS:
      return update(state, {
        user: {
          user: {
            current_test: { $set: action.current_test }
          }
        }
      });
    case types.USER.UPDATE_SUCCESS:
      return update(state, {
        user: {
          user: {
            $merge: action.payload
          }
        }
      });
    case types.USER.FETCH_PAYMENTS_SUCCESS:
      const { payments } = action;
      return update(state, {
        user: {
          $merge: { payments }
        }
      });
    case types.USER.SIGN_OUT_SUCCESS:
      return update(state, {
        user: { $set: null }
      });
    case types.USER.UPDATE_PASSWORD_SUCCESS:
    console.log('here1')
      return {
        ...state,
        update_password: {
          state: true,      
        }  
      };
    case types.USER.UPDATE_PASSWORD_FAILURE:
      console.log('here2')
      console.log('action', action)
      return {
        ...state,
        update_password: {
          state: false,
          error: action.error 
        }
      };
    default:
      return state;
  }
};

export default userReducer;
