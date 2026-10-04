import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import ProgressiveImage from 'react-progressive-graceful-image';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { AnimatePresence, motion } from 'framer-motion';
const ImageCarousel = () => {
  const sliderImages = useSelector((state) => state.sliderImages.sliderImages);

  console.log({ sliderImages });

  const breakpoint = useBreakpoint();

  const [sliderIndex, setSliderIndex] = useState(0);

  const variants = {
    enter: () => {
      return {
        // x: direction > 0 ? 1000 : -1000,
        
        opacity: 0,
      };
    },
    center: {
      opacity: 1,
      scale: 1,
    },
    exit: () => {
      return {
        // x: direction < 0 ? 1000 : -1000,
       
        opacity: 0,
      };
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderImages !== undefined && sliderImages.length > 0) {
        setSliderIndex((index) =>
          index === sliderImages.length - 1 ? (index = 0) : index + 1
        );
      }
    }, 4500);
    return () => {
      clearInterval(interval);
    };
  }, [sliderImages]);

  // const RightArrow = () => {
  //   return <Button icon={<RightOutlined />} size="middle" />;
  // };

  // const LeftArrow = () => {
  //   return <Button icon={<LeftOutlined />} size="middle" />;
  // };
  // const slideshow = {
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   draggable: true,
  //   autoplay: true,
  //   dots: false,
  //   nav: false,
  //   responsive: [
  //     {
  //       breakpoint: 991,
  //       settings: {
  //         slidesToShow: 1,
  //         initialSlide: 1,
  //       },
  //     },
  //   ],
  // };

  return (
    <Row
      justify="center"
      style={{ position: 'relative', height: '100%' }}
      align="middle"
    >
      {/* <Carousel effect="fade" className="bg-render" {...slideshow}>
        {sliderImages !== undefined &&
          sliderImages.length > 0 &&
          sliderImages.map((item) => (
            <a href={item.link} key={item.id}>
              <Col>
                <ProgressiveImage
                  src={item.slider_image}
                  placeholder={item.slider_image_placeholder}
                >
                  {(src) => (
                    <img
                      style={{
                        width: "100%",
                      }}
                      src={src}
                      alt="sliderImage"
                    />
                  )}
                </ProgressiveImage>
              </Col>
            </a>
          ))}
      </Carousel> */}
      <div
        style={{
          width: '100%',
          position: 'relative',
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
        }}
      >
        {sliderImages !== undefined && sliderImages.length > 0 && (
          <Col key={sliderIndex}>
            <div>
              <Row
                justify="center"
                style={{
                  width: '100%',
                  // height:
                  //   breakpoint.lg || breakpoint.md ? '62vh' : '45vh',
                }}
              >
                <Col style={{ width: '100%' }}>
                  <a href={sliderImages[sliderIndex].link}>
                    <ProgressiveImage
                      src={sliderImages[sliderIndex].slider_image}
                      placeholder={
                        sliderImages[sliderIndex].slider_image_placeholder
                      }
                    >
                      {(src) => (
                        <motion.img
                          key={sliderIndex}
                          src={src}
                          variants={variants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{
                            opacity: { duration: 1 },
                          }}
                          alt="slider_image"
                          style={{
                            objectPosition: 'cover',
                            filter: 'blur(5px) brightness(0.75)',
                            height:
                              breakpoint.lg || breakpoint.md ? '70vh' : '40vh',
                            width: '100%',
                            // height: '100%',
                          }}
                        />
                      )}
                    </ProgressiveImage>
                  </a>
                </Col>
              </Row>
            </div>
          </Col>
        )}
      </div>
      <Col style={{ height: '100%', position: 'absolute' }}>
        <Row
          justify="center"
          align="middle"
          style={{ height: '100%', width: '100%' }}
        >
          <div
            style={{
              height: breakpoint.lg || breakpoint.md ? '60vh' : '35vh',
              width: breakpoint.lg || breakpoint.md ? '75vw' : '85vw',
              top: 0,
              bottom: 0,
              borderRadius: '8px',
              boxShadow:
                'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
            }}
          >
            <AnimatePresence>
              {sliderImages !== undefined && sliderImages.length > 0 && (
                <motion.img
                  key={sliderIndex}
                  src={sliderImages[sliderIndex].slider_image}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    // scale: {
                    //   type: 'spring',
                    //   stiffness: 300,
                    //   damping: 30,
                    // },
                    opacity: { duration: 1 },
                  }}
                  alt="banner_image"
                  style={{
                    height: breakpoint.lg || breakpoint.md ? '60vh' : '35vh',
                    width: '100%',
                    borderRadius: '8px',
                    boxShadow:
                      'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
                    objectFit: 'cover',
                    objectPosition: '50% 50%',
                    position: 'absolute',
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        </Row>
      </Col>
    </Row>
  );
};

export default ImageCarousel;
