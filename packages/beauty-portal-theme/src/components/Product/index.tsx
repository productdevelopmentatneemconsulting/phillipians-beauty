import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import { urlFor } from '../../helpers/imageUrl';
import { ReactComponent as IconBuy } from '../../images/icons/buy.svg';
import './styles.scss';

const Product: FunctionComponent<ProductInterface> = ({ metadata, data }) => {
  const {
    slug,
    image: { alt },
    buyNow,
    tagLine,
    name,
  } = metadata;
  const { image } = data;

  return (
    <div className="bp-product">
      <Link className="bp-product_link" to={(slug && slug.current) || '/'}>
        <div className="bp-product_image">
          <figure>
            <picture>
              <source
                media="screen and (min-width: 1280px)"
                srcSet={`${urlFor(image)
                  .width(250)
                  .fit('max')
                  .auto('format')
                  .url()
                  .toString()}, ${urlFor(image)
                  .width(500)
                  .fit('max')
                  .auto('format')
                  .url()
                  .toString()} 2x`}
              />
              <img
                src={urlFor(image)
                  .width(250)
                  .fit('max')
                  .auto('format')
                  .url()}
                alt={alt}
              />
            </picture>
          </figure>
        </div>
        {tagLine && (
          <p className="bp-product-tagline">
            <span>{tagLine}</span>
          </p>
        )}
        {name && (
          <h3 className="bp-product_name">
            <span>{name}</span>
          </h3>
        )}
      </Link>
      {buyNow && (
        <a
          className="bp-product_buy"
          href={buyNow}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="bp-product_icon">
            <IconBuy />
            <span>Buy Now</span>
          </span>
        </a>
      )}
    </div>
  );
};

interface ProductInterface {
  metadata: any;
  data: any;
}
export default Product;