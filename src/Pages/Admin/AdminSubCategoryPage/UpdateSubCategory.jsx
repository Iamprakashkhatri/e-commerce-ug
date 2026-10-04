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
  Select,
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
import { updateSubCategory } from '../../../actions/adminActions';
import {
  getCategories,
  getSubCategories,
} from '../../../actions/productActions';

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} />;

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const UpdateSubCategory = ({ match }) => {
  const categories = useSelector((state) => state.category.categories);
  const subCategories = useSelector((state) => state.subCategory.subCategories);
  const updateSubCategoryLoading = useSelector(
    (state) => state.updateSubCategory
  );
  const { loading } = updateSubCategoryLoading;

  const slug = match.params.slug;
  const history = useHistory();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubCategories());
  }, [dispatch]);

  const updateSubCategoryMessage = useSelector(
    (state) => state.updateSubCategory
  );

  useEffect(() => {
    if (updateSubCategoryMessage.updateSubCategory) {
      if (updateSubCategoryMessage.updateSubCategory.message !== undefined) {
        notification.success({
          message: updateSubCategoryMessage.updateSubCategory.message,
        });
        updateSubCategoryMessage.updateSubCategory = {};
        history.push('/admin/subcategory');
      }
    }
    if (updateSubCategoryMessage.error) {
      notification.error({ message: updateSubCategoryMessage.error });
      updateSubCategoryMessage.error = null;
    }
  }, [updateSubCategoryMessage, history]);

  const [imageState, setImageState] = useState({
    previewVisible: false,
    previewImage: '',
    fileList: [],
  });

  const [subCategoryData, setSubCategoryData] = useState({
    name: '',
    description: '',
    category: '',
  });

  useEffect(() => {
    async function fetchSubCategoryData() {
      await axios
        .get(`${API}/product/sub-categories/${slug}/`)
        .then((res) => {
          console.log(res.data);
          setSubCategoryData({ ...subCategoryData, ...res.data });
          form.setFieldsValue({
            name: res.data.name,
            description: res.data.description,
            category: res.data.category_name,
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
    setSubCategoryData({ ...subCategoryData, image: imageState.fileList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageState.fileList, subCategoryData.images]);

  const [error, setError] = useState(false);
  const handleNameChange = (e) => {
    setSubCategoryData({ ...subCategoryData, name: e.target.value });

    let found = null;
    if (subCategories !== undefined && subCategories.length > 0) {
      found = subCategories.find(
        (item) => item.name.toLowerCase() === e.target.value.toLowerCase()
      );
    }

    if (found) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const updateSelectedSubCategory = () => {
    let updatedSubCategoryData = new FormData();

    if (error === false) {
      updatedSubCategoryData.append('name', subCategoryData.name);

      if (imageState.fileList && imageState.fileList.length > 0) {
        imageState.fileList.map((item, index) => {
          return updatedSubCategoryData.append(`image`, item.originFileObj);
        });
      }
      updatedSubCategoryData.append('description', subCategoryData.description);
      updatedSubCategoryData.append('category', subCategoryData.category);

      dispatch(updateSubCategory(slug, updatedSubCategoryData));
      dispatch(getSubCategories());
    } else {
      notification.error({
        message:
          'Sub Category name already exists! Please enter another sub category name',
      });
    }
  };

  const handleCategoryChange = (value) => {
    setSubCategoryData({
      ...subCategoryData,
      category: value,
    });
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
            Update Sub Category
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
              <Link to="/admin/subcategory">Sub Category</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Update Sub Category</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '11px' }}>
        <Form
          name="customized_form_controls"
          form={form}
          type="PUT"
          layout="vertical"
          onFinish={updateSelectedSubCategory}
        >
          <Createproductleft>
            <Form.Item
              name="name"
              label="Sub Category Name"
              rules={[
                { required: true, message: 'Please enter category name' },
              ]}
            >
              <Input
                value={subCategoryData.name}
                onChange={(e) => handleNameChange(e)}
                placeholder="Sub Category Name"
              />
            </Form.Item>
            <Form.Item
              name="description"
              label="Sub Category Description"
              rules={[
                {
                  required: true,
                  message: 'Please enter category description',
                },
              ]}
            >
              <TextArea
                value={subCategoryData.description}
                onChange={(e) =>
                  setSubCategoryData({
                    ...subCategoryData,
                    description: e.target.value,
                  })
                }
                placeholder="Category Description"
                rows={5}
              />
            </Form.Item>
            <Form.Item name="image" label="Sub Category Image">
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
            <Form.Item name="category" label="Choose Category">
              <Select
                onChange={handleCategoryChange}
                showSearch
                style={{ width: '100%' }}
                placeholder="Select a Category"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {categories !== undefined &&
                  categories.length > 0 &&
                  categories.map((category) => (
                    <Option value={category.id} key={category.id}>
                      {category.name}
                    </Option>
                  ))}
              </Select>
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
                Update Sub Category
              </Button>
            </Form.Item>
          </Createproductleft>
        </Form>
      </Row>
    </Admin>
  );
};

export default UpdateSubCategory;
