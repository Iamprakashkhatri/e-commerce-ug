import React, { useEffect, useState } from 'react';
import {
  Col,
  Row,
  Typography,
  Form,
  Input,
  Button,
  Divider,
  message,
  notification,
} from 'antd';
import { Container } from '../../StyleGlobal/container';
import { Contactblock } from './styles/contact';
import Contactfaq from './Contactfaq';
import {
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
} from 'react-icons/fa';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import './styles/style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getFAQ, postContactFormData } from '../../actions/contactActions';
import { MailOutlined } from '@ant-design/icons';

const Contact = () => {
  const [form] = Form.useForm();

  const { Text, Title } = Typography;

  const faq = useSelector((state) => state.faq.faq);
  const contact = useSelector((state) => state.contact.contact);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFAQ());
  }, [dispatch]);

  const [contactFormData, setContactFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    subject: '',
    message: '',
  });

  const submitHandler = () => {
    dispatch(postContactFormData(contactFormData));
  };

  useEffect(() => {
    if (contact.message) {
      notification.success({ message: contact.message });
    }
  }, [contact]);

  return (
    <React.Fragment>
      <Navbar />
      <Container>
        <Row style={{ width: '100%' }} justify="center">
          <Col
            xl={12}
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
            justify="center"
            align="center"
          >
            <Text
              style={{
                color: '#777',
                fontWeight: '500',
                marginTop: '2em',
              }}
            >
              GOT A QUESTION ?
            </Text>
            <Title
              level={1}
              style={{
                marginTop: '0',
                fontSize: '2.7em',
              }}
              strong
            >
              Contact Us
            </Title>
            <Text>
              We're here to help and answer any question you might have.
            </Text>
            <Text>We look forward to hearing from you.</Text>
          </Col>
        </Row>
      </Container>
      <Contactblock>
        <Container>
          <Row justify="space-between" style={{ width: '100%' }}>
            <Col
              xl={12}
              lg={12}
              md={24}
              sm={24}
              xs={24}
              className="contactform"
            >
              <Form form={form} method="POST">
                <Form.Item
                  className="form-wrap"
                  name="First Name"
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder="First Name"
                    className="form-input"
                    value={contactFormData.first_name}
                    onChange={(e) =>
                      setContactFormData({
                        ...contactFormData,
                        first_name: e.target.value,
                      })
                    }
                  />
                </Form.Item>
                <Form.Item
                  className="form-wrap"
                  name="Last Name"
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder="Last Name"
                    className="form-input"
                    value={contactFormData.last_name}
                    onChange={(e) =>
                      setContactFormData({
                        ...contactFormData,
                        last_name: e.target.value,
                      })
                    }
                  />
                </Form.Item>
                <Form.Item
                  className="form-wrap"
                  name="Email"
                  rules={[
                    {
                      type: 'email',
                      message: 'Please enter a valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please enter your E-mail!',
                    },
                  ]}
                >
                  <Input
                    placeholder="Email"
                    className="form-input"
                    value={contactFormData.email}
                    onChange={(e) =>
                      setContactFormData({
                        ...contactFormData,
                        email: e.target.value,
                      })
                    }
                  />
                </Form.Item>
                <Form.Item
                  className="form-wrap"
                  name="Subject"
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder="Subject"
                    className="form-input"
                    value={contactFormData.subject}
                    onChange={(e) =>
                      setContactFormData({
                        ...contactFormData,
                        subject: e.target.value,
                      })
                    }
                  />
                </Form.Item>
                <Form.Item
                  className="form-wrap"
                  name="Message"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea
                    placeholder="Your Message"
                    className="form-input textarea"
                    value={contactFormData.message}
                    onChange={(e) =>
                      setContactFormData({
                        ...contactFormData,
                        message: e.target.value,
                      })
                    }
                  />
                </Form.Item>
                <Form.Item className="form-wrap">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="btn-contact"
                    onClick={() => submitHandler()}
                  >
                    Send
                  </Button>
                </Form.Item>
              </Form>
              <Divider
                style={{
                  color: '#777',
                  border: '1px solid',
                }}
              />
              <Title
                level={4}
                style={{
                  color: '#777777',
                }}
              >
                Contact Information
              </Title>
              <Row style={{ width: '100%' }} gutter={[8, 8]}>
                <Col xs={24} lg={12}>
                  <Text className="contactform-info">
                    <FaMapMarkerAlt className="icon" /> Kathmandu, Nepal
                  </Text>
                </Col>
                <Col xs={24} lg={12}>
                  <Text className="contactform-info">
                    <FaPhoneAlt className="icon" />
                    014114073 / 014117143
                  </Text>
                </Col>
                <Col xs={24} lg={24}>
                  <Text className="contactform-info">
                    <MailOutlined className="icon" /> info@ultragroup.com.np
                  </Text>
                </Col>
              </Row>
              <Row style={{ width: '100%' }}>
                <Col xs={24} lg={24}>
                  <Row style={{ width: '100%' }} gutter={[8, 0]}>
                    <Col xs={24} lg={24}>
                      <Title
                        level={4}
                        style={{
                          color: '#777777',
                        }}
                      >
                        Social Links
                      </Title>
                    </Col>
                    <Col xs={24}>
                      <a
                        href="https://www.facebook.com/ultragroupnepal/"
                        className="contact-links"
                      >
                        <FaFacebookF />
                      </a>
                      <a
                        href="https://twitter.com/ultragroupnepal"
                        className="contact-links"
                      >
                        <FaTwitter />
                      </a>
                      <a
                        href="https://www.instagram.com/ultragroupnepal/"
                        className="contact-links"
                      >
                        <FaInstagram />
                      </a>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xl={11} lg={11} md={24} sm={24} xs={24}>
              <Title level={3} strong>
                How Can We Help ?
              </Title>
              {faq !== undefined &&
                faq.map(
                  (faq) =>
                    faq.is_active && (
                      <Contactfaq
                        key={faq.id}
                        id={faq.id}
                        question={faq.question}
                        answer={faq.answer}
                      />
                    )
                )}
            </Col>
          </Row>
        </Container>
      </Contactblock>
      <Footer />
    </React.Fragment>
  );
};

export default Contact;
