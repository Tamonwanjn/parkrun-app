import gql from 'graphql-tag'

export default gql`
  query($userId : MongoID) {
    regisMany(filter:{
      userId: $userId
    }) {
      _id
      raceId
      race{
        startTime
      }
    }
		
  }
`
