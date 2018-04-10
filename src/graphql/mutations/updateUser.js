import gql from 'graphql-tag';

export default gql`
  mutation(
    $id: ID!
    $name: String
    $email: String
    $phone: String
    $address: String
  ) {
    updateUser(
      input: {
        name: $name
        email: $email
        password: $password
        phone: $phone
        address: $address
      }
    ) {
      __typename
      id
      name
      email
      phone
      address
    }
  }
`;
