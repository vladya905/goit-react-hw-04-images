import React, { Component } from "react";

import SearchBar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Spinner from "../Loader/Loader";

import fetchPictures from "../../Fetch/FetchPictures.js";

import "./App.css";

class App extends Component {
  state = {
    modalContent: "",
    searchQuery: "",
    page: 1,
    totalImages: 0,
    visibleImages: [],
    isLoading: false,
    openModal: false,
  };


    componentDidUpdate(prevProps, { searchQuery, page }) {
    if (searchQuery !== this.state.searchQuery || page !== this.state.page) {
      this.getData();
    }
    this.handleScroll();
  }


    getData = () => {
    const { searchQuery, page } = this.state;
      this.toggleLoading();
    
    fetchPictures(searchQuery, page)
      .then(({ hits, total }) => {
        
        this.setState(({ visibleImages }) => {
          return { visibleImages: [...visibleImages, ...hits],  totalImages: total };
        });
      })
      .catch((error) => error.message)
      .finally(this.toggleLoading);
  };


  hadleChangeQuery = (query) => {
    this.setState({
      searchQuery: query,
      page: 1,
      visibleImages: [],
    });
  };


   toggleLoading = () => {
    this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
  };


    toggleModal = () => {
    this.setState(({ openModal }) => ({ openModal: !openModal }));
  };


  modalContentSet = (largeImageURL) => {
  this.setState({ modalContent: largeImageURL });
};

  handleNextPage = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };


    handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };


render() {
    const { visibleImages, openModal, modalContent, isLoading, totalImages } =
    this.state;
    const isNotLastPage = visibleImages.length !== totalImages;
    const btnEnable = visibleImages.length > 0 && !isLoading && isNotLastPage;
    return (
      <div className="App">
        <SearchBar onSubmit={this.hadleChangeQuery} />
        {visibleImages.length === 0 ? (
          <h2>Enter your request</h2>
        ) : (
          <>
            <ImageGallery
              images={visibleImages}
              onClick={this.toggleModal}
              onItemClick={this.modalContentSet}
            />

            {openModal && (
              <Modal content={modalContent} onCloseModal={this.toggleModal} />
            )}
            {isLoading && <Spinner />}

            {btnEnable && (
              <Button name="Load more" onPress={this.handleNextPage} />
            )}
          </>
        )}
        
      </div>
    );
  }

}

export default App;