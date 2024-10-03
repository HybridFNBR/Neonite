const profile = require("../../profile");
const Profile = require("../../profile");
const errors = require("../../structs/errors");
const { ApiException } = errors;
const NeoLog = require("../../structs/NeoLog");
const fs = require("fs");
const path = require('path');

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

	}
}