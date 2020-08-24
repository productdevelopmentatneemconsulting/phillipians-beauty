import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import { getSearchUrl } from '../../helpers/searchUrl';
import './styles.scss';

const Breadcrumb: FunctionComponent<BreadcrumbInterface> = ({
  tag,
  pageTitle,
  parentPageTitle,
  searchResultPath,
}) => {
  console.log('parentPageTitle', parentPageTitle);
  return (
    <section className="bp-breadcrumb">
      <div className="bp-container-fluid">
        <ul className="bp-breadcrumb-items">
          <li className="bp-breadcrumb-item">
            <Link to={'/'} className="bp-breadcrumb-link">
              Home
            </Link>
          </li>
          {parentPageTitle && (
            <>
              <li className="bp-breadcrumb-item">
                <Link to={parentPageTitle.path} className="bp-breadcrumb-link">
                  {parentPageTitle.name}
                </Link>
              </li>
              <li className="divider" aria-hidden="true">
                /
              </li>
            </>
          )}
          {tag && (
            <>
              <li className="bp-breadcrumb-item">
                <Link
                  to={getSearchUrl(
                    searchResultPath,
                    tag.tagCategory.name,
                    'tags.tagCategory.name'
                  )}
                  className="bp-breadcrumb-link"
                >
                  {tag.tagCategory.name}
                </Link>
              </li>
              <li className="divider" aria-hidden="true">
                /
              </li>
              <li className="bp-breadcrumb-item">
                <Link
                  to={getSearchUrl(searchResultPath, tag.name, 'tag')}
                  className="bp-breadcrumb-link"
                >
                  {tag.name}
                </Link>
              </li>
              <li className="divider" aria-hidden="true">
                /
              </li>
            </>
          )}
          <li className={classNames('bp-breadcrumb-item', 'is-active')}>
            {pageTitle}
          </li>
        </ul>
      </div>
    </section>
  );
};

interface BreadcrumbInterface {
  tag?: any;
  pageTitle: string;
  parentPageTitle: any;
  searchResultPath?: string;
}

export default Breadcrumb;
