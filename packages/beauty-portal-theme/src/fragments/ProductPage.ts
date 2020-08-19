import { graphql } from 'gatsby';

export const query1 = graphql`
  fragment ProductFieldsFull on SanityProduct {
    brand {
      name
    }
    _rawImage(resolveReferences: { maxDepth: 10 })
    _rawIngredients(resolveReferences: { maxDepth: 10 })
    _rawMarketingDescription(resolveReferences: { maxDepth: 10 })
    _rawUsageDetails(resolveReferences: { maxDepth: 10 })
    buyNow
    learnMore
    name
    tags {
      name
      tagCategory {
        name
      }
    }
    seo {
      metaDescription
      metaKeywords
      metaTitle
    }
    name
    tagLine
    tags {
      name
      tagCategory {
        name
      }
    }
  }
`;

export const query2 = graphql`
  fragment ProductFieldsTile on SanityProduct {
    id
    name
    _rawImage(resolveReferences: { maxDepth: 10 })
    slug {
      current
    }
    image {
      alt
    }
    path
  }
`;
