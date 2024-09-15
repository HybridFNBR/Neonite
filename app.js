const sails = require('sails');
const NeoLog = require('./structs/NeoLog')
const { default: axios } = require('axios');
const fs = require("fs");
const {keychain} = require("./config/defs")


async function compareAndUpdateKeychain() {
	const response = await axios.get('https://fortnitecentral.genxgames.gg/api/v1/aes');
	if(response.status = 200){
		const data = response.data;
		const keychain = JSON.parse(fs.readFileSync('./responses/keychain.json'));
		let count = 0
		for (const entry of data["dynamicKeys"]) {
			if (!keychain.includes(entry["keychain"])) {
				count++
				keychain.push(entry["keychain"]);
			}
			fs.writeFileSync('./responses/keychain.json', JSON.stringify(keychain));
		}
		fs.readFile('./responses/keychain.json', 'utf8', (err, data) => {
			if (err) throw err;
			const updated = data.replace(/,/g, ',\n');
			fs.writeFile('./responses/keychain.json', updated, 'utf8', (err) => {
					if (err) throw err;
			});
		})
		NeoLog.Debug(`Fetched ${count} New Keychains From Fortnite Central`)
	}
	else if(response.status = 503){
		NeoLog.Error("Fortnite Central is down falling back to Nitestats for the keychain")
		
		const response = await axios.get('https://api.nitestats.com/v1/epic/keychain');
	  	const data = response.data;
		const localData = JSON.parse(fs.readFileSync('./responses/keychain.json'));
		let count = 0
		for (const entry of data) {
			if (!localData.includes(entry)) {
				count++
				localData.push(entry);
			}
		}
		fs.writeFileSync('./responses/keychain.json', JSON.stringify(localData));
		fs.readFile('./responses/keychain.json', 'utf8', (err, data) => {
			if (err) throw err;

			const updated = data.replace(/,/g, ',\n');
			fs.writeFile('./responses/keychain.json', updated, 'utf8', (err) => {
	 	 		if (err) throw err;
			});
		})
		NeoLog.Debug(`Fetched ${count} New Keychains From Nitestats`)
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
	  	level: 'silent'
	  },
    }, (err) => {
		if(err){
			console.log(err)
		}
    });
	NeoLog.Log('Neonite is up and listening on port 5595!');
  }

  async function runfunctions(){
		await compareAndUpdateKeychain();
		await startbackend();
	}
	runfunctions()