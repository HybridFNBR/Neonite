const { default: axios } = require("axios");
const { application } = require('express')


/**
 * 
 * @param {application} app 
 * @param {String} port 
 */
module.exports = (app, port) => {
    //var lastest = await axios.get("https://api.nitestats.com/v1/epic/builds/fltoken")
    app.get(["/content/api/pages/fortnite-game", "/content/api/pages/"], async (req, res) => {
        season = req.headers["user-agent"].split('-')[1];


        const content = (await axios.get('https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game').catch(() => {})).data;
        const sections = (await axios.get('https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game/shop-sections').catch(() => {})).data;

        res.json({
            "jcr:isCheckedOut": true,
            "_title": "Fortnite Game",
            "jcr:baseVersion": "a7ca237317f1e7b00bc82e-d9a2-4f0d-b951-704d295cd1aa",
            "_activeDate": "2017-07-24T22:24:02.300Z",
            "lastModified": "2020-11-01T17:36:19.024Z",
            "_locale": "en-US",
            "emergencynotice": {
                "news": {
                    "platform_messages": [],
                    "_type": "Battle Royale News",
                    "messages": [{
                        "hidden": false,
                        "_type": "CommonUI Simple Message Base",
                        "subgame": "br",
                        "body": "Made by kemo (@xkem0x) and Beat (@TheBeatYT_evil), Maintained by unrealhybrid (@unrealhybrid).\r\nDiscord: https://discord.gg/neo-mods-897532507048796210",
                        "title": "Neonite V2",
                        "spotlight": false
                    },
                    ],
                },
                "jcr:isCheckedOut": true,
                "_title": "emergencynotice",
                "_noIndex": false,
                "alwaysShow": true,
                "jcr:baseVersion": "a7ca237317f1e761d4ee60-7c40-45a8-aa3e-bb0a2ffa9bb5",
                "_activeDate": "2018-08-06T19:00:26.217Z",
                "lastModified": "2020-10-30T04:50:59.198Z",
                "_locale": "en-US"
            },
            "emergencynoticev2": {
                "jcr:isCheckedOut": true,
                "_title": "emergencynoticev2",
                "_noIndex": false,
                "emergencynotices": {
                    "_type": "Emergency Notices",
                    "emergencynotices": [
                        {
                            "hidden": false,
                            "_type": "CommonUI Emergency Notice Base",
                            "title": "Neonite V2",
                            "body": "Made by kemo (@xkem0x) and Beat (@TheBeatYT_evil), Maintained by unrealhybrid (@unrealhybrid)\r\nDiscord: https://discord.gg/DJ6VUmD",
                        }
                    ]
                },
                "_activeDate": "2018-08-06T19:00:26.217Z",
                "lastModified": "2021-03-17T15:07:27.924Z",
                "_locale": "en-US"
            },
            "battleroyalenewsv2": {
                "news": {
                    "motds": [{
                        "entryType": "Website",
                        "image": `http://127.0.0.1:${port}/NeoniteWallpaper1920x1080.png`,
                        "tileImage": `http://127.0.0.1:${port}/Neonite1024.png`,
                        "videoMute": false,
                        "hidden": false,
                        "tabTitleOverride": "Neonite V2",
                        "_type": "CommonUI Simple Message MOTD",
                        "title": "Neonite",
                        "body": "Made by Kemo (@xkem0x) and maintained by Beat (@TheBeatYT_evil). If you have any bugs, you can join our Discord by clicking the button below.",
                        "videoLoop": false,
                        "videoStreamingEnabled": false,
                        "sortingPriority": 0,
                        "id": "NeoniteNewsBR",
                        "videoAutoplay": false,
                        "videoFullscreen": false,
                        "spotlight": false,
                        "websiteURL": "https://discord.gg/DJ6VUmD",
                        "websiteButtonText": "Join our discord"
                    }]
                },
                "jcr:isCheckedOut": true,
                "_title": "battleroyalenewsv2",
                "header": "",
                "style": "None",
                "_noIndex": false,
                "alwaysShow": false,
                "jcr:baseVersion": "a7ca237317f1e704b1a186-6846-4eaa-a542-c2c8ca7e7f29",
                "_activeDate": "2020-01-21T14:00:00.000Z",
                "lastModified": "2021-02-10T23:57:48.837Z",
                "_locale": "en-US"
            },
            "shopCarousel": {
                "jcr:isCheckedOut": true,
                "itemsList": {
                    "_type": "ShopCarouselItemList",
                    "items": [{
                        "tileImage": `http://127.0.0.1:${port}/NeoniteWallpaper1920x1080.png`,
                        "fullTitle": "Neonite",
                        "hidden": false,
                        "_type": "ShopCarouselItem",
                        "landingPriority": 100,
                        "action": "ShowOfferDetails",
                        "offerId": null,
                        "title": "Neonite"
                    }]
                },
                "_title": "shop-carousel",
                "_noIndex": false,
                "jcr:baseVersion": "a7ca237317f1e765be23f9-d0fd-4067-ae00-ef29af2376cc",
                "_activeDate": "2020-09-25T12:00:00.000Z",
                "lastModified": "2020-12-05T23:52:44.269Z",
                "_locale": "en-US"
            },
            "dynamicbackgrounds": content.dynamicbackgrounds || {
                "jcr:isCheckedOut": true,
                "backgrounds": {
                    "backgrounds": [
                        {
                            "backgroundimage": `http://127.0.0.1:${port}/NeoniteLobby.png`,
                            "stage": "defaultnotris",
                            "_type": "DynamicBackground",
                            "key": "lobby"
                        }
                    ],
                    "_type": "DynamicBackgroundList"
                },
                "_title": "dynamicbackgrounds",
                "_noIndex": false,
                "jcr:baseVersion": "a7ca237317f1e70712af90-59fe-4576-8f32-f80bf513c946",
                "_activeDate": "2020-07-06T06:00:00.000Z",
                "lastModified": "2021-06-22T13:53:48.402Z",
                "_locale": "en-US"
            },
            "shopSections": sections,
            "playlistinformation": {
                "is_tile_hidden": false,
                "frontend_matchmaking_header_style": "Basic",
                "conversion_config": {
                    "containerName": "playlist_info",
                    "_type": "Conversion Config",
                    "enableReferences": true,
                    "contentName": "playlists"
                },
                "show_ad_violator": false,
                "_title": "playlistinformation",
                "frontend_matchmaking_header_text_description": "",
                "frontend_matchmaking_header_text": "",
                "playlist_info": {
                    "_type": "Playlist Information",
                    "playlists": [
                        {
                            "image": "http://cdn2.unrealengine.com/22br-radish-ingame-playlisttile-1920x1080-d85374a7a6f6.jpg",
                            "playlist_name": "Playlist_Radish",
                            "hidden": false,
                            "_type": "FortPlaylistInfo",
                            "description": "Don't Fall to Pieces",
                            "display_name": "Fracture: Chapter 3 Finale"
                        },
                        {
                            "image": "https://static.wikia.nocookie.net/fortnite_gamepedia/images/7/74/T_LS_S8_Mellow.png/revision/latest?cb=20201112222322",
                            "playlist_name": "Playlist_Music_Low",
                            "violator": "LIVE EVENT",
                            "hidden": false,
                            "_type": "FortPlaylistInfo",
                            "description": "Drop in to Pleasant Park and enjoy the show. Respawn enabled.",
                            "display_name": "Showtime"                            
                        },
                        {
                            "image": "https://cdn.discordapp.com/attachments/1026187180885950498/1128339024294199368/T_LS_S8_Cumulative_10.png",
                            "playlist_name": "Playlist_Music_Med",
                            "violator": "LIVE EVENT",
                            "hidden": false,
                            "_type": "FortPlaylistInfo",
                            "description": "The choice is yours!",
                            "display_name": "The Unvaulting"                            
                        },
                        {
                            "image": "https://cdn.discordapp.com/attachments/1026187180885950498/1128339380210258061/T_LS_S9_Doggus.png",
                            "playlist_name": "Playlist_Music_Higher",
                            "violator": "LIVE EVENT",
                            "hidden": false,
                            "_type": "FortPlaylistInfo",
                            "description": "Initiate Island Defense Protocol. Emergency hyperfuel jetpacks have been granted. Take to the skies and find cover on sky platforms.",
                            "display_name": "The Final Showdown"
                        },
                        {
                            "image": "https://cdn.discordapp.com/attachments/1026187180885950498/1128340131036807209/T_LS_S10_Cumulative_10.png",
                            "playlist_name": "Playlist_Music_Highest",
                            "violator": "LIVE EVENT",
                            "hidden": false,
                            "_type": "FortPlaylistInfo",
                            "description": "",
                            "display_name": "The End"                            
                        },
                        {
                            "image": "https://cdn.discordapp.com/attachments/1026187180885950498/1128341186361426021/T_UI_Music.png",
                            "playlist_name": "Playlist_Music_Lowest",
                            "violator": "LIVE EVENT",
                            "hidden": false,
                            "_type": "FortPlaylistInfo",
                            "description": "",
                            "display_name": "Live at Risky"                            
                        },
                        {
                            "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/v12/12BR_Cyclone_Astronomical_PlaylistTile_Main-1024x512-ab95f8d30d0742ba1759403320a08e4ea6f0faa0.jpg",
                            "playlist_name": "Playlist_Music_High",
                            "violator": "LIVE EVENT",
                            "hidden": false,
                            "_type": "FortPlaylistInfo",
                            "description": "Drop into Sweaty Sands for the ride of your life. (Photosensitivity Warning)",
                            "display_name": "Travis Scott’s Astronomical"                            
                        },
                        {
                            "image": "https://static.wikia.nocookie.net/fortnite/images/0/05/The_Device-Promo-Fortnite.jpg/revision/latest?cb=20221123000007",
                            "playlist_name": "Playlist_Fritter_64",
                            "violator": "LIVE EVENT",
                            "hidden": false,
                            "_type": "FortPlaylistInfo",
                            "description": "Midas' Masterplan is ready to unfold. His machine is ready. Can the Storm be Broken?",
                            "display_name": "The Device"                            
                        },
                        {
                            "image": "https://cdn2.unrealengine.com/galactus-is-here-1024x512-615573933.jpg",
                            "playlist_name": "Playlist_Junior_32",
                            "hidden": false,
                            "violator": "LIVE EVENT",
                            "_type": "FortPlaylistInfo",
                            "description": "Defend the Island to save all Reality!",
                            "display_subname": "",
                            "display_name": "THE DEVOURER OF WORLDS"                            
                        },
                        {
                            "image": "https://cdn2.unrealengine.com/16br-yogurtevent-playlisttile-1024x512-1024x512-9bd732a3d474.png",
                            "playlist_name": "Playlist_Yogurt",
                            "hidden": false,
                            "violator": "LEAVING SOON",
                            "_type": "FortPlaylistInfo",
                            "description": "ZERO CRISIS FINALE",
                            "display_subname": "",
                            "display_name": "ZERO CRISIS FINALE"                            
                        },
                        {
                            "image": "https://cdn2.unrealengine.com/17br-rifttour-ltm-1024x512-796d91a07a1b.jpg",
                            "playlist_name": "Playlist_Buffet",
                            "violator": "EVENT!",
                            "hidden": false,
                            "_type": "FortPlaylistInfo",
                            "description": "Dive into the Rift Tour featuring Ariana Grande, a musical experience unlike any other. \n\n(Photosensitivity Warning)",
                            "display_subname": "FT. ARIANA GRANDE",
                            "display_name": "RIFT TOUR"                            
                        },                                                
                        {
                            "image": "https://cdn2.unrealengine.com/br06-teamrumble-800x450-800x450-a2265b85af06.jpg",
                            "playlist_name": "Playlist_Respawn_24",
                            "violator": "",
                            "hidden": false,
                            "_type": "FortPlaylistInfo",
                            "description": ""                            
                        },
                        {
                            "image": "https://cdn2.unrealengine.com/11br-battlelabs-motd-1920x1080-1920x1080-a39ad0545dba.jpg",
                            "playlist_name": "Playlist_BattleLab",
                            "hidden": false,
                            "_type": "FortPlaylistInfo"                            
                        },
                        {
                            "image": "https://cdn2.unrealengine.com/cm07-news-featured-creativemode-announce-v2-1920x1080-267ac4e33a15.jpg",
                            "playlist_name": "Playlist_PlaygroundV2",
                            "hidden": false,
                            "_type": "FortPlaylistInfo",
                            "description": "Matchmake with others and play the best games made by the community!"                            
                        },
                        {
                            "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/BR04_LTM_5x20-1024x512-451b402db5751c25a1e7616930c5ae37d8b20710.png",
                            "playlist_name": "Playlist_5x20",
                            "hidden": false,
                            "_type": "FortPlaylistInfo"                            
                        },
                        {
                            "image": "https://cdn2.unrealengine.com/21br-launch-modetiles-solo-1920x1080-1920x1080-b6a3a8cbb08e.jpg",
                            "playlist_name": "Playlist_DefaultSolo",
                            "hidden": false,
                            "special_border": "None",
                            "_type": "FortPlaylistInfo",
                            "description": "Go at it alone in a battle to be the last one standing.\n\n",
                            "display_name": "Solo"                            
                        },
                        {
                            "image": "https://cdn2.unrealengine.com/21br-launch-modetiles-duos-1920x1080-1920x1080-7bd1ca269cfd.jpg",
                            "playlist_name": "Playlist_DefaultDuo",
                            "hidden": false,
                            "special_border": "None",
                            "_type": "FortPlaylistInfo",
                            "description": "Pair up with a buddy and take everyone else down.\n\n",
                            "display_name": "Duos"                            
                        },
                        {
                            "image": "https://cdn2.unrealengine.com/18pr-in-game-discovery-defaulttile-1920x1080-3ab459cdf025.jpg",
                            "playlist_name": "Playlist_Papaya",
                            "violator": "",
                            "hidden": false,
                            "_type": "FortPlaylistInfo",
                            "description": "Welcome to Party Royale, an experimental and evolving space. Leave your weapons and mats behind and hang out with friends, play games and enjoy live entertainment. Catch live shows. Race around obstacle courses by land or sea. Go fishing with friends, perfect your skydive, and get up close and connect with some of your favorite artists. Hop on the party bus and enjoy the ride."                            
                        }
                    ]
                },
                "_noIndex": false,
                "_activeDate": "2022-05-21T16:45:00.000Z",
                "lastModified": "2022-11-14T12:32:18.466Z",
                "_locale": "en-US",
                "_templateName": "FortniteGameMOTD"
            },
            "_suggestedPrefetch": [
                `http://127.0.0.1:${port}/NeoniteWallpaper1920x1080.png`,
                `http://127.0.0.1:${port}/Neonite1024.png`
            ]
        })
    })
    
    app.post("/api/v1/fortnite-br/surfaces/motd/target", (req, res) => {
        res.json({
            	"contentType": "collection",
		"contentId": "motd-default-collection",
		"tcId": "cca20b46-eb7d-4852-94b9-8479ddb53b2d",
		"contentItems": [
			{
				"contentType": "content-item",
				"contentId": "753b2fed-a492-4e11-a34f-9741cc739d47",
				"tcId": "9b89584d-0711-4269-980d-09d50d04f857",
				"contentFields": {
					"body": "Made by Kemo (@xkem0x) and maintained by Beat (@TheBeatYT_evil). If you have any bugs, you can join our Discord by clicking the button below.",
					"entryType": "Website",
					"image": [
						{
							"width": 1920,
							"height": 1080,
							"url": `http://127.0.0.1:${port}/NeoniteWallpaper1920x1080.png`
						},
						{
							"width": 960,
							"height": 540,
							"url": `http://127.0.0.1:${port}/NeoniteWallpaper1920x1080.png`
						}
					],
					"tabTitleOverride": "NeoniteV2",
					"tileImage": [
						{
							"width": 1024,
							"height": 512,
							"url": `http://127.0.0.1:${port}/NeoniteWallpaper1920x1080.png`
						}
					],
					"title": "NeoniteV2",
					"websiteButtonText": "Join our discord",
            				"websiteURL": "https://discord.gg/DJ6VUmD",
            				"websiteSKickIntroDo": false
				},
				"contentSchemaName": "MotdWebsiteNews"
			}
		]
        })
    })
}