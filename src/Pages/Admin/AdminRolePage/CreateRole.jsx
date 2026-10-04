import {
  Row,
  Breadcrumb,
  Col,
  Typography,
  Input,
  Form,
  Button,
  message,
  Select,
  Checkbox,
  Spin,
  notification,
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { HomeOutlined, LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import Admin from '../components';
import { Createproductleft } from './styles/product';
import './styles/style.scss';
import { addRole } from '../../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const { Option } = Select;

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} />;

const { Title } = Typography;

const CreateRole = () => {
  const dispatch = useDispatch();
  const roleMessage = useSelector((state) => state.addRole);
  const addRoleLoading = useSelector((state) => state.addRole);
  const { loading } = addRoleLoading;

  const history = useHistory();
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
    'user',
  ];

  const handlePageChange = (value) => {
    setRoleData({ ...roleData, pages: value });
  };

  const handleRoleChange = (e) => {
    setRoleData({ ...roleData, name: e.target.value });
  };

  useEffect(() => {
    if (roleMessage && roleMessage.roles.data) {
      if (roleMessage.roles.data.message !== undefined) {
        notification.success({ message: roleMessage.roles.data.message });
        roleMessage.roles.data.message = {};
        history.push('/admin/roles');
      }
    }
    if (roleMessage.error) {
      notification.error({ message: 'Role name already exists' });
      roleMessage.error = {};
    }
  }, [roleMessage, history]);

  const onSubmit = () => {
    let roleFormData = new FormData();

    roleFormData.append('name', roleData.name);
    roleFormData.append('pages', roleData.pages);
    roleFormData.append('requires_superuser_permission', roleData.superUser);

    dispatch(addRole(roleFormData));
  };

  console.log(pages);
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
            Add Role
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
            <Breadcrumb.Item>Add Role</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '11px' }}>
        <Form
          name="customized_form_controls"
          layout="vertical"
          onFinish={onSubmit}
        >
          <Createproductleft>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: 'Please enter a role' }]}
            >
              <Input
                value={roleData.name}
                onChange={handleRoleChange}
                placeholder="Role"
              />
            </Form.Item>
            <Form.Item
              name="Pages"
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
                Add Role
              </Button>
            </Form.Item>
          </Createproductleft>
        </Form>
      </Row>
    </Admin>
  );
};

export default CreateRole;
