import { graphql } from 'gatsby';

export const query1 = graphql`
  fragment FeatureFieldsFull on SanityFeatureArticle {
    _type
    _rawFeatureBody(resolveReferences: { maxDepth: 10 })
    _rawHeroImage(resolveReferences: { maxDepth: 10 })
    _rawHeroVideo(resolveReferences: { maxDepth: 10 })
    subheading
    path
    slug {
      current
    }
    heroVideo {
      url
      youTubeCaption
      heroImage {
        alt
      }
    }
    heroImage {
      alt
      asset {
        label
        title
        url
        metadata {
          dimensions {
            height
            width
          }
        }
      }
    }
    headline
    seo {
      metaDescription
      metaKeywords
      metaTitle
    }
    author {
      name
      path
      slug {
        current
      }
    }
    id
    publishedAt(formatString: "MMMM D, YYYY")
    _createdAt(formatString: "MMMM D, YYYY")
    _updatedAt(formatString: "MMMM D, YYYY")
    tags {
      name
      tagCategory {
        name
      }
    }
    readnext {
      ... on SanityGalleryArticle {
        headline
        path
        slug {
          current
        }
        _type
        _rawHeroImage(resolveReferences: { maxDepth: 10 })
        heroImage {
          alt
        }
      }
      ... on SanityFeatureArticle {
        headline
        path
        slug {
          current
        }
        _type
        _rawHeroImage(resolveReferences: { maxDepth: 10 })
        heroImage {
          alt
        }
      }
      ... on SanityHowToArticle {
        headline
        path
        slug {
          current
        }
        _type
        _rawHeroImage(resolveReferences: { maxDepth: 10 })
        heroImage {
          alt
        }
      }
    }
  }
`;

export const query2 = graphql`
  fragment FeatureFieldsTile on SanityFeatureArticle {
    headline
    subheading
    path
    slug {
      current
    }
    heroVideo {
      url
      youTubeCaption
      heroImage {
        alt
      }
    }
    _type
    id
    _rawHeroImage(resolveReferences: { maxDepth: 10 })
    heroImage {
      alt
      asset {
        url
      }
    }
  }
`;
