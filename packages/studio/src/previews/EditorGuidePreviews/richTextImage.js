import React from 'react'
import imageUrlBuilder from '@sanity/image-url'
// eslint-disable-next-line import/no-unresolved
import sanityClient from 'part:@sanity/base/client'

const builder = imageUrlBuilder(sanityClient)

const urlFor = source => {
  return builder.image(source)
}

const RichTextImage = ({ node }) => {
  return (
    <div className="">
      <figure>
        <picture className="">
          <source
            media="screen and (min-width: 1280px)"
            srcSet={`${urlFor(node)
              .width(712)
              .fit('max')
              .url()}`}
          />
          <source
            media="screen and (min-width: 560px)"
            srcSet={`${urlFor(node)
              .width(528)
              .fit('max')
              .auto('format')
              .url()}`}
          />
          <source
            media="screen and (min-width: 320px)"
            srcSet={`${urlFor(node)
              .width(382)
              .fit('max')
              .auto('format')
              .url()}`}
          />
          <img
            src={urlFor(node)
              .width(712)
              .fit('max')
              .url()}
            alt={node.alt}
          />
        </picture>
      </figure>
      <div className="">
        <span>{node.imageCaption && node.imageCaption}</span>
        <span>{node.imageCredit && node.imageCredit}</span>
      </div>
    </div>
  )
}

export default RichTextImage
