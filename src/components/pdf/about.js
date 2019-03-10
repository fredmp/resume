/* eslint-disable react/prop-types */
import React from 'react';

import { HIGHLIGHT_COLOR } from './colors';

export default ({ mainText }) => {
  return (
    <div>
      <h3 style={{ color: HIGHLIGHT_COLOR, fontFamily: 'Georgia' }}>Resume</h3>
      <br />
      {mainText.map(text => (
        <p key={text}>{text}</p>
      ))}
      <br />
    </div>
  );
};
