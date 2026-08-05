const path = require('path');
const NeoLog = require("../../structs/NeoLog")
const { default: axios } = require("axios");
const fs = require('fs')
const jsonwebtoken = require('jsonwebtoken');
const ini = require('ini')
const { getVersionInfo, loadJSON, VersionFilter, misc, compareAndUpdateKeychain, TCPRequests } = require("../../config/defs");
const config = ini.parse(fs.readFileSync(path.join(__dirname, '../../config.ini'), 'utf-8'));
let requested = false
const fortnitegame = loadJSON("../responses/fortnitegame.json")


module.exports = {

	distributionPoints: function (req, res) {
		res.json({
			"distributions": [
				"http://localhost:5595/",
				"https://download.epicgames.com/",
				"https://epicgames-download1.akamaized.net/",
				"https://fastly-download.epicgames.com/"
			]
		});
	},

	launcherCatalogItem: function (req, res) {
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

	manifest: async function (req, res) {
		res.set("content-type", "application/octet-stream")
		if (!requested) {
			res.sendFile(path.join(__dirname, '../../LauncherAssets/Neonite.manifest'));
			requested = true
		}
		else if (requested) {
			const response = await TCPRequests('GET', 'fastly-download.epicgames.com', `${req.originalUrl}`, { responseType: 'stream' });
			requested = false
			response.data.pipe(res);
		}
	},

	ini: function (req, res) {
		res.setHeader("content-type", "application/octet-stream")
		res.sendFile(path.join(__dirname, '../../LauncherAssets/Full.ini'));
	},
	//todo: LauncherAssets -> manifestAssets

	ChunksV4: async function (req, res) {
		res.setHeader("Content-Type", "application/octet-stream");

		const cacheDir = path.join(process.cwd(), "cache/ChunksV4");
		const cacheFile = path.join(cacheDir, req.params.chunkFile);

		if (!fs.existsSync(cacheDir)) {
			fs.mkdirSync(cacheDir, { recursive: true });
		}
		if (fs.existsSync(cacheFile)) {
			return fs.createReadStream(cacheFile).pipe(res);
		}
		else {
			const response = await TCPRequests('GET', 'fastly-download.epicgames.com', `${req.originalUrl}`, { responseType: 'stream' });

			const fileStream = fs.createWriteStream(cacheFile);
			response.data.pipe(fileStream);
			response.data.pipe(res);
		}
	},

	ias: async function (req, res) {
		res.setHeader("Content-Type", "application/octet-stream");

		const cacheDir = path.join(process.cwd(), "cache/ias");
		const cacheFile = path.join(cacheDir, req.params.Hash);

		if (!fs.existsSync(cacheDir)) {
			fs.mkdirSync(cacheDir, { recursive: true });
		}
		if (fs.existsSync(cacheFile)) {
			return fs.createReadStream(cacheFile).pipe(res);
		}
		else {
			const response = await TCPRequests('GET', 'fastly-download.epicgames.com', `${req.originalUrl}`, { responseType: 'stream' });

			const fileStream = fs.createWriteStream(cacheFile);
			response.data.pipe(fileStream);
			response.data.pipe(res);
		}
	},

	iasChunks: async function (req, res) {
		res.setHeader("Content-Type", "application/octet-stream");

		const cacheDir = path.join(process.cwd(), "cache/ias");
		const cacheFile = path.join(cacheDir, req.params.chunkFile);

		if (!fs.existsSync(cacheDir)) {
			fs.mkdirSync(cacheDir, { recursive: true });
		}
		if (fs.existsSync(cacheFile)) {
			return fs.createReadStream(cacheFile).pipe(res);
		}
		else {
			const response = await TCPRequests('GET', 'fastly-download.epicgames.com', `${req.originalUrl}`, { responseType: 'stream' });
			const fileStream = fs.createWriteStream(cacheFile);
			response.data.pipe(fileStream);
			response.data.pipe(res);
		}
	},

	lightSwitchBulk: function (req, res) {
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

	lightswitch: function (req, res) {
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

	eventHistory: function (req, res) {
		res.json([])
	},

	versionCheck: function (req, res) {
		res.json({ "type": "NO_UPDATE" })
	},

	privacy: function (req, res) {
		res.json({
			"accountId": req.params.accountId,
			"optOutOfPublicLeaderboards": false
		})
	},

	dataAsset: function (req, res) {
		const { versionGlobal, version } = getVersionInfo(req);
		const FrontendAssets = loadJSON('../responses/FortniteAssets.json');
		const FortniteGameConfig = loadJSON('../FortniteGameConfig.json');
		const dataAssetBuilder = (dataAssetResponse, primaryAssetType, promotion, primaryAssetName, assetData) => {
			dataAssetResponse[primaryAssetType] ??= {
				meta: { promotion },
				assets: {}
			};
			dataAssetResponse[primaryAssetType].assets[primaryAssetName] = {
				meta: {
					revision: 2,
					headRevision: 2,
					revisedAt: "2023-11-27T06:41:57.818Z",
					promotion: 3,
					promotedAt: "2023-11-27T06:43:00.452Z"
				},
				assetData
			};
		};

		if(version >= 17.40){
			dataAssetBuilder(FrontendAssets, "FortCreativeDiscoverySurface", 2, "CreativeDiscoverySurface_Frontend", {
                  "AnalyticsId": "v538",
                  "TestCohorts": [
                      {
                          "AnalyticsId": "c-1v2_v2_c727",
                          "CohortSelector": "PlayerDeterministic",
                          "PlatformBlacklist": [],
                          "CountryCodeBlocklist": [],
                          "ContentPanels": [
                              {
                                  "NumPages": 1,
                                  "AnalyticsId": "p1114",
                                  "PanelType": "AnalyticsList",
                                  "AnalyticsListName": "ByEpicNoBigBattle",
                                  "CuratedListOfLinkCodes": [],
                                  "ModelName": "",
                                  "PageSize": 7,
                                  "PlatformBlacklist": [],
                                  "PanelName": "ByEpicNoBigBattle6Col",
                                  "MetricInterval": "",
                                  "CountryCodeBlocklist": [],
                                  "SkippedEntriesCount": 0,
                                  "SkippedEntriesPercent": 0,
                                  "SplicedEntries": [],
                                  "PlatformWhitelist": [],
                                  "MMRegionBlocklist": [],
                                  "EntrySkippingMethod": "None",
                                  "PanelDisplayName": {
                                      "Category": "Game",
                                      "NativeCulture": "",
                                      "Namespace": "CreativeDiscoverySurface_Frontend",
                                      "LocalizedStrings": [],
                                      "bIsMinimalPatch": false,
                                      "NativeString": "LTMS",
                                      "Key": "ByEpicNoBigBattle6Col"
                                  },
                                  "PlayHistoryType": "RecentlyPlayed",
                                  "bLowestToHighest": false,
                                  "PanelLinkCodeBlacklist": [],
                                  "CountryCodeAllowlist": [],
                                  "PanelLinkCodeWhitelist": [],
                                  "FeatureTags": [
                                    "col:5"
                                ],
                                  "MMRegionAllowlist": [],
                                  "MetricName": ""
                              },
                              {
                                  "NumPages": 2,
                                  "AnalyticsId": "p969|88dba0c4e2af76447df43d1e31331a3d",
                                  "PanelType": "AnalyticsList",
                                  "AnalyticsListName": "EventPanel",
                                  "CuratedListOfLinkCodes": [],
                                  "ModelName": "",
                                  "PageSize": 25,
                                  "PlatformBlacklist": [],
                                  "PanelName": "EventPanel",
                                  "MetricInterval": "",
                                  "CountryCodeBlocklist": [],
                                  "SkippedEntriesCount": 0,
                                  "SkippedEntriesPercent": 0,
                                  "SplicedEntries": [],
                                  "PlatformWhitelist": [],
                                  "MMRegionBlocklist": [],
                                  "EntrySkippingMethod": "None",
                                  "PanelDisplayName": {
                                      "Category": "Game",
                                      "NativeCulture": "",
                                      "Namespace": "CreativeDiscoverySurface_Frontend",
                                      "LocalizedStrings": [],
                                      "bIsMinimalPatch": false,
                                      "NativeString": "Event LTMS",
                                      "Key": "EventPanel"
                                  },
                                  "PlayHistoryType": "RecentlyPlayed",
                                  "bLowestToHighest": false,
                                  "PanelLinkCodeBlacklist": [],
                                  "CountryCodeAllowlist": [],
                                  "PanelLinkCodeWhitelist": [],
                                  "FeatureTags": [
                                      "col:6"
                                  ],
                                  "MMRegionAllowlist": [],
                                  "MetricName": ""
                              }
                          ],
                          "PlatformWhitelist": [],
                          "SelectionChance": 0.1,
                          "TestName": "testing"
                        }
                      ],
                      "GlobalLinkCodeBlacklist": [],
                      "SurfaceName": "CreativeDiscoverySurface_Frontend",
                      "TestName": "20.10_4/11/2022_hero_combat_popularConsole",
                      "primaryAssetId": "FortCreativeDiscoverySurface:CreativeDiscoverySurface_Frontend",
                      "GlobalLinkCodeWhitelist": []
                    });
		}

		if (config.FortniteGameConfig === true && version >= 24.00) {
			dataAssetBuilder(FrontendAssets, "FortPlaylistAthena", 1, FortniteGameConfig.playlist_config, FortniteGameConfig.playlist_settings);
		}

		if (versionGlobal >= 32) {
			dataAssetBuilder(FrontendAssets, "FortPlaylistAthena", 9, "Playlist_SunflowerSolo", {
				TimeOfDayManager: "/BlastBerryMap/Game/TimeOfDay/TODM/DSA_UEFN_Sunflower.DSA_UEFN_Sunflower_C"
			});
		}

		if (versionGlobal >= 34) {
			dataAssetBuilder(FrontendAssets, "FortPlaylistAthena", 9, "Playlist_DashBerrySolo", {
				TimeOfDayManager: "/BlastBerryMap/Game/TimeOfDay/TODM/DSA_UEFN_Sunflower.DSA_UEFN_Sunflower_C"
			});
		}

		if (version >= 36.10) {
			dataAssetBuilder(FrontendAssets, "FortPlaylistAthena", 9, "Playlist_TimberStakeSolo", {
				TimeOfDayManager: "/c18c4fa1-4e7f-6d71-5747-149195af86f7/TimeOfDay/DaySequenceActors/DSA_SunFlower_Ch6s1.DSA_SunFlower_Ch6s1_C"
			});
		}

		if (version >= 37.50) {
			dataAssetBuilder(FrontendAssets, "FortPlaylistAthena", 9, "Playlist_SourSpawnSolo", {
				TimeOfDayManager: "/Game/TimeOfDay/DaySequence/DaySequenceActors/BR_Ch6/DSA_BR_Ch6S4_FNM25.DSA_BR_Ch6S4_FNM25_C"
			});
		}

		if (versionGlobal >= 39) {
			dataAssetBuilder(FrontendAssets, "FortPlaylistAthena", 9, "Playlist_PiperBootSolo", {
				TimeOfDayManager: "/Game/TimeOfDay/DaySequence/DaySequenceActors/BR_Ch7/DSA_BR_Ch7S1.DSA_BR_Ch7S1_C"
			});
		}
		if (version >= 40.20) {
			dataAssetBuilder(FrontendAssets, "FortPlaylistAthena", 9, "Playlist_MatchMistSolo", {
				TimeOfDayManager: "/Game/TimeOfDay/DaySequence/DaySequenceActors/BR_Ch7/DSA_BR_Ch7S1.DSA_BR_Ch7S1_C"
			});
		}

		if (versionGlobal >= 39) {
			dataAssetBuilder(FrontendAssets, "FortPlaylistAthena", 1, "Playlist_Trios", {
				PreloadPersistentLevel: "/WildEstate/Maps/WildEstate_Terrain.WildEstate_Terrain"
			})

			if (versionGlobal === 39) {
				dataAssetBuilder(FrontendAssets, "FortPlaylistAthena", 1, "Playlist_DefaultDuo", {
					PreloadPersistentLevel: "/BRMapCh6/Maps/Hermes_Terrain.Hermes_Terrain"
				});
			}
		}
		/*if (misc.bInEditor === true) {
			dataAssetBuilder(FrontendAssets, "CosmeticLoadoutSchema", 1, "LoadoutSchema_Character", {
				"Slots": [
					"/Game/Items/Loadouts/Slots/LoadoutSlot_Character.LoadoutSlot_Character",
					"/Game/Items/Loadouts/Slots/LoadoutSlot_Backpack.LoadoutSlot_Backpack",
					"/Game/Items/Loadouts/Slots/LoadoutSlot_Pickaxe.LoadoutSlot_Pickaxe",
					"/Game/Items/Loadouts/Slots/LoadoutSlot_Glider.LoadoutSlot_Glider",
					"",
					"/Game/Items/Loadouts/Slots/LoadoutSlot_Contrails.LoadoutSlot_Contrails",
					"/Game/Items/Loadouts/Slots/LoadoutSlot_Aura.LoadoutSlot_Aura",
				]
			});
			dataAssetBuilder(FrontendAssets, "CosmeticLoadoutSchema", 1, "LoadoutSchema_LegoSets", {
				"Slots": [
					"",
					""
				],
				bIsSchemaActivatable: false
			});
			dataAssetBuilder(FrontendAssets, "CosmeticLoadoutSchema", 1, "LoadoutSchema_Vehicle", {
				"Slots": [
					"",
					"",
					"",
					"",
					"",
					"",
					"",
				],
				bIsSchemaActivatable: false
			});
			dataAssetBuilder(FrontendAssets, "CosmeticLoadoutSchema", 1, "LoadoutSchema_Vehicle_SUV", {
				"Slots": [
					"",
					"",
					"",
					"",
					"",
					"",
					"",
				],
				bIsSchemaActivatable: false
			});
		}*/
		res.json(FrontendAssets);
	},

	dataAssetFortPlaylist: function (req, res) {
		return res.status(204).end()
	},

	catalog: function (req, res) {
		const { version } = getVersionInfo(req);
		if (VersionFilter.includes(version) || version <= 3.5) {
			return res.status(404).end();
		}
		const shop = version >= 30.10 ? loadJSON("../responses/catalog/shopv3.json")
			: version >= 26.30
				? loadJSON("../responses/catalog/shopv2.json")
				: loadJSON("../responses/catalog/shopv1.json");
		shop.expiration = new Date(new Date().getTime() + 30000).toISOString()
		return res.json(shop)
	},

	catalogBulk: function (req, res) {
		res.json({})
	},

	enabledFeatures: function (req, res) {
		res.json([])
	},

	socialban: function (req, res) {
		res.json({
			"bans": [],
			"warnings": []
		})
	},

	creative: function (req, res) {
		res.json({
			"results": [],
			"hasMore": false
		})
	},

	sac: function (req, res) {
		res.json({
			id: "aabbccddeeff11223344556677889900",
			slug: req.params.affiliateName,
			displayName: req.params.affiliateName,
			status: "ACTIVE",
			verified: true
		})
	},

	contentControls: function (req, res) {
		res.json({
			'data': {
				'ageGate': 0,
				'controlsEnabled': false,
				'maxEpicProfilePrivacy': 'none',
				'principalId': req.params.accountId
			}
		})
	},

	verifyPin: function (req, res) {
		res.json({
			"data": {
				"pinCorrect": true
			}
		})
	},

	fetchLegoWorlds: function (req, res) {
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

	makeLegoWorlds: function (req, res) {
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

	worldInfo: function (req, res) {
		const { version, versionGlobal } = getVersionInfo(req);
		if (version >= 11.00 || versionGlobal >= 11) {
			res.status(404).end()
		}
		else {
			res.json({})
		}
	},

	legoWorldSession: function (req, res) {
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

	legoMatchMakingToken: function (req, res) {
		const waspToken = jsonwebtoken.sign({
			"namespaceId": "fn",
			"worldId": req.params.worldId,
			"iss": "epicgames",
			"exp": 1701790200,
			"iat": 1701789900
		}, "ES256");
		res.set("Content-Type", "application/jwt;charset=utf-8")
		res.send(`wasp~${waspToken}`)
	},

	salesEvent: function (req, res) {
		return res.status(404).end()
	},

	gameRating: function (req, res) {
		return res.status(404).end()
	},

	keychain: async function (req, res) {
		try {
			if(config.bRefreshKeychainViaKeychainEndpoint == true){
				await compareAndUpdateKeychain();
			}
		}
		catch {
			NeoLog.Error("Unable to connect to dillyapis! Falling back to existing keychains on your local disk. Some Encrypted Assets may not be accessible")
		}
		const keychainArray = [
			"46159C748694298198A52DC07476FDA3:4CLHOBqSrmS1RkG/SxZYi8Rc0zCmAKxXIBMMUHDl2ag=",
			"1C6FDB12D706D59E15399DB8FD1EFD85:39JQsqlpGBC1xEz4qeYUYT8Nta0ZkYb3GvjEumq+bAM=",
			"299C16019D64B4942BC10988AD3B82A0:jTs56Mt7WtAkJ6p14hizw/FPE7pQ60QW9mKQa2ugnjU=",
			"8EAC5C7EBC5D4B2BE7AC223C88A7C8BD:CfJasRJ6JpLj0yBGbHihEx9+gcu/QFIX1qv3QddYmoc=",
			"E9E8A12CD60F5B7E5FCE97F43565BD4E:cCTmwC/MmQKzjDfE7lzZrTRAGGHqqWAbZ5HQ7KGhCw8=:GameFeaturePlugin_QuailPlaylist_v3",
			"D79AB2C3DF4BEA1654BDFC5904F2B31C:T7Dj643cHywxlsi9u6aWwH8yL4+/JWBwL4sKaRuMkT0=",
			"775056356849367BC0B1B596C264EEC8:Cw8qKaigDQmGnF0LfLAORqiGtOiyAZoRsAKJdu9JPpE=",
			"D79AB2C3DF4BEA1654BDFC5904F2B31C:T7Dj643cHywxlsi9u6aWwH8yL4+/JWBwL4sKaRuMkT0=",
			"213432DC14EE2264EBCFE126AF507BE0:R1zqETEHHbLDKvu4fNFCIwucPrtRCMaWitfFoBYkmgo=",
			"435081A591BB5FDB12F5366465B29558:cQnWAVHDToeSs9iUV7dXlEo/7lzic1uFW+5/LMpYWw4=",
			"AF9A8DD91ECD3531C45DF9DD39C83A6F:ysr/treutIfls5AKhod2kifYg5wthxXkmBXy12ac6MM=",
			"E3DA1D71C4B68FCC8525A4081A592A18:I20vHNntk2wTOlV2yD32/XVZpXvdgUNMeH+xnoj80Mw=",
			"FCA2163FC09B97A55A70611AEFE2B438:xwH/uh4MoYRy/tGQ9tslV07CenGxa8XvBMiriKy+RvY=",
			"67644F946DF9404F175F23C8D1DB3D1F:/x6AcQowLgz3kSzf18gUffIhnj34n19qiea0w1E5JBc=",
			"84BE268FA4A510A2A6D06E9B09FE6D52:c8xfsnyoIapTy6rEfXfpOD+qzgvhRyMjwtzDcdJD/kY=",
			"A6308197EE1E5323173A9E1E352F6AC9:XhYoDJR5OZQXM9myqXqA8yXYwm3h3kiHuk8GCCZy2OQ=",
			"C54286CDBF1C3845ED1B30ED120B7681:PJeaXSIyn4OKMrU7My96blKsG76hY/gJKAWtpEnKgLg=",
			"DC5875627031B431F7CA00EB340AD357:6Z4KjcvJJs7Cd7losTCw5CKMYQ6+f+W6PN0h9BjUu2w=",
			"95F27017E9C9297290DB60941B1C8355:YPWJFdLs7FUG6/8uqCpk7VrfP5Pxuo+u2QposQWrzIY=",
			"2BBA134ECCB70D2F2815F1E532B8C829:L/LscqejB1XTFtcDWJpLl3byAMZvL3lXAQ2WdPPzU9c=",
			"428A9F9F7AF8204CBF66626A1B8BE656:W4s30q8DXgpIC4A6Li5Ic8PHf41EMXIq+pSiAbLfWL8=",
			"BC38720BBB4F7874E1189A61719B3C7A:Vh9GR/gpf+ZjUKiDYljjE02jlD0rd7B2mCgdnVcQlnY=",
			"8ADEA0E32852BBB789AF3EF9528C0093:zuEygUh+jHlYA6BOqtRubPFgqN1UO4zEGHEp/FgxqdM="
		]
		const keychainFile = loadJSON("../responses/keychain.json");
		keychainArray.push(...keychainFile);
		res.json(keychainArray)
	},

	regionCheck: function (req, res) {
		res.json({
			"content_id": "AF9yLAAsklQALFTy",
			"allowed": true,
			"resolved": true,
			"limit": "Res=656"
		})
		//https://github.com/LeleDerGrasshalmi/FortniteEndpointsDocumentation/blob/ec6b267bca542a2b8804084622721a4bd8ae7c7f/EpicGames/IPDataService/RegionCheck.md
	},

	trackData: async function (req, res) {
		const trackData = (await axios.get(`https://cdn.qstv.on.epicgames.com/${req.params.trackdata}`, {
			headers: {
				"Authorization": req.headers.authorization
			},
		})).data;
		return res.json(trackData)
	},

	sparksTrack: async function (req, res) {
		const response = await axios.get(`https://cdn2.unrealengine.com/${req.params.sparksTrack}.dat`, {
			responseType: 'stream'
		});
		response.data.pipe(res);
	},

	sparksLipSyncData: async function (req, res) {
		res.setHeader("content-type", "application/octet-stream")
		const response = await axios.get(`https://cdn2.unrealengine.com/${req.params.sparksLipSyncData}.lad`)
		res.send(response.data)
	},

	trackSegment: async function (req, res) {
		const trackSegmentUrls = [
			'https://pilgrim.qstv.on.epicgames.com',
			'https://cdn-0001.qstv.on.epicgames.com',
			'https://fortnite-vod.akamaized.net'
		];
		for (const segmentUrlArray of trackSegmentUrls) {
			const response = await axios.get(`${segmentUrlArray}${req.originalUrl}`, {
				responseType: 'stream',
				headers: {
					Range: req.headers.range ?? 'bytes=0'
				},
			});

			res.set({
				'Content-Type': response.headers['content-type'],
				'Content-Range': response.headers['content-range'],
				'Accept-Ranges': 'bytes'
			})
			return response.data.pipe(res)
		}
	},

	userSetting: function (req, res) {
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

	epicSettings: function (req, res) {
		res.json(loadJSON("../responses/epic-settings.json"))
	},

	tryPlayOnPlatform: function (req, res) {
		res.set('Content-Type', 'text/plain');
		res.send(true);
	},

	privacySettings: function (req, res) {
		res.json({
			"privacySettings": {
				"playRegion": "PRIVATE",
				"badges": "PRIVATE",
				"languages": "PRIVATE"
			}
		})
	},

	leaderboards: function (req, res) {
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
						"VICTORY_ROYALE_STAT:1": {
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

	eventsDownload: function (req, res) {
		const { versionGlobal } = getVersionInfo(req);
		if (versionGlobal === 9) { return res.status(404) }
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
					"minimumAccountLevel": 1,
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
						"endTime": "9999-12-30T20:00:00.000Z",
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
						"additionalRequirements": [],
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
				"endTime": "9999-12-30T20:00:00.000Z",
			}],
			"templates": [],
			"scores": [],
			"leaderboardDefs": [{
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

	region: function (req, res) {
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

	brInventory: function (req, res) {
		res.json({
			"stash": {
				"globalcash": parseInt(config.Gold)
			},
		})
	},

	blurl: async function (req, res) {
		const response = await axios.get(`https://cdn-0001.qstv.on.epicgames.com/${req.params.resourceId}/master.blurl`, {
			responseType: 'stream'
		});
		res.set({
			'Content-Type': "application/octet-stream"
		});
		response.data.pipe(res);
	},

	postPartyInstallStatus: function (req, res) {
		const JWT = req.headers["authorization"].replace("Bearer ", "")
		const JWTdecode = jsonwebtoken.decode(JWT)
		res.json({
			"accountId": JWTdecode["sub"],
			"isInstalled": false
		})
	},

	lfgSettings: function (req, res) {
		res.json({
			"isLookingForGroup": true,
			"preferredRegion": "EU"
		})
	},

	followers: function (req, res) {
		res.json({
			"followed": []
		})
	},

	interactions: function (req, res) {
		res.json({
			interactions: [],
		})
	},

	sparks: async function (req, res) {
		const data = await TCPRequests('GET', 'fortnitecontent-website-prod07.ol.epicgames.com', "/content/api/pages/fortnite-game/spark-tracks");
		Object.values(data.data).forEach(item => {
			if (item.track?.au) {
				item.track.au = 'http://localhost:5595/cdn2-unrealengine' + new URL(item.track.au).pathname;
			}
		});
		res.json(data.data);
	},

	eventScreen: async function (req, res) {
		try {
			const data = await TCPRequests('GET', 'fortnitecontent-website-prod07.ol.epicgames.com', "/content/api/pages/fortnite-game/eventscreens");
			res.json(data.data);
		}
		catch {
			res.json(fortnitegame.eventscreens);
		}
	},

	seasonPass: async function (req, res) {
		try {
			const data = await TCPRequests('GET', 'fortnitecontent-website-prod07.ol.epicgames.com', "/content/api/pages/fortnite-game/seasonpasses");
			data.data = JSON.parse(JSON.stringify(data.data).replaceAll('https://cdn2.unrealengine.com', 'http://localhost:5595/cdn2-unrealengine'));
			res.json(data.data)
		}
		catch {
			res.json({
				"_title": "seasonpasses",
				"_noIndex": false,
				"_activeDate": "2024-10-15T00:27:45.046Z",
				"lastModified": "2025-10-09T11:24:05.519Z",
				"_locale": "en-US",
				"_templateName": "blank",
				"battlepassdata": {
					"_title": "battlepassdata",
					"_activeDate": "2025-10-01T18:17:00.000Z",
					"lastModified": "2025-10-01T18:09:44.216Z",
					"_locale": "en-US",
					"_templateName": "BattlePassPurchaseTemplate"
				},
				"figmentpassdata": {
					"_title": "Figmentpassdata",
					"_activeDate": "2025-10-02T08:00:00.000Z",
					"lastModified": "2025-10-01T20:24:42.073Z",
					"_locale": "en-US",
					"_templateName": "BattlePassPurchaseTemplate"
				},
				"legopassdata": {
					"_title": "legopassdata",
					"_activeDate": "2025-08-07T06:00:00.000Z",
					"lastModified": "2025-09-23T21:23:44.909Z",
					"_locale": "en-US",
					"_templateName": "BattlePassPurchaseTemplate"
				},
				"musicpassdata": {
					"_title": "Musicpassdata",
					"_activeDate": "2025-10-09T07:30:00.000Z",
					"lastModified": "2025-10-09T11:24:05.519Z",
					"_locale": "en-US",
					"_templateName": "BattlePassPurchaseTemplate"
				},
				"_suggestedPrefetch": []
			})
		}
	},

	magpieInventory: function (req, res) {
		if (config.relicStarterScreen && !misc.relicStarterScreenDone) {
			res.json({
				"accountId": req.params.accountId,
				"deploymentId": req.params.deploymentId,
				"domain": "FN1",
				"inventory": [],
				"linkMode": "live",
				"workspace": "default"
			})
		}
		else {
			const spriteCollection = loadJSON("../responses/sprites/collection.json")
			const entitlementMetadata = {}

			for (const key in spriteCollection) {
				if (key !== "Currency_ExtractionPoints") {
					// set level and mastered status
					entitlementMetadata[key] = JSON.stringify({
						xp: parseInt(config.relicXP),
						ml: config.relicMastered
					})

					// set to owned
					if (config.allRelicsOwned) {
						spriteCollection[key] = 2
					}
				}
			}

			res.json({
				"accountId": req.params.accountId,
				"deploymentId": req.params.deploymentId,
				"domain": "FN1",
				"inventory": [
					{
						"counts": spriteCollection,
						"entitlementMetadata": entitlementMetadata,
						"metadata": "{\"StarterRelic\":\"EarthSprite_Variant_A\",\"EquippedVariant\":\"None\"}",
						"metadataSchemaVersion": 0,
						"moduleId": "70329e8f-f377-4a73-90cf-76b7ace87a07",
						"purchasedEntitlementConsequentialToGameplay": false
					}
				],
				"linkMode": "live",
				"workspace": "default"
			})
		}
	},

	extractableRelics: async function (req, res) {
		const sprite = req.body.relicId;
		const spriteCollection = loadJSON("../responses/sprites/collection.json")

		switch (req.body.commandId) {
			case "purchase":
				spriteCollection[sprite] = 2

				const extractableRelicsCatalog = loadJSON("../responses/sprites/catalog.json")
				spriteCollection.Currency_ExtractionPoints -= (extractableRelicsCatalog[sprite]?.attributes?.summonCost ?? 0);

				fs.writeFileSync("./responses/sprites/collection.json", JSON.stringify(spriteCollection, null, 2))

				res.status({
					deploymentId: null,
					accountId: null,
					domain: null,
					linkMode: null,
					workspace: null,
					inventory: [{
						moduleId: "70329e8f-f377-4a73-90cf-76b7ace87a07",
						purchasedEntitlementConsequentialToGameplay: false,
						counts: {
							[sprite]: 2
						},
					}]
				})
				break;
			case "equip":
				res.json({
					deploymentId: null,
					accountId: null,
					domain: null,
					linkMode: null,
					workspace: null,
					inventory: [{
						moduleId: "70329e8f-f377-4a73-90cf-76b7ace87a07",
						purchasedEntitlementConsequentialToGameplay: false,
						counts: {
							[sprite]: 2
						},
						metadata: JSON.stringify({
							StarterRelic: sprite,
							EquippedVariant: sprite
						})
					}]
				})
				break;
			case "starter":
				misc.relicStarterScreenDone = true;

				spriteCollection[sprite] = 2
				spriteCollection.Currency_ExtractionPoints = 999999

				fs.writeFileSync("./responses/sprites/collection.json", JSON.stringify(spriteCollection, null, 2))

				res.json({
					deploymentId: null,
					accountId: null,
					domain: null,
					linkMode: null,
					workspace: null,
					inventory: [{
						moduleId: "70329e8f-f377-4a73-90cf-76b7ace87a07",
						purchasedEntitlementConsequentialToGameplay: false,
						counts: {
							[sprite]: 2,
							Currency_ExtractionPoints: 999999
						},
						metadata: JSON.stringify({
							StarterRelic: sprite
						})
					}]
				})
				break;
		}
	},

	extractableRelicsCatalog: function (req, res) {
		const relicsCatalog = loadJSON("../responses/sprites/catalog.json")
		res.json(relicsCatalog)
	},


	questProgress: function (req, res) {
		const { versionGlobal } = getVersionInfo(req);
		res.json({
			"accountXp": {
				"dynamicXp": {
					"timespan": 0,
					"bucketXp": 0,
					"bankXp": 0,
					"bankXpMult": 0,
					"boosterBucketXp": 0,
					"boosterXpMult": 0,
					"weeklyExcessXpMult": 1,
					"currentWeekXp": 0,
					"currentWeek": 9
				},
				"playtimeXp": {
					"currentWeek": 9,
					"currentWeekXp": 0
				},
				"restedXp": 0,
				"seasonXp": 0,
				"seasonLevel": config.Level,
				"seasonNumber": versionGlobal,
				"seasonBegin": "2025-06-01T13:00:00Z",
				"timeDilation": 0
			}
		})
	},

	cosmoFdeb: async function (req, res) {
		const decodedString = Buffer.from(req.query["d"], "base64").toString("utf8");
		var [fn, version, cosmetic, imageType, randomChars] = decodedString.split('/')
		cosmetic = cosmetic.split(':')[1]
		const cacheDir = path.join(process.cwd(), "cache/images");
		const cacheFile = path.join(cacheDir, `${cosmetic}_${imageType}.png`);

		if (!fs.existsSync(cacheDir)) {
			fs.mkdirSync(cacheDir, { recursive: true });
		}
		if (fs.existsSync(cacheFile) && fs.statSync(cacheFile).size > 500) {
			res.setHeader("Content-Type", "image/png");
			return fs.createReadStream(cacheFile).pipe(res);
		}
		else {
			const response = await TCPRequests('GET', 'cosmo.fdeb.live.use1a.on.epicgames.com', req.originalUrl, { responseType: "stream" })
			res.set({
				'Content-Type': "image/png",
			});
			const fileStream = fs.createWriteStream(cacheFile);
			response.data.pipe(fileStream);
			response.data.pipe(res);
		}
	},

	 contentLinkPackage: async function (req, res) {
        /*
         * This endpoint requires auth on Epics server
         * The data in this cooked-content-package changes every update
         * It gets routed trough a caching server which stores this and requests new ones when needed
        */
        const response = await axios.post(`https://epic-cache-dev.neptune.cbn.lol/content/cooked-content`, {
            linkCode: req.params.linkId,
            role: req.query.role || "client",
            client: req.query.platform || "windows",
            majorVersion: parseInt(req.query.major),
            minorVersion: parseInt(req.query.minor),
            patch: parseInt(req.query.patch),
            shaderformat: req.query.shaderformat || "",
        });
        res.json(response.data.result);
    },

	cookedContentChunk: async function (req, res) {
		res.setHeader("Content-Type", "application/octet-stream");
		const cacheDir = path.join(process.cwd(), "cache/cookedContentChunks");
		const cacheFile = path.join(cacheDir, req.params.chunkFile);

		if (!fs.existsSync(cacheDir)) {
			fs.mkdirSync(cacheDir, { recursive: true });
		}
		if (fs.existsSync(cacheFile)) {
			return fs.createReadStream(cacheFile).pipe(res);
		}
		else {
			const response = await axios.get(`https://cooked-content-live-cdn.epicgames.com${req.originalUrl}`, ({ responseType: 'arraybuffer' }))
			res.set({
				'Content-Type': 'binary/octet-stream',
				'Content-Length': response.data.length,
				'Last-Modified': response.headers['last-modified'],
				'ETag': response.headers['etag'],
				'x-amz-meta-content-md5': response.headers['x-amz-meta-content-md5']
			});
			fs.writeFileSync(cacheFile, response.data);
			res.send(response.data);
		}
	},

	cookedContentPlugin: async function (req, res) {
		const response = await axios.get(`https://cooked-content-live-cdn.epicgames.com${req.originalUrl}`, ({ responseType: 'arraybuffer' }))
		res.set({
			'Content-Length': response.data.length,
			'Last-Modified': response.headers['last-modified'],
			'ETag': response.headers['etag'],
			'x-amz-meta-content-md5': response.headers['x-amz-meta-content-md5']
		});
		res.send(response.data);
	},

	publicAccounts: async function (req, res) {
		res.json({
			"accounts": [
				{
					"accountId": req.query.accountId,
					"tags": []
				}
			]
		})
	},

	playerTokens: function (req, res) {
		res.json({
			"accounts": [{
				"accountId": "e7c388664e5442e89f30b396d9fa7183",
				"tokens": []
			}]
		})
	},

	heraMesh: function (req, res) {
		res.json({
			"SpecialEventScriptMeshActorData": {},
			"MeshNetworkedEvent.Clash.FactionB": {
				"metadataStructName": "MeshNetworkedEventMetadata",
				"metadataStructData": {
					"requiredValue": 2000000000,
					"bHasInitialized": true,
					"bHasCompleted": true,
					"currentValue": 2000000000
				}
			},
			"MeshNetworkedEvent.Clash.FactionA": {
				"metadataStructName": "MeshNetworkedEventMetadata",
				"metadataStructData": {
					"requiredValue": 2000000000,
					"bHasInitialized": true,
					"bHasCompleted": true,
					"currentValue": 2000000000
				}
			},
			"MeshNetworkedEvent.FactionDuelVictory": {
				"metadataStructName": "MeshNetworkedEventMetadata",
				"metadataStructData": {
					"requiredValue": 4000000000,
					"bHasInitialized": true,
					"bHasCompleted": true,
					"currentValue": 4000000000
				}
			}
		})
	},

	downtimeMeshNetwork: function (req, res) {
		res.json({
			"NightNightFrontend": {
				"AreWeGettingSleepy": "VeryVerySleepyUwU",
				"HasDaddyTuckedUsIn": config.bEnableDowntimeScreen,
				"ForcedPlaylist": false,
				"Splines": [
					"C624A3D18A8A2494288EE915D11518B7:/q+bDo9akBx2JId6QvLQW1YoN4jBEEn+QdzBXjB3OpQ=",
					"F00E08CB606091AEFAB37D9B0A01B833:uEmoAK5xdbd8KefVf9o7uJiGcGTYk2r9QevsGe4vBII=",
					"857A238C0BA80D892571ACE78CD3187C:eLLEqOAgRjz78Z4YT6dLxL3DetAW1c2BM4oTPp912ak=",
					"60CE6E28E6993C1DC1C58E839E7A7284:ZlOTwn6YbAK9HetjsiQo0AS1jwJQnLJY7NkR5i7o2/g="
				]
			}
		})
	},

	cdnImages: async function (req, res) {
		const cacheDir = path.join(process.cwd(), "cache/images");
		const cacheFile = path.join(cacheDir, req.params.image);
		if (!fs.existsSync(cacheDir)) {
			fs.mkdirSync(cacheDir, { recursive: true });
		}
		if (fs.existsSync(cacheFile)) {
			res.setHeader("Content-Type", "image/png");
			return fs.createReadStream(cacheFile).pipe(res);
		}
		else {
			const response = await axios.get(
				`https://cdn2.unrealengine.com/${req.params.image}`,
				{ responseType: "stream" }
			);
			res.set({
				'Content-Type': response.headers["Content-Type"]
			});
			const fileStream = fs.createWriteStream(cacheFile);
			response.data.pipe(fileStream);
			response.data.pipe(res);
		}
	},

	socsSettingQuery: function (req, res) {
		res.json({
			"settings": [
				{
					"id": "v1AccessibilityAllowVoiceDictation",
					"userOverrides": [],
					"default": "false"
				},
				{
					"id": "v1AccessibilityReadMessagesAloud",
					"userOverrides": [],
					"default": "false"
				},
				{
					"id": "v1GlobalNicknamesHasSeenDisclosure",
					"userOverrides": [],
					"default": "false"
				},
				{
					"id": "v1VoiceChatMode",
					"userOverrides": [],
					"default": "openMic"
				},
				{
					"id": "v1VoiceChatReportingDisclosureAcceptanceStatus",
					"userOverrides": [
						{
							"scopes": {},
							"value": "seen-not-accepted"
						}
					],
					"default": "never-shown"
				},
				{
					"id": "v1VoiceInputDevice",
					"userOverrides": [],
					"default": ""
				},
				{
					"id": "v1VoiceInputVolume",
					"userOverrides": [],
					"default": "50"
				},
				{
					"id": "v1VoiceOutputDevice",
					"userOverrides": [],
					"default": ""
				},
				{
					"id": "v1VoiceOutputVolume",
					"userOverrides": [],
					"default": "50"
				},
				{
					"id": "v1VoicePushToTalkKeybinding",
					"userOverrides": [],
					"default": ""
				}
			]
		})
	},

	okStatus: function (req, res) {
		res.status(200).end()
	},

	noContent: function (req, res) {
		if (req.originalUrl.includes("/datarouter/api/v1/public/data")) {
			if (JSON.stringify(req.body).includes("WindowsCookedEditor")) {
				misc.bInEditor = true
			}
			else if (JSON.stringify(req.body).includes("WindowsClient")) {
				misc.bInEditor = false
			}
		}
		res.status(204).end()
	},

};