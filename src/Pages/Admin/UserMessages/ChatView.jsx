import { Col, Row, Typography } from 'antd';
import React, { useRef } from 'react';
import './styles/styleChatView.scss';

function ChatView(props) {
  const { Text } = Typography;

  const { chat, user } = props;
  console.log('zxcv:', props);

  const dummy = useRef();

  // useEffect(() =>
  //     dummy.current.scrollIntoView("smooth")
  //     );

  if (chat.length === 0) {
    return (
      <Row className="content">
        <span ref={dummy}>
          Click on a user on the left panel to view a conversation.
        </span>
      </Row>
    );
  } else {
    return (
      <>
        <Col className="chatHeader">
          <Text style={{ color: 'white' }}>
            Your conversation with {chat[0].email}
          </Text>
        </Col>
        <Col className="content">
          {chat.map((msg, index) => {
            return (
              <div
                key={index}
                className={
                  msg.sender !== msg.email ? 'adminSent' : 'customerSent'
                }
              >
                <span ref={dummy}>{msg.text}</span>
              </div>
            );
          })}
        </Col>
      </>
    );
  }
}

export default ChatView;
