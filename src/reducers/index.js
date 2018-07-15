// import { combineReducers } from 'redux';
import {
  GET_NOTES,
  AUTHENTICATION_ERROR,
  DEAUTH,
  ADMIN,
  SORT_NOTES,
  NOTE_IDX,
  SORT_TRUE,
  SORT_FALSE,
  ARRAY_MOVE,
  // SET_ID,
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
  NEW_USER_NAME,
  CONTACT_NAME,
  PROFILE,
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
  message: undefined,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN:
      return { ...state, admin: action.payload };
    case AUTHENTICATION_ERROR:
      return { ...state, error: action.payload };
    case PROFILE:
      return { ...state, profile: action.payload };
    case ISAUTH:
      return { ...state, isAuthenticated: !state.isAuthenticated };
    case GET_NOTES:
      return { ...state, notes: action.payload };
    case DEAUTH:
      return {
        ...state,
        isAuthenticated: false,
        notes: [],
        noteIndex: 0,
        contacts: [],
        contact: [],
        user: [],
        conversation: [],
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
    case NEW_USER_NAME:
      return { ...state, recipient: action.payload };
    case CONTACT_NAME:
      return { ...state, contactName: action.payload };
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
