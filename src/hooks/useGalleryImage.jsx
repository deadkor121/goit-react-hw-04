import { useEffect, useState } from "react";

export const useGalleryImage = () => {
  const [cardArr, setCardArr] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalValueImg, setModalValueImg] = useState(null);

  useEffect(() => {
    async function dataImages() {
      try {
        setError(false);
        setLoader(true);
        // eslint-disable-next-line no-undef
        const data = await getImages(valueInput, pageNumber); // Assuming getImages function is defined elsewhere
        if (pageNumber > 1) {
          let newArrData = [...cardArr, ...data];
          setCardArr(newArrData);
        } else {
          setCardArr(data);
        }
      } catch (error) {
        setShowLoadMore(false);
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    dataImages();
  }, [valueInput, pageNumber, cardArr]);

  const onSubmit = (event) => {
    setPageNumber(1);
    setCardArr([]);
    setValueInput(event.target.value);
    setShowLoadMore(true);
  };

  const onClick = (newpage) => {
    setPageNumber(newpage);
  };

  const openModal = (event) => {
    setModalIsOpen(event.bool);
    setModalValueImg(event);
  };

  return {
    cardArr,
    loader,
    error,
    valueInput,
    pageNumber,
    showLoadMore,
    modalIsOpen,
    modalValueImg,
    onSubmit,
    onClick,
    openModal
  };
};
