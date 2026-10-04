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
  message,
  notification,
} from 'antd';
import { Link, NavLink } from 'react-router-dom';
import {
  HomeOutlined,
  PlusOutlined,
  SettingOutlined,
  DeleteOutlined,
  SendOutlined,
} from '@ant-design/icons';
import Admin from '../components';
import './styles/style.scss';
import { Dashboardcard } from '../components/Dashboard/styles/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import {
  getNewsletterList,
  deleteNewsletter,
  sendSubscriptionMailAction,
} from '../../../actions/adminActions';
import ReactHtmlParser from 'react-html-parser';

const { Title } = Typography;

const AdminNewsletterPage = () => {
  const dispatch = useDispatch();
  const newslettersList = useSelector((state) => state.newsletter.newsletters);

  useEffect(() => {
    dispatch(getNewsletterList());
  }, [dispatch]);

  const deleteSelectedNewsletter = (slug) => {
    dispatch(deleteNewsletter(slug));
  };

  const deleteNewsletterMessage = useSelector(
    (state) => state.deleteNewsletter
  );
  const deleteNewsletterLoading = useSelector(
    (state) => state.deleteNewsletter
  );
  const { deleteLoading } = deleteNewsletterLoading;

  useEffect(() => {
    if (deleteNewsletterMessage.deleteNewsletter) {
      if (deleteNewsletterMessage.deleteNewsletter.message !== undefined) {
        notification.success({
          message: deleteNewsletterMessage.deleteNewsletter.message,
        });
        deleteNewsletterMessage.deleteNewsletter = {};
        dispatch(getNewsletterList());
      }
    }
    if (deleteNewsletterMessage.error) {
      notification.error({ message: deleteNewsletterMessage.error });
      deleteNewsletterMessage.error = null;
    }
  }, [deleteNewsletterMessage, dispatch]);

  const sendNewsLetterFunction = (id) => {
    dispatch(sendSubscriptionMailAction(id));
  };

  const sendNewsetterMsg = useSelector((state) => state.sendSubscriptionMail);

  useEffect(() => {
    if (sendNewsetterMsg.sendSubscriptionMail) {
      if (sendNewsetterMsg.sendSubscriptionMail.message !== undefined) {
        notification.success({
          message: sendNewsetterMsg.sendSubscriptionMail.message,
        });
        sendNewsetterMsg.sendSubscriptionMail = {};
      }
    }
    if (sendNewsetterMsg.error) {
      notification.error({ message: sendNewsetterMsg.error });
      sendNewsetterMsg.error = null;
    }
  }, [sendNewsetterMsg, dispatch]);

  const columns = [
    {
      title: 'ID',
      width: 100,
      dataIndex: 'id',
      key: 'number',
    },
    {
      title: 'Title',
      width: 150,
      dataIndex: 'title',
      key: 'title',
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
      title: 'Subject',
      width: 250,
      dataIndex: 'email_subject',
      key: 'email_subject',
      render: (item) => (
        <Tooltip placement="topLeft" title={item}>
          {item}
        </Tooltip>
      ),
    },
    {
      title: 'Content',
      width: 250,
      dataIndex: 'content',
      key: 'content',
      render: (item) => (
        <Tooltip placement="topLeft" title={item}>
          {ReactHtmlParser(item)}
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      key: 'operation',
      width: 150,
      render: (value) => {
        return (
          <Space direction="vertical" size="small">
            <NavLink to={`/admin/updatenewsletter/${value.slug}`}>
              <Button
                type="primary"
                style={{
                  width: '100%',
                  background: '#FE6D04',
                  borderColor: '#FE6D04',
                }}
                icon={<SettingOutlined />}
              >
                View
              </Button>
            </NavLink>

            <Popconfirm
              title="Are you sure?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => deleteSelectedNewsletter(value.slug)}
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

            <Popconfirm
              title="Are you sure?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => sendNewsLetterFunction(value.id)}
            >
              <Button
                type="primary"
                style={{
                  width: '100%',
                  background: '#FE6D04',
                  borderColor: '#FE6D04',
                }}
                icon={<SendOutlined />}
              >
                Send
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
            Newsletters
          </Title>
        </Col>
        <Col>
          <Breadcrumb separator="-">
            <Breadcrumb.Item>
              <Link to="/admin">
                <HomeOutlined /> Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Newsletters</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '11px' }}>
        <Dashboardcard>
          <Row justify="space-between">
            <Title level={3}>Newsletter List</Title>
            <Link to="/admin/addnewsletter" style={{ color: '#fff' }}>
              <Button
                type="primary"
                style={{
                  width: '100%',
                  borderColor: '#FE6D04',
                  background: '#FE6D04',
                }}
                icon={<PlusOutlined />}
              >
                Add Newsletter
              </Button>
            </Link>
          </Row>
          <Table
            style={{ marginTop: '2rem', width: '100%' }}
            columns={columns}
            dataSource={newslettersList}
            scroll={{ x: 1000 }}
            pagination={{ position: ['bottomCenter'] }}
          />
        </Dashboardcard>
      </Row>
    </Admin>
  );
};

export default AdminNewsletterPage;
