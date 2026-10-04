import React, { useEffect } from 'react';
import {
  Row,
  Col,
  Typography,
  Table,
  Breadcrumb,
  Tooltip,
  Button,
  Space,
  Popconfirm,
  Badge,
  message,
  notification,
} from 'antd';
import { Link, NavLink } from 'react-router-dom';
import {
  HomeOutlined,
  PlusOutlined,
  SettingOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import Admin from '../components';
import './styles/style.scss';
import { Dashboardcard } from '../components/Dashboard/styles/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFAQ } from '../../../actions/adminActions';
import { getFAQ } from '../../../actions/contactActions';

const { Title } = Typography;

const AdminFAQPage = () => {
  const faq = useSelector((state) => state.faq.faq);
  const deleteFAQMessage = useSelector((state) => state.deleteFAQ);
  const deleteFAQLoading = useSelector((state) => state.deleteFAQ);
  const { deleteLoading } = deleteFAQLoading;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFAQ());
  }, [dispatch]);

  const deleteSelectedFAQ = (slug) => {
    dispatch(deleteFAQ(slug));
  };

  useEffect(() => {
    if (deleteFAQMessage.deleteFAQ) {
      if (deleteFAQMessage.deleteFAQ.message !== undefined) {
        notification.success({ message: deleteFAQMessage.deleteFAQ.message });
        deleteFAQMessage.deleteFAQ = {};
        dispatch(getFAQ());
      }
    }

    if (deleteFAQMessage.error) {
      notification.error({ message: deleteFAQMessage.error });
      deleteFAQMessage.error = null;
    }
  }, [deleteFAQMessage, dispatch]);

  const columns = [
    {
      title: 'ID',
      width: 100,
      dataIndex: 'id',
      key: 'number',
    },
    {
      title: 'Question',
      width: 300,
      dataIndex: 'question',
      key: 'question',
      ellipsis: {
        showTitle: false,
      },
      render: (item) => (
        <Tooltip placement="topLeft" title={item}>
          {item}
        </Tooltip>
      ),
    },
    {
      title: 'Answer',
      width: 300,
      dataIndex: 'answer',
      key: 'answer',
      ellipsis: {
        showTitle: false,
      },
      render: (item) => (
        <Tooltip placement="topLeft" title={item}>
          {item}
        </Tooltip>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
      width: 100,
      render: (status) => {
        let statusText = '';

        if (status === true) {
          statusText = 'Active';
        } else {
          statusText = 'Inactive';
        }
        return (
          <Badge
            status={status === true ? 'success' : 'warning'}
            text={statusText}
          />
        );
      },
    },
    {
      title: 'Actions',
      key: 'operation',
      width: 150,
      render: (value) => {
        return (
          <Space direction="vertical" size="small">
            <NavLink to={`/admin/updatefaq/${value.slug}`}>
              <Button
                type="primary"
                style={{
                  width: '100%',
                  background: '#FE6D04',
                  borderColor: '#FE6D04',
                }}
                icon={<SettingOutlined />}
              >
                Update
              </Button>
            </NavLink>

            <Popconfirm
              title="Are you sure?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => deleteSelectedFAQ(value.slug)}
            >
              <Button
                type="primary"
                style={{
                  width: '100%',
                  background: '#FE6D04',
                  borderColor: '#FE6D04',
                }}
                icon={<DeleteOutlined />}
                loading={deleteLoading}
              >
                Delete
              </Button>
            </Popconfirm>
          </Space>
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
            FAQ
          </Title>
        </Col>
        <Col>
          <Breadcrumb separator="-">
            <Breadcrumb.Item>
              <Link to="/admin">
                <HomeOutlined /> Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>FAQ</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '11px' }}>
        <Dashboardcard>
          <Row justify="space-between">
            <Title level={3}>FAQ List</Title>
            <Link to="/admin/addfaq" style={{ color: '#fff' }}>
              <Button
                type="primary"
                style={{
                  width: '100%',
                  borderColor: '#FE6D04',
                  background: '#FE6D04',
                }}
                icon={<PlusOutlined />}
              >
                Add FAQ
              </Button>
            </Link>
          </Row>
          <Table
            style={{ marginTop: '2rem', width: '100%' }}
            columns={columns}
            dataSource={faq}
            scroll={{ x: 1000 }}
            pagination={{ position: ['bottomCenter'] }}
          />
        </Dashboardcard>
      </Row>
    </Admin>
  );
};

export default AdminFAQPage;
