import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, List, Row, Space, Spin, Typography } from 'antd';
import React from 'react';
import './styles/styleChatList.scss';

function ChatList(props) {
  // const newChat = () => {
  //     console.log("new chat clicked")
  // }

  const selectChat = (user) => {
    console.log('Select user', user);
    props.selectedChat(user);
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 44 }} spin />;

  if (props.chats.length > 0) {
    return (
      <>
        <Col className="root">
          <Row style={{ padding: 10 }}>
            <Button type="primary" href="/">
              Back to Ultraestore
            </Button>
          </Row>
          <List>
            {!props.loading ? (
              props.users.map((user, index) => {
                return (
                  <Col key={index}>
                    <List.Item
                      onClick={() => selectChat(user.email)}
                      className="listItem"
                      selected={props.selectedChatIndex === index}
                    >
                      <Avatar
                        style={{
                          backgroundColor: '#87d068',
                          marginRight: '5px',
                          marginLeft: '5px',
                        }}
                        src={user.profile_picture}
                        icon={<UserOutlined />}
                      />

                      <Typography.Text>{user.email}</Typography.Text>
                    </List.Item>
                  </Col>
                );
              })
            ) : (
              <span style={{ padding: 20, marginTop: '20px' }}>
                <Spin indicator={antIcon} style={{ marginTop: '20px' }} />
              </span>
            )}
          </List>
        </Col>
      </>
    );
  } else {
    return (
      <Row className="root">
        <List>
          <span style={{ padding: 20, marginTop: '20px' }}>
            <Spin indicator={antIcon} style={{ marginTop: '20px' }} />
          </span>
        </List>
      </Row>
    );
  }
}
export default ChatList;
