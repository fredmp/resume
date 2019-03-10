import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { generatePDF } from '../../util';
import Document from './document';

const PDF = () => (
  <StaticQuery
    query={graphql`
      query ResumeQuery {
        site {
          siteMetadata {
            name
            title
            email
            linkedin
            location
            github
            mainText
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
            education {
              universities {
                name
                course
                period
              }
              courses {
                name
                link
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Fragment>
        <div style={{ display: 'block', margin: 'auto', textAlign: 'center', marginTop: '30px' }}>
          <button
            type="button"
            onClick={() => generatePDF('#pdfDocument', `Resume_${data.site.siteMetadata.name}.pdf`)}
          >
            Print Resume
          </button>
        </div>
        <Document data={data} />
      </Fragment>
    )}
  />
);

export default PDF;
