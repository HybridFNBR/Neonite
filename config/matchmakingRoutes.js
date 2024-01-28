module.exports.routes = {
    'GET /fortnite/api/game/v2/matchmakingservice/ticket/player/:accountId': 'MatchMakingController.matchmakingTicket',
    'GET /fortnite/api/game/v2/matchmaking/account/:accountId/session/:sessionId': 'MatchMakingController.matchmakingSession',
    'POST /fortnite/api/matchmaking/session/:SessionId/join': 'MatchMakingController.matchmakingSessionJoin',
    'GET /fortnite/api/matchmaking/session/:sessionId': 'MatchMakingController.matchmakingSession2',
    'GET /waitingroom/api/waitingroom': 'MatchMakingController.waitingRoom',
    'GET /fortnite/api/matchmaking/session/findPlayer/:id': 'MatchMakingController.findPlayer',


}