import React from 'react';
import {
  createUser,
  signInUser,
  loginWithGoogle,
  loginWithFacebook,
  getVerification,
  isVerified,
  resetPassword,
  getCurrentUser,
  updatePassword,
  signInWithPhoneNumber,
} from '../Firebase/authMethods';

const AuthProvider = (props) => {
  return (
    <firebaseAuth.Provider
      value={{
        createUser,
        signInUser,
        signInWithPhoneNumber,
        loginWithFacebook,
        loginWithGoogle,
        getVerification,
        isVerified,
        resetPassword,
        getCurrentUser,
        updatePassword,
      }}
    >
      {props.children}
    </firebaseAuth.Provider>
  );
};

export default AuthProvider;
export const firebaseAuth = React.createContext();
