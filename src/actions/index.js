import axios from 'axios';

// export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
// import openSocket from 'socket.io-client';

// const socket = openSocket('http://localhost:8000');

export const DEAUTH = 'DEAUTH';
export const ISAUTH = 'ISAUTH';

export const GET_NOTES = 'GET_NOTES';
export const SORT_NOTES = 'SORT_NOTES';
export const SORT_DATA = 'SORT_DATA';
export const NOTE_IDX = 'NOTE_IDX';
export const SORT_FALSE = 'SORT_FALSE';
export const SORT_TRUE = 'SORT_TRUE';
export const ARRAY_MOVE = 'ARRAY_MOVE';
export const SET_ID = 'SET_ID';

export const GET_CONTACTS = 'GET_CONTACTS';
export const CONTACT_IDX = 'CONTACT_IDX';
export const CONTACT_USER = 'CONTACT_USER';
export const GET_CONVERSATION = 'GET_CONVERSATION';
export const GET_USERS = 'GET_USERS';
export const USER = 'USER';
export const USER_IDX = 'USER_IDX';


axios.defaults.withCredentials = true;

// export const authError = error => {
//   if (error)
//     return {
//       type: AUTHENTICATION_ERROR,
//       payload: error,
//     };
// };

export const setId = id => {
  return {
    type: SET_ID,
    payload: id,
  };
};

//////////////////////////////////////////////////////////////////
// AUTH
/////////////////////////////////////////////////////////////////
export const deAuth = () => {
  return {
    type: DEAUTH,
  };
};

export const isAuthenticated = () => {
  return async dispatch => {
    try {
      // this will check if the route we're talking about is authenticated
      const res = await axios.get('/notes/isLogged');
      await sessionStorage.setItem('id', res.data.user);
      console.log(res.data.user);
      await dispatch({ type: 'ISAUTH' });
      // return true;
    } catch (error) {
      console.log(error);
      // return false;
    }
  };
};

export const logoutUser = (history) => {
  return async dispatch => {
    try {
      await axios.post('notes/logout');
      dispatch(deAuth());
      dispatch({ type: 'ISAUTH' });
      await sessionStorage.removeItem('id');
      await history.push('/login');
    } catch (err) {
      console.log(err);
    }
  };
};


export const loginGoogle = (username, password, history) => {
  return async dispatch => {
    try {
      const res = await axios.get('/auth/google');
      sessionStorage.setItem('id', res.session.userId);
      await history.push('/');
      await dispatch(getNotes());
    } catch (error) {
      console.log({ err: 'There was an error signing in ', error });
    }
  };
};

export const loginUser = (username, password, history) => {
  return async dispatch => {
    try {
      const res = await axios.post('/notes/login', { username, password });
      sessionStorage.setItem('id', res.data.userId);
      dispatch({ type: 'ISAUTH' });
      // await dispatch(isAuthenticated());
      await history.push('/');
      await dispatch(getNotes());
      await dispatch(getUsers());
      await dispatch(loadConvos());
    } catch (error) {
      console.log({ err: 'There was an error signing in ', error });
    }
  };
};

export const saveUser = (username, password, profile, history) => {
  return async dispatch => {
    try {
      await axios.post('/notes/register', { username, password, profile });
      const res = await axios.post('/notes/login', { username, password });
      await sessionStorage.setItem('id', res.data.userId);
      dispatch({ type: 'ISAUTH' });
      // await dispatch({ type: LOGIN });
      await history.push('/');
    } catch (error) {
      console.log({ err: 'There was an error signing up ', error });
    }
  };
};


//////////////////////////////////////////////////////////////////
// NOTES
/////////////////////////////////////////////////////////////////

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
// CHAT
/////////////////////////////////////////////////////////////////////

export const loadConvos = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/notes/chat/convo');
      await dispatch({ type: GET_CONTACTS, payload: res.data.conversations });
    } catch (error) {
      console.log({ err: 'There was an error loading your notes :(', error });
    }
  };
};

export const loadNewUser = (recipient, message) => {
  return async dispatch => {
    try {
      console.log(message);
      const res = await axios.post(`/notes/chat/new/${recipient}`, message);
      console.log(res.data);
      await dispatch(loadConvos());
    } catch (error) {
      console.log({ err: 'There was an error loading your notes :(', error });
    }
  };
};

export const getUsers = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/notes/chat/getchat');
      console.log(res.data[0]._id);
      await dispatch({ type: GET_USERS, payload: res.data });
    } catch (error) {
      console.log({ err: 'There was an error loading your notes :(', error });
    }
  };
};


export const getConversation = () => {
  return async (dispatch, getState) => {
    try {
      const { conversationId } = await getState().contact;
      const res = await axios.get(`/notes/chat/convo/${conversationId}`);
      console.log(res.data);
      dispatch({ type: 'GET_CONVERSATION', payload: res.data.conversation });
    } catch (error) {
      console.log({ err: 'Err receiving conversationId', error });
    }
  };
};

export const replyMessage = (message) => {
  return async (dispatch, getState) => {
    try {
      const { conversationId } = await getState().contact;
      await axios.post(`/notes/chat/reply/${conversationId}`, message);
      // socket.emit('new message');
      // socket.on('refresh messages', () => {
      await dispatch(getConversation());
      // });
    } catch (error) {
      console.log({ err: 'Err receiving conversationId', error });
    }
  };
};

export const handleContactIdx = inputID => {
  return async (dispatch, getState) => {
    const state = getState().contacts;
    state.forEach(async (contact, i) => {
      if (contact._id === inputID) {
        try {
          // socket.emit('leave conversation', contact.conversationId);
          await dispatch({ type: 'CONTACT_IDX', payload: i });
          await dispatch({ type: 'CONTACT_USER', payload: contact });
          await dispatch(getConversation());
          // socket.emit('enter conversation', contact.conversationId);
        } catch (error) {
          console.log({ err: 'Err receiving conversationId', error });
        }
      }
    });
  };
};

export const handleNewUserIdx = inputID => {
  return async (dispatch, getState) => {
    const { users } = getState();
    users.forEach(async (user, i) => {
      if (user._id === inputID) {
        try {
          // socket.emit('leave conversation', user.conversationId);
          await dispatch({ type: 'USER_IDX', payload: i });
          await dispatch({ type: 'USER', payload: user });
          // socket.emit('enter conversation', contact.conversationId);
        } catch (error) {
          console.log({ err: 'Err receiving user Information', error });
        }
      }
    });
  };
};
/////////////////////////////////////////////////////////////////////
// SORT/HANDLING NOTES
/////////////////////////////////////////////////////////////////////


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

