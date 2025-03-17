import gql from 'graphql-tag'

export default gql`
query($bib: Int!){
    parkrunner(bib: $bib){
      _id
      time
      rank
      rankall
      events{
        name
      }
      races{
        _id
      }
    }
  }
`