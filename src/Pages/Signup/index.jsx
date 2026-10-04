import React, { useContext, useEffect, useState } from 'react';
import LoginBg from '../../assets/Images/loginbg.png';
import SignupImage from '../../assets/Images/svg/RegisterPeoples@3X';
import { NavLink } from 'react-router-dom';
import { LoginPage } from '../Login/styles/login';
import {
  Row,
  Typography,
  Col,
  Form,
  Input,
  Button,
  Spin,
  Space,
  message,
  notification,
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Container } from '../../StyleGlobal/container.js';
import '../Login/styles/style.scss';
import useForm from '../../customHooks/useForm.js';
import validateSignUp from '../../Firebase/validateSignUp.js';
import { firebaseAuth } from '../../provider/AuthProvider';
import Axios from 'axios';
import { API } from '../../config';
import Navbar from '../../components/Navbar';
import app from 'firebase/app';
import OtpInput from 'react-otp-input';
import Modal from 'antd/lib/modal/Modal';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} />;

const { Title, Text } = Typography;

const Signup = (props) => {
  const { createUser, signInWithPhoneNumber } = useContext(firebaseAuth);

  const [showOtpModal, setShowOptModal] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpNumber, setOtpNumber] = useState('');

  useEffect(() => {
    window.recaptchaVerifier = new app.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: function (response) {
          console.log({ response });
          console.log('It works!');
        },
      }
    );
  }, []);

  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    var passwordValidationTest = true;

    console.log('signed up herexxxx');

    if (password.length < 8 || password.length > 20) {
      passwordValidationTest = false;
      errors.password = 'Password must be 8 to 20 characters';
      setErrors(errors);
      setValues({
        ...values,
        first_name,
        last_name,
        email,
        phone_no,
        password: '',
        confirm_password: '',
      });

      return;
    } else if (password !== confirm_password) {
      passwordValidationTest = false;
      errors.confirm_password = 'Password dont match';
      setErrors(errors);
      setValues({
        ...values,
        first_name,
        last_name,
        email,
        phone_no,
        password: '',
        confirm_password: '',
      });

      return;
    } else if (passwordValidationTest) {
      try {
        setLoading(true);

        const appVerifier = window.recaptchaVerifier;

        const response = await signInWithPhoneNumber(
          '+977' + phone_no,
          appVerifier
        );

        console.log({ response });

        setConfirmationResult(response);

        message.info(
          'A OTP Verification code has been sent to your phone number.'
        );

        setShowOptModal(true);
      } catch (error) {
        window.recaptchaVerifier.render().then(function (widgetId) {
          window.recaptchaVerifier.reset(widgetId);
        });

        setLoading(false);

        setErrors({
          ...errors,
          email: error.message,
        });
        // setValues({
        //   ...values,
        //   email: '',
        //   password: '',
        //   confirm_password: '',
        // });
      }
    }
  };

  const {
    values,
    handleChange,
    errors,
    handleSubmit,
    setValues,
    setErrors,
  } = useForm(handleSignUp, validateSignUp);

  const {
    first_name,
    last_name,
    email,
    phone_no,
    password,
    confirm_password,
  } = values;

  const finishOtp = () => {
    confirmationResult.confirm(otpNumber).then(async (result) => {
      console.log({ result });

      setShowOptModal(false);
      setOtpNumber('');

      try {
        const userDetails = await createUser(email, password);

        Axios.post(`${API}/account/register/`, {
          first_name: first_name,
          last_name: last_name,
          email: email,
          phone_no: phone_no,
          password: password,
          user_uuid: userDetails.user.uid,
        })
          .then((res) => {
            setLoading(false);

            notification.success({
              message: 'User registered successfully. Now you can login.',
            });

            props.history.replace('/login');
          })
          .catch((err) => {
            setLoading(false);

            setErrors({
              ...errors,
              phone_no: err.message,
            });
            setValues({
              ...values,
              phone: '',
            });
          });
      } catch (error) {
        setLoading(false);

        setErrors({
          ...errors,
          email: error.message,
        });
        setValues({
          ...values,
          email: '',
          password: '',
          confirm_password: '',
        });
      }
    });
  };

  const errorStyle = {
    color: '#f00',
    fontSize: '12px',
    margin: '5px 0px',
  };

  return (
    <div className="login_div">
      <Navbar />
      <LoginPage style={{ backgroundImage: `url(${LoginBg})` }}>
        <Container>
          <Row
            gutter={[20, 0]}
            align="middle"
            justify="center"
            style={{
              width: '100%',
            }}
            md={24}
          >
            <Col xl={8} lg={10} md={24} sm={24} xs={24}>
              <Title
                level={4}
                style={{
                  fontSize: '1.5em',
                  color: '#696969',
                  marginTop: '0px',
                }}
              >
                Welcome to{' '}
                <span style={{ fontWeight: '500' }}>ULTRA GROUP!</span>
              </Title>
              {/* <Title
                level={2}
                style={{
                  marginTop: '0',
                  fontSize: '1.5em',
                  fontWeight: '500',
                }}
              ></Title> */}
              <Text
                style={{
                  fontSize: '1.5em',
                  fontWeight: '500',
                }}
              >
                Register
              </Text>
              <Form
                style={{
                  marginTop: '1em',
                  flexDirection: 'column',
                }}
              >
                <Form.Item className="form-wrap">
                  <Input
                    placeholder="First Name"
                    className="form-input"
                    name="first_name"
                    value={first_name || ''}
                    onChange={handleChange}
                  />
                  {errors.first_name && (
                    <div style={errorStyle}>{errors.first_name}</div>
                  )}
                </Form.Item>
                <Form.Item className="form-wrap">
                  <Input
                    placeholder="Last Name"
                    className="form-input"
                    value={last_name || ''}
                    name="last_name"
                    onChange={handleChange}
                  />
                  {errors.last_name && (
                    <div style={errorStyle}>{errors.last_name}</div>
                  )}
                </Form.Item>
                <Form.Item className="form-wrap">
                  <Input
                    placeholder="Enter your Email"
                    className="form-input"
                    value={email || ''}
                    name="email"
                    onChange={handleChange}
                  />
                  {errors.email && <div style={errorStyle}>{errors.email}</div>}
                </Form.Item>
                <Form.Item className="form-wrap">
                  <Input.Password
                    placeholder="Enter your Password"
                    className="form-input"
                    value={password || ''}
                    name="password"
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <div style={errorStyle}>{errors.password}</div>
                  )}
                </Form.Item>
                <Form.Item className="form-wrap">
                  <Input.Password
                    placeholder="Re-enter your Password"
                    value={confirm_password || ''}
                    className="form-input"
                    name="confirm_password"
                    onChange={handleChange}
                  />
                  {errors.confirm_password && (
                    <div style={errorStyle}>{errors.confirm_password}</div>
                  )}
                </Form.Item>
                <Form.Item className="form-wrap">
                  <Input
                    type="number"
                    min={0}
                    placeholder="Phone No."
                    value={phone_no || ''}
                    style={{ width: '100%' }}
                    name="phone_no"
                    onChange={handleChange}
                    addonBefore="+977"
                    size="large"
                  />
                  {errors.phone_no && (
                    <div style={errorStyle}>{errors.phone_no}</div>
                  )}
                </Form.Item>
                <div id="recaptcha-container"></div>
                <Row
                  style={{
                    marginTop: '2em',
                  }}
                >
                  <Col lg={12} md={24} sm={24} xs={24} xl={24}>
                    <Form.Item>
                      <Button
                        onClick={handleSubmit}
                        type="primary"
                        className="btn-login"
                        disabled={loading}
                        style={{ borderRadius: '5px' }}
                      >
                        {loading && (
                          <Spin
                            indicator={antIcon}
                            style={{ marginRight: '10px', fontWeight: 600 }}
                          />
                        )}
                        Sign Up
                      </Button>
                      <Text
                        style={{
                          marginTop: '10px',
                          display: 'flex',
                          fontSize: '12.2px',
                        }}
                      >
                        By Clicking the 'Sign Up' button , you confirm that you
                        accept our
                      </Text>
                      <NavLink to="/terms">
                        <Button type="link">Terms of Use</Button>
                      </NavLink>
                      <Text>and</Text>
                      <NavLink to="/privacy-policy">
                        <Button type="link">Privacy Policy</Button>
                      </NavLink>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
              <Row style={{ margin: 0 }}>
                <Col lg={24} md={24} style={{ margin: 0 }}>
                  <Text
                    style={{
                      marginBottom: '1em',
                    }}
                  >
                    Already have an account?
                    <NavLink
                      to="/login"
                      style={{
                        marginLeft: '.4em',
                        color: '#000',
                        fontWeight: '500',
                      }}
                    >
                      Log in
                    </NavLink>
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col xl={16} lg={14} md={0} sm={0} xs={0}>
              <SignupImage
                style={{
                  height: '60vh',
                  width: '100%',
                  padding: '2em',
                }}
              />
            </Col>
          </Row>
          <Modal
            visible={showOtpModal}
            closable={false}
            title="Enter OTP"
            onOk={() => finishOtp()}
            onCancel={() => {
              message.error('Action cancelled by user');
              setShowOptModal(false);
              setLoading(false);
            }}
            okText="Submit"
          >
            <Row justify="center">
              <OtpInput
                numInputs={6}
                separator={<span>-</span>}
                inputStyle="inputStyle"
                value={otpNumber}
                onChange={(e) => setOtpNumber(e)}
              />
            </Row>
          </Modal>
        </Container>
      </LoginPage>
    </div>
  );
};

export default Signup;
