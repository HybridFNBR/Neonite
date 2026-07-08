const Profile = require("../profile");
const fs = require("fs");
const path = require('path');
const NeoLog = require("../structs/NeoLog")
const { default: axios } = require("axios");
const { UDPClient } = require('dns2');
const resolve = UDPClient({
    dns: '8.8.8.8'
});

const account = {
    displayName: "",
    accountId: "",
    token: ""
};

const misc = {
    bInEditor: false,
    relicPurchased: false,
    relicId: "",
    counts: {
        "Currency_ExtractionPoints": 999999,
        "BurntPeanut_Variation_A": 1,
        "DemonSprite_Variant_A": 1,
        "DemonSprite_Variant_Galaxy": 1,
        "DemonSprite_Variant_Gold": 1,
        "DuckSprite_Variant_A": 1,
        "DuckSprite_Variant_Candy": 1,
        "DuckSprite_Variant_Galaxy": 1,
        "DuckSprite_Variant_Gold": 1,
        "EarthSprite_Variant_A": 1,
        "EarthSprite_Variant_Candy": 1,
        "EarthSprite_Variant_Galaxy": 1,
        "EarthSprite_Variant_Gold": 1,
        "GhostSprite_Variant_A": 1,
        "GhostSprite_Variant_Candy": 1,
        "GhostSprite_Variant_Galaxy": 1,
        "GhostSprite_Variant_Gold": 1,
        "KingSprite_Variant_A": 1,
        "KingSprite_Variant_Candy": 1,
        "KingSprite_Variant_Galaxy": 1,
        "KingSprite_Variant_Gold": 1,
        "PunkSprite_Variant_A": 1,
        "PunkSprite_Variant_Candy": 1,
        "PunkSprite_Variant_Galaxy": 1,
        "PunkSprite_Variant_Gold": 1,
        "SleepySprite_Variant_A": 1,
        "SleepySprite_Variant_Candy": 1,
        "SleepySprite_Variant_Galactic": 1,
        "SleepySprite_Variant_Gold": 1,
        "Spitfire_Variation_A": 1,
        "Spitfire_Variation_Candy": 1,
        "Spitfire_Variation_Galaxy": 1,
        "Spitfire_Variation_Gold": 1,
        "Water_Variant_Base": 1,
        "Water_Variant_Candy": 1,
        "Water_Variant_Galaxy": 1,
        "Water_Variant_Gold": 1,
        "ZeroPointSprite_Variant_A": 1,
        "ZeroPointSprite_Variant_Candy": 1,
        "ZeroPointSprite_Variant_Galaxy": 1,
        "ZeroPointSprite_Variant_Gold": 1,
        "DemonSprite_Variant_Candy": 1,
        "AirSprite_Variant_A": 1,
        "AirSprite_Variant_Candy": 1,
        "AirSprite_Variant_Galaxy": 1,
        "AirSprite_Variant_Gold": 1,
        "AirSprite_Variant_Holofoil": 1,
        "BossSprite_Variant_A": 1,
        "BossSprite_Variant_Candy": 1,
        "BossSprite_Variant_Galaxy": 1,
        "BossSprite_Variant_Gold": 1,
        "FishySprite_Variant_A": 1,
        "FishySprite_Variant_Candy": 1,
        "FishySprite_Variant_Galaxy": 1,
        "FishySprite_Variant_Gold": 1,
        "SoccerSprite_Variant_A": 1,
        "SoccerSprite_Variant_Candy": 1,
        "SoccerSprite_Variant_Galaxy": 1,
        "SoccerSprite_Variant_Gold": 1,
        "SoccerSprite_Variant_Holofoil": 1,
        "DrifterSprite_Variant_A": 1,
        "DrifterSprite_Variant_Candy": 1,
        "DrifterSprite_Variant_Galaxy": 1,
        "DrifterSprite_Variant_Gem": 1,
        "DrifterSprite_Variant_Gold": 1,
        "GrimSprite_Variant_A": 1,
        "GrimSprite_Variant_Candy": 1,
        "GrimSprite_Variant_Galaxy": 1,
        "GrimSprite_Variant_Gold": 1,
        "SevenSprite_Variant_A": 1,
        "SevenSprite_Variant_Candy": 1,
        "SevenSprite_Variant_Galaxy": 1,
        "SevenSprite_Variant_Gold": 1,
        "SevenSprite_Variant_Holofoil": 1,
        "DuckSprite_Variant_Gem": 1,
        "EarthSprite_Variant_Gem": 1,
        "DemonSprite_Variant_Gem": 1,
        "Water_Variant_Gem": 1,
        "Water_Variant_Holofoil": 1,
        "GhostSprite_Variant_Holofoil": 1,
        "Spitfire_Variation_Holofoil": 1,
        "KingSprite_Variant_Holofoil": 1,
        "ZeroPointSprite_Variant_Gem": 1
    }
}
//will prob get more use out of this as time goes on


async function TCPRequests(method, domain, urlPath, options = {}) {
    const { headers = {}, data = null, responseType = "json" } = options;
    const domains = await resolve(domain);
    const ips = domains.answers.filter(a => a.type === 1).map(a => a.address);
    const ip = ips[0];
    const response = await axios({
        method,
        url: `https://${ip}${urlPath}`,
        headers: {
            Host: domain,
            ...headers
        },
        data,
        responseType
    }).catch(err => {
        NeoLog.warn(`Error making TCP request to ${ip}${urlPath}: ${err.message}`);
    });

    return response;
}

