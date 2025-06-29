// Add this file to expose the x-total-count header for CORS in json-server

module.exports = (req, res, next) => {
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
};
