import gql from 'graphql-tag'

export default gql`
query($userId: MongoID!){
  getRaceVolunteer(userId: $userId){
    _id
    name
    slug
    startTime
    endTime
    eventId
  }
}
`
