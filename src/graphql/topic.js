import { client } from '../constants/graphQL';
import gql from 'graphql-tag';

export async function getUserTopics(user_id, category_id) {
  return await client.query({query: gql `
    query{
      user_topic_list(user_id: ${user_id}, category_id: ${category_id}) {
        id
        category_id
        score
        completed_drill_down
        diagnostic_latest
        topic {
          id
          name
          definition
        }
      }
    }
  `, fetchPolicy: 'network-only'}).then((res) => {
    return res.data;
  }).catch((e) => {
    console.info(e);
  });
}

export async function getTopicStatusApi(section_id) {
  return await client.query({query: gql `
    query{
      limited_topic_list(section_id: ${section_id}) {
        id
        name
        definition
        completed_drill_down
        diagnostic_latest
        score
        skills{
          id
          name
          definition
          practice_by_skill_url
          section {
            name
          }
          skill_score
        }
      }
    }
  `, fetchPolicy: 'network-only'}).then((res) => {
    return res.data;
  }).catch((e) => {
    console.info(e);
  });
}

export async function getWeakestTopicStatusApi(section_id) {
  return await client.query({query: gql `
    query{
      weakest_topic_list(section_id: ${section_id}) {
        id
        name
        definition
        section {
          id
          name
        }
      }
    }
  `, fetchPolicy: 'network-only'}).then((res) => {
    return res.data;
  }).catch((e) => {
    console.info(e);
  });
}
