import IframePreview from '../previews/IframePreview'
import S from '@sanity/desk-tool/structure-builder'
import { GiSpray } from 'react-icons/gi'
import { FaEye } from 'react-icons/fa'

export default previewURL =>
  S.listItem()
    .title('Product')
    .icon(GiSpray)
    .schemaType('product')
    .child(
      S.documentTypeList('product')
        .title('Product')
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
