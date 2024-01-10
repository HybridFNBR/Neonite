const path = require('path');
const errors = require('./../structs/errors');
const {ApiException} = require('./../structs/errors');
const Express = require('express');
const { default: axios } = require("axios");
const fs = require("fs");
const expressWs = require('express-ws');
const jsonwebtoken = require('jsonwebtoken');


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
	expressWs(app);
	function getSeasonInfo(req) {
		const userAgent = req.headers["user-agent"];
		const season = userAgent.split('-')[1];
		const seasonglobal = season.split('.')[0];
		return { season, seasonglobal };
	}

	//matchmaking xmpp
	
	app.ws('*', (ws, req) => {
		ws.send(JSON.stringify({
			"payload": {
			  "state": "Connecting"
			},
			"name": "StatusUpdate"
		  }));
		new Promise(resolve => setTimeout(resolve, 2000));
		ws.send(JSON.stringify({
			"payload": {
				"totalPlayers": 1,
				"connectedPlayers": 1,
				"state": "Waiting"
			},
			"name": "StatusUpdate"
		}))
		ws.send(JSON.stringify({
			payload: {
				ticketId: "NEONITE",
				queuedPlayers: 1,
				estimatedWaitSec: 1,
				status: {},
				state: "Queued",
				},
				name: "StatusUpdate",
			})
		);
		let matchmakingtoken = jsonwebtoken.sign({
			"joinDelaySec":4,
			"iss":"mms",
			"sessionId":"NEONITE",
			"exp":9668532724,
			"env":"prod",
			"iat":1668529124,
			"matchId":"NEONITE",
			"jti":"j1GaITnR4Op4JD6l1lbH9dfbyntYLIYn",
			"playerId":"198b3f9aa494490a83e8d541622235b0"
		}, "RS256")
		ws.send(JSON.stringify({
			"payload": {
				"matchId": "NEONITE",
				"sessionId": "NEONITE",
				"playerId": "198b3f9aa494490a83e8d541622235b0",
				"joinDelaySec": 4
			},
			"payloadJwt": matchmakingtoken,
			"name": "Play"
		}))
	})

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

	app.get('/ias/fortnite/*', (req, res) => {
		res.status(404);
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
					"distribution": "http://localhost:5595/",
					"path": `Builds/Fortnite/Content/CloudDir/Neonite.manifest`,
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
				"distributions" : [ 
					"http://localhost:5595/",
					"https://download.epicgames.com/",
					"https://epicgames-download1.akamaized.net/", 
					"https://fastly-download.epicgames.com/", 
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



	app.get("/fortnite/api/game/v2/world/info", (req, res) => res.json({}))


	app.all("/api/v1/events/Fortnite/:event/history/:accountId", (req, res) => { 
		res.json([])
	});

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

	app.get('/fortnite/api/version', (req, res) => {
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
		if(season == "Cert" || season == "Live" || season <= 3.5 || season == "2870186+++Fortnite+Release"){
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
		res.status(204).end();
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

		app.get('/account/api/accounts/:accountId/metadata', (req, res) => {
			res.json({
				"FGOnboarded": "true"
			  })
		})

		app.get('/account/api/epicdomains/ssodomains', (req, res) => {
			res.json([
				"fortnite.com",
				"epicgames.com"
			])
		})

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
		res.json(["46159C748694298198A52DC07476FDA3:4CLHOBqSrmS1RkG/SxZYi8Rc0zCmAKxXIBMMUHDl2ag="])
	})

	app.post('/region/check',(req, res) => {
		res.json({
			"content_id": "AF9yLAAsklQALFTy",
			"allowed": true,
			"resolved": true,
			"limit": "Res=656"
		})
		//https://github.com/LeleDerGrasshalmi/FortniteEndpointsDocumentation/blob/ec6b267bca542a2b8804084622721a4bd8ae7c7f/EpicGames/IPDataService/RegionCheck.md
	})
	
	app.put('/profile/play_region', (req, res) => {
		res.status(204).end();
	})

	app.get('/api/v2/interactions/latest/Fortnite/:accoundId', (req, res) => {
		res.json({"latestInteractions":[]})
	})

	app.get('/app_installation/status', (req, res) => {
		res.json({"accountId":"","isInstalled":false})
	})

	app.get('/api/content/v2/launch-data', (req, res) => {
		res.status(204).end();
	})
};
