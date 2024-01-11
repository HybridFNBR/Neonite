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
			let token = jsonwebtoken.sign({
				"app": "prod-fn",
				"sub": accountId,
				"dvid": "89776e294d5c27ba1ef4e59fab402ea7",
				"mver": false,
				"clid": accountId,
				"dn": displayName,
				"am": "exchange_code",
				"pfpid": "prod-fn",
				"iai": accountId,
				"sec": 1,
				"acr": "urn:epic:loa:aal1",
				"clsvc": "prod-fn",
				"t": "s",
				"auth_time": new Date(new Date().getTime().toString()),
				"ic": true,
				"exp": 1704980387,
				"iat": 1704973187,
				"jti": "6b74350c915342569b5e73cc1645f391"
			  }, "PS256");
			  
			res.json({
				access_token: `eg1~${token}`,
				expires_in: 28800,
				expires_at: "9999-12-31T23:59:59.999Z",
				token_type: "bearer",
				account_id: accountId,
				client_id: "NeoniteV2Client",
				internal_client: true,
				client_service: "fortnite",
				refresh_token: `eg1~${token}`,
				refresh_expires: 115200,
				refresh_expires_at: "9999-12-31T23:59:59.999Z",
				displayName: displayName,
				app: "fortnite",
				in_app_id: accountId,
				device_id: "5dcab5dbe86a7344b061ba57cdb33c4f"
			})
		})
	
	//verify token
	app.get('/account/api/oauth/verify', (req, res) => {
		let refresh_token = jsonwebtoken.sign({
			"sub": "ninja",
			"pfsid": "fn",
			"iss": "https://api.epicgames.dev/epic/oauth/v1",
			"dn": "ninja",
			"pfpid": "prod-fn",
			"aud": "ec684b8c687f479fadea3cb2ad83f5c6",
			"pfdid": "62a9473a2dca46b29ccf17577fcf42d7",
			"t": "epic_id",
			"appid": "fghi4567FNFBKFz3E4TROb0bmPS8h1GW",
			"scope": "basic_profile friends_list openid presence",
			"exp": 9668556939,
			"iat": 1668528139,
			"jti": "5c2585dd6fc1414784a6bc735085b2c2"
		  }, "ciao");
		res.json({
			access_token: req.headers.authorization.replace("bearer ", ""),
			expires_in: 28800,
			expires_at: "9999-12-31T23:59:59.999Z",
			token_type: "bearer",
			refresh_token: refresh_token,
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
		})
	});

	//kill token
	app.delete('/account/api/oauth/sessions/kill/:token', (req, res) => {
		res.status(204).end();
	});

	app.delete('/account/api/oauth/sessions/kill', (req, res) => {
		res.status(204).end();
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