import React, { useContext, useState } from "react";
import { LoginPage } from "../Login/styles/login";
import LoginBg from "../../assets/Images/loginbg.png";
import LoginPeople from "../../assets/Images/svg/Loginpeople";
import { Row, Typography, Col, Form, Input, Button } from "antd";
import { Container } from "../../StyleGlobal/container";
import "../Login/styles/style.scss";
import Navbar from "../../components/Navbar";
import { firebaseAuth } from "../../provider/AuthProvider";
const { Title, Text } = Typography;

const ForgotPassword = (props) => {
  const { resetPassword } = useContext(firebaseAuth);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    try {
      await resetPassword(email);
      setSent(true);
    } catch (error) {
      setErrors({ ...errors, email: error.message });
    }
  };

  const errorStyle = {
    color: "#f00",
    fontSize: "12px",
    margin: "5px 0px",
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
              width: "100%",
            }}
          >
            <Col xl={8} lg={10} md={24} sm={24} xs={24}>
              {sent ? (
                <>
                  <Text
                    style={{
                      fontSize: "1.8em",
                      fontWeight: "500",
                    }}
                  >
                    Please find your reset link in your email
                  </Text>
                </>
              ) : (
                <>
                  <Title
                    level={2}
                    style={{
                      marginTop: "0",
                      fontSize: "2.5em",
                      fontWeight: "500",
                    }}
                  >
                    Forgot Password
                  </Title>

                  <Form
                    style={{
                      marginTop: "1em",
                    }}
                  >
                    <Form.Item className="form-wrap">
                      {errors.email && (
                        <div style={errorStyle}>{errors.email}</div>
                      )}
                      <Input
                        placeholder="Enter your Email"
                        className="form-input"
                        name="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setErrors({});
                        }}
                      />
                    </Form.Item>

                    <Row
                      gutter={[24, 0]}
                      style={{
                        marginTop: "2em",
                      }}
                    >
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <Form.Item>
                          <Button
                            onClick={handleReset}
                            type="primary"
                            className="btn-login"
                          >
                            Reset
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </>
              )}
            </Col>
            <Col xl={16} lg={14} md={0} sm={0} xs={0}>
              <LoginPeople
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

export default ForgotPassword;
