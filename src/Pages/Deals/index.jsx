import { Layout } from "antd";
import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import DealsContent from "./DealsContent";
import { Deals } from "./style/Deals";
import "./style/style.scss";

function Index() {
  return (
    <Layout className="deals" style={{ backgroundColor: "#fff" }}>
      <Navbar />
      <Deals>
        <DealsContent />
      </Deals>
      <Footer />
    </Layout>
  );
}
export default Index;
