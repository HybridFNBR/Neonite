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
							"isFavorite": true,
							"globalCCU": 1,
							"lockStatus": "UNLOCKED",
							"lockStatusReason": "NONE",
							"isVisible": true
						},
						{
							"linkCode": "playlist_kiln",
							"isFavorite": true,
							"globalCCU": 1,
							"lockStatus": "UNLOCKED",
							"lockStatusReason": "NONE",
							"isVisible": true
						},
						{
							"linkCode": "set_br_playlists",
							"isFavorite": true,
							"globalCCU": 1,
							"lockStatus": "UNLOCKED",
							"lockStatusReason": "NONE",
							"isVisible": true
						},
						{
							"linkCode": "playlist_beanstalk",
							"isFavorite": true,
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
							"isVisible": false
						}
					],
					"hasMore": true,
					"panelTargetName": null,
					"pageMarker": null
				},
				"panelType": "AnalyticsList",
				"playHistoryType": null
				}
  			]
		})
    },

    mnemonicLinks: function(req, res){
        const { version} = getVersionInfo(req);
		if(version >= 23.50){
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
		for (const result of discoveryv2) {
			if (req.params.playlistId && result.mnemonic === "set_br_playlists") {
				relatedResponse.parentLinks = [result]; 
				relatedResponse.links = result.metadata["sub_link_codes"].reduce((links, code) => {
					const matchingResult = discoveryv2.find(i => i.mnemonic === code);
						if (discoveryv2.find(i => i.mnemonic === code)) links[code] = matchingResult;
						return links;
					}, {});
				return res.json(relatedResponse);
			}
			if (result.mnemonic === req.params.playlistId) {
				relatedResponse.links[req.params.playlistId] = result;
				if (result.metadata.parent_set) {
					const parentSet = discoveryv2.find(i => i.mnemonic === result.metadata.parent_set);
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
				return res.json(relatedResponse);
			}
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
		const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
		if(versionGlobal <= 15){
			if(numbers.some(number => req.originalUrl.includes(number))){
				res.status(404).end();
			}
		}
		if(version >= 23.50){
			const relatedResponse = {
				links: {}
			}
			for (const result of discoveryv2) {
				if (result.mnemonic === req.params.playlistId) {
					relatedResponse.links[req.params.playlistId] = result;
					return res.json(relatedResponse);
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
