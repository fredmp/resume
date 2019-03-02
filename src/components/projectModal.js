import React from 'react';
import PropTypes from 'prop-types';

import javascriptIcon from '../images/icons/javascript.svg';
import rubyIcon from '../images/icons/ruby.svg';
import javaIcon from '../images/icons/java.svg';

const ICON_BY_LANGUAGE = {
  ruby: rubyIcon,
  javascript: javascriptIcon,
  java: javaIcon,
};

const ProjectModal = ({ project, closeModal }) => {
  const language = ['javascript', 'ruby', 'java'].includes(project.language) && project.language;
  const icon = ICON_BY_LANGUAGE[language];
  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-card">
        <header className={`modal-card-head ${project.bgColor}`}>
          <p className={`modal-card-title ${project.textColor}`}>{project.name}</p>
          <button type="button" className="delete" aria-label="close" onClick={closeModal} />
        </header>
        <section className="modal-card-body">
          <div className="project-modal">
            <div className="content">
              <div>
                <span className="has-text-weight-bold">Company: </span>
                <span>{project.company && project.company.name}</span>
                <br />
              </div>
              {project.description_entries && (
                <div>
                  {project.description_entries.map(description => (
                    <p key={description}>{description}</p>
                  ))}
                </div>
              )}
              {project.contributions && (
                <div>
                  <span className="has-text-weight-bold">My contributions:</span>
                  <br />
                  {project.contributions.map(contribution => (
                    <p key={contribution}>{contribution}</p>
                  ))}
                </div>
              )}
              {project.learning && (
                <div>
                  <span className="has-text-weight-bold">What I learned: </span>
                  <span>{project.learning}</span>
                </div>
              )}
              {project.links && (
                <div>
                  <ul>
                    {project.links.map(link => (
                      <li key={link}>
                        <a href={link} target="_blank" rel="noopener noreferrer">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <hr />
              <div className="tags">
                <div>
                  {project.technologies.map(technology => (
                    <span key={technology} className="tag is-medium">
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {language && <img alt={`${language} icon`} src={icon} width="25" height="25" />}
        </section>
        <footer className="modal-card-foot">
          <button type="button" className="button" onClick={closeModal}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

ProjectModal.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string,
    company_id: PropTypes.string,
    language: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.string),
    technologies: PropTypes.arrayOf(PropTypes.string),
    description_entries: PropTypes.arrayOf(PropTypes.string),
    company: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      team: PropTypes.string,
      position: PropTypes.string,
    }),
    textColor: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ProjectModal;