import { Col, Divider, Pagination, Row, Typography, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getCategories,
  getProducts,
  getSubCategories,
} from "../../actions/productActions";
import { Container } from "../../StyleGlobal/container";
import HomeProductcard from "../Home/HomeProductcard";
import "./css/style.scss";

const { Option } = Select;

function SearchContent(props) {
  const { Title } = Typography;
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const { subCategories } = useSelector((state) => state.subCategory);

  const [searchFilter, setSearchFilter] = useState({
    categoryField: "",
    subCategoryField: "",
  });

  console.log(searchFilter.categoryField, searchFilter.subCategoryField);

  const { searchKeyword } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getProducts(searchKeyword, searchFilter));
  }, [searchKeyword, searchFilter, dispatch]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubCategories());
  }, [dispatch]);

  useEffect(() => {
    setSearchResults(products);
  }, [products]);

  // const itemRender = (current, type, originalElement) => {
  //   if (type === "prev") {
  //     return (
  //       <Button style={{ width: "100px", backgroundColor: "#bfbfbf" }}>
  //         <Text strong style={{ color: "white" }}>
  //           Previous
  //         </Text>
  //       </Button>
  //     );
  //   }
  //   if (type === "next") {
  //     return (
  //       <Button style={{ width: "100px", backgroundColor: "#bfbfbf" }}>
  //         <Text strong style={{ color: "white" }}>
  //           Next
  //         </Text>
  //       </Button>
  //     );
  //   }
  //   return originalElement;
  // };

  return (
    <Container>
      <Row style={{ marginTop: "25px", width: "100%" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Title level={3}>
            {`${searchResults.length} Items found for "${decodeURIComponent(
              searchKeyword
            )}"`}{" "}
          </Title>
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Title level={4}>Filters</Title>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ width: "100%" }}>
        <Col xs={12} sm={12} md={4} lg={4} xl={4}>
          <Select
            placeholder="Categories"
            style={{ width: "100%" }}
            name="categoryField"
            onChange={(value) => {
              setSearchFilter({
                ...searchFilter,
                categoryField: value,
              });
            }}
          >
            {categories &&
              categories.map((item) => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </Col>
        <Col xs={12} sm={12} md={4} lg={4} xl={4}>
          <Select
            placeholder="Sub Categories"
            style={{ width: "100%" }}
            onChange={(value) => {
              setSearchFilter({
                ...searchFilter,
                subCategoryField: value,
              });
            }}
          >
            {subCategories !== undefined &&
              subCategories.length > 0 &&
              subCategories.map((subCategory) =>
                searchFilter.categoryField !== undefined &&
                searchFilter.categoryField &&
                searchFilter.categoryField === subCategory.category ? (
                  <Option value={subCategory.id} key={subCategory.id}>
                    {subCategory.name}
                  </Option>
                ) : null
              )}
          </Select>
        </Col>
      </Row>
      <Divider className="searchpage-divider" />
      <Row gutter={[16, 16]} style={{ width: "100%" }}>
        {/* {searchResults &&
          searchResults.map((item, index) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <ProductCard
                name={item.name}
                price={item.price}
                discount={item.discount}
                image={item.image}
              />
            </Col>
          ))} */}

        {searchResults &&
          searchResults.map((item) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={6} key={item.id}>
              <NavLink to={`/products/${item.slug}`}>
                <HomeProductcard
                  id={item.id}
                  slug={item.slug}
                  name={item.name}
                  label={item.label}
                  label_name={item.label_name}
                  price={item.sale_price}
                  discount={item.discount}
                  rating={item.rating}
                  images={
                    item.images !== null &&
                    item.images.length > 0 &&
                    item.images[0].image
                  }
                  images_placeholder={
                    item.images !== null &&
                    item.images.length > 0 &&
                    item.images[0].image_placeholder
                  }
                />
              </NavLink>
            </Col>
          ))}
      </Row>
      <Row style={{ width: "100%", marginBottom: "20px" }}>
        <Col xs={24} xm={24} md={24} lg={24} xl={24}>
          <Pagination
            current={currentPage}
            onChange={(page) => onChangePage(page)}
            total={searchResults.length}
          />
        </Col>
      </Row>
    </Container>
  );
}
export default SearchContent;
