import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { Highlight, connectAutoComplete } from 'react-instantsearch-dom';
import { ReactComponent as SearchIcon } from '../../images/icons/search.svg';
import './styles.scss';

const Autocomplete = ({ hits, currentRefinement, refine }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleOutsideClick = (ref, handler) => {
    useEffect(() => {
      const listener = event => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };

      typeof window !== 'undefined' &&
        window.document.addEventListener('mousedown', listener);

      return () => {
        typeof window !== 'undefined' &&
          window.document.removeEventListener('mousedown', listener);
      };
    }, []); // Empty array ensures that effect is only run on mount and unmount
  };

  const ref = useRef();

  handleOutsideClick(ref, () => setShowSuggestions(false));

  return (
    <ul className="suggestions-container">
      <li>
        <form
          onSubmit={event => {
            event.preventDefault();
            setShowSuggestions(false);
          }}
        >
          <input
            type="search"
            value={currentRefinement}
            className="suggestions-input"
            placeholder="Search here..."
            aria-label="Search articles, products & many more"
            aria-labelledby="Search"
            onChange={event => {
              setShowSuggestions(true);
              refine(event.currentTarget.value);
            }}
          />
          <button
            type="submit"
            id="search-button"
            aria-label="Search Button With Icon"
            aria-labelledby="Button"
          >
            <SearchIcon />
          </button>
        </form>
      </li>
      {showSuggestions && (
        <ul className="suggestions-list" ref={ref}>
          {hits.map(hit => (
            <li key={hit.objectID}>
              <Link className={'ais-InfiniteHits-item__link'} to={hit.path}>
                <Highlight attribute="title" hit={hit} tagName="mark" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </ul>
  );
};

const CustomAutocomplete = connectAutoComplete(Autocomplete);
export default CustomAutocomplete;
