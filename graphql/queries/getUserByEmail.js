import gql from 'graphql-tag'

export default gql`
  query getUserByEmail($email: String!) {
    userOne(filter: { email: $email }) {
      _id
      name
      email
      role
      phone
      image
    }
  }
`
