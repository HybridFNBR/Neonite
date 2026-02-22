module.exports.routes = {
    'POST /auth/v1/oauth/token': 'EosController.oauthTokenv1',
    'POST /epic/oauth/v2/token': 'EosController.oauthv2',
    'GET /epic/id/v2/sdk/accounts': 'EosController.eossdkv2',
    'GET /sdk/v1/default':{
        action: "eossdkv1default",
        controller:'EosController', 
        skipAssets: false
    },
    'GET /sdk/v1/product/prod-fn':{
        action: "eossdkv1productprod",
        controller:'EosController', 
        skipAssets: false
    },
    'GET /sdk/v1/product/*':{
        action: "eossdkv1productprod",
        controller:'EosController', 
        skipAssets: false
    },
    'GET /epic/friends/v1/:accountId/blocklist': 'EosController.blocklist',
    'PATCH /epic/presence/v1/:gameNsIg/:accountId/presence/:presenceUuid': 'EosController.presence',
    'GET /v2': 'EosController.wss',
    'POST /user/v9/product-users/search' : 'EosController.productUsersSearch',
    'POST /telemetry/data*':{ 
        action: "telemetry",
        controller:'EosController', 
        skipAssets: false
    },
    'GET /epic/chat/v1/public/_/users/:accountId/summary': 'EosController.chatSummary',
    'GET /epic/chat/v1/public/_/users/hybrid/conversations*':{
        action: "chatConversations",
        controller:'EosController', 
        skipAssets: false
    },
    'POST /datarouter/api/v1/public/data/clients':{
        action: "datarouterClients",
        controller:'EosController', 
        skipAssets: false
    },
}