const jsonwebtoken = require('jsonwebtoken');
const NeoLog = require('../../structs/NeoLog')
const { account } = require("../../config/defs")


module.exports = {
  oauthTokenv1: function (req, res) {
    let JWTdecode;
    let idToken;
    let token;
    switch (req.body.grant_type) {
      case "client_credentials":
        token = oauthTokenV1_clientCredentials(req.body["deployment_id"])
        res.json({
          "access_token": token,
          "token_type": "bearer",
          "expires_at": "9999-12-31T23:59:59.999Z",
          "features": [
            "AntiCheat",
            "Connect",
            "ContentService",
            "Ecom",
            "EpicConnect",
            "Inventories",
            "LockerService",
            "Matchmaking Service",
            "ExchangeCodeCreation",
            "Achievements",
            "Leaderboards",
            "Matchmaking",
            "Metrics",
            "PlayerReports",
            "Sanctions",
            "Stats",
            "TitleStorage",
            "Voice",
            "CommerceService",
            "FNResonanceService",
            "MagpieService",
            "PCBService",
            "QuestService",
          ],
          "organization_id": "o-aa83a0a9bc45e98c80c1b1c9d92e9e",
          "product_id": "prod-fn",
          "sandbox_id": "fn",
          "deployment_id": `${req.body["deployment_id"]}`,
          "expires_in": 3599
        })
        break;
      case "external_auth":
        JWTdecode = jsonwebtoken.decode(req.body["external_auth_token"])
        token = oauthTokenV1_externalAuth(req.body["nonce"], req.body["deployment_id"], JWTdecode["dn"])
        idToken = oauthTokenV1_idToken(JWTdecode["dn"])
        res.json({
          "access_token": token,
          "token_type": "bearer",
          "expires_at": "9999-12-31T23:59:59.999Z",
          "nonce": req.body["nonce"],
          "features": [
            "AntiCheat",
            "Connect",
            "ContentService",
            "Ecom",
            "EpicConnect",
            "Inventories",
            "LockerService",
            "Matchmaking Service",
            "ExchangeCodeCreation",
            "Achievements",
            "Leaderboards",
            "Matchmaking",
            "Metrics",
            "PlayerReports",
            "Sanctions",
            "Stats",
            "TitleStorage",
            "Voice",
            "CommerceService",
            "FNResonanceService",
            "MagpieService",
            "PCBService",
            "QuestService",
          ],
          "organization_id": "o-aa83a0a9bc45e98c80c1b1c9d92e9e",
          "product_id": "prod-fn",
          "sandbox_id": "fn",
          "deployment_id": req.body["deployment_id"],
          "organization_user_id": "000185f80b9a4dc3aaf1ca83611c2bf5",
          "product_user_id": "00027b91959a4c57a1272efcc4d7480f",
          "product_user_id_created": false,
          "id_token": idToken,
          "expires_in": 3599
        })
        break;
      case "refresh_token":
        JWTdecode = jsonwebtoken.decode(req.body["refresh_token"])
        const refresh_token = oauthv2_refreshToken(JWTdecode["sub"], JWTdecode["dn"])
        idToken = oauthTokenV1_idToken(JWTdecode["dn"])
        res.json({
          "access_token": refresh_token,
          "expires_in": 15552000,
          "expires_at": "9999-12-31T23:59:59.999Z",
          "token_type": "bearer",
          "refresh_token": refresh_token,
          "refresh_expires": 15552000,
          "refresh_expires_at": "9999-12-31T23:59:59.999Z",
          "account_id": "e7c388664e5442e89f30b396d9fa7183",
          "client_id": "3e13c5c57f594a578abe516eecb673fe",
          "internal_client": true,
          "client_service": "3fd15bc288014f698cca1a3d1f01c7af",
          "scope": [
            "basic_profile",
            "friends_list",
            "openid",
            "offline_access",
            "presence"
          ],
          "displayName": JWTdecode["dn"],
          "app": "3fd15bc288014f698cca1a3d1f01c7af",
          "in_app_id": JWTdecode["sub"],
          "device_id": "NEONITE",
          "product_id": "3fd15bc288014f698cca1a3d1f01c7af",
          "sandbox_id": "fn",
          "deployment_id": "67731b3b183e4efabf9597f04b38ddf9",
          "application_id": "fghi4567UG3ZXlhvevzKJI65wfTUoYBC",
          "acr": "urn:epic:loa:aal1",
          "auth_time": "2025-04-07T13:50:26.438Z"
        })
        break;
      default:
        NeoLog.Error($`Invalid Grant Type: ${req.body.grant_type}`)
    }

  },

  eossdkv2: function (req, res) {
    res.send([
      {
        "accountId": req.query.accountId,
        "displayName": req.query.accountId,
        "preferredLanguage": "en",
        "linkedAccounts": [],
        "cabinedMode": false,
        "empty": false
      }
    ]);
  },

  blocklist: function (req, res) {
    res.json([])

  },

  presence: function (req, res) {
    const JWT = req.headers.authorization.replace("bearer ", "")
    res.json({
      "own": {
        "accountId": JWT["dn"],
        "status": "online",
        "perNs": [
          {
            "productId": "prod-fn",
            "appId": "fghi4567FNFBKFz3E4TROb0bmPS8h1GW",
            "status": "online",
            "activity": {
              "value": ""
            },
            "ns": "62a9473a2dca46b29ccf17577fcf42d7",
            "props": req.body["props"],
            "conns": [
              {
                "id": "0242acfffe110002-00000001-0395cada-6dee7b822f3cee31-709f768d#sub-eas-3160433241",
                "props": {}
              }
            ]
          }
        ]
      }
    })
  },

  eossdkv1default: function (req, res) {
    res.json({
    "client": {
      "BaseService": {
        "HttpRetryLimit": 4,
        "HttpRetryResponseCodes": [
          429,
          503,
          504
        ]
      },
      "RateLimiter.AuthClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.PresenceClient.Operations": {
        "MessageCount": 3,
        "TimeIntervalInSeconds": 20,
        "Operation": [
          "SendUpdate",
          "SetPresence"
        ]
      },
      "RateLimiter.ReceiptValidatorClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.LeaderboardsClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.StatsClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.InventoryClient": {
        "MessageCount": 1000,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.MatchmakingClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.SDKConfigClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "RequestUpdate"
        ]
      },
      "RateLimiter.WorldInventoryClient": {
        "MessageCount": 1000,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.TitleStorageClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.EcomClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.DataStorageClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "GetAccessLinks",
          "QueryFile",
          "QueryFileList",
          "CopyFile",
          "DeleteFile",
          "ReadFile",
          "WriteFile",
          "DownloadFileRedirected",
          "UploadFileRedirected"
        ]
      },
      "LeaderboardsClient": {
        "MaxUserScoresQueryUserIds": 100,
        "MaxUserScoresQueryStats": 25
      },
      "RateLimiter.CustomInvitesClient.Operations": {
        "MessageCount": 50,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "SendCustomInvite"
        ]
      },
      "RateLimiter.PartiesInternalClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "HTTP": {
        "HttpReceiveTimeout": 30,
        "bEnableHttp": true,
        "HttpTimeout": 30,
        "HttpConnectionTimeout": 60,
        "HttpSendTimeout": 30,
        "MaxFlushTimeSeconds": 2
      },
      "RateLimiter.FriendClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "QueryFriends",
          "SendFriendInvite",
          "DeleteFriend"
        ]
      },
      "RateLimiter.RTCAdminClient": {
        "MessageCount": 50,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.UserInfoClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "/Script/Engine.NetworkSettings": {
        "n.VerifyPeer": false
      },
      "RateLimiter.PartiesInternalClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "CreateParty",
          "JoinParty",
          "UpdateParty",
          "SendInvite",
          "DeclineInvite",
          "SendJoinRequest",
          "LeaveParty",
          "DisconnectFromParty",
          "JoinPartyByGroup",
          "UpdateUserPrivacySettings",
          "QueryUserPartyInfo"
        ]
      },
      "WebSockets.LibWebSockets": {
        "ThreadStackSize": 131072,
        "ThreadTargetFrameTimeInSeconds": 0.0333,
        "ThreadMinimumSleepTimeInSeconds": 0
      },
      "StatsClient": {
        "MaxQueryStatsStatNamesStrLength": 1900
      },
      "EcomClient.EcomSalesMappings": {
        "defaultStore": "EGA",
        "com.epicgames.portal": "EGA",
        "com.epicgames.store": "EGA"
      },
      "RateLimiter.MetricsClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "RegisterPlayerBackendSession"
        ]
      },
      "RateLimiter.DataStorageClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "WorldInventoryClient": {
        "MaxNumberOfParallelUpdateRequestsInFlight": 3,
        "SessionLockTTLSeconds": 60,
        "MaxNumberOfParallelQueryRequestsInFlight": 10,
        "MaxNumberOfLockEntriesPerRequest": 10,
        "MaxNumberOfWriteEntriesPerRequest": 10,
        "SessionLockUpdateIntervalRandomAddSeconds": 20,
        "MaxNumberOfParallelLockRequestsInFlight": 3,
        "SessionLockUpdateIntervalSeconds": 30,
        "MaxNumberOfSubTasksPerParallelUpdateTask": 20,
        "MaxNumberOfSubTasksPerParallelLockTask": 20,
        "QueryInventoryPageLimit": 0,
        "MaxBinaryDataSizeBytes": 10485760,
        "HttpRetryResponseCodes": [
          429,
          500,
          502,
          503,
          504
        ],
        "LockType": "Session"
      },
      "SanitizerClient": {
        "ReplaceChar": "*",
        "RequestLimit": 10
      },
      "RateLimiter.ModsClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "InstallMod",
          "UninstallMod",
          "UpdateMod",
          "EnumerateMods"
        ]
      },
      "RateLimiter.ReportsClient.Operations": {
        "MessageCount": 100,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "SendPlayerBehaviorReport"
        ]
      },
      "RateLimiter.RTCAdminClient.Operations": {
        "MessageCount": 50,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "QueryJoinRoomToken",
          "Kick",
          "SetParticipantHardMute"
        ]
      },
      "RateLimiter.FriendClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.AchievementsClient": {
        "MessageCount": 100,
        "TimeIntervalInSeconds": 60
      },
      "LogFiles": {
        "PurgeLogsDays": 5,
        "MaxLogFilesOnDisk": 5,
        "LogTimes": "SinceStart"
      },
      "RateLimiter": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.AntiCheatClient": {
        "MessageCount": 120,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.ProgressionSnapshot": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "SessionsClient": {
        "HeartbeatIntervalSecs": 30
      },
      "RateLimiter.WorldInventoryClient.Operations": {
        "MessageCount": 1000,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "Open",
          "Close",
          "Write",
          "WriteTransaction",
          "QueryVersionMetadata"
        ]
      },
      "InventoryClient.WorldInventory": {
        "MaxNumberOfParallelUpdateRequestsInFlight": 3,
        "SessionLockTTLSeconds": 60,
        "MaxNumberOfParallelQueryRequestsInFlight": 10,
        "MaxNumberOfLockEntriesPerRequest": 10,
        "MaxNumberOfWriteEntriesPerRequest": 10,
        "SessionLockUpdateIntervalRandomAddSeconds": 20,
        "MaxNumberOfParallelLockRequestsInFlight": 3,
        "SessionLockUpdateIntervalSeconds": 30,
        "MaxNumberOfSubTasksPerParallelUpdateTask": 20,
        "MaxNumberOfSubTasksPerParallelLockTask": 20,
        "QueryInventoryPageLimit": 0,
        "MaxBinaryDataSizeBytes": 10485760,
        "LockType": "Session"
      },
      "RateLimiter.UserInfoClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "QueryLocalUserInfo",
          "QueryUserInfo",
          "QueryUserInfoByDisplayName",
          "QueryUserInfoByExternalAccount"
        ]
      },
      "LobbyClient": {
        "InitialResendDelayMs": 100,
        "MaxConnectionRetries": 3,
        "LobbySocketURL": "wss://api.epicgames.dev/lobby/v1/`deploymentId/lobbies/connect",
        "NumConsecutiveFailuresAllowed": 5,
        "MaxResendDelayMs": 2000,
        "WebSocketConnectTaskMaxNetworkWaitSeconds": 15,
        "RecoveryWaitTimeSecs": 2,
        "InitialRetryDelaySeconds": 5,
        "bDisableRTCVoice": false,
        "MaxSendRetries": 3,
        "SentMessageTimeout": 5,
        "HeartbeatIntervalSecs": 30,
        "MaxRetryIntervalSeconds": 15
      },
      "RateLimiter.SanctionsClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "QueryActivePlayerSanctions"
        ]
      },
      "UIClient.SocialURLQueryParamNames": {
        "OSName": "os_name",
        "ProductId": "product_id",
        "SDKCLNumber": "sdk_cl_number",
        "DeploymentId": "deployment_id",
        "IntegratedPlatformName": "integrated_platform_name",
        "SDKVersion": "sdk_version",
        "OSVersion": "os_version",
        "UserId": "user_id",
        "ExchangeCode": "exchange_code"
      },
      "RateLimiter.LobbyClient.ThrottledOperations": {
        "MessageCount": 30,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "CreateLobby",
          "DestroyLobby",
          "JoinLobby",
          "LeaveLobby",
          "HeartbeatLobby",
          "PromoteMember",
          "KickLobbyMember",
          "SendLobbyInvite",
          "RejectLobbyInvite",
          "QueryInvites",
          "FindLobby",
          "RefreshRTCToken",
          "HardMuteMember"
        ]
      },
      "RateLimiter.SessionsClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.KWSClient": {
        "MessageCount": 20,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.PresenceClient": {
        "MessageCount": 60,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.KWSClient.Operations": {
        "MessageCount": 20,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "CreateUser",
          "UpdateParentEmail",
          "QueryAgeGate",
          "QueryPermissions",
          "RequestPermissions"
        ]
      },
      "RateLimiter.InventoryClient.Operations": {
        "MessageCount": 1000,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "Open",
          "Close",
          "Write"
        ]
      },
      "RateLimiter.LeaderboardsClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "QueryLeaderboardDefinitions",
          "QueryLeaderboardRanks",
          "QueryLeaderboardUserScores"
        ]
      },
      "RateLimiter.SanctionsClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "Messaging.EpicConnect": {
        "FailedConnectionDelayMultiplier": 2.5,
        "RetryBackoffExponentialExponentBias": 0,
        "ServerHeartbeatIntervalMilliseconds": 0,
        "RetryBackoffMaxSeconds": 180,
        "RetryBackoffJitterCoefficientMin": 0.5,
        "Urlv2": "wss://connect.epicgames.dev/v2",
        "ClientHeartbeatIntervalMilliseconds": 30000,
        "RetryBackoffExponentialBase": 2,
        "RetryBackoffJitterCoefficientMax": 1,
        "FailedConnectionDelayMaxSeconds": 180,
        "FailedConnectionDelayIntervalSeconds": 5,
        "UseV2Connection": false,
        "Url": "wss://connect.epicgames.dev"
      },
      "MetricsClient": {
        "HttpRetryLimit": 2
      },
      "RateLimiter.TitleStorageClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "QueryFile",
          "QueryFileList",
          "ReadFile"
        ]
      },
      "RateLimiter.AchievementsClient.Operations": {
        "MessageCount": 100,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "QueryDefinitions",
          "QueryPlayerAchievements",
          "UnlockAchievements"
        ]
      },
      "Messaging.Stomp": {
        "ClientHeartbeatIntervalMs": 30000,
        "RequestedServerHeartbeatIntervalMs": 0,
        "Url": "wss://api.epicgames.dev/notifications/v1/`deploymentid`/connect",
        "BlocklistMessageTypeFilters": [
          "lobbyinvite"
        ]
      },
      "TitleStorageClient": {
        "AccessLinkDurationSeconds": 300,
        "UnusedCachedFileDaysToLive": 7,
        "ClearInvalidFileCacheFrequencyDays": 2,
        "MaxSimultaneousReads": 10
      },
      "Overlay": {
        "ValidDomains": [
          ".epicgames.com",
          ".epicgames.dev"
        ]
      },
      "ConnectClient": {
        "MaxProductUserIdMappingsQueryUserIds": 128,
        "MinProductUserIdMappingsUpdateTimeInSeconds": 900
      },
      "RateLimiter.LobbyClient.Operations": {
        "MessageCount": 100,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "GetByLobbyId",
          "UpdateLobby"
        ]
      },
      "RateLimiter.AntiCheatClient.Operations": {
        "MessageCount": 120,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "QueryServiceStatus",
          "SendClientMessage"
        ]
      },
      "EcomClient": {
        "PurchaseCookieName": "EPIC_BEARER_TOKEN",
        "PurchaseEpicIdMobileLandscapeUrl": "https://www.epicgames.com/ecom/payment/v2/purchase",
        "PurchaseEpicIdMobilePortraitUrl": "https://www.epicgames.com/ecom/payment/v2/purchase",
        "PurchaseEpicIdUrl": "https://www.epicgames.com/ecom/payment/v1/purchase",
        "PurchaseUrl": "https://launcher-website-prod07.ol.epicgames.com/purchase"
      },
      "RateLimiter.SessionsClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "UpdateSession",
          "JoinSession",
          "StartSession",
          "EndSession",
          "RegisterPlayers",
          "SendInvite",
          "RejectInvite",
          "QueryInvites",
          "FindSession",
          "DestroySession"
        ]
      },
      "RateLimiter.StatsClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "IngestStat",
          "QueryStats"
        ]
      },
      "RateLimiter.WeblinksClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.ReceiptValidatorClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "VerifyPurchase"
        ]
      },
      "DataStorageClient": {
        "AccessLinkDurationSeconds": 300,
        "MaxSimultaneousReads": 10,
        "MaxSimultaneousWrites": 10
      },
      "RateLimiter.AuthClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "VerifyAuth",
          "DeletePersistentAuth",
          "GenerateClientAuth",
          "LinkAccount",
          "QueryIdToken",
          "VerifyIdToken"
        ]
      },
      "InventoryClient": {
        "MaxNumberOfParallelUpdateRequestsInFlight": 3,
        "SessionLockTTLSeconds": 60,
        "MaxNumberOfLockEntriesPerRequest": 10,
        "MaxNumberOfWriteEntriesPerRequest": 10,
        "SessionLockUpdateIntervalRandomAddSeconds": 20,
        "MaxNumberOfParallelLockRequestsInFlight": 3,
        "SessionLockUpdateIntervalSeconds": 30,
        "MaxNumberOfSubTasksPerParallelLockTask": 20,
        "HttpRetryResponseCodes": [
          429,
          500,
          502,
          503,
          504
        ],
        "LockType": "Session",
        "BaseUrl": "https://api.epicgames.dev/inventory",
        "MaxNumberOfSubTasksPerParallelUpdateTask": 20,
        "QueryInventoryPageLimit": 0,
        "HttpRetryVerbs": [
          "GET",
          "HEAD",
          "POST"
        ]
      },
      "P2PClient": {
        "IceServers": [
          "stun:stun.l.google.com:19302",
          "stun:turn.rtcp.on.epicgames.com:3478",
          "turn:turn.rtcp.on.epicgames.com:3478"
        ],
        "P2PMinPort": 7777,
        "P2PMaxPort": 7876
      },
      "RateLimiter.LobbyClient": {
        "MessageCount": 30,
        "TimeIntervalInSeconds": 60
      },
      "SDKAnalytics": {
        "BaseUrl": "https://api.epicgames.dev/telemetry/data/",
        "DevPhase": 2,
        "AppEnvironment": "Production",
        "UploadType": "sdkevents"
      },
      "RateLimiter.ConnectClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.MetricsClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "GameClient": {
        "UseGzipEncoding": false
      },
      "AntiCheat.GameplayData": {
        "Url": "wss://api.epicgames.dev/cerberus-edge/v1/"
      },
      "AuthClient": {
        "AccountPortalURLLocaleSuffix": "lang=`code",
        "PollInterval": 5,
        "RefreshTokenThreshold": 100,
        "VPCRegisterURL": "https://epicgames.com/id/register/quick/minor/await?code=`challenge_id&display=embedded",
        "AuthorizeContinuationEndpoint": "https://epicgames.com/id/login?continuation=`continuation&prompt=skip_merge%20skip_upgrade",
        "AuthorizeCodeEndpoint": "https://epicgames.com/id/authorize?client_id=`client_id&response_type=code&scope=`scope&redirect_uri=`redirect_uri&display=popup&prompt=login",
        "VerifyTokenInterval": 60,
        "PollExpiresIn": 300,
        "IdTokenCacheMinExpirySeconds": 300,
        "AuthorizeEndpoint": "https://epicgames.com/id/authorize?exchange_code=`exchange_code&scope=`scope&prompt=skip_merge%20skip_upgrade",
        "AccountPortalScheme": "eos.`client_id://epic/auth",
        "bOfflineAccountToken": true,
        "bFailLoginIfExternalAccountIdDoesNotMatchAuthToken": false,
        "AuthorizeContinuationEmbeddedEndpoint": "https://epicgames.com/id/embedded/login?continuation=`continuation&prompt=skip_merge%20skip_upgrade"
      },
      "RateLimiter.ProgressionSnapshot.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "SubmitSnapshot",
          "DeleteSnapshot"
        ]
      },
      "XMPP": {
        "bEnabled": true,
        "bEnableWebsockets": true,
        "ThreadStackSize": 131072
      },
      "RateLimiter.AntiCheatServer.Operations": {
        "MessageCount": 100000,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "QueryServiceStatus",
          "SendClientMessage"
        ]
      },
      "RateLimiter.MatchmakingClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "SessionRegister",
          "SessionDeregister",
          "SessionAcknowledgeAssignment",
          "TicketJoin",
          "TicketClose",
          "SessionHeartbeat",
          "TicketHeartbeat"
        ]
      },
      "Core.Log": {
        "LogEOS": "verbose",
        "LogEOSMessaging": "verbose",
        "LogEOSConnect": "verbose",
        "LogEOSAuth": "verbose",
        "LogHttpSerialization": "verbose",
        "LogCore": "verbose",
        "LogHttp": "warning",
        "LogStomp": "verbose",
        "LogXmpp": "verbose",
        "LogEOSSessions": "verbose"
      },
      "UIClient": {
        "FriendsURL": "https://api.epicgames.dev/overlay-override/v1/",
        "SocialSPAClientId": "cf27c69fe66441e8a8a4e8faf396ee4c",
        "VPCURLLocaleSuffix": "&lang=`code",
        "FriendsURLExchangeCodeSuffix": "?exchange_code=`exchange_code",
        "VPCURL": "https://epicgames.com/id/overlay/quick/minor/verify?code=`challenge_id"
      },
      "RateLimiter.AntiCheatServer": {
        "MessageCount": 100000,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.InventoryClient.WorldInventory.Operations": {
        "MessageCount": 1000,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "WorldOpen",
          "WorldClose",
          "WorldWrite",
          "WriteTransaction",
          "QueryVersionMetadata"
        ]
      },
      "Messaging.XMPP": {
        "ReconnectionDelayJitter": 1.5,
        "PingTimeout": 30,
        "ReconnectionDelayBase": 4,
        "ServerPort": 443,
        "bPrivateChatFriendsOnly": true,
        "ReconnectionDelayMax": 300,
        "Domain": "prod.ol.epicgames.com",
        "ReconnectionDelayBackoffExponent": 2,
        "ServerAddr": "wss://xmpp-service-prod.ol.epicgames.com",
        "PingInterval": 60
      },
      "RateLimiter.WeblinksClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "CreateWeblinkSession"
        ]
      },
      "RateLimiter.CustomInvitesClient.IncomingOperations": {
        "MessageCount": 30,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "HandleCustomInviteMessageReceived",
          "HandleSignalMessageReceived"
        ]
      },
      "RateLimiter.SDKConfigClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.EcomClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "QueryOwnership",
          "QueryOwnershipToken",
          "QueryEntitlement",
          "QueryOffer",
          "RedeemEntitlements",
          "Checkout"
        ]
      },
      "PresenceClient": {
        "EpicConnectNotificationWaitTime": 5,
        "PresenceQueryTimeoutSeconds": 60,
        "bSetOfflineOnLogoutEnabled": true,
        "PresenceAutoUpdateInSeconds": 600,
        "bSetOfflineOnShutdownEnabled": true
      },
      "RateLimiter.CustomInvitesClient": {
        "MessageCount": 50,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.ModsClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.ConnectClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "LoginAccount",
          "CreateAccount",
          "LinkAccount",
          "UnlinkAccount",
          "CreateDeviceId",
          "DeleteDeviceId",
          "TransferDeviceIdAccount",
          "QueryExternalAccountMappings",
          "QueryProductUserIdMappings",
          "VerifyIdToken",
          "RequestExchangeToken"
        ]
      },
      "RateLimiter.AuthClient.SensitiveOperations": {
        "MessageCount": 12,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "GenerateUserAuth"
        ]
      },
      "RateLimiter.ReportsClient": {
        "MessageCount": 100,
        "TimeIntervalInSeconds": 60
      }
    },
    "services": {
      "DataStorageService": {
        "BaseUrl": "https://api.epicgames.dev/datastorage"
      },
      "AccountsEpicIdService": {
        "BaseUrl": "https://api.epicgames.dev"
      },
      "AntiCheatService": {
        "BaseUrl": "https://api.epicgames.dev/anticheat"
      },
      "PartiesInternalService": {
        "BaseUrl": "https://api.epicgames.dev/epic/party/internal"
      },
      "LobbyService": {
        "BaseUrl": "https://api.epicgames.dev/lobby"
      },
      "StatsAchievementsService": {
        "BaseUrl": "https://api.epicgames.dev/stats"
      },
      "PriceEngineService": {
        "BaseUrl": "https://priceengine-public-service-ecomprod01.ol.epicgames.com/priceengine"
      },
      "MatchmakingService": {
        "BaseUrl": "https://api.epicgames.dev/epic/matchmaking"
      },
      "AccountsService": {
        "BaseUrl": "https://egp-idsoc-proxy-prod.ol.epicgames.com/account",
        "RedirectUrl": "accounts.epicgames.com"
      },
      "PartiesService": {
        "BaseUrl": "https://api.epicgames.dev/epic/party"
      },
      "EcommerceEpicIdService": {
        "BaseUrl": "https://api.epicgames.dev/epic/ecom"
      },
      "PaymentEpicIdService": {
        "BaseUrl": "https://api.epicgames.dev/epic/payment"
      },
      "SanctionsService": {
        "BaseUrl": "https://api.epicgames.dev/sanctions"
      },
      "FriendService": {
        "BaseUrl": "https://egp-idsoc-proxy-prod.ol.epicgames.com/friends"
      },
      "TextChatTrustedServerFNService": {
        "BaseUrl": "https://api.epicgames.dev/epic/chat"
      },
      "ReceiptValidatorService": {
        "BaseUrl": "https://api.epicgames.dev/receipt-validator"
      },
      "RTCService": {
        "BaseUrl": "https://api.epicgames.dev/rtc"
      },
      "WeblinksService": {
        "BaseUrl": "https://api.epicgames.dev/external-session-sync"
      },
      "MetricsService": {
        "BaseUrl": "https://api.epicgames.dev/datarouter"
      },
      "PostPartyService": {
        "BaseUrl": "https://global-postparty.game-social.epicgames.com"
      },
      "EcommerceService": {
        "BaseUrl": "https://ecommerceintegration-public-service-ecomprod02.ol.epicgames.com/ecommerceintegration"
      },
      "EULATrackingService": {
        "BaseUrl": "https://eulatracking-public-service-prod06.ol.epicgames.com/eulatracking"
      },
      "FriendEpicIdService": {
        "BaseUrl": "https://api.epicgames.dev/epic/friends"
      },
      "CatalogService": {
        "BaseUrl": "https://catalog-public-service-prod06.ol.epicgames.com/catalog"
      },
      "KWSService": {
        "BaseUrl": "https://api.epicgames.dev/kws"
      },
      "TextChatFNService": {
        "BaseUrl": "https://api.epicgames.dev/epic/chat"
      },
      "GalleryService": {
        "BaseUrl": "https://gallery-service-prod.social.live.on.epicgames.com"
      },
      "EOSAuthService": {
        "BaseUrl": "https://api.epicgames.dev"
      },
      "SessionsService": {
        "BaseUrl": "https://api.epicgames.dev/matchmaking"
      },
      "ModsService": {
        "BaseUrl": "https://api.epicgames.dev/mods"
      },
      "ReportsService": {
        "BaseUrl": "https://api.epicgames.dev/player-reports"
      },
      "ProgressionSnapshotService": {
        "BaseUrl": "https://api.epicgames.dev/snapshots"
      },
      "CustomInvitesService": {
        "BaseUrl": "https://api.epicgames.dev/notifications"
      },
      "PresenceService": {
        "BaseUrl": "https://api.epicgames.dev/epic/presence"
      },
      "TitleStorageService": {
        "BaseUrl": "https://api.epicgames.dev/titlestorage"
      },
      "StatsIngestService": {
        "BaseUrl": "https://api.epicgames.dev/ingestion/stats"
      },
      "TextChatGatewayServerFNService": {
        "BaseUrl": "https://fngw-svc-ds-livefn.ol.epicgames.com/chat"
      },
      "LeaderboardsService": {
        "BaseUrl": "https://api.epicgames.dev/leaderboards"
      },
      "InventoryService": {
        "BaseUrl": "https://api.epicgames.dev/inventory"
      }
    },
    "watermark": -287380011
  })
  },

  eossdkv1product: function (req, res) {
    res.json({
      "client": {
        "BaseService": {
          "HttpRetryLimit": 4,
          "HttpRetryResponseCodes": [
            429,
            503,
            504
          ]
        },
        "RateLimiter.AuthClient": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60
        },
        "RateLimiter.PresenceClient.Operations": {
          "MessageCount": 3,
          "TimeIntervalInSeconds": 20,
          "Operation": [
            "SendUpdate",
            "SetPresence"
          ]
        },
        "RateLimiter.ReceiptValidatorClient": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60
        },
        "RateLimiter.LeaderboardsClient": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60
        },
        "RateLimiter.MetricsClient": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60
        },
        "RateLimiter.StatsClient": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60
        },
        "RateLimiter.InventoryClient": {
          "MessageCount": 1000,
          "TimeIntervalInSeconds": 60
        },
        "RateLimiter.MatchmakingClient": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60
        },
        "RateLimiter.SDKConfigClient.Operations": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "RequestUpdate"
          ]
        },
        "RateLimiter.WorldInventoryClient": {
          "MessageCount": 1000,
          "TimeIntervalInSeconds": 60
        },
        "RateLimiter.TitleStorageClient": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60
        },
        "RateLimiter.EcomClient": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60
        },
        "RateLimiter.DataStorageClient.Operations": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "GetAccessLinks",
            "QueryFile",
            "QueryFileList",
            "CopyFile",
            "DeleteFile",
            "ReadFile",
            "WriteFile",
            "DownloadFileRedirected",
            "UploadFileRedirected"
          ]
        },
        "LeaderboardsClient": {
          "MaxUserScoresQueryUserIds": 100,
          "MaxUserScoresQueryStats": 25
        },
        "RateLimiter.CustomInvitesClient.Operations": {
          "MessageCount": 50,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "SendCustomInvite"
          ]
        },
        "HTTP": {
          "HttpReceiveTimeout": 30,
          "bEnableHttp": true,
          "HttpTimeout": 30,
          "HttpConnectionTimeout": 60,
          "HttpSendTimeout": 30,
          "MaxFlushTimeSeconds": 2
        },
        "RateLimiter.FriendClient.Operations": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "QueryFriends",
            "SendFriendInvite",
            "DeleteFriend"
          ]
        },
        "RateLimiter.RTCAdminClient": {
          "MessageCount": 50,
          "TimeIntervalInSeconds": 60
        },
        "RateLimiter.UserInfoClient": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60
        },
        "/Script/Engine.NetworkSettings": {
          "n.VerifyPeer": false
        },
        "WebSockets.LibWebSockets": {
          "ThreadStackSize": 131072,
          "ThreadTargetFrameTimeInSeconds": 0.0333,
          "ThreadMinimumSleepTimeInSeconds": 0
        },
        "StatsClient": {
          "MaxQueryStatsStatNamesStrLength": 1900
        },
        "RateLimiter.MetricsClient.Operations": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "RegisterPlayerBackendSession"
          ]
        },
        "RateLimiter.DataStorageClient": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60
        },
        "WorldInventoryClient": {
          "MaxNumberOfParallelUpdateRequestsInFlight": 3,
          "SessionLockTTLSeconds": 60,
          "MaxNumberOfParallelQueryRequestsInFlight": 10,
          "MaxNumberOfLockEntriesPerRequest": 10,
          "MaxNumberOfWriteEntriesPerRequest": 10,
          "SessionLockUpdateIntervalRandomAddSeconds": 20,
          "MaxNumberOfParallelLockRequestsInFlight": 3,
          "SessionLockUpdateIntervalSeconds": 30,
          "MaxNumberOfSubTasksPerParallelUpdateTask": 20,
          "MaxNumberOfSubTasksPerParallelLockTask": 20,
          "QueryInventoryPageLimit": 0,
          "MaxBinaryDataSizeBytes": 10485760,
          "HttpRetryResponseCodes": [
            429,
            500,
            503,
            504
          ],
          "LockType": "Session"
        },
        "SanitizerClient": {
          "ReplaceChar": "*",
          "RequestLimit": 10
        },
        "RateLimiter.ModsClient.Operations": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "InstallMod",
            "UninstallMod",
            "UpdateMod",
            "EnumerateMods"
          ]
        },
        "RateLimiter.ReportsClient.Operations": {
          "MessageCount": 100,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "SendPlayerBehaviorReport"
          ]
        },
        "RateLimiter.RTCAdminClient.Operations": {
          "MessageCount": 50,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "QueryJoinRoomToken",
            "Kick",
            "SetParticipantHardMute"
          ]
        },
        "RateLimiter.K3SClient": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60
        },
        "RateLimiter.FriendClient": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60
        },
        "RateLimiter.AchievementsClient": {
          "MessageCount": 100,
          "TimeIntervalInSeconds": 60
        },
        "LogFiles": {
          "PurgeLogsDays": 5,
          "MaxLogFilesOnDisk": 5,
          "LogTimes": "SinceStart"
        },
        "RateLimiter": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60
        },
        "RateLimiter.AntiCheatClient": {
          "MessageCount": 120,
          "TimeIntervalInSeconds": 60
        },
        "RateLimiter.ProgressionSnapshot": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60
        },
        "SessionsClient": {
          "HeartbeatIntervalSecs": 30
        },
        "RateLimiter.WorldInventoryClient.Operations": {
          "MessageCount": 1000,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "Open",
            "Close",
            "Write",
            "WriteTransaction",
            "QueryVersionMetadata"
          ]
        },
        "InventoryClient.WorldInventory": {
          "MaxNumberOfParallelUpdateRequestsInFlight": 3,
          "SessionLockTTLSeconds": 60,
          "MaxNumberOfParallelQueryRequestsInFlight": 10,
          "MaxNumberOfLockEntriesPerRequest": 10,
          "MaxNumberOfWriteEntriesPerRequest": 10,
          "SessionLockUpdateIntervalRandomAddSeconds": 20,
          "MaxNumberOfParallelLockRequestsInFlight": 3,
          "SessionLockUpdateIntervalSeconds": 30,
          "MaxNumberOfSubTasksPerParallelUpdateTask": 20,
          "MaxNumberOfSubTasksPerParallelLockTask": 20,
          "QueryInventoryPageLimit": 0,
          "MaxBinaryDataSizeBytes": 10485760,
          "LockType": "Session"
        },
        "RateLimiter.UserInfoClient.Operations": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "QueryLocalUserInfo",
            "QueryUserInfo",
            "QueryUserInfoByDisplayName",
            "QueryUserInfoByExternalAccount"
          ]
        },
        "LobbyClient": {
          "InitialResendDelayMs": 100,
          "MaxConnectionRetries": 3,
          "LobbySocketURL": "wss://api.epicgames.dev/lobby/v1/`deploymentId/lobbies/connect",
          "NumConsecutiveFailuresAllowed": 5,
          "MaxResendDelayMs": 2000,
          "WebSocketConnectTaskMaxNetworkWaitSeconds": 15,
          "RecoveryWaitTimeSecs": 2,
          "InitialRetryDelaySeconds": 5,
          "bDisableRTCVoice": false,
          "MaxSendRetries": 3,
          "SentMessageTimeout": 5,
          "HeartbeatIntervalSecs": 30,
          "MaxRetryIntervalSeconds": 15
        },
        "RateLimiter.SanctionsClient.Operations": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "QueryActivePlayerSanctions"
          ]
        },
        "UIClient.SocialURLQueryParamNames": {
          "OSName": "os_name",
          "ProductId": "product_id",
          "SDKCLNumber": "sdk_cl_number",
          "DeploymentId": "deployment_id",
          "IntegratedPlatformName": "integrated_platform_name",
          "SDKVersion": "sdk_version",
          "OSVersion": "os_version",
          "UserId": "user_id",
          "ExchangeCode": "exchange_code"
        },
        "RateLimiter.LobbyClient.ThrottledOperations": {
          "MessageCount": 30,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "CreateLobby",
            "DestroyLobby",
            "JoinLobby",
            "LeaveLobby",
            "HeartbeatLobby",
            "UpdateLobby",
            "PromoteMember",
            "KickLobbyMember",
            "SendLobbyInvite",
            "RejectLobbyInvite",
            "QueryInvites",
            "FindLobby",
            "RefreshRTCToken",
            "HardMuteMember"
          ]
        },
        "RateLimiter.SessionsClient": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60
        },
        "RateLimiter.KWSClient": {
          "MessageCount": 20,
          "TimeIntervalInSeconds": 60
        },
        "RateLimiter.PresenceClient": {
          "MessageCount": 60,
          "TimeIntervalInSeconds": 60
        },
        "RateLimiter.KWSClient.Operations": {
          "MessageCount": 20,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "CreateUser",
            "UpdateParentEmail",
            "QueryAgeGate",
            "QueryPermissions",
            "RequestPermissions"
          ]
        },
        "RateLimiter.InventoryClient.Operations": {
          "MessageCount": 1000,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "Open",
            "Close",
            "Write"
          ]
        },
        "RateLimiter.LeaderboardsClient.Operations": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "QueryLeaderboardDefinitions",
            "QueryLeaderboardRanks",
            "QueryLeaderboardUserScores"
          ]
        },
        "RateLimiter.SanctionsClient": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60
        },
        "Messaging.EpicConnect": {
          "FailedConnectionDelayMultiplier": 2.5,
          "ServerHeartbeatIntervalMilliseconds": 0,
          "FailedConnectionDelayMaxSeconds": 180,
          "ClientHeartbeatIntervalMilliseconds": 30000,
          "FailedConnectionDelayIntervalSeconds": 5,
          "Url": "wss://connect.epicgames.dev"
        },
        "MetricsClient": {
          "HttpRetryLimit": 2
        },
        "RateLimiter.TitleStorageClient.Operations": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "QueryFile",
            "QueryFileList",
            "ReadFile"
          ]
        },
        "RateLimiter.AchievementsClient.Operations": {
          "MessageCount": 100,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "QueryDefinitions",
            "QueryPlayerAchievements",
            "UnlockAchievements"
          ]
        },
        "Messaging.Stomp": {
          "ClientHeartbeatIntervalMs": 30000,
          "RequestedServerHeartbeatIntervalMs": 0,
          "Url": "",
          "BlocklistMessageTypeFilters": [
            "lobbyinvite"
          ]
        },
        "TitleStorageClient": {
          "AccessLinkDurationSeconds": 300,
          "UnusedCachedFileDaysToLive": 7,
          "ClearInvalidFileCacheFrequencyDays": 2,
          "MaxSimultaneousReads": 10
        },
        "ConnectClient": {
          "MaxProductUserIdMappingsQueryUserIds": 128,
          "MinProductUserIdMappingsUpdateTimeInSeconds": 900
        },
        "RateLimiter.LobbyClient.Operations": {
          "MessageCount": 100,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "GetByLobbyId",
            "UpdateLobby"
          ]
        },
        "RateLimiter.AntiCheatClient.Operations": {
          "MessageCount": 120,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "QueryServiceStatus",
            "SendClientMessage"
          ]
        },
        "EcomClient": {
          "PurchaseCookieName": "EPIC_BEARER_TOKEN",
          "PurchaseEpicIdMobileLandscapeUrl": "https://www.epicgames.com/ecom/payment/v1/purchase",
          "PurchaseEpicIdMobilePortraitUrl": "https://www.epicgames.com/ecom/payment/v2/purchase",
          "PurchaseEpicIdUrl": "https://www.epicgames.com/ecom/payment/v1/purchase",
          "PurchaseUrl": "https://launcher-website-prod07.ol.epicgames.com/purchase"
        },
        "RateLimiter.SessionsClient.Operations": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "UpdateSession",
            "JoinSession",
            "StartSession",
            "EndSession",
            "RegisterPlayers",
            "SendInvite",
            "RejectInvite",
            "QueryInvites",
            "FindSession",
            "DestroySession"
          ]
        },
        "RateLimiter.StatsClient.Operations": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "IngestStat",
            "QueryStats"
          ]
        },
        "RateLimiter.ReceiptValidatorClient.Operations": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "VerifyPurchase"
          ]
        },
        "DataStorageClient": {
          "AccessLinkDurationSeconds": 300,
          "MaxSimultaneousReads": 10,
          "MaxSimultaneousWrites": 10
        },
        "RateLimiter.AuthClient.Operations": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "VerifyAuth",
            "DeletePersistentAuth",
            "GenerateClientAuth",
            "LinkAccount",
            "QueryIdToken",
            "VerifyIdToken"
          ]
        },
        "InventoryClient": {
          "MaxNumberOfParallelUpdateRequestsInFlight": 3,
          "SessionLockTTLSeconds": 60,
          "MaxNumberOfLockEntriesPerRequest": 10,
          "MaxNumberOfWriteEntriesPerRequest": 10,
          "SessionLockUpdateIntervalRandomAddSeconds": 20,
          "MaxNumberOfParallelLockRequestsInFlight": 3,
          "SessionLockUpdateIntervalSeconds": 30,
          "MaxNumberOfSubTasksPerParallelLockTask": 20,
          "HttpRetryResponseCodes": [
            429,
            500,
            503,
            504
          ],
          "LockType": "Session",
          "BaseUrl": "https://api.epicgames.dev/inventory",
          "MaxNumberOfSubTasksPerParallelUpdateTask": 20,
          "QueryInventoryPageLimit": 0,
          "HttpRetryVerbs": [
            "GET",
            "HEAD",
            "POST"
          ]
        },
        "P2PClient": {
          "IceServers": [
            "stun:stun.l.google.com:19302",
            "stun:turn.rtcp.on.epicgames.com:3478",
            "turn:turn.rtcp.on.epicgames.com:3478"
          ],
          "P2PMinPort": 7777,
          "P2PMaxPort": 7876
        },
        "RateLimiter.LobbyClient": {
          "MessageCount": 30,
          "TimeIntervalInSeconds": 60
        },
        "SDKAnalytics": {
          "BaseUrl": "https://api.epicgames.dev/telemetry/data/",
          "DevPhase": 2,
          "AppEnvironment": "Production",
          "UploadType": "sdkevents"
        },
        "RateLimiter.ConnectClient": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60
        },
        "AntiCheat.GameplayData": {
          "Url": "wss://api.epicgames.dev/cerberus-edge/v1/"
        },
        "AuthClient": {
          "AccountPortalURLLocaleSuffix": "lang=`code",
          "PollInterval": 5,
          "RefreshTokenThreshold": 100,
          "VPCRegisterURL": "https://epicgames.com/id/register/quick/minor/await?code=`challenge_id&display=embedded",
          "AuthorizeContinuationEndpoint": "https://epicgames.com/id/login?continuation=`continuation&prompt=skip_merge%20skip_upgrade",
          "AuthorizeCodeEndpoint": "https://epicgames.com/id/authorize?client_id=`client_id&response_type=code&scope=`scope&redirect_uri=`redirect_uri&display=popup&prompt=login",
          "VerifyTokenInterval": 60,
          "PollExpiresIn": 300,
          "IdTokenCacheMinExpirySeconds": 300,
          "AuthorizeEndpoint": "https://epicgames.com/id/authorize?exchange_code=`exchange_code&scope=`scope&prompt=skip_merge%20skip_upgrade",
          "AccountPortalScheme": "eos.`client_id://epic/auth",
          "bOfflineAccountToken": true,
          "bFailLoginIfExternalAccountIdDoesNotMatchAuthToken": false,
          "AuthorizeContinuationEmbeddedEndpoint": "https://epicgames.com/id/embedded/login?continuation=`continuation&prompt=skip_merge%20skip_upgrade"
        },
        "RateLimiter.ProgressionSnapshot.Operations": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "SubmitSnapshot",
            "DeleteSnapshot"
          ]
        },
        "XMPP": {
          "bEnabled": true,
          "bEnableWebsockets": true,
          "ThreadStackSize": 131072
        },
        "RateLimiter.AntiCheatServer.Operations": {
          "MessageCount": 100000,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "QueryServiceStatus",
            "SendClientMessage"
          ]
        },
        "RateLimiter.MatchmakingClient.Operations": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "SessionRegister",
            "SessionDeregister",
            "SessionAcknowledgeAssignment",
            "TicketJoin",
            "TicketClose",
            "SessionHeartbeat",
            "TicketHeartbeat"
          ]
        },
        "K3SClient.RemainingPlaytimeLimits": {
          "play": [
            1800,
            900,
            600,
            120,
            0
          ],
          "create": [
            1800,
            900,
            600,
            120,
            0
          ]
        },
        "Core.Log": {
          "LogEOS": "verbose",
          "LogEOSMessaging": "verbose",
          "LogEOSConnect": "verbose",
          "LogEOSAuth": "verbose",
          "LogHttpSerialization": "verbose",
          "LogCore": "verbose",
          "LogHttp": "warning",
          "LogStomp": "verbose",
          "LogXmpp": "verbose",
          "LogEOSSessions": "verbose"
        },
        "UIClient": {
          "FriendsURL": "https://overlay-override-service.cbce.live.on.epicgames.com/",
          "SocialSPAClientId": "cf27c69fe66441e8a8a4e8faf396ee4c",
          "VPCURLLocaleSuffix": "&lang=`code",
          "FriendsURLExchangeCodeSuffix": "?exchange_code=`exchange_code",
          "VPCURL": "https://epicgames.com/id/overlay/quick/minor/verify?code=`challenge_id"
        },
        "RateLimiter.AntiCheatServer": {
          "MessageCount": 100000,
          "TimeIntervalInSeconds": 60
        },
        "RateLimiter.InventoryClient.WorldInventory.Operations": {
          "MessageCount": 1000,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "WorldOpen",
            "WorldClose",
            "WorldWrite",
            "WriteTransaction",
            "QueryVersionMetadata"
          ]
        },
        "Messaging.XMPP": {
          "ReconnectionDelayJitter": 1.5,
          "PingTimeout": 30,
          "ReconnectionDelayBase": 4,
          "ServerPort": 443,
          "bPrivateChatFriendsOnly": true,
          "ReconnectionDelayMax": 300,
          "Domain": "prod.ol.epicgames.com",
          "ReconnectionDelayBackoffExponent": 2,
          "ServerAddr": "wss://xmpp-service-prod.ol.epicgames.com",
          "PingInterval": 60
        },
        "RateLimiter.K3SClient.Operations": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "QuerySettings",
            "UpdateSettings",
            "RequestAdditionalPlaytime",
            "GrantAdditionalPlaytime"
          ]
        },
        "RateLimiter.SDKConfigClient": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60
        },
        "RateLimiter.EcomClient.Operations": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "QueryOwnership",
            "QueryOwnershipToken",
            "QueryEntitlement",
            "QueryOffer",
            "RedeemEntitlements",
            "Checkout"
          ]
        },
        "PresenceClient": {
          "EpicConnectNotificationWaitTime": 5,
          "PresenceQueryTimeoutSeconds": 60,
          "bSetOfflineOnLogoutEnabled": true,
          "PresenceAutoUpdateInSeconds": 600,
          "bSetOfflineOnShutdownEnabled": true
        },
        "RateLimiter.CustomInvitesClient": {
          "MessageCount": 50,
          "TimeIntervalInSeconds": 60
        },
        "RateLimiter.ModsClient": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60
        },
        "RateLimiter.ConnectClient.Operations": {
          "MessageCount": 300,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "LoginAccount",
            "CreateAccount",
            "LinkAccount",
            "UnlinkAccount",
            "CreateDeviceId",
            "DeleteDeviceId",
            "TransferDeviceIdAccount",
            "QueryExternalAccountMappings",
            "QueryProductUserIdMappings",
            "VerifyIdToken",
            "RequestExchangeToken"
          ]
        },
        "RateLimiter.AuthClient.SensitiveOperations": {
          "MessageCount": 12,
          "TimeIntervalInSeconds": 60,
          "Operation": [
            "GenerateUserAuth"
          ]
        },
        "RateLimiter.ReportsClient": {
          "MessageCount": 100,
          "TimeIntervalInSeconds": 60
        }
      },
      "services": {
        "RTCService": {
          "BaseUrl": "https://api.epicgames.dev/rtc"
        },
        "DataStorageService": {
          "BaseUrl": "https://api.epicgames.dev/datastorage"
        },
        "AccountsEpicIdService": {
          "BaseUrl": "https://api.epicgames.dev"
        },
        "MetricsService": {
          "BaseUrl": "https://api.epicgames.dev/datarouter"
        },
        "EcommerceService": {
          "BaseUrl": "https://ecommerceintegration-public-service-ecomprod02.ol.epicgames.com/ecommerceintegration"
        },
        "LobbyService": {
          "BaseUrl": "https://api.epicgames.dev/lobby"
        },
        "StatsAchievementsService": {
          "BaseUrl": "https://api.epicgames.dev/stats"
        },
        "PriceEngineService": {
          "BaseUrl": "https://priceengine-public-service-ecomprod01.ol.epicgames.com/priceengine"
        },
        "MatchmakingService": {
          "BaseUrl": "https://api.epicgames.dev/epic/matchmaking"
        },
        "AccountsService": {
          "BaseUrl": "https://egp-idsoc-proxy-prod.ol.epicgames.com/account",
          "RedirectUrl": "accounts.epicgames.com"
        },
        "EcommerceEpicIdService": {
          "BaseUrl": "https://api.epicgames.dev/epic/ecom"
        },
        "PaymentEpicIdService": {
          "BaseUrl": "https://api.epicgames.dev/epic/payment"
        },
        "SanctionsService": {
          "BaseUrl": "https://api.epicgames.dev/sanctions"
        },
        "FriendService": {
          "BaseUrl": "https://egp-idsoc-proxy-prod.ol.epicgames.com/friends"
        },
        "TextChatTrustedServerFNService": {
          "BaseUrl": "https://api.epicgames.dev/epic/chat"
        },
        "ReceiptValidatorService": {
          "BaseUrl": "https://api.epicgames.dev/receipt-validator"
        },
        "FriendEpicIdService": {
          "BaseUrl": "https://api.epicgames.dev/epic/friends"
        },
        "CatalogService": {
          "BaseUrl": "https://catalog-public-service-prod06.ol.epicgames.com/catalog"
        },
        "KWSService": {
          "BaseUrl": "https://api.epicgames.dev/kws"
        },
        "TextChatFNService": {
          "BaseUrl": "https://api.epicgames.dev/epic/chat"
        },
        "PlaytimeTrackingService": {
          "BaseUrl": "https://api.kws.ol.epicgames.com"
        },
        "AntiCheatService": {
          "BaseUrl": "https://api.epicgames.dev/anticheat"
        },
        "EOSAuthService": {
          "BaseUrl": "https://api.epicgames.dev"
        },
        "SessionsService": {
          "BaseUrl": "https://api.epicgames.dev/matchmaking"
        },
        "ModsService": {
          "BaseUrl": "https://api.epicgames.dev/mods"
        },
        "ReportsService": {
          "BaseUrl": "https://api.epicgames.dev/player-reports"
        },
        "ProgressionSnapshotService": {
          "BaseUrl": "https://api.epicgames.dev/snapshots"
        },
        "CustomInvitesService": {
          "BaseUrl": "https://api.epicgames.dev/notifications"
        },
        "PresenceService": {
          "BaseUrl": "https://api.epicgames.dev/epic/presence"
        },
        "TitleStorageService": {
          "BaseUrl": "https://api.epicgames.dev/titlestorage"
        },
        "StatsIngestService": {
          "BaseUrl": "https://api.epicgames.dev/ingestion/stats"
        },
        "SupervisedSettingsService": {
          "BaseUrl": "https://api.kws.ol.epicgames.com"
        },
        "LeaderboardsService": {
          "BaseUrl": "https://api.epicgames.dev/leaderboards"
        },
        "InventoryService": {
          "BaseUrl": "https://api.epicgames.dev/inventory"
        }
      },
      "watermark": 912979307
    })
  },

  eossdkv1productprod: function (req, res) {
    res.json({
    "client": {
      "BaseService": {
        "HttpRetryLimit": 4,
        "HttpRetryResponseCodes": [
          429,
          503,
          504
        ]
      },
      "RateLimiter.PresenceClient.Operations": {
        "MessageCount": 6,
        "TimeIntervalInSeconds": 10,
        "Operation": [
          "SendUpdate",
          "SetPresence"
        ]
      },
      "RateLimiter.ReceiptValidatorClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.StatsClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.InventoryClient": {
        "MessageCount": 1000,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.MatchmakingClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.SDKConfigClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "RequestUpdate"
        ]
      },
      "RateLimiter.WorldInventoryClient": {
        "MessageCount": 1000,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.TitleStorageClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.EcomClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.DataStorageClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "GetAccessLinks",
          "QueryFile",
          "QueryFileList",
          "CopyFile",
          "DeleteFile",
          "ReadFile",
          "WriteFile",
          "DownloadFileRedirected",
          "UploadFileRedirected"
        ]
      },
      "LeaderboardsClient": {
        "MaxUserScoresQueryUserIds": 100,
        "MaxUserScoresQueryStats": 25
      },
      "RateLimiter.CustomInvitesClient.Operations": {
        "MessageCount": 50,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "SendCustomInvite"
        ]
      },
      "RateLimiter.PartiesInternalClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "HTTP": {
        "HttpReceiveTimeout": 30,
        "bEnableHttp": true,
        "HttpTimeout": 30,
        "HttpConnectionTimeout": 60,
        "HttpSendTimeout": 30,
        "MaxFlushTimeSeconds": 2
      },
      "RateLimiter.FriendClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "QueryFriends",
          "SendFriendInvite",
          "DeleteFriend"
        ]
      },
      "RateLimiter.RTCAdminClient": {
        "MessageCount": 50,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.UserInfoClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "TextChatClientFN": {
        "MaxConversationMessagesToQuery": 30,
        "MaxConversationTypesToQuery": 3
      },
      "RateLimiter.AuthClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "/Script/Engine.NetworkSettings": {
        "n.VerifyPeer": false
      },
      "RateLimiter.PartiesInternalClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "CreateParty",
          "JoinParty",
          "UpdateParty",
          "SendInvite",
          "DeclineInvite",
          "SendJoinRequest",
          "LeaveParty",
          "DisconnectFromParty",
          "JoinPartyByGroup",
          "UpdateUserPrivacySettings",
          "QueryUserPartyInfo"
        ]
      },
      "WebSockets.LibWebSockets": {
        "ThreadStackSize": 131072,
        "ThreadTargetFrameTimeInSeconds": 0.0333,
        "ThreadMinimumSleepTimeInSeconds": 0
      },
      "StatsClient": {
        "MaxQueryStatsStatNamesStrLength": 1900
      },
      "EcomClient.EcomSalesMappings": {
        "defaultStore": "EGA",
        "com.epicgames.portal": "EGA",
        "com.epicgames.store": "EGA"
      },
      "RateLimiter.MetricsClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "RegisterPlayerBackendSession"
        ]
      },
      "RateLimiter.DataStorageClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "WorldInventoryClient": {
        "MaxBinaryDataSizeBytes": 104857600,
        "BaseUrlLive": "https://fngw-svc-ds-livefn.ol.epicgames.com/api/inventory"
      },
      "SanitizerClient": {
        "ReplaceChar": "*",
        "RequestLimit": 10
      },
      "RateLimiter.ModsClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "InstallMod",
          "UninstallMod",
          "UpdateMod",
          "EnumerateMods"
        ]
      },
      "RateLimiter.ReportsClient.Operations": {
        "MessageCount": 100,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "SendPlayerBehaviorReport"
        ]
      },
      "RateLimiter.RTCAdminClient.Operations": {
        "MessageCount": 50,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "QueryJoinRoomToken",
          "Kick",
          "SetParticipantHardMute"
        ]
      },
      "RateLimiter.K3SClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.FriendClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.AchievementsClient": {
        "MessageCount": 100,
        "TimeIntervalInSeconds": 60
      },
      "LogFiles": {
        "PurgeLogsDays": 5,
        "MaxLogFilesOnDisk": 5,
        "LogTimes": "SinceStart"
      },
      "RateLimiter": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.AntiCheatClient": {
        "MessageCount": 120,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.TextChatServerFN.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "CreateConversationFN",
          "DeleteConversationFN",
          "AddConversationMembersFN",
          "RemoveConversationMembersFN"
        ]
      },
      "RateLimiter.ProgressionSnapshot": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "SessionsClient": {
        "HeartbeatIntervalSecs": 30
      },
      "RateLimiter.WorldInventoryClient.Operations": {
        "MessageCount": 1000,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "Open",
          "Close",
          "Write",
          "WriteTransaction",
          "QueryVersionMetadata"
        ]
      },
      "InventoryClient.WorldInventory": {
        "MaxBinaryDataSizeBytes": 104857600,
        "BaseUrlLive": "https://fngw-svc-ds-livefn.ol.epicgames.com/api/inventory"
      },
      "RateLimiter.UserInfoClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "QueryLocalUserInfo",
          "QueryUserInfo",
          "QueryUserInfoByDisplayName",
          "QueryUserInfoByExternalAccount"
        ]
      },
      "LobbyClient": {
        "InitialResendDelayMs": 100,
        "MaxConnectionRetries": 3,
        "LobbySocketURL": "wss://api.epicgames.dev/lobby/v1/`deploymentId/lobbies/connect",
        "NumConsecutiveFailuresAllowed": 5,
        "MaxResendDelayMs": 2000,
        "WebSocketConnectTaskMaxNetworkWaitSeconds": 15,
        "RecoveryWaitTimeSecs": 2,
        "InitialRetryDelaySeconds": 5,
        "bDisableRTCVoice": false,
        "MaxSendRetries": 3,
        "SentMessageTimeout": 5,
        "HeartbeatIntervalSecs": 30,
        "MaxRetryIntervalSeconds": 15
      },
      "RateLimiter.SanctionsClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "QueryActivePlayerSanctions"
        ]
      },
      "UIClient.SocialURLQueryParamNames": {
        "OSName": "os_name",
        "ProductId": "product_id",
        "SDKCLNumber": "sdk_cl_number",
        "DeploymentId": "deployment_id",
        "IntegratedPlatformName": "integrated_platform_name",
        "SDKVersion": "sdk_version",
        "OSVersion": "os_version",
        "UserId": "user_id",
        "ExchangeCode": "exchange_code"
      },
      "RateLimiter.LobbyClient.ThrottledOperations": {
        "MessageCount": 30,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "CreateLobby",
          "DestroyLobby",
          "JoinLobby",
          "LeaveLobby",
          "HeartbeatLobby",
          "PromoteMember",
          "KickLobbyMember",
          "SendLobbyInvite",
          "RejectLobbyInvite",
          "QueryInvites",
          "FindLobby",
          "RefreshRTCToken",
          "HardMuteMember"
        ]
      },
      "RateLimiter.SessionsClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.KWSClient": {
        "MessageCount": 20,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.PresenceClient": {
        "MessageCount": 60,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.KWSClient.Operations": {
        "MessageCount": 20,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "CreateUser",
          "UpdateParentEmail",
          "QueryAgeGate",
          "QueryPermissions",
          "RequestPermissions"
        ]
      },
      "RateLimiter.InventoryClient.Operations": {
        "MessageCount": 1000,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "Open",
          "Close"
        ]
      },
      "RateLimiter.LeaderboardsClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "QueryLeaderboardDefinitions",
          "QueryLeaderboardRanks",
          "QueryLeaderboardUserScores"
        ]
      },
      "RateLimiter.SanctionsClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "Messaging.EpicConnect": {
        "FailedConnectionDelayMultiplier": 2.5,
        "RetryBackoffExponentialExponentBias": 0,
        "ServerHeartbeatIntervalMilliseconds": 0,
        "RetryBackoffMaxSeconds": 180,
        "RetryBackoffJitterCoefficientMin": 0.5,
        "Urlv2": "wss://connect.epicgames.dev/v2",
        "ClientHeartbeatIntervalMilliseconds": 30000,
        "RetryBackoffExponentialBase": 2,
        "RetryBackoffJitterCoefficientMax": 1,
        "FailedConnectionDelayMaxSeconds": 180,
        "FailedConnectionDelayIntervalSeconds": 5,
        "UseV2Connection": false,
        "Url": "wss://connect.epicgames.dev"
      },
      "MetricsClient": {
        "HttpRetryLimit": 2
      },
      "RateLimiter.TitleStorageClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "QueryFile",
          "QueryFileList",
          "ReadFile"
        ]
      },
      "RateLimiter.AchievementsClient.Operations": {
        "MessageCount": 100,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "QueryDefinitions",
          "QueryPlayerAchievements",
          "UnlockAchievements"
        ]
      },
      "Messaging.Stomp": {
        "Url": "",
        "ClientHeartbeatIntervalMs": 30000,
        "InitialRetryDelaySeconds": 3600,
        "RequestedServerHeartbeatIntervalMs": 0,
        "MaxRetryIntervalSeconds": 3600
      },
      "TitleStorageClient": {
        "AccessLinkDurationSeconds": 300,
        "UnusedCachedFileDaysToLive": 7,
        "ClearInvalidFileCacheFrequencyDays": 2,
        "MaxSimultaneousReads": 10
      },
      "TrustAndSafety": {
        "bQueryLocalPrivilegeEnabled": false
      },
      "Overlay": {
        "ValidDomains": [
          ".epicgames.com",
          ".epicgames.dev"
        ]
      },
      "ConnectClient": {
        "MaxProductUserIdMappingsQueryUserIds": 128,
        "MinProductUserIdMappingsUpdateTimeInSeconds": 900
      },
      "RateLimiter.LobbyClient.Operations": {
        "MessageCount": 100,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "GetByLobbyId",
          "UpdateLobby"
        ]
      },
      "RateLimiter.AntiCheatClient.Operations": {
        "MessageCount": 120,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "QueryServiceStatus",
          "SendClientMessage"
        ]
      },
      "EcomClient": {
        "PurchaseCookieName": "EPIC_BEARER_TOKEN",
        "PurchaseEpicIdMobileLandscapeUrl": "https://www.epicgames.com/ecom/payment/v2/purchase",
        "PurchaseEpicIdMobilePortraitUrl": "https://www.epicgames.com/ecom/payment/v2/purchase",
        "PurchaseEpicIdUrl": "https://www.epicgames.com/ecom/payment/v1/purchase",
        "PurchaseUrl": "https://launcher-website-prod07.ol.epicgames.com/purchase"
      },
      "RateLimiter.SessionsClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "UpdateSession",
          "JoinSession",
          "StartSession",
          "EndSession",
          "RegisterPlayers",
          "SendInvite",
          "RejectInvite",
          "QueryInvites",
          "FindSession",
          "DestroySession"
        ]
      },
      "RateLimiter.StatsClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "IngestStat",
          "QueryStats"
        ]
      },
      "RateLimiter.WeblinksClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.ReceiptValidatorClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "VerifyPurchase"
        ]
      },
      "DataStorageClient": {
        "AccessLinkDurationSeconds": 300,
        "MaxSimultaneousReads": 10,
        "MaxSimultaneousWrites": 10
      },
      "RateLimiter.AuthClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "VerifyAuth",
          "DeletePersistentAuth",
          "GenerateClientAuth",
          "LinkAccount",
          "QueryIdToken",
          "VerifyIdToken"
        ]
      },
      "InventoryClient": {
        "MaxNumberOfParallelUpdateRequestsInFlight": 3,
        "SessionLockTTLSeconds": 60,
        "bDisableUnlockingAgainAfterSessionLockRefresh": true,
        "MaxNumberOfLockEntriesPerRequest": 10,
        "MaxNumberOfWriteEntriesPerRequest": 10,
        "SessionLockUpdateIntervalRandomAddSeconds": 20,
        "MaxNumberOfParallelLockRequestsInFlight": 3,
        "SessionLockUpdateIntervalSeconds": 30,
        "MaxNumberOfSubTasksPerParallelLockTask": 20,
        "BaseUrlLive": "https://fngw-svc-ds-livefn.ol.epicgames.com/api/inventory",
        "HttpRetryResponseCodes": [
          429,
          500,
          502,
          503,
          504
        ],
        "LockType": "Session",
        "BaseUrl": "https://fngw-svc-ds-livefn.ol.epicgames.com/api/inventory",
        "MaxNumberOfSubTasksPerParallelUpdateTask": 20,
        "QueryInventoryPageLimit": 0,
        "HttpRetryVerbs": [
          "GET",
          "HEAD",
          "POST"
        ]
      },
      "RateLimiter.TextChatServerFN": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "P2PClient": {
        "IceServers": [
          "stun:stun.l.google.com:19302",
          "stun:turn.rtcp.on.epicgames.com:3478",
          "turn:turn.rtcp.on.epicgames.com:3478"
        ],
        "P2PMinPort": 7777,
        "P2PMaxPort": 7876
      },
      "RateLimiter.LobbyClient": {
        "MessageCount": 30,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.TextChatClientFN": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.LeaderboardsClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "SDKAnalytics": {
        "BaseUrl": "https://api.epicgames.dev/telemetry/data/",
        "DevPhase": 2,
        "AppEnvironment": "Production",
        "UploadType": "sdkevents"
      },
      "TextChatServerFN": {
        "TextChatGatewayServerURL": "https://fngw-svc-ds-livefn.ol.epicgames.com/chat"
      },
      "RateLimiter.ConnectClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.TextChatClientFN.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "SendConversationMessageFN",
          "SendDirectMessageFN",
          "QueryPersistentConversationsInfoFN",
          "QueryPersistentConversationInfoFN",
          "QueryConversationMessagesFN",
          "QueryConversationDetailsFN",
          "QueryDirectMessageConversationDetailsFN",
          "CreateConversationFN",
          "ChangeConversationTitleFN",
          "AddConversationMembersFN",
          "RemoveConversationMembersFN",
          "UpdateLastReadMessageFN",
          "UpdateInviteFN",
          "QueryUserConversationSummaryFN",
          "ConfirmPlatformFriendshipFN"
        ]
      },
      "RateLimiter.InventoryClient.ThrottledOperations": {
        "MessageCount": 20000,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "Write"
        ]
      },
      "RateLimiter.MetricsClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "GameClient": {
        "UseGzipEncoding": false
      },
      "AntiCheat.GameplayData": {
        "Url": "wss://api.epicgames.dev/cerberus-edge/v1/",
        "MinCompressibleMessageSize": 4096
      },
      "AuthClient": {
        "AccountPortalURLLocaleSuffix": "lang=`code",
        "PollInterval": 5,
        "RefreshTokenThreshold": 100,
        "VPCRegisterURL": "https://epicgames.com/id/register/quick/minor/await?code=`challenge_id&display=embedded",
        "AuthorizeContinuationEndpoint": "https://epicgames.com/id/login?continuation=`continuation&prompt=skip_merge%20skip_upgrade",
        "AuthorizeCodeEndpoint": "https://epicgames.com/id/authorize?client_id=`client_id&response_type=code&scope=`scope&redirect_uri=`redirect_uri&display=popup&prompt=login",
        "VerifyTokenInterval": 600,
        "PollExpiresIn": 300,
        "IdTokenCacheMinExpirySeconds": 300,
        "AuthorizeEndpoint": "https://epicgames.com/id/authorize?exchange_code=`exchange_code&scope=`scope&prompt=skip_merge%20skip_upgrade",
        "AccountPortalScheme": "eos.`client_id://epic/auth",
        "bOfflineAccountToken": true,
        "bFailLoginIfExternalAccountIdDoesNotMatchAuthToken": false,
        "AuthorizeContinuationEmbeddedEndpoint": "https://epicgames.com/id/embedded/login?continuation=`continuation&prompt=skip_merge%20skip_upgrade"
      },
      "RateLimiter.ProgressionSnapshot.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "SubmitSnapshot",
          "DeleteSnapshot"
        ]
      },
      "XMPP": {
        "bEnabled": true,
        "bEnableWebsockets": true,
        "ThreadStackSize": 131072
      },
      "RateLimiter.AntiCheatServer.Operations": {
        "MessageCount": 100000,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "QueryServiceStatus",
          "SendClientMessage"
        ]
      },
      "RateLimiter.MatchmakingClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "SessionRegister",
          "SessionDeregister",
          "SessionAcknowledgeAssignment",
          "TicketJoin",
          "TicketClose",
          "SessionHeartbeat",
          "TicketHeartbeat"
        ]
      },
      "K3SClient.RemainingPlaytimeLimits": {
        "play": [
          1800,
          900,
          600,
          120,
          0
        ],
        "create": [
          1800,
          900,
          600,
          120,
          0
        ]
      },
      "Core.Log": {
        "LogEOS": "verbose",
        "LogEOSMessaging": "verbose",
        "LogEOSConnect": "verbose",
        "LogEOSAuth": "verbose",
        "LogHttpSerialization": "verbose",
        "LogCore": "verbose",
        "LogHttp": "warning",
        "LogStomp": "verbose",
        "LogXmpp": "verbose",
        "LogEOSSessions": "verbose"
      },
      "UIClient": {
        "FriendsURL": "https://api.epicgames.dev/overlay-override/v1/",
        "SocialSPAClientId": "cf27c69fe66441e8a8a4e8faf396ee4c",
        "VPCURLLocaleSuffix": "&lang=`code",
        "FriendsURLExchangeCodeSuffix": "?exchange_code=`exchange_code",
        "VPCURL": "https://epicgames.com/id/overlay/quick/minor/verify?code=`challenge_id"
      },
      "RateLimiter.AntiCheatServer": {
        "MessageCount": 100000,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.InventoryClient.WorldInventory.Operations": {
        "MessageCount": 1000,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "WorldOpen",
          "WorldClose",
          "WorldWrite",
          "WriteTransaction",
          "QueryVersionMetadata"
        ]
      },
      "MatchmakingClient.SessionConfig": {
        "MaxHeartbeatFailures": 1
      },
      "Messaging.XMPP": {
        "ReconnectionDelayJitter": 1.5,
        "PingTimeout": 30,
        "ReconnectionDelayBase": 4,
        "ServerPort": 443,
        "bPrivateChatFriendsOnly": true,
        "ReconnectionDelayMax": 300,
        "Domain": "prod.ol.epicgames.com",
        "ReconnectionDelayBackoffExponent": 2,
        "ServerAddr": "wss://xmpp-service-prod.ol.epicgames.com",
        "PingInterval": 60
      },
      "RateLimiter.WeblinksClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "CreateWeblinkSession"
        ]
      },
      "RateLimiter.CustomInvitesClient.IncomingOperations": {
        "MessageCount": 30,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "HandleCustomInviteMessageReceived",
          "HandleSignalMessageReceived"
        ]
      },
      "RateLimiter.K3SClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "QuerySettings",
          "UpdateSettings",
          "RequestAdditionalPlaytime",
          "GrantAdditionalPlaytime",
          "RequestConsent"
        ]
      },
      "RateLimiter.SDKConfigClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.EcomClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "QueryOwnership",
          "QueryOwnershipToken",
          "QueryEntitlement",
          "QueryOffer",
          "RedeemEntitlements",
          "Checkout"
        ]
      },
      "PresenceClient": {
        "EpicConnectNotificationWaitTime": 5,
        "PresenceQueryTimeoutSeconds": 60,
        "bSetOfflineOnLogoutEnabled": true,
        "PresenceAutoUpdateInSeconds": 600,
        "bSetOfflineOnShutdownEnabled": true
      },
      "RateLimiter.CustomInvitesClient": {
        "MessageCount": 50,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.ModsClient": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60
      },
      "RateLimiter.ConnectClient.Operations": {
        "MessageCount": 300,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "LoginAccount",
          "CreateAccount",
          "LinkAccount",
          "UnlinkAccount",
          "CreateDeviceId",
          "DeleteDeviceId",
          "TransferDeviceIdAccount",
          "QueryExternalAccountMappings",
          "QueryProductUserIdMappings",
          "VerifyIdToken",
          "RequestExchangeToken"
        ]
      },
      "RateLimiter.AuthClient.SensitiveOperations": {
        "MessageCount": 12,
        "TimeIntervalInSeconds": 60,
        "Operation": [
          "GenerateUserAuth"
        ]
      },
      "RateLimiter.ReportsClient": {
        "MessageCount": 100,
        "TimeIntervalInSeconds": 60
      }
    },
    "services": {
      "DataStorageService": {
        "BaseUrl": "https://api.epicgames.dev/datastorage"
      },
      "AccountsEpicIdService": {
        "BaseUrl": "https://api.epicgames.dev"
      },
      "PartiesInternalService": {
        "BaseUrl": "https://api.epicgames.dev/epic/party/internal"
      },
      "LobbyService": {
        "BaseUrl": "https://api.epicgames.dev/lobby"
      },
      "StatsAchievementsService": {
        "BaseUrl": "https://api.epicgames.dev/stats"
      },
      "PriceEngineService": {
        "BaseUrl": "https://priceengine-public-service-ecomprod01.ol.epicgames.com/priceengine"
      },
      "MatchmakingService": {
        "BaseUrl": "https://api.epicgames.dev/epic/matchmaking"
      },
      "AccountsService": {
        "BaseUrl": "https://egp-idsoc-proxy-prod.ol.epicgames.com/account",
        "RedirectUrl": "accounts.epicgames.com"
      },
      "PartiesService": {
        "BaseUrl": "https://api.epicgames.dev/epic/party"
      },
      "EcommerceEpicIdService": {
        "BaseUrl": "https://api.epicgames.dev/epic/ecom"
      },
      "PaymentEpicIdService": {
        "BaseUrl": "https://api.epicgames.dev/epic/payment"
      },
      "SanctionsService": {
        "BaseUrl": "https://api.epicgames.dev/sanctions"
      },
      "FriendService": {
        "BaseUrl": "https://egp-idsoc-proxy-prod.ol.epicgames.com/friends"
      },
      "TextChatTrustedServerFNService": {
        "BaseUrl": "https://api.epicgames.dev/epic/chat"
      },
      "ReceiptValidatorService": {
        "BaseUrl": "https://api.epicgames.dev/receipt-validator"
      },
      "RTCService": {
        "BaseUrl": "https://api.epicgames.dev/rtc"
      },
      "WeblinksService": {
        "BaseUrl": "https://api.epicgames.dev/external-session-sync"
      },
      "MetricsService": {
        "BaseUrl": "https://api.epicgames.dev/datarouter"
      },
      "PostPartyService": {
        "BaseUrl": "https://global-postparty.game-social.epicgames.com"
      },
      "EcommerceService": {
        "BaseUrl": "https://ecommerceintegration-public-service-ecomprod02.ol.epicgames.com/ecommerceintegration"
      },
      "EULATrackingService": {
        "BaseUrl": "https://eulatracking-public-service-prod06.ol.epicgames.com/eulatracking"
      },
      "FriendEpicIdService": {
        "BaseUrl": "https://api.epicgames.dev/epic/friends"
      },
      "CatalogService": {
        "BaseUrl": "https://catalog-public-service-prod06.ol.epicgames.com/catalog"
      },
      "KWSService": {
        "BaseUrl": "https://api.epicgames.dev/kws"
      },
      "TextChatFNService": {
        "BaseUrl": "https://api.epicgames.dev/epic/chat"
      },
      "GalleryService": {
        "BaseUrl": "https://gallery-service-prod.social.live.on.epicgames.com"
      },
      "PlaytimeTrackingService": {
        "BaseUrl": "https://api.kws.ol.epicgames.com"
      },
      "AntiCheatService": {
        "BaseUrl": "https://api.epicgames.dev/anticheat"
      },
      "EOSAuthService": {
        "BaseUrl": "https://api.epicgames.dev"
      },
      "SessionsService": {
        "BaseUrl": "https://api.epicgames.dev/matchmaking"
      },
      "ModsService": {
        "BaseUrl": "https://api.epicgames.dev/mods"
      },
      "ReportsService": {
        "BaseUrl": "https://api.epicgames.dev/player-reports"
      },
      "ProgressionSnapshotService": {
        "BaseUrl": "https://api.epicgames.dev/snapshots"
      },
      "CustomInvitesService": {
        "BaseUrl": "https://api.epicgames.dev/notifications"
      },
      "PresenceService": {
        "BaseUrl": "https://api.epicgames.dev/epic/presence"
      },
      "TitleStorageService": {
        "BaseUrl": "https://api.epicgames.dev/titlestorage"
      },
      "StatsIngestService": {
        "BaseUrl": "https://api.epicgames.dev/ingestion/stats"
      },
      "SupervisedSettingsService": {
        "BaseUrl": "https://api.kws.ol.epicgames.com"
      },
      "TextChatGatewayServerFNService": {
        "BaseUrl": "https://fngw-svc-ds-livefn.ol.epicgames.com/chat"
      },
      "LeaderboardsService": {
        "BaseUrl": "https://api.epicgames.dev/leaderboards"
      },
      "InventoryService": {
        "BaseUrl": "https://fngw-svc-ds-livefn.ol.epicgames.com/api/inventory"
      }
    },
    "watermark": -287380011
  })
  },

  oauthv2: function (req, res) {
    if (!req.body.refresh_token) { req.body.refresh_token = "eg1~eyJ0IjoiZXBpY19pZF9yIiwiYWxnIjoiUlMyNTYiLCJraWQiOiJXTVM3RW5rSUdwY0g5REdac3YyV2NZOXhzdUZuWkN0eFpqajRBaGItXzhFIn0.eyJzdWIiOiIiLCJwZnNpZCI6ImEwMTkyN2Y3NDIxYTRkNDk5NTY3M2ZlMzBlZjQ2OTQ1IiwiaXNzIjoiaHR0cHM6Ly9hcGkuZXBpY2dhbWVzLmRldi9lcGljL29hdXRoL3YyIiwiZG4iOiIiLCJwZnBpZCI6Ijg2ZjMyZjExNTEzNTRlN2NiMzljMTJmOGFiMmMyMmEzIiwiYXVkIjoieHl6YTc4OTFSRUJWc0VxU0pSUk5YbWxTN0VRSE00NTkiLCJwZmRpZCI6ImE2NTJhNzJlYTE2NjRkY2FiM2E0Njc4OTFlZWE1ZjMwIiwidCI6ImVwaWNfaWRfciIsImFwcGlkIjoiZmdoaTQ1NjcyZjBRVjZiNkIxS250TGQ3SlI3UkZMV2MiLCJzY29wZSI6ImJhc2ljX3Byb2ZpbGUgb3BlbmlkIG9mZmxpbmVfYWNjZXNzIiwiZXhwIjoyMTQ3NDgzNjQ3LCJpYXQiOjE3NDQwMjc4NzgsImp0aSI6IjIxNDI1MWNlNzZjYzRjODRiYmI0NTBlYTdiZTIyMjgwIn0.b8IkCKzvGr2Tc4zVghgBEP5di-tlbn8P_7y3SxlQjf83b7Xl80wO813ul4rQvjBQmun7bt14CnciDyf9is9sxUe5Qbp3LZAFWbwiZIbzYlAvxlWydkSxSbmxVynSql7IO4LsubzsNjWKqPtwxcVBDZMMqJBxax9cnTEc-ZOWmTusxK0lKQSnB1hr-HIgmE4CnKFlrVtRwRq9wqM0qVPb9ev1ok9MRrmsdmo1d8ZvOQpoHd6sl1K2G38fD_2bp_lxPUNSpCByxBD6H33pVC-HeVJ0A1IBJDFv6HVWK5VN6InJL-xZ-RvQlMYPutZSZqh8FFqlADReO47gWa7TeIPYTw" }
    const JWT = req.body.refresh_token.replace("eg1~", "")
    const JWTdecode = jsonwebtoken.decode(JWT)
    if (req.body["device_code"] === "device_code") { JWTdecode["dn"] === "Neonite"; JWTdecode["sub"] === "Neonite" }
    let access_token = oauthTokenV2_accessToken(JWTdecode["dn"])
    let id_token = oauthTokenV1_idToken(JWTdecode["dn"])
    let refresh_token = oauthv2_refreshToken(JWTdecode["sub"], JWTdecode["dn"])
    res.json({
      "scope": "basic_profile friends_list openid offline_access presence",
      "token_type": "bearer",
      "access_token": access_token,
      "refresh_token": refresh_token,
      "id_token": id_token,
      "expires_in": 7200,
      "expires_at": "9999-12-31T23:59:59.999Z",
      "account_id": JWTdecode["dn"],
      "client_id": "ec684b8c687f479fadea3cb2ad83f5c6",
      "application_id": "fghi4567FNFBKFz3E4TROb0bmPS8h1GW",
      "selected_account_id": JWTdecode["dn"],
      "merged_accounts": [],
      "acr": "AAL1",
      "auth_time": "2024-10-01T22:51:42.594Z"
    })
  },

  wss: function (req, res) {
    res.status(403)
  },

  productUsersSearch: function (req, res) {
    res.json({
      productUsers: {
        [req.body.productUserIds[0]]: {
          accounts: [
            {
              accountId: account.accountId,
              displayName: account.displayName,
              identityProviderId: "epicgames",
              lastLogin: "2025-05-06T13:59:46Z"
            }
          ]
        }
      }
    });
  },

  telemetry: function (req, res) {
    res.json({})
  },

  chatSummary: function (req, res) {
    res.json({
      "conversationCount": 0, 
      "unreadMessages": 0, 
      "unreadPendingInvites": 0, 
      "hasMoreUnreadMessages": false, 
      "hasMoreUnreadPendingInvites": false 
    })
  },

  chatConversations: function (req, res) {
    res.json({
      "conversations": []
    })
  }
}



