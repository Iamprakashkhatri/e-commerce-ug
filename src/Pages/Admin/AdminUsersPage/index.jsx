import React, { useEffect } from 'react';
import {
  Row,
  Col,
  Typography,
  Table,
  Breadcrumb,
  Tooltip,
  Button,
  Image,
  Badge,
  Space,
  Popconfirm,
  message,
  notification,
} from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { HomeOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import Admin from '../components';
import './styles/style.scss';
import { Dashboardcard } from '../components/Dashboard/styles/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../../../actions/adminActions';
import Axios from 'axios';
import { API } from '../../../config';

const { Title } = Typography;

const AdminUserPage = () => {
  const users = useSelector((state) => state.users.users);
  const { userInfo } = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const handleRoleRemove = (id) => {
    Axios.post(
      `${API}/account/remove-role/${id}/`,
      {},
      {
        headers: { Authorization: 'JWT ' + userInfo.token },
      }
    )
      .then(() => {
        dispatch(getUserList());
        notification.success({ message: 'Role removed' });
      })
      .catch(() => {
        notification.error({ message: 'Failed to remove Role' });
      });
  };

  const columns = [
    {
      title: 'ID',
      width: 50,
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'First Name',
      width: 150,
      dataIndex: 'first_name',
      key: 'last_name',
      ellipsis: {
        showTitle: false,
      },
      render: (element) => (
        <Tooltip placement="topLeft" title={element}>
          {element}
        </Tooltip>
      ),
    },
    {
      title: 'Last Name',
      width: 150,
      dataIndex: 'last_name',
      key: 'last_name',
      ellipsis: {
        showTitle: false,
      },
      render: (element) => (
        <Tooltip placement="topLeft" title={element}>
          {element}
        </Tooltip>
      ),
    },
    {
      title: 'Email',
      width: 250,
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone No.',
      width: 150,
      dataIndex: 'phone_no',
      key: 'phone_no',
    },
    {
      title: 'Avatar',
      width: 200,
      dataIndex: 'avatar_url',
      key: 'avatar_url',
      render: (image) => image !== null && <Image src={image} width={100} />,
    },
    {
      title: 'Super User',
      width: 100,
      dataIndex: 'is_superuser',
      key: 'is_superuser',
      render: (status) => {
        let statusText = '';

        if (status === true) {
          statusText = 'Yes';
        } else {
          statusText = 'No';
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
      title: 'Admin',
      width: 100,
      dataIndex: 'is_admin',
      key: 'is_admin',
      render: (status) => {
        let statusText = '';

        if (status === true) {
          statusText = 'Yes';
        } else {
          statusText = 'No';
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
      title: 'Role',
      width: 120,
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tooltip placement="topLeft" title={role ? role.name : null}>
          {role ? role.name : null}
        </Tooltip>
      ),
    },
    {
      title: 'Active',
      width: 100,
      dataIndex: 'is_active',
      key: 'is_active',
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
      width: 200,
      render: (value) => {
        return (
          <Space direction="vertical" size="small">
            <NavLink to={`/admin/userdetails/${value.id}`}>
              <Button
                type="primary"
                style={{
                  width: '100%',
                  background: '#00587a',
                  borderColor: '#00587a',
                }}
                icon={<EyeOutlined />}
              >
                View
              </Button>
            </NavLink>

            <Popconfirm
              title="Are you sure?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleRoleRemove(value.id)}
            >
              <Button
                type="primary"
                style={{
                  width: '100%',
                  background: '#ec524b',
                  borderColor: '#ec524b',
                }}
                icon={<DeleteOutlined />}
              >
                Remove Role
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
            Users
          </Title>
        </Col>
        <Col>
          <Breadcrumb separator="-">
            <Breadcrumb.Item>
              <Link to="/admin">
                <HomeOutlined /> Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Users</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '11px' }}>
        <Dashboardcard>
          <Row justify="space-between">
            <Title level={3}>User List</Title>
          </Row>
          <Table
            style={{ marginTop: '2rem', width: '100%' }}
            columns={columns}
            dataSource={users}
            scroll={{ x: 1300 }}
            pagination={{ position: ['bottomCenter'] }}
          />
        </Dashboardcard>
      </Row>
    </Admin>
  );
};

export default AdminUserPage;
