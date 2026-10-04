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
  Popconfirm,
  message,
  notification,
} from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';
import Admin from '../components';
import './styles/style.scss';
import { Dashboardcard } from '../components/Dashboard/styles/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../actions/productActions';
import { setFeaturedProduct } from '../../../actions/adminActions';

const { Title } = Typography;

const AdminFeaturedProductPage = () => {
  const products = useSelector((state) => state.product.products);

  const featuredProductMessage = useSelector(
    (state) => state.setFeaturedProduct
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const setSelectedFeaturedProduct = (id) => {
    let formData = new FormData();

    formData.append('id', id);
    dispatch(setFeaturedProduct(formData));
  };

  useEffect(() => {
    if (featuredProductMessage.setFeaturedProduct) {
      if (featuredProductMessage.setFeaturedProduct.message !== undefined) {
        notification.success({
          message: featuredProductMessage.setFeaturedProduct.message,
        });
        featuredProductMessage.setFeaturedProduct = {};
      }
      if (featuredProductMessage.error) {
        notification.error({ message: featuredProductMessage.error });
        featuredProductMessage.error = null;
      }
    }
  }, [featuredProductMessage]);

  const columns = [
    {
      title: 'Product ID',
      width: 100,
      dataIndex: 'id',
      key: 'number',
    },
    {
      title: 'Product Name',
      width: 220,
      dataIndex: 'name',
      key: 'name',
      ellipsis: {
        showTitle: false,
      },
      render: (product) => (
        <Tooltip placement="topLeft" title={product}>
          {product}
        </Tooltip>
      ),
    },
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'image',
      render: (image) =>
        image !== null &&
        image.length > 0 && <Image src={image[0].image} width={100} />,
    },
    {
      title: 'Category',
      dataIndex: 'cat_name',
      key: 'cat_name',
    },
    {
      title: 'SubCategory',
      dataIndex: 'sub_cat_name',
      key: 'sub_cat_name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'active',
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
      width: 180,
      render: (value) => {
        return (
          <Popconfirm
            title="Are you sure?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => setSelectedFeaturedProduct(value.id)}
          >
            <Button
              type="primary"
              style={{
                width: '100%',
                background: '#ec524b',
                borderColor: '#ec524b',
              }}
              icon={<SettingOutlined />}
            >
              Set as Featured
            </Button>
          </Popconfirm>
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
            Featured Product
          </Title>
        </Col>
        <Col>
          <Breadcrumb separator="-">
            <Breadcrumb.Item>
              <Link to="/admin">
                <HomeOutlined /> Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Product</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '11px' }}>
        <Dashboardcard>
          <Row justify="space-between">
            <Title level={3}>Product List</Title>
          </Row>
          <Table
            style={{ marginTop: '2rem', width: '100%' }}
            columns={columns}
            dataSource={products}
            scroll={{ x: 1000 }}
            pagination={{ position: ['bottomCenter'] }}
          />
        </Dashboardcard>
      </Row>
    </Admin>
  );
};

export default AdminFeaturedProductPage;
