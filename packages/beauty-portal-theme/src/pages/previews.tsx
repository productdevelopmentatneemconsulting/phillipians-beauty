import React, { useState, useEffect } from 'react';
import { Router } from '@reach/router';
import Layout from '../components/Layout';
import { AuthorComponent } from '../templates/Author/index';
import { HowToArticleComponent } from '../templates/HowtoArticle/index';
import { FeatureArticleComponent } from '../templates/FeatureArticle/index';
import { GalleryArticleComponent } from '../templates/GalleryArticle/index';
import { ProductDetailComponent } from '../templates/Product/index';
import { LandingPageComponent } from '../templates/LandingPage/index';
import Breadcrumb from '../components//Breadcrumb';
console.log(process.env.app_local_sanityToken, 'ENV');
import {
  authorQuery,
  howToArticleQuery,
  featureArticleQuery,
  galleryArticleQuery,
  productQuery,
  landingPageQuery,
  brandInfoQuery,
} from 'src/utils/queries';
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: process.env.app_local_sanityId || '',
  dataset: process.env.app_local_sanityDataset,
  token: process.env.app_local_sanityToken,
  useCdn: false,
  withCredentials: true,
});

const PreviewHomePage = ({ location }: { location: any }) => {
  const [homePageData, setHomePageData] = useState('');
  const queryParams = new URLSearchParams(location.search);
  const queryHomePage = `
  *[_type == 'landingPage' && slug.current == '/' && (_id in path('${queryParams.get(
    'id'
  )}')) ] {
    ${landingPageQuery}
  }
  `;

  useEffect(() => {
    client.fetch(queryHomePage).then(res => {
      setHomePageData(res[0]);
    });
  }, []);
  return !homePageData ? (
    <div>
      <h1>Preview Loading...</h1>
    </div>
  ) : (
    <Layout>
      <LandingPageComponent page={homePageData} />
    </Layout>
  );
};

