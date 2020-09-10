import S from '@sanity/desk-tool/structure-builder'
import userStore from 'part:@sanity/base/user'
import { map } from 'rxjs/operators'

import {
  MdSettings,
  MdVideocam,
  MdImage,
  MdTextFields,
  MdViewCompact,
  MdSearch,
  MdEmail
} from 'react-icons/md'
import {
  FaSitemap,
  FaTag,
  FaTags,
  FaBuffer,
  FaSlidersH,
  FaBoxes,
  FaGlobe,
  FaNewspaper
} from 'react-icons/fa'
import { GiSpray, GiCherish, GiHairStrands, GiStopSign } from 'react-icons/gi'
import article from './article'
import author from './author'
import product from './product'
import landingPage from './landingPage'

// Web preview configuration
const remoteURL = 'https://qa-liberty.netlify.app/previews'
const localURL = 'http://localhost:8000/previews'
const previewURL = 'https://qa-liberty.netlify.app/previews'

export default () =>
  userStore.currentUser.pipe(
    map(({ user }) => {
      const { role } = user
      localStorage.setItem('role', role)

      if (role === 'administrator') {
        return S.list()
          .title('Content')
          .items([
            S.divider(),
            article,
            product(previewURL),
            S.divider(),
            S.listItem()
              .title('Brand')
              .icon(GiCherish)
              .schemaType('brand')
              .child(S.documentTypeList('brand').title('Brand')),
            S.listItem()
              .title('Tool')
              .icon(GiHairStrands)
              .schemaType('tool')
              .child(S.documentTypeList('tool').title('tools')),
            author(previewURL),
            S.divider(),

            landingPage(previewURL),
            S.divider(),
            S.listItem()
              .title('Manage Blocks')
              .icon(FaBuffer)
              .child(
                S.list()
                  .title('Block Type')
                  .items([
                    S.listItem()
                      .title('Slider - Articles')
                      .icon(FaSlidersH)
                      .schemaType('articleSlider')
                      .child(S.documentTypeList('articleSlider').title('Slider for articles')),
                    S.listItem()
                      .title('Slider - Products')
                      .icon(FaSlidersH)
                      .schemaType('productSlider')
                      .child(S.documentTypeList('productSlider').title('Slider for products')),
                    S.listItem()
                      .title('Slider - Authors')
                      .icon(FaSlidersH)
                      .schemaType('authorSlider')
                      .child(S.documentTypeList('authorSlider').title('Slider for authors')),
                    S.divider(),
                    S.listItem()
                      .title('Text Block')
                      .icon(MdTextFields)
                      .schemaType('textBlock')
                      .child(S.documentTypeList('textBlock').title('Text Block')),
                    S.divider(),
                    S.listItem()
                      .title('Taxonomy Block')
                      .icon(FaBoxes)
                      .schemaType('taxonomyBlock')
                      .child(S.documentTypeList('taxonomyBlock').title('Taxonomy Block')),
                    S.divider(),
                    S.listItem()
                      .title('Image Block')
                      .icon(MdImage)
                      .schemaType('textBlock')
                      .child(S.documentTypeList('imageBlock').title('Image Block')),
                    S.divider(),
                    S.listItem()
                      .title('Video Block')
                      .icon(MdVideocam)
                      .schemaType('videoBlock')
                      .child(S.documentTypeList('videoBlock').title('Video Block')),
                    S.divider(),
                    S.listItem()
                      .title('Newsletter Block')
                      .icon(MdEmail)
                      .schemaType('newsletterBlock')
                      .child(S.documentTypeList('newsletterBlock').title('Newsletter Block')),
                    S.divider(),
                    S.listItem()
                      .title('Accordion Block')
                      .icon(MdEmail)
                      .schemaType('accordionBlock')
                      .child(S.documentTypeList('accordionBlock').title('Accordion Block')),
                    S.divider(),
                    S.listItem()
                      .title('Single Article Block')
                      .icon(FaNewspaper)
                      .schemaType('singleArticleBlock')
                      .child(
                        S.documentTypeList('singleArticleBlock').title('Single Article Block')
                      ),
                    S.divider(),
                    S.listItem()
                      .title('Search Block')
                      .icon(MdSearch)
                      .schemaType('searchBlock')
                      .child(S.documentTypeList('searchBlock').title('Search Block')),
                    S.divider(),
                    S.listItem()
                      .title('Algolia Indices Block')
                      .icon(MdSearch)
                      .schemaType('indices')
                      .child(S.documentTypeList('indices').title('Algolia Indices Block'))
                  ])
              ),
            S.listItem()
              .title('Manage Tags')
              .icon(FaTags)
              .child(
                S.list()
                  .title('Manage Tags')
                  .items([
                    S.listItem()
                      .title('Tag Category')
                      .icon(FaTag)
                      .schemaType('tagCategory')
                      .child(S.documentTypeList('tagCategory').title('Tag Categories')),
                    S.listItem()
                      .title('Tags')
                      .icon(FaTags)
                      .schemaType('tag')
                      .child(S.documentTypeList('tag').title('Tags'))
                  ])
              ),
            S.listItem()
              .title('Site Structure')
              .icon(FaSitemap)
              .child(
                S.list()
                  .title('Structure')
                  .items([
                    S.listItem()
                      .title('Navigation')
                      .icon(FaSitemap)
                      .schemaType('navBar')
                      .child(S.documentTypeList('navBar').title('Navigation'))
                  ])
              ),
            S.listItem()
              .title('Site Settings')
              .icon(MdSettings)
              .child(
                S.list()
                  .title('Settings')
                  .items([
                    S.listItem()
                      .title('Brand Information')
                      .icon(MdSettings)
                      .child(
                        S.editor()
                          .id('brandInfo')
                          .schemaType('brandInfo')
                          .documentId('brandInfo')
                      ),
                    S.listItem()
                      .title('Configuration')
                      .icon(MdSettings)
                      .child(
                        S.editor()
                          .id('config')
                          .schemaType('config')
                          .documentId('config')
                      ),
                    S.listItem()
                      .title('Global Labels')
                      .icon(FaGlobe)
                      .child(
                        S.editor()
                          .id('globalLabels')
                          .schemaType('globalLabels')
                          .documentId('globalLabels')
                      ),
                    S.listItem()
                      .title('Feature Template')
                      .icon(MdSettings)
                      .child(
                        S.editor()
                          .id('featureTemplate')
                          .schemaType('featureTemplate')
                          .documentId('featureTemplate')
                      ),
                    S.listItem()
                      .title('Gallery Template')
                      .icon(MdSettings)
                      .child(
                        S.editor()
                          .id('galleryTemplate')
                          .schemaType('galleryTemplate')
                          .documentId('galleryTemplate')
                      ),
                    S.listItem()
                      .title('HowTo Template')
                      .icon(MdSettings)
                      .child(
                        S.editor()
                          .id('howToTemplate')
                          .schemaType('howToTemplate')
                          .documentId('howToTemplate')
                      ),
                    S.listItem()
                      .title('AUTHORIZED USERS ONLY')
                      .icon(GiStopSign)
                      .child(
                        S.list()
                          .title('Block Type for different UI')
                          .items([
                            S.listItem()
                              .title('Slider Type')
                              .icon(FaSlidersH)
                              .schemaType('sliderType')
                              .child(S.documentTypeList('sliderType').title('Slider Type')),
                            S.listItem()
                              .title('Text Block Type')
                              .icon(MdTextFields)
                              .schemaType('textBlockType')
                              .child(S.documentTypeList('textBlockType').title('Text Block Type')),
                            S.listItem()
                              .title('Taxonomy Block Type')
                              .icon(FaBoxes)
                              .schemaType('taxonomyBlockType')
                              .child(
                                S.documentTypeList('taxonomyBlockType').title('Taxonomy Block Type')
                              ),
                            S.listItem()
                              .title('Image Block Type')
                              .icon(MdImage)
                              .schemaType('imageBlockType')
                              .child(
                                S.documentTypeList('imageBlockType').title('Image Block Type')
                              ),
                            S.listItem()
                              .title('Video Block Type')
                              .icon(MdVideocam)
                              .schemaType('videoBlockType')
                              .child(
                                S.documentTypeList('videoBlockType').title('Video Block Type')
                              ),
                            S.listItem()
                              .title('Newsletter Block Type')
                              .icon(MdEmail)
                              .schemaType('newsletterBlockType')
                              .child(
                                S.documentTypeList('newsletterBlockType').title(
                                  'Newsletter Block Type'
                                )
                              )
                          ])
                      )
                  ])
              ),
            S.divider()
          ])
      }
      return S.list()
        .title('Content')
        .items([
          S.divider(),
          article,
          product(previewURL),
          S.divider(),
          S.listItem()
            .title('Brand')
            .icon(GiCherish)
            .schemaType('brand')
            .child(S.documentTypeList('brand').title('Brand')),
          S.listItem()
            .title('Tool')
            .icon(GiHairStrands)
            .schemaType('tool')
            .child(S.documentTypeList('tool').title('tools')),
          author(previewURL),
          S.divider(),

          landingPage(previewURL),
          S.divider(),
          S.listItem()
            .title('Manage Blocks')
            .icon(FaBuffer)
            .child(
              S.list()
                .title('Block Type')
                .items([
                  S.listItem()
                    .title('Slider - Articles')
                    .icon(FaSlidersH)
                    .schemaType('articleSlider')
                    .child(S.documentTypeList('articleSlider').title('Slider for articles')),
                  S.listItem()
                    .title('Slider - Products')
                    .icon(FaSlidersH)
                    .schemaType('productSlider')
                    .child(S.documentTypeList('productSlider').title('Slider for products')),
                  S.listItem()
                    .title('Slider - Authors')
                    .icon(FaSlidersH)
                    .schemaType('authorSlider')
                    .child(S.documentTypeList('authorSlider').title('Slider for authors')),
                  S.divider(),
                  S.listItem()
                    .title('Text Block')
                    .icon(MdTextFields)
                    .schemaType('textBlock')
                    .child(S.documentTypeList('textBlock').title('Text Block')),
                  S.divider(),
                  S.listItem()
                    .title('Taxonomy Block')
                    .icon(FaBoxes)
                    .schemaType('taxonomyBlock')
                    .child(S.documentTypeList('taxonomyBlock').title('Taxonomy Block')),
                  S.divider(),
                  S.listItem()
                    .title('Image Block')
                    .icon(MdImage)
                    .schemaType('textBlock')
                    .child(S.documentTypeList('imageBlock').title('Image Block')),
                  S.divider(),
                  S.listItem()
                    .title('Video Block')
                    .icon(MdVideocam)
                    .schemaType('videoBlock')
                    .child(S.documentTypeList('videoBlock').title('Video Block')),
                  S.divider(),
                  S.listItem()
                    .title('Newsletter Block')
                    .icon(MdEmail)
                    .schemaType('newsletterBlock')
                    .child(S.documentTypeList('newsletterBlock').title('Newsletter Block')),
                  S.divider(),
                  S.listItem()
                    .title('Accordion Block')
                    .icon(MdEmail)
                    .schemaType('accordionBlock')
                    .child(S.documentTypeList('accordionBlock').title('Accordion Block')),
                  S.divider(),
                  S.listItem()
                    .title('Single Article Block')
                    .icon(FaNewspaper)
                    .schemaType('singleArticleBlock')
                    .child(S.documentTypeList('singleArticleBlock').title('Single Article Block')),
                  S.divider(),
                  S.listItem()
                    .title('Search Block')
                    .icon(MdSearch)
                    .schemaType('searchBlock')
                    .child(S.documentTypeList('searchBlock').title('Search Block')),
                  S.divider(),
                  S.listItem()
                    .title('Algolia Indices Block')
                    .icon(MdSearch)
                    .schemaType('indices')
                    .child(S.documentTypeList('indices').title('Algolia Indices Block'))
                ])
            ),
          S.listItem()
            .title('Manage Tags')
            .icon(FaTags)
            .child(
              S.list()
                .title('Manage Tags')
                .items([
                  S.listItem()
                    .title('Tag Category')
                    .icon(FaTag)
                    .schemaType('tagCategory')
                    .child(S.documentTypeList('tagCategory').title('Tag Categories')),
                  S.listItem()
                    .title('Tags')
                    .icon(FaTags)
                    .schemaType('tag')
                    .child(S.documentTypeList('tag').title('Tags'))
                ])
            ),

          S.divider()
        ])
    })
  )
