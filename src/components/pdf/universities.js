/* eslint-disable react/prop-types */
import React from 'react';

import { HIGHLIGHT_COLOR } from './colors';

export default ({ universities }) => {
  return (
    universities && (
      <div style={{ marginTop: '20px' }}>
        <h3 style={{ color: HIGHLIGHT_COLOR, fontFamily: 'Georgia' }}>Education</h3>
        <br />
        <div>
          <div>
            {universities.map(university => (
              <p key={university.name}>
                <span style={{ fontWeight: 'bold' }}>{university.name}</span>
                <span style={{ margin: '0 5px' }}>-</span>
                <span>{university.course}</span>
                <span style={{ marginRight: '5px' }}>,</span>
                <span>{university.period}</span>
              </p>
            ))}
          </div>
        </div>
        <br />
      </div>
    )
  );
};
