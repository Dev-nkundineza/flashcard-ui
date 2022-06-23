import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AllFlashcards = {
  __typename?: 'AllFlashcards';
  count: Scalars['Int'];
  flashcards: Array<Flashcard>;
  id?: Maybe<Scalars['ID']>;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export type Flashcard = {
  __typename?: 'Flashcard';
  answer: Scalars['String'];
  id: Scalars['Int'];
  isDone: Scalars['Boolean'];
  postedBy?: Maybe<User>;
  question: Scalars['String'];
};

export type FlashcardOrderByInput = {
  answer?: InputMaybe<Sort>;
  createdAt?: InputMaybe<Sort>;
  question?: InputMaybe<Sort>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createFlashcard: Flashcard;
  deleteFlashcard: Flashcard;
  login: AuthPayload;
  signup: AuthPayload;
  updateFlashcard: Flashcard;
};


export type MutationCreateFlashcardArgs = {
  answer: Scalars['String'];
  question: Scalars['String'];
};


export type MutationDeleteFlashcardArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateFlashcardArgs = {
  answer?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  isDone?: InputMaybe<Scalars['Boolean']>;
  question?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  flashcards: AllFlashcards;
};


export type QueryFlashcardsArgs = {
  filter?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Array<FlashcardOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export enum Sort {
  Asc = 'asc',
  Desc = 'desc'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  flashcards: Array<Flashcard>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type FlashcardsQueryVariables = Exact<{ [key: string]: never; }>;


export type FlashcardsQuery = { __typename?: 'Query', flashcards: { __typename?: 'AllFlashcards', flashcards: Array<{ __typename?: 'Flashcard', question: string, answer: string, id: number }> } };

export type MutationMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
}>;


export type MutationMutation = { __typename?: 'Mutation', signup: { __typename?: 'AuthPayload', token: string } };

export type LoginMutationMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutationMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', token: string } };


export const FlashcardsDocument = gql`
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

/**
 * __useFlashcardsQuery__
 *
 * To run a query within a React component, call `useFlashcardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFlashcardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFlashcardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFlashcardsQuery(baseOptions?: Apollo.QueryHookOptions<FlashcardsQuery, FlashcardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FlashcardsQuery, FlashcardsQueryVariables>(FlashcardsDocument, options);
      }
export function useFlashcardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FlashcardsQuery, FlashcardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FlashcardsQuery, FlashcardsQueryVariables>(FlashcardsDocument, options);
        }
export type FlashcardsQueryHookResult = ReturnType<typeof useFlashcardsQuery>;
export type FlashcardsLazyQueryHookResult = ReturnType<typeof useFlashcardsLazyQuery>;
export type FlashcardsQueryResult = Apollo.QueryResult<FlashcardsQuery, FlashcardsQueryVariables>;
export const MutationDocument = gql`
    mutation Mutation($email: String!, $password: String!, $name: String!) {
  signup(email: $email, password: $password, name: $name) {
    token
  }
}
    `;
export type MutationMutationFn = Apollo.MutationFunction<MutationMutation, MutationMutationVariables>;

/**
 * __useMutationMutation__
 *
 * To run a mutation, you first call `useMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationMutation, { data, loading, error }] = useMutationMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useMutationMutation(baseOptions?: Apollo.MutationHookOptions<MutationMutation, MutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationMutation, MutationMutationVariables>(MutationDocument, options);
      }
export type MutationMutationHookResult = ReturnType<typeof useMutationMutation>;
export type MutationMutationResult = Apollo.MutationResult<MutationMutation>;
export type MutationMutationOptions = Apollo.BaseMutationOptions<MutationMutation, MutationMutationVariables>;
export const LoginMutationDocument = gql`
    mutation LoginMutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
    `;
export type LoginMutationMutationFn = Apollo.MutationFunction<LoginMutationMutation, LoginMutationMutationVariables>;

/**
 * __useLoginMutationMutation__
 *
 * To run a mutation, you first call `useLoginMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutationMutation, { data, loading, error }] = useLoginMutationMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutationMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutationMutation, LoginMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutationMutation, LoginMutationMutationVariables>(LoginMutationDocument, options);
      }
export type LoginMutationMutationHookResult = ReturnType<typeof useLoginMutationMutation>;
export type LoginMutationMutationResult = Apollo.MutationResult<LoginMutationMutation>;
export type LoginMutationMutationOptions = Apollo.BaseMutationOptions<LoginMutationMutation, LoginMutationMutationVariables>;