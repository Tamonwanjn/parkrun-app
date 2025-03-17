import gql from "graphql-tag";

export default gql`
  query ($filter: FilterFindManyuserpointsInput) {
    userPointsMany(filter: $filter) {
      _id
      rewardStatus
      rewardId
      reward {
        _id
        cardColor
        activityName
        pointTarget
        deleted
        endDate
        startDate
        image
      }
      userId
      address
      achieved
      deleted
      points
    }
  }
`;

// userId
// points
// expired
// achievementId
// #achievement {
// # _id
// #userAddressId
// #userAddress {

// #}
// #}
