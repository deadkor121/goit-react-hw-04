import Modal from 'react-modal';
import css from './ImageModal.module.css';
const ImageModal = ({ isOpen, image, closeModal }) => {
  const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(89, 89, 92, 0.75)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <div>
          <div>
            <img
              src={image.urls.regular}
              alt={image.description}
              className={css.modalImg}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ImageModal;
