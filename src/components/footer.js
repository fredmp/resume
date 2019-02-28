import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ name }) => {
  return (
    <footer className="footer has-background-primary">
      <div className="content has-text-centered">
        <p>
          {'Built by '}
          <a href="https://github.com/fredmp" target="_blank" rel="noopener noreferrer">
            {name}
          </a>
          {' with '}
          <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
            React
          </a>
          {', '}
          <a href="https://www.gatsbyjs.org/" target="_blank" rel="noopener noreferrer">
            Gatsby
          </a>
          {' and '}
          <a href="https://bulma.io" target="_blank" rel="noopener noreferrer">
            Bulma
          </a>
          {' - 2019'}
        </p>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Footer;
