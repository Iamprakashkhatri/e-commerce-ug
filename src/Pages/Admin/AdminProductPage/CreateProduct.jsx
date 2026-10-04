import {
  Row,
  Breadcrumb,
  Col,
  Typography,
  Input,
  InputNumber,
  Form,
  Upload,
  Select,
  Modal,
  Checkbox,
  Button,
  message,
  Spin,
  notification,
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { HomeOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import Admin from '../components';
import {
  Createproductleft,
  Createproductright,
  Productheight,
} from './styles/product';
import './styles/style.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategories,
  getLabels,
  getProducts,
  getSubCategories,
} from '../../../actions/productActions';
import { addProduct } from '../../../actions/adminActions';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} />;

const { Title } = Typography;
const { Option } = Select;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
const CreateProduct = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const products = useSelector((state) => state.product.products);

  const categories = useSelector((state) => state.category.categories);

  const subCategories = useSelector((state) => state.subCategory.subCategories);
  const labels = useSelector((state) => state.labels.labels);

  const addProductMessage = useSelector((state) => state.addProduct);

  const dispatch = useDispatch();

  const addProductLoading = useSelector((state) => state.addProduct);
  const { loading } = addProductLoading;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSubCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLabels());
  }, [dispatch]);

  useEffect(() => {
    if (addProductMessage.addProduct) {
      if (addProductMessage.addProduct.message !== undefined) {
        notification.success({ message: addProductMessage.addProduct.message });
        addProductMessage.addProduct = {};
        form.resetFields();
        history.push('/admin/product');
      }
    }
    if (addProductMessage.error) {
      notification.error({ message: addProductMessage.error });
      addProductMessage.error = null;
    }
  }, [addProductMessage, form, history]);

  const [imageState, setImageState] = useState({
    previewVisible: false,
    previewImage: '',
    fileList: [],
  });

  const [productData, setProductData] = useState({
    name: '',
    images: [],
    cat_name: '',
    sub_category: '',
    description: '',
    active: true,
    cost_price: '',
    sale_price: '',
    discount: 0,
    quantity: 0,
    label: '',
  });

  const [error, setError] = useState(false);

  useEffect(() => {
    setProductData({ ...productData, images: imageState.fileList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageState.fileList, productData.images]);

  const addSelectedProduct = () => {
    let productFormData = new FormData();

    if (error === false) {
      productFormData.append('name', productData.name);

      if (productData.images.length > 0) {
        productData.images.map((product, index) => {
          let imgNumber = index + 1;
          return productFormData.append(
            `image_${imgNumber}`,
            product.originFileObj
          );
        });
      }

      productFormData.append('cat_name', productData.cat_name);
      productFormData.append('sub_category', productData.sub_category);
      productFormData.append('description', productData.description);
      productFormData.append('active', productData.active);
      // productFormData.append("cost_price", productData.cost_price);
      productFormData.append('sale_price', productData.sale_price);
      productFormData.append('discount', productData.discount);
      productFormData.append('quantity', productData.quantity);
      productFormData.append('label', productData.label);

      if (
        productData.description.replace(/<(.|\n)*?>/g, '').trim().length === 0
      ) {
        return notification.error({ message: 'Description cannot be empty' });
      } else {
        dispatch(addProduct(productFormData));
        dispatch(getProducts());
      }
    } else {
      notification.error({
        message:
          'Product name already exists! Please enter another product name',
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

  // function beforeUpload(file) {
  //   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  //   if (!isJpgOrPng) {
  //     message.error('You can only upload JPG/PNG file!');
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error('Image must smaller than 2MB!');
  //   }
  //   return isJpgOrPng && isLt2M;
  // }

  const { previewVisible, previewImage, previewTitle, fileList } = imageState;
  const uploadButton = (
    <Typography.Text>
      <PlusOutlined />
      Add
    </Typography.Text>
  );

  const handleNameChange = (e) => {
    setProductData({ ...productData, name: e.target.value });

    let found = null;
    if (products !== undefined && products.length > 0) {
      found = products.find(
        (item) => item.name.toLowerCase() === e.target.value.toLowerCase()
      );
    }

    if (found) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const statusOnChange = (e) => {
    setProductData({ ...productData, active: e.target.checked });
  };
  const productStatus = `${productData.active ? 'Active' : 'Inactive'}`;

  const handleCategoryChange = (value) => {
    setProductData({
      ...productData,
      cat_name: value,
    });
  };

  const handleSubCategoryChange = (value) => {
    setProductData({
      ...productData,
      sub_category: value,
    });
  };

  const handleLabelChange = (value) => {
    setProductData({
      ...productData,
      label: value,
    });
  };

  // const [fileList, setFileList] = useState([]);
  // const onChange = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  // };

  // const handleCancel = () => {
  //   setFileList({
  //     previewVisible: false,
  //   });
  // };
  // const onPreview = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   setFileList({
  //     previewVisible: true,
  //     previewImage: file.url || file.preview,
  //     previewTitle:
  //       file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
  //   });
  // let src = file.url;
  // if (!src) {
  //   src = await new Promise((resolve) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file.originFileObj);
  //     reader.onload = () => resolve(reader.result);
  //   });
  // }
  // const image = new Image();
  // image.src = src;
  // const imgWindow = window.open(src);
  // imgWindow.document.write(image.outerHTML);
  // };

  const onChangeDescription = (value) => {
    setProductData({ ...productData, description: value });
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
            Add Product
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
              <Link to="/admin/product">Product</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Add Product</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '11px' }}>
        <Form
          form={form}
          name="customized_form_controls"
          layout="vertical"
          onFinish={addSelectedProduct}
          enctype="multipart/form-data"
        >
          <Row gutter={[{ xs: 0, lg: 16 }, 16]} style={{ width: '100%' }}>
            <Col xs={24} lg={14}>
              <Createproductleft>
                <Form.Item
                  name="name"
                  label="Product Name"
                  rules={[
                    { required: true, message: 'Please enter product name' },
                  ]}
                >
                  <Input
                    value={productData.name}
                    onChange={(e) => handleNameChange(e)}
                    placeholder="Product Name"
                  />
                </Form.Item>
                <Form.Item name="image" label="Product Images">
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleUpload}
                    beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
                  >
                    {fileList.length < 5 && uploadButton}
                  </Upload>

                  <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    <img
                      alt="product_image_upload"
                      style={{ width: '100%' }}
                      src={previewImage}
                    />
                  </Modal>
                </Form.Item>
                {/* <Form.Item
              name="description"
              label="Product Description"
              rules={[
                { required: true, message: "Please enter product description" },
              ]}
            >
              <TextArea
                value={productData.description}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
                }
                placeholder="Product Description"
                rows={5}
              />
            </Form.Item> */}
                <Title level={4}>Description</Title>
                <ReactQuill
                  value={productData.description}
                  onChange={(e) => onChangeDescription(e)}
                />
                <Form.Item
                  name="price"
                  label="Product Pricing"
                  style={{ marginTop: '20px' }}
                >
                  <Row gutter={[20, 0]}>
                    {/* <Col lg={12}>
                      <Form.Item
                        name="Cost Price"
                        label="Cost Price"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter cost price',
                          },
                        ]}
                      >
                        <Input
                          type="text"
                          value={productData.cost_price}
                          onChange={(e) =>
                            setProductData({
                              ...productData,
                              cost_price: e.target.value,
                            })
                          }
                          placeholder="Enter Cost Price"
                        />
                      </Form.Item>
                    </Col> */}
                    <Col lg={12}>
                      <Form.Item
                        name="Sale Price"
                        label="Sale Price"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter sale price',
                          },
                        ]}
                      >
                        <Input
                          type="text"
                          value={productData.sale_price}
                          onChange={(e) =>
                            setProductData({
                              ...productData,
                              sale_price: e.target.value,
                            })
                          }
                          placeholder="Enter Sale Price"
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12}>
                      <Form.Item name="Discount" label="Discount">
                        <InputNumber
                          value={productData.discount}
                          onChange={(value) =>
                            setProductData({
                              ...productData,
                              discount: value,
                            })
                          }
                          style={{ width: '100%' }}
                          initialValues={0}
                          min={0}
                          max={100}
                          formatter={(value) => `${value}%`}
                          parser={(value) => value.replace('%', '')}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>
              </Createproductleft>
            </Col>
            <Col xs={24} lg={10}>
              <Createproductright>
                <Productheight>
                  <Form.Item
                    name="category"
                    label="Choose Category"
                    rules={[
                      { required: true, message: 'Please select a category' },
                    ]}
                  >
                    <Select
                      onChange={handleCategoryChange}
                      showSearch
                      style={{ width: '100%' }}
                      placeholder="Select a Category"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {categories !== undefined &&
                        categories.length > 0 &&
                        categories.map((category) => (
                          <Option value={category.name} key={category.id}>
                            {category.name}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="subcategory"
                    label="Choose Sub Category"
                    rules={[
                      {
                        required: true,
                        message: 'Please select a sub category',
                      },
                    ]}
                  >
                    <Select
                      onChange={handleSubCategoryChange}
                      showSearch
                      style={{ width: '100%' }}
                      placeholder="Select a Sub Category"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {subCategories !== undefined &&
                        subCategories.length > 0 &&
                        subCategories.map((subCategory) =>
                          productData.cat_name === subCategory.category_name ? (
                            <Option value={subCategory.id} key={subCategory.id}>
                              {subCategory.name}
                            </Option>
                          ) : null
                        )}
                    </Select>
                  </Form.Item>

                  <Form.Item name="label" label="Choose Label">
                    <Select
                      onChange={handleLabelChange}
                      showSearch
                      style={{ width: '100%' }}
                      placeholder="Select a label"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {labels !== undefined &&
                        labels.length > 0 &&
                        labels.map((label) => (
                          <Option value={label.id} key={label.id}>
                            {label.name}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="quantity"
                    label="Enter Product Quantity"
                    rules={[
                      { required: true, message: 'Please enter Quantity' },
                    ]}
                  >
                    <Input
                      type="text"
                      value={productData.quantity}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          quantity: e.target.value,
                        })
                      }
                      placeholder="Enter Quantity"
                    />
                  </Form.Item>
                  <Form.Item name="active">
                    <Checkbox
                      checked={productData.active}
                      onChange={statusOnChange}
                    >
                      {productStatus} Product
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
                      Add Product
                    </Button>
                  </Form.Item>
                </Productheight>
              </Createproductright>
            </Col>
          </Row>
        </Form>
      </Row>
    </Admin>
  );
};

export default CreateProduct;
