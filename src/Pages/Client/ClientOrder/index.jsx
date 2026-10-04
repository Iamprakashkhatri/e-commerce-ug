import { Row, Table, Tag, Button, Typography } from 'antd';
import React, { useEffect } from 'react';
import {
  EyeOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Client from '../components/Client';
import { listUserOrders } from '../../../actions/orderActions';

const { Title } = Typography;

const ClientOrder = () => {
  const myOrder = useSelector((state) => state.myOrderList);
  const { userOrders } = myOrder;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUserOrders());
  }, [dispatch]);

  const columns = [
    {
      title: 'Order UUID',
      width: '7%',
      dataIndex: 'id',
      key: 'number',
    },
    {
      title: 'Ordered At',
      dataIndex: 'time_since',
      key: 'time_since',
      width: '7%',
    },
    {
      title: 'Ordered Product',
      width: '31%',
      dataIndex: 'products',
      key: 'products',
      render: (product) => {
        return <span>{product[0].product_name}</span>;
      },
    },
    {
      title: 'Total amount',
      width: '14%',
      dataIndex: 'billing',
      key: 'billing',
      render: (billing) => {
        return <span>{billing.amount_with_charge}</span>;
      },
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
      width: '17%',
      dataIndex: 'status',
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
      title: 'Action',
      key: 'operation',

      width: 100,
      render: (order) => {
        return (
          <NavLink to={`/order/${order.id}`}>
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
    <Client>
      <Row justify="space-between" style={{ width: '100%' }}>
        <Title
          level={3}
          style={{
            color: '#000',
            marginBottom: '.3rem',
          }}
        >
          Recent Orders
        </Title>
      </Row>
      <Table
        style={{ marginTop: '2rem', width: '100%' }}
        columns={columns}
        dataSource={userOrders}
        scroll={{ x: 800 }}
      />
    </Client>
  );
};

export default ClientOrder;
