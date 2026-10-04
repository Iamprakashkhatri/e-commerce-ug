import { HomeOutlined, StopOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Col,
  Row,
  Form,
  Select,
  Button,
  message,
  Input,
  Image,
  Badge,
  Popconfirm,
  Spin,
  notification,
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Title from 'antd/lib/skeleton/Title';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserData } from '../../../actions/adminActions';
import { getRoles } from '../../../actions/userActions';
import { updateRole } from '../../../actions/userActions';
import { API } from '../../../config';
import {
  Createproductleft,
  Createproductright,
  Productheight,
} from '../AdminProductPage/styles/product';
import Admin from '../components';
import errorImg from '../../../assets/Images/errorimg.png';

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} />;

const { Option } = Select;

function UserDetails({ match }) {
  const userData = useSelector((state) => state.userData.userData);
  const { userInfo } = useSelector((state) => state.userInfo);
  const userUpdateRoleLoading = useSelector((state) => state.updateRole);
  const { loading } = userUpdateRoleLoading;
  const [role, setRole] = useState('');
  const id = match.params.id;
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const { roles } = useSelector((state) => state.roles);

  useEffect(() => {
    dispatch(getRoles());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserData(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        phone_no: userData.phone_no,
        role: userData.role && userData.role.id,
      });
    }
  }, [userData, form]);

  const handleRoleChange = () => {
    let data = new FormData();

    data.append('role', role);
    data.append('user', id);

    Axios.post(`${API}/account/assign-role/`, data, {
      headers: { Authorization: 'JWT ' + userInfo.token },
    })
      .then(() => {
        notification.success({ message: 'Role assigned' });
      })
      .catch(() => {
        notification.error({ message: 'Failed to assign Role' });
      });
  };

  const handleBlock = () => {
    Axios.post(
      `${API}/account/users/${id}/block-user/`,
      {},
      {
        headers: { Authorization: 'JWT ' + userInfo.token },
      }
    )
      .then((res) => {
        notification.success({ message: res.data.message });
        dispatch(getUserData(id));
      })
      .catch((err) => {
        notification.error({ message: 'Failed to block user' });
      });
  };

  const handleUnblock = () => {
    Axios.post(
      `${API}/account/users/${id}/unblock-user/`,
      {},
      {
        headers: { Authorization: 'JWT ' + userInfo.token },
      }
    )
      .then((res) => {
        notification.success({ message: res.data.message });
        dispatch(getUserData(id));
      })
      .catch((err) => {
        notification.error({ message: 'Failed to unblock user' });
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
            User Details
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
              <Link to="/admin/users">Users</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>User Details</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '11px' }}>
        <Form
          form={form}
          name="customized_form_controls"
          style={{ width: '100%', display: 'flex', marginTop: '2rem' }}
          layout="vertical"
        >
          <Row gutter={[{ xs: 0, lg: 16 }, 16]} style={{ width: '100%' }}>
            <Col xs={24} lg={14}>
              <Createproductleft style={{ height: 'fit-content' }}>
                <Form.Item label="Full Name">
                  <Row gutter={[20, 0]}>
                    <Col lg={12}>
                      <Form.Item name="first_name" label="First Name">
                        <Input value={userData.first_name} readOnly />
                      </Form.Item>
                    </Col>
                    <Col lg={12}>
                      <Form.Item name="last_name" label="Last Name">
                        <Input value={userData.last_name} readOnly />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item name="email" label="Email">
                  <Input value={userData.email} readOnly />
                </Form.Item>
                <Form.Item name="phone_no" label="Phone Number">
                  <Input value={userData.phone_no} readOnly />
                </Form.Item>
              </Createproductleft>
            </Col>
            <Col xs={24} lg={10}>
              <Createproductright>
                <Productheight>
                  {userData.avatar_url ? (
                    <Image
                      src={userData.avatar_url}
                      alt="user_image"
                      width="200px"
                      height="180px"
                    />
                  ) : (
                    <Image
                      src={errorImg}
                      alt="user_image"
                      width="200px"
                      height="180px"
                    />
                  )}
                  <Row gutter={[20, 0]}>
                    <Col lg={8}>
                      <Form.Item name="superuser" label="Superuser">
                        <Badge
                          status={
                            userData.is_superuser && userData.is_superuser
                              ? 'success'
                              : 'warning'
                          }
                          text={
                            userData.is_superuser && userData.is_superuser
                              ? 'Yes'
                              : 'No'
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={8}>
                      <Form.Item name="admin" label="Admin">
                        <Badge
                          status={
                            userData.is_admin && userData.is_admin
                              ? 'success'
                              : 'warning'
                          }
                          text={
                            userData.is_admin && userData.is_admin
                              ? 'Yes'
                              : 'No'
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={8}>
                      <Form.Item name="active" label="Active">
                        <Badge
                          status={
                            userData.is_active && userData.is_active
                              ? 'success'
                              : 'warning'
                          }
                          text={
                            userData.is_active && userData.is_active
                              ? 'Active'
                              : 'Inactive'
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  {userInfo && userInfo.user.is_superuser ? (
                    <>
                      <Form.Item name="role" label="Role">
                        <Select
                          onChange={(value) => setRole(value)}
                          value={
                            role
                              ? role
                              : userData && userData.role
                                ? userData.role.id
                                : null
                          }
                          style={{ width: '200px', marginLeft: '10px' }}
                          placeholder="Select Role"
                        >
                          {roles &&
                            roles.map((item) => (
                              <Option value={item.id} key={item.id}>
                                {item.name}
                              </Option>
                            ))}
                        </Select>
                      </Form.Item>
                      <Button
                        type="primary"
                        onClick={handleRoleChange}
                        disabled={loading}
                        style={{
                          width: '100%',
                          background: '#FE6D04',
                          borderColor: '#FE6D04',
                        }}
                      >
                        {loading && (
                          <Spin
                            indicator={antIcon}
                            style={{ marginRight: '10px', fontWeight: 600 }}
                          />
                        )}
                        Update Role
                      </Button>
                    </>
                  ) : null}

                  {userInfo && userInfo.user && userInfo.user.is_superuser ? (
                    <Col style={{ marginTop: '12px' }}>
                      {userData && userData.is_active ? (
                        <Popconfirm
                          title="Are you sure?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => handleBlock()}
                        >
                          <Button
                            type="primary"
                            style={{
                              width: '100%',
                              background: '#ec524b',
                              borderColor: '#ec524b',
                            }}
                            icon={<StopOutlined />}
                          >
                            Block
                          </Button>
                        </Popconfirm>
                      ) : (
                        <Popconfirm
                          title="Are you sure?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => handleUnblock()}
                        >
                          <Button
                            type="primary"
                            style={{
                              width: '100%',
                              background: '#ec524b',
                              borderColor: '#ec524b',
                            }}
                            icon={<StopOutlined />}
                          >
                            Unblock
                          </Button>
                        </Popconfirm>
                      )}
                    </Col>
                  ) : null}
                </Productheight>
              </Createproductright>
            </Col>
          </Row>
        </Form>
      </Row>
    </Admin>
  );
}
export default UserDetails;
