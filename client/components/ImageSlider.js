import React, { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ImageItem from './ImageItem';
const ImageSlider = ({ images }) => {
  return (
    <div className="flex mt-16 sm:mt-0 w-1 max-w-1">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showArrows={false}
        showStatus={false}
      >
        {images.map((image) => (
          <ImageItem image={image} key={image.url}/>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
