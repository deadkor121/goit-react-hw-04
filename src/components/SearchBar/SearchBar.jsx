import { Field, Form, Formik } from 'formik';
import css from './SearchBar.module.css';
import { CiSearch } from 'react-icons/ci';
const SearchBar = ({ onSearch }) => {
  return (
    <>
      <header className={css.galleryHeader}>
        <Formik
          initialValues={{ query: '' }}
          onSubmit={(values, actions) => {
            onSearch(values.query);
            actions.resetForm();
          }}
        >
          <Form className={css.searchForm}>
            <Field
              name="query"
              className={css.formInput}
              placeholder="Search images and photos"
            />
            <button type="submit" className={css.searchBtn}>
              <CiSearch />
            </button>
          </Form>
        </Formik>
      </header>
    </>
  );
};

export default SearchBar;
