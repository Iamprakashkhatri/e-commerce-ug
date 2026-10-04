import { Col, Row, Typography, Breadcrumb } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import DashboardCharts from "./DashboardCharts";
import DashboardSummary from "./DashboardSummary";
import DashboardOrderTable from "./DashboardOrderTable";
import DashboardRevenueCharts from "./DashboardRevenueCharts";
import { HomeOutlined } from "@ant-design/icons";
import "./styles/style.scss";
import Admin from "..";

const { Title } = Typography;

function Dashboard() {
  return (
    <Admin>
      <Row
        style={{
          height: "345px",
          backgroundColor: "#FE6D04",
          position: "relative",
          width: "100%",
          marginBottom: "-326px",
        }}
      />
      <Row
        style={{ width: "100%", padding: "8px 38px" }}
        justify="space-between"
        className="admin-content"
        gutter={[20, 20]}
      >
        <Col xs={24} md={12}>
          <Title
            level={2}
            style={{
              color: "#fff",
            }}
          >
            Dashboard
          </Title>
        </Col>
        <Col xs={24} md={12}>
          <Row justify="end">
            <Breadcrumb separator="-">
              <Breadcrumb.Item>
                <Link to="/admin">
                  <HomeOutlined /> Home
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
          </Row>
        </Col>
      </Row>
      <DashboardSummary />
      <DashboardCharts />
      <DashboardOrderTable />
      <DashboardRevenueCharts />
    </Admin>
  );
}

export default Dashboard;
