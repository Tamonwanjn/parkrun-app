import gql from "graphql-tag";

export default gql`
  query ($filter: FilterFindOnerewardsInput) {
    rewardOne(filter: $filter) {
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
  }
`;
