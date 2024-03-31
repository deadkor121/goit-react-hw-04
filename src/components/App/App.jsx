import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';

import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import Loader from '../Loader/Loader';

import { fetchImages } from '../../gallery-api';

const App = () => {
  Modal.setAppElement('#root');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    async function getGallery() {
      try {
        setIsLoading(true);
        setError(false);
        const dataResponse = await fetchImages(searchQuery, page);
        if (dataResponse.length === 0) {
          toast.error(
            'The query is incorrect, please input correct search request'
          );
          return;
        } else {
          setImages(prevPageImages => {
            return [...prevPageImages, ...dataResponse];
          });
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getGallery();
  }, [page, searchQuery]);

  const handleSearch = newQuery => {
    if (newQuery.trim() === '') {
      toast.error('The query is empty, please input search request');
      return;
    }
    setImages([]);
    setSearchQuery(newQuery);
    setPage(1);
  };
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const openModal = image => {
    setSelectedImage(image);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <Toaster />
      {error ? (
        <ErrorMessage />
      ) : (
        <>
          {images && <ImageGallery images={images} openModal={openModal} />}
          {images.length > 11 && !isLoading && (
            <LoadMoreBtn handleLoadMore={handleLoadMore} />
          )}
          {isLoading && <Loader />}
          {selectedImage && (
            <ImageModal
              isOpen={modalIsOpen}
              image={selectedImage}
              closeModal={closeModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
