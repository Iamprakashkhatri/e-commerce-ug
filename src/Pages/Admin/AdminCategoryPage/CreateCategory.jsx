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
import { addCategory } from '../../../actions/adminActions';
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
const CreateCategory = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const addCategoryLoading = useSelector((state) => state.addCategory);
  const { loading } = addCategoryLoading;

  const categories = useSelector((state) => state.category.categories);
  const addCategoryMessage = useSelector((state) => state.addCategory);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (addCategoryMessage.addCategory) {
      if (addCategoryMessage.addCategory.message !== undefined) {
        notification.success({
          message: addCategoryMessage.addCategory.message,
        });
        addCategoryMessage.addCategory = {};
        form.resetFields();
        history.push('/admin/category');
      }
    }
    if (addCategoryMessage.error) {
      notification.error({ message: addCategoryMessage.error });
      addCategoryMessage.error = null;
    }
  }, [addCategoryMessage, form, history]);

  const [imageState, setImageState] = useState({
    previewVisible: false,
    previewImage: '',
    fileList: [],
  });

  const [categoryData, setCategoryData] = useState({
    name: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    setCategoryData({ ...categoryData, image: imageState.fileList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageState.fileList, categoryData.images]);

  const [error, setError] = useState(false);

  const addSelectedCategory = () => {
    let categoryFormData = new FormData();

    if (error === false) {
      categoryFormData.append('name', categoryData.name);
      if (categoryData.image.length > 0) {
        categoryData.image.map((item) => {
          return categoryFormData.append(`image`, item.originFileObj);
        });
      }

      categoryFormData.append('description', categoryData.description);
      categoryFormData.append('category', categoryData.category);

      dispatch(addCategory(categoryFormData));
      dispatch(getCategories());
    } else {
      notification.error({
        message:
          'Category name already exists! Please enter another category name',
      });
    }
  };
  // try {
  //   dispatch(addCategory(categoryFormData));
  //   message.success(categorymsg.message);
  //   history.push(redirect);
  // } catch (err) {
  // }
  // };

  // const categorymsg = useSelector((state) => state.addCategory.addCategory);
  // const { loading } = categories;
  // const redirect = "/admin/category";

  // useEffect(() => {
  //   if (categorymsg.message) {
  //     message.success(categorymsg.message);
  //     history.push(redirect);
  //   }
  // }, [categorymsg, redirect, history]);

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

  const handleNameChange = (e) => {
    setCategoryData({ ...categoryData, name: e.target.value });

    let found = null;
    if (categories !== undefined && categories.length > 0) {
      found = categories.find(
        (item) => item.name.toLowerCase() === e.target.value.toLowerCase()
      );
    }

    if (found) {
      setError(true);
    } else {
      setError(false);
    }
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
            Add Category
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
            <Breadcrumb.Item>Add Category</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '11px' }}>
        <Form
          form={form}
          name="customized_form_controls"
          layout="vertical"
          onFinish={addSelectedCategory}
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
                }}
              >
                {loading && (
                  <Spin
                    indicator={antIcon}
                    style={{ marginRight: '10px', fontWeight: 600 }}
                  />
                )}
                Add Category
              </Button>
            </Form.Item>
          </Createproductleft>
        </Form>
      </Row>
    </Admin>
  );
};
export default CreateCategory;
