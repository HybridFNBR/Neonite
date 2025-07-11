const Profile = require("../../profile");
const errors = require("../../structs/errors");
const { ApiException } = errors;
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require('path');
const ini = require('ini')
const { getVersionInfo, MPLockerLoadout, CH1Fix, VersionFilter, loadJSON, stats, seasonPass, winterFest, winterFestPresents} = require("../../config/defs")
let miniPassData = loadJSON("../config/MiniPass.json")
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
		var commoncore = Profile.readProfile(accountId, "common_core")
		const { version, versionGlobal } = getVersionInfo(req);
		const getOrCreateProfile = profileId => {
			var profileData = Profile.readProfile(accountId, profileId);

			if (!profileData) {
				profileData = Profile.readProfileTemplate(profileId);

				if (!profileData) {
					NeoLog.Error("Failed to read profile template");
					throw next(new ApiException(errors.com.epicgames.modules.profiles.operation_forbidden).with(profileId));
				}

				profileData.created = profileData.updated = new Date().toISOString();
				profileData['_id'] = accountId;
				profileData.accountId = accountId;

				//creating profile if it doesn't exist
				try {
					fs.mkdirSync(`./profile/${accountId}/profiles`, { recursive: true });
					Profile.saveProfile(accountId, profileId, profileData);
					NeoLog.Log(`Created ${profileId} profile for ${accountId}`);
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
		getOrCreateProfile("athena")
		var command = req.params.command;
		var profileId = req.query.profileId || "common_core";
		const { profileData, response } = getOrCreateProfile(profileId);
		const { profileChanges } = response;
		//const checkValidProfileID = (...validProfileIds) => checkValidProfileID0(command, profileId, next, ...validProfileIds); //not sure if ill need it but ill keep it just incase

		switch(command){

			case "CopyCosmeticLoadout": {
				//sourceIndex = 0 (Save)
				//sourceIndex > 0 (Load)
				let item;

				if (req.body.sourceIndex === 0) {
					const last_applied_loadout = profileData.stats.attributes["last_applied_loadout"]
					item = profileData.items[`neoset${req.body.targetIndex}_loadout`];
					profileData.items[`neoset${req.body.targetIndex}_loadout`] = profileData.items[last_applied_loadout];
					profileData.items[`neoset${req.body.targetIndex}_loadout`].attributes["locker_name"] = req.body.optNewNameForTarget;
					profileData.stats.attributes.loadouts[req.body.targetIndex] = `neoset${req.body.targetIndex}_loadout`;
				} else {
					item = profileData.items[`neoset${req.body.sourceIndex}_loadout`];

					if (!item) {
						throw next(new ApiException(errors.com.epicgames.fortnite.item_not_found).withMessage("Locker item {0} not found", req.body.lockerItem));
					}

					profileData.stats.attributes["active_loadout_index"] = req.body.sourceIndex;
					profileData.stats.attributes["last_applied_loadout"] = `neoset${req.body.sourceIndex}_loadout`;
					profileData.items["sandbox_loadout"].attributes["locker_slots_data"] = item.attributes["locker_slots_data"];
				}
				Profile.bumpRvn(profileData);
				response.profileRevision = profileData.rvn || 1;
				response.profileCommandRevision = profileData.commandRevision || 1
				Profile.saveProfile(accountId, profileId, profileData)
				response.profileChanges = [{
					"changeType": "fullProfileUpdate",
					"profile": profileData
				}];
				break;
			}

			case "DeleteCosmeticLoadout": {
				profileData.stats.attributes.loadouts[req.body.index] = "";
				Profile.bumpRvn(profileData);
				response.profileRevision = profileData.rvn || 1;
				response.profileCommandRevision = profileData.commandRevision || 1
				Profile.saveProfile(accountId, profileId, profileData)
				response.profileChanges = [{
					"changeType": "fullProfileUpdate",
					"profile": profileData
				}];
				break;
			}

			case "SetCosmeticLockerName": {
				const item = profileData.items[req.body.lockerItem];

				if (!item) {
					throw next(new ApiException(errors.com.epicgames.fortnite.item_not_found).withMessage("Locker item {0} not found", req.body.lockerItem));
				}

				if (typeof req.body.name === "string" && item.attributes.locker_name !== req.body.name) {
					Profile.changeItemAttribute(profileData, req.body.lockerItem, "locker_name", req.body.name, profileChanges);
				}
				break;
			}

			case "SetRandomCosmeticLoadoutFlag": {
				break;
			}

			case "SetForcedIntroPlayed":{
				//{ forcedIntroName: 'Coconut' }
				response.profileChanges = [{
					"changeType": "fullProfileUpdate",
					"profile": profileData
				}];
				break;
			}

			case "RequestRestedStateIncrease":{
				var xpValue = profileData.stats.attributes["book_xp"] + req.body.restedXpGenAccumulated

				Profile.bumpRvn(profileData);
				response.profileRevision = profileData.rvn || 1;
				response.profileCommandRevision = profileData.commandRevision || 1
				Profile.modifyStat(profileData, "book_xp", xpValue)

				response.profileChanges = [{
					"changeType" : "statModified",
					"name" : "book_xp",
					"value" : xpValue

				}]
				break;
			}

			case "GetMcpTimeForLogin":{
				response.profileChanges = [{
					"changeType": "fullProfileUpdate",
					"profile": profileData
				}];
				break
			}

			case "IncrementNamedCounterStat":{
				break
			}

			case "ClientQuestLogin": {
				response.profileChanges = [{
					"changeType": "fullProfileUpdate",
					"profile": profileData
				}]
				break;
			}

			case "QuestLogin":{
				break;
			}

			case "AthenaPinQuest":{
				Profile.modifyStat(athenprofile, "pinned_quest", req.body.pinnedQuest)
				Profile.bumpRvn(profileData);
				response.profileRevision = profileData.rvn || 1;
				response.profileCommandRevision = profileData.commandRevision || 1
				response.profileChanges = [{
					"changeType" : "statModified",
					"name" : "pinned_quest",
					"value" : req.body.pinnedQuest

				}]
				break;
			}

			case "MarkNewQuestNotificationSent":{
				break;
			}

			case "MarkItemSeen": {
				req.body.itemIds.forEach(itemId => Profile.changeItemAttribute(profileData, itemId, "item_seen", true, profileChanges));
				break;
			}

			case "PopulatePrerolledOffers": {
				break;
			}

			case "PurchaseCatalogEntry": {
				const commoncore = Profile.readProfile(accountId, "common_core");
				let shop
				if (version >= 30.10) {
					shop = loadJSON("../responses/catalog/shopv3.json");
				} 
				else if (version >= 26.30) {
					shop = loadJSON("../responses/catalog/shopv2.json");
				} 
				else {
					shop = loadJSON("../responses/catalog/shopv1.json");
				}
				
				
				let catalogEntryToPurchase = null;
				for (let storefront of shop.storefronts) {
					/*if (!storefront.name.startsWith("BR")) {
						throw new Error("Unsupported");
					}*/

					for (catalogEntry of storefront.catalogEntries) {
						if (catalogEntry.offerId === req.body.offerId) {
							catalogEntryToPurchase = catalogEntry;
						}
					}
				}
				

				if (catalogEntryToPurchase == null) {
					throw next(new ApiException(errors.com.epicgames.modules.gamesubcatalog.catalog_out_of_date).with(req.body.offerId));
				}

				let grantToProfileId = "athena";
				const grantProfile = getOrCreateProfile(grantToProfileId);
				const lootResult = [];

				for (itemGrant of catalogEntryToPurchase.itemGrants) {
					lootResult.push({
						"itemType": itemGrant.templateId,
						"itemGuid": itemGrant.templateId,
						"itemProfile": grantToProfileId,
						"quantity": itemGrant.quantity
					});
				}
				
				commoncore.stats.attributes["mtx_purchase_history"] = {
					"refundsUsed" : 0,
					"refundCredits" : 3,
					"tokenRefreshReferenceTime" : "2023-10-12T00:00:00.000Z",
					"purchases" : [ {
						"purchaseId" : "cc8442a6-77b0-45c7-9c14-6dca6d5cfefe",
						"offerId" : "v2:/b0ddecc601a1d316ed24a6fbce4297d931599dfcb16fc9c4bd9ef646f0a3a843",
						"purchaseDate" : new Date().toISOString(),
						"undoTimeout" : "9999-11-01T17:50:35.861Z",
						"freeRefundEligible" : true,
						"fulfillments" : [ ],
						"lootResult" : [ {
							"itemType" : catalogEntryToPurchase.itemGrants.templateId,
                  			"itemGuid" : catalogEntryToPurchase.itemGrants.templateId,
                  			"itemProfile" : catalogEntryToPurchase.itemGrants.itemProfile,
                  			"quantity" : catalogEntryToPurchase.itemGrants.quantity
						}
						],
						"totalMtxPaid" : req.body["expectedTotalPrice"],
						"metadata" : {},
						"gameContext" : ""
					}]
				}
				Profile.saveProfile(accountId, "common_core", commoncore)


				// add creation_time because kyiro had a heartattack when it wasnt their
				for (lootResultEntry of lootResult) {
					Profile.addItem(grantProfile.profileData, lootResultEntry.itemGuid, {
						templateId: lootResultEntry.itemType,
						attributes: {
							"max_level_bonus": 0,
							"level": 1,
							"item_seen": false,
							"xp": 0,
							"variants": [],
							"creation_time": new Date().toISOString(),
							"favorite": false
						},
						quantity: lootResultEntry.quantity
					}, grantProfile.response.profileChanges);
				}

				response.notifications = [
					{
						"type": "CatalogPurchase",
						"primary": true,
						"lootResult": {
							"items": lootResult
						}
					}
				];

				if (grantProfile.response.profileChanges.length > 0) {
					Profile.bumpRvn(grantProfile.profileData);
					response.profileRevision = grantProfile.profileData.rvn || 1;
					response.profileCommandRevision = grantProfile.profileData.commandRevision || 1;
					Profile.saveProfile(accountId, grantToProfileId, grantProfile.profileData);
				}
				var athenaProfile = getOrCreateProfile("athena");

				athenaProfile.response.profileChanges = [
					{
						changeType: "fullProfileUpdate",
						profile: athenaProfile.profileData
					}
				]

				response.multiUpdate = [athenaProfile.response]
				break;
			}

			case "BulkEquipBattleRoyaleCustomization":{
				break;
			}

			case "RefreshExpeditions": {
				response.profileChanges = [{
					"changeType": "fullProfileUpdate",
					"profile": profileData
				}];
				break;
			}

			case "SetItemArchivedStatusBatch": {
				req.body.itemIds.forEach(itemId => {
					if (typeof itemId === "string" && typeof req.body.archived === "boolean") {
						Profile.changeItemAttribute(profileData, itemId, "archived", req.body.archived, profileChanges);
					}
				});
				Profile.bumpRvn(athenprofile)

				break;
			}

			case "ClaimMfaEnabled": {
				profileData.stats.attributes["mfa_reward_claimed"] = true;
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
				getOrCreateProfile(`${profileId}`)
				if(profileId === "athena"){
					stats(accountId, athenprofile, config, versionGlobal)
					if(versionGlobal >= 33){seasonPass(accountId, athenprofile, versionGlobal)}
					if(version === 33.11 || version === 23.10 || version === 19.01 || version === 11.31){winterFest(accountId, athenprofile)}
					for(const [questId, quest] of Object.entries(miniPassData))
					{
						Profile.addItem(athenprofile, questId, quest)
					}
					if(version >= 28.00){MPLockerLoadout(accountId, athenprofile)}
					if(version <= 10.40 || VersionFilter.includes(versionGlobal)){CH1Fix(accountId, athenprofile)}
					Profile.bumpRvn(profileId)
				}
				response.profileChanges = [
					{
						"changeType": "fullProfileUpdate",
						"profile": profileData
					}
				];
				break;
			}

			//had to be slighly redone to have a check if there is actually a giftbox or not mainly due to the fact on 11.31(maybe more i didnt test) it will just constantly spam RemoveGiftBox
			case "RemoveGiftBox": {
				if (req.body.giftBoxItemIds) {
					req.body.giftBoxItemIds.forEach(item => {
						!profileData.items[item]
							? response.profileChanges = [{
								changeType: "fullProfileUpdate",
								profile: profileData
							}]
						: Profile.removeItem(profileData, item, profileChanges);
					});
				}
				if (req.body.giftBoxItemId) {
					!profileData.items[req.body.giftBoxItemId]
						? response.profileChanges = [{
							changeType: "fullProfileUpdate",
							profile: profileData
						}]
					: Profile.removeItem(profileData, profileData.items[req.body.giftBoxItemId]);
				}
				Profile.bumpRvn(profileData);
				response.profileRevision = profileData.rvn || 1;
				response.profileCommandRevision = profileData.commandRevision || 1;
				Profile.saveProfile(accountId, profileId, profileData)
				break;
			}

			case "SetAffiliateName": {
				profileData.stats.attributes["mtx_affiliate"] = req.body.affiliateName
				profileData.stats.attributes["mtx_affiliate_set_time"] = new Date().toISOString()
				response.profileChanges = [
					{
						"changeType" : "statModified",
						"name" : "mtx_affiliate",
						"value" : req.body.affiliateName

					},
					{
						"changeType" : "statModified",
						"name" : "mtx_affiliate_set_time",
						"value" : new Date().toISOString()
					}
				]
				Profile.bumpRvn(profileData);
				response.profileRevision = profileData.rvn || 1;
				response.profileCommandRevision = profileData.commandRevision || 1
				Profile.saveProfile(accountId, "common_core", profileData)		
				
				break;
			}
				
			case "SetCosmeticLockerBanner": {
				const item = profileData.items[req.body.lockerItem];

				if (!item) {
					throw next(new ApiException(errors.com.epicgames.fortnite.item_not_found).withMessage("Locker item {0} not found", req.body.lockerItem));
				}

				if (typeof req.body.bannerIconTemplateName === "string" && item.attributes.banner_icon_template !== req.body.bannerIconTemplateName) {
					Profile.changeItemAttribute(profileData, req.body.lockerItem, "banner_icon_template", req.body.bannerIconTemplateName, profileChanges);
				}

				if (typeof req.body.bannerColorTemplateName === "string" && item.attributes.banner_color_template !== req.body.bannerColorTemplateName) {
					Profile.changeItemAttribute(profileData, req.body.lockerItem, "banner_color_template", req.body.bannerColorTemplateName, profileChanges);
				}

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
			
				if (req.body.variantUpdates.length !== 0) {
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

			case "SetCosmeticLockerSlots": {
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
						var bIsDance = req.body.slotName === "Dance";
						statName = bIsDance ? "favorite_dance" : "favorite_itemwraps";
						var arr = profileData.stats.attributes[statName] || [];
						if (req.body.indexWithinSlot === -1) {
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
					if (req.body.variantUpdates.length !== 0) {
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

			case "SetItemFavoriteStatus": {
				if (typeof req.body.bFavorite === "boolean" && profileData.items[req.body.targetItemId].attributes.favorite !== req.body.bFavorite) {
					Profile.changeItemAttribute(profileData, req.body.targetItemId, "favorite", req.body.bFavorite, profileChanges);
					Profile.saveProfile(accountId, "athena", profileData)
				}
				break;
			}

			case "SetItemFavoriteStatusBatch": {
				req.body.itemIds.forEach((itemId, index) => {
					profileData.items[itemId].attributes.favorite = req.body.itemFavStatus[index];
					Profile.saveProfile(accountId, "athena", profileData)
					response.profileChanges.push(
						{
							"changeType" : "itemAttrChanged",
							"itemId" : itemId,
							"attributeName" : "favorite",
							"attributeValue" : req.body.itemFavStatus[index]
						}
					)
					
				});
				Profile.bumpRvn(profileData);
				response.profileRevision = profileData.rvn || 1;
				response.profileCommandRevision = profileData.commandRevision || 1;
				break;
			}

			case "SetMtxPlatform": {

				response.profileChanges[0] = {
					changeType: "statModified",
					name: "current_mtx_platform",
					value: req.body.newPlatform || "EpicPC"
				}
				break;
			}

			case "SetReceiveGiftsEnabled": {

				if (typeof req.body.bReceiveGifts === "boolean") {
					Profile.modifyStat(profileData, "allowed_to_receive_gifts", req.body.bReceiveGifts, profileChanges);
				}

				break;
			}

			case "SetLoadoutShuffleEnabled":{
				break;
			}

			case "UnlockRewardNode": {
				const lootList = [];
				const rewards = Array.isArray(winterFestPresents[version][req.body.nodeId]) 
				? winterFestPresents[version][req.body.nodeId]
				: [winterFestPresents[version][req.body.nodeId]]
			
				rewards.forEach(cosmetic => {
					response.profileChanges.push({
						changeType: "itemAdded",
						itemId: cosmetic,
						item: {
							templateId: cosmetic,
							attributes: {
								creation_time: new Date().toISOString(),
								level: 1
							},
							quantity: 1
						}
					});

					lootList.push({
						itemType: cosmetic,
						itemGuid: cosmetic,
						itemProfile: "athena",
						quantity: 1
					});
					cosmetic.includes("HomebaseBannerIcon")
					? (Profile.addItem(commoncore, cosmetic, {
							templateId: cosmetic,
							attributes: { item_seen: true },
							quantity: 1
						}),
						Profile.saveProfile(accountId, "common_core", commoncore))
						
					: Profile.addItem(profileData, cosmetic, {
						templateId: cosmetic,
						attributes: {
							max_level_bonus: 0,
							level: 1,
							item_seen: false,
							xp: 0,
							variants: [],
							creation_time: new Date().toISOString(),
							favorite: false
						},
						quantity: 1
					});
				});
				response.profileChanges.push({
					changeType: "itemAdded",
					itemId: uuidv4(),
					item: {
						templateId: "GiftBox:gb_winterfestreward",
						attributes: {
							lootList,
							level: 1,
							giftedOn: new Date().toISOString(),
							params: {
								SubGame: "Athena",
								winterfestGift: "true"
							}
						},
						quantity: 1
					}
				});
				Profile.bumpRvn(profileData);
				response.profileRevision = profileData.rvn || 1;
				response.profileCommandRevision = profileData.commandRevision || 1;
				Profile.saveProfile(accountId, profileId, profileData);
				break;
			}
			
			
			case "ExchangeGameCurrencyForBattlePassOffer":{
				break;
			}

			case "ExchangeGameCurrencyForSeasonPassOffer":{
				break;
			}

			case "RefundMtxPurchase": {
				response.profileChanges[0] = {
					"changeType": "itemAdded",
					"itemId": uuidv4(),
					"item": {
						"templateId": "Currency:MtxComplimentary",
						"attributes": {
							"platform": "Shared"
						},
						"quantity": 1500
					}
				}
				break;
			}

			default: {
				return next(new ApiException(errors.com.epicgames.fortnite.operation_not_found).with(req.params.command));
			}
		}
		res.json(response)

	}
}
        