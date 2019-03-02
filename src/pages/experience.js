/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './experience.scss';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const arrowClasses = state => `arrow arrow-down ${state && 'active'}`;

const isTabSelected = (tab, name) => tab === name;

const renderCompany = (index, company, allProjects) => {
  const [showContent, setShowContent] = useState(true);
  const [selectedTab, setSelectedTab] = useState('description');

  const projects = allProjects.filter(project => project.company_id === company.id);
  const technologies = projects
    .reduce((acc, project) => [...acc, ...project.technologies], [])
    .filter((value, i, self) => self.indexOf(value) === i);

  return (
    <li
      className={index % 2 === 0 ? 'timeline-inverted' : ''}
      key={`${company.id}-${company.position}`}
    >
      <div className="timeline-badge">
        <i className="glyphicon glyphicon-check" />
      </div>
      <div className="timeline-panel">
        <div className="timeline-heading">
          <h2 className="timeline-company">{company.name}</h2>
          {company.team && <span>{`(${company.team})`}</span>}
          {' - '}
          <span className="timeline-position">{company.position}</span>
          <p className="timeline-period">
            <small className="text-muted">
              <i className="glyphicon glyphicon-time" />
              {company.period}
            </small>
          </p>
          <div
            className={arrowClasses(showContent)}
            onClick={() => setShowContent(prevState => !prevState)}
          />
        </div>
        {showContent && (
          <div className="timeline-body">
            <div className="tabs is-boxed">
              <ul>
                <li className={isTabSelected(selectedTab, 'description') ? 'is-active' : ''}>
                  <a onClick={() => setSelectedTab('description')}>
                    <span>Description</span>
                  </a>
                </li>
                <li className={isTabSelected(selectedTab, 'projects') ? 'is-active' : ''}>
                  <a onClick={() => setSelectedTab('projects')}>
                    <span>Projects</span>
                  </a>
                </li>
                <li className={isTabSelected(selectedTab, 'technologies') ? 'is-active' : ''}>
                  <a onClick={() => setSelectedTab('technologies')}>
                    <span>Technologies</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="timeline-content">
              {isTabSelected(selectedTab, 'projects') && (
                <div>
                  {projects.length > 0 && (
                    <ul className="projects">
                      {projects.map(project => (
                        <li key={`${project.name}-${company.id}`}>
                          <Link to="/projects" state={{ projectName: project.name }}>
                            {project.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              {isTabSelected(selectedTab, 'technologies') && (
                <div>
                  {technologies.map(technology => (
                    <span key={technology} className="tag is-medium">
                      {technology}
                    </span>
                  ))}
                </div>
              )}
              {isTabSelected(selectedTab, 'description') && (
                <div className="description_entries">
                  {company.description_entries.map(description => (
                    <p key={`${description}-${new Date().getTime()}`}>{description}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

const Experience = ({ companies, projects }) => {
  return (
    <Layout>
      <SEO title="Experience" keywords={['experience']} />
      <div className="experience">
        <ul className="timeline">
          {companies.map((company, index) => renderCompany(index, company, projects))}
        </ul>
      </div>
    </Layout>
  );
};

Experience.propTypes = {
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      position: PropTypes.string,
      period: PropTypes.string,
      team: PropTypes.string,
      listed: PropTypes.boolean,
      description_entries: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      company_id: PropTypes.string,
      name: PropTypes.string,
      technologies: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
};

const query = graphql`
  query ExperienceQuery {
    site {
      siteMetadata {
        companies {
          id
          name
          position
          period
          team
          listed
          description_entries
        }
        projects {
          company_id
          name
          technologies
        }
      }
    }
  }
`;
export default () => (
  <StaticQuery
    query={query}
    render={data => (
      <Experience
        companies={data.site.siteMetadata.companies}
        projects={data.site.siteMetadata.projects}
      />
    )}
  />
);
