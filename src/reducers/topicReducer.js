import types from '../actions/types';

const initialState = {
  topicList: [],
  weakestTopicList: [],
  userTopicList: []
};

const topicReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOPIC.REQUEST_RESULT:
      return {
      ...state,
      topicList: action.data.limited_topic_list
    };
    case types.TOPIC.USER_REQUEST_RESULT:
      const userTopicList = [...state.userTopicList, action.data.user_topic_list];
      return {
      ...state,
      userTopicList: userTopicList
    };
    case types.TOPIC.WEAKEST_REQUEST_RESULT:
      const updatedTopicList = [...state.weakestTopicList, action.data.weakest_topic_list];
      return {
      ...state,
      weakestTopicList: updatedTopicList
    };
    case types.TOPIC.RESET_WEAKEST:
      return {
      ...state,
      weakestTopicList: []
    };
    default:
      return state;
  }
}

export default topicReducer;
