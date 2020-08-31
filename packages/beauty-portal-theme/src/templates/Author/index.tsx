import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout';
import OGTags from '../../components/OGTags';
import Breadcrumb from '../../components/Breadcrumb';
import SEO from '../../components/Seo';
import Search from '../../search';
import BlockContent from '@sanity/block-content-to-react';
import { blockTypeDefaultSerializers } from '../../helpers/sanity';
import { useInView } from 'react-intersection-observer';
import { urlFor } from '../../helpers/imageUrl';
import './styles.scss';

const searchIndices = [
  { name: `howtoArticle`, title: `howtoArticle`, hitComp: `Hit` },
];

const AuthorPage = (props: AuthorPageProps) => {
  const { data } = props;
  console.log('data', data);
  const { name, slug, parentPage, _rawBio, image } = data.page.nodes[0];

  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '5px 0px',
  });

  return (
    <Layout>
      <SEO lang={'tl-ph'} title={name} description={name} keywords={[' ']} />
      <OGTags type={'page'} slug={slug} data={data.page} />
      {slug !== '/' && (
        <Breadcrumb parentPageTitle={parentPage} pageTitle={name} />
      )}
      <header>
        <div className="bp-container">
          <div className="_editor-header">
            <div className="wrap">
              <h1 className="page-title">Meet the Editor </h1>
              <div className="img-editor mx-auto">
                <div
                  className="img-wrapper rounded-circle overflow-hidden d-inline-block"
                  ref={ref}
                  data-inview={inView}
                >
                  <figure>
                    {inView ? (
                      <picture
                        className="bp-image__placeholder"
                        style={{
                          paddingTop: '100%',
                          background: `url(${image.asset.fluid.base64})`,
                          backgroundSize: 'cover',
                        }}
                      >
                        <source
                          media="screen and (min-width: 560px)"
                          srcSet={`${urlFor(image.asset.url)
                            .width(175)
                            .height(175)
                            .fit('max')
                            .auto('format')
                            .url()
                            .toString()}`}
                        />
                        <source
                          media="screen and (min-width: 320px)"
                          srcSet={`${urlFor(image.asset.url)
                            .width(175)
                            .height(175)
                            .fit('max')
                            .auto('format')
                            .url()
                            .toString()}`}
                        />
                        <img
                          className="bp-slider_image"
                          src={urlFor(image.asset.url)
                            .width(200)
                            .height(200)
                            .fit('max')
                            .url()}
                          alt={image.alt}
                        />
                      </picture>
                    ) : null}
                  </figure>
                </div>
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
      </header>
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
