const notFoundMiddleware = (req, res, next) => {
  res.status(404).send('Route Not found');
};

export default notFoundMiddleware;
