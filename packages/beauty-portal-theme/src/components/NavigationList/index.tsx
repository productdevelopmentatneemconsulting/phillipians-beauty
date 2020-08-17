import React, { FunctionComponent, useState } from 'react';
import {  Link } from 'gatsby';
import "./styles.scss";

const NavigationList: FunctionComponent<{nav: any}> = ({nav}) => {

  const [isOpen, toggle] = useState(false);
  
  const getUrl = (navItem: NavItemInterface) => {
    let url;
    if (navItem.path) {
      url = navItem.path;
    } else if (navItem.landingPage) {
      url = navItem.landingPage.path;
    } else {
      url = '#';
    }

    return url;
  };

  function handleNav(e: any) {
    e.preventDefault();
    toggle(!isOpen)
  }

  return (
      <li className="bp-nav-item">
        <a href={getUrl(nav.navL1)} onClick={handleNav} className="bp-nav-item_link">
          {nav.navL1.name}
          {nav.navL2.length ? (
            <span aria-hidden="true" className={isOpen ? "bp-nav-item_icon_open": "bp-nav-item_icon_close"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                svg-inline=""
                role="presentation"
                focusable="false"
              >
                <path d="M0 6a.5.5 0 01.853-.354l8.646 8.646 8.646-8.646a.5.5 0 01.707.707l-9 9a.5.5 0 01-.707 0l-9-9a.498.498 0 01-.146-.354z"></path>
              </svg>
            </span>
          ) : null}
        </a>
        {nav.navL2.length ? (
          isOpen && <div className="bp-nav-item_subnav">
            <ul className="bp-nav-item_subnav-items">
              {nav.navL2.map((nav: any) => (
                <li key={nav.name}>
                  <Link
                    tabIndex="0"
                    to={getUrl(nav)}
                    className="bp-nav-item_subnav-link"
                  >
                    {nav.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </li>)
}

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

export default NavigationList