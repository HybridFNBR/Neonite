const sails = require('sails');
const NeoLog = require('./structs/NeoLog')

sails.lift({
  port: 5595,
}, (err) => {
    console.log(err)
  NeoLog.Log('Neonite is up and listening on port 5595!');
});