async function getClientCredentials() {
    const response = await TCPRequests('POST', 'account-public-service-prod.ol.epicgames.com', '/account/api/oauth/token',
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ZWM2ODRiOGM2ODdmNDc5ZmFkZWEzY2IyYWQ4M2Y1YzY6ZTFmMzFjMjExZjI4NDEzMTg2MjYyZDM3YTEzZmM4NGQ='
            },
            data: new URLSearchParams({
                grant_type: 'client_credentials',
                token_type: 'eg1'
            })
        }
    );
    return response.data;
}

const MPLockerLoadout = (accountId, athenprofile) => {
    const characterloadout = athenprofile.items["NEONITECHARACTER"]
    const emoteloadout = athenprofile.items["NEONITEEMOTE"]
    const platformloadout = athenprofile.items["NEONITEPLATFORM"]
    const wrapsloadout = athenprofile.items["NEONITEWRAPS"]
    const jamloadout = athenprofile.items["NEONITEJAM"]
    const sparksloadout = athenprofile.items["NEONITESPARKS"]
    const vehicleloadout = athenprofile.items["NEONITEVEHICLE"]
    const vehiclesuvloadout = athenprofile.items["NEONITESUV"]
    if (typeof characterloadout == 'undefined') {
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
            "quantity": 1
        });
    }
    if (typeof emoteloadout == 'undefined') {
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
            "quantity": 1
        });
    }
    if (typeof platformloadout == 'undefined') {
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
    if (typeof wrapsloadout == 'undefined') {
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
    if (typeof jamloadout == 'undefined') {
        Profile.addItem(athenprofile, "NEONITEJAM", {
            "templateId": "CosmeticLoadout:LoadoutSchema_Jam",
            "attributes": {
                "slots": [{
                    "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_JamSong0"
                }, {
                    "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_JamSong1"
                }, {
                    "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_JamSong2"
                }, {
                    "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_JamSong3"
                }, {
                    "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_JamSong4"
                }, {
                    "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_JamSong5"
                }, {
                    "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_JamSong6"
                }, {
                    "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_JamSong7"
                }]
            },
            "quantity": 1
        });
    }
    if (typeof sparksloadout == 'undefined') {
        Profile.addItem(athenprofile, "NEONITESPARKS", {
            "templateId": "CosmeticLoadout:LoadoutSchema_Sparks",
            "attributes": {
                "slots": [{
                    "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Bass"
                }, {
                    "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Guitar"
                }, {
                    "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Drum"
                }, {
                    "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Keyboard"
                }, {
                    "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Microphone"
                }]
            },
            "quantity": 1
        });
    }
    if (typeof vehicleloadout == 'undefined') {
        Profile.addItem(athenprofile, "NEONITEVEHICLE", {
            "templateId": "CosmeticLoadout:LoadoutSchema_Vehicle",
            "attributes": {
                "slots": [{
                    "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Vehicle_Body"
                }, {
                    "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Vehicle_Booster"
                }, {
                    "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Vehicle_DriftSmoke"
                }, {
                    "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Vehicle_Wheel"
                }, {
                    "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Vehicle_Skin"
                }]
            },
            "quantity": 1
        });
    }
    if (typeof vehiclesuvloadout == 'undefined') {
        Profile.addItem(athenprofile, "NEONITESUV", {
            "templateId": "CosmeticLoadout:LoadoutSchema_Vehicle_SUV",
            "attributes": {
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
            "quantity": 1
        });
    }
    if (!athenprofile.stats.attributes["loadout_presets"]) {
        Profile.modifyStat(athenprofile, "loadout_presets", {
            "CosmeticLoadout:LoadoutSchema_Character": {
                "0": "NEONITECHARACTER",
            },
            "CosmeticLoadout:LoadoutSchema_Emotes": {
                "0": "NEONITEEMOTES",
            },
            "CosmeticLoadout:LoadoutSchema_Platform": {
                "0": "NEONITEPLATFORM",
            },
            "CosmeticLoadout:LoadoutSchema_Wraps": {
                "0": "NEONITEWRAPS",
            },
            "CosmeticLoadout:LoadoutSchema_Jam": {
                "0": "NEONITEJAM",
            },
            "CosmeticLoadout:LoadoutSchema_Sparks": {
                "0": "NEONITESPARKS",
            },
            "CosmeticLoadout:LoadoutSchema_Vehicle": {
                "0": "NEONITEVEHICLE",
            },
            "CosmeticLoadout:LoadoutSchema_Vehicle_SUV": {
                "0": "NEONITESUV"
            }
        })
    }
    Profile.saveProfile(accountId, "athena", athenprofile)
};

const stats = (accountId, athenprofile, config, versionGlobal) => {
    if (athenprofile.stats) {
        var pastSeasons = [];
        for (var i = 1; i <= 100; i++) {
            pastSeasons.push({
                "seasonNumber": i,
                "numWins": 10000,
                "seasonXp": 1000000,
                "seasonLevel": 500,
                "bookXp": 1000000,
                "bookLevel": 500,
                "purchasedVIP": true
            });
        }

        athenprofile.stats["attributes"]["past_seasons"] = pastSeasons;
    }

    if (athenprofile.stats.attributes["favorite_character"] === "" || !athenprofile.stats.attributes["favorite_character"]) {
        athenprofile.stats["attributes"]["favorite_character"] = "AthenaCharacter:CID_001_Athena_Commando_F_Default"
    }
    if (parseInt(config.Level) > 1) {
        Profile.modifyStat(athenprofile, "book_level", parseInt(config.Level)) //removed as of 39.50
        Profile.modifyStat(athenprofile, "level", parseInt(config.Level))
        Profile.modifyStat(athenprofile, "accountLevel", parseInt(config.Level))
    }
    Profile.modifyStat(athenprofile, "season_num", versionGlobal)
    Profile.saveProfile(accountId, "athena", athenprofile)
};

const seasonPass = (accountId, athenprofile, version, versionGlobal) => {
    var passArray = [
        `athenaseason${versionGlobal}`,
        "figmentpass_s01",
        "figmentpass_s02",
        "figmentpass_s03",
        "figmentpass_s04",
        "figment_s05_passdata_seasonasset",
        "figment_s06_passdata_seasonasset",
        "figment_s07_passdata_seasonasset",
        "figment_s08_passdata_seasonasset",
        "figment_s09_passdata_seasonasset",
        "junoseason1pass",
        "junoseason2pass",
        "s3pass_seasonasset",
        "s04pass_seasonasset",
        "junoseason05pass_seasonasset",
        "junoseason06pass_seasonasset",
        "junoseason07pass_seasonasset",
        "sparks_season07_seasonasset",
        "sparks_season08_seasonasset",
        "musicpasss09_seasonasset",
        "musicpasss10_seasonasset",
        "musicpasss11_seasonasset",
        "musicpasss12_seasonasset",
        "musicpasss13_seasonasset",
        "musicpasss14_seasonasset",
        "safflower_seasondata_seasonasset"

    ]
    if (version >= 37.40) { //Epic didnt remove the season 5 figment pass
        passArray = passArray.filter(item => item !== "figment_s05_passdata_seasonasset")
        delete athenprofile.items["AthenaSeason:figment_s05_passdata_seasonasset"]
    }
    if (version >= 37.50) { //Epic didnt remove the season 10 music pass
        passArray = passArray.filter(item => item !== "musicpasss10_seasonasset")
        delete athenprofile.items["AthenaSeason:musicpasss10_seasonasset"]
    }
    if (version >= 40.20) { //Epic didnt remove the season 13 music pass
        passArray = passArray.filter(item => item !== "musicpasss13_seasonasset")
        delete athenprofile.items["AthenaSeason:musicpasss13_seasonasset"]
    }
    passArray.forEach(seasonPass => {
        Profile.addItem(athenprofile, `AthenaSeason:${seasonPass}`, {
            "templateId": `AthenaSeason:${seasonPass}`,
            "attributes": {
                "purchased": false,
                "currency_season_total": 1,
                "tier_one_rewards_given": false,
                "purchased_at_least_once": false,
                "level": 1,
                "purchase_date": "0001-01-01T00:00:00.000Z",
                "purchase_context": "None",
                "purchased_offers": []
            },
            "quantity": 1
        })
    })
    Profile.saveProfile(accountId, "athena", athenprofile)
};

const accountResources = (accountId, athenprofile) => {
    const accountResource = [
        "s21_powerlevel",
        "s23_eventcurrency"
    ]

    accountResource.forEach(resource => {
        Profile.addItem(athenprofile, resource, {
            attributes: {
                "level": 1
            },
            "templateId": `AccountResource:${resource}`,
            "quantity": 120000000
        })
    })
    Profile.saveProfile(accountId, "athena", athenprofile)
}

const winterFest = (accountId, athenprofile) => {
    const winterFestRewardGraphs = [
        "AthenaRewardGraph:Winterfest",
        "AthenaRewardGraph:S19_Winterfest",
        "AthenaRewardGraph:s33_winterfest",
        "AthenaRewardGraph:s39_winterfest"
    ];

    const winterFestKeys = [
        "Token:AthenaWinterfest_Key",
        "Token:Athena_S19_Winterfest_Key",
        "Token:athena_s33_winterfest_key",
        "Token:athena_s39_winterfest_key"
    ];

    winterFestRewardGraphs.forEach(graph => {
        Profile.addItem(athenprofile, graph, {
            attributes: {
                "reward_nodes_claimed": [],
                "unlock_epoch": "2025-12-17T14:00:00.000Z",
                "player_random_seed": -1526480758,
                "days_since_grant": 1,
                "reward_graph_purchased_timestamp": 1766050316877,
                "reward_graph_purchased": true,
                "reward_keys": [
                    {
                        "keys_granted_today": 14,
                        "unlock_keys_used": 0,
                    }
                ]
            },
            templateId: graph
        });
    });

    winterFestKeys.forEach(key => {
        Profile.addItem(athenprofile, key, {
            attributes: {
                "max_level_bonus": 0,
                "level": 1,
                "item_seen": true,
                "xp": 0,
                "variants": [],
                "favorite": false
            },
            "templateId": key,
            "quantity": 14
        });
    });
    Profile.saveProfile(accountId, "athena", athenprofile)
};

const winterFestPresents = {
    "39.11": {
        "ERG.Node.A.1": "AthenaCharacter:Character_ChubbyJingle",
        "ERG.Node.A.2": "AthenaCharacter:Character_FrostIron",
        "ERG.Node.A.3": "AthenaBackpack:Backpack_PolarGander",
        "ERG.Node.A.4": [
            "AthenaDance:Emoticon_S39Winterfest",
            "AthenaDance:Spray_WinterFest3"
        ],
        "ERG.Node.A.5": "AthenaBackpack:Backpack_WinkFin",
        "ERG.Node.A.6": "SparksSong:SID_Placeholder_728",
        "ERG.Node.A.7": "AthenaPickaxe:Pickaxe_HunSting",
        "ERG.Node.A.8": "AthenaPickaxe:Pickaxe_JingleBlade",
        "ERG.Node.A.9": "AthenaItemWrap:Wrap_ShavedIce",
        "ERG.Node.A.10": "AthenaSkyDiveContrail:Contrail_HollowStun",
        "ERG.Node.A.11": "SparksGuitar:Sparks_RainbowHouse_Guitar",
        "ERG.Node.A.12": "SparksBass:Sparks_FrostIron_Bass",
        "ERG.Node.A.13": "AthenaGlider:Glider_RumpleWisp",
        "ERG.Node.B.1": [
            "AthenaDance:Spray_WinterFest",
            "AthenaDance:Spray_WinterFest2"
        ]
    },
    "33.11": {
        "ERG.Node.A.1": "AthenaCharacter:Character_BlowWire",
        "ERG.Node.A.2": "SparksBass:Sparks_Bass_AlmondSplash",
        "ERG.Node.A.3": "SparksGuitar:Sparks_Guitar_IceWater",
        "ERG.Node.A.4": [
            "AthenaDance:Spray_S33Winterfest",
            "AthenaDance:Spray_S33Winterfest2",
            "AthenaDance:Spray_MusicPassWinterfestS32"
        ],
        "ERG.Node.A.5": "AthenaDance:Emoji_S33_Winterfest",
        "ERG.Node.A.6": "SparksSong:SID_Placeholder_437",
        "ERG.Node.A.7": "AthenaItemWrap:Wrap_BlowWire",
        "ERG.Node.A.8": "AthenaPickaxe:Pickaxe_BlowWire",
        "ERG.Node.A.9": "AthenaGlider:Glider_BlowWire",
        "ERG.Node.A.10": "AthenaBackpack:Backpack_BlowWire",
        "ERG.Node.A.11": "AthenaBackpack:Backpack_AlmondSplash",
        "ERG.Node.A.12": "AthenaSkyDiveContrail:Contrail_FrostedGlass",
        "ERG.Node.A.13": "AthenaPickaxe:Pickaxe_AlmondSplash",
        "ERG.Node.B.1": "AthenaCharacter:Character_AlmondSplash"

    },
    "23.10": {
        "ERG.Node.A.1": "AthenaCharacter:Character_SportsFashion_Winter",
        "ERG.Node.A.2": "AthenaGlider:Glider_Default_Jolly",
        "ERG.Node.A.3": "AthenaDance:EID_Dashing",
        "ERG.Node.A.4": [
            "AthenaDance:Spray_GuffHolidayTree_Winterfest2022",
            "AthenaDance:Spray_WinterReindeer_Winterfest2022",
            "AthenaDance:Spray_DefacedSnowman_Winterfest2022"
        ],
        "ERG.Node.A.5": "AthenaDance:Emoji_S23_Winterfest_2022",
        "ERG.Node.A.6": "AthenaMusicPack:MusicPack_164_RedPepper_Winterfest",
        "ERG.Node.A.7": "AthenaItemWrap:Wrap_Winter_Pal",
        "ERG.Node.A.8": "AthenaPickaxe:Pickaxe_JollyTroll",
        "ERG.Node.A.9": "AthenaGlider:Glider_JollyTroll",
        "ERG.Node.A.10": "AthenaBackpack:MusicPack_163_Winterfest_2022",
        "ERG.Node.A.11": [
            "AthenaMusicPack:MusicPack_163_Winterfest_2022",
            "AthenaMusicPack:MusicPack_157_Radish_NightNight"
        ],
        "ERG.Node.A.12": "AthenaItemWrap:Wrap_CometWinter",
        "ERG.Node.A.13": "AthenaSkyDiveContrail:Contrail_JollyTroll",
        "ERG.Node.B.1": "AthenaCharacter:Character_CometDeer"

    },
    "19.01": {
        "ERG.Node.A.1": "Token:14DaysOfFortnite_Small_Giftbox",
        "ERG.Node.A.2": "HomebaseBannerIcon:BRS19_WinterFest2021",
        "ERG.Node.A.3": "AthenaSkyDiveContrail:Trails_ID_137_TurtleneckCrystal",
        "ERG.Node.A.4": "AthenaItemWrap:Wrap_429_HolidaySweater",
        "ERG.Node.A.5": "AthenaLoadingScreen:LSID_393_WinterFest2021",
        "ERG.Node.A.6": "AthenaMusicPack:MusicPack_117_WinterFest2021",
        "ERG.Node.A.7": "AthenaDance:EID_EpicYarn",
        "ERG.Node.A.8": "AthenaCharacter:CID_A_310_Athena_Commando_F_ScholarFestive",
        "ERG.Node.A.9": "AthenaPickaxe:Pickaxe_ID_731_ScholarFestiveFemale1h",
        "ERG.Node.A.10": "AthenaItemWrap:Wrap_430_WinterLights",
        "ERG.Node.A.11": "AthenaDance:SPID_346_Winterfest_2021",
        "ERG.Node.A.12": "AthenaPickaxe:Pickaxe_ID_732_ShovelMale",
        "ERG.Node.B.1": "AthenaDance:Emoji_S19_AnimWinterFest2021",
        "ERG.Node.C.1": "AthenaGlider:Glider_ID_335_Logarithm_40QGL",
        "ERG.Node.D.1": "AthenaCharacter:CID_A_323_Athena_Commando_M_BananaWinter"
    },
    "11.31": {
        "ERG.Node.A.1": "AthenaCharacter:CID_645_Athena_Commando_F_Wolly",
        "ERG.Node.A.2": "AthenaPickaxe:Pickaxe_ID_329_GingerbreadCookie1H",
        "ERG.Node.A.3": "AthenaPickaxe:Pickaxe_ID_332_MintMiner",
        "ERG.Node.A.4": "AthenaDance:EID_SnowGlobe",
        "ERG.Node.A.5": "AthenaGlider:Glider_ID_191_PineTree",
        "ERG.Node.A.6": "AthenaItemWrap:Wrap_188_WrappingPaper",
        "ERG.Node.A.7": "AthenaItemWrap:Wrap_183_NewYear2020",
        "ERG.Node.A.8": "AthenaSkyDiveContrail:Trails_ID_082_HolidayGarland",
        "ERG.Node.A.9": "AthenaMusicPack:MusicPack_040_XmasChipTunes",
        "ERG.Node.A.10": "AthenaLoadingScreen:LSID_208_SMPattern",
        "ERG.Node.A.11": "AthenaLoadingScreen:LSID_209_AKCrackshot",
        "ERG.Node.B.1": "AthenaGlider:Glider_ID_188_GalileoRocket_G7OKI",
        "ERG.Node.C.1": "AthenaBackpack:BID_430_GalileoSpeedBoat_9RXE3",
        "ERG.Node.D.1": [
            "AthenaCharacter:CID_643_Athena_Commando_M_OrnamentSoldier",
            "AthenaBackpack:BID_439_OrnamentSoldier"
        ],
    }
}

const getVersionInfo = (req) => {
    try {
        const userAgent = req.headers["user-agent"];
        const version = userAgent.split('-')[1];
        const versionGlobal = parseInt(version.split('.')[0], 10);
        const versionLegacy = userAgent.split('CL-')[1].split(',')[0]
        return { version, versionGlobal, versionLegacy };
    }
    catch { return { version: 1.00, versionGlobal: 1 } }
};


const CH1Fix = (accountId, athenprofile) => {
    athenprofile.stats["attributes"]["favorite_character"] = "AthenaCharacter:CID_001_Athena_Commando_F_Default";
    athenprofile.stats["attributes"]["favorite_pickaxe"] = "AthenaPickaxe:DefaultPickaxe";
    athenprofile.stats["attributes"]["favorite_glider"] = "AthenaGlider:DefaultGlider";
    Profile.saveProfile(accountId, "athena", athenprofile);
};

const loadJSON = (dirPath) => {
    const fullPath = path.join(__dirname, dirPath);
    const jsonData = fs.readFileSync(fullPath, 'utf-8');
    return JSON.parse(jsonData);
}

const VersionFilter = [
    "Cert",
    "Live",
    "2870186+++Fortnite+Release",
    "3.0.0",
    "Next"
];

const billboard = (sectionID, offerGoupsectionID, stackRankValue, foregroundUrl, backgroundUrl, bodyImage, titleImage, titleColorA, titleColorB, title, subtitle, buttonText, SectiondisplayName) => {
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
                                        },
                                        {
                                            "_type": "MP Item Shop - Offer Group Texture Metadata",
                                            "value": titleImage,
                                            "key": "titleImage"
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

async function compareAndUpdateKeychain() {
    const keychain = JSON.parse(fs.readFileSync("./responses/keychain.json", "utf-8"));
    const response = await axios.get('https://export-service.dillyapis.com/v1/aes', { validateStatus: () => true });
    if (response.status === 200) {
        const data = response.data;

        let missingCount = 0;
        const keychainArray = [];

        for (const keys of data.dynamicKeys) {
            if (!keychain.includes(keys.keychain)) {
                missingCount++;
                keychainArray.push(keys.keychain);
                NeoLog.Debug(`New Keychain added: ${keys.name}(${keys.size.formatted}, ${keys.fileCount} Files)`)
            }
        }       
        keychain.push(...keychainArray);

        fs.writeFileSync("./responses/keychain.json", JSON.stringify(keychain, null, 2));
    }
    else if (response.status !== 200) {
        NeoLog.Error("Unable to connect to dillyapis! Falling back to existing keychains on your local disk. You may experience issues!");
    }
}
NeoLog.Log("Neonite is up and listening on port 5595!")

const Backgrounds = (version, versionGlobal, backgrounds, content) => {
    //random backgrounds
    const s37backgroundImages = [
        "http://localhost:5595/cdn2-unrealengine/mkart-ch6s4-37-20-mural-update-lobby-bg-ltg-v9-1-stage1-4096x2048-7c99610cb2e5.jpg",
        "http://localhost:5595/cdn2-unrealengine/mkart-ch6s4-37-20-mural-update-lobby-bg-ltg-v10-1-stage2-4096x2048-62f85531048f.jpg",
        "http://localhost:5595/cdn2-unrealengine/mkart-ch6s4-37-20-mural-update-lobby-bg-ltg-v11-1-stage3-4096x2048-db7cb2ad4221.jpg",
        "http://localhost:5595/cdn2-unrealengine/mkart-ch6s4-37-20-mural-update-lobby-bg-ltg-v12-1-stage4-4096x2048-0ede7555e124.jpg",
        "http://localhost:5595/cdn2-unrealengine/mkart-ch6s4-37-20-mural-update-lobby-bg-ltg-v13-1-stage5-4096x2048-9521957dae87.jpg",
        "http://localhost:5595/cdn2-unrealengine/mkart-ch6s4-37-20-mural-update-lobby-bg-ltg-v14-1-stage6-4096x2048-59b63c4363c7.jpg"
    ];

    const s39backgroundImages = [
        "http://localhost:5595/cdn2-unrealengine/mkart-ch7s1-lobby-stage01-final-4k-v3-4096x2048-f6be95824181.jpg",
        "http://localhost:5595/cdn2-unrealengine/mkart-ch7s1-lobby-stage02-final-4k-v3-4096x2048-61d0a886f7e4.jpg",
        "http://localhost:5595/cdn2-unrealengine/mkart-ch7s1-lobby-stage03-final-4k-v3-4096x2048-6dc5bdf49bb4.jpg",
        "http://localhost:5595/cdn2-unrealengine/mkart-ch7s1-lobby-stage04-final-4k-v3-4096x2048-3cd8f01c1dc9.jpg"
    ]

    const v3951backgroundImages = [
        "http://localhost:5595/cdn2-unrealengine/mkart-ch7s1-3951-lobbybg-v1-orb-4096x2048-ae9c19ac7c34.jpg",
        "http://localhost:5595/cdn2-unrealengine/mkart-ch7s1-3951-lobbybg-v2-orbrifted-4096x2048-b1e84cf25f41.jpg",
        "http://localhost:5595/cdn2-unrealengine/mkart-ch7s1-3951-lobbybg-v3-orblaser-4096x2048-d2a2acf6a920.jpg"
    ]
    const s17backgroundStages = ["season17d", "season17c", "season17b", "season17"]

    const versionBackgrounds = Object.create({
        "10.31": { stage: "blackmonday" },
        "11.10": { stage: "fortnitemares" },
        "11.30": { stage: "Galileo" },
        "11.31": { stage: "Winter19" },
        "11.40": { stage: "Winter19" },
        "11.50": { stage: "LoveAndWar" },
        "13.20": {
            stage: "defaultnotris",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/Fortnite/fortnite-game/lobby/T_Background_Summer-2048x1024-37957ac10d82d67eab41c7c87615102307fd9afa.png"
        },
        "14.40": { stage: "halloween2020" },
        "15.10": { stage: "season15xmas" },
        "17.10": {
            stage: "defaultnotris",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/t-bp-17-lobby-summer-2048x1024-709fa99e6be0.png"
        },
        "17.21": {
            stage: "defaultnotris",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/t-bp17-21-lobby-2048x1024-f6027bf109de.png"
        },
        "17.30": {
            stage: "defaultnotris",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/t-bp17-21-lobby-2048x1024-f6027bf109de.png"
        },
        "17.40": {
            stage: "defaultnotris",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/t-bp17-40-lobby-2048x1024-f742fc604aae.png"
        },
        "17.50": {
            stage: "defaultnotris",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/s17-50-lobby-2048x1024-f00569ea4991.png"
        },
        "19.01": {
            stage: "winter2021",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/t-bp19-lobby-xmas-2048x1024-f85d2684b4af.png"
        },
        "19.10": {
            stage: "season1910",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/fortnite-tilted-towers-1920x1080-ad94e5f0b016.jpg"
        },
        "20.10": {
            stage: "season20",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/t-bp20-lobby-2048x1024-d89eb522746c.png"
        },
        "20.40": {
            stage: "defaultnotris",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/t-bp20-40-armadillo-glowup-lobby-2048x2048-2048x2048-3b83b887cc7f.jpg"
        },
        "21.30": {
            stage: "season2130",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/nss-lobbybackground-2048x1024-f74a14565061.jpg"
        },
        "21.40": {
            stage: "season2140",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/t-s21-stamina-lobby-2048x1024-87eb7cd878e4.png"
        },
        "22.20": {
            stage: "season2220",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/t-bp22-fortnitemares-lobby-square-2048x2048-2048x2048-3b7cda3aa517.jpg"
        },
        "23.10": {
            stage: "season2310",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/t-bp23-winterfest-lobby-square-2048x2048-2048x2048-277a476e5ca6.png"
        },
        "23.40": {
            stage: "defaultnotris",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/mostwanted-final-v2-2048x2048-2048x2048-39f2b5041a40.jpg"
        },
        "24.30": {
            stage: "defaultnotris",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/ch4s2-lobbyupdate-4-20-2022-lifted-copy-3840x2160-d3a138f5f9e7.jpg"
        },
        "24.40": {
            stage: "defaultnotris",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/t-ch4s2-lobby24-40-4096x2048-50eb15d565bb.jpg"
        },
        "25.11": {
            stage: "season2500",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/t-s25-14dos-lobby-4096x2048-2be24969eee3.jpg"
        },
        "26.30": {
            stage: "season2630",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/s26-lobby-timemachine-final-2560x1440-a3ce0018e3fa.jpg"
        },
        "27.11": {
            stage: "defaultnotris",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/durianlobby2-4096x2048-242a51b6a8ee.jpg"
        },
        "28.01": {
            stage: "defaultnotris",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/winterfest2023-lobby-2048x1024-a8853c3a6f59.jpg"
        },
        "28.20": {
            stage: "defaultnotris",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/s28-tmnt-lobby-4096x2048-e6c06a310c05.jpg"
        },
        "29.20": {
            stage: "season2920",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/iceberg-lobby-3840x2160-217bb6ea8af9.jpg"
        },
        "29.40": {
            stage: "defaultnotris",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/mkart-2940-sw-fnbr-lobby-3840x2160-4f1f1486a54a.jpg"
        },
        "30.20": {
            stage: "season3020",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/mkart-c5s3-msee-lobby-bg-2560x1440-9c8aa7721e41.jpg"
        },
        "30.30": {
            stage: "season3020",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/mkart-c5s3-msee-lobby-bg-2560x1440-9c8aa7721e41.jpg"
        },
        "30.40": {
            stage: "season3030",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/ch5s3-lobby-3030-4096x2048-eecf04243faa.jpg"
        },
        "31.40": {
            stage: "season3140",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/mkart-fnbr-fortnitemares2024-lobby-final-4096x2048-d17d51ae76a0.jpg"
        },
        "31.41": {
            stage: "season3140",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/mkart-fnbr-fortnitemares2024-lobby-final-4096x2048-d17d51ae76a0.jpg"
        },
        "32.11": {
            stage: "defaultnotris",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/mkart-fnbr-quail-lobby-3264x1836-b157b2252db6.jpg"
        },
        "37.10": {
            stage: "defaultnotris",
            backgroundImage: s37backgroundImages[Math.floor(Math.random() * s37backgroundImages.length)]
        },
        "37.20": {
            stage: "defaultnotris",
            backgroundImage: s37backgroundImages[Math.floor(Math.random() * s37backgroundImages.length)]
        },
        "37.30": {
            stage: "season3730",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/megazord-midseason-lobby-bg-4096x2048-87c393fad772.jpg"
        },
        "37.40": {
            stage: "season3730",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/megazord-midseason-lobby-bg-4096x2048-87c393fad772.jpg"
        },
        "37.50": {
            stage: "season3750",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/mkart-fnbr-fortnitemares-37-50-lobbybg-final-4096x2048-92c002d8d677.jpg"
        },
        "37.51": {
            stage: "season3750",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/mkart-fnbr-fortnitemares-37-50-lobbybg-final-4096x2048-92c002d8d677.jpg"
        },
        "38.11": {
            stage: "defaultnotris",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/mkart-c6ee-lobbybg-demon-3840x1920-ed1afc7e3dfc.jpg"
        },
        "39.11": {
            stage: "season3911",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/mkart-fnbr-winterfest-39-11-lobbybg-final-4k-2560x1280-3f2aa2d84a17.jpg"
        },
        "39.20": {
            stage: "season3920",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/mkart-safflower-lobby-bg-final-4096x2048-9c7abd20d655.jpg"
        },
        "39.30": {
            stage: "defaultnotris",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/mkart-safflower-lobby-bg-final-4096x2048-9c7abd20d655.jpg"
        },
        "39.40": {
            stage: "season3940",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/mkart-ch7s1-lobby-stage04-final-4k-v3-4096x2048-3cd8f01c1dc9.jpg"
        },
        "39.50": {
            stage: "defaultnotris",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/mkart-rocketcanyon-lobbybg-final-4096x2048-cb47d24d618f.jpg"
        },
        "39.51": {
            stage: "defaultnotris",
            backgroundImage: v3951backgroundImages[Math.floor(Math.random() * v3951backgroundImages.length)]
        },
        "40.20": {
            stage: "defaultblurryfloor",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/mkart-fnbr-40-20-lobbybg-final-4096x2048-117eac73cdcd.jpg"
        },
        "40.30": {
            stage: "defaultblurryfloor",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/mkart-fnbr-ch7s2-40-30-lobbybg-final-4096x2048-b8ba188ee990.jpg"
        },
        "40.40": {
            stage: "season4040",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/mkart-fnbr-ch7s2-venison-40-40-lobbybg-final-3840x2022-bd790399258a.jpg"
        },
        "40.41": {
            stage: "season4041",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/mkart-fnbr-smarttuna-lobbybg-withfx-final-4k-4703x2477-81899f28574e.jpg"
        },
    });

    const versionGlobalBackgrounds = Object.create({
        10: { stage: "seasonx" },
        11: { stage: "season11" },
        12: { stage: "season12" },
        13: { stage: "season13" },
        14: { stage: "season14" },
        15: { stage: "season15" },
        16: { stage: "season16" },
        17: { stages: s17backgroundStages[Math.floor(Math.random() * s17backgroundStages.length)] },
        18: { stage: "season18" },
        19: { stage: "season19" },
        20: {
            stage: "season20",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/s20-landscapev4-2048x1024-2494a103ae6c.png"
        },
        21: {
            stage: "season2100",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/s21-lobby-background-2048x1024-2e7112b25dc3.jpg"
        },
        22: {
            stage: "season2200",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/t-bp22-lobby-square-2048x2048-2048x2048-e4e90c6e8018.jpg"
        },
        23: {
            stage: "season2300",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/t-bp23-lobby-2048x1024-2048x1024-26f2c1b27f63.png"
        },
        24: {
            stage: "defaultnotris",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/t-ch4s2-bp-lobby-4096x2048-edde08d15f7e.jpg"
        },
        25: {
            stage: "season2500",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/s25-lobby-4k-4096x2048-4a832928e11f.jpg"
        },
        26: {
            stage: "season2600",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/0814-ch4s4-lobby-2048x1024-2048x1024-e3c2cf8d342d.png"
        },
        27: { stage: "rufus" },
        28: {
            stage: "defaultnotris",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/ch5s1-lobbybg-3640x2048-0974e0c3333c.jpg"
        },
        29: {
            stage: "defaultnotris",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/br-lobby-ch5s2-4096x2304-a0879ccdaafc.jpg"
        },
        30: {
            stage: "season3000",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/lobby-br-c5s3-4096x2048-7a9c78cb7b9a.jpg"
        },
        31: {
            stage: "season3100",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/ch5s4-lobbybg-final-2136x1202-e5885322faf1.jpg"
        },
        32: {
            stage: "defaultnotris",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/mkart-fnbr-32-00-lobby-3840x2160-f18b699506a4.jpg"
        },
        33: {
            stage: "season3300",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/ch6s1-lobby-2048x1024-218a4754f2a0.jpg"
        },
        34: {
            stage: "season3400",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/mkart-fnbr-ch6s2-34-00-lobby-2048x1024-16b9f3791e2a.jpg"
        },
        35: {
            stage: "season3500",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/ch6ms1-lobby-bg-plate-jpeg-2048x1024-e4f1f3252405.jpg"
        },
        36: {
            stage: "season3600",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/mkart-fnbr-ch6s3-lobbybg-final-4096x2048-340e7bf8bb02.jpg"
        },
        37: {
            stage: "season3700",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/mkart-ch6s4-lobby-bg-4096x2048-d73f821bb40c.jpg"
        },
        38: {
            stage: "season3800",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/mkart-ch6ms2-lobbybg-plate-4098x2048-c51669ab5daa.jpg"
        },
        39: {
            stage: "season3900",
            backgroundImage: s39backgroundImages[Math.floor(Math.random() * s39backgroundImages.length)]
        },
        40: {
            stage: "season4000",
            backgroundImage: "http://localhost:5595/cdn2-unrealengine/mkart-fnbr-ch7s2-lobbybg-final-4k-4096x2048-4572ba5a2d95.jpg"
        }
    });
    const versionBackground = versionBackgrounds[version] ?? versionGlobalBackgrounds[versionGlobal];

    if (versionBackground) {
        backgrounds[1].stage = versionBackground.stage;
        backgrounds[1].backgroundimage = versionBackground.backgroundImage;
    }
    else {
        backgrounds[1].backgroundimage = content.dynamicbackgrounds.backgrounds.backgrounds[0].backgroundimage;
        backgrounds[1].stage = content.dynamicbackgrounds.backgrounds.backgrounds[0].stage;

    }
}

let folderSize = 0;
if (!fs.existsSync(path.join(process.cwd(), "cache"))) {
    fs.mkdirSync(path.join(process.cwd(), "cache"), { recursive: true });
}
for (const cache of fs.readdirSync("cache", { withFileTypes: true })) {
    const cachePath = path.join("cache", cache.name);
    for (const file of fs.readdirSync(cachePath)) {
        const stats = fs.statSync(path.join(cachePath, file));
        if (stats.isFile()) {
            folderSize += stats.size;
        }
    }
}
NeoLog.Debug(`cache Folder size: ${(folderSize / 1024 / 1024).toFixed(2)} MB`);

const Playlists = (fortnitegame, version) => {
    const playlistData = fortnitegame.playlistinformation.playlist_info.playlists
    const getPlaylist = name => playlistData.find(p => p.playlist_name === name);
    if (version === 7.40) {
        const era = getPlaylist("Playlist_Music_High");
        if (era) {
            era.image = "https://neonite.cdn.cbn.lol/EraEventLTMImage.png";
            era.description = "Fan-made Fortnite Live Event. Not endorsed by Epic Games. Drop into the water planet and enjoy the show.\nEvent Made by bigboitaj2005tajypoo(@jalzod), sizzyleaks & Era Dev Team(@ProjectEraFN)";
            era.display_name = "ERA FESTIVAL";
        }
    }

    const unvaulting = getPlaylist("Playlist_Music_Med");
    if (unvaulting) {
        unvaulting.image = "https://neonite.cdn.cbn.lol/UnvaultingEventLTMImage.png";
    }

    const finalShowdown = getPlaylist("Playlist_Music_Higher");
    if (finalShowdown) {
        finalShowdown.image = "https://neonite.cdn.cbn.lol/FinalShowdownEventLTMImage.png";
    }

    const theEnd = getPlaylist("Playlist_Music_Highest");
    if (theEnd) {
        theEnd.image = "https://neonite.cdn.cbn.lol/TheEndEventLTMImage.png";
    }

}
module.exports = {
    TCPRequests,
    accountResources,
    compareAndUpdateKeychain,
    misc,
    getClientCredentials,
    winterFestPresents,
    seasonPass,
    stats,
    winterFest,
    account,
    Playlists,
    MPLockerLoadout,
    getVersionInfo,
    CH1Fix,
    loadJSON,
    VersionFilter,
    billboard,
    Backgrounds
};