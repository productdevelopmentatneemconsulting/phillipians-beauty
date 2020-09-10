// const env = process.env.NODE_ENV || 'development'
const baseUrl = 'https://qa-liberty.netlify.app'

export default function resolvePreviewUrl(document) {
  switch (document._type) {
    case 'landingPage':
      if (document.slug.current == '/') {
        return `${baseUrl}/previews${document.slug.current}`
      }
      return `${baseUrl}/previews/${document.slug.current}`
    case 'howToArticle':
      return `${baseUrl}/previews/${document.slug.current}`
    case 'featureArticle':
      return `${baseUrl}/previews/${document.slug.current}`
    case 'galleryArticle':
      return `${baseUrl}/previews/${document.slug.current}`
    case 'product':
      return `${baseUrl}/previews/${document.slug.current}`
    case 'author':
      return `${baseUrl}/previews/${document.slug.current}`
    default:
      return null
  }
}
