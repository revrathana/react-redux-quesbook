import { client } from '../constants/graphQL';
import gql from 'graphql-tag';

export async function getDiagnosticStatusApi() {
  return await client.query({query: gql`
    query {
      studyPlanSections {
        name
        diagnostics_progress
        sat_score: sat_score
        act_score: act_score
        part1_finished
        part1_total_questions
        part1_answered_questions
        d_test_url
        section_id
        remaining_time
        current_test
        diagnostic_latest
      }
    }
    `,
    fetchPolicy: 'network-only',
  }).then((res) => {
    return res.data;
  }).catch((e) => {
    console.info(e);
  });
}

export async function getDiagnosticApi(section) {
  return await client.query({query: gql`
    query {
      studyPlanSection(name: "${section}") {
        diagnostics_progress
        sat_score: sat_score
        act_score: act_score
        part1_finished
        part1_total_questions
        part1_answered_questions
        d_test_url
        section_id
        remaining_time
        current_test
        diagnostic_latest
      }
    }
    `,
    fetchPolicy: 'network-only',
  }).then((res) => {
    return res.data;
  }).catch((e) => {
    console.info(e);
  });
}
