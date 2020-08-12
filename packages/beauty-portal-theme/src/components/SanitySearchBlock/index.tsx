import React, { FunctionComponent } from 'react';
import { SanitySearchBlockInterface } from './models';
import Search from '../../search';

const SanitySearchBlock: FunctionComponent<SanitySearchBlockInterface> = ({
  name,
  algoliaIndexName,
}) => {
  return <Search pageName={name} indices={[algoliaIndexName]} />;
};

export default SanitySearchBlock;
