import React, { FunctionComponent } from 'react';
import { ReactComponent as Follow } from '../../images/icons/follow.svg';
import SocialMenu from '../SocialMenu';

const NewsletterFollow: FunctionComponent<NewsletterFollowInterface> = ({
  links,
  label,
}) => {
  return (
    <div className="bp-follow">
      <div className="bp-follow_button">
        <Follow />
        <div className="bp-follow_popup">
          <div className="p20">
            <SocialMenu links={links} footer="" />
            <div className="bp-newsletter">
              <a className="bp-newsletter_button" href="/subscribe">
                {label}
              </a>
            </div>
          </div>
        </div>
        <span className="srOnly">Follow &amp; Subscribe</span>
      </div>
    </div>
  );
};

interface NewsletterFollowInterface {
  label: string;
  links: any;
}

export default NewsletterFollow;
