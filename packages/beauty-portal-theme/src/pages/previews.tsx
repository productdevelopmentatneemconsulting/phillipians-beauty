import React, { useState, useEffect } from 'react';
import { Router } from '@reach/router';
import Layout from '../components/Layout';
import { AuthorComponent } from '../templates/Author/index';
import Breadcrumb from '../components//Breadcrumb';
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'xmpcmhrn',
  dataset: 'production',
  useCdn: false,
});

const PreviewPage = ({ document }: { document: string }) => {
  const [data, setData] = useState(null);

  const queryPreviewPage = ` 
  *[_type == 'author' && slug.current == '${document}' ]{name, image{alt, asset->{url}},parentPage->{name, slug, path}, bio, slug}
`;

  useEffect(() => {
    client.fetch(queryPreviewPage).then(result => {
      setData(result[0]);
    });
  }, []);

  return !data ? (
    <div>
      <h1>Preview Loading...</h1>
    </div>
  ) : (
    <Layout>
      <Breadcrumb parentPageTitle={data.parentPage} pageTitle={data.name} />

      <AuthorComponent
        name={data.name}
        parentPage={data.parentPage}
        image={data.image}
        slug={data.slug}
        _rawBio={data.bio}
      />
    </Layout>
  );
};

const Previews = () => {
  return (
    <div>
      <Router>
        <PreviewPage path="/previews/:document" />
      </Router>
    </div>
  );
};

export default Previews;
