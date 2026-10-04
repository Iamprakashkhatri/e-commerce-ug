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
import axios from 'axios';
import { API } from '../../../config';
import { updateProduct } from '../../../actions/adminActions';
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
const UpdateProduct = ({ match }) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const slug = match.params.slug;

  const products = useSelector((state) => state.product.products);
  const categories = useSelector((state) => state.category.categories);
  const subCategories = useSelector((state) => state.subCategory.subCategories);
  const labels = useSelector((state) => state.labels.labels);
  const updateProductMessage = useSelector((state) => state.updateProduct);

  const dispatch = useDispatch();

  const updateProductLoading = useSelector((state) => state.updateProduct);
  const { loading } = updateProductLoading;

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
    if (updateProductMessage.updateProduct) {
      if (updateProductMessage.updateProduct.message !== undefined) {
        notification.success({
          message: updateProductMessage.updateProduct.message,
        });
        updateProductMessage.updateProduct = {};
        history.push('/admin/product');
      }
    }
    if (updateProductMessage.error) {
      notification.error({ message: updateProductMessage.error });
      updateProductMessage.error = null;
    }
  }, [updateProductMessage, history]);

  const [imageState, setImageState] = useState({
    previewVisible: false,
    previewImage: '',
    fileList: [],
  });

  const [productData, setProductData] = useState({
    name: '',
    images: [],
    cat_name: '',
    sub_cat_name: '',
    description: '',
    active: true,
    cost_price: '',
    sale_price: '',
    discount: '0',
    quantity: 0,
    label: '',
  });

  useEffect(() => {
    setProductData({ ...productData, images: imageState.fileList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageState.fileList, productData.images]);

  const statusOnChange = (e) => {
    setProductData({ ...productData, active: e.target.checked });
  };

  const productStatus = `${productData.active ? 'Active' : 'Inactive'}`;

  useEffect(() => {
    async function fetchProductData() {
      await axios
        .get(`${API}/product/products/${slug}`)
        .then((res) => {
          setProductData({ ...productData, ...res.data });
          // setImageState({ ...imageState, fileList: res.data.images });
          form.setFieldsValue({
            name: res.data.name,
            // images: imageState.fileList !== undefined && imageState.fileList > 0 && imageState.fileList.map(item => ({
            //     // ...item,
            //     uid: item.id,
            // })),
            // images: res.data.images,
            category: res.data.cat_name,
            sub_category: res.data.sub_cat_name,
            description: res.data.description,
            active: res.data.active,
            // cost_price: res.data.cost_price,
            sale_price: res.data.sale_price,
            discount: res.data.discount,
            quantity: res.data.quantity,
            label: res.data.label_name,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  console.log(productData);
  const [error, setError] = useState(false);
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

  const updateSelectedProduct = () => {
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
        dispatch(updateProduct(slug, productFormData));
        dispatch(getProducts());
      }
    } else {
      notification.error({
        message:
          'Product name already exists! Please enter another product name',
      });
    }
  };

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
    //---------------^^^^^----------------
    // this is equivalent to your "const img = event.target.files[0]"
    // here, antd is giving you an array of files, just like event.target.files
    // but the structure is a bit different that the original file
    // the original file is located at the `originFileObj` key of each of this files
    // so `event.target.files[0]` is actually fileList[0].originFileObj

    // you store them in state, so that you can make a http req with them later
    setImageState({ ...imageState, fileList: fileList });
  };

  const { previewVisible, previewImage, previewTitle, fileList } = imageState;
  const uploadButton = (
    <Typography.Text>
      <PlusOutlined />
      Add
    </Typography.Text>
  );

  const onChangeDescription = (value) => {
    setProductData({ ...productData, description: value });
  };

  const handleLabelChange = (value) => {
    setProductData({
      ...productData,
      label: value,
    });
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
            Update Product
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
            <Breadcrumb.Item>Update Product</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '11px' }}>
        <Form
          name="customized_form_controls"
          form={form}
          type="PUT"
          layout="vertical"
          onFinish={updateSelectedProduct}
        >
          {' '}
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
                    onChange={(e) => handleNameChange(e)}
                    placeholder="Product Name"
                  />
                </Form.Item>
                <Form.Item name="images" label="Product Images">
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
                <Form.Item name="price" label="Product Pricing">
                  <Row gutter={[20, 0]}>
                    {/* <Col lg={12}>
                      <Form.Item
                        name="cost_price"
                        label="Cost Price"
                        rules={[
                          {
                            required: true,
                            message: "Please enter cost price",
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
                        name="sale_price"
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
                      <Form.Item name="discount" label="Discount">
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
                  <Form.Item name="category" label="Choose Category">
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
                  <Form.Item name="sub_category" label="Choose Sub Category">
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
                      showSearch
                      style={{ width: '100%' }}
                      placeholder="Select a label"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      onChange={handleLabelChange}
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

                  <Form.Item name="quantity" label="Enter Product Quantity">
                    <Input
                      type="number"
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
                      Update Product
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

export default UpdateProduct;
