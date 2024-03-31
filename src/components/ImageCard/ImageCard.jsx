import css from './ImageCard.module.css';

const ImageCard = ({ image, openModal }) => {
  return (
    <img
      src={image.urls.small}
      alt={image.alt_description}
      className={css.galleryImage}
      onClick={() => {
        openModal(image);
      }}
    />
  );
};
export default ImageCard;
