module.exports.routes = {
    'GET /fortnite/api/cloudstorage/system': 'CloudStorageController.cloudstorageSystem',
    'GET /fortnite/api/cloudstorage/system/config': 'CloudStorageController.config',
    'GET /fortnite/api/cloudstorage/system/DefaultGame.ini': 'CloudStorageController.defaultGame',
    'GET /fortnite/api/cloudstorage/system/DefaultEngine.ini': 'CloudStorageController.defaultEngine',
    'GET /fortnite/api/cloudstorage/system/DefaultRuntimeOptions.ini': 'CloudStorageController.defaultRuntimeOptions',
    'GET /fortnite/api/cloudstorage/system/DefaultInput.ini': 'CloudStorageController.defaultInput',
    'GET /fortnite/api/cloudstorage/user/:accountId': 'CloudStorageController.user',
    'GET /fortnite/api/cloudstorage/user/:accountId/:fileName':{ 
        action: "userFile",
        controller:'CloudStorageController', 
        skipAssets: false
    },
    'PUT /fortnite/api/cloudstorage/user/:accountId/:fileName': 'CloudStorageController.userPutFile',

}