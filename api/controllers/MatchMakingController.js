const {
	ApiException
} = require('../../structs/errors');
const NeoLog = require('../../structs/NeoLog')

module.exports = {
    
    matchmakingTicket: function(req, res){
        var ParsedBckt = {
			NetCL: "",
			Region: "",
			Playlist: "",
			HotfixVerion: -1
		}

		try {
			var splitted = req.query.bucketId.split(':');
			ParsedBckt.NetCL = splitted[0];
			ParsedBckt.HotfixVerion = splitted[1];
			ParsedBckt.Region = splitted[2];
			ParsedBckt.Playlist = splitted[3];
		}
		catch {
			throw new ApiException(errors.com.epicgames.fortnite.invalid_bucket_id);
		}
		finally {
			if (ParsedBckt.NetCL === "" || ParsedBckt.Region === "" || ParsedBckt.Playlist === "" || ParsedBckt.Region === -1) {
				throw new ApiException(errors.com.epicgames.fortnite.invalid_bucket_id).withMessage(`Failed to parse bucketId: '${req.query.bucketId}'`).with(req.query.bucketId)
			}
		}
		res.cookie("NetCL", ParsedBckt.NetCL);
		var data = {
			"playerId": req.params.accountId,
			"partyPlayerIds": [
				req.params.accountId,
			],
			"bucketId": `FN:Live:${ParsedBckt.NetCL}:${ParsedBckt.HotfixVerion}:${ParsedBckt.Region}:${ParsedBckt.Playlist}:PC:public:1`,
			"attributes": {
				"player.userAgent": req.headers["user-agent"],
				"player.preferredSubregion": "None",
				"player.option.spectator": "false",
				"player.inputTypes": "",
				"playlist.revision": "1",
				"player.teamFormat": "fun"
			},
			"expireAt": new Date().addHours(1),
			"nonce": RandomString(32)
		}
		Object.entries(req.query).forEach(([key, value]) => {
			if (key == "player.subregions" && value.includes(',')) {
				data.attributes["player.preferredSubregion"] = value.split(',')[0];
			}
			data.attributes[key] = value;
		});
		var payload = Buffer.from(JSON.stringify(data, null, 0)).toString('base64');
		NeoLog.Log(`Matchmaking into ${ParsedBckt.Playlist}`)
		res.json({
			"serviceUrl": "ws://localhost:5595",
			"ticketType": "mms-player",
			"payload": payload,
			"signature": undefined
		});
    },

    matchmakingSession: function(req, res){
        res.json({
			"accountId": req.params.accountId,
			"sessionId": req.params.sessionId,
			"key": "none"
		})
    },

    matchmakingSession2: function(req, res){
        var BuildUniqueId = req.cookies["NetCL"];
		res.json({
			"id": req.params.sessionId,
			"ownerId": "Neonite",
			"ownerName": "Neonite",
			"serverName": "NeoniteV2",
			"serverAddress": "127.0.0.1",
			"serverPort": -1,
			"totalPlayers": 0,
			"maxPublicPlayers": 0,
			"openPublicPlayers": 0,
			"maxPrivatePlayers": 0,
			"openPrivatePlayers": 0,
			"attributes": {},
			"publicPlayers": [],
			"privatePlayers": [],
			"allowJoinInProgress": false,
			"shouldAdvertise": false,
			"isDedicated": false,
			"usesStats": false,
			"allowInvites": false,
			"usesPresence": false,
			"allowJoinViaPresence": true,
			"allowJoinViaPresenceFriendsOnly": false,
			"buildUniqueId": BuildUniqueId || "00000000",
			"lastUpdated": "2020-11-09T00:40:28.878Z",
			"started": false
		});
    },

    matchmakingSessionJoin: function(req, res){
        res.status(204).end()
    },

    waitingRoom: function(req, res){
        res.status(204).end();
    },

	findPlayer: function(req, res){
		res.json([])
	}
}

function RandomString(length) {
	var result = [];
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result.push(characters.charAt(Math.floor(Math.random() *
			charactersLength)));
	}
	return result.join('');
}