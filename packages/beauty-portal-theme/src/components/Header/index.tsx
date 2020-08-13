import React, { FunctionComponent } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import SiteNavigation from '../Navigation';
import SiteSearch from './search';
import NewsletterFollow from './newsletter-follow';
import { ReactComponent as Logo } from '../../images/beauty-logo.svg';
import { ReactComponent as LogoIcon } from '../../images/logo.svg';

import './style.scss';

const Header: FunctionComponent = () => {
  const data = useStaticQuery(graphql`
    query brandSocialLinks {
      brandInfo: sanityBrandInfo {
        pinteresturl
        twitterurl
        youtubeurl
        facebookurl
        instaurl
      }
    }
  `);

  return (
    <header className="bp-header" role="banner" aria-label="header">
      <div className="bp-header_logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="bp-container">
        <div className="bp-header_content">
          <div className="bp-logo">
            <Link className="bp-logo-link" to="/">
              <LogoIcon width="40" />
            </Link>
          </div>
          <SiteNavigation />
          <NewsletterFollow
            label={'Subscribe to our newsletter'}
            links={data.brandInfo}
          />
          <SiteSearch />
        </div>
      </div>
    </header>
  );
};

export default Header;
