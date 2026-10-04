import React from "react";
import { Layout } from "antd";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ViewAllContent from "./ViewAllContent";

const Index = () => {
  return (
    <Layout className="deals" style={{ backgroundColor: "#fff" }}>
      <Navbar />
      <ViewAllContent />
      <Footer />
    </Layout>
  );
};

export default Index;
