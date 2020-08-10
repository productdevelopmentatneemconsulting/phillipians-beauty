import React, { FunctionComponent } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import SocialMenu from '../SocialMenu';
import classNames from 'classnames';
import BlockContent from '@sanity/block-content-to-react';
import { blockTypeDefaultSerializers } from '../../helpers/sanity';
import { SanityTextBlockInterface } from './models';
import './styles.scss';

const SanityTextBlock: FunctionComponent<SanityTextBlockInterface> = ({
  name,
  _rawTextBlockBody,
  textBlockType,
}) => {
  const data = useStaticQuery(graphql`
    query aboutSocialLinks {
      brandInfo: sanityBrandInfo {
        pinteresturl
        twitterurl
        youtubeurl
        facebookurl
        instaurl
      }
    }
  `);

  const getComponentvariant = type => {
    return type
      .replace(/\s/g, '')
      .trim()
      .toLowerCase();
  };
  return (
    <section
      className={classNames(
        'bp-textBlock',
        getComponentvariant(textBlockType.name) === 'textblock-type1'
          ? 'typea'
          : 'textblock-type2'
          ? 'typeb'
          : null
      )}
    >
      <div className="bp-container">
        <h1>{name}</h1>
        <div
          className={
            getComponentvariant(textBlockType.name) === 'textblock-type2'
              ? 'bp-aboutContainer'
              : ''
          }
        >
          <div className="bp-textBlock_desc">
            <BlockContent
              serializers={blockTypeDefaultSerializers}
              blocks={_rawTextBlockBody}
            />
          </div>

          {getComponentvariant(textBlockType.name) === 'textblock-type2' && (
            <div className="bp-sectionFollow">
              <div className="bp-sectionFollowBlock">
                <h3>Follow us</h3>
                {data && <SocialMenu links={data.brandInfo} />}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SanityTextBlock;
