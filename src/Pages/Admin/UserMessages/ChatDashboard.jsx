import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ChatList from './ChatList';

import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import '../../../Firebase/firebaseIndex';
import ChatView from './ChatView';
import { Row } from 'antd';
import ChatTextBox from './ChatTextBox';

const auth = firebase.auth();
const firestore = firebase.firestore();

function ChatDashboard() {
  const history = useHistory();
  const [state, setState] = useState({
    selectedChat: null,
    newChatFormVisible: false,
    email: null,
    chats: [],
    users: [],
    selectedChats: [],
    loading: true,
  });

  const newChatButtonClicked = () => {
    setState({ ...state, newChatFormVisible: true, selectedChat: null });
  };

  const selectChat = (email) => {
    let currentChats = [];

    state.chats.map((val) => val.email === email && currentChats.push(val));

    console.log({ currentChats });
    currentChats.sort((a, b) => a.createdAt - b.createdAt);
    console.log({ currentChats });

    setState({ ...state, selectedChats: currentChats, selectedChat: email });
  };

  useEffect(
    () => {
      firebase.auth().onAuthStateChanged(async (usr) => {
        if (!usr) {
          history.push('/login');
        } else {
          firebase
            .firestore()
            .collection('messages')
            .onSnapshot(async (res) => {
              const chats = res.docs.map((doc) => doc.data());

              let users = [];

              chats.map((val) =>
                users.push({ email: val.email, profile_picture: val.photoURL })
              );

              users = users.filter(
                (user, index, self) =>
                  self.findIndex((t) => t.email === user.email) === index
              );

              console.log({ users });

              setState({
                ...state,
                email: usr.email,
                chats: chats,
                users: users,
                loading: false,
              });
            });
        }
      });
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  console.log(state.chats);

  const submitMessage = async (msg) => {
    console.log({ msg });

    const messagesRef = firestore.collection('messages');

    await messagesRef.add({
      text: msg,
      sender: state.email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      email: state.selectedChats[0].email,
      photoURL: state.selectedChats[0].photoURL,
    });
  };

  return (
    <Row style={{ width: '100%' }}>
      <ChatList
        history={history}
        newChatButtonClicked={newChatButtonClicked}
        selectChat={selectChat}
        chats={state.chats}
        userEmail={state.email}
        selectedChat={selectChat}
        users={state.users}
        loading={state.loading}
      />

      {state.newChatFormVisible ? null : (
        <ChatView user={state.email} chat={state.selectedChats} />
      )}

      {state.selectedChat !== null && state.newChatFormVisible !== null ? (
        <ChatTextBox submitMessageFn={submitMessage} />
      ) : null}
    </Row>
  );
}
export default ChatDashboard;
