import {
  Col,
  Row,
  Upload,
  Form,
  Input,
  Button,
  Typography,
  Image,
  message,
  notification,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { API } from '../../../config';
import { updateUserProfileDetails } from '../../../actions/userActions';
import Modal from 'antd/lib/modal/Modal';

const { Text } = Typography;

// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// function beforeUpload(file) {
//   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
//   if (!isJpgOrPng) {
//     message.error("You can only upload JPG/PNG file!");
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error("Image must smaller than 2MB!");
//   }
//   return isJpgOrPng && isLt2M;
// }

const ProfileForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo);
  const { userInfo } = user;
  console.log({ userInfo });
  const [profileForm, setProfileForm] = useState({
    first_name: '',
    last_name: '',
    avatar: '',
    email: '',
    phone_no: '',
  });

  // useEffect(() => {
  //   setProfileForm({ ...profileForm });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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

        console.log(userInfoSessionStorage);
        window.sessionStorage.setItem(
          'userInfo',
          JSON.stringify(userInfoSessionStorage)
        );
      }
    }
    if (profileUpdateMessage.error) {
      notification.error({ message: profileUpdateMessage.error });
      profileUpdateMessage.error = {};
    }
  }, [profileUpdateMessage]);

  const updateProfileForm = () => {
    console.log(profileForm);
    let updateProfileFormData = new FormData();

    if (imageState.fileList.length > 0) {
      imageState.fileList.map((item) => {
        return updateProfileFormData.append('avatar', item.originFileObj);
      });
    }

    updateProfileFormData.append('first_name', profileForm.first_name);
    updateProfileFormData.append('last_name', profileForm.last_name);
    updateProfileFormData.append('email', profileForm.email);
    updateProfileFormData.append('phone_no', profileForm.phone_no);
    // updateProfileFormData.append("avatar", setImageUrl);
    dispatch(updateUserProfileDetails(updateProfileFormData));
  };

  // const [loading, setLoading] = useState(false);

  console.log(profileForm.first_name);
  const [imageUrl, setImageUrl] = useState();
  // const handleChange = (info) => {
  //   if (info.file.status === 'uploading') {
  //     setLoading(true);
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(
  //       info.file.originFileObj,
  //       (imageUrl) => setImageUrl(imageUrl),
  //       setLoading(loading)
  //     );
  //   }
  // };
  useEffect(() => {
    async function fetchProfile() {
      await Axios.get(`${API}/account/user-profile/`, {
        headers: { Authorization: 'JWT ' + userInfo.token },
      })
        .then((res) => {
          console.log(res);
          setProfileForm({ ...profileForm, ...res.data });
          form.setFieldsValue({
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            email: res.data.email,
            phone_no: res.data.phone_no,
            avatar: res.data.avatar_url,
          });
          setImageUrl(res.data.avatar_url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, userInfo]);

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

  const { previewVisible, previewImage, previewTitle, fileList } = imageState;
  const uploadButton = (
    <Typography.Text>
      <EditOutlined />
      Edit
    </Typography.Text>
  );

  // const uploadButton = (
  //   <div>
  //     {loading ? <LoadingOutlined /> : <PlusOutlined />}
  //     <div style={{ marginTop: 8 }}>Upload</div>
  //   </div>
  // );

  return (
    <Row gutter={[25, 30]}>
      {/* <Col lg={4}>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </Col> */}
      <Col lg={12}>
        <Form
          name="global_state"
          style={{ flexDirection: 'column' }}
          layout="vertical"
          form={form}
          type="PUT"
          // fields={fields}
          // onFieldsChange={(changedFields, allFields) => {
          //   onChange(allFields);
          // }}
          onFinish={updateProfileForm}
        >
          <Row>
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
              </Form.Item>
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
            </Col>
          </Row>
          <Row gutter={[15, 0]}>
            <Col lg={12}>
              <Form.Item
                name="first_name"
                label="First Name"
              // onChange={(e) => setFirstname(e.target.value)}
              >
                <Input
                  type="text"
                  value={profileForm.first_name}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      first_name: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item name="last_name" label="last Name">
                <Input
                  type="text"
                  value={profileForm.last_name}
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
          <Form.Item name="email" label="Email">
            <Input
              type="text"
              value={profileForm.email}
              onChange={(e) =>
                setProfileForm({
                  ...profileForm,
                  email: e.target.value,
                })
              }
              readOnly
            />
          </Form.Item>
          <Form.Item name="phone_no" label="Mobile Number">
            <Input
              type="text"
              value={profileForm.phone_no}
              onChange={(e) =>
                setProfileForm({
                  ...profileForm,
                  phone_no: e.target.value,
                })
              }
              placeholder="Enter your Mobile Number"
            />
          </Form.Item>
          <Text></Text>
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
            // loading={loading}
            >
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default ProfileForm;
