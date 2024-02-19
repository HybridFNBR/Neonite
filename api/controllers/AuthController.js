const crypto = require('crypto');
const {
	ApiException
} = require('../../structs/errors');
const errors = require("../../structs/errors");
const jsonwebtoken = require('jsonwebtoken');
const uuid = require('uuid');


module.exports = {
    oauthToken: function(req, res){	
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
			"clid": "3446cd72694c4a4485d81b77adbb2141",
			"ic": true,
			"exp": 2147483647,
			"am": "authorization_code",
			"iat": 1705018783,
			"jti": "c01f29504dcd42f9b68cf55759392928",
			"pfpid": "prod-fn"
		  }, "ciao")		  
		res.json({
			access_token: "NEONITETOKEN",
			expires_in: 2147483647,
			expires_at: "9999-12-31T23:59:59.999Z",
			token_type: "bearer",
			account_id: accountId,
			client_id: "ec684b8c687f479fadea3cb2ad83f5c6",
			internal_client: true,
			client_service: "fortnite",
			refresh_token: `${token}`,
			refresh_expires: 2147483647,
			refresh_expires_at: "9999-12-31T23:59:59.999Z",
			displayName: accountId,
			app: "fortnite",
			in_app_id: accountId,
			device_id: "5dcab5dbe86a7344b061ba57cdb33c4f"
		})
		res.status(200);
    },

    verifyToken: function(req, res){
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
			access_token: req.headers.authorization.replace("bearer eg1~", ""),
			expires_in: 9668556939,
			expires_at: "9999-12-31T23:59:59.999Z",
			token_type: "bearer",
			refresh_token: refresh_token,
			refresh_expires: 9668556939,
			refresh_expires_at: "9999-12-31T23:59:59.999Z",
			account_id: "ninja",
			client_id: "3446cd72694c4a4485d81b77adbb2141",
			internal_client: true,
			client_service: "fortnite",
			displayName: req.h,
			app: "fortnite",
			in_app_id: "ninja",
			device_id: "164fb25bb44e42c5a027977d0d5da800"
		})
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
			externalAuths: {},

		})
    },

    displayName: function(req, res){
        res.json({
			"id": req.params.displayName,
			"displayName": req.params.displayName,
			"externalAuths": {}
		})
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
		res.status(200)
	}
}