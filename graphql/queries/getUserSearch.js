import gql from 'graphql-tag'

export default gql`
  query($_id: MongoID){
    userOne(filter:{
        _id: $_id
      }){
      _id
      bib
      phone
      name
      email
      gender
      birthDate
    }
  }
`
