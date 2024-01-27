module.exports.routes = {
    'POST /party/api/v1/*/parties':{
        action: "parties",
        controller:'PlayerController', 
        skipAssets: false
    },
    'GET /party/api/v1/Fortnite/user/:accountId': 'PlayerController.localparty',
    'GET /party/api/v1/*/parties/:partyId/members/:accountId/meta':{
        action: "partyMeta",
        controller:'PlayerController', 
        skipAssets: false
    },
    'POST /party/api/v1/*/user/:accountId/pings/:pingerId':{
        action: "pings",
        controller:'PlayerController', 
        skipAssets: false
    },
    'GET /friends/api/v1/*/recent/fortnite':{
        action: "recentPlayers",
        controller:'PlayerController', 
        skipAssets: false
    },
    'GET /friends/api/v1/:accountId/summary': 'PlayerController.friendsSummary',
    'GET /friends/api/public/friends/:accountId': 'PlayerController.friends',
    'GET /friends/api/public/list/fortnite/:accountId/recentPlayers/': 'PlayerController.recentPlayers',
    'GET /statsproxy/api/statsv2/account/:accountId': 'PlayerController.stats',
    'ALL /presence/api/v1/*':{
        action: "presence",
        controller:'PlayerController', 
        skipAssets: false
    },
    'GET /fortnite/api/receipts/v1/account/:accountId/receipts': 'PlayerController.receipts',




}