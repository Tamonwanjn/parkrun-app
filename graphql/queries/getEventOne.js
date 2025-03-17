import gql from "graphql-tag";

export default gql`
  query ($_id: MongoID) {
    eventOne(filter: { _id: $_id }) {
      _id
      name
      eventRoute
      image
      location
      address
      levels
      organizEmail
      road
      route
      startPoint
      finishPoint
      banner
      facebookURL
    }
  }
`;
