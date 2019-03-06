import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const Skillset = ({ skillsetGroups }) => {
  const [focusedGroup, setFocusedGroup] = useState(null);

  return (
    <Layout>
      <SEO title="Skillsets" keywords={['skills']} />
      <div className="skillset_groups">
        {skillsetGroups.map(group => (
          <div
            className={`skillset ${focusedGroup === group ? 'highlight-box' : ''}`}
            onMouseEnter={() => setFocusedGroup(group)}
            onMouseLeave={() => setFocusedGroup(null)}
            key={group.name}
          >
            <h3>{group.name}</h3>
            <ul>
              {group.skills.map(skill => (
                <li className="skill" key={skill.name}>
                  <span>{skill.name}</span>
                  <progress className="progress is-primary" value={skill.rate} max="5">
                    {(skill.rate * 100) / 5}
                  </progress>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Layout>
  );
};

Skillset.propTypes = {
  skillsetGroups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description_entries: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          rate: PropTypes.number,
        }),
      ),
    }),
  ).isRequired,
};

const query = graphql`
  query SkillsetQuery {
    site {
      siteMetadata {
        skillsetGroups {
          name
          skills {
            name
            rate
          }
        }
      }
    }
  }
`;
export default () => (
  <StaticQuery
    query={query}
    render={data => <Skillset skillsetGroups={data.site.siteMetadata.skillsetGroups} />}
  />
);
