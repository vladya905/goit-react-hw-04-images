import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import React, { Component } from "react";
import css from "./ImageGallery.module.css";

class ImageGallery extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    onItemClick: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  handleOpenModal = (event) => {
    if (event.target !== event.currentTarget) {
      this.props.onClick();
    }
  };

  render() {
    const { images, onItemClick } = this.props;
    return (
      <ul className={css.ImageGallery} onClick={this.handleOpenModal}>
        {images &&
          images.map((image) => (
            <li key={image.id} className={css.ImageGalleryItem}>
              <ImageGalleryItem {...image} onItemClick={onItemClick} />
            </li>
          ))}
      </ul>
    );
  }
}

export default ImageGallery;