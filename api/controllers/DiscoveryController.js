const { getVersionInfo, seasonData, loadJSON } =  require("../../config/defs")
const Default = loadJSON("../discovery/discoveryMenu.json");
const {discoveryResponses} = require("../../discovery/events")
const latest = loadJSON("../discovery/latest/discoveryMenu.json")

module.exports = {

    //first interation of discovery api
    discoveryv1: function(req, res){
        const { version, versionGlobal } = getVersionInfo(req);
		if (seasonData[version]) {
			return res.json(seasonData[version]);
		}
		if (versionGlobal === 19) {
			return res.json(discoveryResponses.ver19);
		}
		else{
			return res.json(Default);
		}
    },
    
    //second interation of discovery api
    discoveryv2: function(req, res){
        const { version} = getVersionInfo(req);
		if (seasonData[version]) {
			return res.json(seasonData[version]);
		}
		if(version >= 23.50){
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
			})}
		else{
			return res.json(Default);
		}
    },

    //thrid interation of discovery api - currently used
    discoveryv3: function(req, res){
        return res.json({
            "panels": [
				{
					"panelName": "Homebar_V3",
					"panelDisplayName": "Test_EpicsPicksHomebar",
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
                                "globalCCU": 1
                            }
                           ],
					  "hasMore": false,
					  "panelTargetName": null
					},
					"panelType": "CuratedList",
					"playHistoryType": null
				},
                {
                    "panelName": "ByEpicNoCompetitive",
					"panelDisplayName": "By Epic",
					"featureTags": [
						"col:5"
					],
                    "firstPage": {
                        "results": [
                            {
                                "lastVisited": null,
                                "linkCode": "set_br_playlists", //there is habanero but why load into a comp playlist anyway.
                                "isFavorite": false,
                                "globalCCU": 1
                            },
                            {
                                "lastVisited": null,
                                "linkCode": "playlist_durian",
                                "isFavorite": false,
                                "globalCCU": 1
                            },
                            {
                                "lastVisited": null,
                                "linkCode": "playlist_papaya",
                                "isFavorite": false,
                                "globalCCU": 1
                            },
                            {
                                "lastVisited": null,
                                "linkCode": "playlist_juno",
                                "isFavorite": false,
                                "globalCCU": 1
                            }
                           ],
                        "hasMore": true,
                        "panelTargetName": null
                    },
                    "panelType": "AnalyticsList",
                    "playHistoryType": null
                }
            ]
        })
    },

    mnemonicLinks: function(req, res){
        const { version, versionGlobal } = getVersionInfo(req);
		if (seasonData[version]) {
			const eventBuilds = seasonData[version].Panels[0].Pages[0].results.map(result => result.linkData);
			return res.json(eventBuilds);
		}
		if (versionGlobal === 19) {
			const s19 = discoveryResponses.ver19.Panels[0].Pages[0].results.map(result => result.linkData);
			return res.json(s19);
		}
		if(version >= 23.50){
			return res.json(latest)
		}
		else{
			const defaultResponse = Default.Panels[0].Pages[0].results.map(result => result.linkData);
			return res.json(defaultResponse);
	}
    },

    related: function(req, res){
		switch (req.params.playlistId){
			case "set_br_playlists":
				res.json({
					"parentLinks": [latest[8]],
					"links": {
						[latest[1].mnemonic]: latest[1],
						[latest[2].mnemonic]: latest[2],
						[latest[3].mnemonic]: latest[3],
						[latest[5].mnemonic]: latest[5]
					}
				})
			break;
			case "playlist_durian":
				res.json({
					"parentLinks":[],
					"links": {
						[latest[6].mnemonic]: latest[6]
					}
				})
				break;
			case "playlist_juno":
				res.json({
					"parentLinks":[],
					"links": {
						[latest[4].mnemonic]: latest[4]
					}
				})
			break;
			case "playlist_papaya":
				res.json({
					"parentLinks":[],
					"links": {
						[latest[7].mnemonic]: latest[7]
					}
				})
			break;
			default:
                res.json({
				"parentLinks": [],
				"links": {
					[req.params.playlistId]: {
					"namespace": "fn",
					"accountId": "epic",
					"creatorName": "Epic",
					"mnemonic": req.params.playlistId,
					"linkType": "BR:Playlist",
					"metadata": {
						"image_url": "",
						"image_urls": {
						"url_s": "",
						"url_xs": "",
						"url_m": "",
						"url": "" 
						},
						"matchmaking": {
						"override_playlist": req.params.playlistId
						}
					},
					"version": 95,
					"active": true,
					"disabled": false,
					"created": "2021-10-01T00:56:45.010Z",
					"published": "2021-08-03T15:27:20.251Z",
					"descriptionTags": [],
					"moderationStatus": "Approved"
					}
				}
			})
		}
    },

    favoritesCheck: function(req, res){
        res.json({"results":[],"hasMore":false})
    },

    lockStatus: function(req, res){
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


    mnemonicPlaylist: function(req, res){
        const { version, versionGlobal } = getVersionInfo(req);
		const linkData = (results, playlistId) => {
			for (const result of results) {
				if (result.linkData.mnemonic === playlistId) {
					return result.linkData;
				}
			}
			return null;
		};
		const CinamticIssues = () => {
			const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
			if (versionGlobal <= 16 && numbers.some(number => req.originalUrl.includes(number))) {
				res.status(404).end();
				return true;
			}
			return false;
		};
		const EventLinkData = () => {
			if (seasonData[version]) {
				const result = linkData(seasonData[version].Panels[0].Pages[0].results, req.params.playlistId);
				if (result) return res.json(result);
			}
			return false;
		};
		const season19 = () => {
			if (versionGlobal === 19) {
				const result = linkData(discoveryResponses.ver19.Panels[0].Pages[0].results, req.params.playlistId);
				if (result) return res.json(result);
			}
			return false;
		};
		const links = () => {
			if (version >= 23.50) {
				if (req.params.playlistId === "set_br_playlists") {
					return res.json(loadJSON("../discovery/latest/setbrplaylist.json"));
				} else {
					try {
						return res.json(require(`../discovery/latest/coreLtms/${req.params.playlistId}.json`));
					} catch {
					}
				}
			}
			return false;
		};
		if (CinamticIssues()) return;
		if (EventLinkData()) return;
		if (season19()) return;
		if (links()) return;
		
		for (const result of Default.Panels[0].Pages[0].results) {
			if (result.linkData.mnemonic === req.params.playlistId) {
				return res.json(result.linkData);
			}
		}
    }




}
