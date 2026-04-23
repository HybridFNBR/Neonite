const sails = require("sails");
const NeoLog = require("./structs/NeoLog")
const { default: axios } = require("axios");
const fs = require("fs");
const ini = require("ini");
const config = ini.parse(fs.readFileSync("config.ini", "utf-8"));


async function startBackend() {
    sails.lift({
        port: 5595,
        environment: "production",
         hooks: {
            grunt: false,
            sockets: false,
            pubsub: false,
            session: false,
            views: false,
            blueprints: false,
            helpers: false,
            policies: false,
            security: false,
            services: false,
            i18n: false,
            request: false,
            responses: false
        },
        globals: false,
        log: {
            level: config.logLevel
        },
    }, (err) => {
        if (err) {
            console.error(err);
        }
    });
}

startBackend();