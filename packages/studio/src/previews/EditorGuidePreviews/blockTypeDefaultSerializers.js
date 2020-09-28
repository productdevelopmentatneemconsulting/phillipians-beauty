import React from 'react'
import BlockContent from '@sanity/block-content-to-react'
import IntentButton from 'part:@sanity/components/buttons/intent'
import { IntentLink } from 'part:@sanity/base/router'
import RichTextImage from './richTextImage'

export const blockTypeDefaultSerializers = {
  types: {
    mainImage: ({ node }) => {
      return <RichTextImage node={node} />
    },
    block: props => {
      console.log('props', props)
      const { style = 'normal' } = props.node
      if (style === 'blockquote') {
        return (
          <blockquote>
            <p>
              {props.children.map(element => {
                return <span key={element}>{element}</span>
              })}
            </p>
          </blockquote>
        )
      }

      // Fall back to default handling
      return BlockContent.defaultSerializers.types.block(props)
    }
  },
  marks: {
    internalLink: ({ mark, children }) => {
      return (
        <>
          {mark.create ? (
            <IntentButton
              color="primary"
              kind="simple"
              intent="create"
              params={{ type: 'landingPage' }}
            >
              {children}
            </IntentButton>
          ) : (
            <IntentLink
              intent="edit"
              params={{
                type: 'landingPage',
                id: mark.reference && mark.reference._ref
              }}
            >
              {children}
            </IntentLink>
          )}
        </>
      )
    }
  }
}
