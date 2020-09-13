import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import { useInView } from 'react-intersection-observer';
import { urlFor } from '../../helpers/imageUrl';
import getType from '../../helpers/getType';
import './styles.scss';

const ReadNext: FunctionComponent<ReadNextInterface> = ({ data, title }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });
  const {
    readnext: { path, headline, _type, _rawHeroImage, heroImage },
  } = data;

  return (
    <section className="bp-readNext">
      <h3 className="bp-readNext_title">{title}</h3>
      <div className="bp-readNext_content">
        <Link className="bp-readNext_link" to={path}>
          <div className="bp-readNext_image" ref={ref} data-inview={inView}>
            <figure>
              {inView ? (
                <picture
                  className="bp-image__placeholder"
                  style={{
                    paddingTop: '56.25%',
                    background: `url(${
                      _rawHeroImage
                        ? _rawHeroImage.asset.metadata.lqip
                        : heroImage.asset.metadata.lqip
                    })`,
                    backgroundSize: 'cover',
                  }}
                >
                  <source
                    media="screen and (min-width: 320px)"
                    srcSet={`${urlFor(_rawHeroImage ? _rawHeroImage : heroImage)
                      .width(436)
                      .height(245)
                      .fit('max')
                      .auto('format')
                      .url()
                      .toString()}`}
                  />
                  <img
                    src={urlFor(_rawHeroImage ? _rawHeroImage : heroImage)
                      .width(436)
                      .height(245)
                      .fit('max')
                      .url()}
                    alt={_rawHeroImage ? _rawHeroImage.alt : heroImage.alt}
                  />
                </picture>
              ) : null}
            </figure>
          </div>
          <div className="bp-readNext_copy">
            <span className="bp-readNext_type">{getType(_type)}</span>
            <p className="bp-readNext_subTitle">
              <span>{headline}</span>
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};

interface ReadNextInterface {
  data: any;
  title: string;
}
export default ReadNext;
