const path = require('path');
const { getPagePath } = require('../utils');
const _ = require('lodash');
const component = path.resolve(
  process.cwd(),
  `../beauty-portal-theme/src/templates/TagPage/index.tsx`
);

module.exports = async ({ graphql, createPage }) => {
  const result = await graphql(`{
    navBar: sanityNavBar(name: {eq: "Header"}) {
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
  }
`);
  const { navBar,tags } = result.data;
  const tagsPages=[];
  navBar.navItems.forEach(({navL1, navCategory}) =>{
    navCategory.forEach( ({name}) =>{
      tags.edges.forEach( ({ node }) => {
        if((node.tagCategory.name === name) && (node.title || node.description) ){
          const slug = `${_.kebabCase(navL1.name)}/${_.kebabCase(node.tagCategory.name)}/${_.kebabCase(node.name)}`;
          tagsPages.push({
            title:node.name,
            slug: {
              current: slug
            },
            categoryName: node.tagCategory.name
          })
        }
      })
    })
  })
  tagsPages.forEach(tag => {
    createPage({
      path: getPagePath(tag),
      component,
      context: {
        title: tag.title,
        slug: tag.slug.current,
        id: tag.slug.current,
        categoryName: tag.categoryName
      },
    });
  })
};
