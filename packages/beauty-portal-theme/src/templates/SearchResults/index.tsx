import React, { FunctionComponent } from 'react';
import SEO from '../../components/Seo';
import Layout from '../../components/Layout';
import Search from '../../search';
import Breadcrumb from '../../components/Breadcrumb';

const searchIndices = [
  { name: `howtoArticle`, title: `howtoArticle`, hitComp: `Hit` },
];

const SearchResults: FunctionComponent = () => {
  return (
    <Layout overflow="hidden">
      <SEO lang={'en-us'} title="Search" description="" keywords={[]} />
      <Breadcrumb parentPageTitle="" pageTitle="Search Results" />
      <Search indices={searchIndices} />
    </Layout>
  );
};
export default SearchResults;
