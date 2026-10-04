import React from "react";
import { Col, Row, Typography } from "antd";
import { Dashboardcard } from "./styles/dashboard";
import DashboardLinecharts from "./DashboardLinecharts";
import DashboardBarcharts from "./DashboardBarchart";
import TotalCustomersBarCharts from "./TotalCustomersBarCharts";

const { Title, Text } = Typography;

const DashboardRevenueCharts = () => {
  return (
    <Row style={{ width: "100%", padding: "8px 38px" }} gutter={[25, 30]}>
      <Col xs={24} sm={16} md={16} lg={16}>
        <Dashboardcard>
          <Text>Overview</Text>
          <Title
            level={3}
            style={{
              marginTop: "1rem",
            }}
          >
            Total Sells
          </Title>
          <DashboardLinecharts />
        </Dashboardcard>
      </Col>

      <Col xs={24} sm={8} md={8} lg={8}>
        <Dashboardcard>
          <Text>Performance</Text>
          <Title
            level={3}
            style={{
              marginTop: "1rem",
            }}
          >
            Total Customer
          </Title>
          <TotalCustomersBarCharts />
        </Dashboardcard>
      </Col>
    </Row>
  );
};

export default DashboardRevenueCharts;
