import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import { urlFor } from '../../helpers/imageUrl';
import { useInView } from 'react-intersection-observer';

import { TileStackerInterface } from './models';
import './styles.scss';

const TileStacker: FunctionComponent<TileStackerInterface> = ({
  name,
  slides,
  headline,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '5px 0px',
  });

  return (
    <div
      id={name}
      className="bp-container bp-article-stacker"
      ref={ref}
      data-inview={inView}
    >
      <h2 className="bp-article-stacker_title">{headline}</h2>
      <div className="bp-article-stacker_container">
        {slides.map(slide => (
          <div className="bp-article-stacker_wrapper">
            <Link to={slide.path}>
              {slide._rawHeroImage && (
                <figure className="image">
                  {inView ? (
                    <picture
                      className="bp-image__placeholder"
                      style={{
                        paddingTop: '60%',
                        background: `url(${slide._rawHeroImage.asset.metadata.lqip})`,
                        backgroundSize: 'cover',
                      }}
                    >
                      <img
                        srcSet={`${urlFor(slide._rawHeroImage)
                          .width(320)
                          .height(180)
                          .fit('max')
                          .auto('format')
                          .quality(80)
                          .url()
                          .toString()}`}
                        alt={slide.heroImage.alt}
                      />
                    </picture>
                  ) : null}
                </figure>
              )}
              <div className="bp-article-stacker_footer">
                <span className="bp-article-stacker_type">{slide._type}</span>
                <h6 className="bp-article-stacker_headline">
                  <span>{slide.headline}</span>
                </h6>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TileStacker;
