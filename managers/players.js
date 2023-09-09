const { v4: uuidv4 } = require("uuid");
const builder = require("xmlbuilder")

Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}

//sigh
let partys = []


/*
{
    accountId: accountId,
    resource: resource,
    token: token,
    Jid: Jid,
    Ws: ws,
    Settings: {
        bCopyEmote: false
    }
}

*/

module.exports = (app) => {
    app.post("/party/api/v1/*/parties", (req, res) => {
        var response = ""


        try {
            response = {
                "id": "LobbyBotPartyLMFAO",
                "created_at": new Date(),
                "updated_at": new Date(),
                "config": req.body.config,
                "members": [
                    {
                        "account_id": req.body.join_info.connection.id.split("@")[0],
                        "meta": req.body.join_info.connection.meta,
                        "connections": [
                            {
                                "id": req.body.join_info.connection.id,
                                "connected_at": new Date(),
                                "updated_at": new Date(),
                                "yield_leadership": false,
                                "meta": {
                                    "urn:epic:conn:platform_s": "WIN",
                                    "urn:epic:conn:type_s": "game"
                                }
                            }
                        ],
                        "revision": 0,
                        "updated_at": new Date(),
                        "joined_at": new Date(),
                        "role": "CAPTAIN"
                    }
                ],
                "applicants": [],
                "meta": req.body.meta,
                "invites": [],
                "revision": 0
            }
        }
        catch {
            response = {
                "id": "LobbyBotPartyLMFAO",
                "created_at": new Date(),
                "updated_at": new Date(),
                "config": req.body.config,
                "members": [],
                "applicants": [],
                "meta": req.body.meta,
                "invites": [],
                "revision": 0
            }
        }

        res.json(response)
    })

    app.patch('/party/api/v1/*/parties/:partyId/members/:accountId/meta', (req, res) => {
        var client = global.xmppClients.find(x => x.accountId == req.params.accountId);

        if (!client) return res.status(204).end();


        if (client.Settings.bCopyEmote && req.body.update) {
            var counter = 0;

            while (client.Settings.botNumber > counter) {
                
                if (counter > 16) break;

                client.functions.SendMessage(JSON.stringify(
                    {
                        "sent": new Date(),
                        "type": "com.epicgames.social.party.notification.v0.MEMBER_STATE_UPDATED",
                        "revision": 0,
                        "ns": "Fortnite",
                        "party_id": req.params.PartyId || "LobbyBotPartyLMFAO",
                        "account_id": `NeoniteBot${counter != 0 ? counter : ''}`,
                        "account_dn": 'NeoniteBot',
                        "member_state_removed": [],
                        "member_state_updated": req.body.update,
                        "joined_at": new Date(),
                        "updated_at": new Date()
                    }))
                    counter = counter + 1;
            }
        }

        client.functions.SendMessage(JSON.stringify(
            {
                "sent": new Date(),
                "type": "com.epicgames.social.party.notification.v0.MEMBER_STATE_UPDATED",
                "revision": req.body.revision,
                "ns": "Fortnite",
                "party_id": req.params.PartyId,
                "account_id": req.params.accountId,
                "account_dn": req.params.accountId,
                "member_state_removed": req.body.delete,
                "member_state_updated": req.body.update,
                "joined_at": new Date(),
                "updated_at": new Date()
            }))

        res.status(204).end()
    })


    app.post('/party/api/v1/*/user/:accountId/pings/:pingerId', (req, res) => {
        res.json({
            sent_by: req.params.pingerId,
            sent_to: req.params.accountId,
            sent_at: new Date(),
            expires_at: new Date().addHours(1),
            meta: {}
        })

        if (req.params.accountId != "NeoniteBot") return;

        var client = global.xmppClients.find(x => x.accountId == req.params.pingerId);

        if (!client) return;

        client.functions.AddBot("CID_286_Athena_Commando_F_NeonCat")
    })


    app.post('/party/api/v1/*/parties/:PartyId/members/*/join', (req, res) => { res.json({ "status": "JOINED", "party_id": req.params.PartyId }) })

    app.post("/party/api/v1/*/parties/LobbyBotPartyLMFAO/members/*/disconnect", (req, res) => { res.status(204).end()})

    app.post(`/party/api/v1/*/parties/:partyId/members/*/confirm`, (req, res) => { res.status(403).end() })

    app.patch("/party/api/v1/*/parties/:partyId", (req, res) => { res.status(204).send() })

    app.delete("/party/api/v1/*/parties/:partyId", (req, res) => { res.status(204).send() })

    app.all('/presence/api/v1/*', (req, res) => { res.json([]) })

    // /party/api/v1/Fortnite/parties/LobbyBotPartyLMFAO/members/NeoniteBot
    app.delete('/party/api/v1/*/parties/:PartyId/members/:accountId', (req, res) => {
        res.status(204).end()
        var token = req.headers.authorization.replace("bearer ", "").replace("Bearer ", "")

        var client = global.xmppClients.find(x => x.token == token);
        if (!client) return;


        if (`${req.params.accountId}`.startsWith("NeoniteBot")) {
            
            client.functions.SendMessage(JSON.stringify({
                "account_id": req.params.accountId,
                "member_state_update": {},
                "ns": "Fortnite",
                "type": "com.epicgames.social.party.notification.v0.MEMBER_LEFT",
                "party_id": req.params.PartyId,
                "revision": 0,
                "sent": new Date()
            }))
        }
        else {
            client.Settings.botNumber = 0;
        }
    })

    app.post('/party/api/v1/*/parties/:PartyId/members/:accountId/promote', (req, res) => { res.status(204).end() })

    app.get('/party/api/v1/*/user/:accountId', (req, res) => {
        //var party = partys.filter(x => x.accountId == req.params.accountId);
        res.json({
            "current": [{
                "id": "LobbyBotPartyLMFAO",
                "created_at": new Date(),
                "updated_at": new Date(),
                "config": {
                    "type": "DEFAULT",
                    "joinability": "INVITE_AND_FORMER",
                    "discoverability": "INVITED_ONLY",
                    "sub_type": "default",
                    "max_size": 16,
                    "invite_ttl": 14400,
                    "join_confirmation": true
                },
                "members": [{
                    "account_id": req.params.accountId,
                    "meta": {
                        "urn:epic:member:dn_s": req.params.accountId,
                    },
                    "connections": [{
                        "id": "",
                        "connected_at": new Date(),
                        "updated_at": new Date(),
                        "yield_leadership": false,
                        "meta": {
                            "urn:epic:conn:platform_s": "WIN",
                            "urn:epic:conn:type_s": "game"
                        }
                    }],
                    "revision": 0,
                    "updated_at": new Date(),
                    "joined_at": new Date(),
                    "role": "CAPTAIN"
                }],
                "applicants": [],
                "meta": {},
                "invites": [],
                "revision": 0
            }],
            "pending": [],
            "invites": [],
            "pings": []
        });
    });

    app.get("/party/api/v1/*/parties/:partyId", (req, res) => {
        res.json({
            "id": req.params.partyId,
            "created_at": new Date(),
            "updated_at": new Date(),
            "config": {
                "type": "DEFAULT",
                "joinability": "OPEN",
                "discoverability": "ALL",
                "sub_type": "default",
                "max_size": 16,
                "invite_ttl": 14400,
                "join_confirmation": false
            },
            "members": [],
            "applicants": [],
            "meta": {},
            "invites": [],
            "revision": 0
        })
    })

    app.get('/friends/api/public/blocklist/:accountId', (req, res) => {
		res.json({
			blockedUsers: []
		})
	});

	//friends setting
	app.get('/friends/api/v1/:accountId/settings', (req, res) => {
		res.json({
			acceptInvites: "public",
			mutualPrivacy: 'NONE'
		})
	});

	//recent players
	app.get('/friends/api/public/list/fortnite/:accountId/recentPlayers', (req, res) => {
		res.json([]);
	});

    app.post("/friends/api/v1/:accountId/friends/NeoniteBot", (req, res) => {
		res.status(204).send()
	})

    app.post("/friends/api/v1/:accountId/blocklist/NeoniteBot", (req, res) => {
		res.status(403).json({ "errorCode": "errors.com.epicgames.Neonite.common.forbidden", "errorMessage": "You cannot remove the bot", "messageVars": [], "numericErrorCode": 14004, "originatingService": "party", "intent": "prod" })

		var client = global.xmppClients.find(x => x.accountId == req.params.accountId);
		if (!client) return;

		client.functions.SendMessage(JSON.stringify({
			"type": "FRIENDSHIP_REQUEST",
			"timestamp": new Date(),
			"from": "NeoniteBot",
			"to": req.params.accountId,
			"status": "ACCEPTED"
		}))

		client.functions.SendMessage(JSON.stringify({
			"payload": {
				"accountId": "NeoniteBot",
				"status": "ACCEPTED",
				"direction": "INBOUND",
				"created": new Date(),
				"favorite": false
			},
			"type": "com.epicgames.friends.core.apiobjects.Friend",
			"timestamp": new Date()
		}))


	})

    app.get('/friends/api/v1/:accountId/summary', (req, res) => {
		res.json({
			"friends": [{
				"accountId": "NeoniteBot",
				"groups": [],
				"mutual": 0,
				"alias": "",
				"note": "",
				"favorite": true,
				"created": "2021-01-17T16:42:04.125Z"
			}],
			"incoming": [],
			"suggested": [],
			"blocklist": [],
			"settings": {
				"acceptInvites": "public"
			},
			"limitsReached": {
				"incoming": false,
				"outgoing": false,
				"accepted": false
			}
		})
	})

    app.get("/friends/api/v1/*/blocklist", (req, res) => { res.json([]) })

	app.get("/friends/api/v1/*/recent/fortnite", (req, res) => { res.json([]) })

    app.delete("/friends/api/v1/:accountId/friends/NeoniteBot", (req, res) => {
		res.status(403).json({ "errorCode": "errors.com.epicgames.Neonite.common.forbidden", "errorMessage": "You cannot remove the bot", "messageVars": [], "numericErrorCode": 14004, "originatingService": "party", "intent": "prod" })
		var client = global.xmppClients.find(x => x.accountId == req.params.accountId);
		if (!client) return;

		client.functions.SendMessage(JSON.stringify({
			"type": "FRIENDSHIP_REQUEST",
			"timestamp": new Date(),
			"from": "NeoniteBot",
			"to": req.params.accountId,
			"status": "ACCEPTED"
		}))

		client.functions.SendMessage(JSON.stringify({
			"payload": {
				"accountId": "NeoniteBot",
				"status": "ACCEPTED",
				"direction": "INBOUND",
				"created": new Date(),
				"favorite": false
			},
			"type": "com.epicgames.friends.core.apiobjects.Friend",
			"timestamp": new Date()
		}))
	})

	//friends list
	app.get('/friends/api/public/friends/:accountId', (req, res) => {
		res.json([
			{
				accountId: 'NeoniteBot',
				status: 'ACCEPTED',
				direction: 'INBOUND',
				created: '2018-12-06T04:46:01.296Z',
				favorite: false
			},
			{
				accountId: req.params.accountId,
				status: 'ACCEPTED',
				direction: 'INBOUND',
				created: '2018-12-06T04:46:01.296Z',
				favorite: false
			}
		]);
	});
}

