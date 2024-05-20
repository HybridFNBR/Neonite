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
        const versionGlobal = version.split('.')[0];
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
                Profile.bumpRvn(athenprofile);
                Profile.saveProfile(accountId, "athena", athenprofile);
                grantDefaultItems.response.profileChanges = [
                    {
                        changeType: "fullProfileUpdate",
                        profile: athenprofile
                    }
                ];
                response.multiUpdate = [grantDefaultItems.response];
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
    
    const seasonData = {
        "22.40": discoveryResponses.ver2240,
        "20.40": discoveryResponses.ver2040,
        "18.40": discoveryResponses.ver1840,
        "17.50": discoveryResponses.ver1750
    };
    
    module.exports = {
        MPLockerLoadout,
        getVersionInfo,
        simpleProfile,
        CH1Fix,
        loadJSON,
        VersionFilter,
        seasonData
    };