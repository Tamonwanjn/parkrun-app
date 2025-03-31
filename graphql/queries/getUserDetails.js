import gql from "graphql-tag";

export default gql`
  query getUser($filter: FilterFindOneusersInput) {
    userOne(filter: $filter) {
      _id
      name
      phone
      email
    }
  }
`;