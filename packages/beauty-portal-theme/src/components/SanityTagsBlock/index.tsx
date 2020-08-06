import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import './styles.scss';

import { getSearchUrl } from '../../helpers/searchUrl';

const Tags: FunctionComponent<TagsInterface> = ({
  tags,
  searchResultPath,
  title,
}) => {
  return (
    <section className="bp-tags">
      <div className="bp-container">
        <p className="bp-tags_title">{title}</p>
        <ul className="bp-tags_items">
          {tags.map((tag: any) => (
            <li className="bp-tags_item" key={tag.name}>
              <Link
                className="bp-tags_link"
                to={getSearchUrl(searchResultPath, tag.name, 'tag')}
              >
                {tag.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

interface TagsInterface {
  tags: any[];
  searchResultPath?: string;
  title: string;
}
export default Tags;
