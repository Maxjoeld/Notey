import axios from 'axios';

export const LOGIN = 'LOGIN';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const GET_NOTES = 'GET_NOTES';
export const DEAUTH = 'DEAUTH';
export const SORT_NOTES = 'SORT_NOTES';
export const SORT_DATA = 'SORT_DATA';

axios.defaults.withCredentials = true;

// export const authError = error => {
//   if (error)
//     return {
//       type: AUTHENTICATION_ERROR,
//       payload: error,
//     };
// };

///////////////////////////////////////////
// AJAX Actions
///////////////////////////////////////////

export const getNotes = () => {
  return async dispatch => {
    const id = sessionStorage.getItem('id');
    try {
      const res = await axios.get(`/notes/${id}`);
      dispatch({ type: GET_NOTES, payload: res.data.notes });
      // await this.setState({ notes: res.data.notes });
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
      dispatch({ type: LOGIN });
      history.push('/');
      dispatch(getNotes());
    } catch (error) {
      console.log({ err: 'There was an error signing in ', error });
    }
  };
};

export const createNote = inputNote => {
  return async dispatch => {
    try {
      await axios.post('/notes', inputNote);
      dispatch(getNotes());
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
      dispatch(getNotes());
    } catch (error) {
      console.log({ err: 'There was an error loading your notes :(', error });
    }
  };
};

export const deleteNote = async inputId => {
  return async dispatch => {
    try {
      await axios.delete(`/notes/${inputId}`);
      dispatch(getNotes());
    } catch (error) {
      console.log({ err: 'There was an error loading your notes :(', error });
    }
  };
};

/////////////////////////////////////////////
// REG ACTIONS
/////////////////////////////////////////////

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

// export const sortData = state => {
//   return dispatch => {
//     const notes = [...state];
//     if (this.state.sortedNotes) {
//       notes.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase());
//       this.setState({ notes, sortedNotes: false });
//     } else {
//       this.setState({ notes, sortedNotes: true });
//     }
//   };
// };
