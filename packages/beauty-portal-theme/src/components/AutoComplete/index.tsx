import React from 'react';
import { Link } from 'gatsby';
import { Highlight, connectAutoComplete } from 'react-instantsearch-dom';
import './styles.scss';

const Autocomplete = ({ hits, currentRefinement, refine }) => (
  <ul className="suggestions-container">
    <li>
      <input
        type="search"
        value={currentRefinement}
        className="suggestions-input"
        placeholder="Search here..."
        aria-label="Search articles, products & many more"
        aria-labelledby="Search"
        onChange={event => refine(event.currentTarget.value)}
      />
    </li>
    <ul className="suggestions-list">
      {hits.map(hit => (
        <li
          style={
            currentRefinement ? { display: 'list-item' } : { display: 'none' }
          }
          key={hit.objectID}
        >
          <Link className={'ais-InfiniteHits-item__link'} to={hit.path}>
            <Highlight attribute="title" hit={hit} tagName="mark" />
          </Link>
        </li>
      ))}
    </ul>
  </ul>
);

const CustomAutocomplete = connectAutoComplete(Autocomplete);
export default CustomAutocomplete;
