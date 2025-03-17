import gql from 'graphql-tag'

export default gql`
query($bib: Int!){
    volunteerStat(bib: $bib){
        _id
        count
    }
  }
`