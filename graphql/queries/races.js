import gql from 'graphql-tag'

export default gql`
query($_id : MongoID){
    raceMany(filter:{
        eventId: $_id
    }, limit: 1000, sort: _ID_DESC){
        _id
        name
          slug
        organizId
        eventId
        startTime
        status
    }
  }
`