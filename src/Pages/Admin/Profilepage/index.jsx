import { Row, Col, Typography, Breadcrumb, Tabs } from "antd";
import React from "react";
import Admin from "../components";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { Profilefield } from "./styles/Profile";
// import { useSelector } from "react-redux";
// import { Admincontainer } from "../../../StyleGlobal/container";
import "./styles/style.scss";
import ProfileForm from "./ProfileForm";
import ShippingForm from "./ShippingForm";

const { Title } = Typography;
const { TabPane } = Tabs;

const ProfilePage = () => {


  return (
    <Admin>
      <Row
        style={{
          height: "67px",
          backgroundColor: "#FE6D04",
          position: "relative",
          width: "100%",
          marginBottom: "-67px",
        }}
      />
      <Row
        style={{ width: "100%", padding: "8px 38px" }}
        justify="space-between"
        align="middle"
        gutter={[25, 30]}
      >
        <Col>
          <Title
            level={2}
            style={{
              color: "#fff",
            }}
          >
            Profile
          </Title>
        </Col>
        <Col>
          <Breadcrumb separator="-">
            <Breadcrumb.Item>
              <Link to="/admin">
                <HomeOutlined /> Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Profile</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      {/* starting of component fields */}
      <Row style={{ width: "100%", padding: "8px 38px" }} gutter={[25, 30]}>
        <Profilefield>
          <Tabs defaultActiveKey="1" tabPosition="left">
            <TabPane tab="Profile" key="1">
              <Title level={3}>Profile</Title>
              <ProfileForm />
            </TabPane>
            <TabPane tab="Shipping Form" key="2">
              <Title level={3}>Shipping Form</Title>
              <ShippingForm />
            </TabPane>
            <TabPane tab="Account Settings" key="3">
              <Title level={3}>Account Settings</Title>
            </TabPane>
          </Tabs>
        </Profilefield>
      </Row>
    </Admin>
  );
};

export default ProfilePage;
