import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ProjectModal from '../components/projectModal';
import { decorateProject } from '../util';
import Company from '../components/company';

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
          {companies
            .filter(company => !company.unlisted)
            .map((company, index) => {
              const props = { index, company, showModal, allProjects: projects };
              return <Company {...props} key={company.id} />;
            })}
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
      unlisted: PropTypes.bool,
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
          unlisted
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
