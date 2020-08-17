import React, { FunctionComponent } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import SocialMenu from '../SocialMenu';
import NewsletterPromo from '../NewsletterPromo';
import './styles.scss';
import BackToTop from '../BackToTop';
// import { ReactComponent as UnileverLogo } from '../../images/unilever-logo.svg';
// import { ReactComponent as NewWindow } from '../../images/icons/launch.svg';

const Footer: FunctionComponent = () => {
  const data = useStaticQuery(graphql`
    query footerNavigation {
      sanityNavBar(name: { eq: "Footer" }) {
        name
        navItems {
          navL1 {
            name
            path
            externalLink
            landingPage {
              slug {
                current
              }
            }
          }
        }
      }
      subscriptionInfo: sanityNewsletterBlock(
        name: { eq: "Newsletter Promo" }
      ) {
        name
        headline
        _rawBody(resolveReferences: { maxDepth: 10 })
        ctaLabel
      }

      brandInfo: sanityBrandInfo {
        pinteresturl
        twitterurl
        youtubeurl
        facebookurl
        instaurl
      }
    }
  `);

  const externalLinkAttributes = {
    target: '_blank',
    rel: 'noopener noreferrer',
  };
  return (
    <footer className="bp-footer" role="contentinfo" aria-label="footer">
      <div
        className="bp-footer_wrapper"
        role="navigation"
        aria-label="Footer Navigation"
      >
        <div className="bp-container">
          <div className="bp-row">
            <div className="col-xs-12 col-5 order-md-2 mb-5">
              <NewsletterPromo
                headline={data.subscriptionInfo.headline}
                _rawBody={data.subscriptionInfo._rawBody}
                ctaLabel={data.subscriptionInfo.ctaLabel}
                footer={data.sanityNavBar.name}
              />
              <SocialMenu
                links={data.brandInfo}
                footer={data.sanityNavBar.name}
              />
            </div>

            <div className="col-xs-12 col-7 order-md-1">
              <nav className="bp-footer_navigation" role="navigation">
                <ul className="bp-footer_items">
                  {data.sanityNavBar.navItems.map(
                    (navItem: {
                      navL1: {
                        name: string;
                        path: string;
                        externalLink: string;
                        landingPage: any;
                      };
                    }) => (
                      <li className="bp-footer_item" key={navItem.navL1.name}>
                        <a
                          href={
                            navItem.navL1.externalLink ||
                            navItem.navL1.path ||
                            `/${navItem.navL1.landingPage.slug.current}`
                          }
                          className="bp-footer_link"
                          {...(navItem.navL1.externalLink
                            ? externalLinkAttributes
                            : null)}
                        >
                          {navItem.navL1.name}
                          {/* {navItem.navL1.externalLink && <NewWindow />} */}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="bp-footer_secondary">
        {/* <UnileverLogo /> */}
        <p>Copyright &copy; {new Date().getFullYear()} Unilever.</p>
      </div>
      <BackToTop />
    </footer>
  );
};

export default Footer;
