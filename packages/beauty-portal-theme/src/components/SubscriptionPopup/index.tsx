import React, { FunctionComponent, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { SubscriptionPopupInterface } from './model';
import { ReactComponent as Close } from '../../images/icons/close.svg';
import NewsletterPromo from '../NewsletterPromo';
import SocialMenu from '../SocialMenu';
import './styles.scss';

const SubscriptionPopup: FunctionComponent<SubscriptionPopupInterface> = ({
  open,
  setOpen,
}) => {
  const data = useStaticQuery(graphql`
    query subscriptionPopupSocialLinks {
      linksInfo: sanityBrandInfo {
        pinteresturl
        twitterurl
        youtubeurl
        facebookurl
        instaurl
      }
      subscriptionInfo: sanityNewsletterBlock(
        name: { eq: "Newsletter Promo" }
      ) {
        name
        headline
        _rawBody(resolveReferences: { maxDepth: 10 })
        ctaLabel
      }
    }
  `);

  useEffect(() => {
    open &&
      typeof window !== 'undefined' &&
      window.document.body.setAttribute('style', `overflow: hidden`);
    !open &&
      typeof window !== 'undefined' &&
      window.document.body.setAttribute('style', `overflow: unset`);
  }, [open]);

  const handleOutsideClick = (ref, handler) => {
    useEffect(() => {
      const listener = event => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };

      typeof window !== 'undefined' &&
        window.document.addEventListener('mousedown', listener);

      return () => {
        typeof window !== 'undefined' &&
          window.document.removeEventListener('mousedown', listener);
      };
    }, []); // Empty array ensures that effect is only run on mount and unmount
  };

  const ref = useRef();

  handleOutsideClick(ref, () => setOpen(false));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      id="open-modal"
      className={'modal-window ' + (open ? 'visible-modal' : '')}
    >
      <div className="modal-dialog" ref={ref}>
        <div className="modal-content">
          <div className="modal-header">
            <button
              onClick={handleClose}
              type="button"
              className="modal-close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <Close />
            </button>
          </div>

          <div className="modal-body">
            <NewsletterPromo
              headline={data.subscriptionInfo.headline}
              _rawBody={data.subscriptionInfo._rawBody}
              popup={open}
              ctaLabel={data.subscriptionInfo.ctaLabel}
            />

            <p className="follow-title">
              <strong>Follow us</strong>
            </p>

            <div className="follow-links">
              <SocialMenu links={data.linksInfo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPopup;
