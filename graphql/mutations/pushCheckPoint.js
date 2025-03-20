import { gql } from "@apollo/client";

export const PUSH_CHECKPOINT = gql`
  mutation pushCheckpoints($record: [CreateManycheckpointsInput]) {
    checkpointCreateMany(records: $record) {
      records {
        _id
        slug
        time
        runnerId
        position
      }
    }
  }
`;
