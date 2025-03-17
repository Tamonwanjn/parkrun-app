import { gql } from "@apollo/client";

const getRunnersByEvent = gql`
  query GetRunnersByEvent($eventId: ID!) {
    runners(filter: { eventId: $eventId }) {
      _id
      user {
        name
        bib
      }
      time
    }
  }
`;

export default getRunnersByEvent;
