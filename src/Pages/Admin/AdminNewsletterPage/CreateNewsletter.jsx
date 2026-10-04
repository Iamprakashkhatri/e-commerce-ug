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
import {
  addNewsletter,
  getNewsletterList,
} from '../../../actions/adminActions';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Title } = Typography;

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} />;

const CreateNewsletter = () => {
  const newslettersList = useSelector((state) => state.newsletter.newsletters);
  const addNewsletterMessage = useSelector((state) => state.addNewsletter);
  const addNewsletterLoading = useSelector((state) => state.addNewsletter);
  const { loading } = addNewsletterLoading;
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(getNewsletterList());
  }, [dispatch]);

  useEffect(() => {
    console.log({ addNewsletterMessage });

    if (addNewsletterMessage.addNewsletter) {
      if (addNewsletterMessage.addNewsletter.message !== undefined) {
        notification.success({
          message: 'Newsletter mail has been sent!',
        });
        addNewsletterMessage.addNewsletter = {};
        form.resetFields();
        history.push('/admin/newsletter');
      }
    }
    if (addNewsletterMessage.error) {
      notification.error({ message: addNewsletterMessage.error });
      addNewsletterMessage.error = null;
    }
  }, [addNewsletterMessage, form, history]);

  const [newsletterData, setNewsletterData] = useState({
    title: '',
    email_subject: '',
    content: '',
  });

  const onChangeTitle = (e) => {
    setNewsletterData({ ...newsletterData, title: e.target.value });

    let found = null;
    if (newslettersList && newslettersList.length > 0) {
      found = newslettersList.find(
        (item) => item.title.toLowerCase() === e.target.value.toLowerCase()
      );
    }

    if (found) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const onChangeSubject = (value) => {
    setNewsletterData({ ...newsletterData, email_subject: value });
  };

  const onChangeContent = (value) => {
    setNewsletterData({ ...newsletterData, content: value });
  };

  const [error, setError] = useState(false);

  const addSelectedNewsletter = () => {
    let formData = new FormData();

    if (error === false) {
      formData.append('title', newsletterData.title);
      formData.append('email_subject', newsletterData.email_subject);
      formData.append('content', newsletterData.content);

      if (
        newsletterData.content.replace(/<(.|\n)*?>/g, '').trim().length === 0
      ) {
        return notification.error({ message: 'Content cannot be empty' });
      } else {
        dispatch(addNewsletter(formData));
        dispatch(getNewsletterList());
      }
    } else {
      notification.error({
        message:
          'Newsletter title already exists! Please enter another newsletter title',
      });
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
            Add Newsletter
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
              <Link to="/admin/newsletter">Newsletter</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Add Newsletter</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '11px' }}>
        <Form
          form={form}
          name="customized_form_controls"
          layout="vertical"
          onFinish={addSelectedNewsletter}
        >
          <Createproductleft>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please enter a title' }]}
            >
              <Input
                value={newsletterData.title}
                onChange={(e) => onChangeTitle(e)}
                placeholder="Title"
              />
            </Form.Item>
            <Form.Item
              name="subject"
              label="Subject"
              rules={[{ required: true, message: 'Please enter a subject' }]}
            >
              <Input
                value={newsletterData.subject}
                onChange={(e) => onChangeSubject(e.target.value)}
                placeholder="Subject"
              />
            </Form.Item>
            <Title level={4}>Content</Title>
            <ReactQuill
              value={newsletterData.content}
              onChange={(e) => onChangeContent(e)}
            />
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
                Add Newsletter
              </Button>
            </Form.Item>
          </Createproductleft>
        </Form>
      </Row>
    </Admin>
  );
};

export default CreateNewsletter;
