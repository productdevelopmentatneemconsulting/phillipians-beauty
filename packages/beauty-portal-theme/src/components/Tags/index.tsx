import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import { getSearchUrl } from '../../helpers/searchUrl';
import './styles.scss';

const Tags: FunctionComponent<TagsInterface> = ({
  data,
  searchResultPath,
  title,
}) => {
  const uniqueValues = (array: [], filter: string) => {
    return array.reduce((tag: any, current: any) => {
      const category = tag.find((item: any) =>
        filter === 'category'
          ? item.tagCategory.name === current.tagCategory.name
          : item.name === current.name
      );
      if (!category) {
        return tag.concat([current]);
      } else {
        return tag;
      }
    }, []);
  };

  return (
    <section className="bp-tags">
      <p className="bp-tags_title">{title}</p>
      <ul className="bp-tags_items">
        {uniqueValues(data, 'category').map((tag: any) => (
          <li className="bp-tags_item" key={tag.tagCategory.name}>
            <Link
              className="bp-tags_link"
              to={getSearchUrl(
                searchResultPath,
                tag.tagCategory.name,
                'tags.tagCategory.name'
              )}
            >
              {tag.tagCategory.name}
            </Link>
          </li>
        ))}
        {uniqueValues(data, 'tag').map((tag: any) => (
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
    </section>
  );
};

interface TagsInterface {
  data: any;
  searchResultPath?: string;
  title: string;
}
export default Tags;
