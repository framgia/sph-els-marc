import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = ({ setQuery }) => {
  const ref = useRef(null);
  const navigate = useNavigate();

  const goToCategory = (setQuery) => {
    setQuery(ref.current.value);
    navigate({
      pathname: '/category',
      search: `?search=${ref.current.value}`,
    });
  };

  const goReset = () => {
    navigate({
      pathname: '/category',
      search: '?search=',
    });
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      goToCategory(setQuery);
    }
  };

  return (
    <div className='container'>
      <div className='d-flex'>
        <input
          ref={ref}
          className='form-control me-2'
          type='search'
          placeholder='Search'
          aria-label='Search'
          onKeyDown={handleKeyDown}
        />
        <button
          className='btn btn-primary'
          type='submit'
          onClick={() => goToCategory(setQuery)}
        >
          Search
        </button>
        <button
          className='mx-2 btn btn-primary'
          type='submit'
          onClick={goReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Search;
