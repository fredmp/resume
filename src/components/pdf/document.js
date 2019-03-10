/* eslint-disable react/prop-types */
import React from 'react';

import { TEXT_COLOR } from './colors';
import About from './about';
import Contact from './contact';
import Experience from './experience';
import Universities from './universities';
import Courses from './courses';

const Document = ({ data }) => {
  const {
    name,
    email,
    linkedin,
    location,
    github,
    mainText,
    companies,
    projects,
    education,
  } = data.site.siteMetadata;
  return (
    <div
      id="pdfDocument"
      style={{
        margin: 'auto',
        color: TEXT_COLOR,
      }}
    >
      <div
        style={{
          textAlign: 'center',
          fontSize: '24px',
          margin: '40px auto',
        }}
      >
        <h1 style={{ fontFamily: 'Georgia' }}>{name}</h1>
      </div>
      <Contact email={email} linkedin={linkedin} location={location} github={github} />
      <About mainText={mainText} />
      <Experience companies={companies} projects={projects} />
      <Universities universities={education.universities} />
      <Courses courses={education.courses} />
    </div>
  );
};

export default Document;
