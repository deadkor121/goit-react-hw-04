import { useEffect, useState } from "react";
import "./App.css";

import { getImages } from "./services/API";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [cardArr, setCardArr] = useState([]);
  const [loader, setLoader] = useState(false);
  const [moreLoader, setMoreLoader] = useState(false);
  const [error, setError] = useState(false);
  const [valueInput, setValueOnpit] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [showLoreMore, setShowLoreMore] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalValueImg, setModalValueImg] = useState(null);

  useEffect(() => {
    async function dataImages() {
      try {
        setError(false);
        setLoader(true);
        const data = await getImages(valueInput);
        setCardArr(data);
      } catch (error) {
        setShowLoreMore(false);
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    dataImages();
  }, []);

  useEffect(() => {
    if (valueInput.length === 0) {
      setShowLoreMore(false);
      return;
    }
    async function dataImages() {
      try {
        setError(false);
        setMoreLoader(true);
        const data = await getImages(valueInput, pageNumber);
        if (pageNumber > 1) {
          let newArrData = [...cardArr, ...data];
          setCardArr(newArrData);
        } else {
          setCardArr(data);
        }
      } catch (error) {
        setShowLoreMore(false);
        setError(true);
      } finally {
        setLoader(false);
        setMoreLoader(false);
      }
    }
    dataImages();
  }, [valueInput, pageNumber]);

  const onSubmit = (event) => {
    setPageNumber(1);
    setCardArr([]);
    setValueOnpit(event);
    setShowLoreMore(true);
  };

  const onClick = (newpage) => {
    setMoreLoader(true);
    setPageNumber(newpage);
  };

  const openModal = (event) => {
    setModalIsOpen(event.bool);
    setModalValueImg(event);
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {loader && <Loader />}
      {error ? (
        <ErrorMessage />
      ) : (
        <ImageGallery cardImages={cardArr} openModal={openModal} />
      )}
      {moreLoader && <Loader />}
      {showLoreMore && (
        <LoadMoreBtn onClick={onClick} pageNumber={pageNumber} />
      )}
      {modalIsOpen && (
        <ImageModal
          modalIsOpen={modalIsOpen}
          openModal={openModal}
          cardImages={modalValueImg}
        />
      )}
    </>
  );
}

export default App;
