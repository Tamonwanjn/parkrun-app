import gql from 'graphql-tag'

export default gql`
  mutation(
    $idcard:String,
    $email:String!,
    $password: String!,
    $phone:String,
    $emergenPhone:String,
    $drug:String,
    $name: String,
    $gender: String,
    $birthdate :Date,
  ){
    userRegister(
      idcard:$idcard,
      email:$email,
      password: $password,
      phone: $phone,
      emergenPhone: $emergenPhone,
      drug: $drug,
      name: $name,
      gender: $gender,
      birthDate: $birthdate
      
    )
      {
          _id
      }
  }
`
