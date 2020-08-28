import IframePreview from '../previews/IframePreview'
import S from '@sanity/desk-tool/structure-builder'
// import article from './src/structure/article'
import { MdPerson } from 'react-icons/md'
import { FaEye } from 'react-icons/fa'

const remoteURL = 'http://localhost:8080/previews'
const localURL = 'http://localhost:8000/previews'
const previewURL = 'http://localhost:8080/previews'

export default () =>
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
