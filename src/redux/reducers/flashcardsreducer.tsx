import { actionTypes } from '../types'

const {
  GET_OWN_FLASHCARDS
} = actionTypes;

const initialState = {
  myFlashcards:[],
  explore:[],
  edit:[],
  editContent:{
    description:'',
    url:'',
    isDone:'',
  }

}

export default function (state = initialState,action: any){
  switch(action.type){
    case GET_OWN_FLASHCARDS:
    return {
      ...state,
      myFlashcards:action.payload
    }
    default:
      return state;
  }
}