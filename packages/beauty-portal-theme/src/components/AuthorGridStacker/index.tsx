import React, { FunctionComponent, useState } from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';
import { urlFor } from '../../helpers/imageUrl';

import { GridStackerInterface } from './models';
import './styles.scss';

const GridStacker: FunctionComponent<GridStackerInterface> = ({
  slides,
  headline,
  searchCtaLabel,
  searchTags,
  description,
  author,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '5px 0px',
  });
  return (
    <div className="bp-author-section" ref={ref} data-inview={inView}>
      <div className="bp-author-section_title">
        <h2>{headline}</h2>
        {searchCtaLabel && (
          <Link className="bp-author-section_link" to="/about-us">
            {searchCtaLabel}
          </Link>
        )}
      </div>
      <div className="bp-author-section_wrapper">
        {slides.map(slide => (
          <Link
            className="bp-author-section_item"
            to={slide.path ? slide.path : slide.slug.current}
          >
            {slide._rawImage && (
              <figure>
                {inView ? (
                  <picture
                    className="bp-image__placeholder"
                    style={{
                      paddingTop: '100%',
                    }}
                  >
                    <source
                      media="screen and (min-width: 560px)"
                      srcSet={`${urlFor(slide._rawImage)
                        .width(280)
                        .height(280)
                        .fit('max')
                        .auto('format')
                        .url()
                        .toString()}`}
                    />
                    <source
                      media="screen and (min-width: 320px)"
                      srcSet={`${urlFor(slide._rawImage)
                        .width(160)
                        .height(160)
                        .fit('max')
                        .auto('format')
                        .url()
                        .toString()}`}
                    />
                    <img
                      className="bp-slider_image"
                      src={urlFor(slide._rawImage)
                        .width(280)
                        .height(280)
                        .fit('max')
                        .url()}
                      alt={slide._rawImage.alt}
                    />
                  </picture>
                ) : null}
              </figure>
            )}
            <h3 className="bp-author-section_itemCaption">
              <span>{slide.name}</span>
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GridStacker;
