import gql from 'graphql-tag'

export default gql`
  query{
    userMany{
      _id
      name
      bib
    }
  }
`
