import gql from 'graphql-tag'

export default gql`
query getUser($bib: Float!) {
    userOne(filter:{bib: $bib}){
      _id
      bib
      name
      gender
      birthDate
      emergenPhone
      drug
      image
    }
  }
`