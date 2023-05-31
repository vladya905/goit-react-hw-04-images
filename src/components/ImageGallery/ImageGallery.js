import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import React from "react";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ onClick, onItemClick, images }) => {

  const handleOpenModal = (event) => {
    if (event.target !== event.currentTarget) {
      onClick();
    }
  };

  return (
    <ul className={css.ImageGallery} onClick={handleOpenModal}>
      {images &&
        images.map((image) => (
          <li key={image.id} className={css.ImageGalleryItem}>
            <ImageGalleryItem {...image} onItemClick={onItemClick} />
          </li>
        ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;