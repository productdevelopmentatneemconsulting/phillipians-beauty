import React from 'react';
import { graphql } from 'gatsby';

import OGTags from '../../components/OGTags';
import Breadcrumb from '../../components/Breadcrumb';
import ImageBlock from '../../components/ImageBlock';
import ProductDetails from '../../components/ProductDetail';
import SanityArticleSlider from '../../components/SanityArticleSlider';
import Tags from '../../components/Tags';
import SEO from '../../components/Seo';
import Layout from '../../components/Layout';
import SingleArticle from '../../components/SanitySingleArticle';
import SanityProductSlider from 'src/components/SanityProductSlider';

const ProductPage = (props: ProductPageProps) => {
  const {
    data: {
      page,
      products: { nodes: productNodes },
      articles: { nodes: articlesList },
      brandInfo,
      articleBlock,
    },
  } = props;
  console.log('page', page);
  page.seo = page.seo || {};
  return (
    <Layout>
      <SEO
        lang={'tl-ph'}
        title={page.name}
        description={page.seo.metaDescription}
        keywords={page.seo.metaKeywords}
      />
      <OGTags type={'page'} slug={page.path} data={page} />
      {page.path !== '/' && (
        <Breadcrumb parentPageTitle={page.parentPage} pageTitle={page.name} />
      )}
      <ProductDetails product={page} metaInfo={{ brandInfo }} />
      {productNodes.length && (
        <SanityProductSlider
          slides={productNodes}
          name=""
          headline="Products You Might Also Like"
          searchCtaLabel="See All"
          searchTags={page.tags}
        />
      )}
      {articleBlock && <SingleArticle {...articleBlock} />}
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
      path
      parentPage {
        name
        path
      }
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
    articleBlock: sanitySingleArticleBlock {
      id
      name
      article {
        ...GalleryFieldsFull
        ...HowToFieldsFull
        ...FeatureFieldsFull
      }
      imageBlockType {
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
    articleBlock: any;
  };
  pageContext: {
    slug: string;
    title: string;
  };
}
