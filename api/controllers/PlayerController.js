
module.exports = {
    parties: function(req, res){
        res.status(204).end();
    },

    localparty: function(req, res){
        res.json({
            "current": [],
            "pending": [],
            "invites": [],
            "pings": []
        })
    },

    partyMeta: function(req, res){
        res.status(204).end()
    },

    pings: function(req, res){
        res.json({
            sent_by: req.params.pingerId,
            sent_to: req.params.accountId,
            sent_at: new Date(),
            expires_at: new Date().addHours(1),
            meta: {}
        })
    },

    friendsSummary: function(req, res){
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
    },

    friends: function(req, res){
        res.json([
			{
				accountId: req.params.accountId,
				status: 'ACCEPTED',
				direction: 'INBOUND',
				created: '2018-12-06T04:46:01.296Z',
				favorite: false
			}
		]);
    },

    recentPlayers: function(req, res){
        res.json([])
    },

    stats: function(req, res){
        res.json({})
    },

    presence: function(req, res){
        res.json([])
    },

    receipts: function(req, res){
        res.json([])
    }
    
}