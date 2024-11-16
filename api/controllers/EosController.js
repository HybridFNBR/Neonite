const jsonwebtoken = require('jsonwebtoken');


module.exports = {
    oauthTokenv1: function(req, res){
    let access_token 
      if(req.body["grant_type"] == "external_auth"){
        const JWTdecode = jsonwebtoken.decode(req.body.external_auth_token)
        access_token = jsonwebtoken.sign({
            "clientId": "ec684b8c687f479fadea3cb2ad83f5c6",
            "role": "GameClient",
            "productId": "prod-fn",
            "iss": "eos",
            "env": "prod",
            "nonce": "6YBf2FT1QEivxlOCfueeww",
            "organizationId": "o-aa83a0a9bc45e98c80c1b1c9d92e9e",
            "features": [
              "AntiCheat",
              "Connect",
              "Ecom",
              "Inventories",
              "LockerService"
            ],
            "productUserId": "00027b91959a4c57a1272efcc4d7480f",
            "organizationUserId": "000185f80b9a4dc3aaf1ca83611c2bf5",
            "clientIp": "127.0.0.0",
            "deploymentId": req.body["deployment_id"],
            "sandboxId": "fn",
            "tokenType": "userToken",
            "exp": 9668532724,
            "iat": 1668529124,
            "account": {
              "idp": "epicgames",
              "displayName": JWTdecode["dn"],
              "id": JWTdecode["sub"],
              "plf": "other"
            },
            "jti": "fad9c1f12e314651b774bb5c1ee7be17"
        }, "ciao")
        let id_token = jsonwebtoken.sign({
          "aud": "ec684b8c687f479fadea3cb2ad83f5c6",
          "sub": "00027b91959a4c57a1272efcc4d7480f",
          "pfsid": "fn",
          "act": {
            "pltfm": "other",
            "eaid": JWTdecode["sub"],
            "eat": "epicgames"
          },
          "pfdid": req.body["deployment_id"],
          "iss": "http://localhost:5595/auth/v1/oauth",
          "exp": 1727830274,
          "tokenType": "idToken",
          "iat": 1727826674,
          "pfpid": "prod-fn"
        }, "ciao")
        res.json({
          "access_token": access_token,
          "token_type": "bearer",
          "expires_at": "9999-12-31T23:59:59.999Z",
          "nonce": "6YBf2FT1QEivxlOCfueeww",
          "features": [
            "AntiCheat",
            "Connect",
            "Ecom",
            "Inventories",
            "LockerService"
          ],
          "organization_id": "o-aa83a0a9bc45e98c80c1b1c9d92e9e",
          "product_id": "prod-fn",
          "sandbox_id": "fn",
          "deployment_id": req.body["deployment_id"],
          "organization_user_id": "000185f80b9a4dc3aaf1ca83611c2bf5",
          "product_user_id": "00027b91959a4c57a1272efcc4d7480f",
          "product_user_id_created": false,
          "id_token": id_token,
          "expires_in": 3599
        })
      }
      else{
        access_token = jsonwebtoken.sign({
          "clientId": "ec684b8c687f479fadea3cb2ad83f5c6",
          "role": "GameClient",
          "productId": "prod-fn",
          "iss": "eos",
          "env": "prod",
          "organizationId": "o-aa83a0a9bc45e98c80c1b1c9d92e9e",
          "features": [],
          "deploymentId": req.body["deployment_id"],
          "sandboxId": "fn",
          "tokenType": "clientToken",
          "exp": 9668532724,
          "iat": 1668529124,
          "jti": "1b10b89e6fea4c45a083fe04f9a71fc3"
        }, "ciao");
        
        res.json({
            "access_token":access_token,
            "token_type":"bearer",
            "expires_at":"9999-12-31T23:59:59.999Z",
            "features":[],
            "organization_id":"o-aa83a0a9bc45e98c80c1b1c9d92e9e",
            "product_id":"prod-fn",
            "sandbox_id":"fn",
            "deployment_id": req.body["deployment_id"],
            "expires_in":115200
        });
      }
    },

    eossdkv2: function(req, res){
        res.send([
          {
              "accountId":req.query.accountId,
              "displayName":req.query.accountId,
              "preferredLanguage":"en",
              "linkedAccounts": [],
              "cabinedMode":false,
              "empty":false
          }
        ]);
    },

    blocklist: function(req, res){
        res.json([])
    },

    presence:function(req, res){
        res.json({
            "own": {
                "accountId":req.params.accountId,
                "status":"online",
                "perNs":[]
            }
        });
    },

    eossdkv1default: function(req, res){
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
            "AntiCheatService": {
              "BaseUrl": "https://api.epicgames.dev/anticheat"
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
            "LeaderboardsService": {
              "BaseUrl": "https://api.epicgames.dev/leaderboards"
            },
            "InventoryService": {
              "BaseUrl": "https://api.epicgames.dev/inventory"
            }
          },
          "watermark": 912979307
        });
    },

    eossdkv1product: function(req, res){
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

    eossdkv1productprod: function(req, res){
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
            "BaseUrlLive": "https://fngw-svc-ds-livefn.ol.epicgames.com/api/inventory",
            "HttpRetryResponseCodes": [
              429,
              500,
              503,
              504
            ],
            "LockType": "Session",
            "BaseUrl": "https://fngw-svc-ds-prod.ol.epicgames.com/api/inventory",
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
            "BaseUrl": "https://fngw-svc-ds-livefn.ol.epicgames.com/api/inventory"
          }
        },
        "watermark": 912979307
      })
    },

    oauthv2: function(req, res){
      const JWT = req.body.refresh_token.replace("eg1~", "")
      const JWTdecode = jsonwebtoken.decode(JWT)
        let access_token = jsonwebtoken.sign({
          "sub": JWTdecode["sub"],
          "pfsid": "fn",
          "iss": "http://localhost:5595/epic/oauth/v1",
          "dn": JWTdecode["sub"],
          "nonce": "n-z3y+9uzAtLrYo/lZk/KjFTwnhwQ=",
          "pfpid": "prod-fn",
          "sec": 1,
          "aud": "ec684b8c687f479fadea3cb2ad83f5c6",
          "pfdid": "62a9473a2dca46b29ccf17577fcf42d7",
          "t": "epic_id",
          "scope": "basic_profile friends_list openid offline_access presence",
          "appid": "fghi4567FNFBKFz3E4TROb0bmPS8h1GW",
          "exp": 9668557926,
          "iat": 1668529126,
          "jti": "71201a50443e4cbd809764924150e337"
        }, "ciao");

        let refresh_token = jsonwebtoken.sign({
          "sub": JWTdecode["sub"],
          "pfsid": "fn",
          "iss": "http://localhost:5595/epic/oauth/v2",
          "dn": JWTdecode["dn"],
          "pfpid": "prod-fn",
          "aud": "ec684b8c687f479fadea3cb2ad83f5c6",
          "pfdid": "62a9473a2dca46b29ccf17577fcf42d7",
          "t": "epic_id_r",
          "appid": "fghi4567FNFBKFz3E4TROb0bmPS8h1GW",
          "scope": "basic_profile friends_list openid offline_access presence",
          "iat": 1668529126,
          "jti": "e0772b96cf804aaca4d8f0e0e84f2c43"
        }, "ciao");

        let id_token = jsonwebtoken.sign({
          "sub": JWTdecode["sub"],
          "pfsid": "fn",
          "iss": "http://localhost:5595/epic/oauth/v1",
          "dn": JWTdecode["sub"],
          "nonce": "n-EQLrq70R+ydS6UzIWdYgOFcHRiI=",
          "pfpid": "prod-fn",
          "aud": "ec684b8c687f479fadea3cb2ad83f5c6",
          "pfdid": "62a9473a2dca46b29ccf17577fcf42d7",
          "t": "id_token",
          "appid": "fghi4567FNFBKFz3E4TROb0bmPS8h1GW",
          "exp": 9668557926,
          "iat": 1668529126,
          "jti": "d1352615d6b64c63933175318dc7c1ee"
        }, "ciao");

		res.json({
      "scope": "basic_profile friends_list openid offline_access presence",
      "token_type": "bearer",
      "access_token": access_token,
      "refresh_token": refresh_token,
      "id_token": id_token,
      "expires_in": 7200,
      "expires_at": "9999-12-31T23:59:59.999Z",
      "account_id": JWTdecode["sub"],
      "client_id": "ec684b8c687f479fadea3cb2ad83f5c6",
      "application_id": "fghi4567FNFBKFz3E4TROb0bmPS8h1GW",
      "selected_account_id": JWTdecode["sub"],
      "merged_accounts": [],
      "acr": "AAL1",
      "auth_time": "2024-10-01T22:51:42.594Z"
    })
  }
}