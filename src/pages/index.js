import './index.scss';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import emailIcon from '../images/icons/email.svg';
import calendarIcon from '../images/icons/calendar.svg';

const IndexPage = () => (
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
        <a href="/#" className="navbar-item social button is-primary">
          <img src={emailIcon} alt="Contact" width="40" height="30" />
          <span>Contact me</span>
        </a>
        <a href="/#" className="navbar-item social button is-primary">
          <img src={calendarIcon} alt="Schedule" width="40" height="30" />
          <span>Schedule a call</span>
        </a>
      </div>
    </div>
  </Layout>
);

export default IndexPage;
