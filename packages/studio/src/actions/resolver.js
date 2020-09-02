import defaultResolve from 'part:@sanity/base/document-actions'

export default function resolveDocumentActions(props) {
  // Show default actions on documents not of type project
  return defaultResolve(props)
}
