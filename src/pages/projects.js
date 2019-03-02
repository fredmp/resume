/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './projects.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import searchIcon from '../images/icons/search.svg';
import javascriptIcon from '../images/icons/javascript.svg';
import rubyIcon from '../images/icons/ruby.svg';
import javaIcon from '../images/icons/java.svg';

const COLORS_BY_LANGUAGE = {
  ruby: 'has-background-danger',
  javascript: 'has-background-info has-text-grey-dark',
  java: 'has-background-success',
};

const colorByLanguage = language => COLORS_BY_LANGUAGE[language] || 'has-background-primary';

const filterProjects = (company, projects, search, language) => {
  const searchIncludes = value =>
    (value || '').toLowerCase().includes((search || '').toLowerCase());
  const projectNames = [];
  const languages = ['javascript', 'ruby', 'java'];
  if (search.length > 1) {
    projects.forEach(project => {
      if (
        searchIncludes(project.name) ||
        searchIncludes(project.language) ||
        project.technologies.find(t => searchIncludes(t)) ||
        project.description_entries.find(d => searchIncludes(d)) ||
        (company && searchIncludes(company.name)) ||
        (company && searchIncludes(company.team)) ||
        (company && searchIncludes(company.position))
      ) {
        projectNames.push(project.name);
      }
    });
  }
  return projects
    .filter(
      project =>
        (!company || company.id === project.company_id) &&
        (projectNames.length === 0 || projectNames.includes(project.name)),
    )
    .filter(
      project =>
        !language ||
        (language === 'other'
          ? !languages.includes(project.language)
          : project.language === language),
    );
};

const Projects = ({ projects, companies }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectingCompany, setSelectingCompany] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [search, setSearch] = useState('');

  const filteredProjects = filterProjects(selectedCompany, projects, search, selectedLanguage);
  const setLanguage = language =>
    setSelectedLanguage(prevState => (prevState === language ? null : language));

  const selectCompany = company => {
    setSelectedCompany(company);
    setSelectingCompany(false);
  };

  return (
    <Layout>
      <SEO title="Projects" keywords={['projects']} />
      <div>
        <div className="filters">
          <p className="buttons">
            <a
              onClick={() => setLanguage('ruby')}
              className={`button is-danger ${selectedLanguage === 'ruby' ? 'is-outlined' : ''}`}
            >
              <span>Ruby</span>
            </a>
            <a
              onClick={() => setLanguage('javascript')}
              className={`button is-info ${
                selectedLanguage === 'javascript' ? 'is-outlined has-text-grey-dark' : ''
              }`}
            >
              <span>Javascript</span>
            </a>
            <a
              onClick={() => setLanguage('java')}
              className={`button is-success ${selectedLanguage === 'java' ? 'is-outlined' : ''}`}
            >
              <span>Java</span>
            </a>
            <a
              onClick={() => setLanguage('other')}
              className={`button is-primary ${selectedLanguage === 'other' ? 'is-outlined' : ''}`}
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

        <div className={`dropdown ${selectingCompany ? 'is-active' : ''}`}>
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

        <project-modal item="selectedProject" />
        <div className="projects">
          {filteredProjects.map(project => (
            <div className="project" key={project.name}>
              <h3 className={colorByLanguage(project.language)}>{project.name}</h3>
              <div className="content">
                {project.description_entries.map(description => (
                  <p key={description}>{description}</p>
                ))}
              </div>
              <hr />
              <div className="tags">
                <div className="tag-content">
                  {project.technologies.map(technology => (
                    <span key={technology} className="tag is-medium">
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

Projects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      company_id: PropTypes.string,
      language: PropTypes.string,
      technologies: PropTypes.arrayOf(PropTypes.string),
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
};

const query = graphql`
  query ProjectsQuery {
    site {
      siteMetadata {
        projects {
          name
          company_id
          language
          technologies
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
export default () => (
  <StaticQuery
    query={query}
    render={data => (
      <Projects
        projects={data.site.siteMetadata.projects}
        companies={data.site.siteMetadata.companies}
      />
    )}
  />
);
