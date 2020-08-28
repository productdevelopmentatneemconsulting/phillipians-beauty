import React, { useState, useEffect } from 'react';
import { Router } from '@reach/router';
import Layout from '../components/Layout';
import { AuthorComponent } from '../templates/Author/index';
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'xmpcmhrn',
  dataset: 'production',
  useCdn: false,
});

const PreviewPage = ({ document }: { document: string }) => {
  const [data, setData] = useState(null);

  const queryPreviewPage = ` 
  *[_type == 'author' && slug.current == '${document}' ]{name, image{alt, asset->{url}},parentPage->{slug}, bio, slug}
`;

  useEffect(() => {
    client.fetch(queryPreviewPage).then(result => {
      console.log(result);
      setData(result[0]);
    });
  }, []);

  return !data ? (
    <h1>Loading...</h1>
  ) : (
    <Layout>
      <AuthorComponent
        name={data.name}
        parentPage={data.parentPage}
        image={data.image}
        slug={data.slug}
        _rawBio={data.bioRaw}
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
