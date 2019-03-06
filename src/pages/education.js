import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const renderUniversities = universities => {
  return universities.map(university => {
    return (
      <li key={university.name}>
        <span className="has-text-weight-bold">Institution: </span>
        <span>{university.name}</span>
        <br />
        <span className="has-text-weight-bold">Course: </span>
        <span>{university.course}</span>
        <br />
        <span className="has-text-weight-bold">Period: </span>
        <span>{university.period}</span>
        <br />
      </li>
    );
  });
};

const renderEntries = entries => {
  return entries.map(entry => {
    return (
      <li key={entry.name}>
        <a
          href={entry.link}
          target="_blank"
          rel="noopener noreferrer"
          className="has-text-grey-dark"
        >
          {entry.name}
        </a>
      </li>
    );
  });
};

const arrowClasses = state => `arrow arrow-down ${state && 'active'}`;

const Education = ({ education }) => {
  const [showEducation, setShowEducation] = useState(true);
  const [showCourses, setShowCourses] = useState(true);
  const [showBooks, setShowBooks] = useState(true);

  return (
    <Layout>
      <SEO title="Education" keywords={['education']} />
      <div className="education">
        <div className="universities">
          <div
            role="button"
            tabIndex={0}
            className={arrowClasses(showEducation)}
            onClick={() => {
              setShowEducation(prevState => !prevState);
            }}
            onKeyPress={() => setShowEducation(prevState => !prevState)}
          />
          <h3>Formal Education</h3>
          {showEducation && (
            <div className="content">
              <ul>{renderUniversities(education.universities)}</ul>
            </div>
          )}
        </div>
        <div className="books">
          <div
            role="button"
            tabIndex={0}
            className={arrowClasses(showBooks)}
            onClick={() => setShowBooks(prevState => !prevState)}
            onKeyPress={() => setShowBooks(prevState => !prevState)}
          />
          <h3>Favorite Technical Books</h3>
          {showBooks && (
            <div className="content">
              <ul>{renderEntries(education.books)}</ul>
            </div>
          )}
        </div>
        <div className="courses">
          <div
            role="button"
            tabIndex={0}
            className={arrowClasses(showCourses)}
            onClick={() => setShowCourses(prevState => !prevState)}
            onKeyPress={() => setShowCourses(prevState => !prevState)}
          />
          <h3>
            Recent Courses
            <span> (completed in the last 12 months)</span>
          </h3>
          {showCourses && (
            <div className="content">
              <ul>{renderEntries(education.courses)}</ul>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

Education.propTypes = {
  education: PropTypes.shape({
    universities: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        period: PropTypes.string.isRequired,
        course: PropTypes.string.isRequired,
      }),
    ),
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
      }),
    ),
    books: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
};

const query = graphql`
  query EducationQuery {
    site {
      siteMetadata {
        education {
          universities {
            name
            period
            course
          }
          courses {
            name
            link
          }
          books {
            name
            link
          }
        }
      }
    }
  }
`;
export default () => (
  <StaticQuery
    query={query}
    render={data => <Education education={data.site.siteMetadata.education} />}
  />
);
