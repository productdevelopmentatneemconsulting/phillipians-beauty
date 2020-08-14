import { FaNewspaper } from 'react-icons/fa'

export default {
  name: 'singleArticleBlock',
  type: 'document',
  icon: FaNewspaper,
  title: 'Article Block',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Image Block Name *',
      validation: Rule => Rule.required(),
      description: 'Name is used to identify the single article block for page layout'
    },
    {
      name: 'imageBlockType',
      title: 'Image Block Type',
      type: 'reference',
      to: {
        type: 'imageBlockType'
      },
      description: 'Select Article Block Type'
    },
    {
      name: 'article',
      title: 'Article',
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
      description: 'Select Article'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'singleArticleBLock.name',
      media: 'image'
    }
  }
}
