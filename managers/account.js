module.exports = (app) => {

    //displayName
    app.get("/account/api/public/account/displayName/:displayName", (req, res) => {
		res.json({
			"id": req.params.displayName,
			"displayName": req.params.displayName,
			"externalAuths": {}
		})

		if (req.params.displayName != "NeoniteBot") return;

		var token = req.headers.authorization.replace("bearer ", "").replace("Bearer ", "")
		var client = global.xmppClients.find(x => x.token == token);

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

    //receipt
    app.get('/fortnite/api/receipts/v1/account/:accountId/receipts', (req, res) => {
		res.json([])
	});
    
    //Platform
    app.post('/fortnite/api/game/v2/tryPlayOnPlatform/account/:accountId', (req, res) => {
		res.set('Content-Type', 'text/plain');
		res.send(true);
	});


    //stats
    app.get('*/api/statsv2/account/:accountId', (req, res) => {
		res.json({
			"startTime": 0,
			"endTime": 0,
			"stats": {},
			"accountId": req.params.accountId
		})
	})

	//stats for chapter 1
	app.get('/fortnite/api/stats/accountId/:accountId/bulk/window/alltime', (req, res) => {
		res.json([])
	})

    //change the 0 to what ever amount of gold you want
	app.get('/fortnite/api/game/v2/br-inventory/account/:accountId', (req, res) => {
		res.json({
			"stash": {
				"globalcash": 69 //a little bit of trolling
			},
		})
	});
}