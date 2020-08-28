import React, { useState, useEffect, useCallback } from 'react';
import { Router } from '@reach/router';
import Pico from 'picosanity-graphql';

// import { useLoads } from "react-loads";

// import Page from "src/templates/page";

// import sanityClient from '@sanity/client';

// import { pageQuery, productQuery } from "src/utils/queries";
const client = new Pico({
  projectId: 'xmpcmhrn',
  dataset: 'production',
});

// const PreviewPage = ({ document }: { document: string }) => {
//   const [doc, setDoc] = useState(null as any);

//   //  @ts-ignore
//   const queryDraft = `*[_id == "${document}"]  {
//     ...,
//   }`;

//   // @ts-ignore
//   const queryPreviewPage = `*[_id == "${document}"]  {
//     ${pageQuery}
//   }`;

//   // @ts-ignore
//   const queryPreviewProduct = `*[_id == "${document}"]  {
//     ${productQuery}
//   }`;

//   const handlePreviewFetch = useCallback(
//     () =>
//       client.fetch(queryDraft).then((response: any) => {
//         switch (response[0]._type) {
//           case "page":
//             client.fetch(queryPreviewPage).then(res => {
//               setDoc(res[0]);
//             });
//             break;
//           case "product":
//             client.fetch(queryPreviewProduct).then(res => {
//               setDoc(res[0]);
//             });
//             break;
//           default:
//             break;
//         }
//       }),
//     []
//   );

//   const { error, isResolved, isPending, isReloading, load } = useLoads(
//     "handlePreviewFetch",
//     handlePreviewFetch as any,
//     {
//       defer: true
//     }
//   );

//   useEffect(() => {
//     load();
//   }, [0]);

//   const renderPreview = () => {
//     if (doc) {
//       switch (doc._type) {
//         case "page":
//           return <Page pageContext={doc.content} preview={true} />;
//         case "product":
//           return <Product pageContext={doc.content} preview={true} />;
//         default:
//           break;
//       }
//     }
//   };
//   return (
//     <>
//       {(isPending || isReloading) && (
//         <div className="ac">
//           <span>Loading</span>
//         </div>
//       )}
//       {isResolved && !isPending && renderPreview()}
//     </>
//   );
// };

const PreviewPage = () => {
  useEffect(() => {
    client
      .fetch(
        `
        query {
            page: allAuthor(where: {slug : {current: {eq: "vivek"}}}) {
              
                _id
                name
                image {
                  asset {
                    url
                  }
                  alt
                }
                slug {
                  current
                }
                parentPage {
                  name
                }
              }
            
          }
        `,
        {}
      )
      .then(res => console.log(res.data))
      .catch(err => console.error('Oh noes: %s', err.message));
  }, []);
  return <h1>Testing query</h1>;
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
