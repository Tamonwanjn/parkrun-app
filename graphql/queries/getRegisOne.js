import gql from 'graphql-tag'

export default gql`
    query($_id : MongoID){
    regisOne(filter:{
        _id: $_id
        }){
        name
        _id
        eventId
        runnerId
        status
    }
    }
`
