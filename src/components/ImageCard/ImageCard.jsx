import clsx from "clsx";
import style from "./ImageCard.module.css";

const ImageCard = ({ dataImages, openModal }) => {
  const handleClick = () => {
    const object = {
      bool: true,
      src: dataImages.regular,
      alt: dataImages.description,
    };
    openModal(object);
  };
  return (
    <li className={clsx(style.galleryItem)} onClick={handleClick}>
      <div>
        <img
          className={clsx(style.galleryImage)}
          src={dataImages.small}
          alt={dataImages.description}
        />
      </div>
    </li>
  );
};

export default ImageCard;
