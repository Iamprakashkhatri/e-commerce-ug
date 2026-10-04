import {
  Row,
  Col,
  Typography,
  Space,
  Button,
  Collapse,
  Carousel,
  message,
  Comment,
  List,
  Tooltip,
  Rate,
  Input,
  Form,
  Breadcrumb,
  Tag,
  notification,
  Card,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Container } from '../../StyleGlobal/container';
import {
  SingleImage,
  ProductList,
  ProductDetail,
} from './styles/singleproduct';
import {
  MinusOutlined,
  PlusOutlined,
  HeartOutlined,
  HomeFilled,
  RightOutlined,
} from '@ant-design/icons';
import './styles/style.scss';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { Carousel as Productcarousel } from 'react-responsive-carousel';
import ReactImageMagnify from 'react-image-magnify';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import moment from 'moment';
import axios from 'axios';
import { API } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToWishList } from '../../actions/wishlistActions';
import { getCartItemsCount } from '../../actions/cartItemsActions';
import { postProductReview } from '../../actions/reviewActions';
import { getRelatedProducts } from '../../actions/productActions';
import HomeProductcard from '../Home/HomeProductcard';
import errorImg from '../../assets/Images/errorimg.png';
import ReactHtmlParser from 'react-html-parser';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

const { Text, Paragraph, Title } = Typography;
const ButtonGroup = Button.Group;
const { Panel } = Collapse;
const { TextArea } = Input;

const DenseCard = styled(Card)`
  .ant-card-body {
    padding: 0px;
  }
`;

