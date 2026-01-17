
const path = require('path');
const fs = require('fs')
const ini = require('ini')
const { getVersionInfo, loadJSON } = require("../../config/defs");
const NeoLog = require('../../structs/NeoLog');
let requested = false;


module.exports = {
    timeline: function (req, res) {
        let { version, versionGlobal, versionLegacy } = getVersionInfo(req);
        const keychain = loadJSON("../responses/keychain.json")
        var config = ini.parse(fs.readFileSync(path.join(__dirname, '../../config.ini'), 'utf-8'));
        certVersions = [{
            3700114: 1,
            3724489: 1,
            3729133: 1,
            3741772: 1,
            3757339: 1,
            3775276: 1,
            3790078: 1,
            3807424: 2,
            3825894: 2,
            3841827: 2,
            3847564: 2,
            3858292: 2,
            3870737: 2,
            3889387: 2,
        }]
        certVersions.forEach(cl => {
            if (cl[versionLegacy]) {
                versionGlobal = cl[versionLegacy]
            }
        });
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
                    cacheExpire: new Date(Date.now() + 30000).toISOString()
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
                                eventType: `EventFlag.Season${versionGlobal}`,
                                activeUntil: "9999-12-31T23:59:59.999Z",
                                activeSince: "2019-12-31T23:59:59.999Z"
                            },
                            {
                                eventType: `EventFlag.LobbySeason${versionGlobal}`,
                                activeUntil: "9999-12-31T23:59:59.999Z",
                                activeSince: "2021-06-05T14:00:00.000Z"
                            },
                            {
                                eventType: "Gal_Crashes", // Starwars spaceship crashes (season 11)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "2015-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "Papaya_Stage", //Party Royale Stage
                                activeUntil: "9999-12-31T23:59:59.999Z",
                                activeSince: "2021-06-05T14:00:00.000Z"
                            },
                            {
                                eventType: "Papaya_Theater", //Party Royale Theater
                                activeUntil: "9999-12-31T23:59:59.999Z",
                                activeSince: "2021-06-05T14:00:00.000Z"
                            }
                            /*
                            {
                                eventType: "EventFlag.WinterBattleBus",
                                activeUntil: "9999-12-31T23:59:59.999Z",
                                activeSince: "2021-06-05T14:00:00.000Z"
                            },
                            {
                                eventType: "HW_01",
                                activeUntil: "9999-12-31T23:59:59.999Z",
                                activeSince: "2021-06-05T14:00:00.000Z"
                            },
                            {
                                eventType: "HW_02",
                                activeUntil: "9999-12-31T23:59:59.999Z",
                                activeSince: "2021-06-05T14:00:00.000Z"
                            },
                            {
                                eventType: "HW_03",
                                activeUntil: "9999-12-31T23:59:59.999Z",
                                activeSince: "2021-06-05T14:00:00.000Z"
                            },
                            {
                                eventType: "HW_04",
                                activeUntil: "9999-12-31T23:59:59.999Z",
                                activeSince: "2021-06-05T14:00:00.000Z"
                            },
                            {
                                eventType: "HW_05",
                                activeUntil: "9999-12-31T23:59:59.999Z",
                                activeSince: "2021-06-05T14:00:00.000Z"
                            },
                            {
                                eventType: "HW_06",
                                activeUntil: "9999-12-31T23:59:59.999Z",
                                activeSince: "2021-06-05T14:00:00.000Z"
                            },
                            {
                                eventType: "HW_07",
                                activeUntil: "9999-12-31T23:59:59.999Z",
                                activeSince: "2021-06-05T14:00:00.000Z"
                            },
                            {
                                eventType: "RGCONSTUCTION02", //Rift Gate Construction Stage 2(Ch4S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "MLQ24", 
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
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
                            },*/
                        ],
                        state: {
                            activeStorefronts: [],
                            eventNamedWeights: {},
                            activeEvents: [],
                            seasonNumber: versionGlobal,
                            seasonTemplateId: `AthenaSeason:athenaseason${versionGlobal}`,
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
                    cacheExpire: new Date(Date.now() + 30000).toISOString()
                }
            },
            currentTime: new Date().toISOString(),
            cacheIntervalMins: 0,
            eventsTimeOffsetHrs: 0
        }

        const versionEventFlags = ({
            "Cert": [
                "EventFlag.LobbyWinterDecor"
            ],

            "4.5": [
                "EventFlag.BR_S4_Geode_Countdown",
                "EventFlag.BR_S4_Oddity_01_Event",
                "EventFlag.BR_S4_Oddity_02_Event",
                "EventFlag.BR_S4_Oddity_03_Event",
                "EventFlag.BR_S4_Oddity_04_Event",
                "EventFlag.BR_S4_Oddity_05_Event",
                "EventFlag.BR_S4_Oddity_06_Event",
                "EventFlag.BR_S4_Oddity_07_Event",
                "EventFlag.BR_S4_Oddity_08_Event",
                "EventFlag.BR_S5_Oddity_Tomato_Event",
                "EventFlag.BR_S4_Rift_Growth"
            ],

            "5.10": [
                "EventFlag.BR_S5_Rift_Corrupt",
                "EventFlag.BR_S5_Rift_Shrink",
            ],

            "5.40": [
                "EventFlag.BR_S5_RiskyReels_Event",
                "EventFlag.BR_S5_Sphere_Spawn",
                "EventFlag.BR_S5_Cube_TurnOn",
                "EventFlag.BR_S5_Cube_Lightning",
                //"EventFlag.BR_S5_Cube_MoveTo1",
                //"EventFlag.BR_S5_Cube_Rune1",
                //"EventFlag.BR_S5_Cube_MoveTo2",
                //"EventFlag.BR_S5_Cube_Rune2",
                //"EventFlag.BR_S5_Cube_MoveTo3",
                //"EventFlag.BR_S5_Cube_Rune3",
                //"EventFlag.BR_S5_Cube_MoveTo4",
                //"EventFlag.BR_S5_Cube_Rune4",
                //"EventFlag.BR_S5_Cube_MoveTo5",
                //"EventFlag.BR_S5_Cube_Rune5",
                //"EventFlag.BR_S5_Cube_MoveTo6",
                //"EventFlag.BR_S5_Cube_Rune6",
                //"EventFlag.BR_S5_Cube_MoveTo7",
                //"EventFlag.BR_S5_Cube_Rune7",
                //"EventFlag.BR_S5_Cube_MoveTo8",
            ],

            "6.00": [
                //"EventFlag.BR_S6_Island_MoveTo1"
                //"EventFlag.BR_S6_Island_Rune1",
                //"EventFlag.BR_S6_Island_MoveTo2"
            ],

            "6.01": [
                //"EventFlag.BR_S6_Island_Rune2"
                //"EventFlag.BR_S6_Island_MoveTo3"
                //"EventFlag.BR_S6_Island_Rune3",
                //"EventFlag.BR_S6_Island_MoveTo4"
            ],

            "6.02": [
                //"EventFlag.BR_S6_Island_Rune4"
                //"EventFlag.BR_S6_Island_MoveTo5"
                //"EventFlag.BR_S6_Island_Rune5",
                //"EventFlag.BR_S6_Island_MoveTo6",
            ],

            "6.10": [
                "EventFlag.BR_S6_Island_Beacon"
                //"EventFlag.BR_S6_Island_MoveTo7",
                //"EventFlag.BR_S6_Island_Rune7",
                //"EventFlag.BR_S6_Island_MoveTo8"
                //"EventFlag.BR_S6_Island_Rune8",
            ],

            "6.20|6.21": [
                /* Halloween EventFlags */
                "HW_01",
                "HW_02",
                "HW_03",
                "HW_04",
                "HW_05",
                "HW_06",
                "HW_07",
                "EventFlag.LobbySeason6Halloween"
            ],

            "7.20": [
                "EventFlag.LTM_14DaysOfFortnite", //WinterFest
                "warning", //TV Warning
                "Countdown", //TV Countdown
                "P1", // Ice King Event related
                "WDK", // Ice King Apeaars
            ],

            "7.30": [
                "F0", // Marshmello Event countdown
                "F1", // Marshmello Event countdown
                "FLevel", // Marshmello Event Level
                "FEST_POSTER", // Marshmello event posters
                "roadie_0", // ?
                "EventFlag.LTE_Festivus", // Marshmello event
                "S7_B", // ?
                "S7_C", // ?
                "HP", // ?
            ],

            "8.51": [
                "EventFlag.UnvaultingCountdown", // Unvaulting Event countdown
                "GWS0", // Unvaulting Event related
                "GWS1", //  Unvaulting Event related
                "GW1", //  Unvaulting Event related
                "GW2", //  Unvaulting Event related
                "GW3", // Unvaulting Event related
                "GWW1", //  Unvaulting Event related
                "GWW2", //  Unvaulting Event related
                "GWW3", //  Unvaulting Event related
                "GWW4", //  Unvaulting Event related
                "GWW5", //  Unvaulting Event related
            ],

            "9.20": [
                "CatSpot1" // Cattus Spotting Ocean
            ],

            "9.30|9.40|9.41": [
                "CDTime", // Final Showdown countdown
                "DoggusProp", //Doggus Propaganda Posters
                "CVD1", // Final Showdown countdown
                "CatSpot2", // Cattus Spotting 2
                "STP", // Stranger Things Portals(Mega Mall)
            ],
            "10.31|10.40": [
                "RBBMS", // Black Monday Tilted POI Swap
                "NN1", // The End Countdown
                //"survey_br_nick_001", // nightnight blackhole lobby mini event
            ],

            "11.10": [
                "HW2019", // FortniteMares 2019
                "HW2019Leadup", // FortniteMares 2019 Leadup
            ],

            "11.30": [
                "GALCD", // C2S1-related (Winterfest 2019)
                "GALP", // C2S1-related (Winterfest 2019)
            ],

            "11.31": [
                "EventFlag.LTE_WinterFest", // C2S1-related (Winterfest 2019)
                "EventFlag.Winterfest.Tree", // C2S1-related (Winterfest 2019)
                "WSFX3", // C2S1-related (Winterfest 2019)
                "WSFX3F", // C2S1-related (Winterfest 2019)
                "WD5", // C2S1-related (Winterfest 2019)
                "WD4", // C2S1-related (Winterfest 2019)
                "WD3", // C2S1-related (Winterfest 2019)
                "WD2", // C2S1-related (Winterfest 2019)
                "WD1", // C2S1-related (Winterfest 2019)
                "WTR4", // C2S1-related (Winterfest 2019)
                "WTR3", // C2S1-related (Winterfest 2019)
                "WTR2", // C2S1-related (Winterfest 2019)
                "WTR1", // C2S1-related (Winterfest 2019)
                "WSH1", // C2S1-related (Winterfest 2019)
                "WSM1", // C2S1-related (Winterfest 2019)
                "WSM2", // C2S1-related (Winterfest 2019)
                "WSM3", // C2S1-related (Winterfest 2019)
                "WSM4", // C2S1-related (Winterfest 2019)
                "WRRD1", // C2S1-related (Winterfest 2019)
                "WDT1", // C2S1-related (Winterfest 2019)
                "WDT2", // C2S1-related (Winterfest 2019)
                "WDT3", // C2S1-related (Winterfest 2019)
                "WDT4", // C2S1-related (Winterfest 2019)
                "WD1C", // C2S1-related (Winterfest 2019)
            ],

            "11.50": [
                "GP1", // Gold Prop 1
                "GP2", // Gold Prop 2
                "GP3", // Gold Prop 3
                "GP4", // Gold Prop 4
                "GP5", // Gold Prop 5
            ],

            "12.30": [
                "DPY01", // Deadpool Yacht
                "EventFlag.DonutBattleBus", // Deadpool Battle Bus
            ],

            "12.40|12.41": [
                "JS01", // Travis Related (Stage Delivery Trucks)
                "JS02", // Travis Related (Stage Partially Built)
                "JP01", // Travis Teaser posters Appear (Stage)
                "JP02", // Travis Teaser posters Appear (Stage)
                "JL1", // Travis LeadUp 1 (Stage)
                "JL2", // Travis LeadUp 2 (Stage)
                "JCD01", // Travis Related (Countdown)
                "JH01", // Travis Related (Head)
                "JS03", // Travis Related (Stage Finished Stage)
                "JCH01", // Travis Related (Countdown)
                "JLL", // Travis Load level (Level)
            ],

            "12.60|12.61":[
                "FLA01", // C2S2-related (Timers)
                "FLCD01", // C2S2-related (Timers)
                "FCD01", // C2S2-related (Timers)
                "FHS01", // Fritter Hatches Stage 1
                "FHS02", // Fritter Hatches STage 2
            ],

            "13.40":[
                "SM1",//scorch marks
                "LS_PRE",
                "TC1",//thorhammer 'poi'
                "TR1",//rift in the sky
                "CBS1",//Coral buddies stage 1
            ],

            "14.00":[
                "LS2", //Galactus Countdown(Ch2S4 related)
                "HSS2", //Sky Distant Object(Ch2S4 related)
            ],

            "14.30":[
                "SPJ02", //Sky Card for Junior(Ch2S4 related)
            ],

            "14.60":[
                "FLA01", // C2S4-related (Timers)
                "FSE01", // C2S4-related (Timers)
                "FSE02", // C2S4-related (Timers)
                "JSE02", // C2S4-related (Timers)
                "JFE01", // C2S4-related (Countdown)
                "SPJ03", // C2S4-related (Sky Head For Junior)

            ],

            "17.20|17.30":[
                "BEL01", // Leadup In-game/Leadup In-Lobby
                "BET01", // Rift Tour-related (Countdown)
                "BEL02", // Leadup In-game/Leadup In-Lobby
                "BEP02", // Rift Tour Enable Pads?
                "BPLS", // Rift Tour Party Landingship
                "BTP", // Rift Tour Teaser Poster
                "BAP", // Rift Tour Announce Poster
                "BTL01", // Rift Tour TOD Leadup 1)
                "ABDSLP", //Slurpy: Abduction(Ch2S7 related)
            ],

            "17.50":[
                "KEL01", // Operation Sky Fire Event-related
                "KEL02", // Operation Sky Fire Event-related
                "ABDFRM", //Farm: Abduction(Ch2S7 related)
            ],

            "18.21":[
                "FNM21", // FNMares 2021
            ],

            "19.01":[
                "EventFlag.LTE_WinterFest", // WinterFest 2021
                "WF_IG_Avail", // WinterFest 2021
            ],

            "20.40":[
                "AL01", // Collision Event-related (Countdown)
                "AL02", // Collision Event-related (Countdown)
                "AS01", //Armadillo Start(Ch3S2 related)
                "ARLU01", //ArmadilloRoll Lead Up(Ch3S2 related)
            ],

            "21.30|21.40|21.50|21.51":[
                "STMN_PH", // Dragon Ball Collab Preheat(21.30)
                "Event_S21_Stamina", // Dragon Ball tab(21.40)
                "RBB01", // Bugle Bloom (Closed)(21.30)
                "NSSC02", // No Sweat Summer Concert (Constructed)(21.30)
            ],

            "22.40":[
                "RL01", // Fracture In-Game Leadup
                "RL02", // Fracture Radish Lobby Leadup
                "RL12", // Fracture Lobby Leadup 2
                "RL13", // Fracture Lobby Leadup 3
                "RL14", // Fracture Lobby Leadup 4
                "RL15", // Fracture Lobby Leadup 5
                "RL16", // Fracture Lobby Leadup 6
                "RL22", // Fracture In-Game Leadup 2
                "RL23", // Fracture In-Game Leadup 3
                "RL24", // Fracture In-Game Leadup 4
                "RL25", // Fracture In-Game Leadup 5
                "RL26", // Fracture In-Game Leadup 6
                "RC01", // Fracture Core
                "RC02", // Fracture Core
                "RC03", // Fracture Core
                "RC04", // Fracture Core
                "RC05", // Fracture Core
                "RC06", // Fracture Core
            ],

            "23.10": [
                "CalendarEvent_Season23_Winterfest", // Winterfest 2022
                "EventFlag.LTE_WinterFestTab", // Winterfest 2022
            ],

            "23.50": [
                "EventFlag.Event_Vaultbreakers", // Most Wanted tab
                "EventFlag.Event_S23_FindIt", // Event_S23_FindIt
                "RG01", // RiftGate Stage 1
                "RG02", // RiftGate Stage 2
                "ST01", // Skytear Stage 1
                "ST02", // Skytear Stage 2
            ],

            "24.00|24.10":[
                "EventFlag.Event_S24_LanternFest", // Latern Fest 2023 
                "Lanternfest", // Latern Fest 2023 
                "EventFlag.Event_S24_SunBurst", // Sunburst 
                "EventFlag.Event_S24_SpringFling", // Springfling 
            ],

            "24.30|24.40":[
                "EventFlag.Event_PlotTwist", // Star Wars 2023 tab
            ],

            "25.30":[
                "EventFlag.Event_BelongTreaty", // Jujutsu Kaisen tab
            ],

            "27.11|31.41|32.11":[
                "DL01", // Durian & Kiln Event-related (Countdown)
                "DL02", // Durian & Kiln Event-related (Countdown)
            ],

            "28.10":[
                "EventFlag.Event_LinedNotebook_Teaser", // TMNT Tab countdown
            ],

            "28.20|28.30":[
                "EventFlag.Event_LinedNotebook", // TMNT mini pass
                /*
                "CH5S1CPPE", //Pre-Emergence Event(Central Picnic)
                "CH5S1CPCE", //Crater event - Pre-Emergence Event (Central Picnic)
                "CH5S1CPTE", //Thump Event - Pre-Emergence Event (Central Picnic)
                "CH5S1CPFH", //Final Hour - Pre-Emergence Event (Central Picnic)
                "CH5S1CPFP", //Titan Hand Appears(Central Picnic)
                "CH5S1CPPP", //Primary Events(Central Picnic)
                "CH5S1CPEP", //Post-Chain Event(Central Picnic)

                 Flags labled "Pre-Emergence Event" need to have the "CH5S1CPPE" flag to work event flags not labled with the "Pre-Emergence Event" need to have "CH5S1CPPE" disabled to work
                */
            ],

            "29.00|29.01|29.10":[
                "EventFlag.Event_S29_SeasonalActivation",
                "EventFlag.Event_S29_MidasActivation"
            ],

            "29.20|29.30":[
                "EventFlag.Event_S29_ColdDay", // Avatar mini pass + cabbages
                "AtlaShrines", // Avatar map changes
                "AtlaScrolls", // Avatar map changes
                "AtlaChests", // Avatar map changes
            ],

            "29.40":[
                /*
                "EventFlag.Event_Osiris",
                "SUPERSPORT_BUILDUP_1",
                "SUPERSPORT_BUILDUP_2",
                "SUPERSPORT_BUILDUP_3",
                "SUPERSPORT_CHARGE_1",
                "SUPERSPORT_STRIKE_1",
                "SUPERSPORT_CHARGE_2",
                "SUPERSPORT_STRIKE_2"
                "SUPERSPORT_CHARGE_3",
                "SUPERSPORT_STRIKE_3"
                "SUPERSPORT_SANDSTORM",
                "SUPERSPORT_LIGHT_2",
                */
            ],

            "30.20|30.30":[
                "EventFlag.Event_Greenhouse", //Pirates Of the Caribbean Mini Pass
                "RE_01_Cutout",
                "RE_02_Cutout",
                "RE_03_Cutout",
                "RE_01", //Nitro Pipeline Stage 1
                "RE_02", //Nitro Pipeline Stage 2
                "RE_03", //Nitro Pipeline Stage 3
            ],

            "31.20|31.30":[
                "EventFlag.Event_ButtercakePass"
            ],

            "31.41":[
                "StageA", //Kiln Buildup Stage 1
                "StageB", //Kiln Buildup Stage 2
                "StageC", //Kiln Buildup Stage 3
                "StageD", //Kiln Buildup Stage 4
                "KilnB", //Kiln Buildup
                //"Kiln_TOD", //Kiln Time Of Day
                //"Kiln_Event", //Kiln Event
                //"Kiln_Preload_Event", //Kiln Preload Event
            ],

            "33.11":[
                "EventFlag.S33_WinterFestTab", //2024 winterfest
                "WF_IG_Avail", //2024 winterfest
            ],

            "33.30":[
                "GrillMoon_Day1", //GrillMoon Mini Event Buildup Stages
                "GrillMoon_Day2", //GrillMoon Mini Event Buildup Stages
                "GrillMoon_Day3", //GrillMoon Mini Event Buildup Stages
                "GrillMoon_Day4", //GrillMoon Mini Event Buildup Stages
                "GrillMoon_Day5", //GrillMoon Mini Event Buildup Stages
                "GrillMoon_Event", //GrillMoon Mini Event
            ],

            "34.30|34.40":[
                "GiftedTraveler_Phase1", //GiftedTraveler Buildup Stages(Daigo Portal Beams)
                "GiftedTraveler_Phase2", //GiftedTraveler Buildup Stages(Daigo Portal Beams)
                "GiftedTraveler_Phase3", //GiftedTraveler Buildup Stages(Daigo Portal Beams)
                "GiftedTraveler_Phase4", //GiftedTraveler Buildup Stages(Daigo Portal Beams)
                "GiftedTraveler_FinalPhase", //GiftedTraveler Buildup Stages(Daigo Portal Beams)
                "GiftedTraveler_Observer_Phase1", //GiftedTraveler_Observer Buildup Stages(Death Star Stages)
                "GiftedTraveler_Observer_Phase2", //GiftedTraveler_Observer Buildup Stages(Death Star Stages)
                "GiftedTraveler_Observer_Phase3", //GiftedTraveler_Observer Buildup Stages(Death Star Stages)
                "GiftedTraveler_Observer_Phase4", //GiftedTraveler_Observer Buildup Stages(Death Star Stages)
                "GiftedTraveler_Observer_Phase5", //GiftedTraveler_Observer Buildup Stages(Death Star Stages)
            ],

            "35.20":[
                "RHDEvent", //Ripehoneydew Event Countdown
            ],

            "36.30":[
                /*
                "PC_01", //Pistol Canary Stage 1
                "PC_02", //Pistol Canary Stage 2
                "PC_03", //Pistol Canary Stage 3
                "Event_S33_Winterfest_BrickSoup_Sequence", //Pistol Canary Sequence 
                "Event_S33_Winterfest_BrickSoup_PreLoad_Sequence", //Pistol Canary Pre Load Sequence
                "PC_Event", //Pistol Canary Event
                "EventStart", //Pistol Canary Event Start
                "PC_After", //Pistol Canary After Event
                "PC_TentacleStage2", //Pistol Canary Tentacle Stage 2
                */
                "PC_Timer", //Pistol Canary Countdown
            ],

            "38.11":[
                "SM_Timer"
            ],

            "39.11":[
                "EventFlag.S39_WinterFestTab", //Winterfest Tab 2025
                "WF_IG_Avail"
            ]

        })

        for (const key in versionEventFlags) {
            const versions = key.split("|");
            if (versions.includes(version)) {
                versionEventFlags[key].forEach(flag => {
                    timeline.channels['client-events'].states[0].activeEvents.push({
                        eventType: flag,
                        activeUntil: "9999-12-01T21:10:00.000Z",
                        activeSince: "2020-11-21T07:00:00.000Z"
                    });
                });
            }
        }
        

        if (version >= 31.40 || version <= 33.10) {
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "EventFlag.Event_SpooktacularPass", // Brick or Treat LEGO pass 
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2024-03-01T00:50:00.000Z"
                }                           
            )
        }
        
        if(versionGlobal == 10){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "ITB", //IT Balloon 
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                }
            )
        }

        if(versionGlobal == 11 || versionGlobal == 15){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "WSL0", //Snow Level
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "9999-09-14T07:00:00.000Z"
                },
                {
                    eventType: "WSL1", //Snow Level
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "9999-09-14T07:00:00.000Z"
                },
                {
                    eventType: "WSL2", //Snow Level
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "9999-09-14T07:00:00.000Z"
                },
                {
                    eventType: "WSL3", //Snow Level
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2015-09-14T07:00:00.000Z"
                },
            )
        }

        if(versionGlobal == 12){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "FEC01", //FE Cables Stage 1
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-14T07:00:00.000Z"
                },
                {
                    eventType: "FEC02", //FE Cables Stage 2
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-14T07:00:00.000Z"
                },
                {
                    eventType: "FEC03", //FE Cables Stage 3
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-14T07:00:00.000Z"
                },
            )
        }

        if(versionGlobal == 14){
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "RLS0", //Rift Landmark Sphere 0(Ch2S4 related)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-14T07:00:00.000Z"
                },
                {
                    eventType: "RLS1", //Rift Landmark Sphere 1(Ch2S4 related)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-14T07:00:00.000Z"
                },
                {
                    eventType: "RLS2", //Rift Landmark Sphere 2(Ch2S4 related)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-14T07:00:00.000Z"
                },
                {
                    eventType: "RLS3", //Rift Landmark Sphere 3(Ch2S4 related)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-14T07:00:00.000Z"
                },
                {
                    eventType: "SL_01", //Stark Lab - SL_01(Ch2S4 related)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-14T07:00:00.000Z"
                },
                {
                    eventType: "SL_02", //Stark Lab - SL_02(Ch2S4 related)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-14T07:00:00.000Z"
                },
                {
                    eventType: "HSS0", //Hightower Sphere Stage 0(Ch2S4 related)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-14T07:00:00.000Z"
                },
                {
                    eventType: "HSS1", //Hightower Sphere Stage 1(Ch2S4 related)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-14T07:00:00.000Z"
                },
                {
                    eventType: "HSS2", //Hightower Sphere Stage 2(Ch2S4 related)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-14T07:00:00.000Z"
                },
                {
                    eventType: "HSS3", //Hightower Sphere Stage 3(Ch2S4 related)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-14T07:00:00.000Z"
                },
                {
                    eventType: "HC_01", //Hellicarrier - Bus Mod(Ch2S4 related)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-14T07:00:00.000Z"
                },
                {
                    eventType: "HC_02", //Hellicarrier - Mod Stage1(Ch2S4 related)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-14T07:00:00.000Z"
                },
                {
                    eventType: "SH01", //Stark Hangar(Ch2S4 related)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-14T07:00:00.000Z"
                },
                {
                    eventType: "SH02", //Stark Hangar(Ch2S4 related)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-14T07:00:00.000Z"
                },
                {
                    eventType: "BVJ01", //Make Galactus visable in the skybox(Ch2S4 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-14T07:00:00.000Z"
                },
                {
                    eventType: "GALCD", //Galactus Countdown(Ch2S4 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-14T07:00:00.000Z"
                },
                {
                    eventType: "SPJ01", //Sky Distant Object(Ch2S4 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-14T07:00:00.000Z"
                },
            )
        }

        if(versionGlobal == 15){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "WPICK02", //Wombat Complete Portal(Ch2S5 Portal related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "CPICK02", //Cherry Plum Tiramisu Complete Portal(Ch2S5 Portal related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "FPICK02", //French Fry Complete Portal(Ch2S5 Portal related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "TPICK02", //Typhoon Complete Portal(Ch2S5 Portal related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "NPICK02", //Nightmare Complete Portal(Ch2S5 Portal related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "KPICK02", //Kepler Complete Portal(Ch2S5 Portal related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "SKPICK02", //Skirmish Complete Portal(Ch2S5 Portal related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "SFPICK02", //SmallFry Complete Portal(Ch2S5 Portal related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
            )
        }

        if(versionGlobal == 16){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
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
            )
        }

        if(versionGlobal == 17){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
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
                    eventType: "BPAQ", //Bomb Parts Assembling(Ch2S7 related)
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
            )
        }

        if(versionGlobal == 18){
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
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "GCMFP01", //Golden Cube Move Final Placement(Ch2S8 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "CSAWS01", //Crash Site 1 AwakenedState(Ch2S8 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "CSAWS02", //Crash Site 2 AwakenedState(Ch2S8 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "CSAWS03", //Crash Site 3 AwakenedState(Ch2S8 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "CSAWS04", //Crash Site 4 AwakenedState(Ch2S8 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "CSAWS05", //Crash Site 5 AwakenedState(Ch2S8 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "GCA01", //Golden Cube Awaken 1(Ch2S8 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "GCA02", //Golden Cube Awaken 2(Ch2S8 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "GCA03", //Golden Cube Awaken 3(Ch2S8 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "GCA04", //Golden Cube Awaken 4(Ch2S8 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "GCA05", //Golden Cube Awaken 5(Ch2S8 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
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
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
            )
        }

        if(versionGlobal == 19){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
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
                    eventType: "c_2021_SM01", //Client Snow Stage 01(Ch3S1 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "c_2021_SM02", //Client Snow Stage 02(Ch3S1 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "9999-09-09T07:00:00.000Z"
                },
                {
                    eventType: "c_2021_SM03", //Client Snow Stage 03(Ch3S1 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "9999-09-09T07:00:00.000Z"
                },
                {
                    eventType: "c_2021_SM04", //Client Snow Stage 04(Ch3S1 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "9999-09-09T07:00:00.000Z"
                },
                {
                    eventType: "c_2021_SM05", //Client Snow Stage 05(Ch3S1 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "9999-09-09T07:00:00.000Z"
                },
                {
                    eventType: "c_2021_SM06", //Client Snow Stage 06(Ch3S1 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "9999-09-09T07:00:00.000Z"
                },
                {
                    eventType: "c_2021_SM07", //Client Snow Stage 07(Ch3S1 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "9999-09-09T07:00:00.000Z"
                },
                {
                    eventType: "c_2021_SM08", //Client Snow Stage 08(Ch3S1 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "9999-09-09T07:00:00.000Z"
                },
                {
                    eventType: "c_2021_SM09", //Client Snow Stage 09(Ch3S1 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "9999-09-09T07:00:00.000Z"
                },
            )
        }
        if(versionGlobal == 22){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
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
            )
        }

        if(versionGlobal == 32){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "Week1",
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "Week2",
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "Week3",
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "Week4",
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "ClydeSeason1",
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "ClydeSeason2Part1",
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "ClydeSeason2Part2",
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "ClydeSeason3Part1",
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "KL1",
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "KL2",
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "KL3",
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
            )
        }

        if(versionGlobal == 7 || versionGlobal == 11 || versionGlobal == 15 || versionGlobal == 19){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "TopSecret", //Holiday Bus (S7/S11/S15/S19)
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2015-09-14T07:00:00.000Z"
            })
        }

        if(versionGlobal == 14 || versionGlobal == 18 || versionGlobal == 22){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "EventFlag.HalloweenBattleBus", //Halloween Bus (S14/S18/S22)
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2015-09-14T07:00:00.000Z"
            })
        }


        //Configurable Flags


        if(config.bEnableRuinHouseBeacon == true && versionGlobal == 10){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "RBPRH", // Ruined House Beacon Loaded(Chapter 1 Season 10)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2000-09-14T07:00:00.000Z"
                },
                {
                    eventType: "RBBRH", // Ruined House Beacon Activated(Chapter 1 Season 10)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2000-09-14T07:00:00.000Z"
                }
            )

        }

        if(config.bEnableGothemCityBeacon == true && version == 10.31){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "RBBMP", // Gothem City Beacon Loaded(Chapter 1 Season 10)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2000-09-14T07:00:00.000Z"
                },
                {
                    eventType: "RBBM", // Gothem City Beacon Activated(Chapter 1 Season 10)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2000-09-14T07:00:00.000Z"
                }
            )

        }

        if(config.bEnableGreasyGroveBeacon == true && versionGlobal == 10){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "RBPGG", // Greasy Grove Beacon Loaded(Chapter 1 Season 10)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2000-09-14T07:00:00.000Z"
                },
                {
                    eventType: "RBBGG", // Greasy Grove Beacon Activated(Chapter 1 Season 10)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2000-09-14T07:00:00.000Z"
                }
            )

        }

        if(config.bEnableMoistyPalmsBeacon == true && versionGlobal == 10){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "RBPMP", // Moisty Palms Beacon Loaded(Chapter 1 Season 10)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2000-09-14T07:00:00.000Z"
                },
                {
                    eventType: "RBBMP", // Moisty Palms Beacon Activated(Chapter 1 Season 10)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2000-09-14T07:00:00.000Z"
                }
            )

        }

        if(config.bEnableFrenzyFieldsBeacon == true && versionGlobal == 10){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "RBPFI", // Frenzy Fields Beacon Loaded(Chapter 1 Season 10)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2000-09-14T07:00:00.000Z"
                },
                {
                    eventType: "RBBFI", // Frenzy Fields Beacon Activated(Chapter 1 Season 10)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2000-09-14T07:00:00.000Z"
                }
            )

        }

        if(config.bEnableOakBeacon == true && versionGlobal == 10){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "RBPBO", // Oak Beacon Loaded(Chapter 1 Season 10)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2000-09-14T07:00:00.000Z"
                },
                {
                    eventType: "RBBO", // Oak Beacon Activated(Chapter 1 Season 10)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2000-09-14T07:00:00.000Z"
                }
            )

        }

        if(config.bEnableVoidBeacon == true && versionGlobal == 10){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "RBPVA", // Void Beacon Loaded(Chapter 1 Season 10)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2000-09-14T07:00:00.000Z"
                },
                {
                    eventType: "RBBVA", // Void Beacon Activated(Chapter 1 Season 10)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2000-09-14T07:00:00.000Z"
                }
            )

        }

        if(config.bEnableRetailRowBeacon == true && versionGlobal == 10){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "RBPRR", // Retail Row Beacon Loaded(Chapter 1 Season 10)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2000-09-14T07:00:00.000Z"
                },
                {
                    eventType: "RBBRR", // Retail Row Beacon Activated(Chapter 1 Season 10)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2000-09-14T07:00:00.000Z"
                }
            )

        }

        if(config.bEnableFloatingCubeIsland == true && versionGlobal == 10){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "RBFI", // Floating Cube Island(Chapter 1 Season 10)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2000-09-14T07:00:00.000Z"
                }
            )

        }

        if(config.RufusWeek2 == true && versionGlobal == 27){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "RufusWeek2", // Rufus Week 2(Chapter 4 Season OG)
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            })
        }
        if(config.RufusWeek3 == true && versionGlobal == 27){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "RufusWeek3", // Rufus Week 3(Chapter 4 Season OG)
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            })
        }
        if(config.RufusWeek4 == true && versionGlobal == 27){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "RufusWeek4", // Rufus Week 4(Chapter 4 Season OG)
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            })
        }

        if(config.TMNTStage1 == true){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "EventFlag.Event_LinedNotebook_Teaser1", // TMNT Tab Stage 1 
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            })
        }
        if(config.TMNTStage2 == true){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "EventFlag.Event_LinedNotebook_Teaser2", // TMNT Tab Stage 2
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            })
        }
        if(config.TMNTStage3 == true){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "EventFlag.Event_LinedNotebook_Teaser3", // TMNT Tab Stage 3
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            })
        }    
        
        if(config.AtlaIceberg1 == true){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "AtlaIceberg1", // Avatar iceberg stage 1 
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            })
        }  
        if(config.AtlaIceberg2 == true){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "AtlaIceberg2", // Avatar iceberg stage 2 
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            },)
        }   
        if(config.AtlaIceberg3 == true){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "AtlaIceberg3", // Avatar iceberg stage 3
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            })
        }

        if(config.WaterLevel_0 == true && versionGlobal == 13){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "WL0", // Water Level 0
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            })
        }
        if(config.WaterLevel_1 == true && versionGlobal == 13){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "WL1", // Water Level 1
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            })
        }
        if(config.WaterLevel_2 == true && versionGlobal == 13){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "WL2", // Water Level 2
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            })
        }
        if(config.WaterLevel_3 == true && versionGlobal == 13){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "WL3", // Water Level 3
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            })
        }
        if(config.WaterLevel_4 == true && versionGlobal == 13){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "WL4", // Water Level 4
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            })
        }
        if(config.WaterLevel_5 == true && versionGlobal == 13){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "WL5", // Water Level 5
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            })
        }
        if(config.WaterLevel_6 == true && versionGlobal == 13){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "WL6", // Water Level 6
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            })
        }
        if(config.WaterLevel_7 == true && versionGlobal == 13){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "WL7", // Water Level 7
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            })
        }
        if (!requested) {
                const activeEvents = timeline.channels['client-events'].states[0].activeEvents;
                let count = 0;
                for (const event of activeEvents) {
                    if (event["eventType"]) {
                        count++
                    }
                }
                NeoLog.Log(`${count} Event Flags currently active`);
                requested = true;
            }
            res.json(timeline)

        }

    }
