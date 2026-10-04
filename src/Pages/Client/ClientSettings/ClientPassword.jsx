import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Form, Input, Button, notification } from 'antd';
import { firebaseAuth } from '../../../provider/AuthProvider';

const ClientPassword = () => {
  const { getCurrentUser, updatePassword } = useContext(firebaseAuth);

  const changePassword = async (values) => {
    const user = await getCurrentUser();

    if (user) {
      if (values.password === values.confirmpassword) {
        try {
          const res = await updatePassword(values.password);

          notification.success({
            message: 'Password changed successfully',
          });
        } catch (error) {
          notification.error({
            message: error.message,
          });
        }
      } else {
        notification.error({
          message: 'Passwords do not match',
        });
      }
    } else {
      notification.error({
        message: 'You should be recently signed in to change the password.',
      });
    }
  };

  return (
    <Row gutter={[25, 30]}>
      <Col>
        <Form
          name="global_state"
          style={{ flexDirection: 'column' }}
          layout="vertical"
          onFinish={changePassword}
        >
          {/* <Form.Item name="" label="Current Password">
            <Input
              type="text"
              id="current"
              placeholder="Enter your Current Password"
            />
          </Form.Item> */}
          <Form.Item
            name="password"
            label="New Password"
            rules={[{ required: true }]}
          >
            <Input
              type="password"
              id="new"
              placeholder="Enter your New Password"
            />
          </Form.Item>
          <Form.Item
            name="confirmpassword"
            label="Re-Enter New Password"
            rules={[{ required: true }]}
          >
            <Input
              type="password"
              id="confirm"
              placeholder="Re-Enter your New Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{
                width: '100%',
                background: '#FE6D04',
                borderColor: '#FE6D04',
              }}
            // loading={loading}
            >
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default ClientPassword;
