import { gql } from '@apollo/client';

export const QUERY_LAUNCH_LIST = gql`
query Flashcards {
  flashcards {
    flashcards {
      question
      answer
      id
    }
  }
}
`;

export const SIGNUP_MUTATION = gql`
mutation Mutation($email: String!, $password: String!, $name: String!) {
  signup(email: $email, password: $password, name: $name) {
    token
  }
}
`;


export const LOGIN_MUTATION = gql`
mutation LoginMutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;