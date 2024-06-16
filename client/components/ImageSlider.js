import React, { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
const ImageSlider = ({ images }) => {
  return (
    <div className="flex mt-16 sm:mt-0 w-1 max-w-1">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        // interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {images.map((image) => (
          <div className='flex-col'>
            <div className='w-4/6 mb-6 mx-auto'>

              <Image
                src={image.url}
                alt={''}
                width={4}
                height={1}
                className=""
                key={image.captions}
              />
            </div>
            <p className='text-gray-800 text-xl mt-10'>{image.captionHeading}</p>
            <p className='text-gray-500 text-sm mb-6 py-2'>{image.caption}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
