import { client } from '../constants/graphQL';
import gql from 'graphql-tag';

export async function getStudyArticleStatusApi(study_article_id) {
  return await client.query({query: gql`
    query {
      studyArticle(id: ${study_article_id}) {
        id
        title
        content
        section_name
        time_in_minutes
      }
    }
  `, fetchPolicy: 'network-only'
  }).then((res) => {
    return res.data;
  }).catch((e) => {
    console.info(e);
  });
}
