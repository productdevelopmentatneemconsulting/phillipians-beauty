import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { SanityArticleSliderInterface } from './models';
import ArticleTileSlider from '../ArticleTileSlider';
import HeroSlider from '../HeroSlider';
import TileStacker from '../TileStacker';
import ArticleStacker from '../ArticleStacker';

import './styles.scss';

const componentMap = {
  tile: ArticleTileSlider,
  editor: ArticleTileSlider,
  hero: HeroSlider,
  stacker: ArticleStacker,
  default: TileStacker,
};

const SanityArticleSlider: FunctionComponent<SanityArticleSliderInterface> = ({
  name,
  slides,
  headline,
  slideType,
  searchCtaLabel,
  searchTags,
}) => {
  // @todo we should take presentationType from props;
  const getComponentName = (sliderType: string) => {
    sliderType = slideType.name.toLowerCase();
    if (sliderType.indexOf('stacker') >= 0) return 'stacker';
    if (sliderType.indexOf('hero') >= 0) return 'hero';
    if (sliderType.indexOf('tile') >= 0) return 'tile';
    if (sliderType.indexOf('editor') >= 0) return 'editor';

    return 'default';
  };
  const componentName = getComponentName(slideType);
  const Component = componentMap[componentName];

  return (
    <section className={classNames('bp-theme_primary', componentName)}>
      <div className={classNames('bp-container', 'p0')}>
        <Component
          {...{ name, slides, headline, searchCtaLabel, searchTags }}
        />
      </div>
    </section>
  );
};

export default SanityArticleSlider;
