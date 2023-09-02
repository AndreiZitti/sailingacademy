import React, { useState,useContext } from 'react';
import './LoginPage.css';  // Importing a CSS file to style the components
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.js'; // replace this with the path to your firebase file
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '../../AuthContext'; // Path to your AuthContext


function SignInModal({ open, handleClose }) {
  const { setIsAuthenticated } = useContext(AuthContext); // Get setIsAuthenticated from context

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const handleSignIn = () => {
   
  //   createUserWithEmailAndPassword(auth, email, password)
  // .then((userCredential) => {
  //   // The user account has been created.
  //   var user = userCredential.user;
  //   console.log("User account created: ", user.uid);
  // })
  // .catch((error) => {
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   console.log("Error creating user: ", errorCode, errorMessage);
  // });
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        setIsAuthenticated(true);
        handleClose();
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  }

  // If modal is not open, don't render anything
  if (!open) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Sign In</h2>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleSignIn}>Sign In</button>
        <button onClick={handleClose}>Cancel</button>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='body'>
      <div>
      <h1>Welcome to the LoginPage!</h1>
      <button onClick={handleClickOpen}>Open Sign In</button>
      <SignInModal open={open} handleClose={handleClose} />
      </div>
    </div>
  );
}
