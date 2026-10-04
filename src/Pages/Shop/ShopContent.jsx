import {
  Button,
  Col,
  Drawer,
  InputNumber,
  Pagination,
  Radio,
  Rate,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { Container } from "../../StyleGlobal/container";
import ShopProductCard from "./ShopProductCard";
import "./style/style.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getShopFilteredProductsAction,
  getSubCategories,
} from "../../actions/productActions";

import { FilterOutlined } from "@ant-design/icons";

function ShopContent() {
  const [page, setPage] = useState(1);
  const { Text, Paragraph, Title } = Typography;
  const { Option } = Select;
  const dispatch = useDispatch();
  const shopProducts = useSelector((state) => state.shopProducts.shopProducts);
  const categories = useSelector((state) => state.category.categories);
  const subCategories = useSelector((state) => state.subCategory.subCategories);

  const [filter, setFilter] = useState({});

  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [windowWidth, setWindowWidth] = useState("");

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", updateWindowSize);
    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);

  const updateWindowSize = () => {
    setWindowWidth(window.innerWidth);
  };

  const showDrawer = () => {
    setMobileDrawer(!mobileDrawer);
  };

  const hideDrawer = () => {
    setMobileDrawer(false);
  };

  useEffect(() => {
    dispatch(getShopFilteredProductsAction(filter, page));
  }, [dispatch, filter, page]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSubCategories());
  }, [dispatch]);

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

  const onChangeMinPrice = (value) => {
    setFilter({ ...filter, sale_price_min: value });
  };

  const onChangeMaxPrice = (value) => {
    setFilter({ ...filter, sale_price_max: value });
  };
  const onChangeCategory = (value) => {
    setFilter({
      ...filter,
      category_slug: value,
    });
  };

  const onChangeSubCategory = (value) => {
    setFilter({
      ...filter,
      subCategory_slug: value,
    });
  };

  const onChangeRating = (e) => {
    setFilter({ ...filter, rating: e.target.value });
  };

  console.log("cat", categories);
  console.log(subCategories);

  return (
    <Container>
      <Row style={{ width: "100%" }} gutter={[32, 0]}>
        {windowWidth > 991 ? (
          <Col
            xs={24}
            md={8}
            style={{ backgroundColor: "#fff" }}
            align="middle"
          >
            <Col
              style={{
                position: "sticky",
                top: "160px",
                height: "calc(100vh - 180px)",
                overflow: "auto",
              }}
            >
              <>
                <Paragraph>
                  <Text strong>Price</Text>
                </Paragraph>
                <Space size="middle">
                  <InputNumber
                    min={0}
                    value={filter.sale_price_min}
                    onChange={onChangeMinPrice}
                  />
                  <Text>to</Text>
                  <InputNumber
                    min={0}
                    value={filter.sale_price_max}
                    onChange={onChangeMaxPrice}
                  />
                </Space>
                <Paragraph style={{ marginTop: "15px" }}>
                  <Text strong>Category</Text>
                </Paragraph>
                <Select
                  onChange={onChangeCategory}
                  showSearch
                  style={{ width: "200px" }}
                  placeholder="Select a Category"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {categories !== undefined &&
                    categories.length > 0 &&
                    categories.map((category) => (
                      <Option value={category.slug} key={category.id}>
                        {category.name}
                      </Option>
                    ))}
                </Select>
                <Paragraph style={{ marginTop: "15px" }}>
                  <Text strong>Sub Category</Text>
                </Paragraph>
                <Select
                  onChange={onChangeSubCategory}
                  showSearch
                  style={{ width: "200px" }}
                  placeholder="Select a Sub Category"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {subCategories !== undefined &&
                    subCategories.length > 0 &&
                    subCategories.map((subCategory) =>
                      filter.category_slug !== undefined &&
                        subCategory.pcat_slug !== undefined &&
                        filter.category_slug.toLowerCase() ===
                        subCategory.pcat_slug.toLowerCase() ? (
                        <Option value={subCategory.slug} key={subCategory.id}>
                          {subCategory.name}
                        </Option>
                      ) : null
                    )}
                </Select>
                <Paragraph style={{ marginTop: "15px" }}>
                  <Text strong>Rating</Text>
                </Paragraph>

                <Radio.Group
                  style={{ width: "200px" }}
                  onChange={onChangeRating}
                  defaultValue={0}
                  value={filter.rating}
                >
                  <Space size="small" direction="vertical">
                    <Radio value="5">
                      <Rate
                        disabled
                        defaultValue={5}
                        style={{ color: "#FE6D04" }}
                      />
                    </Radio>
                    <Radio value="4">
                      <Rate
                        disabled
                        defaultValue={4}
                        style={{ color: "#FE6D04" }}
                      />
                    </Radio>
                    <Radio value="3">
                      <Rate
                        disabled
                        defaultValue={3}
                        style={{ color: "#FE6D04" }}
                      />
                    </Radio>
                    <Radio value="2">
                      <Rate
                        disabled
                        defaultValue={2}
                        style={{ color: "#FE6D04" }}
                      />
                    </Radio>
                    <Radio value="1">
                      <Rate
                        disabled
                        defaultValue={1}
                        style={{ color: "#FE6D04" }}
                      />
                    </Radio>
                    <Radio value="0">
                      <Rate
                        disabled
                        defaultValue={0}
                        style={{ color: "#FE6D04" }}
                      />
                    </Radio>
                  </Space>
                </Radio.Group>
              </>
            </Col>
          </Col>
        ) : (
          <>
            <Drawer
              placement="left"
              closable={true}
              onClose={hideDrawer}
              visible={mobileDrawer}
              width={300}
            >
              <Col xs={24} xl={6}>
                <>
                  <Paragraph>
                    <Text strong>Price</Text>
                  </Paragraph>
                  <Space size="middle">
                    <InputNumber
                      min={0}
                      value={filter.sale_price_min}
                      onChange={onChangeMinPrice}
                    />
                    <Text>to</Text>
                    <InputNumber
                      min={0}
                      value={filter.sale_price_max}
                      onChange={onChangeMaxPrice}
                    />
                  </Space>
                  <Paragraph style={{ marginTop: "15px" }}>
                    <Text strong>Category</Text>
                  </Paragraph>
                  <Select
                    onChange={onChangeCategory}
                    showSearch
                    style={{ width: "200px" }}
                    placeholder="Select a Category"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {categories !== undefined &&
                      categories.length > 0 &&
                      categories.map((category) => (
                        <Option value={category.slug} key={category.id}>
                          {category.name}
                        </Option>
                      ))}
                  </Select>
                  <Paragraph style={{ marginTop: "15px" }}>
                    <Text strong>Sub Category</Text>
                  </Paragraph>
                  <Select
                    onChange={onChangeSubCategory}
                    showSearch
                    style={{ width: "200px" }}
                    placeholder="Select a Sub Category"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {subCategories !== undefined &&
                      subCategories.length > 0 &&
                      subCategories.map((subCategory) =>
                        filter.category_slug !== undefined &&
                          filter.category_slug.toLowerCase() ===
                          subCategory.pcat_slug.toLowerCase() ? (
                          <Option value={subCategory.slug} key={subCategory.id}>
                            {subCategory.name}
                          </Option>
                        ) : null
                      )}
                  </Select>
                  <Paragraph style={{ marginTop: "15px" }}>
                    <Text strong>Rating</Text>
                  </Paragraph>

                  <Radio.Group
                    style={{ width: "200px" }}
                    onChange={onChangeRating}
                    defaultValue={0}
                    value={filter.rating}
                  >
                    <Space size="small" direction="vertical">
                      <Radio value="5">
                        <Rate
                          disabled
                          defaultValue={5}
                          style={{ color: "#FE6D04" }}
                        />
                      </Radio>
                      <Radio value="4">
                        <Rate
                          disabled
                          defaultValue={4}
                          style={{ color: "#FE6D04" }}
                        />
                      </Radio>
                      <Radio value="3">
                        <Rate
                          disabled
                          defaultValue={3}
                          style={{ color: "#FE6D04" }}
                        />
                      </Radio>
                      <Radio value="2">
                        <Rate
                          disabled
                          defaultValue={2}
                          style={{ color: "#FE6D04" }}
                        />
                      </Radio>
                      <Radio value="1">
                        <Rate
                          disabled
                          defaultValue={1}
                          style={{ color: "#FE6D04" }}
                        />
                      </Radio>
                      <Radio value="0">
                        <Rate
                          disabled
                          defaultValue={0}
                          style={{ color: "#FE6D04" }}
                        />
                      </Radio>
                    </Space>
                  </Radio.Group>
                </>
              </Col>
            </Drawer>
          </>
        )}

        <Col xs={24} md={16}>
          <Row
            style={{ width: "100%", marginTop: "10px" }}
            justify="space-between"
          >
            <Col xs={24} style={{ marginLeft: "10px" }}>
              <Title level={3} style={{ color: "#707b8e" }}>
                Shop
              </Title>
              {windowWidth < 991 ? (
                <Button
                  style={{
                    backgroundColor: "#FE6D04",
                    color: "#fff",
                    borderRadius: "4px",
                  }}
                  onClick={showDrawer}
                >
                  <FilterOutlined /> Filter
                </Button>
              ) : null}
            </Col>
            {/* <Col
              xs={12}
              xl={12}
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Space>
                <Select defaultValue="Sort by Price" style={{ width: 180 }}>
                  <Option value="Sort by Price">Sort by Price</Option>
                  <Option value="Sort Alphabetically">
                    Sort Alphabetically
                  </Option>
                </Select>
              </Space>
            </Col> */}
          </Row>
          <Row
            style={{
              width: "100%",
              marginTop: "10px",
              marginLeft: "16px",
              marginRight: "16px",
            }}
            gutter={[
              { xs: 0, lg: 8 },
              { xs: 8, lg: 8 },
            ]}
          >
            {shopProducts &&
              shopProducts.results &&
              shopProducts.results.length > 0 &&
              shopProducts.results.map((product) => (
                <Col xs={24} sm={12} xl={8} key={product.id}>
                  <ShopProductCard product={product} />
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
                total={shopProducts && shopProducts.count}
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
export default ShopContent;
