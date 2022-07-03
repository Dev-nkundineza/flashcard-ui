import { actionTypes } from '../types'

const {
  GET_OWN_FLASHCARDS, EXPLORE_FLASHCARDS
} = actionTypes;

const initialState = {
  myFlashcards:[],
  sorted: []
}

export default function (state = initialState,action: any){
  switch(action.type){
    case GET_OWN_FLASHCARDS:
    return {
      ...state,
      myFlashcards:action.payload
    }

    case EXPLORE_FLASHCARDS:
      return {
        ...state,
        sorted:action.payload
      }
    default:
      return state;
  }
}