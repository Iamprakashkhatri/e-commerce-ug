import React, { useState } from "react";
import { Layout, Row } from "antd";
import AdminHeader from "./AdminHeader";
import AdminSider from "./AdminSider";
import "./styles/admin.scss";

const { Header, Sider, Content } = Layout;

function Admin(props) {
  const [collapseSider, setCollapseSider] = useState(false);

  return (
    <>
      <Layout className="admin">
        <Header className="admin-header">
          <AdminHeader
            setCollapseSider={setCollapseSider}
            collapseSider={collapseSider}
          />
        </Header>
        <Layout>
          <Sider
            width={210}
            collapsed={collapseSider}
            trigger={null}
            breakpoint="lg"
            collapsedWidth="0"
            className="admin-sider"
            onBreakpoint={(broken) => {
              setCollapseSider(broken);
            }}
          >
            <AdminSider />
          </Sider>
          <Content className="">
            <Row>{props.children}</Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Admin;
