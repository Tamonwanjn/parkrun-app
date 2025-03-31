import gql from 'graphql-tag';

export default gql`
  query($userId: MongoID!) {
    getRaceVolunteer(userId: $userId) {
      name
      slug
      startTime
      endTime
      checkpoints {
        name
        position
        cutOffTime
      }
      _id
      eventId
      event {
        organizId
      }
    }
  }
`;
