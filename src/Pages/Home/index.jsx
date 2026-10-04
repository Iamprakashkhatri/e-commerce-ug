import { Layout } from "antd";
import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import HomeContent from "./HomeContent";

function Index() {
  return (
    <Layout className="home">
      <Navbar />
      <HomeContent />
      <Footer />
    </Layout>
  );
}
export default Index;
