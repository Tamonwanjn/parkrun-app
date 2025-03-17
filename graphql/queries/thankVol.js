import gql from 'graphql-tag'

export default gql`
query($eventId:MongoID!){
    thankValunTeer(eventId:$eventId){
      image
      name
      bib
    }
  }
`