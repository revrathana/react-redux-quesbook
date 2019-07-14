import types from '../actions/types';

const initialState = {
  study_article: []
};

const studyArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.STUDY_ARTICLE.REQUEST_RESULT:
      return {
      ...state,
      study_article: action.data.studyArticle
    };
    default:
      return state;
  }
}

export default studyArticleReducer;
