import React, { useEffect, useState } from 'react';
import './css/styles.css';
import { Card, Col, Row, Typography, Button, } from 'antd';
import { useSelector } from 'react-redux';
import ProgressiveImage from 'react-progressive-graceful-image';
import { NavLink, useHistory } from 'react-router-dom';
import CustomCarousel from '../../components/Carousel/CustomCarousel';
import { FallOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
const { Text, Paragraph } = Typography;

const OnSale = () => {
  const breakpoint = useBreakpoint();
  const history = useHistory();

  // const showButton = (e) => {
  //   e.preventDefault();
  //   setDisplayButton("displayed");
  // };

  // const hideButton = (e) => {
  //   e.preventDefault();
  //   setDisplayButton("notdisplayed");
  // };
  // const [finalPrice, setFinalPrice] = useState(0);

  // useEffect(() => {
  // let discountedPrice = 0;
  // if (discount && parseFloat(discount) > 0) {
  //   discountedPrice = parseFloat(
  //     parseFloat(price) - (discount / 100) * parseFloat(price)
  //   ).toFixed(2);
  // }
  //   setFinalPrice(discountedPrice);
  // }, [discount, price]);

  const [windowWidth, setWindowWidth] = useState('');

  const products = useSelector((state) => state.product.products);

  products !== undefined &&
    products.sort((a, b) => {
      return b.discount - a.discount;
    });

  const onSaleProducts =
    products !== undefined &&
    products.slice(0, breakpoint.xxl ? 6 : breakpoint.xl ? 4 : 3);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', updateWindowSize);
    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []);

  const updateWindowSize = () => {
    setWindowWidth(window.innerWidth);
  };

  const finalPrice = (price, discount) => {
    let discountedPrice = 0;
    if (discount && parseFloat(discount) > 0) {
      discountedPrice = parseFloat(
        parseFloat(price) - (discount / 100) * parseFloat(price)
      ).toFixed(2);
    }
    return discountedPrice;
  };

  const display = (product) => {
    return (
      <Col xs={24} lg={8} xxl={4} xl={6} key={product.id}>
        {/* <Tag
          color="#19A850"
          style={{
            position: "absolute",
            zIndex: 1,
            borderRadius: "0.5em 0 0.5em 0",
          }}
        >
          Sale {Math.trunc(product.discount)}% Off
        </Tag> */}
        <NavLink to={`/products/${product.slug}`}>
          <Card
            key={product.slug}
            // onMouseEnter={(e) => {
            //   setStyle({ display: "block" });
            // }}
            // onMouseLeave={(e) => {
            //   setStyle({ display: "none" });
            // }}
            hoverable
            style={{
              textAlign: 'center',
              border: '1px solid lightgray',
            }}
            cover={
              <ProgressiveImage src={product.images[0].image}>
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
            <Paragraph ellipsis={true}>
              <Text
                style={{
                  fontSize: '14px',
                  lineHeight: '21px',
                  color: '#707b8e',
                  fontWeight: '700',
                }}
              >
                {product.name}
              </Text>
            </Paragraph>
            {product.discount && product.discount > 0 ? (
              <>
                <Paragraph>
                  <Text
                    style={{
                      color: '#bdbdbd',
                      fontWeight: '500',
                      fontSize: '14px',
                      lineHeight: '21px',
                    }}
                    delete
                  >
                    Rs.{Number(product.sale_price).toLocaleString('en-IN')}{' '}
                  </Text>
                  <Text
                    style={{
                      color: '#103755',
                      fontWeight: '700',
                      fontSize: '18px',
                      lineHeight: '27px',
                    }}
                  >
                    {'   '}
                    Rs.
                    {parseFloat(
                      finalPrice(product.sale_price, product.discount)
                    ).toLocaleString('en-IN')}
                  </Text>
                </Paragraph>
                <Paragraph className="discount-tag">
                  <Button danger style={{ color: '#FE6D04' }}>
                    Save {Math.trunc(product.discount)}%
                  </Button>
                </Paragraph>
              </>
            ) : (
              <Paragraph>
                <Text
                  style={{
                    color: '#103755',
                    fontWeight: '500',
                    fontSize: '15px',
                  }}
                >
                  Rs. {Number(product.cost_price).toLocaleString('en-IN')}
                </Text>
              </Paragraph>
            )}

            {/* <Button danger type="primary" block style={style}>
              ADD TO CART {console.log('product id check', product.slug)}
            </Button> */}
          </Card>
        </NavLink>
      </Col>
    );
  };

  return (
    <>
      {/* <Row justify="center">
        <Col
          xs={24}
          xl={24}
          style={{
            margin: "3rem 0 0.7rem 0",
          }}
          align="left"
        >
          <Text className="titleOnSale">On Sale</Text>
        </Col>
      </Row>
      <Row
        style={{ width: "100%", marginTop: "1.2em" }}
        className="salespace"
        gutter={[16, 16]}
      >
        {windowWidth > 991 ? (
          onSaleProducts !== undefined &&
          onSaleProducts.length > 0 &&
          onSaleProducts.map((product) => display(product))
        ) : (
          <CustomCarousel>
            {onSaleProducts !== undefined &&
              onSaleProducts.length > 0 &&
              onSaleProducts.map((product) => display(product))}
          </CustomCarousel>
        )}
      </Row> */}
      <Row
        style={{
          border: '1px solid #FE6D04',
          marginTop: '25px',
          width: '100%',
        }}
      >
        <Col
          xl={4}
          lg={6}
          md={10}
          sm={24}
          xs={24}
          style={{
            backgroundColor: '#FE6D04',
            display: 'inline-flex',
            alignSelf: 'stretch',
          }}
        >
          <Row align="middle" justify="center" style={{ width: '100%' }}>
            <Col xs={24} style={{ paddingTop: '25px', paddingBottom: '25px' }}>
              <Row
                style={{
                  fontSize: '16px',
                  color: 'white',
                  width: '100%',
                  paddingLeft: '25px',
                  paddingRight: '25px',
                }}
              >
                <FallOutlined style={{ fontSize: '25px' }} />
                <span style={{ marginLeft: '10px' }}>On Sale</span>
              </Row>
              <Row
                style={{
                  fontSize: breakpoint.lg ? '32px' : '22px',
                  fontWeight: 'bold',
                  color: '#FDC085',
                  width: '100%',
                  paddingLeft: '25px',
                  paddingRight: '25px',
                  marginTop: '10px',
                }}
              >
                Grab these offer now!
              </Row>
              <Row
                style={{
                  marginTop: '20px',
                  paddingLeft: '25px',
                  paddingRight: '25px',
                }}
              >
                <Button
                  size="large"
                  style={{
                    backgroundColor: 'white',
                    color: '#FE6D04',
                    borderColor: '#FE6D04',
                  }}
                  onClick={() => history.push('/deals')}
                >
                  View All Offers
                </Button>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col
          xl={20}
          lg={18}
          md={14}
          sm={24}
          xs={24}
          style={{
            display: 'inline-flex',
            alignSelf: 'stretch',
          }}
        >
          {windowWidth > 991 ? (
            onSaleProducts !== undefined &&
            onSaleProducts.length > 0 &&
            onSaleProducts.map((product) => display(product))
          ) : (
            <CustomCarousel>
              {onSaleProducts !== undefined &&
                onSaleProducts.length > 0 &&
                onSaleProducts.map((product) => display(product))}
            </CustomCarousel>
          )}
        </Col>
      </Row>
    </>
  );
};

export default OnSale;
