var ini = require('ini')
const Profile = require("../profile");
const fs = require("fs");
const path = require('path');
var config = ini.parse(fs.readFileSync(path.join(__dirname, '../config.ini'), 'utf-8'));
const cosmetics = JSON.parse(JSON.stringify(require("../cosmetics_config.json")));
const {discoveryResponses} = require("../discovery/events")

    const MPLockerLoadout = (accountId, athenprofile) => {
    try{
        var characterloadout = athenprofile.items["NEONITECHARACTER"]
        var emoteloadout = athenprofile.items["NEONITEEMOTE"]
        var platformloadout = athenprofile.items["NEONITEPLATFORM"]
        var wrapsloadout = athenprofile.items["NEONITEWRAPS"]
        var jamloadout = athenprofile.items["NEONITEJAM"]
        var sparksloadout = athenprofile.items["NEONITESPARKS"]
        var vehicleloadout = athenprofile.items["NEONITEVEHICLE"]
        var vehiclesuvloadout = athenprofile.items["NEONITESUV"]
            if (typeof characterloadout == 'undefined'){
                Profile.addItem(athenprofile, "NEONITECHARACTER", {
                    "templateId": "CosmeticLoadout:LoadoutSchema_Character",
                    "attributes": {
                        "slots": [
                            {
                                "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Character",
                                "equipped_item": "AthenaCharacter:cid_001_athena_commando_f_default"
                            },
                            {
                                "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Backpack"
                            },
                            {
                                "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Pickaxe",
                                "equipped_item": "AthenaPickaxe:defaultpickaxe"
                            },
                            {
                                "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Glider",
                                "equipped_item": "AthenaGlider:defaultglider"
                            },
                            {
                                "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Contrails"
                            },
                            {
                                "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Aura"
                            }
                        ]
                    },
                    "quantity" : 1
                });
            }
            if (typeof emoteloadout == 'undefined'){
                Profile.addItem(athenprofile, "NEONITEEMOTES", {
                    "templateId": "CosmeticLoadout:LoadoutSchema_Emotes",
                    "attributes": {
                        "slots": [
                            {
                                "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Emote_0",
                                "equipped_item": "AthenaDance:eid_boogiedown"
                            },
                            {
                                "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Emote_1"
                            },
                            {
                                "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Emote_2"
                            },
                            {
                                "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Emote_3"
                            },
                            {
                                "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Emote_4"
                            },
                            {
                                "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Emote_5"
                            }
                        ]
                    },
                    "quantity" : 1
                });
            }
            if (typeof platformloadout == 'undefined'){
                Profile.addItem(athenprofile, "NEONITEPLATFORM", {
                    "templateId": "CosmeticLoadout:LoadoutSchema_Platform",
                    "attributes": {
                        "slots": [
                            {
                            "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Banner_Icon"
                            },
                            {
                            "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Banner_Color"
                            },
                            {
                            "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_LobbyMusic",
                            },
                            {
                            "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_LoadingScreen"
                            }
                        ]
                        },
                    "quantity": 1
                });
            }
            if (typeof wrapsloadout == 'undefined'){
                Profile.addItem(athenprofile, "NEONITEWRAPS", {
                    "templateId": "CosmeticLoadout:LoadoutSchema_Wraps",
                    "attributes": {
                        "slots": [
                            {
                            "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Wrap_0",
                            },
                            {
                            "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Wrap_1"
                            },
                            {
                            "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Wrap_2"
                            },
                            {
                            "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Wrap_3"
                            },
                            {
                            "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Wrap_4"
                            },
                            {
                            "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Wrap_5"
                            },
                            {
                            "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Wrap_6"
                            }
                        ]
                    },
                    "quantity": 1
                });
            }
            if (typeof jamloadout == 'undefined'){
                Profile.addItem(athenprofile, "NEONITEJAM", {
                    "templateId": "CosmeticLoadout:LoadoutSchema_Jam",
                    "attributes" : {
                        "slots" : [ {
                            "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_JamSong0"
                        }, {
                            "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_JamSong1"
                        }, {
                            "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_JamSong2"
                        }, {
                            "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_JamSong3"
                        }, {
                            "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_JamSong4"
                        }, {
                            "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_JamSong5"
                        }, {
                            "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_JamSong6"
                        }, {
                            "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_JamSong7"
                        } ]
                        },
                        "quantity" : 1
                });
            }
            if (typeof sparksloadout == 'undefined'){
                Profile.addItem(athenprofile, "NEONITESPARKS", {
                    "templateId" : "CosmeticLoadout:LoadoutSchema_Sparks",
                    "attributes" : {
                        "slots" : [ {
                        "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_Bass"
                        }, {
                        "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_Guitar"
                        }, {
                        "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_Drum"
                        }, {
                        "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_Keyboard"
                        }, {
                        "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_Microphone"
                        } ]
                    },
                    "quantity" : 1
                });
            }
            if (typeof vehicleloadout == 'undefined'){
                Profile.addItem(athenprofile, "NEONITEVEHICLE", {
                    "templateId" : "CosmeticLoadout:LoadoutSchema_Vehicle",
                    "attributes" : {
                        "slots" : [ {
                            "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_Vehicle_Body"
                            }, {
                            "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_Vehicle_Booster"
                            }, {
                            "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_Vehicle_DriftSmoke"
                            }, {
                            "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_Vehicle_Wheel"
                            }, {
                            "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_Vehicle_Skin"
                            } ]
                        },
                        "quantity" : 1
                });
            }
            if (typeof vehiclesuvloadout == 'undefined'){
                Profile.addItem(athenprofile, "NEONITESUV", {
                    "templateId" : "CosmeticLoadout:LoadoutSchema_Vehicle_SUV",
                    "attributes" : {
                        slots: [
                            {
                              slot_template: 'CosmeticLoadoutSlotTemplate:LoadoutSlot_Vehicle_Body_SUV'       
                            },
                            {
                              slot_template: 'CosmeticLoadoutSlotTemplate:LoadoutSlot_Vehicle_Skin_SUV'       
                            },
                            {
                              slot_template: 'CosmeticLoadoutSlotTemplate:LoadoutSlot_Vehicle_Wheel_SUV',     
                            },
                            {
                              slot_template: 'CosmeticLoadoutSlotTemplate:LoadoutSlot_Vehicle_DriftSmoke_SUV',
                            },
                            {
                              slot_template: 'CosmeticLoadoutSlotTemplate:LoadoutSlot_Vehicle_Booster_SUV',
                            }]
                        },
                        "quantity" : 1
                });
            }
            Profile.modifyStat(athenprofile, "loadout_presets", {
                "CosmeticLoadout:LoadoutSchema_Character" : {
                    "0" : "NEONITECHARACTER",
                },
                "CosmeticLoadout:LoadoutSchema_Emotes" : {
                    "0" : "NEONITEEMOTES",
                },
                "CosmeticLoadout:LoadoutSchema_Platform" : {
                    "0" : "NEONITEPLATFORM",
                },
                "CosmeticLoadout:LoadoutSchema_Wraps" : {
                    "0" : "NEONITEWRAPS",
                },
                "CosmeticLoadout:LoadoutSchema_Jam" : {
                    "0" : "NEONITEJAM",
                },
                "CosmeticLoadout:LoadoutSchema_Sparks" : {
                    "0" : "NEONITESPARKS",
                },
                "CosmeticLoadout:LoadoutSchema_Vehicle" : {
                    "0" : "NEONITEVEHICLE",
                },
                "CosmeticLoadout:LoadoutSchema_Vehicle_SUV":{
                    "0": "NEONITESUV"
                }
            })
            Profile.bumpRvn(athenprofile)
            Profile.saveProfile(accountId, "athena", athenprofile)
        }
        catch{}

    };

    const getVersionInfo = (req) => {
        const userAgent = req.headers["user-agent"];
        const version = userAgent.split('-')[1];
        const versionGlobal = parseInt(version.split('.')[0], 10);
        return { version, versionGlobal };
    };
    
    const simpleProfile = (accountId, athenprofile) => {
        try {
            if (config.simpleProfile == true) {
                const cosmeticArrays = [
                    cosmetics.Characters,
                    cosmetics.Emotes,
                    cosmetics.BackBlings,
                    cosmetics.LoadingScreens,
                    cosmetics.WeaponWraps,
                    cosmetics.Pickaxes,
                    cosmetics.Gliders,
                    cosmetics.MusicPacks,
                    cosmetics.Contrails
                ];
    
                cosmeticArrays.forEach(cosmeticArray => {
                    cosmeticArray.forEach(cosmeticItem => {
                        Profile.addItem(athenprofile, cosmeticItem, {
                            attributes: {
                                "max_level_bonus": 0,
                                "level": 1,
                                "item_seen": true,
                                "xp": 0,
                                "variants": [],
                                "favorite": false
                            },
                            "templateId": cosmeticItem
                        });
                    });
                });
                Profile.saveProfile(accountId, "athena", athenprofile);
                Profile.bumpRvn(athenprofile);
            }
        } catch{} {
        }
    };
    
    const CH1Fix = (accountId, athenprofile) => {
        try {
            Profile.addItem(athenprofile, "AthenaCharacter:CID_001_Athena_Commando_F_Default", {
                attributes: {
                    "max_level_bonus": 0,
                    "level": 1,
                    "item_seen": true,
                    "xp": 0,
                    "variants": [],
                    "favorite": false
                },
                "templateId": "AthenaCharacter:CID_001_Athena_Commando_F_Default"
            });
            Profile.addItem(athenprofile, "AthenaPickaxe:DefaultPickaxe", {
                attributes: {
                    "max_level_bonus": 0,
                    "level": 1,
                    "item_seen": true,
                    "xp": 0,
                    "variants": [],
                    "favorite": false
                },
                "templateId": "AthenaPickaxe:DefaultPickaxe"
            });
            Profile.addItem(athenprofile, "AthenaGlider:DefaultGlider", {
                attributes: {
                    "max_level_bonus": 0,
                    "level": 1,
                    "item_seen": true,
                    "xp": 0,
                    "variants": [],
                    "favorite": false
                },
                "templateId": "AthenaGlider:DefaultGlider"
            });
            athenprofile.stats["attributes"]["favorite_character"] = "AthenaCharacter:CID_001_Athena_Commando_F_Default";
            athenprofile.stats["attributes"]["favorite_pickaxe"] = "AthenaPickaxe:DefaultPickaxe";
            athenprofile.stats["attributes"]["favorite_glider"] = "AthenaGlider:DefaultGlider";
    
            Profile.saveProfile(accountId, "athena", athenprofile);
            Profile.bumpRvn(athenprofile);
        } catch {
        }
    };
    
    const loadJSON = (dirPath) => {
        const fullPath = path.join(__dirname, dirPath);
        const jsonData = fs.readFileSync(fullPath, 'utf-8');
        return JSON.parse(jsonData);
    };

    const VersionFilter = [
        "Cert",
        "Live",
        "2870186+++Fortnite+Release",
        "3.0.0",
        "Next"
    ];
    
    const discoveryEventData = {
        "22.40": discoveryResponses.ver2240,
        "20.40": discoveryResponses.ver2040,
        "18.40": discoveryResponses.ver1840,
        "17.50": discoveryResponses.ver1750
    };


    /**
 * Adds a billboard shop section to mpItemShop section data response before sending it to the Client(Fortnite)
 * 
 * @param {string} sectionID example: "sectionID.offerGoupsectionID.stackRankValue"
 * @param {string} offerGoupsectionID offer group section ID example: "sectionID.offerGoupsectionID.stackRankValue"
 * @param {string} stackRankValue the number at the end of the layoutId example: "sectionID.offerGoupsectionID.stackRankValue"
 * @param {string} foregroundUrl image displayed on top of the background
 * @param {string} backgroundUrl image url of the background
 * @param {string} bodyImage apeaers alongside the text
 * @param {string} titleColorA color of the title, has to be a hex value
 * @param {string} titleColorB color of the subtitle, text below the title, has to be a hex value
 * @param {string} title title
 * @param {string} subtitle subtitle, text displayed under the title
 * @param {string} buttonText button text
 * @param {string} SectiondisplayName display name of the shop section
 */
