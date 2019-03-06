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

export const extractPeriodInfo = target => {
  const period = (target.period || '_').split('_');
  const startedAt = period[0];
  const endedAt = period[1];
  const inProgress = endedAt.length === 0;
  return {
    inProgress,
    startedAt: new Date(startedAt),
    endedAt: endedAt ? new Date(endedAt) : new Date(),
  };
};

const extractPeriodText = (startedAt, endedAt, inProgress) => {
  const DATE_FORMAT_OPTIONS = { year: 'numeric', month: 'long', timeZone: 'UTC' };
  const MILISECONDS_TO_DAYS = 1000 * 60 * 60 * 24 * 30;
  const endString = endedAt.toLocaleDateString('en-US', DATE_FORMAT_OPTIONS);
  const startString = startedAt.toLocaleDateString('en-US', DATE_FORMAT_OPTIONS);
  const diff = endedAt - startedAt;
  let year = Math.floor(diff / MILISECONDS_TO_DAYS / 12);
  let month = Math.floor((diff / MILISECONDS_TO_DAYS) % 12);
  if (year < 1 && month < 1) {
    year = 0;
    month = 1;
  }
  year = year >= 1 ? `${year} year${year > 1 ? 's' : ''}` : null;
  month = month >= 1 ? `${month} month${month > 1 ? 's' : ''}` : null;
  const connector = year && month ? ' and ' : '';

  return `${startString} - ${inProgress ? 'present' : endString} (${`${year ||
    ''}${connector}${month || ''}`})`;
};

export const companyPeriod = (company, projects) => {
  if (company.period) {
    const { startedAt, endedAt, inProgress } = extractPeriodInfo(company);
    return extractPeriodText(startedAt, endedAt, inProgress);
  }
  if (projects && projects.length > 0) {
    const { endedAt, inProgress } = projects[0];
    const { startedAt } = projects[projects.length - 1];
    return extractPeriodText(startedAt, endedAt, inProgress);
  }
  return '';
};

export const decorateProject = (project, companies) => {
  const company = findCompany(project.company_id, companies);
  const bgColor = bgColorByLanguage(project.language);
  const textColor = textColorByLanguage(project.language);
  return { ...project, company, bgColor, textColor, ...extractPeriodInfo(project) };
};

export const filterProjects = (company, projects, search, language) => {
  const searchIncludes = value =>
    (value || '').toLowerCase().includes((search || '').toLowerCase());
  const projectNames = [];
  const languages = ['javascript', 'ruby', 'java'];
  if (search && search.length > 1) {
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
    )
    .map(project => ({ ...project, ...extractPeriodInfo(project) }))
    .sort((a, b) =>
      a.inProgress && b.inProgress ? a.name.localeCompare(b.name) : b.endedAt - a.endedAt,
    );
};
