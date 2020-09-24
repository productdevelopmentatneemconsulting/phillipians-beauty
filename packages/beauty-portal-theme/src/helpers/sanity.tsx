import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import Video from '../components/Video';
import Product from '../components/Product';
import { sanityConfig } from '../helpers/sanityConfig';
import RichTextImage from '../components/RichTextImage';
import Steps from '../components/Steps';

import BeforeAndAfter from '../components/BeforeAndAfter';

export const blockTypeDefaultSerializers = {
  types: {
    beforeAfterImage: ({ node }) => {
      return <BeforeAndAfter images={node} />;
    },
    figure: ({ node }) => {
      return <RichTextImage node={node} />;
    },
    step: ({ node }) => {
      return <Steps node={node} />;
    },
    productReference: props => {
      const node = props.node;

      if (!node.product) {
        return null;
      }

      return (
        <Product
          data={node.product}
          metadata={node.product}
          type={node._type}
        />
      );
    },
    // eslint-disable-next-line react/display-name
    youTube: props => {
      return <Video videoMetaData={props} sanityConfig={sanityConfig} />;
    },
    block: props => {
      const { style = 'normal' } = props.node;
      if (style === 'blockquote') {
        return (
          <blockquote>
            <p>
              {props.children.map(element => {
                return <span key={element}>{element}</span>;
              })}
            </p>
          </blockquote>
        );
      }

      // Fall back to default handling
      return BlockContent.defaultSerializers.types.block(props);
    },
  },
};
