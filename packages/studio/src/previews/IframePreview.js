/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state */
import React from 'react'
import PropTypes from 'prop-types'
import styles from './IframePreview.module.css'
import client from 'part:@sanity/base/client'

/**
 * Explore more examples of previews:
 * https://www.sanity.io/blog/evolve-authoring-experiences-with-views-and-split-panes
 */

const assemblePostUrl = ({ displayed, options }) => {
  const { slug } = displayed
  const parentPageData = []
  const query = `*[_type == 'featureArticle' || _type == 'howToArticle' || _type == 'galleryArticle']{"parentPageURL": parentPage->slug}`
  client
    .fetch(query)
    .then(items => {
      parentPageData.push(...items)
    })
    .catch('error')
  console.log('parentPageData', parentPageData)
  const { previewURL } = options
  if (!slug || !previewURL) {
    console.warn('Missing slug or previewURL', { slug, previewURL })
    return ''
  }
  const path = `${'hair-style'}/${slug.current}/`
  return `${previewURL}/${path}`
}

const IframePreview = props => {
  console.log('document', props.document)
  const { options } = props
  const { displayed } = props.document

  if (!displayed) {
    return (
      <div className={styles.componentWrapper}>
        <p>There is no document to preview</p>
      </div>
    )
  }

  const url = assemblePostUrl({ displayed, options })

  if (!url) {
    return (
      <div className={styles.componentWrapper}>
        <p>Hmm. Having problems constructing the web front-end URL.</p>
      </div>
    )
  }

  return (
    <div className={styles.componentWrapper}>
      <div className={styles.iframeContainer}>
        <iframe src={url} frameBorder={'0'} />
      </div>
    </div>
  )
}

IframePreview.propTypes = {
  document: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

IframePreview.defaultProps = {
  document: null
}

export default IframePreview
