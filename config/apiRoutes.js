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
    'POST /datarouter/api/v1/public/*':{
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
    'GET /api/v1/namespace/fn/worlds/accessibleTo/:accountID': 'ApiController.fetchLegoWorlds',
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
    'POST /fortnite/api/game/v2/profile/:accountId/client/:command': 'ProfileController.mcp',
    'GET /fortnite/api/storeaccess/v1/request_access/:accountId': 'ApiController.storeAccess',
    'GET /content/api/pages/fortnite-game': 'FortniteGameController.fortniteGame',
    'GET /content/api/pages/fortnite-game/spark-tracks': 'FortniteGameController.sparks',
    'GET /content/api/pages/fortnite-game/eventscreens': 'FortniteGameController.eventScreen',
    'GET /:trackdata': 'ApiController.trackData',
    'POST /api/v1/fortnite-br/surfaces/:gameMode/target': 'FortniteGameController.motd',
    'POST /api/v1/fortnite-br/interactions/contentHash': 'FortniteGameController.contentHash',
    'POST /api/v1/user/setting': 'UserController.userSetting',
    'PATCH /v1/epic-settings/public/users/:accountId/*':{ 
        action: "epicSettings",
        controller:'UserController', 
        skipAssets: false
    },
    'GET /v1/epic-settings/public/users/:accountId/*':{ 
        action: "epicSettings",
        controller:'UserController', 
        skipAssets: false
    },
    'PUT /profile/play_region': 'UserController.playRegion',
    'PUT /profile/languages': 'UserController.languages',
    'GET /fortnite/api/calendar/v1/timeline': 'TimelineController.timeline',
    'GET /api/locker/v3/:deploymentId/account/:accountId/items': 'LockerController.locker',
    'PUT /api/locker/v3/:deploymentId/loadout/:loadoutType/account/:accountId/:loadout':{ 
        action: "lockerLoadout",
        controller:'LockerController', 
        skipAssets: false
    },
    // Add more routes as needed
};