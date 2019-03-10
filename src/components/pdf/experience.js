/* eslint-disable react/prop-types */
import React from 'react';

import { HIGHLIGHT_COLOR } from './colors';
import Company from './company';

export default ({ companies, projects }) => {
  return (
    <div>
      <h3 style={{ color: HIGHLIGHT_COLOR, fontFamily: 'Georgia' }}>Experience</h3>
      <br />
      {companies
        .filter(company => !company.unlisted)
        .map(company => (
          <Company company={company} allProjects={projects} key={company.id} />
        ))}
      <br />
    </div>
  );
};
