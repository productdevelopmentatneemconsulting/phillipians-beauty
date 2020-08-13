import React, { FunctionComponent } from 'react';
import { SanityProductSliderInterface } from './models';
import TileSlider from '../TileSlider';
import './styles.scss';

const SanityProductSlider: FunctionComponent<SanityProductSliderInterface> = ({
  slides,
  headline,
  searchCtaLabel,
  searchTags,
}) => {
  return (
    <section className="bp-productSlider">
      <div className="bp-container">
        <TileSlider
          slides={slides}
          headline={headline}
          searchCtaLabel={searchCtaLabel}
          searchTags={searchTags}
        />
      </div>
    </section>
  );
};

export default SanityProductSlider;
