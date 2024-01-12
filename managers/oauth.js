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
				"sub": accountId,
				"p": "eNqtk8lOAzEMht+nQkhlO1iaA0tBnEBC4joyiWdqNeNUiVPo2+NhGShLBxCnbF7+/0vSxKTCSuBCLD5rTNgS5HVW6uCcUEsif5kDij/Y5aexmh7tND9P2x9NK5kSuCgNt9Xe9tK3i5lnPSPPDpX8DaUVpQvsaJeFR4XdLq4DrrdkY9NwYDuDZbkL7GDYGBE2pvtfFc+kZRnyAxZxcyPo472EiB4CrwgmJilHxxhACbsMkqGR6mjHCmGILeQ52h1BbBpK2YI/15nA+Yu20yhKoieFg+9j0blYRAdKz8tq+isImzZeS0YsOgd60Pppck+tsYKEHOpMOXOUWtktSKvD7d16AFQCakK3YBkM2w5lxTYRdebps5u2YPKMks3P10Z7eZQEw7FJvJKwtsgPWCfv6r6M2YB2pOgtEubLun/2Nft6maL/07vfBPiLLzl99yVNxIodsRgTcfQNtAHX3doa97cwpniz495bx0dUELK5",
				"dn": accountId,
				"clsvc": "prod-fn",
				"t": "s",
				"mver": false,
				"clid": "ec684b8c687f479fadea3cb2ad83f5c6",
				"ic": true,
				"exp": 2147483647,
				"am": "client_credentials",
				"iat": 1705018783,
				"jti": "c01f29504dcd42f9b68cf55759392928",
				"pfpid": "prod-fn"
			  }, "PS256", {keyid:""})		  
			res.json({
				"access_token": `eg1~${token}`,
				"displayName": displayName,
				"account_id": accountId,
				"expires_in": 2147483647,
				"expires_at": "9999-12-31T23:59:59.999Z",
				"token_type": "bearer",
				"refresh_token":`eg1~${token}`,
				"client_id": "ec684b8c687f479fadea3cb2ad83f5c6",
				"internal_client": true,
				"client_service": "prod-fn",
				"product_id": "prod-fn",
				"application_id": "fghi4567FNFBKFz3E4TROb0bmPS8h1GW"
			})
			res.status(200);
		})
	
	//verify token
	app.get('/account/api/oauth/verify', (req, res) => {
		const JWT = req.headers.authorization.replace("bearer eg1~", "")
		const JWTdecode = jsonwebtoken.decode(JWT)
		res.json({
			"token": req.headers.authorization,
			"session_id": "NEONITESESSION",
			"token_type": "bearer",
			"client_id": "ec684b8c687f479fadea3cb2ad83f5c6",
			"internal_client": true,
			"client_service": "prod-fn",
			"account_id": JWTdecode["sub"],
			"expires_in": 2147483647,
			"expires_at": "9999-12-31T23:59:59.999Z",
			"auth_method": "exchange_code",
			"display_name": JWTdecode["sub"],
			"app": "prod-fn",
			"in_app_id": "e7c388664e5442e89f30b396d9fa7183",
			"device_id": "89776e294d5c27ba1ef4e59fab402ea7",
			"scope": [
			  "basic_profile",
			  "friends_list",
			  "openid",
			  "presence"
			],
			"product_id": "prod-fn",
			"sandbox_id": "fn",
			"deployment_id": "62a9473a2dca46b29ccf17577fcf42d7",
			"application_id": "fghi4567FNFBKFz3E4TROb0bmPS8h1GW",
			"acr": "urn:epic:loa:aal1",
			"auth_time": "1999-01-12T00:20:15.542Z"
		  })
		res.status(200);
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