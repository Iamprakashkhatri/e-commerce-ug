import React, { useEffect, useState } from 'react';
import { Card, Typography, Tag, Button, Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';
import ProgressiveImage from 'react-progressive-graceful-image';
import './css/style.scss';

const { Paragraph, Text } = Typography;

const HomeProductcard = (props) => {
  const {
    slug,
    name,
    discount,
    price,
    images,
    images_placeholder,
    label,
    label_name,
  } = props;

  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    let discountedPrice = 0;
    if (discount && parseFloat(discount) > 0) {
      discountedPrice = parseFloat(
        parseFloat(price) - (discount / 100) * parseFloat(price)
      ).toFixed(2);
    }
    setFinalPrice(discountedPrice);
  }, [discount, price]);

  console.log(finalPrice);

  return (
    <>
      {label ? (
        <Tag
          color=" #19A850"
          style={{
            position: 'absolute',
            zIndex: 1,
          }}
        >
          {label_name}
        </Tag>
      ) : null}

      <NavLink to={`/products/${slug}`}>
        <Card
          hoverable
          bordered={false}
          style={{
            marginBottom: '1%',
            textAlign: 'center',
            minHeight: '400px',
            border: '1px solid lightgray',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px',
          }}
          cover={
            <ProgressiveImage src={images} placeholder={images_placeholder}>
              {(src) => (
                <img
                  height={200}
                  style={{
                    objectFit: 'contain',
                  }}
                  src={src}
                  alt="productImage"
                />
              )}
            </ProgressiveImage>
          }
        >
          <Row
            // style={{
            //   display: 'flex',
            //   justifyContent: 'center',
            //   alignItems: 'center',
            // }}
            align="middle"
          >
            <Col xs={24}>
              <Row align="middle">
                <Paragraph>
                  <Text
                    style={{
                      fontSize: '14px',
                      lineHeight: '21px',
                      fontWeight: '400',
                      color: '#2d3748',
                    }}
                  >
                    {' '}
                    {name}{' '}
                  </Text>
                </Paragraph>
              </Row>
              <Row align="middle">
                {discount && discount > 0 ? (
                  <>
                    <Col xs={24}>
                      <Row>
                        <Paragraph>
                          <Text
                            className="real-price"
                            delete
                            style={{
                              color: '#bdbdbd',
                              fontWeight: '500',
                              fontSize: '14px',
                              lineHeight: '21px',
                            }}
                          >
                            {' '}
                            Rs. {Number(price).toLocaleString('en-IN')}
                          </Text>
                          <Text
                            className="final-price"
                            style={{
                              color: '#103755',
                              fontWeight: '700',
                              fontSize: '18px',
                              lineHeight: '27px',
                            }}
                          >
                            {'  '}
                            Rs.{Number(finalPrice).toLocaleString('en-IN')}
                          </Text>
                        </Paragraph>
                      </Row>

                      <Row>
                        <Paragraph className="discount-tag">
                          <Button danger style={{ color: '#FE6D04' }}>
                            Save {Math.trunc(discount)}%
                          </Button>
                        </Paragraph>
                      </Row>
                    </Col>
                  </>
                ) : (
                  <Paragraph>
                    <Text
                      className="final-price"
                      style={{
                        color: '#103755',
                        fontWeight: '400',
                        fontSize: '14px',
                      }}
                    >
                      {' '}
                      Rs. {Number(price).toLocaleString('en-IN')}{' '}
                    </Text>
                  </Paragraph>
                )}
              </Row>
            </Col>
          </Row>
        </Card>
      </NavLink>
    </>
  );
};

export default HomeProductcard;
