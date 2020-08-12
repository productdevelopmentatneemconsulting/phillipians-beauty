import { MdSearch } from 'react-icons/md'

export default {
  name: 'searchBlock',
  type: 'document',
  icon: MdSearch,
  title: 'Search Block',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Block name',
      validation: Rule => Rule.required(),
      description: 'Name of the block'
    },
    {
      name: 'pages',
      type: 'array',
      title: 'Pages',
      description: 'Add the name of landing page on which you are going to use search block',
      of: [
        {
          type: 'reference',
          to: [{ type: 'landingPage' }]
        }
      ]
    },
    {
      name: 'algoliaIndexName',
      title: 'Indices Name *',
      type: 'reference',
      to: {
        type: 'indices'
      },
      description: 'Select Name of the Algolia indices that you are going to use'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'MdSearch'
    }
  }
}
