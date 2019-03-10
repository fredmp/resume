/* eslint-disable react/prop-types */
import React from 'react';

export default ({ email, linkedin, location, github }) => {
  return (
    <div style={{ display: 'table', width: '100%', marginBottom: '30px' }}>
      <div style={{ display: 'table-row-group' }}>
        <div style={{ display: 'table-row' }}>
          <div style={{ display: 'table-cell', padding: '3px 0' }}>
            <span style={{ width: '80px', display: 'inline-block' }}>E-mail:&nbsp;</span>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
          <div style={{ display: 'table-cell', padding: '3px 0' }}>
            <span style={{ width: '80px', display: 'inline-block' }}>Location:&nbsp;</span>
            {location}
          </div>
        </div>
        <div style={{ display: 'table-row' }}>
          <div style={{ display: 'table-cell', padding: '3px 0' }}>
            <span style={{ width: '80px', display: 'inline-block' }}>LinkedIn:&nbsp;</span>
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              {linkedin}
            </a>
          </div>
          <div style={{ display: 'table-cell', padding: '3px 0' }}>
            <span style={{ width: '80px', display: 'inline-block' }}>Github:&nbsp;</span>
            <a href={github} target="_blank" rel="noopener noreferrer">
              {github}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
