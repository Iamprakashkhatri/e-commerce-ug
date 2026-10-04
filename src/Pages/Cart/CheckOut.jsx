import {
  Affix,
  Button,
  Col,
  Divider,
  Form,
  Input,
  List,
  notification,
  Row,
  Select,
  Space,
  Spin,
  Typography,
} from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import Axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkoutAction } from '../../actions/orderActions';
import { getBillingDetailsAction } from '../../actions/userActions';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { API } from '../../config';
import { Container } from '../../StyleGlobal/container';
import './style/cart.scss';

export default function CheckOut(props) {
  const [redirect, setRedirect] = useState(false);
  const { Text, Paragraph, Title } = Typography;
  const { Option } = Select;
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const finalCart = props.location.finalCart;
  const currentCart = props.location.currentCart;
  const amount = parseFloat(props.location.amount);
  const vat_amount = parseFloat(props.location.vat_amount);
  const amount_with_vat = parseFloat(props.location.amount_with_vat);
  const user = useSelector((state) => state.userInfo);
  const { userInfo } = user;

  const checkoutMessage = useSelector((state) => state.checkout);

  const [pos, setPos] = useState(true);
  const [footerHeight, setFooterHeight] = useState(0);

  const trackScrolling = () => {
    try {
      const wrappedElement = document.getElementById('footerparent');


      let wrappedElementTop = wrappedElement.getBoundingClientRect().top;
      setFooterHeight(window.scrollY - wrappedElement.offsetHeight + (window.innerHeight - 700));


      if (
        window.scrollY + (window.innerHeight - wrappedElementTop) + 500 <
        wrappedElementTop + window.scrollY
      ) {
        setPos(true);
      } else {
        setPos(false);
      }

      console.log({ scrollY: window.scrollY });
      console.log({ innerHeight: window.innerHeight });
      console.log({ wrappedElementTop });
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', trackScrolling);

    return () => {
      document.removeEventListener('scroll', trackScrolling);
    };
  }, []);

  useEffect(() => {
    dispatch(getBillingDetailsAction());
  }, [dispatch]);

  useEffect(() => {
    if (checkoutMessage.checkout) {
      if (checkoutMessage.checkout.message !== undefined) {
        notification.success({ message: checkoutMessage.checkout.message });
        checkoutMessage.checkout = {};
      }
    }
    if (checkoutMessage.error) {
      notification.error({ message: checkoutMessage.error });
      checkoutMessage.error = null;
    }
  }, [checkoutMessage]);

  let charge = 0;
  const awc = amount + charge;
  const [orderData, setOrderData] = useState({
    merchant_name: '',
    amount: amount,
    amount_with_charge: awc,
    vat_amount: vat_amount !== undefined && parseFloat(vat_amount.toFixed(2)),
    amount_with_vat:
      amount_with_vat !== undefined && parseFloat(amount_with_vat.toFixed(2)),
    is_guest: false,
    orderItems: finalCart,
    shipping: {
      email: '',
      full_name: '',
      phone_number: '',
      company_name: '',
      street_address: '',
      city: '',
      state: '',
      postal_code: '',
    },
    billing: {
      full_name: '',
      address: '',
      pan_number: '',
      state: '',
    },
  });

  const [loading, setLoading] = useState(true);
  const breakpoint = useBreakpoint();

  // async function fetchShippingData() {
  //   await Axios.get(`${API}/account/shipping/`, {
  //     headers: { Authorization: "JWT " + userInfo.token },
  //   })
  //     .then((res) => {
  //       setOrderData({
  //         ...orderData,
  //         shipping: {
  //           ...orderData.shipping,
  //           full_name: res.data.full_name,
  //           email: res.data.email,
  //           phone_number: res.data.phone_number,
  //           company_name: res.data.company_name,
  //           postal_code: res.data.postal_code,
  //           state: res.data.state,
  //           street_address: res.data.street_address,
  //           city: res.data.city,
  //         },
  //       });
  //       setLoading(false);
  //       form.setFieldsValue({
  //         full_name: res.data.full_name,
  //         email: res.data.email,
  //         phone_number: res.data.phone_number,
  //         company_name: res.data.company_name,
  //         postal_code: res.data.postal_code,
  //         state: res.data.state,
  //         street_address: res.data.street_address,
  //         city: res.data.city,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  async function callBoth() {
    let billingData = null;

    try {
      billingData = await Axios.get(`${API}/account/billing/`, {
        headers: { Authorization: 'JWT ' + userInfo.token },
      });

      console.log({ billingData });

      form.setFieldsValue({
        billing_full_name: billingData.data.full_name,
        billing_address: billingData.data.address,
        pan_number: billingData.data.pan_number,
        billing_state: billingData.data.state,
      });
    } catch (error) {
      console.log({ error });
    }

    try {
      let shippingData = await Axios.get(`${API}/account/shipping/`, {
        headers: { Authorization: 'JWT ' + userInfo.token },
      });

      console.log(JSON.stringify({ orderData }));
      console.log({ shippingData });

      setOrderData({
        ...orderData,
        billing: {
          ...orderData.billing,
          full_name: billingData.data.full_name,
          address: billingData.data.address,
          pan_number: billingData.data.pan_number,
          state: billingData.data.state,
        },
        shipping: {
          ...orderData.shipping,
          full_name: shippingData.data.full_name,
          email: shippingData.data.email,
          phone_number: shippingData.data.phone_number,
          company_name: shippingData.data.company_name,
          postal_code: shippingData.data.postal_code,
          state: shippingData.data.state,
          street_address: shippingData.data.street_address,
          city: shippingData.data.city,
        },
      });
      setLoading(false);
      form.setFieldsValue({
        full_name: shippingData.data.full_name,
        email: shippingData.data.email,
        phone_number: shippingData.data.phone_number,
        company_name: shippingData.data.company_name,
        postal_code: shippingData.data.postal_code,
        state: shippingData.data.state,
        street_address: shippingData.data.street_address,
        city: shippingData.data.city,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (amount === 0) {
      setDisabled(true);
    }
    if (userInfo && userInfo.token) {
      callBoth();
    }
    // eslint-disable-next-line
  }, [userInfo, form]);
  // useEffect(() => {

  // }, [billingDetails, form]);

  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'NPR',
    }).format(value);

  const handleFullNameChange = (e) => {
    setOrderData({
      ...orderData,
      shipping: {
        ...orderData.shipping,
        full_name: e.target.value,
      },
    });
  };

  const handleEmailChange = (e) => {
    setOrderData({
      ...orderData,
      shipping: {
        ...orderData.shipping,
        email: e.target.value,
      },
    });
  };

  const handlePhoneNumberChange = (e) => {
    setOrderData({
      ...orderData,
      shipping: {
        ...orderData.shipping,
        phone_number: e.target.value,
      },
    });
  };

  const handleCompanyNameChange = (e) => {
    setOrderData({
      ...orderData,
      shipping: {
        ...orderData.shipping,
        company_name: e.target.value,
      },
    });
  };

  const handleStreetAddressChange = (e) => {
    setOrderData({
      ...orderData,
      shipping: {
        ...orderData.shipping,
        street_address: e.target.value,
      },
    });
  };

  const ConfirmComponent = () => (
    <>
      <Spin spinning={loading}>
        <Row
          style={{
            backgroundColor: '#f0f0f0',
          }}
        >
          <Col xs={24} xl={24} style={{ padding: '20px' }}>
            <Text
              strong
              style={{
                marginTop: '5px',
                fontSize: '20px',
                fontWeight: '900',
                color: '#8c8c8c',
              }}
            >
              Summary
            </Text>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={{ paddingLeft: '20px', paddingRight: '20px' }}
          >
            <Space direction="vertical" size="middle">
              <Paragraph>
                <Text style={{ color: '#8c8c8c' }} strong>
                  Total Order:{' '}
                </Text>
              </Paragraph>
              {/* <Paragraph>
          <Text style={{ color: '#8c8c8c' }} strong>
            Vat Amount:{' '}
          </Text>
        </Paragraph> */}
            </Space>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={{
              paddingLeft: '20px',
              paddingRight: '20px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Space direction="vertical" size="middle">
              <Paragraph
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Text style={{ color: '#8c8c8c' }} strong>
                  {numberFormat(orderData.amount)}
                </Text>
              </Paragraph>
              {/* <Paragraph
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Text style={{ color: '#8c8c8c' }} strong>
            {numberFormat(orderData.vat_amount)}
          </Text>
        </Paragraph> */}
            </Space>
          </Col>

          <Divider className="dotted-line" />
          <Col xs={24} xl={24}>
            <Row width="100%">
              <Col xs={12} xl={12} style={{ paddingLeft: '20px' }}>
                <Paragraph>
                  {' '}
                  <Text style={{ fontSize: '20px' }} strong>
                    Total
                  </Text>
                </Paragraph>
              </Col>
              <Col
                xs={12}
                xl={12}
                style={{
                  paddingRight: '20px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Paragraph>
                  {' '}
                  <Text style={{ fontSize: '20px' }} strong>
                    {numberFormat(orderData.amount_with_vat)}
                  </Text>
                </Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>
      </Spin>
      <Row style={{ width: '100%', marginTop: '20px' }}>
        <Col xs={24} lg={24}>
          <Form.Item
            name="merchant_name"
            label="Payment Method"
            rules={[
              {
                required: true,
                message: 'Please select payment method',
              },
            ]}
          >
            <Select
              placeholder="Payment Method"
              style={{ width: '100%' }}
              onChange={handlePaymentMethodChange}
            >
              <Option value="cod">Cash on Delivery</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24} xl={24}>
          <Button
            type="default"
            htmlType="submit"
            style={{
              marginTop: '10px',
              width: '100%',
              background: '#FE6D04',
              color: '#fff',
              fontWeight: '500',
              fontSize: '18px',
              height: '45px',
              border: 'none',
            }}
            disabled={disabled}
          >
            Confirm Payment
          </Button>
        </Col>
      </Row>
    </>
  );

  // const handleCountryChange = (e) => {
  //   setOrderData({
  //     ...orderData,
  //     shipping: {
  //       ...orderData.shipping,
  //       country: e.target.value,
  //     },
  //   });
  // };
  const handleCityChange = (e) => {
    setOrderData({
      ...orderData,
      shipping: {
        ...orderData.shipping,
        city: e.target.value,
      },
    });
  };
  const handleStateChange = (e) => {
    setOrderData({
      ...orderData,
      shipping: {
        ...orderData.shipping,
        state: e.target.value,
      },
    });
  };
  const handlePostalCodeChange = (e) => {
    setOrderData({
      ...orderData,
      shipping: {
        ...orderData.shipping,
        postal_code: e.target.value,
      },
    });
  };
  const handlePaymentMethodChange = (value) => {
    setOrderData({
      ...orderData,
      merchant_name: value,
    });
  };

  const handleBillingFullNameChange = (e) => {
    setOrderData({
      ...orderData,
      billing: {
        ...orderData.billing,
        full_name: e.target.value,
      },
    });
  };

  const handleBillingAddressChange = (e) => {
    setOrderData({
      ...orderData,
      billing: {
        ...orderData.billing,
        address: e.target.value,
      },
    });
  };

  const handleBillingPanNumberChange = (e) => {
    setOrderData({
      ...orderData,
      billing: {
        ...orderData.billing,
        pan_number: e.target.value,
      },
    });
  };

  const handleBillingStateChange = (e) => {
    setOrderData({
      ...orderData,
      billing: {
        ...orderData.billing,
        state: e.target.value,
      },
    });
  };

  const redirectToPage = () => setRedirect(true);

  console.log(orderData);
  const confirmPayment = () => {
    redirectToPage();
    dispatch(checkoutAction(orderData));
    form.resetFields();
    localStorage.removeItem('cartItems');
  };

  return (
    <>
      {redirect && (
        <Fragment>
          <Redirect to="/thankyou" />
        </Fragment>
      )}
      <Navbar />

      {currentCart === undefined ? (
        <Redirect to="/cart" />
      ) : (
        <Container>
          <Title
            strong
            style={{
              fontSize: '36px',
              fontWeight: '900',
              textShadow: '0px 1px, 1px 0px, 1px 1px',
              margin: '2rem 0 1rem 0',
            }}
          >
            Checkout
          </Title>
          <Form form={form} layout="vertical" onFinish={confirmPayment}>
            <Row
              style={{ width: '100%', marginBottom: '20px' }}
              gutter={[{ xs: 0, lg: 60 }, 0]}
            >
              <Col xs={24} lg={16}>
                <Title level={4}>Shipping Info</Title>
              </Col>
              <Col xs={14} lg={14}>
                <Row style={{ width: '100%' }} gutter={[8, 0]}>
                  <Col xs={24} lg={12}>
                    <Form.Item
                      name="full_name"
                      label="Full Name"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter full name',
                        },
                      ]}
                    >
                      <Input
                        value={orderData.shipping.full_name}
                        onChange={handleFullNameChange}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        {
                          required: true,
                          type: 'email',
                          message: 'Please enter email',
                        },
                      ]}
                    >
                      <Input
                        value={orderData.shipping.email}
                        onChange={handleEmailChange}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item
                      name="phone_number"
                      label="Phone Number"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter phone number',
                        },
                      ]}
                    >
                      <Input
                        value={orderData.shipping.phone_number}
                        onChange={handlePhoneNumberChange}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={12} lg={12}>
                    <Form.Item name="company_name" label="Company Name">
                      <Input
                        value={orderData.shipping.company_name}
                        onChange={handleCompanyNameChange}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={12} lg={12}>
                    <Form.Item
                      name="street_address"
                      label="Street Address"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter street address',
                        },
                      ]}
                    >
                      <Input
                        value={orderData.shipping.street_adress}
                        onChange={handleStreetAddressChange}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={12}>
                    <Form.Item
                      name="city"
                      label="City"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter city',
                        },
                      ]}
                    >
                      <Input
                        value={orderData.shipping.city}
                        onChange={handleCityChange}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={12}>
                    <Form.Item
                      name="state"
                      label="Province"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter state',
                        },
                      ]}
                    >
                      <Input
                        value={orderData.shipping.state}
                        onChange={handleStateChange}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={12}>
                    <Form.Item
                      name="postal_code"
                      label="Postal Code"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter phone number',
                        },
                      ]}
                    >
                      <Input
                        value={orderData.shipping.postal_code}
                        onChange={handlePostalCodeChange}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row style={{ width: '100%' }}>
                  <Col xs={24} lg={24}>
                    <Title level={4}>Billing</Title>
                  </Col>
                  <Row style={{ width: '100%' }} gutter={[8, 0]}>
                    <Col xs={24} lg={12}>
                      <Form.Item
                        name="billing_full_name"
                        label="Billing Full Name"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter billing full name',
                          },
                        ]}
                      >
                        <Input
                          value={orderData.billing.full_name}
                          onChange={handleBillingFullNameChange}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                      <Form.Item
                        name="billing_address"
                        label="Billing Address"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter billing address',
                          },
                        ]}
                      >
                        <Input
                          value={orderData.billing.address}
                          onChange={handleBillingAddressChange}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                      <Form.Item
                        name="pan_number"
                        label="Pan Number"
                        rules={[
                          {
                            required: false,
                            message: 'Please enter pan number',
                          },
                        ]}
                      >
                        <Input
                          value={orderData.billing.pan}
                          onChange={handleBillingPanNumberChange}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                      <Form.Item
                        name="billing_state"
                        label="Billing Province"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter billing state',
                          },
                        ]}
                      >
                        <Input
                          value={orderData.billing.state}
                          onChange={handleBillingStateChange}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Row>

                <Row style={{ width: '100%' }}>
                  <Col xs={24} sm={24} md={24} lg={14} xl={16}>
                    <Title level={4}>Items</Title>
                    <List itemLayout="horizontal" className="mobilescroll">
                      {currentCart !== undefined &&
                        currentCart.map((product, index) => (
                          <div key={index}>
                            <Row
                              align="middle"
                              gutter={[10, 10]}
                              justify="space-between"
                              className="mobilewidth"
                            >
                              <img
                                src={product.image}
                                style={{ height: breakpoint.lg ? '200px' : '100px' }}
                                alt="cart product"
                              />

                              <Title
                                className="checkout-product-name"
                                level={5}
                                ellipsis={{ rows: 2 }}
                              >
                                {product.name}
                              </Title>
                              <Space direction="horizontal" size="small">
                                <Text>Quantity:</Text>

                                <Text className="checkout-product-quantity">
                                  {product.quantity}
                                </Text>
                              </Space>
                              <Text className="checkout-product-price">
                                {numberFormat(product.productTotal)}
                              </Text>
                            </Row>
                            <Divider />
                          </div>
                        ))}
                    </List>
                  </Col>
                </Row>
              </Col>
              <Col
                xs={14}
                sm={14}
                md={14}
                lg={8}
                xl={8}
                style={{
                  paddingLeft: 0,
                  paddingRight: 0,
                  position: breakpoint.md || breakpoint.lg ? 'fixed' : 'unset',
                  right: breakpoint.md || breakpoint.lg ? '100px' : '100px',
                  bottom: pos ? 'unset' : footerHeight,
                  zIndex: 10,
                }}
              >

                {pos ? (


                  <Affix offsetTop={170}>
                    <ConfirmComponent />
                  </Affix>

                ) : (

                  <ConfirmComponent />

                )}
              </Col>
            </Row>
          </Form>
        </Container>
      )}
      <Footer />
    </>
  );
}
