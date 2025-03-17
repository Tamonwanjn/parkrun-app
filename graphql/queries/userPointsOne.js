import gql from "graphql-tag";

export default gql`
  query ($filter: FilterFindOneuserpointsInput) {
    userPointsOne(filter: $filter) {
      _id
      rewardId
      reward {
        activityName
        cardColor
        pointTarget
        roleActivity
        sizeList
        rewardCharacter
        startDate
        endDate
        rewardItem
        _id
        image
        parkRun
        anyWhere
      }
      address
      points
      achieved
      rewardStatus
      rewardDetail
      trackingNo
    }
  }
`;

// #expired
//       achievementId

// achievement {
//   _id
//   status
//   trackingNo
//   rewardDetail
//   userAddressId
//   userAddress {
//     address
//   }
// }
