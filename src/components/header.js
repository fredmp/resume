/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { Link } from 'gatsby';

import ContactModal from './contactModal';
import emailIcon from '../images/icons/email.svg';
import githubIcon from '../images/icons/github.svg';
import linkedInIcon from '../images/icons/linkedin.svg';
import twitterIcon from '../images/icons/twitter.svg';
import profileImage from '../images/profile.png';

const Header = ({ name, title }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{name}</h1>
            <h2 className="subtitle">{title}</h2>
            <img src={profileImage} alt="Profile" />
            <div className="contact-links">
              <a className="navbar-item social" onClick={() => setShowModal(true)}>
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
        <Link to="/" activeClassName="is-active" key="about">
          About me
        </Link>
        <Link to="/experience" activeClassName="is-active" key="experience">
          Experience
        </Link>
        <Link to="/skillset" activeClassName="is-active" key="skillset">
          Skillset
        </Link>
        <Link to="/projects" activeClassName="is-active" key="projects">
          Projects
        </Link>
        <Link to="/education" activeClassName="is-active" key="education">
          Education
        </Link>
      </div>
      {showModal && (
        <ContactModal
          closeModal={() => {
            setShowModal(false);
          }}
        />
      )}
    </Fragment>
  );
};

Header.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
