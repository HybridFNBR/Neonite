const sails = require('sails');
const NeoLog = require('./structs/NeoLog')
const { default: axios } = require('axios');
const fs = require("fs");
const ini = require("ini");
const config = ini.parse(fs.readFileSync("config.ini", "utf-8"));

async function compareAndUpdateKeychain() {
	const response = await axios.get('https://fortnitecentral.genxgames.gg/api/v1/aes');
    if (response.status === 200) {
      const data = response.data;
	  const keychain = JSON.parse(fs.readFileSync('./responses/keychain.json', 'utf8'));
      let count = 0;
      const keychainArray = [];

      for (const keys of data.dynamicKeys) {
        if (!keychain.includes(keys.keychain)) {
          count++;
          keychainArray.push(keys.keychain);
        }
      }
      keychain.push(...keychainArray);

      fs.writeFileSync('./responses/keychain.json', JSON.stringify(keychain, null, 2));
      NeoLog.Debug(`Fetched ${count} New Keychains From Fortnite Central`);
    } 
	else if (response.status === 503 || response.status === 403)
	{
		NeoLog.Error(`Failed to update Keychain received status: ${response.status}`)
	}
}

async function startbackend(){
    sails.lift({
      port: 5595,
	  environment: "production",
	  hooks: {
		session: false,
	  },
	  log:{
	  	level: `${config.logLevel}`
	  },
    }, (err) => {
		if(err){
			console.log(err)
		}
    });
  }

  async function runfunctions(){
		await compareAndUpdateKeychain();
		await startbackend();
	}
	runfunctions()