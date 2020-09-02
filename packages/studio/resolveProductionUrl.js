// const env = process.env.NODE_ENV || 'development'
const baseUrl = 'https://qa-liberty.netlify.app'

export default function resolvePreviewUrl(document) {
  switch (document._type) {
    case 'landingPage':
      return `${baseUrl}/${document.slug.current}`
    case 'featureArticle':
      return `${baseUrl}/hair-style/${document.slug.current}`
    case 'product':
      return `${baseUrl}/${document.slug.current}`
    case 'author':
      return `${baseUrl}/previews/${document.slug.current}`
    case 'brandInformation':
      if (document._id === 'frontpage' || document._id === 'drafts.frontpage') {
        return baseUrl
      }
      return null
    default:
      return null
  }
}
