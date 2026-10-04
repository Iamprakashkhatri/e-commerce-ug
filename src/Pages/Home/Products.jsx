import React, { useState, useEffect } from 'react';
import { Col, Row, Typography, Button, Empty } from 'antd';
import { useSelector } from 'react-redux';
import HomeProductcard from './HomeProductcard';
import CustomCarousel from '../../components/Carousel/CustomCarousel';
import { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

const { Text } = Typography;

const Products = () => {
  const [windowWidth, setWindowWidth] = useState('');

  const breakpoint = useBreakpoint();
  const num = breakpoint.xxl ? 6 : breakpoint.xl ? 4 : breakpoint.md ? 3 : 2;

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', updateWindowSize);
  }, []);

  const updateWindowSize = () => {
    setWindowWidth(window.innerWidth);
  };

  const products = useSelector((state) => state.product.products);
  const categories = useSelector((state) => state.category.categories);
  const { category } = categories;

  products !== undefined &&
    products.sort((a, b) => {
      return b.discount - a.discount;
    });

  const showMoreButton = (allProducts, categoryName, slug) => {
    const products = allProducts.filter((product) =>
      product.cat_name.includes(categoryName)
    );

    const length = products.length;

    if (length > 0) {
      return (
        <NavLink to={`/category/${slug}`}>
          <Button
            style={{
              backgroundColor: '#FE6D04',
              borderColor: '#FE6D04',
              borderRadius: '2px',
              color: '#f2f2f2',
              marginRight: '35px',
              marginTop: '25px',
            }}
            size={breakpoint.lg || breakpoint.md ? 'large' : 'small'}
          >
            Show More
          </Button>
        </NavLink>
      );
    } else {
      return null;
    }
  };

  const display = (allProducts, categoryName, slice) => {
    let slicedProducts = Array();
    const products = allProducts.filter((product) =>
      product.cat_name.includes(categoryName)
    );

    const length = products.length;
    var count = 0;

    while (count < length) {
      var sliced = products.slice(count, count + slice);
      slicedProducts.push(sliced);
      count += slice;
    }
    return slicedProducts.length > 0 ? (
      <CustomCarousel>
        {slicedProducts.map((products, index) => (
          <div key={index}>
            <Row
              style={{ width: '100%', marginTop: '1em' }}
              key={'pro' + index}
              gutter={[8, 8]}
            >
              {products.map((product) => (
                <Col xs={12} md={8} lg={8} xl={6} xxl={4} key={product.id}>
                  <HomeProductcard
                    id={product.id}
                    slug={product.slug}
                    name={product.name}
                    label={product.label}
                    label_name={product.label_name}
                    price={product.sale_price}
                    discount={product.discount}
                    rating={product.rating}
                    images={
                      product.images !== null &&
                      product.images.length > 0 &&
                      product.images[0].image
                    }
                    images_placeholder={
                      product.images !== null &&
                      product.images.length > 0 &&
                      product.images[0].image_placeholder
                    }
                  />
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </CustomCarousel>
    ) : (
      <Empty
        description="No products here yet."
        style={{ marginTop: '25px', marginBottom: '25px' }}
      />
    );
  };

  return (
    <>
      <Row
        justify="left"
        style={{ width: '100%', marginTop: '1em', marginBottom: '1em' }}
      >
        {categories !== undefined &&
          categories.length > 0 &&
          categories.map((category) => (
            <Fragment key={category.id}>
              <Col xs={24} xl={24}>
                <div
                  style={{
                    justifyContent: 'space-between',
                    display: 'flex',
                  }}
                >
                  <Text className="titleOnSale">
                    <span
                      style={{
                        fontSize:
                          breakpoint.md || breakpoint.lg ? '24px' : '17px',
                      }}
                    >
                      {' '}
                      {category.name}
                    </span>
                    {console.log('check data category slug', category.slug)}
                  </Text>
                  {showMoreButton(products, category.name, category.slug)}
                </div>
              </Col>
              <Row
                justify="center"
                style={{
                  width: '100%',
                  position: 'relative',
                }}
              >
                <Row style={{ width: '100%' }} gutter={[16, 16]}>
                  <CustomCarousel>
                    {display(products, category.name, num)}
                  </CustomCarousel>
                </Row>
              </Row>
            </Fragment>
          ))}
      </Row>
    </>
  );
};

export default Products;
