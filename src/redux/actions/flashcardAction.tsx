import { actionTypes } from "../types";

const { GET_OWN_FLASHCARDS, EXPLORE_FLASHCARDS } = actionTypes;

export const ownFlashcards = (flashcards: any)=>({
  type:GET_OWN_FLASHCARDS,
  payload:flashcards
});

export const sorted = (sort: any) =>({
  type:EXPLORE_FLASHCARDS,
  payload:sort
})