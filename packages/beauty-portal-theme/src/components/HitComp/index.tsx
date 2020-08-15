import React from 'react';
import { Link } from 'gatsby';
import { Highlight } from 'react-instantsearch-dom';
import { useInView } from 'react-intersection-observer';

const PostHit = ({ hit }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '5px 0px',
  });
  const { pageType, path, title, subtitle, buyNowLink, image } = hit;
  const product = pageType.toLowerCase();

  return (
    <article ref={ref} data-inview={inView}>
      <Link
        className={'ais-InfiniteHits-item__link'}
        to={path}
        aria-label={title}
      >
        <div className="image-wrapper">
          <figure>
            {inView ? (
              <picture
                className="bp-image__placeholder"
                style={{
                  paddingTop: '100%',
                  background: `url(${image.asset.fluid.base64})`,
                  backgroundSize: 'cover',
                }}
              >
                <source
                  media="(max-width: 799px)"
                  srcSet={`${image.asset.url}?q=80&w=160&h=160&fit=crop&auto=format`}
                />
                <source
                  media="(min-width: 800px)"
                  srcSet={`${image.asset.url}?q=80&w=240&h=240&fit=crop&auto=format`}
                />
                <img
                  src={`${image.asset.url}?q=80&w=240&h=240&fit=crop&auto=format`}
                  loading="lazy"
                  alt={image.alt}
                />
              </picture>
            ) : null}
          </figure>
        </div>

        <div className="ais-InfiniteHits-item__copy">
          {product.indexOf('product') >= 0 && subtitle && (
            <h4 className="ais-InfiniteHits-item__tagline">
              <Highlight attribute="subtitle" hit={hit} tagName="mark" />
            </h4>
          )}

          <h4>
            <Highlight attribute="title" hit={hit} tagName="mark" />
          </h4>
        </div>
      </Link>
      {buyNowLink && (
        <div className="textCenter">
          <a target="_blank" rel="noreferrer" href={buyNowLink}>
            <button
              className="ais-InfiniteHits-item__buyNowLink"
              aria-label="Buy Now"
            >
              Buy Now
            </button>
          </a>
        </div>
      )}
    </article>
  );
};

export default PostHit;
