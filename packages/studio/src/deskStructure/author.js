import IframePreview from '../previews/IframePreview'
import S from '@sanity/desk-tool/structure-builder'
import { MdPerson } from 'react-icons/md'
import { FaEye } from 'react-icons/fa'

export default previewURL =>
  S.listItem()
    .title('Authors')
    .icon(MdPerson)
    .schemaType('author')
    .child(
      S.documentTypeList('author')
        .title('Author')
        .child(documentId =>
          S.document()
            .documentId(documentId)
            .views([
              S.view.form(),
              S.view
                .component(IframePreview)
                .options({ previewURL })
                .title('Web Preview')
                .icon(FaEye)
            ])
        )
    )
