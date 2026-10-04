import {
	MailOutlined,
	PhoneOutlined,
	SendOutlined,
	CopyrightOutlined,
} from '@ant-design/icons';
import {
	Button,
	Col,
	Divider,
	Input,
	Layout,
	notification,
	Row,
	Space,
	Typography,
} from 'antd';
import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import {
	FaFacebookF,
	FaInstagram,
	FaMapMarkerAlt,
	FaTwitter,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addNewsletterSubscription } from '../../actions/userActions';
import { Container } from '../../StyleGlobal/container';
// import NabilBank from "../../assets/Images/nabil_bank.jpg";
import './styles/footer.scss';
import { NavLink } from 'react-router-dom';

export default function Footer() {
	const { Footer } = Layout;

	const { Text, Paragraph } = Typography;
	const dispatch = useDispatch();

	const [subscriberData, setSubscriberData] = useState({
		email: '',
	});

	const subscribeToNewsletter = () => {
		let formData = new FormData();
		formData.append('email', subscriberData.email);
		dispatch(addNewsletterSubscription(formData));
	};

	const addSubscriberMessage = useSelector(
		(state) => state.addNewsletterSubscription
	);

	useEffect(() => {
		if (addSubscriberMessage.subscribe.message) {
			if (addSubscriberMessage.subscribe.message !== undefined) {
				notification.success({
					message: addSubscriberMessage.subscribe.message,
				});
				addSubscriberMessage.subscribe.message = null;
				setSubscriberData({ ...subscriberData, email: '' });
			}
		}
		if (addSubscriberMessage.error) {
			notification.error({
				message: 'Subscriber with this email already exists',
			});
			addSubscriberMessage.error = null;
		}
		//eslint-disable-next-line
	}, [addSubscriberMessage, dispatch]);

	return (
		<Footer className="footerparent" id="footerparent">
			<Container>
				<Row style={{ width: '100%' }} gutter={[32, 32]}>
					<Col xs={24} sm={24} xl={8} lg={6} md={12}>
						<Space direction="vertical">
							<Paragraph>
								<Text strong className="footer-title">
									CONTACT INFO
								</Text>
							</Paragraph>
							<Space
								size="small"
								direction="vertical"
								style={{ marginTop: '10px' }}
							>
								<Text className="footer-text">
									<FaMapMarkerAlt /> United World Trade Center, Kathmandu
								</Text>
								<Text className="footer-text">
									{' '}
									<MailOutlined /> info@ultragroup.com.np{' '}
								</Text>
								<Text className="footer-text">
									<PhoneOutlined /> (+977) 985-1000505 / 014114073 / 014117143
								</Text>
							</Space>
							<Space size="middle" direction="horizontal">
								<a
									href="https://www.facebook.com/ultragroupnepal/"
									className="social-links"
								>
									<FaFacebookF />
								</a>
								<a
									href="https://twitter.com/ultragroupnepal"
									className="social-links"
								>
									<FaTwitter />
								</a>
								<a
									href="https://www.instagram.com/ultragroupnepal/"
									className="social-links"
								>
									<FaInstagram />
								</a>
							</Space>
						</Space>
					</Col>
					<Col xs={12} sm={12} xl={5} lg={6} md={12}>
						<Space direction="vertical">
							<Paragraph>
								<Text strong className="footer-title">
									COMPANY
								</Text>
							</Paragraph>
							<Space
								size="small"
								direction="vertical"
								style={{ marginTop: '10px' }}
							>
								<NavLink to="/about-us">
									<Text className="footer-text">About Us</Text>
								</NavLink>
								<NavLink to="/shop">
									<Text className="footer-text">Shop</Text>
								</NavLink>
								<NavLink to="/deals">
									<Text className="footer-text">Deals</Text>
								</NavLink>
								<NavLink to="/contact">
									<Text className="footer-text">Contact Us</Text>
								</NavLink>
							</Space>
						</Space>
					</Col>
					<Col xs={12} sm={12} xl={6} lg={6} md={12}>
						<Space direction="vertical">
							<Paragraph>
								<Text strong className="footer-title">
									USEFUL LINKS
								</Text>
							</Paragraph>
							<Space
								size="small"
								direction="vertical"
								style={{ marginTop: '10px' }}
							>
								<NavLink to="/contact">
									<Text className="footer-text">Help</Text>
								</NavLink>
								<NavLink to="/order">
									<Text className="footer-text">My Orders</Text>
								</NavLink>
								<NavLink to="/forgotPassword">
									<Text className="footer-text">Forgot Password?</Text>
								</NavLink>
								<NavLink to="/register">
									<Text className="footer-text">Sign Up</Text>
								</NavLink>
							</Space>
						</Space>
					</Col>
					<Col xs={24} sm={24} xl={5} lg={6} md={12}>
						<Text strong className="footer-title">
							JOIN OUR NEWSLETTER
						</Text>
						<Space direction="vertical" size="middle">
							<Paragraph style={{ marginTop: '25px' }}>
								<Text style={{ color: '#fff' }}>
									Sign up for news about our latest arrivals, exclusive
									promotions, events and many more offers.
								</Text>
							</Paragraph>

							<Form onFinish={subscribeToNewsletter}>
								<Form.Item
									name="email"
									rules={[
										{
											required: true,
											message: 'Please enter your email',
										},
										{
											type: 'email',
											message: 'Please enter a valid email address',
										},
									]}
								>
									<Row style={{ width: '100%' }}>
										<Col xs={24} xl={24} className="footersubscription">
											<Input
												value={subscriberData.email}
												// prefix={<MailOutlined />}
												onChange={(e) =>
													setSubscriberData({
														...subscriberData,
														email: e.target.value,
													})
												}
												className={{
													position: 'relative',
												}}
												placeholder="E-mail Address"
											/>
											<Button
												type="primary"
												htmlType="submit"
												icon={<SendOutlined />}
												style={{
													marginTop: '-1px',
													backgroundColor: '#FE6D04',
													border: 'none',
													position: 'absolute',
													right: '0',
													width: '40px',
													top: '0',
													bottom: '0',
													borderRadius: '0 1px 1px 0',
												}}
											></Button>
										</Col>
									</Row>
								</Form.Item>
							</Form>
						</Space>
					</Col>
				</Row>
				{/* <Row style={{ width: "100%" }} justify="end">
          <Col xs={24} xl={8} align="end">
            <Space size="small" direction="horizontal">
              <Title level={5} style={{ color: "white" }}>
                We Accept:
              </Title>
              <img
                src={NabilBank}
                alt="NabilBank"
                style={{ width: "100px", height: "75px", borderRadius: "4px" }}
              />
            </Space>
          </Col>
        </Row> */}
				<Divider className="footer-divider" />
				<Col xs={16} lg={8}>
					<Text style={{ fontSize: '12px', color: '#fff' }}>
						<CopyrightOutlined style={{ marginRight: '4px' }} />
						2020 Ultra Group Nepal. All Rights Reserved.
					</Text>
				</Col>
				<Col xs={8} lg={8} align="middle">
					<Space direction="horizontal" size="small">
						<NavLink to="/terms">
							<Text style={{ fontSize: '12px', color: '#fff' }}>Terms</Text>
						</NavLink>
						<Text style={{ color: '#fff' }}>|</Text>
						<NavLink to="/privacy-policy">
							<Text style={{ fontSize: '12px', color: '#fff' }}>
								Privacy Policy
							</Text>
						</NavLink>
					</Space>
				</Col>
				<Col xs={24} lg={8} align="end">
					<Space direction="horizontal" size="small">
						<Text style={{ fontSize: '12px', color: '#fff' }}>
							Development Partner: <strong>Quantum IT Solutions</strong>
						</Text>
					</Space>
				</Col>
			</Container>
		</Footer>
	);
}
