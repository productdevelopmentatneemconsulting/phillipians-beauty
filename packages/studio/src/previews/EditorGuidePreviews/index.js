import React from 'react'
import BlockContent from '@sanity/block-content-to-react'
import { blockTypeDefaultSerializers } from './blockTypeDefaultSerializers'
import styles from './EditorGuide.css'

const EditorGuidePreview = ({ document }) => {
  const { documentation } = document.displayed

  return (
    <section className={styles.guideContainer}>
      <BlockContent blocks={documentation} serializers={blockTypeDefaultSerializers} />
    </section>
  )
}

EditorGuidePreview.defaultProps = {
  document: null
}

export default EditorGuidePreview
