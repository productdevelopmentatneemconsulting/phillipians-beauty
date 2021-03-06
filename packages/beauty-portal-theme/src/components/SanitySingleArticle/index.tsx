import React, { FunctionComponent } from 'react';
import { SanitySingleArticleInterface } from './models';

import ImageBlock from '../ImageBlock';

const SingleArticle: FunctionComponent<SanitySingleArticleInterface> = ({
  name,
  article,
  imageBlockType,
}) => {
  console.log(name, article, imageBlockType);
  return (
    <ImageBlock
      type={'article'}
      _rawImage={article._rawHeroImage}
      _rawTextBlockBody={article.subheading}
      name={article.headline}
      imageBlockType={imageBlockType}
      url={article.path}
    />
  );
};

export default SingleArticle;
