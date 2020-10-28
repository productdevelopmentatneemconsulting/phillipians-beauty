import React from 'react';
import { graphql } from 'gatsby';
import BlockContent from '@sanity/block-content-to-react';
import SEO from '../../components/Seo';
import Layout from '../../components/Layout';
import LandingSectionRenderer from '../../components/LandingSectionRenderer';
import PageSchema from '../../components/PageSchema';
import OGTags from '../../components/OGTags';
import Breadcrumb from '../../components/Breadcrumb';
import { blockTypeDefaultSerializers } from '../../helpers/sanity';
import Search from '../../search'
import './styles.scss';
import SiteMap from '../../components/SiteMap';

const searchIndices = [
  { name: `howtoArticle`, title: `howtoArticle`, hitComp: `Hit` },
];

const TagPage = (props: TagpageProps) => {
  let page = {
    name: props.pathContext.slug
  };
  page.seo = page.seo || {};
  
  const getLayoutClassName = type => {
    return type.replace(/\s/g, '-').toLowerCase();
  };
  return (
    <Layout className={getLayoutClassName(page.name)}>
      <SEO
        lang={'en-us'}
        title={page.name}
        description={page.seo.metaDescription}
        keywords={[]}
      />
      <PageSchema
        type={'WebPage'}
        name={page.name}
        description={page.name}
        slug={page.path}
        data={page}
      />
      <OGTags type={'page'} slug={page.path} data={page} />
      {page.path !== '/' && (
        <Breadcrumb parentPageTitle="" pageTitle={page.name} />
      )}
      <TagPageComponent {...props} />
    </Layout>
  );
};

export const TagPageComponent = (props: { page: any }) => {
  const { slug } = props;
  const tagData = props.data.tags.edges[0].node;
  return (
    <>
      <div className="bp-container">
        <div className="tagCategorySection">
          <div className="wrap">
            <h1>{tagData.title || tagData.name}</h1>
            {
              tagData.description && (
                <p>
                  {
                    tagData.description
                  }
                </p>
              )
            }
          </div>
        </div>
      </div>
      <Search
        indices={searchIndices}
        slug={slug}
      />
      {/* {page.landingSections.map((section, index) => (
        <LandingSectionRenderer
          key={section.id}
          section={section}
          preferPerformance={index <= 1}
        />
      ))} */}
    </>
  );
};

export default TagPage;

export const query = graphql`query MyQuery($title: String, $categoryName: String) {
  tags: allSanityTag(filter: {name: {eq: $title}, tagCategory: {name: {eq: $categoryName}}}) {
    edges {
      node {
        name
        tagCategory {
          name
        }
        description
      }
    }
  }
}
`;

interface TagpageProps {
  data: {
    tags: any;
  };
  pageContext: {
    id: string;
    slug: string;
    title: string;
  };
}
