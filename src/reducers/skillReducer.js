import types from '../actions/types';

const initialState = {
  skill: [],
  weakestSkillList: []
};

const skillReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SKILL.REQUEST_RESULT:
      return {
      ...state,
      skill: action.data.skill
    };
    case types.SKILL.WEAKEST_REQUEST_RESULT:
      const updatedSkillList = [...state.weakestSkillList, action.data.weakest_skill_list];
      return {
      ...state,
      weakestSkillList: updatedSkillList
    };
    case types.SKILL.RESET_WEAKEST:
      return {
      ...state,
      weakestSkillList: []
    };
    default:
      return state;
  }
}

export default skillReducer;
