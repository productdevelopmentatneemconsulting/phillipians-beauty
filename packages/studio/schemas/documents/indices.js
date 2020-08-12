import { MdTextFields } from 'react-icons/md'

export default {
  name: 'indices',
  type: 'document',
  icon: MdTextFields,
  title: 'Algolia Indices Block',
  fields: [
    {
      name: 'headline',
      type: 'string',
      title: 'Headline *',
      validation: Rule => Rule.required(),
      description: 'Headline of this block'
    },
    {
      name: 'name',
      type: 'string',
      title: 'Name *',
      validation: Rule => Rule.required(),
      description: 'Name of algolia index'
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title *',
      validation: Rule => Rule.required(),
      description: 'Title of algolia index'
    },
    {
      name: 'hitComp',
      type: 'string',
      title: 'Hit Component *',
      validation: Rule => Rule.required(),
      description: 'Hit component name that you are going to use'
    }
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'name',
      media: 'MdTextFields'
    }
  }
}
