import types from '../actions/types';

const initialState = {
  banner:true
};

const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.BANNER.BANNER_DISPLAY:
      return {
      ...state,
    };
    case types.BANNER.BANNER_DISMISS:
      state.banner = false
      return {
      ...state,
    };
    default:
      return state;
  }
}

export default bannerReducer;
