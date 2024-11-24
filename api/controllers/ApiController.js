const path = require('path');
const { default: axios } = require("axios");
var fs = require('fs')
const jsonwebtoken = require('jsonwebtoken');
var ini = require('ini')
const { getVersionInfo, loadJSON, VersionFilter} = require("../../config/defs")
var config = ini.parse(fs.readFileSync(path.join(__dirname, '../../config.ini'), 'utf-8'));



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
		})
	},
	
	manifest: function(req, res) {
		res.setHeader("content-type", "application/octet-stream")
		res.sendFile(path.join(__dirname, '../../LauncherAssets/Neonite.manifest'));
	},

	ini: function (req, res) {
		res.setHeader("content-type", "application/octet-stream")
		res.sendFile(path.join(__dirname, '../../LauncherAssets/Full.ini'));
	},

	ChunksV4: async function(req, res){
		const response = await axios.get(`https://epicgames-download1.akamaized.net${req.originalUrl}`, {
            responseType: 'stream' 
        });
        res.set({
            'Content-Type': "application/octet-stream"
        });
        response.data.pipe(res);
	},

	ias: async function (req, res) {
		res.status(200)
	},

	iasChunks: async function(req, res){
		const response = await axios.get(`https://epicgames-download1.akamaized.net${req.originalUrl}`, {
			responseType: 'stream' 
		});
		res.set({
            'Content-Type': "application/octet-stream"
        });
       response.data.pipe(res);
	},

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
		res.status(204)
	},

	habaneroProgress: function(req, res){
		res.status(204)
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
		const {version} = getVersionInfo(req);
		const FrontendAssets =  loadJSON('../responses/FortniteAssets.json');
		const FortniteGameConfig = loadJSON('../FortniteGameConfig.json');
		if (config.FortniteGameConfig == true && version >= 24.00) {
			FrontendAssets.FortPlaylistAthena = {
				"meta": {
					"promotion": 9
				},
				"assets": {
					[FortniteGameConfig.playlist_config]: {
						"meta": {
							"revision": 2,
							"headRevision": 2,
							"revisedAt": "2023-11-27T06:41:57.818Z",
							"promotion": 3,
							"promotedAt": "2023-11-27T06:43:00.452Z"
						},
						"assetData": FortniteGameConfig.playlist_settings
					}
				}
			};
			
		}
		res.json(FrontendAssets)
	},

	catalog: function(req, res){
		const {version} = getVersionInfo(req);
		if(version >= 30.10){
			return res.json(loadJSON("../responses/catalog/shopv3.json"));
		}
		else if(version >= 26.30){
			return res.json(loadJSON("../responses/catalog/shopv2.json"));
		}
		else if (VersionFilter.includes(version) || version <= 3.5) {
			return res.status(404).end();
		}
		else{
			return res.json(loadJSON("../responses/catalog/shopv1.json"))
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

	verifyPin: function(req, res){
		res.json({
			"data":{
				"pinCorrect":true
			}
		})
	},

	interactionsAggregated: function(req, res){
		res.status(204).end();
	},

	profileToken: function(req, res){
		res.status(204)
	},

	fetchLegoWorlds: function(req, res){
		res.json([
				{
				"world": {
					"namespaceId": "fn",
					"worldId": "0698808c300847598130d19d9ed15d6d",
					"ownerAccountId": req.params.accountId,
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
					"ownerAccountId": req.params.accountId,
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
				"ownerAccountId": req.params.accountId,
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
		const {version, versionGlobal} = getVersionInfo(req);
		if(version >= 11.00 || versionGlobal >= 11){
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
		let waspToken = jsonwebtoken.sign({
			"namespaceId": "fn",
			"worldId": req.params.worldId,
			"iss": "epicgames",
			"exp": 1701790200,
			"iat": 1701789900
		  }, "ES256");
		res.set("Content-Type", "application/jwt;charset=utf-8")
		res.send(`wasp~${waspToken}`)
	},

	salesEvent: function(req, res){
		return res.status(404).end()
	},

	gameRating: function(req, res){
		return res.status(404).end()
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

	token: function(req, res){
		res.json({
			"response": "ZnVuY3Rpb24gTVdWdmY1KCl7fXZhciBrVlFQWG89T2JqZWN0WydceDY0XHg2NVx4NjZceDY5XHg2ZVx4NjVceDUwXHg3Mlx4NmZceDcwXHg2NVx4NzJceDc0XHg3OSddLF93Zm1JeDgsdkFrM3U4dixqSWV3Zml2LHdEMmt3RkUsc2haNndkSyxtbUo4QXZiLFhwQUNRZix5S1JDNVFDLFZ0OFRZbnEsVUZGVUlaLF9kQTJBcixNcW1fdTMsRk1mMVFBLFM1RWZPSixvRWNRRHIsaFVDOFJxbixXWnpLeXJCLGt2eGxfVSxRaXZjWnI7ZnVuY3Rpb24gYWZUUXJyKE1XVnZmNSl7cmV0dXJuIF93Zm1JeDhbTVdWdmY1PjB4NTQ/TVdWdmY1PjB4MTAwP01XVnZmNSsweDVjOk1XVnZmNT4weDEwMD9NV1Z2ZjUrMHg0MjpNV1Z2ZjUtMHg1NTpNV1Z2ZjUrMHgxY119X3dmbUl4OD1Lb21TV0YoKTtmdW5jdGlvbiBIRUVkMEM2KE1XVnZmNSxrVlFQWG8pe3JldHVybiB2QWszdTh2LmNhbGwobnVsbCxNV1Z2ZjUsJ1x1MDA2Y1x1MDA2NVx1MDA2ZVx1MDA2N1x1MDA3NFx1MDA2OCcse3ZhbHVlOmtWUVBYbyxjb25maWd1cmFibGU6ITB4MH0pfU1XVnZmNSh2QWszdTh2PU9iamVjdC5kZWZpbmVQcm9wZXJ0eSxqSWV3Zml2PUhFRWQwQzYoUldPdFFtNigoLi4ua1ZRUFhvKT0+e3ZhciB2QWszdTh2PVJXT3RRbTYoa1ZRUFhvPT57cmV0dXJuIF93Zm1JeDhba1ZRUFhvPi0weDMxP2tWUVBYbysweDMwOmtWUVBYby0weDIxXX0sMHgxKTtNV1Z2ZjUoa1ZRUFhvW3ZBazN1OHYoLTB4MmQpXT1hZlRRcnIoMHg1NSksa1ZRUFhvLkxCN2RBZj1rVlFQWG9bdkFrM3U4digtMHgyZildKTtyZXR1cm4ga1ZRUFhvW2FmVFFycigweDU3KV0oa1ZRUFhvLkxCN2RBZigpKX0pLGFmVFFycigweDU1KSkoS0pGNFlMLFNBV2diX04pKTt2YXIgQkV5eU1VPVtdLFd2RDE5QWg9W3lwWnVXaChhZlRRcnIoMHg1NikpLCdceDdjXHg2Y1x4NDdceDQ5XHg3MFx4NTdceDNjXHg1OFx4NWYnLHlwWnVXaChhZlRRcnIoMHg1NykpLHlwWnVXaChhZlRRcnIoMHg1NSkpLHlwWnVXaChhZlRRcnIoMHg1OSkpLHlwWnVXaChhZlRRcnIoMHg1YSkpLHlwWnVXaCgweDUpLHlwWnVXaChhZlRRcnIoMHg2OCkpLHlwWnVXaChhZlRRcnIoMHhhYykpLHlwWnVXaChhZlRRcnIoMHhhZCkpLHlwWnVXaChhZlRRcnIoMHg4NSkpLHlwWnVXaCgweGEpLHlwWnVXaChhZlRRcnIoMHhkNikpLHlwWnVXaChhZlRRcnIoMHhiNCkpLHlwWnVXaChhZlRRcnIoMHg4OSkpLHlwWnVXaChhZlRRcnIoMHg4YSkpLHlwWnVXaChhZlRRcnIoMHg2YSkpLHlwWnVXaChhZlRRcnIoMHg3NykpLHlwWnVXaChhZlRRcnIoMHhjNikpLHlwWnVXaCgweDEyKSx5cFp1V2goMHgxMykseXBadVdoKDB4MTQpLHlwWnVXaChhZlRRcnIoMHg4MCkpLHlwWnVXaChhZlRRcnIoMHhhNSkpLCdceDQ2XHg1YVx4MzNceDVkXHg1Mlx4NzFceDdjXHg1MVx4NGJceDM1XHg0Zlx4NDdceDdjXHg2ZFx4NDJceDRjXHg2OVx4NDQnLHlwWnVXaChhZlRRcnIoMHg3NSkpLHlwWnVXaChhZlRRcnIoMHg3NikpLHlwWnVXaChhZlRRcnIoMHhhNikpLHlwWnVXaCgweDFhKSx5cFp1V2goYWZUUXJyKDB4ZDMpKSx5cFp1V2goYWZUUXJyKDB4ZGEpKSx5cFp1V2goYWZUUXJyKDB4ZDQpKSx5cFp1V2goYWZUUXJyKDB4NWQpKSx5cFp1V2goYWZUUXJyKDB4NjcpKSx5cFp1V2goYWZUUXJyKDB4Y2YpKSx5cFp1V2goYWZUUXJyKDB4ZDgpKSx5cFp1V2goMHgyMikseXBadVdoKGFmVFFycigweGJhKSkseXBadVdoKDB4MjQpLHlwWnVXaChhZlRRcnIoMHhhNykpLHlwWnVXaChhZlRRcnIoMHhkMSkpLHlwWnVXaChhZlRRcnIoMHg3ZikpLHlwWnVXaChhZlRRcnIoMHhjYikpLHlwWnVXaChhZlRRcnIoMHhjMikpLHlwWnVXaCgweDJhKSx5cFp1V2goYWZUUXJyKDB4Y2MpKSx5cFp1V2goYWZUUXJyKDB4ZGMpKSx5cFp1V2goYWZUUXJyKDB4NmQpKSx5cFp1V2goMHgyZSkseXBadVdoKGFmVFFycigweGRmKSkseXBadVdoKGFmVFFycigweGMzKSkseXBadVdoKGFmVFFycigweGJiKSkseXBadVdoKGFmVFFycigweDgxKSkseXBadVdoKGFmVFFycigweGUxKSkseXBadVdoKGFmVFFycigweGUyKSkseXBadVdoKGFmVFFycigweDg0KSkseXBadVdoKGFmVFFycigweGNhKSkseXBadVdoKGFmVFFycigweGRkKSkseXBadVdoKGFmVFFycigweGM5KSkseXBadVdoKGFmVFFycigweDhiKSkseXBadVdoKDB4M2EpLCdcdTAwNGVcdTAwN2NcdTAwNTNcdTAwMzBcdTAwNTdcdTAwNzJcdTAwNTlcdTAwNDAnLHlwWnVXaChhZlRRcnIoMHg4YykpLHlwWnVXaChhZlRRcnIoMHhlNykpLHlwWnVXaChhZlRRcnIoMHhkNSkpLHlwWnVXaChhZlRRcnIoMHhlOSkpLHlwWnVXaChhZlRRcnIoMHg2OSkpLHlwWnVXaCgweDQwKSx5cFp1V2goYWZUUXJyKDB4NzgpKSx5cFp1V2goMHg0MikseXBadVdoKGFmVFFycigweGNkKSkseXBadVdoKGFmVFFycigweDhlKSkseXBadVdoKGFmVFFycigweGNlKSksJ1x4NTFceDMyXHg3ZFx4NjlceDIxXHgzZVx4NzJceDUxXHg3OFx4N2NceDdiXHg1OVx4M2ZceDZhXHg2MicseXBadVdoKGFmVFFycigweDllKSkseXBadVdoKDB4NDcpLHlwWnVXaChhZlRRcnIoMHg3ZCkpLHlwWnVXaCgweDQ5KSx5cFp1V2goMHg0YSkseXBadVdoKDB4NGIpLHlwWnVXaChhZlRRcnIoMHhlZSkpLHlwWnVXaChhZlRRcnIoMHg3YykpLHlwWnVXaChhZlRRcnIoMHg5NSkpLHlwWnVXaCgweDRmKSx5cFp1V2goYWZUUXJyKDB4ZWYpKSx5cFp1V2goYWZUUXJyKDB4ZTMpKSx5cFp1V2goYWZUUXJyKDB4ZjApKSwnXHgzOVx4NTlceDZiXHgyYVx4M2JceDI1XHg3NFx4NWZceDRkXHg3OFx4N2NceDRlXHg0N1x4NjhceDc4XHg1MVx4NjNceDcyXHg1ZFx4NDJceDcyXHg2M1x4MjlceDU5XHg1Zlx4MjhceDRkXHgzMFx4MzNceDM5XHgyNFx4NzZceDczXHg2Ylx4NDRceDU3XHg0Zlx4MjNceDQ2XHgzOVx4NGRceDZkXHg2OScseXBadVdoKGFmVFFycigweDk5KSkseXBadVdoKGFmVFFycigweDk4KSksJ1x1MDA1MFx1MDA3N1x1MDA0OFx1MDA1M1x1MDA3NFx1MDA1NFx1MDAzN1x1MDA1Nlx1MDAyOFx1MDA3OVx1MDA1NVx1MDA3ZVx1MDA0M1x1MDA1Mlx1MDAzYlx1MDAyZVx1MDA1M1x1MDA2NVx1MDAyNVx1MDA1ZFx1MDAzN1x1MDA3NFx1MDA1YVx1MDA0MVx1MDA3Y1x1MDAyZVx1MDA1Ylx1MDA1Nlx1MDA2MVx1MDA0ZFx1MDAzZFx1MDA1MVx1MDAzN1x1MDA1ZFx1MDAzM1x1MDAzMCcsJ1x4NzZceDMyXHgyYlx4NmZceDMzXHg3Y1x4MmZceDQxXHgzOVx4NzlceDJmXHgzZFx4NWZceDQyXHg0ZFx4NGZceDQwXHg0OVx4N2FceDc2XHg0ZFx4NjhceDU5XHg0MCcseXBadVdoKDB4NTUpLCdceDdlXHg2OVx4NmNceDUzXHg1NVx4NGVceDM4XHg1OVx4NDVceDRiXHg2Ylx4NTBceDRlXHg1YVx4MjRceDc5XHg2NVx4N2NceDZlXHg1M1x4MjNceDcxXHgzM1x4NTNceDYxXHg1Mlx4MjFceDQxXHg0ZFx4NTBceDJhXHg1MFx4NjlceDc1XHg1Ylx4NmMnLHlwWnVXaCgweDU2KSwnXHgyYlx4NjVceDY4XHg3YVx4MzJceDdjXHg3Nlx4NTFceDI1XHgzMlx4NmJceDYzXHg1MFx4NDdceDczXHg1NVx4NTBceDY5XHg2Y1x4NTFceDUwXHgyZlx4NWRceDQwJywnXHg1MFx4NzdceDYxXHg0Zlx4NWVceDdjXHgzM1x4M2MnLCdceDYwXHg2Ylx4MzBceDIyXHg0Nlx4NGVceDY1XHgyYVx4NmNceDNhXHg2ZFx4MjhceDQ4XHgzOVx4M2JceDUxXHg1Zlx4NzJceDMyXHg2Y1x4NmVceDVkXHgyMVx4NzRceDU1XHg0Ylx4MjJceDU4XHg0OVx4NTBceDQ3XHgyZVx4NjFceDc4XHgzYVx4NWRceDJlXHg3Y1x4NGJceDViXHg1YVx4NDlceDMyXHg1NFx4NjZceDQwJyx5cFp1V2goYWZUUXJyKDB4OTYpKSx5cFp1V2goMHg1OCkseXBadVdoKGFmVFFycigweDVmKSkseXBadVdoKGFmVFFycigweGVkKSkseXBadVdoKGFmVFFycigweDg4KSkseXBadVdoKGFmVFFycigweDVlKSkseXBadVdoKDB4NWQpLHlwWnVXaCgweDVlKSwnXHg2Zlx4NWRceDczXHg3ZVx4NmVceDViXHg0OFx4M2NceDM5XHg1Mlx4NzNceDYzXHg3Y1x4MjZceDM4XHgzZlx4NTRceDUzXHg3OVx4N2FceDMwXHgyNlx4NTFceDQwJyx5cFp1V2goMHg1ZiksJ1x1MDA3MVx1MDA1YVx1MDAyM1x1MDA2MFx1MDAzMFx1MDA3MVx1MDA0MFx1MDAyZVx1MDAzZlx1MDA3OFx1MDA0Ylx1MDA1OVx1MDA0Nlx1MDAyY1x1MDA2Nlx1MDA0M1x1MDA2ZVx1MDA3MVx1MDAzM1x1MDA1ZFx1MDA3Y1x1MDA1Nlx1MDA1MVx1MDA1MVx1MDA1OVx1MDAzMicseXBadVdoKGFmVFFycigweDgyKSksJ1x1MDA3Mlx1MDA2Nlx1MDA0YVx1MDA0N1x1MDAzMFx1MDA3Y1x1MDA3N1x1MDAzZFx1MDA3MFx1MDAzMFx1MDA2ZCcseXBadVdoKGFmVFFycigweDcwKSkseXBadVdoKGFmVFFycigweDdlKSksJ1x1MDAyZVx1MDAzMlx1MDA1OFx1MDA1MVx1MDA2N1x1MDA1M1x1MDA3ZFx1MDAzNlx1MDA2Zlx1MDA3MFx1MDA2NVx1MDA1YVx1MDAzM1x1MDA3OFx1MDA3MVx1MDA0M1x1MDA3MVx1MDA1YVx1MDAyZlx1MDA1ZVx1MDAzZVx1MDA3Y1x1MDAzYlx1MDAzY1x1MDA3Nlx1MDA1OFx1MDA3MFx1MDA2M1x1MDA3M1x1MDA0MVx1MDA2YVx1MDA2MVx1MDA2Ylx1MDA1ZFx1MDAzMVx1MDAzNlx1MDA3ZVx1MDA2ZFx1MDA3NFx1MDA0Ylx1MDA0YVx1MDA3Y1x1MDA2Zlx1MDA3NFx1MDAzNFx1MDA0M1x1MDAzYVx1MDAzZicsJ1x4NjNceDVlXHgyYlx4MzVceDMwXHg3Y1x4MmJceDJhXHg2Y1x4N2VceDNkJyx5cFp1V2goMHg2MykseXBadVdoKDB4NjQpLHlwWnVXaChhZlRRcnIoMHg4ZikpLHlwWnVXaCgweDY2KSwnXHUwMDc0XHUwMDc5XHUwMDdjXHUwMDZmXHUwMDMxXHUwMDUzXHUwMDc5XHUwMDcxXHUwMDVlJywnXHg3Ylx4MzBceDI4XHgzNlx4MmFceDNmXHg1M1x4NTdceDRlXHg0ZVx4N2NceDYwXHgzYycseXBadVdoKGFmVFFycigweDkxKSksJ1x1MDA2MVx1MDAzNlx1MDA1Nlx1MDA2Zlx1MDA2MFx1MDA1OVx1MDAyNFx1MDA3NFx1MDA3YVx1MDA2N1x1MDA3MFx1MDA0OVx1MDA2ZVx1MDA0N1x1MDA0NFx1MDA0MVx1MDA3YVx1MDAyOFx1MDA0N1x1MDA2Y1x1MDA1YVx1MDAyNlx1MDA1M1x1MDAzZFx1MDA3Ylx1MDA0ZVx1MDA3Y1x1MDAyOFx1MDAzOVx1MDA3NScseXBadVdoKDB4NjgpLHlwWnVXaChhZlRRcnIoMHg5MCkpLHlwWnVXaCgweDZhKSwnXHgyZlx4NmRceDZhXHg2Zlx4NDFceDViXHgzZFx4MmNceDNiXHg3ZVx4MmNceDQyXHgzNVx4NDJceDdjXHg0YVx4NGJceDcyXHg0Y1x4NWRceDU4XHg2ZFx4NTFceDQwXHg3NScseXBadVdoKGFmVFFycigweDcxKSkseXBadVdoKDB4NmMpLCdcdTAwMmJcdTAwNWVcdTAwMjZcdTAwNTNcdTAwNGFcdTAwNDJcdTAwNjRcdTAwMzBcdTAwNmZcdTAwMzJcdTAwNDNcdTAwNzRcdTAwNjhcdTAwNzZcdTAwMjNcdTAwNTRcdTAwNWJcdTAwNTBcdTAwN2NcdTAwNjBcdTAwNzRcdTAwNDdcdTAwMzhcdTAwMzlcdTAwNDFcdTAwNTVcdTAwNGJcdTAwNWFcdTAwNWFcdTAwM2JcdTAwNmZcdTAwNDFcdTAwMzVcdTAwNmRcdTAwNTdcdTAwNjlcdTAwNGVcdTAwNTNcdTAwNDQnLCdceDNkXHgzMlx4MjFceDJhXHg1YVx4NzFceDdjXHg1ZVx4NGNceDUyXHg1MFx4NzdceDJjXHg1YVx4NGJceDU4XHgyNFx4NjlceDY5XHg0Mlx4NzBceDU5XHg3Nlx4MzBceDNjXHg3OFx4MzVceDNlXHg3MFx4NGVceDU2XHg0Zlx4MzVceDc3XHg1ZFx4M2FceDMyXHg2ZFx4NDQnLHlwWnVXaChhZlRRcnIoMHg3MikpLHlwWnVXaChhZlRRcnIoMHhhYSkpLHlwWnVXaCgweDZmKSx5cFp1V2goYWZUUXJyKDB4NmYpKSx5cFp1V2goMHg3MSkseXBadVdoKGFmVFFycigweGRiKSksJ1x1MDAyZlx1MDA3NVx1MDA1Ylx1MDAzM1x1MDA0MVx1MDA2N1x1MDAyMVx1MDA2Mlx1MDA3M1x1MDA0Ylx1MDAyNFx1MDA3Y1x1MDAyMlx1MDA0N1x1MDAzN1x1MDA2ZVx1MDA2OVx1MDA3NVx1MDA2NFx1MDA2MFx1MDA0Y1x1MDA0Mlx1MDA3Ylx1MDA3MVx1MDAzY1x1MDA2ZFx1MDA0OVx1MDA2M1x1MDA0N1x1MDA3NVx1MDA0OFx1MDA2MVx1MDA0Ylx1MDA1ZVx1MDA0MCcseXBadVdoKDB4NzMpLCdcdTAwN2NcdTAwNTRcdTAwMzZcdTAwN2VcdTAwMmFcdTAwNDFcdTAwM2VcdTAwM2ZcdTAwNDJcdTAwNjJcdTAwNGNcdTAwNmZcdTAwNjFcdTAwNDBcdTAwNGVcdTAwMzZcdTAwNmJcdTAwNzJcdTAwNWJcdTAwNWVcdTAwN2NcdTAwM2ZcdTAwNTZcdTAwMmFcdTAwNzRcdTAwNmRcdTAwN2RcdTAwNjlcdTAwM2VcdTAwMzJcdTAwMzBcdTAwNDNcdTAwMzdcdTAwNmJcdTAwNGVcdTAwN2VcdTAwMzNcdTAwNzhcdTAwNmZcdTAwNmRcdTAwM2InLCdceDZkXHg1M1x4N2FceDM1XHgzMVx4NWJceDMyXHg1NVx4NmJceDZjXHgzMlx4N2NceDdhXHg0MVx4NmZceDM2XHg3Ylx4NjVceDVkXHg2MFx4NGRceDc0XHgyYlx4NmVceDMxXHg0ZVx4MjVceDQxXHg3ZFx4NjNceDdhXHg0Y1x4MjFceDdjXHgyM1x4NjBceDNjXHg1OVx4NjFceDJjXHgzMVx4NThceDM5XHg1ZVx4M2MnLHlwWnVXaCgweDc0KSx5cFp1V2goMHg3NSkseXBadVdoKDB4NzYpLHlwWnVXaCgweDc3KSx5cFp1V2goMHg3OCksJ1x1MDAzOFx1MDA3Y1x1MDA3N1x1MDA2OVx1MDAyZVx1MDA3Y1x1MDAyOFx1MDA1Mlx1MDA1OFx1MDA3MFx1MDA1NFx1MDAzZlx1MDA1ZFx1MDA0Mlx1MDA0OFx1MDA0Zlx1MDA2ZFx1MDA3Mlx1MDAzZVx1MDA1Nlx1MDA1ZVx1MDA1Nlx1MDA0NCcseXBadVdoKDB4NzkpLHlwWnVXaChhZlRRcnIoMHg2MSkpLHlwWnVXaCgweDdiKSwnXHUwMDRhXHUwMDUzXHUwMDI5XHUwMDYwXHUwMDJhXHUwMDcxXHUwMDU0XHUwMDU1XHUwMDdhXHUwMDI4XHUwMDM5XHUwMDNhXHUwMDQ1XHUwMDQzXHUwMDQxXHUwMDUxXHUwMDc0XHUwMDc3XHUwMDY4XHUwMDM2XHUwMDc5XHUwMDY4XHUwMDY4XHUwMDZlXHUwMDYxXHUwMDUyXHUwMDcyXHUwMDZmXHUwMDY3XHUwMDRlXHUwMDdjXHUwMDRhXHUwMDYwXHUwMDVkXHUwMDZjXHUwMDUzXHUwMDIyXHUwMDNkXHUwMDU1XHUwMDNjJyx5cFp1V2goYWZUUXJyKDB4NjMpKSwnXHUwMDY4XHUwMDcyXHUwMDRmXHUwMDdhXHUwMDUwXHUwMDRlXHUwMDdkXHUwMDM2XHUwMDMxXHUwMDdjXHUwMDRmXHUwMDQ3XHUwMDJiXHUwMDQxXHUwMDIxXHUwMDc2XHUwMDMwXHUwMDM2XHUwMDRlXHUwMDMwXHUwMDUyJywnXHg2N1x4MjNceDNiXHgzNVx4MjJceDZiXHgyNVx4NmVceDVlXHg1NVx4NDJceDNkXHgzM1x4NzhceDc3XHg2MVx4NTdceDYxXHg3NFx4NTZceDUzXHg2M1x4MjFceDVlXHg0ZFx4NjJceDNkXHg3Y1x4M2MnLCdceDM3XHg2ZFx4NjRceDc0XHgzN1x4M2VceDdiXHg3Y1x4NDJceDZkXHg1Nlx4NzNceDQxXHg3NScseXBadVdoKGFmVFFycigweGIzKSksJ1x4MzJceDY5XHgzY1x4NWRceDU4XHgyNlx4MjFceDNmXHg1Ylx4MzJceDZiXHgzZFx4NzdceDQxXHgyZlx4NmZceDMyXHg1ZVx4NDNceDZmXHg2YVx4NDdceDM4XHg3Y1x4NGJceDJlXHgzMlx4NGRceDYzXHg1MFx4M2JceDM5XHg1Zlx4N2NceDRhXHg0N1x4MjVceDY4XHg1YVx4NWZceDQyXHg2ZFx4N2JceDcxXHgzN1x4NzhceDJlXHg0ZicseXBadVdoKDB4N2UpLCdceDViXHg1YVx4NDdceDVlXHg0Ylx4MjVceDcxXHgzOVx4MmVceDcwXHg0ZVx4NDJceDYwXHgyM1x4NzBceDYxXHgyOVx4NjNceDdjXHg2MFx4NzRceDYzXHg1MFx4NTdceDQyXHg2Y1x4NDVceDdkXHgzMlx4MzJceDQxXHg1OFx4NzJceDUzXHg2OFx4MzZceDQ4XHgyY1x4NTRceDNkXHgzMVx4MzAnLHlwWnVXaChhZlRRcnIoMHg2NikpLHlwWnVXaChhZlRRcnIoMHhlNikpLHlwWnVXaChhZlRRcnIoMHhiMikpLHlwWnVXaCgweDgyKSx5cFp1V2goMHg4MyksJ1x1MDA3MVx1MDA2Ylx1MDA3Y1x1MDA0Mlx1MDA2Nlx1MDA1ZFx1MDA2N1x1MDAyZlx1MDA3MVx1MDA3N1x1MDA1Nlx1MDA1Ylx1MDAzMFx1MDAyNFx1MDA0M1x1MDA1MFx1MDA2MFx1MDAyM1x1MDA0NFx1MDA2Y1x1MDAzMlx1MDA0M1x1MDA0YVx1MDA0MFx1MDA3NVx1MDA0Ylx1MDA3ZFx1MDA1MFx1MDA1Mlx1MDA0N1x1MDAzYlx1MDA1NFx1MDA1NFx1MDA1NFx1MDA3Y1x1MDA0Zlx1MDA3Mlx1MDA0Nlx1MDA0NFx1MDA0YVx1MDA2OVx1MDAzMlx1MDA2Mlx1MDA1Zlx1MDA0Nlx1MDA3NScseXBadVdoKGFmVFFycigweGJjKSkseXBadVdoKDB4ODUpLHlwWnVXaCgweDg2KSx5cFp1V2goMHg4NyksJ1x4MjNceDc3XHg3Y1x4MzNceDRiXHg0MVx4M2VceDVmXHg1Zlx4N2NceDIxXHg1OVx4MmFceDRkXHgyYlx4NGZceDUzXHg3Mlx4NmVceDUzXHg3N1x4NDFceDYxXHg3M1x4MzVceDc4XHgyZVx4NTdceDQyXHg3Mlx4NWUnLCdceDM2XHgyM1x4MjVceDVkXHg0MFx4NzFceDcwXHg1N1x4NThceDMyXHgyYlx4NmRceDRhXHg0Mlx4NTRceDZmXHg0YVx4MmZceDU1XHg3YVx4NTFceDIzXHgzZVx4NWVceDdlXHg3Y1x4MjVceDMwXHg0Zlx4MjNceDM0XHgzZFx4M2JceDZkXHgzNVx4NTNceDUxJyx5cFp1V2goMHg4OCkseXBadVdoKDB4ODkpLCdceDdjXHg1OFx4NTlceDNhXHgzOVx4NGVceDViXHg2Mlx4NGRceDZkXHgyM1x4N2FceDYxXHg3NVx4NDBceDM5XHgyM1x4NTNceDY5XHg1MVx4MjJceDZhXHg1Nlx4MmFceDJhXHg3OVx4NTVceDM0XHg3Nlx4NTRceDY4XHgzZicsJ1x4MmJceDY1XHg2MVx4NWRceDMzXHg0MVx4NDlceDUxXHg0OVx4NmNceDYxXHg3NVx4NjVceDYwXHg1NVx4M2ZceDcyXHg2ZFx4NjFceDMzXHg2YVx4NDZceDM5XHg0MVx4NjNceDRiXHg3OFx4N2FceDY2XHg3NVx4NTdceDQzXHgzZVx4NWFceDI2XHg1ZFx4MjRceDdjXHgyZVx4MzBceDVmXHg1OFx4NDZceDNiXHgzYycseXBadVdoKDB4OGEpLCdcdTAwNjRcdTAwNzdcdTAwMzlcdTAwNTNcdTAwNjNcdTAwNDFcdTAwN2NcdTAwNDBcdTAwMzJcdTAwNjJcdTAwMzBcdTAwNWVcdTAwM2FcdTAwNjNcdTAwNDlcdTAwNDFcdTAwNTNcdTAwNmRcdTAwNmZcdTAwNjBcdTAwNTJcdTAwNzJcdTAwNzBcdTAwM2RcdTAwM2VcdTAwNWFcdTAwNTFcdTAwNTJcdTAwMzJcdTAwNzZcdTAwMjJcdTAwNjFcdTAwM2ZcdTAwNzFcdTAwNDVcdTAwNjAnLCdceDcyXHgyM1x4NzNceDZmXHg0M1x4NmFceDIxXHgyZlx4NmVceDdjXHgyMlx4MjVceDU3XHgyM1x4M2JceDUwXHgzMVx4NjZceDM5XHg1ZFx4NzlceDY4XHg1MVx4MzlceDVkXHg1NVx4NGZceDI1XHgzZlx4M2JceDM5XHg2ZScseXBadVdoKDB4OGIpLHlwWnVXaCgweDhjKV07d0Qya3dGRT1IRUVkMEM2KCguLi5rVlFQWG8pPT57dmFyIHZBazN1OHY9UldPdFFtNihrVlFQWG89PntyZXR1cm4gX3dmbUl4OFtrVlFQWG88LTB4Yz9rVlFQWG8tMHg1NDprVlFQWG8+MHhhMD9rVlFQWG8rMHg1OTprVlFQWG88LTB4Yz9rVlFQWG8tMHgxMzprVlFQWG8+MHhhMD9rVlFQWG8tMHgxODprVlFQWG8rMHhiXX0sMHgxKTtNV1Z2ZjUoa1ZRUFhvW2FmVFFycigweDU4KV09YWZUUXJyKDB4NzkpLGtWUVBYb1t2QWszdTh2KC0weDQpXT12QWszdTh2KDB4MikpO2lmKHR5cGVvZiBrVlFQWG9bYWZUUXJyKDB4NTkpXT09PXlwWnVXaCh2QWszdTh2KC0weDUpKSl7a1ZRUFhvW2FmVFFycigweDU5KV09azB5cGs0fWlmKHR5cGVvZiBrVlFQWG9bYWZUUXJyKDB4NWEpXT09PXlwWnVXaChhZlRRcnIoMHg1YikpKXt2YXIgaklld2Zpdj1SV090UW02KGtWUVBYbz0+e3JldHVybiBfd2ZtSXg4W2tWUVBYbz4weGRiP2tWUVBYby0weDVjOmtWUVBYbzwweGRiP2tWUVBYby0weDMwOmtWUVBYby0weDRlXX0sMHgxKTtrVlFQWG9baklld2ZpdigweDM1KV09QkV5eU1VfWlmKGtWUVBYb1trVlFQWG8ucFlXd3FNLTB4NWJdPT1rVlFQWG9ba1ZRUFhvW3ZBazN1OHYoLTB4NCldLShrVlFQWG9bdkFrM3U4digtMHg0KV0tdkFrM3U4digtMHhhKSldKXt2YXIgc2haNndkSz1SV090UW02KGtWUVBYbz0+e3JldHVybiBfd2ZtSXg4W2tWUVBYbzwweDcxP2tWUVBYbz4weDcxP2tWUVBYby0weDJmOmtWUVBYbysweDNhOmtWUVBYbysweDQ0XX0sMHgxKTtyZXR1cm4ga1ZRUFhvW2tWUVBYby5wWVd3cU0tKGtWUVBYb1t2QWszdTh2KC0weDQpXS1hZlRRcnIoMHg1NykpXVtCRXl5TVVba1ZRUFhvW3NoWjZ3ZEsoLTB4M2EpXV1dPXdEMmt3RkUoa1ZRUFhvW3NoWjZ3ZEsoLTB4MzkpXSxrVlFQWG9bYWZUUXJyKDB4NTcpXSl9a1ZRUFhvW3ZBazN1OHYoMHgwKV09LWFmVFFycigweDVkKTtpZihrVlFQWG9ba1ZRUFhvW3ZBazN1OHYoLTB4NCldLXZBazN1OHYoLTB4MildKXt2YXIgbW1KOEF2Yj1SV090UW02KGtWUVBYbz0+e3JldHVybiBfd2ZtSXg4W2tWUVBYbz4weDEwOD9rVlFQWG8rMHg1ZjprVlFQWG88MHgxMDg/a1ZRUFhvLTB4NWQ6a1ZRUFhvKzB4MWFdfSwweDEpO1trVlFQWG9ba1ZRUFhvW3ZBazN1OHYoLTB4NCldLXZBazN1OHYoLTB4MSldLGtWUVBYb1trVlFQWG8ucFlXd3FNLShrVlFQWG9bbW1KOEF2YigweDY4KV0rbW1KOEF2YigweDY5KSldXT1ba1ZRUFhvW2FmVFFycigweDU5KV0oa1ZRUFhvWzB4NF0pLGtWUVBYb1trVlFQWG9bbW1KOEF2YigweDY0KV0tdkFrM3U4digweDIpXXx8a1ZRUFhvW2tWUVBYb1t2QWszdTh2KC0weDQpXS0oa1ZRUFhvW21tSjhBdmIoMHg2NCldLWFmVFFycigweDU1KSldXTtyZXR1cm4gd0Qya3dGRShrVlFQWG9ba1ZRUFhvW21tSjhBdmIoMHg2NCldLWFmVFFycigweDYyKV0sa1ZRUFhvWzB4NF0sa1ZRUFhvW2FmVFFycigweDU1KV0pfWlmKGtWUVBYb1thZlRRcnIoMHg1OSldPT09d0Qya3dGRSl7azB5cGs0PWtWUVBYb1trVlFQWG9bYWZUUXJyKDB4NjApXS0oa1ZRUFhvW2FmVFFycigweDVjKV0tdkFrM3U4digweDMpKV07cmV0dXJuIGsweXBrNChrVlFQWG9bdkFrM3U4digtMHhiKV0pfWlmKGtWUVBYb1t2QWszdTh2KC0weDcpXT09PWFmVFFycigweDc0KSl7d0Qya3dGRT1rVlFQWG9ba1ZRUFhvLnBZV3dxTS1hZlRRcnIoMHg1ZildfWlmKGtWUVBYb1sweDBdIT09a1ZRUFhvW2tWUVBYb1thZlRRcnIoMHg1YyldLXZBazN1OHYoLTB4MildKXt2YXIgWHBBQ1FmPVJXT3RRbTYoa1ZRUFhvPT57cmV0dXJuIF93Zm1JeDhba1ZRUFhvPDB4ZGU/a1ZRUFhvLTB4MzM6a1ZRUFhvLTB4MzZdfSwweDEpO3JldHVybiBrVlFQWG9bYWZUUXJyKDB4NWEpXVtrVlFQWG9bMHgwXV18fChrVlFQWG9ba1ZRUFhvW1hwQUNRZigweDNhKV0tdkFrM3U4digtMHgxKV1ba1ZRUFhvW2tWUVBYb1tYcEFDUWYoMHgzYSldLShrVlFQWG9bYWZUUXJyKDB4NWMpXS1hZlRRcnIoMHg1NikpXV09a1ZRUFhvW2FmVFFycigweDU5KV0oV3ZEMTlBaFtrVlFQWG9bWHBBQ1FmKDB4MzQpXV0pKX19LDB4NSk7ZnVuY3Rpb24gdW9WWVBhbCgpe3JldHVybiBnbG9iYWxUaGlzfWZ1bmN0aW9uIEdVRHFTaFQoKXtyZXR1cm4gZ2xvYmFsfWZ1bmN0aW9uIHFCVlJCYlYoKXtyZXR1cm4gd2luZG93fWZ1bmN0aW9uIEc2bUM0Yygpe3JldHVybiBuZXcgRnVuY3Rpb24oeXBadVdoKDB4OGUpKSgpfWZ1bmN0aW9uIEhpSk82RU4oa1ZRUFhvPVt1b1ZZUGFsLEdVRHFTaFQscUJWUkJiVixHNm1DNGNdLHZBazN1OHYsaklld2Zpdj1bXSx3RDJrd0ZFLHNoWjZ3ZEspe3ZBazN1OHY9dkFrM3U4djt0cnl7dmFyIG1tSjhBdmI9UldPdFFtNihrVlFQWG89PntyZXR1cm4gX3dmbUl4OFtrVlFQWG8+LTB4NDU/a1ZRUFhvPi0weDQ1P2tWUVBYbz4tMHg0NT9rVlFQWG8rMHg0NDprVlFQWG8tMHgyZDprVlFQWG8rMHgxMzprVlFQWG8tMHgzNF19LDB4MSk7TVdWdmY1KHZBazN1OHY9T2JqZWN0LGpJZXdmaXZbeXBadVdoKGFmVFFycigweDZjKSldKCcnW3lwWnVXaCgweDkwKV1beXBadVdoKG1tSjhBdmIoLTB4MmIpKV1beXBadVdoKGFmVFFycigweDlmKSldKSl9Y2F0Y2goZSl7fW9CNkh2MTpmb3Iod0Qya3dGRT1hZlRRcnIoMHg1Nik7d0Qya3dGRTxrVlFQWG9beXBadVdoKGFmVFFycigweDY0KSldO3dEMmt3RkUrKyl0cnl7dkFrM3U4dj1rVlFQWG9bd0Qya3dGRV0oKTtmb3Ioc2haNndkSz0weDA7c2haNndkSzxqSWV3Zml2W3lwWnVXaChhZlRRcnIoMHg2NCkpXTtzaFo2d2RLKyspaWYodHlwZW9mIHZBazN1OHZbaklld2ZpdltzaFo2d2RLXV09PT15cFp1V2goMHg4ZCkpe2NvbnRpbnVlIG9CNkh2MX1yZXR1cm4gdkFrM3U4dn1jYXRjaChlKXt9cmV0dXJuIHZBazN1OHZ8fHRoaXN9TVdWdmY1KHNoWjZ3ZEs9SGlKTzZFTigpfHx7fSxtbUo4QXZiPXNoWjZ3ZEtbeXBadVdoKDB4OTQpXSxYcEFDUWY9c2haNndkS1t5cFp1V2goYWZUUXJyKDB4OWIpKV0seUtSQzVRQz1zaFo2d2RLW3lwWnVXaCgweDk2KV0sVnQ4VFlucT1zaFo2d2RLW3lwWnVXaCgweDk3KV18fFN0cmluZyxVRkZVSVo9c2haNndkS1t5cFp1V2goMHg5OCldfHxBcnJheSxfZEEyQXI9UldPdFFtNigoKT0+e3ZhciBrVlFQWG8sdkFrM3U4dixqSWV3Zml2O2Z1bmN0aW9uIHdEMmt3RkUoa1ZRUFhvKXtyZXR1cm4gX3dmbUl4OFtrVlFQWG88MHhlMD9rVlFQWG8tMHgzNTprVlFQWG8tMHg0M119TVdWdmY1KGtWUVBYbz1uZXcgVUZGVUlaKDB4ODApLHZBazN1OHY9VnQ4VFlucVt5cFp1V2goYWZUUXJyKDB4NmIpKV18fFZ0OFRZbnFbeXBadVdoKDB4OWEpXSxqSWV3Zml2PVtdKTtyZXR1cm4gSEVFZDBDNihSV090UW02KCguLi5zaFo2d2RLKT0+e3ZhciBtbUo4QXZiO2Z1bmN0aW9uIFhwQUNRZihzaFo2d2RLKXtyZXR1cm4gX3dmbUl4OFtzaFo2d2RLPi0weDYzP3NoWjZ3ZEs+MHg0OT9zaFo2d2RLKzB4NTA6c2haNndkSz4tMHg2Mz9zaFo2d2RLPDB4NDk/c2haNndkSysweDYyOnNoWjZ3ZEsrMHgyZjpzaFo2d2RLKzB4Mzc6c2haNndkSysweDJhXX1NV1Z2ZjUoc2haNndkS1thZlRRcnIoMHg1OCldPTB4MSxzaFo2d2RLW2FmVFFycigweDY1KV09c2haNndkS1sweDBdKTt2YXIgeUtSQzVRQyxVRkZVSVo7TVdWdmY1KHNoWjZ3ZEtbMHgzXT1zaFo2d2RLW1hwQUNRZigtMHg1MildW3lwWnVXaCgweDkzKV0saklld2Zpdlt5cFp1V2goYWZUUXJyKDB4NjQpKV09WHBBQ1FmKC0weDYxKSk7Zm9yKG1tSjhBdmI9YWZUUXJyKDB4NTYpO21tSjhBdmI8c2haNndkS1thZlRRcnIoMHg1OSldOyl7dmFyIF9kQTJBcj1SV090UW02KHNoWjZ3ZEs9PntyZXR1cm4gX3dmbUl4OFtzaFo2d2RLPi0weGE/c2haNndkSysweDk6c2haNndkSy0weDJmXX0sMHgxKTtVRkZVSVo9c2haNndkSy5VTVljTWNrW21tSjhBdmIrK107aWYoVUZGVUlaPD1hZlRRcnIoMHg2Nikpe3lLUkM1UUM9VUZGVUlafWVsc2V7aWYoVUZGVUlaPD0weGRmKXt5S1JDNVFDPShVRkZVSVomWHBBQ1FmKC0weDUwKSk8PGFmVFFycigweDY4KXxzaFo2d2RLW2FmVFFycigweDY1KV1bbW1KOEF2YisrXSZhZlRRcnIoMHg2OSl9ZWxzZXtpZihVRkZVSVo8PTB4ZWYpe3ZhciBNcW1fdTM9UldPdFFtNihzaFo2d2RLPT57cmV0dXJuIF93Zm1JeDhbc2haNndkSzwweDU3P3NoWjZ3ZEstMHhkOnNoWjZ3ZEstMHg1OF19LDB4MSk7eUtSQzVRQz0oVUZGVUlaJmFmVFFycigweDZhKSk8PDB4Y3woc2haNndkS1tNcW1fdTMoMHg2OCldW21tSjhBdmIrK10mMHgzZik8PGFmVFFycigweDY4KXxzaFo2d2RLLlVNWWNNY2tbbW1KOEF2YisrXSZNcW1fdTMoMHg2Yyl9ZWxzZXtpZihWdDhUWW5xW3lwWnVXaChhZlRRcnIoMHg2YikpXSl7dmFyIEZNZjFRQT1SV090UW02KHNoWjZ3ZEs9PntyZXR1cm4gX3dmbUl4OFtzaFo2d2RLPDB4ZDk/c2haNndkSzwweGQ5P3NoWjZ3ZEs8MHhkOT9zaFo2d2RLLTB4MmU6c2haNndkSy0weDJmOnNoWjZ3ZEstMHgxMDpzaFo2d2RLLTB4MjBdfSwweDEpO3lLUkM1UUM9KFVGRlVJWiYweDcpPDx3RDJrd0ZFKDB4YTcpfChzaFo2d2RLW2FmVFFycigweDY1KV1bbW1KOEF2YisrXSZhZlRRcnIoMHg2OSkpPDwweGN8KHNoWjZ3ZEtbRk1mMVFBKDB4M2UpXVttbUo4QXZiKytdJmFmVFFycigweDY5KSk8PGFmVFFycigweDY4KXxzaFo2d2RLW0ZNZjFRQSgweDNlKV1bbW1KOEF2YisrXSZGTWYxUUEoMHg0Mil9ZWxzZXtNV1Z2ZjUoeUtSQzVRQz0weDNmLG1tSjhBdmIrPVhwQUNRZigtMHg1ZSkpfX19fWpJZXdmaXZbeXBadVdoKF9kQTJBcigweGUpKV0oa1ZRUFhvW3lLUkM1UUNdfHwoa1ZRUFhvW3lLUkM1UUNdPXZBazN1OHYoeUtSQzVRQykpKX1yZXR1cm4gaklld2Zpdlt5cFp1V2goMHg5YildKCcnKX0pLHdEMmt3RkUoMHgzNykpfSkoKSxIRUVkMEM2KHV3X3JCWkEsYWZUUXJyKDB4NTcpKSk7ZnVuY3Rpb24gdXdfckJaQSguLi5rVlFQWG8pe01XVnZmNShrVlFQWG9bYWZUUXJyKDB4NTgpXT1hZlRRcnIoMHg1Nyksa1ZRUFhvW2FmVFFycigweDZkKV09MHg5MSk7aWYodHlwZW9mIG1tSjhBdmIhPT15cFp1V2goYWZUUXJyKDB4NWIpKSYmbW1KOEF2Yil7dmFyIHZBazN1OHY9UldPdFFtNihrVlFQWG89PntyZXR1cm4gX3dmbUl4OFtrVlFQWG8+MHhmYT9rVlFQWG8tMHg0ZjprVlFQWG88MHg0ZT9rVlFQWG8tMHgxNjprVlFQWG88MHg0ZT9rVlFQWG8tMHgzMjprVlFQWG8+MHhmYT9rVlFQWG8tMHg5OmtWUVBYby0weDRmXX0sMHgxKTtyZXR1cm4gbmV3IG1tSjhBdmIoKVt5cFp1V2goMHg5YyldKG5ldyBYcEFDUWYoa1ZRUFhvW2tWUVBYb1t2QWszdTh2KDB4NjcpXS12QWszdTh2KDB4NjgpXSkpfWVsc2V7aWYodHlwZW9mIHlLUkM1UUMhPT15cFp1V2goMHg4ZCkmJnlLUkM1UUMpe3JldHVybiB5S1JDNVFDW3lwWnVXaCgweDlkKV0oa1ZRUFhvWzB4MF0pW3lwWnVXaCgweDllKV0oeXBadVdoKGFmVFFycigweGE0KSkpfWVsc2V7dmFyIGpJZXdmaXY9UldPdFFtNihrVlFQWG89PntyZXR1cm4gX3dmbUl4OFtrVlFQWG8+MHg3Nj9rVlFQWG8rMHgxMzprVlFQWG8+MHg3Nj9rVlFQWG8tMHg1MjprVlFQWG88LTB4MzY/a1ZRUFhvKzB4NDM6a1ZRUFhvPC0weDM2P2tWUVBYby0weDUwOmtWUVBYbysweDM1XX0sMHgxKTtyZXR1cm4gX2RBMkFyKGtWUVBYb1trVlFQWG9baklld2ZpdigtMHgxZCldLWpJZXdmaXYoLTB4MWMpXSl9fX1NV1Z2ZjUoTXFtX3UzPXdEMmt3RkUoMHg5NCksRk1mMVFBPXdEMmt3RkUoMHg3MyksUzVFZk9KPXdEMmt3RkUoYWZUUXJyKDB4NmYpKSxvRWNRRHI9W3dEMmt3RkUoYWZUUXJyKDB4NzApKSx3RDJrd0ZFKDB4NmEpLHdEMmt3RkUoYWZUUXJyKDB4NzEpKSx3RDJrd0ZFKGFmVFFycigweDcyKSksd0Qya3dGRShhZlRRcnIoMHg3MykpLHdEMmt3RkVbeXBadVdoKGFmVFFycigweDczKSldKGFmVFFycigweDc0KSwweGE4KV0saFVDOFJxbj17W3lwWnVXaCgweGExKV06d0Qya3dGRShhZlRRcnIoMHg3NSkpLFt5cFp1V2goMHhhMildOndEMmt3RkUoYWZUUXJyKDB4NzYpKSxbeXBadVdoKDB4YTMpXTp3RDJrd0ZFKGFmVFFycigweDYyKSksW3lwWnVXaCgweGE0KV06d0Qya3dGRSgweDYwKSxbeXBadVdoKDB4YTUpXTp3RDJrd0ZFKGFmVFFycigweGE5KSksW3lwWnVXaCgweGE2KV06d0Qya3dGRSgweGIyKX0sV1p6S3lyQj13RDJrd0ZFKGFmVFFycigweDc3KSksa3Z4bF9VPVJXT3RRbTYoKC4uLmtWUVBYbyk9Pnt2YXIgdkFrM3U4dixqSWV3Zml2O2Z1bmN0aW9uIHdEMmt3RkUoa1ZRUFhvKXtyZXR1cm4gX3dmbUl4OFtrVlFQWG88MHg2NT9rVlFQWG88LTB4NDc/a1ZRUFhvLTB4M2Q6a1ZRUFhvPjB4NjU/a1ZRUFhvLTB4MmE6a1ZRUFhvPC0weDQ3P2tWUVBYby0weDQyOmtWUVBYbysweDQ2OmtWUVBYby0weDI4XX1NV1Z2ZjUoa1ZRUFhvW2FmVFFycigweDU4KV09YWZUUXJyKDB4NTYpLGtWUVBYby5td3FkR0ViPWFmVFFycigweDc4KSx2QWszdTh2PUhFRWQwQzYoKC4uLmtWUVBYbyk9Pnt2YXIgaklld2Zpdj1SV090UW02KGtWUVBYbz0+e3JldHVybiBfd2ZtSXg4W2tWUVBYbzwtMHg0Mz9rVlFQWG8tMHgyNjprVlFQWG8+LTB4NDM/a1ZRUFhvKzB4NDI6a1ZRUFhvKzB4Ml19LDB4MSk7TVdWdmY1KGtWUVBYby5sZW5ndGg9YWZUUXJyKDB4NzkpLGtWUVBYb1thZlRRcnIoMHg3YSldPWtWUVBYb1thZlRRcnIoMHg1OSldKTtpZih0eXBlb2Yga1ZRUFhvLlFOSWVqYlk9PT15cFp1V2goMHg4ZCkpe2tWUVBYb1thZlRRcnIoMHg3YSldPXNoWjZ3ZEt9a1ZRUFhvW2pJZXdmaXYoLTB4MzMpXT1rVlFQWG9baklld2ZpdigtMHg0MCldO2lmKHR5cGVvZiBrVlFQWG9bMHg0XT09PXlwWnVXaChqSWV3Zml2KC0weDNjKSkpe2tWUVBYb1tqSWV3Zml2KC0weDNkKV09QkV5eU1VfWlmKGtWUVBYb1tqSWV3Zml2KC0weDQyKV09PWtWUVBYb1sweDBdKXt2YXIgd0Qya3dGRT1SV090UW02KGtWUVBYbz0+e3JldHVybiBfd2ZtSXg4W2tWUVBYbzwtMHgxZT9rVlFQWG8rMHg1NDprVlFQWG8rMHgxZF19LDB4MSk7cmV0dXJuIGtWUVBYb1t3RDJrd0ZFKC0weGUpXVtCRXl5TVVba1ZRUFhvW2FmVFFycigweDU1KV1dXT12QWszdTh2KGtWUVBYb1tqSWV3Zml2KC0weDQxKV0sa1ZRUFhvW2FmVFFycigweDY0KV0pfWlmKGtWUVBYb1tqSWV3Zml2KC0weDFkKV09PT12QWszdTh2KXtzaFo2d2RLPWtWUVBYb1thZlRRcnIoMHg2NCldO3JldHVybiBzaFo2d2RLKGtWUVBYb1sweDJdKX1pZihrVlFQWG9bMHgwXSE9PWtWUVBYb1thZlRRcnIoMHg2NCldKXt2YXIgbW1KOEF2Yj1SV090UW02KGtWUVBYbz0+e3JldHVybiBfd2ZtSXg4W2tWUVBYbz4tMHgyYT9rVlFQWG88LTB4MmE/a1ZRUFhvKzB4MzY6a1ZRUFhvKzB4Mjk6a1ZRUFhvKzB4NF19LDB4MSk7cmV0dXJuIGtWUVBYb1tqSWV3Zml2KC0weDNkKV1ba1ZRUFhvWzB4MF1dfHwoa1ZRUFhvW2FmVFFycigweDVhKV1ba1ZRUFhvW21tSjhBdmIoLTB4MjgpXV09a1ZRUFhvW2FmVFFycigweDdhKV0oV3ZEMTlBaFtrVlFQWG9bMHgwXV0pKX1pZihrVlFQWG9bYWZUUXJyKDB4N2EpXT09PWpJZXdmaXYoLTB4MjMpKXt2YXIgWHBBQ1FmPVJXT3RRbTYoa1ZRUFhvPT57cmV0dXJuIF93Zm1JeDhba1ZRUFhvPDB4ZGM/a1ZRUFhvLTB4MzE6a1ZRUFhvLTB4NDddfSwweDEpO3ZBazN1OHY9a1ZRUFhvW1hwQUNRZigweDM2KV19aWYoa1ZRUFhvWzB4Ml09PWtWUVBYb1tqSWV3Zml2KC0weDFkKV0pe3ZhciB5S1JDNVFDPVJXT3RRbTYoa1ZRUFhvPT57cmV0dXJuIF93Zm1JeDhba1ZRUFhvPjB4ZjI/a1ZRUFhvLTB4MzM6a1ZRUFhvPDB4NDY/a1ZRUFhvLTB4ODprVlFQWG88MHhmMj9rVlFQWG8tMHg0NzprVlFQWG8rMHg1M119LDB4MSk7cmV0dXJuIGtWUVBYb1thZlRRcnIoMHg2NCldP2tWUVBYb1t5S1JDNVFDKDB4NDgpXVtrVlFQWG9baklld2ZpdigtMHgzZCldW2tWUVBYb1tqSWV3Zml2KC0weDMzKV1dXTpCRXl5TVVba1ZRUFhvW2pJZXdmaXYoLTB4NDEpXV18fChrVlFQWG9bYWZUUXJyKDB4NTUpXT1rVlFQWG9bYWZUUXJyKDB4NWEpXVtrVlFQWG9baklld2ZpdigtMHg0MSldXXx8a1ZRUFhvW3lLUkM1UUMoMHg2YyldLEJFeXlNVVtrVlFQWG9baklld2ZpdigtMHg0MSldXT1rVlFQWG9beUtSQzVRQygweDQ3KV0oV3ZEMTlBaFtrVlFQWG9baklld2ZpdigtMHg0MSldXSkpfX0sYWZUUXJyKDB4NzkpKSxrVlFQWG9bYWZUUXJyKDB4N2IpXT1rVlFQWG9bYWZUUXJyKDB4N2IpXS0oa1ZRUFhvLm13cWRHRWItMHg4Niksaklld2Zpdj1bdkFrM3U4digweDApLHZBazN1OHYod0Qya3dGRSgtMHg0NSkpLHZBazN1OHZbeXBadVdoKGFmVFFycigweDlhKSldKHZvaWQgMHgwLFthZlRRcnIoMHg1NyldKV0sa1ZRUFhvWzB4MzldPWtWUVBYby53RktJNzNSLGtWUVBYb1trVlFQWG9bYWZUUXJyKDB4N2IpXS1hZlRRcnIoMHg3YyldPXtCNWUzdXE6W10sSkVwOHpoTjpSV090UW02KChrVlFQWG89aklld2Zpdlt3RDJrd0ZFKC0weDQ1KV0pPT57aWYoIWt2eGxfVS5vMGpuVVlbd0Qya3dGRSgtMHg0NSldKXtrdnhsX1UubzBqblVZLnB1c2goYWZUUXJyKDB4N2QpKX1yZXR1cm4ga3Z4bF9VLm8wam5VWVtrVlFQWG9dfSksUVYxVUYyOlJXT3RRbTYoKGtWUVBYbz1qSWV3Zml2W3dEMmt3RkUoLTB4NDQpXSk9PntpZigha3Z4bF9VLkI1ZTN1cVsweDBdKXtrdnhsX1UuQjVlM3VxLnB1c2goYWZUUXJyKDB4N2UpKX1yZXR1cm4ga3Z4bF9VLkI1ZTN1cVtrVlFQWG9dfSksbzBqblVZOltdLG5OQll2c186YWZUUXJyKDB4N2YpLGNnd2tkZHk6aklld2ZpdltrVlFQWG8ubXdxZEdFYi0weDg0XSxvTmVJRE92OmFmVFFycigweDgwKX0pO3JldHVybiBrVlFQWG9bYWZUUXJyKDB4N2IpXT4weDEwZj9rVlFQWG9bMHg4ZV06a1ZRUFhvWzB4MzldO2Z1bmN0aW9uIHNoWjZ3ZEsoLi4ua1ZRUFhvKXt2YXIgdkFrM3U4djtmdW5jdGlvbiBqSWV3Zml2KGtWUVBYbyl7cmV0dXJuIF93Zm1JeDhba1ZRUFhvPjB4NDI/a1ZRUFhvPjB4ZWU/a1ZRUFhvKzB4MTk6a1ZRUFhvPjB4ZWU/a1ZRUFhvLTB4NGQ6a1ZRUFhvLTB4NDM6a1ZRUFhvKzB4NjNdfU1XVnZmNShrVlFQWG9baklld2ZpdigweDQ2KV09d0Qya3dGRSgtMHg0NCksa1ZRUFhvLnowTVhBbj0tYWZUUXJyKDB4ODEpLGtWUVBYb1t3RDJrd0ZFKC0weDE1KV09J1x4M2RceDNjXHgzZlx4NWZceDc5XHgzYVx4N2RceDRmXHg3NVx4NTRceDZiXHgyY1x4MzZceDQxXHg3YVx4NzZceDIzXHgzMlx4NGVceDY5XHg3OFx4NDJceDRiXHg1OVx4MmVceDY3XHg0Y1x4NDZceDczXHg0OVx4MjZceDQ4XHgyOFx4MmFceDRkXHg1OFx4N2NceDdlXHgyMlx4NjNceDQwXHg2Mlx4MzFceDc3XHgyNFx4NmZceDYxXHg1Ylx4NTZceDM3XHg0NVx4M2VceDI1XHgyYlx4NjhceDZkXHg3Ylx4NjVceDY2XHg0N1x4MzlceDRhXHg1YVx4NTNceDM1XHgyZlx4NzJceDQzXHg2ZVx4NTdceDI5XHgzNFx4NTVceDUxXHg1Mlx4MzBceDYwXHg2NFx4M2JceDUwXHg2YVx4MjFceDQ0XHg1ZVx4NWRceDcxXHg3MFx4MzhceDZjXHg3NFx4MzMnLGtWUVBYb1t3RDJrd0ZFKC0weDE5KV09a1ZRUFhvW2pJZXdmaXYoMHg2NyldLGtWUVBYb1tqSWV3Zml2KDB4NDMpXT0nJysoa1ZRUFhvW2tWUVBYb1thZlRRcnIoMHg4MyldK2FmVFFycigweDgxKV18fCcnKSxrVlFQWG9ba1ZRUFhvW2FmVFFycigweDgzKV0rd0Qya3dGRSgtMHgxNyldPWtWUVBYb1tqSWV3Zml2KDB4NDMpXS5sZW5ndGgsa1ZRUFhvWzB4NF09W10sa1ZRUFhvW2pJZXdmaXYoMHg3MSldPTB4NDEsa1ZRUFhvW2tWUVBYb1t3RDJrd0ZFKC0weDE4KV0raklld2ZpdigweDU1KV09a1ZRUFhvW2FmVFFycigweDgzKV0tMHg0MSxrVlFQWG9bYWZUUXJyKDB4NjgpXT13RDJrd0ZFKC0weDQ1KSxrVlFQWG9bYWZUUXJyKDB4ODcpXT0taklld2ZpdigweDQ1KSk7Zm9yKHZBazN1OHY9YWZUUXJyKDB4NTYpO3ZBazN1OHY8a1ZRUFhvW3dEMmt3RkUoLTB4NDIpXTt2QWszdTh2Kyspe3ZhciBzaFo2d2RLPVJXT3RRbTYoa1ZRUFhvPT57cmV0dXJuIF93Zm1JeDhba1ZRUFhvPjB4ZmQ/a1ZRUFhvLTB4MmU6a1ZRUFhvLTB4NTJdfSwweDEpO2tWUVBYb1tzaFo2d2RLKDB4ODIpXT1rVlFQWG9bc2haNndkSygweDgzKV0uaW5kZXhPZihrVlFQWG9bc2haNndkSygweDUyKV1bdkFrM3U4dl0pO2lmKGtWUVBYb1thZlRRcnIoMHg4NSldPT09LShrVlFQWG9bYWZUUXJyKDB4ODMpXS0oa1ZRUFhvW3dEMmt3RkUoLTB4MTgpXS1qSWV3Zml2KDB4NDUpKSkpe2NvbnRpbnVlfWlmKGtWUVBYby5RVVgzZXg8aklld2ZpdigweDQ0KSl7a1ZRUFhvW3NoWjZ3ZEsoMHg4NCldPWtWUVBYb1thZlRRcnIoMHg4NSldfWVsc2V7dmFyIG1tSjhBdmI9UldPdFFtNihrVlFQWG89PntyZXR1cm4gX3dmbUl4OFtrVlFQWG8+MHgxMDg/a1ZRUFhvLTB4MjM6a1ZRUFhvPDB4NWM/a1ZRUFhvLTB4NGE6a1ZRUFhvPDB4NWM/a1ZRUFhvKzB4MmQ6a1ZRUFhvPjB4NWM/a1ZRUFhvLTB4NWQ6a1ZRUFhvLTB4NDZdfSwweDEpO01XVnZmNShrVlFQWG8uUVVYM2V4Kz1rVlFQWG9bbW1KOEF2YigweDhkKV0qd0Qya3dGRSgtMHgxMyksa1ZRUFhvW2tWUVBYb1tqSWV3Zml2KDB4NzEpXStqSWV3Zml2KDB4NTUpXXw9a1ZRUFhvLlFVWDNleDw8a1ZRUFhvWzB4Nl0sa1ZRUFhvW21tSjhBdmIoMHg3MCldKz0oa1ZRUFhvLlFVWDNleCZtbUo4QXZiKDB4YWIpKT4weDU4P3dEMmt3RkUoLTB4MTIpOmpJZXdmaXYoMHg3OCkpO2Rve3ZhciBYcEFDUWY9UldPdFFtNihrVlFQWG89PntyZXR1cm4gX3dmbUl4OFtrVlFQWG88MHg3Yz9rVlFQWG88LTB4MzA/a1ZRUFhvKzB4MzE6a1ZRUFhvKzB4MmY6a1ZRUFhvKzB4MTldfSwweDEpO01XVnZmNShrVlFQWG9bMHg0XS5wdXNoKGtWUVBYb1trVlFQWG9baklld2ZpdigweDcxKV0rYWZUUXJyKDB4NjcpXSZYcEFDUWYoMHg5KSksa1ZRUFhvW2tWUVBYby56ME1YQW4rMHgxZl0+Pj1rVlFQWG8uejBNWEFuLW1tSjhBdmIoMHg5Myksa1ZRUFhvW3dEMmt3RkUoLTB4MzMpXS09MHg4KX13aGlsZShrVlFQWG9ba1ZRUFhvW21tSjhBdmIoMHg4YildLWpJZXdmaXYoMHg3YSldPjB4Nyk7a1ZRUFhvLlFVWDNleD0tc2haNndkSygweDU0KX19aWYoa1ZRUFhvW2FmVFFycigweDg3KV0+LWFmVFFycigweDU3KSl7dmFyIHlLUkM1UUM9UldPdFFtNihrVlFQWG89PntyZXR1cm4gX3dmbUl4OFtrVlFQWG88MHgxP2tWUVBYby0weDYyOmtWUVBYbzwweGFkP2tWUVBYbz4weGFkP2tWUVBYby0weDM6a1ZRUFhvLTB4MjprVlFQWG8tMHgzMl19LDB4MSk7a1ZRUFhvW3lLUkM1UUMoMHg3KV0ucHVzaCgoa1ZRUFhvWzB4NjBdfGtWUVBYb1thZlRRcnIoMHg4NyldPDxrVlFQWG9ba1ZRUFhvW3dEMmt3RkUoLTB4MTgpXS0weDNiXSkmd0Qya3dGRSgtMHhlKSl9cmV0dXJuIGtWUVBYby56ME1YQW4+MHhiMT9rVlFQWG9bYWZUUXJyKDB4ZDApXTp1d19yQlpBKGtWUVBYb1tqSWV3Zml2KDB4NDgpXSl9fSkoKSk7dmFyIFl5WF8zYmwsdF83bWtGcz1mdW5jdGlvbihrVlFQWG8pe2tWUVBYbz1IRUVkMEM2KCguLi52QWszdTh2KT0+e3ZhciBqSWV3Zml2PVJXT3RRbTYodkFrM3U4dj0+e3JldHVybiBfd2ZtSXg4W3ZBazN1OHY+MHhjMT92QWszdTh2KzB4MWE6dkFrM3U4dj4weDE1P3ZBazN1OHY8MHgxNT92QWszdTh2LTB4MmE6dkFrM3U4dj4weGMxP3ZBazN1OHYrMHg0ZDp2QWszdTh2LTB4MTY6dkFrM3U4di0weDYyXX0sMHgxKTtNV1Z2ZjUodkFrM3U4dltqSWV3Zml2KDB4MTkpXT0weDUsdkFrM3U4dlthZlRRcnIoMHg4ZSldPS1qSWV3Zml2KDB4NTApKTtpZih0eXBlb2YgdkFrM3U4dlt2QWszdTh2W3ZBazN1OHZbYWZUUXJyKDB4OGUpXSsweGE5XSthZlRRcnIoMHg5MildPT09eXBadVdoKDB4OGQpKXt2QWszdTh2WzB4M109WHBBQ1FmfXZBazN1OHZbaklld2ZpdigweDU0KV09dkFrM3U4dlthZlRRcnIoMHg1NyldO2lmKHR5cGVvZiB2QWszdTh2W3ZBazN1OHZbYWZUUXJyKDB4OGUpXSsweDY5XT09PXlwWnVXaChqSWV3Zml2KDB4MWMpKSl7dkFrM3U4dlt2QWszdTh2WzB4NDRdK2pJZXdmaXYoMHg1MSldPUJFeXlNVX1pZih2QWszdTh2W3ZBazN1OHZbdkFrM3U4dlsweDQ0XSsweGE5XSthZlRRcnIoMHg5MSldJiZ2QWszdTh2W2FmVFFycigweDU5KV0hPT1YcEFDUWYpe2tWUVBYbz1YcEFDUWY7cmV0dXJuIGtWUVBYbyh2QWszdTh2WzB4MF0sLWFmVFFycigweDU3KSx2QWszdTh2W2FmVFFycigweDU1KV0sdkFrM3U4dlthZlRRcnIoMHg1OSldLHZBazN1OHZbYWZUUXJyKDB4NWEpXSl9aWYodkFrM3U4dltqSWV3Zml2KDB4MTYpXT09dkFrM3U4dlt2QWszdTh2WzB4NDRdK2pJZXdmaXYoMHg1MyldKXt2YXIgd0Qya3dGRT1SV090UW02KHZBazN1OHY9PntyZXR1cm4gX3dmbUl4OFt2QWszdTh2PDB4MjI/dkFrM3U4disweDUwOnZBazN1OHY+MHhjZT92QWszdTh2KzB4ODp2QWszdTh2PjB4MjI/dkFrM3U4di0weDIzOnZBazN1OHYrMHg0NF19LDB4MSk7cmV0dXJuIHZBazN1OHZbd0Qya3dGRSgweDYxKV0/dkFrM3U4dlt2QWszdTh2W3ZBazN1OHZbaklld2ZpdigweDRmKV0raklld2ZpdigweDU1KV0rd0Qya3dGRSgweDVkKV1bdkFrM3U4dlt3RDJrd0ZFKDB4MjgpXVt2QWszdTh2W3ZBazN1OHZbdkFrM3U4dlthZlRRcnIoMHg4ZSldK2pJZXdmaXYoMHg1NSldKzB4MTQ3XV1dOkJFeXlNVVt2QWszdTh2WzB4MF1dfHwodkFrM3U4dltqSWV3Zml2KDB4MTYpXT12QWszdTh2W3dEMmt3RkUoMHgyOCldW3ZBazN1OHZbd0Qya3dGRSgweDI0KV1dfHx2QWszdTh2W2FmVFFycigweDU5KV0sQkV5eU1VW3ZBazN1OHZbdkFrM3U4dlthZlRRcnIoMHg4ZSldKyh2QWszdTh2W2pJZXdmaXYoMHg0ZildKzB4Y2EpXV09dkFrM3U4dlthZlRRcnIoMHg1NSldKFd2RDE5QWhbdkFrM3U4dlt3RDJrd0ZFKDB4MjQpXV0pKX1pZih2QWszdTh2W3ZBazN1OHZbYWZUUXJyKDB4OGUpXSthZlRRcnIoMHg5MildPT09aklld2ZpdigweDM1KSl7dmFyIHNoWjZ3ZEs9UldPdFFtNih2QWszdTh2PT57cmV0dXJuIF93Zm1JeDhbdkFrM3U4dj4weDliP3ZBazN1OHYrMHhiOnZBazN1OHY8MHg5Yj92QWszdTh2Pi0weDExP3ZBazN1OHYrMHgxMDp2QWszdTh2LTB4MjY6dkFrM3U4di0weDRiXX0sMHgxKTtrVlFQWG89dkFrM3U4dlt2QWszdTh2WzB4NDRdK3NoWjZ3ZEsoMHgyYildfWlmKHZBazN1OHZbYWZUUXJyKDB4NTYpXSE9PXZBazN1OHZbaklld2ZpdigweDU0KV0pe3ZhciBtbUo4QXZiPVJXT3RRbTYodkFrM3U4dj0+e3JldHVybiBfd2ZtSXg4W3ZBazN1OHY+MHhjNj92QWszdTh2KzB4NTg6dkFrM3U4djwweDFhP3ZBazN1OHYrMHgxMTp2QWszdTh2LTB4MWJdfSwweDEpO3JldHVybiB2QWszdTh2W3ZBazN1OHZbaklld2ZpdigweDRmKV0rYWZUUXJyKDB4OTApXVt2QWszdTh2WzB4MF1dfHwodkFrM3U4dlttbUo4QXZiKDB4MjApXVt2QWszdTh2W21tSjhBdmIoMHgxYyldXT12QWszdTh2W2pJZXdmaXYoMHgxYSldKFd2RDE5QWhbdkFrM3U4dlttbUo4QXZiKDB4MWMpXV0pKX1pZih2QWszdTh2W3ZBazN1OHZbaklld2ZpdigweDRmKV0rMHgxNDddKXtbdkFrM3U4dlsweDRdLHZBazN1OHZbaklld2ZpdigweDU0KV1dPVt2QWszdTh2WzB4M10odkFrM3U4dltqSWV3Zml2KDB4MWIpXSksdkFrM3U4dlthZlRRcnIoMHg1NildfHx2QWszdTh2W3ZBazN1OHZbaklld2ZpdigweDRmKV0rYWZUUXJyKDB4OTEpXV07cmV0dXJuIGtWUVBYbyh2QWszdTh2W2pJZXdmaXYoMHgxNyldLHZBazN1OHZbaklld2ZpdigweDFiKV0sdkFrM3U4dlthZlRRcnIoMHg1NSldKX19LDB4NSk7ZnVuY3Rpb24gdkFrM3U4digpe3JldHVybiBnbG9iYWxUaGlzfWZ1bmN0aW9uIGpJZXdmaXYoKXtyZXR1cm4gZ2xvYmFsfWZ1bmN0aW9uIHdEMmt3RkUoKXtyZXR1cm4gd2luZG93fWZ1bmN0aW9uIHNoWjZ3ZEsoa1ZRUFhvKXt2YXIgdkFrM3U4dj1SV090UW02KGtWUVBYbz0+e3JldHVybiBfd2ZtSXg4W2tWUVBYbzwweGI3P2tWUVBYbz4weGI3P2tWUVBYby0weDJlOmtWUVBYbzwweGI/a1ZRUFhvLTB4NGI6a1ZRUFhvLTB4YzprVlFQWG8rMHg1MF19LDB4MSk7a1ZRUFhvPUhFRWQwQzYoKC4uLnZBazN1OHYpPT57dmFyIHdEMmt3RkU9UldPdFFtNih2QWszdTh2PT57cmV0dXJuIF93Zm1JeDhbdkFrM3U4djwweDI3P3ZBazN1OHYrMHgxZjp2QWszdTh2LTB4MjhdfSwweDEpO01XVnZmNSh2QWszdTh2W2FmVFFycigweDU4KV09MHg1LHZBazN1OHZbYWZUUXJyKDB4OTUpXT0tYWZUUXJyKDB4OTEpKTtpZih0eXBlb2YgdkFrM3U4dlsweDNdPT09eXBadVdoKGFmVFFycigweDViKSkpe3ZBazN1OHZbdkFrM3U4dlthZlRRcnIoMHg5NSldKzB4NmFdPWpJZXdmaXZ9aWYodHlwZW9mIHZBazN1OHZbd0Qya3dGRSgweDJkKV09PT15cFp1V2goYWZUUXJyKDB4NWIpKSl7dkFrM3U4dlsweDRdPUJFeXlNVX1pZih2QWszdTh2W3ZBazN1OHZbd0Qya3dGRSgweDY4KV0tKHZBazN1OHZbMHg0ZV0tYWZUUXJyKDB4NTcpKV0pe3ZhciBzaFo2d2RLPVJXT3RRbTYodkFrM3U4dj0+e3JldHVybiBfd2ZtSXg4W3ZBazN1OHY+MHgzNT92QWszdTh2LTB4MzY6dkFrM3U4di0weDIwXX0sMHgxKTtbdkFrM3U4dlt2QWszdTh2W3NoWjZ3ZEsoMHg3NildK3NoWjZ3ZEsoMHg1MildLHZBazN1OHZbdkFrM3U4dltzaFo2d2RLKDB4NzYpXSthZlRRcnIoMHg5MildXT1bdkFrM3U4dlsweDNdKHZBazN1OHZbc2haNndkSygweDNiKV0pLHZBazN1OHZbc2haNndkSygweDM3KV18fHZBazN1OHZbdkFrM3U4dlsweDRlXStzaFo2d2RLKDB4NzEpXV07cmV0dXJuIGtWUVBYbyh2QWszdTh2W3dEMmt3RkUoMHgyOSldLHZBazN1OHZbd0Qya3dGRSgweDJkKV0sdkFrM3U4dlsweDJdKX1pZih2QWszdTh2W3dEMmt3RkUoMHgyOCldJiZ2QWszdTh2W2FmVFFycigweDU5KV0hPT1qSWV3Zml2KXt2YXIgbW1KOEF2Yj1SV090UW02KHZBazN1OHY9PntyZXR1cm4gX3dmbUl4OFt2QWszdTh2PC0weDJhP3ZBazN1OHYrMHgyMTp2QWszdTh2KzB4MjldfSwweDEpO2tWUVBYbz1qSWV3Zml2O3JldHVybiBrVlFQWG8odkFrM3U4dlt2QWszdTh2W3ZBazN1OHZbYWZUUXJyKDB4OTUpXSthZlRRcnIoMHhmYyldKzB4NjddLC1tbUo4QXZiKC0weDI3KSx2QWszdTh2W2FmVFFycigweDU1KV0sdkFrM3U4dlttbUo4QXZiKC0weDI1KV0sdkFrM3U4dlsweDRdKX12QWszdTh2W3dEMmt3RkUoMHg2YSldPWFmVFFycigweDk2KTtpZih2QWszdTh2W3ZBazN1OHZbYWZUUXJyKDB4OTcpXS13RDJrd0ZFKDB4NmIpXT09PWtWUVBYbyl7aklld2Zpdj12QWszdTh2W2FmVFFycigweDU3KV07cmV0dXJuIGpJZXdmaXYodkFrM3U4dlthZlRRcnIoMHg1NSldKX1pZih2QWszdTh2W3dEMmt3RkUoMHgyOSldIT09dkFrM3U4dlsweDFdKXt2YXIgWHBBQ1FmPVJXT3RRbTYodkFrM3U4dj0+e3JldHVybiBfd2ZtSXg4W3ZBazN1OHY+MHhiZj92QWszdTh2LTB4NTU6dkFrM3U4dj4weDEzP3ZBazN1OHY+MHgxMz92QWszdTh2LTB4MTQ6dkFrM3U4disweDM4OnZBazN1OHYtMHgyYl19LDB4MSk7cmV0dXJuIHZBazN1OHZbdkFrM3U4di5vS2pOZW1aLXdEMmt3RkUoMHg2YyldW3ZBazN1OHZbdkFrM3U4dlthZlRRcnIoMHg5NSldK1hwQUNRZigweDUwKV1dfHwodkFrM3U4dlt3RDJrd0ZFKDB4MmQpXVt2QWszdTh2W3ZBazN1OHZbWHBBQ1FmKDB4NTQpXSt3RDJrd0ZFKDB4NjQpXV09dkFrM3U4dlthZlRRcnIoMHg1OSldKFd2RDE5QWhbdkFrM3U4dlt3RDJrd0ZFKDB4MjkpXV0pKX1pZih2QWszdTh2WzB4Ml09PXZBazN1OHZbMHgzXSl7dmFyIHlLUkM1UUM9UldPdFFtNih2QWszdTh2PT57cmV0dXJuIF93Zm1JeDhbdkFrM3U4djwweGRhP3ZBazN1OHY+MHhkYT92QWszdTh2LTB4NTp2QWszdTh2PDB4MmU/dkFrM3U4disweDQyOnZBazN1OHY8MHgyZT92QWszdTh2KzB4NTp2QWszdTh2LTB4MmY6dkFrM3U4di0weDNjXX0sMHgxKTtyZXR1cm4gdkFrM3U4dlt3RDJrd0ZFKDB4MmEpXT92QWszdTh2W2FmVFFycigweDU2KV1bdkFrM3U4dlt3RDJrd0ZFKDB4MmQpXVt2QWszdTh2W3dEMmt3RkUoMHgyYSldXV06QkV5eU1VW3ZBazN1OHZbYWZUUXJyKDB4NTYpXV18fCh2QWszdTh2WzB4Ml09dkFrM3U4dlt5S1JDNVFDKDB4MzQpXVt2QWszdTh2W3lLUkM1UUMoMHgzMCldXXx8dkFrM3U4dlthZlRRcnIoMHg1OSldLEJFeXlNVVt2QWszdTh2W3lLUkM1UUMoMHgzMCldXT12QWszdTh2WzB4Ml0oV3ZEMTlBaFt2QWszdTh2W3ZBazN1OHZbd0Qya3dGRSgweDY4KV0rYWZUUXJyKDB4OTEpXV0pKX19LGFmVFFycigweDc5KSk7cmV0dXJuIG5ldyBGdW5jdGlvbihrVlFQWG8oYWZUUXJyKDB4NTUpKStrVlFQWG9beXBadVdoKHZBazN1OHYoMHg1MSkpXShhZlRRcnIoMHg3NCksW3ZBazN1OHYoMHgxMCldKSkoKTtmdW5jdGlvbiBqSWV3Zml2KC4uLmtWUVBYbyl7dmFyIGpJZXdmaXY7ZnVuY3Rpb24gd0Qya3dGRShrVlFQWG8pe3JldHVybiBfd2ZtSXg4W2tWUVBYbzwweGQ0P2tWUVBYbz4weGQ0P2tWUVBYby0weDRmOmtWUVBYby0weDI5OmtWUVBYbysweDViXX1NV1Z2ZjUoa1ZRUFhvW3ZBazN1OHYoMHhmKV09d0Qya3dGRSgweDJiKSxrVlFQWG9bdkFrM3U4digweDUzKV09d0Qya3dGRSgweDZmKSxrVlFQWG9bd0Qya3dGRSgweDJiKV09J1x4NDJceDNkXHg1MVx4NDhceDRlXHg2NFx4NDFceDY5XHg0M1x4NGFceDczXHg2OFx4NWFceDZkXHg1Nlx4NmVceDRjXHg0NVx4NzJceDZhXHgzNVx4NTNceDI4XHg3NVx4M2JceDQ2XHgyMlx4NThceDYxXHg3Nlx4NTJceDRmXHg3ZVx4NWVceDM0XHg1Ylx4MzBceDJiXHgyY1x4NzBceDU5XHgzZVx4NzdceDVmXHgyNFx4NDdceDdiXHg3YVx4M2ZceDU0XHg3Y1x4N2RceDY2XHg0ZFx4NzlceDI1XHgyYVx4NTBceDc4XHgzMVx4MzZceDQ0XHgyMVx4M2FceDMyXHg1NVx4NGJceDQ5XHg1ZFx4NmNceDM4XHg2N1x4NTdceDZiXHg2Mlx4M2NceDcxXHgzM1x4NmZceDYwXHgyNlx4NjNceDQwXHgzN1x4NjVceDJlXHgyOVx4NzRceDM5XHgyM1x4MmYnLGtWUVBYb1trVlFQWG9bYWZUUXJyKDB4OWMpXS12QWszdTh2KDB4MWUpXT0tYWZUUXJyKDB4ZWEpLGtWUVBYb1thZlRRcnIoMHg5ZCldPScnKyhrVlFQWG9bd0Qya3dGRSgweDJhKV18fCcnKSxrVlFQWG9bYWZUUXJyKDB4NTkpXT1rVlFQWG9bd0Qya3dGRSgweDcxKV0ubGVuZ3RoLGtWUVBYb1thZlRRcnIoMHg1YSldPVtdLGtWUVBYb1t3RDJrd0ZFKDB4NzYpXT13RDJrd0ZFKDB4MmEpLGtWUVBYb1trVlFQWG9bd0Qya3dGRSgweDc0KV0rYWZUUXJyKDB4OWUpXT0weDAsa1ZRUFhvLkNlZXZHc0k9LTB4MSk7Zm9yKGpJZXdmaXY9MHgwO2pJZXdmaXY8a1ZRUFhvW2tWUVBYby5IR2ZldHk3LXdEMmt3RkUoMHg3MyldO2pJZXdmaXYrKyl7a1ZRUFhvW3dEMmt3RkUoMHg1OSldPWtWUVBYb1trVlFQWG9bd0Qya3dGRSgweDc0KV0rMHg0MV0uaW5kZXhPZihrVlFQWG9bd0Qya3dGRSgweDcxKV1baklld2Zpdl0pO2lmKGtWUVBYb1thZlRRcnIoMHg4NSldPT09LShrVlFQWG9bdkFrM3U4digweDU3KV0rYWZUUXJyKDB4NzgpKSl7Y29udGludWV9aWYoa1ZRUFhvW3ZBazN1OHYoMHg1OCldPHZBazN1OHYoMHhkKSl7a1ZRUFhvW3dEMmt3RkUoMHg3NSldPWtWUVBYb1thZlRRcnIoMHg4NSldfWVsc2V7dmFyIHNoWjZ3ZEs9UldPdFFtNihrVlFQWG89PntyZXR1cm4gX3dmbUl4OFtrVlFQWG8+LTB4MTA/a1ZRUFhvPi0weDEwP2tWUVBYbysweGY6a1ZRUFhvLTB4NWM6a1ZRUFhvLTB4NTBdfSwweDEpO01XVnZmNShrVlFQWG8uQ2VldkdzSSs9a1ZRUFhvW3ZBazN1OHYoMHgzYyldKnZBazN1OHYoMHgzZiksa1ZRUFhvW3dEMmt3RkUoMHg3NildfD1rVlFQWG9bdkFrM3U4digweDU4KV08PGtWUVBYb1trVlFQWG9bc2haNndkSygweDM4KV0tYWZUUXJyKDB4NmMpXSxrVlFQWG9bd0Qya3dGRSgweDNjKV0rPShrVlFQWG9bdkFrM3U4digweDU4KV0mc2haNndkSygweDNmKSk+c2haNndkSygweDRkKT8weGQ6d0Qya3dGRSgweDVlKSk7ZG97dmFyIG1tSjhBdmI9UldPdFFtNihrVlFQWG89PntyZXR1cm4gX3dmbUl4OFtrVlFQWG88MHg1Mj9rVlFQWG8+MHg1Mj9rVlFQWG8tMHg1MzprVlFQWG88MHg1Mj9rVlFQWG8+LTB4NWE/a1ZRUFhvKzB4NTk6a1ZRUFhvLTB4NDM6a1ZRUFhvKzB4MjQ6a1ZRUFhvLTB4NF19LDB4MSk7TVdWdmY1KGtWUVBYb1trVlFQWG9bYWZUUXJyKDB4YTApXStzaFo2d2RLKDB4MmEpXS5wdXNoKGtWUVBYb1tzaFo2d2RLKDB4M2UpXSZzaFo2d2RLKDB4MjkpKSxrVlFQWG9bdkFrM3U4digweDU5KV0+Pj1rVlFQWG8uSEdmZXR5Ny1tbUo4QXZiKC0weDUzKSxrVlFQWG9bc2haNndkSygweDQpXS09a1ZRUFhvLkhHZmV0eTctYWZUUXJyKDB4NWIpKX13aGlsZShrVlFQWG9bdkFrM3U4digweDFmKV0+MHg3KTtrVlFQWG9bd0Qya3dGRSgweDc1KV09LWFmVFFycigweDU3KX19aWYoa1ZRUFhvW2FmVFFycigweGExKV0+LWFmVFFycigweDU3KSl7a1ZRUFhvW3dEMmt3RkUoMHgyZSldLnB1c2goKGtWUVBYb1t3RDJrd0ZFKDB4NzYpXXxrVlFQWG9bYWZUUXJyKDB4YTEpXTw8a1ZRUFhvW2tWUVBYb1t2QWszdTh2KDB4NTMpXS13RDJrd0ZFKDB4NDApXSkmdkFrM3U4digweDQ0KSl9cmV0dXJuIGtWUVBYb1t2QWszdTh2KDB4NTMpXT5rVlFQWG9bMHg3Nl0rMHgxMmI/a1ZRUFhvW3ZBazN1OHYoMHg3YildOnV3X3JCWkEoa1ZRUFhvW2tWUVBYb1t3RDJrd0ZFKDB4NzQpXSsweDQ0XSl9fWZ1bmN0aW9uIG1tSjhBdmIoa1ZRUFhvPVt2QWszdTh2LGpJZXdmaXYsd0Qya3dGRSxzaFo2d2RLXSxtbUo4QXZiLFhwQUNRZix5S1JDNVFDPVtdLFZ0OFRZbnEsVUZGVUlaLF9kQTJBcixNcW1fdTM9MHgwLEZNZjFRQSl7TVdWdmY1KG1tSjhBdmI9SEVFZDBDNigoLi4ua1ZRUFhvKT0+e01XVnZmNShrVlFQWG8ubGVuZ3RoPWFmVFFycigweDc5KSxrVlFQWG9bYWZUUXJyKDB4YTQpXT1rVlFQWG9bYWZUUXJyKDB4NTkpXSk7aWYodHlwZW9mIGtWUVBYb1thZlRRcnIoMHhhNCldPT09eXBadVdoKDB4OGQpKXtrVlFQWG9bMHg5Zl09aFVDOFJxbn1rVlFQWG9bMHg4Zl09a1ZRUFhvW2FmVFFycigweDVhKV07aWYodHlwZW9mIGtWUVBYb1thZlRRcnIoMHg2YyldPT09eXBadVdoKGFmVFFycigweDViKSkpe2tWUVBYb1thZlRRcnIoMHg2YyldPUJFeXlNVX1pZihrVlFQWG9bYWZUUXJyKDB4NTUpXSYma1ZRUFhvW2FmVFFycigweGE0KV0hPT1oVUM4UnFuKXttbUo4QXZiPWhVQzhScW47cmV0dXJuIG1tSjhBdmIoa1ZRUFhvWzB4MF0sLWFmVFFycigweDU3KSxrVlFQWG9bYWZUUXJyKDB4NTUpXSxrVlFQWG9bYWZUUXJyKDB4YTQpXSxrVlFQWG9bYWZUUXJyKDB4NmMpXSl9aWYoa1ZRUFhvW2FmVFFycigweDU1KV09PWtWUVBYb1thZlRRcnIoMHg1NildKXtyZXR1cm4ga1ZRUFhvW2FmVFFycigweDU3KV1bQkV5eU1VW2tWUVBYb1thZlRRcnIoMHg1NSldXV09bW1KOEF2YihrVlFQWG9bYWZUUXJyKDB4NTYpXSxrVlFQWG9bYWZUUXJyKDB4NTcpXSl9aWYoa1ZRUFhvW2FmVFFycigweGE0KV09PT1tbUo4QXZiKXtoVUM4UnFuPWtWUVBYb1thZlRRcnIoMHg1NyldO3JldHVybiBoVUM4UnFuKGtWUVBYb1thZlRRcnIoMHg1NSldKX1pZihrVlFQWG9bYWZUUXJyKDB4YTQpXT09PWFmVFFycigweDc0KSl7dmFyIFhwQUNRZj1SV090UW02KGtWUVBYbz0+e3JldHVybiBfd2ZtSXg4W2tWUVBYbzwweDFmP2tWUVBYbysweDMwOmtWUVBYbz4weDFmP2tWUVBYbz4weDFmP2tWUVBYbz4weGNiP2tWUVBYbysweDFiOmtWUVBYby0weDIwOmtWUVBYby0weDk6a1ZRUFhvLTB4NTRdfSwweDEpO21tSjhBdmI9a1ZRUFhvW1hwQUNRZigweDM3KV19aWYoa1ZRUFhvW2FmVFFycigweDU2KV0hPT1rVlFQWG9bMHgxXSl7cmV0dXJuIGtWUVBYb1thZlRRcnIoMHg2YyldW2tWUVBYb1thZlRRcnIoMHg1NildXXx8KGtWUVBYb1sweDhmXVtrVlFQWG9bMHgwXV09a1ZRUFhvWzB4OWZdKFd2RDE5QWhba1ZRUFhvW2FmVFFycigweDU2KV1dKSl9fSxhZlRRcnIoMHg3OSkpLFhwQUNRZj1YcEFDUWYpO3RyeXt2YXIgUzVFZk9KPVJXT3RRbTYoa1ZRUFhvPT57cmV0dXJuIF93Zm1JeDhba1ZRUFhvPjB4MWE/a1ZRUFhvPjB4MWE/a1ZRUFhvPjB4MWE/a1ZRUFhvPDB4YzY/a1ZRUFhvLTB4MWI6a1ZRUFhvLTB4MWE6a1ZRUFhvKzB4MWQ6a1ZRUFhvKzB4MTQ6a1ZRUFhvLTB4MjFdfSwweDEpO01XVnZmNShWdDhUWW5xPUhFRWQwQzYoKC4uLmtWUVBYbyk9Pnt2YXIgbW1KOEF2Yj1SV090UW02KGtWUVBYbz0+e3JldHVybiBfd2ZtSXg4W2tWUVBYbz4weDFmP2tWUVBYbzwweGNiP2tWUVBYby0weDIwOmtWUVBYby0weDQ3OmtWUVBYbysweDQyXX0sMHgxKTtNV1Z2ZjUoa1ZRUFhvW2FmVFFycigweDU4KV09YWZUUXJyKDB4NzkpLGtWUVBYb1sweDI1XT0tYWZUUXJyKDB4YTUpKTtpZih0eXBlb2Yga1ZRUFhvW2tWUVBYb1sweDI1XSttbUo4QXZiKDB4NzEpXT09PXlwWnVXaChhZlRRcnIoMHg1YikpKXtrVlFQWG9ba1ZRUFhvW2tWUVBYb1thZlRRcnIoMHhhNyldK21tSjhBdmIoMHg1NyldK2FmVFFycigweGE2KV09b0VjUURyfWlmKHR5cGVvZiBrVlFQWG9bbW1KOEF2YigweDI1KV09PT15cFp1V2goYWZUUXJyKDB4NWIpKSl7a1ZRUFhvW21tSjhBdmIoMHgyNSldPUJFeXlNVX1rVlFQWG8uZnYzOVpxPWtWUVBYb1ttbUo4QXZiKDB4NzIpXS0weDU2O2lmKGtWUVBYb1ttbUo4QXZiKDB4MjEpXSE9PWtWUVBYb1trVlFQWG9bMHgyNV0rMHgxN10pe3JldHVybiBrVlFQWG9ba1ZRUFhvWzB4MjVdK21tSjhBdmIoMHg3NildW2tWUVBYb1trVlFQWG9bYWZUUXJyKDB4YTgpXS0oa1ZRUFhvLmZ2MzlacS0weDApXV18fChrVlFQWG9bMHg0XVtrVlFQWG9bYWZUUXJyKDB4NTYpXV09a1ZRUFhvW21tSjhBdmIoMHgyNCldKFd2RDE5QWhba1ZRUFhvW2tWUVBYb1thZlRRcnIoMHhhOCldK21tSjhBdmIoMHg3NCldXSkpfWlmKGtWUVBYb1sweDNdPT09VnQ4VFlucSl7b0VjUURyPWtWUVBYb1sweDFdO3JldHVybiBvRWNRRHIoa1ZRUFhvW2tWUVBYb1ttbUo4QXZiKDB4NzIpXSthZlRRcnIoMHg3NildKX1pZihrVlFQWG9bbW1KOEF2YigweDIwKV0mJmtWUVBYb1ttbUo4QXZiKDB4MjQpXSE9PW9FY1FEcil7VnQ4VFlucT1vRWNRRHI7cmV0dXJuIFZ0OFRZbnEoa1ZRUFhvW2tWUVBYb1ttbUo4QXZiKDB4NzIpXSttbUo4QXZiKDB4NzApXSwtMHgxLGtWUVBYb1sweDJdLGtWUVBYb1thZlRRcnIoMHg1OSldLGtWUVBYb1ttbUo4QXZiKDB4MjUpXSl9aWYoa1ZRUFhvW2FmVFFycigweDU1KV09PWtWUVBYb1sweDNdKXt2YXIgWHBBQ1FmPVJXT3RRbTYoa1ZRUFhvPT57cmV0dXJuIF93Zm1JeDhba1ZRUFhvPjB4OTk/a1ZRUFhvKzB4NWM6a1ZRUFhvPC0weDEzP2tWUVBYby0weDA6a1ZRUFhvPjB4OTk/a1ZRUFhvKzB4MmQ6a1ZRUFhvPjB4OTk/a1ZRUFhvLTB4NTE6a1ZRUFhvKzB4MTJdfSwweDEpO3JldHVybiBrVlFQWG9ba1ZRUFhvLmZ2MzlacStYcEFDUWYoMHhiKV0/a1ZRUFhvWzB4MF1ba1ZRUFhvW21tSjhBdmIoMHgyNSldW2tWUVBYb1sweDFdXV06QkV5eU1VW2tWUVBYb1ttbUo4QXZiKDB4MjEpXV18fChrVlFQWG9ba1ZRUFhvW2FmVFFycigweGE4KV0rYWZUUXJyKDB4YWEpXT1rVlFQWG9bbW1KOEF2YigweDI1KV1ba1ZRUFhvW2FmVFFycigweDU2KV1dfHxrVlFQWG9ba1ZRUFhvWzB4MjVdK21tSjhBdmIoMHg3MSldLEJFeXlNVVtrVlFQWG9bYWZUUXJyKDB4NTYpXV09a1ZRUFhvW2tWUVBYb1tYcEFDUWYoMHg0MCldK2FmVFFycigweDc2KV0oV3ZEMTlBaFtrVlFQWG9bMHgwXV0pKX1pZihrVlFQWG9bYWZUUXJyKDB4NTcpXSl7dmFyIHlLUkM1UUM9UldPdFFtNihrVlFQWG89PntyZXR1cm4gX3dmbUl4OFtrVlFQWG8+MHg1Yj9rVlFQWG8+MHgxMDc/a1ZRUFhvLTB4Mjg6a1ZRUFhvLTB4NWM6a1ZRUFhvLTB4NWVdfSwweDEpO1trVlFQWG9bbW1KOEF2YigweDI1KV0sa1ZRUFhvWzB4MV1dPVtrVlFQWG9bMHgzXShrVlFQWG9ba1ZRUFhvW21tSjhBdmIoMHg3MildK21tSjhBdmIoMHg3NildKSxrVlFQWG9beUtSQzVRQygweDVkKV18fGtWUVBYb1ttbUo4QXZiKDB4MjApXV07cmV0dXJuIFZ0OFRZbnEoa1ZRUFhvW2tWUVBYby5mdjM5WnErbW1KOEF2YigweDc0KV0sa1ZRUFhvW2FmVFFycigweDVhKV0sa1ZRUFhvWzB4Ml0pfX0sYWZUUXJyKDB4NzkpKSxVRkZVSVo9e1t5cFp1V2goMHhhOCldOlZ0OFRZbnFbeXBadVdoKDB4YTcpXSh2b2lkIDB4MCxbMHg5XSl9LF9kQTJBcj1WdDhUWW5xKGFmVFFycigweDY4KSksWHBBQ1FmPU9iamVjdCx5S1JDNVFDW1Z0OFRZbnEoUzVFZk9KKDB4MjApKV0oJydbVnQ4VFlucVt5cFp1V2goUzVFZk9KKDB4NjApKV0oUzVFZk9KKDB4M2EpLFtTNUVmT0ooMHgzZildKStfZEEyQXJdW1Z0OFRZbnEoUzVFZk9KKDB4NzIpKStWdDhUWW5xKFM1RWZPSigweDczKSldW1VGRlVJWlt5cFp1V2goMHhhOCldXSksSEVFZDBDNihvRWNRRHIsMHgxKSk7ZnVuY3Rpb24gb0VjUURyKC4uLmtWUVBYbyl7dmFyIG1tSjhBdmI7TVdWdmY1KGtWUVBYb1thZlRRcnIoMHg1OCldPVM1RWZPSigweDFkKSxrVlFQWG9bUzVFZk9KKDB4NGEpXT0tYWZUUXJyKDB4NjMpLGtWUVBYb1thZlRRcnIoMHg1NyldPSdceDQ0XHg0ZVx4NzRceDIyXHg3NVx4NzJceDQzXHgzY1x4NjlceDQ1XHgyNVx4MjlceDU1XHg2NVx4NmVceDQyXHg3MVx4N2FceDI0XHg0MFx4NDhceDM4XHgzM1x4NjdceDNlXHg2M1x4NDdceDJlXHg3Nlx4NTFceDczXHgzYVx4MjNceDZjXHg3ZFx4NmZceDJiXHg0Zlx4NWJceDc3XHgzZFx4NDlceDc4XHg2Mlx4NjFceDY0XHg1ZVx4M2JceDJhXHgyZlx4NjBceDJjXHg3Ylx4MjFceDZkXHgzNlx4NDFceDUwXHgyOFx4N2NceDNmXHg3OVx4MzFceDY4XHg1OFx4MzlceDZhXHg1Mlx4MzVceDMyXHg0Y1x4MzRceDdlXHgzMFx4NWRceDM3XHg0ZFx4NTNceDI2XHg1Zlx4NmJceDRiXHg0Nlx4NTZceDY2XHg1OVx4NTdceDRhXHg1NFx4NWFceDcwJyxrVlFQWG9bUzVFZk9KKDB4NzQpXT0nJysoa1ZRUFhvW2FmVFFycigweDU2KV18fCcnKSxrVlFQWG9bUzVFZk9KKDB4MWYpXT1rVlFQWG9bYWZUUXJyKDB4YWUpXS5sZW5ndGgsa1ZRUFhvW2FmVFFycigweDVhKV09W10sa1ZRUFhvWzB4NV09UzVFZk9KKDB4MWMpLGtWUVBYb1thZlRRcnIoMHg2OCldPWtWUVBYb1tTNUVmT0ooMHg0YSldLShrVlFQWG9bYWZUUXJyKDB4ODQpXS0oa1ZRUFhvW2FmVFFycigweDg0KV0rUzVFZk9KKDB4MjkpKSksa1ZRUFhvLkYyOUtQenU9LWFmVFFycigweDU3KSk7Zm9yKG1tSjhBdmI9UzVFZk9KKDB4MWMpO21tSjhBdmI8a1ZRUFhvWzB4M107bW1KOEF2YisrKXtrVlFQWG9bUzVFZk9KKDB4NzUpXT1rVlFQWG9bYWZUUXJyKDB4NTcpXS5pbmRleE9mKGtWUVBYb1thZlRRcnIoMHhhZSldW21tSjhBdmJdKTtpZihrVlFQWG9bUzVFZk9KKDB4NzUpXT09PS0weDEpe2NvbnRpbnVlfWlmKGtWUVBYb1thZlRRcnIoMHhiMCldPGFmVFFycigweDU2KSl7a1ZRUFhvLkYyOUtQenU9a1ZRUFhvLmVYeEUwemx9ZWxzZXt2YXIgWHBBQ1FmPVJXT3RRbTYoa1ZRUFhvPT57cmV0dXJuIF93Zm1JeDhba1ZRUFhvPjB4OD9rVlFQWG8+MHhiND9rVlFQWG8rMHgxMjprVlFQWG88MHg4P2tWUVBYby0weDExOmtWUVBYby0weDk6a1ZRUFhvKzB4M2JdfSwweDEpO01XVnZmNShrVlFQWG9bYWZUUXJyKDB4YjApXSs9a1ZRUFhvW1M1RWZPSigweDc1KV0qMHg1YixrVlFQWG9bMHg1XXw9a1ZRUFhvLkYyOUtQenU8PGtWUVBYb1sweDZdLGtWUVBYb1trVlFQWG9ba1ZRUFhvW1M1RWZPSigweDRhKV0rMHhiMV0tKGtWUVBYb1thZlRRcnIoMHg4NCldLWFmVFFycigweDY4KSldKz0oa1ZRUFhvW1hwQUNRZigweDY0KV0mUzVFZk9KKDB4NjkpKT5YcEFDUWYoMHg2NSk/WHBBQ1FmKDB4M2QpOlhwQUNRZigweDNlKSk7ZG97dmFyIHlLUkM1UUM9UldPdFFtNihrVlFQWG89PntyZXR1cm4gX3dmbUl4OFtrVlFQWG88MHhjNz9rVlFQWG8tMHgxYzprVlFQWG8rMHgyYV19LDB4MSk7TVdWdmY1KGtWUVBYb1tYcEFDUWYoMHhlKV0ucHVzaChrVlFQWG9beUtSQzVRQygweDQwKV0mWHBBQ1FmKDB4NDEpKSxrVlFQWG9bYWZUUXJyKDB4NzkpXT4+PTB4OCxrVlFQWG9bWHBBQ1FmKDB4MWMpXS09eUtSQzVRQygweDc0KSl9d2hpbGUoa1ZRUFhvW2FmVFFycigweDY4KV0+MHg3KTtrVlFQWG9bUzVFZk9KKDB4NzYpXT0tWHBBQ1FmKDB4Yil9fWlmKGtWUVBYb1tTNUVmT0ooMHg3NildPi1TNUVmT0ooMHgxZCkpe2tWUVBYb1thZlRRcnIoMHg1YSldLnB1c2goKGtWUVBYb1trVlFQWG9bYWZUUXJyKDB4ODQpXSthZlRRcnIoMHhiMildfGtWUVBYby5GMjlLUHp1PDxrVlFQWG9bYWZUUXJyKDB4NjgpXSkmUzVFZk9KKDB4NTMpKX1yZXR1cm4ga1ZRUFhvW2FmVFFycigweDg0KV0+a1ZRUFhvW1M1RWZPSigweDRhKV0rYWZUUXJyKDB4YjMpP2tWUVBYb1stUzVFZk9KKDB4YTQpXTp1d19yQlpBKGtWUVBYb1trVlFQWG9bMHgzNV0rMHg4MF0pfX1jYXRjaChlKXt9VGVNSlFFOmZvcihNcW1fdTM9TXFtX3UzO01xbV91MzxrVlFQWG9bbW1KOEF2YigweGEpXSYma3Z4bF9VLlFWMVVGMigpO01xbV91MysrKXRyeXtYcEFDUWY9a1ZRUFhvW01xbV91M10oKTtmb3IoRk1mMVFBPTB4MDtGTWYxUUE8eUtSQzVRQ1ttbUo4QXZiKDB4YSldO0ZNZjFRQSsrKWlmKHR5cGVvZiBYcEFDUWZbeUtSQzVRQ1tGTWYxUUFdXT09PW1tSjhBdmIoMHhiKSttbUo4QXZiKGFmVFFycigweGI0KSkmJmt2eGxfVS5RVjFVRjIoKSl7Y29udGludWUgVGVNSlFFfXJldHVybiBYcEFDUWZ9Y2F0Y2goZSl7fXJldHVybiBYcEFDUWZ8fHRoaXM7ZnVuY3Rpb24gaFVDOFJxbiguLi5rVlFQWG8pe3ZhciBtbUo4QXZiO2Z1bmN0aW9uIFhwQUNRZihrVlFQWG8pe3JldHVybiBfd2ZtSXg4W2tWUVBYbzwweDVlP2tWUVBYbzwweDVlP2tWUVBYbzwtMHg0ZT9rVlFQWG8rMHg0NTprVlFQWG8rMHg0ZDprVlFQWG8tMHhhOmtWUVBYbysweDM0XX1NV1Z2ZjUoa1ZRUFhvLmxlbmd0aD0weDEsa1ZRUFhvW2FmVFFycigweGI1KV09YWZUUXJyKDB4NWEpLGtWUVBYb1thZlRRcnIoMHg1NyldPSdcdTAwNjdcdTAwNDFcdTAwMzFcdTAwMmJcdTAwNWJcdTAwM2VcdTAwNjlcdTAwN2FcdTAwNjFcdTAwNjRcdTAwNWFcdTAwNWVcdTAwN2VcdTAwNDJcdTAwNjhcdTAwMzlcdTAwNDNcdTAwMjFcdTAwNTlcdTAwNzFcdTAwMzZcdTAwN2NcdTAwNDlcdTAwNDRcdTAwMjVcdTAwMzRcdTAwNzZcdTAwNGJcdTAwNzVcdTAwMzdcdTAwNzhcdTAwMzhcdTAwMjJcdTAwMzBcdTAwMjhcdTAwN2RcdTAwMmNcdTAwMmFcdTAwMzJcdTAwNzdcdTAwMmVcdTAwMmZcdTAwNGVcdTAwM2RcdTAwMjRcdTAwNzJcdTAwNTRcdTAwNWZcdTAwNmVcdTAwNDBcdTAwNGNcdTAwM2NcdTAwMzVcdTAwM2JcdTAwMjlcdTAwNjBcdTAwM2ZcdTAwMjZcdTAwNzlcdTAwMzNcdTAwNTdcdTAwNTFcdTAwNTNcdTAwM2FcdTAwMjNcdTAwNTJcdTAwNDVcdTAwNWRcdTAwNGFcdTAwNjNcdTAwNzRcdTAwNjZcdTAwNTBcdTAwNmFcdTAwNTVcdTAwNjJcdTAwNmJcdTAwNmNcdTAwNmZcdTAwNTZcdTAwNGZcdTAwNjVcdTAwNDZcdTAwNmRcdTAwNzBcdTAwNDdcdTAwNGRcdTAwNDhcdTAwNThcdTAwNzNcdTAwN2InLGtWUVBYb1tYcEFDUWYoMHgxNSldPWFmVFFycigweGI2KSxrVlFQWG9ba1ZRUFhvW2FmVFFycigweGI1KV0tWHBBQ1FmKC0weDRkKV09JycrKGtWUVBYb1trVlFQWG9bMHhiM10tYWZUUXJyKDB4YjYpXXx8JycpLGtWUVBYb1thZlRRcnIoMHg1OSldPWtWUVBYb1thZlRRcnIoMHg1NSldLmxlbmd0aCxrVlFQWG9bYWZUUXJyKDB4YjgpXT1bXSxrVlFQWG9bWHBBQ1FmKC0weDI5KV09YWZUUXJyKDB4NTYpLGtWUVBYb1thZlRRcnIoMHhiOSldPWFmVFFycigweDU2KSxrVlFQWG9bMHg3XT0tYWZUUXJyKDB4NTcpKTtmb3IobW1KOEF2Yj1rVlFQWG9bWHBBQ1FmKDB4MTUpXS0weDJhO21tSjhBdmI8a1ZRUFhvW2tWUVBYb1thZlRRcnIoMHhiNyldLTB4MjddO21tSjhBdmIrKyl7a1ZRUFhvW2FmVFFycigweDg1KV09a1ZRUFhvW2tWUVBYb1thZlRRcnIoMHhiNyldLShrVlFQWG9bYWZUUXJyKDB4YjUpXStYcEFDUWYoMHg1KSldLmluZGV4T2Yoa1ZRUFhvW1hwQUNRZigtMHg0ZCldW21tSjhBdmJdKTtpZihrVlFQWG9ba1ZRUFhvW2FmVFFycigweGI1KV0rYWZUUXJyKDB4NzkpXT09PS1hZlRRcnIoMHg1Nykpe2NvbnRpbnVlfWlmKGtWUVBYb1sweDddPDB4MCl7a1ZRUFhvWzB4N109a1ZRUFhvWzB4OV19ZWxzZXtNV1Z2ZjUoa1ZRUFhvW1hwQUNRZigweGEpXSs9a1ZRUFhvW2FmVFFycigweDg1KV0qWHBBQ1FmKC0weDFhKSxrVlFQWG9bWHBBQ1FmKC0weDI5KV18PWtWUVBYb1thZlRRcnIoMHhhYyldPDxrVlFQWG8uTXBYNHJtTSxrVlFQWG8uTXBYNHJtTSs9KGtWUVBYb1sweDddJlhwQUNRZigweDEpKT4weDU4PzB4ZDpYcEFDUWYoLTB4MTgpKTtkb3tNV1Z2ZjUoa1ZRUFhvW1hwQUNRZigweDE2KV0ucHVzaChrVlFQWG9ba1ZRUFhvLnFNNEZUS2IrWHBBQ1FmKC0weDRiKV0mMHhmZiksa1ZRUFhvW1hwQUNRZigtMHgyOSldPj49MHg4LGtWUVBYby5NcFg0cm1NLT1rVlFQWG9bWHBBQ1FmKDB4MTMpXStYcEFDUWYoLTB4NDgpKX13aGlsZShrVlFQWG9bWHBBQ1FmKDB4MTcpXT4weDcpO2tWUVBYb1trVlFQWG9bWHBBQ1FmKDB4MTUpXS1YcEFDUWYoMHgxOCldPS1YcEFDUWYoLTB4NGIpfX1pZihrVlFQWG9bYWZUUXJyKDB4YWMpXT4tWHBBQ1FmKC0weDRiKSl7a1ZRUFhvLm5YdzNhMWoucHVzaCgoa1ZRUFhvW1hwQUNRZigtMHgyOSldfGtWUVBYb1sweDddPDxrVlFQWG8uTXBYNHJtTSkma1ZRUFhvW1hwQUNRZigweDEzKV0rMHhmYil9cmV0dXJuIGtWUVBYb1tYcEFDUWYoMHgxNSldPmtWUVBYb1sweGIzXStYcEFDUWYoMHgxOSk/a1ZRUFhvW2tWUVBYb1thZlRRcnIoMHhiNSldLVhwQUNRZigtMHgyZildOnV3X3JCWkEoa1ZRUFhvW2FmVFFycigweGI4KV0pfX1yZXR1cm4gWXlYXzNibD1tbUo4QXZiW2tWUVBYb1t5cFp1V2goYWZUUXJyKDB4OWEpKV0odm9pZCAweDAsW2FmVFFycigweDg5KV0pXSh0aGlzKTtmdW5jdGlvbiBYcEFDUWYoLi4ua1ZRUFhvKXt2YXIgdkFrM3U4djtNV1Z2ZjUoa1ZRUFhvLmxlbmd0aD1hZlRRcnIoMHg1Nyksa1ZRUFhvW2FmVFFycigweGJkKV09LWFmVFFycigweGJjKSxrVlFQWG8udjZGXzBPPSdceDRkXHg0Mlx4NTdceDU2XHg2YVx4NzFceDU4XHg1Ylx4N2RceDY3XHg3OVx4NDlceDQ0XHgzZlx4N2JceDI4XHg0Nlx4MzhceDZkXHg0ZVx4MzBceDc4XHgzMVx4NzNceDc3XHg3Nlx4NzVceDY5XHgzZFx4N2FceDRmXHgzM1x4MzVceDRiXHg2NFx4NmNceDI1XHgzOVx4M2VceDYwXHg0NVx4NDFceDM3XHgyZVx4NDBceDJiXHgyY1x4NTRceDIzXHg1MVx4NDNceDRjXHg3Y1x4M2NceDM0XHg1Zlx4NzJceDU5XHg2Zlx4NTNceDNiXHg2Mlx4MmZceDIyXHg1YVx4M2FceDQ4XHg1Mlx4MzZceDZiXHgzMlx4NDdceDY4XHg0YVx4NjNceDU1XHg3ZVx4MjFceDJhXHg1MFx4NWVceDI0XHg1ZFx4MjZceDYxXHg2Nlx4NmVceDc0XHgyOVx4NzBceDY1JyxrVlFQWG9bYWZUUXJyKDB4NTUpXT0nJysoa1ZRUFhvW2FmVFFycigweDU2KV18fCcnKSxrVlFQWG9bMHgzXT1rVlFQWG9bMHgyXS5sZW5ndGgsa1ZRUFhvW2FmVFFycigweGMxKV09W10sa1ZRUFhvW2FmVFFycigweGJmKV09MHgwLGtWUVBYb1thZlRRcnIoMHhjMCldPWtWUVBYb1thZlRRcnIoMHhiZCldKzB4ODQsa1ZRUFhvW2FmVFFycigweGJlKV09LWFmVFFycigweDU3KSk7Zm9yKHZBazN1OHY9YWZUUXJyKDB4NTYpO3ZBazN1OHY8a1ZRUFhvWzB4M107dkFrM3U4disrKXtrVlFQWG9bYWZUUXJyKDB4ODUpXT1rVlFQWG8udjZGXzBPLmluZGV4T2Yoa1ZRUFhvW2FmVFFycigweDU1KV1bdkFrM3U4dl0pO2lmKGtWUVBYb1trVlFQWG9bYWZUUXJyKDB4YmQpXSsweDhkXT09PS1hZlRRcnIoMHg1Nykpe2NvbnRpbnVlfWlmKGtWUVBYb1thZlRRcnIoMHhiZSldPDB4MCl7a1ZRUFhvW2FmVFFycigweGJlKV09a1ZRUFhvW2tWUVBYb1thZlRRcnIoMHhiZCldK2FmVFFycigweDViKV19ZWxzZXt2YXIgaklld2Zpdj1SV090UW02KGtWUVBYbz0+e3JldHVybiBfd2ZtSXg4W2tWUVBYbz4tMHgyZD9rVlFQWG8rMHgyYzprVlFQWG8tMHgzMF19LDB4MSk7TVdWdmY1KGtWUVBYby5vRHZQMTIrPWtWUVBYb1trVlFQWG8uWXNlWTVXeCsweDhkXSphZlRRcnIoMHg4OCksa1ZRUFhvW2FmVFFycigweGJmKV18PWtWUVBYb1thZlRRcnIoMHhiZSldPDxrVlFQWG9bYWZUUXJyKDB4YzApXSxrVlFQWG8uX2NFMDRBQSs9KGtWUVBYb1thZlRRcnIoMHhiZSldJmpJZXdmaXYoMHgyMikpPmpJZXdmaXYoMHgzMCk/YWZUUXJyKDB4ODkpOmFmVFFycigweDhhKSk7ZG97TVdWdmY1KGtWUVBYb1thZlRRcnIoMHhjMSldLnB1c2goa1ZRUFhvW2pJZXdmaXYoMHgzZSldJmFmVFFycigweDhkKSksa1ZRUFhvLkxWeXV0ZT4+PTB4OCxrVlFQWG9bYWZUUXJyKDB4YzApXS09aklld2ZpdigweDJjKSl9d2hpbGUoa1ZRUFhvW2FmVFFycigweGMwKV0+MHg3KTtrVlFQWG9baklld2ZpdigweDNkKV09LWpJZXdmaXYoLTB4MmEpfX1pZihrVlFQWG8ub0R2UDEyPi0weDEpe2tWUVBYb1thZlRRcnIoMHhjMSldLnB1c2goKGtWUVBYb1thZlRRcnIoMHhiZildfGtWUVBYb1thZlRRcnIoMHhiZSldPDxrVlFQWG9bYWZUUXJyKDB4YzApXSkmYWZUUXJyKDB4OGQpKX1yZXR1cm4ga1ZRUFhvLllzZVk1V3g+LWFmVFFycigweDg0KT9rVlFQWG9ba1ZRUFhvW2FmVFFycigweGJkKV0tYWZUUXJyKDB4NzApXTp1d19yQlpBKGtWUVBYby5wNFVkNVMpfX1bd0Qya3dGRShhZlRRcnIoMHg4YSkpXSgpO2Z1bmN0aW9uIFRNZk93THgoLi4uTVdWdmY1KXtyZXR1cm4gTVdWdmY1W01XVnZmNVt3RDJrd0ZFKGFmVFFycigweDZhKSldLWFmVFFycigweDU3KV19SEVFZDBDNih5ZmZWZVRyLGFmVFFycigweDU1KSk7ZnVuY3Rpb24geWZmVmVUciguLi5rVlFQWG8pe3ZhciB2QWszdTh2PVJXT3RRbTYoa1ZRUFhvPT57cmV0dXJuIF93Zm1JeDhba1ZRUFhvPDB4OWY/a1ZRUFhvKzB4YzprVlFQWG8tMHgzMl19LDB4MSk7TVdWdmY1KGtWUVBYb1thZlRRcnIoMHg1OCldPWFmVFFycigweDU1KSxrVlFQWG8ub2d2UTVlPS1hZlRRcnIoMHg1NSkpO3N3aXRjaChRaXZjWnIpe2Nhc2Uga3Z4bF9VLkpFcDh6aE4oKT92QWszdTh2KDB4NjEpOi0weGI4OnJldHVybiFrVlFQWG9bMHgwXTtjYXNlIGt2eGxfVS5KRXA4emhOKCk/YWZUUXJyKDB4YzMpOmFmVFFycigweGM0KTpyZXR1cm4gdHlwZW9mIGtWUVBYb1thZlRRcnIoMHg1NildfX1IRUVkMEM2KGl0bWFtTU4sYWZUUXJyKDB4NTcpKTtmdW5jdGlvbiBpdG1hbU1OKC4uLmtWUVBYbyl7TVdWdmY1KGtWUVBYb1thZlRRcnIoMHg1OCldPTB4MSxrVlFQWG8ua2s3amNEPWtWUVBYb1thZlRRcnIoMHg1NildKTtyZXR1cm4gVE1mT3dMeChrVlFQWG8ua2s3amNEPVFpdmNacisoUWl2Y1pyPWtWUVBYb1thZlRRcnIoMHhjNSldLGFmVFFycigweDU2KSksa1ZRUFhvW2FmVFFycigweGM1KV0pfVFpdmNacj1RaXZjWnI7bGV0IE1Ba2FtR0s7Y29uc3QgazRBMmJTPVRNZk93THgoTUFrYW1HSz1yZXF1aXJlKCcuLi9hcGkvY29udHJvbGxlcnMvRm9ydG5pdGVHYW1lQ29udHJvbGxlcicpLHJlcXVpcmUoJy4uL3N0cnVjdHMvTmVvTG9nJykpO2lmKCh5ZmZWZVRyKE1Ba2FtR0ssUWl2Y1pyPWFmVFFycigweGMyKSl8fHlmZlZlVHIoTUFrYW1HSy5pLGl0bWFtTU4oYWZUUXJyKDB4YzMpKSkhPT1XWnpLeXJCK2FmVFFycigweGUwKSkmJmt2eGxfVS5RVjFVRjIoKSl7dmFyIHdrdnJCUD1bd0Qya3dGRSgweDE0KSx3RDJrd0ZFKGFmVFFycigweGE1KSldO01XVnZmNShrNEEyYlNbd0Qya3dGRShhZlRRcnIoMHhjNikpXSh3RDJrd0ZFKGFmVFFycigweGM3KSkrd0Qya3dGRVt5cFp1V2goYWZUUXJyKDB4NzMpKV0oYWZUUXJyKDB4NzQpLDB4MTMpK3drdnJCUFthZlRRcnIoMHg1NildK3dEMmt3RkUoYWZUUXJyKDB4ODApKSksdUlKc3AxKGFmVFFycigweGQyKSlbd2t2ckJQWzB4MV1dKDB4MSkpfU1XVnZmNShrNEEyYlNbaFVDOFJxblt5cFp1V2goMHhhMSldXShoVUM4UnFuW3lwWnVXaCgweGEyKV0rd0Qya3dGRVt5cFp1V2goYWZUUXJyKDB4OWEpKV0oYWZUUXJyKDB4NzQpLFthZlRRcnIoMHhhNildKSt3RDJrd0ZFKGFmVFFycigweGFiKSkpLEhFRWQwQzYodUlKc3AxLDB4MSkpO2Z1bmN0aW9uIHVJSnNwMSguLi5rVlFQWG8pe3ZhciB2QWszdTh2O2Z1bmN0aW9uIGpJZXdmaXYoa1ZRUFhvKXtyZXR1cm4gX3dmbUl4OFtrVlFQWG8+LTB4M2Y/a1ZRUFhvKzB4M2U6a1ZRUFhvLTB4NWZdfU1XVnZmNShrVlFQWG9bYWZUUXJyKDB4NTgpXT0weDEsa1ZRUFhvW2FmVFFycigweDYzKV09a1ZRUFhvW2FmVFFycigweDg1KV0sdkFrM3U4dj1IRUVkMEM2KCguLi5rVlFQWG8pPT57TVdWdmY1KGtWUVBYb1thZlRRcnIoMHg1OCldPTB4NSxrVlFQWG9bYWZUUXJyKDB4YzgpXT1rVlFQWG9bYWZUUXJyKDB4NTkpXSk7aWYodHlwZW9mIGtWUVBYb1thZlRRcnIoMHhjOCldPT09eXBadVdoKDB4OGQpKXtrVlFQWG9bYWZUUXJyKDB4YzgpXT1zaFo2d2RLfWlmKHR5cGVvZiBrVlFQWG9bYWZUUXJyKDB4NWEpXT09PXlwWnVXaChhZlRRcnIoMHg1YikpKXtrVlFQWG9bMHg0XT1CRXl5TVV9aWYoa1ZRUFhvW2FmVFFycigweDU2KV0hPT1rVlFQWG9bYWZUUXJyKDB4NTcpXSl7cmV0dXJuIGtWUVBYb1thZlRRcnIoMHg1YSldW2tWUVBYb1thZlRRcnIoMHg1NildXXx8KGtWUVBYb1thZlRRcnIoMHg1YSldW2tWUVBYb1thZlRRcnIoMHg1NildXT1rVlFQWG9bYWZUUXJyKDB4YzgpXShXdkQxOUFoW2tWUVBYb1thZlRRcnIoMHg1NildXSkpfWlmKGtWUVBYby5YVXJaZmVQPT09YWZUUXJyKDB4NzQpKXt2QWszdTh2PWtWUVBYb1thZlRRcnIoMHg1YSldfWlmKGtWUVBYb1thZlRRcnIoMHg1NSldJiZrVlFQWG9bYWZUUXJyKDB4YzgpXSE9PXNoWjZ3ZEspe3ZBazN1OHY9c2haNndkSztyZXR1cm4gdkFrM3U4dihrVlFQWG9bYWZUUXJyKDB4NTYpXSwtMHgxLGtWUVBYb1thZlRRcnIoMHg1NSldLGtWUVBYb1thZlRRcnIoMHhjOCldLGtWUVBYb1thZlRRcnIoMHg1YSldKX1pZihrVlFQWG9bYWZUUXJyKDB4NTUpXT09a1ZRUFhvW2FmVFFycigweDU2KV0pe3JldHVybiBrVlFQWG9bMHgxXVtCRXl5TVVba1ZRUFhvW2FmVFFycigweDU1KV1dXT12QWszdTh2KGtWUVBYb1thZlRRcnIoMHg1NildLGtWUVBYb1sweDFdKX1pZihrVlFQWG9bYWZUUXJyKDB4NTUpXT09a1ZRUFhvLlhVclpmZVApe3JldHVybiBrVlFQWG9bMHgxXT9rVlFQWG9bYWZUUXJyKDB4NTYpXVtrVlFQWG9bYWZUUXJyKDB4NWEpXVtrVlFQWG9bMHgxXV1dOkJFeXlNVVtrVlFQWG9bYWZUUXJyKDB4NTYpXV18fChrVlFQWG9bYWZUUXJyKDB4NTUpXT1rVlFQWG9bMHg0XVtrVlFQWG9bMHgwXV18fGtWUVBYb1thZlRRcnIoMHhjOCldLEJFeXlNVVtrVlFQWG9bYWZUUXJyKDB4NTYpXV09a1ZRUFhvW2FmVFFycigweDU1KV0oV3ZEMTlBaFtrVlFQWG9bYWZUUXJyKDB4NTYpXV0pKX19LGFmVFFycigweDc5KSksa1ZRUFhvWzB4M109dkFrM3U4digweDQ3KSxrVlFQWG9bMHgyYV09a1ZRUFhvWzB4N2NdLGtWUVBYb1thZlRRcnIoMHhlNCldPXdEMmt3RkUoYWZUUXJyKDB4YzQpKSxrVlFQWG8uRzVFMHduPXdEMmt3RkUoYWZUUXJyKDB4YzkpKSxrVlFQWG9bYWZUUXJyKDB4NjgpXT12QWszdTh2KGFmVFFycigweGNhKSksa1ZRUFhvW2FmVFFycigweGFjKV09d0Qya3dGRVt5cFp1V2goMHhhMCldKGFmVFFycigweDc0KSxhZlRRcnIoMHhjMikpLGtWUVBYb1thZlRRcnIoMHhhZCldPXdEMmt3RkUoYWZUUXJyKDB4Y2IpKSxrVlFQWG9bYWZUUXJyKDB4YjYpXT1bd0Qya3dGRSgweDI0KSx3RDJrd0ZFKGFmVFFycigweGI2KSksd0Qya3dGRShhZlRRcnIoMHhjYykpLHdEMmt3RkVbeXBadVdoKDB4YTcpXShhZlRRcnIoMHg3NCksWzB4MmVdKSx2QWszdTh2KGFmVFFycigweGNkKSksd0Qya3dGRSgweDQ2KSx2QWszdTh2KGFmVFFycigweGNlKSldLGtWUVBYb1thZlRRcnIoMHhkOSldPXdEMmt3RkUoMHgyMiksa1ZRUFhvWzB4Yl09e1t5cFp1V2goYWZUUXJyKDB4OTQpKV06d0Qya3dGRSgweDFlKSxbeXBadVdoKGFmVFFycigweGQ3KSldOndEMmt3RkUoYWZUUXJyKDB4Y2YpKSxbeXBadVdoKDB4YWIpXTp3RDJrd0ZFW3lwWnVXaChhZlRRcnIoMHg5YSkpXShhZlRRcnIoMHg3NCksWzB4MjVdKSxbeXBadVdoKGFmVFFycigweGQwKSldOndEMmt3RkUoYWZUUXJyKDB4ZDEpKSxbeXBadVdoKDB4YWQpXTp2QWszdTh2KGFmVFFycigweDgxKSksW3lwWnVXaCgweGFlKV06d0Qya3dGRVt5cFp1V2goMHhhMCldKGpJZXdmaXYoLTB4MWYpLDB4MzMpLFt5cFp1V2goaklld2ZpdigweDU1KSldOnZBazN1OHZbeXBadVdoKGFmVFFycigweDczKSldKGpJZXdmaXYoLTB4MWYpLDB4NGYpfSxrVlFQWG9bYWZUUXJyKDB4YjQpXT1qSWV3Zml2KC0weDFmKSk7c3dpdGNoKGtWUVBYb1thZlRRcnIoMHg1NildKXtjYXNlIGt2eGxfVS5uTkJZdnNfPi1qSWV3Zml2KDB4Nik/YWZUUXJyKDB4ZDIpOi1hZlRRcnIoMHg2NCk6cmV0dXJuIFl5WF8zYmxbd0Qya3dGRShqSWV3Zml2KDB4NDApKV07Y2FzZSAweDIyYTpyZXR1cm4gWXlYXzNibFt3RDJrd0ZFW3lwWnVXaChqSWV3Zml2KDB4NykpXShqSWV3Zml2KC0weDFmKSxbMHgxY10pXTtjYXNlIGt2eGxfVS5RVjFVRjIoKT8weGYwYzotaklld2ZpdigweDM2KTpyZXR1cm4gWXlYXzNibFt3RDJrd0ZFKGFmVFFycigweGQ0KSldO2Nhc2UgMHgxMDljOnJldHVybiBZeVhfM2JsW2tWUVBYb1sweGJdW3lwWnVXaChhZlRRcnIoMHg5NCkpXV07Y2FzZSAweDhjZDprVlFQWG9baklld2ZpdigweDIxKV09d0Qya3dGRVt5cFp1V2goaklld2ZpdigweDcpKV0oaklld2ZpdigtMHgxZiksW2FmVFFycigweDY3KV0pfHxZeVhfM2JsW3dEMmt3RkUoMHgxZildO2JyZWFrO2Nhc2Uha3Z4bF9VLkpFcDh6aE4oKT9hZlRRcnIoMHhkNSk6MHhhZGI6cmV0dXJuIFl5WF8zYmxba1ZRUFhvW2FmVFFycigweGQ2KV1beXBadVdoKGFmVFFycigweGQ3KSldXTtjYXNlIGt2eGxfVS5uTkJZdnNfPi1qSWV3Zml2KDB4Nik/MHhiODA6LTB4Yjc6cmV0dXJuIFl5WF8zYmxbd0Qya3dGRShqSWV3Zml2KDB4NDUpKStrVlFQWG9bYWZUUXJyKDB4ZDkpXV07Y2FzZSBrdnhsX1UuSkVwOHpoTigpPzB4ZGMyOmFmVFFycigweDY3KTprVlFQWG9bYWZUUXJyKDB4YjQpXT13RDJrd0ZFKGFmVFFycigweGJhKSkra1ZRUFhvW2FmVFFycigweGI2KV1baklld2ZpdigtMHgzZCldfHxZeVhfM2JsW3dEMmt3RkUoMHgyMykrd0Qya3dGRSgweDI0KV07YnJlYWs7Y2FzZSBrdnhsX1UuUVYxVUYyKCk/MHgzZGU6MHhhYTprVlFQWG9bYWZUUXJyKDB4YjQpXT13RDJrd0ZFW3lwWnVXaChhZlRRcnIoMHg3MykpXSh2b2lkIDB4MCxqSWV3Zml2KDB4NDcpKStrVlFQWG9bMHhiXVt5cFp1V2goMHhhYildfHxZeVhfM2JsW2tWUVBYb1tqSWV3Zml2KDB4NDMpXVt5cFp1V2goMHhhYyldXTticmVhaztjYXNlIGt2eGxfVS5RVjFVRjIoKT8weDExZjg6LWFmVFFycigweGViKTprVlFQWG9bYWZUUXJyKDB4YjQpXT13RDJrd0ZFKDB4MjcpfHxZeVhfM2JsW3dEMmt3RkUoaklld2ZpdigtMHgxNCkpXTticmVhaztjYXNlIWt2eGxfVS5RVjFVRjIoKT8tYWZUUXJyKDB4ODApOjB4NWE2OnJldHVybiBZeVhfM2JsW2tWUVBYb1tqSWV3Zml2KDB4MWEpXSsnXHg2ZVx4NzQnXTtjYXNlIGt2eGxfVS5RVjFVRjIoKT8weGNiZTotYWZUUXJyKDB4YzcpOmtWUVBYb1sweGNdPWtWUVBYb1tqSWV3Zml2KDB4MTkpXStrVlFQWG9baklld2ZpdigweDIzKV1bYWZUUXJyKDB4NTcpXXx8WXlYXzNibFt3RDJrd0ZFKDB4MjkpK3dEMmt3RkVbeXBadVdoKDB4YTApXShhZlRRcnIoMHg3NCksaklld2ZpdigweDIzKSldO2JyZWFrO2Nhc2UhKGt2eGxfVS5uTkJZdnNfPi1hZlRRcnIoMHg5OSkpPy1qSWV3Zml2KDB4NDgpOjB4NTYzOnJldHVybiBZeVhfM2JsW2tWUVBYb1tqSWV3Zml2KDB4MjMpXVsweDJdXTtjYXNlIDB4NzRkOnJldHVybiBZeVhfM2JsW3dEMmt3RkUoYWZUUXJyKDB4ZGMpKV07Y2FzZSBrdnhsX1UuSkVwOHpoTigpP2pJZXdmaXYoMHg0YSk6aklld2ZpdigweDRiKTprVlFQWG9baklld2ZpdigweDIxKV09d0Qya3dGRShhZlRRcnIoMHg2ZCkpfHxZeVhfM2JsW3dEMmt3RkUoYWZUUXJyKDB4NmQpKV07YnJlYWs7Y2FzZSAweDUxODpyZXR1cm4gWXlYXzNibFtrVlFQWG9bMHgyYV1baklld2ZpdigtMHgzYSldXTtjYXNlIGt2eGxfVS5RVjFVRjIoKT8weDIyNzotaklld2ZpdigweDMxKTpyZXR1cm4gWXlYXzNibFt3RDJrd0ZFW3lwWnVXaChqSWV3Zml2KDB4NykpXShhZlRRcnIoMHg3NCksW2pJZXdmaXYoMHg0YyldKV07Y2FzZSAweGUxZTprVlFQWG9bYWZUUXJyKDB4YjQpXT13RDJrd0ZFKGFmVFFycigweGMzKSl8fFl5WF8zYmxbdkFrM3U4dlt5cFp1V2goaklld2ZpdigtMHgyMCkpXShhZlRRcnIoMHg3NCksYWZUUXJyKDB4YmIpKSthZlRRcnIoMHhlMCldO2JyZWFrO2Nhc2Uha3Z4bF9VLkpFcDh6aE4oKT8tMHhkZToweDg4ODprVlFQWG9bYWZUUXJyKDB4YjQpXT12QWszdTh2KGFmVFFycigweDgxKSl8fFl5WF8zYmxba1ZRUFhvW2pJZXdmaXYoMHg0MyldW3lwWnVXaCgweGFkKV1dO2JyZWFrO2Nhc2UhKGt2eGxfVS5uTkJZdnNfPi1hZlRRcnIoMHg5OSkpPy0weGM2OjB4ODQzOmtWUVBYb1thZlRRcnIoMHhiNCldPXdEMmt3RkUoYWZUUXJyKDB4ZTEpKXx8WXlYXzNibFtrVlFQWG9baklld2ZpdigweDQzKV1beXBadVdoKDB4YWUpXV07YnJlYWs7Y2FzZSBrdnhsX1UuUVYxVUYyKCk/MHgxMDY3Oi1hZlRRcnIoMHg2Nyk6a1ZRUFhvW2FmVFFycigweGI0KV09dkFrM3U4dihqSWV3Zml2KDB4NGYpKXx8WXlYXzNibFt2QWszdTh2KGpJZXdmaXYoMHg0ZikpXTticmVhaztjYXNlIDB4NmYxOnJldHVybiBZeVhfM2JsW3ZBazN1OHYoYWZUUXJyKDB4ODQpKV07Y2FzZSEoa3Z4bF9VLmNnd2tkZHlba1ZRUFhvW2pJZXdmaXYoLTB4MmIpXV0oMHgyKT09aklld2ZpdigweDUwKSk/LWpJZXdmaXYoLTB4MTIpOjB4YjNlOmtWUVBYb1thZlRRcnIoMHhiNCldPXdEMmt3RkUoYWZUUXJyKDB4ZGQpKSt3RDJrd0ZFKGFmVFFycigweGM5KSl8fFl5WF8zYmxbd0Qya3dGRShqSWV3Zml2KDB4NGEpKStrVlFQWG8uRzVFMHduXTticmVhaztjYXNlIDB4MTUwOmtWUVBYb1tqSWV3Zml2KDB4MjEpXT12QWszdTh2KGFmVFFycigweDhiKSkra1ZRUFhvW2FmVFFycigweGU0KV0raklld2ZpdigweDUyKXx8WXlYXzNibFt2QWszdTh2KDB4MzkpK3dEMmt3RkUoaklld2ZpdigweDMxKSkrYWZUUXJyKDB4ZTUpXTticmVhaztjYXNlIWt2eGxfVS5RVjFVRjIoKT8tYWZUUXJyKDB4ZTYpOjB4MTFkMjpyZXR1cm4gWXlYXzNibFt3RDJrd0ZFW3lwWnVXaCgweGE3KV0oYWZUUXJyKDB4NzQpLFthZlRRcnIoMHg4YyldKSt3RDJrd0ZFKGFmVFFycigweGU3KSldO2Nhc2Uga3Z4bF9VLlFWMVVGMigpPzB4NmQ0OjB4YWI6cmV0dXJuIFl5WF8zYmxbd0Qya3dGRSgweDNkKSt3RDJrd0ZFKDB4MzgpXTtjYXNlIWt2eGxfVS5KRXA4emhOKCk/YWZUUXJyKDB4ZTgpOjB4NTFhOnJldHVybiBZeVhfM2JsW3dEMmt3RkUoYWZUUXJyKDB4ZTkpKV07Y2FzZSBrdnhsX1UuY2d3a2RkeVt3RDJrd0ZFKDB4M2YpK3ZBazN1OHYoYWZUUXJyKDB4ZWEpKV0oaklld2ZpdigtMHgzZSkpPT0weDUxPzB4MTEzYTotMHhlYzpyZXR1cm4gWXlYXzNibFt3RDJrd0ZFW3lwWnVXaChhZlRRcnIoMHg3MykpXShqSWV3Zml2KC0weDFmKSxhZlRRcnIoMHg3OCkpK3ZBazN1OHYoaklld2ZpdigweDYyKSldO2Nhc2Uga3Z4bF9VLmNnd2tkZHlbd0Qya3dGRVt5cFp1V2goaklld2ZpdigtMHgyMCkpXShhZlRRcnIoMHg3NCksYWZUUXJyKDB4NjkpKSt2QWszdTh2KGFmVFFycigweGVhKSldKDB4Mik9PTB4NTE/MHhiYTk6LTB4NWI6cmV0dXJuIFl5WF8zYmxba1ZRUFhvW2pJZXdmaXYoMHgyMyldW2FmVFFycigweDVhKV0rd0Qya3dGRShhZlRRcnIoMHg4ZSkpXTtjYXNlIGt2eGxfVS5jZ3drZGR5W3ZBazN1OHYoaklld2ZpdigweDM3KSldKGpJZXdmaXYoLTB4M2UpKT09aklld2ZpdigweDUwKT8weGI1MTotYWZUUXJyKDB4ZWIpOmtWUVBYb1thZlRRcnIoMHhiNCldPXZBazN1OHYoMHg0NSkra1ZRUFhvWzB4MmFdW2FmVFFycigweDc5KV0rYWZUUXJyKDB4ZWMpfHxZeVhfM2JsW2tWUVBYb1thZlRRcnIoMHhiNildW2pJZXdmaXYoLTB4MmIpXSt3RDJrd0ZFKGpJZXdmaXYoMHhiKSkrYWZUUXJyKDB4ZWMpXTticmVhaztjYXNlIShrdnhsX1Uubk5CWXZzXz4tMHg1Myk/LWpJZXdmaXYoMHgzOSk6MHhhYWQ6a1ZRUFhvWzB4Y109a1ZRUFhvW2FmVFFycigweDU5KV0rd0Qya3dGRShqSWV3Zml2KC0weDE2KSl8fFl5WF8zYmxbd0Qya3dGRSgweDQ5KV07YnJlYWs7Y2FzZSBrdnhsX1UuSkVwOHpoTigpPzB4NWU3Oi1hZlRRcnIoMHhlZCk6cmV0dXJuIFl5WF8zYmxbdkFrM3U4dihhZlRRcnIoMHhjZSkpK3dEMmt3RkVbeXBadVdoKGpJZXdmaXYoMHg3KSldKGFmVFFycigweDc0KSxbMHg0YV0pKydcdTAwNzRcdTAwNjUnXTtjYXNlIWt2eGxfVS5KRXA4emhOKCk/aklld2ZpdigtMHgzYSk6MHhiNzk6a1ZRUFhvW2FmVFFycigweGI0KV09dkFrM3U4dlt5cFp1V2goaklld2ZpdigtMHgyMCkpXShqSWV3Zml2KC0weDFmKSwweDRiKSt2QWszdTh2KGFmVFFycigweGVlKSkrJ1x1MDA3M1x1MDA2Yid8fFl5WF8zYmxbdkFrM3U4dlt5cFp1V2goMHhhMCldKGpJZXdmaXYoLTB4MWYpLDB4NGQpXTticmVhaztjYXNlIGt2eGxfVS5KRXA4emhOKCk/MHg2NTU6LTB4NTI6cmV0dXJuIFl5WF8zYmxbd0Qya3dGRSgweDRlKV07Y2FzZSAweDU0OTpyZXR1cm4gWXlYXzNibFtrVlFQWG9baklld2ZpdigweDQzKV1beXBadVdoKGFmVFFycigweGU4KSldXTtjYXNlIWt2eGxfVS5RVjFVRjIoKT9hZlRRcnIoMHg5MCk6MHhjM2E6a1ZRUFhvW2pJZXdmaXYoMHgyMSldPXdEMmt3RkUoMHg1MCl8fFl5WF8zYmxbd0Qya3dGRVt5cFp1V2goaklld2ZpdigweDcpKV0oaklld2ZpdigtMHgxZiksW2pJZXdmaXYoMHg1YyldKV07YnJlYWs7Y2FzZSBrdnhsX1Uubk5CWXZzXz4tMHg1Mz8weGYyNDotaklld2ZpdigweDJmKTpyZXR1cm4gWXlYXzNibFt2QWszdTh2KDB4NTEpXTtjYXNlIGt2eGxfVS5vTmVJRE92Pi1qSWV3Zml2KDB4NDkpPzB4YjU4OmFmVFFycigweGFhKTpyZXR1cm4gWXlYXzNibFt2QWszdTh2KGFmVFFycigweGYwKSldO2Nhc2Uha3Z4bF9VLlFWMVVGMigpPy0weGVmOjB4MTM5YzpyZXR1cm4gWXlYXzNibFt3RDJrd0ZFKGFmVFFycigweDk5KSldO2Nhc2UhKGt2eGxfVS5vTmVJRE92Pi1hZlRRcnIoMHhkYykpP2pJZXdmaXYoMHgzYSk6MHgxMTZiOnJldHVybiBZeVhfM2JsW3ZBazN1OHYoaklld2ZpdigweDUpKV19cmV0dXJuIFl5WF8zYmxba1ZRUFhvW2FmVFFycigweGI0KV1dO2Z1bmN0aW9uIHNoWjZ3ZEsoLi4ua1ZRUFhvKXt2YXIgdkFrM3U4djtNV1Z2ZjUoa1ZRUFhvLmxlbmd0aD1hZlRRcnIoMHg1Nyksa1ZRUFhvW2pJZXdmaXYoMHg1ZSldPS1qSWV3Zml2KDB4NGEpLGtWUVBYb1thZlRRcnIoMHhmMildPSdcdTAwM2JcdTAwNmVcdTAwNTJcdTAwNTZcdTAwNjJcdTAwM2FcdTAwNThcdTAwNWRcdTAwMzdcdTAwNzNcdTAwNWFcdTAwNjBcdTAwNmJcdTAwNDFcdTAwNjdcdTAwNzlcdTAwMzRcdTAwMjRcdTAwNDBcdTAwMzhcdTAwMjlcdTAwNzdcdTAwNDJcdTAwNTFcdTAwMmZcdTAwNTdcdTAwMzNcdTAwMzZcdTAwNjhcdTAwNDdcdTAwNzZcdTAwNjNcdTAwNzhcdTAwNWZcdTAwM2RcdTAwNDhcdTAwNGFcdTAwMzFcdTAwN2RcdTAwNDVcdTAwNjFcdTAwNDlcdTAwNjlcdTAwNzVcdTAwNDRcdTAwMmFcdTAwNTBcdTAwNGZcdTAwNGJcdTAwM2NcdTAwNDZcdTAwMzlcdTAwNmFcdTAwNjZcdTAwNDNcdTAwNzBcdTAwNmNcdTAwMjZcdTAwNTVcdTAwM2ZcdTAwMjFcdTAwM2VcdTAwN2JcdTAwMmNcdTAwNWVcdTAwMzVcdTAwMmVcdTAwMjhcdTAwNGNcdTAwNGRcdTAwNzJcdTAwNTRcdTAwN2FcdTAwNGVcdTAwMmJcdTAwNTNcdTAwNjVcdTAwN2VcdTAwNmRcdTAwN2NcdTAwMzJcdTAwNzFcdTAwMjJcdTAwMjNcdTAwNTlcdTAwNWJcdTAwMzBcdTAwMjVcdTAwNzRcdTAwNmZcdTAwNjQnLGtWUVBYb1tqSWV3Zml2KDB4NWUpXT1rVlFQWG9baklld2ZpdigweDVlKV0raklld2ZpdigtMHgxNyksa1ZRUFhvLll6TGJyQz0nJysoa1ZRUFhvW2tWUVBYb1tqSWV3Zml2KDB4NWUpXS0weDE2XXx8JycpLGtWUVBYby5kaWhZSmY9a1ZRUFhvLll6TGJyQy5sZW5ndGgsa1ZRUFhvW2pJZXdmaXYoMHg2MyldPVtdLGtWUVBYb1tqSWV3Zml2KDB4NjEpXT1qSWV3Zml2KC0weDNkKSxrVlFQWG9bYWZUUXJyKDB4NjgpXT1qSWV3Zml2KC0weDNkKSxrVlFQWG9baklld2ZpdigweDYwKV09LWFmVFFycigweDU3KSk7Zm9yKHZBazN1OHY9aklld2ZpdigtMHgzZCk7dkFrM3U4djxrVlFQWG8uZGloWUpmO3ZBazN1OHYrKyl7a1ZRUFhvW2FmVFFycigweDg1KV09a1ZRUFhvW2pJZXdmaXYoMHg1ZildLmluZGV4T2Yoa1ZRUFhvLll6TGJyQ1t2QWszdTh2XSk7aWYoa1ZRUFhvW2FmVFFycigweDg1KV09PT0tYWZUUXJyKDB4NTcpKXtjb250aW51ZX1pZihrVlFQWG9baklld2ZpdigweDYwKV08YWZUUXJyKDB4NTYpKXtrVlFQWG8ubGZRdWloPWtWUVBYb1thZlRRcnIoMHg4NSldfWVsc2V7TVdWdmY1KGtWUVBYby5sZlF1aWgrPWtWUVBYb1sweDldKmpJZXdmaXYoLTB4Yiksa1ZRUFhvW2pJZXdmaXYoMHg2MSldfD1rVlFQWG9bYWZUUXJyKDB4ZjMpXTw8a1ZRUFhvW2FmVFFycigweDY4KV0sa1ZRUFhvW2FmVFFycigweDY4KV0rPShrVlFQWG9baklld2ZpdigweDYwKV0ma1ZRUFhvW2FmVFFycigweGYxKV0rMHgxZmU5KT5rVlFQWG9bYWZUUXJyKDB4ZjEpXStqSWV3Zml2KDB4NjIpP2pJZXdmaXYoLTB4YSk6YWZUUXJyKDB4OGEpKTtkb3tNV1Z2ZjUoa1ZRUFhvLmVKWml5d3EucHVzaChrVlFQWG8uYnZyRDA3MCYweGZmKSxrVlFQWG9baklld2ZpdigweDYxKV0+Pj1qSWV3Zml2KDB4MWEpLGtWUVBYb1sweDZdLT1qSWV3Zml2KDB4MWEpKX13aGlsZShrVlFQWG9bYWZUUXJyKDB4NjgpXT5qSWV3Zml2KDB4MTkpKTtrVlFQWG9baklld2ZpdigweDYwKV09LWpJZXdmaXYoLTB4M2MpfX1pZihrVlFQWG9bYWZUUXJyKDB4ZjMpXT4tYWZUUXJyKDB4NTcpKXtrVlFQWG8uZUpaaXl3cS5wdXNoKChrVlFQWG9baklld2ZpdigweDYxKV18a1ZRUFhvW2FmVFFycigweGYzKV08PGtWUVBYb1sweDZdKSZrVlFQWG9baklld2ZpdigweDVlKV0rMHhlOSl9cmV0dXJuIGtWUVBYb1thZlRRcnIoMHhmMSldPmpJZXdmaXYoMHg1Yyk/a1ZRUFhvW2FmVFFycigweGVkKV06dXdfckJaQShrVlFQWG9baklld2ZpdigweDYzKV0pfX1IRUVkMEM2KGsweXBrNCwweDEpO2Z1bmN0aW9uIGsweXBrNCguLi5rVlFQWG8pe3ZhciBfd2ZtSXg4O01XVnZmNShrVlFQWG9bYWZUUXJyKDB4NTgpXT0weDEsa1ZRUFhvLnRwcjlQMWM9a1ZRUFhvLlhrSklJSixrVlFQWG8uYWJ3WTM4PSdcdTAwNDRcdTAwM2NcdTAwNDBcdTAwNzVcdTAwNjBcdTAwM2JcdTAwNWVcdTAwMmFcdTAwMzBcdTAwNmNcdTAwN2VcdTAwMjhcdTAwNjJcdTAwNTJcdTAwNWFcdTAwMzJcdTAwMjRcdTAwNThcdTAwMmVcdTAwNTVcdTAwNzlcdTAwMzdcdTAwNjRcdTAwNjFcdTAwMzlcdTAwNTBcdTAwNzZcdTAwMzRcdTAwNGZcdTAwMzZcdTAwNTFcdTAwNmZcdTAwNjlcdTAwMjJcdTAwM2ZcdTAwM2RcdTAwNDFcdTAwNTRcdTAwNDNcdTAwNGNcdTAwMmZcdTAwNmVcdTAwNGFcdTAwNjZcdTAwMzFcdTAwNjVcdTAwNTlcdTAwMmNcdTAwNzJcdTAwNDJcdTAwMzVcdTAwNTNcdTAwNzRcdTAwNTZcdTAwNWRcdTAwM2FcdTAwNjdcdTAwNmRcdTAwNWZcdTAwNGVcdTAwNzhcdTAwNmFcdTAwN2NcdTAwNzBcdTAwNGJcdTAwNzdcdTAwNDlcdTAwN2RcdTAwNmJcdTAwNzNcdTAwNjNcdTAwMjNcdTAwNDdcdTAwMzNcdTAwNzFcdTAwNTdcdTAwM2VcdTAwN2FcdTAwMjFcdTAwMjVcdTAwNWJcdTAwMjZcdTAwNGRcdTAwNjhcdTAwNDZcdTAwMmJcdTAwMjlcdTAwNDVcdTAwMzhcdTAwNDhcdTAwN2InLGtWUVBYb1thZlRRcnIoMHhmNyldPWtWUVBYb1thZlRRcnIoMHg4NSldLGtWUVBYby5zX1hXY0Y9JycrKGtWUVBYb1thZlRRcnIoMHg1NildfHwnJyksa1ZRUFhvW2FmVFFycigweDU5KV09a1ZRUFhvLnNfWFdjRi5sZW5ndGgsa1ZRUFhvW2FmVFFycigweGY4KV09a1ZRUFhvLnNfWFdjRixrVlFQWG9bYWZUUXJyKDB4ZmIpXT1bXSxrVlFQWG9bYWZUUXJyKDB4ZmEpXT1hZlRRcnIoMHg1Niksa1ZRUFhvW2FmVFFycigweDY4KV09YWZUUXJyKDB4NTYpLGtWUVBYb1thZlRRcnIoMHhmOSldPS1hZlRRcnIoMHg1NykpO2Zvcihfd2ZtSXg4PTB4MDtfd2ZtSXg4PGtWUVBYb1thZlRRcnIoMHg1OSldO193Zm1JeDgrKyl7a1ZRUFhvW2FmVFFycigweGY3KV09a1ZRUFhvLmFid1kzOC5pbmRleE9mKGtWUVBYb1thZlRRcnIoMHhmOCldW193Zm1JeDhdKTtpZihrVlFQWG8uYUFJa2RMPT09LWFmVFFycigweDU3KSl7Y29udGludWV9aWYoa1ZRUFhvW2FmVFFycigweGY5KV08YWZUUXJyKDB4NTYpKXtrVlFQWG9bYWZUUXJyKDB4ZjkpXT1rVlFQWG9bYWZUUXJyKDB4ZjcpXX1lbHNle01XVnZmNShrVlFQWG9bYWZUUXJyKDB4ZjkpXSs9a1ZRUFhvW2FmVFFycigweGY3KV0qYWZUUXJyKDB4ODgpLGtWUVBYb1thZlRRcnIoMHhmYSldfD1rVlFQWG9bYWZUUXJyKDB4ZjkpXTw8a1ZRUFhvW2FmVFFycigweDY4KV0sa1ZRUFhvW2FmVFFycigweDY4KV0rPShrVlFQWG9bYWZUUXJyKDB4ZjkpXSZhZlRRcnIoMHhhMykpPmFmVFFycigweGIxKT9hZlRRcnIoMHg4OSk6YWZUUXJyKDB4OGEpKTtkb3tNV1Z2ZjUoa1ZRUFhvW2FmVFFycigweGZiKV0ucHVzaChrVlFQWG9bYWZUUXJyKDB4ZmEpXSZhZlRRcnIoMHg4ZCkpLGtWUVBYb1thZlRRcnIoMHhmYSldPj49YWZUUXJyKDB4YWQpLGtWUVBYb1thZlRRcnIoMHg2OCldLT1hZlRRcnIoMHhhZCkpfXdoaWxlKGtWUVBYb1thZlRRcnIoMHg2OCldPjB4Nyk7a1ZRUFhvW2FmVFFycigweGY5KV09LWFmVFFycigweDU3KX19aWYoa1ZRUFhvW2FmVFFycigweGY5KV0+LWFmVFFycigweDU3KSl7a1ZRUFhvW2FmVFFycigweGZiKV0ucHVzaCgoa1ZRUFhvW2FmVFFycigweGZhKV18a1ZRUFhvLmJzZk9HTWU8PGtWUVBYb1sweDZdKSZhZlRRcnIoMHg4ZCkpfXJldHVybiB1d19yQlpBKGtWUVBYb1thZlRRcnIoMHhmYildKX1mdW5jdGlvbiBLSkY0WUwoLi4ua1ZRUFhvKXtNV1Z2ZjUoa1ZRUFhvW2FmVFFycigweDU4KV09YWZUUXJyKDB4NTYpLGtWUVBYb1thZlRRcnIoMHhmYyldPWFmVFFycigweDg0KSxrVlFQWG9bYWZUUXJyKDB4ZmQpXT0nXHUwMDU5XHUwMDc2XHUwMDc4XHUwMDY0XHUwMDNiXHUwMDIxXHUwMDRjXHUwMDNmXHUwMDdjXHUwMDc2XHUwMDZlXHUwMDQ5XHUwMDdlXHUwMDQ3XHUwMDI2XHUwMDJjXHUwMDUxXHUwMDdjXHUwMDJhXHUwMDJhXHUwMDIxXHUwMDRmXHUwMDZlXHUwMDYzXHUwMDQyxIhcdTAwM2ZcdTAwNjVcdTAwMjVcdTAwNDdcdTAwN2NcdTAwNjdcdTAwNTRcdTAwNmJcdTAwNmRcdTAwN2RcdTAwMjZcdTAwNjBcdTAwNzRcdTAwN2NcdTAwNzdcdTAwNTRcdTAwN2RcdTAwNjlcdTAwN2NcdTAwNDdcdTAwNjJcdTAwNDhcdTAwNTNcdTAwNGJcdTAwNGJcdTAwNWXEplx1MDA2YVx1MDA0NVx1MDAzNVx1MDA1M1x1MDA2Mlx1MDA2Ylx1MDA0NFx1MDA3Y1x1MDA3NFx1MDA3NVx1MDAyOVx1MDAyM1x1MDA2M1x1MDA3Y1x1MDA0NFx1MDAzOVx1MDAzNlx1MDA2Y1x1MDA2Zlx1MDA2NVx1MDA3Nlx1MDAzMVx1MDA3Y1x1MDA1MVx1MDAyZVx1MDA3OFx1MDAzOFx1MDA0MVx1MDA1MFx1MDA3NcWKXHUwMDM0XHUwMDM5XHUwMDYyXHUwMDYxXHUwMDdjXHUwMDVkXHUwMDU2XHUwMDIzXHUwMDY3xKtcdTAwNGRcdTAwNzVcdTAwNzJcdTAwNmNcdTAwMzRcdTAwN2NcdTAwNjFcdTAwMzJcdTAwNzlcdTAwN2FcdTAwMjFcdTAwMjZcdTAwNzZcdTAwNDBcdTAwN2PFjcWmXHUwMDdhXHUwMDI2XHUwMDRmxatcdTAwNDFcdTAwNTNcdTAwNzRcdTAwN2FcdTAwNjZcdTAwNWLEu1x1MDA1Nlx1MDA3NVx1MDAzOVx1MDA2Y1x1MDA1MVx1MDAyM1x1MDAyZcWrXHUwMDY3XHUwMDY3XHUwMDQ3XHUwMDZjXHUwMDM4XHUwMDViXHUwMDM1xatcdTAwNGJcdTAwNTNcdTAwMzdcdTAwN2VcdTAwMjlcdTAwNWRcdTAwNznFq1x1MDAzYVx1MDAyZsW8XHUwMDY5XHUwMDIzxLtcdTAwNmRcdTAwNmLFvFx1MDAzNlx1MDA3Y1x1MDA3NVx1MDA2Nlx1MDAzMFx1MDA2Y1x1MDA3Y1x1MDA2ZVx1MDAyZlx1MDA1N1x1MDAzMFx1MDA2MFx1MDAzZVx1MDA1OFx1MDA1NVx1MDAzMVx1MDA3N1x1MDA2MVx1MDA3N1x1MDA1Mlx1MDA0N1x1MDAyMlx1MDA0MVx1MDA2OcS7xpJcdTAwN2FcdTAwNDBcdTAwM2ZcdTAwMjFcdTAwM2NcdTAwNTBcdTAwNzdcdTAwMzVcdTAwM2VcdTAwNzFcdTAwNjNcdTAwNWZcdTAwNmFcdTAwMjhcdTAwN2NcdTAwMjVcdTAwNTNcdTAwNGZcdTAwN2FcdTAwMzRcdTAwMjNcdTAwNTRcdTAwNTVcdTAwMmFcdTAwN2NcdTAwMjZcdTAwM2ZcdTAwMzNcdTAwNWRcdTAwMzFcdTAwNmJcdTAwM2bFq1x1MDAzM1x1MDA0ZVx1MDAzY1x1MDA1ZFx1MDA0Zlx1MDAyM1x1MDA1OcWrXHUwMDM2XHUwMDMyXHUwMDY2XHUwMDY5XHUwMDMyXHUwMDcxXHUwMDVmXHUwMDUxXHUwMDVlXHUwMDdjxphcdTAwNDHFtlx1MDA1Ylx1MDA0Y8eLXHUwMDdjXHUwMDQxXHUwMDY2XHUwMDUxXHUwMDZmXHUwMDUwXHUwMDNlxpDFo1x1MDAzOFx1MDAzNlx1MDA2Zlx1MDA0YVx1MDA1Ylx1MDA0M8WrXHUwMDVmXHUwMDU0XHUwMDY4XHUwMDMwx7ZcdTAwNjVcdTAwNmZcdTAwNjTHtMWrXHUwMDQwXHUwMDYwXHUwMDI4XHUwMDY5XHUwMDUwXHUwMDdjXHUwMDRjXHUwMDYxXHUwMDIzXHUwMDNlXHUwMDRmx43Hj8eRXHUwMDZiXHUwMDViXHUwMDM5XHUwMDY5XHUwMDcwXHUwMDRmXHUwMDQ3XHUwMDNjxIhcdTAwNjbFpsa3XHUwMDU5x6VcdTAwN2NcdTAwNjDEpVx1MDA3YVx1MDA2Zlx1MDAyM1x1MDAzYcidyKXFtcioXHUwMDQyyJ1cdTAwM2RcdTAwNjZcdTAwNTNcdTAwMzDGm1x1MDA3OFx1MDA3NcaMXHUwMDc2XHUwMDdjXHUwMDM5XHUwMDVkxK9cdTAwNTVcdTAwN2NcdTAwMmNcdTAwNTNcdTAwMzRcdTAwNjlcdTAwNTJcdTAwNzFcdTAwNzjIo1x1MDAyNFx1MDA2ZFx1MDA1M1x1MDA2OVx1MDA0ZVx1MDA3YVx1MDAzOcWrXHUwMDQ2XHUwMDRhxoTFvlx1MDA0ZFx1MDA1YsemXHUwMDdhXHUwMDRlxa5cdTAwMjZcdTAwNGJcdTAwMjnHilx1MDA3Y1x1MDA3ZVx1MDAzZlx1MDAyOVx1MDA3ZVx1MDA3ZVx1MDA3MVx1MDA2OFx1MDA1MsSRXHUwMDU4XHUwMDZkXHUwMDYzXHUwMDIyXHUwMDRkXHUwMDQ2yaZcdTAwNjlcdTAwNTPJilx1MDAyMlx1MDAyYsS7XHUwMDRmXHUwMDM5XHUwMDdhXHUwMDczXHUwMDQ1XHUwMDViXHUwMDNiXHUwMDdjXHUwMDRhXHUwMDM5XHUwMDZhXHUwMDdlXHUwMDc1XHUwMDMyybtcdTAwNDNcdTAwNTFcdTAwNmEnLGtWUVBYb1trVlFQWG9bYWZUUXJyKDB4ZmMpXS0oa1ZRUFhvW2FmVFFycigweGZjKV0tYWZUUXJyKDB4YjQpKV09a1ZRUFhvW2FmVFFycigweGZkKV0sa1ZRUFhvW2FmVFFycigweGZlKV09e0RTSHk0bTphZlRRcnIoMHg3NCkscHpTbW5ZN0FIVHJoRzonJyx1T2h0aUJmajohMHgxLG1nUmk6TmFOLGNiZ1FHS3Y2Ok5hTixNYlpyMDRxVDpOYU4selBwVWtVQ2tQcHoyMTonJyxkTDFPZ09HaTphZlRRcnIoMHg1NikscmZ2V0NDV25tdDQ6a1ZRUFhvWzB4YjVdLShrVlFQWG9bYWZUUXJyKDB4ZmMpXS1hZlRRcnIoMHg1NikpLFthZlRRcnIoMHhmZildOicnfSk7aWYoJ1x4NmRceDY3XHg1Mlx4NjknaW4ga1ZRUFhvW2FmVFFycigweGZlKV0pe2tWUVBYb1trVlFQWG9bYWZUUXJyKDB4ZmMpXS1hZlRRcnIoMHhjMildKz0nXHg2Nlx4NDVceDRmXHgzMFx4MmZceDY1XHg3Ylx4MmFceDRlXHg2ZcWjXHgyM1x4M2RceDY5XHgzM1x4NzLHnMahXHg2Nlx4M2JceDdlxLxceDY3XHg1MFx4NjNceDQ5XHgzMlx4MjnJplx4NGVceDZjXHg0M1x4NmZceDIyXHg1YsqXXHg3N1x4NzXFpseaXHgyY8idXHgyNlx4NTPHkMiSXHg1MVx4MzLGjFx4MmFceDcxXHg3Mlx4NTFceDVkXHg0Ylx4MjNceDMzyJ1ceDVkXHg2MVx4NzRceDU2XHg0Y1x4MmNceDJmxatceDc5XHg3OVx4NGNceDNhxJ1ceDdhXHgzZsqmXHgyZlx4NWJceDdhyJ1ceDJlXHgzMVx4NDVceDY1XHg2Nlx4MjLJrcSIXHg3OVx4MjhceDc4XHgzOVx4N2XLm1x4NmJceDUzXHg2OFx4NjlceDc5XHgzZcS7XHg3ZVx4M2RceDdkXHg2M8WkXHg3MMqQXHg2Nlx4NmRceDQ2XHg1Nlx4MzRceDY4XHg2MsWrXHg3NsudXHg3OFx4NmRceDY1XHg0YcmmXHgyMlx4NjJceDYzXHg2ZsWvx7VceDYzx79ceDMwXHgyOFx4NzHLt8SsXHgyMcusXHg3OFx4NTRceDJjypBceDQzXHg3M8m/x6JceDZiyaZceDQ3zI1ceDYzzI9ceDc2XHg2YVx4NzVceDI0XHgyOFx4MmVceDVmXHgzNFx4NmFceDYxXHgzNMqQXHgzYVx4NWRceDQxXHgzNlx4MjhceDNhxLtceDcwXHg0M1x4MmNceDY4XHgzZlx4N2VceDJiyotceDI0XHg3Y1x4NDhceDVhxoxceDdjXHgyMVx4NTZceDMyXHg3M1x4N2NceDUyXHg3OVx4NWRceDY1XHgyMVx4NTVceDJlXHgyZlx4NWRceDdjXHg0MFx4MzJceDJhXHgzZc2Ky7fHjFx4NDJceDU0XHgyNlx4NDNceDc2XHg2ZFx4M2TJplx4MzNceDRhXHg1ZFx4M2FceDU2XHg2N1x4MmZceDUxXHg3NVx4NmRceDRiXHgzM1x4NmZceDQzXHg1Yc2MzZRceDNhXHg2Zlx4MjFceDdhXHg1Mlx4MjRceDZjXHg0MVx4M2HLrFx4NmVceDU1XHg0ZFx4NzJceDQxXHg3McmAXHg0Y1x4NTdceDc4XHg1YVx4M2RceDM0XHg0Nlx4NzVceDRhXHg1MFx4MjhceDcwxatceDM5XHg3OVx4MmNceDYwXHg3ZVx4MjZceDc0XHg1ZsemXHgzOFx4NGVceDc4x7lceDU3x5dceDdjxopceDM2XHgyYVx4MjRceDQxXHg2NFx4NzRceDM4XHg1Mlx4MmZceDNkXHgzZlx4NTJceDI1xYlceDc3zpxceDI0XHgzNVx4NjbNiFx4NzBceDRlXHg3Y1x4MjNceDcyXHg2Ms2fXHg2N8S7XHgzN1x4NzBceDc4XHgzNlx4NjNceDU2XHg3ZVx4NjNceDIxXHg2N1x4NzVceDUyXHg2M1x4NTBceDdiXHg0MVx4NGFceDU4XHgyMlx4NWVceDRmXHg0ZVx4MzVceDU5ybtceDZmXHg2Y1x4NjFceDRmXHgzY1x4MjZceDNhXHgzZFx4NzRceDU1XHgyNcmqXHg2Yc23XHg3NVx4NjFceDY4XHg1Nlx4NjVceDNkXHg0Y1x4NzBceDM3yL5ceDNjxoBceDU3XHgzN1x4M2XJhlx4M2VceDRlXHg0N1x4MzNceDUyxIRceDJmXHgyYVx4NmJceDc4zbxceDVmXHgzMVx4NTlceDU0XHg0Ylx4NWTKv1x4N2NceDQ5XHg0ZsmJXHgyY1x4NjNceDQwXHgzOVx4NTPGoFx4NzNceDZjJ31pZignXHUwMDU3XHUwMDYyXHUwMDUxXHUwMDcxXHUwMDQ1XHUwMDRmXHUwMDQxXHUwMDU5XHUwMDc5J2luIGtWUVBYb1thZlRRcnIoMHhmZSldKXtrVlFQWG9bYWZUUXJyKDB4YjQpXSs9J1x1MDA2NFx1MDA0OVx1MDA3MVx1MDA1Mlx1MDA3Nlx1MDA1YVx1MDA2ZFx1MDA2M1x1MDA2M1x1MDA2ZFx1MDA3OVx1MDA3OFx1MDA1MFx1MDAzMVx1MDA0Y1x1MDA3OVx1MDA0Nlx1MDAzM1x1MDA2OFx1MDA0NFx1MDA0MVx1MDA0ZFx1MDA1NFx1MDA2ZFx1MDA1Mlx1MDA0N1x1MDA2N1x1MDAzMVx1MDA0OFx1MDA2NFx1MDA0MVx1MDAzNlx1MDA0YVx1MDA2Ylx1MDAzMFx1MDA2Ylx1MDA3Mlx1MDA1Mlx1MDA0OFx1MDAzOVx1MDA2ZVx1MDA3OFx1MDA0YVx1MDA2Mlx1MDA0ZVx1MDA1MVx1MDA3OVx1MDA1OFx1MDA0NVx1MDA0OVx1MDA3OVx1MDA3OVx1MDA2NFx1MDA0Mlx1MDA0NVx1MDAzOVx1MDAzOFx1MDA0ZVx1MDAzMVx1MDA3YVx1MDA2Mlx1MDA3OVx1MDA1NVx1MDA3Mlx1MDA0OFx1MDA0NFx1MDA2Y1x1MDA0ZVx1MDA2N1x1MDA1Nlx1MDA0Zlx1MDA3YVx1MDA3YVx1MDAzOFx1MDA1YVx1MDAzOVx1MDA0OFx1MDAzN1x1MDA2N1x1MDA2Nlx1MDA3M1x1MDA1MFx1MDA0Y1x1MDA2MVx1MDA3N1x1MDA2YVx1MDA3N1x1MDAzNlx1MDA1MVx1MDA0Nlx1MDA2Ylx1MDA2ZFx1MDA0N1x1MDA1Nlx1MDA3MVx1MDA3MVx1MDA0N1x1MDA0ZFx1MDAzOFx1MDA1MFx1MDAzOVx1MDA2MVx1MDAzMFx1MDA1M1x1MDA0Ylx1MDA1Nlx1MDA3OVx1MDA0Zlx1MDA3MVx1MDA1Mlx1MDA1N1x1MDA0NVx1MDA1YVx1MDAzNVx1MDA3MFx1MDAzMVx1MDA0Mlx1MDA3M1x1MDA0Y1x1MDA0Zlx1MDAzMlx1MDA1YVx1MDA3MVx1MDA3Nlx1MDA2NFx1MDA0YVx1MDA1YVx1MDA0OFx1MDA1YVx1MDA3M1x1MDA2Zlx1MDA0M1x1MDA2Ylx1MDA3MFx1MDA1Mlx1MDA1MFx1MDA1MFx1MDA1Nlx1MDA0M1x1MDA2OVx1MDA0Y1x1MDA1MVx1MDAzNVx1MDA3OFx1MDA3MFx1MDA2NFx1MDA0OVx1MDA3MVx1MDA0MVx1MDA0M1x1MDA0ZVx1MDA2ZFx1MDA1YVx1MDA3OVx1MDA0NVx1MDA0Ylx1MDA2M1x1MDA0Mlx1MDAzOFx1MDA2ZVx1MDA2MVx1MDA0Zlx1MDAzNFx1MDA3N1x1MDA1NFx1MDA3NVx1MDAzN1x1MDA0OVx1MDA3YVx1MDA2OVx1MDA1MFx1MDA1YVx1MDA0Mlx1MDA3Mlx1MDA3YVx1MDA2NVx1MDA0M1x1MDA0Nlx1MDA1MFx1MDA1Nlx1MDA3MFx1MDA1OVx1MDA0YVx1MDA0NVx1MDA3N1x1MDAzMFx1MDAzOFx1MDA3MVx1MDA1Nlx1MDA0Zlx1MDA0NFx1MDA0OVx1MDAzMVx1MDA1MFx1MDA2Y1x1MDA0N1x1MDA0ZVx1MDA2ZFx1MDA3MVx1MDA1NFx1MDA1NFx1MDA3MVx1MDA2Ylx1MDA0Ylx1MDAzNlx1MDAzNFx1MDA0OFx1MDA1Mlx1MDA0Ylx1MDA1N1x1MDA3NFx1MDA0MVx1MDAzMVx1MDA2ZVx1MDA1YVx1MDA1MFx1MDA2ZFx1MDA0NVx1MDA3M1x1MDAzOFx1MDA0N1x1MDA1OFx1MDA0Nlx1MDA1NVx1MDA0OFx1MDA1NVx1MDA3MFx1MDAzM1x1MDA0M1x1MDA1NFx1MDA0OFx1MDA3MFx1MDA0ZFx1MDA1OFx1MDAzOVx1MDAzNVx1MDA0Ylx1MDA2OVx1MDA3NVx1MDA2ZFx1MDA0N1x1MDAzNFx1MDA3OVx1MDA3YVx1MDA0Mlx1MDA2ZVx1MDA3NFx1MDA0YVx1MDA3OVx1MDA1OFx1MDA1MFx1MDA0N1x1MDA0MVx1MDA2MVx1MDA3M1x1MDA2NFx1MDA2Zlx1MDAzMVx1MDA0Ylx1MDA1NFx1MDA1NVx1MDAzMFx1MDA2ZFx1MDA0OVx1MDA0OFx1MDAzM1x1MDA3N1x1MDA1NVx1MDA1OFx1MDA0YVx1MDA2N1x1MDA3MVx1MDA0Nlx1MDAzN1x1MDA0NVx1MDA1MFx1MDAzMVx1MDA2ZVx1MDA1YVx1MDA1NVx1MDA1OVx1MDAzOFx1MDAzNFx1MDA1YVx1MDA1M1x1MDA2OVx1MDA2ZFx1MDA3YVx1MDA3Mlx1MDA1NVx1MDA2ZVx1MDA1NFx1MDA2NFx1MDA1M1x1MDA1NFx1MDA1M1x1MDA0OVx1MDA3NVx1MDA2ZFx1MDA0Nlx1MDA1N1x1MDAzNVx1MDAzNlx1MDAzN1x1MDA1Mlx1MDA2Ylx1MDAzMlx1MDA3YVx1MDA2Mlx1MDA0YVx1MDA3OVx1MDA2YVx1MDA0Nlx1MDA3OFx1MDAzOVx1MDA3N1x1MDA1MFx1MDA1NVx1MDA0M1x1MDA3Nlx1MDA1MFx1MDA2OFx1MDA0N1x1MDA0N1x1MDAzMFx1MDAzNVx1MDA2Nlx1MDA0Ylx1MDA2YVx1MDA0Y1x1MDA0ZFx1MDA3N1x1MDA0ZVx1MDA0M1x1MDA1Mlx1MDA3Mlx1MDA1YVx1MDA2Mlx1MDA2Zlx1MDA1NVx1MDA0OVx1MDA0N1x1MDA0NVx1MDA2NVx1MDA0Zlx1MDA0YVx1MDA1Nlx1MDA0NVx1MDA3NFx1MDA3Nlx1MDA0Mlx1MDA2YVx1MDAzM1x1MDAzNFx1MDA0Zlx1MDA2OVx1MDA1MFx1MDA3M1x1MDA2Mlx1MDA2ZFx1MDA1NVx1MDAzOVx1MDAzM1x1MDA1NFx1MDA0NVx1MDA2NFx1MDA2Mlx1MDA2Ylx1MDAzOFx1MDA0Zlx1MDA2ZFx1MDA2ZFx1MDA0NVx1MDAzOVx1MDA1MFx1MDA0ZFx1MDA1Nlx1MDA0OVx1MDA0ZVx1MDAzMVx1MDA3MFx1MDA2Nlx1MDA3Mlx1MDA0N1x1MDA3MFx1MDA1OFx1MDA3MFx1MDAzNFx1MDA0M1x1MDA2Zlx1MDA1NCd9aWYoJ1x4NjNceDYyXHg2N1x4NTFceDQ3XHg0Ylx4NzZceDM2J2luIGtWUVBYb1thZlRRcnIoMHhmZSldKXtrVlFQWG9bYWZUUXJyKDB4YjQpXSs9J8SqXHg2M1x4MjZceDczXHg1M1x4NThceDJlXHg3Y1x4NGVceDU0XHg1Mlx4MmFceDI4XHg3M1x4MzJceDI2XHg3Mlx4MmVceDU0XHgzZVx4MzDNgFx4NTRceDdjXHg0Zlx4NmNceDU4XHg1N1x4NDVceDRlxLtceDcyXHgzZsiAXHg2OVx4MmNceDI1XHg2ZFx4NGFceDc5XHg3ZVx4NmFceDU0XHg0N1x4NGVceDNkXHg1NVx4NmRceDQyXHg1ZFx4MjhceDI5xLtceDI0XHg1M1x4N2TIp1x4NGVceDUxXHg2Mlx4MzlceDU4XHg3Nlx4NTLEpFx4NTRceDUxXHg0NFx4NmPNolx4MzNceDNlXHg3Ylx4NzHKtlx4M2JceDI1XHgzZtGMXHg0M1x4NDRceDcwXHgzMFx4NTNceDY0XHgyMVx4NTlceDU5XHg0N86SXHg1ZVx4NTBceDQxXHgzMFx4NmbGnFx4NzhceDc0XHgzNlx4MjLLkVx4NzRceDU3XHg2N1x4MjlceDJlXHg0NFx4MzRceDRlXHg1OFx4NzdceDcyXHgzMVx4M2FceDQxyqnFq1x4NzNceDRmXHg3NFx4NzFceDQwXHgyNlx4MzRceDczXHgyNFx4NDlceDJmXHg0Zlx4MmNceDVmXHg3OdCEXHg2Y1x4NzVceDdjXHg1Nlx4NTPKplx4MzhceDIxXHg2Ylx4NWVceDY0XHg0Ylx4NGVceDViXHgyOFx4NGRceDVmXHg2ZVx4NGNceDYyXHgzMFx4MjFceDM4XHgyMlx4NDXFhVx4M2FceDUxXHgzZVx4NTdceDYzXHg3NFx4NGZceDVkxLtceDRlXHg1ZFx4MzhceDVkXHgyZVx4NDNceDMxXHgyZsqiXHg3Y1x4N2JceDY3y4JceDJlXHg2OFx4MzdceDUyXHgzMFx4NzdceDQyXHg1Ylx4NjjRncuVXHgzZlx4NmNceDVlXHg2Ylx4MjVceDcxXHg1MVx4NGZceDVhXHg2MtC3XHgyNFx4NmFceDRhxbNceDJhXHg1ZFx4NjBceDNhXHg0YVx4NzRceDZmyYbIqsikXHg2Nlx4MjRceDVlXHg0YVx4MzNceDQ2XHg3NFx4MmZceDUyXHg0ZFx4NzBceDI1XHg0MFx4NGZceDRhXHgzNVx4NznHqVx4NjJceDdjXHg2Zlx4NmJceDYwXHgzNc+hXHgyOFx4NmVceDRmXHg3N1x4MzJceDZiXHgzOFx4M2RceDVhXHgyZlx4MzRceDc4XHg3OVx4M2FceDUzXHg0ZMqxXHg0Y1x4NzlceDZlXHg3Mlx4MjVceDVhXHg3N1x4NmZceDcxxLtceDZiXHg2Zlx4NDVceDYwXHgyZVx4NmRceDYxyJ1ceDc5XHg2Y1x4NTRceDJhXHg0Mlx4NmJceDIxzLRceDRlXHg0MNSkXHgyNFx4MmVceDM0XHg0OVx4NmbHuFx4NWJceDNhXHgyY1x4NTJceDUyXHg0OVx4NTNceDRlXHgzNFx4NDNceDUzXHgzZlx4NWJceDRlXHg1MFx4NDdceDM1XHg1ZtOsXHg2NciBXHg3NMiDXHg2MFx4NDVceDJjXHgyZVx4MjlceDI4XHg0ZVx4MjJceDVhXHg2ZFx4MjRceDIxXHgyZlx4NzPEu1x4MjhceDYxXHg2Mlx4N2VceDJjXHg0Y1x4NDVceDU4XHg1Ylx4NTbTj9CwXHg2OFx4NmXNhVx4MzZceDRmXHg1OcaDXHgzOVx4NTBceDc5XHgzZlx4NDdceDNmXHgzYlx4MzXIklx4M2bUoFx4MjJceDQzXHg1NFx4NGFceDQwXHg3Mlx4MzJceDYwXHg1ZFx4MmNceDVhXHg3ZFx4NTTOmFx4MmJceDYwXHg3N1x4NDdceDcyXHg1Ylx4M2PNjlx4MjVceDU1zKdceDJlXHgyYc68XHg3NCd9aWYoYWZUUXJyKDB4ZmYpaW4ga1ZRUFhvW2FmVFFycigweGZlKV0pe2tWUVBYb1thZlRRcnIoMHhiNCldKz0nXHg2ZVx4NmHEu1x4MjNceDUzXHg3OFx4NTbLp1x4NGNceDI2XHg3MFx4MzJceDI1XHgzY8idXHgzNlx4NzdceDZjXHg0N1x4NGFceDYzXHgzNlx4M2RceDQ1XHg3OVx4MzFceDRlXHg1N1x4NWFceDM0yJLNu1x4NDlceDY5XHg3NFx4NGNceDNiXHg1MFx4NmFceDU2XHg2YVx4MzdceDZmXHg0ZFx4M2JceDU1XHg1Nlx4NWRceDQyXHgzMFx4NzVceDU5XHg2MVx4NmVceDc1XHg1Nce3yJ1ceDNiXHg3MFx4NzZceDM0XHgzYc++XHg2Msm7XHgzMcaLXHgzYc69XHg1NsmzXHg3OFx4N2RceDViXHgyYlx4NDJceDRkXHgzZlx4MzjTqlx4NWRceDVkXHg1ZsS7XHg0Mlx4MjNceDc4XHgyYc+tXHg1MtCxXHg2Mlx4MmFceDUxz4LFmFx4NjHEr1x4MjNceDNmXHgyYlx4NTJceDQ2XHg1ZFx4NzFceDY0zpRceDdhXHg1NVx4NDlceDZjXHgyY1x4NzRceDQxXHg1ZFx4NDXInVx4NjdceDcyXHg1ZFx4NzRceDI4XHg0M1x4NGNceDczXHgzMFx4NWZceDc2XHg3N8+FXHgyNVx4NGNceDYzxLtceDc4XHg2Y1x4MjZceDVlXHg2MVx4NmRceDI2z5nNnlx4NWLPsFx4NWbNnVx4NWXSlFx4M2FceDU4xL9ceDZhXHg0Nlx4MzTQu1x4NjJceDY2XHgzOVx4NzdceDM5XHgzN8eUXHg0Mlx4MzZceDYwxpvVv1x4NzVceDY5XHg3YVx4NDFceDU1XHgyY1x4NzDOsFx4NjlceDdlXHg1NMagXHg2Nlx4NjbFodaaXHg1NVx4NTJceDRiXHg2ZFx4MznJnlx4NDJceDQzXHg2MFx4NjFceDJiXHgzMsiw049ceDNhXHg2ZVx4NDJceDYzXHgzOVx4NGVceDc3XHg1Zlx4NjPPhVx4M2JceDZmXHgzMVx4NjJceDJmxqBceDMyXHg3Nlx4NjFceDYwXHg1NVx4MjFceDI5XHg2Mlx4NDJceDZkXHgyMlx4N2NceDQzzZlceDM20qlceDY0XHg0MFx4MjJceDJlXHg3MFx4MzNceDZkXHg1NFx4NzXPklx4NTnVsFx4MzVceDQyxLLHplx4NTZceDYyXHg0ZVx4MzBceDZkXHg3OFx4MzBceDUxXHg1Ylx4MmVceDM4XHg3MdCXXHgzZlx4MzlceDU3XHg2Ylx4MzdceDNhXHgzYVx4NzBceDY0XHgzMFx4MzBceDU4XHg1Nlx4N2NceDYyXHg3MVx4NDZceDM1XHg0N1x4MjVceDJiyJ1ceDRj1L5ceDQ3XHg3Nlx4MmJceDI0xatceDNiXHgzZFx4NzlceDM2XHg0OFx4MjNceDJjXHg1N1x4M2NceDZkXHg2N1x4MzNceDViXHg3OMesXHg1NFx4NzFceDdl1I5ceDZkXHgzMVx4NzRceDZhXHg2N1x4NWZceDJhXHg0YVx4NTRceDQ4XHgzZFx4NjdceDRlXHg0NVx4NDJceDdlXHg3OFx4MmXFtVx4NGVceDRiXHg2M86MXHgzNVx4MmbHrlx4NmJceDQyXHg2OVx4MjlceDIxx4rWjMe4XHg1M1x4NjPboNCTXHgzMlx4NzTYpVx4NDdceDUx1INceDYzy5PFgs2eXHg2MMyQXHg0MVx4NjLJiFx4N2RceDQ51q5ceDY2XHg1MFx4MmVceDc2XHg1Zlx4MzBceDcxXHg0McmbXHgzNFx4NzdceDU1XHg3Mlx4MjlceDQyXHg1MVx4NThceDVkXHg3MsWrXHg2M1x4NzVceDQ5XHgzMFx4MzlceDIxXHgyNSd9aWYoJ1x1MDA3Nlx1MDAzOVx1MDA0YVx1MDA0NVx1MDA1Nlx1MDAzOCdpbiBrVlFQWG8uTFlkTG9JKXtrVlFQWG9bYWZUUXJyKDB4YjQpXSs9J1x1MDA3NFx1MDA3N1x1MDAzOVx1MDA0Nlx1MDA2N1x1MDAzM1x1MDA1Nlx1MDA1OFx1MDA0N1x1MDA1MFx1MDA0MVx1MDA2NFx1MDA3MFx1MDA2OFx1MDA0Zlx1MDA3NFx1MDA3NFx1MDA0Y1x1MDA1Nlx1MDA1Nlx1MDA3M1x1MDAzNVx1MDA2Nlx1MDA1NVx1MDAzN1x1MDA2ZFx1MDA2NVx1MDA3NFx1MDA1YVx1MDA1MVx1MDA0Zlx1MDA0N1x1MDA3MFx1MDA2YVx1MDA2Zlx1MDA2ZFx1MDA3OFx1MDA3NFx1MDA0YVx1MDA3MFx1MDA2YVx1MDA0Mlx1MDA2N1x1MDA0Ylx1MDAzN1x1MDA0Ylx1MDA0NVx1MDAzOVx1MDA0NVx1MDA2Zlx1MDA2NVx1MDA1Nlx1MDA0Mlx1MDA3MVx1MDA1Nlx1MDA0NFx1MDA1NVx1MDAzNlx1MDA1M1x1MDA0YVx1MDA1NFx1MDA2Zlx1MDA2Mlx1MDA3MFx1MDA2Zlx1MDA0Nlx1MDAzMVx1MDA0ZFx1MDA3Mlx1MDA0ZVx1MDA3N1x1MDA1OFx1MDA0MVx1MDA0ZVx1MDA3Mlx1MDA0Nlx1MDA1OFx1MDAzNFx1MDA2Ylx1MDA3NVx1MDA3OFx1MDA0Ylx1MDA1NFx1MDA0MVx1MDA3MFx1MDA2Mlx1MDA2NFx1MDA0ZFx1MDA2ZFx1MDA2M1x1MDA0MVx1MDA2Zlx1MDA3M1x1MDA3NVx1MDA1Nlx1MDA2YVx1MDA2MVx1MDAzNFx1MDA0M1x1MDAzN1x1MDA0M1x1MDA2M1x1MDA0Nlx1MDA3N1x1MDA2M1x1MDAzOVx1MDA3YVx1MDA0NVx1MDA0OFx1MDA2NFx1MDA0MVx1MDAzNlx1MDA1NFx1MDAzMlx1MDA0Nlx1MDAzMFx1MDA0Nlx1MDA1OVx1MDA3OVx1MDA2OVx1MDA2Ylx1MDA2NVx1MDA2NVx1MDA0OVx1MDA2ZFx1MDA3MVx1MDA1Nlx1MDA3OVx1MDA1N1x1MDA3OFx1MDA2Ylx1MDA2OFx1MDA1Mlx1MDA2MVx1MDA2Nlx1MDA0NVx1MDA2ZVx1MDA0MVx1MDA3Mlx1MDA3N1x1MDA0OVx1MDA0OFx1MDAzN1x1MDA0Y1x1MDA2MVx1MDA0Ylx1MDA1NFx1MDAzNlx1MDA3OFx1MDA3M1x1MDA1MFx1MDA0Ylx1MDA0ZVx1MDAzNlx1MDAzNFx1MDA0Y1x1MDA0Y1x1MDA2OVx1MDAzMlx1MDA2MVx1MDAzNVx1MDA3YVx1MDA3N1x1MDA2OVx1MDA2NFx1MDA0OFx1MDA2N1x1MDA0Mlx1MDA0N1x1MDA0Mlx1MDA2ZVx1MDAzNFx1MDA2MVx1MDA2Ylx1MDAzMlx1MDA0M1x1MDA2Mlx1MDA3MFx1MDAzMVx1MDA1MVx1MDA2Nlx1MDA2OFx1MDA2Mlx1MDA1MVx1MDA3M1x1MDA1MVx1MDA1NFx1MDA3MFx1MDAzNFx1MDA3YVx1MDA2Y1x1MDAzMVx1MDA2M1x1MDA0N1x1MDA0Ylx1MDAzOFx1MDA3NVx1MDA1OVx1MDAzMVx1MDAzMlx1MDAzOFx1MDA3MVx1MDA3Mlx1MDA1MVx1MDAzNVx1MDA1OVx1MDA2Y1x1MDA2OFx1MDA2Nlx1MDA1NFx1MDA1N1x1MDA2NFx1MDA0MVx1MDA0Y1x1MDA1N1x1MDA3MFx1MDA2Zlx1MDA1M1x1MDA2ZFx1MDA3NVx1MDA2ZFx1MDA3M1x1MDA0ZVx1MDA2Nlx1MDA3MVx1MDA1Mlx1MDA2OVx1MDA2N1x1MDA0MVx1MDA2Y1x1MDAzNVx1MDAzOVx1MDA1YVx1MDA0MVx1MDA2N1x1MDA2OVx1MDA1MFx1MDA2ZFx1MDA1OFx1MDA3MVx1MDAzM1x1MDA1MFx1MDA2MVx1MDAzNlx1MDAzMFx1MDA0NFx1MDA0Ylx1MDA0Nlx1MDA0OVx1MDA3MVx1MDAzMlx1MDA2Nlx1MDA3N1x1MDA0Nlx1MDA1OVx1MDA3OVx1MDA2ZVx1MDA3Nlx1MDA3Mlx1MDA2NVx1MDA0Mlx1MDA1M1x1MDA2Mlx1MDA2Nlx1MDA1OVx1MDAzN1x1MDA0Y1x1MDA2N1x1MDA1MFx1MDA2ZVx1MDAzNFx1MDA3Nlx1MDA2Zlx1MDAzN1x1MDA2OFx1MDA0NVx1MDA1N1x1MDA0Y1x1MDA0ZFx1MDA0N1x1MDA1Nlx1MDA2NFx1MDA3MVx1MDA0ZVx1MDAzMlx1MDA1Mlx1MDA2OVx1MDAzOVx1MDA2OFx1MDA2Mlx1MDA3OFx1MDA2M1x1MDA3OFx1MDA2MVx1MDA3NFx1MDA0NVx1MDA2Ylx1MDA1N1x1MDA2Y1x1MDA1OVx1MDAzOVx1MDAzNFx1MDA2Zlx1MDA0MVx1MDA2ZFx1MDA0Nlx1MDA2Ylx1MDA0ZFx1MDA1OFx1MDAzMlx1MDAzNlx1MDA3Nlx1MDA3YVx1MDA0Y1x1MDA2Y1x1MDA3OVx1MDA1NVx1MDA0Nlx1MDA2N1x1MDAzMVx1MDA0MVx1MDA0Mlx1MDAzN1x1MDA2NVx1MDA2Ylx1MDA2OVx1MDAzMlx1MDA3N1x1MDA1M1x1MDAzOVx1MDAzMVx1MDA0Zlx1MDAzN1x1MDA3M1x1MDAzNFx1MDA2Zlx1MDAzOFx1MDAzMFx1MDA0Y1x1MDA0OFx1MDAzOVx1MDA2ZVx1MDA1OFx1MDA3Nlx1MDA0MVx1MDAzMFx1MDA2OFx1MDAzOFx1MDA2M1x1MDAzNVx1MDA3NVx1MDA2Y1x1MDAzMVx1MDA0YVx1MDAzMVx1MDA0OFx1MDA0Y1x1MDA3MVx1MDA2ZFx1MDA3N1x1MDA2Y1x1MDA2M1x1MDA0N1x1MDA2OVx1MDA1YVx1MDA1N1x1MDA2Y1x1MDA2NFx1MDA1OVx1MDAzMFx1MDA0Mlx1MDA3OVx1MDA2Ylx1MDA3MFx1MDA1OVx1MDA2ZVx1MDA2Nlx1MDAzOFx1MDA2M1x1MDA0NVx1MDA2ZFx1MDA0Mlx1MDA0ZVx1MDAzMVx1MDA0Nlx1MDA2Zlx1MDA2ZVx1MDA0N1x1MDA1YVx1MDA0OVx1MDA3Myd9aWYoJ1x1MDA2NFx1MDA0Y1x1MDAzMVx1MDA0Zlx1MDA2N1x1MDA0Zlx1MDA0N1x1MDA2OSdpbiBrVlFQWG8uTFlkTG9JKXtrVlFQWG9bYWZUUXJyKDB4YjQpXSs9J1x1MDA2ZdWiXHUwMDQ1XHUwMDMyXHUwMDY11odcdTAwNTFcdTAwNDBcdTAwNzjajlx1MDA3Y1x1MDA3ZFx1MDAzM1x1MDA3ZcWUXHUwMDIzXHUwMDQ4XHUwMDJiXHUwMDQ1yaZcdTAwM2NcdTAwMmZcdTAwN2RcdTAwNTbPoVx1MDA0YVx1MDA1Zlx1MDA2Nlx1MDA1YdKuXHUwMDNjXHUwMDZhXHUwMDRmxbPav1x1MDA1ZFx1MDA1OVx1MDA1Zlx1MDA1OFx1MDA3M1x1MDAzM1x1MDA3N1x1MDAyNVx1MDA3ZFx1MDA2Y1x1MDAyNFx1MDAzM1x1MDA1MFx1MDA0NcS7XHUwMDU31I7Ovlx1MDAyOVx1MDA2Ylx1MDA3MVx1MDA1N1x1MDA1OFx1MDA3Y1x1MDA3M1x1MDA3Mlx1MDA3N1x1MDA2OVx1MDA0M1x1MDA0ZFx1MDA3M1x1MDAzNlx1MDA3MFx1MDA1Nlx1MDA2ZFx1MDA1YVx1MDA0Nlx1MDAzMtmcXHUwMDc5yJ1cdTAwNDJcdTAwNjZcdTAwM2FcdTAwNmNcdTAwNzZcdTAwMjFcdTAwMmFcdTAwNTLZtFx1MDA0NVx1MDA2ZFx1MDA0Y8WrXHUwMDYyXHUwMDc2XHUwMDczXHUwMDc2XHUwMDRiXHUwMDcyXHUwMDczXHUwMDUyXHUwMDIyXHUwMDQ5XHUwMDU42KlcdTAwNzZcdTAwN2FcdTAwNGNcdTAwNTDIndCJXHUwMDMxXHUwMDdlXHUwMDViXHUwMDZkXHUwMDcw1LZcdTAwNWFcdTAwM2NcdTAwNTdcdTAwNjTQl1x1MDA3OVx1MDAzNcWbXHUwMDMzXHUwMDM32bVcdTAwNmTYg1x1MDAzNFx1MDA3MtWUXHUwMDMyXHUwMDRjXHUwMDJhXHUwMDIz3IXMvVx1MDA2M1x1MDA3Mt2KXHUwMDc0XHUwMDI5XHUwMDJmXHUwMDJmyahcdTAwNGVcdTAwM2HSolx1MDA0Zlx1MDA0Nlx1MDA3OVx1MDAzMFx1MDAyMlx1MDAyY1x1MDA0MsS7XHUwMDQ3XHUwMDUzXHUwMDZmXHUwMDc0XHUwMDU0XHUwMDMz2ahcdTAwNTJcdTAwNGXdhsS7XHUwMDNlXHUwMDZiy7PEjVx1MDA3MFx1MDAzY1x1MDA3M1x1MDA1Zlx1MDA2NFx1MDA1Mt6sXHUwMDczXHUwMDUwXHUwMDYwXHUwMDcwyINcdTAwNWVcdTAwNzPMkVx1MDA2Nlx1MDA1OMm9XHUwMDMxXHUwMDc1XHUwMDQwxbNcdTAwNjVcdTAwNDHHjFx1MDA3NVx1MDA2ZVx1MDA2NMuYXHUwMDY5XHUwMDZlXHUwMDY1XHUwMDY0XHUwMDdjXHUwMDcyXHUwMDY1xL1cdTAwNzJcdTAwNmVcdTAwMjBcdTAwNzTLpc2BXHUwMDcwXHUwMDc1XHUwMDczXHUwMDY4XHUwMDdjXHUwMDVmXHUwMDVmXHUwMDcwXHUwMDcy3rhcdTAwNmbftVx1MDA3Y8yCXHUwMDZlXHUwMDczXHUwMDc0XHUwMDcyXHUwMDc10rFcdTAwNmZcdTAwNzLGodigXHUwMDY1XHUwMDdjXHUwMDZjXHUwMDY1XHUwMDZlXHUwMDY3361cdTAwN2NcdTAwNTRcdTAwNjXRrlx1MDA0NFx1MDA2NcyC36DgoIVcdTAwNTXfos6hXHUwMDQxXHUwMDcyXHUwMDcyXHUwMDYxXHUwMDc5XHUwMDdjXHUwMDQyxp1cdTAwNjZcdTAwNjXgoIXFtFx1MDA3Mt+iXHUwMDY3x67goJzgoJ5cdTAwN2NcdTAwNjbfuFx1MDA2ZMqm36BcdTAwNTBcdTAwNmbgoJngoK3goK9cdTAwNDNcdTAwNjhcdTAwNjFcdTAwNzLgoLHgoIhcdTAwNmHgoLTKkN+g4KCV4KCI4KCuXHUwMDZmXHUwMDZkxLxcdTAwNmbgoKbgoKjGnFx1MDA3NFx1MDA2Nlx1MDAyZFx1MDAzON+8XHUwMDYxXHUwMDZjxqBcdTAwNjFcdTAwNmJcdTAwMzbKllx1MDA3N9KVxJVcdTAwNDRcdTAwNmHfpVx1MDA2NFx1MDA3NVx1MDA0ZFx1MDA3YVx1MDA0YtmSXHUwMDU41olcdTAwNDNcdTAwNzVcdTAwNzHSlMqsXHUwMDZiXHUwMDQ1XHUwMDZiXHUwMDRjxYJcdTAwNTdcdTAwNmZcdTAwNGVcdTAwNmLVtMWj2YRcdTAwNmPgoJ9cdTAwNDVcdTAwNTRcdTAwNWHdsVx1MDA1OOChgFx1MDAzOFx1MDA0Y1x1MDA0NNO736bNgFx1MDA2Ylx1MDA0OFx1MDA1N1x1MDA0M82C4KG5zr1cdTAwNjFcdTAwNDnOmlx1MDA1OFx1MDA0Nlx1MDA3Mlx1MDA1Nlx1MDA2OFx1MDA1M8WjXHUwMDRlXHUwMDZm3bjTuVx1MDA3MsiOXHUwMDUyXHUwMDY24KGu1rVcdTAwNjlcdTAwNDfUhCd9cmV0dXJuIGtWUVBYb1trVlFQWG9bYWZUUXJyKDB4ZmMpXSsweDgwXT5hZlRRcnIoMHg4Zik/a1ZRUFhvWy1hZlRRcnIoMHg5YSldOmtWUVBYb1trVlFQWG9ba1ZRUFhvWzB4YjVdKzB4ODBdLWFmVFFycigweGMyKV19SEVFZDBDNih5cFp1V2gsYWZUUXJyKDB4NTcpKTtmdW5jdGlvbiB5cFp1V2goLi4ua1ZRUFhvKXtNV1Z2ZjUoa1ZRUFhvW2FmVFFycigweDU4KV09YWZUUXJyKDB4NTcpLGtWUVBYb1thZlRRcnIoMHhmYyldPWtWUVBYb1thZlRRcnIoMHg1NildKTtyZXR1cm4gaklld2ZpdltrVlFQWG9bYWZUUXJyKDB4ZmMpXV19ZnVuY3Rpb24gU0FXZ2JfTihNV1Z2ZjUpe3ZhciBrVlFQWG8sX3dmbUl4OCx2QWszdTh2LGpJZXdmaXY9e30sd0Qya3dGRT1NV1Z2ZjUuc3BsaXQoJycpLHNoWjZ3ZEs9X3dmbUl4OD13RDJrd0ZFWzB4MF0sbW1KOEF2Yj1bc2haNndkS10sWHBBQ1FmPWtWUVBYbz0weDEwMDtmb3IoTVdWdmY1PWFmVFFycigweDU3KTtNV1Z2ZjU8d0Qya3dGRS5sZW5ndGg7TVdWdmY1KyspdkFrM3U4dj13RDJrd0ZFW01XVnZmNV0uY2hhckNvZGVBdChhZlRRcnIoMHg1NikpLHZBazN1OHY9WHBBQ1FmPnZBazN1OHY/d0Qya3dGRVtNV1Z2ZjVdOmpJZXdmaXZbdkFrM3U4dl0/aklld2Zpdlt2QWszdTh2XTpfd2ZtSXg4K3NoWjZ3ZEssbW1KOEF2Yi5wdXNoKHZBazN1OHYpLHNoWjZ3ZEs9dkFrM3U4di5jaGFyQXQoYWZUUXJyKDB4NTYpKSxqSWV3Zml2W2tWUVBYb109X3dmbUl4OCtzaFo2d2RLLGtWUVBYbysrLF93Zm1JeDg9dkFrM3U4djtyZXR1cm4gbW1KOEF2Yi5qb2luKCcnKS5zcGxpdCgnXHg3YycpfWZ1bmN0aW9uIEtvbVNXRigpe3JldHVyblsweDIsMHgwLDB4MSwnXHg2Y1x4NjVceDZlXHg2N1x4NzRceDY4JywweDMsMHg0LDB4OGQsJ1x4NzBceDU5XHg1N1x4NzdceDcxXHg0ZCcsMHgxZSwweDVjLDB4NTksJ1x1MDA0Mlx1MDA2YVx1MDA2YVx1MDA2Mlx1MDA3NFx1MDAzMVx1MDA0YycsMHg3YSwweDVkLDB4N2MsMHg5MywnXHg1NVx4NGRceDU5XHg2M1x4NGRceDYzXHg2YicsMHg3ZiwweDFmLDB4NiwweDNmLDB4ZiwweDk5LDB4OGYsMHgyZCwweDkxLDB4NzAsMHg2MSwweDZiLDB4NmQsMHhhMCx2b2lkIDB4MCwweDE3LDB4MTgsMHgxMCwweDQxLDB4NSwnXHg1MVx4NGVceDQ5XHg2NVx4NmFceDYyXHg1OScsJ1x4NmRceDc3XHg3MVx4NjRceDQ3XHg0NVx4NjInLDB4NGQsMHg0OCwweDYyLDB4MjcsMHgxNSwweDMyLDB4NjAsJ1x4N2FceDMwXHg0ZFx4NThceDQxXHg2ZScsMHgzNSwweDksJ1x4NzRceDRhXHgzMVx4NDlceDUxXHg0Ylx4NzYnLCdcdTAwNTFcdTAwNTVcdTAwNThcdTAwMzNcdTAwNjVcdTAwNzgnLDB4NWIsMHhkLDB4ZSwweDM5LDB4M2IsMHhmZiwweDQ0LDB4NjUsMHg2OSwweDY3LDB4NjgsMHhlMiwweGE5LDB4NGUsMHg1NywnXHUwMDZmXHUwMDRiXHUwMDZhXHUwMDRlXHUwMDY1XHUwMDZkXHUwMDVhJywweDU0LDB4NTMsMHhhNywweDk1LCdceDQ4XHg0N1x4NjZceDY1XHg3NFx4NzlceDM3JywnXHUwMDU0XHUwMDc2XHUwMDMzXHUwMDY3XHUwMDYyXHUwMDUzJywweDQ2LDB4OTIsMHg3NiwnXHUwMDQzXHUwMDY1XHUwMDY1XHUwMDc2XHUwMDQ3XHUwMDczXHUwMDQ5JywnXHg3MFx4NDlceDZkXHg2OVx4NzJceDU2XHg2MycsMHgxZmZmLDB4OWYsMHgxNiwweDE5LDB4MjUsJ1x1MDA2Nlx1MDA3Nlx1MDAzM1x1MDAzOVx1MDA1YVx1MDA3MScsMHg2YywweDZlLDB4MWEsMHg3LDB4OCwnXHUwMDcyXHUwMDM1XHUwMDRhXHUwMDMyXHUwMDc5XHUwMDQxJywnXHg2NVx4NThceDc4XHg0NVx4MzBceDdhXHg2YycsJ1x1MDA0Nlx1MDAzMlx1MDAzOVx1MDA0Ylx1MDA1MFx1MDA3YVx1MDA3NScsMHg1OCwweDgxLDB4N2QsMHhjLCdcdTAwNzFcdTAwNGRcdTAwMzRcdTAwNDZcdTAwNTRcdTAwNGJcdTAwNjInLDB4MmEsMHhiMywnXHUwMDZlXHUwMDU4XHUwMDc3XHUwMDMzXHUwMDYxXHUwMDMxXHUwMDZhJywnXHUwMDRkXHUwMDcwXHUwMDU4XHUwMDM0XHUwMDcyXHUwMDZkXHUwMDRkJywweDIzLDB4MzEsMHg4NCwnXHg1OVx4NzNceDY1XHg1OVx4MzVceDU3XHg3OCcsJ1x4NmZceDQ0XHg3Nlx4NTBceDMxXHgzMicsJ1x4NGNceDU2XHg3OVx4NzVceDc0XHg2NScsJ1x1MDA1Zlx1MDA2M1x1MDA0NVx1MDAzMFx1MDAzNFx1MDA0MVx1MDA0MScsJ1x4NzBceDM0XHg1NVx4NjRceDM1XHg1MycsMHgyOSwweDMwLDB4M2EsJ1x1MDA2Ylx1MDA2Ylx1MDAzN1x1MDA2YVx1MDA2M1x1MDA0NCcsMHgxMSwweDEyLCdceDU4XHg1NVx4NzJceDVhXHg2Nlx4NjVceDUwJywweDM4LDB4MzYsMHgyOCwweDJiLDB4NDMsMHg0NSwweDIwLDB4YWMsMHgyNiwweDMxMCwweDFiLDB4MWQsMHgzZCwweGIsMHhhYSwweDIxLCdceDQ1XHg2Y1x4NjJceDZlXHgzN1x4NzFceDUwJywweDFjLDB4NzIsMHgyYywweDM3LDB4ZDYsMHgyZiwnXHg2Zlx4NmUnLDB4MzMsMHgzNCwweDUxLCdcdTAwNTNcdTAwNzJcdTAwNDVcdTAwNGNcdTAwNjFcdTAwNDEnLCdcdTAwNmZcdTAwNzInLDB4ODAsMHgzYywweGFmLDB4M2UsMHg0MCwweGIxLCdceDZjJywweDVhLDB4NGMsMHg1MCwweDUyLCdcdTAwNTVcdTAwNDlcdTAwNzlcdTAwNDlcdTAwMzRcdTAwNmJcdTAwNTMnLCdcdTAwNzdcdTAwNmRcdTAwNDlcdTAwMzhcdTAwNTFcdTAwNDInLCdcdTAwNmNcdTAwNjZcdTAwNTFcdTAwNzVcdTAwNjlcdTAwNjgnLCdceDYyXHg3Nlx4NzJceDQ0XHgzMFx4MzdceDMwJywweDQyLCdcdTAwNjVcdTAwNGFcdTAwNWFcdTAwNjlcdTAwNzlcdTAwNzdcdTAwNzEnLCdceDYxXHg0MVx4NDlceDZiXHg2NFx4NGMnLCdcdTAwNWFcdTAwNDJcdTAwNzNcdTAwNTNcdTAwNTVcdTAwNTlcdTAwMzgnLCdceDYyXHg3M1x4NjZceDRmXHg0N1x4NGRceDY1JywnXHUwMDQ5XHUwMDQ4XHUwMDZkXHUwMDRmXHUwMDU4XHUwMDY1XHUwMDcwJywnXHg3NFx4NzBceDcyXHgzOVx4NTBceDMxXHg2MycsMHhiNSwnXHg2Nlx4NGFceDRiXHg1N1x4NGRceDRhJywnXHg0Y1x4NTlceDY0XHg0Y1x4NmZceDQ5JywnXHg1MFx4NmZceDUyXHgzOFx4NDVceDcxXHg2Nlx4NjknXX1mdW5jdGlvbiBSV090UW02KE1XVnZmNSxfd2ZtSXg4PTB4MCl7dmFyIHZBazN1OHY9ZnVuY3Rpb24oKXtyZXR1cm4gTVdWdmY1KC4uLmFyZ3VtZW50cyl9O3JldHVybiBrVlFQWG8odkFrM3U4diwnXHg2Y1x4NjVceDZlXHg2N1x4NzRceDY4Jyx7J1x4NzZceDYxXHg2Y1x4NzVceDY1Jzpfd2ZtSXg4LCdcdTAwNjNcdTAwNmZcdTAwNmVcdTAwNjZcdTAwNjlcdTAwNjdcdTAwNzVcdTAwNzJcdTAwNjFcdTAwNjJcdTAwNmNcdTAwNjUnOnRydWV9KX0="
		})
	},

	interactions: function(req, res){
		res.status(204).end()
	},

	playRegion: function(req, res){
		res.status(204).end()
	},

	storeAccess: function(req, res){
		res.status(204).end()
	},

	trackData: async function(req, res){
        const data = (await axios.get(`https://cdn.qstv.on.epicgames.com/${req.params.trackdata}`)).data;
        return res.json(data)
    },

	trackSegment: async function(req, res){
		try{
			const response = await axios.get(`https://pilgrim.qstv.on.epicgames.com${req.originalUrl}`, {
				responseType: 'stream' 
			});
			res.set({
				'Content-Type': 'video/mp4'
			});
			response.data.pipe(res);
		}
		catch{
			const response = await axios.get(`https://cdn-0001.qstv.on.epicgames.com${req.originalUrl}`, {
				responseType: 'stream',
			});
			res.set({
				'Content-Type': 'video/mp4',
			});
			response.data.pipe(res);
		}
    },

	languages: function(req, res){
		res.status(200).end()
	},

    userSetting: function(req, res){
        res.json([
			{
				"accountId": req.body.accountId,
				"key": "avatar",
				"value": "cid_003_athena_commando_f_default"
			},
			{
				"accountId": req.body.accountId,
				"key": "avatarBackground",
				"value": "[\"#B4F2FE\",\"#00ACF2\",\"#005679\"]"
			},
			{
				"accountId": req.body.accountId,
				"key": "appInstalled",
				"value": "init"
            }
        ])
    },

    epicSettings: function(req, res){
        res.json(loadJSON("../responses/epic-settings.json"))
    },

	tryPlayOnPlatform: function(req, res){
        res.set('Content-Type', 'text/plain');
		res.send(true);
    },

    privacySettings: function(req, res){
        res.json({
			"privacySettings":{
				"playRegion":"PRIVATE",
				"badges":"PRIVATE",
				"languages":"PRIVATE"
			}
		})
    },

    leaderboards: function(req, res){
        res.json({
			"gameId": "Fortnite",
			"eventId": req.params.eventId,
			"eventWindowId": req.params.eventWindowId,
			"page": 0,
			"totalPages": 1,
			"updatedTime": new Date(new Date().getTime()).toISOString(),
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
    },

    eventsDownload: function(req, res){
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
    },

    region: function(req, res){
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
    },

    brInventory: function(req, res){
        res.json({
			"stash": {
				"globalcash": parseInt(config.Gold)
			},
		})
    },

	blurl: async function(req, res){
		const response = await axios.get(`https://cdn-0001.qstv.on.epicgames.com/${req.params.resourceId}/master.blurl`, {
            responseType: 'stream' 
        });
        res.set({
            'Content-Type': "application/octet-stream"
        });
        response.data.pipe(res);
	}

};