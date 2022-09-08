import NotFound from './NotFound';
import ApiError from './ApiError';
import BadRequest from './BadRequest';

module.exports = {
  ...NotFound,
  ...ApiError,
  ...BadRequest,
};
