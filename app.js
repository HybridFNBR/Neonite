const sails = require("sails");
const NeoLog = require("./structs/NeoLog")
const { default: axios } = require("axios");
const fs = require("fs");
const ini = require("ini");
const config = ini.parse(fs.readFileSync("config.ini", "utf-8"));
const keychain = JSON.parse(fs.readFileSync("./responses/keychain.json", "utf-8"));

async function compareAndUpdateKeychain() {
    const response = await axios.get('https://fortnitecentral.genxgames.gg/api/v1/aes', {validateStatus: () => true});    
    if (response.status === 200) {
        const data = response.data;

        let missingCount = 0;
        const keychainArray = [];

        for (const keys of data.dynamicKeys) {
            if (!keychain.includes(keys.keychain)) {
                missingCount++;
                keychainArray.push(keys.keychain);
            }
        }
        keychain.push(...keychainArray);

        fs.writeFileSync("./responses/keychain.json", JSON.stringify(keychain, null, 2));
        NeoLog.Debug(`Fetched ${missingCount} New Keychains from Fortnite Central.`);
    } 
    else if (response.status === 503 || response.status === 403 | response.status === 404) {
        NeoLog.Error("Fortnite Central is down, falling back to Nitestats for the keychain");
        const fallbackResponse = await axios.get('https://api.nitestats.com/v1/epic/keychain');
        const data = fallbackResponse.data;
        let count = 0;

        for (const entry of data) {
            if (!keychain.includes(entry)) {
                count++;
                keychain.push(entry);
            }
        }
        fs.writeFileSync("./responses/keychain.json", JSON.stringify(keychain, null, 2));
        NeoLog.Debug(`Fetched ${count} New Keychains From Nitestats`);
    }
}

async function startBackend() {
    sails.lift({
        port: 5595,
        environment: "production",
        hooks: {
            session: false
        },
        log: {
            level: config.logLevel
        },
    }, (err) => {
        if (err) {
            console.error(err);
        }
    });
}

async function runFunctions() {
    await compareAndUpdateKeychain();
    await startBackend();
}

runFunctions();