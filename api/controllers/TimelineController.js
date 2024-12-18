
const path = require('path');
var fs = require('fs')
var ini = require('ini')
const {getVersionInfo, loadJSON} = require("../../config/defs")



module.exports = {
    timeline: function(req, res){
        const { version, versionGlobal } = getVersionInfo(req);
        const keychain = loadJSON("../responses/keychain.json")
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
                    cacheExpire: new Date(Date.now() - new Date().getTimezoneOffset() * 60000 + 1000).toISOString()
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
                    cacheExpire: new Date(Date.now() - new Date().getTimezoneOffset() * 60000 + 1000).toISOString() //refresh every second(might be a bit over kill)
                }
            },
            currentTime: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString(),
            cacheIntervalMins: 0,
            eventsTimeOffsetHrs: 0
        }

        if(version == "Cert"){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "EventFlag.LobbyWinterDecor", //Winter Lobby
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
            )
        }

        if(version == 4.5){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "EventFlag.BR_S4_Geode_Countdown", //Rocket Launch Event Countdown
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "EventFlag.BR_S4_Oddity_02_Event", //Oddity 02 Event
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "EventFlag.BR_S4_Oddity_03_Event", //Oddity 03 Event
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "EventFlag.BR_S4_Oddity_04_Event", //Oddity 04 Event
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "EventFlag.BR_S5_Oddity_Tomato_Event",//Oddity 05 Event
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
            )
        }

        if(version == 6.21){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "EventFlag.LobbySeason6Halloween",
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                }
            )
        }

        if(version == 7.20){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "EventFlag.LTM_14DaysOfFortnite", //WinterFest
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "warning", //TV Warning
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "Countdown", //TV Countdown
                    activeUntil: "2024-08-02T02:38:00.000Z",
                    activeSince: "9999-12-01T21:10:00.000Z"
                },
                {
                    eventType: "P1", // Ice King Event related
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "WDK", // Ice King Apeaars
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
            )
        }

        if(version == 7.30){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "F0", // Marshmello Event countdown
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "F1", // Marshmello Event countdown
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "FLevel", // Marshmello Event Level
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "FEST_POSTER", // Marshmello event posters
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "roadie_0", // ?
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "EventFlag.LTE_Festivus", // Marshmello event
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "S7_B", // ?
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "S7_C", // ?
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "HP", // ?
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },              
            )
        }
        

        if(version == 8.51){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "EventFlag.UnvaultingCountdown", // Unvaulting Event countdown (idk if this works, havent tried it)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "GWS0", // Unvaulting Event related
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "GWS1", //  Unvaulting Event related
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "GW1", //  Unvaulting Event related
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "GW2", //  Unvaulting Event related
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "GW3", // Unvaulting Event related
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "GWW1", //  Unvaulting Event related
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "GWW2", //  Unvaulting Event related
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "GWW3", //  Unvaulting Event related
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "GWW4", //  Unvaulting Event related
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "GWW5", //  Unvaulting Event related
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },         
            )
        }

        if(version == 9.20){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "CatSpot1", // Cattus Spotting Ocean
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },            
            )
        }

        if(version == 9.30 || version == 9.40 || version == 9.41){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "CDTime", // Final Showdown countdown (idk if this works, havent tried it)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "DoggusProp", //Doggus Propaganda Posters
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "CVD1", // Final Showdown countdown (idk if this works, havent tried it)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "CatSpot2", // Cattus Spotting 2
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "STP", // Stranger Things Portals(Mega Mall)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },           
            )
        }  
        
        
        if(version == 10.40){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "NN1", // The End Countdown
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-10-05T00:00:00.000Z"
                },
                {  
                    eventType: "survey_br_nick_001", // nightnight blackhole lobby mini event
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "9999-09-14T07:00:00.000Z"
                }                
            )
        }
        
        if(version == 11.10){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "HW2019", // FortniteMares 2019
                    activeUntil: "9999-10-05T00:41:00.000Z",
                    activeSince: "2020-10-05T00:00:00.000Z"
                },
                {  
                    eventType: "HW2019Leadup", // FortniteMares 2019 Leadup
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-10-05T00:00:00.000Z"
                }             
            )
        }

        if(version == 11.30){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "GALCD", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
                {
                    eventType: "GALP", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
            )
        }
        
        if(version == 11.31){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
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

        if(version == 12.30){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "DPY01", // Deadpool Yacht
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "EventFlag.DonutBattleBus", // Deadpool Battle Bus
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
            )
        }
        
        if(version == 12.40 || version == 12.41){
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

        if(version == 12.60 || version == 12.61){
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
                },
                {
                    eventType: "FHS01", // Fritter Hatches Stage 1
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "FHS02", // Fritter Hatches STage 2
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                }                          
            )
        }
        
        if(version == 13.40){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {      
                    eventType: "SM1",//scorch marks
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2015-09-14T07:00:00.000Z"
                },
                {      
                    eventType: "LS_PRE",
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2015-09-14T07:00:00.000Z"
                },
                {
                    eventType: "TC1",//thorhammer 'poi'
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2015-09-14T07:00:00.000Z"
                },
                {
                    eventType: "TR1",//unhides the rift in the sky in season13(13.40)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2015-09-14T07:00:00.000Z"
                },
                {
                    eventType: "CBS1",//Coral buddies stage 1
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2015-09-14T07:00:00.000Z"
                },                      
            )
        }

        if(version == 14.00){
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "LS2", //Galactus Countdown(Ch2S4 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-14T07:00:00.000Z"
                },
                {
                    eventType: "HSS2", //Sky Distant Object(Ch2S4 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-14T07:00:00.000Z"
                },
            )
        }

        if(version == 14.30){
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "SPJ02", //Sky Card for Junior(Ch2S4 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-14T07:00:00.000Z"
                }
            )
        }

        if(version == 14.60){
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
                },
                {
                    eventType: "SPJ03", // C2S4-related (Countdown)
                    activeUntil: "9999-12-02T09:00:00.000Z",
                    activeSince: "2020-12-01T21:16:00.000Z"
                }
            )
        }

        if(version == 17.30 || version == 17.20){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "BEL01", // Leadup In-game/Leadup In-Lobby
                    activeUntil: "9999-09-14T07:00:00.000Z", // #1 2021-08-06T22:05:00.000Z // #2 2021-08-07T18:05:00.000Z // #3 2021-08-08T04:05:00.000Z // #4 2021-08-08T14:05:00.000Z // #5 2021-08-08T22:05:00.000Z
                    activeSince: "2021-07-27T06:00:00.000Z" // #1 2021-07-27T06:00:00.000Z // #2 2021-08-06T23:15:00.000Z // #3 2021-08-07T19:15:00.000Z // #4 2021-08-08T05:15:00.000Z // #5 2021-08-08T15:15:00.000Z
                },
                {
                    eventType: "BET01", // Rift Tour-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z", // #1 2021-08-06T22:05:00.000Z // #2 2021-08-07T18:05:00.000Z // #3 2021-08-08T04:05:00.000Z // #4 2021-08-08T14:05:00.000Z // #5 2021-08-08T22:05:00.000Z
                    activeSince: "2021-07-27T06:00:00.000Z" // #1 2021-07-27T06:00:00.000Z // #2 2021-08-06T23:15:00.000Z // #3 2021-08-07T19:15:00.000Z // #4 2021-08-08T05:15:00.000Z // #5 2021-08-08T15:15:00.000Z
                },
                {
                    eventType: "BEL02", // Leadup In-game/Leadup In-Lobby
                    activeUntil: "9999-09-14T07:00:00.000Z", // #1 2021-08-06T22:05:00.000Z // #2 2021-08-07T18:05:00.000Z // #3 2021-08-08T04:05:00.000Z // #4 2021-08-08T14:05:00.000Z // #5 2021-08-08T22:05:00.000Z
                    activeSince: "2021-07-27T06:00:00.000Z" // #1 2021-07-27T06:00:00.000Z // #2 2021-08-06T23:15:00.000Z // #3 2021-08-07T19:15:00.000Z // #4 2021-08-08T05:15:00.000Z // #5 2021-08-08T15:15:00.000Z
                },
                {
                    eventType: "BEP02", // Rift Tour Enable Pads?
                    activeUntil: "2021-09-14T07:00:00.000Z", 
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "BPLS", // Rift Tour Party Landingship
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "BTP", // Rift Tour Teaser Poster
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "BAP", // Rift Tour Announce Poster
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "BTL01", // Rift Tour TOD Leadup 1)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "ABDSLP", //Slurpy: Abduction(Ch2S7 related)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
            )
        }

        if(version == 17.50){
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
                },
                {
                    eventType: "ABDFRM", //Farm: Abduction(Ch2S7 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
            )
        }

        if(version == 20.40){
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
                },
                {
                    eventType: "AS01", //Armadillo Start(Ch3S2 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "ARLU01", //ArmadilloRoll Lead Up(Ch3S2 related)
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
            )
        }

        if(version == 21.30 || version == 21.40){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "STMN_PH", // Dragon Ball Collab Preheat(21.30)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "Event_S21_Stamina", // Dragon Ball tab(21.40)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RBB01", // Bugle Bloom (Closed)(21.30)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "NSSC02", // No Sweat Summer Concert (Constructed)(21.30)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                }
            )
        }        

        if(version == 22.40){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "RL01", // Fracture In-Game Leadup
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RL02", // Fracture Radish Lobby Leadup
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RL12", // Fracture Lobby Leadup 2
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RL13", // Fracture Lobby Leadup 3
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RL14", // Fracture Lobby Leadup 4
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RL15", // Fracture Lobby Leadup 5
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RL16", // Fracture Lobby Leadup 6
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RL22", // Fracture In-Game Leadup 2
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RL23", // Fracture In-Game Leadup 3
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RL24", // Fracture In-Game Leadup 4
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RL25", // Fracture In-Game Leadup 5
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RL26", // Fracture In-Game Leadup 6
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RC01", // Fracture Core
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RC02", // Fracture Core 2
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RC03", // Fracture Core 3
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RC04", // Fracture Core 4
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RC05", // Fracture Core 5
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RC06", // Fracture Core 6
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                }
            )
        }

        if(version == 23.10){
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
    
        if(version == 23.50){
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "EventFlag.Event_Vaultbreakers", // Most Wanted tab
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "EventFlag.Event_S23_FindIt", // Event_S23_FindIt
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RG01", // RiftGate Stage 1
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "9999-09-14T07:00:00.000Z"
                },
                {
                    eventType: "RG02", // RiftGate Stage 2
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "ST01", // Skytear Stage 1
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "9999-09-14T07:00:00.000Z"
                },
                {
                    eventType: "ST02", // Skytear Stage 2
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                }             
            )
        }

        if(version == 24.00 || version == 24.10){
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "EventFlag.Event_S24_LanternFest", // Latern Fest 2023 
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "Lanternfest", // Latern Fest 2023 
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "EventFlag.Event_S24_SunBurst", // Sunburst 
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "EventFlag.Event_S24_SpringFling", // Springfling 
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                }    
            )
        }
        
        if(version == 24.30 || version == 24.40){
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "EventFlag.Event_PlotTwist", // Star Wars 2023 tab 
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                }    
            )
        }

        if(version == 25.30){
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "EventFlag.Event_BelongTreaty", // Jujutsu Kaisen tab
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                }    
            )
        }        

        if(version == 27.11 || version == 31.41 || version == 32.11){
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "DL01", // Durian & Kiln Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "DL02", // Durian & Kiln Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                }           
            )
        }

        if(version == 28.10){
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "EventFlag.Event_LinedNotebook_Teaser", // TMNT Tab countdown (always needed)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                }       
            )
        }

        if(version == 28.20 || version == 28.30){
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "EventFlag.Event_LinedNotebook", // TMNT mini pass
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                }       
            )
        }

        if(version == 28.30){
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                /*{
                    eventType: "CH5S1CPPE", //Pre-Emergence Event(Central Picnic)
                    activeUntil: "2024-03-03T02:00.000Z",
                    activeSince: "2024-03-01T00:50:00.000Z"
                },
                {
                    eventType: "CH5S1CPCE", //Crater event - Pre-Emergence Event (Central Picnic)
                    activeUntil: "2024-03-01T02:00.000Z",
                    activeSince: "2024-03-01T00:50:00.000Z"
                },
                {
                    eventType: "CH5S1CPTE", //Thump Event - Pre-Emergence Event (Central Picnic)
                    activeUntil: "2024-03-01T01:40.000Z",
                    activeSince: "2024-03-01T00:40:00.000Z"
                },
                {
                    eventType: "CH5S1CPFH", //Final Hour - Pre-Emergence Event (Central Picnic)
                    activeUntil: "2024-03-03T10:00.000Z",
                    activeSince: "2024-03-01T00:50:00.000Z"
                },
                {
                    eventType: "CH5S1CPFP", //Titan Hand Appears(Central Picnic)
                    activeUntil: "2024-03-03T02:00.000Z",
                    activeSince: "2024-03-01T00:50:00.000Z"
                },
                {
                    eventType: "CH5S1CPPP", //Primary Events(Central Picnic)
                    activeUntil: "2024-03-03T02:00.000Z",
                    activeSince: "2024-03-01T00:50:00.000Z"
                },
                {
                    eventType: "CH5S1CPEP", //Post-Chain Event(Central Picnic)
                    activeUntil: "2024-03-03T02:00.000Z",
                    activeSince: "2024-03-01T00:50:00.000Z"
                }, //Note: Flags labled "Pre-Emergence Event" need to have the "CH5S1CPPE" flag to work event flags not labled with the "Pre-Emergence Event" need to have "CH5S1CPPE" disabled to work*/
            )
        }

        if (version == 29.00 || version == 29.01 || version == 29.10){
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "EventFlag.Event_S29_SeasonalActivation", 
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2024-03-01T00:50:00.000Z"
                },
                {
                    eventType: "EventFlag.Event_S29_MidasActivation", 
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2024-03-01T00:50:00.000Z"
                }                               
            )
        }
        
        if(version == 29.20 || version == 29.30){
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "EventFlag.Event_S29_ColdDay", // Avatar mini pass + cabbages
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },    
                {
                    eventType: "AtlaShrines", // Avatar map changes
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },    
                {
                    eventType: "AtlaScrolls", // Avatar map changes
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "AtlaChests", // Avatar map changes
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                }                                    
            )
        }

        if(version == 29.40){
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                /*{
                    eventType: "EventFlag.Event_Osiris",
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "SUPERSPORT_BUILDUP_1",
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "SUPERSPORT_BUILDUP_2",
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "SUPERSPORT_BUILDUP_3",
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "SUPERSPORT_CHARGE_1",
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "SUPERSPORT_STRIKE_1",
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "SUPERSPORT_CHARGE_2",
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "SUPERSPORT_STRIKE_2",
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "SUPERSPORT_CHARGE_3",
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "SUPERSPORT_STRIKE_3",
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "SUPERSPORT_SANDSTORM",
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "SUPERSPORT_LIGHT_2",
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },*/
            )
        }

        if(version == 30.20 || version == 30.30){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
            {
                eventType: "EventFlag.Event_Greenhouse", //Pirates Of the Caribbean Mini Pass
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2020-09-09T07:00:00.000Z"
            },
            {
                eventType: "RE_01_Cutout",
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2020-09-09T07:00:00.000Z"
            },
            {
                eventType: "RE_02_Cutout",
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2020-09-09T07:00:00.000Z"
            },
            {
                eventType: "RE_03_Cutout",
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2020-09-09T07:00:00.000Z"
            },
            {
                eventType: "RE_01", //Nitro Pipeline Stage 1
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2020-09-09T07:00:00.000Z"
            },
            {
                eventType: "RE_02", //Nitro Pipeline Stage 2
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2020-09-09T07:00:00.000Z"
            },
            {
                eventType: "RE_03", //Nitro Pipeline Stage 3
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2020-09-09T07:00:00.000Z"
            },
        )}

        if (version >= 31.20 || version <= 31.40){
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "EventFlag.Event_ButtercakePass", 
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2024-03-01T00:50:00.000Z"
                }                           
            )
        }

        if (version >= 31.40 || version <= 33.10) { // one UPlugin is set to end on 33.00 while the other on 33.10 so using 33.10 just in case
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "EventFlag.Event_SpooktacularPass", // Brick or Treat LEGO pass 
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2024-03-01T00:50:00.000Z"
                }                           
            )
        }

        if (version == 31.41) {
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "StageA", //Kiln Buildup Stage 1
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeUntil: "9999-09-14T07:00:00.000Z",
                },
                {
                    eventType: "StageB", //Kiln Buildup Stage 2
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeUntil: "9999-09-14T07:00:00.000Z",
                },
                {
                    eventType: "StageC", //Kiln Buildup Stage 3
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeUntil: "9999-09-14T07:00:00.000Z",
                },
                {
                    eventType: "StageD", //Kiln Buildup Stage 4
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "KilnB", //Kiln Buildup
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "Kiln_TOD", //Kiln Time Of Day
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "Kiln_Event", //Kiln Event
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "Kiln_Preload_Event", //Kiln Preload Event
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                }                           
            )
        }

        if (version == 33.11) {
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "EventFlag.S33_WinterFestTab", //2024 winterfest
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
                },/*
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
                },*/
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
        res.json(timeline)
    }
    
}
