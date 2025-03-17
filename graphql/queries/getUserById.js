import gql from "graphql-tag";

export default gql`
  query ($_id: MongoID!) {
    userById(_id: $_id) {
      name
      address
    }
  }
`;
