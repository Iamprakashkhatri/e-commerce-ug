import { Form, Row, Col, Input, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { API } from '../../../config';
import { updateShippingDetails } from '../../../actions/userActions';

const ShippingForm = () => {
  const user = useSelector((state) => state.userInfo);
  const { userInfo } = user;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchShipping() {
      await Axios.get(`${API}/account/shipping/`, {
        headers: { Authorization: 'JWT ' + userInfo.token },
      })
        .then((res) => {
          setShippingForm({
            ...shippingForm,
            ...res.data,
          });
          form.setFieldsValue({
            email: res.data.email,
            full_name: res.data.full_name,
            company_name: res.data.company_name,
            street_address: res.data.street_address,
            phone_number: res.data.phone_number,
            city: res.data.city,
            state: res.data.state,
            postal_code: res.data.postal_code,
          });
        })
        .catch((err) => { });
    }
    fetchShipping();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, userInfo]);

  const [shippingForm, setShippingForm] = useState({
    email: '',
    full_name: '',
    phone_number: '',
    company_name: '',
    country: '',
    street_address: '',
    city: '',
    state: '',
    postal_code: '',
  });

  const editShipping = () => {
    let updateShippingFormData = new FormData();
    updateShippingFormData.append('email', shippingForm.email);
    updateShippingFormData.append('full_name', shippingForm.full_name);
    updateShippingFormData.append('company_name', shippingForm.company_name);
    updateShippingFormData.append('country', shippingForm.country);
    updateShippingFormData.append('phone_number', shippingForm.phone_number);
    updateShippingFormData.append(
      'street_address',
      shippingForm.street_address
    );
    updateShippingFormData.append('city', shippingForm.city);
    updateShippingFormData.append('state', shippingForm.state);
    updateShippingFormData.append('postal_code', shippingForm.postal_code);
    dispatch(updateShippingDetails(updateShippingFormData));
  };

  return (
    <Col lg={18}>
      <Form
        name="global_state"
        style={{ flexDirection: 'column' }}
        layout="vertical"
        form={form}
        type="POST"
        onFinish={editShipping}
      >
        <Form.Item name="full_name" label="Full Name">
          <Input
            type="text"
            value={shippingForm.full_name}
            onChange={(e) =>
              setShippingForm({
                ...shippingForm,
                full_name: e.target.value,
              })
            }
          />
        </Form.Item>
        <Row gutter={[15, 0]}>
          <Col lg={12}>
            <Form.Item name="email" label="Email">
              <Input
                type="text"
                value={shippingForm.email}
                onChange={(e) =>
                  setShippingForm({
                    ...shippingForm,
                    email: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item name="company_name" label="Company Name">
              <Input
                type="text"
                value={shippingForm.company_name}
                onChange={(e) =>
                  setShippingForm({
                    ...shippingForm,
                    company_name: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="phone_number" label="Phone Number">
          <Input
            type="text"
            value={shippingForm.phone_number}
            onChange={(e) =>
              setShippingForm({
                ...shippingForm,
                phone_number: e.target.value,
              })
            }
          />
        </Form.Item>
        <Form.Item name="street_address" label="Street Address">
          <Input
            type="text"
            value={shippingForm.street_address}
            onChange={(e) =>
              setShippingForm({
                ...shippingForm,
                street_address: e.target.value,
              })
            }
          />
        </Form.Item>
        <Row gutter={[15, 0]}>
          <Col lg={8}>
            <Form.Item name="city" label="City">
              <Input
                type="text"
                value={shippingForm.city}
                onChange={(e) =>
                  setShippingForm({
                    ...shippingForm,
                    city: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item name="state" label="State">
              <Input
                type="text"
                value={shippingForm.state}
                onChange={(e) =>
                  setShippingForm({
                    ...shippingForm,
                    state: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item name="postal_code" label="Postal Code">
              <Input
                type="text"
                value={shippingForm.postal_code}
                onChange={(e) =>
                  setShippingForm({
                    ...shippingForm,
                    postal_code: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Col>
        </Row>
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
            Update Shipping Form
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
};

export default ShippingForm;
