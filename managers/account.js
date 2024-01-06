module.exports = (app) => {

    //displayName
    app.get("/account/api/public/account/displayName/:displayName", (req, res) => {
		res.json({
			"id": req.params.displayName,
			"displayName": req.params.displayName,
			"externalAuths": {}
		})
	})

	
    //receipt
    app.get('/fortnite/api/receipts/v1/account/:accountId/receipts', (req, res) => {
		res.json([])
	});
    
    //Platform
    app.post('/fortnite/api/game/v2/tryPlayOnPlatform/account/:accountId', (req, res) => {
		res.set('Content-Type', 'text/plain');
		res.send(true);
	});

	app.put('/profile/privacy_settings', (req, res) => {
		res.json({
			"privacySettings":{
				"playRegion":"PRIVATE",
				"badges":"PRIVATE",
				"languages":"PRIVATE"
			}
		})
	})

    //stats
    app.get('*/api/statsv2/account/:accountId', (req, res) => {
		res.json({
			"startTime": 1698908409,
			"endTime": 1735714808,
			"stats": {
			  "br_score_gamepad_m0_playlist_habanerosolo": 1871,
			  "s27_social_bp_level": 1248,
			  "br_matchesplayed_keyboardmouse_m0_playlist_playgroundv2": 1,
			  "br_placetop10_gamepad_m0_playlist_habanerosolo": 1,
			  "br_score_gamepad_m0_playlist_bots_defaultsquad": 3445,
			  "br_lastmodified_keyboardmouse_m0_playlist_defaultsolo": 1699124004,
			  "br_lastmodified_gamepad_m0_playlist_habanerosolo": 1699214141,
			  "br_minutesplayed_keyboardmouse_m0_playlist_bots_defaultsquad": 1,
			  "br_score_keyboardmouse_m0_playlist_playgroundv2": 17,
			  "br_kills_gamepad_m0_playlist_bots_defaultsquad": 95,
			  "br_score_keyboardmouse_m0_playlist_defaultsolo": 76,
			  "br_matchesplayed_gamepad_m0_playlist_habanerosolo": 5,
			  "br_minutesplayed_gamepad_m0_playlist_habanerosolo": 59,
			  "br_playersoutlived_keyboardmouse_m0_playlist_bots_defaultsquad": 1,
			  "br_placetop3_gamepad_m0_playlist_bots_defaultsquad": 5,
			  "br_placetop6_gamepad_m0_playlist_bots_defaultsquad": 5,
			  "br_matchesplayed_gamepad_m0_playlist_bots_defaultsquad": 5,
			  "br_kills_gamepad_m0_playlist_habanerosolo": 30,
			  "br_score_keyboardmouse_m0_playlist_bots_defaultsquad": 34,
			  "br_lastmodified_gamepad_m0_playlist_bots_defaultsquad": 1699198715,
			  "br_playersoutlived_gamepad_m0_playlist_habanerosolo": 376,
			  "br_matchesplayed_keyboardmouse_m0_playlist_bots_defaultsquad": 2,
			  "br_lastmodified_keyboardmouse_m0_playlist_playgroundv2": 1699015811,
			  "br_placetop25_keyboardmouse_m0_playlist_defaultsolo": 1,
			  "br_playersoutlived_gamepad_m0_playlist_bots_defaultsquad": 490,
			  "br_placetop25_gamepad_m0_playlist_habanerosolo": 2,
			  "br_lastmodified_keyboardmouse_m0_playlist_bots_defaultsquad": 1699094790,
			  "br_placetop1_gamepad_m0_playlist_bots_defaultsquad": 5,
			  "br_matchesplayed_keyboardmouse_m0_playlist_defaultsolo": 3,
			  "br_minutesplayed_gamepad_m0_playlist_bots_defaultsquad": 101
			},
			"accountId": req.params.accountId
		  })
	})

	//stats for chapter 1
	app.get('/fortnite/api/stats/accountId/:accountId/bulk/window/alltime', (req, res) => {
		res.json([])
	})

	app.get('/api/v1/leaderboards/Fortnite/:eventId/:eventWindowId/*', (req, res) => {
		res.json({
			"gameId": "Fortnite",
			"eventId": req.params.eventId,
			"eventWindowId": req.params.eventWindowId,
			"page": 0,
			"totalPages": 1,
			"updatedTime": "2023-10-15T15:18:46.668Z",
			"entries": [
			{
				"gameId": "Fortnite",
				"eventId": "epicgames_S26_DuosCashCup_EU",
				"eventWindowId": "S26_DuosCashCup_EU_Event1_Round1",
				"teamAccountIds": [
					""
				],
				"liveSessionId": null,
				"pointsEarned": 999,
				"score": 83566254310678,
				"rank": 1,
				"percentile": 0,
				"pointBreakdown": {
					"TEAM_ELIMS_STAT_INDEX:1": {
						"timesAchieved": 999,
						"pointsEarned": 4
					},
					"VICTORY_ROYALE_STAT:1":{
						"timesAchieved": 999,
						"pointsEarned": 4
					}
				},
				"sessionHistory": [
				{
					"sessionId": "5b8dd79a7e664b15b059d5898d8fc41f",
					"endTime": "2023-09-07T20:00:00.000Z",
					"trackedStats": {
						"TIME_ALIVE_STAT": 1302,
						"PLACEMENT_TIEBREAKER_STAT": 74,
						"MMO_LootIsland": 1,
						"VICTORY_ROYALE_STAT": 0,
						"MMO_RadioTower": 0,
						"TEAM_ELIMS_STAT_INDEX": 1,
					}
				}
				],
				"unscoredSessions": [],
				"tokens": [],
				"teamId": ""
				}
			],
			"liveSessions": {}
		})
	})

	app.get("/api/v1/events/Fortnite/download/:accountId", (req, res) => {
		res.json({
			"player": {
				"gameId": "Fortnite",
				"accountId": req.params.accountId,
				"tokens": [],
				"teams": {},
				"pendingPayouts": [],
				"pendingPenalties": {},
				"persistentScores": {},
				"groupIdentity": {}
			},
			"events": [{
				"gameId": "Fortnite",
				"eventId": "epicgames_S26_DuosCashCup_EU",
				"regions": [
					"EU"
				],
				"regionMappings": {
					"EU": "EUCOMP"
				},
				"platforms": [
					"Windows"
				],
				"platformMappings": {},
				"displayDataId": "s26_brcash_duos",
				"eventGroup": "Season26DuosCashCup",
				"announcementTime": "2023-08-25T14:00:00.000Z",
				"appId": null,
				"environment": null,
				"link": {
					"type": "br:tournament",
					"code": "tournament_epicgames_s26_duoscashcup_eu",
					"version": 1
				},
				"metadata": {
					"TeamLockType": "Window",
					"minimumAccountLevel": 15,
					"TrackedStats": [
						"MMO_LootIsland",
						"MMO_RadioTower"
					],
					"RegionLockType": "Event",
					"AccountLockType": "Window"
				},
				"eventWindows": [
				{
					"eventWindowId": "S26_DuosCashCup_EU_Event1_Round1",
					"eventTemplateId": "EventTemplate_S26_DuosCashCup_EU_Event1_Round1",
					"countdownBeginTime": "2023-09-07T15:00:00.000Z",
					"beginTime": "2023-09-07T17:00:00.000Z",
					"endTime": "2023-09-07T20:00:00.000Z",
					"blackoutPeriods": [],
					"round": 0,
					"payoutDelay": 32,
					"isTBD": false,
					"canLiveSpectate": false,
					"scoreLocations": [
					{
						"leaderboardDefId": "S26DuosCashCupRound1LeaderboardDef",
						"windowEndCondition": null,
						"isMainWindowLeaderboard": true
					}
					],
					"visibility": "public",
					"requireAllTokens": [],
					"requireAnyTokens": [],
					"requireNoneTokensCaller": [
						"Season26DuosCashCup_OCE",
						"EpicAccountPrizingRestriction",
						"Season26DuosCashCup_NAC",
						"Season26DuosCashCup_ME",
						"Season26DuosCashCup_ASIA",
						"Season26DuosCashCup_BR"
					],
					"requireAllTokensCaller": [],
					"requireAnyTokensCaller": [],
					"additionalRequirements": [
						"mfa",
						"eula:s26_brcash_rules",
						"currentRanking:ranked-br:6"
					],
					"teammateEligibility": "all",
					"regionMappings": null,
					"metadata": {
						"ServerReplays": true,
						"RoundType": "Qualifiers",
						"liveSpectateAccessToken": "WeeklyTournamentSpectator"
					}
				}
				],
				"beginTime": "2023-09-07T17:00:00.000Z",
				"endTime": "2023-11-02T21:00:00.000Z"
			}],
				"templates": [],
				"scores": [],
				"leaderboardDefs":[{
					"gameId": "Fortnite",
					"leaderboardDefId": "S26DuosCashCupRound1LeaderboardDef",
					"leaderboardStorageId": "Fortnite_GLOBAL",
					"leaderboardInstanceGroupingKeyFormat": "${eventId}",
					"leaderboardInstanceIdFormat": "${windowId}",
					"maxSessionHistorySize": 20,
					"onlyScoreTopN": null,
					"useIndividualScores": false,
					"tiebreakerFormula": {
					"basePointsBits": 11,
					"components": [
					{
						"trackedStat": "VICTORY_ROYALE_STAT",
						"bits": 4,
						"multiplier": null,
						"aggregation": "sum"
					},
					{
						"trackedStat": "TEAM_ELIMS_STAT_INDEX",
						"bits": 12,
						"multiplier": 100,
						"aggregation": "avg"
					},
					{
						"trackedStat": "PLACEMENT_TIEBREAKER_STAT",
						"bits": 14,
						"multiplier": 100,
						"aggregation": "avg"
					},
					{
						"trackedStat": "TIME_ALIVE_STAT",
						"bits": 11,
						"multiplier": null,
						"aggregation": "avg"
					}
					]
					},
					"scoringRuleSetId": "S26DuosCashCupRound1ScoringRules",
					"clampsToZero": true,
					"payoutsConfig": null,
					"bestNTeams": null,
					"hidePlayerScores": false
				}],
				"resolvedWindowLocations": {
					"Fortnite:epicgames_S26_DuosCashCup_EU:S26_DuosCashCup_EU_Event1_Round1": [
					"Fortnite:epicgames_S26_DuosCashCup_EU:S26_DuosCashCup_EU_Event1_Round1"
					]
				}
		})
	})

	app.get('/region', (req, res) => {
		res.json({
			"continent": {
			  "code": "EU",
			  "geoname_id": 6255148,
			  "names": {
				"de": "Europa",
				"en": "Europe",
				"es": "Europa",
				"fr": "Europe",
				"ja": "ヨーロッパ",
				"pt-BR": "Europa",
				"ru": "Европа",
				"zh-CN": "欧洲"
			  }
			},
			"country": {
			  "geoname_id": 2635167,
			  "is_in_european_union": false,
			  "iso_code": "GB",
			  "names": {
				"de": "Vereinigtes Königreich",
				"en": "United Kingdom",
				"es": "Reino Unido",
				"fr": "Royaume Uni",
				"ja": "英国",
				"pt-BR": "Reino Unido",
				"ru": "Британия",
				"zh-CN": "英国"
			  }
			},
			"subdivisions": [
			  {
				"geoname_id": 6269131,
				"iso_code": "ENG",
				"names": {
				  "de": "England",
				  "en": "England",
				  "es": "Inglaterra",
				  "fr": "Angleterre",
				  "ja": "イングランド",
				  "pt-BR": "Inglaterra",
				  "ru": "Англия",
				  "zh-CN": "英格兰"
				}
			  },
			  {
				"geoname_id": 3333193,
				"iso_code": "LDN",
				"names": {
				  "en": "London"
				}
			  }
			]
		})
	})

    //change the 0 to what ever amount of gold you want
	app.get('/fortnite/api/game/v2/br-inventory/account/:accountId', (req, res) => {
		res.json({
			"stash": {
				"globalcash": 69 //a little bit of trolling
			},
		})
	});
}