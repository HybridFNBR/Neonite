const axios = require('axios').default;
const path = require('path');
const fs = require('fs');
const jwt = require("jsonwebtoken");
const { setTimeout } = require('timers');
const errors = require('./../structs/errors');
const { ErrDef, ApiException, com } = require('./../structs/errors');
var builder = require('xmlbuilder');
const Express = require('express');

Date.prototype.addHours = function (h) {
	this.setTime(this.getTime() + (h * 60 * 60 * 1000));
	return this;
}

Array.prototype.shuffle = function () {
	var a = this;
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}

/**
 * 
 * @param {Express.Application} app 
 */
module.exports = (app) => {
	//lightswitch
	app.get('/lightswitch/api/service/bulk/status', (req, res) => {
		//adds serviceId based on what the game feeds it, if undefined defaults to fortnite
		const serviceId = req.query.serviceId ? req.query.serviceId.toLowerCase() : "fortnite";
		res.json([
			{
				"serviceInstanceId": serviceId,
				"status": "UP",
				"message": "Hi",
				"maintenanceUri": "https://dsc.gg/neonite",
				"allowedActions": [],
				"banned": false,
				"launcherInfoDTO": {
					"appName": "Fortnite",
					"catalogItemId": "4fe75bbc5a674f4f9b356b5c90567da5",
					"namespace": "fn"
				}
			}
		]);
	});
	

	app.get("/lightswitch/api/service/:serviceId/status", (req, res) => {
		const serviceId = req.params.serviceId.toLowerCase();
		res.json({
			"serviceInstanceId": serviceId,
			"status": "UP",
			"message": "Hello",
			"maintenanceUri": "https://dsc.gg/neonite",
			"allowedActions": [],
			"banned": false,
			"launcherInfoDTO": {
				"appName": "Fortnite",
				"catalogItemId": "4fe75bbc5a674f4f9b356b5c90567da5",
				"namespace": "fn"
			}
		})
	})

	//external auth
	app.get("/launcher/api/public/assets/:platform/:catalogItemId/:appName", async (req, res) => {
		res.json({
			"appName": req.params.appName,
			"labelName": `${req.query.label}-${req.params.platform}`,
			"buildVersion": `NEONITE`,
			"catalogItemId": req.params.catalogItemId,
			"expires": "9999-12-31T23:59:59.999Z",
			"items": {
				"MANIFEST": {
					"signature": "NEONITE",
					"distribution": "https://127.0.0.0:5595/Builds/Fortnite/Content/CloudDir/",
					"path": `Neonite.manifest`,
					"additionalDistributions": []
				}
			},
			"assetId": req.params.appName
		})
	})

	app.get("/launcher/api/public/distributionpoints/", (req, res) => {
			res.json({
				"distributions": [
					"https://epicgames-download1.akamaized.net/Builds/Fortnite/Content/CloudDir/",
					"https://download.epicgames.com/Builds/Fortnite/Content/CloudDir/",
					"https://127.0.0.0:5595/Builds/Fortnite/Content/CloudDir/"
				]
			});
		});

		app.get('/Builds/Fortnite/Content/CloudDir/*.manifest', (req, res) => {
			res.setHeader("content-type", "application/octet-stream")
			res.sendFile(path.join(__dirname, '../LauncherAssets/Neonite.manifest'));
		});
	
		app.get('/Builds/Fortnite/Content/CloudDir/*.ini', (req, res) => {
			res.setHeader("content-type", "application/octet-stream")
			res.sendFile(path.join(__dirname, '../LauncherAssets/Full.ini'));
		});
	
		app.get('/Builds/Fortnite/Content/CloudDir/*.chunk', (req, res) => {
			res.setHeader("content-type", "application/octet-stream")
			res.sendFile(path.join(__dirname, '../LauncherAssets/Neonite.chunk'));
		});



	app.get('/api/v1/assets/Fortnite/:version/', (req, res) => {
		res.json([])
	});

	app.get("/fortnite/api/game/v2/world/info", (req, res) => res.json({}))

	app.get("/api/v1/events/:game/download/:accountId", (req, res) => {
		res.json({
			"player": {
				"gameId": req.params.game,
				"accountId": req.params.accountId,
				"tokens": [],
				"teams": {},
				"pendingPayouts": [],
				"pendingPenalties": {},
				"persistentScores": {},
				"groupIdentity": {}
			},
			"events": [],
			"templates": [],
			"scores": []
		})
	})


	app.get("/catalog/api/shared/bulk/offers", (req, res) => { res.json({}) })


	//version check
	app.get('/fortnite/api/v2/versioncheck*', (req, res) => {
		res.json({ "type": "NO_UPDATE" })
	});

	//privacy
	app.get('/fortnite/api/game/v2/privacy/account/:accountId', (req, res) => {
		res.json({
			"accountId": req.params.accountId,
			"optOutOfPublicLeaderboards": false
		})
	});

	app.post('/api/v1/assets/Fortnite/:version/:netcl', (req, res) => {
		res.json(require("../discovery/FrontEndAssets.json"))//you can add more to the file but at the moment its only being used for discovery.
	});

	//itemshop
	app.get('/fortnite/api/storefront/v2/catalog', function (req, res) {
		res.json(require("../shop.json"));
	});

	//grant access
	app.post('/fortnite/api/game/v2/grant_access/:accountId', (req, res) => {
		res.status(204).end();
	});

	//enabled features
	app.get('/fortnite/api/game/v2/enabled_features', (req, res) => {
		res.json([])
	});


	//datarouter
	app.post('/datarouter/api/v1/public/*', (req, res) => {
		res.status(204).end();
	});

	//presence ?
	app.get('/presence/api/v1/_/:accountId/settings/subscriptions', (req, res) => { res.status(204).end(); });


	app.get('/socialban/api/public/v1/:accountId', (req, res) => {
		res.json({
			"bans": [],
        	"warnings": []
		})
	});

	//sac
	app.get('/affiliate/api/public/affiliates/slug/:affiliateName', (req, res) => {
		if (req.params.affiliateName != "Neonite") {
			throw new ApiException(errors.com.epicgames.ecommerce.affiliate.not_found).with(req.params.affiliateName);
		}
		res.json({
			id: "aabbccddeeff11223344556677889900",
			slug: req.params.affiliateName,
			displayName: req.params.affiliateName,
			status: "ACTIVE",
			verified: true
		})
	});

	app.get('/content-controls/:accountId', (req, res) => {
			res.json({
			'data': {
				'ageGate': 0,
				'controlsEnabled': false,
				'maxEpicProfilePrivacy': 'none',
				'principalId': req.params.accountId
			}
		})
	});

	// ?
	app.post("/fortnite/api/game/v2/profileToken/verify/*", (req, res) => { res.status(204).end() })

	//keychain
	app.get('/fortnite/api/storefront/v2/keychain', (req, res) => {
		res.json(require("../keychain.json"));
	})


};
