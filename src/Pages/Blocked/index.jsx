import React from "react";
import LoginBg from "../../assets/Images/loginbg.png";
import { LoginPage } from "../Login/styles/login";
import { Row, Typography, Col } from "antd";
import { Container } from "../../StyleGlobal/container.js";
import "../Login/styles/style.scss";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const { Text } = Typography;

const Blocked = () => {
  return (
    <div className="login_div">
      <Navbar />
      <LoginPage style={{ backgroundImage: `url(${LoginBg})` }}>
        <Container>
          <Row
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
                  fontSize: "1.5em",
                  fontWeight: "500",
                }}
              >
                Your account has been blocked. Please contact customer support
                to resolve the issue.
              </Text>
            </Col>
          </Row>
        </Container>
      </LoginPage>
      <Footer />
    </div>
  );
};

export default Blocked;
