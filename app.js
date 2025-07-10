const sails = require("sails");
const NeoLog = require("./structs/NeoLog")
const { default: axios } = require("axios");
const fs = require("fs");
const ini = require("ini");
const config = ini.parse(fs.readFileSync("config.ini", "utf-8"));

async function compareAndUpdateKeychain() {
    const response = await axios.get("https://fortnitecentral.genxgames.gg/api/v1/aes");

    if (response.status === 200) {
        const data = response.data;
        const keychain = JSON.parse(fs.readFileSync("./responses/keychain.json", "utf-8"));

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
    } else if (response.status === 503 || response.status === 403) {
        NeoLog.Error(`Failed to update Keychain, received status: ${response.status}.`);
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