// import { combineReducers } from 'redux';
import { LOGIN, GET_NOTES, AUTHENTICATION_ERROR } from '../actions';

const initialState = {
  notes: [],
  isAuthenticated: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isAuthenticated: true };
    case GET_NOTES: 
      return { ...state, notes: action.payload };
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
