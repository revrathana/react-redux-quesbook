import types from './types';

export const resetWeakestTopic = () => ({
  type: types.TOPIC.RESET_WEAKEST
});

export const topicRequest = (section_id) => ({
  type: types.TOPIC.REQUEST,
  section_id: section_id
});

export const userTopicRequest = (user_id, category_id) => ({
  type: types.TOPIC.USER_REQUEST,
  user_id: user_id,
  category_id: category_id
});

export const topicRequestResult = (result) => ({
  type: types.TOPIC.REQUEST_RESULT,
  result
});

export const weakestTopicRequest = (section_id) => ({
  type: types.TOPIC.WEAKEST_REQUEST,
  section_id: section_id
});

export const weakestTopicRequestResult = (result) => ({
  type: types.TOPIC.WEAKEST_REQUEST_RESULT,
  result
});

