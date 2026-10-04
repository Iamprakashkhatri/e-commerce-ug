import React, { Component } from 'react';
import { Carousel } from 'antd';

const carouselsettings = {
  slidesToShow: 1,
  autoplay: true,
  dots: false,
  effect: 'fade',
  slidesToScroll: 1,
  draggable: true,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        initialSlide: 2,
      },
    },
  ],
};

export default class CustomCarousel extends Component {
  render() {
    return (
      <Carousel {...carouselsettings} autoplaySpeed={7000}>
        {this.props.children}
      </Carousel>
    );
  }
}
