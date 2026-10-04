import {
  Button,
  Col,
  Divider,
  Popconfirm,
  Row,
  Space,
  Typography,
  List,
  Result,
  Spin,
  notification,
} from 'antd';
import React, { useState } from 'react';
import { Container } from '../../StyleGlobal/container';
import '../Cart/style/cart.scss';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import ButtonGroup from 'antd/lib/button/button-group';
import { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSiteSettingsAction } from '../../actions/siteSettingsActions';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

function Index() {
  const { Text, Paragraph, Title } = Typography;
  const siteSettings = useSelector((state) => state.siteSettings);

  const loading = useSelector((state) => state.siteSettings.loading);
  const dispatch = useDispatch();

  const breakpoint = useBreakpoint();

  useEffect(() => {
    dispatch(getSiteSettingsAction());
  }, [dispatch]);

  const [currentCart, setCurrentCart] = useState([]);

  const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

  let cartItems = JSON.parse(localStorage.getItem('cartItems'));
  useEffect(() => {
    if (cartItems) setCurrentCart(cartItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeFromCart = (id) => {
    let newArray = [];

    cartItems.map(
      (currentProduct, index) =>
        currentProduct.id !== id && newArray.push(currentProduct)
    );

    localStorage.setItem('cartItems', JSON.stringify(newArray));
    notification.success({ message: 'Product removed from cart' });

    setCurrentCart(newArray);
  };

  let totalOrder = 0;
  let subTotal = 0;
  let vat_amount = 0;
  let amount_with_vat = 0;

  // const [shippingFee, setShippingFee] = useState(10);

  // const [promocode, setPromocode] = useState();
  // const submitPromocode = () => {
  //   switch (promocode) {
  //     case "UG":
  //       setShippingFee(0);
  //       return message.success("Valid Promocode");
  //     case undefined:
  //       return message.error("Empty Promocode");
  //     default:
  //       return message.warning("Invalid Promocode");
  //   }
  // };

  const QuantityAdd = (index) => {
    let newCart = [];
    currentCart.forEach((element, i) => {
      if (i === index) {
        element.quantity++;
      }
      element.productTotal = element.quantity * element.finalPrice;
      newCart.push(element);
    });
    localStorage.setItem('cartItems', JSON.stringify(newCart));
    setCurrentCart(newCart);
  };

  const QuantitySubtract = (index) => {
    if (currentCart[index].quantity === 1) {
      notification.warning({ message: 'Minimum Quantity Reached!' });
    } else {
      let newCart = [];
      currentCart.forEach((element, i) => {
        if (i === index) {
          element.quantity--;
        }
        element.productTotal = element.quantity * element.finalPrice;
        newCart.push(element);
      });
      localStorage.setItem('cartItems', JSON.stringify(newCart));
      setCurrentCart(newCart);
    }
  };

  const calculateTotalOrder = () => {
    let total = 0;
    currentCart.map((product) => (total += parseFloat(product.productTotal)));
    totalOrder += total;
    return numberFormat(totalOrder);
  };

  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'NPR',
    }).format(value);

  // const vat_percentage =
  //   siteSettings !== undefined &&
  //   parseFloat(siteSettings.siteSettings.vat_percentage);

  const calculateSubTotal = () => {
    // vat_amount =
    //   vat_percentage !== undefined && (vat_percentage / 100) * totalOrder;

    // total = totalOrder + shippingFee;
    amount_with_vat = totalOrder + vat_amount;
    subTotal += amount_with_vat;

    return numberFormat(subTotal);
  };

  const [finalCart, setFinalCart] = useState([]);
  useEffect(() => {
    let newArray = [];
    currentCart &&
      currentCart.length > 0 &&
      currentCart.map((item) => {
        let a = {
          id: item.id,
          quantity: item.quantity,
        };
        newArray.push(a);
        return null;
      });
    setFinalCart(newArray);
  }, [currentCart]);

  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (totalOrder > 1) {
      setDisabled(false);
    }
    if (
      siteSettings !== undefined &&
      siteSettings.siteSettings.message === 'No Settings'
    ) {
      setDisabled(true);
    }
  }, [totalOrder, currentCart, siteSettings]);

  return (
    <>
      <Navbar />
      <Container>
        <Title
          strong
          style={{
            fontSize: '36px',
            fontWeight: '900',
            textShadow: '0px 1px, 1px 0px, 1px 1px',
            margin: '2rem 0 4rem 0',
          }}
        >
          Your Cart
        </Title>
        {cartItemsFromStorage && cartItemsFromStorage.length === 0 ? (
          <Row justify="center" style={{ width: '100%' }}>
            <Col style={{ marginTop: '2em' }} align="middle">
              <Result
                status="404"
                title="Cart Empty"
                subTitle="Recently, your Cart is Empty. Please add Products in your cart."
                extra={
                  <Link to="/shop">
                    <Button
                      type="primary"
                      style={{
                        marginTop: '10px',
                        width: '100%',
                        background: '#FE6D04',
                        color: '#fff',
                        fontWeight: '500',
                        fontSize: '18px',
                        height: '45px',
                        border: 'none',
                      }}
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                }
              />
            </Col>
          </Row>
        ) : (
          <Row
            style={{ width: '100%', marginBottom: '20px' }}
            gutter={[{ xs: 0, lg: 80 }, 0]}
          >
            <Col xs={24} sm={24} md={24} lg={16} xl={16}>
              <List itemLayout="horizontal" className="mobilescroll">
                {currentCart !== undefined &&
                  currentCart.map((product, index) => (
                    <div key={index}>
                      <Row
                        align="middle"
                        gutter={[10, 10]}
                        justify="space-between"
                        className="mobilewidth"
                      >
                        <img
                          src={product.image}
                          style={{ height: breakpoint.lg ? '200px' : '100px' }}
                          alt="cart product"
                        />

                        <Link to={`/products/${product.slug}`}>
                          <Title
                            className="cart-product-name"
                            level={5}
                            ellipsis={{ rows: 2 }}
                          >
                            {product.name}
                          </Title>
                        </Link>

                        <ButtonGroup>
                          <Button
                            type="default"
                            className="btn-decrease"
                            onClick={() => QuantitySubtract(index)}
                          >
                            <MinusOutlined />
                          </Button>
                          <Text className="cart-product-quantity">
                            {product.quantity}
                          </Text>
                          <Button
                            type="default"
                            className="btn-increase"
                            onClick={() => QuantityAdd(index)}
                          >
                            <PlusOutlined />
                          </Button>
                        </ButtonGroup>

                        <Text className="cart-product-price">
                          {numberFormat(product.productTotal)}
                        </Text>

                        <Popconfirm
                          title="Remove product from cart?"
                          onConfirm={() => removeFromCart(product.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            className="btn-product-remove"
                            icon={<CloseOutlined />}
                          />
                        </Popconfirm>
                      </Row>
                      <Divider />
                    </div>
                  ))}
              </List>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={8}
              xl={8}
              style={{ paddingRight: 0 }}
            >
              <Row style={{ backgroundColor: '#f0f0f0' }}>
                <Col xs={24} xl={24} style={{ padding: '20px' }}>
                  <Text
                    strong
                    style={{
                      marginTop: '5px',
                      fontSize: '20px',
                      fontWeight: '900',
                      color: '#8c8c8c',
                    }}
                  >
                    Summary
                  </Text>
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  style={{ paddingLeft: '20px', paddingRight: '20px' }}
                >
                  <Space direction="vertical" size="middle">
                    <Paragraph>
                      <Text style={{ color: '#8c8c8c' }} strong>
                        Total Order:{' '}
                      </Text>
                    </Paragraph>
                    {/* <Paragraph>
                      <Text style={{ color: '#8c8c8c' }} strong>
                        Vat Percentage:
                      </Text>
                    </Paragraph> */}
                    {/* <Paragraph>
                      <Text style={{ color: "#8c8c8c" }} strong>
                        Promo Code:{" "}
                      </Text>
                    </Paragraph>
                    <Paragraph>
                      <Text style={{ color: "#8c8c8c" }} strong>
                        Shipping:{" "}
                      </Text>
                    </Paragraph> */}
                  </Space>
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  style={{
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Space direction="vertical" size="middle">
                    <Paragraph
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <Text style={{ color: '#8c8c8c' }} strong>
                        {calculateTotalOrder()}
                      </Text>
                    </Paragraph>
                    {/* <Paragraph
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <Text style={{ color: '#8c8c8c' }} strong>
                        {vat_percentage}%
                      </Text>
                    </Paragraph> */}
                    {/* <Paragraph
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Text>
                        <Input
                          style={{
                            width: "70px",
                            height: "15px",
                            backgroundColor: "#8c8c8c",
                            marginRight: "8px",
                            color: "white",
                          }}
                          onChange={(e) => setPromocode(e.target.value)}
                        />

                        <Button
                          type="primary"
                          size="small"
                          style={{
                            width: "50px",
                            height: "15px",
                            backgroundColor: "#FE6D04",
                            border: "none",
                            borderRadius: "10px",
                            color: "white",
                            fontSize: "10px",
                          }}
                          onClick={() => submitPromocode()}
                        >
                          Enter
                        </Button>
                      </Text>
                    </Paragraph>
                    <Paragraph
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Text style={{ color: "#8c8c8c" }}>
                        Rs. {shippingFee}{" "}
                      </Text>
                    </Paragraph> */}
                  </Space>
                </Col>

                <Divider className="dotted-line" />
                <Col xs={24} xl={24}>
                  <Row width="100%">
                    <Col xs={12} xl={12} style={{ paddingLeft: '20px' }}>
                      <Paragraph>
                        {' '}
                        <Text style={{ fontSize: '20px' }} strong>
                          Total
                        </Text>
                      </Paragraph>
                    </Col>
                    <Col
                      xs={12}
                      xl={12}
                      style={{
                        paddingRight: '20px',
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <Paragraph>
                        {' '}
                        <Text style={{ fontSize: '20px' }} strong>
                          {calculateSubTotal()}
                        </Text>
                      </Paragraph>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col xs={24} xl={24}>
                  <Spin spinning={loading}>
                    <NavLink
                      to={{
                        pathname: `/checkout`,
                        amount: totalOrder,
                        vat_amount: vat_amount,
                        amount_with_vat: subTotal,
                        currentCart: currentCart,
                        finalCart: finalCart,
                      }}
                    >
                      <Button
                        type="default"
                        style={{
                          marginTop: '10px',
                          width: '100%',
                          background: '#FE6D04',
                          color: '#fff',
                          fontWeight: '500',
                          fontSize: '18px',
                          height: '45px',
                          border: 'none',
                        }}
                        disabled={disabled}
                      >
                        Proceed to Checkout
                      </Button>
                    </NavLink>
                  </Spin>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Container>
      <Footer />
    </>
  );
}
export default Index;
