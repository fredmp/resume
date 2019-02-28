import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'gatsby';

import emailIcon from '../images/icons/email.svg';
import githubIcon from '../images/icons/github.svg';
import linkedInIcon from '../images/icons/linkedin.svg';
import twitterIcon from '../images/icons/twitter.svg';
import profileImage from '../images/profile.png';

const Header = ({ name, title }) => (
  <Fragment>
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">{name}</h1>
          <h2 className="subtitle">{title}</h2>
          <img src={profileImage} alt="Profile" />
          <div className="contact-links">
            <a href="/#" className="navbar-item social">
              <img src={emailIcon} alt="Contact" width="40" height="30" />
              <span>Contact me</span>
            </a>
            <a
              className="navbar-item social"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/fredmp"
            >
              <img src={githubIcon} alt="Github" width="40" height="30" />
              <span>Github</span>
            </a>
            <a
              className="navbar-item social"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/fredmp"
            >
              <img src={linkedInIcon} alt="Linkedin" width="40" height="30" />
              <span>Linkedin</span>
            </a>
            <a
              className="navbar-item social"
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/fredmp"
            >
              <img src={twitterIcon} alt="Twitter" width="40" height="30" />
              <span>Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </section>
    <div className="tabs main-tabs is-boxed is-centered">
      <ul>
        <li className="{'is-active': isActive('index') }">
          <Link to="/">About me</Link>
        </li>
        <li className="{'is-active': isActive('experience') }">
          <a href="/experience">Experience</a>
        </li>
        <li className="{'is-active': isActive('skillset') }">
          <a href="/skillset">Skillset</a>
        </li>
        <li className="{'is-active': isActive('projects') }">
          <a href="/projects">Projects</a>
        </li>
        <li className="{'is-active': isActive('education') }">
          <Link to="/education">Education</Link>
        </li>
      </ul>
    </div>
  </Fragment>
);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
