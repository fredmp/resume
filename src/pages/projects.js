/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ProjectModal from '../components/projectModal';
import { bgColorByLanguage, decorateProject, filterProjects } from '../util';

import searchIcon from '../assets/images/icons/search.svg';
import javascriptIcon from '../assets/images/icons/javascript.svg';
import rubyIcon from '../assets/images/icons/ruby.svg';
import javaIcon from '../assets/images/icons/java.svg';

const Projects = ({ projects, companies, location }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectingCompany, setSelectingCompany] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [focusedProject, setFocusedProject] = useState(null);
  const [search, setSearch] = useState('');

  const filteredProjects = filterProjects(selectedCompany, projects, search, selectedLanguage);
  const setLanguage = language =>
    setSelectedLanguage(prevState => (prevState === language ? null : language));

  const selectCompany = company => {
    setSelectedCompany(company);
    setSelectingCompany(false);
  };

  const showModal = project => {
    setSelectedProject(decorateProject(project, companies));
  };

  const closeModal = () => setSelectedProject(null);

  useEffect(() => {
    const projectName = location.state && location.state.projectName;
    if (projectName) {
      const project = projects.find(p => p.name === projectName);
      showModal(project);
    }
  }, []);

  return (
    <Layout>
      <SEO title="Projects" keywords={['projects']} />
      <div>
        <div className="filters">
          <p className="buttons">
            <a
              onClick={() => setLanguage('ruby')}
              className={`button is-danger ${selectedLanguage === 'ruby' ? '' : 'is-outlined'}`}
            >
              <span>Ruby</span>
            </a>
            <a
              onClick={() => setLanguage('javascript')}
              className={`button is-info ${
                selectedLanguage === 'javascript' ? '' : 'is-outlined has-text-grey-dark'
              }`}
            >
              <span>Javascript</span>
            </a>
            <a
              onClick={() => setLanguage('java')}
              className={`button is-success ${selectedLanguage === 'java' ? '' : 'is-outlined'}`}
            >
              <span>Java</span>
            </a>
            <a
              onClick={() => setLanguage('other')}
              className={`button is-primary ${selectedLanguage === 'other' ? '' : 'is-outlined'}`}
            >
              <span>Other</span>
            </a>
          </p>
        </div>
        <br />
        <div className="search-bar field">
          <p className="control has-icons-left">
            <input
              className="input"
              type="text"
              placeholder="Search by keyword"
              onChange={e => setSearch(e.target.value)}
            />
            <span className="icon is-small is-left">
              <img src={searchIcon} width="20" height="20" alt="Search" />
            </span>
          </p>
        </div>

        <div className={`choose-company dropdown ${selectingCompany ? 'is-active' : ''}`}>
          <div className="dropdown-trigger">
            <button
              type="button"
              className="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
              onClick={() => setSelectingCompany(prevState => !prevState)}
            >
              <span>{selectedCompany ? selectedCompany.name : 'Choose a company'}</span>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true" />
              </span>
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <a
                onClick={() => selectCompany(null)}
                key={-1}
                className={`dropdown-item ${selectedCompany === null ? 'is-active' : ''}`}
              >
                All Companies
              </a>
              {companies.map(company => (
                <a
                  onClick={() => selectCompany(company)}
                  key={`${company.id}-${company.position}`}
                  className={`dropdown-item ${selectedCompany === company.name ? 'is-active' : ''}`}
                >
                  {company.name}
                  {company.team ? `(${company.team})` : ''}
                </a>
              ))}
            </div>
          </div>
        </div>

        {selectedProject && <ProjectModal project={selectedProject} closeModal={closeModal} />}
        <div className="projects">
          {filteredProjects.map(project => (
            <div
              className={`project ${focusedProject === project ? 'highlight-box' : ''}`}
              key={project.name}
              onClick={() => showModal(project)}
              onMouseEnter={() => setFocusedProject(project)}
              onMouseLeave={() => setFocusedProject(null)}
            >
              <h3 className={bgColorByLanguage(project.language)}>{project.name}</h3>
              <div className="content">
                {project.description_entries.map(description => (
                  <p key={description}>{description}</p>
                ))}
              </div>
              <hr />
              <div className="tags">
                <div className="tag-content">
                  {project.technologies.map(technology => (
                    <span key={technology} className="tag is-medium box">
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
              {project.language === 'javascript' && (
                <img alt="Javascript" src={javascriptIcon} width="25" height="25" />
              )}
              {project.language === 'ruby' && (
                <img alt="Ruby" src={rubyIcon} width="25" height="25" />
              )}
              {project.language === 'java' && (
                <img alt="Java" src={javaIcon} width="25" height="25" />
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

Projects.defaultProps = {
  location: null,
};

Projects.propTypes = {
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
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      team: PropTypes.string,
      position: PropTypes.string,
    }),
  ).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      projectName: PropTypes.string,
    }),
  }),
};

const query = graphql`
  query ProjectsQuery {
    site {
      siteMetadata {
        projects {
          name
          company_id
          language
          period
          links
          technologies
          contributions
          description_entries
        }
        companies {
          id
          name
          team
          position
        }
      }
    }
  }
`;

// eslint-disable-next-line react/prop-types
export default ({ location }) => (
  <StaticQuery
    query={query}
    render={data => (
      <Projects
        projects={data.site.siteMetadata.projects}
        companies={data.site.siteMetadata.companies}
        location={location}
      />
    )}
  />
);
