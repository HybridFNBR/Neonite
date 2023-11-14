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
		if(season == "Cert" || season == "Live"){
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
		/*try{
			const jsonKey = Object.keys(req.body)[0];
			const jsonString = JSON.stringify(jsonKey, null, 2);
			const jsonData = JSON.parse(jsonString);
			const regex = /SessionStart/
			if (regex.test(jsonData)) {
				NeoLog.Debug("Reverting Frontend back to defaults")
				filePath = 'hotfixes/DefaultGameUserSettings.ini'
				const contentToWrite = ""
				fs.writeFile(filePath, contentToWrite, 'utf8', (err) => {
					if (err) {console.error('Error writing file:', err);} 
				});
			}
			season = req.headers["user-agent"].split('-')[1]
			if (season == "10.40") {
				if (req.body["Events"][1]["GameState"] == "Athena_GameState_C") {
					if(req.body["Events"][2]["PlaylistName"] == "Playlist_Music_Highest"){ //only do it for the end event
						NeoLog.Debug("Changing Frontend to the blackhole")
						filePath = 'hotfixes/DefaultGameUserSettings.ini'
						const contentToWrite = "[/Script/FortniteGame.FortGameUserSettings]\nUserPreferredFrontend=NoBernieNo";
						fs.writeFile(filePath, contentToWrite, 'utf8', (err) => {
						if (err) {console.error('Error writing file:', err);}
						});			
					}
				}
			}
			else{res.status(204)}
		}
		catch{}*/
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

	//keychain
	app.get('/fortnite/api/storefront/v2/keychain', (req, res) => {
		res.json(require("../responses/keychain.json")).status(200).end();
	})
};