const billboard = (sectionID, offerGoupsectionID, stackRankValue, foregroundUrl, backgroundUrl, bodyImage, titleColorA, titleColorB, title, subtitle, buttonText, SectiondisplayName) => {
    return {
        "metadata": {
            "offerGroups": [
              {
                "bUseWidePreview": true,
                "metadata": {
                  "_type": "MP Item Shop - Offer Group Metadata"
                },
                "_type": "MP Item Shop - Row",
                "offerGroupId": stackRankValue,
                "stackRanks": [
                  {
                    "stackRankValue": stackRankValue,
                    "productTag": "Product_BR",
                    "_type": "MP Item Shop - Stack Rank",
                    "context": "battleRoyale",
                    "startDate": "2023-01-01T00:00:00.000Z"
                  }
                ]
              }
            ],
            "subsections": [      
              {
                "metadata": {
                  "offerGroups": [
                    {
                      "bUseWidePreview": true,
                      "displayType": "billboard",
                      "metadata": {
                        "textureMetadata": [
                          {
                            "_type": "MP Item Shop - Offer Group Texture Metadata",
                            "value": foregroundUrl,
                            "key": "foreground"
                          },
                          {
                            "_type": "MP Item Shop - Offer Group Texture Metadata",
                            "value": backgroundUrl,
                            "key": "background"
                          },
                          {
                            "_type": "MP Item Shop - Offer Group Texture Metadata",
                            "value": bodyImage,
                            "key": "bodyImage"
                          }
                        ],
                        "_type": "MP Item Shop - Offer Group Metadata",
                        "stringMetadata": [
                          {
                            "_type": "MP Item Shop - Offer Group String Metadata",
                            "value": "left",
                            "key": "alignment"
                          },
                          {
                            "_type": "MP Item Shop - Offer Group String Metadata",
                            "value": titleColorA,
                            "key": "titleColorA"
                          },
                          {
                            "_type": "MP Item Shop - Offer Group String Metadata",
                            "value": titleColorB,
                            "key": "titleColorB"
                          }
                        ],
                        "textMetadata": [
                          {
                            "_type": "MP Item Shop - Offer Group Text Metadata",
                            "value": title,
                            "key": "title"
                          },
                          {
                            "_type": "MP Item Shop - Offer Group Text Metadata",
                            "value": subtitle,
                            "key": "subtitle"
                          },
                          {
                            "_type": "MP Item Shop - Offer Group Text Metadata",
                            "value": buttonText,
                            "key": "cta"
                          }
                        ]
                      },
                      "_type": "MP Item Shop - Row",
                      "offerGroupId": stackRankValue,
                      "stackRanks": [
                        {
                          "stackRankValue": stackRankValue,
                          "productTag": "Product_BR",
                          "_type": "MP Item Shop - Stack Rank",
                          "context": "battleRoyale",
                          "startDate": "2023-01-01T00:00:00.000Z"
                        }
                      ]
                    }
                  ],
                  "background": [
                    {
                      "_type": "MP Item Shop - Background"
                    }
                  ],
                  "_type": "MP Item Shop - Subsection Metadata",
                  "stackRanks": [
                    {
                      "stackRankValue": stackRankValue,
                      "productTag": "Product_BR",
                      "_type": "MP Item Shop - Stack Rank",
                      "context": "battleRoyale",
                      "startDate": "2023-01-01T00:00:00.000Z"
                    }
                  ]
                },
                "displayName": SectiondisplayName,
                "_type": "MP Item Shop - Subsection",
                "sectionID": offerGoupsectionID
              }
            ],
            "background": {
              "_type": "MP Item Shop - Background"
            },
            "_type": "MP Item Shop - Section Metadata",
            "showIneligibleOffers": "Always",
            "stackRanks": [
              {
                "stackRankValue": 98,
                "productTag": "Product_BR",
                "_type": "MP Item Shop - Stack Rank",
                "context": "battleRoyale",
                "startDate": "2024-05-23T23:00:00.000Z"
              },
              {
                "stackRankValue": 9,
                "productTag": "Product_Juno",
                "_type": "MP Item Shop - Stack Rank",
                "context": "juno",
                "startDate": "2024-05-23T23:00:00.000Z"
              },
              {
                "stackRankValue": 98,
                "productTag": "Product_DelMar",
                "_type": "MP Item Shop - Stack Rank",
                "context": "delMar",
                "startDate": "2024-05-23T23:00:00.000Z"
              },
              {
                "stackRankValue": 50,
                "productTag": "Product_Sparks",
                "_type": "MP Item Shop - Stack Rank",
                "context": "sparks",
                "startDate": "2024-05-23T23:00:00.000Z"
              },
              {
                "stackRankValue": 50,
                "productTag": "Product_BR",
                "_type": "MP Item Shop - Stack Rank",
                "context": "battleRoyale",
                "startDate": "2024-05-26T23:00:00.000Z"
              }
            ]
          },
          "displayName": SectiondisplayName,
          "_type": "MP Item Shop - Section",
          "sectionID": sectionID
        
        }
    };

