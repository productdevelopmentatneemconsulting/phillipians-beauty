import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout';
import OGTags from '../../components/OGTags';
import Breadcrumb from '../../components/Breadcrumb';
import SEO from '../../components/Seo';
import Search from '../../search';
import BlockContent from '@sanity/block-content-to-react';
import { blockTypeDefaultSerializers } from '../../helpers/sanity';
import './styles.scss';

const searchIndices = [
  { name: `howtoArticle`, title: `howtoArticle`, hitComp: `Hit` },
];

const AuthorPage = (props: AuthorPageProps) => {
  const { data } = props;
  const { name, slug, parentPage, _rawBio, image } = data.page.nodes[0];

  return (
    <Layout>
      <SEO lang={'tl-ph'} title={name} description={name} keywords={[' ']} />
      <OGTags type={'page'} slug={slug} data={data.page} />
      {slug !== '/' && (
        <Breadcrumb parentPageTitle={parentPage} pageTitle={name} />
      )}
      <div className="_editor-header">
        <div className="wrap">
          <h1 className="page-title">Meet the Editor </h1>
          <div className="img-editor mx-auto">
            <div className="img-wrapper rounded-circle overflow-hidden d-inline-block">
              <picture>
                <source
                  srcSet={`${image.asset.url}?w=200&h=200&auto=format 1x, ${image.asset.url}?w=200&h=200&auto=format&dpr=2 2x`}
                  media="screen and (min-width: 767px)"
                />
                <img
                  src={`${image.asset.url}?w=200&h=200&auto=format`}
                  alt={image.alt}
                />
              </picture>
            </div>
            <h2 className="name">{name} </h2>
            <p className="bio">
              <BlockContent
                blocks={_rawBio}
                serializers={blockTypeDefaultSerializers}
              />
            </p>
          </div>
        </div>
      </div>
      <Search
        authors="true"
        indices={searchIndices}
        slug={slug.current}
        authorName={name}
      />
    </Layout>
  );
};

export default AuthorPage;

export const query = graphql`
  query($slug: String!) {
    page: allSanityAuthor(filter: { slug: { current: { eq: $slug } } }) {
      nodes {
        id
        name
        image {
          asset {
            fluid {
              src
              aspectRatio
              srcWebp
              sizes
              base64
              srcSetWebp
              srcSet
            }
            url
          }
          alt
        }
        path
        slug {
          current
        }
        parentPage {
          name
          path
        }
        _rawBio(resolveReferences: { maxDepth: 10 })
      }
    }
  }
`;

interface AuthorPageProps {
  data: any;
  authors: any;
}
