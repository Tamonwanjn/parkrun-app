import gql from "graphql-tag";

export default gql`
  query ($userId: MongoID!) {
    userPoints(userId: $userId) {
      _id
      rewardId
      reward {
        _id
        cardColor
        activityName
        pointTarget
        deleted
        image
      }
      points
      achieved
      expired
      achievementId
      achievement {
        _id
        userAddressId
        userAddress {
          address
        }
      }
    }
  }
`;
