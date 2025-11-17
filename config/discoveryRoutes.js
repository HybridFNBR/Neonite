

module.exports.routes = {
    'POST /fortnite/api/game/v2/creative/discovery/surface/*':{
        action: "discoveryv1",
        controller:'DiscoveryController', 
        skipAssets: false
    },
    'POST /api/v1/discovery/surface/*':{
        action: "discoveryv2",
        controller:'DiscoveryController', 
        skipAssets: false
    },
    'POST /api/v2/discovery/surface/CreativeDiscoverySurface_Frontend': 'DiscoveryController.discoveryv3',
    'POST /api/v2/discovery/surface/CreativeDiscoverySurface_FrontendV2': 'DiscoveryController.discoveryv3',
    'POST /api/v2/discovery/surface/:surface/page':{
        action: "page",
        controller:'DiscoveryController', 
        skipAssets: false
    },
    'POST /links/api/fn/mnemonic': 'DiscoveryController.mnemonicLinks',
    'GET /links/api/fn/mnemonic/:playlistId/related': 'DiscoveryController.related',
    'POST /api/v1/links/favorites/:accountId/check': 'DiscoveryController.favoritesCheck',
    'POST /api/v1/links/lock-status/:accountId/check': 'DiscoveryController.lockStatus',
    'GET /links/api/fn/mnemonic/:playlistId': 'DiscoveryController.mnemonicPlaylist',





}