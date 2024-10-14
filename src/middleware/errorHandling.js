const errorHandling = (error, req, res, next) => {
    if (error) {
      res.send({ error: true, message: error.message });
    }
  };
  
  module.exports = errorHandling;
  