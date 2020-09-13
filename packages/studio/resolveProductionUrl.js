// const env = process.env.NODE_ENV || 'development'
const remoteURL = 'https://qa-liberty.netlify.app'
const localURL = 'http://localhost:8000'
const baseUrl = window.location.hostname === 'localhost' ? localURL : remoteURL

export default function resolvePreviewUrl(document) {
  const { _id } = document

  switch (document._type) {
    case 'landingPage':
      if (document.slug.current == '/') {
        return `${baseUrl}/previews${document.slug.current}?id=${_id}`
      }
      return `${baseUrl}/previews/${document.slug.current}?id=${_id}`
    case 'howToArticle':
      return `${baseUrl}/previews/${document.slug.current}?id=${_id}`
    case 'featureArticle':
      return `${baseUrl}/previews/${document.slug.current}?id=${_id}`
    case 'galleryArticle':
      return `${baseUrl}/previews/${document.slug.current}?id=${_id}`
    case 'product':
      return `${baseUrl}/previews/${document.slug.current}?id=${_id}`
    case 'author':
      return `${baseUrl}/previews/${document.slug.current}?id=${_id}`
    default:
      return null
  }
}
