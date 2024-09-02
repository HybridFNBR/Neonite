const { getVersionInfo, discoveryEventData, loadJSON } =  require("../../config/defs")
const Default = loadJSON("../discovery/discoveryMenu.json");
const {discoveryResponses} = require("../../discovery/events")
const latest = loadJSON("../discovery/latest/discoveryMenu.json")

module.exports = {

    //first interation of discovery api
    discoveryv1: function(req, res){
        const { version, versionGlobal } = getVersionInfo(req);
		if (discoveryEventData[version]) {
			return res.json(discoveryEventData[version]);
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
		if (discoveryEventData[version]) {
			return res.json(discoveryEventData[version]);
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
                                "linkCode": "playlist_durian",
                                "isFavorite": false,
                                "globalCCU": 1
                            },
                            {
                                "lastVisited": null,
                                "linkCode": "set_br_playlists", //there is habanero but why load into a comp playlist anyway.
                                "isFavorite": false,
                                "globalCCU": 1
                            },
							{
                                "lastVisited": null,
                                "linkCode": "playlist_beanstalk",
                                "isFavorite": false,
                                "globalCCU": 1
                            },
							{
                                "lastVisited": null,
                                "linkCode": "playlist_juno",
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
		if (discoveryEventData[version]) {
			const eventBuilds = discoveryEventData[version].Panels[0].Pages[0].results.map(result => result.linkData);
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
		const relatedResponse = {
			parentLinks: [],
    		links: {}
		}
		for (const result of latest) {
			if (result.mnemonic === "set_br_playlists") {
				relatedResponse.parentLinks = [result]; 
				relatedResponse.links = result.metadata["sub_link_codes"].reduce((links, code) => {
					const matchingResult = latest.find(i => i.mnemonic === code);
						if (matchingResult) links[code] = matchingResult;
						return links;
					}, {});
				return res.json(relatedResponse);
			}
			if (result.mnemonic === req.params.playlistId) {
				relatedResponse.links[req.params.playlistId] = result;
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
		}//fixes the season cinamtics not starting on Chapter 1/2 versions.

		if (discoveryEventData[version]) {
		  for (const result of discoveryEventData[version].Panels[0].Pages[0].results) {
			if (result.linkData.mnemonic === req.params.playlistId) {
			  return res.json(result.linkData);
			}
		  }
		}
		if (versionGlobal == "19") {
		  for (const result of discoveryResponses.ver19.Panels[0].Pages[0].results) {
			if (result.linkData.mnemonic === req.params.playlistId) {
			  return res.json(result.linkData);
			}
		  }
		}
		if(version >= 23.50){
			if(req.params.playlistId == "set_br_playlists")
			{
				return res.json(loadJSON("../discovery/latest/setbrplaylist.json"))
			}
			else{
				return res.json(loadJSON(`../discovery/latest/coreLtms/${req.params.playlistId}.json`))
			}
		}
		else {
			for (const result of Default.Panels[0].Pages[0].results) {
				if (result.linkData.mnemonic === req.params.playlistId) {
					return res.json(result.linkData); 
				}
			}
		}
    }




}
