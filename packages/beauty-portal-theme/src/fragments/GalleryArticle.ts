import { graphql } from 'gatsby';

export const query1 = graphql`
  fragment GalleryFieldsFull on SanityGalleryArticle {
    headline
    publishedAt(formatString: "MMMM D, YYYY")
    _createdAt(formatString: "MMMM D, YYYY")
    _updatedAt(formatString: "MMMM D, YYYY")
    subheading
    path
    slug {
      current
    }
    id
    author {
      name
      path
      slug {
        current
      }
    }
    _type
    _rawBody(resolveReferences: { maxDepth: 10 })
    _rawHeroImage(resolveReferences: { maxDepth: 10 })
    _rawImageGallery(resolveReferences: { maxDepth: 10 })
    heroImage {
      asset {
        url
        metadata {
          dimensions {
            height
            width
          }
        }
      }
    }
    tags {
      name
      id
      tagCategory {
        name
        id
      }
    }
    seo {
      metaDescription
      metaKeywords
      metaTitle
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
  fragment GalleryFieldsTile on SanityGalleryArticle {
    headline
    publishedAt(formatString: "MMMM D, YYYY")
    subheading
    path
    slug {
      current
    }
    id
    _rawHeroImage(resolveReferences: { maxDepth: 10 })
    heroImage {
      alt
      asset {
        label
        title
        url
      }
    }
    _type
  }
`;
