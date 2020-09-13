import S from '@sanity/desk-tool/structure-builder'
import { FaEye, FaNewspaper } from 'react-icons/fa'
import AllSeoPreviews from '../previews/AllSeoPreviews'
import IframePreview from '../previews/IframePreview'

const getArticlePreviews = (type, previewURL) =>
  S.documentTypeListItem(type).child(
    S.documentTypeList(type).child(docId =>
      S.document()
        .id(docId)
        .schemaType(type)
        .views([
          S.view.form(),
          S.view
            .component(IframePreview)
            .options({ previewURL })
            .title('Web Preview')
            .icon(FaEye),
          S.view
            .component(AllSeoPreviews)
            .title('SEO Preview')
            .id('seo-preview')
        ])
    )
  )

export default previewURL =>
  S.listItem()
    .title('Articles')
    .icon(FaNewspaper)
    .child(
      S.list()
        .title('Article Type')
        .items([
          getArticlePreviews('featureArticle', previewURL).title('Feature'),
          getArticlePreviews('galleryArticle', previewURL).title('Gallery'),
          getArticlePreviews('howToArticle', previewURL).title('How To')
        ])
    )
