import React, { useState, useEffect, useCallback } from 'react';
import { Router } from '@reach/router';
import Pico from 'picosanity-graphql';
import { AuthorComponent } from '../templates/Author/index';
import { useEditState } from '@sanity/react-hooks';

const client = new Pico({
  projectId: 'xmpcmhrn',
  dataset: 'production',
  useCdn: false,
});

const PreviewPage = ({ document }: { document: string }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    client
      .fetch(
        `query($slug: String) {
            page: allAuthor(where: {slug : {current: {eq: $slug}}}) {  
              _id
              name
              parentPage {
                name
              }
              image {
                asset {
                  url
                }
              }
              slug {
                current
              }
              bioRaw
          }
        }
        `,
        { slug: document }
      )
      .then(res => setData(res.data.page[0]))
      .catch(err => console.error('Oh noes: %s', err.message));
  }, []);
  return !data ? (
    <h1>Loading</h1>
  ) : (
    <AuthorComponent
      name={data.name}
      parentPage={data.parentPage}
      image={data.image}
      slug={data.slug}
      _rawBio={data.bioRaw}
    />
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
