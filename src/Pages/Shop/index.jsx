import { Layout } from "antd";
import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ShopContent from "./ShopContent";
import { Shop } from "./style/Shop";

function Index() {
  const { Content } = Layout;
  return (
    <Layout className="shop">
      <Navbar />
      <Content style={{ backgroundColor: "white" }}>
        <Shop>
          <ShopContent />
        </Shop>
      </Content>
      <Footer />
    </Layout>
  );
}
export default Index;
