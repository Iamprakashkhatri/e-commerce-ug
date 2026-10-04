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
  getNewsletterData,
  getNewsletterList,
  updateNewsletter,
} from '../../../actions/adminActions';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const { Title } = Typography;

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} />;

const UpdateNewsletter = ({ match }) => {
  const slug = match.params.slug;
  const history = useHistory();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewsletterData(slug));
    dispatch(getNewsletterList());
  }, [dispatch, slug]);

  const newslettersList = useSelector((state) => state.newsletter.newsletters);
  const newsletterDataMain = useSelector(
    (state) => state.newsletterData.newsletterData
  );

  const [newsletterData, setNewsletterData] = useState({
    title: '',
    email_subject: '',
  });

  const [content, setContent] = useState('');

  useEffect(() => {
    if (newsletterDataMain) {
      setNewsletterData({
        title: newsletterDataMain.title,
        email_subject: newsletterDataMain.email_subject,
      });
      setContent(newsletterDataMain.content);
    }
    form.setFieldsValue({
      title: newsletterDataMain.title,
      email_subject: newsletterDataMain.email_subject,
    });
  }, [newsletterDataMain, form]);

  const updateNewsletterMessage = useSelector(
    (state) => state.updateNewsletter
  );

  const updateNewsLetterLoading = useSelector(
    (state) => state.updateNewsletter
  );
  const { loading } = updateNewsLetterLoading;

  useEffect(() => {
    if (updateNewsletterMessage.updateNewsletter) {
      if (updateNewsletterMessage.updateNewsletter.message !== undefined) {
        notification.success({
          message: updateNewsletterMessage.updateNewsletter.message,
        });
        updateNewsletterMessage.updateNewsletter = {};
        history.push('/admin/newsletter');
      }
    }
    if (updateNewsletterMessage.error) {
      notification.error({ message: updateNewsletterMessage.error });
      updateNewsletterMessage.error = null;
    }
  }, [updateNewsletterMessage, history]);

  const [error, setError] = useState(false);
  const onChangeTitle = (e) => {
    setNewsletterData({ ...newsletterData, title: e.target.value });

    let found = null;
    if (newslettersList !== undefined && newslettersList.length > 0) {
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

  const updateSelectedNewsletter = () => {
    let formData = new FormData();

    if (error === false) {
      formData.append('title', newsletterData.title);
      formData.append('email_subject', newsletterData.email_subject);
      formData.append('content', content);

      if (content.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
        return notification.error({ message: 'Content cannot be empty' });
      } else {
        dispatch(updateNewsletter(slug, formData));
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
            Update Newsletter
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
            <Breadcrumb.Item>Update Newsletter</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      <Row style={{ width: '100%', padding: '11px' }}>
        <Form
          name="customized_form_controls"
          form={form}
          type="PUT"
          layout="vertical"
          onFinish={updateSelectedNewsletter}
        >
          <Createproductleft>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please enter title' }]}
            >
              <Input
                value={newsletterData.title}
                onChange={(e) => onChangeTitle(e)}
                placeholder="Title"
              />
            </Form.Item>
            <Form.Item
              name="email_subject"
              label="Subject"
              rules={[{ required: true, message: 'Please enter Subject' }]}
            >
              <Input
                value={newsletterData.email_subject}
                onChange={(e) =>
                  setNewsletterData({
                    ...newsletterData,
                    email_subject: e.target.value,
                  })
                }
                placeholder="Subject"
              />
            </Form.Item>
            <Title level={4}>Content</Title>
            <ReactQuill value={content} onChange={(e) => setContent(e)} />
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
                Update Newsletter
              </Button>
            </Form.Item>
          </Createproductleft>
        </Form>
      </Row>
    </Admin>
  );
};

export default UpdateNewsletter;
