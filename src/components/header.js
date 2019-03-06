import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { Link } from 'gatsby';

import ContactModal from './contactModal';
import githubIcon from '../assets/images/icons/github.svg';
import linkedInIcon from '../assets/images/icons/linkedin.svg';
import twitterIcon from '../assets/images/icons/twitter.svg';
import downloadIcon from '../assets/images/icons/download.svg';
import menuIcon from '../assets/images/icons/menu.svg';
import profileImage from '../assets/images/profile.png';

const Menu = () => (
  <Fragment>
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
  </Fragment>
);

const Header = ({ name, title }) => {
  const [showModal, setShowModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <Fragment>
      <section className="hero is-primary">
        <div
          className="menu-icon"
          role="button"
          tabIndex={0}
          onClick={() => setShowMobileMenu(prevState => !prevState)}
          onKeyPress={() => setShowMobileMenu(prevState => !prevState)}
        >
          <img src={menuIcon} alt="Open Menu" />
        </div>
        {showMobileMenu ? (
          <div className="menu-mobile">
            <Menu />
          </div>
        ) : (
          <div className="hero-body">
            <div className="container">
              <h1 className="title">{name}</h1>
              <h2 className="subtitle">{title}</h2>
              <img src={profileImage} alt="Profile" />
              <div className="contact-links">
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
                  href="https://github.com/fredmp"
                >
                  <img src={githubIcon} alt="Github" width="40" height="30" />
                  <span>Github</span>
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
                <a
                  className="navbar-item social"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://lagosvagas.com.br/resume-frederico.pdf"
                >
                  <img src={downloadIcon} alt="Resume PDF" width="40" height="30" />
                  <span>Resume</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </section>
      <div className="tabs main-tabs is-boxed is-centered">{<Menu />}</div>
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
