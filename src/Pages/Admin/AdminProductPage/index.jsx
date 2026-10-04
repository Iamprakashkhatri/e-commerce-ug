import React, { useEffect, useState } from 'react';
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
  Upload,
  notification,
} from 'antd';
import { Link, NavLink } from 'react-router-dom';
import {
  HomeOutlined,
  PlusOutlined,
  SettingOutlined,
  DeleteOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Admin from '../components';
import './styles/style.scss';
import { Dashboardcard } from '../components/Dashboard/styles/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, getProducts } from '../../../actions/productActions';
import { deleteProduct } from '../../../actions/adminActions';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
import { API } from '../../../config';

const { Title } = Typography;

const AdminProductPage = () => {
  const products = useSelector((state) => state.allProducts.allProducts);
  const deleteProductMessage = useSelector((state) => state.deleteProduct);
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const dispatch = useDispatch();

  const addProductLoading = useSelector((state) => state.addProduct);
  const deleteProductLoading = useSelector((state) => state.deleteProduct);
  const updateProductLoading = useSelector((state) => state.updateProduct);
  const { deleteLoading } = deleteProductLoading;
  const { addLoading } = addProductLoading;
  const { updateLoading } = updateProductLoading;

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const deleteSelectedProduct = (slug) => {
    dispatch(deleteProduct(slug));
  };

  useEffect(() => {
    if (deleteProductMessage.deleteProduct) {
      if (deleteProductMessage.deleteProduct.message !== undefined) {
        notification.success({
          message: deleteProductMessage.deleteProduct.message,
        });
        deleteProductMessage.deleteProduct = {};
        dispatch(getAllProducts());
      }
      if (deleteProductMessage.error) {
        notification.error({ message: deleteProductMessage.error });
        deleteProductMessage.error = null;
      }
    }
  }, [deleteProductMessage, dispatch]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [fileState, setFileState] = useState({
    fileList: [],
    uploading: false,
  });

  const handleUpload = () => {
    const { fileList } = fileState;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('uploadFile', file);
    });

    setFileState({ ...fileState, uploading: true });

    axios
      .post(`${API}/product/upload-csv/`, formData, {
        headers: { Authorization: 'JWT ' + userInfo.token },
      })
      .then((res) => {
        setFileState({ ...fileState, fileList: [], uploading: false });
        notification.success({ message: res.data.message });
      })
      .catch((err) => {
        setFileState({ ...fileState, uploading: false });
        notification.error({
          message:
            'Failed to upload the file. Make sure the file and content of the file are in correct format.',
        });
      });
  };

  const { uploading, fileList } = fileState;
  const props = {
    accept: '.csv',
    onRemove: (file) => {
      setFileState((fileState) => {
        const index = fileState.fileList.indexOf(file);
        const newFileList = fileState.fileList.slice();
        newFileList.splice(index, 1);
        return {
          fileList: newFileList,
        };
      });
    },
    beforeUpload: (file) => {
      setFileState((fileState) => ({
        fileList: [...fileState.fileList, file],
      }));
      return false;
    },
    fileList,
  };

  console.log(products);
  const columns = [
    {
      title: 'Product ID',
      width: 100,
      dataIndex: 'id',
      key: 'number',
    },
    {
      title: 'Product Name',
      width: 260,
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
      width: 150,
      render: (value) => {
        return (
          <Space direction="vertical" size="small">
            <NavLink to={`/admin/updateproduct/${value.slug}`}>
              <Button
                type="primary"
                loading={updateLoading}
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
              onConfirm={() => deleteSelectedProduct(value.slug)}
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
            Product
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
            <Col>
              <Link to="/admin/addproduct" style={{ color: '#fff' }}>
                <Button
                  type="primary"
                  loading={addLoading}
                  style={{
                    width: '100%',
                    borderColor: '#FE6D04',
                    background: '#FE6D04',
                  }}
                  icon={<PlusOutlined />}
                >
                  Add Product
                </Button>
              </Link>
              <Button
                type="primary"
                style={{
                  width: '100%',
                  borderColor: '#FE6D04',
                  background: '#FE6D04',
                  marginTop: '5px',
                }}
                icon={<UploadOutlined />}
                onClick={showModal}
              >
                Upload From CSV
              </Button>
              <Modal
                title="Upload from CSV"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
              >
                <>
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                  </Upload>
                  <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={fileState.fileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                  >
                    {uploading ? 'Uploading' : 'Upload'}
                  </Button>
                </>
              </Modal>
            </Col>
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

export default AdminProductPage;
