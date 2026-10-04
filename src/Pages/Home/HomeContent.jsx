import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./css/style.scss";
import { Homepage } from "./css/Home";
import { Container } from "../../StyleGlobal/container";

import { getCategories, getProducts } from "../../actions/productActions";
import { getSliderImages } from "../../actions/sliderActions";
import { getFeaturedProduct } from "../../actions/productActions";

import FeaturedProduct from "./FeaturedProduct";
import OnSale from "./OnSale";
import Products from "./Products";
import ImageCarousel from "./ImageCarousel";

import Loading from "../../Utilities/Loading";

function HomeContent() {
  const productLoading = useSelector((state) => state.product.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSliderImages());
    dispatch(getFeaturedProduct());
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      {productLoading ? (
        <Loading />
      ) : (
        <Homepage>
          <div className="homecarousel">
            <ImageCarousel />
          </div>

          {/* <Container>
        <FeaturedProduct />
      </Container> */}

          <Container>
            <OnSale />
          </Container>

          <Container>
            <Products />
          </Container>
        </Homepage>
      )}
    </>
  );
}

export default HomeContent;
