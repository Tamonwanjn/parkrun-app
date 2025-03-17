import gql from 'graphql-tag'

export default gql`
  query {
    eventMany(filter:{
      approved: approve,
      deleted: false
    }) {
      _id
      name
      slug
      image
      eventRoute
      organizId
      organizName
      province
      organizEmail
      organizPhone
      address
      description
    }
		
  }
`
