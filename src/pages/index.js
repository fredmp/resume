/* eslint-disable react/prop-types */
import React, { useState, useEffect, Fragment } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ContactModal from '../components/contactModal';
import emailIcon from '../assets/images/icons/email.svg';

const IndexPage = ({ location }) => {
  const [showModal, setShowModal] = useState(false);
  const [showContactFormFeedback, setShowContactFormFeedback] = useState(false);

  useEffect(() => {
    setShowContactFormFeedback((location.search || '').includes('contact=true'));
    const timer = setTimeout(() => setShowContactFormFeedback(false), 4000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Layout>
      <SEO title="About me" keywords={['portfolio', 'resume', 'ruby', 'javascript', 'react']} />
      <div className="main-text">
        {showContactFormFeedback ? (
          <div className="has-text-centered">
            <br />
            <h4>Email was sent successfully. I&apos;ll reply soon. Thanks!</h4>
          </div>
        ) : (
          <Fragment>
            <div className="text-content has-text-centered">
              <p>
                Hi! My name is Frederico. I&apos;m a software engineer living in Rio de Janeiro,
                Brazil.
              </p>
              <p>
                Currently, I work primarily with Ruby (Rails) and Javascript (React, Node, Express
                and Vue).
              </p>
              <p>I&apos;m available for remote projects! Please feel free to contact me.</p>
            </div>
            <h4>Get in touch</h4>
            <div className="contact-links">
              <a
                role="button"
                tabIndex={0}
                className="navbar-item social button is-primary"
                onClick={() => setShowModal(true)}
                onKeyPress={() => setShowModal(true)}
              >
                <img src={emailIcon} alt="Contact" width="40" height="30" />
                <span>Contact me</span>
              </a>
            </div>
          </Fragment>
        )}
      </div>
      {showModal && (
        <ContactModal
          closeModal={() => {
            setShowModal(false);
          }}
        />
      )}
    </Layout>
  );
};

export default IndexPage;
