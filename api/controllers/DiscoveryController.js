const Default = require("../../discovery/discoveryMenu.json");
const {discoveryResponses} = require("../../discovery/events")

const seasonData = {
    "22.40": discoveryResponses.ver2240,
    "20.40": discoveryResponses.ver2040,
    "18.40": discoveryResponses.ver1840,
    "17.50": discoveryResponses.ver1750,
};

function getSeasonInfo(req) {
	const userAgent = req.headers["user-agent"];
	const season = userAgent.split('-')[1];
	const seasonglobal = season.split('.')[0];
	return { season, seasonglobal };
}

module.exports = {

    //first interation of discovery api
    discoveryv1: function(req, res){
        const { season, seasonglobal } = getSeasonInfo(req);
		if (seasonData[season]) {
			return res.json(seasonData[season]);
		}
		if (seasonglobal === "19") {
			return res.json(discoveryResponses.ver19);
		}
		else{
			return res.json(Default);
		}
    },
    
    //second interation of discovery api
    discoveryv2: function(req, res){
        const { season, seasonglobal } = getSeasonInfo(req);
		if (seasonData[season]) {
			return res.json(seasonData[season]);
		}
		if(season >= 23.50){
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
                    "PanelName": "ByEpicNoBigBattle6Col",
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
        const { season, seasonglobal } = getSeasonInfo(req);
        if (seasonData[season]) {
            const eventBuilds = seasonData[season].Panels[0].Pages[0].results.map(result => result.linkData);
            return res.json(eventBuilds);
        }
        if (seasonglobal === "19") {
            const s19 = discoveryResponses.ver19.Panels[0].Pages[0].results.map(result => result.linkData);
            return res.json(s19);
        }
        if(season >= 23.50){
            return res.json(require("../../discovery/latest/discoveryMenu.json"))
        }
        else{
            const defaultResponse = Default.Panels[0].Pages[0].results.map(result => result.linkData);
            return res.json(defaultResponse);
        }
    },

    related: function(req, res){
        if(req.params.playlistId == "playlist_juno"){
			return res.json({
				"parentLinks": [],
				"links": {
					"playlist_juno": {
					"namespace": "fn",
					"accountId": "epic",
					"creatorName": "Epic",
					"mnemonic": "playlist_juno",
					"linkType": "BR:Playlist",
					"metadata": {
						"extra_video_vuids": [
						"d73175b8-6c64-4f6b-ac51-f246f8945a8b"
						],
						"lobby_background_image_urls": {
						"url": "https://cdn2.unrealengine.com/legofn-launch-lobby-v2-2560x1440-e75ec82dc332.jpg"
						},
						"blog_category": "lego-fortnite",
						"frontend_plugin": "JunoFrontendUI",
						"image_url": "https://cdn2.unrealengine.com/legofn-disco-1920-1920x1080-c5f52d11a179.jpg",
						"requiresArbitratedWorldId": true,
						"image_urls": {
						"url_s": "https://cdn2.unrealengine.com/legofn-disco-480-480x270-c55546b444b3.jpg",
						"url_xs": "https://cdn2.unrealengine.com/legofn-disco-270-270x152-78c11b5032db.jpg",
						"url_m": "https://cdn2.unrealengine.com/legofn-disco-640-640x360-75aa197e5b17.jpg",
						"url": "https://cdn2.unrealengine.com/legofn-disco-1920-1920x1080-c5f52d11a179.jpg"
						},
						"matchmaking": {
						"override_playlist": "playlist_juno"
						},
						"title": "LEGO Fortnite",
						"video_vuid": "lPAAqsIrORbZBsKCiX",
						"alt_title": {
						"ar": "LEGO Fortnite",
						"de": "LEGO Fortnite",
						"ru": "LEGO Fortnite",
						"ko": "레고 포트나이트",
						"pt-BR": "LEGO Fortnite",
						"ja": "レゴ フォートナイト",
						"it": "LEGO Fortnite",
						"fr": "LEGO Fortnite",
						"pl": "LEGO Fortnite",
						"es": "LEGO Fortnite",
						"es-419": "LEGO Fortnite",
						"tr": "LEGO FORTNITE"
						},
						"alt_tagline": {
						"ar": "استكشف عوالم مفتوحة شاسعة حيث يتلاقى سحر بناء LEGO® وFortnite. اعثر على أفضل مغامرة LEGO للنجاة في Fortnite!",
						"de": "Erkunde riesige offene Welten, in denen die Magie des Bauens von LEGO® und Fortnite aufeinandertreffen. In Fortnite findest du das ultimative LEGO-Abenteuer, in dem sich alles ums Überleben und Crafting dreht!",
						"ru": "Исследуйте огромные открытые миры, где соединяются чудеса строительства LEGO® и приключения Fortnite. Отправьтесь в незабываемое путешествие с LEGO® в Fortnite и сделайте всё, чтобы выжить!",
						"ko": "레고® 조립의 마법과 포트나이트가 만나는 광대한 오픈 월드를 탐험해 보세요. 포트나이트에서 궁극의 서바이벌 크래프팅 레고 어드벤처를 만나 보세요!",
						"pt-BR": "Explore vastos mundos abertos onde a magia da construção LEGO® encontra o Fortnite. Descubra a mais completa aventura LEGO® de criação e sobrevivência no Fortnite!",
						"ja": " レゴ®の建築の魔法とフォートナイトが出会う、広大なオープンワールドを探索しよう。究極のサバイバル・クラフト、レゴ®アドベンチャーをフォートナイトで！",
						"it": "Esplora vasti mondi aperti dove Fortnite incontra la magia delle costruzioni LEGO®. L'avventura LEGO definitiva ti aspetta in Fortnite!",
						"fr": "Explorez de vastes mondes ouverts où les univers de Fortnite et LEGO® s'entremêlent pour un résultat haut en couleur ! Vivez une formidable expérience de survie et de construction LEGO dans Fortnite !",
						"pl": "Eksploruj rozległe, otwarte światy, w których magia budowania LEGO® łączy się z Fortnite. Odkryj w Fortnite niesamowitą przygodę LEGO z elementami przetrwania i wytwarzania!",
						"es": "Explora gigantescos mundos abiertos en los que la magia de la construcción de LEGO® se mezcla con Fortnite. ¡Descubre la aventura de supervivencia y construcción definitiva de LEGO en Fortnite!",
						"es-419": "Explora vastos mundos abiertos donde la magia de la construcción de LEGO® y Fortnite se fusionan. ¡Descubre la aventura de supervivencia y fabricación definitiva de LEGO® en Fortnite!",
						"tr": "Büyülü LEGO® yapılarının Fortnite ile buluştuğu muazzam açık dünyaları keşfet. Hayatta kalma ve üretim temalı muhteşem bir LEGO macerası şimdi Fortnite'ta!"
						},
						"feature_flags": [
						"has_custom_ui"
						],
						"product_tag": "Product.Juno",
						"tagline": "Explore vast, open worlds where the magic of LEGO® building and Fortnite collide. Find the ultimate survival crafting LEGO adventure in Fortnite!",
					},
					"version": 1,
					"active": true,
					"disabled": false,
					"created": "2022-08-11T20:17:42.128Z",
					"published": "2022-08-11T20:17:42.128Z",
					"descriptionTags": [
						"survival",
						"co-op",
						"open world",
						"sandbox"
					],
					"moderationStatus": "Approved",
					"lastActivatedDate": "2022-08-11T20:17:42.132Z",
					"discoveryIntent": "PUBLIC"
					}
				}
		})
		}
		else{
		return res.json({
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
			}) //fixes the play button being disabled
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
        const { season, seasonglobal } = getSeasonInfo(req);
		const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
		if(seasonglobal <= 15){
			if(numbers.some(number => req.originalUrl.includes(number))){
				res.status(404).end();
			}
		}//fixes the season cinamtics not starting on Chapter 1/2 versions.

		if (seasonData[season]) {
		  for (const result of seasonData[season].Panels[0].Pages[0].results) {
			if (result.linkData.mnemonic === req.params.playlistId) {
			  return res.json(result.linkData);
			}
		  }
		}

		if (seasonglobal == "19") {
		  for (const result of discoveryResponses.ver19.Panels[0].Pages[0].results) {
			if (result.linkData.mnemonic === req.params.playlistId) {
			  return res.json(result.linkData);
			}
		  }
		}
		if(season >= 23.50){
			if(req.params.playlistId == "set_br_playlists")
			{
				return res.json(require("../../discovery/latest/setbrplaylist.json"))
			}
			else{
				try{
					return res.json(require(`../../discovery/latest/coreLtms/${req.params.playlistId}.json`))
				}
				catch{}
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
