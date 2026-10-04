import {
  Row,
  Breadcrumb,
  Col,
  Typography,
  Input,
  Form,
  Upload,
  Modal,
  Button,
  message,
  Spin,
  notification,
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { HomeOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import Admin from '../components';
import { Createproductleft } from './styles/product';
import './styles/style.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API } from '../../../config';
import { updateCategoryAction } from '../../../actions/adminActions';
import { getCategories } from '../../../actions/productActions';

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} />;

const { Title } = Typography;
const { TextArea } = Input;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const UpdateCategory = ({ match }) => {
  const slug = match.params.slug;

  const history = useHistory();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const updateCategory = useSelector((state) => state.updateCategory);
  const { loading } = updateCategory;

  const categories = useSelector((state) => state.category.categories);
  const updateCategoryMessage = useSelector((state) => state.updateCategory);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (updateCategoryMessage.updateCategory) {
      if (updateCategoryMessage.updateCategory.message !== undefined) {
        notification.success({
          message: updateCategoryMessage.updateCategory.message,
        });
        updateCategoryMessage.updateCategory = {};
        history.push('/admin/category');
      }
    }
    if (updateCategoryMessage.error) {
      notification.error({ message: updateCategoryMessage.error });
      updateCategoryMessage.error = null;
    }
  }, [updateCategoryMessage, history]);

  const [imageState, setImageState] = useState({
    previewVisible: false,
    previewImage: '',
    fileList: [],
  });

  const [categoryData, setCategoryData] = useState({
    name: '',
    description: '',
    image: [],
    category: '',
  });

  useEffect(() => {
    async function fetchSubCategoryData() {
      await axios
        .get(`${API}/product/categories/${slug}/`)
        .then((res) => {
          setCategoryData({ ...categoryData, ...res.data });
          form.setFieldsValue({
            name: res.data.name,
            description: res.data.description,
            // image: res.data.image,
            // image_placeholder: res.data.image_placeholder,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchSubCategoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    setCategoryData({ ...categoryData, image: imageState.fileList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageState.fileList, categoryData.images]);

  const [error, setError] = useState(false);
  const handleNameChange = (e) => {
    setCategoryData({ ...categoryData, name: e.target.value });

    let found = null;
    if (categories !== undefined && categories.length > 0) {
      found = categories.find(
        (item) => item.name.toLowerCase() === e.target.value.toLowerCase()
      );
    }
    console.log(found);

    if (found) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const updateSelectedCategory = () => {
    let formData = new FormData();

    if (error === false) {
      formData.append('name', categoryData.name);

      if (imageState.fileList && imageState.fileList.length > 0) {
        imageState.fileList.map((item, index) => {
          return formData.append(`image`, item.originFileObj);
        });
      }
      formData.append('description', categoryData.description);
      formData.append('category', categoryData.category);

      dispatch(updateCategoryAction(slug, formData));
      dispatch(getCategories());
    } else {
      notification.error({
        message:
          'Category name already exists! Please enter another category name',
      });
    }
  };

  const handleCancel = () => {
    setImageState({ ...imageState, previewVisible: false });
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setImageState({
      ...imageState,
      previewImage: file.thumbUrl,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  const handleUpload = ({ fileList }) => {
    setImageState({ ...imageState, fileList: fileList });
  };

  const { previewVisible, previewImage, previewTitle, fileList } = imageState;
  const uploadButton = (
    <Typography.Text>
      <PlusOutlined />
      Upload
    </Typography.Text>
  );

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
            <Breadcrumb.Item>
              <Link to="/admin/category">Category</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Update Category</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '11px' }}>
        <Form
          name="customized_form_controls"
          form={form}
          type="PUT"
          layout="vertical"
          onFinish={updateSelectedCategory}
        >
          <Createproductleft>
            <Form.Item
              name="name"
              label="Category Name"
              rules={[
                { required: true, message: 'Please enter category name' },
              ]}
            >
              <Input
                value={categoryData.name}
                onChange={(e) => handleNameChange(e)}
                placeholder="Category Name"
              />
            </Form.Item>
            <Form.Item
              name="description"
              label="Category Description"
              rules={[
                {
                  required: true,
                  message: 'Please enter category description',
                },
              ]}
            >
              <TextArea
                value={categoryData.description}
                onChange={(e) =>
                  setCategoryData({
                    ...categoryData,
                    description: e.target.value,
                  })
                }
                placeholder="Category Description"
                rows={5}
              />
            </Form.Item>
            <Form.Item name="image" label="Category Image">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleUpload}
                beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
              >
                {fileList.length < 1 && uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: '100%' }}
                  src={previewImage}
                />
              </Modal>
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
                  textAlign: 'center',
                }}
              >
                {loading && (
                  <Spin
                    indicator={antIcon}
                    style={{ marginRight: '10px', fontWeight: 600 }}
                  />
                )}
                Update Category
              </Button>
            </Form.Item>
          </Createproductleft>
        </Form>
      </Row>
    </Admin>
  );
};

export default UpdateCategory;
