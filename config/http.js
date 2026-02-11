const NeoLog = require('../structs/NeoLog')

module.exports.http = {
  middleware: {
    order: [
      'LogURL',
      'rawBodyParser',
      'bodyParser',
    ],
    LogURL: function (req, res, next) {
      const startTime = new Date();
      res.on('finish', () => {
        const endTime = new Date();
        const responseTime = endTime - startTime;
        if (req.originalUrl === "/fortnite/api/calendar/v1/timeline" || req.originalUrl === "/account/api/public/account/token") { }
        else if (res.statusCode === 404) {
          NeoLog.warn(`${req.originalUrl}`)
        }
        else {
          NeoLog.URL(`${req.originalUrl} (${responseTime}ms)`);
        }
      });
      next();
    },
    rawBodyParser: function (req, res, next) {
      // Only handle PUT requests to cloud storage
      if (req.method === 'PUT' && req.url.includes('/fortnite/api/cloudstorage/user/')) {
        const chunks = [];
        req.on('data', (chunk) => {
          chunks.push(chunk);
        });
        req.on('end', () => {
          req.rawBody = Buffer.concat(chunks);
          next();
        });
        req.on('error', (err) => {
          console.error('[rawBodyParser] Error:', err);
          next(err);
        });
      } else {
        next();
      }
    },
    bodyParser: require('skipper')({ strict: false }),
  }
};