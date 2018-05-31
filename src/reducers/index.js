// import { combineReducers } from 'redux';
import {
  GET_NOTES,
  // AUTHENTICATION_ERROR,
  DEAUTH,
  SORT_NOTES,
  NOTE_IDX,
  SORT_TRUE,
  SORT_FALSE,
  ARRAY_MOVE,
  SET_ID,
  ISAUTH,
  GET_CONTACTS,
  CONTACT_IDX,
  CONTACT_USER,
  GET_CONVERSATION,
  GET_USERS,
  USER,
  USER_IDX,
  NEW_CONTACT,
  EXISTING_CONTACT,
} from '../actions';

const initialState = {
  notes: [],
  isAuthenticated: false,
  noteIndex: 0,
  contactIndex: 0,
  sortedNotes: true,
  contact: [],
  newContact: false,
  user: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ISAUTH:
      return { ...state, isAuthenticated: !state.isAuthenticated };
    case GET_NOTES:
      return { ...state, notes: action.payload };
    case DEAUTH:
      return {
        ...state, notes: [], noteIndex: 0, contacts: [], contact: [], conversation: [], user: [],
      };
    case SORT_NOTES:
      return { ...state, notes: action.payload };
    case NOTE_IDX:
      return { ...state, noteIndex: action.payload };
    case SORT_FALSE:
      return { ...state, notes: action.payload, sortedNotes: false };
    case SORT_TRUE:
      return { ...state, notes: action.payload, sortedNotes: true };
    case ARRAY_MOVE:
      return { ...state, notes: action.payload };
    case GET_CONTACTS:
      return { ...state, contacts: action.payload };
    case CONTACT_IDX:
      return { ...state, contactIdx: action.payload };
    case CONTACT_USER:
      return { ...state, contact: action.payload };
    case GET_CONVERSATION:
      return { ...state, conversation: action.payload };
    case GET_USERS:
      return { ...state, users: action.payload };
    case USER:
      return { ...state, user: action.payload };
    case USER_IDX:
      return { ...state, userIdx: action.payload };
    case NEW_CONTACT:
      return { ...state, newContact: true };
    case EXISTING_CONTACT:
      return { ...state, newContact: false };
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
