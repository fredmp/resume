/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';

import { HIGHLIGHT_COLOR } from './colors';

export default ({ courses }) => {
  return (
    courses && (
      <div style={{ marginTop: '20px' }}>
        <h3 style={{ color: HIGHLIGHT_COLOR, fontFamily: 'Georgia' }}>
          Recent Courses
          <span
            style={{
              color: 'black',
              fontSize: '14px',
              fontWeight: 'regular',
              fontFamily: 'Arial',
            }}
          >
            {' '}
            (completed in the last 12 months)
          </span>
        </h3>
        <br />
        <div>
          <div>
            {courses.map(course => (
              <Fragment key={course.name}>
                <a href={course.link} target="_blank" rel="noopener noreferrer">
                  {course.name}
                </a>
                <br />
              </Fragment>
            ))}
          </div>
        </div>
        <br />
      </div>
    )
  );
};
