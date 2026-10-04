import { EditOutlined } from '@ant-design/icons';
import {
  Col,
  Input,
  Row,
  Button,
  Form,
  Typography,
  Upload,
  Image,
  message,
  notification,
} from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfileDetails } from '../../../actions/userActions';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const ClientSettings = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const profileUpdateMessage = useSelector((state) => state.updateUser);

  useEffect(() => {
    if (profileUpdateMessage.userInfo) {
      if (profileUpdateMessage.userInfo.message !== undefined) {
        notification.success({
          message: profileUpdateMessage.userInfo.message,
        });
        profileUpdateMessage.userInfo.message = {};
      }
      if (profileUpdateMessage.userInfo.data) {
        let userInfoSessionStorage = JSON.parse(
          sessionStorage.getItem('userInfo')
        );
        userInfoSessionStorage.user = {
          ...userInfoSessionStorage.user,
          first_name: profileUpdateMessage.userInfo.data.first_name,
          last_name: profileUpdateMessage.userInfo.data.last_name,
          phone_no: profileUpdateMessage.userInfo.data.phone_no,
          avatar_url: profileUpdateMessage.userInfo.data.avatar_url,
        };
        window.sessionStorage.setItem(
          'userInfo',
          JSON.stringify(userInfoSessionStorage)
        );
      }
    }
    if (profileUpdateMessage.error) {
      notification.error({ message: profileUpdateMessage.error });
      profileUpdateMessage.error = null;
    }
  }, [profileUpdateMessage]);

  console.log(userInfo);

  const [profileForm, setProfileForm] = useState({
    first_name: '',
    last_name: '',
    avatar: '',
    email: '',
    phone_no: '',
  });
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    if (userInfo && userInfo.user) {
      setProfileForm({
        first_name: userInfo.user.first_name,
        last_name: userInfo.user.last_name,
        email: userInfo.user.email,
        phone_no: userInfo.user.phone_no,
      });
      setImageUrl(userInfo.user.avatar_url);
    }

    if (userInfo && userInfo.user) {
      form.setFieldsValue({
        first_name: userInfo.user.first_name,
        last_name: userInfo.user.last_name,
        email: userInfo.user.email,
        phone_no: userInfo.user.phone_no,
      });
    }
  }, [userInfo, form]);

  const [imageState, setImageState] = useState({
    previewVisible: false,
    previewImage: '',
    fileList: [],
  });

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
  const updateProfileForm = () => {
    let formData = new FormData();

    if (imageState.fileList.length > 0) {
      imageState.fileList.map((item) => {
        return formData.append('avatar', item.originFileObj);
      });
    }

    formData.append('first_name', profileForm.first_name);
    formData.append('last_name', profileForm.last_name);
    formData.append('email', profileForm.email);
    formData.append('phone_no', profileForm.phone_no);
    dispatch(updateUserProfileDetails(formData));
  };

  const { previewVisible, previewImage, previewTitle, fileList } = imageState;
  const uploadButton = (
    <Typography.Text>
      <EditOutlined />
      Edit
    </Typography.Text>
  );

  return (
    <Row gutter={[25, 30]}>
      <Col>
        <Form
          form={form}
          name="global_state"
          style={{ flexDirection: 'column' }}
          layout="vertical"
          onFinish={updateProfileForm}
        >
          <Row gutter={[15, 0]}>
            <Col lg={12}>
              <Form.Item label="Current Picture">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="current_image"
                    width="120px"
                    height="105px"
                  />
                ) : null}
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item label="New Picture">
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
                    alt="user_image_upload"
                    style={{ width: '100%' }}
                    src={previewImage}
                  />
                </Modal>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[15, 0]}>
            <Col lg={12} sm={24} xs={24}>
              <Form.Item
                name="first_name"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter first name',
                  },
                ]}
              >
                <Input
                  type="text"
                  value={userInfo.user.first_name}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      first_name: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </Col>
            <Col lg={12} sm={24} xs={24}>
              <Form.Item
                name="last_name"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter last name',
                  },
                ]}
              >
                <Input
                  type="text"
                  value={userInfo.user.first_name}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      last_name: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'Please enter email',
              },
            ]}
          >
            <Input type="text" value={userInfo.user.email} readOnly />
          </Form.Item>
          <Form.Item
            name="phone_no"
            label="Mobile Number"
            rules={[
              {
                required: true,
                message: 'Please enter phone number',
              },
            ]}
          >
            <Input
              type="text"
              value={userInfo.user.phone_no}
              onChange={(e) =>
                setProfileForm({
                  ...profileForm,
                  phone_no: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{
                width: '100%',
                background: '#FE6D04',
                borderColor: '#FE6D04',
              }}
              onClick={updateProfileForm}
            >
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default ClientSettings;
