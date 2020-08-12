import { graphql } from 'gatsby';

export const query1 = graphql`
  fragment HowToFieldsFull on SanityHowToArticle {
    _type
    headline
    publishedAt(formatString: "MMMM D, YYYY")
    _createdAt(formatString: "MMMM D, YYYY")
    _updatedAt(formatString: "MMMM D, YYYY")
    skillLevel
    subheading
    time
    path
    slug {
      current
    }
    id
    heroImage {
      crop {
        _type
        bottom
        left
        right
        top
        _key
      }
      hotspot {
        _key
        _type
        height
        width
        x
        y
      }
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
    }
    heroVideo {
      url
      youTubeCaption
      heroImage {
        alt
      }
    }
    _rawHeroImage(resolveReferences: { maxDepth: 10 })
    _rawHeroVideo(resolveReferences: { maxDepth: 10 })
    _rawProductList(resolveReferences: { maxDepth: 10 })
    _rawHowTobody(resolveReferences: { maxDepth: 10 })
    productList {
      buyNow
      smartProductID
      tagLine
      name
      slug {
        current
      }
      path
      image {
        asset {
          url
          fluid(maxWidth: 140, maxHeight: 140) {
            aspectRatio
            base64
            sizes
            src
            srcSet
            srcSetWebp
            srcWebp
          }
        }
      }
    }
    seo {
      metaDescription
      metaKeywords
      metaTitle
    }
    tags {
      name
      id
      tagCategory {
        name
        id
      }
    }
    toolList {
      name
      image {
        asset {
          url
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
      }
    }
    tags {
      name
    }
    author {
      name
      path
      slug {
        current
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
  fragment HowToFieldsTile on SanityHowToArticle {
    headline
    publishedAt(formatString: "MMMM D, YYYY")
    skillLevel
    subheading
    time
    path
    slug {
      current
    }
    id
    heroVideo {
      url
      youTubeCaption
      heroImage {
        alt
      }
    }
    _rawHeroImage(resolveReferences: { maxDepth: 10 })
    heroImage {
      alt
      asset {
        url
      }
    }
    _type
  }
`;
