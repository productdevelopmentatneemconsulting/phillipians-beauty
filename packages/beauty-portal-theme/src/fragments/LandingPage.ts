import { graphql } from 'gatsby';

export const query = graphql`
  fragment LandingPageFieldsFull on SanityLandingPage {
    id
    name
    path
    slug {
      current
    }
    headline
    _rawIntroduction(resolveReferences: { maxDepth: 10 })
    landingSections {
      ... on SanityArticleSlider {
        id
        name
        headline
        searchCtaLabel
        searchTags {
          name
          tagCategory {
            name
          }
        }
        slides {
          ... on SanityFeatureArticle {
            _type
            id
            headline
            subheading
            _rawHeroImage(resolveReferences: { maxDepth: 10 })
            heroImage {
              asset {
                url
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
            _rawHeroImage(resolveReferences: { maxDepth: 10 })
            heroImage {
              asset {
                url
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
            _rawHeroImage(resolveReferences: { maxDepth: 10 })
            heroImage {
              asset {
                url
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
        slideType {
          description
          name
        }
      }
      ... on SanityNewsletterBlock {
        id
        _type
        name
        ctaLabel
        headline
        _rawBody(resolveReferences: { maxDepth: 10 })
        _rawImage(resolveReferences: { maxDepth: 10 })
        campaignID
        type {
          name
          description
        }
      }
      ... on SanityProductSlider {
        id
        name
        headline
        searchCtaLabel
        searchTags {
          name
        }
        slides {
          _type
          name
          _rawImage(resolveReferences: { maxDepth: 10 })
          image {
            asset {
              source {
                url
              }
              fluid {
                aspectRatio
                base64
                sizes
                src
                srcSet
                srcSetWebp
                srcWebp
              }
            }
            alt
          }
          brand {
            name
          }
          path
          slug {
            current
          }
        }
        slideType {
          description
          name
        }
      }
      ... on SanityAuthorSlider {
        id
        name
        headline
        description
        slideType {
          name
        }
        slides {
          _type
          name
          _rawBio(resolveReferences: { maxDepth: 10 })
          image {
            asset {
              url
            }
            alt
          }
          _rawImage(resolveReferences: { maxDepth: 10 })
          path
          slug {
            current
          }
        }
        searchCtaLabel
        searchTags {
          tagCategory {
            name
          }
        }
      }
      ... on SanityTextBlock {
        id
        name
        _rawTextBlockBody(resolveReferences: { maxDepth: 10 })
        textBlockType {
          name
        }
      }
      ... on SanitySingleArticleBlock {
        id
        name
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
        imageBlockType {
          name
        }
      }
      ... on SanityTextBlock {
        id
        name
        _rawTextBlockBody(resolveReferences: { maxDepth: 10 })
        textBlockType {
          name
        }
      }
      ... on SanitySearchBlock {
        id
        name
        algoliaIndexName {
          name
          title
          hitComp
        }
        _type
      }
      ... on SanityVideoBlock {
        id
        name
        _rawTextBlockBody(resolveReferences: { maxDepth: 10 })
        videoBlock {
          _type
          url
          youTubeCaption
        }
        _type
      }
      ... on SanityImageBlock {
        id
        name
        _rawImage(resolveReferences: { maxDepth: 10 })
        _rawTextBlockBody(resolveReferences: { maxDepth: 10 })
        url
        imageBlockType {
          name
        }
      }
      ... on SanityTaxonomyBlock {
        id
        title: name
        tags: taxonomyTags {
          ... on SanityTag {
            id
            name
          }
        }
      }
      ... on SanityAccordionBlock {
        id
        name
        _rawTextBlockBody
      }
    }
  }
`;
