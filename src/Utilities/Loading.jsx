import { Col, Row } from "antd";
import React from "react";
import Logo from "../assets/Images/new_logo.png";
import "./styles/loading.scss";

function Loading() {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100vh",
      }}
    >
      <Row>
        <Col xs={24} xl={24} align="middle">
          <img
            src={Logo}
            alt="loading"
            style={{
              width: "280px",
              height: "70px",
            }}
          />
        </Col>

        <Col xs={24} xl={24} align="middle">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </Col>
      </Row>
    </Row>
  );
}

export default Loading;
