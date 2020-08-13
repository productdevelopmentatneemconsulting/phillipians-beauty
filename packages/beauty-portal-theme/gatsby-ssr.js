const React = require('react');
const { MyProvider } = require('./src/context/Context');
const headComponents = [];

headComponents.push(
  <link rel="preconnect" href="https://cdn.sanity.io" />,
  <link rel="dns-prefetch" href="https://cdn.sanity.io" />,
  <link
    rel="preload"
    href="/fonts/ProximaNovaAltRegular.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="true"
  />,
  <link
    rel="preload"
    href="/fonts/ProximaNovaAltBold.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="true"
  />,
  <link rel="shortcut icon" type="image/x-icon" href="data:image/x-icon;," />,
  <link rel="shortcut icon" href="/images/icon.png" />,
  <meta name="theme-color" content="#b8f0c0" />,
  <link rel="apple-touch-icon" sizes="48x48" href="/images/icon-48x48.png" />,
  <link rel="apple-touch-icon" sizes="72x72" href="/images/icon-72x72.png" />,
  <link rel="apple-touch-icon" sizes="96x96" href="/images/icon-96x96.png" />,
  <link
    rel="apple-touch-icon"
    sizes="144x144"
    href="/images/icon-144x144.png"
  />,
  <link
    rel="apple-touch-icon"
    sizes="192x192"
    href="/images/icon-192x192.png"
  />,
  <link
    rel="apple-touch-icon"
    sizes="256x256"
    href="/images/icon-256x256.png"
  />,
  <link
    rel="apple-touch-icon"
    sizes="384x384"
    href="/images/icon-384x384.png"
  />,
  <link
    rel="apple-touch-icon"
    sizes="512x512"
    href="/images/icon-512x512.png"
  />,
  <script
    type="text/javascript"
    dangerouslySetInnerHTML={{
      __html: `
            (function(a, h){
              var botsRegexp = /aolbuild|baidu|bingbot|bingpreview|msnbot|duckduckgo|adsbot-google|googlebot|mediapartners-google|teoma|slurp|yandex/gi;
              window.searchAgentOnPage = h && h==='#noquiz' || botsRegexp.test(a);
            })(navigator.userAgent, location.hash);
            `,
    }}
    id="botDetector"
  />,
  <meta charSet="utf-8" />,
  <meta httpEquiv="x-ua-compatible" content="ie=edge" />,
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
  />
);

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents(headComponents);
};

exports.wrapRootElement = ({ element }) => <MyProvider>{element}</MyProvider>;
