import IframePreview from '../previews/IframePreview'
import S from '@sanity/desk-tool/structure-builder'
import { MdViewCompact } from 'react-icons/md'
import { FaEye } from 'react-icons/fa'

export default previewURL =>
  S.listItem()
    .title('Manage Pages')
    .icon(MdViewCompact)
    .schemaType('landingPage')
    .child(
      S.documentTypeList('landingPage')
        .title('Landing Pages')
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
