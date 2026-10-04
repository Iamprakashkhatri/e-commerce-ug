import React, { Fragment, useState } from "react";
import { MailOutlined, HomeOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";
import { Space, Divider, Typography, Card, Button } from "antd";
const { Title, Text, Link } = Typography;

const ThankYou = () => {
  const [redirect, setRedirect] = useState(false);

  const redirectToPage = () => setRedirect(true);

  const handleRedirectToHome = () => {
    redirectToPage();
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: 30,
        marginTop: 50,
        borderWidth: 1,
      }}
    >
      <Divider />
      <Card hoverable style={{}}>
        <Space direction="vertical">
          <Title style={{ fontSize: 70, fontWeight: 600, color: "#FE6D04" }}>
            Thank you.
          </Title>
          <Text style={{ fontSize: 30, fontWeight: 600 }} level type="success">
            Your order was completed successfully.
          </Text>
          <Text type="success">
            <MailOutlined
              style={{ color: "#FE6D04", fontSize: 20, fontWeight: 600 }}
            />{" "}
            An email receipt including the details about your order has been
            sent to the email address provided. Please keep it for your records.
          </Text>
        </Space>
      </Card>
      <Button
        style={{ marginTop: 20, fontWeight: 600, fontSize: 18 }}
        type="link"
        shape="round"
        onClick={handleRedirectToHome}
      >
        {redirect && (
          <Fragment>
            <Redirect to="/" />
          </Fragment>
        )}
        <HomeOutlined />
        Back to home
      </Button>
      <Divider />
    </div>
  );
};

export default ThankYou;
