/* eslint-disable react/prop-types */
import React from 'react';

import { HIGHLIGHT_COLOR } from './colors';
import { companyPeriod, filterProjects } from '../../util';
import Project from './project';

export default ({ company, allProjects }) => {
  const projects = filterProjects(company, allProjects);
  return (
    <div key={company.id}>
      <div
        style={{
          backgroundColor: HIGHLIGHT_COLOR,
          color: 'white',
          textAlign: 'center',
          padding: '10px 0',
          marginTop: '10px',
          pageBreakInside: 'avoid',
        }}
      >
        <h2 style={{ marginBottom: '10px', fontFamily: 'Georgia', letterSpacing: '0.5px' }}>
          {company.name}
        </h2>
        <h4 style={{ fontFamily: 'Georgia', letterSpacing: '0.5px' }}>
          {`${company.position}${company.team ? ` - ${company.team}` : ''}`}
        </h4>
      </div>
      <div style={{ margin: '10px auto 0 auto', textAlign: 'center' }}>
        <span style={{ fontStyle: 'italic' }}>{companyPeriod(company, projects)}</span>
      </div>
      {projects.map(project => (
        <Project company={company} project={project} key={`${company.id}-${project.name}`} />
      ))}
    </div>
  );
};