function oauthTokenV1_clientCredentials(deploymentId) {
  return jsonwebtoken.sign(
    {
      "clientId": "3e13c5c57f594a578abe516eecb673fe",
      "productId": "3fd15bc288014f698cca1a3d1f01c7af",
      "iss": "eos",
      "env": "prod",
      "organizationId": "o-aa83a0a9bc45e98c80c1b1c9d92e9e",
      "features": [
        "AntiCheat",
        "Connect",
        "ContentService",
        "Ecom",
        "EpicConnect",
        "Inventories",
        "LockerService",
        "Matchmaking Service",
        "ExchangeCodeCreation",
        "Achievements",
        "Leaderboards",
        "Matchmaking",
        "Metrics",
        "PlayerReports",
        "Sanctions",
        "Stats",
        "TitleStorage",
        "Voice",
        "CommerceService",
        "FNResonanceService",
        "MagpieService",
        "PCBService",
        "QuestService",
      ],
      "deploymentId": deploymentId,
      "sandboxId": "183b8244f3d84e71a4d4af08a17f7d9a",
      "tokenType": "clientToken",
      "exp": 2147483647,
      "iat": 1744036778,
      "jti": "b31bc00fc9cd48e38fa0da2ea8f3ecae"
    }, "RS256", { keyid: "2022-06-14T06:17:57.047928700Z" })
}

