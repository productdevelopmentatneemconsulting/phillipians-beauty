import React, { FunctionComponent, useState } from 'react';
import { Link } from 'gatsby';
import SwiperCore, { Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useInView } from 'react-intersection-observer';
import classNames from 'classnames';
import BlockContent from '@sanity/block-content-to-react';
import { blockTypeDefaultSerializers } from '../../helpers/sanity';
import { SliderInterface } from './models';
import { urlFor } from '../../helpers/imageUrl';
import { ReactComponent as Next } from '../../images/icons/next.svg';
import { ReactComponent as NextWhite } from '../../images/icons/next-white.svg';
import { ReactComponent as PlayVideo } from '../../images/icons/play.svg';
import './styles.scss';
import getType from '../../helpers/getType';

SwiperCore.use([Lazy]);

const Slider: FunctionComponent<SliderInterface> = ({
  type,
  slides,
  spaceBetween,
  slidesPerView,
  speed,
  threshold,
  lazy,
  preloadImages,
  freeMode,
  watchSlidesVisibility,
  breakpoints,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '5px 0px',
  });
  const [swiper, updateSwiper] = useState(null);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isFirstSlide, setIsFirstSlide] = useState(true);

  const swiperNext = () => {
    if (swiper) {
      swiper.slideNext();
      setIsFirstSlide(false);
      if (swiper.isEnd) {
        setIsLastSlide(true);
      }
    }
  };

  const swiperPrev = () => {
    if (swiper) {
      swiper.slidePrev();
      setIsLastSlide(false);
      if (swiper.isBeginning) {
        setIsFirstSlide(true);
      }
    }
  };

  const renderTileSlides = slide => {
    return (
      <SwiperSlide key={slide.headline}>
        <div>
          {slide._type && (
            <span className="bp-slider_type">{getType(slide._type)}</span>
          )}
          <Link className="bp-slider_link" to={slide.path}>
            <div className="bp-slider_heroImage">
              <figure>
                {inView ? (
                  <picture
                    className="bp-image__placeholder"
                    style={{
                      paddingTop: '100%',
                      background: `url(${slide._rawHeroImage.asset.metadata.lqip})`,
                      backgroundSize: 'cover',
                    }}
                  >
                    <source
                      media="screen and (min-width: 560px)"
                      srcSet={`${urlFor(slide._rawHeroImage)
                        .width(280)
                        .height(280)
                        .fit('max')
                        .auto('format')
                        .url()
                        .toString()}`}
                    />
                    <source
                      media="screen and (min-width: 320px)"
                      srcSet={`${urlFor(slide._rawHeroImage)
                        .width(160)
                        .height(160)
                        .fit('max')
                        .auto('format')
                        .url()
                        .toString()}`}
                    />
                    <img
                      className="bp-slider_image"
                      src={urlFor(slide._rawHeroImage)
                        .width(280)
                        .height(280)
                        .fit('max')
                        .url()}
                      alt={slide.heroImage.alt}
                    />
                  </picture>
                ) : null}
              </figure>
              {slide.heroVideo && (
                <span className="icon icon-play">
                  <PlayVideo />
                  <span hidden>Play Video</span>
                </span>
              )}
            </div>
            <h3 className="bp-slider_caption">
              <span>{slide.headline}</span>
            </h3>
          </Link>
        </div>
      </SwiperSlide>
    );
  };

  const renderAuthorSlides = slide => {
    return (
      <SwiperSlide key={slide.headline}>
        <div>
          <Link className="bp-slider_link" to={slide.path}>
            <div className="bp-slider_heroImage">
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
                      alt={slide.image.alt}
                    />
                  </picture>
                ) : null}
              </figure>
            </div>
            <h3 className="bp-slider_underline_caption">
              <span>{slide.name}</span>
            </h3>
            {slide._rawBio && (
              <p className="bp-slider_authorDescription">
                <BlockContent
                  blocks={slide._rawBio}
                  serializers={blockTypeDefaultSerializers}
                />
              </p>
            )}
          </Link>
        </div>
      </SwiperSlide>
    );
  };

  const renderProductSlides = slide => {
    return (
      <SwiperSlide key={slide.headline}>
        <div>
          <Link className="bp-slider_link" to={slide.path}>
            <div className="bp-slider_heroImage">
              <figure>
                {inView ? (
                  <picture
                    className="bp-image__placeholder"
                    style={{
                      paddingTop: '100%',
                      background: `url(${slide._rawImage.asset.metadata.lqip})`,
                      backgroundSize: 'cover',
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
                      alt={slide.image.alt}
                    />
                  </picture>
                ) : null}
              </figure>
            </div>
            <h3 className="bp-slider_caption">
              <span>{slide.name}</span>
            </h3>
          </Link>
        </div>
      </SwiperSlide>
    );
  };

  const renderHeroSlides = (slide, index) => (
    <SwiperSlide className="bp-slider_slide" key={slide.path}>
      <Link to={slide.path}>
        {slide.heroImage && (
          <>
            <figure>
              {index === 0 && (
                <link
                  rel="preload"
                  as="image"
                  href={`${urlFor(slide._rawHeroImage)
                    .width(752)
                    .height(423)
                    .quality(80)
                    .fit('max')
                    .auto('format')
                    .url()
                    .toString()}`}
                />
              )}
              <picture
                className="bp-image__placeholder"
                style={{
                  paddingTop: '56.25%',
                  background: `url(${slide._rawHeroImage.asset.metadata.lqip})`,
                  backgroundSize: 'cover',
                }}
              >
                <img
                  className="bp-slider_image swiper-lazy"
                  data-srcset={`${urlFor(slide._rawHeroImage)
                    .width(414)
                    .height(232)
                    .fit('max')
                    .auto('format')
                    .quality(80)
                    .url()
                    .toString()} 414w,
                      ${urlFor(slide._rawHeroImage)
                        .width(540)
                        .height(303)
                        .quality(80)
                        .fit('max')
                        .auto('format')
                        .url()
                        .toString()} 540w,
                      ${urlFor(slide._rawHeroImage)
                        .width(752)
                        .height(423)
                        .quality(80)
                        .fit('max')
                        .auto('format')
                        .url()
                        .toString()} 752w`}
                  alt={slide.heroImage.alt}
                />
              </picture>
            </figure>
            {slide.heroVideo && (
              <span className="icon icon-play">
                <PlayVideo />
                <span hidden>Play Video</span>
              </span>
            )}
          </>
        )}
        {type === 'hero' && (
          <div className="bp-slider_copy">
            <div className="bp-slider_copy-content">
              <div className="bp-slider_copy-type">{getType(slide._type)}</div>
              <h2 className="bp-slider_copy-title">
                <span>{slide.headline}</span>
              </h2>
              <Link className="bp-slider_copy-cta" to={slide.path}>
                Go to Article
              </Link>
            </div>
          </div>
        )}
      </Link>
    </SwiperSlide>
  );
  return (
    <>
      <div
        className={classNames('bp-slider', type === 'hero' ? 'pbx10' : null)}
        ref={ref}
        data-inview={inView}
      >
        <button
          className="bp-slider_nav bp-slider_nav-next"
          type="button"
          onClick={swiperNext}
          disabled={isLastSlide}
        >
          {type === 'author' ? <NextWhite /> : <Next />}
          <span className="srOnly">Next</span>
        </button>
        <Swiper
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView}
          speed={speed}
          threshold={threshold}
          onSwiper={updateSwiper}
          lazy={lazy}
          preloadImages={preloadImages}
          freeMode={freeMode}
          watchSlidesVisibility={watchSlidesVisibility}
          {...breakpoints}
        >
          {slides.map((slide: any, index: number) => {
            return type === 'hero'
              ? renderHeroSlides(slide, index)
              : type === 'tile'
              ? renderTileSlides(slide)
              : type === 'author'
              ? renderAuthorSlides(slide)
              : renderProductSlides(slide);
          })}
        </Swiper>
        <button
          className="bp-slider_nav bp-slider_nav-prev"
          type="button"
          onClick={swiperPrev}
          disabled={isFirstSlide}
        >
          {type === 'author' ? <NextWhite /> : <Next />}
          <span className="srOnly">Prev</span>
        </button>
      </div>
    </>
  );
};

export default Slider;
