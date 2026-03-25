module.exports.routes = {
   'GET /api/locker/v3/:deploymentId/account/:accountId/items': 'LockerController.lockerv3',
    'PUT /api/locker/v3/:deploymentId/loadout/:loadoutType/account/:accountId/:loadout': {
        action: "lockerLoadoutV3",
        controller: 'LockerController',
        skipAssets: false
    },
    'PUT /api/locker/v3/:deploymentId/loadout/:loadoutType/account/:accountId/loadout-preset/index/:presetIndex': {
        action: "lockerPresetV3",
        controller: 'LockerController',
        skipAssets: false
    },
    'GET /api/locker/v4/:deploymentId/account/:accountId/items': 'LockerController.lockerv4',
    'PUT /api/locker/v4/:deploymentId/account/:accountId/active-loadout-group': {
        action: "lockerLoadoutV4",
        controller: 'LockerController',
        skipAssets: false
    },
    'PUT /api/locker/v4/:deploymentId/account/:accountId/loadout-group-preset/index/:presetIndex': {
        action: "lockerGroupPresetV4",
        controller: 'LockerController',
        skipAssets: false
    },
    'PUT /api/locker/v4/:deploymentId/loadout/:loadoutType/account/:accountId/loadout-preset/index/:presetIndex': {
        action: "lockerPresetV4",
        controller: 'LockerController',
        skipAssets: false
    },
    'POST /api/locker/v4/:deploymentId/account/:accountId/lock-in-immutable-item/:companion': {
        action: "lockerImmutableItem",
        controller: 'LockerController',
        skipAssets: false
    },
    'PATCH /api/locker/v4/:deploymentId/account/:accountId/companion-name': {
        action: "lockerCompanionName",
        controller: 'LockerController',
        skipAssets: false
    },
}