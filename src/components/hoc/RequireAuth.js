// import React, { Component } from 'react';

// // OPTIONAL HOC Auth using sessions
// // //////////////////////////////////
// export default ComposedComponent => {
//   class RequireAuthentication extends Component {
//     componentWillMount() {
//       if (!sessionStorage.getItem('id')) this.props.history.push('/login');
//       // else this.props.setId(sessionStorage.getItem('id')); || this.setState({ id })
//     }

//     render() {
//       return (
//         <div>
//           {sessionStorage.getItem('id') && (
//             <ComposedComponent {...this.props} />
//           )}
//         </div>
//       );
//     }
//   }

//   return (null, { setId })(RequireAuthentication);
// };