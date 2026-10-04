import {
  Row,
  Breadcrumb,
  Col,
  Typography,
  Input,
  Form,
  Button,
  Checkbox,
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
import { addFAQ } from '../../../actions/adminActions';
import { getFAQ } from '../../../actions/contactActions';

const { Title } = Typography;

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} />;

const CreateFAQ = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const addFAQMessage = useSelector((state) => state.addFAQ);
  const addFaQLoading = useSelector((state) => state.addFAQ);
  const { loading } = addFaQLoading;

  useEffect(() => {
    if (addFAQMessage.addFAQ) {
      if (addFAQMessage.addFAQ.message !== undefined) {
        notification.success({ message: addFAQMessage.addFAQ.message });
        addFAQMessage.addFAQ = {};
        history.push('/admin/FAQ');
      }
    }
    if (addFAQMessage.error) {
      notification.error({ message: addFAQMessage.error });
      addFAQMessage.error = null;
    }
  }, [addFAQMessage, history]);

  const [faqData, setFaqData] = useState({
    question: '',
    answer: '',
    is_active: true,
  });

  const addSelectedFAQ = () => {
    let faqFormData = new FormData();

    faqFormData.append('question', faqData.question);
    faqFormData.append('answer', faqData.answer);
    faqFormData.append('is_active', faqData.is_active);

    dispatch(addFAQ(faqFormData));
    dispatch(getFAQ());
  };

  const statusOnChange = (e) => {
    setFaqData({ ...faqData, is_active: e.target.checked });
  };
  const faqStatus = `${faqData.is_active ? 'Active' : 'Inactive'}`;

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
            Add FAQ
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
            <Breadcrumb.Item>Add FAQ</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '11px' }}>
        <Form
          name="customized_form_controls"
          layout="vertical"
          onFinish={addSelectedFAQ}
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
                Add FAQ
              </Button>
            </Form.Item>
          </Createproductleft>
        </Form>
      </Row>
    </Admin>
  );
};

export default CreateFAQ;
