import { Layout, Row, Col, Typography } from "antd";
import React from "react";
import Footer from "../../../../components/Footer";
import Navbar from "../../../../components/Navbar";
import { Container } from "../../../../StyleGlobal/container";
import ClientSider from "./ClientSider";
import { useSelector } from "react-redux";
const { Content } = Layout;
const { Title } = Typography;

const Client = (props) => {
  const { userInfo } = useSelector((state) => state.userInfo);

  return (
    <>
      <Navbar />
      <Layout>
        <Container>
          <Row style={{ width: "100%", padding: "4rem 0" }}>
            <Col lg={4} className="mobilescroll">
              <ClientSider />
            </Col>
            <Col lg={20} md={24}>
              <Content>
                <Row>
                  <Title
                    level={4}
                    style={{
                      fontSize: ".9rem",
                      margin: "0 0 0 30px ",
                    }}
                  >
                    Welcome, {userInfo.user.first_name} {""}{" "}
                    {userInfo.user.last_name}
                  </Title>
                  <Row className="rowstyle">{props.children}</Row>
                </Row>
              </Content>
            </Col>
          </Row>
        </Container>
      </Layout>
      <Footer />
    </>
  );
};

export default Client;
