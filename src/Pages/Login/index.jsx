import React, { useContext, useState } from 'react';
import { LoginPage } from './styles/login';
import LoginBg from '../../assets/Images/loginbg.png';
import LoginPeople from '../../assets/Images/svg/Loginpeople';
import { NavLink } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import {
  Row,
  Typography,
  Col,
  Form,
  Input,
  Button,
  Divider,
  Checkbox,
  Spin,
} from 'antd';
import { Container } from '../../StyleGlobal/container';
import './styles/style.scss';
import useForm from '../../customHooks/useForm.js';
import { firebaseAuth } from '../../provider/AuthProvider';
import validateLogin from '../../Firebase/validateLogIn';
import Navbar from '../../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, socialSignIn } from '../../actions/userActions';
import { SET_USER_VERIFIED } from '../../constants/userConstants';
import { useHistory } from 'react-router-dom';
const { Title, Text } = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} />;

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [fbLoading, setfbLoading] = useState(false);
  const [googleLoading, setgoogleLoading] = useState(false);

  const { signInUser, loginWithFacebook, loginWithGoogle } = useContext(
    firebaseAuth
  );
  const [rememberMe, setRememberMe] = useState(false);

  const history = useHistory();

  const dispatch = useDispatch();

  const errorStyle = {
    color: '#f00',
    fontSize: '12px',
    margin: '5px 0px',
  };

  const handleLoginWithEmail = async () => {
    try {
      setLoading(true);
      const loginVal = await signInUser(email, password);
      dispatch({
        type: SET_USER_VERIFIED,
        payload: true,
      });

      // if (loginVal.user.emailVerified) {
      //   dispatch(signIn(loginVal.user.uid, rememberMe, history));
      // }
      // else {
      //   props.history.push('/verifyFirst');
      // }

      dispatch(signIn(loginVal.user.uid, rememberMe, history));
    } catch (error) {
      setErrors({ ...errors, email: error.message });
    }
    setLoading(false);
  };

  const googleLogin = async () => {
    try {
      setgoogleLoading(true);
      const result = await loginWithGoogle();
      let user = {
        first_name: result.additionalUserInfo.profile.given_name,
        last_name: result.additionalUserInfo.profile.family_name,
        avatar_url: result.user.photoURL,
        phone_no: result.user.phoneNumber,
        email: result.user.email,
        user_uuid: result.user.uid,
      };
      dispatch(socialSignIn(user, rememberMe, history));
    } catch (error) {
      console.log(error.message);
    }
    setgoogleLoading(false);
  };

  const facebookLogin = async () => {
    try {
      setfbLoading(true);
      const result = await loginWithFacebook();

      console.log({ result });

      let user = {
        first_name: result.additionalUserInfo.profile.first_name,
        last_name: result.additionalUserInfo.profile.last_name,
        avatar_url: result.user.photoURL,
        phone_no: result.user.phoneNumber,
        email: result.user.email,
        user_uuid: result.user.uid,
      };

      dispatch(socialSignIn(user, rememberMe, history));
    } catch (error) {
      console.log(error.message);
    }
    setfbLoading(false);
  };

  const { values, setErrors, errors, handleChange, handleSubmit } = useForm(
    handleLoginWithEmail,
    validateLogin
  );
  const { email, password } = values;

  const toggleRemember = (e) => {
    console.log('here');
    setRememberMe(e.target.checked);
  };

  return (
    <div className="login_div">
      <Navbar />
      <LoginPage style={{ backgroundImage: `url(${LoginBg})` }}>
        <Container>
          <Row
            gutter={[20, 0]}
            md={24}
            align="middle"
            justify="center"
            style={{
              width: '100%',
            }}
          >
            <Col xl={8} lg={10} md={24} sm={24} xs={24}>
              <Title
                level={4}
                style={{
                  fontSize: '1.5em',
                  color: '#696969',
                  marginTop: '-20px',
                }}
              >
                Welcome to{' '}
                <span style={{ fontWeight: '500' }}>ULTRA GROUP!</span>
              </Title>
              {/* <Title
                style={{
                  marginTop: "0",
                  fontSize: "1.5em",
                  fontWeight: "500",
                }}
              >
                
              </Title> */}
              <Text
                style={{
                  fontSize: '1.5em',
                  fontWeight: '500',
                }}
              >
                Login
              </Text>
              <Form
                style={{
                  marginTop: '1em',
                  flexDirection: 'column',
                }}
                onFinish={handleSubmit}
              >
                {errors.email && <div style={errorStyle}>{errors.email}</div>}
                <Form.Item className="form-wrap">
                  <Input
                    placeholder="Enter your Email"
                    className="form-input"
                    name="email"
                    value={email || ''}
                    onChange={handleChange}
                  />
                </Form.Item>
                {errors.password && (
                  <div style={errorStyle}>{errors.password}</div>
                )}
                <Form.Item className="form-wrap">
                  <Input.Password
                    placeholder="Enter your Password"
                    className="form-input"
                    name="password"
                    value={password || ''}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item className="form-wrap">
                  <Checkbox checked={rememberMe} onChange={toggleRemember}>
                    Remember Me
                  </Checkbox>
                </Form.Item>
                <Row
                  gutter={[24, 0]}
                  style={{
                    marginTop: '2em',
                  }}
                >
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <Form.Item>
                      <Button
                        onClick={handleSubmit}
                        type="primary"
                        htmlType="submit"
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
                        Login
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <Form.Item>
                      <NavLink
                        to="/forgotPassword"
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          color: '#2f2f2f',
                          fontSize: '1.3em',
                        }}
                      >
                        Forgot Password ?
                      </NavLink>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>

              <Divider
                style={{
                  fontWeight: '500',
                  marginTop: '-7px',
                }}
                plain
              >
                OR
              </Divider>
              <Row md={24} style={{ flexDirection: 'column' }}>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Button
                    onClick={facebookLogin}
                    type="primary"
                    className="btn-fb"
                    disabled={fbLoading}
                  >
                    {fbLoading && (
                      <Spin
                        indicator={antIcon}
                        style={{ marginRight: '10px', fontWeight: 600 }}
                      />
                    )}
                    Facebook
                  </Button>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Button
                    onClick={googleLogin}
                    type="primary"
                    className="btn-google"
                    disabled={googleLoading}
                  >
                    {googleLoading && (
                      <Spin
                        indicator={antIcon}
                        style={{ marginRight: '10px', fontWeight: 600 }}
                      />
                    )}
                    Google
                  </Button>
                </Col>
                <Col lg={24} md={24}>
                  <Text
                    style={{
                      marginTop: '1px',
                      display: 'flex',
                    }}
                  >
                    Don't have an account?
                    <NavLink
                      to="/register"
                      style={{
                        marginLeft: '.4em',
                        color: '#000',
                        fontWeight: '500',
                      }}
                    >
                      Register
                    </NavLink>
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col xl={16} lg={14} md={0} sm={0} xs={0}>
              <LoginPeople
                style={{
                  height: '60vh',
                  width: '100%',
                  padding: '2em',
                }}
              />
            </Col>
          </Row>
        </Container>
      </LoginPage>
    </div>
  );
};

export default Login;
