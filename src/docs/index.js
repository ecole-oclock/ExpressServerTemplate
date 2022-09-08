import basicInfo from './basicInfo';
import servers from './servers';
import components from './components';
import tags from './tags';
import paths from './paths';

module.exports = {
  ...basicInfo,
  ...servers,
  ...components,
  ...tags,
  ...paths,
  security: [{ bearerAuth: [] }],
};
