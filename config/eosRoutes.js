module.exports.routes = {
    'POST /auth/v1/oauth/token': 'EosController.oauthTokenv1',
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
        action: "eossdkv1product",
        controller:'EosController', 
        skipAssets: false
    },
    'GET /epic/friends/v1/:accountId/blocklist': 'EosController.blocklist',
    'PATCH /epic/presence/v1/:gameNsIg/:accountId/presence/:presenceUuid': 'EosController.presence',
    'POST /epic/oauth/v2/token': 'EosController.oauthv2',




}