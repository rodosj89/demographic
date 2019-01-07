'use strict';

module.exports = function(app) {
  app.models.Demographic.observe('after save', function logQuery(ctx, next) {
    if (process.env.NODE_ENV != 'test')
      app.io.emit('newDemographic', ctx.instance);
    next();
  });
  app.on('started', function() {
    app.io = require('socket.io').listen(app.server);
  });
};