function oauthTokenV1_externalAuth(nonce, deploymentId, accountId) {
  return jsonwebtoken.sign({
    "clientId": "ec684b8c687f479fadea3cb2ad83f5c6",
    "role": "GameClient",
    "productId": "prod-fn",
    "iss": "eos",
    "env": "prod",
    "nonce": nonce,
    "organizationId": "o-aa83a0a9bc45e98c80c1b1c9d92e9e",
    "features": [
      "AntiCheat",
      "Connect",
      "ContentService",
      "Ecom",
      "EpicConnect",
      "Inventories",
      "LockerService",
      "Matchmaking Service",
      "ExchangeCodeCreation",
      "Achievements",
      "Leaderboards",
      "Matchmaking",
      "Metrics",
      "PlayerReports",
      "Sanctions",
      "Stats",
      "TitleStorage",
      "Voice",
      "CommerceService",
      "FNResonanceService",
      "MagpieService",
      "PCBService",
      "QuestService",
    ],
    "productUserId": "00027b91959a4c57a1272efcc4d7480f",
    "organizationUserId": "000185f80b9a4dc3aaf1ca83611c2bf5",
    "clientIp": "127.0.0.1:5595",
    "deploymentId": deploymentId,
    "sandboxId": "fn",
    "tokenType": "userToken",
    "exp": 2147483647,
    "iat": 1740187263,
    "account": {
      "idp": "epicgames",
      "displayName": accountId,
      "id": accountId,
      "plf": "other"
    },
    "jti": "46f6449d72bc44ab89a8129aa4529c4f"
  }, "RS256", { keyid: "2022-06-14T06:17:57.047928700Z" })
}


