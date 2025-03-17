import gql from 'graphql-tag'

export default gql`
mutation($name:String,$userId:MongoID,$eventId:MongoID,$raceId:MongoID,$regisType:String){
  createRegis(record:{
    name:$name,
    userId:$userId,
    eventId:$eventId,
    raceId:$raceId,
    regisType:$regisType,
  }){
    recordId
  }
}
`
