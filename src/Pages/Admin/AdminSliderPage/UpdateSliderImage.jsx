import {
  Row,
  Breadcrumb,
  Col,
  Typography,
  Input,
  Form,
  Button,
  Checkbox,
  Upload,
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
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
import { API } from '../../../config';
import { updateSlider } from '../../../actions/adminActions';
import { getSliderImages } from '../../../actions/sliderActions';

const { Title } = Typography;

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} />;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const UpdateSliderImage = ({ match }) => {
  const [form] = Form.useForm();

  const slug = match.params.slug;
  const history = useHistory();
  const dispatch = useDispatch();

  const updateSliderMessage = useSelector((state) => state.updateSlider);
  const updateSliderLoading = useSelector((state) => state.updateSlider);
  const { loading } = updateSliderLoading;
  const sliderImages = useSelector((state) => state.sliderImages.sliderImages);

  useEffect(() => {
    dispatch(getSliderImages());
  }, [dispatch]);

  useEffect(() => {
    if (updateSliderMessage.updateSlider) {
      if (updateSliderMessage.updateSlider.message !== undefined) {
        notification.success({
          message: updateSliderMessage.updateSlider.message,
        });
        updateSliderMessage.updateSlider = {};
        history.push('/admin/slider');
      }
      if (updateSliderMessage.error) {
        notification.error({ message: updateSliderMessage.error });
        updateSliderMessage.error = null;
      }
    }
  }, [updateSliderMessage, history]);

  const [imageState, setImageState] = useState({
    previewVisible: false,
    previewImage: '',
    fileList: [],
  });

  const [sliderImageData, setSliderImageData] = useState({
    title: '',
    active: true,
    link: '',
  });

  useEffect(() => {
    setSliderImageData({ ...sliderImageData, image: imageState.fileList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageState.fileList, sliderImageData.images]);

  useEffect(() => {
    async function fetchSliderImageData() {
      await axios
        .get(`${API}/misc/slider-images/${slug}`)
        .then((res) => {
          console.log(res.data);
          setSliderImageData({ ...sliderImageData, ...res.data });
          form.setFieldsValue({
            title: res.data.title,
            link: res.data.link,
            active: res.data.active,
            slider_image: res.data.slider_image,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchSliderImageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const updateSelectedSliderImage = (values) => {
    let sliderImageFormData = new FormData();
    if (error === false) {
      sliderImageFormData.append('title', sliderImageData.title);

      if (imageState.fileList && imageState.fileList.length > 0) {
        imageState.fileList.map((item) => {
          return sliderImageFormData.append(`slider_image`, item.originFileObj);
        });
      }

      sliderImageFormData.append('link', sliderImageData.link);
      sliderImageFormData.append('active', sliderImageData.active);

      dispatch(updateSlider(slug, sliderImageFormData));
      dispatch(getSliderImages());
    } else {
      notification.error({
        message:
          'Slider Image title already exists! Please enter another slider image',
      });
    }
  };

  const statusOnChange = (e) => {
    setSliderImageData({ ...sliderImageData, active: e.target.checked });
  };
  const sliderImageStatus = `${sliderImageData.active ? 'Active' : 'Inactive'}`;

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

  const [error, setError] = useState(false);
  const handleTitleChange = (e) => {
    setSliderImageData({ ...sliderImageData, title: e.target.value });

    let found = null;
    if (sliderImages !== undefined && sliderImages.length > 0) {
      found = sliderImages.find(
        (item) => item.title.toLowerCase() === e.target.value.toLowerCase()
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
            Add Slider Image
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
              <Link to="/admin/slider">Slider Image</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Add Slider Image</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '11px' }}>
        <Form
          name="customized_form_controls"
          form={form}
          layout="vertical"
          onFinish={updateSelectedSliderImage}
        >
          <Createproductleft>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please enter a title' }]}
            >
              <Input
                value={sliderImageData.title}
                onChange={(e) => handleTitleChange(e)}
                placeholder="Slider Image Title"
              />
            </Form.Item>

            <Form.Item label="Slider Image">
              <Form.Item name="slider_image">
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleUpload}
                  beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
                >
                  {fileList.length < 1 && uploadButton}
                </Upload>
              </Form.Item>
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

            <Form.Item
              name="link"
              label="Link"
              rules={[
                {
                  required: true,
                  message: 'Link is required.',
                },
                {
                  type: 'url',
                  message: 'This field must be a valid url.',
                },
              ]}
            >
              <Input
                value={sliderImageData.link}
                onChange={(e) =>
                  setSliderImageData({
                    ...sliderImageData,
                    link: e.target.value,
                  })
                }
                placeholder="Link"
              />
            </Form.Item>

            <Form.Item name="active">
              <Checkbox
                checked={sliderImageData.active}
                onChange={statusOnChange}
              >
                {sliderImageStatus}
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
                Update Slider Image
              </Button>
            </Form.Item>
          </Createproductleft>
        </Form>
      </Row>
    </Admin>
  );
};

export default UpdateSliderImage;
