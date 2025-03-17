import gql from 'graphql-tag'

export default gql`
mutation updateUser($record: UpdateByIdusersInput!) {
    userUpdateById(record: $record) {
    record{
        _id
        bib
        phone
        name
        email
        gender
        birthDate
        emergenPhone
        province
        drug
        idcard
    }
    
  }
}
`