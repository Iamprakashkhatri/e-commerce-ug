import {
  Row,
  Breadcrumb,
  Col,
  Typography,
  Input,
  Form,
  Select,
  Checkbox,
  Button,
  message,
  Spin,
  notification,
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { HomeOutlined, LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import Admin from '../components';
import { Createproductleft } from './styles/product';
import './styles/style.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API } from '../../../config';
import { updateRole } from '../../../actions/userActions';

const { Title } = Typography;
const { Option } = Select;

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} />;

const UpdateRole = ({ match }) => {
  const [form] = Form.useForm();
  const id = match.params.id;
  const slug = match.params.slug;
  const roleMessage = useSelector((state) => state.updateRole);
  const updateRoleLoading = useSelector((state) => state.updateRole);
  const { loading } = updateRoleLoading;

  console.log(id, slug);

  const { userInfo } = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();
  const history = useHistory();
  console.log({ roleMessage });

  useEffect(() => {
    if (roleMessage && roleMessage.roles.data) {
      if (roleMessage.roles.data.message !== undefined) {
        notification.success({ message: roleMessage.roles.data.message });
        roleMessage.roles.data.message = {};
        history.push('/admin/roles');
      }
    }
    if (roleMessage.error) {
      notification.error({ message: 'error' });
      roleMessage.error = {};
    }
  }, [roleMessage, history]);

  const [roleData, setRoleData] = useState({
    name: '',
    pages: [],
    superUser: false,
  });

  const pages = [
    'order',
    'product',
    'category',
    'subcategory',
    'roles',
    'faq',
    'sliderImages',
    'newsletter',
    'userMessages',
    'order',
    'user',
  ];

  useEffect(() => {
    async function fetchProductData() {
      await axios
        .get(`${API}/account/roles/${slug}`, {
          headers: { Authorization: 'JWT ' + userInfo.token },
        })
        .then((res) => {
          setRoleData({
            ...roleData,
            name: res.data.name,
            pages: res.data.page_list,
            superUser: res.data.requires_superuser_permission,
          });
          form.setFieldsValue({
            role: res.data.name,
            pages: res.data.page_list,
            superuser: res.data.requires_superuser_permission,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const updateSelectedRole = () => {
    let roleFormData = new FormData();

    roleFormData.append('name', roleData.name);
    roleFormData.append('pages', roleData.pages);
    roleFormData.append('requires_superuser_permission', roleData.superUser);

    dispatch(updateRole(roleFormData, slug));
  };

  const handlePageChange = (value) => {
    setRoleData({ ...roleData, pages: value });
  };

  const handleRoleChange = (e) => {
    setRoleData({ ...roleData, name: e.target.value });
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
            Update Role
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
              <Link to="/admin/roles">Roles</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Update Role</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '11px' }}>
        <Form
          name="customized_form_controls"
          form={form}
          type="PUT"
          layout="vertical"
          onFinish={updateSelectedRole}
        >
          <Createproductleft>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: 'Please enter a role' }]}
            >
              <Input onChange={handleRoleChange} placeholder="Role" />
            </Form.Item>
            <Form.Item
              name="pages"
              label="Pages"
              rules={[{ required: true, message: 'Please select pages' }]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={handlePageChange}
              >
                {pages.map((item) => (
                  <Option key={item}>{item}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="superuser">
              <Checkbox
                checked={roleData.superUser}
                onChange={(e) =>
                  setRoleData({ ...roleData, superUser: e.target.checked })
                }
              >
                Superuser Permission
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
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
            </Form.Item>
          </Createproductleft>
        </Form>
      </Row>
    </Admin>
  );
};

export default UpdateRole;
