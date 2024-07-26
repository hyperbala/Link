import React from 'react'
import Image from 'next/image';

const ImageItem = ({image}) => {
    return (
        <div className='flex-col'>
            <div className='w-4/6 mb-6 mx-auto'>
                <Image
                    src={image.url}
                    alt={''}
                    width={4}
                    height={1}
                    className=""
                />
            </div>
            <p className='text-gray-800 text-xl mt-10'>{image.captionHeading}</p>
            <p className='text-gray-500 text-sm mb-6 py-2'>{image.caption}</p>
        </div>
    )
}

export default ImageItem
