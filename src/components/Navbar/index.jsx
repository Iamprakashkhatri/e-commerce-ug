import {
  Row,
  Menu,
  Dropdown,
  Drawer,
  Input,
  Badge,
  Col,
  Space,
  Divider,
} from 'antd';
import React, { useEffect, useState } from 'react';

import {
  DownOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DashboardOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { NavLink, Redirect, withRouter, useParams } from 'react-router-dom';
import {
  FixedTop,
  Navigation,
  SocialLink,
  NavDropdown,
  NavLogo,
  Navcontainer,
  NavList,
  MobileNav,
} from './styles/Navbar';
import { RiMenu3Fill } from 'react-icons/ri';
import Logo from '../../assets/Images/new_logo.png';
import './styles/navbar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../actions/userActions';
import { getMoreProducts } from '../../actions/productActions';
import Avatar from 'antd/lib/avatar/avatar';

import 'firebase/auth';
import firebase from 'firebase';

// import { Container } from "../../StyleGlobal/Container";
const { Search } = Input;

const Navbar = (props) => {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [windowWidth, setWindowWidth] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const [sort] = useState('');
  const [page, setPage] = useState(1);

  const { slug } = useParams();

  const { userInfo } = useSelector((state) => state.userInfo);
  let cartItems = JSON.parse(localStorage.getItem('cartItems'));
  const categories = useSelector((state) => state.category.categories);
  const viewMoreProducts = useSelector(
    (state) => state.moreProducts.moreProducts.results
  );

  const cartItemsCount = useSelector((state) => state.cartItems.cartItemsInfo);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', updateWindowSize);
    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []);

  useEffect(() => {
    if (slug) {
      dispatch(getMoreProducts(sort, page, slug));
    }
  }, [slug, dispatch, sort, page]);

  const updateWindowSize = () => {
    setWindowWidth(window.innerWidth);
  };

  const redirectUser = () => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };

  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchKeyword && props.history.push(`/search/${searchKeyword}`);
    }
  };
  const handleSearchClick = () => {
    searchKeyword && props.history.push(`/search/${searchKeyword}`);
  };
  const showDrawer = () => {
    setMobileDrawer(true);
  };

  const hideDrawer = () => {
    setMobileDrawer(false);
  };

  const userMenu = () => {
    return (
      <Menu
        style={{
          padding: '1em',
        }}
      >
        {userInfo && userInfo.user && userInfo.user.is_admin ? (
          <Menu.Item
            key="1"
            style={{
              padding: '0.5em',
            }}
          >
            {' '}
            <NavLink to="/admin">
              <DashboardOutlined style={{ marginRight: '.4rem' }} />
              Dashboard
            </NavLink>
          </Menu.Item>
        ) : null}

        <Menu.Item
          key="2"
          style={{
            padding: '0.5em',
          }}
        >
          <NavLink to="/client">
            <UserOutlined style={{ marginRight: '.4rem' }} />
            Profile
          </NavLink>
        </Menu.Item>
        <Menu.Item
          key="3"
          style={{
            padding: '0.5em',
          }}
        >
          <NavLink to="/settings">
            <SettingOutlined style={{ marginRight: '.4rem' }} />
            Settings
          </NavLink>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          key="4"
          style={{
            padding: '0.5em',
          }}
          onClick={logOut}
        >
          <LogoutOutlined style={{ marginRight: '.4rem' }} />
          Logout
        </Menu.Item>
      </Menu>
    );
  };

  const menu = (
    <Menu>
      {categories.map((item) => {
        return (
          <Menu.Item key={item.id}>
            <NavLink to={`/category/${item.slug}`}>{item.name}</NavLink>
            {/* <NavLink to={`/category/${slug}`}>{item.cat_name}</NavLink> */}
            {/* {console.log(
              "categories navbar data check",
              categories.map((item) => item.cat_name)
            )} */}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const NavigationLink = () => {
    return (
      <NavList>
        {/* <NavLink to="/" className="navbar-navlist">
          Home
        </NavLink> */}
        {/* <NavLink to="/cart" className="navbar-navlist">
          Cart
          <Badge
            count={cartItemsCount && cartItemsCount.length}
            showZero
            size="small"
            style={{ marginLeft: '10px' }}
          />
        </NavLink> */}
        <NavLink to="/shop" className="navbar-navlist">
          Shop
        </NavLink>
        <NavLink to="/deals" className="navbar-navlist">
          Deals
        </NavLink>
        <Dropdown overlay={menu}>
          <a
            className="navbar-navlist"
            style={{ fontSize: '16px' }}
            onClick={(e) => e.preventDefault()}
          >
            Categories <DownOutlined />
          </a>
        </Dropdown>
        {'  '}
        {/* <NavLink to="/contact" className="navbar-navlist">
          Contact Us
        </NavLink> */}
      </NavList>
    );
  };

  const UserLink = () => {
    return (
      <NavList>
        {userInfo && userInfo.user && userInfo.user.is_admin ? (
          <NavLink to="/admin" className="navbar-navlist">
            <DashboardOutlined style={{ marginRight: '.4rem' }} />
            Dashboard
          </NavLink>
        ) : null}
        <NavLink to="/client" className="navbar-navlist">
          <UserOutlined style={{ marginRight: '.4rem' }} />
          Profile
        </NavLink>
        <NavLink to="/settings" className="navbar-navlist">
          <SettingOutlined style={{ marginRight: '.4rem' }} />
          Settings
        </NavLink>
        <NavLink to="/wishlist" className="navbar-navlist">
          <HeartOutlined style={{ marginRight: '.4rem' }} />
          Wishlist
        </NavLink>
        <NavLink to="/cart" className="navbar-navlist">
          <ShoppingCartOutlined
            style={{
              color: '#fff',
              fontSize: '20px',
              marginRight: '.4rem',
            }}
          />
          Cart
          <Badge
            count={cartItemsCount && cartItemsCount.length}
            showZero
            size="small"
            style={{ marginLeft: '10px' }}
          />
        </NavLink>
      </NavList>
    );
  };

  const logOut = () => {
    dispatch(signOut());
    firebase.auth().signOut();
    setRedirect(true);
  };

  return (
    <React.Fragment>
      <FixedTop>
        {windowWidth > 991 ? (
          <>
            <Navigation>
              <Navcontainer>
                <Row
                  justify="space-between"
                  className="navtop"
                  style={{ width: '100%', paddingTop: '15px' }}
                  align="middle"
                  gutter={[12, 12]}
                >
                  <Col xs={4}>
                    <Row justify="start">
                      <NavLogo>
                        <NavLink to="/">
                          <img src={Logo} height="30" width="150" alt="" />
                        </NavLink>
                      </NavLogo>
                    </Row>
                  </Col>
                  <Col xs={10}>
                    <Row justify="center">
                      <Search
                        placeholder="What are you looking for?"
                        size="large"
                        className="search-button"
                        style={{ padding: '0em', width: '100%' }}
                        value={searchKeyword}
                        onKeyDown={handleSubmit}
                        onSearch={handleSearchClick}
                        enterButton
                        onChange={(e) => setSearchKeyword(e.target.value)}
                      />
                    </Row>
                  </Col>
                  <Col xs={3}>
                    <Row justify="center">
                      <SocialLink>
                        <Space size="middle" direction="horizontal">
                          <a
                            href="https://www.facebook.com/ultragroupnepal/"
                            className="social-links"
                          >
                            <FaFacebookF color="#FE6D04" />
                          </a>
                          <a
                            href="https://twitter.com/ultragroupnepal"
                            className="social-links"
                          >
                            <FaTwitter color="#FE6D04" />
                          </a>
                          <a
                            href="https://www.instagram.com/ultragroupnepal/"
                            className="social-links"
                          >
                            <FaInstagram color="#FE6D04" />
                          </a>
                        </Space>
                      </SocialLink>
                    </Row>
                  </Col>

                  <Col xs={5}>
                    <Row justify="center" align="middle">
                      <NavDropdown>
                        {userInfo ? (
                          <Row justify="center" align="middle">
                            <Col>
                              <Space direction="horizontal" size="large">
                                {userInfo ? (
                                  <NavLink to="/wishlist">
                                    <HeartOutlined
                                      style={{
                                        color: '#5a5a5a',
                                        fontSize: '32px',
                                      }}
                                    />
                                  </NavLink>
                                ) : null}
                                <NavLink to="/cart">
                                  <Badge
                                    count={cartItems && cartItems.length}
                                    showZero
                                    size="default"
                                  >
                                    <ShoppingCartOutlined
                                      style={{
                                        color: '#5a5a5a',
                                        fontSize: '32px',
                                      }}
                                    />
                                  </Badge>
                                </NavLink>
                              </Space>
                            </Col>
                            <Col align="middle" style={{ marginLeft: '20px' }}>
                              <Dropdown overlay={userMenu} trigger={['click']}>
                                <span
                                  style={{
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    color: '#FE6D04',
                                  }}
                                >
                                  {userInfo.user.first_name}
                                  <DownOutlined
                                    style={{
                                      marginLeft: '0.5em',
                                      color: '#FE6D04',
                                    }}
                                  />{' '}
                                </span>
                              </Dropdown>
                            </Col>
                          </Row>
                        ) : (
                          <Row justify="center" align="middle">
                            <NavLink
                              to="/login"
                              style={{ color: '#FE6D04', fontSize: '1.1em' }}
                            >
                              <UserOutlined
                                style={{
                                  border: '2px solid white',
                                  borderRadius: '50%',
                                  color: '#FE6D04',
                                }}
                              />{' '}
                              Login/Sign up
                            </NavLink>

                            <Space
                              direction="horizontal"
                              size="large"
                              style={{ marginLeft: '20px' }}
                            >
                              {userInfo ? (
                                <NavLink to="/wishlist">
                                  <HeartOutlined
                                    style={{
                                      color: '#5a5a5a',
                                      fontSize: '32px',
                                    }}
                                  />
                                </NavLink>
                              ) : null}
                              <NavLink to="/cart">
                                <Badge
                                  count={cartItems && cartItems.length}
                                  showZero
                                  size="default"
                                >
                                  <ShoppingCartOutlined
                                    style={{
                                      color: '#5a5a5a',
                                      fontSize: '32px',
                                    }}
                                  />
                                </Badge>
                              </NavLink>
                            </Space>
                          </Row>
                        )}
                      </NavDropdown>
                    </Row>
                  </Col>
                </Row>
              </Navcontainer>
            </Navigation>
            <Divider style={{ marginBottom: 0 }} />
            <Navigation>
              <Navcontainer>
                <Row
                  justify="space-between"
                  align="middle"
                  style={{ width: '100%' }}
                >
                  <Col span={24} style={{ height: '100%', padding: '7px' }}>
                    <Row align="middle" justify="start">
                      <Col xs={24}></Col>
                      <Col style={{ padding: '10px 0px' }}>
                        <NavigationLink />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Navcontainer>
            </Navigation>
          </>
        ) : (
          <React.Fragment>
            <Row
              justify="space-between"
              align="middle"
              style={{ padding: '0em 1em', width: '100%', height: '60px' }}
            >
              <Col xs={8}>
                <NavLogo>
                  <NavLink to="/">
                    <img src={Logo} height="40" width="100%" alt="" />
                  </NavLink>
                </NavLogo>
              </Col>

              <Col xs={12}>
                <Search
                  placeholder="Search..."
                  className={`search-input search-visible search-button`}
                  size="large"
                  style={{ width: '100%' }}
                  value={searchKeyword}
                  onKeyDown={handleSubmit}
                  enterButton
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </Col>

              <MobileNav>
                <Col xs={4}>
                  <RiMenu3Fill
                    style={{ fontSize: '1.2em' }}
                    onClick={showDrawer}
                  />
                </Col>

                <Drawer
                  className="mobile"
                  placement="right"
                  closable={true}
                  onClose={hideDrawer}
                  visible={mobileDrawer}
                  width={300}
                >
                  <Row style={{ marginTop: '30px' }}>
                    {userInfo ? (
                      <>
                        <Col
                          xs={24}
                          style={{
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '17px',
                            color: '#fff',
                          }}
                        >
                          <Avatar
                            size={55}
                            src={
                              userInfo.user ? userInfo.user.avatar_url : null
                            }
                            icon={<UserOutlined />}
                            style={{ marginRight: '0.4rem' }}
                          />
                          {userInfo.user.first_name}
                        </Col>
                        <Col xs={24}>
                          <Row
                            style={{
                              padding: '25px 0px',
                              color: 'white',
                              width: '100%',
                            }}
                            gutter={[8, 8]}
                            align="middle"
                            onClick={() => logOut()}
                          >
                            <Col>
                              <LogoutOutlined />
                            </Col>
                            <Col>
                              <span>Log Out</span>
                            </Col>
                          </Row>
                        </Col>

                        <UserLink />
                      </>
                    ) : (
                      <>
                        <NavLink
                          to="/login"
                          style={{ color: '#fff', fontSize: '1.1em' }}
                        >
                          <UserOutlined
                            style={{
                              border: '2px solid white',
                              borderRadius: '50%',
                            }}
                          />{' '}
                          Login/Sign up
                        </NavLink>
                      </>
                    )}
                  </Row>
                  {/* <NavList>
                    <NavLink to="/cart" className="navbar-navlist">
                      Cart
                      <Badge
                        count={cartItemsCount && cartItemsCount.length}
                        showZero
                        size="small"
                        style={{ marginLeft: '10px' }}
                      />
                    </NavLink>
                  </NavList> */}

                  <NavigationLink />
                </Drawer>
              </MobileNav>
            </Row>
          </React.Fragment>
        )}
        {redirectUser()}
      </FixedTop>
    </React.Fragment>
  );
};
export default withRouter(Navbar);
