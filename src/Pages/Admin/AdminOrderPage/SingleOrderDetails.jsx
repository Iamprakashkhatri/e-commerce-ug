import React, { useEffect, useState } from 'react';
import Admin from '../components';
import {
  Row,
  Col,
  Breadcrumb,
  Typography,
  Tag,
  Avatar,
  Divider,
  Button,
  Space,
  notification,
} from 'antd';
import {
  HomeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  MailOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  CalendarOutlined,
  CheckCircleTwoTone,
  ClockCircleTwoTone,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { Dashboardcard } from '../components/Dashboard/styles/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { API } from '../../../config';
import { orderDetails } from '../../../actions/orderActions';
const { Title, Text } = Typography;

const SingleOrderDetails = ({ match }) => {
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();
  const orderDetail = useSelector((state) => state.orderDetails);
  const { orderDetailsObj } = orderDetail;
  const user = useSelector((state) => state.userInfo);
  const { userInfo } = user;
  const orderCreate = useSelector((state) => state.orderCreate);

  const history = useHistory();

  const { loading } = orderCreate;
  const billing = orderDetailsObj.billing;
  useEffect(() => {
    dispatch(orderDetails(match.params.id));
  }, [dispatch, match]);

  console.log(orderDetailsObj);
  useEffect(() => {
    let arr = [];
    if (orderDetailsObj.products) {
      orderDetailsObj.products.forEach((element) => {
        let obj = {
          id: element.id,
          product: element.product,
          product_name: element.product_name,
          quantity: element.quantity,
          final_price: element.final_price,
        };
        arr.push(obj);
        setProduct(arr);
      });
    }
  }, [orderDetailsObj]);

  console.log(userInfo.token);
  const handleOrderComplete = (id) => {
    Axios.post(
      `${API}/product/mark-order-as-completed/${id}/`,
      {},
      {
        headers: { Authorization: 'JWT ' + userInfo.token },
      }
    )
      .then((res) => {
        notification.success({ message: 'Order completed' });
        history.push('/admin/order');
      })
      .catch((err) => {
        notification.error({ message: err.message });
      });
  };
  const handleCancelOrder = (id) => {
    Axios.post(
      `${API}/product/mark-order-as-cancelled/${id}/`,
      {},
      {
        headers: { Authorization: 'JWT ' + userInfo.token },
      }
    ).then((res) => {
      notification.success({ message: 'Order cancelled' });
      history.push('/admin/order');
    });
  };

  return (
    <Admin>
      <Row
        style={{
          height: '67px',
          backgroundColor: '#FE6D04',
          position: 'relative',
          width: '100%',
          marginBottom: '-67px',
        }}
      />
      <Row
        style={{ width: '100%', padding: '11px' }}
        justify="space-between"
        align="middle"
        gutter={[25, 30]}
      >
        <Col>
          <Title
            level={2}
            style={{
              color: '#fff',
            }}
          >
            Order Details
          </Title>
        </Col>
        <Col>
          <Breadcrumb separator="-">
            <Breadcrumb.Item>
              <Link to="/admin">
                <HomeOutlined /> Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/admin/order">Order Details</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row
        style={{ width: '100%', padding: '8px 38px' }}
        gutter={[25, 30]}
        justify="space-between"
        align="middle"
      >
        <Col>
          <Row align="middle">
            <Title level={3} style={{ margin: '0', paddingRight: '1.4rem' }}>
              Order #{orderDetailsObj.order_uuid}
            </Title>
            {orderDetailsObj.status === 'Ordered' ? (
              <Tag
                color="warning"
                style={{ height: '100%', color: '#000' }}
                icon={<ClockCircleOutlined />}
              >
                Ordered
              </Tag>
            ) : orderDetailsObj.status === 'Completed' ? (
              <Tag
                color="green"
                style={{ height: '100%', color: '#000' }}
                icon={<CheckCircleOutlined />}
              >
                Completed
              </Tag>
            ) : orderDetailsObj.status === 'Shipping' ? (
              <Tag
                color="blue"
                style={{ height: '100%', color: '#000' }}
                icon={<SyncOutlined spin />}
              >
                Shipping
              </Tag>
            ) : (
              <Tag
                color="red"
                style={{ height: '100%', color: '#000' }}
                icon={<CloseCircleOutlined />}
              >
                Cancelled
              </Tag>
            )}
            {/* {orderDetailsObj.payment === 1 ? (
              <Tag
                color="green"
                style={{ height: "100%", marginLeft: "1rem", color: "#000" }}
                icon={<CheckCircleOutlined />}
              >
                Paid
              </Tag>
            ) : (
              <Tag
                color="warning"
                style={{ height: "100%", marginLeft: "1rem", color: "#000" }}
                icon={<ClockCircleOutlined />}
              >
                Un-Paid
              </Tag>
            )} */}
            <Text style={{ marginLeft: '1rem' }}>
              <CalendarOutlined
                style={{ marginRight: '.6rem', color: 'green' }}
              />
              {orderDetailsObj.ordered_date}
            </Text>
          </Row>
        </Col>
        <Col>
          {/* {orderDetailsObj.status !== 'Completed' &&
          orderDetailsObj.status !== 'Cancelled' ? (
            <Dropdown overlay={menu} trigger={['click']}>
              <MoreOutlined
                style={{
                  fontWeight: '500',
                  border: '2px solid blue',
                  padding: '.3rem',
                  borderRadius: '.3rem',
                }}
              />
            </Dropdown>
          ) : null} */}

          {orderDetailsObj.status !== 'Completed' &&
            orderDetailsObj.status !== 'Cancelled' ? (
            <Space>
              <Button
                type="primary"
                onClick={(e) => handleCancelOrder(orderDetailsObj.id)}
                loading={loading}
                style={{
                  background: '#FE6D04',
                  border: '#FE6D04',
                  color: '#fff',
                  marginLeft: '2rem',
                  fontWeight: '500',
                }}
              >
                <CloseCircleOutlined />
                Cancel Order
              </Button>
              <Button
                type="primary"
                onClick={() => handleOrderComplete(orderDetailsObj.id)}
                loading={loading}
                style={{
                  marginLeft: '2rem',
                  fontWeight: '500',
                }}
              >
                Mark as Completed
              </Button>
            </Space>
          ) : null}
        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '8px 38px' }} gutter={[25, 30]}>
        <Col xs={16}>
          <Dashboardcard style={{ height: 'unset' }}>
            <Title level={4} style={{ marginBottom: '1.6rem' }}>
              Order Product
            </Title>
            {product.map((item) => (
              <Row
                key={item.id}
                align="middle"
                gutter={[10, 10]}
                style={{ width: '100%' }}
                justify="space-between"
              >
                <Col xl={8}>
                  <Link
                    to={`/product/products/${item.id}`}
                    style={{ marginLeft: '.5rem' }}
                  >
                    <Text>{item.product_name}</Text>
                  </Link>
                </Col>

                <Text>Qty - {item.quantity}</Text>
                <Text>
                  Rs. {Number(item.final_price).toLocaleString('en-IN')}
                </Text>
              </Row>
            ))}
          </Dashboardcard>
          <Dashboardcard style={{ marginTop: '1rem', height: 'unset' }}>
            <Row align="middle">
              <Title level={4} style={{ margin: '0 1rem 0 0' }}>
                Payment Option
              </Title>
              {orderDetailsObj.payment === 1 ? (
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              ) : (
                <ClockCircleTwoTone twoToneColor="#eb2f96" />
              )}
              <Row
                align="middle"
                gutter={[10, 10]}
                style={{ width: '100%', marginTop: '2rem' }}
                justify="space-between"
              >
                <Col>
                  {/* <Image
                    src="http://ultragroup.pythonanywhere.com/media/uploads/product/test%20rohan/a96b1026-f88f-4727-af05-6d05947fa627.webp"
                    width="100px"
                    height="100px"
                    style={{ borderRadius: "10px" }}
                    alt=""
                  /> */}
                  <Text style={{ marginLeft: '.5rem' }}>Cash on Delivery </Text>
                </Col>
                <Text>
                  Rs.{' '}
                  {billing !== undefined &&
                    Number(billing.amount_with_vat).toLocaleString('en-IN')}
                </Text>
              </Row>
            </Row>
          </Dashboardcard>
          <Dashboardcard style={{ marginTop: '1rem', height: 'unset' }}>
            <Row>
              <Title level={4}>Payment Summary</Title>
              <Row
                style={{ width: '100%' }}
                align="middle"
                gutter={[10, 10]}
                justify="space-between"
              >
                <Col>
                  <Text style={{ display: 'block' }}>Processed By</Text>
                  <Text style={{ display: 'block' }}>
                    Subtotal (
                    {orderDetailsObj.products !== undefined &&
                      orderDetailsObj.products.length}{' '}
                    items)
                  </Text>
                  {/* <Text style={{ display: 'block' }}>VAT Amount</Text> */}
                </Col>
                <Col>
                  <Text style={{ display: 'block' }}>
                    {orderDetailsObj.processed_by}
                  </Text>
                  <Text style={{ display: 'flex', flexDirection: 'flex-end' }}>
                    Rs.{' '}
                    {billing !== undefined &&
                      Number(billing.amount).toLocaleString('en-IN')}
                  </Text>
                  {/* <Text style={{ display: 'flex', flexDirection: 'flex-end' }}>
                    Rs.{' '}
                    {billing !== undefined &&
                      Number(billing.vat_amount).toLocaleString('en-IN')}
                  </Text> */}
                </Col>
              </Row>
              <Row
                justify="space-between"
                style={{
                  width: '100%',
                  background: '#f6f6f6',
                  padding: '.5rem',
                }}
              >
                <Text style={{ display: 'block' }}>
                  Total paid by customer (VAT Included)
                </Text>
                <Text style={{ display: 'block' }}>
                  Rs.{' '}
                  {billing !== undefined &&
                    Number(billing.amount_with_vat).toLocaleString('en-IN')}
                </Text>
              </Row>
            </Row>
          </Dashboardcard>
        </Col>
        <Col xs={8}>
          <Dashboardcard>
            <Row>
              <Title level={4}>Customer</Title>
              <Row style={{ width: '100%', marginTop: '1rem' }} align="middle">
                <Avatar
                  style={{ backgroundColor: '#87d068', marginRight: '1rem' }}
                  icon={<UserOutlined />}
                />
                <Text>{orderDetailsObj.full_name}</Text>
              </Row>
              <Divider />
              <Title level={4}>Shipping Details</Title>
              <Row style={{ width: '100%', marginTop: '1rem' }} align="middle">
                <Col xs={24}>
                  <Avatar
                    style={{
                      backgroundColor: 'transparent',
                      color: '#000',
                      marginRight: '1rem',
                    }}
                    icon={<UserOutlined />}
                  />
                  <Text>
                    {orderDetailsObj !== undefined && orderDetailsObj.full_name}
                  </Text>
                </Col>
                <Col xs={24}>
                  <Avatar
                    style={{
                      backgroundColor: 'transparent',
                      color: '#000',
                      marginRight: '1rem',
                    }}
                    icon={<MailOutlined />}
                  />
                  <Text>{orderDetailsObj.email}</Text>
                </Col>
                <Col xs={24}>
                  <Avatar
                    style={{
                      backgroundColor: 'transparent',
                      color: '#000',
                      marginRight: '1rem',
                    }}
                    icon={<MailOutlined />}
                  />
                  <Text> {orderDetailsObj.phone_number}</Text>
                </Col>
                <Col xs={24}>
                  <Text>Company Name -</Text>
                  <Text> {orderDetailsObj.company_name}</Text>
                </Col>
                {/* <Col xs={24}>
                  <Text>Country -</Text>
                  <Text> {orderDetailsObj.country}</Text>
                </Col> */}
                <Col xs={24}>
                  <Text>Street -</Text>
                  <Text> {orderDetailsObj.street_address}</Text>
                </Col>
                <Col xs={24}>
                  <Text>City -</Text>
                  <Text> {orderDetailsObj.city}</Text>
                </Col>
                <Col xs={24}>
                  <Text>District -</Text>
                  <Text> {orderDetailsObj.state}</Text>
                </Col>
                <Col xs={24}>
                  <Text>Postal Code -</Text>
                  <Text> {orderDetailsObj.postal_code}</Text>
                </Col>
              </Row>
            </Row>
          </Dashboardcard>
        </Col>
      </Row>
    </Admin>
  );
};

export default SingleOrderDetails;
