import types from './types';

export const studyArticleRequest = (study_article_id) => ({
  type: types.STUDY_ARTICLE.REQUEST,
  study_article_id: study_article_id
});

export const studyArticleRequestResult = (result) => ({
  type: types.STUDY_ARTICLE.REQUEST_RESULT,
  result
});

