import { gql } from '@apollo/client';

export const QUERY_LAUNCH_LIST = gql`
query Query {
  flashcards {
    flashcards {
      id
      question
      answer
      isDone
      postedBy {
        name
      }
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

export const CREATE_FLASHCARD = gql`
mutation create($question: String!, $answer: String!) {
  createFlashcard(question: $question, answer: $answer) {
    question
    answer
  }
}

`;

export const DELETE_MUTATION = gql`
mutation Delete_Flashcard($deleteFlashcardId: Int!) {
  deleteFlashcard(id: $deleteFlashcardId) {
    question
    answer
  }
}
`;


export const FILTER_QUERY = gql `
query Flashcards($filter: String) {
  flashcards(filter: $filter) {
    flashcards {
      id
      answer
      question
      isDone
    }
  }
}
`;