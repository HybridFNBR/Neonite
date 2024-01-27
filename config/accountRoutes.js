module.exports.routes = {
    'POST /fortnite/api/game/v2/tryPlayOnPlatform/account/:accountId': 'AccountController.tryPlayOnPlatform',
    'PUT /profile/privacy_settings': 'AccountController.privacySettings',
    'GET /api/v1/leaderboards/Fortnite/:eventId/:eventWindowId/*':{
        action: "leaderboards",
        controller:'AccountController', 
        skipAssets: false
    },
    'GET /api/v1/events/Fortnite/download/:accountId': 'AccountController.eventsDownload',
    'GET /region': 'AccountController.region',
    'GET /fortnite/api/game/v2/br-inventory/account/': 'AccountController.brInventory',
}