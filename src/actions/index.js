import axios from 'axios';

// export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
// import openSocket from 'socket.io-client';

// const socket = openSocket('http://localhost:8000');

export const DEAUTH = 'DEAUTH';
export const ISAUTH = 'ISAUTH';
export const ADMIN = 'ADMIN';

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
export const NEW_CONTACT = 'NEW_CONTACT';
export const EXISTING_CONTACT = 'EXISTING_CONTACT';
export const NEW_USER_NAME = 'NEW_USER_NAME';
export const CONTACT_NAME = 'CONTACT_NAME';
export const PROFILE = 'PROFILE';

axios.defaults.withCredentials = true;

// export const authError = error => {
//   if (error)
//     return {
//       type: AUTHENTICATION_ERROR,
//       payload: error,
//     };
// };
const URL = 'https://protected-cove-34559.herokuapp.com';
// const URL = 'http://localhost:5000';

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
export const getUsers = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`${URL}/notes/chat/allContacts`);
      console.log({ contacts: res.data });
      await dispatch({ type: GET_USERS, payload: res.data });
    } catch (error) {
      console.log({ err: 'There was an error loading your notes :(', error });
    }
  };
};

export const loadConvos = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`${URL}/notes/chat/getConversations`);
      console.log({ convossss: res.data });
      await dispatch({ type: GET_CONTACTS, payload: res.data.conversations });
    } catch (error) {
      console.log({ err: 'There was an error loading your notes :(', error });
    }
  };
};

export const getNotes = () => {
  return async dispatch => {
    const id = sessionStorage.getItem('id');
    try {
      const res = await axios.get(`${URL}/notes/${id}`);
      await dispatch({ type: GET_NOTES, payload: res.data.notes });
    } catch (error) {
      console.log({ err: 'There was an error loading your notes :(', error });
    }
  };
};
export const isAuthenticated = () => {
  return async dispatch => {
    try {
      // this will check if the route we're talking about is authenticated
      console.log('hey');
      const res = await axios.get(`${URL}/auth/isLogged`);
      await sessionStorage.setItem('id', res.data.user);
      console.log(res.data.user);
      await dispatch({ type: 'ISAUTH' });
      await dispatch({ type: 'PROFILE', payload: res.data.profile });
      await dispatch({ type: 'ADMIN', payload: `${res.data.profile.firstName } ${ res.data.profile.lastName}` });
      await dispatch(getNotes());
      await dispatch(getUsers());
      // await dispatch(loadConvos());
    } catch (error) {
      console.log(error);
      // return false;
    }
  };
};

export const logoutUser = history => {
  return async dispatch => {
    try {
      await axios.post(`${URL}/notes/logout`);
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
      const res = await axios.get(`${URL}/auth/google`);
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
      const res = await axios.post(`${URL}/notes/login`, { username, password });
      sessionStorage.setItem('id', res.data.userId);
      dispatch({ type: 'ISAUTH' });
      dispatch({ type: 'ADMIN', payload: res.data.user });
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

export const saveUser = (username, password, firstName, lastName, history) => {
  return async dispatch => {
    try {
      await axios.post(`${URL}/notes/register`, {
        username, password, firstName, lastName,
      });
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


export const createNote = inputNote => {
  return async dispatch => {
    try {
      await axios.post(`${URL}/notes`, inputNote);
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
      await axios.put(`${URL}/notes`, notePackage);
      await dispatch(getNotes());
    } catch (error) {
      console.log({ err: 'There was an error loading your notes :(', error });
    }
  };
};

export const deleteNote = inputId => {
  return async dispatch => {
    try {
      await axios.delete(`${URL}/notes/${inputId}`);
      dispatch(getNotes());
    } catch (error) {
      console.log({ err: 'There was an error loading your notes :(', error });
    }
  };
};

/////////////////////////////////////////////////////////////////////
// CHAT
/////////////////////////////////////////////////////////////////////
export const newContact = () => {
  return {
    type: NEW_CONTACT,
  };
};

export const existingContact = () => {
  return {
    type: EXISTING_CONTACT,
  };
};

export const getUserNames = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`${URL}/notes/chat/searchByUsername`);
      await dispatch({ type: GET_CONTACTS, payload: res.data.conversations });
    } catch (error) {
      console.log({ err: 'There was an error loading your notes :(', error });
    }
  };
};

export const loadNewUser = (recipient, message) => {
  return async dispatch => {
    try {
      console.log(recipient);
      const res = await axios.post(`${URL}/notes/chat/new/${recipient}`, message);
      await dispatch(loadConvos());
      await dispatch(existingContact());
    } catch (error) {
      console.log({ err: 'There was an error loading your notes :(', error });
    }
  };
};


export const getConversation = () => {
  return async (dispatch, getState) => {
    try {
      const { conversationId } = await getState().contact;
      const res = await axios.get(`${URL}/notes/chat/convo/${conversationId._id}`);
      console.log(res.data);
      dispatch({ type: 'GET_CONVERSATION', payload: res.data.conversation });
    } catch (error) {
      console.log({ err: 'Err receiving conversationId', error });
    }
  };
};

export const replyMessage = message => {
  return async (dispatch, getState) => {
    try {
      const { conversationId } = await getState().contact;
      await axios.post(`${URL}/notes/chat/reply/${conversationId._id}`, message);
      // socket.emit('new message');
      // socket.on('refresh messages', () => {
      await dispatch(getConversation());
      // });
    } catch (error) {
      console.log({ err: 'Err receiving conversationId', error });
    }
  };
};

export const handleContactIdx = (inputID, user) => {
  return async (dispatch, getState) => {
    await dispatch(existingContact());
    const { contacts } = getState();
    const { admin } = getState();
    contacts.forEach(async (contact, i) => {
      if (contact._id === inputID) {
        try {
          // socket.emit('leave conversation', contact.conversationId);
          await dispatch({ type: 'CONTACT_IDX', payload: i });
          await dispatch({ type: 'CONTACT_USER', payload: contact });
          await dispatch({ type: 'CONTACT_NAME', payload: user });
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
          await dispatch({ type: 'NEW_USER_NAME', payload: [user.firstName, user.lastName] });
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

export const onSortEnd = orderList => {
  return {
    type: 'ARRAY_MOVE',
    payload: orderList,
  };
};
