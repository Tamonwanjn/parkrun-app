import gql from 'graphql-tag'

export default gql`
query{
    allEventStats{
      eventCount
      runnerCount
      checkPointCount
      racesCount
      valunteerCount
    }
  }
`
