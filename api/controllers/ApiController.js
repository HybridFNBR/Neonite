const path = require('path');
const { default: axios } = require("axios");
var fs = require('fs')

function getSeasonInfo(req) {
  const userAgent = req.headers["user-agent"];
  const season = userAgent.split('-')[1];
  const seasonglobal = season.split('.')[0];
  return { season, seasonglobal };
}

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

module.exports = {

	distributionpoints: function (req, res) {
		res.json({
		"distributions": [
			"http://localhost:5595/",
			"https://download.epicgames.com/",
			"https://epicgames-download1.akamaized.net/",
			"https://fastly-download.epicgames.com/"
		]
		});
	},

	launcherAssets: function(req, res) {
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
		});
	},
	
	manifest: function(req, res) {
		const filePath = path.join('LauncherAssets/Neonite.manifest');
		res.setHeader("content-type", "application/octet-stream")
		const fileStream = require('fs').createReadStream(filePath);
		fileStream.pipe(res);
	},

	ini: function (req, res) {
		const filePath = path.join('LauncherAssets/Full.ini');
		res.setHeader("content-type", "application/octet-stream")
		const fileStream = require('fs').createReadStream(filePath);
		fileStream.pipe(res);
	},

	chunk: function (req, res) {
		const filePath = path.join('LauncherAssets/Full.ini');
		res.setHeader("content-type", "application/octet-stream")
		const fileStream = require('fs').createReadStream(filePath);
		fileStream.pipe(res);
	},

	/*ias: function (req, res) {
		res.setHeader("content-type", "application/octet-stream")
		if (!fs.existsSync("ias")) {
				fs.mkdirSync("ias");
		}
		axios.get(`https://download.epicgames.com${req.originalUrl}`)
		.then(response => {
			fs.writeFile(`ias/${req.params.Hash}`, response.data, err => {
				if (err) {}
				else{
					res.sendFile(path.join(__dirname, `../../ias/${req.params.Hash}`));
				}
			})
		})
		
		
	},*/

	/*iasChunks: function(req, res){
		if (!fs.existsSync("ias/cosmeticStreaming")) {
			fs.mkdirSync("ias/cosmeticStreaming");
		}
		try{
			axios.get(`https://download.epicgames.com${req.originalUrl}`)
			.then(response => {
				fs.writeFile(`ias/cosmeticStreaming/${req.params.chunkFile}`, response.data, err => {
					if (err) {
					} else {
						const filePath = path.join(`ias/cosmeticStreaming/${req.params.chunkFile}`);
						res.setHeader("content-type", "application/octet-stream")
						const fileStream = require('fs').createReadStream(filePath);
						fileStream.pipe(res);					}
				})
			})
		}
		catch{}
	},*/

	lightSwitchbulk: function(req, res){
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
		},
		
		lightswitch: function(req, res){
			console.log("requested lightswitch")
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
		},

	eventHistory: function(req, res){
		res.json([])
	}, 

	habaneroTracks: function(req, res){
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
	},

	habaneroProgress: function(req, res){
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
	},

	versionCheck: function(req, res){
		res.json({ "type": "NO_UPDATE" })
	},

	privacy: function(req, res){
		res.json({
				"accountId": req.params.accountId,
				"optOutOfPublicLeaderboards": false
			})
	},

	FrontendAssets: function(req, res){
		res.json(require("../../discovery/FrontEndAssets.json"))
	},

	catalog: function(req, res){
		const {season} = getSeasonInfo(req);
			if(season >= 26.30)
				return res.json(require("../../responses/shopv2.json"));
			if(season == "Cert" || season == "Live" || season <= 3.5 || season == "2870186+++Fortnite+Release"){
				return res.status(404).end();
			}
			else{
				return res.json(require("../../responses/shopv1.json"))
			}
	},

	catalogBulk: function(req, res){
		res.json({})
	},

	grantAccess: function(req, res){
		res.status(204).end()
	},

	enabledFeatures: function(req, res){
		res.json([])
	},

	dataRouter: function(req, res){
		res.status(204).end();
	},

	presence: function(req, res){
		res.status(204).end()
	},

	socialban: function(req, res){
		res.json({
			"bans": [],
			"warnings": []
		})
	},

	eula: function(req, res){
		res.status(204).end()
	},

	creative: function(req, res){
		res.json({
				"results": [],
				"hasMore": false
			})
	},

	sac: function(req, res){
		res.json({
				id: "aabbccddeeff11223344556677889900",
				slug: req.params.affiliateName,
				displayName: req.params.affiliateName,
				status: "ACTIVE",
				verified: true
			})
	},

	contentControls: function(req, res){
		res.json({
				'data': {
					'ageGate': 0,
					'controlsEnabled': false,
					'maxEpicProfilePrivacy': 'none',
					'principalId': req.params.accountId
				}
		})
	},

	contentControlsRules: function(req, res){
		res.status(204).end();
	},

	interactionsAggregated: function(req, res){
		res.status(204).end();
	},

	profileToken: function(req, res){
		res.status(204).end()
	},

	fetchLegoWorlds: function(req, res){
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
	},

	makeLegoWorlds: function(req, res){
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
	},

	worldInfo: function(req, res){
		const {season, seasonglobal} = getSeasonInfo(req);
		if(season >= 11.00 || seasonglobal >= 11){
			res.status(404)
		}
		else{
			res.json({})
		}
	},

	legoWorldSession: function(req, res){
		res.status(404).json(
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
	},

	legoMatchMakingToken: function(req, res){
		res.set("Content-Type", "application/jwt;charset=utf-8")
		res.send("wasp~eyJraWQiOiJhdHRlc3QxIiwidHlwIjoiSldUIiwiYWxnIjoiRWREU0EifQ.eyJhY2NvdW50SWQiOiJlN2MzODg2NjRlNTQ0MmU4OWYzMGIzOTZkOWZhNzE4MyIsIm5hbWVzcGFjZUlkIjoiZm4iLCJ3b3JsZElkIjoiZDVjNzUyMGUyYjUzNDA0NmI3MzljZWUyYTI1YzQwMjIiLCJpc3MiOiJlcGljZ2FtZXMiLCJleHAiOjE3MDE3OTAyMDAsImlhdCI6MTcwMTc4OTkwMH0.ckpiVt4WaUesyICZEJ4A-k51ZxWIlvMdgbRHV5o6xp3m7hAuVt4_Tthcbf5BV0_Y9RCH4iBgv4q1bmQ4eyFyBA")
	},

	salesEvent: function(req, res){
		return res.status(204).end()
	},

	gameRating: function(req, res){
		return res.status(204).end()
	},


	keychain: function(req, res){
		res.json(["46159C748694298198A52DC07476FDA3:4CLHOBqSrmS1RkG/SxZYi8Rc0zCmAKxXIBMMUHDl2ag="])
	},

	regionCheck: function(req, res){
		res.json({
				"content_id": "AF9yLAAsklQALFTy",
				"allowed": true,
				"resolved": true,
				"limit": "Res=656"
			})
			//https://github.com/LeleDerGrasshalmi/FortniteEndpointsDocumentation/blob/ec6b267bca542a2b8804084622721a4bd8ae7c7f/EpicGames/IPDataService/RegionCheck.md
		},

	playRegion: function(req, res){
		res.status(204).end()
		},

	storeAccess: function(req, res){
		res.status(204).end()
		}



};