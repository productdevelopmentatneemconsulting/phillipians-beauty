import React, { useRef, createRef } from 'react';
import {
  InstantSearch,
  RefinementList,
  ClearRefinements,
  SortBy,
  HitsPerPage,
  Panel,
  Configure,
  InfiniteHits,
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import CustomAutocomplete from '../components/AutoComplete';
import PostHit from '../components/HitComp';
import {
  ClearFiltersMobile,
  NoResults,
  ResultsNumberMobile,
  SaveFiltersMobile,
} from './widgets';
import withURLSync from './URLSync';
import './theme.scss';
import './search.scss';
import './search-mobile.scss';

const searchClient = algoliasearch(
  process.env['algolia_app_id'],
  process.env['algolia_search_api_key']
);

const Search = props => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const ref = createRef();

  function openFilters() {
    document.body.classList.add('filtering');
    typeof window !== 'undefined' && window.scrollTo(0, 0);
    typeof window !== 'undefined' && window.addEventListener('keyup', onKeyUp);
    typeof window !== 'undefined' && window.addEventListener('click', onClick);
  }

  function closeFilters() {
    document.body.classList.remove('filtering');
    containerRef.current.scrollIntoView();
    typeof window !== 'undefined' &&
      window.removeEventListener('keyup', onKeyUp);
    typeof window !== 'undefined' &&
      window.removeEventListener('click', onClick);
  }

  function onKeyUp(event) {
    if (event.key !== 'Escape') {
      return;
    }

    closeFilters();
  }

  function onClick(event) {
    if (event.target !== headerRef.current) {
      return;
    }

    closeFilters();
  }

  return (
    <div className="bp-container bp-search">
      <InstantSearch
        searchClient={searchClient}
        indexName={props.indices[0].name}
        searchState={props.searchState}
        createURL={props.createURL}
        onSearchStateChange={props.onSearchStateChange}
        root={{ props: { ref } }}
      >
        {props.indices[0].name === 'products' ||
        props.authors === 'true' ? null : (
          <header className="search-header" ref={headerRef}>
            <CustomAutocomplete />
          </header>
        )}

        {props.authors === 'true' ? (
          <Configure facetFilters={[`author.name: ${props.slug}`]} />
        ) : (
          <Configure
            snippetEllipsisText="…"
            removeWordsIfNoResults="allOptional"
          />
        )}
        <div
          className={
            props.authors !== 'true' ? 'show-results' : 'show-author-results'
          }
        >
          {props.authors !== 'true' ? (
            <ResultsNumberMobile />
          ) : (
            <ResultsNumberMobile authorName={props.authorName} />
          )}
        </div>

        <main className="search-container" ref={containerRef}>
          <div className="search-container-wrapper">
            <section className="search-container-filters" onKeyUp={onKeyUp}>
              <div className="search-container-header">
                <h2>Filters</h2>

                <div className="clear-filters" data-layout="desktop">
                  <ClearRefinements
                    translations={{
                      reset: (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            viewBox="0 0 11 11"
                          >
                            <g fill="none" fillRule="evenodd" opacity=".4">
                              <path d="M0 0h11v11H0z" />
                              <path
                                fill="#000"
                                fillRule="nonzero"
                                d="M8.26 2.75a3.896 3.896 0 1 0 1.102 3.262l.007-.056a.49.49 0 0 1 .485-.456c.253 0 .451.206.437.457 0 0 .012-.109-.006.061a4.813 4.813 0 1 1-1.348-3.887v-.987a.458.458 0 1 1 .917.002v2.062a.459.459 0 0 1-.459.459H7.334a.458.458 0 1 1-.002-.917h.928z"
                              />
                            </g>
                          </svg>
                          Clear filters
                        </>
                      ),
                    }}
                  />
                </div>

                <div className="clear-filters" data-layout="mobile">
                  <ResultsNumberMobile />
                </div>
              </div>

              <div className="search-container-body">
                {props.indices[0].name === 'products' ? (
                  <>
                    <Panel header="Category">
                      <RefinementList
                        attribute="tag"
                        limit={6}
                        showMore={true}
                      />
                    </Panel>
                    <Panel header="All brands">
                      <RefinementList attribute="brand" />
                    </Panel>
                  </>
                ) : (
                  <>
                    <Panel header="Tag">
                      <RefinementList
                        attribute="tag"
                        limit={6}
                        showMore={true}
                      />
                    </Panel>
                    <Panel header="Category">
                      <RefinementList
                        attribute="category"
                        limit={6}
                        showMore={true}
                      />
                    </Panel>
                    <Panel header="Page Type">
                      <RefinementList attribute="pageType" />
                    </Panel>
                    <Panel header="Duration">
                      <RefinementList attribute="duration" />
                    </Panel>
                  </>
                )}
              </div>
            </section>

            <footer
              className="search-container-filters-footer"
              data-layout="mobile"
            >
              <div className="search-container-filters-footer-button-wrapper">
                <ClearFiltersMobile containerRef={containerRef} />
              </div>

              <div className="search-container-filters-footer-button-wrapper">
                <SaveFiltersMobile onClick={closeFilters} />
              </div>
            </footer>
          </div>

          <section className="search-container-results">
            <header className="search-container-header search-container-options">
              {props.indices[0].name !== 'products' && (
                <label aria-label="sort by date">
                  Sort by{' '}
                  <SortBy
                    className="search-container-option"
                    defaultRefinement={props.indices[0].name}
                    items={[
                      { label: 'Default', value: 'howtoArticle' },
                      {
                        label: 'Latest',
                        value: 'howtoArtcile_publishedAt_desc',
                      },
                      {
                        label: 'Oldest',
                        value: 'howtoArtcile_publishedAt_asc',
                      },
                    ]}
                  />
                </label>
              )}
              <label aria-label="hits per page">
                Hits per page{' '}
                <HitsPerPage
                  className="search-container-option"
                  items={[
                    {
                      label: '9 hits',
                      value: 9,
                    },
                    {
                      label: '18 hits',
                      value: 18,
                    },
                    {
                      label: '27 hits',
                      value: 27,
                    },
                  ]}
                  defaultRefinement={9}
                />
              </label>
            </header>

            <div className="grid">
              <InfiniteHits showPrevious={false} hitComponent={PostHit} />
            </div>

            <NoResults />
          </section>
        </main>

        <aside data-layout="mobile">
          <button
            className="filters-button"
            data-action="open-overlay"
            onClick={openFilters}
          >
            <svg xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 1H1l5.6 6.3v4.37L9.4 13V7.3z"
                stroke="#fff"
                strokeWidth="1.29"
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Filters
          </button>
        </aside>
      </InstantSearch>
    </div>
  );
};

export default withURLSync(Search);
