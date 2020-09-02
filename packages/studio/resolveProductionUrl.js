// const env = process.env.NODE_ENV || 'development'
const baseUrl = 'https://qa-liberty.netlify.app/previews'

export default function resolvePreviewUrl(document) {
  const baseUrl =
    env === 'development' ? 'http://localhost:8000' : 'sanity-gatsby-blog-web-3d35kyw2'
  switch (document._type) {
    case 'route':
      if (!document.slug || !document.slug.current) {
        return baseUrl
      }
      return `${baseUrl}/${document.slug.current}`
    case 'managePages':
      return `${baseUrl}/managePages/${document.slug.current}`
    case 'brandInformation':
      if (document._id === 'frontpage' || document._id === 'drafts.frontpage') {
        return baseUrl
      }
      return null
    default:
      return null
  }
}
