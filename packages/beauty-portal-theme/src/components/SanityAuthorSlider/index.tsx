import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { SanityAuthorSliderInterface } from './models';
import TileSlider from '../TileSlider';
import AuthorSlider from '../AuthorSlider';
import GridStacker from '../AuthorGridStacker';
import './styles.scss';

const componentMap = {
  tile: TileSlider,
  grid: GridStacker,
  author: AuthorSlider,
  default: TileSlider,
};

const SanityAuthorSlider: FunctionComponent<SanityAuthorSliderInterface> = ({
  name,
  slides,
  headline,
  description,
  slideType,
  searchCtaLabel,
  searchTags,
}) => {
  console.log('slideType', slideType);
  const getComponentName = (sliderType: any) => {
    sliderType = slideType.name.toLowerCase();
    if (sliderType.indexOf('grid') >= 0) return 'grid';
    if (sliderType.indexOf('author') >= 0) return 'author';
    if (sliderType.indexOf('tile') >= 0) return 'tile';

    return 'default';
  };
  const componentName = getComponentName(slideType);

  const Component = componentMap[componentName];

  return (
    <section className={classNames('bp-theme_primary', componentName)}>
      <div className={classNames('bp-container')}>
        <Component
          {...{
            name,
            slides,
            headline,
            description,
            searchCtaLabel,
            searchTags,
          }}
        />
      </div>
    </section>
  );
};

export default SanityAuthorSlider;
