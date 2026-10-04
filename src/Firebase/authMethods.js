import './firebaseIndex';
import app from 'firebase/app';

const createUser = async (email, password) => {
  return await app.auth().createUserWithEmailAndPassword(email, password);
};

const signInUser = (email, password) => {
  return app.auth().signInWithEmailAndPassword(email, password);
};

const loginWithGoogle = () => {
  const provider = new app.auth.GoogleAuthProvider();
  return app.auth().signInWithPopup(provider);
};

const loginWithFacebook = () => {
  const provider = new app.auth.FacebookAuthProvider();

  return app.auth().signInWithPopup(provider);
};

const isVerified = () => {
  var user = app.auth().currentUser;
  return user.emailVerified;
};

const getCurrentUser = () => {
  return app.auth().currentUser;
};

const getVerification = () => {
  var user = app.auth().currentUser;

  user.sendEmailVerification();
};

const resetPassword = (email) => {
  return app.auth().sendPasswordResetEmail(email);
};

const updatePassword = (password) => {
  return app.auth().currentUser.updatePassword(password);
};

const signInWithPhoneNumber = (number, verifier) => {
  return app.auth().signInWithPhoneNumber(number, verifier);
};

export {
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
};
