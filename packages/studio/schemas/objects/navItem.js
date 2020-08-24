export default {
  title: 'Navigation Item',
  name: 'navItem',
  type: 'object',
  fields: [
    {
      name: 'navL1',
      type: 'navLink',
      title: 'Primary Navigation'
    },
    // {
    //   name: 'navL2',
    //   title: 'Secondary Navigation',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'navLink'
    //     }
    //   ]
    // },
    {
      name: 'navCategory',
      title: 'Secondary Navigation',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {
            type: 'tagCategory'
          }
        }
      ]
    },
    {
      name: 'article',
      title: 'Related Article',
      type: 'reference',
      to: [
        {
          type: 'howToArticle'
        },
        {
          type: 'featureArticle'
        },
        {
          type: 'galleryArticle'
        }
      ],
      description: 'Add related article in the dropdown'
    }
  ],
  preview: {
    select: {
      title: 'navL1.name'
    }
  }
}
