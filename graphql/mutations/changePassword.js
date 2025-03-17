import gql from 'graphql-tag'

export default gql`
mutation($_id: MongoID!, $password: String!){
    changePassword(_id:$_id,password: $password){
      _id
    }
  }
`
