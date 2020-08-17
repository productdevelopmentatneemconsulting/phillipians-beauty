import React, { FunctionComponent, useState } from 'react';
import { Link } from 'gatsby';
import BlockContent from '@sanity/block-content-to-react';
import Form from '../../components/Form';
import { Fieldset, InputText } from '../../components/FormElements';
import { NewsletterPromoInterface } from './models';
import { ReactComponent as Bell } from '../../images/icons/bell.svg';
import { ReactComponent as Arrow } from '../../images/icons/right-arrow.svg';
import { blockTypeDefaultSerializers } from '../../helpers/sanity';
import './styles.scss';

const NewsletterPromo: FunctionComponent<NewsletterPromoInterface> = ({
  headline,
  _rawBody,
  ctaLabel,
  popup,
  footer,
  onFormSubmission,
  isFormSubmitted,
}) => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setvalidEmail] = useState(false);
  const [hasSubmitted, setSubmission] = useState(false);

  const isValidData = () => {
    if (isValidEmail) {
      return true;
    } else {
      return false;
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const subscriptionData = {
      contact: {
        email: email,
      },
      answer: true,
    };
    if (isValidData()) {
      onFormSubmission(subscriptionData);
    } else {
      setSubmission(true);
    }
  };

  const handleEmailChange = event => {
    setvalidEmail(event.target.value.length > 0);
    setEmail(event.target.value);
  };

  return (
    <>
      {isFormSubmitted && (
        <div className="bp-signup_thanks">
          <Bell />
          <h2>Thankyou for signing up!</h2>
          <p>
            You will be the first to know about articles, products, tutorials,
            helpful tips &amp; contests. You will get updates that are most
            important to you.
          </p>
        </div>
      )}

      {footer && (
        <section className={'bp-newsletter_footer'}>
          <h2 className="bp-newsletter_footer-title">{headline}</h2>
          <p className="bp-newsletter_footer-desc">
            <BlockContent
              serializers={blockTypeDefaultSerializers}
              blocks={_rawBody}
            />
          </p>
          <Form onsubmit={handleFormSubmit} footer={footer}>
            <Fieldset legend="Personal Information">
              <InputText
                label="Email"
                type="email"
                id="email"
                required={true}
                value={email}
                onChange={handleEmailChange}
                valid={isValidEmail}
                validate={hasSubmitted}
              />
            </Fieldset>
            <button
              type="submit"
              name="submit"
              aria-label="Subscribe us"
              onClick={handleFormSubmit}
              className="bp-newsletter_footer-cta"
            >
              <Arrow />
            </button>
          </Form>
        </section>
      )}

      {popup && (
        <section className={'bp-newsletter '}>
          <h1 className="bp-newsletter_title">{headline}</h1>
          <p className="bp-signup_desc">
            <BlockContent
              serializers={blockTypeDefaultSerializers}
              blocks={_rawBody}
            />
          </p>
          <Form onsubmit={handleFormSubmit} footer="">
            <Fieldset legend="Personal Information">
              <InputText
                label="Email"
                type="email"
                id="email"
                required={true}
                value={email}
                onChange={handleEmailChange}
                valid={isValidEmail}
                validate={hasSubmitted}
              />
            </Fieldset>
            <input
              type="submit"
              name="submit"
              value={ctaLabel}
              onClick={handleFormSubmit}
              className="bp-newsletter_cta"
            />
          </Form>
        </section>
      )}
    </>
  );
};

export default NewsletterPromo;
