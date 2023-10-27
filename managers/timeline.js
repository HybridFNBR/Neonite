
module.exports = (app) => {
    app.get('/fortnite/api/calendar/v1/timeline', (req, res) => {
        var season

        try {
            season = req.headers["user-agent"].split("-")[1].split(".")[0]
        } catch {
            season = 1
        }

        res.json({
        channels: {
            "standalone-store": {},
            "client-matchmaking": {},
            tk: {
                states: [
                    {
                        validFrom: "2019-12-31T23:59:59.999Z",
                        activeEvents: [],
                        state: {
                            k: [
                                "58388BA7BD1643A85EFD49BF26EF5912:Aru327JJHsGKCD2YlQT+Ejy63//vly9ChTdKsfgL75o=",
                                "63722D44ECCA0F4178B85F5A6BC4C31B:j42UL0bmfBkli6Aj92wWABwFby5rAplP/Ac6nh9kRvA=",
                                "F4729DF9DB149229267F9389E3C95851:DCXGOUUTWG8jFuEryO+32mXKJsQgQe+Fp82u7mHiYFU="
                            ]
                        }
                    }
                ],
                cacheExpire: "9999-12-31T23:59:59.999Z"
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
							eventType: "CDTime", // Cattus related?
                            activeUntil: "9999-12-01T21:10:00.000Z",
                            activeSince: "2020-11-21T07:00:00.000Z"
						},
						{
							eventType: "RBFI", // IslandScripting (CH1) related
                            activeUntil: "9999-12-01T21:10:00.000Z",
                            activeSince: "2020-11-21T07:00:00.000Z"
						},
						{
							eventType: "NN1", // The End Countdown
                            activeUntil: "9999-10-05T00:41:00.000Z",
                            activeSince: "2020-10-05T00:00:00.000Z"
						},
						{
                            eventType: "JCD01", // Travis Related
                            activeUntil: "9999-12-01T21:10:00.000Z",
                            activeSince: "2020-11-21T07:00:00.000Z"
                        },
						{
                            eventType: "JH01", // Travis Related
                            activeUntil: "9999-12-01T21:10:00.000Z",
                            activeSince: "2020-11-21T07:00:00.000Z"
                        },
						{
                            eventType: "FCD01", // The Device Countdown
                            activeUntil: "9999-12-01T21:10:00.000Z",
                            activeSince: "2020-11-21T07:00:00.000Z"
                        },
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
                            eventType: `EventFlag.LobbySeason${season}`,
                            activeUntil: "2021-09-24T14:00:00.000Z",
                            activeSince: "2021-06-05T14:00:00.000Z"
                        },
                        {
                            eventType: "BEL01", // Rift Tour-related (Countdown)
                            activeUntil: "2021-09-14T07:00:00.000Z", // #1 2021-08-06T22:05:00.000Z // #2 2021-08-07T18:05:00.000Z // #3 2021-08-08T04:05:00.000Z // #4 2021-08-08T14:05:00.000Z // #5 2021-08-08T22:05:00.000Z
                            activeSince: "2021-07-27T06:00:00.000Z" // #1 2021-07-27T06:00:00.000Z // #2 2021-08-06T23:15:00.000Z // #3 2021-08-07T19:15:00.000Z // #4 2021-08-08T05:15:00.000Z // #5 2021-08-08T15:15:00.000Z
                        },
						{
                            eventType: "BET01", // Rift Tour-related (Countdown)
                            activeUntil: "2021-09-14T07:00:00.000Z", // #1 2021-08-06T22:05:00.000Z // #2 2021-08-07T18:05:00.000Z // #3 2021-08-08T04:05:00.000Z // #4 2021-08-08T14:05:00.000Z // #5 2021-08-08T22:05:00.000Z
                            activeSince: "2021-07-27T06:00:00.000Z" // #1 2021-07-27T06:00:00.000Z // #2 2021-08-06T23:15:00.000Z // #3 2021-08-07T19:15:00.000Z // #4 2021-08-08T05:15:00.000Z // #5 2021-08-08T15:15:00.000Z
                        },
						{
                            eventType: "BEL02", // Rift Tour-related (Countdown)
                            activeUntil: "2021-09-14T07:00:00.000Z", // #1 2021-08-06T22:05:00.000Z // #2 2021-08-07T18:05:00.000Z // #3 2021-08-08T04:05:00.000Z // #4 2021-08-08T14:05:00.000Z // #5 2021-08-08T22:05:00.000Z
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
                        },
                        {
                            eventType: "KEL02", // Sky Fire Event-related (Countdown)
                            activeUntil: "9999-09-14T07:00:00.000Z",
                            activeSince: "2023-10-10T06:00:00.000Z"
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
                        },
                        {
                            eventType: "CalendarEvent_Season23_Winterfest", // Winterfest 2022
                            activeUntil: "9999-09-14T07:00:00.000Z",
                            activeSince: "2021-07-27T06:00:00.000Z"
                        },
                        {
                            eventType: "EventFlag.LTE_WinterFestTab", // Winterfest 2022
                            activeUntil: "9999-09-14T07:00:00.000Z",
                            activeSince: "2021-07-27T06:00:00.000Z"
                        },
                        {
                            
                            eventType: "survey_br_nick_001", // nightnight blackhole lobby mini event
                            activeUntil: "9999-09-14T07:00:00.000Z",
                            activeSince: "9999-09-14T07:00:00.000Z"
                        },
                        {
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
                            activeSince: "9999-09-09T07:00:00.000Z"
                        },
                        {
                            eventType: "DataLayerTest2", //DataLayerTest2(Ch4S1 related)
                            activeUntil: "9999-09-09T07:00:00.000Z",
                            activeSince: "9999-09-09T07:00:00.000Z"
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
                            eventType: "DL01", // CH1/Ch4 end event leadup in-game(27.11)
                            activeUntil: "9999-09-09T07:00:00.000Z",
                            activeSince: "9999-09-09T07:00:00.000Z"
                        },
                        {
                            eventType: "DL02", // CH1/Ch4 end event leadup lobby(27.11)
                            activeUntil: "9999-09-09T07:00:00.000Z",
                            activeSince: "9999-09-09T07:00:00.000Z"
                        },
                    ],
                    state: {
                        activeStorefronts: [],
                        eventNamedWeights: {},
                        activeEvents: [],
                        seasonNumber: season,
                        seasonTemplateId: `AthenaSeason:athenaseason${season}`,
                        matchXpBonusPoints: 0,
                        eventPunchCardTemplateId: "",
                        seasonBegin: "2021-06-05T14:00:00Z",
                        seasonEnd: "2021-09-24T14:00:00Z",
                        seasonDisplayedEnd: "2021-09-30T04:00:00Z",
                        dailyStoreEnd: "9999-12-31T23:59:59.999Z",
                        weeklyStoreEnd: "9999-12-31T23:59:59.999Z",
                        sectionStoreEnds: {
                            Ariana: "9999-12-31T23:59:59.999Z",
                            ArianaB: "9999-12-31T23:59:59.999Z",
                            ArianaC: "9999-12-31T23:59:59.999Z",
                            Backpacks: "9999-12-31T23:59:59.999Z",
                            BannerBrigade: "9999-12-31T23:59:59.999Z",
                            BannerBrigade2: "9999-12-31T23:59:59.999Z",
                            BannerGear: "9999-12-31T23:59:59.999Z",
                            BannerImpostors: "9999-12-31T23:59:59.999Z",
                            BannerImpostors2: "9999-12-31T23:59:59.999Z",
                            Battlepass: "9999-12-31T23:59:59.999Z",
                            Bloodsport: "9999-12-31T23:59:59.999Z",
                            BloodsportB: "9999-12-31T23:59:59.999Z",
                            Bundle: "9999-12-31T23:59:59.999Z",
                            Bundle2: "9999-12-31T23:59:59.999Z",
                            Bundle3: "9999-12-31T23:59:59.999Z",
                            Bundles: "9999-12-31T23:59:59.999Z",
                            Characters: "9999-12-31T23:59:59.999Z",
                            ConceptArtists: "9999-12-31T23:59:59.999Z",
                            ConceptArtists2: "9999-12-31T23:59:59.999Z",
                            ConceptArtists3: "9999-12-31T23:59:59.999Z",
                            Creators: "9999-12-31T23:59:59.999Z",
                            Creators2: "9999-12-31T23:59:59.999Z",
                            Creators3: "9999-12-31T23:59:59.999Z",
                            CustomizeHero: "9999-12-31T23:59:59.999Z",
                            Daily: "9999-12-31T23:59:59.999Z",
                            Daily2: "9999-12-31T23:59:59.999Z",
                            DayFive: "9999-12-31T23:59:59.999Z",
                            DayFive2: "9999-12-31T23:59:59.999Z",
                            DayFive3: "9999-12-31T23:59:59.999Z",
                            DayFour: "9999-12-31T23:59:59.999Z",
                            DayFour2: "9999-12-31T23:59:59.999Z",
                            DayFour3: "9999-12-31T23:59:59.999Z",
                            DayOne: "9999-12-31T23:59:59.999Z",
                            DayOne2: "9999-12-31T23:59:59.999Z",
                            DayThree: "9999-12-31T23:59:59.999Z",
                            DayThree2: "9999-12-31T23:59:59.999Z",
                            DayThree3: "9999-12-31T23:59:59.999Z",
                            DayTwo: "9999-12-31T23:59:59.999Z",
                            DayTwo2: "9999-12-31T23:59:59.999Z",
                            FarOut: "9999-12-31T23:59:59.999Z",
                            FarOutB: "9999-12-31T23:59:59.999Z",
                            Featured: "9999-12-31T23:59:59.999Z",
                            Featured2: "9999-12-31T23:59:59.999Z",
                            Featured3: "9999-12-31T23:59:59.999Z",
                            Ferrari: "9999-12-31T23:59:59.999Z",
                            FerrariB: "9999-12-31T23:59:59.999Z",
                            Gliders: "9999-12-31T23:59:59.999Z",
                            Goalbound: "9999-12-31T23:59:59.999Z",
                            Goalbound2: "9999-12-31T23:59:59.999Z",
                            GotG: "9999-12-31T23:59:59.999Z",
                            GotG2: "9999-12-31T23:59:59.999Z",
                            GotG2B: "9999-12-31T23:59:59.999Z",
                            GotGB: "9999-12-31T23:59:59.999Z",
                            GreenPurple: "9999-12-31T23:59:59.999Z",
                            GreenPurple2: "9999-12-31T23:59:59.999Z",
                            GreenPurple3: "9999-12-31T23:59:59.999Z",
                            GreenPurple4: "9999-12-31T23:59:59.999Z",
                            GreenPurple5: "9999-12-31T23:59:59.999Z",
                            HeroGear: "9999-12-31T23:59:59.999Z",
                            Impostors: "9999-12-31T23:59:59.999Z",
                            Impostors2: "9999-12-31T23:59:59.999Z",
                            IrajMatt: "9999-12-31T23:59:59.999Z",
                            IrajMatt2: "9999-12-31T23:59:59.999Z",
                            IrajMatt3: "9999-12-31T23:59:59.999Z",
                            ITF: "9999-12-31T23:59:59.999Z",
                            JBalvin: "9999-12-31T23:59:59.999Z",
                            JBalvinB: "9999-12-31T23:59:59.999Z",
                            Leakers: "9999-12-31T23:59:59.999Z",
                            Leakers2: "9999-12-31T23:59:59.999Z",
                            Leakers3: "9999-12-31T23:59:59.999Z",
                            LeBron: "9999-12-31T23:59:59.999Z",
                            LeBron2: "9999-12-31T23:59:59.999Z",
                            Legends: "9999-12-31T23:59:59.999Z",
                            Legends2: "9999-12-31T23:59:59.999Z",
                            Legends3: "9999-12-31T23:59:59.999Z",
                            LimitedTime: "9999-12-31T23:59:59.999Z",
                            MasterChief: "9999-12-31T23:59:59.999Z",
                            MasterChiefB: "9999-12-31T23:59:59.999Z",
                            MechaMorty: "9999-12-31T23:59:59.999Z",
                            MechaMortyB: "9999-12-31T23:59:59.999Z",
                            MelloB: "9999-12-31T23:59:59.999Z",
                            MRLocker: "9999-12-31T23:59:59.999Z",
                            MRLockerB: "9999-12-31T23:59:59.999Z",
                            MusicPacks: "9999-12-31T23:59:59.999Z",
                            Pickaxes: "9999-12-31T23:59:59.999Z",
                            ReloadVbucks: "9999-12-31T23:59:59.999Z",
                            RiftTour: "9999-12-31T23:59:59.999Z",
                            RiftTour2: "9999-12-31T23:59:59.999Z",
                            RiftTour2B: "9999-12-31T23:59:59.999Z",
                            RiftTour3: "9999-12-31T23:59:59.999Z",
                            RiftTour3B: "9999-12-31T23:59:59.999Z",
                            RiftTour4: "9999-12-31T23:59:59.999Z",
                            RiftTour4B: "9999-12-31T23:59:59.999Z",
                            RiftTourB: "9999-12-31T23:59:59.999Z",
                            Safaroonie: "9999-12-31T23:59:59.999Z",
                            SafaroonieB: "9999-12-31T23:59:59.999Z",
                            ShadowStrike: "9999-12-31T23:59:59.999Z",
                            ShowWraps: "9999-12-31T23:59:59.999Z",
                            ShowWrapsB: "9999-12-31T23:59:59.999Z",
                            Special: "9999-12-31T23:59:59.999Z",
                            Special2: "9999-12-31T23:59:59.999Z",
                            Special3: "9999-12-31T23:59:59.999Z",
                            Special4: "9999-12-31T23:59:59.999Z",
                            Special5: "9999-12-31T23:59:59.999Z",
                            Special6: "9999-12-31T23:59:59.999Z",
                            SpecialB: "9999-12-31T23:59:59.999Z",
                            StreetFighter: "9999-12-31T23:59:59.999Z",
                            StreetFighter2B: "9999-12-31T23:59:59.999Z",
                            StreetFighterB: "9999-12-31T23:59:59.999Z",
                            Subscription: "9999-12-31T23:59:59.999Z",
                            Test: "9999-12-31T23:59:59.999Z",
                            Test2: "9999-12-31T23:59:59.999Z",
                            Test3: "9999-12-31T23:59:59.999Z",
                            Test4: "9999-12-31T23:59:59.999Z",
                            Test5: "9999-12-31T23:59:59.999Z",
                            Test6: "9999-12-31T23:59:59.999Z",
                            Test7: "9999-12-31T23:59:59.999Z",
                            Test8: "9999-12-31T23:59:59.999Z",
                            VaultShop: "9999-12-31T23:59:59.999Z",
                            VaultShop2: "9999-12-31T23:59:59.999Z",
                            VaultShop3: "9999-12-31T23:59:59.999Z",
                            WonderWoman: "9999-12-31T23:59:59.999Z",
                            WonderWomanB: "9999-12-31T23:59:59.999Z",
                            WrapEnabledGear: "9999-12-31T23:59:59.999Z",
                            WrapEnabledGearB: "9999-12-31T23:59:59.999Z",
                            Wraps: "9999-12-31T23:59:59.999Z",
                            Wraps2: "9999-12-31T23:59:59.999Z",
                            Wraps2B: "9999-12-31T23:59:59.999Z",
                            WrapsB: "9999-12-31T23:59:59.999Z"
                        },
                        rmtPromotion: "melody"
                    }
                }],
                cacheExpire: "9999-12-31T23:59:59.999Z"
            }
        },
        cacheIntervalMins: 1.0,
        currentTime: new Date().toISOString()
    })
})
}
