import { client } from '../constants/graphQL';
import gql from 'graphql-tag';

export async function getSkillStatusApi(skill_id) {
  return await client.query({query: gql `
    query{
      skill(skill_id: ${skill_id}) {
        id
        name
        definition
        practice_by_skill_url
        article_id
        section
      }
    }
  `, fetchPolicy: 'network-only'}).then((res) => {
    return res.data;
  }).catch((e) => {
    console.info(e);
  });
}

export async function getWeakestSkillStatusApi(section_id) {
  return await client.query({query: gql `
    query{
      weakest_skill_list(section_id: ${section_id}) {
        id
        name
        definition
        questions_count
        completed_question_count
        practice_by_skill_url
        article_id
        section
      }
    }
  `, fetchPolicy: 'network-only'}).then((res) => {
    return res.data;
  }).catch((e) => {
    console.info(e);
  });
}
