// import { combineReducers } from 'redux';
import {
  LOGIN,
  GET_NOTES,
  AUTHENTICATION_ERROR,
  DEAUTH,
  SORT_NOTES,
  SORT_DATA,
  NOTE_IDX,
} from '../actions';

const initialState = {
  notes: [],
  isAuthenticated: false,
  noteIndex: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isAuthenticated: true };
    case GET_NOTES:
      return { ...state, notes: action.payload };
    case DEAUTH:
      return { ...state, notes: [], isAuthenticated: false };
    case SORT_NOTES:
      return { ...state, notes: action.payload };
    case NOTE_IDX:
      return { ...state, noteIndex: action.payload };
    default:
      return state;
  }
};

// const NoteReducer = (s = [], action) => {
//   switch (action.type) {
//     case GET_NOTES:
//       return
//     default:
//       return notes;
//   }
// };

// const rootReducer = combineReducers({
//   AuthReducer,
//   NoteReducer,
// });

export default rootReducer;
