const crypto = require('crypto');
const {ApiException} = require('../../structs/errors');
const errors = require("../../structs/errors");
const jsonwebtoken = require('jsonwebtoken');
var ini = require('ini')
var fs = require('fs')
const path = require("path");
var config = ini.parse(fs.readFileSync(path.join(__dirname, '../../config.ini'), 'utf-8'));
const {account} = require("../../config/defs")


module.exports = {
    oauthToken: function(req, res){	
		switch (req.body.grant_type) {
			case "password":
				if (!req.body.username) {
					throw new ApiException(errors.com.epicgames.common.oauth.invalid_request).with("username")
				}
				if (req.body.username.includes("@")) {
					account.displayName = req.body.username.split("@")[0]
				} else {
					account.displayName = req.body.username;
				}
            	account.accountId = account.displayName.replace(/ /g, "_");
			break;
			case "exchange_code":
				if (!req.body.exchange_code) {
					throw new ApiException(errors.com.epicgames.common.oauth.invalid_request).with("exchange_code")
				}

				account.displayName = req.body.exchange_code;
				account.accountId = req.body.exchange_code;
            break;
        }
		
		if(config.bEnableOverride == true){
			account.displayName = config.username
			account.accountId = config.username
		}

        let token = jsonwebtoken.sign({
			"app": "prod-fn",
			"sub": account.accountId,
			"mver": false,
			"clid": "ec684b8c687f479fadea3cb2ad83f5c6",
			"dn": account.displayName,
			"am": "authorization_code",
			"pfpid": "prod-fn",
			"p": "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",
			"iai": account.accountId,
			"sec": 1,
			"acr": "urn:epic:loa:aal1",
			"clsvc": "prod-fn",
			"t": "s",
			"scope": "basic_profile",
			"auth_time": 1725882476,
			"ic": true,
			"exp": 2147483647,
			"iat": 1725882476,
			"jti": "132fac2cc9c94fa08fdc3e65fef24f07"
		  },"PS256",  {keyid:""})		  
		res.json({
			"access_token": `eg1~${token}`,
			"expires_in": 2147483647,
			"expires_at": "9999-12-31T23:59:59.999Z",
			"token_type": "bearer",
			"refresh_token": `eg1~${token}`,
			"refresh_expires": 2147483647,
			"refresh_expires_at": "9999-12-31T23:59:59.999Z",
			"account_id": account.accountId,
			"client_id": "ec684b8c687f479fadea3cb2ad83f5c6",
			"internal_client": true,
			"client_service": "prod-fn",
			"scope": [
			  "basic_profile",
			  "friends_list",
			  "openid",
			  "presence"
			],
			"displayName": account.displayName,
			"app": "prod-fn",
			"in_app_id": account.accountId,
			"product_id": "prod-fn",
			"application_id": "fghi4567FNFBKFz3E4TROb0bmPS8h1GW",
			"acr": "urn:epic:loa:aal1",
			"auth_time": "1999-01-12T00:20:15.542Z"
		}).status(200).end();
    },

    verifyToken: function(req, res){
        const JWT = req.headers.authorization.replace("bearer eg1~", "")
		const JWTdecode = jsonwebtoken.decode(JWT)
		res.json({
			"token": req.headers.authorization,
			"session_id": `${crypto.randomBytes(32).toString("hex")}`,
			"token_type": "bearer",
			"client_id": "ec684b8c687f479fadea3cb2ad83f5c6",
			"internal_client": true,
			"client_service": "prod-fn",
			"account_id": JWTdecode["sub"],
			"expires_in": 2147483647,
			"expires_at": "9999-12-31T23:59:59.999Z",
			"auth_method": "authorization_code",
			"display_name": JWTdecode["sub"],
			"app": "prod-fn",
			"in_app_id": JWTdecode["sub"],
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
		}).status(200).end()
	},

    killToken: function(req, res){
        res.status(204).end();
    },

    accountInfo: function(req, res){
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
			"externalAuths": {},

		})
    },

    displayName: function(req, res){
        res.json({
			"id": req.params.displayName,
			"displayName": req.params.displayName,
			"externalAuths": {}
		});
    },

	discoveryToken: function(req, res){
		const useragent = req.headers["user-agent"];
		const regex = useragent.match(/\+\+Fortnite\+Release-\d+\.\d+/);
		res.json({
			"branchName" : regex[0],
			"appId" : "Fortnite",
			"token" : `${crypto.randomBytes(10).toString("hex")}=`
		})
	},

	publicAccount: function(req, res){
		res.json([{
			id: req.query.accountId,
			displayName: req.query.accountId,
			externalAuths: {}
		}])	
	},
	
	externalAuths: function(req, res){
		res.json([])
	},

	tokenInfo: function(req, res){
		const base64 = req.headers.authorization.replace("Basic ", "")
		const decodedString = atob(base64);
		const [username, password] = decodedString.split(':')
		res.json({
			"active": true,
			"scope": "basic_profile openid offline_access",
			"token_type": "bearer",
			"expires_in": 2147483647,
			"expires_at": "9999-12-31T23:59:59.999Z",
			"account_id": account.accountId,
			"client_id": password,
			"application_id": "fghi45672f0QV6b6B1KntLd7JR7RFLWc"
		  })


	},

	publicKey: function(req, res){
		let jwt = jsonwebtoken.sign({
			"account_id": account.accountId,
			"generated": 1731795408,
			"key_guid": "2e57bba7-4a7a-423c-b4b4-853acfcf019c",
			"kid": "20230621",
			"key": req.body.key,
			"expiration": "9999-12-31T23:59:59.999Z",
			"type": "legacy"
		},"EdDSA",  {keyid:"20230621"})
		res.json({
			"key": req.body.key,
			"account_id": account.accountId,
			"key_guid": "2e57bba7-4a7a-423c-b4b4-853acfcf019c",
			"kid": "20230621",
			"expiration": "9999-12-31T23:59:59.999Z",
			"jwt": jwt,
			"type": "legacy"
		})
		
	}
}