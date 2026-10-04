import {
  DeleteOutlined,
  HomeOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import {
  Badge,
  Breadcrumb,
  Button,
  Col,
  Image,
  message,
  notification,
  Popconfirm,
  Row,
  Space,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { deleteSlider } from '../../../actions/adminActions';
import { getSliderImages } from '../../../actions/sliderActions';
import placeholder from '../../../assets/Images/errorimg.png';
import Admin from '../components';
import { Dashboardcard } from '../components/Dashboard/styles/dashboard';

const { Title } = Typography;

const AdminSliderPage = () => {
  const sliderImages = useSelector((state) => state.sliderImages.sliderImages);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSliderImages());
  }, [dispatch]);

  const deleteSelectedSlider = (slug) => {
    dispatch(deleteSlider(slug));
  };

  const deleteSliderMessage = useSelector((state) => state.deleteSlider);
  const deleteSliderLoading = useSelector((state) => state.deleteSlider);
  const { deleteLoading } = deleteSliderLoading;

  useEffect(() => {
    if (deleteSliderMessage.deleteSlider.message) {
      if (deleteSliderMessage.deleteSlider.message !== undefined) {
        notification.success({
          message: deleteSliderMessage.deleteSlider.message,
        });
        deleteSliderMessage.deleteSlider = {};
        dispatch(getSliderImages());
      }
      if (deleteSliderMessage.error) {
        notification.error({ message: deleteSliderMessage.error });
        deleteSliderMessage.error = null;
      }
    }
  }, [deleteSliderMessage, dispatch]);

  const columns = [
    {
      title: 'ID',
      width: 100,
      dataIndex: 'id',
      key: 'number',
    },
    {
      title: 'Title',
      width: 200,
      dataIndex: 'title',
      key: 'title',
      ellipsis: {
        showTitle: false,
      },
      render: (title) => (
        <Tooltip placement="topLeft" title={title}>
          {title}
        </Tooltip>
      ),
    },
    {
      title: 'Image',
      width: 150,
      dataIndex: 'slider_image',
      key: 'slider_image',
      render: (image) =>
        image !== null &&
        image.length > 0 && <Image src={image || placeholder} width={100} />,
    },
    {
      title: 'Image Placeholder',
      width: 150,
      dataIndex: 'slider_image_placeholder',
      key: 'slider_image_placeholder',
      render: (image) =>
        image !== null &&
        image.length > 0 && <Image src={image || placeholder} width={100} />,
    },
    {
      title: 'Status',
      width: 100,
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
      title: 'Link',
      width: 200,
      dataIndex: 'link',
      key: 'link',
    },
    {
      title: 'Actions',
      key: 'operation',
      width: 150,
      render: (value) => {
        return (
          <Space direction="vertical" size="small">
            <NavLink to={`/admin/updateslider/${value.slug}`}>
              <Button
                type="primary"
                style={{
                  width: '100%',
                  background: '#FE6D04',
                  borderColor: '#FE6D04',
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
              onConfirm={() => deleteSelectedSlider(value.slug)}
            >
              <Button
                type="primary"
                style={{
                  width: '100%',
                  background: '#FE6D04',
                  borderColor: '#FE6D04',
                }}
                icon={<DeleteOutlined />}
                loading={deleteLoading}
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
            level={1}
            style={{
              color: '#fff',
            }}
          >
            Slider Images
          </Title>
        </Col>
        <Col>
          <Breadcrumb separator="-">
            <Breadcrumb.Item>
              <Link to="/admin">
                <HomeOutlined /> Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Slider Images</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '11px' }}>
        <Dashboardcard>
          <Row justify="space-between">
            <Title level={3}>Slider Image</Title>
            <Link to="/admin/addslider" style={{ color: '#fff' }}>
              <Button
                type="primary"
                style={{
                  width: '100%',
                  borderColor: '#FE6D04',
                  background: '#FE6D04',
                }}
                icon={<PlusOutlined />}
              >
                Add Slider Image
              </Button>
            </Link>
          </Row>
          <Table
            style={{ marginTop: '2rem', width: '100%' }}
            columns={columns}
            dataSource={sliderImages}
            scroll={{ x: 1000 }}
            pagination={{ position: ['bottomCenter'] }}
          />
        </Dashboardcard>
      </Row>
    </Admin>
  );
};

export default AdminSliderPage;
