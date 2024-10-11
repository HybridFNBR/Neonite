const Profile = require("../../profile");
const { v4: uuidv4 } = require("uuid");
const NeoLog = require("../../structs/NeoLog");
const fs = require("fs");

module.exports = {
    locker: async function(req, res){
		var accountId = req.params.accountId;
        const getOrCreateLockerProfile = () => {
			var lockerData = Profile.readLockerProfile(accountId);

			if (!lockerData) {
				lockerData = Profile.readLockerTemplate();

				lockerData["activeLoadouts"].forEach(loadout => {
					loadout.creationTime = new Date().toISOString();
					loadout.accountId = accountId
				});

				if (!lockerData) {
					NeoLog.Error("An Error Occured Trying To Read Locker Data")
				}
				try {
					fs.mkdirSync(`./profile/${accountId}/profiles`, { recursive: true });
					Profile.saveLocker(accountId, lockerData);
				} catch (e) {
					NeoLog.Error("Failed creating profile.");
					throw e;
				}

			}
			return res.json(lockerData)

		};
		getOrCreateLockerProfile()
		
    },

	lockerLoadout: async function(req, res){
		var accountId = req.params.accountId;
		var lockerData = Profile.readLockerProfile(accountId);
		const activeLoadout = lockerData["activeLoadouts"].find(loadout => loadout.loadoutType === req.params.loadoutType);

		if (!activeLoadout) {
			NeoLog.Error(`Invalid Loadout: ${req.params.loadoutType}`)
		}
		switch(req.params.loadout) {
			case "active-loadout":
				activeLoadout["loadoutSlots"] = req.body["loadoutSlots"];
				activeLoadout["updatedTime"] = new Date().toISOString();
				Profile.saveLocker(accountId, lockerData);
				break;

			default:
				return NeoLog.Error("Invalid Loadout");
		}

		return res.json({
			"accountId": accountId,
			"athenaItemId": req.body["athenaItemId"],
			"creationTime": activeLoadout["creationTime"],
			"deploymentId": req.params.deploymentId,
			"loadoutShuffleType": activeLoadout["loadoutShuffleType"],
			"loadoutSlots": req.body["loadoutSlots"],
			"loadoutType": req.params.loadoutType,
			"updatedTime": activeLoadout["updatedTime"]
		})

	},

	lockerPreset: async function(req, res){
		var accountId = req.params.accountId;
		var lockerData = Profile.readLockerProfile(accountId);
		let displayName = req.body["displayName"] || "";
		
		let existingPreset = lockerData["loadoutPresets"].find(preset => 
			preset.presetIndex === parseInt(req.params.presetIndex)
		);
		
		if (existingPreset) {
			existingPreset.athenaItemId = req.body.athenaItemId;
			existingPreset.loadoutSlots = req.body.loadoutSlots;
			existingPreset.updatedTime = new Date().toISOString();
			if (displayName) {
				existingPreset.displayName = displayName;  //display name doesnt exist in the first request but most of the time does in the second request
			}
			Profile.saveLocker(accountId, lockerData);
			res.json({
				"deploymentId": req.params.deploymentId,
				"accountId": accountId,
				"loadoutType": req.params.loadoutType,
				"presetId": existingPreset.presetId,
				"presetIndex": existingPreset.presetIndex,
				"athenaItemId": req.body.athenaItemId,
				"creationTime": existingPreset.creationTime,
				"updatedTime": existingPreset.updatedTime,
				"loadoutSlots": req.body.loadoutSlots,
				"displayName": displayName,
				"presetFavoriteStatus": "EMPTY"
			});
		} 
		else {
			const presetId = uuidv4();
			lockerData["loadoutPresets"].push({
				"deploymentId": req.params.deploymentId,
				"accountId": accountId,
				"loadoutType": req.params.loadoutType,
				"presetId": presetId, 
				"presetIndex": parseInt(req.params.presetIndex),
				"athenaItemId": req.body.athenaItemId,
				"creationTime": new Date().toISOString(),
				"updatedTime": new Date().toISOString(),
				"loadoutSlots": req.body.loadoutSlots,
				"displayName": displayName,
				"presetFavoriteStatus": "EMPTY"
			});
			Profile.saveLocker(accountId, lockerData);
			return res.json({
				"deploymentId": req.params.deploymentId,
				"accountId": accountId,
				"loadoutType": req.params.loadoutType,
				"presetId": presetId,
				"presetIndex": parseInt(req.params.presetIndex),
				"athenaItemId": req.body.athenaItemId,
				"creationTime": new Date().toISOString(),
				"updatedTime": new Date().toISOString(),
				"loadoutSlots": req.body.loadoutSlots,
				"displayName": displayName,
				"presetFavoriteStatus": "EMPTY"
			});
		}

	}
}