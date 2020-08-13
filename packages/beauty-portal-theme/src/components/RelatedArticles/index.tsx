import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import { useInView } from 'react-intersection-observer';
import classNames from 'classnames';
import { urlFor } from '../../helpers/imageUrl';
import './styles.scss';
import getType from 'src/helpers/getType';

const RelatedArticles: FunctionComponent<RelatedArticlesInterface> = ({
  articles,
  title,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

  const firstArticle = articles.shift();
  const lastArticle = articles.pop();

  const normalThumbSize = article => {
    return (
      <figure>
        <picture
          className="bp-image__placeholder"
          style={{
            background: `url(${article._rawHeroImage.asset.metadata.lqip})`,
            backgroundSize: 'cover',
            paddingTop: '100%',
          }}
        >
          <source
            media="screen and (min-width: 320px)"
            srcSet={`${urlFor(article._rawHeroImage)
              .width(80)
              .height(80)
              .fit('max')
              .url()
              .toString()} 1x, ${urlFor(article._rawHeroImage)
              .width(160)
              .height(160)
              .fit('crop')
              .url()
              .toString()} 2x`}
          />
          <img
            src={urlFor(article._rawHeroImage)
              .width(160)
              .height(160)
              .fit('crop')
              .url()}
            alt={article._rawHeroImage.alt}
          />
        </picture>
      </figure>
    );
  };
  const fullThumbSize = article => {
    return (
      <figure>
        <picture
          className="bp-image__placeholder"
          style={{
            paddingTop: '56.25%',
            background: `url(${article._rawHeroImage.asset.metadata.lqip})`,
            backgroundSize: 'cover',
          }}
        >
          <source
            media="screen and (min-width: 1280px)"
            srcSet={`${urlFor(article._rawHeroImage)
              .width(380)
              .height(213)
              .fit('crop')
              .url()
              .toString()} 1x, ${urlFor(article._rawHeroImage)
              .width(760)
              .height(426)
              .fit('crop')
              .url()
              .toString()} 2x`}
          />
          <source
            media="screen and (min-width: 320px)"
            srcSet={`${urlFor(article._rawHeroImage)
              .width(382)
              .height(171)
              .fit('max')
              .url()
              .toString()} 1x, ${urlFor(article._rawHeroImage)
              .width(764)
              .height(342)
              .fit('crop')
              .url()
              .toString()} 2x`}
          />
          <img
            src={urlFor(article._rawHeroImage)
              .width(380)
              .height(213)
              .fit('crop')
              .url()}
            alt={article._rawHeroImage.alt}
          />
        </picture>
      </figure>
    );
  };
  const halfThumbSize = article => {
    return (
      <figure>
        <picture
          className="bp-image__placeholder"
          style={{
            background: `url(${article._rawHeroImage.asset.metadata.lqip})`,
            backgroundSize: 'cover',
            paddingTop: '100%',
          }}
        >
          <source
            media="screen and (min-width: 1280px)"
            srcSet={`${urlFor(article._rawHeroImage)
              .width(175)
              .height(175)
              .fit('crop')
              .url()
              .toString()} 1x, ${urlFor(article._rawHeroImage)
              .width(350)
              .height(350)
              .fit('crop')
              .url()
              .toString()} 2x`}
          />
          <source
            media="screen and (min-width: 320px)"
            srcSet={`${urlFor(article._rawHeroImage)
              .width(150)
              .height(150)
              .fit('max')
              .url()
              .toString()} 1x, ${urlFor(article._rawHeroImage)
              .width(300)
              .height(300)
              .fit('crop')
              .url()
              .toString()} 2x`}
          />
          <img
            src={urlFor(article._rawHeroImage)
              .width(175)
              .height(175)
              .fit('max')
              .url()}
            alt={article._rawHeroImage.alt}
          />
        </picture>
      </figure>
    );
  };

  const renderListItem = (article: any, position?: string) => {
    if (!position) {
      position = 'normal';
    }
    return (
      <article className="bp-related_item" key={article.id}>
        <Link
          to={article.path}
          className="bp-related_link"
          aria-label={article.headline}
        >
          <div className="bp-related_content">
            <div
              className={classNames(
                'bp-related_image',
                position === 'normal' ? 'normal' : null,
                position === 'last' ? 'medium' : null
              )}
            >
              {position === 'normal' && normalThumbSize(article)}
              {position === 'first' && fullThumbSize(article)}
              {position === 'last' && halfThumbSize(article)}
            </div>

            <div className="bp-related_copy">
              <span className="bp-related_type">{getType(article._type)}</span>
              <h3 className="bp-related_titlef">
                <span>{article.headline}</span>
              </h3>
            </div>
          </div>
        </Link>
      </article>
    );
  };

  return (
    <>
      <div className="bp-related" ref={ref} data-inview={inView}>
        <p className="sectionTitle">{title}</p>
        {inView ? (
          <div>
            {firstArticle && (
              <div className="is-first">
                {renderListItem(firstArticle, 'first')}
              </div>
            )}
            <div className="scrollArea">
              {articles &&
                articles.slice(0, 8).map((article: any) => {
                  return renderListItem(article);
                })}
            </div>

            {lastArticle && (
              <div className="is-last">
                {renderListItem(lastArticle, 'last')}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

interface RelatedArticlesInterface {
  articles: any;
  title: string;
}

export default RelatedArticles;
