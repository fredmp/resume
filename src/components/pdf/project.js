/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';

import { extractPeriodText } from '../../util';

export default ({ company, project }) => {
  return (
    <div
      key={`${company.id}-${project.name}`}
      style={{ paddingTop: '20px', paddingBottom: '20px' }}
      className="project-entry"
    >
      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <h3 style={{ marginBottom: '5px', fontFamily: 'Georgia' }}>{project.name}</h3>
        <span style={{ fontStyle: 'italic' }}>{extractPeriodText(project)}</span>
      </div>
      {project.description_entries && (
        <div style={{ display: 'table', margin: '10px 0' }}>
          <span style={{ width: '130px', fontWeight: 'bold', display: 'table-cell' }}>
            Description:
          </span>
          <div style={{ display: 'table-cell' }}>
            {project.description_entries.map(text => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>
      )}
      {project.contributions && (
        <div style={{ display: 'table', margin: '10px 0' }}>
          <span style={{ width: '130px', fontWeight: 'bold', display: 'table-cell' }}>
            Contributions:
          </span>
          <div style={{ display: 'table-cell' }}>
            <ul style={{ listStyle: 'square', marginLeft: '20px' }}>
              {project.contributions.map(text => (
                <li style={{ width: '100%' }} key={text}>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {project.links && (
        <div style={{ display: 'table', margin: '10px 0' }}>
          <span style={{ width: '130px', fontWeight: 'bold', display: 'table-cell' }}>Links:</span>
          <div style={{ display: 'table-cell' }}>
            {project.links.map(link => (
              <Fragment key={link}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
                <br />
              </Fragment>
            ))}
          </div>
        </div>
      )}
      {project.technologies && (
        <div style={{ display: 'table', margin: '10px 0' }}>
          <span style={{ width: '130px', fontWeight: 'bold', display: 'table-cell' }}>
            Keywords:
          </span>
          <div style={{ display: 'table-cell' }}>
            <span>{project.technologies.join(', ')}</span>
          </div>
        </div>
      )}
    </div>
  );
};
