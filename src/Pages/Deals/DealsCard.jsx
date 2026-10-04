import { Card, Col, Tag, Typography, Button } from "antd";
import React, { useEffect, useState } from "react";
import ProgressiveImage from "react-progressive-graceful-image";
import { NavLink } from "react-router-dom";

function DealsCard(props) {
  const { Text, Paragraph } = Typography;

  const { product } = props;

  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    let discountedPrice = 0;
    if (product.discount && parseFloat(product.discount) > 0) {
      discountedPrice = parseFloat(
        parseFloat(product.sale_price) -
        (product.discount / 100) * parseFloat(product.sale_price)
      ).toFixed(2);
    } else {
      discountedPrice = product.sale_price;
    }
    setFinalPrice(discountedPrice);
  }, [product.discount, product.sale_price]);

  return (
    <Col>
      {product.label ? (
        <Tag
          color="#19A850"
          style={{
            position: "absolute",
            zIndex: 1,
            borderRadius: "0.5em 0 0.5em 0",
          }}
        >
          {product.label_name}
        </Tag>
      ) : null}

      <NavLink to={`/products/${product.slug}`}>
        <Card
          hoverable
          bordered={false}
          style={{
            marginBottom: "1%",
            textAlign: "center",
            borderRadius: "0.5em",
          }}
          cover={
            <ProgressiveImage
              src={product.images.length > 0 && product.images[0].image}
              placeholder={
                product.images.length > 0 && product.images[0].image_placeholder
              }
            >
              {(src) => (
                <img
                  height={200}
                  style={{
                    objectFit: "contain",
                  }}
                  src={src}
                  alt="productImage"
                />
              )}
            </ProgressiveImage>
          }
        >
          <Paragraph>
            <Text
              style={{
                fontSize: "14px",
                lineHeight: "21px",
                fontWeight: "400",
                color: "#2d3748",
                display: "block",
              }}
              ellipsis
            >
              {" "}
              {product.name}{" "}
            </Text>
          </Paragraph>
          {product.discount && product.discount > 0 ? (
            <>
              <Paragraph>
                <Text
                  className="real-price"
                  delete
                  style={{
                    color: "#bdbdbd",
                    fontWeight: "500",
                    fontSize: "14px",
                    lineHeight: "21px",
                  }}
                >
                  {" "}
                  Rs. {Number(product.sale_price).toLocaleString("en-IN")}
                </Text>
                <Text
                  className="final-price"
                  style={{
                    color: "#103755",
                    fontWeight: "700",
                    fontSize: "18px",
                    lineHeight: "27px",
                  }}
                >
                  {"  "}
                  Rs.{Number(finalPrice).toLocaleString("en-IN")}
                </Text>
              </Paragraph>
              <Paragraph className="discount-tag">
                <Button danger style={{ color: "#FE6D04" }}>
                  Save {Math.trunc(product.discount)}%
                </Button>
              </Paragraph>
            </>
          ) : (
            <Paragraph>
              <Text
                className="final-price"
                style={{
                  color: "#103755",
                  fontWeight: "700",
                  fontSize: "18px",
                  lineHeight: "27px",
                }}
                strong
              >
                {" "}
                Rs. {Number(finalPrice).toLocaleString("en-IN")}{" "}
              </Text>
            </Paragraph>
          )}
        </Card>
      </NavLink>
    </Col>
  );
}
export default DealsCard;
