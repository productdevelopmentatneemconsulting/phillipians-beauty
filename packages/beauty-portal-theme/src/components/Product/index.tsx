import React, { FunctionComponent, useState } from 'react';
import { urlFor } from '../../helpers/imageUrl';
import SocialMenu from '../SocialMenu';
import { PrimaryButton, SecondaryButton } from '../Common/Button';
import BlockContent from '@sanity/block-content-to-react';
import { ReactComponent as ArrowUp } from '../../images/icons/up.svg';
import { blockTypeDefaultSerializers } from '../../helpers/sanity';
import './styles.scss';

const Product: FunctionComponent<ProductInterface> = ({
  product,
  metaInfo,
}) => {
  const { brandInfo } = metaInfo;
  const [accordion, toggleAccordion] = useState(false);

  return (
    <div className="bp-product">
      <div className="bp-container col-container mb20">
        <div className={`col-6 col-xs-12 bp-product_image`}>
          <figure>
            <picture>
              <source
                media="screen and (min-width: 560px)"
                srcSet={`${urlFor(product._rawImage)
                  .width(752)
                  .quality(80)
                  .fit('max')
                  .auto('format')
                  .url()
                  .toString()}`}
              />
              <source
                media="screen and (min-width: 320px)"
                srcSet={`${urlFor(product._rawImage)
                  .width(559)
                  .quality(80)
                  .fit('max')
                  .auto('format')
                  .url()
                  .toString()}`}
              />
              <img
                src={urlFor(product._rawImage)
                  .width(752)
                  .fit('max')
                  .auto('format')
                  .quality(80)
                  .url()}
                alt={product._rawImage.alt}
              />
            </picture>
          </figure>
          {product.tags.length > 0 && (
            <span className="bp-product_category">{product.tags[0].name}</span>
          )}
        </div>
        <div className="col-6 col-xs-12">
          <h1>{product.name}</h1>
          {product.buyNow && (
            <PrimaryButton
              className="mr20"
              lable="Buy Now"
              link={product.buyNow}
            />
          )}
          {product.learnMore && (
            <SecondaryButton
              lable="See the benefits"
              link={product.learnMore}
            />
          )}
          <div className="col-container bp-product_socialWrapper">
            <div className="col-6 col-xs-12">
              <BlockContent
                blocks={product._rawMarketingDescription}
                serializers={blockTypeDefaultSerializers}
              />
              {product.tags.length > 0 && (
                <>
                  <p className="">Best for:</p>
                  <span>
                    {product.tags.map(tag => (
                      <span className="mr20">{tag.name}</span>
                    ))}
                  </span>
                </>
              )}
            </div>
            <div className="col-6 col-xs-12 mb20">
              <BlockContent
                blocks={product._rawUsageDetails}
                serializers={blockTypeDefaultSerializers}
              />
              <SocialMenu links={brandInfo} popupSocial="" />
            </div>
            {product._rawIngredients && (
              <div className="bp-product_accordion">
                <button
                  type="button"
                  className="bp-product_accordion_header"
                  onClick={() => toggleAccordion(!accordion)}
                >
                  <span>What it's made of</span>
                  <ArrowUp
                    className={
                      accordion
                        ? 'bp-product_accordion_header_up'
                        : 'bp-product_accordion_header_down'
                    }
                  />
                </button>
                <div
                  className={
                    accordion
                      ? 'bp-product_accordion_contentExpand'
                      : `bp-product_accordion_contentCollapse`
                  }
                >
                  <BlockContent
                    blocks={product._rawIngredients}
                    serializers={blockTypeDefaultSerializers}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProductInterface {
  metaInfo: any;
  product: any;
}
export default Product;
