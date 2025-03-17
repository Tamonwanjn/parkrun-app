import gql from 'graphql-tag'

export default gql`
query{
    getRunnerRegister{
      eventId
      runner
      date
    }
  }
`
