module.exports.routes = {
    'GET /launcher/api/public/distributionpoints': 'ApiController.distributionpoints',
    'GET /launcher/api/public/assets/:platform/:catalogItemId/:appName': 'ApiController.launcherAssets',
    'GET /Builds/Fortnite/Content/CloudDir/*.manifest':{ 
        action: "manifest",
        controller:'ApiController', 
        skipAssets: false
    },
    'GET /Builds/Fortnite/Content/CloudDir/*.ini': 'ApiController.ini',
    'GET /Builds/Fortnite/Content/CloudDir/ChunksV4/:chunknum/*.chunk':{ 
        action: "ChunksV4",
        controller:'ApiController', 
        skipAssets: false
    },
    'GET /lightswitch/api/service/bulk/status': 'ApiController.lightSwitchbulk',
    'GET /lightswitch/api/service/:serviceId/status': 'ApiController.lightswitch',
    'ALL /api/v1/events/Fortnite/:event/history/:accountId': 'ApiController.eventHistory',
    'GET /api/v1/games/fortnite/tracks/query*': 'ApiController.habaneroTracks',
    'GET /api/v1/games/fortnite/trackprogress/:accountId': 'ApiController.habaneroProgress',
    'GET /fortnite/api/v2/versioncheck*': 'ApiController.versionCheck',
    'GET /fortnite/api/versioncheck*': 'ApiController.versionCheck',
    'GET /fortnite/api/version': 'ApiController.versionCheck',
    'GET /fortnite/api/game/v2/privacy/account/:accountId': 'ApiController.privacy',
    'POST /api/v1/assets/Fortnite/:version/:netcl': 'ApiController.FrontendAssets',
    'GET /fortnite/api/storefront/v2/catalog': 'ApiController.catalog',
    'GET /catalog/api/shared/bulk/offers': 'ApiController.catalogBulk',
    'POST /fortnite/api/game/v2/grant_access/:accountId': 'ApiController.grantAccess',
    'GET /fortnite/api/game/v2/enabled_features': 'ApiController.enabledFeatures',
    'POST */datarouter/api/v1/public/*':{
        action: "dataRouter",
        controller:'ApiController', 
        skipAssets: false
    },
    'GET /presence/api/v1/_/:accountId/settings/subscriptions': 'ApiController.presence',
    'GET /socialban/api/public/v1/:accountId': 'ApiController.socialban',
    'GET /eulatracking/api/public/agreements/fn/account/:accountId': 'ApiController.eula',
    'GET /fortnite/api/game/v2/creative/*': 'ApiController.creative',
    'GET /affiliate/api/public/affiliates/slug/:affiliateName': 'ApiController.sac',
    'GET /content-controls/:accountId': 'ApiController.contentControls',
    'GET /content-controls/:accountId/rules/namespaces/fn': 'ApiController.contentControlsRules',
    'POST /content-controls/:accountId/verify-pin': 'ApiController.verifyPin',
    'GET /api/v2/interactions/aggregated/Fortnite/:accountId': 'ApiController.interactionsAggregated',
    'POST /fortnite/api/game/v2/profileToken/verify/*':{
        action: "profileToken",
        controller:'ApiController', 
        skipAssets: false
    },
    'GET /api/v1/namespace/fn/worlds/accessibleTo/:accountId': 'ApiController.fetchLegoWorlds',
    'POST /api/v1/namespace/fn/worlds/account/:accountId': 'ApiController.makeLegoWorlds',
    'GET /api/v1/namespace/fn/worlds/world/:worldID/session': 'ApiController.legoWorldSession',
    'GET /api/v1/namespace/fn/worlds/world/:worldId/attest/:accountId': 'ApiController.legoMatchMakingToken',
    'GET /fortnite/api/storefront/v2/keychain': 'ApiController.keychain',
    'GET /fortnite/api/game/v2/world/info': 'ApiController.worldInfo',
    'POST /region/check': 'ApiController.regionCheck',
    'PUT /profile/play_region': 'ApiController.playRegion',
    'GET /salesEvent/salesEvent/*':{ 
        action: "salesEvent",
        controller:'ApiController', 
        skipAssets: false
    },
    'GET /gameRating/gameRating/*':{ 
        action: "gameRating",
        controller:'ApiController', 
        skipAssets: false
    },
    'HEAD /ias/fortnite/:Hash':{ 
        action: "ias",
        controller:'ApiController', 
        skipAssets: false
    },
    'GET /ias/fortnite/chunks/:chunkNum/:chunkFile':{ 
        action: "iasChunks",
        controller:'ApiController', 
        skipAssets: false
    },
    'GET /:hash/:trackHash/*.mp4':{ 
        action: "trackSegment",
        controller:'ApiController', 
        skipAssets: false
    },
    'GET /:hash/:trackHash/*.m4s':{ 
        action: "trackSegment",
        controller:'ApiController', 
        skipAssets: false
    },
    'GET /api/v2/interactions/latest/Fortnite/:accountId': 'ApiController.interactions',
    'POST /fortnite/api/game/v2/tryPlayOnPlatform/account/:accountId': 'ApiController.tryPlayOnPlatform',
    'PUT /profile/privacy_settings': 'ApiController.privacySettings',
    'GET /api/v1/leaderboards/Fortnite/:eventId/:eventWindowId/*':{
        action: "leaderboards",
        controller:'ApiController', 
        skipAssets: false
    },
    'GET /api/v1/events/Fortnite/download/:accountId': 'ApiController.eventsDownload',
    'GET /region': 'ApiController.region',
    'GET /fortnite/api/game/v2/br-inventory/account/': 'ApiController.brInventory',
    'GET /fortnite/api/storeaccess/v1/request_access/:accountId': 'ApiController.storeAccess',
    'POST /api/v1/user/setting': 'ApiController.userSetting',
    'PATCH /v1/epic-settings/public/users/:accountId/*':{ 
        action: "epicSettings",
        controller:'ApiController', 
        skipAssets: false
    },
    'GET /v1/epic-settings/public/users/:accountId/*':{ 
        action: "epicSettings",
        controller:'ApiController', 
        skipAssets: false
    },
    'PUT /profile/languages': 'ApiController.languages',
    'GET /api/content/v2/search/artifact/:artifactId/*':{
        action: "searchArtifact",
        controller:'ApiController', 
        skipAssets: false
    },
    'GET /api/content/v2/artifact/:artifactId/*':{
        action: "artifact",
        controller:'ApiController', 
        skipAssets: false
    },
    'GET /api/v1/redirect/fortnite/valkyrie/cooked-content/*':{
        action: "valkyrie",
        controller:'ApiController', 
        skipAssets: false
    },
    'GET /:resourceId/master.blurl': 'ApiController.blurl',
    'POST /fortnite/api/game/v2/profile/:accountId/client/:command': 'ProfileController.mcp',
    'GET /content/api/pages/fortnite-game': 'FortniteGameController.fortniteGame',
    'GET /content/api/pages/fortnite-game/spark-tracks': 'FortniteGameController.sparks',
    'GET /content/api/pages/fortnite-game/eventscreens': 'FortniteGameController.eventScreen',
    'GET /content/api/pages/fortnite-game/radio-stations': 'FortniteGameController.stations',
    'GET /:trackdata': 'ApiController.trackData',
    'POST /api/v1/fortnite-br/surfaces/:gameMode/target': 'FortniteGameController.motd',
    'POST /api/v1/fortnite-br/channel/motd/target': 'FortniteGameController.motdTarget',
    'POST /api/v1/fortnite-br/interactions/contentHash': 'FortniteGameController.contentHash',
    'GET /content/api/pages/fortnite-game/seasonpasses': 'FortniteGameController.seasonPass',
    'GET /fortnite/api/calendar/v1/timeline': 'TimelineController.timeline',
    'GET /api/locker/v3/:deploymentId/account/:accountId/items': 'LockerController.lockerv3',
    'PUT /api/locker/v3/:deploymentId/loadout/:loadoutType/account/:accountId/:loadout':{ 
        action: "lockerLoadoutV3",
        controller:'LockerController', 
        skipAssets: false
    },
    'PUT /api/locker/v3/:deploymentId/loadout/:loadoutType/account/:accountId/loadout-preset/index/:presetIndex': { 
        action: "lockerPresetV3",
        controller:'LockerController', 
        skipAssets: false
    },
    'GET /api/locker/v4/:deploymentId/account/:accountId/items': 'LockerController.lockerv4',
    'PUT /api/locker/v4/:deploymentId/account/:accountId/active-loadout-group':{ 
        action: "lockerLoadoutV4",
        controller:'LockerController', 
        skipAssets: false
    },
    'PUT /api/locker/v4/:deploymentId/account/:accountId/loadout-group-preset/index/:presetIndex': { 
        action: "lockerGroupPresetV4",
        controller:'LockerController', 
        skipAssets: false
    },
    'PUT /api/locker/v4/:deploymentId/loadout/:loadoutType/account/:accountId/loadout-preset/index/:presetIndex': { 
        action: "lockerPresetV4",
        controller:'LockerController', 
        skipAssets: false
    },
};