const SingleProduct = ({ match }) => {
  const dispatch = useDispatch();

  let userData = sessionStorage.getItem('userInfo');

  const postReviewMessage = useSelector((state) => state.postReview);

  useEffect(() => {
    if (postReviewMessage.postReview) {
      if (postReviewMessage.postReview.message) {
        notification.info({ message: postReviewMessage.postReview.message });
        postReviewMessage.postReview = {};
      }
    }
    if (postReviewMessage.error) {
      notification.error({ message: postReviewMessage.error });
      postReviewMessage.error = null;
    }
  }, [postReviewMessage]);

  const addWishlistItemMessage = useSelector((state) => state.addWishlistItem);

  useEffect(() => {
    if (addWishlistItemMessage.addWishlistItem) {
      if (addWishlistItemMessage.addWishlistItem.message !== undefined) {
        notification.success({
          message: addWishlistItemMessage.addWishlistItem.message,
        });
        addWishlistItemMessage.addWishlistItem = {};
      }
    }
    if (addWishlistItemMessage.error) {
      notification.error({ message: addWishlistItemMessage.error });
      addWishlistItemMessage.error = null;
    }
  }, [addWishlistItemMessage]);

  const [product, setProduct] = useState({});
  const [productTotal, setProductTotal] = useState();

  const [index, setIndex] = useState(0);

  const slug = match.params.slug;

  console.log(slug);

  const [comments, setComments] = useState([]);

  const [reviewData, setReviewData] = useState({
    product: null,
    comment: '',
    rating: 0,
  });

  const handleRatingChange = (value) => {
    setReviewData({ ...reviewData, rating: value });
  };

  const postReview = () => {
    let formData = new FormData();

    formData.append('product', reviewData.product);
    formData.append('comment', reviewData.comment);
    formData.append('rating', reviewData.rating);

    dispatch(postProductReview(formData));
  };

  const [finalPrice, setFinalPrice] = useState();

  useEffect(() => {
    let discountedPrice = 0;
    if (product.discount && parseFloat(product.discount) > 0) {
      discountedPrice = parseFloat(
        product.sale_price - (product.discount / 100) * product.sale_price
      ).toFixed(2);
      setFinalPrice(discountedPrice);
    } else {
      setFinalPrice(product.sale_price);
    }
  }, [product]);

  const [stock, setStock] = useState(false);

  useEffect(() => {
    console.log('asdf', product.quantity);
    if (product.quantity === 0) {
      setStock(true);
    }
  }, [product]);

  console.log('123', product.quantity, stock, product);

  const [isErr, setIsErr] = useState(false);
  useEffect(() => {
    async function fetchProductData() {
      await axios
        .get(`${API}/product/products/${slug}`)
        .then((res) => {
          if (res.data) {
            setProduct(res.data);
            setReviewData({ ...reviewData, product: res.data.id });
          }
        })
        .catch((err) => {
          setIsErr(true);
          console.log(err);
        });
    }
    fetchProductData();
    // eslint-disable-next-line
  }, [slug]);

  console.log(comments);

  useEffect(
    () => {
      async function fetchProductComments() {
        await axios
          .get(`${API}/product/products/${slug}/get-comments`)
          .then((res) => {
            if (res.data) {
              setComments(res.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (isErr === false) {
        fetchProductComments();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const customRenderThumb = (children) => {
    let arr = [];
    !Array.isArray(children) ? arr.push(children) : (arr = children);

    if (product.images !== undefined && product.images.length > 0) {
      return arr.map((item, index) => {
        return <img src={product.images[index].image} alt="" key={index} />;
      });
    }
  };

  const relatedProductsMain = useSelector((state) => state.relatedProducts);

  const relatedProducts = relatedProductsMain.relatedProducts.slice(0, 5);

  useEffect(() => {
    if (product.cat_id !== undefined) {
      dispatch(getRelatedProducts(product.cat_id));
    }
  }, [dispatch, product.cat_id]);

  const [quantity, setQuantity] = useState(1);
  function callback(key) {
    console.log(key);
  }
  const handleDecline = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    } else {
      notification.warning({ message: 'Minimum Quantity Reached!' });
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const sendToCart = (
    id,
    name,
    finalPrice,
    image,
    quantity,
    productTotal,
    slug
  ) => {
    dispatch(
      getCartItemsCount(
        id,
        name,
        finalPrice,
        image,
        quantity,
        productTotal,
        slug
      )
    );
    let currentCart = [];
    let cartItems = JSON.parse(localStorage.getItem('cartItems'));

    if (cartItems) currentCart = cartItems;

    const prodObj = {
      id,
      name,
      finalPrice,
      image,
      quantity,
      productTotal,
      slug,
    };

    currentCart.push(prodObj);

    let finalCart = currentCart.filter(
      (product, index, self) =>
        index === self.findIndex((t) => t.id === product.id)
    );

    localStorage.setItem('cartItems', JSON.stringify(finalCart));

    notification.success({ message: `Added to Cart - ${product.name}` });
  };

  // CALCULATE PRODUCT TOTAL
  useEffect(() => {
    let total = parseFloat(finalPrice) * quantity;
    setProductTotal(total);
  }, [product, finalPrice, quantity]);

  const addToWishlist = () => {
    let formData = new FormData();

    formData.append('product_id', product.id);

    dispatch(addItemToWishList(formData));
  };

  return (
    <React.Fragment>
      <Navbar />
      {isErr === false ? (
        <>
          {/* <Row
            style={{
              padding: "1.5em 0",
            }}
          >
            <Container>
              <Breadcrumb separator=">">
                <Breadcrumb.Item>
                  <NavLink to="/">
                    <Text style={{ color: "#000" }}>Home</Text>
                  </NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Text style={{ color: "#000" }}>{product.cat_name}</Text>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Text style={{ color: "#000" }}>{product.name}</Text>
                </Breadcrumb.Item>
              </Breadcrumb>
            </Container>
          </Row> */}
          <Container>
            <ProductDetail>
              <Row
                align="top"
                gutter={[{ xs: 0, lg: 64 }, 0]}
                style={{ width: '100%' }}
              >
                <Col xs={24} md={12} lg={12} xl={12} xxl={12}>
                  {product.images !== undefined && product.images.length > 0 && (
                    <ReactImageMagnify
                      {...{
                        smallImage: {
                          isFluidWidth: true,
                          src: product.images[index].image,
                        },
                        largeImage: {
                          src: product.images[index].image,
                          width: 1426,
                          height: 2000,
                        },
                        isHintEnabled: true,
                        shouldHideHintAfterFirstActivation: false,
                        enlargedImageContainerStyle: {
                          zIndex: 10,
                        },
                        lensStyle: {
                          backgroundColor: 'rgba(0,0,0,.6)',
                        },
                      }}
                    />
                  )}
                  <Row style={{ marginTop: '25px' }}>
                    {product.images !== undefined &&
                      product.images.length > 0 &&
                      product.images.map((val, i) => (
                        <DenseCard
                          hoverable
                          style={{
                            border: index === i ? '2px solid #FE6D04' : 'none',
                          }}
                          cover={
                            <img
                              src={val.image}
                              style={{ width: '140px' }}
                              alt="product"
                            />
                          }
                          onClick={() => setIndex(i)}
                        />
                      ))}
                  </Row>
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <Breadcrumb
                    style={{
                      fontWeight: '400',
                      fontSize: '14px',
                      color: '#2d3748',
                    }}
                  >
                    <Breadcrumb.Item>
                      <Link to="/">
                        <HomeFilled style={{ fontSize: '20px' }} />
                      </Link>
                      <RightOutlined /> {product.cat_name}{' '}
                    </Breadcrumb.Item>
                  </Breadcrumb>
                  <Paragraph>
                    <Text
                      style={{
                        color: '#8c8c8c',
                        fontSize: '16px',
                      }}
                    >
                      {product.cat_name}
                    </Text>
                  </Paragraph>
                  <Paragraph>
                    <Text
                      style={{
                        fontSize: '24px',
                        lineHeight: '27px',
                        color: '#2d3748',
                        fontWeight: '700',
                      }}
                      className="product-name"
                    >
                      {product.name}
                    </Text>
                  </Paragraph>
                  {product.discount && parseFloat(product.discount) > 0 ? (
                    <Text
                      style={{
                        fontSize: '14px',
                        color: '#bdbdbd',
                        lineHeight: '21px',
                        fontWeight: '500',
                        textDecoration: 'line-through',
                      }}
                    >
                      Rs. {Number(product.sale_price).toLocaleString('en-IN')}
                    </Text>
                  ) : null}

                  <Paragraph>
                    <Text
                      style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        lineHeight: '27px',
                        color: '#103755',
                      }}
                    >
                      Rs.{' '}
                      {product.discount && product.discount > 0
                        ? parseFloat(finalPrice).toLocaleString('en-IN')
                        : parseFloat(product.sale_price).toLocaleString(
                          'en-IN'
                        )}
                    </Text>
                  </Paragraph>
                  <Paragraph>
                    <Text style={{ fontSize: '18px' }} strong>
                      Specifications:
                    </Text>
                  </Paragraph>
                  <Paragraph>
                    <Text>{ReactHtmlParser(product.description)}</Text>
                    {stock !== null && stock ? (
                      <Paragraph className="product-available">
                        <Tag
                          style={{
                            paddingLeft: '27px',
                            paddingRight: '27px',
                            paddingTop: '11px',
                            paddingBottom: '11px',
                            borderRadius: '20px',
                            backgroundColor: '#F6C344',
                            fontWeight: 'bold',
                            fontSize: '16px',
                          }}
                        >
                          Sold Out
                        </Tag>
                      </Paragraph>
                    ) : (
                      <Paragraph className="product-available">
                        Availability: In Stock
                      </Paragraph>
                    )}
                  </Paragraph>
                  <Space size={14}>
                    <ButtonGroup className="product-cart">
                      <Button
                        className="product-cart__btn"
                        onClick={handleDecline}
                      >
                        <MinusOutlined />
                      </Button>
                      <Text className="product-cart__number">{quantity}</Text>
                      <Button
                        className="product-cart__btn"
                        onClick={handleIncrease}
                      >
                        <PlusOutlined />
                      </Button>
                    </ButtonGroup>
                    <Button
                      className="product-addtocart"
                      onClick={() =>
                        sendToCart(
                          product.id,
                          product.name,
                          parseFloat(finalPrice),
                          product.images && product.images.length > 0
                            ? product.images[0].image
                            : errorImg,
                          quantity,
                          parseFloat(productTotal),
                          product.slug
                        )
                      }
                      disabled={stock}
                    >
                      Add to Cart
                    </Button>

                    {userData ? (
                      <Button
                        className="product-cart__wishlist"
                        onClick={addToWishlist}
                      >
                        <HeartOutlined />
                      </Button>
                    ) : (
                      ''
                    )}
                  </Space>
                  <Collapse className="product-collapse" onChange={callback}>
                    <Panel header="More Information" key="2">
                      <Paragraph>
                        <Text>Product Type: </Text>
                        <Text strong>{product.cat_name}</Text>
                      </Paragraph>
                      <Paragraph>
                        <Text>Product Brand: </Text>
                        <Text strong>{product.sub_cat_name}</Text>
                      </Paragraph>
                      <Paragraph>
                        <Text>Discount: </Text>
                        <Text strong>{Math.trunc(product.discount)}%</Text>
                      </Paragraph>
                      <Paragraph>
                        <Text>
                          Rating ({product.ratings ? product.ratings.count : ''}
                          ):
                        </Text>
                      </Paragraph>
                      {product.ratings ? (
                        <Rate
                          allowHalf
                          disabled
                          value={product.ratings.value}
                        />
                      ) : (
                        ''
                      )}
                    </Panel>
                    <Panel
                      header={`Reviews (${comments !== undefined && comments.length
                        })`}
                      key="3"
                    >
                      <List
                        className="comment-list"
                        itemLayout="vertical"
                        dataSource={comments !== undefined && comments}
                        renderItem={(item) => (
                          <li key={item.username}>
                            <Comment
                              actions={item.actions}
                              author={
                                <Space direction="vertical" size="small">
                                  <Text style={{ fontSize: '15px' }} strong>
                                    {item.username}
                                  </Text>
                                  <Rate
                                    style={{ fontSize: '15px' }}
                                    disabled
                                    allowHalf
                                    value={item.rating}
                                  />
                                </Space>
                              }
                              avatar={item.avatar}
                              content={<Text>{item.comment}</Text>}
                              datetime={
                                <Tooltip
                                  title={moment().format('YYYY-MM-DD HH:mm:ss')}
                                >
                                  <span>
                                    {item.created_at.substring(0, 10)}
                                  </span>
                                </Tooltip>
                              }
                            />
                          </li>
                        )}
                      />
                    </Panel>
                  </Collapse>

                  {userData ? (
                    <Form onFinish={postReview}>
                      <Row style={{ width: '100%' }}>
                        <Col xs={24}>
                          <Form.Item
                            name="comment"
                            rules={[
                              {
                                required: true,
                                message: 'Review cannot be empty',
                              },
                            ]}
                          >
                            <TextArea
                              rows={4}
                              value={reviewData.comment}
                              onChange={(e) =>
                                setReviewData({
                                  ...reviewData,
                                  comment: e.target.value,
                                })
                              }
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24}>
                          <Form.Item
                            name="rating"
                            rules={[
                              {
                                required: true,
                                message: 'Please rate the product',
                              },
                            ]}
                          >
                            <Rate allowHalf onChange={handleRatingChange} />
                          </Form.Item>
                        </Col>
                        <Col xs={24}>
                          <Form.Item>
                            <Button
                              className="product-postreview"
                              htmlType="submit"
                              type="primary"
                            >
                              Post Review
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  ) : null}
                  <div
                    id="displayHere"
                    style={{ position: 'fixed', top: 180 }}
                  ></div>
                </Col>
              </Row>
            </ProductDetail>

            <ProductList>
              <Title
                style={{
                  marginBottom: '0.7em',
                  fontSize: '24px',
                  lineHeight: '29px',
                  fontWeight: '700',
                  color: '#707b8e',
                }}
              >
                Related Products
              </Title>
              <Row>
                {relatedProducts !== undefined &&
                  relatedProducts.map((item) => (
                    <Col xs={12} md={8} lg={8} xl={6}>
                      <HomeProductcard
                        key={item.id}
                        id={item.id}
                        slug={item.slug}
                        name={item.name}
                        price={item.sale_price}
                        discount={item.discount}
                        label={item.label}
                        label_name={item.label_name}
                        images={
                          item.images &&
                          item.images.length > 0 &&
                          item.images[0].image
                        }
                        images_placeholder={
                          item.images &&
                          item.images.length > 0 &&
                          item.images[0].images_placeholder
                        }
                      />
                    </Col>
                  ))}
              </Row>
            </ProductList>
          </Container>
        </>
      ) : (
        <Row justify="center">
          {' '}
          <Typography.Title level={3}>
            {' '}
            ERROR 404: PRODUCT NOT FOUND
          </Typography.Title>
        </Row>
      )}
      <Footer />
    </React.Fragment>
  );
};

export default SingleProduct;
