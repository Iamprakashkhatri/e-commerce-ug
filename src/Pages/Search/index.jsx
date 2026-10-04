import { Layout } from "antd";
import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import SearchContent from "./SearchContent";

function Index() {
  let path = window.location.pathname.split("/");

  return (
    <Layout style={{ background: "#FFF" }}>
      <Navbar />
      <SearchContent searchKeyword={path[2]} />
      <Footer />
    </Layout>
  );
}

export default Index;
