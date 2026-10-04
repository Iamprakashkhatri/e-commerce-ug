import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Input, message, notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  getBillingDetailsAction,
  updateBillingDetailsAction,
} from '../../../actions/userActions';

const ClientBilling = () => {
  const billingDetails = useSelector(
    (state) => state.billingDetails.billingDetails
  );
  const updateBillingMessage = useSelector((state) => state.updateBilling);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  console.log(updateBillingMessage);

  useEffect(() => {
    dispatch(getBillingDetailsAction());
  }, [dispatch]);

  console.log(billingDetails);
  useEffect(() => {
    if (updateBillingMessage.updateBilling) {
      if (updateBillingMessage.updateBilling.message !== undefined) {
        notification.success({
          message: updateBillingMessage.updateBilling.message,
        });
        updateBillingMessage.updateBilling = {};
      }
    }
    if (updateBillingMessage.error) {
      notification.error({ message: updateBillingMessage.error });
      updateBillingMessage.error = null;
    }
  }, [updateBillingMessage, form]);

  const [billingForm, setBillingForm] = useState({
    full_name: '',
    address: '',
    pan_number: '',
    state: '',
  });

  useEffect(() => {
    if (billingDetails !== undefined) {
      setBillingForm({
        full_name: billingDetails.full_name,
        address: billingDetails.address,
        pan_number: billingDetails.pan_number,
        state: billingDetails.state,
      });
      form.setFieldsValue({
        full_name: billingDetails.full_name,
        address: billingDetails.address,
        pan_number: billingDetails.pan_number,
        state: billingDetails.state,
      });
    }
  }, [billingDetails, form]);

  const editBilling = () => {
    // let formData = new FormData();
    // formData.append("full_name", billingForm.full_name);
    // formData.append("address", billingForm.address);
    // formData.append("pan_number", billingForm.pan_number);
    // formData.append("state", billingForm.state);
    dispatch(updateBillingDetailsAction(billingForm));
  };
  return (
    <Row gutter={[16, 16]}>
      <Col lg={24}>
        <Form
          name="global_state"
          style={{ flexDirection: 'column' }}
          layout="vertical"
          form={form}
          type="POST"
          //   fields={fields}
          onFinish={editBilling}
        >
          <Form.Item name="full_name" label="Full Name">
            <Input
              type="text"
              value={billingForm.full_name}
              onChange={(e) =>
                setBillingForm({
                  ...billingForm,
                  full_name: e.target.value,
                })
              }
            />
          </Form.Item>
          <Row gutter={[15, 0]}>
            <Col lg={12} xs={24} sm={24}>
              <Form.Item name="address" label="Address">
                <Input
                  type="text"
                  value={billingForm.address}
                  onChange={(e) =>
                    setBillingForm({
                      ...billingForm,
                      address: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </Col>
            <Col lg={12} sm={24} xs={24}>
              <Form.Item name="pan_number" label="Pan Number">
                <Input
                  type="text"
                  value={billingForm.pan_number}
                  onChange={(e) =>
                    setBillingForm({
                      ...billingForm,
                      pan_number: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="state" label="State">
            <Input
              type="text"
              value={billingForm.state}
              onChange={(e) =>
                setBillingForm({
                  ...billingForm,
                  state: e.target.value,
                })
              }
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
            >
              Update Billing Form
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default ClientBilling;
