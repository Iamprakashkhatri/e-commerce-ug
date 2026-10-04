import { Col, Row, Typography } from "antd";
import React from "react";
import { Dashboardcard } from "./styles/dashboard";
import DashboardPiecharts from "./DashboardPiecharts";
import DashboardBarcharts from "./DashboardBarchart";

const { Text, Title } = Typography;

const DashboardCharts = () => {
  return (
    <Row style={{ width: "100%", padding: "8px 38px" }} gutter={[25, 30]}>
      <Col xs={24} sm={12} md={12} lg={24}>
        <Dashboardcard>
          <Text>Overview</Text>
          <Title
            level={3}
            style={{
              marginTop: "1rem",
            }}
          >
            Total Revenue
          </Title>
          <DashboardBarcharts />
        </Dashboardcard>
      </Col>
    </Row>
  );
};

export default DashboardCharts;
