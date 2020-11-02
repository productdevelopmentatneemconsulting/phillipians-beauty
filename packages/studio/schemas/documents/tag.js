import {FaTag} from 'react-icons/fa'

export default {
  title: 'Tag',
  name: 'tag',
  icon: FaTag,
  type: 'document',
  fields: [
    {
      name: 'tagCategory',
      title: 'Category *',
      type: 'reference',
      to: {
        type: 'tagCategory'
      },
      validation: Rule => Rule.required() ,
      description: 'Select Category'
    },
    {
      name: 'name',
      type: 'string',
      title: 'Tag',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      label: 'Title',
      type: 'string'
    },
    {
      name: 'description',
      label: 'Tag Description',
      type: 'text'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagCategory.name',
      media: 'FaTag'
    }
  },
  orderings: [
    {
      title: 'Tag Name',
      name: 'nameAZ',
      by: [{field: 'name', direction: 'asc'}]
    },
    {
      title: 'Tag Category',
      name: 'categoryAZ',
      by: [
        {field: 'tagCategory.name', direction: 'asc'},
        {field: 'name', direction: 'asc'}
      ]
    }
  ]
}
