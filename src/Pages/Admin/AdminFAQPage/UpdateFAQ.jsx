import {
  Row,
  Breadcrumb,
  Col,
  Typography,
  Input,
  Form,
  Button,
  message,
  Checkbox,
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
import axios from 'axios';
import { API } from '../../../config';
import { updateFAQ } from '../../../actions/adminActions';

const { Title } = Typography;

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} />;

const UpdateFAQ = ({ match }) => {
  const slug = match.params.slug;
  const history = useHistory();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const updateFAQMessage = useSelector((state) => state.updateFAQ);
  const updateFAQLoading = useSelector((state) => state.updateFAQ);
  const { loading } = updateFAQLoading;

  useEffect(() => {
    if (updateFAQMessage.updateFAQ) {
      if (updateFAQMessage.updateFAQ.message !== undefined) {
        notification.success({ message: updateFAQMessage.updateFAQ.message });
        updateFAQMessage.updateFAQ = {};
        history.push('/admin/FAQ');
      }
    }
    if (updateFAQMessage.error) {
      notification.error({ message: updateFAQMessage.error });
      updateFAQMessage.error = null;
    }
  }, [updateFAQMessage, history]);

  const [faqData, setFaqData] = useState({
    question: '',
    answer: '',
    is_active: true,
  });

  const updateSelectedFAQ = () => {
    let faqFormData = new FormData();

    faqFormData.append('question', faqData.question);
    faqFormData.append('answer', faqData.answer);
    faqFormData.append('is_active', faqData.is_active);

    dispatch(updateFAQ(slug, faqData));
  };

  const statusOnChange = (e) => {
    setFaqData({ ...faqData, is_active: e.target.checked });
  };
  const faqStatus = `${faqData.is_active ? 'Active' : 'Inactive'}`;

  useEffect(() => {
    async function fetchLabelData() {
      await axios
        .get(`${API}/misc/faq/${slug}/`)
        .then((res) => {
          setFaqData({ ...faqData, ...res.data });
          form.setFieldsValue({
            question: res.data.question,
            answer: res.data.answer,
            is_active: res.data.is_active,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchLabelData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

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
            Update FAQ
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
              <Link to="/admin/faq">FAQ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Update FAQ</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '11px' }}>
        <Form
          name="customized_form_controls"
          form={form}
          type="PUT"
          layout="vertical"
          onFinish={updateSelectedFAQ}
        >
          <Createproductleft>
            <Form.Item
              name="question"
              label="Question"
              rules={[{ required: true, message: 'Please enter question' }]}
            >
              <Input
                value={faqData.question}
                onChange={(e) =>
                  setFaqData({
                    ...faqData,
                    question: e.target.value,
                  })
                }
                placeholder="Question"
              />
            </Form.Item>
            <Form.Item
              name="answer"
              label="Answer"
              rules={[{ required: true, message: 'Please enter answer' }]}
            >
              <Input
                value={faqData.answer}
                onChange={(e) =>
                  setFaqData({
                    ...faqData,
                    answer: e.target.value,
                  })
                }
                placeholder="Answer"
              />
            </Form.Item>

            <Form.Item name="is_active">
              <Checkbox checked={faqData.is_active} onChange={statusOnChange}>
                {faqStatus}
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
                Update FAQ
              </Button>
            </Form.Item>
          </Createproductleft>
        </Form>
      </Row>
    </Admin>
  );
};

export default UpdateFAQ;
