import React from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  BookOutlined,
  DatabaseOutlined,
  MessageOutlined,
  TeamOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  PlusSquareOutlined,
  NumberOutlined,
  StarOutlined,
  BulbOutlined,
  GoldOutlined,
  ApartmentOutlined,
  QuestionOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const { SubMenu } = Menu;

function AdminSider() {
  const { userInfo } = useSelector((state) => state.userInfo);

  const checkAccess = (val) => {
    if (userInfo && userInfo.user && userInfo.user.is_superuser) return true;
    else if (
      userInfo &&
      userInfo.user &&
      userInfo.user.role &&
      userInfo.user.role.page_list.includes(val, 0)
    )
      return true;
    else return false;
  };

  return (
    <>
      <Menu
        mode="inline"
        style={{
          textAlign: "start",
          marginTop: "2rem",
        }}
      >
        <Menu.Item
          className="menu-item-container"
          icon={
            <DashboardOutlined
              className="sider-icon"
              style={{
                fontSize: "20px",
                paddingTop: "4px",
              }}
            />
          }
        >
          <NavLink to="/admin">Dashboard</NavLink>
        </Menu.Item>

        {checkAccess("order") ? (
          <Menu.Item
            className="menu-item-container"
            icon={
              <ShoppingCartOutlined
                className="sider-icon"
                style={{
                  fontSize: "20px",
                  paddingTop: "4px",
                }}
              />
            }
          >
            <NavLink to="/admin/order">Order</NavLink>
          </Menu.Item>
        ) : null}

        {checkAccess("product") ? (
          <SubMenu key="product" icon={<BulbOutlined />} title="Product">
            <Menu.Item
              icon={
                <DatabaseOutlined
                  className="sider-icon"
                  style={{
                    // fontSize: "20px",
                    paddingTop: "4px",
                  }}
                />
              }
            >
              <NavLink to="/admin/product">Product Table</NavLink>
            </Menu.Item>
            <Menu.Item
              icon={
                <PlusSquareOutlined
                  className="sider-icon"
                  style={{
                    // fontSize: "20px",
                    paddingTop: "4px",
                  }}
                />
              }
            >
              <NavLink to="/admin/addproduct">Add Product</NavLink>
            </Menu.Item>
            <Menu.Item
              icon={
                <StarOutlined
                  className="sider-icon"
                  style={{
                    // fontSize: "20px",
                    paddingTop: "4px",
                  }}
                />
              }
            >
              <NavLink to="/admin/featuredproduct">Featured Product</NavLink>
            </Menu.Item>
            <SubMenu key="label" icon={<NumberOutlined />} title="Label">
              <Menu.Item
                icon={
                  <DatabaseOutlined
                    className="sider-icon"
                    style={{
                      // fontSize: "20px",
                      paddingTop: "4px",
                    }}
                  />
                }
              >
                <NavLink to="/admin/label">Label Table</NavLink>
              </Menu.Item>
              <Menu.Item
                icon={
                  <PlusSquareOutlined
                    className="sider-icon"
                    style={{
                      // fontSize: "20px",
                      paddingTop: "4px",
                    }}
                  />
                }
              >
                <NavLink to="/admin/addlabel">Add Label</NavLink>
              </Menu.Item>
            </SubMenu>
          </SubMenu>
        ) : null}

        {checkAccess("category") ? (
          <SubMenu key="category" icon={<GoldOutlined />} title="Category">
            <Menu.Item
              icon={
                <DatabaseOutlined
                  className="sider-icon"
                  style={{
                    // fontSize: "20px",
                    paddingTop: "4px",
                  }}
                />
              }
            >
              <NavLink to="/admin/category">Category Table</NavLink>
            </Menu.Item>
            <Menu.Item
              icon={
                <PlusSquareOutlined
                  className="sider-icon"
                  style={{
                    // fontSize: "20px",
                    paddingTop: "4px",
                  }}
                />
              }
            >
              <NavLink to="/admin/addcategory">Add Category</NavLink>
            </Menu.Item>
          </SubMenu>
        ) : null}

        {checkAccess("subcategory") ? (
          <SubMenu
            key="sub_category"
            icon={<ApartmentOutlined />}
            title="Sub Category"
          >
            <Menu.Item
              icon={
                <DatabaseOutlined
                  className="sider-icon"
                  style={{
                    // fontSize: "20px",
                    paddingTop: "4px",
                  }}
                />
              }
            >
              <NavLink to="/admin/subcategory">Sub Category Table</NavLink>
            </Menu.Item>
            <Menu.Item
              icon={
                <PlusSquareOutlined
                  className="sider-icon"
                  style={{
                    // fontSize: "20px",
                    paddingTop: "4px",
                  }}
                />
              }
            >
              <NavLink to="/admin/addsubcategory">Add Sub Category</NavLink>
            </Menu.Item>
          </SubMenu>
        ) : null}

        {userInfo && userInfo.user && userInfo.user.is_superuser ? (
          <SubMenu key="roles" icon={<TeamOutlined />} title="Roles">
            <Menu.Item
              icon={
                <DatabaseOutlined
                  className="sider-icon"
                  style={{
                    // fontSize: "20px",
                    paddingTop: "4px",
                  }}
                />
              }
            >
              <NavLink to="/admin/roles">Roles Table</NavLink>
            </Menu.Item>
            <Menu.Item
              icon={
                <PlusSquareOutlined
                  className="sider-icon"
                  style={{
                    // fontSize: "20px",
                    paddingTop: "4px",
                  }}
                />
              }
            >
              <NavLink to="/admin/create-role">Add Roles</NavLink>
            </Menu.Item>
          </SubMenu>
        ) : null}

        {checkAccess("faq") ? (
          <SubMenu key="faq" icon={<QuestionOutlined />} title="FAQ">
            <Menu.Item
              icon={
                <DatabaseOutlined
                  className="sider-icon"
                  style={{
                    // fontSize: "20px",
                    paddingTop: "4px",
                  }}
                />
              }
            >
              <NavLink to="/admin/faq">FAQ Table</NavLink>
            </Menu.Item>
            <Menu.Item
              icon={
                <PlusSquareOutlined
                  className="sider-icon"
                  style={{
                    // fontSize: "20px",
                    paddingTop: "4px",
                  }}
                />
              }
            >
              <NavLink to="/admin/addfaq">Add FAQ</NavLink>
            </Menu.Item>
          </SubMenu>
        ) : null}
        {checkAccess("sliderImages") ? (
          <SubMenu
            key="slider"
            icon={<FileImageOutlined />}
            title="Slider Images"
          >
            <Menu.Item
              icon={
                <DatabaseOutlined
                  className="sider-icon"
                  style={{
                    paddingTop: "4px",
                  }}
                />
              }
            >
              <NavLink to="/admin/slider">Slider Images Table</NavLink>
            </Menu.Item>
            <Menu.Item
              icon={
                <PlusSquareOutlined
                  className="sider-icon"
                  style={{
                    // fontSize: "20px",
                    paddingTop: "4px",
                  }}
                />
              }
            >
              <NavLink to="/admin/addslider">Add Slider Image</NavLink>
            </Menu.Item>
          </SubMenu>
        ) : null}

        {checkAccess("newsletter") ? (
          <SubMenu key="newsletter" icon={<BookOutlined />} title="Newsletter">
            <Menu.Item
              icon={
                <DatabaseOutlined
                  className="sider-icon"
                  style={{
                    // fontSize: "20px",
                    paddingTop: "4px",
                  }}
                />
              }
            >
              <NavLink to="/admin/newsletter">Newsletter Table</NavLink>
            </Menu.Item>
            <Menu.Item
              icon={
                <PlusSquareOutlined
                  className="sider-icon"
                  style={{
                    // fontSize: "20px",
                    paddingTop: "4px",
                  }}
                />
              }
            >
              <NavLink to="/admin/addnewsletter">Add Newsletter</NavLink>
            </Menu.Item>
          </SubMenu>
        ) : null}

        {checkAccess("user") ? (
          <SubMenu key="users" icon={<UserOutlined />} title="Users">
            <Menu.Item
              icon={
                <UserOutlined
                  className="sider-icon"
                  style={{
                    // fontSize: "20px",
                    paddingTop: "4px",
                  }}
                />
              }
            >
              <NavLink to="/admin/users">Users Table</NavLink>
            </Menu.Item>
          </SubMenu>
        ) : null}

        {checkAccess("userMessages") ? (
          <Menu.Item
            className="menu-item-container"
            icon={
              <MessageOutlined
                className="sider-icon"
                style={{
                  fontSize: "20px",
                  paddingTop: "4px",
                }}
              />
            }
          >
            <NavLink to="/usermessages">User Messages</NavLink>
          </Menu.Item>
        ) : null}
      </Menu>
    </>
  );
}

export default AdminSider;
