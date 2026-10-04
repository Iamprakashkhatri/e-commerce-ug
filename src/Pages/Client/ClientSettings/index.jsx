import { Row, Tabs, Typography } from "antd";
import React from "react";
import Client from "../components/Client";
import ClientBilling from "./ClientBilling";
import ClientPassword from "./ClientPassword";
import ClientProfile from "./ClientProfile";
import ClientShipping from "./ClientShipping";

const { TabPane } = Tabs;
const { Title } = Typography;

const ClientSettings = () => {
  return (
    <Client>
      <Row>
        <Tabs defaultActiveKey="1" tabPosition="left" className="mobiletab">
          <TabPane tab="Profile" key="1">
            <Title level={3}>Profile</Title>
            <ClientProfile />
          </TabPane>
          <TabPane tab="Shipping Form" key="2">
            <Title level={3}>Shipping Form</Title>
            <ClientShipping />
          </TabPane>
          <TabPane tab="Billing Form" key="3">
            <Title level={3}>Billing Form</Title>
            <ClientBilling />
          </TabPane>
          <TabPane tab="Account Settings" key="4">
            <Title level={3}>Account Settings</Title>
            <ClientPassword />
          </TabPane>
        </Tabs>
      </Row>
    </Client>
  );
};

export default ClientSettings;
