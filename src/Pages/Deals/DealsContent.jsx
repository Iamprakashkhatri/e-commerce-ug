import { Col, Pagination, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Container } from "../../StyleGlobal/container";
import DealsCard from "./DealsCard";
import "./style/style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getDeals } from "../../actions/productActions";

function DealsContent() {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const [sort] = useState("");
  const [page, setPage] = useState(1);
  // const { Option } = Select;

  const dealsMain = useSelector((state) => state.deals);

  const { deals } = dealsMain;

  useEffect(() => {
    dispatch(getDeals(sort, page));
  }, [dispatch, sort, page]);

  // const itemRender = (current, type, originalElement) => {
  //   if (type === "prev") {
  //     return (
  //       <Button style={{ width: "100px", backgroundColor: "white" }}>
  //         <Text strong style={{ color: "black" }}>
  //           Previous
  //         </Text>
  //       </Button>
  //     );
  //   }
  //   if (type === "next") {
  //     return (
  //       <Button style={{ width: "100px", backgroundColor: "white" }}>
  //         <Text strong style={{ color: "black" }}>
  //           Next
  //         </Text>
  //       </Button>
  //     );
  //   }
  //   return originalElement;
  // };

  return (
    <Container>
      <Row style={{ width: "100%", padding: "15px 0px" }}>
        <Col xs={12} align="start">
          <Title level={3} style={{ color: "#707b8e" }}>
            Deals
          </Title>
        </Col>
        {/* <Col xs={12} align="end">
          <Space>
            <Select
              onChange={(val) => setSort(val)}
              defaultValue="Sort by Price"
              style={{ width: 180 }}
            >
              <Option value="Sort by Price">Sort by Price</Option>
              <Option value="Sort Alphabetically">Sort Alphabetically</Option>
            </Select>
          </Space>
        </Col> */}
      </Row>
      <Row style={{ width: "100%" }}>
        <Col xs={24}>
          <Row
            style={{
              width: "100%",
            }}
            gutter={[{ xs: 0, md: 8 }, 8]}
          >
            {deals &&
              deals.results &&
              deals.results.length > 0 &&
              deals.results.map((product) => (
                <Col xs={24} md={8} xl={6} key={product.slug}>
                  <DealsCard product={product} />
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
                total={deals && deals.count}
                size={12}
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
export default DealsContent;
