import { HomeOutlined, SendOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Row,
  Typography,
  Tabs,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Dashboardcard } from './styles/Message';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import './styles/userMessages.scss';
import Admin from '../components';
import { Link } from 'react-router-dom';
import '../../../Firebase/firebaseIndex';

function Index() {
  // USER MESSAGES

  const { Text, Title } = Typography;
  const { TabPane } = Tabs;

  // const auth = firebase.auth();
  const firestore = firebase.firestore();

  function ChatRoom() {
    const currentUser = firebase.auth().currentUser;
    const [userData, setUserData] = useState({
      name: '',
      email: '',
      photoURL: '',
      uid: '',
      emailVerified: '',
    });

    if (currentUser != null) {
      userData.uid = currentUser.uid;
      userData.name = currentUser.displayName;
      userData.email = currentUser.email;
      userData.photoUrl = currentUser.photoURL;
      // emailVerified = user.emailVerified;
    }

    // useEffect(() => {
    //   axios.get(`${API}/account/get-profile/`)
    //     .then((res) => {
    //       console.log(res.data);
    //       setUserData({ ...userData, name: res.data.first_name + " " + res.data.last_name });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    // })

    console.log(userData);

    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, { idField: 'id' });
    console.log(messages);

    const [formValue, setFormValue] = useState('');

    const sendMessage = async () => {
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid: currentUser.uid,
        email: currentUser.email,
        photoURL: currentUser.photoURL,
      });

      setFormValue('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => dummy.current.scrollIntoView());

    return (
      <>
        <Col>
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

          <span ref={dummy}></span>
        </Col>
        <Form className="form-chat" onFinish={sendMessage}>
          <Input
            className="form-chat__input"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Type a message..."
          />
          <Button
            className="form-chat__btn"
            type="primary"
            htmlType="submit"
            onClick={sendMessage}
            disabled={!formValue}
            icon={<SendOutlined />}
          />
        </Form>
      </>
    );
  }

  function ChatMessage(props) {
    const { text } = props.message;

    // const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
      <>
        {' '}
        <Col className="message">
          <img
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
            }}
            src={
              'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg'
            }
            alt=""
          />
          <Title level={3} className="message-space">
            <Text className="message-text">{text}</Text>
          </Title>
        </Col>
        {/* for reply text */}
        <Col className="message reply">
          <Title level={3} className="message-space">
            <Text className="message-text">{text}</Text>
          </Title>
          <img
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
            }}
            src={
              'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg'
            }
            alt=""
          />
        </Col>
      </>
    );
  }

  return (
    <Admin>
      <Row
        style={{
          height: '67px',
          backgroundColor: '#FE6D04',
          position: 'relative',
          width: '100%',
          marginBottom: '-67px',
        }}
      />
      <Row
        style={{ width: '100%', padding: '8px 38px' }}
        justify="space-between"
        align="middle"
        gutter={[25, 30]}
      >
        <Col>
          <Title
            level={2}
            style={{
              color: '#fff',
            }}
          >
            User Messages
          </Title>
        </Col>
        <Col>
          <Breadcrumb separator="-">
            <Breadcrumb.Item>
              <Link to="/admin">
                <HomeOutlined /> Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>User Messages</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      <Row style={{ width: '100%', padding: '8px 38px' }} gutter={[25, 30]}>
        <Dashboardcard>
          <Tabs tabPosition="left">
            <TabPane tab="Ajay Karki" key="1">
              <ChatRoom id="messageBody" />
            </TabPane>
            <TabPane tab="Avinash" key="2">
              <ChatRoom />
            </TabPane>
            <TabPane tab="Hulululu" key="3">
              <ChatRoom />
            </TabPane>
          </Tabs>
        </Dashboardcard>
      </Row>
    </Admin>
  );
}

export default Index;