const PreviewPage = ({
  document,
  location,
}: {
  document: string;
  location: any;
}) => {
  const [data, setData] = useState(null);
  const queryParams = new URLSearchParams(location.search);

  const queryDraft = `*[slug.current == "${document}" && (_id in path('${queryParams.get(
    'id'
  )}'))]  {
    ..., 'tags': tags[]-> name
  }`;

  const queryAuthorPage = `
  *[_type == 'author' && slug.current == '${document}' && (_id in path('${queryParams.get(
    'id'
  )}'))] {
    ${authorQuery}
  }
  `;

  const queryHowToArticlePage = `
  {
    '_type': *[_type == 'howToArticle' && slug.current == '${document}' && (_id in path('${queryParams.get(
    'id'
  )}'))]{_type}[0],

    'page': *[_type == 'howToArticle' && slug.current == '${document}' && (_id in path('${queryParams.get(
    'id'
  )}'))] 
    {
    ${howToArticleQuery}
    }[0],
   'sectionTitles': *[_type == 'howToTemplate']{...}[0],
   'brandInfo': *[_type == 'brandInfo']{${brandInfoQuery}}[0],
   'genericLabels': *[_type == 'globalLabels']{...}[0],
   'relatedArticles': *[_type in ['howToArticle', 'featureArticle', 'galleryArticle'] && references(*[_type=="tag" && name in $tags]._id) && !(_id in path('drafts.**')) ] | order(_createdAt desc) {${howToArticleQuery}, ${featureArticleQuery}, ${galleryArticleQuery}}[0...10],
  }
  `;

  const queryFeatureArticlePage = `
  {
    '_type': *[_type == 'featureArticle' && slug.current == '${document}' && (_id in path('${queryParams.get(
    'id'
  )}'))]{_type}[0],

    'page': *[_type == 'featureArticle' && slug.current == '${document}' && (_id in path('${queryParams.get(
    'id'
  )}'))] 
    {
    ${featureArticleQuery}
    }[0],
   'sectionTitles': *[_type == 'featureTemplate']{...}[0],
   'brandInfo': *[_type == 'brandInfo']{${brandInfoQuery}}[0],
   'genericLabels': *[_type == 'globalLabels']{...}[0],
   'relatedArticles': *[_type in ['howToArticle', 'featureArticle', 'galleryArticle'] && references(*[_type=="tag" && name in $tags]._id) && !(_id in path('drafts.**')) ] | order(_createdAt desc) {${howToArticleQuery}, ${featureArticleQuery}, ${galleryArticleQuery}}[0...10],
  }
  `;

  const queryGalleryArticlePage = `
  {
    '_type': *[_type == 'galleryArticle' && slug.current == '${document}' && (_id in path('${queryParams.get(
    'id'
  )}'))]{_type}[0],

    'page': *[_type == 'galleryArticle' && slug.current == '${document}' && (_id in path('${queryParams.get(
    'id'
  )}'))] 
    {
    ${galleryArticleQuery}
    }[0],
   'sectionTitles': *[_type == 'galleryTemplate']{...}[0],
   'brandInfo': *[_type == 'brandInfo']{${brandInfoQuery}}[0],
   'genericLabels': *[_type == 'globalLabels']{...}[0],
   'relatedArticles': *[_type in ['howToArticle', 'featureArticle', 'galleryArticle'] && references(*[_type=="tag" && name in $tags]._id) && !(_id in path('drafts.**')) ] | order(_createdAt desc) {${howToArticleQuery}, ${featureArticleQuery}, ${galleryArticleQuery}}[0...10],
  }
  `;

  const queryProductDetailPage = `
  {
    '_type': *[_type == 'product' && slug.current == '${document}' && (_id in path('${queryParams.get(
    'id'
  )}'))]{_type}[0],
    'page': *[_type == 'product' && slug.current == '${document}' && (_id in path('${queryParams.get(
    'id'
  )}'))] 
    {
    ${productQuery}
    }[0],
    'brandInfo': *[_type == 'brandInfo']{${brandInfoQuery}}[0],
    'articleBlock':*[_type == 'singleArticleBlock'] {_id, name, article -> {${howToArticleQuery}, ${featureArticleQuery}, ${galleryArticleQuery}},  imageBlockType->{name}}[0]
  }
  `;

  const queryLandingPage = `
  *[_type == 'landingPage' && slug.current == '${document}' && (_id in path('${queryParams.get(
    'id'
  )}')) ] {
    ${landingPageQuery}
  }
  `;

  useEffect(() => {
    client.fetch(queryDraft).then((response: any) => {
      switch (response[0]._type) {
        case 'author':
          client.fetch(queryAuthorPage).then(res => {
            setData(res[0]);
          });
          break;
        case 'howToArticle':
          client
            .fetch(queryHowToArticlePage, { tags: response[0].tags })
            .then(res => {
              setData(res);
            });
          break;
        case 'featureArticle':
          client
            .fetch(queryFeatureArticlePage, { tags: response[0].tags })
            .then(res => {
              setData(res);
            });
          break;
        case 'galleryArticle':
          client
            .fetch(queryGalleryArticlePage, { tags: response[0].tags })
            .then(res => {
              setData(res);
            });
          break;
        case 'product':
          client.fetch(queryProductDetailPage).then(res => {
            setData(res);
          });
          break;
        case 'landingPage':
          client.fetch(queryLandingPage).then(res => {
            setData(res[0]);
          });
          break;
        default:
          break;
      }
    });
  }, []);

  const renderPreview = () => {
    if (data) {
      const type =
        typeof data._type === 'string' ? data._type : data._type._type;
      switch (type) {
        case 'author':
          return (
            <AuthorComponent
              name={data.name}
              parentPage={data.parentPage}
              image={data.image}
              slug={data.slug}
              _rawBio={data.bio}
            />
          );
        case 'howToArticle':
          return (
            <HowToArticleComponent
              page={data.page}
              sectionTitles={data.sectionTitles}
              brandInfo={data.brandInfo}
              genericLabels={data.genericLabels}
              relatedArticles={data.relatedArticles}
              preview="true"
            />
          );
        case 'featureArticle':
          return (
            <FeatureArticleComponent
              page={data.page}
              sectionTitles={data.sectionTitles}
              brandInfo={data.brandInfo}
              relatedArticles={data.relatedArticles}
              genericLabels={data.genericLabels}
              preview="true"
            />
          );
        case 'galleryArticle':
          return (
            <GalleryArticleComponent
              page={data.page}
              sectionTitles={data.sectionTitles}
              brandInfo={data.brandInfo}
              relatedArticles={data.relatedArticles}
              genericLabels={data.genericLabels}
              preview="true"
            />
          );
        case 'product':
          return (
            <ProductDetailComponent
              page={data.page}
              brandInfo={data.brandInfo}
              articleBlock={data.articleBlock}
              preview="true"
            />
          );
        case 'landingPage':
          return <LandingPageComponent page={data} />;
        default:
          break;
      }
    }
  };

  return !data ? (
    <div>
      <h1>Preview Loading...</h1>
    </div>
  ) : (
    <Layout>
      <Breadcrumb
        parentPageTitle={data.parentPage}
        pageTitle={
          data.name
            ? data.name
            : data.page.headline
            ? data.page.headline
            : data.page.name
        }
      />
      {renderPreview()}
    </Layout>
  );
};

const Previews = () => {
  return (
    <div>
      <Router>
        <PreviewPage path="/previews/:document" />
        <PreviewHomePage path="/previews/" />
      </Router>
    </div>
  );
};

export default Previews;

interface PreviewPage {
  data: any;
}
