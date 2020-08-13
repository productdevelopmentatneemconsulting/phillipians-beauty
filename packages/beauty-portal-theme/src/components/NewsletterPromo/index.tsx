import React, { FunctionComponent, useState } from 'react';
import { Link } from 'gatsby';
import BlockContent from '@sanity/block-content-to-react';
import Form from '../../components/Form';
import { Fieldset, InputText } from '../../components/FormElements';
import { NewsletterPromoInterface } from './models';
import { ReactComponent as Bell } from '../../images/icons/bell.svg';
import { blockTypeDefaultSerializers } from '../../helpers/sanity';
import './styles.scss';

const NewsletterPromo: FunctionComponent<NewsletterPromoInterface> = ({
  headline,
  _rawBody,
  ctaLabel,
  popup,
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
    <section className={'bp-newsletter ' + (popup ? 'no-padding' : '')}>
      <h1 className="bp-newsletter_title">{headline}</h1>
      <div className="bp-newsletter_content">
        {_rawBody && (
          <p className="bp-signup_desc">
            <BlockContent
              serializers={blockTypeDefaultSerializers}
              blocks={_rawBody}
            />
          </p>
        )}

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

        {popup ? (
          <Form onsubmit={handleFormSubmit}>
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
        ) : (
          <Link to="/subscribe/" className="bp-newsletter_link">
            {ctaLabel}
          </Link>
        )}
      </div>
    </section>
  );
};

export default NewsletterPromo;
