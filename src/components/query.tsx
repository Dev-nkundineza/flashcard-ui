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