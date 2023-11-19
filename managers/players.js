
Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}

/**
 * 
 * @param {Express.Application} app 
 */

module.exports = (app) => {
    app.post("/party/api/v1/*/parties", (req, res) => {
        res.status(204).end();
    })


    //leaderboard for chapter 1+?
    app.get('/fortnite/api/game/v2/leaderboards/cohort/*', (req, res) => {
        res.json([])
    })

    app.get('/party/api/v1/Fortnite/user/:accountId', (req, res) => {
        res.json({
            "current": [],
            "pending": [],
            "invites": [],
            "pings": []
        })
    })

    app.patch('/party/api/v1/*/parties/:partyId/members/:accountId/meta', (req, res) => {
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
    })


    app.post('/party/api/v1/*/parties/:PartyId/members/*/join', (req, res) => { res.json({ "status": "JOINED", "party_id": req.params.PartyId }) })

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
    })

    app.post('/party/api/v1/*/parties/:PartyId/members/:accountId/promote', (req, res) => { res.status(204).end() })

    app.get('/party/api/v1/*/user/:accountId', (req, res) => {
        //var party = partys.filter(x => x.accountId == req.params.accountId);
        res.json({});
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

	})

    app.get('/friends/api/v1/:accountId/summary', (req, res) => {
		res.json({
			"friends": [{
				"accountId": req.params.accountId,
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

	//friends list
	app.get('/friends/api/public/friends/:accountId', (req, res) => {
		res.json([
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

