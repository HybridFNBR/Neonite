const {
	ApiException
} = require('../../structs/errors');
const NeoLog = require('../../structs/NeoLog')
const {getVersionInfo} = require("../../config/defs")
const WebSocket = require('ws');
const jsonwebtoken = require('jsonwebtoken');
const crypto = require('crypto');

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
			"serviceUrl": "ws://localhost:5596",
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
			"buildUniqueId": "00000000",
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
	},

	verifyMatch: function(req, res){
		res.json({
			"account_id": req.body.account_id,
			"data": req.body.data,
			"allow":true
		})
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

Date.prototype.addHours = function (h) {
	this.setTime(this.getTime() + (h * 60 * 60 * 1000));
	return this;
}

const wss = new WebSocket.Server({
	port: 5596
});

wss.on('connection', function connection(ws) {
    ws.send(JSON.stringify({
		"payload": {
			"state": "Connecting"
		},
		"name": "StatusUpdate"
	}));

	ws.send(JSON.stringify({
		"payload": {
			"totalPlayers": 1,
			"connectedPlayers": 1,
			"state": "Waiting"
		},
		"name": "StatusUpdate"
	}));

	ws.send(JSON.stringify({
		"payload": {
			"ticketId": "NEONITE",
			"queuedPlayers": 1,
			"estimatedWaitSec": 1,
			"status": {},
			"state": "Queued"
		},
		"name": "StatusUpdate"
	}));

	let matchmakingtoken = jsonwebtoken.sign({
		"joinDelaySec":4,
		"iss":"mms",
		"sessionId":"NEONITE",
		"exp":9668532724,
		"env":"prod",
		"iat":1668529124,
		"matchId":"NEONITE",
		"jti":"j1GaITnR4Op4JD6l1lbH9dfbyntYLIYn",
		"playerId":"198b3f9aa494490a83e8d541622235b0"
	}, "RS256")

	ws.send(JSON.stringify({
		"payload": {
			"matchId": "NEONITE",
			"sessionId": "NEONITE",
			"playerId": "198b3f9aa494490a83e8d541622235b0",
			"joinDelaySec": 4
		},
		"payloadJwt": matchmakingtoken,
		"name": "Play"
	}))
});