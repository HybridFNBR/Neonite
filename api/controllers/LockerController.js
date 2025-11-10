const Profile = require("../../profile");
const { v4: uuidv4 } = require("uuid");
const NeoLog = require("../../structs/NeoLog");
const fs = require("fs");
const {getVersionInfo} = require("../../config/defs")

module.exports = {
    lockerv3: async function(req, res){
		var accountId = req.params.accountId;
        const getOrCreateLockerProfile = () => {
			var lockerData = Profile.readLockerProfile(accountId, 3);
			if (!lockerData) {
				NeoLog.Error(`Locker Not Found for Account: ${accountId}, creating new Locker`);
				lockerData = Profile.readLockerTemplate(3);

				lockerData["activeLoadouts"].forEach(loadout => {
					loadout.creationTime = new Date().toISOString();
					loadout.accountId = accountId
				});

				if (!lockerData) {
					NeoLog.Error("An Error Occured Trying To Read Locker Template")
				}
				try {
					fs.mkdirSync(`./profile/${accountId}/profiles`, { recursive: true });
					Profile.saveLocker(accountId, 3, lockerData);
				} catch (e) {
					NeoLog.Error("Failed creating profile.");
					throw e;
				}

			}
			return res.json(lockerData)

		};
		getOrCreateLockerProfile()
		
    },

	lockerLoadoutV3: async function(req, res){
		var accountId = req.params.accountId;
		var lockerData = Profile.readLockerProfile(accountId, 3);
		const activeLoadout = lockerData["activeLoadouts"].find(loadout => loadout.loadoutType === req.params.loadoutType);

		if (!activeLoadout) {
			NeoLog.Error(`Invalid Loadout: ${req.params.loadoutType}`)
		}
		switch(req.params.loadout) {
			case "active-loadout":
				activeLoadout["loadoutSlots"] = req.body["loadoutSlots"];
				activeLoadout["updatedTime"] = new Date().toISOString();
				Profile.saveLocker(accountId, 3, lockerData);
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

	lockerPresetV3: async function(req, res){
		var accountId = req.params.accountId;
		var lockerData = Profile.readLockerProfile(accountId, 3);
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
			Profile.saveLocker(accountId, 3, lockerData);
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
			Profile.saveLocker(accountId, 3, lockerData);
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

	},

	lockerv4: async function(req, res){
		var accountId = req.params.accountId;
        const getOrCreateLockerProfile = () => {
			var lockerData = Profile.readLockerProfile(accountId, 4);
			if (!lockerData) {
				NeoLog.Error(`Locker Not Found for Account: ${accountId}, creating new Locker`);
				lockerData = Profile.readLockerTemplate(4);

				lockerData["activeLoadoutGroup"].accountId = accountId
				lockerData["activeLoadoutGroup"].creationTime = new Date().toISOString();
				lockerData["activeLoadoutGroup"].updatedTime = new Date().toISOString()				

				if (!lockerData) {
					NeoLog.Error("An Error Occured Trying To Read Locker Data")
				}
				try {
					fs.mkdirSync(`./profile/${accountId}/profiles`, { recursive: true });
					Profile.saveLocker(accountId, 4, lockerData);
				} catch (e) {
					NeoLog.Error("Failed creating profile.");
					throw e;
				}

			}
			return res.json(lockerData)

		};
		getOrCreateLockerProfile()
		
    },

	lockerLoadoutV4: function(req, res){
		const {version} = getVersionInfo(req);
		var accountId = req.params.accountId;
		var lockerData = Profile.readLockerProfile(accountId, 4);
		if(req.body.equippedPresetId){
			lockerData["activeLoadoutGroup"].equippedPresetId = req.body.equippedPresetId
		}
		else if(!req.body.equippedPresetId){
			delete lockerData["activeLoadoutGroup"].equippedPresetId
		}
		if(version >= 37.40){
			for (const LoadoutSchema in req.body.loadouts) {
				if (LoadoutSchema === "CosmeticLoadout:LoadoutSchema_Mimosa") continue;
				const schema = req.body.loadouts[LoadoutSchema];
				schema.loadoutSlots.forEach(slot => {
					if (slot.equippedItemId) {
						const [backendType, itemId] = slot.equippedItemId.split(":");
						slot.equippedItemId = `${backendType}:${itemId}`;
					}
				});
			}
		}
		lockerData["activeLoadoutGroup"].updatedTime = new Date().toISOString()	
		lockerData["activeLoadoutGroup"].loadouts = req.body["loadouts"]
		Profile.saveLocker(accountId, 4, lockerData)
		return res.json(lockerData["activeLoadoutGroup"])

	},

	lockerGroupPresetV4: function(req, res){
		var accountId = req.params.accountId;
		var lockerData = Profile.readLockerProfile(accountId, 4);
		let displayName = req.body["displayName"]
		const presetId = uuidv4();
		
		let existingPreset = lockerData["loadoutGroupPresets"].find(preset => 
			preset.presetIndex === parseInt(req.params.presetIndex)
		);
		if(existingPreset){
			existingPreset.athenaItemId = req.body.athenaItemId;
			existingPreset.loadoutSlots = req.body.loadouts;
			existingPreset.updatedTime = new Date().toISOString();
			existingPreset.displayName = displayName;
			Profile.saveLocker(accountId, 4, lockerData);
		}
		else{
			lockerData["loadoutGroupPresets"].push({
				"accountId": accountId,
				"athenaItemId": req.body.athenaItemId,
				"creationTime": new Date().toISOString(),
				"deploymentId": req.params.deploymentId,
				"displayName": displayName,
				"loadouts": req.body.loadouts,
				"presetFavoriteStatus": "EMPTY",
				"presetId": presetId,
				"presetIndex": parseInt(req.params.presetIndex)
			});
			Profile.saveLocker(accountId, 4, lockerData);
		}
		return res.json({
			"accountId": accountId,
			"athenaItemId": req.body.athenaItemId,
			"creationTime": new Date().toISOString(),
			"deploymentId": req.params.deploymentId,
			"displayName": displayName,
			"loadouts": req.body.loadouts,
			"presetFavoriteStatus": "EMPTY",
			"presetId": presetId,
			"updatedTime": new Date().toISOString(),
		});
	},


	//will be implemented sometime in the future
	lockerPresetV4: async function(req, res){
		var accountId = req.params.accountId;
		var lockerData = Profile.readLockerProfile(accountId, 4);
		let displayName = req.body["displayName"] || "";
		
		let existingPreset = lockerData["loadoutPresets"].find(preset => 
			preset.presetIndex === parseInt(req.params.presetIndex) && preset.loadoutType === req.params.loadoutType
		);
		
		if (existingPreset) {
			existingPreset.athenaItemId = req.body.athenaItemId;
			existingPreset.loadoutSlots = req.body.loadoutSlots;
			existingPreset.updatedTime = new Date().toISOString();
			if (displayName) {
				existingPreset.displayName = displayName;
			}
			Profile.saveLocker(accountId, 4, lockerData);
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
			Profile.saveLocker(accountId, 4, lockerData);
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

	},

	lockerImmutableItem: async function(req, res){
		athenaProfile = Profile.readProfile(req.params.accountId, "athena")
		const companionUUID = req.params.companion.split(":").pop(); //has to be UUID(example:"4fa32b64-2e03-416c-9d12-05aad6c5b9d1") otherwise Fortnite does not send the request
		const companionVarients = athenaProfile.items[companionUUID].attributes
		companionVarients["locked_in"] = true
		for (const channel in req.body.variants) {
			const variantTag = req.body.variants[channel].variantTag;
			const findVarient = companionVarients["variants"].find(v => v.channel === channel);

			if (findVarient) {
				findVarient["active"] = variantTag;
				if (!findVarient["owned"].includes(variantTag)) {
					findVarient.owned.push(variantTag);
				}
			} 
			else {
				companionVarients["variants"].push({
					channel,
					active: variantTag,
					owned: [variantTag]
				});
				
			}
			//not like we really need this check but may aswell.
		}
		Profile.changeItemAttribute(athenaProfile, companionUUID, "variants", companionVarients.variants);
		Profile.bumpRvn(athenaProfile);
		Profile.saveProfile(req.params.accountId, "athena", athenaProfile)
		res.status(204).end()
	},

	lockerCompanionName: async function(req, res){
		athenaProfile = Profile.readProfile(req.params.accountId, "athena")
		const companionUUID = req.body.cosmeticItemId.split(":").pop()
		const companionVarients = athenaProfile.items[companionUUID].attributes.variants
		const companionName = companionVarients.find(v => v.channel === "CustomName")
		companionName.active = req.body.companionName
		Profile.saveProfile(req.params.accountId, "athena", athenaProfile)
		res.status(204).end()
	}
}