// import gql from 'graphql-tag'

// export default gql`
// mutation ($email: String!, $password: String!) {
//   login(email: $email, password: $password) {
//     token
//   }
// }
// `





import gql from 'graphql-tag';

export default gql`
mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      email
    }
  }
}`;
