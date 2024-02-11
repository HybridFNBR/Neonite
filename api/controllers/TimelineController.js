
const path = require('path');
var fs = require('fs')
var ini = require('ini')

function getSeasonInfo(req) {
    const userAgent = req.headers["user-agent"];
    const season = userAgent.split('-')[1];
    const seasonglobal = season.split('.')[0];
    return { season, seasonglobal };
}


module.exports = {
    timeline: function(req, res){
        const { season, seasonglobal } = getSeasonInfo(req);
        const keychain = require("../../responses/keychain.json")
        var config = ini.parse(fs.readFileSync(path.join(__dirname, '../../config.ini'), 'utf-8'));
        const timeline = {
            channels: {
                "standalone-store": {},
                "client-matchmaking": {},
                tk: {
                    states: [
                        {
                            validFrom: "2019-12-31T23:59:59.999Z",
                            activeEvents: [],
                            state: {
                                k: keychain,
                            }
                        }
                    ],
                    cacheExpire: new Date(new Date().getTime() + 1000).toISOString()
                },
                "featured-islands": {},
                "community-votes": {},
                "client-events": {
                    states: [{
                        validFrom: "2019-12-31T23:59:59.999Z",
                        activeEvents: [
                            {
                                eventType: "heard0stone78hole65stick178feet", // C2S4-related (Comics)
                                activeUntil: "9999-12-31T23:59:59.999Z",
                                activeSince: "2019-12-31T23:59:59.999Z"
                            },
                            {
                                eventType: "RBFI", // IslandScripting (CH1) related
                                activeUntil: "9999-12-01T21:10:00.000Z",
                                activeSince: "2020-11-21T07:00:00.000Z"
                            },
                            {
                                eventType: `EventFlag.Season${seasonglobal}`,
                                activeUntil: "9999-12-31T23:59:59.999Z",
                                activeSince: "2019-12-31T23:59:59.999Z"
                            },                                                                                                                                           
                            {
                                eventType: `EventFlag.LobbySeason${seasonglobal}`,
                                activeUntil: "9999-12-31T23:59:59.999Z",
                                activeSince: "2021-06-05T14:00:00.000Z"
                            },
                            {
                                eventType: "LCCS02", // S18 Corruption
                                activeUntil: "2023-10-18T07:00:00.000Z",
                                activeSince: "2022-10-10T06:00:00.000Z"
                            },
                            {   eventType: "LCCS01", // S18 Corruption?
                                activeUntil: "2023-10-18T07:00:00.000Z",
                                activeSince: "2022-10-10T06:00:00.000Z"
                            },
                            {
                                eventType: "WSL0", //Snow Level(season 11)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "WSL1", //Snow Level(season 11)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "WSL2", //Snow Level(season 11)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "WSL3", //Snow Level(season 11)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "2015-09-14T07:00:00.000Z"
                            },
                            /*{      
                                eventType: "SM1",//scorch marks 13.40
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "2015-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "TC1",//thorhammer 'poi' 13.40
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "2015-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "TR1",//unhides the rift in the sky in season13(13.40)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "2015-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "WL0", //water level 0(season 13)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "2015-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "WL1", //water level 1(season 13)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "WL2", //water level 2(season 13)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "WL3", //water level 3(season 13)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "WL4", //water level 4(season 13)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "WL5", //water level 5(season 13)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "WL6", //water level 6(season 13)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "WL7", //water level 7(season 13)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "RLS0", //Rift Landmark Sphere 0(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "RLS1", //Rift Landmark Sphere 1(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "RLS2", //Rift Landmark Sphere 2(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "RLS3", //Rift Landmark Sphere 3(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "SL_01", //Stark Lab - SL_01(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "SL_02", //Stark Lab - SL_02(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "HSS0", //Hightower Sphere Stage 0(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "HSS1", //Hightower Sphere Stage 1(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "HSS2", //Hightower Sphere Stage 2(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "HSS3", //Hightower Sphere Stage 3(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "HC_01", //Hellicarrier - Bus Mod(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "HC_02", //Hellicarrier - Mod Stage1(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "SH01", //Stark Hangar(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "SH02", //Stark Hangar(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "BVJ01", //Make Galactus visable in the skybox(Ch2S4 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "WPICK02", //Wombat Complete Portal(Ch2S5 Portal related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CPICK02", //Cherry Plum Tiramisu Complete Portal(Ch2S5 Portal related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "FPICK02", //French Fry Complete Portal(Ch2S5 Portal related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "TPICK02", //Typhoon Complete Portal(Ch2S5 Portal related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "NPICK02", //Nightmare Complete Portal(Ch2S5 Portal related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "KPICK02", //Kepler Complete Portal(Ch2S5 Portal related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "SKPICK02", //Skirmish Complete Portal(Ch2S5 Portal related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "SFPICK02", //SmallFry Complete Portal(Ch2S5 Portal related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "RPFS1", //Dino Egg Cracking(Ch2S6 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "FTF01", //Fortified POI: Misty Meadows(Ch2S6 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "FTF02", //Fortified POI: Sweaty Sands(Ch2S6 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "FTF03", //Fortified POI: Retail Row(Ch2S6 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "ADP07", //16.50 Foreshadowing Abductions(Ch2S6 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CC01", //Crop Circle 01(Ch2S6 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CC02", //Crop Circle 02(Ch2S6 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CC03", //Crop Circle 03(Ch2S6 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "WLCM1", //Welcome Party full-swing(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "WLCM2", //Welcome Party is over(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "STL01", //Holly Settlement House 1(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "STL02", //Holly Settlement House 2(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "STL03", //Holly Settlement House 3(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "AVOC1", //Egg spawn 1(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "AVOC3", //Egg spawn 3(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "GRAN01", //Mural Stage 1(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "GRAN02", //Mural Stage 2(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "SWRMDUP", //Slurpy Warm Up Event: Beam Turning On(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "SDOPN", //Slurpy Warm Up Event: Doors Opening(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "SMVE", //Mothership Move To: Slurpy(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "ABDSLP", //Slurpy: Abduction(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CWRMDUP", //Coral Warm Up Event: Beam Turning On(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CDOPN", //Coral Warm Up Event: Doors Opening(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "ABDCRL", //Coral: Abduction(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "FMVE", //Mothership Move To: Farm(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "ABDFRM", //Farm: Abduction(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "FDS", //Farm Default State(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "FWRMDUP", //Farm Warm Up Event: Beam Turning On(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "FDOPN", //Farm Warm Up Event: Doors Opening(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "BPAQ", //Bomb Parts Assembling(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CCSP01", //Cube Corruption Spread Paused(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "LCCS01", //Lobby Corruption Spread 1(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "LCCS02", //Lobby Corruption Spread 2(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "LCCSP01", //Lobby Corruption Spread Paused(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CTCS01", //Cube Town Corruption Spread(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "GCFP01", //Golden Cube Final Placement(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "GCMFP01", //Golden Cube Move Final Placement(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CSAWS01", //Crash Site 1 AwakenedState(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CSAWS02", //Crash Site 2 AwakenedState(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CSAWS03", //Crash Site 3 AwakenedState(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CSAWS04", //Crash Site 4 AwakenedState(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CSAWS05", //Crash Site 5 AwakenedState(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "GCA01", //Golden Cube Awaken 1(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "GCA02", //Golden Cube Awaken 2(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "GCA03", //Golden Cube Awaken 3(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "GCA04", //Golden Cube Awaken 4(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "GCA05", //Golden Cube Awaken 5(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CT01", //Cube Town Phase 1(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CT02", //Cube Town Phase 2(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CT03", //Cube Town Phase 3(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "2021_SM01", //Snow Stage 01(Ch3S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "2021_SM02", //Snow Stage 02(Ch3S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "2021_SM03", //Snow Stage 03(Ch3S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "2021_SM04", //Snow Stage 04(Ch3S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "2021_SM05", //Snow Stage 05(Ch3S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "2021_SM06", //Snow Stage 06(Ch3S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "2021_SM07", //Snow Stage 07(Ch3S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "2021_SM08", //Snow Stage 08(Ch3S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "2021_SM09", //Snow Stage 09(Ch3S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "AS01", //Armadillo Start(Ch3S2 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "AL02", //Armadillo Lobby Leadup(Ch3S2 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "AL01", //Armadillo In-Game Leadup(Ch3S2 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "ARLU01", //ArmadilloRoll Lead Up(Ch3S2 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "FNBD05", //Fortnite Birthday Map Changes(Ch3S4 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "S22_Vortex_Active", //S22 Nanomist Vortex(Ch3S4 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "S22_Vortex_Active", //S22 Nanomist Vortex(Ch3S4 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "RR01", //Radish Root(Ch3S4 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "DataLayerTest0", //DataLayerTest0(Ch4S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "DataLayerTest1", //DataLayerTest1(Ch4S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "DataLayerTest2", //DataLayerTest2(Ch4S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "NYE_Loader", //New Years Eve Loader(Ch4S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "NYE", //New Years Eve Event 2022(Ch4S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "RGCONSTUCTION02", //Rift Gate Construction Stage 2(Ch4S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "RG01", //RiftGate_Stage_01(Ch4S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "RG02", //RiftGate_Stage_02(Ch4S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "ST01", //ST_Stage_01(Ch4S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "ST02", //ST_Stage_02(Ch4S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "MLQ24", 
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "EventFlag.LTE_Festivus", // Fetivus Event(Ch1S7 Related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-10-29T00:00:00.000Z"
                            },
                            {
                                eventType: "EventFlag.BR_S5_Cube_TurnOn", // Cube Lightning(Ch1S5 Related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-10-29T00:00:00.000Z"
                            },
                            {
                                eventType: "EventFlag.BR_S5_Cube_Rune1", // Cube Rune 1(Ch1S5 Related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-10-29T00:00:00.000Z"
                            },
                            {
                                eventType: "EventFlag.BR_S6_Island_MoveTo1", // Cube Move to Rune 1(Ch1S6 Related)
                                activeUntil: "2023-11-00T07:00:00.000Z",
                                activeSince: "2020-10-29T00:00:00.000Z"
                            },
                            {
                                eventType: "EventFlag.BR_S6_Island_Drain", //IslandRune1(Ch1S6 Related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-10-29T00:00:00.000Z"
                            },*/ //having this many event flags active at once causes other ones to break.
                        ],
                        state: {
                            activeStorefronts: [],
                            eventNamedWeights: {},
                            activeEvents: [],
                            seasonNumber: seasonglobal,
                            seasonTemplateId: `AthenaSeason:athenaseason${seasonglobal}`,
                            matchXpBonusPoints: 0,
                            eventPunchCardTemplateId: "",
                            seasonBegin: "2021-06-05T14:00:00Z",
                            seasonEnd: "9999-12-31T23:59:59.999Z",
                            seasonDisplayedEnd: "2021-09-30T04:00:00Z",
                            dailyStoreEnd: new Date(new Date().getTime() + 30000).toISOString(),
                            weeklyStoreEnd: new Date(new Date().getTime() + 30000).toISOString(),
                            sectionStoreEnds: {},
                            rmtPromotion: "melody"
                        }
                    }],
                    cacheExpire: new Date(new Date().getTime() + 1000).toISOString() //refresh every second(might be a bit over kill)
                }
            },
            cacheIntervalMins: 0.1,
            currentTime: new Date().toISOString()
        }

        if(season == 4.5){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "EventFlag.BR_S4_Geode_Countdown", //
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
            )
        }

        if(season == 7.20){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "EventFlag.LTM_14DaysOfFortnite", //WinterFest
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "P1", // Ice King Event related
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
            )
        }

        if(season == 7.30){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "F0", // Marshmello Event countdown (idk if this works, havent tried it)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "FEST_POSTER", // Marshmello event posters
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },                
            )
        }           

        if(season == 8.51){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "EventFlag.UnvaultingCountdown", // Unvaulting Event countdown (idk if this works, havent tried it)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "GWS1", // Unvaulting Event countdown (idk if this works, havent tried it)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },                
            )
        }   

        if(season == 9.40 || season == 9.41){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "CDTime", // Final Showdown countdown (idk if this works, havent tried it)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "CVD1", // Final Showdown countdown (idk if this works, havent tried it)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                }              
            )
        }   
        
        if(season == 10.40){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "NN1", // The End Countdown
                    activeUntil: "9999-10-05T00:41:00.000Z",
                    activeSince: "2020-10-05T00:00:00.000Z"
                },
                {  
                    eventType: "survey_br_nick_001", // nightnight blackhole lobby mini event
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "9999-09-14T07:00:00.000Z"
                }                
            )
        }   
        
        if(season == 11.30 || season == 11.31){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "Gal_Crashes", // Starwars spaceship crashes (season 11)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2015-09-14T07:00:00.000Z"
                },
                {
                    eventType: "EventFlag.LTE_WinterFest", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
                {
                    eventType: "EventFlag.Winterfest.Tree", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
                {
                    eventType: "WSFX3", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
                {
                    eventType: "WSFX3F", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
                {
                    eventType: "WD5", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
                {
                    eventType: "WD4", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
                {
                    eventType: "WD3", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
                {
                    eventType: "WD2", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
                {
                    eventType: "WD1", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
                {
                    eventType: "WTR4", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
                {
                    eventType: "WTR3", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
                {
                    eventType: "WTR2", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
                {
                    eventType: "WTR1", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
                {
                    eventType: "WSH1", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
                {
                    eventType: "WSM1", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
                {
                    eventType: "WSM2", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
                {
                    eventType: "WSM3", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
                {
                    eventType: "WSM4", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
                {
                    eventType: "WRRD1", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
                {
                    eventType: "WDT1", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
                {
                    eventType: "WDT2", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
                {
                    eventType: "WDT3", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
                {
                    eventType: "WDT4", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
                {
                    eventType: "WD1C", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },           
            )
        }   
        
        if(season == 12.41){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "JCD01", // Travis Related (Countdown)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "JH01", // Travis Related (Head)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "JS01", // Travis Related (Stage Delivery Trucks)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "JS02", // Travis Related (Stage Partially Built)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "9999-11-21T07:00:00.000Z"
                },
                {
                    eventType: "JS03", // Travis Related (Stage Finished Stage)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "JCH01", // Travis Related (Countdown)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "JP01", // Travis Teaser posters Appear (Stage)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "JL1", // Travis LeadUp 2 (Stage)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "JL2", // Travis LeadUp 2 (Stage)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "JLL", // Travis Load level (Level)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                }                
            )
        }           

        if(season == 12.61){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "FLA01", // C2S2-related (Timers)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "FLCD01", // C2S2-related (Timers)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },  
                {
                    eventType: "FCD01", // C2S2-related (Timers)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                }                          
            )
        }          

        if(season == 14.60){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "FLA01", // C2S4-related (Timers)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "FSE01", // C2S4-related (Timers)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "FSE02", // C2S4-related (Timers)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "JSE02", // C2S4-related (Timers)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "JFE01", // C2S4-related (Countdown)
                    activeUntil: "9999-12-02T09:00:00.000Z",
                    activeSince: "2020-12-01T21:16:00.000Z"
                }
            )
        }        

        if(season == 17.30){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "BEL01", // Rift Tour-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z", // #1 2021-08-06T22:05:00.000Z // #2 2021-08-07T18:05:00.000Z // #3 2021-08-08T04:05:00.000Z // #4 2021-08-08T14:05:00.000Z // #5 2021-08-08T22:05:00.000Z
                    activeSince: "2021-07-27T06:00:00.000Z" // #1 2021-07-27T06:00:00.000Z // #2 2021-08-06T23:15:00.000Z // #3 2021-08-07T19:15:00.000Z // #4 2021-08-08T05:15:00.000Z // #5 2021-08-08T15:15:00.000Z
                },
                {
                    eventType: "BET01", // Rift Tour-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z", // #1 2021-08-06T22:05:00.000Z // #2 2021-08-07T18:05:00.000Z // #3 2021-08-08T04:05:00.000Z // #4 2021-08-08T14:05:00.000Z // #5 2021-08-08T22:05:00.000Z
                    activeSince: "2021-07-27T06:00:00.000Z" // #1 2021-07-27T06:00:00.000Z // #2 2021-08-06T23:15:00.000Z // #3 2021-08-07T19:15:00.000Z // #4 2021-08-08T05:15:00.000Z // #5 2021-08-08T15:15:00.000Z
                },
                {
                    eventType: "BEL02", // Rift Tour-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z", // #1 2021-08-06T22:05:00.000Z // #2 2021-08-07T18:05:00.000Z // #3 2021-08-08T04:05:00.000Z // #4 2021-08-08T14:05:00.000Z // #5 2021-08-08T22:05:00.000Z
                    activeSince: "2021-07-27T06:00:00.000Z" // #1 2021-07-27T06:00:00.000Z // #2 2021-08-06T23:15:00.000Z // #3 2021-08-07T19:15:00.000Z // #4 2021-08-08T05:15:00.000Z // #5 2021-08-08T15:15:00.000Z
                },
                {
                    eventType: "BEP02", // Rift Tour-related (Buffet Enable Pads?)
                    activeUntil: "2021-09-14T07:00:00.000Z", 
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "BPLS", // Rift Tour-related (Buffet Party Landingship)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "BTP", // Rift Tour-related (Buffet Teaser Poster)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "BAP", // Rift Tour-related (Buffet Announce Poster)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "BTL01", // Rift Tour-related (Buffet TOD Leadup 1)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                }
            )
        }

        if(season == 17.50){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "KEL01", // Operation Sky Fire Event-related
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2023-10-29T00:00:00.000Z"
                },
                {
                    eventType: "KEL02", // Operation Sky Fire Event-related
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                }
            )
        }

        if(season == 18.40){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "GGL01", // Chapter 2 Finale Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "GGL02", // Chapter 2 Finale Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                }
            )
        }

        if(season == 20.40){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "AL01", // Collision Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "AL02", // Collision Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                }
            )
        }

        if(season == 21.40){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "Event_S21_Stamina", // Dragon Ball tab 
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                }
            )
        }        

        if(season == 22.40){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "RL01", // Fracture Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RL02", // Fracture Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RL12", // Fracture Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RL13", // Fracture Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RL14", // Fracture Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RL15", // Fracture Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RL16", // Fracture Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                }
            )
        }

        if(season == 23.10){
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "CalendarEvent_Season23_Winterfest", // Winterfest 2022
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "EventFlag.LTE_WinterFestTab", // Winterfest 2022
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                }            
            )
        }
    
        if(season == 23.50){
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "EventFlag.Event_Vaultbreakers", // Most Wanted tab
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                }          
            )
        }
        
        if(season == 24.40){
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "EventFlag.Event_PlotTwist", // Star Wars 2023 tab 
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                }    
            )
        }

        if(season == 25.30){
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "EventFlag.Event_BelongTreaty", // Jujutsu Kaisen tab
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                }    
            )
        }        

        if(season == 27.11){
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "DL01", // Durian Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "DL02", // Durian Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                }           
            )
        }

        if(season == 28.10){
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "EventFlag.Event_LinedNotebook_Teaser", // TMNT Tab countdown (always needed)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                }       
            )
        }

        if(season == 28.20){
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "EventFlag.Event_LinedNotebook", // TMNT mini pass
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                }       
            )
        }        

        if(seasonglobal == 7 || seasonglobal == 11 || seasonglobal == 15 || seasonglobal == 19){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "TopSecret", //Holiday Bus (S7/S11/S15/S19)
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2015-09-14T07:00:00.000Z"
            })
        }

        if(seasonglobal == 14 || seasonglobal == 18 || seasonglobal == 22){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "EventFlag.HalloweenBattleBus", //Halloween Bus (S14/S18/S22)
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2015-09-14T07:00:00.000Z"
            })
        }

        if(config.RufusWeek2 == true){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "RufusWeek2", // Rufus Week 2(Chapter 4 Season OG)
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            },)
        }
        if(config.RufusWeek3 == true){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "RufusWeek3", // Rufus Week 3(Chapter 4 Season OG)
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            },)
        }
        if(config.RufusWeek4 == true){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "RufusWeek4", // Rufus Week 4(Chapter 4 Season OG)
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            },)
        }

        if(config.TMNTStage1 == true){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "EventFlag.Event_LinedNotebook_Teaser1", // TMNT Tab Stage 1 
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            },)
        }
        if(config.TMNTStage2 == true){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "EventFlag.Event_LinedNotebook_Teaser2", // TMNT Tab Stage 2
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            },)
        }
        if(config.TMNTStage3 == true){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "EventFlag.Event_LinedNotebook_Teaser3", // TMNT Tab Stage 3
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            },)
        }        
        res.json(timeline)
    }
}