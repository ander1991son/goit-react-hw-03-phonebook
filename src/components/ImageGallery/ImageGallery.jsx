/////refactorizacion a imageGalleryItem
import React from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images }) => {
  return (
    <ul className={css.gallery}>
      {images.map((image, index) => (
        <ImageGalleryItem key={index} image={image.webformatURL} />
      ))}
      {/* {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image.webformatURL}                                da error de key
          onChange={() => onImageClick(image.webformatURL)}
        />
      ))} */}
    </ul>
  );
};

export default ImageGallery;

/////////////////////////  codigo de abajo original

// const ImageGallery = ({ images }) => {
//   return (
//     <ul className="gallery">
//       {images.map(image => (
//         <li key={image.id} className={css.ImageGalleryItem}>
//           <img src={image.webformatURL} alt="" />
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default ImageGallery;
