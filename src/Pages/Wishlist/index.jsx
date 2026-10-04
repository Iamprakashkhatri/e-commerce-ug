import {
  Button,
  Col,
  Divider,
  message,
  Popconfirm,
  Row,
  Typography,
  List,
  Result,
  notification,
} from 'antd';
import React from 'react';
import { Container } from '../../StyleGlobal/container';
import './style/wishlist.scss';
import { CloseOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import {
  deleteUserWishList,
  deleteUserWishListItem,
  getUserWishList,
} from '../../actions/wishlistActions';
import { useDispatch, useSelector } from 'react-redux';
import Client from '../Client/components/Client';

function Index() {
  const { Text, Title } = Typography;

  const wishlist = useSelector((state) => state.wishlist.wishlist.products);

  console.log({ wishlist });

  const deleteWishlistItemMessage = useSelector(
    (state) => state.deleteWishlistItem
  );
  const deleteWishlistMessage = useSelector((state) => state.deleteWishlist);
  const dispatch = useDispatch();

  const totalPrice = (product) => {
    let discountedPrice = 0;
    if (product.discount && parseFloat(product.discount) > 0) {
      discountedPrice = parseFloat(
        product.sale_price - (product.discount / 100) * product.sale_price
      ).toFixed(2);
      return discountedPrice;
    } else {
      return product.sale_price;
    }
  };

  useEffect(() => {
    dispatch(getUserWishList());
  }, [dispatch]);

  useEffect(() => {
    if (deleteWishlistItemMessage.deleteWishlistItem) {
      if (deleteWishlistItemMessage.deleteWishlistItem.message !== undefined) {
        notification.success({
          message: deleteWishlistItemMessage.deleteWishlistItem.message,
        });
        deleteWishlistItemMessage.deleteWishlistItem = {};
        dispatch(getUserWishList());
      }
    }

    if (deleteWishlistItemMessage.error) {
      notification.error({ message: deleteWishlistItemMessage.error });
      deleteWishlistItemMessage.error = null;
    }
  }, [deleteWishlistItemMessage, dispatch]);

  useEffect(() => {
    if (deleteWishlistMessage.deleteWishlist) {
      if (deleteWishlistMessage.deleteWishlist.message !== undefined) {
        notification.success({
          message: deleteWishlistMessage.deleteWishlist.message,
        });
        deleteWishlistMessage.deleteWishlist = {};
        dispatch(getUserWishList());
      }
    }
    if (deleteWishlistMessage.error) {
      notification.error({ message: deleteWishlistMessage.error });
      deleteWishlistMessage.error = null;
    }
  }, [deleteWishlistMessage, dispatch]);

  const removeFromWishList = (id) => {
    let fd = new FormData();
    fd.append('product_id', id);

    dispatch(deleteUserWishListItem(fd));

    dispatch(getUserWishList());
  };

  const clearWishlist = () => {
    let clearWishlistData = {};
    dispatch(deleteUserWishList(clearWishlistData));
  };

  return (
    <>
      <Client>
        <Title
          strong
          style={{
            marginTop: '2rem',
            fontSize: '36px',
            fontWeight: '900',
            textShadow: '0px 1px, 1px 0px, 1px 1px',
          }}
        >
          Your Wish List
        </Title>
        <Row style={{ width: '100%', marginBottom: '3rem' }} gutter={[20, 0]}>
          <Col xs={24} sm={24} lg={16} md={24} xl={16}>
            {wishlist && wishlist.length > 0 ? (
              <>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Divider />
                  {wishlist !== undefined &&
                    wishlist.length > 0 &&
                    wishlist.map((product) => (
                      <List
                        key={product.id}
                        itemLayout="horizontal"
                        className="mobilescroll"
                      >
                        <Row
                          align="middle"
                          gutter={[10, 10]}
                          justify="space-between"
                          className="mobilewidth"
                        >
                          <img
                            src={
                              product.images !== undefined &&
                              product.images.length > 0 &&
                              product.images[0].image
                            }
                            alt="cart product"
                            width="80px"
                            height="70px"
                            style={{ borderRadius: '10px' }}
                          />

                          <Link
                            to={`/products/${product.slug}`}
                            style={{ width: '250px' }}
                          >
                            <Text className="cart-product-name">
                              {product.name}
                            </Text>
                          </Link>

                          <Text className="cart-product-price">
                            Rs. {totalPrice(product)}
                          </Text>

                          <Popconfirm
                            title="Remove product from wishlist?"
                            onConfirm={() => removeFromWishList(product.id)}
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
                      </List>
                    ))}
                </Col>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                  <Popconfirm
                    title="Are you sure?"
                    onConfirm={clearWishlist}
                    okText="Yes"
                    cancelText="No"
                  >
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
                      Clear Wishlist
                    </Button>
                  </Popconfirm>
                </Col>
              </>
            ) : (
              <Row justify="center" style={{ width: '100%' }}>
                <Col style={{ marginTop: '2em' }} align="middle">
                  <Result
                    status="404"
                    title="Wish List Empty"
                    subTitle="Your Wish List is Empty. Please add Products in your Wish List."
                    extra={
                      <Link to="/">
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
                          View Products
                        </Button>
                      </Link>
                    }
                  />
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Client>
    </>
  );
}
export default Index;
