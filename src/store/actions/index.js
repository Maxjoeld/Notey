import axios from 'axios';
import { arrayMove } from 'react-sortable-hoc';

// export const LOGIN = 'LOGIN';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const GET_NOTES = 'GET_NOTES';
export const DEAUTH = 'DEAUTH';
export const SORT_NOTES = 'SORT_NOTES';
export const SORT_DATA = 'SORT_DATA';
export const NOTE_IDX = 'NOTE_IDX';
export const SORT_FALSE = 'SORT_FALSE';
export const SORT_TRUE = 'SORT_TRUE';
export const ARRAY_MOVE = 'ARRAY_MOVE';
export const SET_ID = 'SET_ID';

axios.defaults.withCredentials = true;

// export const authError = error => {
//   if (error)
//     return {
//       type: AUTHENTICATION_ERROR,
//       payload: error,
//     };
// };

/////////////////////////////////////////////////////////
// AJAX Actions
/////////////////////////////////////////////////////////

export const setId = id => {
  return {
    type: SET_ID,
    payload: id,
  };
};

export const getNotes = () => {
  return async dispatch => {
    const id = sessionStorage.getItem('id');
    try {
      const res = await axios.get(`/notes/${id}`);
      await dispatch({ type: GET_NOTES, payload: res.data.notes });
    } catch (error) {
      console.log({ err: 'There was an error loading your notes :(', error });
    }
  };
};

export const loginUser = (username, password, history) => {
  return async dispatch => {
    try {
      const res = await axios.post('/notes/login', { username, password });
      sessionStorage.setItem('id', res.data.userId);
      // await dispatch({ type: LOGIN });
      await history.push('/');
      await dispatch(getNotes());
    } catch (error) {
      console.log({ err: 'There was an error signing in ', error });
    }
  };
};

export const saveUser = (username, password, history) => {
  return async dispatch => {
    try {
      await axios.post('/notes/register', { username, password });
      const res = await axios.post('/notes/login', { username, password });
      await sessionStorage.setItem('id', res.data.userId);
      // await dispatch({ type: LOGIN });
      await history.push('/');
    } catch (error) {
      console.log({ err: 'There was an error signing up ', error });
    }
  };
};

export const createNote = inputNote => {
  return async dispatch => {
    try {
      await axios.post('/notes', inputNote);
      await dispatch(getNotes());
    } catch (error) {
      console.log({ err: 'There was an error loading your notes :(', error });
    }
  };
};

export const editNote = (editedNote, id) => {
  return async dispatch => {
    const notePackage = { editedNote, id };
    try {
      await axios.put('/notes', notePackage);
      await dispatch(getNotes());
    } catch (error) {
      console.log({ err: 'There was an error loading your notes :(', error });
    }
  };
};

export const deleteNote = inputId => {
  return async dispatch => {
    try {
      await axios.delete(`/notes/${inputId}`);
      dispatch(getNotes());
    } catch (error) {
      console.log({ err: 'There was an error loading your notes :(', error });
    }
  };
};

/////////////////////////////////////////////////////////////////////
// REG ACTIONS
/////////////////////////////////////////////////////////////////////

export const deAuth = () => {
  return {
    type: DEAUTH,
  };
};

export const updateSortedNotes = sortedNotes => {
  return {
    type: SORT_NOTES,
    payload: sortedNotes,
  };
};


export const handleIdx = inputID => {
  return (dispatch, getState) => {
    const state = getState().notes;
    state.forEach((note, i) => {
      if (note._id === inputID) {
        dispatch({ type: 'NOTE_IDX', payload: i });
      }
    });
  };
};

export const sortData = state => {
  return (dispatch, getState) => {
    const notes = [...state];
    const { sortedNotes } = getState();
    if (sortedNotes) {
      notes.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase());
      dispatch({ type: 'SORT_FALSE', payload: notes });
    } else {
      notes.sort((a, b) => a.date > b.date);
      dispatch({ type: 'SORT_TRUE', payload: notes });
    }
  };
};

export const onSortEnd = (orderList) => {
  return {
    type: 'ARRAY_MOVE',
    payload: orderList,
  };
};

