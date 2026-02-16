module.exports.routes = {
    'GET /fortnite/api/cloudstorage/system': 'CloudStorageController.cloudstorageSystem',
    'GET /fortnite/api/cloudstorage/system/config': 'CloudStorageController.config',
    'GET /fortnite/api/cloudstorage/system/:fileName': {
        action: "hotfixFiles",
        controller: 'CloudStorageController',
        skipAssets: false
    },
    'GET /fortnite/api/cloudstorage/user/config': 'CloudStorageController.config',
    'GET /fortnite/api/cloudstorage/user/:accountId': {
        action: "user",
        controller: 'CloudStorageController',
        skipAssets: false
    },
    'GET /fortnite/api/cloudstorage/user/:accountId/:fileName': {
        action: "userFile",
        controller: 'CloudStorageController',
        skipAssets: false
    },
    'PUT /fortnite/api/cloudstorage/user/:accountId/:fileName': {
        action: "userPutFile",
        controller: 'CloudStorageController',
        skipAssets: false,
        skip: ['bodyParser']
    },

}
