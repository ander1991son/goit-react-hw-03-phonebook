import React from 'react';
import css from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({ image }) => {
  return (
    <li key={image.id} className={css.galleryItem}>
      <img src={image} alt="" />
    </li>
  );
};
