import React, { useContext, useState } from "react";
import LoginBg from "../../assets/Images/loginbg.png";
import SignupImage from "../../assets/Images/svg/RegisterPeoples@3X";
import { LoginPage } from "../Login/styles/login";
import { Row, Typography, Col, Input, Button, Form } from "antd";
import { Container } from "../../StyleGlobal/container.js";
import "../Login/styles/style.scss";
import Navbar from "../../components/Navbar";
import { NavLink, withRouter } from "react-router-dom";
// import Form, { useForm } from "antd/lib/form/Form";
import validateLogin from "../../Firebase/validateLogIn";
import { firebaseAuth } from "../../provider/AuthProvider";
import useForm from "../../customHooks/useForm";

const { Text } = Typography;

const VerifyFirst = () => {
  const [sent, setSent] = useState(false);
  const { getVerification, signInUser } = useContext(firebaseAuth);

  const errorStyle = {
    color: "#f00",
    fontSize: "12px",
    margin: "5px 0px",
  };

  const handleResend = async () => {
    try {
      await signInUser(email, password);
      getVerification();
      setSent(true);
    } catch (error) {
      setErrors({ ...errors, email: error.message });
    }
  };

  const { values, setErrors, errors, handleChange, handleSubmit } = useForm(
    handleResend,
    validateLogin
  );

  const { email, password } = values;

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
              width: "100%",
            }}
            md={24}
          >
            <Col xl={8} lg={10} md={24} sm={24} xs={24}>
              <Text
                style={{
                  fontSize: "1em",
                  fontWeight: "500",
                }}
              >
                A verify link has been sent to your email. If you didn't get the
                link, please check the spam folder in your email. Please verify
                your account before Logging In.
              </Text>
              {!sent ? (
                <Form
                  style={{
                    marginTop: "1em",
                  }}
                >
                  {errors.email && <div style={errorStyle}>{errors.email}</div>}
                  <Form.Item className="form-wrap">
                    <Input
                      placeholder="Enter your Email"
                      className="form-input"
                      name="email"
                      value={email || ""}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item className="form-wrap">
                    <Input.Password
                      placeholder="Enter your Password"
                      className="form-input"
                      name="password"
                      value={password || ""}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Row
                    style={{
                      marginTop: "2em",
                    }}
                  >
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <Form.Item>
                        <Button
                          onClick={handleSubmit}
                          type="primary"
                          className="btn-login"
                          style={{ width: "auto" }}
                        >
                          Resend Verification
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              ) : null}

              <Row>
                <Col lg={24} md={24}>
                  <Text
                    style={{
                      marginTop: "1em",
                      display: "flex",
                    }}
                  >
                    Back to
                    <NavLink
                      to="/login"
                      style={{
                        marginLeft: ".4em",
                        color: "#000",
                        fontWeight: "500",
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
                  height: "60vh",
                  width: "100%",
                  padding: "2em",
                }}
              />
            </Col>
          </Row>
        </Container>
      </LoginPage>
    </div>
  );
};

export default withRouter(VerifyFirst);
