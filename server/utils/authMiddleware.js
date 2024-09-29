const authMiddleware = (req, res, next) => {
    if (req.isAuthenticated() || (req.session && req.session.user)) {
      return next();
    }
    res.status(401).json({ message: 'No autorizado' });
  };
  
  module.exports = authMiddleware;
  