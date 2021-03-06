/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';
import Footer from './footer';
import PDFDocument from './pdf';
import '../assets/styles/index.scss';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            name
            title
          }
        }
      }
    `}
    render={data => (
      <Fragment>
        <div className="main-content">
          <Header {...data.site.siteMetadata} />
          {children}
          <Footer {...data.site.siteMetadata} />
        </div>
        <div style={{ display: 'none' }}>
          <PDFDocument />
        </div>
      </Fragment>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
