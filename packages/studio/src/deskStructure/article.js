import S from '@sanity/desk-tool/structure-builder'
import { FaEye, FaNewspaper } from 'react-icons/fa'
import AllSeoPreviews from '../previews/AllSeoPreviews'
import IframePreview from '../previews/IframePreview'
const remoteURL = 'https://qa-liberty.netlify.app/previews'
const localURL = 'http://localhost:8000/previews'
const previewURL = window.location.hostname === 'localhost' ? localURL : remoteURL

const getArticlePreviews = type =>
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

export default S.listItem()
  .title('Articles')
  .icon(FaNewspaper)
  .child(
    S.list()
      .title('Article Type')
      .items([
        getArticlePreviews('featureArticle').title('Feature'),
        getArticlePreviews('galleryArticle').title('Gallery'),
        getArticlePreviews('howToArticle').title('How To')
      ])
  )
