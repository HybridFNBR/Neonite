const NeoLog = require("../structs/NeoLog");
const fs = require('fs');
const path = require('path');

function getSeasonInfo(req) {
  const userAgent = req.headers["user-agent"];
  const season = userAgent.split('-')[1];
  const seasonglobal = season.split('.')[0];
  return { season, seasonglobal };
}


module.exports.http = {
    middleware: {
      order: [
        'LogURL',   
        'bodyParser'   
      ],
      LogURL: function (req, res, next) {
        try{
          const {seasonglobal} = getSeasonInfo(req);
            if(seasonglobal && /^\d+$/.test(seasonglobal) || seasonglobal == "Cert" || seasonglobal == "Live" || seasonglobal == "Next"){
              const directoryPath = path.join(__dirname, `../ClientSettings/s${seasonglobal}`);
              if(!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath, { recursive: true }); 
              }
              
              const filePath = path.join(directoryPath, 'ClientSettings.sav');
              if(!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, '');            
              }
          }   
          if(req.originalUrl = "/fortnite/api/cloudstorage/user/*" && req.method == "PUT"){
            var rawParser = require("body-parser").raw({type: "*/*"});		
            req.setEncoding("latin1");
              rawParser(req, res, (err) => {
                req.rawBody = ""
                req.on("data", (chunk) => {
                  req.rawBody += chunk
                });
                req.on("end", () => {
                  fs.writeFileSync(path.join(__dirname, `../ClientSettings/s${seasonglobal}/ClientSettings.sav`), req.rawBody, 'latin1');
              });
              });
            return res.status(204).end()
          }
        }
        catch{}
        const startTime = new Date();
        res.on('finish', () => {
          const endTime = new Date();
          const responseTime = endTime - startTime;
          if (req.originalUrl === "/fortnite/api/calendar/v1/timeline") {
          } 
          else 
          {
            NeoLog.URL(`${req.originalUrl} (${responseTime}ms)`);
          }
        });
        next();
        },
        bodyParser: require('skipper')({ strict: false }),
    
    }
}