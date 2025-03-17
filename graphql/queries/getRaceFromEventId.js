import gql from 'graphql-tag'

export default gql` 
    query($eventId : MongoID){
    raceMany(filter:{eventId: $eventId}){
        _id
        link
        name
        startTime
        status
    }
}
`
