const { getVersionInfo, loadJSON } = require("../../config/defs")
const discoveryv1 = loadJSON("../discovery/discoveryMenuV1.json");
const discoveryv2 = loadJSON("../discovery/discoveryMenuV2.json")
module.exports = {

	//first interation of discovery api
	discoveryv1: function (req, res) {
		return res.json(discoveryv1);
	},

	//second interation of discovery api
	discoveryv2: function (req, res) {
		const { version } = getVersionInfo(req);
		if (version >= 23.00) {
			return res.json({
				"panels": [
					{
						"PanelName": "ByEpicNoBigBattle6Col",
						"Pages": [
							{
								"results": [
									{
										"lastVisited": null,
										"linkCode": "set_br_playlists",
										"isFavorite": false,
										"globalCCU": 1
									},
									{
										"lastVisited": null,
										"linkCode": "playlist_papaya",
										"isFavorite": false,
										"globalCCU": 1
									},
								],
								"hasMore": false
							}
						]
					}
				],
				"testCohorts": [
					"testing"
				]
			})
		}
		else {
			return res.json(discoveryv1);
		}
	},

	//thrid interation of discovery api - currently used
	discoveryv3: function (req, res) {
		const { version } = getVersionInfo(req);
		if (version <= 30.10)  //kind of a gamble
		{
			return res.json({
				"panels": [
					{
						"panelName": "Homebar",
						"panelDisplayName": "Homebar",
						"panelSubtitle": null,
						"featureTags": [
							"col:5",
							"homebar"
						],
						"firstPage": {
							"results": [
								{
									"lastVisited": null,
									"linkCode": "reference_byepicnocompetitive_5",
									"isFavorite": false,
									"globalCCU": -1,
									"lockStatus": "UNLOCKED",
									"lockStatusReason": "NONE",
									"isVisible": true
								},
							],
							"hasMore": true,
							"panelTargetName": null,
							"pageMarker": null
						},
						"panelType": "CuratedList",
						"playHistoryType": null
					},
					{
						"panelName": "ByEpicConvergenceBlastberry",
						"panelDisplayName": "By Epic",
						"panelSubtitle": "Islands created by Epic Games",
						"featureTags": [
							"col:5"
						],
						"firstPage": {
							"results": [
								{
									"linkCode": "playlist_durian",
									"isFavorite": false,
									"globalCCU": 1,
									"lockStatus": "UNLOCKED",
									"lockStatusReason": "NONE",
									"isVisible": true
								},
								{
									"linkCode": "set_br_playlists",
									"isFavorite": false,
									"globalCCU": 1,
									"lockStatus": "UNLOCKED",
									"lockStatusReason": "NONE",
									"isVisible": true
								},
								{
									"linkCode": "set_figment_playlists",
									"isFavorite": false,
									"globalCCU": 1,
									"lockStatus": "UNLOCKED",
									"lockStatusReason": "NONE",
									"isVisible": true
								},
								{
									"linkCode": "playlist_pilgrimquickplay",
									"isFavorite": false,
									"globalCCU": 1,
									"lockStatus": "UNLOCKED",
									"lockStatusReason": "NONE",
									"isVisible": true
								},
								{
									"linkCode": "playlist_juno",
									"isFavorite": false,
									"globalCCU": 1,
									"lockStatus": "UNLOCKED",
									"lockStatusReason": "NONE",
									"isVisible": true
								},
								{
									"linkCode": "playlist_beanstalk",
									"isFavorite": false,
									"globalCCU": 1,
									"lockStatus": "UNLOCKED",
									"lockStatusReason": "NONE",
									"isVisible": true
								},
								{
									"lastVisited": null,
									"linkCode": "playlist_papaya",
									"isFavorite": false,
									"globalCCU": 1,
									"lockStatus": "UNLOCKED",
									"lockStatusReason": "NONE",
									"isVisible": true
								},
								{
									"lastVisited": null,
									"linkCode": "playlist_playgroundv2",
									"isFavorite": false,
									"globalCCU": 1,
									"lockStatus": "UNLOCKED",
									"lockStatusReason": "NONE",
									"isVisible": true
								}
							],
							"hasMore": true,
							"panelTargetName": null,
							"pageMarker": null
						},
						"panelType": "AnalyticsList",
						"playHistoryType": null
					},
				]
			})
		}

		return res.json({
			"panels": [
				{
					"panelName": "Homebar",
					"panelDisplayName": "Homebar",
					"panelSubtitle": null,
					"featureTags": [
						"col:5",
						"homebar"
					],
					"firstPage": {
						"results": [
							{
								"lastVisited": null,
								"linkCode": "ref_panel_byepicfeeder_1",
								"isFavorite": false,
								"globalCCU": -1,
								"lockStatus": "UNLOCKED",
								"lockStatusReason": "NONE",
								"isVisible": true
							},
						],
						"hasMore": true,
						"panelTargetName": null,
						"pageMarker": null
					},
					"panelType": "CuratedList",
					"playHistoryType": null
				},
				{
					"panelName": "ByEpicFeeder",
					"panelNativeDisplayName": "By Epic",
					"panelDisplayName": "By Epic",
					"panelSubtitle": null,
					"featureTags": [
						"ForReferenceViewOnly",
						"col:5",
						"hasViewAll:true",
						"horizontalScroll:false",
					],
					"firstPage": {
						"results": [
							{
								"linkCode": "playlist_durian",
								"isFavorite": false,
								"globalCCU": 1,
								"lockStatus": "UNLOCKED",
								"lockStatusReason": "NONE",
								"isVisible": true
							},
							{
								"linkCode": "set_br_playlists",
								"isFavorite": false,
								"globalCCU": 1,
								"lockStatus": "UNLOCKED",
								"lockStatusReason": "NONE",
								"isVisible": true
							},
							{
								"linkCode": "playlist_pilgrimquickplay",
								"isFavorite": false,
								"globalCCU": 1,
								"lockStatus": "UNLOCKED",
								"lockStatusReason": "NONE",
								"isVisible": true
							},
							{
								"linkCode": "playlist_juno",
								"isFavorite": false,
								"globalCCU": 1,
								"lockStatus": "UNLOCKED",
								"lockStatusReason": "NONE",
								"isVisible": true
							},
							{
								"linkCode": "playlist_beanstalk",
								"isFavorite": false,
								"globalCCU": 1,
								"lockStatus": "UNLOCKED",
								"lockStatusReason": "NONE",
								"isVisible": true
							},
							{
								"lastVisited": null,
								"linkCode": "playlist_papaya",
								"isFavorite": false,
								"globalCCU": 1,
								"lockStatus": "UNLOCKED",
								"lockStatusReason": "NONE",
								"isVisible": true
							},
						],
						"hasMore": true,
						"panelTargetName": null,
						"pageMarker": null
					},
					"panelType": "AnalyticsList",
					"playHistoryType": null
				},
				{
					"panelName": "ByEpicConvergenceBlastberry",
					"panelNativeDisplayName": "Other Modes By Epic",
					"panelDisplayName": "Other Modes By Epic",
					"panelSubtitle": null,
					"featureTags": [
						"col:7",
						"horizontalScroll:false",
						"squareTiles:false",
						"hasViewAll:true"
					],
					"firstPage": {
						"results": [
							{
								"linkCode": "set_figment_playlists",
								"isFavorite": false,
								"globalCCU": 1,
								"lockStatus": "UNLOCKED",
								"lockStatusReason": "NONE",
								"isVisible": true
							},
							{
								"linkCode": "set_blastberry_playlists",
								"isFavorite": false,
								"globalCCU": 1,
								"lockStatus": "UNLOCKED",
								"lockStatusReason": "NONE",
								"isVisible": true
							},
							{
								"linkCode": "set_forbiddenfruit_nobuild_playlists",
								"isFavorite": false,
								"globalCCU": 1,
								"lockStatus": "UNLOCKED",
								"lockStatusReason": "NONE",
								"isVisible": true
							}
						],
						"hasMore": true,
						"panelTargetName": null,
						"pageMarker": null
					},
					"panelType": "AnalyticsList",
					"playHistoryType": null
				},
				{
					"panelName": "LimeRock",
					"panelDisplayName": "Welcome, Our Alien Overlords",
					"panelSubtitle": "Welcome, Our Alien Overlords",
					"featureTags": [
						"bannerItemRow"
					],
					"firstPage": {
						"results": [
							{
								"lastVisited": null,
								"linkCode": "playlist_limerock",
								"isFavorite": false,
								"globalCCU": -1,
								"lockStatus": "UNLOCKED",
								"lockStatusReason": "RATING_THRESHOLD",
								"isVisible": true,
								"favoriteStatus": "NONE"
							}
						],
						"hasMore": false,
						"panelTargetName": null,
						"pageMarker": null
					},
					"panelType": "CuratedList",
					"playHistoryType": null,
					"panelContexts": {}
				},
				{
					"panelName": "StrideMice",
					"panelDisplayName": "The Daft Punk Experience",
					"panelSubtitle": "The Daft Punk Experience",
					"featureTags": [
						"bannerItemRow"
					],
					"firstPage": {
						"results": [
							{
								"lastVisited": null,
								"linkCode": "playlist_stridemice",
								"isFavorite": false,
								"globalCCU": -1,
								"lockStatus": "UNLOCKED",
								"lockStatusReason": "RATING_THRESHOLD",
								"isVisible": true,
								"favoriteStatus": "NONE"
							}
						],
						"hasMore": false,
						"panelTargetName": null,
						"pageMarker": null
					},
					"panelType": "CuratedList",
					"playHistoryType": null,
					"panelContexts": {}
				},
				{
					"panelName": "RipeHoneyDew",
					"panelDisplayName": "Death Star Sabotage",
					"panelSubtitle": "Death Star Sabotage",
					"featureTags": [
						"bannerItemRow"
					],
					"firstPage": {
						"results": [
							{
								"lastVisited": null,
								"linkCode": "playlist_ripehoneydew",
								"isFavorite": false,
								"globalCCU": -1,
								"lockStatus": "UNLOCKED",
								"lockStatusReason": "RATING_THRESHOLD",
								"isVisible": true,
								"favoriteStatus": "NONE"
							}
						],
						"hasMore": false,
						"panelTargetName": null,
						"pageMarker": null
					},
					"panelType": "CuratedList",
					"playHistoryType": null,
					"panelContexts": {}
				},
				{
					"panelName": "A-Spot",
					"panelDisplayName": "Remix: The Finale",
					"panelSubtitle": "Remix: The Finale",
					"featureTags": [
						"bannerItemRow"
					],
					"firstPage": {
						"results": [
							{
								"lastVisited": null,
								"linkCode": "playlist_quail",
								"isFavorite": false,
								"globalCCU": -1,
								"lockStatus": "UNLOCKED",
								"lockStatusReason": "RATING_THRESHOLD",
								"isVisible": true,
								"favoriteStatus": "NONE"
							}
						],
						"hasMore": false,
						"panelTargetName": null,
						"pageMarker": null
					},
					"panelType": "CuratedList",
					"playHistoryType": null,
					"panelContexts": {}
				},
			]
		})
	},

	page: async function (req, res) {
		/*const resultList = [];
		const results = (await axios.post('http://localhost:5595/api/v2/discovery/surface/CreativeDiscoverySurface_Frontend').catch(() => {})).data;
		results.panels.forEach(panel => {
			resultList.push(...panel.firstPage.results); 
		});
		resultList.length = 0
		*/
		res.json({
			"results": [],
			"hasMore": false,
			"panelTargetName": null,
			"pageMarker": null
		})
		//after implementing i realised its only ever good if you have a ton of ltms on one row where pages are needed, but for base neonite its not really an issue.
	},

	mnemonicLinks: function (req, res) {
		const { version } = getVersionInfo(req);
		if (version >= 23.00) {
			if (version >= 33.00) {
				const figmentIndex = discoveryv2.findIndex(i => i.mnemonic === "set_figment_playlists");
				discoveryv2[figmentIndex].active = true;
			}
			switch (version) {
				case "27.11":
					const durianIndex = discoveryv2.findIndex(i => i.mnemonic === "playlist_durian");
					discoveryv2[durianIndex].active = true;
					break;
				case "32.11":
					const quailIndex = discoveryv2.findIndex(i => i.mnemonic === "playlist_quail");
					discoveryv2[quailIndex].active = true;
					break;
				case "35.20":
					const ripehoneydewIndex = discoveryv2.findIndex(i => i.mnemonic === "playlist_ripehoneydew");
					discoveryv2[ripehoneydewIndex].active = true;
					break;
				case "37.31":
				case "37.40":
				case "37.50":
					const stridemiceIndex = discoveryv2.findIndex(i => i.mnemonic === "playlist_stridemice");
					discoveryv2[stridemiceIndex].active = true;
					break;
				case "37.51":
					const limeorckIndex = discoveryv2.findIndex(i => i.mnemonic === "playlist_limerock");
					discoveryv2[limeorckIndex].active = true;
					break;
				default:
			}
			return res.json(discoveryv2);
		}
		else {
			const defaultResponse = discoveryv1.Panels[0].Pages[0].results.map(result => result.linkData);
			return res.json(defaultResponse);
		}
	},

	related: function (req, res) {
		const relatedResponse = {
			parentLinks: [],
			links: {}
		}
		const findPlaylist = discoveryv2.findIndex(i => i.mnemonic === req.params.playlistId);
		if (discoveryv2[findPlaylist].metadata["sub_link_codes"]) {
			relatedResponse.parentLinks.push(discoveryv2[findPlaylist])
			for (const subLinkCode of discoveryv2[findPlaylist].metadata.sub_link_codes) {
				relatedResponse.links[subLinkCode] = discoveryv2.find(i => i.mnemonic === subLinkCode);
			}
		}
		else {
			relatedResponse.links[discoveryv2[findPlaylist].mnemonic] = discoveryv2[findPlaylist]
			if (discoveryv2[findPlaylist].metadata.parent_set) {
				const parentSet = discoveryv2.find(i => i.mnemonic === discoveryv2[findPlaylist].metadata.parent_set);
				if (parentSet) {
					relatedResponse.parentLinks.push(parentSet)
					const existingLinks = new Set(Object.keys(relatedResponse.links));
					parentSet.metadata["sub_link_codes"].forEach(code => {
						const matchingResult = discoveryv2.find(i => i.mnemonic === code);
						if (matchingResult && !existingLinks.has(code)) {
							relatedResponse.links[code] = matchingResult;
						}
					});
				}
			}
		}
		res.json(relatedResponse);
	},


	favoritesCheck: function (req, res) {
		res.json({ "results": [], "hasMore": false })
	},

	lockStatus: function (req, res) {
		res.json({
			"results": [
				{
					"playerId": req.params.accountId,
					"linkCode": req.body["linkCodes"][0],
					"lockStatus": "UNLOCKED",
					"lockStatusReason": "NONE",
					"isVisible": true
				}
			],
			"hasMore": false
		})
	},

	mnemonicPlaylist: function (req, res) {
		const { version, versionGlobal } = getVersionInfo(req);
		if (versionGlobal <= 16) {
			res.status(404).end();
		}
		else if (version >= 23.00) {
			for (const result of discoveryv2) {
				if (result.mnemonic === req.params.playlistId) {
					return res.json(result);
				}
			}
		}
		else {
			for (const result of discoveryv1.Panels[0].Pages[0].results) {
				if (result.linkData.mnemonic === req.params.playlistId) {
					return res.json(result.linkData);
				}
			}
		}
	}

}
