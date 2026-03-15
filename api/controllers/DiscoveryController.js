const { getVersionInfo, loadJSON, misc} = require("../../config/defs")
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
				]
			})
		}
		else {
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
							"hasViewAll:true",
							"squareTiles:false",
							"grid:4"
						],
						"firstPage": {
							"results": [
								{
									"linkCode": "campaign",
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
						"panelName": "SkyMango",
						"panelDisplayName": "Chapter Finale Zero Hour",
						"panelSubtitle": "Chapter Finale Zero Hour",
						"featureTags": [
							"bannerItemRow"
						],
						"firstPage": {
							"results": [
								{
									"lastVisited": null,
									"linkCode": "playlist_skymango",
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
		}
	},
	//needs fixing at somepoint due to homebar and "By Epic" being show at the same time for 30.10+ versions

	page: async function (req, res) {
		res.json({
			"results": [],
			"hasMore": false,
			"panelTargetName": null,
			"pageMarker": null
		})
	},

	mnemonicLinks: function (req, res) {
		const { versionGlobal, version } = getVersionInfo(req);
		if (version >= 23.00) {
			if(version >= 33.00){playlistActive(discoveryv2, "set_figment_playlists", true, false)}
			if(version >= 30.20){playlistActive(discoveryv2, "set_blastberry_playlists", true, false)}
			if(version >= 36.10){playlistActive(discoveryv2, "set_forbiddenfruit_nobuild_playlists", true, false)}
			if(version >= 37.31){playlistActive(discoveryv2, "playlist_stridemice", true, false)}
			if(misc.bInEditor == true){ //scuffed way of doing it but works
				playlistActive(discoveryv2, "playlist_pilgrimquickplay", false, true)
				playlistActive(discoveryv2, "playlist_juno", false, true)
			}
			if(playlistManager[version]){playlistManager[version].forEach(playlist => playlistActive(discoveryv2, playlist, true, false))}
			if(version >= 38.11){
				updateMetadata(discoveryv2, "ref_panel_byepicfeeder_1", {
					ref_id: "CreativeDiscoverySurface_FrontendV2:ByEpicFeeder"
				});
			}
			/*if(versionGlobal >= 39){
				updateMetadata(discoveryv2, "playlist_defaultsolo", {
				"alt_title" : { "en": "CH7 BR Map", "de": "CH7 BR Kaart", "ru": "CH7 BR Карта", "ko": "CH7 BR 지도", "pt-BR": "Mapa CH7 BR", "en": "CH7 BR Map", "it": "CH7 Mappa BR", "fr": "CH7 Carte BR", "zh-CN": "", "es": "CH7 Mapa BR", "es-MX": "CH7 Mapa BR", "zh": "", "ar":"CH7 BR خريطة", "zh-Hant": "", "ja": "CH7 BR マップ", "pl": "CH7 Mapa BR", "es-419": "CH7 Mapa BR", "tr": "CH7 BR Haritası"}, //used DeepL for translations they may not be correct.
				"image_url": "https://cms-assets.unrealengine.com/cm6l5gfpm05kr07my04cqgy2x/cmigg1t1l089n07nam0q9jd8b",
				"image_urls": {
					"url_s": "https://cms-assets.unrealengine.com/cm6l5gfpm05kr07my04cqgy2x/cmigg1t1l089n07nam0q9jd8b",
					"url_xs": "https://cms-assets.unrealengine.com/cm6l5gfpm05kr07my04cqgy2x/cmigg1t1l089n07nam0q9jd8b",
					"url_m": "https://cms-assets.unrealengine.com/cm6l5gfpm05kr07my04cqgy2x/cmigg1t1l089n07nam0q9jd8b",
					"url": "https://cms-assets.unrealengine.com/cm6l5gfpm05kr07my04cqgy2x/cmigg1t1l089n07nam0q9jd8b"
				},
				"title": "CH7 BR Map",
			});

			updateMetadata(discoveryv2, "playlist_defaultduo", {
				"alt_title" : {"en":"CH6 BR Map","de":"CH6 BR Kaart","ru":"CH6 BR Карта","ko":"CH6 BR 지도","pt-BR":"Mapa CH7 BR","it":"CH6 Mappa BR","fr":"CH6 Carte BR","zh-CN":"","es":"CH6 Mapa BR","es-MX":"CH6 Mapa BR","zh":"","ar":"CH6 BR خريطة","zh-Hant":"","ja":"CH6 BR マップ","pl":"CH6 Mapa BR","es-419":"CH6 Mapa BR","tr":"CH6 BR Haritası"},//used DeepL for translations they may not be correct.
				"title": "CH6 BR Map",
				"image_url": "https://cdn2.unrealengine.com/fortnite-battle-royale-chapter-6-season-1-hunters-modern-1920x1080-8ec1a8791b58.jpg",
				"image_urls": {
					"url_s": "https://cdn2.unrealengine.com/fortnite-battle-royale-chapter-6-season-1-hunters-modern-1920x1080-8ec1a8791b58.jpg",
					"url_xs": "https://cdn2.unrealengine.com/fortnite-battle-royale-chapter-6-season-1-hunters-modern-1920x1080-8ec1a8791b58.jpg",
					"url_m": "https://cdn2.unrealengine.com/fortnite-battle-royale-chapter-6-season-1-hunters-modern-1920x1080-8ec1a8791b58.jpg",
					"url": "https://cdn2.unrealengine.com/fortnite-battle-royale-chapter-6-season-1-hunters-modern-1920x1080-8ec1a8791b58.jpg"
				},
				"lobby_background_image_urls": {
					"url": "https://cdn2.unrealengine.com/mkart-ch6s4-lobby-bg-4096x2048-d73f821bb40c.jpg"
				},
			});

			updateMetadata(discoveryv2, "playlist_trios", {
				"alt_title" : {"en":"Simpsons BR Map","de":"Simpsons BR Kaart","ru":"Simpsons BR Карта","ko":"Simpsons BR 지도","pt-BR":"Mapa Simpsons BR","it":"Simpsons Mappa BR","fr":"Simpsons Carte BR","zh-CN":"","es":"Simpsons Mapa BR","es-MX":"Simpsons Mapa BR","zh":"","ar":"Simpsons BR خريطة","zh-Hant":"","ja":"Simpsons BR マップ","pl":"Simpsons Mapa BR","es-419":"Simpsons Mapa BR","tr":"Simpsons BR Haritası"}, //used DeepL for translations they may not be correct.
				"title": "Simpsons BR Map",
				"image_url": "https://cdn2.unrealengine.com/fortnite-x-the-simpsons-7-3840x2160-5e88ce59a64c.png",
				"image_urls": {
					"url_s": "https://cdn2.unrealengine.com/fortnite-x-the-simpsons-7-3840x2160-5e88ce59a64c.png",
					"url_xs": "https://cdn2.unrealengine.com/fortnite-x-the-simpsons-7-3840x2160-5e88ce59a64c.png",
					"url_m": "https://cdn2.unrealengine.com/fortnite-x-the-simpsons-7-3840x2160-5e88ce59a64c.png",
					"url": "https://cdn2.unrealengine.com/fortnite-x-the-simpsons-7-3840x2160-5e88ce59a64c.png"
				},
				"lobby_background_image_urls": {
					"url": "https://cdn2.unrealengine.com/mkart-ch6ms2-lobbybg-plate-4098x2048-c51669ab5daa.jpg"
				},
			});
			}*/
			return res.json(discoveryv2);
		}
		else {
			const defaultResponse = discoveryv1.Panels[0].Pages[0].results.map(result => result.linkData);
			return res.json(defaultResponse);
		}
	},

	related: function (req, res) {
		const { versionGlobal } = getVersionInfo(req);
		const relatedResponse = {
			parentLinks: [],
			links: {}
		}

		/*if(versionGlobal >= 39){
			updateMetadata(discoveryv2, "playlist_defaultsolo", {
				"alt_title" : { "en": "CH7 BR Map", "de": "CH7 BR Kaart", "ru": "CH7 BR Карта", "ko": "CH7 BR 지도", "pt-BR": "Mapa CH7 BR", "en": "CH7 BR Map", "it": "CH7 Mappa BR", "fr": "CH7 Carte BR", "zh-CN": "", "es": "CH7 Mapa BR", "es-MX": "CH7 Mapa BR", "zh": "", "ar":"CH7 BR خريطة", "zh-Hant": "", "ja": "CH7 BR マップ", "pl": "CH7 Mapa BR", "es-419": "CH7 Mapa BR", "tr": "CH7 BR Haritası"}, 	//used DeepL for translations they may not be correct.
				"title": "CH7 BR Map",
				"image_urls": {
					"url_s": "https://cms-assets.unrealengine.com/cm6l5gfpm05kr07my04cqgy2x/cmigg1t1l089n07nam0q9jd8b",
					"url_xs": "https://cms-assets.unrealengine.com/cm6l5gfpm05kr07my04cqgy2x/cmigg1t1l089n07nam0q9jd8b",
					"url_m": "https://cms-assets.unrealengine.com/cm6l5gfpm05kr07my04cqgy2x/cmigg1t1l089n07nam0q9jd8b",
					"url": "https://cms-assets.unrealengine.com/cm6l5gfpm05kr07my04cqgy2x/cmigg1t1l089n07nam0q9jd8b"
				},
			});

			updateMetadata(discoveryv2, "playlist_defaultduo", {
				"alt_title" : {"en":"CH6 BR Map","de":"CH6 BR Kaart","ru":"CH6 BR Карта","ko":"CH6 BR 지도","pt-BR":"Mapa CH7 BR","it":"CH6 Mappa BR","fr":"CH6 Carte BR","zh-CN":"","es":"CH6 Mapa BR","es-MX":"CH6 Mapa BR","zh":"","ar":"CH6 BR خريطة","zh-Hant":"","ja":"CH6 BR マップ","pl":"CH6 Mapa BR","es-419":"CH6 Mapa BR","tr":"CH6 BR Haritası"},//used DeepL for translations they may not be correct.
				"title": "CH6 BR Map",
				"image_url": "https://cdn2.unrealengine.com/fortnite-battle-royale-chapter-6-season-1-hunters-modern-1920x1080-8ec1a8791b58.jpg",
				"image_urls": {
					"url_s": "https://cdn2.unrealengine.com/fortnite-battle-royale-chapter-6-season-1-hunters-modern-1920x1080-8ec1a8791b58.jpg",
					"url_xs": "https://cdn2.unrealengine.com/fortnite-battle-royale-chapter-6-season-1-hunters-modern-1920x1080-8ec1a8791b58.jpg",
					"url_m": "https://cdn2.unrealengine.com/fortnite-battle-royale-chapter-6-season-1-hunters-modern-1920x1080-8ec1a8791b58.jpg",
					"url": "https://cdn2.unrealengine.com/fortnite-battle-royale-chapter-6-season-1-hunters-modern-1920x1080-8ec1a8791b58.jpg"
				},
				"lobby_background_image_urls": {
					"url": "https://cdn2.unrealengine.com/mkart-ch6s4-lobby-bg-4096x2048-d73f821bb40c.jpg"
				},
			});

			updateMetadata(discoveryv2, "playlist_trios", {
				"alt_title" : {"en":"Simpsons BR Map","de":"Simpsons BR Kaart","ru":"Simpsons BR Карта","ko":"Simpsons BR 지도","pt-BR":"Mapa Simpsons BR","it":"Simpsons Mappa BR","fr":"Simpsons Carte BR","zh-CN":"","es":"Simpsons Mapa BR","es-MX":"Simpsons Mapa BR","zh":"","ar":"Simpsons BR خريطة","zh-Hant":"","ja":"Simpsons BR マップ","pl":"Simpsons Mapa BR","es-419":"Simpsons Mapa BR","tr":"Simpsons BR Haritası"}, 	//used DeepL for translations they may not be correct.
				"title": "Simpsons BR Map",
				"image_url": "https://cdn2.unrealengine.com/fortnite-x-the-simpsons-7-3840x2160-5e88ce59a64c.png",
				"image_urls": {
					"url_s": "https://cdn2.unrealengine.com/fortnite-x-the-simpsons-7-3840x2160-5e88ce59a64c.png",
					"url_xs": "https://cdn2.unrealengine.com/fortnite-x-the-simpsons-7-3840x2160-5e88ce59a64c.png",
					"url_m": "https://cdn2.unrealengine.com/fortnite-x-the-simpsons-7-3840x2160-5e88ce59a64c.png",
					"url": "https://cdn2.unrealengine.com/fortnite-x-the-simpsons-7-3840x2160-5e88ce59a64c.png"
				},
				"lobby_background_image_urls": {
					"url": "https://cdn2.unrealengine.com/mkart-ch6ms2-lobbybg-plate-4098x2048-c51669ab5daa.jpg"
				},
			});
		}*/
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


/**
 * 
 * @param {Array<Object>} discovery - json response
 * @param {string} mnemonic - Playlist ID
 * @param {boolean} bIsActive - Whether the playlist should be active.
 * @param {boolean} bIsDisabled - Whether the playlist should be disabled this is different from bIsActive
**/
function playlistActive(discovery, mnemonic, bIsActive, bIsDisabled) {
	const findPlaylist = discovery.find(ltmObject => ltmObject.mnemonic === mnemonic);
	if (findPlaylist) {
		findPlaylist.active = bIsActive;
		findPlaylist.disabled = bIsDisabled
	}
}

/**

 * 
 * @param {Array<Object>} discovery - json response
 * @param {string} mnemonic - Playlist ID
 * @param {any} metadata
**/
function updateMetadata(discovery, mnemonic, metadata) {
    const findPlaylist = discovery.find(i => i.mnemonic === mnemonic);
    if (!findPlaylist) return;
    Object.assign(findPlaylist.metadata, metadata);
}

const playlistManager = {
	"27.11": ["playlist_durian"],
	"32.11": ["playlist_quail"],
	"35.20": ["playlist_ripehoneydew"],
	"37.51": ["playlist_limerock"],
	"38.11": ["playlist_skymango"],
};