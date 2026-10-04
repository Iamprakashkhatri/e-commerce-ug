import React from "react";
import { Card, Typography, Col } from "antd";
import "./styles/style.scss";

const { Paragraph, Text } = Typography;

const ProductCard = (props) => {
  return (
    <Col>
      <Card
        hoverable
        bordered={false}
        style={{
          margin: "0.5%",
          marginBottom: "2%",
          textAlign: "center",
        }}
        cover={
          <img
            alt="product"
            src={props.image}
            style={{
              objectFit: "contain",
            }}
            height={300}
          />
        }
      >
        {props.discount ? (
          <Text className="discount">{props.discount}</Text>
        ) : (
          ""
        )}
        <Paragraph>
          <Text strong> {props.name} </Text>
        </Paragraph>
        <Paragraph>
          <Text>Rs. {Number(props.price).toLocaleString("en-IN")} </Text>
        </Paragraph>
      </Card>
    </Col>
  );
};

export default ProductCard;
