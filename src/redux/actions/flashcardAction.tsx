import { actionTypes } from "../types";

const { GET_OWN_FLASHCARDS } = actionTypes;

export const ownFlashcards = (flashcards: any)=>({
  type:GET_OWN_FLASHCARDS,
  payload:flashcards
});