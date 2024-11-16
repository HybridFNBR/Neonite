module.exports.routes = {
    'POST /account/api/oauth/token': 'AuthController.oauthToken',
    'GET /account/api/oauth/verify': 'AuthController.verifyToken',
    'DELETE /account/api/oauth/sessions/kill': 'AuthController.killToken',
    'DELETE /account/api/oauth/sessions/kill/:token': 'AuthController.killToken',
    'GET /account/api/public/account/:accountId': 'AuthController.accountInfo',
    'GET /account/api/public/account/displayName/:displayName': 'AuthController.displayName',
    'GET /fortnite/api/discovery/accessToken/*':{
        action: "discoveryToken",
        controller:'AuthController', 
        skipAssets: false
    },
    'GET /account/api/public/account/': 'AuthController.publicAccount',
    'GET /account/api/public/account/token': 'ApiController.token',
    'GET /account/api/public/account/:accountId/externalAuths': 'AuthController.externalAuths',
    'POST /publickey/v2/publickey': 'AuthController.publicKey',
    'POST /epic/oauth/v2/tokenInfo': 'AuthController.tokenInfo'


}