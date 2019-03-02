const BG_COLOR_BY_LANGUAGE = {
  ruby: 'has-background-danger',
  javascript: 'has-background-info has-text-grey-dark',
  java: 'has-background-success',
};

const TEXT_COLOR_BY_LANGUAGE = {
  ruby: 'has-text-white',
  javascript: 'has-text-grey-dark',
  java: 'has-text-white',
};

export const bgColorByLanguage = language =>
  BG_COLOR_BY_LANGUAGE[language] || 'has-background-primary';

export const textColorByLanguage = language =>
  TEXT_COLOR_BY_LANGUAGE[language] || 'has-background-primary has-text-white';

export const findCompany = (companyId, companies) =>
  companies.find(company => company.id === companyId);

export const decorateProject = (project, companies) => {
  const company = findCompany(project.company_id, companies);
  const bgColor = bgColorByLanguage(project.language);
  const textColor = textColorByLanguage(project.language);
  return { ...project, company, bgColor, textColor };
};

export const filterProjects = (company, projects, search, language) => {
  const searchIncludes = value =>
    (value || '').toLowerCase().includes((search || '').toLowerCase());
  const projectNames = [];
  const languages = ['javascript', 'ruby', 'java'];
  if (search.length > 1) {
    projects.forEach(project => {
      if (
        searchIncludes(project.name) ||
        searchIncludes(project.language) ||
        project.technologies.find(t => searchIncludes(t)) ||
        project.description_entries.find(d => searchIncludes(d)) ||
        (company && searchIncludes(company.name)) ||
        (company && searchIncludes(company.team)) ||
        (company && searchIncludes(company.position))
      ) {
        projectNames.push(project.name);
      }
    });
  }
  return projects
    .filter(
      project =>
        (!company || company.id === project.company_id) &&
        (projectNames.length === 0 || projectNames.includes(project.name)),
    )
    .filter(
      project =>
        !language ||
        (language === 'other'
          ? !languages.includes(project.language)
          : project.language === language),
    );
};
