import React, { useEffect } from 'react';
import Admin from '../components';
import {
  Row,
  Col,
  Breadcrumb,
  Typography,
  Table,
  Tooltip,
  Button,
  Tag,
  DatePicker,
  Space,
  Input,
} from 'antd';
import { Link, NavLink } from 'react-router-dom';
import {
  HomeOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { Dashboardcard } from '../components/Dashboard/styles/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../../../actions/orderActions';
import './styles/styles.scss';
import { useState } from 'react';
import moment from 'moment';

const { Title } = Typography;

const AdminOrderPage = () => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);

  const [currentOrders, setCurrentOrders] = useState([]);

  const { loading, orders } = orderList;

  useEffect(() => {
    setCurrentOrders(orders);
  }, [orders]);

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  const searchByDate = (date) => {
    let newOrders = [];

    if (date === '') {
      setCurrentOrders(orders);
      return;
    }

    try {
      orders.map((val) =>
        moment(moment(val.ordered_date).format('YYYY-MM-DD')).isSame(
          moment(date).format('YYYY-MM-DD')
        )
          ? newOrders.push(val)
          : null
      );

      setCurrentOrders(newOrders);
    } catch (error) {
      console.log({ error });
    }
  };

  const searchById = (id) => {
    let newOrders = [];

    if (id === '') {
      setCurrentOrders(orders);
      return;
    }

    try {
      orders.map((val) =>
        val.id === parseInt(id) ? newOrders.push(val) : null
      );
      setCurrentOrders(newOrders);
    } catch (error) {
      console.log({ error });
    }
  };

  console.log(orders);
  const columns = [
    {
      title: 'Order UUID',
      width: '7%',
      dataIndex: 'id',
      key: 'number',
    },
    {
      title: 'Ordered By',
      width: '13%',
      dataIndex: ['billing', 'full_name'],
      key: ['billing', 'full_name'],
      ellipsis: {
        showTitle: false,
      },
      render: (user) => (
        <Tooltip placement="topLeft" title={user}>
          {user}
        </Tooltip>
      ),
    },
    {
      title: 'Ordered Product',
      dataIndex: 'products',
      width: '31%',
      key: 'products',
      render: (product) => {
        return <span>{product.length > 0 && product[0].product_name}</span>;
      },
    },
    {
      title: 'Total amount',
      width: '11%',
      dataIndex: 'billing',
      key: 'billing',
      render: (billing) => {
        return <span>{billing.amount_with_charge}</span>;
      },
    },
    {
      title: 'Ordered At',
      dataIndex: 'time_created',
      key: 'time_created',
      width: '14%',
    },
    // {
    //   title: "Payment Status",
    //   dataIndex: "payment",
    //   key: "payment",
    //   render: (payment) => {
    //     if (payment === 1) {
    //       return <Badge status="success" text="Paid" />;
    //     } else {
    //       return <Badge status="warning" text="Unpaid" />;
    //     }
    //   },
    // },
    {
      title: 'Order Status',
      dataIndex: 'status',
      key: 'status',
      width: '14%',
      render: (status) => {
        if (status === 'Ordered') {
          return (
            <Tag color="warning" icon={<ClockCircleOutlined />}>
              {status.toUpperCase()}
            </Tag>
          );
        }
        if (status === 'Shipping') {
          return (
            <Tag color="blue" icon={<SyncOutlined spin />}>
              {status.toUpperCase()}
            </Tag>
          );
        }
        if (status === 'Completed') {
          return (
            <Tag color="green" icon={<CheckCircleOutlined />}>
              {status.toUpperCase()}
            </Tag>
          );
        }
        if (status === 'Cancelled') {
          return (
            <Tag color="red" icon={<CloseCircleOutlined />}>
              {status.toUpperCase()}
            </Tag>
          );
        }
      },
    },
    {
      title: 'Processed By',
      width: '19%',
      dataIndex: 'processed_by',
      key: 'processedby',
      ellipsis: {
        showTitle: false,
      },
      render: (processed_by) => (
        <Tooltip placement="topLeft" title={processed_by}>
          {processed_by}
        </Tooltip>
      ),
    },
    {
      title: 'Action',
      key: 'operation',
      width: 150,
      fixed: 'right',
      render: (orders) => {
        return (
          <NavLink to={`/admin/order-details/${orders.id}`}>
            <Button
              type="primary"
              style={{ background: '#FE6D04', borderColor: '#FE6D04' }}
              icon={<EyeOutlined />}
            >
              View
            </Button>
          </NavLink>
        );
      },
    },
  ];

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
            Order
          </Title>
        </Col>
        <Col>
          <Breadcrumb separator="-">
            <Breadcrumb.Item>
              <Link to="/admin">
                <HomeOutlined /> Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Order</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '11px' }} gutter={[25, 30]}>
        <Col xs={24}>
          <Dashboardcard>
            <Row justify="space-between">
              <Col>
                <Title
                  level={3}
                  style={{
                    color: '#000',
                    marginBottom: '.3rem',
                  }}
                >
                  Total Orders Table
                </Title>
              </Col>
              <Col>
                <Space>
                  <Input
                    size="large"
                    placeholder="Search By Order ID"
                    onChange={(e) => searchById(e.currentTarget.value)}
                  />
                  <DatePicker
                    size="large"
                    placeholder="Search By Order Date"
                    style={{ width: '250px' }}
                    onChange={(e, dateString) => searchByDate(dateString)}
                  />
                </Space>
              </Col>
            </Row>
            <Table
              style={{ marginTop: '2rem' }}
              columns={columns}
              loading={loading}
              dataSource={currentOrders}
              scroll={{ x: 1300 }}
              pagination={{ position: ['bottomCenter'] }}
            />
          </Dashboardcard>
        </Col>
      </Row>
    </Admin>
  );
};

export default AdminOrderPage;
