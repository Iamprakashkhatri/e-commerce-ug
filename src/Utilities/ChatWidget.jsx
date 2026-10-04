import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
// import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {
  addResponseMessage,
  Widget,
  addUserMessage,
  dropMessages,
} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import './styles/ChatWidget.css';
import '../Firebase/firebaseIndex';

const auth = firebase.auth();
const firestore = firebase.firestore();

const ChatWidget = () => {
  // const [user] = useAuthState(auth);

  const currentUser = firebase.auth().currentUser;
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    photoURL: '',
    uid: '',
    emailVerified: '',
  });

  const [state, setState] = useState({
    email: 'adminultragroup@gmail.com',
    message: null,
  });

  if (currentUser != null) {
    userData.uid = currentUser.uid;
    userData.name = currentUser.displayName;
    userData.email = currentUser.email;
    userData.photoUrl = currentUser.photoURL;
    // emailVerified = user.emailVerified;
  }

  const messagesRef = firestore.collection('messages');

  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  useEffect(() => {
    console.log({ messages });
    console.log({ currentUser });
    if (currentUser !== null) {
      messages &&
        messages.map(
          (msg) => msg.email === currentUser.email && ChatMessage(msg)
        );
    }

    return () => {
      dropMessages();
    };
  }, [messages, currentUser]);

  console.log(userData);

  const sendMessage = async (newMessage) => {
    const uid = auth.currentUser;
    // const photoURL = auth.currentUser;

    if (uid !== null) {
      await messagesRef.add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        sender: currentUser.email,
        uid: currentUser.uid,
        email: currentUser.email,
        photoURL: currentUser.photoURL,
      });
    }
  };

  // const buildDocKey = () => {
  //   return [firebase.auth().currentUser.email, state.email].sort().join(':');
  // };
  // const chatExists = async () => {
  //   const docKey = buildDocKey();

  //   const chat = await firebase
  //     .firestore()
  //     .collection('chats')
  //     .doc(docKey)
  //     .get();

  //   console.log(chat);
  //   return chat;
  // };

  // const submitMessage = async (e) => {
  //   const chatExists = await chatExists();
  //   chatExists ? goToChat() : createChat();
  // };

  // const createChat = () => {
  //   props.newChatSubmitFn({
  //     sendTo: state.email,
  //     message: state.message,
  //   });
  // };

  // const goToChat = () => {
  //   props.goToChatFn(buildDocKey(), state.message);
  // };

  function ChatMessage(props) {
    if (props.email === props.sender) {
      addUserMessage(props.text);
    } else {
      addResponseMessage(props.text);
    }

    // const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  }

  return (
    <>
      <Widget
        // handleNewUserMessage={submitMessage}
        title="Customer Chat"
        subtitle="Ask your questions"
        handleNewUserMessage={sendMessage}
      />
    </>
  );
};

export default ChatWidget;
