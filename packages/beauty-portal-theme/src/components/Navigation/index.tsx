import React, { FunctionComponent, useState } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import _ from 'lodash';
import getType from '../../helpers/getType';
import { getSearchUrl } from '../../helpers/searchUrl';
import './styles.scss';

const SiteNavigation: FunctionComponent = searchResultPath => {
  const data = useStaticQuery(graphql`
    query siteNavigation {
      sanityNavBar(name: { eq: "Header" }) {
        navItems {
          navL1 {
            landingPage {
              name
              path
              slug {
                current
              }
            }
            name
            path
          }
          navCategory {
            name
          }
          article {
            ... on SanityFeatureArticle {
              _type
              id
              headline
              subheading
              _rawHeroImage(resolveReferences: { maxDepth: 10 })
              heroImage {
                asset {
                  url
                  fluid {
                    base64
                  }
                }
                alt
              }
              heroVideo {
                url
                youTubeCaption
              }
              path
              slug {
                current
              }
            }
            ... on SanityGalleryArticle {
              _type
              id
              headline
              subheading
              _rawHeroImage(resolveReferences: { maxDepth: 10 })
              heroImage {
                asset {
                  url
                  fluid {
                    base64
                  }
                }
                alt
              }
              path
              slug {
                current
              }
            }
            ... on SanityHowToArticle {
              _type
              id
              headline
              subheading
              _rawHeroImage(resolveReferences: { maxDepth: 10 })
              heroImage {
                asset {
                  url
                  fluid {
                    base64
                  }
                }
                alt
              }
              heroVideo {
                url
                youTubeCaption
              }
              path
              slug {
                current
              }
            }
          }
        }
      }
      tags: allSanityTag {
        edges {
          node {
            name
            tagCategory {
              name
            }
            title
            description
          }
        }
      }
      pages: allSanityLandingPage {
        nodes {
          slug {
            current
          }
          name
        }
      }
    }
  `);

  const [activeNav, setActiveNav] = useState(false);
  const handleNav = event => {
    event.currentTarget.classList.toggle('is-active');
    setActiveNav(!activeNav);
  };

  const {
    tags: { edges },
  } = data;
  const tags = edges.map(tag => tag.node); // the variable you want to filter for

  return (
    <React.Fragment>
      <div className="primary-navbar">
        <nav role="navigation" aria-label="Main Navigation">
          <a
            href="javascript:void(0);"
            className="mobile-menu-trigger"
            onClick={handleNav}
          >
            <span className="srOnly">Toggle Navigation</span>
            <div aria-hidden="true" className="bp-nav_toggle-icon">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </a>
          <ul
            className={'menu menu-bar ' + (activeNav ? 'is-active' : null)}
            aria-label="submenu"
            id="nav"
          >
            {data.sanityNavBar.navItems.map(
              (navItem: {
                navL1: NavItemInterfaceV1;
                navCategory: [NavItemInterfaceV1];
                article: NavItemInterfaceV1;
              }) => {
                const getUrl = (navItem: NavItemInterfaceV1) => {
                  let url;
                  if (navItem.path) {
                    url = navItem.path;
                  } else if (navItem.landingPage) {
                    url = navItem.landingPage.path;
                  } else {
                    url = '#';
                  }

                  return url;
                };
                return (
                  <>
                    <li>
                      <Link
                        to={
                          navItem.navCategory.length
                            ? '#'
                            : getUrl(navItem.navL1)
                        }
                        className="menu-link menu-bar-link"
                        aria-haspopup={
                          navItem.navCategory.length ? 'true' : 'false'
                        }
                      >
                        {navItem.navL1.name}
                      </Link>
                      {navItem.navCategory.length ? (
                        <ul className="mega-menu mega-menu--flat">
                          <li>
                            <Link
                              to={getUrl(navItem.navL1)}
                              className="menu-link mega-menu-link mega-menu-header see-all"
                            >
                              See all {navItem.navL1.name}
                            </Link>
                          </li>
                          {navItem.navCategory.map((tagCategory: any) => (
                            <li>
                              <Link
                                to="/"
                                className="menu-link mega-menu-link mega-menu-header"
                              >
                                {tagCategory.name}
                              </Link>
                              {tags.length &&
                                tags
                                  .filter(
                                    (tag: any) =>
                                      tag.tagCategory.name == tagCategory.name
                                  )
                                  .slice(0, 4)
                                  .map((subCategory: any) => {
                                    console.log('subCategory', subCategory);
                                    return (
                                      <ul className="menu menu-list">
                                        <li key={subCategory.name}>
                                          {
                                            (subCategory.title || subCategory.description)  ? 
                                            (<Link to={`/${_.kebabCase(navItem.navL1.name)}/${_.kebabCase(tagCategory.name)}/${_.kebabCase(subCategory.name)}?tag=${subCategory.name}`} className="menu-link menu-list-link">
                                               {subCategory.name &&
                                                subCategory.name}
                                            </Link>)
                                            : 
                                            (<a
                                              href={getSearchUrl(
                                                '/search-results',
                                                subCategory.name,
                                                'tag'
                                              )}
                                              className="menu-link menu-list-link"
                                            >
                                              {subCategory.name &&
                                                subCategory.name}
                                            </a>)
                                          }
                                        </li>
                                      </ul>
                                    );
                                  })}
                            </li>
                          ))}
                          <li>
                            <Link
                              to={navItem.article.path}
                              className="menu-link mega-menu-link mega-menu-header"
                            >
                              Trending
                            </Link>
                            <ul className="menu menu-list">
                              <div className="menu-list-article-card">
                                <Link to={navItem.article.path}>
                                  <div className="menu-list-article-card-item">
                                    {navItem.article.heroImage && (
                                      <div className="menu-list-article-card-image">
                                        <picture
                                          className="bp-image__placeholder"
                                          style={{
                                            paddingTop: '100%',
                                            background: `url(${navItem.article.heroImage.asset.fluid.base64})`,
                                            backgroundSize: 'cover',
                                          }}
                                        >
                                          <source
                                            media="(max-width: 799px)"
                                            srcSet={`${navItem.article.heroImage.asset.url}?q=80&w=350&h=350&fit=crop&auto=format`}
                                          />
                                          <source
                                            media="(min-width: 800px)"
                                            srcSet={`${navItem.article.heroImage.asset.url}?q=80&w=176&h=176&fit=crop&auto=format`}
                                          />
                                          <img
                                            src={`${navItem.article.heroImage.asset.url}?q=80&w=200&h=200&fit=crop&auto=format`}
                                            loading="lazy"
                                            alt={navItem.article.heroImage.alt}
                                          />
                                        </picture>
                                      </div>
                                    )}
                                    <div className="menu-list-article-card-info">
                                      {navItem.article._type && (
                                        <span className="menu-list-article-type">
                                          {navItem.article.heroVideo
                                            ? 'Video'
                                            : getType(navItem.article._type)}
                                        </span>
                                      )}
                                      <h3 className="menu-list-article-description">
                                        <span>{navItem.article.headline}</span>
                                      </h3>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </ul>
                          </li>
                          <li className="mobile-menu-back-item">
                            <a
                              rel="nofollow"
                              href="javascript:void(0);"
                              className="menu-link mobile-menu-back-link"
                            >
                              Back
                            </a>
                          </li>
                        </ul>
                      ) : null}
                    </li>
                  </>
                );
              }
            )}
            <li className="mobile-menu-header">
              <a href="/" className="menu-link menu-bar-link">
                <span>Home</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
};

interface NavItemInterfaceV1 {
  _type: string;
  name: string;
  path: string;
  headline: string;
  heroImage: any;
  heroVideo: any;
  article: any;
  landingPage?: {
    name: string;
    path: string;
    slug: {
      current: string;
    };
  };
}
export default SiteNavigation;
