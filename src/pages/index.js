/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './index.scss';
import React, { useState } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ContactModal from '../components/contactModal';
import emailIcon from '../images/icons/email.svg';

const IndexPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Layout>
      <SEO title="Home" keywords={['portfolio', 'resume', 'ruby', 'javascript', 'react']} />
      <div className="main-text">
        <div className="text-content has-text-centered">
          <p>
            Hi! My name is Frederico. I&apos;m a software engineer living in Rio de Janeiro, Brazil.
          </p>
          <p>
            Currently, I work primarily with Ruby (Rails) and Javascript (React, Node, Express and
            Vue).
          </p>
          <p>I&apos;m available for remote projects! Please feel free to contact me.</p>
        </div>
        <h4>Get in touch</h4>
        <div className="contact-links">
          <a className="navbar-item social button is-primary" onClick={() => setShowModal(true)}>
            <img src={emailIcon} alt="Contact" width="40" height="30" />
            <span>Contact me</span>
          </a>
        </div>
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
