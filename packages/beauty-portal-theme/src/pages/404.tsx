import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/Seo';
import Layout from '../components/Layout';
import '../styles/notFound.scss';

export const query = graphql`
  query NotFoundPageQuery {
    site: sanityBrandInfo {
      title
      description
      keywords
    }
  }
`;

const browser = typeof window !== 'undefined' && window;

const NotFound = ({ data: { site } }: NotFoundProps) => {
  console.log('site', site);
  return (
    browser && (
      <Layout>
        <SEO
          lang={'en-us'}
          title={site.title}
          description={site.description}
          keywords={site.keywords}
        />
        <div className="bp-container">
          <div className="bp-notFound">
            <p className="bp-notFound_title">404</p>
            <p className="bp-notFound_subTitle">That’s an error!</p>
            <p>
              404 Unfortunately, there is no such page on the site. Let us know
              what you are looking for and we will answer.
            </p>
          </div>
        </div>
      </Layout>
    )
  );
};

export default NotFound;

interface NotFoundProps {
  data: {
    site: any;
  };
}
