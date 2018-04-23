import axios from 'axios';

export const LOGIN = 'LOGIN';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const GET_NOTES = 'GET_NOTES';

axios.defaults.withCredentials = true;

// export const authError = error => {
//   if (error)
//     return {
//       type: AUTHENTICATION_ERROR,
//       payload: error,
//     };
// };

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
      console.log('success');
      sessionStorage.setItem('id', res.data.userId);
      dispatch({ type: LOGIN });
      history.push('/');
      dispatch(getNotes);
    } catch (error) {
      console.log({ err: 'There was an error signing in ', error });
    }
  };
};