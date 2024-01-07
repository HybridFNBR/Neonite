const crypto = require('crypto');
const {
	ApiException
} = require('../structs/errors');
const errors = require("../structs/errors");
const jsonwebtoken = require('jsonwebtoken');

/**
 * 
 * @param {Express.Application} app 
 */
module.exports = (app) => {
	//token
	app.post('/account/api/oauth/token', (req, res, next) => {
		var displayName = "";
		var accountId = "";
		switch (req.body.grant_type) {
			case "password":
				if (!req.body.username) {
					throw new ApiException(errors.com.epicgames.common.oauth.invalid_request).with("username")
				}
				if (req.body.username.includes("@")) {
					displayName = req.body.username.split("@")[0]
				} else {
					displayName = req.body.username;
				}

				accountId = displayName.replace(/ /g, "_");
				break;

			}
			res.json({
				access_token: crypto.randomBytes(32).toString("hex"),
				expires_in: 28800,
				expires_at: "9999-12-31T23:59:59.999Z",
				token_type: "bearer",
				account_id: accountId,
				client_id: "NeoniteV2Client",
				internal_client: true,
				client_service: "fortnite",
				refresh_token: "NeoniteV2RefreshToken",
				refresh_expires: 115200,
				refresh_expires_at: "9999-12-31T23:59:59.999Z",
				displayName: displayName,
				app: "fortnite",
				in_app_id: accountId,
				device_id: "5dcab5dbe86a7344b061ba57cdb33c4f"
			})
			res.status(200).end();
	})
	
	//verify token
	app.get('/account/api/oauth/verify', (req, res) => {
		let token = req.headers.authorization;
		const response = {
			access_token: token,
			expires_in: 28800,
			expires_at: '9999-12-31T23:59:59.999Z',
			token_type: 'bearer',
			refresh_token: 'NeoniteV2PlaceHolder',
			refresh_expires: 115200,
			refresh_expires_at: "9999-12-31T23:59:59.999Z",
			account_id: "ninja",
			client_id: "NeoniteV2Client",
			internal_client: true,
			client_service: "fortnite",
			displayName: req.h,
			app: "fortnite",
			in_app_id: "ninja",
			device_id: "164fb25bb44e42c5a027977d0d5da800"
		};
		res.json(response)
		res.status(200).end();
	});

	//kill token
	app.delete('/account/api/oauth/sessions/kill/*', (req, res) => {
		res.status(204);
	});

	app.delete('/account/api/oauth/sessions/kill', (req, res) => {
		res.status(204);
	});

	//account info
	app.get('/account/api/public/account/:accountId', (req, res) => {
		res.json({
			id: req.params.accountId,
			displayName: req.params.accountId,
			"email": "neonite@dev.com",
			"failedLoginAttempts": 0,
			"lastLogin": "",
			"numberOfDisplayNameChanges": 1,
			"dateOfBirth": "1999-01-01",
			"ageGroup": "ADULT",
			"headless": false,
			"country": "",
			"phoneNumber": "",
			"company": "Neonite", //neonite is now a company O:
			"preferredLanguage": "en",
			"lastDisplayNameChange": "",
			"canUpdateDisplayName": true,
			"tfaEnabled": true,
			"emailVerified": true,
			"minorVerified": false,
			"minorExpected": false,
			"minorStatus": "NOT_MINOR",
			"cabinedMode": false,
			"hasHashedEmail": false,
			externalAuths: {},

		})
	});

	app.get("/account/api/public/account/displayName/:displayName", (req, res) => {
		res.json({
			"id": req.params.displayName,
			"displayName": req.params.displayName,
			"externalAuths": {}
		})
	})

	app.all("/fortnite/api/discovery/accessToken/:fortniteVersion", (req, res) => {
		const useragent = req.headers["user-agent"];
		const regex = useragent.match(/\+\+Fortnite\+Release-\d+\.\d+/);
		res.json({
			"branchName" : regex[0],
			"appId" : "Fortnite",
			"token" : `${crypto.randomBytes(10).toString("hex")}=`
		  })
	})


	app.get('/account/api/public/account/', (req, res) => {
		res.json([{
			id: req.query.accountId,
			displayName: req.query.accountId,
			externalAuths: {}
		}])			
	});

	// device auth
	app.get('/account/api/public/account/:accountId/deviceAuth', (req, res) => res.json([]));

	app.post('/account/api/public/account/:accountId/deviceAuth', (req, res) => res.json({
		accountId: req.params.accountId,
		deviceId: "null",
		secret: "null"
	}));

	app.get('/account/api/public/account/:accountId/externalAuths', (req, res) => {
		res.json([])
	});

	app.delete('/account/api/public/account/:accountId/deviceAuth/*', (req, res) => res.status(204).end());
}
