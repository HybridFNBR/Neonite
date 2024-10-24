const Profile = require("../../profile");
const errors = require("../../structs/errors");
const { ApiException } = errors;
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require('path');
var ini = require('ini')
const { getVersionInfo, MPLockerLoadout, CH1Fix, VersionFilter, loadJSON} = require("../../config/defs")

Array.prototype.insert = function ( index, item ) {
	this.splice( index, 0, item );
};
const NeoLog = require("../../structs/NeoLog");
var config = ini.parse(fs.readFileSync(path.join(__dirname, '../../config.ini'), 'utf-8'));


module.exports = {
    mcp: function(req, res, next){
        res.setHeader("Content-Type", "application/json");
		var accountId = req.params.accountId;
		var athenprofile = Profile.readProfile(accountId, "athena")
		const { version, versionGlobal } = getVersionInfo(req);
		const getOrCreateProfile = profileId => {
			var profileData = Profile.readProfile(accountId, profileId);

			if (!profileData) {
				profileData = Profile.readProfileTemplate(profileId);

				if (!profileData) {
					throw next(new ApiException(errors.com.epicgames.modules.profiles.operation_forbidden).with(profileId));
				}

				profileData.created = profileData.updated = new Date().toISOString();
				profileData['_id'] = accountId;
				profileData.accountId = accountId;

				//creating profile if it doesn't exist
				try {
					fs.mkdirSync(`./profile/${accountId}/profiles`, { recursive: true });
					Profile.saveProfile(accountId, profileId, profileData);
				} catch (e) {
					NeoLog.Error("Failed creating profile.");
					throw e;
				}

			}

			return {
				profileData,
				response: {
					"profileRevision": profileData.rvn || 1,
					"profileId": profileId,
					"profileChangesBaseRevision": profileData.rvn || 1,
					"profileChanges": [],
					"serverTime": new Date().toISOString(),
					"profileCommandRevision": profileData.commandRevision || 1,
					"responseVersion": 1
				}
			};
			

		};
		getOrCreateProfile("athena") //make sure athena exists before query
		var command = req.params.command;
		var profileId = req.query.profileId || "common_core";
		const { profileData, response } = getOrCreateProfile(profileId);
		const { profileChanges } = response;
		//const checkValidProfileID = (...validProfileIds) => checkValidProfileID0(command, profileId, next, ...validProfileIds); //not sure if ill need it but ill keep it just incase

		switch(command){
			case "ClientQuestLogin": {
				break;
			}

			case "ClaimMfaEnabled": {
				profileData.stats.attributes["mfa_reward_claimed"] = false;
				response.profileChanges = [{
					"changeType": "fullProfileUpdate",
					"profile": profileData
				}];
				break;
			}

			case "SetHardcoreModifier":{
				break;
			}

			case "QueryProfile":{
				try{
					let miniPassData = loadJSON("../config/MiniPass.json")
					for (const [questId, quest] of Object.entries(miniPassData)) {
						Profile.addItem(athenprofile, questId, quest);
					}
					var pastSeasons = [];
					for (var i = 1; i <= 100; i++) {
						pastSeasons.push({
							"seasonNumber": i,
							"numWins": 10000,
							"seasonXp": 1000000,
							"seasonLevel": 500,
							"level": 200,
							"bookXp": 1000000,
							"bookLevel": 500,
							"purchasedVIP": true
						});
					}
					Profile.modifyStat(athenprofile, "book_level", parseInt(config.Level))
					Profile.modifyStat(athenprofile, "level", parseInt(config.Level))
					Profile.modifyStat(athenprofile, "accountLevel", parseInt(config.Level))
					Profile.modifyStat(athenprofile, "season_num", versionGlobal)
					Profile.modifyStat(athenprofile, "past_seasons", pastSeasons)
					Profile.saveProfile(accountId, "athena", athenprofile);
				}
				catch{}
				if(version >= 28.00){
					MPLockerLoadout(accountId, athenprofile)
					Profile.saveProfile(accountId, "athena", athenprofile)
					
				}
				if(version <= 10.40 || VersionFilter.includes(versionGlobal))
				{
					CH1Fix(accountId, athenprofile)
				}
				
				response.profileChanges = [{
					"changeType": "fullProfileUpdate",
					"profile": profileData
				}];
				break;
			}

			case "RedeemRealMoneyPurchases": {
				response.profileChanges = [ {
					"changeType" : "statModified",
					"name" : "in_app_purchases",
					"value" : {
					  "receipts" : [],
					  "ignoredReceipts" : [],
					  "fulfillmentCounts" : {},
					  "refreshTimers" : {
						"MicrosoftStore" : {
						  "nextEntitlementRefresh" : "9999-12-01T21:10:00.000Z"
						},
						"SamsungGalaxyAppStore" : {},
						"EpicPurchasingService" : {
						  "nextEntitlementRefresh" : "9999-12-01T21:10:00.000Z"
						}
					  },
					  "version" : 1
					}
				  }, 
				  {
					"changeType" : "statModified",
					"name" : "subscriptions",
					"value" : []
				}]
				break;
			}

			case "SetCosmeticLockerSlot": {
				const item = profileData.items[req.body.lockerItem];
			
				if (!item) {
					console.error("[Error] Item not found.");
					return;
				}
			
				const locker_slots_data = item.attributes.locker_slots_data ;
				let lockerSlot = locker_slots_data.slots[req.body.category];
			
				const expectedCapacity = {
					"Dance": 6,
					"ItemWrap": 7,
				}[req.body.category] || 1;
			
				if (!lockerSlot) {
					lockerSlot = locker_slots_data.slots[req.body.category] = {
						items: new Array(expectedCapacity),
						activeVariants: new Array(expectedCapacity)
					};
				}
			
				const itemsArray = lockerSlot.items;
				let bChanged = false;
			
				const startIndex = Math.max(0, req.body.slotIndex);
				const endIndex = Math.min(expectedCapacity, startIndex + 1);
			
				for (let index = startIndex; index < endIndex; index++) {
					if (index >= itemsArray.length) {
						itemsArray.push("");
					}
					if (itemsArray[index] !== req.body.itemToSlot) {
						itemsArray[index] = req.body.itemToSlot;
						bChanged = true;
					}
				}
			
				if (req.body.variantUpdates.length != 0) {
					lockerSlot.activeVariants = [{
						"variants": []
					}]
					req.body.variantUpdates.forEach(variant => {
						lockerSlot.activeVariants[0].variants.push(variant)
					})
					bChanged = true
				}

				if (bChanged) {
					Profile.bumpRvn(profileData);
					response.profileRevision = profileData.rvn || 1;
					response.profileCommandRevision = profileData.commandRevision || 1
					Profile.saveProfile(accountId, profileId, profileData)					
					Profile.changeItemAttribute(profileData, req.body.lockerItem, "locker_slots_data", locker_slots_data, profileChanges);
			
				}
				break;
			}

			case "PutModularCosmeticLoadout": {
				const loadoutData = JSON.parse(req.body["loadoutData"]);
				const loadoutType = req.body.loadoutType;
				const presetId = req.body.presetId;
				const loadoutPresets = profileData.stats.attributes["loadout_presets"][loadoutType];
				let loadout = loadoutPresets[presetId];
				if (!loadout) {
					const newPresetId = uuidv4();
					loadoutPresets[presetId] = newPresetId;
					Profile.addItem(profileData, newPresetId, {
						"templateId": loadoutType,
						"attributes": loadoutData,
						"quantity": 1
					});
					Profile.saveProfile(accountId, profileId, profileData);
					response.profileChanges = [
						{
						  "changeType": "itemAdded",
						  "itemId": newPresetId,
						  "item": {
							"templateId": loadoutType,
							"attributes": loadoutData,
							"quantity": 1
						  }
						},
						{
						  "changeType": "statModified",
						  "name": "loadout_presets",
						  "value": profileData.stats.attributes["loadout_presets"]
						},
						{
						  "changeType": "statModified",
						  "name": "locker_two_phase_commit",
						  "value": "COMMITTED"
						}
					]
					
				} 
				else if(presetId > 0 && loadout){
					Profile.changeItemAttribute(profileData, loadout, "slots", loadoutData.slots);
					response.profileChanges =
					[{
						"changeType": "itemAttrChanged",
						"itemId": loadout,
						"attributeName": "slots",
						"attributeValue": loadoutData.slots
					  },
					  {
						"changeType": "itemAttrChanged",
						"itemId": loadout,
						"attributeName": "user_tags",
						"attributeValue": []
					  },
					  {
						"changeType": "itemAttrChanged",
						"itemId": loadout,
						"attributeName": "display_name",
						"attributeValue": loadoutData["display_name"]
					  },
					  {
						"changeType": "statModified",
						"name": "locker_two_phase_commit",
						"value": "COMMITTED"
					}]
				}
				else{
					Profile.changeItemAttribute(profileData, loadout, "slots", loadoutData.slots);
					response.profileChanges.push({
						"changeType": "itemAttrChanged",
						"itemId": loadout,
						"attributeName": "slots",
						"attributeValue": profileData.items[loadout].attributes.slots
					});
				}
				Profile.bumpRvn(profileData);
				response.profileRevision = profileData.rvn || 1;
				response.profileCommandRevision = profileData.commandRevision || 1;
				Profile.saveProfile(accountId, profileId, profileData);
			
				break;
			}

			case "EquipBattleRoyaleCustomization": {
				let statName, itemToSlot
				const item = profileData.items[req.body.itemToSlot];
				switch (req.body.slotName) {
					case "Character":
						statName = "favorite_character"
						itemToSlot = req.body.itemToSlot
						break
					case "Backpack":
						statName = "favorite_backpack"
						itemToSlot = req.body.itemToSlot
						break
					case "Pickaxe":
						statName = "favorite_pickaxe"
						itemToSlot = req.body.itemToSlot
						break
					case "Glider":
						statName = "favorite_glider"
						itemToSlot = req.body.itemToSlot
						break
					case "SkyDiveContrail":
						statName = "favorite_skydivecontrail"
						itemToSlot = req.body.itemToSlot
						break
					case "MusicPack":
						statName = "favorite_musicpack"
						itemToSlot = req.body.itemToSlot
						break
					case "LoadingScreen":
						statName = "favorite_loadingscreen"
						itemToSlot = req.body.itemToSlot
						break
					case "Dance":
					case "ItemWrap":
						var bIsDance = req.body.slotName == "Dance";
						statName = bIsDance ? "favorite_dance" : "favorite_itemwraps";
						var arr = profileData.stats.attributes[statName] || [];
						if (req.body.indexWithinSlot === -1) {
							// handle wrap "Apply To All"
							arr = [];

							for (var i = 0; i < (bIsDance ? 6 : 7); ++i) {
								arr[i] = req.body.itemToSlot;
							}
						} else {
							arr[req.body.indexWithinSlot || 0] = req.body.itemToSlot;
						}

						for (var i = 0; i < arr.length; ++i) {
							if (arr[i] == null) {
								arr[i] = "";
							}
						}

						itemToSlot = arr;
						break
				}
				bChanged = false
				try{
					if (req.body.variantUpdates.length != 0) {
						for (var variant in item.attributes.variants) {
							if (item.attributes.variants.hasOwnProperty(variant) && req.body.variantUpdates.hasOwnProperty(variant) && item.attributes.variants[variant].channel === req.body.variantUpdates[variant].channel) {
								item.attributes.variants[variant].active = req.body.variantUpdates[variant].active;
							}
						}
						response.profileChanges = [{
							changeType: "itemAttrChanged",
							itemId: req.body.itemToSlot,
							attributeName: "variants",
							attributeValue: item.attributes.variants
						}]
						bChanged = true
					}
				}
				catch{}
				if (statName != null && itemToSlot != null) {
					Profile.modifyStat(profileData, statName, itemToSlot, response.profileChanges);
				}

				Profile.bumpRvn(profileData);
				response.profileRevision = profileData.rvn || 1;
				response.profileCommandRevision = profileData.commandRevision || 1
				Profile.saveProfile(accountId, profileId, profileData)
				break;
			}
		}
		console.log(response)
		res.json(response)

	}
}
        