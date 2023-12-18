const path = require('path');
const errors = require('./../structs/errors');
const {ApiException} = require('./../structs/errors');
const Express = require('express');


Date.prototype.addHours = function (h) {
	this.setTime(this.getTime() + (h * 60 * 60 * 1000));
	return this;
}

Array.prototype.shuffle = function () {
	var a = this;
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}

/**
 * 
 * @param {Express.Application} app 
 * 
 */


module.exports = (app) => {

	function getSeasonInfo(req) {
		const userAgent = req.headers["user-agent"];
		const season = userAgent.split('-')[1];
		const seasonglobal = season.split('.')[0];
		return { season, seasonglobal };
	}

	//lightswitch
	app.get('/lightswitch/api/service/bulk/status', (req, res) => {
		//adds serviceId based on what the game feeds it, if undefined defaults to fortnite
		const serviceId = req.query.serviceId ? req.query.serviceId.toLowerCase() : "fortnite";
		res.json([
			{
				"serviceInstanceId": serviceId,
				"status": "UP",
				"message": "Hi",
				"maintenanceUri": "https://dsc.gg/neonite",
				"allowedActions": [
					"PLAY",
					"DOWNLOAD"
				],
				"banned": false,
				"launcherInfoDTO": {
					"appName": "Fortnite",
					"catalogItemId": "4fe75bbc5a674f4f9b356b5c90567da5",
					"namespace": "fn"
				}
			}
		]);
	});
	


	app.get("/lightswitch/api/service/:serviceId/status", (req, res) => {
		const serviceId = req.params.serviceId.toLowerCase();
		res.json({
			"serviceInstanceId": serviceId,
			"status": "UP",
			"message": "Hello",
			"maintenanceUri": "https://dsc.gg/neonite",
			"allowedActions": [],
			"banned": false,
			"launcherInfoDTO": {
				"appName": "Fortnite",
				"catalogItemId": "4fe75bbc5a674f4f9b356b5c90567da5",
				"namespace": "fn"
			}
		})
	})


	app.get("/launcher/api/public/assets/:platform/:catalogItemId/:appName", (req, res) => {
		res.json({
			"appName": req.params.appName,
			"labelName": `${req.query.label}-${req.params.platform}`,
			"buildVersion": `NEONITE`,
			"catalogItemId": req.params.catalogItemId,
			"expires": "9999-12-31T23:59:59.999Z",
			"items": {
				"MANIFEST": {
					"signature": "NEONITE",
					"distribution": "https://127.0.0.0:5595/Builds/Fortnite/Content/CloudDir/",
					"path": `Neonite.manifest`,
					"additionalDistributions": []
				}
			},
			"assetId": req.params.appName
		})
	})

	app.all('/mesh/Fortnite/*', (req, res) => { 
		res.status(204).end()
	})

	app.get("/launcher/api/public/distributionpoints/", (req, res) => {
			res.json({
				"distributions": [
					"https://epicgames-download1.akamaized.net/Builds/Fortnite/Content/CloudDir/",
					"https://download.epicgames.com/Builds/Fortnite/Content/CloudDir/",
					"https://127.0.0.0:5595/Builds/Fortnite/Content/CloudDir/"
				]
			});
		});

		app.get('/Builds/Fortnite/Content/CloudDir/*.manifest', (req, res) => {
			res.setHeader("content-type", "application/octet-stream")
			res.sendFile(path.join(__dirname, '../LauncherAssets/Neonite.manifest'));
		});
	
		app.get('/Builds/Fortnite/Content/CloudDir/*.ini', (req, res) => {
			res.setHeader("content-type", "application/octet-stream")
			res.sendFile(path.join(__dirname, '../LauncherAssets/Full.ini'));
		});
	
		app.get('/Builds/Fortnite/Content/CloudDir/*.chunk', (req, res) => {
			res.setHeader("content-type", "application/octet-stream")
			res.sendFile(path.join(__dirname, '../LauncherAssets/Neonite.chunk'));
		});



	app.get('/api/v1/assets/Fortnite/:version/', (req, res) => {
		res.json([])
	});

	app.get("/fortnite/api/game/v2/world/info", (req, res) => res.json({}))


	app.all("/api/v1/events/Fortnite/:event/history/:accountId", (req, res) => { 
		res.json([])
	});

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

	app.get("/api/v1/games/fortnite/tracks/query*", (req, res) => {
		res.json([
			{
			  "gameId": "fortnite",
			  "trackguid": "OiK9k9",
			  "rankingType": "ranked-br",
			  "beginTime": "2023-11-02T07:00:18Z",
			  "endTime": "2025-01-01T07:00:17Z",
			  "divisionCount": 18
			},
			{
			  "gameId": "fortnite",
			  "trackguid": "hEKWqj",
			  "rankingType": "ranked-zb",
			  "beginTime": "2023-11-02T07:00:18Z",
			  "endTime": "2025-01-01T07:00:17Z",
			  "divisionCount": 18
			}
		  ])
	})

	app.get("/api/v1/games/fortnite/trackprogress/:accountId", (req, res) => {
		res.json([
			{
			  "gameId": "fortnite",
			  "trackguid": "hEKWqj",
			  "accountId": req.params.accountId,
			  "rankingType": "ranked-zb",
			  "lastUpdated": "1970-01-01T00:00:00Z",
			  "currentDivision": 0,
			  "highestDivision": 0,
			  "promotionProgress": 0,
			  "currentPlayerRanking": null
			},
			{
			  "gameId": "fortnite",
			  "trackguid": "OiK9k9",
			  "accountId": req.params.accountId,
			  "rankingType": "ranked-br",
			  "lastUpdated": "2023-11-05T19:51:28.002Z",
			  "currentDivision": 9,
			  "highestDivision": 18,
			  "promotionProgress": 0.88,
			  "currentPlayerRanking": null
			}
		  ])
	})


	app.get("/catalog/api/shared/bulk/offers", (req, res) => { res.json({}) })


	//version check
	app.get('/fortnite/api/v2/versioncheck*', (req, res) => {
		res.json({ "type": "NO_UPDATE" })
	});

	app.get('/fortnite/api/versioncheck*', (req, res) => {
		res.json({ "type": "NO_UPDATE" })
	});

	//privacy
	app.get('/fortnite/api/game/v2/privacy/account/:accountId', (req, res) => {
		res.json({
			"accountId": req.params.accountId,
			"optOutOfPublicLeaderboards": false
		})
	});

	app.post('/api/v1/assets/Fortnite/:version/:netcl', (req, res) => {
		res.json(require("../discovery/FrontEndAssets.json"))//you can add more to the file but at the moment its only being used for discovery.
	});

	//itemshop
	app.get('/fortnite/api/storefront/v2/catalog',(req, res) => {
		const {season} = getSeasonInfo(req);
		if(season >= 26.30)
			return res.json(require("../responses/shopv2.json"));
		if(season == "Cert" || season == "Live" || season <= 3.5){
			return res.status(404).end();
		}
		else{
			return res.json(require("../responses/shopv1.json"))
		}
	});

	//grant access
	app.post('/fortnite/api/game/v2/grant_access/:accountId', (req, res) => {
		res.status(204).end();
	});

	//enabled features
	app.get('/fortnite/api/game/v2/enabled_features', (req, res) => {
		res.json([])
	});


	//datarouter
	app.post('/datarouter/api/v1/public/*', (req, res) => {
		res.status(204)
	});

	//presence ?
	app.get('/presence/api/v1/_/:accountId/settings/subscriptions', (req, res) => { res.status(204).end(); });


	app.get('/socialban/api/public/v1/:accountId', (req, res) => {
		res.json({
			"bans": [],
        	"warnings": []
		})
	});

	app.get('/eulatracking/api/public/agreements/fn/account/:accountId', (req, res) => {
		res.status(204).end();
	});

	app.get('/fortnite/api/game/v2/creative/*', (req, res) =>
		res.json({
			"results": [],
			"hasMore": false
		})
	)

	//sac
	app.get('/affiliate/api/public/affiliates/slug/:affiliateName', (req, res) => {
		if (req.params.affiliateName != "Neonite") {
			throw new ApiException(errors.com.epicgames.ecommerce.affiliate.not_found).with(req.params.affiliateName);
		}
		res.json({
			id: "aabbccddeeff11223344556677889900",
			slug: req.params.affiliateName,
			displayName: req.params.affiliateName,
			status: "ACTIVE",
			verified: true
		})
	});

	app.get('/content-controls/:accountId', (req, res) => {
			res.json({
			'data': {
				'ageGate': 0,
				'controlsEnabled': false,
				'maxEpicProfilePrivacy': 'none',
				'principalId': req.params.accountId
			}
		})
	});

	// ?
	app.post("/fortnite/api/game/v2/profileToken/verify/*", (req, res) => { res.status(204).end() })

	app.get('/api/v1/namespace/fn/worlds/accessibleTo/:accountID', (req, res) => {
		res.json([
			{
			  "world": {
				"namespaceId": "fn",
				"worldId": "0698808c300847598130d19d9ed15d6d",
				"ownerAccountId": req.params.accountID,
				"version": 0,
				"currentVersion": 0,
				"name": "1",
				"createdAt": "2023-12-04T01:48:27.732497643Z",
				"updatedAt": "2023-12-04T01:48:27.736925445Z",
				"sanction": null,
				"metadataConstraint": "juno_default",
				"metadata": {
				  "mode": "Sandbox",
				  "friendlyCreatures": "On",
				  "hostileCreatures": "Off",
				  "npcs": "On",
				  "dropInventoryOnDeath": "On",
				  "seed": 108257004,
				  "death": "On",
				  "temperature": "Off",
				  "thumbnailTableRowName": "Grassland_01",
				  "staminaDrain": "On",
				  "hunger": "Off"
				},
				"session": {
				  "owningSessionId": null,
				  "sessionKey": null,
				  "currentPlayers": null,
				  "sessionCreatedAt": null,
				  "lastServerHeartbeat": null,
				  "totalSecondsPlayed": 0
				}
			  },
			  "grants": [],
			  "session": null
			},
			{
			  "world": {
				"namespaceId": "fn",
				"worldId": "d5c7520e2b534046b739cee2a25c4022",
				"ownerAccountId": req.params.accountID,
				"version": 0,
				"currentVersion": 0,
				"name": "4",
				"createdAt": "2023-12-05T15:15:43.856079102Z",
				"updatedAt": "2023-12-05T15:15:43.865613446Z",
				"sanction": null,
				"metadataConstraint": "juno_default",
				"metadata": {
				  "mode": "Survival",
				  "friendlyCreatures": "On",
				  "hostileCreatures": "On",
				  "npcs": "On",
				  "dropInventoryOnDeath": "On",
				  "seed": 277512771,
				  "death": "On",
				  "temperature": "On",
				  "thumbnailTableRowName": "Grassland_01",
				  "staminaDrain": "On",
				  "hunger": "On"
				},
				"session": {
				  "owningSessionId": null,
				  "sessionKey": null,
				  "currentPlayers": null,
				  "sessionCreatedAt": null,
				  "lastServerHeartbeat": null,
				  "totalSecondsPlayed": 0
				}
			  },
			  "grants": [],
			  "session": null
			},
			{
			  "world": {
				"namespaceId": "fn",
				"worldId": "1a668a920c5e49d0b44c84630bd087e9",
				"ownerAccountId": req.params.accountID,
				"version": 0,
				"currentVersion": 0,
				"name": "2",
				"createdAt": "2023-12-04T01:52:53.65963271Z",
				"updatedAt": "2023-12-04T01:52:53.683499442Z",
				"sanction": null,
				"metadataConstraint": "juno_default",
				"metadata": {
				  "mode": "Sandbox",
				  "friendlyCreatures": "On",
				  "hostileCreatures": "Off",
				  "npcs": "On",
				  "dropInventoryOnDeath": "On",
				  "seed": 1,
				  "death": "On",
				  "temperature": "Off",
				  "thumbnailTableRowName": "Grassland_01",
				  "staminaDrain": "On",
				  "hunger": "Off"
				},
				"session": {
				  "owningSessionId": null,
				  "sessionKey": null,
				  "currentPlayers": null,
				  "sessionCreatedAt": null,
				  "lastServerHeartbeat": null,
				  "totalSecondsPlayed": 0
				}
			  },
			  "grants": [],
			  "session": null
			},
			{
			  "world": {
				"namespaceId": "fn",
				"worldId": "fa3ebd2fa353496fa8dc790b2511e584",
				"ownerAccountId": req.params.accountID,
				"version": 0,
				"currentVersion": 0,
				"name": "3",
				"createdAt": "2023-12-04T02:02:35.064338267Z",
				"updatedAt": "2023-12-04T02:02:35.074813555Z",
				"sanction": null,
				"metadataConstraint": "juno_default",
				"metadata": {
				  "mode": "Survival",
				  "friendlyCreatures": "On",
				  "hostileCreatures": "On",
				  "npcs": "On",
				  "dropInventoryOnDeath": "On",
				  "seed": 471759095,
				  "death": "On",
				  "temperature": "On",
				  "thumbnailTableRowName": "Grassland_01",
				  "staminaDrain": "On",
				  "hunger": "On"
				},
				"session": {
				  "owningSessionId": null,
				  "sessionKey": null,
				  "currentPlayers": null,
				  "sessionCreatedAt": null,
				  "lastServerHeartbeat": null,
				  "totalSecondsPlayed": 0
				}
			  },
			  "grants": [],
			  "session": null
			}
		  ])
	})

	app.post('/api/v1/namespace/fn/worlds/account/:accountId', (req, res) => {
		res.json({
			"namespaceId": "fn",
			"worldId": "d5c7520e2b534046b739cee2a25c4022",
			"ownerAccountId": req.params.accountID,
			"version": 0,
			"currentVersion": 0,
			"name": "4",
			"createdAt": "2023-12-05T15:15:43.856079102Z",
			"updatedAt": "2023-12-05T15:15:43.865613446Z",
			"sanction": null,
			"metadataConstraint": "juno_default",
			"metadata": {
			  "seed": 277512771,
			  "mode": "Survival",
			  "hostileCreatures": "On",
			  "friendlyCreatures": "On",
			  "dropInventoryOnDeath": "On",
			  "hunger": "On",
			  "staminaDrain": "On",
			  "npcs": "On",
			  "thumbnailTableRowName": "Grassland_01",
			  "temperature": "On",
			  "death": "On"
			},
			"session": {
			  "owningSessionId": null,
			  "sessionKey": null,
			  "currentPlayers": null,
			  "sessionCreatedAt": null,
			  "lastServerHeartbeat": null,
			  "totalSecondsPlayed": 0
			}
		  })
		});

		app.get('/api/v1/namespace/fn/worlds/world/:worldID/session', (req, res) => {
			return res.status(404).json(
				{
					"messageVars": [
					  req.params.worldID,
					  "fn"
					],
					"errorMessage": `could not find a session record for world ID ${req.params.worldID} in namespace 'fn'`,
					"errorCode": "errors.com.epicgames.dbs.wasp.world_session_not_found",
					"correlationId": "FN-tauaxoS2kUuaxi4CxfGF5w",
					"numericErrorCode": 1004,
					"responseStatus": 404,
					"intent": "live",
					"originatingService": "wasp-service"
				  }
			)
		});

		app.get('/api/v1/namespace/fn/worlds/world/:worldId/attest/:accountId', (req, res) => {
			res.set("Content-Type", "application/jwt;charset=utf-8")
			return res.send("wasp~eyJraWQiOiJhdHRlc3QxIiwidHlwIjoiSldUIiwiYWxnIjoiRWREU0EifQ.eyJhY2NvdW50SWQiOiJlN2MzODg2NjRlNTQ0MmU4OWYzMGIzOTZkOWZhNzE4MyIsIm5hbWVzcGFjZUlkIjoiZm4iLCJ3b3JsZElkIjoiZDVjNzUyMGUyYjUzNDA0NmI3MzljZWUyYTI1YzQwMjIiLCJpc3MiOiJlcGljZ2FtZXMiLCJleHAiOjE3MDE3OTAyMDAsImlhdCI6MTcwMTc4OTkwMH0.ckpiVt4WaUesyICZEJ4A-k51ZxWIlvMdgbRHV5o6xp3m7hAuVt4_Tthcbf5BV0_Y9RCH4iBgv4q1bmQ4eyFyBA")
		})
	

	app.get('/fortnite/api/storefront/v2/keychain',(req, res) => {
		const {season} = getSeasonInfo(req);
		const keychain = require("../responses/keychain.json")

		const EventKeychainManager = {
			"Marshmello Concert":[
				"A9AFB4A346420DB1399A2FB2065528F5:Zjzo+CaLNmCygplzQo2wUL4LT33DEiL6qZWE2R0EYMg="
			],
			"Monster Vs Robot":[
				"79F7D9C856E8CF354109D3298F076C06:Ak3TOM0i0Mq/KYxd7SDlSuS7o55USaf+urL6WqnmalY="
			],
			"The End Event Season 10":[
				"8C623F6A49CFF9ADC7895A466CA1C896:kLmYdLi+jOBs2k+B/UxrCcPSdvuNYTha0xl9+SvUzJU="
			],
			"StarWars Event":[
				"0C2DFF3432352A23684E05B0794DFFC7:FG55cmgdBnszsr5pS0aBC44NVl7OyI+AuOXxALyaNKA=",
				"37B3D2284CB3924E6592C2D1D11451E4:CMJclyQ1I9iY+VkDiajhGxxYQmZGHrTAlEl/wtlT+pk=",
				"F71D60AE5231E90CEA7F53D90DC4F007:ver8B06IS0up7tNYy03zkhCl+CrTl3czgmXPYYONcM8=",
				"FBAC0AD8C03AAB2DC3BC077597517179:5oj8B4R53plPxRictMN6QkQ741CibMbmzRJYIDIQ5iM="
			],
			"Travis Scott":[
				"8734362B2A2A8B0FBC9EDE6160627E1D:8ZsoLeTeezxjoIxnNfUrNf61XfqMEKfnyTb3u4o/X6g=",
			],
			"Doomsday device event":[
				"F51C8301B1C9BE9D4C4F48ED2C0FE067:+MsgNTH4cF1Mr4mjNVZVgsf3GBgjSjYn2yRZn2fE70A=",
			],
			"Devour of Worlds Event":[
				"C60475E046D0F0FBCFE6DE6F9E040E0E:Wc6IzWuqnm7EHqcSx14i6KwXwl4+PmQq180ESMdR+08=",
			],
			"Rift Tour":[
				"6A2047910081947B9A5DCF542A9AEBE5:V/jMTWL+zbqeIlKCE9+SM3+X69aYbt/cN0+G1D0GBQU=",
				"71C3BFE2AF0BC8DE7BC3735614CE6263:hNLsvUTUw0cw1WrfOEjm7oSGPfpEZer6R0G7F2El6Q0=",
				"7F5ACEFE3F67BC0CCEB59A4E8EB82BAF:iDG2HB2LypEtzw5/EjKVpJmQ1o30BE3nVv01rOTyq64=",
				"8D578CF915DB851F9BE73C937D3565E4:Xk8kUK9cut4tXr0VQjufZdoepp+TzGmlDA7fzYA1rAc=",
				"BE20AAF89FE897368E52AAA193DEEB53:jHRZho9v4IKzFzk51RD0nAVFCZ27vIwcstPkdQeSupc=",
			],
			"SkyFire":[
				"BE20AAF89FE897368E52AAA193DEEB53:jHRZho9v4IKzFzk51RD0nAVFCZ27vIwcstPkdQeSupc=:SkyFire_Playlist",
				"955C5EA2C28764221AF554097C5CE9E6:jzkT7NbAZpMlRIC/qnSOUAcAz6CXh00ZF3EK+GfWbGQ=:SkyFire_Event",
			],
			"Chapter 2 Finale":[
				"B3A4B83DA3274522D4B9F117DCF9A0B3:y5n7vfr0uucr+psZzb2F3g45pWUsv3i3j/M6bl78Z9A=",
				"9972857939D69D9799D6800D0D70ACE4:J5NKMyEoVZ2zBlCiTGN65eKAAHStaOO+bVGbJfsFI/k="
			],
			"Collision Event":[
				"1398A4C2E6C3954EDDC49F85C5AB251B:qF0+04jSaU0kgws/RigbWpwnyPQMDnK+4Vf4G0tmTns=:Collision_Playlist",
				"1301F2838EB647C3D111CC1A61C7D8C3:OuEyyvjyHEYgHt7u8KA2UvKxsCBLlwmwq01D/ErBAWc=:Collision_Event"
			],
			"Fracture Event":[
				"C624A3D18A8A2494288EE915D11518B7:/q+bDo9akBx2JId6QvLQW1YoN4jBEEn+QdzBXjB3OpQ=",
				"F00E08CB606091AEFAB37D9B0A01B833:uEmoAK5xdbd8KefVf9o7uJiGcGTYk2r9QevsGe4vBII=",
			],
			"The Big Bang LTM":[
				"020BFB18192345A6CF1AB75A66D879DD:T9UgbPCAqJBtxypUfcH/MqLBL5D8dc2rh8H6/La3FDk=",
				"0C81D16F6CF41C862D0B097DBE5E624A:qIzymfmYIWAQbAhalU2MQOR6vwmj42xHgtW41rhIev4=",
				"11A2A4F6D2D907D8718A91CB05AF99F0:psD4DdrmKRTtrbaAkoDjTtrC0zZAclPsWm93aw/e6hA=",
				"23DEA89BDC537501407CE442F9D7488B:MBhNDIgF/lTCfsqwj8VvjD1WBYdv1MvrwT+k8MCyDzg=",
				"2830AEF5C09E976B74EE1E194E3B988B:UduuLiZnBhH43ymHQqejG91JFUIoYCydpUpQ6SWBWgY=",
				"40B325F1EBCD65F9B8AA3E5F27EAA4FE:NSejpmJhzFwD65Zzt6habPR6vlesovU2DlEo5lyVM8M=",
				"605624BEED560EAFCF45CAD7E2FB4E48:kfYhFrpDNLuCuE016d+F3Oh0NAcQl+TJbb/TFRfEjy4=",
				"704725A33203935E6E576D64D44905D4:tKWz7Ob1wPsOnzQzOqdJ7Cd5e9P+VVXJL7DIdww6VrM=",
				"737D758CBCCFF589BCDA9236930EDA52:KToMoMliD/DoJnxL11MpgqgCsHHUJFhJxj8nkixIKiw=",
				"7DD96358E6FCB34A5221D2E77087D23D:1H4kxS6zepB460v5K2/w2lyuCdj4Qsni15F1qSSPVdQ=",
				"875A2044382363BB04B7E1B02DB7F905:2YtCtIxaCocZA54jyloILrq30zwBJx3UTRVykYiVy3k=",
				"8B57E50789D21E269BDBE46184F88FA0:G4bUrNa7X6RXd3/vvJyRLQr7dhSiPo2+yuKrp24RXN0=",
				"8BCF8182A37A4EE321F5078954A75122:wLfDsgM7jhjuvKHr3zFxWs4pDn12nRiG4RVQfuNSTuM=",
				"8E48CAF3A86554ADE0DD49326AD1F26B:UGuqIW16b+CxBHFpGPedPqsFisX3KygBTq84QFi4ZEE=",
				"8F7AAC929AED8C9231EA30CEC0A2A75D:1HeufgQ+oYCTosTR/ILGHFnypvS+udjy1Tsyffya+qs=",
				"98742D3B15A7227BA2A55CBD8C3A56A1:Kvq/pUKqQb1OGD76rGoOd0odcSmRtej5KvG4r+ofOHY=",
				"BA2A14985A7E28544995069FC9359C81:lIJvTL75n/NrsjEe4Nd+L4UQCiPcYvHaDbc5q7xJVbM=",
				"BF54C54672DEFBD71B744A72053E4168:TL25+NVV64p19Xu6A7+VVMfNwEseRZiEZ8J0QBfIkWs=",
				"C4982170B633DB6D2FE340A488EE425B:1XxlJtR4sc6vP0MpkwKrwCrHHTAi+GP2Pu5Az7yftcs=",
				"C4CF3F4B73862D7CA4AD87ADEB4D073F:hPF2H1xHMyX4NRGMyy7tSpS1yf2NHs1vStN/Wq7T6aA=",
				"CD9A2158EBA8DEC4F51A16F0F19D0F06:HKidNu7ZYT9Gsckip7xIrqxKC4lIeQ0kLGkljdqj1kE=",
				"CED82F0AF09F2650E043A0B9CFD1BE98:ZHNIVGxs07Yus1Jm6EhAiZmpUsil0HusHS2HH0vvo+8=",
				"DAAD9ACDD8C3690CE4D11DA2D7663DFB:OL1/ndG9SEBobBCmm/+Aqy67S8A6sebpFV4we3HFjoI=",
				"E0C536FDC9A4B19843DCFD22638CE81A:cirXcwpB+vzrBT5pKkrJYbdGrWRBkCg+UJ+x20yU1J0=",
				"EE02264B5DA4FA57A4C708F9DD615A87:DjEzloaeCgNBk0f3zT6m7+6TNrxu7EAolqvbsNykcuw=",
				"EE1B544782238B556744A68B8AB52CD7:PGQPn8LVr8FLUROgBSOsmYcFi/BmNVWoBQ+kAl3uuIw=",
				"EEEAD34DAD77926A1A7B3772FED7F0CC:jylPxC+85DXLiAlYK9bpdxMRP/kmq4Exqplkc4u27EE=",
				"F0B824739EC4211794DDC5EF2BCAFC9B:LXBvnxBXfdFlqcr8jBqbnblCnh3kvedCvkfJjIi/lEI=",
				"FBB56B6E711D7FC3CA29B46F712AA3A5:wtIigakPrMzOC6ZZ4Am7gJa+CNEhe7DPAr1ZOE/WZZ8=",
				"FD61445874602D111434BFC323F72EED:fa0mRPNJPo9IM2JDITSlqseFIFccVhbjA/s7FxL+D/0=",
				"FE4831E9E7D7012FEE138782AFA1109A:VoS2hBjPp+T+uFx1EfTAuvB6gjlEd2eA8yoh53VsjAA=",
				"FEE2FF88D47ACD4788C23A72025AE3CB:cUGhkqZYUbnXJ4uNhMKeuDMmpzO/QqyQJXIW7d1X4mU=",
				"52366B48F1048E512A4ADB69B1830522:4/yBC527LoHOBvjPVZZOG3vqIFRZMYJKlKuD1OgYK9Q=",
				"9E380D6486FDC2BD798C4AC03EA99956:IG7ZP06IgAnipEmMYxb7jdt7HuXHo5u8zUpomvJYgjM=",
			],
		}
		if (season == "7.30") {
			EventKeychainManager['Marshmello Concert'].forEach(item => {
			  keychain.push(item);
			});
		}
		if (season == "9.40" || season == "9.41"){
			EventKeychainManager['Monster Vs Robot'].forEach(item => {
				keychain.push(item);
			});
		}
		if(season == "10.40"){
			EventKeychainManager['The End Event Season 10'].forEach(item => {
				keychain.push(item);
			});
		}
		if(season == "11.30" || season == "11.31"){
			EventKeychainManager['StarWars Event'].forEach(item => {
				keychain.push(item);
			});
		}
		if(season == "12.41"){
			EventKeychainManager['Travis Scott'].forEach(item => {
				keychain.push(item);
			})
		}
		if(season == "12.61"){
			EventKeychainManager['Doomsday device event'].forEach(item => {
				keychain.push(item);
			})
		}
		if(season == "14.60"){
			EventKeychainManager['Devour of Worlds Event'].forEach(item => {
				keychain.push(item);
			})
		}
		if(season == "17.30"){
			EventKeychainManager['Rift Tour'].forEach(item => {
				keychain.push(item);
			})
		}
		if(season == "17.50"){
			EventKeychainManager['SkyFire'].forEach(item => {
				keychain.push(item);
			})
		}
		if(season == "18.40"){
			EventKeychainManager['Chapter 2 Finale'].forEach(item => {
				keychain.push(item);
			})
		}
		if(season == "20.40"){
			EventKeychainManager['Collision Event'].forEach(item => {
				keychain.push(item);
			})
		}
		if(season == "22.40"){
			EventKeychainManager['Fracture Event'].forEach(item => {
				keychain.push(item);
			})
		}
		else if(season == "27.11"){
			EventKeychainManager['The Big Bang LTM'].forEach(item => {
			  keychain.push(item);
			});
		}
		res.json(keychain)
	})
};
