
const crypto = require('crypto');
module.exports = {
	parties: function (req, res) {
		global.partyId = crypto.randomBytes(10).toString("hex")
		res.json({
			"id": global.partyId,
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
		})
	},

	localparty: function (req, res) {
		res.json({
			"current": [],
			"pending": [],
			"invites": [],
			"pings": []
		})
	},
	
	pings: function (req, res) {
		res.json({
			sent_by: req.params.pingerId,
			sent_to: req.params.accountId,
			sent_at: new Date(),
			expires_at: new Date().addHours(1),
			meta: {}
		})
	},

	friendsSettings: function (req, res) {
		res.json({
			acceptInvites: "public"
		})
	},

	friendsSummary: function (req, res) {
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

	friends: function (req, res) {
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

	recentPlayers: function (req, res) {
		res.json([])
	},

	settingsPrivacy: function (req, res) {
		res.json({
			"receiveInvites": "ALL",
			"receiveIntentions": "ALL"
		})
	},
	stats: function (req, res) {
		res.json({
			"startTime": 1698908409,
			"endTime": 1735714808,
			"stats": {
				"br_score_gamepad_m0_playlist_habanerosolo": 1871,
				"s27_social_bp_level": 1248,
				"br_matchesplayed_keyboardmouse_m0_playlist_playgroundv2": 1,
				"br_placetop10_gamepad_m0_playlist_habanerosolo": 1,
				"br_score_gamepad_m0_playlist_bots_defaultsquad": 3445,
				"br_lastmodified_keyboardmouse_m0_playlist_defaultsolo": 1699124004,
				"br_lastmodified_gamepad_m0_playlist_habanerosolo": 1699214141,
				"br_minutesplayed_keyboardmouse_m0_playlist_bots_defaultsquad": 1,
				"br_score_keyboardmouse_m0_playlist_playgroundv2": 17,
				"br_kills_gamepad_m0_playlist_bots_defaultsquad": 95,
				"br_score_keyboardmouse_m0_playlist_defaultsolo": 76,
				"br_matchesplayed_gamepad_m0_playlist_habanerosolo": 5,
				"br_minutesplayed_gamepad_m0_playlist_habanerosolo": 59,
				"br_playersoutlived_keyboardmouse_m0_playlist_bots_defaultsquad": 1,
				"br_placetop3_gamepad_m0_playlist_bots_defaultsquad": 5,
				"br_placetop6_gamepad_m0_playlist_bots_defaultsquad": 5,
				"br_matchesplayed_gamepad_m0_playlist_bots_defaultsquad": 5,
				"br_kills_gamepad_m0_playlist_habanerosolo": 30,
				"br_score_keyboardmouse_m0_playlist_bots_defaultsquad": 34,
				"br_lastmodified_gamepad_m0_playlist_bots_defaultsquad": 1699198715,
				"br_playersoutlived_gamepad_m0_playlist_habanerosolo": 376,
				"br_matchesplayed_keyboardmouse_m0_playlist_bots_defaultsquad": 2,
				"br_lastmodified_keyboardmouse_m0_playlist_playgroundv2": 1699015811,
				"br_placetop25_keyboardmouse_m0_playlist_defaultsolo": 1,
				"br_playersoutlived_gamepad_m0_playlist_bots_defaultsquad": 490,
				"br_placetop25_gamepad_m0_playlist_habanerosolo": 2,
				"br_lastmodified_keyboardmouse_m0_playlist_bots_defaultsquad": 1699094790,
				"br_placetop1_gamepad_m0_playlist_bots_defaultsquad": 5,
				"br_matchesplayed_keyboardmouse_m0_playlist_defaultsolo": 3,
				"br_minutesplayed_gamepad_m0_playlist_bots_defaultsquad": 101
			},
			"accountId": req.params.accountId
		})
	},

	presence: function (req, res) {
		res.json([])
	},

	receipts: function (req, res) {
		res.json([])
	},

	blocklist: function (req, res) {
		res.json({
			blockedUsers: []
		})
	},

	createParty: function (req, res) {
		res.status(204)
	},

	party: function (req, res) {
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
	},

	partyMeta: function (req, res) {
        res.status(204).end()

	},

	joinParty: function (req, res) {
		res.json({
			"status": "JOINED",
			"party_id":
				req.params.partyId
		})
	}
}