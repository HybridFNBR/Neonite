const Profile = require("../../profile");
const errors = require("../../structs/errors");
const { ApiException } = errors;
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require('path');
var ini = require('ini')
const { getVersionInfo, MPLockerLoadout, simpleProfile, CH1Fix, VersionFilter, loadJSON, MiniPass} = require("../../config/defs")

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
		//var grantitems = getOrCreateProfile("athena")
		var command = req.params.command;
		var profileId = req.query.profileId || "common_core";
		const { profileData, response } = getOrCreateProfile(profileId);
		const { profileChanges } = response;
		const checkValidProfileID = (...validProfileIds) => checkValidProfileID0(command, profileId, next, ...validProfileIds);

		switch (command) {

			// Presets by iDrDoge
			case "CopyCosmeticLoadout": {
				//sourceIndex = 0 (Save)
				//sourceIndex > 0 (Load)
				checkValidProfileID("athena");
				let item;

				if (req.body.sourceIndex == 0) {
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

				Profile.saveProfile(accountId, profileId, profileData);
				Profile.bumpRvn(profileData);
				response.profileRevision = profileData.rvn || 1;
				response.profileCommandRevision = profileData.commandRevision || 1;
				response.profileChanges = [{
					"changeType": "fullProfileUpdate",
					"profile": profileData
				}];
				Profile.saveProfile(accountId, profileId, profileData);
				break;
			}
			case "DeleteCosmeticLoadout": {
				checkValidProfileID("athena");
				profileData.stats.attributes.loadouts[req.body.index] = "";
				Profile.saveProfile(accountId, profileId, profileData);
				Profile.bumpRvn(profileData);
				response.profileRevision = profileData.rvn || 1;
				response.profileCommandRevision = profileData.commandRevision || 1;
				response.profileChanges = [{
					"changeType": "fullProfileUpdate",
					"profile": profileData
				}];
				Profile.saveProfile(accountId, profileId, profileData);
				break;
			}
			case "SetCosmeticLockerName": {
				checkValidProfileID("athena");
				const item = profileData.items[req.body.lockerItem];

				if (!item) {
					throw next(new ApiException(errors.com.epicgames.fortnite.item_not_found).withMessage("Locker item {0} not found", req.body.lockerItem));
				}

				if (typeof req.body.name === "string" && item.attributes.locker_name != req.body.name) {
					Profile.changeItemAttribute(profileData, req.body.lockerItem, "locker_name", req.body.name, profileChanges);
				}
				break;
			}
			case "SetRandomCosmeticLoadoutFlag": {
				checkValidProfileID("athena");
				break;
			}

			case "RequestRestedStateIncrease":{
				var xpValue = profileData.stats.attributes["book_xp"] + req.body.restedXpGenAccumulated
				Profile.modifyStat(athenprofile, "book_xp", xpValue)
				Profile.bumpRvn(profileData)
				console.log(req.body)
				break;
			}

			case "GetMcpTimeForLogin":{
				break
			}

			case "IncrementNamedCounterStat":{
				break
			}

			case "ClaimMfaEnabled": {
				profileData.stats.attributes["mfa_reward_claimed"] = true;
				profileData.commandRevision++;
				profileData.rvn++;
				response.profileChanges = [{
					"changeType": "fullProfileUpdate",
					"profile": profileData
				}];
				break;
			}

			case "RedeemRealMoneyPurchases": {
				break;
			}

			case "SetHardcoreModifier": {
				break;
			}

			case "ClientQuestLogin": {
				break;
			}

			case "QuestLogin":{
				break;
			}

			case "AthenaPinQuest":{
				Profile.modifyStat(athenprofile, "pinned_quest", req.body.pinnedQuest)
				Profile.saveProfile(accountId, "athena", athenprofile)
				Profile.bumpRvn("athena")
				break;
			}

			case "MarkNewQuestNotificationSent":{
				break;
			}

			case "MarkItemSeen": {
				checkValidProfileID("common_core", "campaign", "athena");
				req.body.itemIds.forEach(itemId => Profile.changeItemAttribute(profileData, itemId, "item_seen", true, profileChanges));
				break;
			}

			case "PopulatePrerolledOffers": {
				checkValidProfileID("campaign");
				break;
			}

			case "PurchaseCatalogEntry": {
				checkValidProfileID("common_core")
				const commoncore = Profile.readProfile(accountId, "common_core");
				const finalValue = commoncore.items["Currency:MtxPurchased"]["quantity"] - req.body["expectedTotalPrice"]
				commoncore.items["Currency:MtxPurchased"] = {
						"attributes": {
						  "platform": "EpicPC"
						},
						"quantity": finalValue,
						"templateId": "Currency:MtxPurchased"
					  
					}
				Profile.saveProfile(accountId, "common_core", commoncore)

				let shop
				if (version >= 30.10) {
					shop = loadJSON("../responses/shopv3.json");
				} 
				else if (version >= 26.30) {
					shop = loadJSON("../responses/shopv2.json");
				} 
				else {
					shop = loadJSON("../responses/shopv1.json");
				}
				
				
				let catalogEntryToPurchase = null;
				for (let storefront of shop.storefronts) {
					/*if (!storefront.name.startsWith("BR")) {
						throw new Error("Unsupported");
					}*/

					for (catalogEntry of storefront.catalogEntries) {
						if (catalogEntry.offerId == req.body.offerId) {
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

				response.multiUpdate = [athenaProfile.response];
				break;
			}
			
			case "BulkEquipBattleRoyaleCustomization":{
				break;
			}

			case "RefreshExpeditions": {
				checkValidProfileID("profile0");
				break;
			}

			case "SetItemArchivedStatusBatch": {
				checkValidProfileID("campaign", "athena");

				req.body.itemIds.forEach(itemId => {
					if (typeof itemId === "string" && typeof req.body.archived === "boolean") {
						Profile.changeItemAttribute(profileData, itemId, "archived", req.body.archived, profileChanges);
					}
				});
				Profile.bumpRvn(athenprofile)

				break;
			}

			case "QueryProfile": {
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
					Profile.bumpRvn(athenprofile);			
				}
				catch{}
			
				if(config.simpleProfile == true){simpleProfile(accountId, athenprofile)}
				if(version >= 28.00){
					if(profileId == "athena"){
						MPLockerLoadout(accountId, athenprofile)
					}
				}
				if(version <= 10.40 || VersionFilter.includes(versionGlobal))
				{
					CH1Fix(accountId, athenprofile)
				}
			}
			break;
			
			case "RemoveGiftBox": {
				checkValidProfileID("common_core", "campaign", "athena");

				profileData.commandRevision = req.query.rvn || -1;
				profileData.rvn = req.query.rvn || -1;

				req.body.giftBoxItemIds.forEach(item => {
					Profile.removeItem(profileData, item, profileChanges);
				})

				profileData.commandRevision++;
				profileData.rvn++;
				break;
			}

			case "SetAffiliateName": {
				checkValidProfileID("common_core");
				Profile.modifyStat(profileData, "mtx_affiliate", req.body.affiliateName, profileChanges);
				Profile.modifyStat(profileData, "mtx_affiliate_set_time", new Date().toISOString(), profileChanges);
				break;
			}
				
			case "SetCosmeticLockerBanner": {
				checkValidProfileID("campaign", "athena");
				const item = profileData.items[req.body.lockerItem];

				if (!item) {
					throw next(new ApiException(errors.com.epicgames.fortnite.item_not_found).withMessage("Locker item {0} not found", req.body.lockerItem));
				}

				if (typeof req.body.bannerIconTemplateName === "string" && item.attributes.banner_icon_template != req.body.bannerIconTemplateName) {
					Profile.changeItemAttribute(profileData, req.body.lockerItem, "banner_icon_template", req.body.bannerIconTemplateName, profileChanges);
				}

				if (typeof req.body.bannerColorTemplateName === "string" && item.attributes.banner_color_template != req.body.bannerColorTemplateName) {
					Profile.changeItemAttribute(profileData, req.body.lockerItem, "banner_color_template", req.body.bannerColorTemplateName, profileChanges);
				}

				break;
			}

			case "SetCosmeticLockerSlot": {
				checkValidProfileID("campaign", "athena");
				const item = profileData.items[req.body.lockerItem];

				if (!item) {
					console.error("[Error] Item not found.");
					return;
				}

				const locker_slots_data = item.attributes.locker_slots_data;
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
					Profile.changeItemAttribute(profileData, req.body.lockerItem, "locker_slots_data", locker_slots_data, profileChanges);
				}

				break;
			}

			case "SetCosmeticLockerSlots": {
				break;
				/*const item = profileData.items[req.body.lockerItem];

				if (!item) {
					throw next(new ApiException(errors.com.epicgames.fortnite.item_not_found).withMessage("Locker item {0} not found", req.body.lockerItem));
				}

				const locker_slots_data = item.attributes.locker_slots_data;
				let lockerSlot = locker_slots_data.slots[req.body.category];

				var expectedCapacity;
				switch (req.body.category) {
					case "Dance":
						expectedCapacity = 6;
						break;
					case "ItemWrap":
						expectedCapacity = 7;
						break;
					default:
						expectedCapacity = 1;
						break;
				}
				if (!lockerSlot) {
					lockerSlot = locker_slots_data.slots[req.body.category] = {
						items: new Array(expectedCapacity),
						activeVariants: new Array(expectedCapacity)
					};
				}

				const itemsArray = lockerSlot.items;
				let bChanged = false;
				const startIndex = req.body.slotIndex < 0 ? 0 : req.body.slotIndex;
				const endIndex = req.body.slotIndex < 0 ? expectedCapacity : (startIndex + 1);

				for (let index = startIndex; index < endIndex; index++) {
					for (let i = itemsArray.length; i < index; i++) {
						itemsArray.push("");
					}
					if (index === itemsArray.length) {
						itemsArray.push(req.body.itemToSlot);
						bChanged = true;
					} else if (index < itemsArray.length) {
						if (itemsArray[index] != req.body.itemToSlot) {
							itemsArray[index] = req.body.itemToSlot;
							bChanged = true;
						}
					} else {
						console.log("[Error] Unexpected slot index & capacity configuration.");
					}
				}

				if (bChanged) {
					Profile.changeItemAttribute(profileData, req.body.lockerItem, "locker_slots_data", locker_slots_data, profileChanges);
				}
				break;*/
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
						response.profileChanges[0] = [{
							changeType: "itemAttrChanged",
							itemId: req.body.itemToSlot,
							attributeName: "variants",
							attributeValue: item.attributes.variants
						}]
						Profile.bumpRvn(athenprofile)
						bChanged = true
					}
				}
				catch{}
				if (statName != null && itemToSlot != null) {
					Profile.modifyStat(profileData, statName, itemToSlot, response.profileChanges);
					Profile.bumpRvn(athenprofile)
				}
				break;
			}

			case "SetItemFavoriteStatus": {
				checkValidProfileID("campaign", "athena");

				if (typeof req.body.bFavorite === "boolean" && profileData.items[req.body.targetItemId].attributes.favorite != req.body.bFavorite) {
					Profile.changeItemAttribute(profileData, req.body.targetItemId, "favorite", req.body.bFavorite, profileChanges);
				}
				break;
			}

			case "SetItemFavoriteStatusBatch": {
				checkValidProfileID("campaign", "athena");

				req.body.itemIds.forEach((itemId, index) => {
					if (typeof itemId === "string" && typeof req.body.itemFavStatus[index] === "boolean") {
						Profile.changeItemAttribute(profileData, itemId, "favorite", req.body.itemFavStatus[index], profileChanges);
					}
				});

				Profile.bumpRvn(profileData);
				response.profileRevision = profileData.rvn || 1;
				response.profileCommandRevision = profileData.commandRevision || 1;
				response.profileChanges = [{
					"changeType": "fullProfileUpdate",
					"profile": profileData
				}];
				break;
			}

			case "SetMtxPlatform": {
				checkValidProfileID("common_core");

				response.profileChanges[0] = {
					changeType: "statModified",
					name: "current_mtx_platform",
					value: req.body.newPlatform || "EpicPC"
				}
				break;
			}

			case "SetReceiveGiftsEnabled": {
				checkValidProfileID("common_core");

				if (typeof req.body.bReceiveGifts === "boolean") {
					Profile.modifyStat(profileData, "allowed_to_receive_gifts", req.body.bReceiveGifts, profileChanges);
				}

				break;
			}

			case "PutModularCosmeticLoadout":{
				const loadoutData = JSON.parse(req.body["loadoutData"]);
				const loadoutTypeMap = {
					"CosmeticLoadout:LoadoutSchema_Character": "NEONITECHARACTER",
					"CosmeticLoadout:LoadoutSchema_Emotes": "NEONITEEMOTES",
					"CosmeticLoadout:LoadoutSchema_Platform": "NEONITEPLATFORM",
					"CosmeticLoadout:LoadoutSchema_Wraps": "NEONITEWRAPS",
					"CosmeticLoadout:LoadoutSchema_Jam": "NEONITEJAM",
					"CosmeticLoadout:LoadoutSchema_Sparks": "NEONITESPARKS",
					"CosmeticLoadout:LoadoutSchema_Vehicle": "NEONITEVEHICLE",
					"CosmeticLoadout:LoadoutSchema_Vehicle_SUV": "NEONITESUV",
				};
				const loadoutType = req.body["loadoutType"];
				const profileAttribute = loadoutTypeMap[loadoutType];

				if (profileAttribute) {
					Profile.changeItemAttribute(profileData, profileAttribute, "slots", loadoutData.slots, profileChanges);
					Profile.bumpRvn(athenprofile)
				} else {
					NeoLog.Error("Unknown Loadout Type");
				}
				break;
			}

			case "SetLoadoutShuffleEnabled":{
				break;
			}
			
			case "ExchangeGameCurrencyForBattlePassOffer":{
				checkValidProfileID("athena")
				break;
			}

			case "RefundMtxPurchase": {
				checkValidProfileID("common_core");

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

		if (profileChanges.length > 0) {
			Profile.bumpRvn(profileData);
			response.profileRevision = profileData.rvn || 1;
			response.profileCommandRevision = profileData.commandRevision || 1;
			Profile.saveProfile(accountId, profileId, profileData);
		}

		var rvn = req.query.rvn || -1;

		if (rvn != response.profileChangesBaseRevision) {
			response.profileChanges = [{
				"changeType": "fullProfileUpdate",
				"profile": profileData
			}];
		}
 
		res.json(response);
	}
}

function checkValidProfileID0(command, sentProfileId, next, ...validProfileIds) {
	if (command && sentProfileId) {
		if (validProfileIds.indexOf(sentProfileId) == -1) {
			throw next(new ApiException(errors.com.epicgames.modules.profiles.invalid_command).with(command, `player:profile_${sentProfileId}`, sentProfileId));
		} else {
			return true;
		}
	}

	return true;
}