function oauthTokenV2_accessToken(account_id) {
  return jsonwebtoken.sign({
    "sub": account_id,
    "pfsid": "a01927f7421a4d4995673fe30ef46945",
    "iss": "http://127.0.0.1:5595/auth/v1/oauth",
    "dn": account_id,
    "nonce": "n-TRePC1vU+xUVFrVbZbqJVk6T2MU=",
    "pfpid": "86f32f1151354e7cb39c12f8ab2c22a3",
    "sec": 1,
    "aud": "xyza7891REBVsEqSJRRNXmlS7EQHM459",
    "pfdid": "a652a72ea1664dcab3a467891eea5f30",
    "t": "epic_id",
    "scope": "basic_profile openid offline_access",
    "appid": "fghi45672f0QV6b6B1KntLd7JR7RFLWc",
    "exp": 2147483647,
    "iat": 1744036780,
    "jti": "997b9a3ba7b4481284be5993db6a3311"
  }, "RS256")
}

function oauthTokenV1_idToken(account_id) {
  return jsonwebtoken.sign({
    "aud": "ec684b8c687f479fadea3cb2ad83f5c6",
    "sub": "00027b91959a4c57a1272efcc4d7480f",
    "pfsid": "fn",
    "act": {
      "pltfm": "other",
      "eaid": account_id,
      "eat": "epicgames"
    },
    "pfdid": "62a9473a2dca46b29ccf17577fcf42d7",
    "iss": "http://127.0.0.1:5595/auth/v1/oauth",
    "exp": 2147483647,
    "tokenType": "idToken",
    "iat": 1740187263,
    "pfpid": "prod-fn"
  }, "RS256", { keyid: "2022-06-14T06:17:57.047928700Z" })
}


function oauthv2_refreshToken(sub, dn) {
  jsonwebtoken.sign({
    "sub": sub,
    "pfsid": "fn",
    "iss": "http://127.0.0.1:5595/epic/oauth/v2",
    "dn": dn,
    "pfpid": "prod-fn",
    "aud": "ec684b8c687f479fadea3cb2ad83f5c6",
    "pfdid": "62a9473a2dca46b29ccf17577fcf42d7",
    "t": "epic_id_r",
    "appid": "fghi4567FNFBKFz3E4TROb0bmPS8h1GW",
    "scope": "basic_profile friends_list openid offline_access presence",
    "iat": 1740192688,
    "jti": "85842cd08d3d473abda80d499602332a"
  }, "RS256")
}