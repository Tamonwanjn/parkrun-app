import gql from 'graphql-tag'

export default gql`
query($userId: MongoID!) {
  eventMany(filter: { participants: $userId }) {
    _id
    name
    date
    location
    image
    address
    status
    }
  }
`