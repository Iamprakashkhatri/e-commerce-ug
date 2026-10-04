import { Col, Pagination, Row, Typography, Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import { Container } from "../../StyleGlobal/container";
import ViewAllCards from "./ViewAllCards";
import { useDispatch, useSelector } from "react-redux";
import { HomeFilled, RightOutlined } from "@ant-design/icons";
import { getMoreProducts } from "../../actions/productActions.js";

import { useParams } from "react-router";
import { Link } from "react-router-dom";

function ViewAllContent() {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const [sort] = useState("");
  const [page, setPage] = useState(1);

  const { slug } = useParams();

  const viewMoreProducts = useSelector(
    (state) => state.moreProducts.moreProducts
  );
  // const { products } = viewMoreProducts;

  // const viewallproducts = products.filter((product) =>
  //   product.cat_id.includes(id)
  // );
  const category = slug.split("-");
  const category1 = category.join("  ");

  useEffect(() => {
    dispatch(getMoreProducts(sort, page, slug));
  }, [dispatch, sort, page]);

  return (
    <Container>
      <Row style={{ width: "100%", padding: "15px 0px" }}>
        <Col xs={24}>
          <Breadcrumb
            style={{
              fontWeight: "400",
              fontSize: "14px",
              color: "#2d3748",
            }}
          >
            <Breadcrumb.Item>
              <Link to="/">
                <HomeFilled style={{ fontSize: "20px" }} />
              </Link>
              <RightOutlined /> {category1.toUpperCase()}{" "}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col xs={24}>
          <Title
            align="center"
            level={3}
            style={{
              color: "#707b8e",
              fontWeight: "700",
              fontSize: "18px",
              lineHeight: "22px",
              marginBottom: "1.5em",
              marginTop: "1.5em",
            }}
          >
            {/* {console.log("pagination data check", viewallproducts.length)} */}
            {console.log("my slug check", slug)}
            {console.log("more products data !!!", viewMoreProducts)}
            {/* {console.log(
              "view more data check !!!",
              Object.values(viewallproducts)[0].cat_name
            )}
            {Object.values(viewallproducts)[0].cat_name} */}
            {category1.toUpperCase()}
          </Title>
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col xs={24}>
          <Row
            style={{
              width: "100%",
            }}
            gutter={[{ xs: 0, md: 8 }, 8]}
          >
            {viewMoreProducts &&
              viewMoreProducts.results &&
              viewMoreProducts.results.length > 0 &&
              viewMoreProducts.results.map((product) => (
                <Col xs={12} md={8} lg={8} xl={6} key={product.slug}>
                  {console.log("what gone on here check check", product)}
                  <ViewAllCards product={product} />
                </Col>
              ))}
          </Row>
          <Row
            style={{
              width: "100%",
              padding: "20px 0px",
            }}
          >
            <Col xs={24} xm={24} md={24} lg={24} xl={24} align="middle">
              <Pagination
                current={page}
                total={viewMoreProducts && viewMoreProducts.count}
                size={10}
                onChange={(val) => {
                  setPage(val);
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
export default ViewAllContent;
