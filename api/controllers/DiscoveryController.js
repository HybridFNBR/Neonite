const { default: axios } = require("axios");
const { getVersionInfo, loadJSON } =  require("../../config/defs")
const discoveryv1 = loadJSON("../discovery/discoveryMenuV1.json");
const discoveryv2 = loadJSON("../discovery/discoveryMenuV2.json")
module.exports = {

    //first interation of discovery api
    discoveryv1: function(req, res){
		return res.json(discoveryv1);
    },
    
    //second interation of discovery api
    discoveryv2: function(req, res){
        const {version} = getVersionInfo(req);
		if(version >= 23.00){
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
			return res.json(discoveryv1);
		}
    },

    //thrid interation of discovery api - currently used
    discoveryv3: function(req, res){
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
							"linkCode": "playlist_beanstalk",
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

	page: async function(req, res){
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

    mnemonicLinks: function(req, res){
        const {version} = getVersionInfo(req);
		if(version >= 23.00){
			if (version === 27.11) {
				const durianIndex = discoveryv2.findIndex(i => i.mnemonic === "playlist_durian");
				discoveryv2[durianIndex].active = true;
			}
			if (version === 32.11) {
				const quailIndex = discoveryv2.findIndex(i => i.mnemonic === "playlist_quail");
				discoveryv2[quailIndex].active = true;
			}
			if (version === 35.20) {
				const ripehonedewIndex = discoveryv2.findIndex(i => i.mnemonic === "playlist_ripehoneydew");
				discoveryv2[ripehonedewIndex].active = true;
			}
			return res.json(discoveryv2)
		}
		else{
			const defaultResponse = discoveryv1.Panels[0].Pages[0].results.map(result => result.linkData);
			return res.json(defaultResponse);
		}
    },
	
    related: function(req, res){
		const relatedResponse = {
			parentLinks: [],
    		links: {}
		}
		const findPlaylist = discoveryv2.findIndex(i => i.mnemonic === req.params.playlistId);
		if(discoveryv2[findPlaylist].metadata["sub_link_codes"]){
			relatedResponse.parentLinks.push(discoveryv2[findPlaylist])
			for (const subLinkCode of discoveryv2[findPlaylist].metadata.sub_link_codes) {
				const subPlaylist = discoveryv2.find(i => i.mnemonic === subLinkCode)
				relatedResponse.links[subLinkCode] = subPlaylist;
			}
		}
		else{
			relatedResponse.links[discoveryv2[findPlaylist].mnemonic] = discoveryv2[findPlaylist]
		}
		res.json(relatedResponse);
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
		if(versionGlobal <= 16){
			res.status(404).end();
		}
		else if(version >= 23.00){
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
