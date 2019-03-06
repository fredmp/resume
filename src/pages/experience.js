import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ProjectModal from '../components/projectModal';
import { decorateProject } from '../util';

const arrowClasses = state => `arrow arrow-down ${state && 'active'}`;

const isTabSelected = (tab, name) => tab === name;

const renderCompany = (index, company, allProjects, showModal) => {
  const [showContent, setShowContent] = useState(true);
  const [selectedTab, setSelectedTab] = useState('description');
  const [focusedCompany, setFocusedCompany] = useState(null);
  const [focusedTechnology, setFocusedTechnology] = useState(null);

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
      <div
        className={`timeline-panel ${focusedCompany === company ? 'highlight-box' : ''}`}
        onMouseEnter={() => setFocusedCompany(company)}
        onMouseLeave={() => setFocusedCompany(null)}
      >
        <div className="timeline-heading">
          <h2 className="timeline-company">{company.name}</h2>
          {company.team && <span>{` (${company.team})`}</span>}
          {' - '}
          <span className="timeline-position">{company.position}</span>
          <p className="timeline-period">
            <small className="text-muted">
              <i className="glyphicon glyphicon-time" />
              {company.period}
            </small>
          </p>
          <div
            role="button"
            tabIndex={0}
            className={arrowClasses(showContent)}
            onClick={() => setShowContent(prevState => !prevState)}
            onKeyPress={() => setShowContent(prevState => !prevState)}
          />
        </div>
        {showContent && (
          <div className="timeline-body">
            <div className="tabs is-boxed">
              <ul>
                <li className={isTabSelected(selectedTab, 'description') ? 'is-active' : ''}>
                  <a
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedTab('description')}
                    onKeyPress={() => setSelectedTab('description')}
                  >
                    <span>Description</span>
                  </a>
                </li>
                <li className={isTabSelected(selectedTab, 'projects') ? 'is-active' : ''}>
                  <a
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedTab('projects')}
                    onKeyPress={() => setSelectedTab('projects')}
                  >
                    <span>Projects</span>
                  </a>
                </li>
                <li className={isTabSelected(selectedTab, 'technologies') ? 'is-active' : ''}>
                  <a
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedTab('technologies')}
                    onKeyPress={() => setSelectedTab('technologies')}
                  >
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
                          <a
                            role="button"
                            tabIndex={0}
                            onClick={() => showModal(project)}
                            onKeyPress={() => showModal(project)}
                          >
                            {project.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              {isTabSelected(selectedTab, 'technologies') && (
                <div>
                  {technologies.map(technology => (
                    <span
                      key={technology}
                      className={`tag is-medium box ${
                        focusedTechnology === technology ? 'highlight-tag' : ''
                      }`}
                      onMouseEnter={() => setFocusedTechnology(technology)}
                      onMouseLeave={() => setFocusedTechnology(null)}
                    >
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
  const [selectedProject, setSelectedProject] = useState(null);
  const showModal = project => {
    setSelectedProject(decorateProject(project, companies));
  };

  return (
    <Layout>
      <SEO title="Experience" keywords={['experience']} />
      <div className="experience">
        <ul className="timeline">
          {companies.map((company, index) => renderCompany(index, company, projects, showModal))}
        </ul>
      </div>
      {selectedProject && (
        <ProjectModal project={selectedProject} closeModal={() => setSelectedProject(null)} />
      )}
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
      name: PropTypes.string,
      company_id: PropTypes.string,
      language: PropTypes.string,
      period: PropTypes.string,
      links: PropTypes.arrayOf(PropTypes.string),
      technologies: PropTypes.arrayOf(PropTypes.string),
      contributions: PropTypes.arrayOf(PropTypes.string),
      description_entries: PropTypes.arrayOf(PropTypes.string),
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
          name
          company_id
          language
          links
          period
          technologies
          contributions
          description_entries
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
