import React from 'react';
import { Link } from 'gatsby';
import { Highlight } from 'react-instantsearch-dom';
import { useInView } from 'react-intersection-observer';

const PostHit = ({ hit }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '5px 0px',
  });
  const { path, title, image } = hit;

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
                  srcset={image.asset.fluid.srcWebp}
                />
                <source
                  media="(min-width: 800px)"
                  srcset={image.asset.fluid.srcWebp}
                />
                <img
                  src={image.asset.fluid.src}
                  loading="lazy"
                  alt={image.alt}
                />
              </picture>
            ) : null}
          </figure>
        </div>

        <div className="ais-InfiniteHits-item__copy">
          <h4>
            <Highlight attribute="title" hit={hit} tagName="mark" />
          </h4>
          {/* <p className="ais-InfiniteHits-item__desc">
            <Snippet attribute="ingredientBody" hit={hit} tagName="mark" />
            <Snippet attribute="usageBody" hit={hit} tagName="mark" />
            <Snippet attribute="galleryBody" hit={hit} tagName="mark" />
            <Snippet attribute="howTobody" hit={hit} tagName="mark" />
            <Snippet attribute="featureBody" hit={hit} tagName="mark" />
            <span>{' [...]'}</span>
          </p> */}
        </div>
      </Link>
    </article>
  );
};

export default PostHit;
