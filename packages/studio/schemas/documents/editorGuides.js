import { FaQuestionCircle } from 'react-icons/fa'

export default {
  name: 'editorGuide',
  type: 'document',
  icon: FaQuestionCircle,
  title: 'Editor Guide',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'documentation',
      type: 'textBlockPortableText',
      title: 'Documentation'
    }
  ],
  preview: {
    select: {
      title: 'name'
    }
  }
}
