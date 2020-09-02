/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state */
import React, { useState, useEffect } from 'react'
import styles from './IframePreview.module.css'

const assembleProjectUrl = ({ displayed, options }) => {
  const {
    slug: { current }
  } = displayed
  const { previewURL } = options
  if (!current || !previewURL) {
    console.warn('Missing slug or previewURL', { current, previewURL })
    return ''
  }
  return `${previewURL}/${current}`
}

const Preview = props => {
  const {
    published: { _updatedAt }
  } = props.document

  const { document } = props
  const [update, setUpdate] = useState(true)
  const [url, setUrl] = useState('')

  useEffect(() => {}, [props])

  useEffect(() => {
    const { options } = props
    const { displayed, draft } = props.document
    console.log('build the url', assembleProjectUrl({ displayed, draft, options }))
    setUrl(assembleProjectUrl({ displayed, draft, options }))
  }, [])

  const { displayed } = document

  if (!displayed) {
    return (
      <div className={styles.componentWrapper}>
        <p>There is no document to preview</p>
      </div>
    )
  }

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
        {update && <iframe src={url} frameBorder={'0'} />}
      </div>
    </div>
  )
}

export default Preview
