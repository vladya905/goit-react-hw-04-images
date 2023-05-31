import React, { useState, useEffect } from "react";
import SearchBar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Spinner from "../Loader/Loader";
import fetchPictures from "../../Fetch/FetchPictures.js";
import "./App.css";

const App = () => {
  const [modalContent, setModalContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [visibleImages, setVisibleImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const { hits, total } = await fetchPictures(searchQuery, page);
        setVisibleImages((prevImages) => [...prevImages, ...hits]);
        setTotalImages(total);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchQuery, page]);

  const handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleChangeQuery = (query) => {
    setSearchQuery(query);
    setPage(1);
    setVisibleImages([]);
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleModalContent = (largeImageURL) => {
    setModalContent(largeImageURL);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const isNotLastPage = visibleImages.length !== totalImages;
  const btnEnable = visibleImages.length > 0 && !isLoading && isNotLastPage;

  return (
    <div className="App">
      <SearchBar onSubmit={handleChangeQuery} />
      {visibleImages.length === 0 ? (
        <h2>Enter your request</h2>
      ) : (
        <>
          <ImageGallery
            images={visibleImages}
            onClick={toggleModal}
            onItemClick={handleModalContent}
          />
          {openModal && (
            <Modal content={modalContent} onCloseModal={toggleModal} />
          )}
          {isLoading && <Spinner />}
          {btnEnable && (
            <Button name="Load more" onPress={handleNextPage} />
          )}
        </>
      )}
    </div>
  );
};

export default App;