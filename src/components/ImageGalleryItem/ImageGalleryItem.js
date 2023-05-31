import React, { Component } from "react";
import PropTypes from "prop-types";

import css from "./ImageGalleryItem.module.css";

class ImageGalleryItem extends Component {
  static propTypes = {
    onItemClick: PropTypes.func.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  };

  modalContent = (largeImageURL) => {
    this.props.onItemClick(largeImageURL);
  };

  render() {
    const { webformatURL, largeImageURL } = this.props;
    return (
      <img
        src={webformatURL}
        alt=""
        className={css.ImageGalleryItemImage}
        onClick={() => this.modalContent(largeImageURL)}
      />
    );
  }
}

export default ImageGalleryItem;