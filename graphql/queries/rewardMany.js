import gql from "graphql-tag";

export default gql`
  query ($filter: FilterFindManyrewardsInput) {
    rewardMany(filter: $filter) {
      _id
      activityName
      pointTarget
      cardColor
      endDate
      image
    }
  }
`;
