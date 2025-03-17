import gql from "graphql-tag";

export default gql`
  mutation ($record: UpdateByIduserpointsInput!) {
    userPointsUpdateById(record: $record) {
      record {
        _id
      }
    }
  }
`;
