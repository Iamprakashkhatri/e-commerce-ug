import React, { useEffect } from 'react';
import {
  Row,
  Col,
  Typography,
  Table,
  Breadcrumb,
  Tooltip,
  Button,
  Space,
  Popconfirm,
  message,
  notification,
} from 'antd';
import { Link, NavLink } from 'react-router-dom';
import {
  HomeOutlined,
  PlusOutlined,
  SettingOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import Admin from '../components';
import './styles/style.scss';
import { Dashboardcard } from '../components/Dashboard/styles/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getLabels } from '../../../actions/productActions';
import { deleteLabel } from '../../../actions/adminActions';

const { Title } = Typography;

const AdminLabelPage = () => {
  const labels = useSelector((state) => state.labels.labels);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLabels());
  }, [dispatch]);

  const deleteSelectedLabel = (slug) => {
    dispatch(deleteLabel(slug));
  };

  const deleteLabelMessage = useSelector((state) => state.deleteLabel);
  const updateLabelLoading = useSelector((state) => state.updateLabel);
  const deleteLabelLoading = useSelector((state) => state.deleteLabel);
  const { loading } = updateLabelLoading;
  const { deleteLoading } = deleteLabelLoading;

  useEffect(() => {
    if (deleteLabelMessage.deleteLabel) {
      if (deleteLabelMessage.deleteLabel.message !== undefined) {
        notification.success({
          message: deleteLabelMessage.deleteLabel.message,
        });
        deleteLabelMessage.deleteLabel = {};
        dispatch(getLabels());
      }
    }
    if (deleteLabelMessage.error) {
      notification.error({ message: deleteLabelMessage.error });
      deleteLabelMessage.error = null;
    }
  }, [deleteLabelMessage, dispatch]);

  const columns = [
    {
      title: 'ID',
      width: 100,
      dataIndex: 'id',
      key: 'number',
    },
    {
      title: 'Label Name',
      width: 260,
      dataIndex: 'name',
      key: 'name',
      ellipsis: {
        showTitle: false,
      },
      render: (item) => (
        <Tooltip placement="topLeft" title={item}>
          {item}
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      key: 'operation',
      width: 150,
      render: (value) => {
        return (
          <Space direction="vertical" size="small">
            <NavLink to={`/admin/updatelabel/${value.slug}`}>
              <Button
                type="primary"
                loading={loading}
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
              onConfirm={() => deleteSelectedLabel(value.slug)}
            >
              <Button
                type="primary"
                loading={deleteLoading}
                style={{
                  width: '100%',
                  background: '#FE6D04',
                  borderColor: '#FE6D04',
                }}
                icon={<DeleteOutlined />}
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
            level={2}
            style={{
              color: '#fff',
            }}
          >
            Label
          </Title>
        </Col>
        <Col>
          <Breadcrumb separator="-">
            <Breadcrumb.Item>
              <Link to="/admin">
                <HomeOutlined /> Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Label</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '11px' }}>
        <Dashboardcard>
          <Row justify="space-between">
            <Title level={3}>Label List</Title>
            <Link to="/admin/addlabel" style={{ color: '#fff' }}>
              <Button
                type="primary"
                style={{
                  width: '100%',
                  borderColor: '#FE6D04',
                  background: '#FE6D04',
                }}
                icon={<PlusOutlined />}
              >
                Add Label
              </Button>
            </Link>
          </Row>
          <Table
            style={{ marginTop: '2rem', width: '100%' }}
            columns={columns}
            dataSource={labels}
            scroll={{ x: 1000 }}
            pagination={{ position: ['bottomCenter'] }}
          />
        </Dashboardcard>
      </Row>
    </Admin>
  );
};

export default AdminLabelPage;
