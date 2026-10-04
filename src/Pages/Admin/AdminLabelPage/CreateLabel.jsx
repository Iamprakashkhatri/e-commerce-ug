import {
  Row,
  Breadcrumb,
  Col,
  Typography,
  Input,
  Form,
  Button,
  message,
  Spin,
  notification,
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { HomeOutlined, LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import Admin from '../components';
import { Createproductleft } from './styles/product';
import './styles/style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addLabel } from '../../../actions/adminActions';
import { getLabels } from '../../../actions/productActions';

const { Title } = Typography;

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} />;

const CreateLabel = () => {
  const labels = useSelector((state) => state.labels.labels);
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getLabels());
  }, [dispatch]);

  const addLabelMessage = useSelector((state) => state.addLabel);
  const addLabelLoading = useSelector((state) => state.addLabel);
  const { loading } = addLabelLoading;

  useEffect(() => {
    if (addLabelMessage.addLabel) {
      if (addLabelMessage.addLabel.message !== undefined) {
        notification.success({ message: addLabelMessage.addLabel.message });
        addLabelMessage.addLabel = {};
        form.resetFields();
        history.push('/admin/label');
      }
    }
    if (addLabelMessage.error) {
      notification.error({ message: addLabelMessage.error });
      addLabelMessage.error = null;
    }
  }, [addLabelMessage, form, history]);

  const [labelData, setLabelData] = useState({
    name: '',
  });

  const [error, setError] = useState(false);

  const addSelectedLabel = () => {
    let labelFormData = new FormData();

    if (error === false) {
      labelFormData.append('name', labelData.name);

      dispatch(addLabel(labelFormData));
      dispatch(getLabels());
    } else {
      notification.error({
        message: 'Label name already exists! Please enter another label name',
      });
    }
  };

  const handleNameChange = (e) => {
    setLabelData({ ...labelData, name: e.target.value });

    let found = null;
    if (labels !== undefined && labels.length > 0) {
      found = labels.find(
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
            Add Label
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
              <Link to="/admin/label">Label</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Add Label</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '11px' }}>
        <Form
          form={form}
          name="customized_form_controls"
          layout="vertical"
          onFinish={addSelectedLabel}
        >
          <Createproductleft>
            <Form.Item
              name="name"
              label="Label Name"
              rules={[{ required: true, message: 'Please enter label name' }]}
            >
              <Input
                value={labelData.name}
                onChange={(e) => handleNameChange(e)}
                placeholder="Label Name"
              />
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
                Add Label
              </Button>
            </Form.Item>
          </Createproductleft>
        </Form>
      </Row>
    </Admin>
  );
};

export default CreateLabel;
