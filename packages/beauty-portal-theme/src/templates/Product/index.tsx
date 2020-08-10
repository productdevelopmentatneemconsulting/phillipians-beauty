import React from 'react';
import { graphql } from 'gatsby';

import OGTags from '../../components/OGTags';
import Breadcrumb from '../../components/Breadcrumb';
import ImageBlock from '../../components/ImageBlock';
import Product from '../../components/Product';
import SanityArticleSlider from '../../components/SanityArticleSlider';
import Tags from '../../components/Tags';
import SEO from '../../components/Seo';
import Layout from '../../components/Layout';
import SanityProductSlider from 'src/components/SanityProductSlider';

const ProductPage = (props: ProductPageProps) => {
  const {
    data: {
      page,
      products: { nodes: productNodes },
      articles: { nodes: articlesList },
      brandInfo,
      imageBlock,
    },
  } = props;

  page.seo = page.seo || {};
  return (
    <Layout>
      <SEO
        lang={'tl-ph'}
        title={page.seo.metaTitle}
        description={page.seo.metaDescription}
        keywords={page.seo.metaKeywords}
      />
      <OGTags type={'page'} slug={page.path} data={page} />
      {page.path !== '/' && <Breadcrumb pageTitle={page.name} />}
      <Product product={page} metaInfo={{ brandInfo }} />
      {productNodes.length && (
        <SanityProductSlider
          slides={productNodes}
          headline="Products You Might Also Like"
          name=""
        />
      )}
      {imageBlock && (
        <ImageBlock
          name={imageBlock.name}
          _rawImage={imageBlock._rawImage}
          _rawTextBlockBody={imageBlock._rawTextBlockBody}
          url={imageBlock.url}
          imageBlockType={imageBlock.imageBlockType}
        />
      )}
      {articlesList.length > 0 && (
        <SanityArticleSlider
          name="articles"
          slides={articlesList}
          headline="Our Tips & Advice"
          slideType={{ name: 'tile' }}
          searchTags={page.tags}
          searchCtaLabel="See All Articles"
        />
      )}
      {page.tags.length && (
        <div className="bp-container">
          <Tags title="Find something else" data={page.tags} />
        </div>
      )}
    </Layout>
  );
};

export default ProductPage;

export const query = graphql`
  query($slug: String!, $tags: [String!]) {
    products: allSanityProduct(
      filter: {
        tags: { elemMatch: { name: { in: $tags } } }
        id: { nin: [$slug] }
      }
    ) {
      nodes {
        ...ProductFieldsTile
      }
    }

    page: sanityProduct(id: { eq: $slug }) {
      ...ProductFieldsFull
      tags {
        name
        tagCategory {
          name
        }
      }
    }
    articles: allSanityHowToArticle(
      filter: {
        tags: { elemMatch: { name: { in: $tags } } }
        id: { nin: [$slug] }
      }
      limit: 10
      sort: { fields: _createdAt, order: DESC }
    ) {
      nodes {
        ...HowToFieldsTile
      }
    }
    tags: allSanityTag(limit: 6) {
      nodes {
        id
        tagCategory {
          id
          name
        }
        name
      }
    }
    imageBlock: sanityImageBlock {
      id
      name
      _rawImage(resolveReferences: { maxDepth: 10 })
      image {
        asset {
          fluid {
            base64
            aspectRatio
            src
            srcSet
            srcWebp
            srcSetWebp
            sizes
          }
        }
      }
      _rawTextBlockBody
      url
      imageBlockType {
        id
        name
      }
    }
    brandInfo: sanityBrandInfo {
      pinteresturl
      twitterurl
      youtubeurl
      facebookurl
      instaurl
    }
  }
`;

interface ProductPageProps {
  data: {
    page: any;
    products: any;
    articles: any;
    brandInfo: any;
    imageBlock: any;
  };
  pageContext: {
    slug: string;
    title: string;
  };
}
