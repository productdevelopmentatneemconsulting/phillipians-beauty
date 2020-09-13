import React, { FunctionComponent, useState } from 'react';

import BlockContent from '@sanity/block-content-to-react';
import { blockTypeDefaultSerializers } from '../../helpers/sanity';
import { SanityAccordionBlockInterface } from './models';
import { ReactComponent as ArrowUp } from '../../images/icons/up.svg';
import './styles.scss';

const SanityAccordionBlock: FunctionComponent<SanityAccordionBlockInterface> = ({
  name,
  _rawTextBlockBody,
  textBlockBody,
}) => {
  const [accordion, toggleAccordion] = useState(false);

  return (
    <div className="bp-container">
      <section>
        <div className="bp-section bp-accordion">
          <h2>
            <button
              type="button"
              onClick={() => toggleAccordion(!accordion)}
              className="bp-accordion_header bp-section_button"
            >
              <span>{name}</span>
              <ArrowUp
                className={
                  accordion
                    ? 'bp-accordion_header_up'
                    : 'bp-accordion_header_down'
                }
              />
            </button>
          </h2>
          <div
            className={
              accordion
                ? 'bp-accordion_contentExpand'
                : `bp-accordion_contentCollapse`
            }
          >
            <BlockContent
              serializers={blockTypeDefaultSerializers}
              blocks={_rawTextBlockBody ? _rawTextBlockBody : textBlockBody}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SanityAccordionBlock;
