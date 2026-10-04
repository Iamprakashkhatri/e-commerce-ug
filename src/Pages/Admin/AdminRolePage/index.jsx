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
  Tag,
  notification,
} from 'antd';
import { Link, NavLink } from 'react-router-dom';
import {
  HomeOutlined,
  PlusOutlined,
  DeleteOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import Admin from '../components';
import './styles/style.scss';
import { Dashboardcard } from '../components/Dashboard/styles/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getRoles } from '../../../actions/userActions';
import Axios from 'axios';
import { API } from '../../../config';

const { Title } = Typography;

const AdminRolePage = () => {
  const dispatch = useDispatch();

  const roles = useSelector((state) => state.roles);
  const { userInfo } = useSelector((state) => state.userInfo);

  console.log(roles);

  useEffect(() => {
    dispatch(getRoles());
  }, [dispatch]);

  console.log('check roles ', roles);

  const handleDelete = (slug) => {
    console.log('role id ', slug);
    Axios.delete(`${API}/account/roles/${slug}/`, {
      headers: { Authorization: 'JWT ' + userInfo.token },
    })
      .then(() => {
        notification.success({ message: 'Role Deleted' });
        dispatch(getRoles());
      })
      .catch(() => {
        notification.error({ message: 'Role Failed to delete' });
      });
  };

  const columns = [
    {
      title: 'ID',
      width: 100,
      dataIndex: 'id',
      key: 'number',
    },
    {
      title: 'Role',
      width: 150,
      dataIndex: 'name',
      key: 'title',
      ellipsis: {
        showTitle: false,
      },
      render: (item) => (
        <Tooltip key={item} placement="topLeft" title={item}>
          {item}
        </Tooltip>
      ),
    },
    {
      title: 'Access to',
      width: 250,
      dataIndex: 'page_list',
      key: 'content',
      render: (pages) =>
        pages.map((item) => (
          <Tag
            key={item}
            style={{
              margin: '5px',
            }}
            color="#f50"
          >
            {item}
          </Tag>
        )),
    },
    {
      title: 'Actions',
      key: 'operation',
      width: 150,
      render: (value) => {
        return (
          <Space key={value} direction="vertical" size="small">
            <NavLink to={`/admin/update-role/${value.id}/${value.slug}/`}>
              <Button
                type="primary"
                style={{
                  width: '100%',
                  background: '#00587a',
                  borderColor: '#00587a',
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
              onConfirm={() => handleDelete(value.slug)}
            >
              <Button
                type="primary"
                style={{
                  width: '100%',
                  background: '#FE6D04',
                  borderColor: '#FE6D04',
                }}
                icon={<DeleteOutlined />}
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
            Roles
          </Title>
        </Col>
        <Col>
          <Breadcrumb separator="-">
            <Breadcrumb.Item>
              <Link to="/admin">
                <HomeOutlined /> Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Roles</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '11px' }}>
        <Dashboardcard>
          <Row justify="space-between">
            <Title level={3}>Roles List</Title>
            <Link to="/admin/create-role" style={{ color: '#fff' }}>
              <Button
                type="primary"
                style={{
                  width: '100%',
                  borderColor: '#FE6D04',
                  background: '#FE6D04',
                }}
                icon={<PlusOutlined />}
              >
                Add Role
              </Button>
            </Link>
          </Row>
          <Table
            style={{ marginTop: '2rem', width: '100%' }}
            columns={columns}
            dataSource={roles && roles.roles ? roles.roles : []}
            scroll={{ x: 1000 }}
            pagination={{ position: ['bottomCenter'] }}
          />
        </Dashboardcard>
      </Row>
    </Admin>
  );
};

export default AdminRolePage;
