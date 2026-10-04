import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Col, Row, Typography, Tag, Button } from 'antd';
import { StarFilled } from '@ant-design/icons';
import ProgressiveImage from 'react-progressive-graceful-image';
import CartBg from './css/CartBg';
import './css/featuredProduct.css';

const { Text } = Typography;

function FeaturedProduct() {
  const featuredProduct = useSelector(
    (state) => state.productFeatured.featured
  );

  const { sale_price } = featuredProduct !== undefined && featuredProduct;

  const [finalPrice, setFinalPrice] = useState();

  useEffect(() => {
    if (featuredProduct !== undefined) {
      let discountedPrice = 0;
      if (
        featuredProduct.discount &&
        parseFloat(featuredProduct.discount) > 0
      ) {
        discountedPrice = parseFloat(
          parseFloat(featuredProduct.sale_price) -
            (featuredProduct.discount / 100) *
              parseFloat(featuredProduct.sale_price)
        ).toFixed(2);
        setFinalPrice(discountedPrice);
      } else {
        setFinalPrice(featuredProduct.sale_price);
      }
    }
  }, [featuredProduct, sale_price]);

  return (
    <>
      <Row
        className="mobile"
        justify="space-between"
        align="middle"
        style={{
          background: `linear-gradient(347deg, rgba(255,101,50,1) 37%, rgba(208,120,60,1) 67%)`,
          width: '100%',
          margin: '313px 0px 0px',
          borderRadius: '0.4em',
          padding: '15px 50px',
          overflow: 'hidden',
        }}
      >
        <Col xs={24} md={12} lg={6}>
          <Row justify="center">
            <ProgressiveImage
              src={
                featuredProduct.images !== undefined &&
                featuredProduct.images.length > 0
                  ? featuredProduct.images[0].image
                  : ''
              }
              placeholder={
                featuredProduct.images !== undefined &&
                featuredProduct.images.length > 0
                  ? featuredProduct.images[0].image_placeholder
                  : ''
              }
            >
              {(src) => <img className="image" src={src} alt="ad" />}
            </ProgressiveImage>
          </Row>
        </Col>
        <Col xs={24} md={12} lg={12}>
          <CartBg />
          <Row justify="center">
            <Text strong className="title">
              {featuredProduct.name}
            </Text>
          </Row>
          <Row justify="center">
            <Text className="price" strong>
              Rs. {finalPrice}
            </Text>
          </Row>
          <Row
            align="middle"
            justify="center"
            style={{ marginTop: '20px', zIndex: 2, position: 'relative' }}
          >
            <Col>
              <Tag icon={<StarFilled />} color="#fff" className="tag">
                #1 ITEM
              </Tag>
            </Col>
            <Col>
              <Text style={{ fontSize: '15px', color: '#fff' }} strong>
                Available on store
              </Text>
            </Col>
          </Row>
        </Col>
        <Col xs={24} lg={6} style={{ padding: '20px 0px' }}>
          <Row justify="center">
            <CartBg />
            <NavLink to={`/products/${featuredProduct.slug}`}>
              <Button type="primary" className="shop-button">
                <Text className="shop-button-text" strong>
                  Shop Now
                </Text>
              </Button>
            </NavLink>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default FeaturedProduct;
