import React, { FunctionComponent } from 'react';
// import { Link } from 'gatsby';
import Slider from '../Slider';
import { AuthorSliderInterface } from './models';
// import { getSearchUrlWithTagsAndCategory } from '../../helpers/searchUrl';
import './styles.scss';

const AuthorSlider: FunctionComponent<AuthorSliderInterface> = ({
  slides,
  headline,
  description,
  searchCtaLabel,
  searchTags,
}) => {
  const breakpoints = {
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 120,
      },
      320: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
    },
  };

  return (
    <div className="bp-slider_author">
      <div className="bp-slider_author-header">
        <h2 className="bp-slider_author-title">{headline}</h2>
        <p className="bp-slider_author-description">{description}</p>
      </div>

      <Slider
        type="author"
        slides={slides}
        spaceBetween={120}
        slidesPerView={3}
        speed={700}
        threshold={5}
        lazy={true}
        preloadImages={false}
        freeMode={true}
        watchSlidesVisibility={true}
        breakpoints={breakpoints}
      />
    </div>
  );
};

export default AuthorSlider;
