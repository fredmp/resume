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

export const extractPeriodText = ({ startedAt, endedAt, inProgress }) => {
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
    return extractPeriodText(extractPeriodInfo(company));
  }
  if (projects && projects.length > 0) {
    const { endedAt, inProgress } = projects[0];
    const { startedAt } = projects[projects.length - 1];
    return extractPeriodText({ startedAt, endedAt, inProgress });
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

export const generatePDF = async (elementId, filename) => {
  const element = document.querySelector(elementId);
  const resetCSS =
    "<style>a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font:Arial;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}</style>";
  const pdfPrintCSS =
    '<style>@page{size:auto;margin-top:0;margin-bottom:0;margin-left:8mm;margin-right:8mm}@media print{*{-webkit-print-color-adjust:exact}}</style>';
  const customCSS =
    '<style>body{font-size: 18px}h1,h2,h3,h4{font-weight:bold;}h1{font-size:1.4em;}h2{font-size:1.2em;}h3{font-size:1.1em;}h4{font-size:1em;}.project-entry{border-bottom:1px #E5E8E8 solid;page-break-inside: avoid;}.project-entry:last-child{border-bottom:none;}</style>';

  const printWindow = window.open('', '', 'height=400,width=800');
  printWindow.document.write(`<html lang="en">`);
  printWindow.document.write('<head>');
  printWindow.document.write(`<title>${(filename || 'Resume').replace(/\s/g, '-')}</title>`);
  printWindow.document.write(resetCSS);
  printWindow.document.write(pdfPrintCSS);
  printWindow.document.write(customCSS);
  printWindow.document.write('</head>');
  printWindow.document.write('<body>');
  printWindow.document.write(element.innerHTML);
  printWindow.document.write('</body>');
  printWindow.document.write('</html>');
  printWindow.document.close();
  printWindow.print();
};
