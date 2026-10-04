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
import { Link, NavLink } from 'react-router-dom';
import {
  HomeOutlined,
  PlusOutlined,
  SettingOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import Admin from '../components';
import placeholder from '../../../assets/Images/errorimg.png';

import './styles/style.scss';
import { Dashboardcard } from '../components/Dashboard/styles/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getSubCategories } from '../../../actions/productActions';
import { deleteSubCategory } from '../../../actions/adminActions';

const { Title } = Typography;

const AdminSubCategoryPage = () => {
  const subCategories = useSelector((state) => state.subCategory.subCategories);

  const deleteSubCategoryMessage = useSelector(
    (state) => state.deleteSubCategory
  );
  const deleteSubCategoryLoading = useSelector(
    (state) => state.deleteSubCategory
  );
  const { deleteLoading } = deleteSubCategoryLoading;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubCategories());
  }, [dispatch]);

  const deleteSelectedSubCategory = (slug) => {
    dispatch(deleteSubCategory(slug));
  };

  useEffect(() => {
    if (deleteSubCategoryMessage.deleteSubCategory) {
      if (deleteSubCategoryMessage.deleteSubCategory.message !== undefined) {
        notification.success({
          message: deleteSubCategoryMessage.deleteSubCategory.message,
        });
        deleteSubCategoryMessage.deleteSubCategory = {};
        dispatch(getSubCategories());
      }
      if (deleteSubCategoryMessage.error) {
        if (
          deleteSubCategoryMessage.error ===
          'Request failed with status code 405'
        ) {
          notification.error({
            message:
              'Cannot delete this sub category. Delete all its products first.',
          });
          deleteSubCategoryMessage.error = null;
        } else {
          notification.error({ message: deleteSubCategoryMessage.error });
          deleteSubCategoryMessage.error = null;
        }
      }
    }
  }, [deleteSubCategoryMessage, dispatch]);

  const columns = [
    {
      title: 'ID',
      width: 100,
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Sub Category Name',
      width: 260,
      dataIndex: 'name',
      key: 'name',
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
      title: 'Cover Image',
      dataIndex: 'cover_image',
      key: 'cover_image',
      render: (image) =>
        image !== null &&
        image.length > 0 && <Image src={image || placeholder} width={100} />,
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      key: 'icon',
      render: (image) =>
        image !== null &&
        image.length > 0 && <Image src={image || placeholder} width={100} />,
    },
    {
      title: 'Category',
      dataIndex: 'category_name',
      key: 'category_name',
    },
    {
      title: 'Actions',
      key: 'operation',
      width: 150,
      render: (value) => {
        return (
          <Space direction="vertical" size="small">
            <NavLink to={`/admin/updatesubcategory/${value.slug}`}>
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
              onConfirm={() => deleteSelectedSubCategory(value.slug)}
            >
              <Button
                type="primary"
                loading={deleteLoading}
                style={{
                  width: '100%',
                  background: '#ec524b',
                  borderColor: '#ec524b',
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
            Sub Category
          </Title>
        </Col>
        <Col>
          <Breadcrumb separator="-">
            <Breadcrumb.Item>
              <Link to="/admin">
                <HomeOutlined /> Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Sub Category</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '11px' }}>
        <Dashboardcard>
          <Row justify="space-between">
            <Title level={3}>Sub Category List</Title>
            <Link to="/admin/addsubcategory" style={{ color: '#fff' }}>
              <Button
                type="primary"
                style={{
                  width: '100%',
                  borderColor: '#FE6D04',
                  background: '#FE6D04',
                }}
                icon={<PlusOutlined />}
              >
                Add Sub Category
              </Button>
            </Link>
          </Row>
          <Table
            style={{ marginTop: '2rem', width: '100%' }}
            columns={columns}
            dataSource={subCategories}
            scroll={{ x: 1000 }}
            pagination={{ position: ['bottomCenter'] }}
          />
        </Dashboardcard>
      </Row>
    </Admin>
  );
};

export default AdminSubCategoryPage;
