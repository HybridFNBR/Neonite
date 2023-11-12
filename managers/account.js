module.exports = (app) => {

    //displayName
    app.get("/account/api/public/account/displayName/:displayName", (req, res) => {
		res.json({
			"id": req.params.displayName,
			"displayName": req.params.displayName,
			"externalAuths": {}
		})
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