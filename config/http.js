const NeoLog = require('../structs/NeoLog')

module.exports.http = {
  middleware: {
    order: [
      'LogURL',
      'bodyParser',
    ],
    LogURL: function (req, res, next) {
      const startTime = new Date();
      res.on('finish', () => {
        const endTime = new Date();
        const responseTime = endTime - startTime;
        if (req.originalUrl === "/fortnite/api/calendar/v1/timeline" || req.originalUrl === "/account/api/public/account/token") {
        } else {
          NeoLog.URL(`${req.originalUrl} (${responseTime}ms)`);
        }
      });
      next();
    },
    bodyParser: require('skipper')({ strict: false }),
  }
};