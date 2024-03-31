import clsx from "clsx";
import style from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const { search } = form.elements;
    onSubmit(search.value);
  };

  return (
    <header className={clsx(style.headerBox)}>
      <form className={clsx(style.headerForm)} onSubmit={handleSubmit}>
        <input
          className={clsx(style.headerInput)}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={clsx(style.formButton)} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
