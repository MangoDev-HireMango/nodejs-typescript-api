import userDefinition from './user.definition';
import errorDefinition from './error.definition';
import paginationDefinition from './pagination.definition';

export default {
  ...userDefinition,
  ...errorDefinition,
  ...paginationDefinition,
};
