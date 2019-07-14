import { client } from '../constants/graphQL';
import gql from 'graphql-tag';

export async function getSimulationStatusApi() {
  return await client.query({
    query: gql`
      query {
        full_simulation_list {
          id
          name
          simulations {
            id
            name
            section_name
            score
            progress
            simulation_url
          }
        }
      }
    `,
    fetchPolicy: 'network-only'
  }).then((res) => {
    return res.data;
  }).catch((e) => {
    console.info(e);
  });
}
