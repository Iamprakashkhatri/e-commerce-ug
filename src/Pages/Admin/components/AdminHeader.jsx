import {
  Col,
  Row,
  Menu,
  Dropdown,
  Typography,
  Avatar,
  Badge,
  Divider,
  message,
} from 'antd';
import React, { useEffect, useState } from 'react';
import {
  BellOutlined,
  UserOutlined,
  DownOutlined,
  AlignLeftOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link, useHistory, withRouter } from 'react-router-dom';
import Logo from '../../../assets/Images/new_logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../../actions/userActions';
import { getNotificationListAction } from '../../../actions/notificationActions';
import firebase from 'firebase';

import 'firebase/auth';
import axios from 'axios';
import { API } from '../../../config';

const { Text } = Typography;

function AdminHeader(props) {
  const { userInfo } = useSelector((state) => state.userInfo);
  const notificationList = useSelector(
    (state) => state.notificationList.notificationList
  );

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getNotificationListAction());
  }, [dispatch]);

  console.log(notificationList);

  const onClickNotificationItem = (id) => {
    history.push('/admin/order');

    axios
      .get(`${API}/notification/mark-as-read/${id}/`, {
        headers: { Authorization: 'JWT ' + userInfo.token },
      })
      .then((res) => {
        console.log({ res });

        dispatch(getNotificationListAction());
      })
      .catch((err) => {
        console.log({ err });
        message.error(err.message);
      });
  };

  const markAllAsRead = () => {
    axios
      .get(`${API}/notification/mark-all-as-read/`, {
        headers: { Authorization: 'JWT ' + userInfo.token },
      })
      .then((res) => {
        console.log({ res });
        message.success('Marked all as read');
        dispatch(getNotificationListAction());
      })
      .catch((err) => {
        console.log({ err });
        message.error(err.message);
      });
  };

  const notification = (
    <Menu style={{ margin: '0px', overflowY: 'scroll', width: '500px', maxHeight: '500px' }}>
      <Row justify="space-between">
        <Col>
          <Text
            strong
            style={{ fontSize: '20px', marginLeft: '13px', padding: '2px' }}
          >
            Notifications
          </Text>
        </Col>

        <Col>
          <Text
            strong
            style={{
              fontSize: '15px',
              marginRight: '13px',
              padding: '2px',
              color: '#FE6D04',
            }}
          >
            <span onClick={markAllAsRead} style={{ cursor: 'pointer' }}>
              Mark All As Read
            </span>
          </Text>
        </Col>
      </Row>

      {notificationList !== undefined &&
        notificationList.length > 0 &&
        notificationList.map((item, index) => (
          <Menu.Item
            key={index}
            style={{
              marginTop: '5px',
              backgroundColor: item.read ? '#F0F2F5' : 'white',
            }}
            onClick={() => onClickNotificationItem(item.id)}
          >
            <Row style={{ width: '100%' }}>
              <Col xs={24}>{item.body}</Col>
              <Col xs={24}>
                Order by:{' '}
                <span style={{ fontWeight: 600 }}>
                  {item.user_first_name} {item.user_last_name}
                </span>
              </Col>
              <Col xs={24}>
                Order Amount:{' '}
                <span style={{ fontWeight: 600 }}>
                  NRP. {item.order_billing?.amount_with_vat}
                </span>
              </Col>
              <Col xs={24} style={{ marginTop: '5px' }}>
                Product List:{' '}
                {item.product.map((val) => (
                  <span style={{ fontWeight: 600 }}>{val.name} | </span>
                ))}
              </Col>
              <Col
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  marginTop: '5px',
                }}
              >
                {new Date(item.created_at).toUTCString()}
              </Col>
            </Row>

            <Divider style={{ margin: '2px 0' }} />
          </Menu.Item>
        ))}
    </Menu>
  );

  const [windowWidth, setWindowWidth] = useState('');

  const { setCollapseSider, collapseSider } = props;

  const logOut = () => {
    dispatch(signOut());
    props.history.push('/');

    firebase.auth().signOut();
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/admin/profile">
          <UserOutlined style={{ marginRight: '.4rem' }} />
          Profile
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/settings">
          <SettingOutlined style={{ marginRight: '.4rem' }} />
          Settings
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={logOut}>
        <LogoutOutlined style={{ marginRight: '.4rem' }} />
        Logout
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', updateWindowSize);
    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []);

  const updateWindowSize = () => {
    setWindowWidth(window.innerWidth);
  };

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col>
          <Row gutter={20} type="flex" align="middle">
            <Col>
              <AlignLeftOutlined
                onClick={() => setCollapseSider(!collapseSider)}
                style={{ color: '#fff', fontSize: '20px' }}
              />
            </Col>
            <Col
              style={{
                fontWeight: 'bold',
                color: '#fff',
                height: '70px',
                alignContent: 'center',
              }}
            >
              <Link to="/">
                <img
                  src={Logo}
                  alt=""
                  style={{
                    height: '30px',
                    width: '150px',
                    objectFit: 'contain',
                  }}
                />
              </Link>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row gutter={[40, 0]} type="flex" align="middle">
            <Col style={{ marginTop: '.5rem' }}>
              <Dropdown
                overlayStyle={{ msOverflowY: 'scroll' }}
                placement="bottomRight"
                overlay={notification}
                arrow={true}
                trigger={['click']}
              >
                <Badge
                  count={
                    notificationList !== undefined &&
                    notificationList.reduce((acc, current) => {
                      if (!current.read) {
                        acc++;
                      }
                      return acc;
                    }, 0)
                  }
                >
                  <BellOutlined
                    style={{
                      color: '#fff',
                      fontSize: '25px',
                      cursor: 'pointer',
                    }}
                  />
                </Badge>
              </Dropdown>
            </Col>

            <Col>
              <Avatar
                style={{
                  backgroundColor: '#87d068',
                  marginRight: '.8rem',
                }}
                src={
                  userInfo && userInfo.user && userInfo.user.avatar_url ? (
                    userInfo.user.avatar_url
                  ) : (
                    <UserOutlined />
                  )
                }
              />
              <Dropdown overlay={menu} trigger={['click']}>
                <Text
                  style={{
                    cursor: 'pointer',
                    color: '#fff',
                  }}
                >
                  {userInfo && userInfo.user && windowWidth > 573
                    ? userInfo.user.first_name
                    : null}
                  <DownOutlined style={{ marginLeft: '.4rem' }} />
                </Text>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default withRouter(AdminHeader);
