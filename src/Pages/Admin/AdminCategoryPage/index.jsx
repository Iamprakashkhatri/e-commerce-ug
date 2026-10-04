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
  Space,
  Popconfirm,
  message,
  notification,
} from 'antd';
import placeholder from '../../../assets/Images/errorimg.png';
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
import { getCategories } from '../../../actions/productActions';
import { deleteCategory } from '../../../actions/adminActions';

const { Title } = Typography;

const AdminCategoryPage = () => {
  const categories = useSelector((state) => state.category.categories);
  const deleteCategoryMessage = useSelector((state) => state.deleteCategory);
  const deleteCategoryLoading = useSelector((state) => state.deleteCategory);
  const { deleteLoading } = deleteCategoryLoading;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (deleteCategoryMessage.deleteCategory) {
      if (deleteCategoryMessage.deleteCategory.message !== undefined) {
        notification.success({
          message: deleteCategoryMessage.deleteCategory.message,
        });
        deleteCategoryMessage.deleteCategory = {};
        dispatch(getCategories());
      }
    }
    if (deleteCategoryMessage.error) {
      if (
        deleteCategoryMessage.error === 'Request failed with status code 405'
      ) {
        notification.error({
          message:
            'Cannot delete this category. Delete all its sub categories first.',
        });
        deleteCategoryMessage.error = null;
      } else {
        notification.error({ message: deleteCategoryMessage.error });
        deleteCategoryMessage.error = null;
      }
    }
  }, [deleteCategoryMessage, dispatch]);

  const deleteSelectedCategory = (slug) => {
    try {
      dispatch(deleteCategory(slug));
    } catch (err) { }
  };

  const columns = [
    {
      title: 'ID',
      width: 100,
      dataIndex: 'id',
      key: 'number',
    },
    {
      title: 'Category Name',
      width: 260,
      dataIndex: 'name',
      key: 'name',
      ellipsis: {
        showTitle: false,
      },
      render: (category) => (
        <Tooltip placement="topLeft" title={category}>
          {category}
        </Tooltip>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) =>
        image !== null &&
        image.length > 0 && <Image src={image || placeholder} width={100} />,
    },
    {
      title: 'Image Placeholder',
      dataIndex: 'image_placeholder',
      key: 'image_placeholder',
      render: (image) =>
        image !== null &&
        image.length > 0 && <Image src={image || placeholder} width={100} />,
    },

    {
      title: 'Actions',
      key: 'operation',
      width: 150,
      render: (value) => {
        return (
          <Space direction="vertical" size="small">
            <NavLink to={`/admin/updatecategory/${value.slug}`}>
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
              onConfirm={() => deleteSelectedCategory(value.slug)}
            >
              <Button
                type="primary"
                loading={deleteLoading}
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
            Category
          </Title>
        </Col>
        <Col>
          <Breadcrumb separator="-">
            <Breadcrumb.Item>
              <Link to="/admin">
                <HomeOutlined /> Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Category</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '11px' }}>
        <Dashboardcard>
          <Row justify="space-between">
            <Title level={3}>Category List</Title>
            <Link to="/admin/addcategory" style={{ color: '#fff' }}>
              <Button
                type="primary"
                style={{
                  width: '100%',
                  borderColor: '#FE6D04',
                  background: '#FE6D04',
                }}
                icon={<PlusOutlined />}
              >
                Add Category
              </Button>
            </Link>
          </Row>
          <Table
            style={{ marginTop: '2rem', width: '100%' }}
            columns={columns}
            dataSource={categories}
            scroll={{ x: 1000 }}
            pagination={{ position: ['bottomCenter'] }}
          />
        </Dashboardcard>
      </Row>
    </Admin>
  );
};
export default AdminCategoryPage;
