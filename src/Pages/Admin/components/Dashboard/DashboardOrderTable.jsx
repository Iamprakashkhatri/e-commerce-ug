import {
  Button,
  Col,
  DatePicker,
  Row,
  Space,
  Table,
  Typography,
  Tooltip,
  Badge,
  Tag,
} from 'antd';
import React, { useEffect } from 'react';
import { Dashboardcard } from './styles/dashboard';
import {
  EyeOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './styles/style.scss';
// import { listOrders } from "../../../../actions/orderActions";
import { getDashboardTodayOrder } from '../../../../actions/adminActions';
import Item from 'antd/lib/list/Item';

const { Title } = Typography;

const DashboardOrderTable = () => {
  const dispatch = useDispatch();
  function dateChange(date, dateString) {
    console.log(date, dateString);
  }
  const todayOrderList = useSelector(
    (state) => state.dashboardTodayOrder.todayOrderData
  );
  const loadingTodayOrder = useSelector((state) => state.dashboardTodayOrder);
  const { loading } = loadingTodayOrder;
  console.log('today order list', todayOrderList);
  useEffect(() => {
    dispatch(getDashboardTodayOrder());
  }, [dispatch]);

  const columns = [
    {
      title: 'Order UUID',
      dataIndex: 'id',
      key: 'number',
      width: '10%',
    },
    {
      title: 'Ordered By',
      width: '15%',
      dataIndex: 'full_name',
      key: 'full_name',
      ellipsis: {
        showTitle: false,
      },
      render: (full_name) => (
        <Tooltip placement="topLeft" title={full_name}>
          {full_name}
        </Tooltip>
      ),
    },
    {
      title: 'Ordered Product',
      dataIndex: 'products',
      width: '20%',
      key: 'products',
      render: (product) => {
        return <span>{product.length > 0 && product[0].product_name}</span>;
      },
    },
    {
      title: 'Total amount',
      dataIndex: 'billing',
      width: '11%',
      key: 'billing',
      render: (billing) => {
        return <span>{billing.amount_with_charge}</span>;
      },
    },
    {
      title: 'Ordered At',
      dataIndex: 'time_since',
      key: 'time_since',
      width: '15%',
    },
    {
      title: 'Payment Status',
      dataIndex: 'payment',
      width: '15%',
      key: 'payment',
      render: (payment) => {
        return <Badge status="processing" text={payment.payment_status} />;
      },
    },
    {
      title: 'Order Status',
      dataIndex: 'status',
      width: '17%',
      key: 'status',
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
      width: '20%',
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
      fixed: 'right',
      width: 150,
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
    <Row style={{ width: '100%', padding: '8px 38px' }} gutter={[25, 30]}>
      <Col xs={24}>
        <Dashboardcard>
          <Row justify="space-between">
            <Title
              level={3}
              style={{
                color: '#000',
                marginBottom: '.3rem',
              }}
            >
              Today Orders
            </Title>
            <Space>
              <DatePicker onChange={dateChange} />
            </Space>
          </Row>
          <Table
            style={{ marginTop: '2rem' }}
            columns={columns}
            loading={loading}
            dataSource={todayOrderList}
            scroll={{ x: 1200 }}
            pagination={{ position: ['bottomCenter'] }}
          />
        </Dashboardcard>
      </Col>
    </Row>
  );
};

export default DashboardOrderTable;
