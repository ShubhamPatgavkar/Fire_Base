// src/components/Auth.js
import React, { useState } from 'react';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword ,signInWithPopup,signOut} from 'firebase/auth';
import { googleProvider } from '../config/firebase';


const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log(auth?.currentUser?.email);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Signed in successfully');
    } catch (error) {
      alert(error.message);
    }
  };


  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth,googleProvider);
      alert('Signed in successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      alert('Signed Out successfully');
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <div className='Auth'>
      <input
        type="email"
        placeholder='Enter Email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder='Enter Password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};

export default Auth;
