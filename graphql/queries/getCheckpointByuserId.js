import gql from 'graphql-tag'

export default gql` 
query($userId:MongoID!){
  regisMany(filter:{
    userId:$userId
    OR :[{status:apporve},{status:waiting}]
  }){
    name
    eventId
    raceId
    regisType
    status
    race{
      startTime
    }
  }
   checkpointMany(filter:{
      runnerId: $userId,
      deleted: false,
      
    }){
        _id
        runnerId
        raceId
        slug
        time
        race{
          name
          startTime
        }
        isVirtual
        startTime
        endTime
    }
}
`
