import clsx from "clsx";
import style from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick, pageNumber }) => {
  const handleClick = (event) => {
    event.preventDefault();
    onClick((pageNumber += 1));
  };
  return (
    <button
      className={clsx(style.loreMoreBtn)}
      type="button"
      onClick={handleClick}
    >
      <span>Load more</span>
    </button>
  );
};

export default LoadMoreBtn;
