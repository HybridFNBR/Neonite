const Profile = require("../../profile");
const errors = require("../../structs/errors");
const { ApiException } = errors;
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require('path');
var ini = require('ini')


Array.prototype.insert = function ( index, item ) {
	this.splice( index, 0, item );
};
const NeoLog = require("../../structs/NeoLog");
var config = ini.parse(fs.readFileSync(path.join(__dirname, '../../config.ini'), 'utf-8'));
const cosmetics = JSON.parse(JSON.stringify(require("../../cosmetics_config.json")));

function getSeasonInfo(req) {
    const userAgent = req.headers['user-agent'];
    const season = userAgent?.split('-')[1];
    const seasonglobal = season?.split('.')[0];
    return { season, seasonglobal };
  }

module.exports = {
    mcp: function(req, res, next){
        res.setHeader("Content-Type", "application/json");
		var accountId = req.params.accountId;
		var athenprofile = Profile.readProfile(accountId, "athena")
		const { season, seasonglobal } = getSeasonInfo(req);
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
					item = profileData.items[`neoset${req.body.targetIndex}_loadout`];
					profileData.items[`neoset${req.body.targetIndex}_loadout`] = profileData.items["sandbox_loadout"];
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
				if(season >= 26.30){
					shop = require("../../responses/shopv2.json");
				}
				else{
					shop = require("../../responses/shopv1.json"); 
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
				const grantDefaultItems = getOrCreateProfile("athena");
				function simpleProfile(){
					try{
						if(config.simpleProfile == true){
							const cosmeticArrays = [
								cosmetics.Characters,
								cosmetics.Emotes,
								cosmetics.BackBlings,
								cosmetics.LoadingScreens,
								cosmetics.WeaponWraps,
								cosmetics.Pickaxes,
								cosmetics.Gliders,
								cosmetics.MusicPacks,
								cosmetics.Contrails
		
							];
						
							cosmeticArrays.forEach(cosmeticArray => {
								cosmeticArray.forEach(cosmeticItem => {
									Profile.addItem(athenprofile, cosmeticItem, {
										attributes: {
											"max_level_bonus": 0,
											"level": 1,
											"item_seen": true,
											"xp": 0,
											"variants": [],
											"favorite": false
										},
										"templateId": cosmeticItem
									});
								});
							})
							Profile.bumpRvn(athenprofile)
							Profile.saveProfile(accountId, "athena", athenprofile)
							grantDefaultItems.response.profileChanges = [
								{
									changeType: "fullProfileUpdate",
									profile: athenprofile
								}
							]
							response.multiUpdate = [grantDefaultItems.response]
						}
					}catch{}
				}
				if(season >= 28.00){
					if(profileId == "athena"){
						const Athena = getOrCreateProfile("athena")
						var characterloadout = athenprofile.items["NEONITECHARACTER"]
						var emoteloadout = athenprofile.items["NEONITEEMOTE"]
						var platformloadout = athenprofile.items["NEONITEPLATFORM"]
						var wrapsloadout = athenprofile.items["NEONITEWRAPS"]
						var jamloadout = athenprofile.items["NEONITEJAM"]
						var sparksloadout = athenprofile.items["NEONITESPARKS"]
						var vehicleloadout = athenprofile.items["NEONITEVEHICLE"]
						if (typeof characterloadout == 'undefined'){
							Profile.addItem(athenprofile, "NEONITECHARACTER", {
								"templateId": "CosmeticLoadout:LoadoutSchema_Character",
								"attributes": {
									"slots": [
										{
										  "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Character",
										  "equipped_item": "AthenaCharacter:cid_001_athena_commando_f_default"
										},
										{
										  "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Backpack"
										},
										{
										  "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Pickaxe",
										  "equipped_item": "AthenaPickaxe:defaultpickaxe"
										},
										{
										  "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Glider",
										  "equipped_item": "AthenaGlider:defaultglider"
										},
										{
										  "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Contrails"
										},
										{
										  "slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Aura"
										}
									]
								},
								"quantity" : 1
							});
						}
						if (typeof emoteloadout == 'undefined'){
							Profile.addItem(athenprofile, "NEONITEEMOTES", {
								"templateId": "CosmeticLoadout:LoadoutSchema_Emotes",
								"attributes": {
									"slots": [
										{
											"slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Emote_0",
											"equipped_item": "AthenaDance:eid_boogiedown"
										},
										{
											"slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Emote_1"
										},
										{
											"slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Emote_2"
										},
										{
											"slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Emote_3"
										},
										{
											"slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Emote_4"
										},
										{
											"slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Emote_5"
										}
									]
								},
								"quantity" : 1
							});
						}
						if (typeof platformloadout == 'undefined'){
							Profile.addItem(athenprofile, "NEONITEPLATFORM", {
								"templateId": "CosmeticLoadout:LoadoutSchema_Platform",
								"attributes": {
									"slots": [
										{
										"slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Banner_Icon"
										},
										{
										"slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Banner_Color"
										},
										{
										"slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_LobbyMusic",
										},
										{
										"slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_LoadingScreen"
										}
									]
									},
								"quantity": 1
							});
						}
						if (typeof wrapsloadout == 'undefined'){
							Profile.addItem(athenprofile, "NEONITEWRAPS", {
								"templateId": "CosmeticLoadout:LoadoutSchema_Wraps",
								"attributes": {
									"slots": [
										{
										"slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Wrap_0",
										},
										{
										"slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Wrap_1"
										},
										{
										"slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Wrap_2"
										},
										{
										"slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Wrap_3"
										},
										{
										"slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Wrap_4"
										},
										{
										"slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Wrap_5"
										},
										{
										"slot_template": "CosmeticLoadoutSlotTemplate:LoadoutSlot_Wrap_6"
										}
									]
								},
								"quantity": 1
							});
						}
						if (typeof jamloadout == 'undefined'){
							Profile.addItem(athenprofile, "NEONITEJAM", {
								"templateId": "CosmeticLoadout:LoadoutSchema_Jam",
								"attributes" : {
									"slots" : [ {
									  "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_JamSong0"
									}, {
									  "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_JamSong1"
									}, {
									  "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_JamSong2"
									}, {
									  "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_JamSong3"
									}, {
									  "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_JamSong4"
									}, {
									  "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_JamSong5"
									}, {
									  "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_JamSong6"
									}, {
									  "slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_JamSong7"
									} ]
								  },
								  "quantity" : 1
							});
						}
						if (typeof sparksloadout == 'undefined'){
							Profile.addItem(athenprofile, "NEONITESPARKS", {
								"templateId" : "CosmeticLoadout:LoadoutSchema_Sparks",
								"attributes" : {
									"slots" : [ {
									"slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_Bass"
									}, {
									"slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_Guitar"
									}, {
									"slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_Drum"
									}, {
									"slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_Keyboard"
									}, {
									"slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_Microphone"
									} ]
								},
								"quantity" : 1
							});
						}
						if (typeof vehicleloadout == 'undefined'){
							Profile.addItem(athenprofile, "NEONITEVEHICLE", {
								"templateId" : "CosmeticLoadout:LoadoutSchema_Vehicle",
								"attributes" : {
									"slots" : [ {
										"slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_Vehicle_Body"
									  }, {
										"slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_Vehicle_Booster"
									  }, {
										"slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_Vehicle_DriftSmoke"
									  }, {
										"slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_Vehicle_Wheel"
									  }, {
										"slot_template" : "CosmeticLoadoutSlotTemplate:LoadoutSlot_Vehicle_Skin"
									  } ]
									},
									"quantity" : 1
							});
						}
						Profile.modifyStat(athenprofile, "loadout_presets", {
							"CosmeticLoadout:LoadoutSchema_Character" : {
								"0" : "NEONITECHARACTER",
							},
							"CosmeticLoadout:LoadoutSchema_Emotes" : {
								"0" : "NEONITEEMOTES",
							},
							"CosmeticLoadout:LoadoutSchema_Platform" : {
								"0" : "NEONITEPLATFORM",
							},
							"CosmeticLoadout:LoadoutSchema_Wraps" : {
								"0" : "NEONITEWRAPS",
							},
							"CosmeticLoadout:LoadoutSchema_Jam" : {
								"0" : "NEONITEJAM",
							},
							"CosmeticLoadout:LoadoutSchema_Sparks" : {
								"0" : "NEONITESPARKS",
							},
							"CosmeticLoadout:LoadoutSchema_Vehicle" : {
								"0" : "NEONITEVEHICLE",
							}
						})
						Profile.bumpRvn(athenprofile)
						Profile.saveProfile(accountId, "athena", athenprofile)

					}
				}
				if(season <= 10.40 || season =="Cert" || season == "Live" || season == "3.0.0")
				{
					try{//athena.items does not exist if there is no profile so just try and catch the error until it exists.
						Profile.addItem(athenprofile, "AthenaCharacter:CID_001_Athena_Commando_F_Default", {
							attributes: {
								"max_level_bonus": 0,
								"level": 1,
								"item_seen": true,
								"xp": 0,
								"variants": [],
								"favorite": false
							},
							"templateId": "AthenaCharacter:CID_001_Athena_Commando_F_Default"
							
						})
						Profile.addItem(athenprofile, "AthenaPickaxe:DefaultPickaxe", {
							attributes: {
								"max_level_bonus": 0,
								"level": 1,
								"item_seen": true,
								"xp": 0,
								"variants": [],
								"favorite": false
							},
							"templateId": "AthenaPickaxe:DefaultPickaxe"
							
						})
						Profile.addItem(athenprofile, "AthenaGlider:DefaultGlider", {
							attributes: {
								"max_level_bonus": 0,
								"level": 1,
								"item_seen": true,
								"xp": 0,
								"variants": [],
								"favorite": false
							},
							"templateId": "AthenaGlider:DefaultGlider"
							
						})
						simpleProfile()
						athenprofile.stats["attributes"]["favorite_character"] = "AthenaCharacter:CID_001_Athena_Commando_F_Default"
						athenprofile.stats["attributes"]["favorite_pickaxe"] = "AthenaPickaxe:DefaultPickaxe"
						athenprofile.stats["attributes"]["favorite_glider"] = "AthenaGlider:DefaultGlider"				
						
						Profile.saveProfile(accountId, "athena", athenprofile)
						Profile.bumpRvn(athenprofile)
						grantDefaultItems.response.profileChanges = [
							{
								changeType: "fullProfileUpdate",
								profile: athenprofile
							}
						]
						response.multiUpdate = [grantDefaultItems.response]
					}
					catch{}
					break;
				}
				else{
					simpleProfile()
				}
				break;
			}
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

				// If the slot index is lower than zero, we should iterate over
				// the entire range `[0 ..< expectedCapacity]`, otherwise use a single
				// value range `[slotIndex ..< slotIndex + 1]`.
				const startIndex = req.body.slotIndex < 0 ? 0 : req.body.slotIndex;
				const endIndex = req.body.slotIndex < 0 ? expectedCapacity : (startIndex + 1);

				for (let index = startIndex; index < endIndex; index++) {
					// The inner loop makes sure that missing intermediate elements 
					// will be prefilled, because otherwise it will fail if the request 
					// tries to set at an out of bounds index.
					for (let i = itemsArray.length; i < index; i++) {
						itemsArray.push("");
					}
					// If the index points to the array's last index, then the array
					// isn't big enough yet, so we have to append it.
					if (index === itemsArray.length) {
						itemsArray.push(req.body.itemToSlot);
						bChanged = true;
					} else if (index < itemsArray.length) {
						// Check if the value for a given value has changed at all,
						// otherwise we can skip it.
						if (itemsArray[index] != req.body.itemToSlot) {
							itemsArray[index] = req.body.itemToSlot;
							bChanged = true;
						}
					} else {
						console.log("[Error] Unexpected slot index & capacity configuration.");
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
				const item = profileData.items[req.body.lockerItem];

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
				break;
			}

			case "EquipBattleRoyaleCustomization": {
				let statName, itemToSlot

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
				const parsedData = JSON.parse(req.body["loadoutData"]);
				const loadoutTypeMap = {
					"CosmeticLoadout:LoadoutSchema_Character": "NEONITECHARACTER",
					"CosmeticLoadout:LoadoutSchema_Emotes": "NEONITEEMOTES",
					"CosmeticLoadout:LoadoutSchema_Platform": "NEONITEPLATFORM",
					"CosmeticLoadout:LoadoutSchema_Wraps": "NEONITEWRAPS",
					"CosmeticLoadout:LoadoutSchema_Jam": "NEONITEJAM",
					"CosmeticLoadout:LoadoutSchema_Sparks": "NEONITESPARKS",
					"CosmeticLoadout:LoadoutSchema_Vehicle": "NEONITEVEHICLE",
				};
				const loadoutType = req.body["loadoutType"];
				const profileAttribute = loadoutTypeMap[loadoutType];

				if (profileAttribute) {
					Profile.changeItemAttribute(profileData, profileAttribute, "slots", parsedData.slots, profileChanges);
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