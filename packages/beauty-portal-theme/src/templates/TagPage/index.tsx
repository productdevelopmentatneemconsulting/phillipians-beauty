import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../../components/Seo';
import Layout from '../../components/Layout';
import PageSchema from '../../components/PageSchema';
import OGTags from '../../components/OGTags';
import Breadcrumb from '../../components/Breadcrumb';
import Search from '../../search'
import './styles.scss';
import Tags from '../../components/Tags';
import SanityArticleSlider from '../../components/SanityArticleSlider';


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
  const {
    data: {
      galleryArticles: { nodes: galleryNodes },
      featureArticles: { nodes: featureNodes },
      howToArticles: { nodes: howToNodes },
      remainingTags
    }
  } = props;
  const relatedArticles = [...galleryNodes, ...featureNodes, ...howToNodes];
  return (
    <section className="tag-container">
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
        {relatedArticles.length > 0 && (
          <SanityArticleSlider
            name="articles"
            slides={relatedArticles}
            headline="Our Tips & Advice"
            slideType={{ name: 'editor' }}
          />
        )}
        </div>
      </div>
       <Search
        indices={searchIndices}
        slug={slug}
        hideSearchFilter={true}
      />
      {
        (remainingTags.nodes && remainingTags.nodes.length) ? (
          <div className="bp-container">
            <Tags title="Find something else" data={remainingTags.nodes} />
          </div>
        ) : (<></>)
      }
    </section>
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
        title
      }
    }
  }
  remainingTags: allSanityTag(filter: {name: {ne: $title}, tagCategory: {name: {eq: $categoryName}}}) {
    nodes {
      id
      tagCategory {
        id
        name
      }
      name
    }
  }
  galleryArticles: allSanityGalleryArticle(filter: {tags: {elemMatch: {name: {eq: $title}}}}, limit: 10, sort: {fields: _createdAt, order: DESC}) {
    nodes{
      ...GalleryFieldsTile
    }
  }
  howToArticles: allSanityHowToArticle(filter: {tags: {elemMatch: {name: {eq: $title}}}}, limit: 10, sort: {fields: _createdAt, order: DESC}) {
    nodes{
      ...HowToFieldsTile
    }
  }
  featureArticles: allSanityFeatureArticle(filter: {tags: {elemMatch: {name: {eq: $title}}}}, limit: 10, sort: {fields: _createdAt, order: DESC}) {
    nodes {
      ...FeatureFieldsTile
    }
  }
  brandInfo: sanityBrandInfo {
    pinteresturl
    twitterurl
    youtubeurl
    facebookurl
    instaurl
  }
  genericLabels: sanityGlobalLabels {
    play
  }
  sectionTitles: sanityHowToTemplate {
    name
    nextRead
    productName
    relatedArticlesName
    relatedTopicsName
    toolName
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
