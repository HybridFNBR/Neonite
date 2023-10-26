
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
                            activeSince: "9999-11-21T07:00:00.000Z"
						},
						{
							eventType: "RBFI", // IslandScripting (CH1) related
                            activeUntil: "9999-12-01T21:10:00.000Z",
                            activeSince: "9999-11-21T07:00:00.000Z"
						},
						{
							eventType: "NN1", // The End Countdown
                            activeUntil: "2023-10-05T00:41:00.000Z",
                            activeSince: "2023-10-05T00:00:00.000Z"
						},
						{
                            eventType: "JCD01", // Travis Related
                            activeUntil: "9999-12-01T21:10:00.000Z",
                            activeSince: "9999-11-21T07:00:00.000Z"
                        },
						{
                            eventType: "JH01", // Travis Related
                            activeUntil: "9999-12-01T21:10:00.000Z",
                            activeSince: "9999-11-21T07:00:00.000Z"
                        },
						{
                            eventType: "FCD01", // The Device Countdown
                            activeUntil: "9999-12-01T21:10:00.000Z",
                            activeSince: "9999-11-21T07:00:00.000Z"
                        },
						{
                            eventType: "FLA01", // C2S4-related (Timers)
                            activeUntil: "2022-12-01T21:10:00.000Z",
                            activeSince: "2020-11-21T07:00:00.000Z"
                        },
                        {
                            eventType: "FSE01", // C2S4-related (Timers)
                            activeUntil: "2020-12-01T21:10:00.000Z",
                            activeSince: "2020-11-21T07:00:00.000Z"
                        },
						{
                            eventType: "FSE02", // C2S4-related (Timers)
                            activeUntil: "2020-12-01T21:10:00.000Z",
                            activeSince: "2020-11-21T07:00:00.000Z"
                        },
						{
                            eventType: "JSE02", // C2S4-related (Timers)
                            activeUntil: "9999-12-01T21:10:00.000Z",
                            activeSince: "9999-11-21T07:00:00.000Z"
                        },
                        {
                            eventType: "JFE01", // C2S4-related (Countdown)
                            activeUntil: "2020-12-02T09:00:00.000Z",
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
                            eventType: "WL7", // C2S3-related (Water Level)
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
                            eventType: "KEL01", // Sky Fire Event-related (Countdown)
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
                            activeSince: "2015-09-14T07:00:00.000Z"
                        },
                        {
                            eventType: "WL2", //water level 2(season 13)
                            activeUntil: "9999-09-14T07:00:00.000Z",
                            activeSince: "2015-09-14T07:00:00.000Z"
                        },
                        {
                            eventType: "WL3", //water level 3(season 13)
                            activeUntil: "9999-09-14T07:00:00.000Z",
                            activeSince: "2015-09-14T07:00:00.000Z"
                        },
                        {
                            eventType: "WL4", //water level 4(season 13)
                            activeUntil: "9999-09-14T07:00:00.000Z",
                            activeSince: "2015-09-14T07:00:00.000Z"
                        },
                        {
                            eventType: "WL5", //water level 5(season 13)
                            activeUntil: "9999-09-14T07:00:00.000Z",
                            activeSince: "2015-09-14T07:00:00.000Z"
                        },
                        {
                            eventType: "WL6", //water level 6(season 13)
                            activeUntil: "9999-09-14T07:00:00.000Z",
                            activeSince: "2015-09-14T07:00:00.000Z"
                        },
                        {
                            eventType: "WL7", //water level 7(season 13)
                            activeUntil: "9999-09-14T07:00:00.000Z",
                            activeSince: "2015-09-14T07:00:00.000Z"
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