const CustomBackground = (version, versionGlobal, backgrounds, content) =>{
    if(config.custom_background == true){
        backgrounds[0].stage = "defaultnotris"
        backgrounds[0].backgroundimage = config.image_url
    }
    if(config.custom_background == false)
    {
        switch (versionGlobal) {
            case 10:
                backgrounds[0].stage = "seasonx";
            break;
            case 11:
                if(version === "11.30"){
                    background[0].stage = "Galileo"
                }
                if (version === "11.31" || version === "11.40") {
                    backgrounds[0].stage = "Winter19";
                } 
                else {
                    backgrounds[0].stage = "season11";
                }
            break;
            case 12:
                backgrounds[0].stage = "season12";
            break;
            case 13:
                backgrounds[0].stage = "season13";
            break;
            case 14:
                backgrounds[0].stage = "season14";
            break;
            case 15:
                if(version === "15.10"){
                    backgrounds[0].stage = "season15xmas"
                    backgrounds[1].stage = "XmasStore2020"
                }
                else{
                    backgrounds[0].stage = "season15";
                }
            break;
            case 16:
                backgrounds[0].stage = "season16";
            break;
            case 17:
                if(version === "17.10"){
                    background[0].stage = "defaultnotris"
                    background[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp-17-lobby-summer-2048x1024-709fa99e6be0.png"
                }
                else{
                    const backgroundStages = ["season17d", "season17c", "season17b", "season17"];
                    const randombackground = backgroundStages[Math.floor(Math.random() * backgroundStages.length)];
                    backgrounds[0].stage = `${randombackground}`;
                }
            break;
            case 18:
                backgrounds[0].stage = "season18";
            break;
            case 19:
                if (version === "19.01") /*if it doesnt work i didnt get chance to test it cause the build has not been uploaded - unrealhybrid*/ {
                    backgrounds[0].stage = "winter2021";
                    backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp19-lobby-xmas-2048x1024-f85d2684b4af.png";
                } 
                else {
                    backgrounds[0].stage = "season19";
                }
            break;
            case 20:
                if (version === "20.40") {
                    backgrounds[0].stage = "season20";
                    backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp20-40-armadillo-glowup-lobby-2048x2048-2048x2048-3b83b887cc7f.jpg";
                } 
                else {
                    backgrounds[0].stage = "season20";
                    backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/s20-landscapev4-2048x1024-2494a103ae6c.png"
                }
            break;
            case 21:
                if (version === "21.30") {
                    backgrounds[0].stage = "season2130";
                    backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/nss-lobbybackground-2048x1024-f74a14565061.jpg";
                } 
                else {
                    backgrounds[0].stage = "season2100";
                    backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/s21-lobby-background-2048x1024-2e7112b25dc3.jpg";
                }
            break;
            case 22:
                backgrounds[0].stage = "defaultnotris"
                backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp22-lobby-square-2048x2048-2048x2048-e4e90c6e8018.jpg";
            break;
            case 23:
                if(version === "23.10")
                {   
                    backgrounds[0].stage = "season2310"
                    backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp23-winterfest-lobby-square-2048x2048-2048x2048-277a476e5ca6.png"
                }
                else{
                    backgrounds[0].stage = "season2300"
                    backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp23-lobby-2048x1024-2048x1024-26f2c1b27f63.png"
                }
            break;
            case 24:
                backgrounds[0].stage = "defaultnotris"
                backgrounds[0].backgroundimage = "https://static.wikia.nocookie.net/fortnite/images/e/e7/Chapter_4_Season_2_-_Lobby_Background_-_Fortnite.png"
            break;
            case 25:
                backgrounds[0].stage = "season2500"
                backgrounds[0].backgroundimage = "https://static.wikia.nocookie.net/fortnite/images/c/ca/Chapter_4_Season_3_-_Lobby_Background_-_Fortnite.png"
            break;
            case 26:
                if(version === "26.30")
                {  
                    backgrounds[0].stage = "season2630"
                    backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/s26-lobby-timemachine-final-2560x1440-a3ce0018e3fa.jpg"
                }
                else{
                    backgrounds[0].stage = "season2600"
                    backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/0814-ch4s4-lobby-2048x1024-2048x1024-e3c2cf8d342d.png"
                }
            break;
            case 27:
                if(version === "27.11"){
                    backgrounds[0].stage = "defaultnotris"
                    backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/durianlobby2-4096x2048-242a51b6a8ee.jpg"
                }
                else{
                    backgrounds[0].stage = "rufus"
                }
            break;
            case 28:
                if(version === "28.20"){
                    backgrounds[0].stage = "defaultnotris"
                    backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/s28-tmnt-lobby-4096x2048-e6c06a310c05.jpg"
                }
                else{
                    backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/ch5s1-lobbybg-3640x2048-0974e0c3333c.jpg"
                    backgrounds[0].stage = "defaultnotris"
                }
            break;
            case 29:
                if(version === "29.20"){
                    backgrounds[0].stage = "season2920"
                    backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/iceberg-lobby-3840x2160-217bb6ea8af9.jpg"                        
                }
                if(version === "29.40"){
                    backgrounds[0].stage = "defaultnotris"
                    backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/mkart-2940-sw-fnbr-lobby-3840x2160-4f1f1486a54a.jpg"                        
                }                    
                else{
                    backgrounds[0].stage = "defaultnotris"
                    backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/br-lobby-ch5s2-4096x2304-a0879ccdaafc.jpg"
                }
            break;
            case 30:
                if(version === "30.20" || version === "30.30"){
                    backgrounds[0].stage = "season3020"
                    backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/mkart-c5s3-msee-lobby-bg-2560x1440-9c8aa7721e41.jpg"
                }
                if(version == "30.40"){
                    backgrounds[0].stage = "season3030"
                    backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/ch5s3-lobby-3030-4096x2048-eecf04243faa.jpg"
                }
                else{
                    backgrounds[0].stage = "season3000"
                    backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/lobby-br-c5s3-4096x2048-7a9c78cb7b9a.jpg"
                }
            break;
            default:
                backgrounds[0].backgroundimage = content.dynamicbackgrounds.backgrounds.backgrounds[0].backgroundimage;
                backgrounds[0].stage = content.dynamicbackgrounds.backgrounds.backgrounds[0].stage;
        }
    }
}

//mainly for carbon so its easy for me to update playlist data, - hybrid
const Playlists = (fortnitegame, version) =>{
    const playlistData = fortnitegame.playlistinformation.playlist_info.playlists
    if(version == 7.40){
        playlistData[6].image = "https://i.imgur.com/3xoXe4R.png"
        playlistData[6].description = "Fan-made Fortnite Live Event. Not endorsed by Epic Games. Drop into the water planet and enjoy the show.\nEvent Made by bigboitaj2005tajypoo(@jalzod), sizzyleaks & Era Dev Team(@ProjectEraFN)"
        playlistData[6].display_name = "ERA FESTIVAL"
    }
    playlistData[2].image = "https://i.imgur.com/tm6gOaE.png"
    playlistData[3].image = "https://i.imgur.com/Itx0SsX.png"
    playlistData[4].image = "https://i.imgur.com/2wzonis.png"



}
    
module.exports = {
    Playlists,
    MPLockerLoadout,
    getVersionInfo,
    simpleProfile,
    CH1Fix,
    loadJSON,
    VersionFilter,
    discoveryEventData,
    billboard,
    CustomBackground
};