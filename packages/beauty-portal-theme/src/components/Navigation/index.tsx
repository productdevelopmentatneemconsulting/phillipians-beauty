import React, { FunctionComponent, useState } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import classNames from 'classnames';

import './styles.scss';
import NavigationList from '../NavigationList';

const SiteNavigation: FunctionComponent = () => {
  const data = useStaticQuery(graphql`
    query siteNavigation {
      sanityNavBar(name: { eq: "Header" }) {
        navItems {
          navL1 {
            landingPage {
              name
              path
              slug {
                current
              }
            }
            name
            path
          }
          navL2 {
            landingPage {
              name
              path
              slug {
                current
              }
            }
            name
            path
          }
        }
      }
    }
  `);

  const [activeNav, setActiveNav] = useState(false);
  const handleNav = event => {
    event.currentTarget.classList.toggle('is-active');
    setActiveNav(!activeNav);
  };

  

  return (
    <React.Fragment>
      <button className="bp-nav_toggle" type="button" onClick={handleNav}>
        <span className="srOnly">Toggle Navigation</span>
        <div aria-hidden="true" className="bp-nav_toggle-icon">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <nav
        role="navigation"
        aria-label="Main Navigation"
        className={classNames('bp-nav', activeNav ? 'is-active' : null)}
      >
        <span className="srOnly">Primary Navigation</span>
        <div className="bp-nav_content" id="nav">
          <ul className="bp-nav_items">
            {data.sanityNavBar.navItems.map(
    (
      navItem: {
        navL1: NavItemInterface;
        navL2: [NavItemInterface];
      },
      index: number
    ) => <NavigationList nav={navItem} key={index} />)
    }
            
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

interface NavItemInterface {
  name: string;
  path: string;
  landingPage?: {
    name: string;
    path: string;
    slug: {
      current: string;
    };
  };
}
export default SiteNavigation;
