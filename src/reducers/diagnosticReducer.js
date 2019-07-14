import types from '../actions/types';

const initialState = {
  studyPlanSections: []
};

const diagnosticReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DIAGNOSTIC.REQUEST_RESULT:
      return {
      ...state,
      studyPlanSections: action.data.studyPlanSections
    };
    case types.DIAGNOSTIC.SINGLE_REQUEST_RESULT:
      return {
      ...state,
      singleDiagnostic: action.data.studyPlanSection
    };
    default:
      return state;
  }
}

export default diagnosticReducer;
