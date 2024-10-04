
const { default: axios } = require("axios");
const { getVersionInfo, loadJSON, billboard, CustomBackground, Playlists} = require("../../config/defs")


module.exports = {
    fortniteGame: async function(req, res){
        const content = (await axios.get('https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game').catch(() => {})).data;
        const { version, versionGlobal } = getVersionInfo(req);
        var fortnitegame = loadJSON("../responses/fortnitegame.json")
        fortnitegame = Object.assign({}, fortnitegame, { eventscreens: content.eventscreens }, { battlepasspurchase: content.battlepasspurchase }, { crewscreendata: content.crewscreendata }, { emergencynotice: {"news":{"platform_messages":[],"_type":"Battle Royale News","messages":[{"hidden":false,"_type":"CommonUI Simple Message Base","subgame":"br","body":"Made by kemo (@xkem0x)\nMaintained by Hybrid (@unrealhybrid).\nDiscord: https://discord.com/invite/X525zyJtaU","title":"Neonite V2","spotlight":false}]},"jcr:isCheckedOut":true,"_title":"emergencynotice","_noIndex":false,"alwaysShow":true,"jcr:baseVersion":"a7ca237317f1e761d4ee60-7c40-45a8-aa3e-bb0a2ffa9bb5","_activeDate":"2018-08-06T19:00:26.217Z","lastModified":"2020-10-30T04:50:59.198Z","_locale":"en-US"}}, {emergencynoticev2: {"jcr:isCheckedOut":true,"_title":"emergencynoticev2","_noIndex":false,"emergencynotices":{"_type":"Emergency Notices","emergencynotices":[{"hidden":false,"_type":"CommonUI Emergency Notice Base","title":"Neonite V2","body":"Made by kemo (@xkem0x)\nMaintained by Hybrid (@unrealhybrid).\nDiscord: https://discord.com/invite/X525zyJtaU"}]},"_activeDate":"2018-08-06T19:00:26.217Z","lastModified":"2021-03-17T15:07:27.924Z","_locale":"en-US"}, battleroyalenewsv2:{"news":{"motds":[{"entryType":"Website","image":"https://raw.githubusercontent.com/NeoniteDev/NeoniteV2/main/public/Neonite1024.png","tileImage":"https://raw.githubusercontent.com/NeoniteDev/NeoniteV2/main/public/Neonite1024.png","videoMute":false,"hidden":false,"tabTitleOverride":"Neonite V2","_type":"CommonUI Simple Message MOTD","title":"Neonite","body":"Made by kemo (@xkem0x)\nMaintained by Hybrid (@unrealhybrid).\nDiscord: https://discord.com/invite/X525zyJtaU","videoLoop":false,"videoStreamingEnabled":false,"sortingPriority":0,"id":"NeoniteNewsBR","videoAutoplay":false,"videoFullscreen":false,"spotlight":false,"websiteURL":"https://discord.com/invite/X525zyJtaU","websiteButtonText":"Join our discord"}]},"jcr:isCheckedOut":true,"_title":"battleroyalenewsv2","header":"","style":"None","_noIndex":false,"alwaysShow":false,"jcr:baseVersion":"a7ca237317f1e704b1a186-6846-4eaa-a542-c2c8ca7e7f29","_activeDate":"2020-01-21T14:00:00.000Z","lastModified":"2021-02-10T23:57:48.837Z","_locale":"en-US"}, shopCarousel:{"jcr:isCheckedOut":true,"itemsList":{"_type":"ShopCarouselItemList","items":[{"tileImage":"https://raw.githubusercontent.com/NeoniteDev/NeoniteV2/main/public/Neonite1024.png","fullTitle":"Neonite","hidden":false,"_type":"ShopCarouselItem","landingPriority":100,"action":"ShowOfferDetails","offerId":null,"title":"Neonite"}]},"_title":"shop-carousel","_noIndex":false,"jcr:baseVersion":"a7ca237317f1e765be23f9-d0fd-4067-ae00-ef29af2376cc","_activeDate":"2020-09-25T12:00:00.000Z","lastModified":"2020-12-05T23:52:44.269Z","_locale":"en-US"}});
        const backgrounds = fortnitegame.dynamicbackgrounds.backgrounds.backgrounds;
        if(version === "9.30"){
          fortnitegame.lobby.stage = "summer"
        }
        if(version === "9.40" || version === "9.41"){
          fortnitegame.lobby.stage = "worldcup"
        }
        Playlists(fortnitegame, version)
        CustomBackground(version, versionGlobal, backgrounds, content)
        /*const CustomBillBoardSection = billboard(
            "StartYourEngines",
            "Behemoth",
            "99",
            "https://cdn2.unrealengine.com/30-00-wasteland---br-shop---hero-billboard-character-suv---1920-x-1080-1920x1080-2a274bda65d6.png",
            "https://cdn2.unrealengine.com/30-0-wasteland---br-shop-backround-vfinal-1920x1080-8169569b15bd.jpg",
            "",
            "FFFFFF",
            "FFFFFF",
            "Cool Title",
            "Cool Subtitle",
            "Cool Button Name",
            "Cool Section Name"
        )
        fortnitegame.mpItemShop.shopData["sections"].push(CustomBillBoardSection)
        //Custom BillBoard Section example^ in this example the "LayoutID" would be "StartYourEngines.Behemoth.99", you would need to modify the data in shopv2/shopv3.json accordingly to utilize your custom section*/

        return res.json(fortnitegame);
    },

    sparks: async function(req, res){
        const data = (await axios.get('https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game/spark-tracks').catch(() => {})).data;
        res.json(data);
    },

    eventScreen: async function(req, res){
        const data = (await axios.get('https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game/eventscreens').catch(() => {})).data;
        res.json(data);
    },

    contentHash: function(req, res){
        res.json({
            "sessionId": req.body.sessionId,
            "sessionStartTimestamp": req.body.sessionStartTimestamp,
            "surfaces": [
              {
                "surfaceId": "br-motd",
                "contentMeta": [
                  "{\"c93adbc7a8a9f94a916de62aa443e2d6\":[\"93eff180-1465-496e-9be4-c02ef810ad82\"]}"
                ],
                "events": [
                  {
                    "contentHash": "c93adbc7a8a9f94a916de62aa443e2d6",
                    "type": "impression",
                    "count": 1,
                    "timestamp": "2023-12-03T10:17:41.387Z",
                    "lastTimestamp": "2023-12-03T10:17:41.387Z"
                  }
                ]
              }
            ]
        })
    },

    motd: function(req, res){
        res.json({
            "contentType": "collection",
            "contentId": "fortnite-br-br-motd-collection",
            "tcId": "8784961a-44e7-4fd5-82a6-8ef11e8c211d",
            "contentMeta": "{\"c93adbc7a8a9f94a916de62aa443e2d6\":[\"93eff180-1465-496e-9be4-c02ef810ad82\"]}",
            "contentItems": [
              {
                "contentType": "content-item",
                "contentId": "93eff180-1465-496e-9be4-c02ef810ad82",
                "tcId": "5085a6fa-108c-4f0c-abdd-3259c6406890",
                "contentFields": {
                  "Buttons": [
                    {
                      "Action": {
                        "_type": "MotdDiscoveryAction",
                        "category": "set_br_playlists",
                        "islandCode": "set_br_playlists",
                        "shouldOpen": true
                      },
                      "Style": "0",
                      "Text": "Play Now",
                      "_type": "Button"
                    }
                  ],
                  "FullScreenBackground": {
                    "Image": [
                      {
                        "width": 1920,
                        "height": 1080,
                        "url": "https://raw.githubusercontent.com/NeoniteDev/NeoniteV2/main/public/Neonite1024.png"
                      },
                      {
                        "width": 960,
                        "height": 540,
                        "url": "https://raw.githubusercontent.com/NeoniteDev/NeoniteV2/main/public/Neonite1024.png"
                      }
                    ],
                    "_type": "FullScreenBackground"
                  },
                  "FullScreenBody": "Made by kemo (@xkem0x)\nMaintained by Hybrid (@unrealhybrid).\nDiscord: https://discord.com/invite/X525zyJtaU",
                  "FullScreenTitle": "Neonite V2",
                  "TeaserBackground": {
                    "Image": [
                      {
                        "width": 1024,
                        "height": 512,
                        "url": "https://raw.githubusercontent.com/NeoniteDev/NeoniteV2/main/public/Neonite1024.png"
                      }
                    ],
                    "_type": "TeaserBackground"
                  },
                  "TeaserTitle": " Neonite V2",
                  "VerticalTextLayout": false
                },
                "contentSchemaName": "DynamicMotd",
                "contentHash": "c93adbc7a8a9f94a916de62aa443e2d6"
              }
            ]
          })
    }
}