import gql from 'graphql-tag'

export default gql`
query{
    getTop10Runner{
      _id
      image
      name
      bib
      Count
    }
  }
`
