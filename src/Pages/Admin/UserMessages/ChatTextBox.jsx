import { SendOutlined } from '@ant-design/icons';
import { Button, Col, Input } from 'antd';
import Form from 'antd/lib/form/Form';
import React, { useState } from 'react';
import './styles/styleChatTextBox.scss';

function ChatTextBox(props) {
  const [chatText, setChatText] = useState('');

  const submitMessage = (e) => {
    console.log({ e });

    props.submitMessageFn(chatText);
    setChatText('');
    e.preventDefault();
  };

  return (
    <Col className="chatTextBoxContainer">
      <Form className="form-chat" onFinish={submitMessage}>
        <Input
          className="form-chat__input"
          value={chatText}
          onChange={(e) => setChatText(e.target.value)}
          placeholder="Type a message..."
          style={{ width: '50%' }}
        />
        <Button
          type="primary"
          onClick={submitMessage}
          disabled={!chatText}
          icon={<SendOutlined />}
        />
      </Form>
    </Col>
  );
}
export default ChatTextBox;
