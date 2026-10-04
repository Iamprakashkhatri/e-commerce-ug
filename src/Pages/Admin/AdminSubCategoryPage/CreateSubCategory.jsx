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
  Select,
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
import { addSubCategory } from '../../../actions/adminActions';
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
const CreateSubCategory = () => {
  // const history = useHistory();
  const categories = useSelector((state) => state.category.categories);
  const subCategories = useSelector((state) => state.subCategory.subCategories);
  const addSubCategoryMessage = useSelector((state) => state.addSubCategory);
  const addSubCategoryLoading = useSelector((state) => state.addSubCategory);
  const { loading } = addSubCategoryLoading;

  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubCategories());
  }, [dispatch]);

  useEffect(() => {
    if (addSubCategoryMessage.addSubCategory) {
      if (addSubCategoryMessage.addSubCategory.message !== undefined) {
        notification.success({
          message: addSubCategoryMessage.addSubCategory.message,
        });
        addSubCategoryMessage.addSubCategory = {};
        form.resetFields();
        history.push('/admin/subcategory');
      }
    }
    if (addSubCategoryMessage.error) {
      notification.warning({ message: addSubCategoryMessage.error });
      addSubCategoryMessage.error = null;
    }
  }, [addSubCategoryMessage, form, history]);

  const [imageState, setImageState] = useState({
    previewVisibleImage: false,
    previewImage: '',
    fileListImage: [],
  });
  const [coverState, setCoverState] = useState({
    previewVisibleCover: false,
    previewCover: '',
    fileListCover: [],
  });
  const [iconState, setIconState] = useState({
    previewVisibleIcon: false,
    previewIcon: '',
    fileListIcon: [],
  });

  const [subCategoryData, setSubCategoryData] = useState({
    name: '',
    description: '',
    category: '',
  });

  const handleCategoryChange = (value) => {
    setSubCategoryData({
      ...subCategoryData,
      category: value,
    });
  };

  console.log(subCategories);
  const [error, setError] = useState(false);

  const addSelectedSubCategory = () => {
    let subCategoryFormData = new FormData();

    if (error === false) {
      subCategoryFormData.append('name', subCategoryData.name);

      if (imageState.fileListImage.length > 0) {
        imageState.fileListImage.map((item, index) => {
          return subCategoryFormData.append(`image`, item.originFileObj);
        });
      }

      if (coverState.fileListCover.length > 0) {
        coverState.fileListCover.map((item, index) => {
          return subCategoryFormData.append(`cover_image`, item.originFileObj);
        });
      }

      if (iconState.fileListIcon.length > 0) {
        iconState.fileListIcon.map((item, index) => {
          return subCategoryFormData.append(`icon`, item.originFileObj);
        });
      }

      subCategoryFormData.append('description', subCategoryData.description);
      subCategoryFormData.append('category', subCategoryData.category);

      dispatch(addSubCategory(subCategoryFormData));
      dispatch(getSubCategories());
    } else {
      notification.error({
        message:
          'Sub Category name already exists! Please enter another sub category name',
      });
    }
  };

  const handleImageCancel = () => {
    setImageState({ ...imageState, previewVisibleImage: false });
  };

  const handleCoverCancel = () => {
    setCoverState({ ...coverState, previewVisibleCover: false });
  };

  const handleIconCancel = () => {
    setIconState({ ...iconState, previewVisibleIcon: false });
  };

  const handleImagePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setImageState({
      ...imageState,
      previewImage: file.thumbUrl,
      previewVisibleImage: true,
      previewTitleImage:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  const handleCoverPreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setCoverState({
      ...coverState,
      previewCover: file.thumbUrl,
      previewVisibleCover: true,
      previewTitleCover:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  const handleIconPreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setIconState({
      ...iconState,
      previewIcon: file.thumbUrl,
      previewVisibleIcon: true,
      previewTitleIcon:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  const handleUploadImage = ({ fileList }) => {
    setImageState({ ...imageState, fileListImage: fileList });
  };

  const handleUploadCover = ({ fileList }) => {
    setCoverState({ ...coverState, fileListCover: fileList });
  };

  const handleUploadIcon = ({ fileList }) => {
    setIconState({ ...iconState, fileListIcon: fileList });
  };

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

  const {
    previewVisibleImage,
    previewImage,
    previewTitleImage,
    fileListImage,
  } = imageState;
  const {
    previewVisibleCover,
    previewCover,
    previewTitleCover,
    fileListCover,
  } = coverState;
  const {
    previewVisibleIcon,
    previewIcon,
    previewTitleIcon,
    fileListIcon,
  } = iconState;
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
            Add Sub Category
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
            <Breadcrumb.Item>Add Sub Category</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '11px' }}>
        <Form
          form={form}
          name="customized_form_controls"
          layout="vertical"
          onFinish={addSelectedSubCategory}
        >
          <Createproductleft>
            <Form.Item
              name="name"
              label="Sub Category Name"
              rules={[
                { required: true, message: 'Please enter sub category name' },
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
                  message: 'Please enter sub category description',
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
                placeholder="Sub Category Description"
                rows={5}
              />
            </Form.Item>
            <Form.Item name="image" label="Sub Category Image">
              <Upload
                listType="picture-card"
                fileList={fileListImage}
                onPreview={handleImagePreview}
                onChange={handleUploadImage}
                beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
              >
                {fileListImage && fileListImage.length < 1 && uploadButton}
              </Upload>
              <Modal
                visible={previewVisibleImage}
                title={previewTitleImage}
                footer={null}
                onCancel={handleImageCancel}
              >
                <img
                  alt="example"
                  style={{ width: '100%' }}
                  src={previewImage}
                />
              </Modal>
            </Form.Item>
            <Form.Item name="cover" label="Sub Category Cover">
              <Upload
                listType="picture-card"
                fileList={fileListCover}
                onPreview={handleCoverPreview}
                onChange={handleUploadCover}
                beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
              >
                {fileListCover && fileListCover.length < 1 && uploadButton}
              </Upload>
              <Modal
                visible={previewVisibleCover}
                title={previewTitleCover}
                footer={null}
                onCancel={handleCoverCancel}
              >
                <img
                  alt="example"
                  style={{ width: '100%' }}
                  src={previewCover}
                />
              </Modal>
            </Form.Item>
            <Form.Item name="icon" label="Sub Category Icon">
              <Upload
                listType="picture-card"
                fileList={fileListIcon}
                onPreview={handleIconPreview}
                onChange={handleUploadIcon}
                beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
              >
                {fileListIcon && fileListIcon.length < 1 && uploadButton}
              </Upload>
              <Modal
                visible={previewVisibleIcon}
                title={previewTitleIcon}
                footer={null}
                onCancel={handleIconCancel}
              >
                <img
                  alt="example"
                  style={{ width: '100%' }}
                  src={previewIcon}
                />
              </Modal>
            </Form.Item>

            <Form.Item
              name="category"
              label="Choose Category"
              rules={[{ required: true, message: 'Please select a category' }]}
            >
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
                Add Sub Category
              </Button>
            </Form.Item>
          </Createproductleft>
        </Form>
      </Row>
    </Admin>
  );
};

export default CreateSubCategory;
