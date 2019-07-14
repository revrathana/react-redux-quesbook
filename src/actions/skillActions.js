import types from './types';

export const resetWeakestSkill = () => ({
  type: types.SKILL.RESET_WEAKEST
});

export const skillRequest = (skill_id) => ({
  type: types.SKILL.REQUEST,
  skill_id: skill_id
});

export const skillRequestResult = (result) => ({
  type: types.SKILL.REQUEST_RESULT,
  result
});

export const weakestSkillRequest = (section_id) => ({
  type: types.SKILL.WEAKEST_REQUEST,
  section_id: section_id
});

export const weakestSkillRequestResult = (result) => ({
  type: types.SKILL.WEAKEST_REQUEST_RESULT,
  result
});
