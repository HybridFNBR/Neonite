/**
 * 
 * @param {Express.Application} app 
 */

module.exports = (app) => {
    app.post("/api/v1/user/setting", (req, res) => {
		res.json([
			{
				"accountId": req.body.accountId,
				"key": "avatar",
				"value": "cid_003_athena_commando_f_default"
			},
			{
				"accountId": req.body.accountId,
				"key": "avatarBackground",
				"value": "[\"#B4F2FE\",\"#00ACF2\",\"#005679\"]"
			},
			{
				"accountId": req.body.accountId,
				"key": "appInstalled",
				"value": "init"
			}])
	})

    app.all('/v1/epic-settings/public/users/:accountId/*', (req, res) => {
		res.json({
			"response":{
			   "settings":[
				  {
					 "namespace":"chat",
					 "settingName":"voice",
					 "preferredValue":"everybody",
					 "preferredValueUpdatedAt":1678023125165,
					 "preferredValueFromOrgLevel":false,
					 "parentLimit":"everybody",
					 "parentLimitFromOrgLevel":true,
					 "effectiveValue":"everybody",
					 "effectiveSource":"preference",
					 "isOrgLevel":false,
					 "definition":{
						"orgId":"cc5b83aa-cb5c-4b4b-a800-a7dd64edacc0",
						"productId":"6fdb114c-3fbc-4ced-bc5b-55bcdba5c8f6",
						"namespace":"chat",
						"settingName":"voice",
						"valueType":"option",
						"allowProductOverrides":"ageBrackets",
						"inheritFromOrg":true,
						"translations":{
						   "en":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the voice chat feature",
							  "parentNotice":"Who can your child speak with using Epic voice chat?"
						   },
						   "ar":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the voice chat feature",
							  "parentNotice":"\u0645\u0646 \u0627\u0644\u0630\u064a \u064a\u0645\u0643\u0646 \u0644\u0637\u0641\u0644\u0643 \u0623\u0646 \u064a\u062a\u062d\u062f\u062b \u0645\u0639\u0647 \u0628\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u062f\u0631\u062f\u0634\u0629 \u0627\u0644\u0635\u0648\u062a\u064a\u0629 \u0644\u0640 Epic\u061f"
						   },
						   "de":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the voice chat feature",
							  "parentNotice":"Mit wem kann sich Ihr Kind per Epic-Sprachchat unterhalten?"
						   },
						   "es":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the voice chat feature",
							  "parentNotice":"\u00bfCon qui\u00e9n puede hablar el menor al usar el chat de voz de Epic?"
						   },
						   "es-ES":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the voice chat feature",
							  "parentNotice":"\u00bfCon qui\u00e9n puede hablar el menor al usar el chat de voz de Epic?"
						   },
						   "es-MX":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the voice chat feature",
							  "parentNotice":"\u00bfCon qui\u00e9n puede usar el chat de voz de Epic tu hijo o hija?"
						   },
						   "fr":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the voice chat feature",
							  "parentNotice":"Avec qui votre enfant peut-il utiliser le chat vocal d'Epic\u00a0?"
						   },
						   "it":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the voice chat feature",
							  "parentNotice":"Con chi pu\u00f2 parlare il tuo minore usando la chat vocale di Epic?"
						   },
						   "ja":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the voice chat feature",
							  "parentNotice":"\u304a\u5b50\u69d8\u304cEpic\u30dc\u30a4\u30b9\u30c1\u30e3\u30c3\u30c8\u3092\u4f7f\u3063\u3066\u8a71\u305b\u308b\u76f8\u624b\uff1a"
						   },
						   "ko":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the voice chat feature",
							  "parentNotice":"\uc5d0\ud53d \uc74c\uc131 \ucc44\ud305\uc744 \uc0ac\uc6a9\ud558\uc5ec \uc790\ub140\uac00 \ub204\uad6c\uc640 \ub300\ud654\ud560 \uc218 \uc788\ub098\uc694?"
						   },
						   "pl":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the voice chat feature",
							  "parentNotice":"Z kim Twoje dziecko mo\u017ce rozmawia\u0107 przez czat g\u0142osowy Epic?"
						   },
						   "pt-BR":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the voice chat feature",
							  "parentNotice":"Com quem seu filho ou filha pode conversar usando o bate-papo por voz da Epic?"
						   },
						   "ru":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the voice chat feature",
							  "parentNotice":"\u0421 \u043a\u0435\u043c \u0432\u0430\u0448 \u0440\u0435\u0431\u0451\u043d\u043e\u043a \u043c\u043e\u0436\u0435\u0442 \u0440\u0430\u0437\u0433\u043e\u0432\u0430\u0440\u0438\u0432\u0430\u0442\u044c \u0432 \u0433\u043e\u043b\u043e\u0441\u043e\u0432\u043e\u043c \u0447\u0430\u0442\u0435 Epic?"
						   },
						   "th":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the voice chat feature",
							  "parentNotice":"\u0e1a\u0e38\u0e15\u0e23\u0e2b\u0e25\u0e32\u0e19\u0e02\u0e2d\u0e07\u0e04\u0e13\u0e2a\u0e32\u0e21\u0e32\u0e23\u0e16\u0e43\u0e0a\u0e49\u0e41\u0e0a\u0e17\u0e40\u0e2a\u0e35\u0e22\u0e07\u0e02\u0e2d\u0e07 Epic \u0e01\u0e31\u0e1a\u0e43\u0e04\u0e23\u0e44\u0e14\u0e49\u0e1a\u0e49\u0e32\u0e07"
						   },
						   "tr":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the voice chat feature",
							  "parentNotice":"\u00c7ocu\u011funuz Epic sesli sohbeti kullanarak kimlerle konu\u015fabilir?"
						   },
						   "zh-CN":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the voice chat feature",
							  "parentNotice":"\u60a8\u7684\u5b69\u5b50\u53ef\u4ee5\u4e0e\u54ea\u4e9b\u4eba\u8fdb\u884c Epic \u8bed\u97f3\u804a\u5929\uff1f"
						   },
						   "zh-Hant":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the voice chat feature",
							  "parentNotice":"\u60a8\u7684\u5b50\u5973\u53ef\u4ee5\u548c\u8ab0\u9032\u884c Epic \u8a9e\u97f3\u804a\u5929\uff1f"
						   }
						},
						"options":[
						   {
							  "value":"nobody",
							  "translations":{
								 "en":{
									"label":"Nobody",
									"userNotice":"Epic voice chat is disabled.",
									"parentNotice":"Epic voice chat is disabled for your child."
								 },
								 "ar":{
									"label":"\u0644\u0627 \u0623\u062d\u062f",
									"userNotice":"Epic voice chat is disabled.",
									"parentNotice":"\u0627\u0644\u062f\u0631\u062f\u0634\u0629 \u0627\u0644\u0635\u0648\u062a\u064a\u0629 \u0644\u0640 Epic \u0645\u0639\u0637\u0644\u0629 \u0644\u0637\u0641\u0644\u0643."
								 },
								 "de":{
									"label":"Niemand",
									"userNotice":"Epic voice chat is disabled.",
									"parentNotice":"Der Epic-Sprachchat ist f\u00fcr Ihr Kind deaktiviert."
								 },
								 "es":{
									"label":"Nadie",
									"userNotice":"Epic voice chat is disabled.",
									"parentNotice":"El menor no podr\u00e1 usar el chat de voz de Epic."
								 },
								 "es-ES":{
									"label":"Nadie",
									"userNotice":"Epic voice chat is disabled.",
									"parentNotice":"El menor no podr\u00e1 usar el chat de voz de Epic."
								 },
								 "es-MX":{
									"label":"Nadie",
									"userNotice":"Epic voice chat is disabled.",
									"parentNotice":"Se deshabilita el chat de voz de Epic para tu hijo o hija."
								 },
								 "fr":{
									"label":"Personne",
									"userNotice":"Epic voice chat is disabled.",
									"parentNotice":"Votre enfant ne peut pas utiliser le chat vocal d'Epic."
								 },
								 "it":{
									"label":"Nessuno",
									"userNotice":"Epic voice chat is disabled.",
									"parentNotice":"La funzionalit\u00e0 di chat vocale di Epic \u00e8 disattivata per il tuo minore."
								 },
								 "ja":{
									"label":"\u8ab0\u3068\u3082\u3057\u306a\u3044",
									"userNotice":"Epic voice chat is disabled.",
									"parentNotice":"\u304a\u5b50\u69d8\u306eEpic\u30dc\u30a4\u30b9\u30c1\u30e3\u30c3\u30c8\u306f\u7121\u52b9\u5316\u3055\u308c\u307e\u3059\u3002"
								 },
								 "ko":{
									"label":"\ubaa8\ub450\ubd88\uac00\ub2a5",
									"userNotice":"Epic voice chat is disabled.",
									"parentNotice":"\uc790\ub140\ub294 \uc5d0\ud53d \uc74c\uc131 \ucc44\ud305\uc744 \uc0ac\uc6a9\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4."
								 },
								 "pl":{
									"label":"Nikt",
									"userNotice":"Epic voice chat is disabled.",
									"parentNotice":"Czat g\u0142osowy Epic jest wy\u0142\u0105czony dla dziecka."
								 },
								 "pt-BR":{
									"label":"Ningu\u00e9m",
									"userNotice":"Epic voice chat is disabled.",
									"parentNotice":"Bate-papo por voz da Epic desativado para seu filho ou filha."
								 },
								 "ru":{
									"label":"\u041d\u0438 \u0441 \u043a\u0435\u043c",
									"userNotice":"Epic voice chat is disabled.",
									"parentNotice":"\u0413\u043e\u043b\u043e\u0441\u043e\u0432\u043e\u0439 \u0447\u0430\u0442 Epic \u043e\u0442\u043a\u043b\u044e\u0447\u0451\u043d \u0434\u043b\u044f \u0432\u0430\u0448\u0435\u0433\u043e \u0440\u0435\u0431\u0451\u043d\u043a\u0430."
								 },
								 "th":{
									"label":"\u0e17\u0e38\u0e01\u0e04\u0e19",
									"userNotice":"Epic voice chat is disabled.",
									"parentNotice":"\u0e01\u0e32\u0e23\u0e41\u0e0a\u0e17\u0e14\u0e49\u0e27\u0e22\u0e40\u0e2a\u0e35\u0e22\u0e07\u0e02\u0e2d\u0e07 Epic \u0e08\u0e30\u0e1b\u0e34\u0e14\u0e43\u0e0a\u0e49\u0e07\u0e32\u0e19\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e1a\u0e38\u0e15\u0e23\u0e2b\u0e25\u0e32\u0e19\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13"
								 },
								 "tr":{
									"label":"Hi\u00e7 kimse",
									"userNotice":"Epic voice chat is disabled.",
									"parentNotice":"Epic sesli sohbet \u00e7ocu\u011funuz i\u00e7in tamamen devre d\u0131\u015f\u0131 b\u0131rak\u0131l\u0131r."
								 },
								 "zh-CN":{
									"label":"\u6ca1\u6709\u4eba",
									"userNotice":"Epic voice chat is disabled.",
									"parentNotice":"\u4e3a\u60a8\u7684\u5b69\u5b50\u7981\u7528 Epic \u8bed\u97f3\u804a\u5929\u529f\u80fd\u3002"
								 },
								 "zh-Hant":{
									"label":"\u7686\u4e0d\u53ef",
									"userNotice":"Epic voice chat is disabled.",
									"parentNotice":"\u60a8\u7684\u5b50\u5973\u4e0d\u80fd\u4f7f\u7528 Epic \u8a9e\u97f3\u804a\u5929\u529f\u80fd\u3002"
								 }
							  }
						   },
						   {
							  "value":"friends",
							  "translations":{
								 "en":{
									"label":"Friends Only",
									"userNotice":"You can voice chat only with players in their Epic friends list and platform friends list.",
									"parentNotice":"Your child can voice chat only with players in their Epic friends list and platform friends list."
								 },
								 "ar":{
									"label":"\u0627\u0644\u0623\u0635\u062f\u0642\u0627\u0621 \u0641\u0642\u0637",
									"userNotice":"You can voice chat only with players in their Epic friends list and platform friends list.",
									"parentNotice":"\u064a\u0645\u0643\u0646 \u0644\u0637\u0641\u0644\u0643 \u0627\u0644\u062f\u0631\u062f\u0634\u0629 \u0627\u0644\u0635\u0648\u062a\u064a\u0629 \u0641\u0642\u0637 \u0645\u0639 \u0627\u0644\u0644\u0627\u0639\u0628\u064a\u0646 \u0627\u0644\u0645\u0648\u062c\u0648\u062f\u064a\u0646 \u0641\u064a \u0642\u0627\u0626\u0645\u0629 \u0623\u0635\u062f\u0642\u0627\u0621 Epic \u062e\u0627\u0635\u062a\u0647 \u0648\u0642\u0627\u0626\u0645\u0629 \u0623\u0635\u062f\u0642\u0627\u0626\u0647 \u0639\u0644\u0649 \u0645\u0646\u0635\u0629 \u0627\u0644\u0644\u0639\u0628."
								 },
								 "de":{
									"label":"Nur Freunde",
									"userNotice":"You can voice chat only with players in their Epic friends list and platform friends list.",
									"parentNotice":"Ihr Kind kann den Sprach-Chat nur mit Spielern verwenden, die auf seiner Epic Games-Freundesliste und Plattform-Freundesliste sind."
								 },
								 "es":{
									"label":"Solo amigos",
									"userNotice":"You can voice chat only with players in their Epic friends list and platform friends list.",
									"parentNotice":"El menor podr\u00e1 usar el chat de voz solo con los jugadores de su lista de amigos de Epic y con los de su lista de amigos de la plataforma."
								 },
								 "es-ES":{
									"label":"Solo amigos",
									"userNotice":"You can voice chat only with players in their Epic friends list and platform friends list.",
									"parentNotice":"El menor podr\u00e1 usar el chat de voz solo con los jugadores de su lista de amigos de Epic y con los de su lista de amigos de la plataforma."
								 },
								 "es-MX":{
									"label":"Solo amigos",
									"userNotice":"You can voice chat only with players in their Epic friends list and platform friends list.",
									"parentNotice":"Tu hijo o hija solo puede usar el chat de voz con los jugadores de su lista de amigos de Epic y su lista de amigos de su plataforma."
								 },
								 "fr":{
									"label":"Amis uniquement",
									"userNotice":"You can voice chat only with players in their Epic friends list and platform friends list.",
									"parentNotice":"Votre enfant peut seulement utiliser le chat vocal avec les joueurs dans sa liste d'amis Epic et dans sa liste d'amis de plateforme."
								 },
								 "it":{
									"label":"Solo amici",
									"userNotice":"You can voice chat only with players in their Epic friends list and platform friends list.",
									"parentNotice":"Il tuo minore pu\u00f2 comunicare via chat vocale solo con i giocatori che fanno parte della sua lista di amici di Epic e della piattaforma."
								 },
								 "ja":{
									"label":"\u30d5\u30ec\u30f3\u30c9\u306e\u307f\u3068\u3059\u308b",
									"userNotice":"You can voice chat only with players in their Epic friends list and platform friends list.",
									"parentNotice":"\u304a\u5b50\u69d8\u306f\u3001Epic\u306e\u30d5\u30ec\u30f3\u30c9\u30ea\u30b9\u30c8\u3084\u30d7\u30e9\u30c3\u30c8\u30d5\u30a9\u30fc\u30e0\u306e\u30d5\u30ec\u30f3\u30c9\u30ea\u30b9\u30c8\u306e\u30d7\u30ec\u30a4\u30e4\u30fc\u306e\u307f\u3068\u30dc\u30a4\u30b9\u30c1\u30e3\u30c3\u30c8\u3067\u304d\u307e\u3059\u3002"
								 },
								 "ko":{
									"label":"\uce5c\uad6c\ub9cc \uac00\ub2a5",
									"userNotice":"You can voice chat only with players in their Epic friends list and platform friends list.",
									"parentNotice":"\uc790\ub140\uac00 \uc5d0\ud53d \uce5c\uad6c \ubaa9\ub85d\uacfc \ud50c\ub7ab\ud3fc \uce5c\uad6c \ubaa9\ub85d\uc5d0 \uc788\ub294 \ud50c\ub808\uc774\uc5b4\uc640\ub9cc \uc74c\uc131 \ucc44\ud305\uc744 \ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."
								 },
								 "pl":{
									"label":"Tylko znajomi",
									"userNotice":"You can voice chat only with players in their Epic friends list and platform friends list.",
									"parentNotice":"Twoje dziecko mo\u017ce rozmawia\u0107 przez czat g\u0142osowy z ka\u017cd\u0105 osob\u0105 ze swojej listy znajomych w Epic i na platformie."
								 },
								 "pt-BR":{
									"label":"Somente amigos",
									"userNotice":"You can voice chat only with players in their Epic friends list and platform friends list.",
									"parentNotice":"Seu filho ou filha pode conversar por bate-papo por voz apenas com jogadores nas listas de amigos da Epic e da plataforma usada."
								 },
								 "ru":{
									"label":"\u0422\u043e\u043b\u044c\u043a\u043e \u0441 \u0434\u0440\u0443\u0437\u044c\u044f\u043c\u0438",
									"userNotice":"You can voice chat only with players in their Epic friends list and platform friends list.",
									"parentNotice":"\u0412\u0430\u0448 \u0440\u0435\u0431\u0451\u043d\u043e\u043a \u043c\u043e\u0436\u0435\u0442 \u043e\u0431\u0449\u0430\u0442\u044c\u0441\u044f \u0432 \u0433\u043e\u043b\u043e\u0441\u043e\u0432\u043e\u043c \u0447\u0430\u0442\u0435 \u0442\u043e\u043b\u044c\u043a\u043e \u0441 \u0438\u0433\u0440\u043e\u043a\u0430\u043c\u0438 \u0438\u0437 \u0441\u0432\u043e\u0435\u0433\u043e \u0441\u043f\u0438\u0441\u043a\u0430 \u0434\u0440\u0443\u0437\u0435\u0439 Epic \u0438 \u0438\u0437 \u0441\u043f\u0438\u0441\u043a\u0430 \u0434\u0440\u0443\u0437\u0435\u0439 \u0434\u043b\u044f \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u044b."
								 },
								 "th":{
									"label":"\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e19\u0e40\u0e17\u0e48\u0e32\u0e19\u0e31\u0e49\u0e19",
									"userNotice":"You can voice chat only with players in their Epic friends list and platform friends list.",
									"parentNotice":"\u0e1a\u0e38\u0e15\u0e23\u0e2b\u0e25\u0e32\u0e19\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e2a\u0e32\u0e21\u0e32\u0e23\u0e16\u0e41\u0e0a\u0e17\u0e40\u0e2a\u0e35\u0e22\u0e07\u0e01\u0e31\u0e1a\u0e1c\u0e39\u0e49\u0e40\u0e25\u0e48\u0e19\u0e43\u0e19\u0e23\u0e32\u0e22\u0e0a\u0e37\u0e48\u0e2d\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e19 Epic Games \u0e41\u0e25\u0e30\u0e23\u0e32\u0e22\u0e0a\u0e37\u0e48\u0e2d\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e19\u0e1a\u0e19\u0e41\u0e1e\u0e25\u0e15\u0e1f\u0e2d\u0e23\u0e4c\u0e21\u0e40\u0e17\u0e48\u0e32\u0e19\u0e31\u0e49\u0e19"
								 },
								 "tr":{
									"label":"Sadece Arkada\u015flar",
									"userNotice":"You can voice chat only with players in their Epic friends list and platform friends list.",
									"parentNotice":"\u00c7ocu\u011funuz yaln\u0131zca Epic arkada\u015f listesindeki ve platform arkada\u015f listesindeki oyuncularla sesli sohbet edebilir."
								 },
								 "zh-CN":{
									"label":"\u4ec5\u597d\u53cb",
									"userNotice":"You can voice chat only with players in their Epic friends list and platform friends list.",
									"parentNotice":"\u60a8\u7684\u5b69\u5b50\u53ea\u80fd\u4e0e\u5728\u5176 Epic \u597d\u53cb\u5217\u8868\u4e2d\u7684\u73a9\u5bb6\u4ee5\u53ca\u5176\u5e73\u53f0\u597d\u53cb\u5217\u8868\u4e2d\u7684\u73a9\u5bb6\u8fdb\u884c\u8bed\u97f3\u4ea4\u6d41\u3002"
								 },
								 "zh-Hant":{
									"label":"\u50c5\u9650\u597d\u53cb",
									"userNotice":"You can voice chat only with players in their Epic friends list and platform friends list.",
									"parentNotice":"\u60a8\u7684\u5b50\u5973\u53ea\u80fd\u5920\u548c\u4ed6\u5011\u7684 Epic \u597d\u53cb\u540d\u55ae\u53ca\u5e73\u53f0\u597d\u53cb\u540d\u55ae\u4e2d\u7684\u73a9\u5bb6\u9032\u884c\u8a9e\u97f3\u804a\u5929\u3002"
								 }
							  }
						   },
						   {
							  "value":"friends-and-teammates",
							  "translations":{
								 "en":{
									"label":"Friends & Teammates",
									"userNotice":"You can voice chat with players in their Epic friends list and platform friends list, and those on their team.",
									"parentNotice":"Your child can voice chat with players in their Epic friends list and platform friends list, and those on their team."
								 },
								 "ar":{
									"label":"\u0627\u0644\u0623\u0635\u062f\u0642\u0627\u0621 \u0648\u0632\u0645\u0644\u0627\u0621 \u0627\u0644\u0641\u0631\u064a\u0642",
									"userNotice":"You can voice chat with players in their Epic friends list and platform friends list, and those on their team.",
									"parentNotice":"\u064a\u0645\u0643\u0646 \u0644\u0637\u0641\u0644\u0643 \u0627\u0644\u062f\u0631\u062f\u0634\u0629 \u0627\u0644\u0635\u0648\u062a\u064a\u0629 \u0645\u0639 \u0627\u0644\u0644\u0627\u0639\u0628\u064a\u0646 \u0627\u0644\u0645\u0648\u062c\u0648\u062f\u064a\u0646 \u0641\u064a \u0642\u0627\u0626\u0645\u0629 \u0623\u0635\u062f\u0642\u0627\u0621 Epic \u062e\u0627\u0635\u062a\u0647 \u0648\u0642\u0627\u0626\u0645\u0629 \u0623\u0635\u062f\u0642\u0627\u0626\u0647 \u0639\u0644\u0649 \u0645\u0646\u0635\u0629 \u0627\u0644\u0644\u0639\u0628\u060c \u0648\u0645\u0639 \u0623\u0648\u0644\u0626\u0643 \u0627\u0644\u0645\u0648\u062c\u0648\u062f\u064a\u0646 \u0641\u064a \u0641\u0631\u064a\u0642\u0647."
								 },
								 "de":{
									"label":"Freunde und Teammitglieder",
									"userNotice":"You can voice chat with players in their Epic friends list and platform friends list, and those on their team.",
									"parentNotice":"Ihr Kind kann den Sprach-Chat nur mit Spielern verwenden, die auf seiner Epic Games-Freundesliste und Plattform-Freundesliste und in seinem Team sind."
								 },
								 "es":{
									"label":"Amigos y compa\u00f1eros de equipo",
									"userNotice":"You can voice chat with players in their Epic friends list and platform friends list, and those on their team.",
									"parentNotice":"El menor podr\u00e1 usar el chat de voz con los jugadores de su lista de amigos de Epic, con los de su lista de amigos de la plataforma y con los de su equipo."
								 },
								 "es-ES":{
									"label":"Amigos y compa\u00f1eros de equipo",
									"userNotice":"You can voice chat with players in their Epic friends list and platform friends list, and those on their team.",
									"parentNotice":"El menor podr\u00e1 usar el chat de voz con los jugadores de su lista de amigos de Epic, con los de su lista de amigos de la plataforma y con los de su equipo."
								 },
								 "es-MX":{
									"label":"Amigos y compa\u00f1eros de equipo",
									"userNotice":"You can voice chat with players in their Epic friends list and platform friends list, and those on their team.",
									"parentNotice":"Tu hijo o hija puede usar el chat de voz con los jugadores de su lista de amigos de Epic y su lista de amigos de su plataforma, as\u00ed como con los miembros de su equipo."
								 },
								 "fr":{
									"label":"Amis et co\u00e9quipiers",
									"userNotice":"You can voice chat with players in their Epic friends list and platform friends list, and those on their team.",
									"parentNotice":"Votre enfant peut utiliser le chat vocal avec les joueurs dans sa liste d'amis Epic et dans sa liste d'amis de plateforme, ainsi qu'avec les membres de son \u00e9quipe."
								 },
								 "it":{
									"label":"Amici e compagni di squadra",
									"userNotice":"You can voice chat with players in their Epic friends list and platform friends list, and those on their team.",
									"parentNotice":"Il tuo minore pu\u00f2 comunicare via chat vocale con i giocatori che fanno parte della sua lista di amici di Epic e della piattaforma, nonch\u00e9 con i suoi compagni di squadra."
								 },
								 "ja":{
									"label":"\u30d5\u30ec\u30f3\u30c9\u3068\u30c1\u30fc\u30e0\u30e1\u30a4\u30c8",
									"userNotice":"You can voice chat with players in their Epic friends list and platform friends list, and those on their team.",
									"parentNotice":"\u304a\u5b50\u69d8\u306f\u3001Epic\u306e\u30d5\u30ec\u30f3\u30c9\u30ea\u30b9\u30c8\u3084\u30d7\u30e9\u30c3\u30c8\u30d5\u30a9\u30fc\u30e0\u306e\u30d5\u30ec\u30f3\u30c9\u30ea\u30b9\u30c8\u306e\u30d7\u30ec\u30a4\u30e4\u30fc\u3084\u30c1\u30fc\u30e0\u4e0a\u306e\u30d7\u30ec\u30a4\u30e4\u30fc\u3068\u30dc\u30a4\u30b9\u30c1\u30e3\u30c3\u30c8\u3067\u304d\u307e\u3059\u3002"
								 },
								 "ko":{
									"label":"\uce5c\uad6c \ubc0f \ud300\uc6d0",
									"userNotice":"You can voice chat with players in their Epic friends list and platform friends list, and those on their team.",
									"parentNotice":"\uc790\ub140\uac00 \uc5d0\ud53d \uce5c\uad6c \ubaa9\ub85d\uacfc \ud50c\ub7ab\ud3fc \uce5c\uad6c \ubaa9\ub85d\uc5d0 \uc788\ub294 \ud50c\ub808\uc774\uc5b4 \ubc0f \ud300\uc6d0\uacfc \uc74c\uc131 \ucc44\ud305\uc744 \ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."
								 },
								 "pl":{
									"label":"Znajomi i cz\u0142onkowie dru\u017cyny",
									"userNotice":"You can voice chat with players in their Epic friends list and platform friends list, and those on their team.",
									"parentNotice":"Twoje dziecko mo\u017ce rozmawia\u0107 przez czat g\u0142osowy z ka\u017cd\u0105 osob\u0105 ze swojej listy znajomych w Epic i na platformie oraz z osobami ze swojej dru\u017cyny."
								 },
								 "pt-BR":{
									"label":"Amigos e colegas de equipe",
									"userNotice":"You can voice chat with players in their Epic friends list and platform friends list, and those on their team.",
									"parentNotice":"Seu filho ou filha pode conversar por bate-papo por voz com jogadores nas listas de amigos da Epic e da plataforma usada e com aqueles em sua equipe."
								 },
								 "ru":{
									"label":"\u0414\u0440\u0443\u0437\u044c\u044f \u0438 \u043a\u043e\u043c\u0430\u043d\u0434\u0430",
									"userNotice":"You can voice chat with players in their Epic friends list and platform friends list, and those on their team.",
									"parentNotice":"\u0412\u0430\u0448 \u0440\u0435\u0431\u0451\u043d\u043e\u043a \u043c\u043e\u0436\u0435\u0442 \u043e\u0431\u0449\u0430\u0442\u044c\u0441\u044f \u0432 \u0433\u043e\u043b\u043e\u0441\u043e\u0432\u043e\u043c \u0447\u0430\u0442\u0435 \u0441 \u0438\u0433\u0440\u043e\u043a\u0430\u043c\u0438 \u0438\u0437 \u0441\u0432\u043e\u0435\u0433\u043e \u0441\u043f\u0438\u0441\u043a\u0430 \u0434\u0440\u0443\u0437\u0435\u0439 Epic, \u0438\u0437 \u0441\u043f\u0438\u0441\u043a\u0430 \u0434\u0440\u0443\u0437\u0435\u0439 \u0434\u043b\u044f \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u044b \u0438 \u0447\u043b\u0435\u043d\u0430\u043c\u0438 \u0441\u0432\u043e\u0435\u0439 \u043a\u043e\u043c\u0430\u043d\u0434\u044b."
								 },
								 "th":{
									"label":"\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e19\u0e41\u0e25\u0e30\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e19\u0e23\u0e48\u0e27\u0e21\u0e17\u0e35\u0e21",
									"userNotice":"You can voice chat with players in their Epic friends list and platform friends list, and those on their team.",
									"parentNotice":"\u0e1a\u0e38\u0e15\u0e23\u0e2b\u0e25\u0e32\u0e19\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e2a\u0e32\u0e21\u0e32\u0e23\u0e16\u0e41\u0e0a\u0e17\u0e40\u0e2a\u0e35\u0e22\u0e07\u0e01\u0e31\u0e1a\u0e1c\u0e39\u0e49\u0e40\u0e25\u0e48\u0e19\u0e43\u0e19\u0e23\u0e32\u0e22\u0e0a\u0e37\u0e48\u0e2d\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e19 Epic Games \u0e41\u0e25\u0e30\u0e23\u0e32\u0e22\u0e0a\u0e37\u0e48\u0e2d\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e19\u0e1a\u0e19\u0e41\u0e1e\u0e25\u0e15\u0e1f\u0e2d\u0e23\u0e4c\u0e21 \u0e41\u0e25\u0e30\u0e1c\u0e39\u0e49\u0e40\u0e25\u0e48\u0e19\u0e43\u0e19\u0e17\u0e35\u0e21\u0e02\u0e2d\u0e07\u0e15\u0e19\u0e44\u0e14\u0e49"
								 },
								 "tr":{
									"label":"Arkada\u015flar ve Tak\u0131m Arkada\u015flar\u0131",
									"userNotice":"You can voice chat with players in their Epic friends list and platform friends list, and those on their team.",
									"parentNotice":"\u00c7ocu\u011funuz, Epic arkada\u015f listesindeki, platform arkada\u015f listesindeki ve tak\u0131m\u0131ndaki oyuncularla sesli sohbet edebilir."
								 },
								 "zh-CN":{
									"label":"\u597d\u53cb\u4e0e\u961f\u53cb",
									"userNotice":"You can voice chat with players in their Epic friends list and platform friends list, and those on their team.",
									"parentNotice":"\u60a8\u7684\u5b69\u5b50\u53ef\u4ee5\u4e0e\u5728\u5176 Epic \u597d\u53cb\u5217\u8868\u4e2d\u7684\u73a9\u5bb6\uff0c\u5176\u5e73\u53f0\u597d\u53cb\u5217\u8868\u4e2d\u7684\u73a9\u5bb6\uff0c\u4ee5\u53ca\u548c\u5176\u4e00\u8d77\u7ec4\u961f\u7684\u73a9\u5bb6\u8fdb\u884c\u8bed\u97f3\u4ea4\u6d41\u3002"
								 },
								 "zh-Hant":{
									"label":"\u597d\u53cb\u8207\u968a\u53cb",
									"userNotice":"You can voice chat with players in their Epic friends list and platform friends list, and those on their team.",
									"parentNotice":"\u60a8\u7684\u5b50\u5973\u53ef\u4ee5\u548c\u4ed6\u5011\u7684 Epic \u597d\u53cb\u540d\u55ae\u53ca\u5e73\u53f0\u597d\u53cb\u540d\u55ae\u4e2d\u7684\u73a9\u5bb6\uff0c\u4ee5\u53ca\u540c\u968a\u4e2d\u7684\u73a9\u5bb6\u9032\u884c\u8a9e\u97f3\u804a\u5929\u3002"
								 }
							  }
						   },
						   {
							  "value":"everybody",
							  "translations":{
								 "en":{
									"label":"Everybody",
									"userNotice":"You can voice chat with any player.",
									"parentNotice":"Your child can voice chat with any player."
								 },
								 "ar":{
									"label":"\u0627\u0644\u062c\u0645\u064a\u0639",
									"userNotice":"You can voice chat with any player.",
									"parentNotice":"\u064a\u0645\u0643\u0646 \u0644\u0637\u0641\u0644\u0643 \u0625\u062c\u0631\u0627\u0621 \u0627\u0644\u062f\u0631\u062f\u0634\u0629 \u0627\u0644\u0635\u0648\u062a\u064a\u0629 \u0645\u0639 \u0623\u064a \u0644\u0627\u0639\u0628."
								 },
								 "de":{
									"label":"Alle",
									"userNotice":"You can voice chat with any player.",
									"parentNotice":"Ihr Kind kann den Sprach-Chat mit allen Spielern verwenden."
								 },
								 "es":{
									"label":"Todos",
									"userNotice":"You can voice chat with any player.",
									"parentNotice":"El menor podr\u00e1 usar el chat de voz con cualquier jugador."
								 },
								 "es-ES":{
									"label":"Todos",
									"userNotice":"You can voice chat with any player.",
									"parentNotice":"El menor podr\u00e1 usar el chat de voz con cualquier jugador."
								 },
								 "es-MX":{
									"label":"Todos",
									"userNotice":"You can voice chat with any player.",
									"parentNotice":"Tu hijo o hija puede usar el chat de voz con cualquier jugador."
								 },
								 "fr":{
									"label":"Tout le monde",
									"userNotice":"You can voice chat with any player.",
									"parentNotice":"Votre enfant peut utiliser le chat vocal avec tous les joueurs."
								 },
								 "it":{
									"label":"Tutti",
									"userNotice":"You can voice chat with any player.",
									"parentNotice":"Il tuo minore pu\u00f2 comunicare via chat vocale con qualsiasi giocatore."
								 },
								 "ja":{
									"label":"\u5168\u54e1\u3068\u3059\u308b",
									"userNotice":"You can voice chat with any player.",
									"parentNotice":"\u304a\u5b50\u69d8\u306f\u3001\u3059\u3079\u3066\u306e\u30d7\u30ec\u30a4\u30e4\u30fc\u3068\u30dc\u30a4\u30b9\u30c1\u30e3\u30c3\u30c8\u3067\u304d\u307e\u3059\u3002"
								 },
								 "ko":{
									"label":"\ubaa8\ub450 \uac00\ub2a5",
									"userNotice":"You can voice chat with any player.",
									"parentNotice":"\uc790\ub140\uac00 \ubaa8\ub4e0 \ud50c\ub808\uc774\uc5b4\uc640 \uc74c\uc131 \ucc44\ud305\uc744 \ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."
								 },
								 "pl":{
									"label":"Wszyscy",
									"userNotice":"You can voice chat with any player.",
									"parentNotice":"Dziecko mo\u017ce rozmawia\u0107 przez czat g\u0142osowy z ka\u017cd\u0105 osob\u0105 graj\u0105c\u0105."
								 },
								 "pt-BR":{
									"label":"Todos",
									"userNotice":"You can voice chat with any player.",
									"parentNotice":"Seu filho ou filha pode conversar por voz com qualquer jogador."
								 },
								 "ru":{
									"label":"\u0421\u043e\u0432\u0441\u0435\u043c\u0438",
									"userNotice":"You can voice chat with any player.",
									"parentNotice":"\u0412\u0430\u0448 \u0440\u0435\u0431\u0451\u043d\u043e\u043a \u043c\u043e\u0436\u0435\u0442 \u043e\u0431\u0449\u0430\u0442\u044c\u0441\u044f \u0432 \u0433\u043e\u043b\u043e\u0441\u043e\u0432\u043e\u043c \u0447\u0430\u0442\u0435 \u0441 \u043b\u044e\u0431\u044b\u043c \u0438\u0433\u0440\u043e\u043a\u043e\u043c."
								 },
								 "th":{
									"label":"\u0e17\u0e38\u0e01\u0e04\u0e19",
									"userNotice":"You can voice chat with any player.",
									"parentNotice":"\u0e1a\u0e38\u0e15\u0e23\u0e2b\u0e25\u0e32\u0e19\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e2a\u0e32\u0e21\u0e32\u0e23\u0e16\u0e41\u0e0a\u0e17\u0e14\u0e49\u0e27\u0e22\u0e40\u0e2a\u0e35\u0e22\u0e07\u0e01\u0e31\u0e1a\u0e1c\u0e39\u0e49\u0e40\u0e25\u0e48\u0e19\u0e44\u0e14\u0e49\u0e17\u0e38\u0e01\u0e04\u0e19"
								 },
								 "tr":{
									"label":"Herkes",
									"userNotice":"You can voice chat with any player.",
									"parentNotice":"\u00c7ocu\u011funuz herhangi bir oyuncuyla sesli sohbet edebilir."
								 },
								 "zh-CN":{
									"label":"\u6240\u6709\u4eba",
									"userNotice":"You can voice chat with any player.",
									"parentNotice":"\u60a8\u7684\u5b69\u5b50\u53ef\u4ee5\u4e0e\u4efb\u4f55\u73a9\u5bb6\u8fdb\u884c\u8bed\u97f3\u804a\u5929\u3002"
								 },
								 "zh-Hant":{
									"label":"\u6240\u6709\u4eba",
									"userNotice":"You can voice chat with any player.",
									"parentNotice":"\u60a8\u7684\u5b50\u5973\u53ef\u4ee5\u548c\u4efb\u610f\u73a9\u5bb6\u9032\u884c\u8a9e\u97f3\u804a\u5929\u3002"
								 }
							  }
						   }
						],
						"restrictiveOrder":"firstRestrictive",
						"userHidden":false,
						"userReadOnly":false,
						"required":false,
						"ageBracket":{
						   "consentTypeRequired":"none",
						   "consentTypeUnderParentalControl":"opt-in-unverified",
						   "defaultValue":"everybody",
						   "defaultParentLimit":"everybody"
						}
					 }
				  },
				  {
					 "namespace":"profile",
					 "settingName":"region-visibility",
					 "preferredValue":"private",
					 "preferredValueUpdatedAt":1664369967640,
					 "preferredValueFromOrgLevel":false,
					 "effectiveValue":"private",
					 "effectiveSource":"preference",
					 "isOrgLevel":false,
					 "definition":{
						"orgId":"cc5b83aa-cb5c-4b4b-a800-a7dd64edacc0",
						"productId":"6fdb114c-3fbc-4ced-bc5b-55bcdba5c8f6",
						"namespace":"profile",
						"settingName":"region-visibility",
						"valueType":"option",
						"allowProductOverrides":"ageBrackets",
						"inheritFromOrg":true,
						"translations":{
						   "en":{
							  "label":"TBD",
							  "userNotice":"TBD",
							  "parentNotice":"TBD"
						   }
						},
						"options":[
						   {
							  "value":"private",
							  "translations":{
								 "en":{
									"label":"Private",
									"userNotice":"TBD",
									"parentNotice":"TBD"
								 }
							  }
						   },
						   {
							  "value":"friends-only",
							  "translations":{
								 "en":{
									"label":"Friends Only",
									"parentNotice":"TODO"
								 }
							  }
						   },
						   {
							  "value":"public",
							  "translations":{
								 "en":{
									"label":"Public",
									"userNotice":"TBD",
									"parentNotice":"TBD"
								 }
							  }
						   }
						],
						"restrictiveOrder":"firstRestrictive",
						"userHidden":false,
						"userReadOnly":false,
						"required":false,
						"ageBracket":{
						   "consentTypeRequired":"none",
						   "defaultValue":"public",
						   "enforcedLimit":"public"
						}
					 }
				  },
				  {
					 "namespace":"profile",
					 "settingName":"require-pin-to-add-friend",
					 "preferredValue":false,
					 "preferredValueFromOrgLevel":true,
					 "parentLimit":false,
					 "parentLimitFromOrgLevel":true,
					 "parentLimitUpdatedAt":1663702993922,
					 "effectiveValue":false,
					 "effectiveSource":"default",
					 "isOrgLevel":true,
					 "definition":{
						"orgId":"cc5b83aa-cb5c-4b4b-a800-a7dd64edacc0",
						"productId":"6fdb114c-3fbc-4ced-bc5b-55bcdba5c8f6",
						"namespace":"profile",
						"settingName":"require-pin-to-add-friend",
						"valueType":"boolean",
						"allowProductOverrides":"ageBrackets",
						"inheritFromOrg":true,
						"translations":{
						   "en":{
							  "label":"Require PIN to add Epic friends",
							  "parentNotice":"<b>On:</b> Each time your child tries to send or accept an Epic Games friend request, you will need to enter your PIN. If a game or service doesn't yet support this setting, friend requests won't be permitted. This setting doesn\u2019t affect friends systems on gaming platforms such as Playstation, Steam, XBox, and Switch."
						   },
						   "ar":{
							  "label":"\u062a\u062a\u0637\u0644\u0628 PIN \u0644\u0625\u0636\u0627\u0641\u0629 \u0623\u0635\u062f\u0642\u0627\u0621 Epic",
							  "parentNotice":"<b>\u062a\u0634\u063a\u064a\u0644:</b> \u0641\u064a \u0643\u0644 \u0645\u0631\u0629 \u064a\u062d\u0627\u0648\u0644 \u0637\u0641\u0644\u0643 \u0625\u0631\u0633\u0627\u0644 \u0623\u0648 \u0642\u0628\u0648\u0644 \u0637\u0644\u0628 \u0635\u062f\u0627\u0642\u0629 Epic Games\u060c \u0633\u062a\u062d\u062a\u0627\u062c \u0625\u0644\u0649 \u0625\u062f\u062e\u0627\u0644 \u0631\u0645\u0632 PIN \u0627\u0644\u062e\u0627\u0635 \u0628\u0643. \u0625\u0630\u0627 \u0643\u0627\u0646\u062a \u0647\u0646\u0627\u0643 \u0644\u0639\u0628\u0629 \u0623\u0648 \u062e\u062f\u0645\u0629 \u0644\u0627 \u062a\u062f\u0639\u0645 \u0647\u0630\u0627 \u0627\u0644\u0625\u0639\u062f\u0627\u062f \u0628\u0639\u062f\u060c \u0641\u0644\u0646 \u064a\u064f\u0633\u0645\u062d \u0628\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0635\u062f\u0627\u0642\u0629. \u0644\u0627 \u064a\u0624\u062b\u0631 \u0647\u0630\u0627 \u0627\u0644\u0625\u0639\u062f\u0627\u062f \u0639\u0644\u0649 \u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0635\u062f\u0627\u0642\u0629 \u0639\u0644\u0649 \u0645\u0646\u0635\u0627\u062a \u0627\u0644\u0623\u0644\u0639\u0627\u0628 \u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0629 \u0645\u062b\u0644 PlayStation \u0648Steam \u0648Xbox \u0648Switch."
						   },
						   "de":{
							  "label":"Epic-Freunde hinzuzuf\u00fcgen, erfordert die PIN.",
							  "parentNotice":"<b>Ein:</b> Jedes Mal, wenn Ihr Kind versucht, eine Epic Games-Freundschaftsanfrage zu senden oder anzunehmen, m\u00fcssen Sie Ihre Kindersicherungs-PIN eingeben. Bei Spielen oder Diensten, die diese Einstellung noch nicht unterst\u00fctzen, werden Freundschaftsanfragen nicht zugelassen. Diese Einstellung hat keinen Einfluss auf die Freundefunktionen von Spiele-Plattformen wie PlayStation, Steam, Xbox oder Switch."
						   },
						   "es":{
							  "label":"Requerir PIN para a\u00f1adir amigos en Epic",
							  "parentNotice":"<b>Activado:</b> deber\u00e1s introducir el PIN cada vez que el menor intente enviar o aceptar una solicitud de amistad de Epic Games. Si un juego o servicio a\u00fan no es compatible con esta opci\u00f3n, no se permitir\u00e1n las solicitudes de amistad. Esta opci\u00f3n no afecta a los sistemas de amigos de plataformas de juego como PlayStation, Steam, Xbox o Switch."
						   },
						   "es-ES":{
							  "label":"Requerir PIN para a\u00f1adir amigos en Epic",
							  "parentNotice":"<b>Activado:</b> deber\u00e1s introducir el PIN cada vez que el menor intente enviar o aceptar una solicitud de amistad de Epic Games. Si un juego o servicio a\u00fan no es compatible con esta opci\u00f3n, no se permitir\u00e1n las solicitudes de amistad. Esta opci\u00f3n no afecta a los sistemas de amigos de plataformas de juego como PlayStation, Steam, Xbox o Switch."
						   },
						   "es-MX":{
							  "label":"Solicitar PIN para agregar amigos de Epic",
							  "parentNotice":"<b>Activado:</b> Cada vez que tu hijo o hija intente enviar o aceptar solicitudes de amigos de Epic Games, deber\u00e1s ingresar tu PIN. Si un juego o servicio no es compatible con esta opci\u00f3n, no se permitir\u00e1 enviar solicitudes de amigos. Esta opci\u00f3n no afecta los sistemas de amigos de plataformas de juego como PlayStation, Steam, Xbox y Switch."
						   },
						   "fr":{
							  "label":"Exiger un code PIN pour ajouter des amis Epic",
							  "parentNotice":"<b>Activ\u00e9\u00a0:</b> chaque fois que votre enfant tentera d'envoyer ou d'accepter une demande d'ami Epic\u00a0Games, vous devrez saisir votre code PIN de contr\u00f4le parental. Si un jeu ou un service ne prend pas encore en charge ce param\u00e8tre, les demandes d'ami ne seront pas autoris\u00e9es. Ce param\u00e8tre n'affecte pas les syst\u00e8mes d'amis sur les plateformes de jeu telles que PlayStation, Steam, Xbox et Switch."
						   },
						   "it":{
							  "label":"Per aggiungere gli amici di Epic \u00e8 richiesto un PIN",
							  "parentNotice":"<b>Attivato:</b> ogni volta che il tuo minore vuole inviare o accettare una richiesta di amicizia di Epic Games dovrai inserire il tuo PIN. Se un gioco o un servizio non supportano questa impostazione, le richieste di amicizia non saranno consentite. Questa impostazione non modifica i sistemi relativi alle amicizie sulle piattaforme di gioco come PlayStation, Steam, Xbox e Switch."
						   },
						   "ja":{
							  "label":"Epic\u30d5\u30ec\u30f3\u30c9\u306e\u8ffd\u52a0\u6642\u306b\u6697\u8a3c\u756a\u53f7\uff08PIN\uff09\u3092\u5fc5\u9808\u306b\u3059\u308b",
							  "parentNotice":"<b>\u30aa\u30f3\uff1a</b>\u304a\u5b50\u69d8\u304cEpic Games\u306e\u30d5\u30ec\u30f3\u30c9\u30ea\u30af\u30a8\u30b9\u30c8\u306e\u9001\u4fe1\u307e\u305f\u306f\u627f\u8a8d\u3092\u8a66\u307f\u308b\u305f\u3073\u306b\u3001\u304a\u5ba2\u69d8\u306e\u6697\u8a3c\u756a\u53f7\uff08PIN\uff09\u304c\u5fc5\u8981\u306b\u306a\u308a\u307e\u3059\u3002\u3053\u306e\u8a2d\u5b9a\u3092\u30b5\u30dd\u30fc\u30c8\u3057\u3066\u3044\u306a\u3044\u30b2\u30fc\u30e0\u3084\u30b5\u30fc\u30d3\u30b9\u3067\u306f\u3001\u30d5\u30ec\u30f3\u30c9\u30ea\u30af\u30a8\u30b9\u30c8\u304c\u8a31\u53ef\u3055\u308c\u307e\u305b\u3093\u3002\u3053\u306e\u8a2d\u5b9a\u306f\u3001PlayStation\u3001Steam\u3001Xbox\u3001Switch\u306a\u3069\u306e\u30b2\u30fc\u30e0\u30d7\u30e9\u30c3\u30c8\u30d5\u30a9\u30fc\u30e0\u3067\u306e\u30d5\u30ec\u30f3\u30c9\u30b7\u30b9\u30c6\u30e0\u306b\u306f\u5f71\u97ff\u3057\u307e\u305b\u3093\u3002"
						   },
						   "ko":{
							  "label":"\uc5d0\ud53d \uce5c\uad6c \ucd94\uac00 \uc2dc PIN \ud544\uc694",
							  "parentNotice":"<b>\ucf1c\uae30:</b> \uc790\ub140\uac00 \uc5d0\ud53d\uac8c\uc784\uc988 \uce5c\uad6c \uc694\uccad\uc744 \ubcf4\ub0b4\uac70\ub098 \uc218\ub77d\ud558\ub824\uace0 \ud560 \ub54c\ub9c8\ub2e4 \ubcf4\ud638\uc790\uac00 PIN\uc744 \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4. \uac8c\uc784\uc774\ub098 \uc11c\ube44\uc2a4\uac00 \uc544\uc9c1 \uc774\ub7ec\ud55c \uc124\uc815\uc744 \uc9c0\uc6d0\ud558\uc9c0 \uc54a\ub294 \uacbd\uc6b0, \uce5c\uad6c \uc694\uccad\uc740 \ud5c8\uc6a9\ub418\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4. \uc774 \uc124\uc815\uc740 PlayStation, Steam, Xbox, Switch\uc640 \uac19\uc740 \uac8c\uc784 \ud50c\ub7ab\ud3fc\uc758 \uce5c\uad6c \uc2dc\uc2a4\ud15c\uc5d0\ub294 \uc601\ud5a5\uc744 \uc8fc\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4."
						   },
						   "pl":{
							  "label":"Wymagaj kodu PIN, \u017ceby doda\u0107 znajomych w Epic",
							  "parentNotice":"<b>W\u0142.:</b> przy ka\u017cdej podj\u0119tej przez dziecko pr\u00f3bie wys\u0142ania zaproszenia do znajomych z Epic Games lub zaakceptowania zaproszenia od znajomych z Epic Games konieczne b\u0119dzie wpisanie przez Ciebie kodu PIN. Je\u015bli jaka\u015b gra lub us\u0142uga nie obs\u0142uguje tego ustawienia, wysy\u0142anie lub otrzymywanie zaprosze\u0144 nie b\u0119dzie dozwolone. Ustawienie to pozostaje bez wp\u0142ywu na system zarz\u0105dzania znajomo\u015bciami na platformach takich jak PlayStation, Steam, Xbox czy Switch."
						   },
						   "pt-BR":{
							  "label":"Exigir PIN para adicionar amigos da Epic",
							  "parentNotice":"<b>Ligado:</b> sempre que seu filho ou filha tentar enviar ou aceitar uma solicita\u00e7\u00e3o de amizade da Epic Games, voc\u00ea precisar\u00e1 inserir o PIN. Se um jogo ou servi\u00e7o ainda n\u00e3o for compat\u00edvel com esta configura\u00e7\u00e3o, as solicita\u00e7\u00f5es de amizade n\u00e3o ser\u00e3o permitidas. Esta configura\u00e7\u00e3o n\u00e3o afeta os sistemas de amizade em plataformas de jogos como PlayStation, Steam, Xbox e Switch."
						   },
						   "ru":{
							  "label":"\u0417\u0430\u043f\u0440\u0430\u0448\u0438\u0432\u0430\u0442\u044c PIN-\u043a\u043e\u0434 \u0434\u043b\u044f \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u0434\u0440\u0443\u0437\u0435\u0439 \u0432 Epic",
							  "parentNotice":"<b>\u0412\u043a\u043b.:</b> \u043a\u0430\u0436\u0434\u044b\u0439 \u0440\u0430\u0437, \u043a\u043e\u0433\u0434\u0430 \u0432\u0430\u0448 \u0440\u0435\u0431\u0451\u043d\u043e\u043a \u043f\u044b\u0442\u0430\u0435\u0442\u0441\u044f \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0438\u043b\u0438 \u043f\u0440\u0438\u043d\u044f\u0442\u044c \u0437\u0430\u043f\u0440\u043e\u0441 \u043d\u0430 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0432 \u0434\u0440\u0443\u0437\u044c\u044f \u0432 Epic Games, \u0432\u0430\u043c \u043f\u043e\u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u0432\u0432\u0435\u0441\u0442\u0438 \u0441\u0432\u043e\u0439 PIN-\u043a\u043e\u0434. \u0415\u0441\u043b\u0438 \u0438\u0433\u0440\u0430 \u0438\u043b\u0438 \u0441\u0435\u0440\u0432\u0438\u0441 \u0435\u0449\u0451 \u043d\u0435 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442 \u044d\u0442\u0443 \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0443, \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u044f\u0442\u044c \u0438\u043b\u0438 \u043f\u0440\u0438\u043d\u0438\u043c\u0430\u0442\u044c \u0437\u0430\u043f\u0440\u043e\u0441\u044b \u043d\u0430 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0432 \u0434\u0440\u0443\u0437\u044c\u044f \u0431\u0443\u0434\u0435\u0442 \u043d\u0435\u043b\u044c\u0437\u044f. \u042d\u0442\u0430 \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0430 \u043d\u0435 \u043f\u043e\u0432\u043b\u0438\u044f\u0435\u0442 \u043d\u0430 \u0440\u0430\u0431\u043e\u0442\u0443 \u0441\u0438\u0441\u0442\u0435\u043c\u044b \u0434\u0440\u0443\u0437\u0435\u0439 \u043d\u0430 \u0442\u0430\u043a\u0438\u0445 \u0438\u0433\u0440\u043e\u0432\u044b\u0445 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0430\u0445, \u043a\u0430\u043a PlayStation, Steam, Xbox \u0438 Switch."
						   },
						   "th":{
							  "label":"\u0e15\u0e49\u0e2d\u0e07\u0e43\u0e0a\u0e49 PIN \u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e40\u0e1e\u0e34\u0e48\u0e21\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e19 Epic",
							  "parentNotice":"<b>\u0e40\u0e1b\u0e34\u0e14:</b> \u0e15\u0e49\u0e2d\u0e07\u0e43\u0e0a\u0e49 PIN \u0e01\u0e32\u0e23\u0e04\u0e27\u0e1a\u0e04\u0e38\u0e21\u0e42\u0e14\u0e22\u0e1c\u0e39\u0e49\u0e1b\u0e01\u0e04\u0e23\u0e2d\u0e07\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e17\u0e38\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07\u0e17\u0e35\u0e48\u0e1a\u0e38\u0e15\u0e23\u0e2b\u0e25\u0e32\u0e19\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e1e\u0e22\u0e32\u0e22\u0e32\u0e21\u0e2a\u0e48\u0e07\u0e2b\u0e23\u0e37\u0e2d\u0e01\u0e14\u0e23\u0e31\u0e1a\u0e04\u0e33\u0e02\u0e2d\u0e40\u0e1b\u0e47\u0e19\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e19\u0e43\u0e19 Epic Games \u0e2b\u0e32\u0e01\u0e40\u0e01\u0e21\u0e2b\u0e23\u0e37\u0e2d\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23\u0e22\u0e31\u0e07\u0e44\u0e21\u0e48\u0e23\u0e2d\u0e07\u0e23\u0e31\u0e1a\u0e01\u0e32\u0e23\u0e15\u0e31\u0e49\u0e07\u0e04\u0e48\u0e32\u0e19\u0e35\u0e49 \u0e04\u0e33\u0e02\u0e2d\u0e40\u0e1b\u0e47\u0e19\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e19\u0e08\u0e30\u0e44\u0e21\u0e48\u0e44\u0e14\u0e49\u0e23\u0e31\u0e1a\u0e2d\u0e19\u0e38\u0e0d\u0e32\u0e15 \u0e01\u0e32\u0e23\u0e15\u0e31\u0e49\u0e07\u0e04\u0e48\u0e32\u0e19\u0e35\u0e49\u0e44\u0e21\u0e48\u0e2a\u0e48\u0e07\u0e1c\u0e25\u0e15\u0e48\u0e2d\u0e23\u0e30\u0e1a\u0e1a\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e19\u0e43\u0e19\u0e41\u0e1e\u0e25\u0e15\u0e1f\u0e2d\u0e23\u0e4c\u0e21\u0e40\u0e01\u0e21\u0e2d\u0e22\u0e48\u0e32\u0e07 PlayStation, Steam, Xbox \u0e41\u0e25\u0e30 Switch"
						   },
						   "tr":{
							  "label":"Epic'te arkada\u015f eklemek i\u00e7in PIN kodu isteyin",
							  "parentNotice":"<b>A\u00e7\u0131k:</b> \u00c7ocu\u011funuzun bir Epic Games arkada\u015fl\u0131k iste\u011fi g\u00f6nderebilmesi veya kabul edebilmesi i\u00e7in PIN kodunuzu girmeniz gerekir. Bir oyun ya da hizmet bu ayar\u0131 desteklemedi\u011fi durumlarda arkada\u015fl\u0131k iste\u011fi g\u00f6nderilmesine izin verilmeyecektir. Bu ayar PlayStation, Steam, Xbox ve Switch gibi oyun platformlar\u0131ndaki arkada\u015f sistemlerini etkilemez."
						   },
						   "zh-CN":{
							  "label":"\u6dfb\u52a0 Epic \u597d\u53cb\u65f6\u9700\u8981\u8f93\u5165 PIN \u7801",
							  "parentNotice":"<b>\u5f00\uff1a</b>\u6bcf\u6b21\u60a8\u7684\u5b69\u5b50\u5c1d\u8bd5\u53d1\u9001\u6216\u63a5\u53d7 Epic Games \u597d\u53cb\u8bf7\u6c42\u65f6\uff0c\u60a8\u90fd\u9700\u8981\u8f93\u5165\u5bb6\u957f\u63a7\u5236 PIN \u7801\u3002\u5982\u679c\u6e38\u620f\u6216\u670d\u52a1\u5c1a\u4e0d\u652f\u6301\u60a8\u7684\u9009\u62e9\uff0c\u5219\u5c06\u4e0d\u5141\u8bb8\u597d\u53cb\u8bf7\u6c42\u3002\u8be5\u8bbe\u7f6e\u5e76\u4e0d\u5f71\u54cd\u8bf8\u5982 PlayStation\uff0cSteam\uff0cXbox \u4e0e Switch \u7b49\u6e38\u620f\u5e73\u53f0\u7684\u597d\u53cb\u7cfb\u7edf\u3002"
						   },
						   "zh-Hant":{
							  "label":"\u9700\u8981\u8f38\u5165 PIN \u78bc\u624d\u80fd\u65b0\u589e Epic \u597d\u53cb",
							  "parentNotice":"<b>\u958b\u555f\uff1a</b>\u6bcf\u7576\u60a8\u7684\u5b50\u5973\u8a66\u5716\u767c\u9001\u6216\u63a5\u53d7 Epic Games \u597d\u53cb\u8acb\u6c42\u6642\uff0c\u90fd\u5fc5\u9808\u8f38\u5165\u60a8\u7684\u5bb6\u9577\u63a7\u5236 PIN \u78bc\u3002\u82e5\u904a\u6232\u6216\u670d\u52d9\u5c1a\u4e0d\u652f\u63f4\u6b64\u8a2d\u5b9a\uff0c\u5247\u5c07\u4e0d\u5141\u8a31\u767c\u9001\u597d\u53cb\u8acb\u6c42\u3002\u6b64\u8a2d\u5b9a\u4e0d\u5f71\u97ff\u904a\u6232\u5e73\u53f0\uff08\u5982 PlayStation\u3001Steam\u3001Xbox \u53ca Switch\uff09\u4e0a\u7684\u597d\u53cb\u8a2d\u5b9a\u3002"
						   }
						},
						"options":[
						   
						],
						"restrictiveOrder":"falsePermissive",
						"userHidden":true,
						"userReadOnly":false,
						"required":false,
						"ageBracket":{
						   "consentTypeRequired":"none",
						   "consentTypeUnderParentalControl":"opt-in-unverified",
						   "defaultValue":false,
						   "defaultParentLimit":false
						}
					 }
				  },
				  {
					 "namespace":"profile",
					 "settingName":"badges-visibility",
					 "preferredValue":"private",
					 "preferredValueUpdatedAt":1664369967641,
					 "preferredValueFromOrgLevel":false,
					 "effectiveValue":"private",
					 "effectiveSource":"preference",
					 "isOrgLevel":false,
					 "definition":{
						"orgId":"cc5b83aa-cb5c-4b4b-a800-a7dd64edacc0",
						"productId":"6fdb114c-3fbc-4ced-bc5b-55bcdba5c8f6",
						"namespace":"profile",
						"settingName":"badges-visibility",
						"valueType":"option",
						"allowProductOverrides":"ageBrackets",
						"inheritFromOrg":true,
						"translations":{
						   "en":{
							  "label":"TBD",
							  "userNotice":"TBD",
							  "parentNotice":"TBD"
						   }
						},
						"options":[
						   {
							  "value":"private",
							  "translations":{
								 "en":{
									"label":"Private",
									"userNotice":"TBD",
									"parentNotice":"TBD"
								 }
							  }
						   },
						   {
							  "value":"friends-only",
							  "translations":{
								 "en":{
									"label":"Friends Only",
									"parentNotice":"TBD"
								 }
							  }
						   }
						],
						"restrictiveOrder":"firstRestrictive",
						"userHidden":false,
						"userReadOnly":false,
						"required":false,
						"ageBracket":{
						   "consentTypeRequired":"none",
						   "defaultValue":"friends-only",
						   "enforcedLimit":"friends-only"
						}
					 }
				  },
				  {
					 "namespace":"profile",
					 "settingName":"player-surveys",
					 "preferredValue":true,
					 "preferredValueUpdatedAt":1663966642975,
					 "preferredValueFromOrgLevel":false,
					 "effectiveValue":true,
					 "effectiveSource":"preference",
					 "isOrgLevel":false,
					 "definition":{
						"orgId":"cc5b83aa-cb5c-4b4b-a800-a7dd64edacc0",
						"productId":"6fdb114c-3fbc-4ced-bc5b-55bcdba5c8f6",
						"namespace":"profile",
						"settingName":"player-surveys",
						"valueType":"boolean",
						"allowProductOverrides":"ageBrackets",
						"inheritFromOrg":true,
						"translations":{
						   "en":{
							  "label":"Player Surveys",
							  "userNotice":"Player Surveys",
							  "parentNotice":"Player Surveys"
						   }
						},
						"options":[
						   
						],
						"restrictiveOrder":"falseRestrictive",
						"userHidden":false,
						"userReadOnly":false,
						"required":false,
						"ageBracket":{
						   "consentTypeRequired":"none",
						   "defaultValue":true,
						   "enforcedLimit":true
						}
					 }
				  },
				  {
					 "namespace":"discovery-browser",
					 "settingName":"experience-browser",
					 "preferredValue":true,
					 "preferredValueFromOrgLevel":true,
					 "effectiveValue":true,
					 "effectiveSource":"default",
					 "isOrgLevel":true,
					 "definition":{
						"orgId":"cc5b83aa-cb5c-4b4b-a800-a7dd64edacc0",
						"productId":"6fdb114c-3fbc-4ced-bc5b-55bcdba5c8f6",
						"namespace":"discovery-browser",
						"settingName":"experience-browser",
						"valueType":"boolean",
						"allowProductOverrides":"ageBrackets",
						"inheritFromOrg":true,
						"translations":{
						   "en":{
							  "label":"Content can be targeted for experience purposes",
							  "userNotice":"Determines if you can be targeted content, based on personal data, for experience purposes",
							  "parentNotice":"Determines if your child can be targeted content, based on personal data, for experience purposes"
						   }
						},
						"options":[
						   
						],
						"restrictiveOrder":"falseRestrictive",
						"userHidden":false,
						"userReadOnly":false,
						"required":false,
						"ageBracket":{
						   "consentTypeRequired":"none",
						   "defaultValue":true,
						   "enforcedLimit":true
						}
					 }
				  },
				  {
					 "namespace":"profile",
					 "settingName":"languages-visibility",
					 "preferredValue":"private",
					 "preferredValueUpdatedAt":1664369967641,
					 "preferredValueFromOrgLevel":false,
					 "effectiveValue":"private",
					 "effectiveSource":"preference",
					 "isOrgLevel":false,
					 "definition":{
						"orgId":"cc5b83aa-cb5c-4b4b-a800-a7dd64edacc0",
						"productId":"6fdb114c-3fbc-4ced-bc5b-55bcdba5c8f6",
						"namespace":"profile",
						"settingName":"languages-visibility",
						"valueType":"option",
						"allowProductOverrides":"ageBrackets",
						"inheritFromOrg":true,
						"translations":{
						   "en":{
							  "label":"TBD",
							  "userNotice":"TBD",
							  "parentNotice":"TBD"
						   }
						},
						"options":[
						   {
							  "value":"private",
							  "translations":{
								 "en":{
									"label":"Private",
									"userNotice":"TBD",
									"parentNotice":"TBD"
								 }
							  }
						   },
						   {
							  "value":"friends-only",
							  "translations":{
								 "en":{
									"label":"Friends Only",
									"parentNotice":"TODO"
								 }
							  }
						   },
						   {
							  "value":"public",
							  "translations":{
								 "en":{
									"label":"Public",
									"userNotice":"TBD",
									"parentNotice":"TBD"
								 }
							  }
						   }
						],
						"restrictiveOrder":"firstRestrictive",
						"userHidden":false,
						"userReadOnly":false,
						"required":false,
						"ageBracket":{
						   "consentTypeRequired":"none",
						   "defaultValue":"public",
						   "enforcedLimit":"public"
						}
					 }
				  },
				  {
					 "namespace":"profile",
					 "settingName":"show-season-level",
					 "preferredValue":true,
					 "preferredValueUpdatedAt":1664305793410,
					 "preferredValueFromOrgLevel":false,
					 "effectiveValue":true,
					 "effectiveSource":"preference",
					 "isOrgLevel":false,
					 "definition":{
						"orgId":"cc5b83aa-cb5c-4b4b-a800-a7dd64edacc0",
						"productId":"6fdb114c-3fbc-4ced-bc5b-55bcdba5c8f6",
						"namespace":"profile",
						"settingName":"show-season-level",
						"valueType":"boolean",
						"allowProductOverrides":"ageBrackets",
						"inheritFromOrg":true,
						"translations":{
						   "en":{
							  "label":"Show Season level in feed",
							  "userNotice":"Show Season level in feed",
							  "parentNotice":"Show Season level in feed"
						   }
						},
						"options":[
						   
						],
						"restrictiveOrder":"falseRestrictive",
						"userHidden":false,
						"userReadOnly":false,
						"required":false,
						"ageBracket":{
						   "consentTypeRequired":"none",
						   "defaultValue":true,
						   "enforcedLimit":true
						}
					 }
				  },
				  {
					 "namespace":"party",
					 "settingName":"party-joinability",
					 "preferredValue":"Private",
					 "preferredValueUpdatedAt":1664261857217,
					 "preferredValueFromOrgLevel":false,
					 "effectiveValue":"Private",
					 "effectiveSource":"preference",
					 "isOrgLevel":false,
					 "definition":{
						"orgId":"cc5b83aa-cb5c-4b4b-a800-a7dd64edacc0",
						"productId":"6fdb114c-3fbc-4ced-bc5b-55bcdba5c8f6",
						"namespace":"party",
						"settingName":"party-joinability",
						"valueType":"option",
						"allowProductOverrides":"ageBrackets",
						"inheritFromOrg":true,
						"translations":{
						   "en":{
							  "label":"Party Privacy",
							  "userNotice":"Party Privacy",
							  "parentNotice":"Party Privacy"
						   }
						},
						"options":[
						   {
							  "value":"Private",
							  "translations":{
								 "en":{
									"label":"Private",
									"userNotice":"Private",
									"parentNotice":"Private"
								 }
							  }
						   },
						   {
							  "value":"Public",
							  "translations":{
								 "en":{
									"label":"Public",
									"userNotice":"Public",
									"parentNotice":"Public"
								 }
							  }
						   }
						],
						"restrictiveOrder":"firstRestrictive",
						"userHidden":false,
						"userReadOnly":false,
						"required":false,
						"ageBracket":{
						   "consentTypeRequired":"none",
						   "defaultValue":"Public",
						   "enforcedLimit":"Public"
						}
					 }
				  },
				  {
					 "namespace":"chat",
					 "settingName":"allow-unrecorded-voice-chat",
					 "preferredValue":false,
					 "preferredValueFromOrgLevel":true,
					 "effectiveValue":false,
					 "effectiveSource":"default",
					 "isOrgLevel":true,
					 "definition":{
						"orgId":"cc5b83aa-cb5c-4b4b-a800-a7dd64edacc0",
						"productId":"6fdb114c-3fbc-4ced-bc5b-55bcdba5c8f6",
						"namespace":"chat",
						"settingName":"allow-unrecorded-voice-chat",
						"valueType":"boolean",
						"allowProductOverrides":"ageBrackets",
						"inheritFromOrg":true,
						"translations":{
						   "en":{
							  "label":"Allow unrecorded voice chat",
							  "userNotice":"Allow unrecorded voice chat.",
							  "parentNotice":"Allow unrecorded voice chat."
						   }
						},
						"options":[
						   
						],
						"restrictiveOrder":"falseRestrictive",
						"userHidden":false,
						"userReadOnly":false,
						"required":false,
						"ageBracket":{
						   "consentTypeRequired":"none",
						   "defaultValue":false
						}
					 }
				  },
				  {
					 "namespace":"chat",
					 "settingName":"text",
					 "preferredValue":"everybody",
					 "preferredValueUpdatedAt":1678023125164,
					 "preferredValueFromOrgLevel":false,
					 "parentLimit":"everybody",
					 "parentLimitFromOrgLevel":true,
					 "effectiveValue":"everybody",
					 "effectiveSource":"preference",
					 "isOrgLevel":false,
					 "definition":{
						"orgId":"cc5b83aa-cb5c-4b4b-a800-a7dd64edacc0",
						"productId":"6fdb114c-3fbc-4ced-bc5b-55bcdba5c8f6",
						"namespace":"chat",
						"settingName":"text",
						"valueType":"option",
						"allowProductOverrides":"ageBrackets",
						"inheritFromOrg":true,
						"translations":{
						   "en":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the text chat feature",
							  "parentNotice":"Who can your child message with using Epic text chat?"
						   },
						   "ar":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the text chat feature",
							  "parentNotice":"\u0645\u0646 \u0627\u0644\u0630\u064a \u064a\u0645\u0643\u0646 \u0644\u0637\u0641\u0644\u0643 \u0625\u0631\u0633\u0627\u0644 \u0631\u0633\u0627\u0626\u0644 \u0644\u0647 \u0628\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u062f\u0631\u062f\u0634\u0629 \u0627\u0644\u0646\u0635\u064a\u0629 \u0644\u0640 Epic\u061f"
						   },
						   "de":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the text chat feature",
							  "parentNotice":"Mit wem kann sich Ihr Kind per Epic-Textchat unterhalten?"
						   },
						   "es":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the text chat feature",
							  "parentNotice":"\u00bfCon qui\u00e9n puede enviarse mensajes el menor al usar el chat de texto de Epic?"
						   },
						   "es-ES":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the text chat feature",
							  "parentNotice":"\u00bfCon qui\u00e9n puede enviarse mensajes el menor al usar el chat de texto de Epic?"
						   },
						   "es-MX":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the text chat feature",
							  "parentNotice":"\u00bfCon qui\u00e9n puede usar el chat de texto de Epic tu hijo o hija?"
						   },
						   "fr":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the text chat feature",
							  "parentNotice":"Avec qui votre enfant peut-il utiliser le chat textuel d'Epic\u00a0?"
						   },
						   "it":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the text chat feature",
							  "parentNotice":"Con chi pu\u00f2 scambiare messaggi il tuo minore tramite la chat di testo di Epic?"
						   },
						   "ja":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the text chat feature",
							  "parentNotice":"\u304a\u5b50\u69d8\u304cEpic\u30c6\u30ad\u30b9\u30c8\u30c1\u30e3\u30c3\u30c8\u3092\u4f7f\u3063\u3066\u30e1\u30c3\u30bb\u30fc\u30b8\u3092\u3084\u308a\u53d6\u308a\u3067\u304d\u308b\u76f8\u624b"
						   },
						   "ko":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the text chat feature",
							  "parentNotice":"\uc5d0\ud53d \ubb38\uc790 \ucc44\ud305\uc744 \uc0ac\uc6a9\ud558\uc5ec \uc790\ub140\uac00 \ub204\uad6c\uc640 \uba54\uc2dc\uc9c0\ub97c \uc8fc\uace0\ubc1b\uc744 \uc218 \uc788\ub098\uc694?"
						   },
						   "pl":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the text chat feature",
							  "parentNotice":"Z kim Twoje dziecko mo\u017ce wymienia\u0107 wiadomo\u015bci na czacie tekstowym Epic?"
						   },
						   "pt-BR":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the text chat feature",
							  "parentNotice":"Com quem seu filho ou filha pode conversar usando o bate-papo por texto da Epic?"
						   },
						   "ru":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the text chat feature",
							  "parentNotice":"\u041a\u043e\u043c\u0443 \u0432\u0430\u0448 \u0440\u0435\u0431\u0451\u043d\u043e\u043a \u043c\u043e\u0436\u0435\u0442 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u044f\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f \u0432 \u0442\u0435\u043a\u0441\u0442\u043e\u0432\u043e\u043c \u0447\u0430\u0442\u0435 Epic?"
						   },
						   "th":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the text chat feature",
							  "parentNotice":"\u0e1a\u0e38\u0e15\u0e23\u0e2b\u0e25\u0e32\u0e19\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e2a\u0e32\u0e21\u0e32\u0e23\u0e16\u0e43\u0e0a\u0e49\u0e41\u0e0a\u0e17\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e02\u0e2d\u0e07 Epic \u0e01\u0e31\u0e1a\u0e43\u0e04\u0e23\u0e44\u0e14\u0e49\u0e1a\u0e49\u0e32\u0e07"
						   },
						   "tr":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the text chat feature",
							  "parentNotice":"\u00c7ocu\u011funuz Epic yaz\u0131l\u0131 sohbeti kullanarak kimlerle mesajla\u015fabilir?"
						   },
						   "zh-CN":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the text chat feature",
							  "parentNotice":"\u60a8\u7684\u5b69\u5b50\u53ef\u4ee5\u4e0e\u54ea\u4e9b\u4eba\u8fdb\u884c Epic \u6587\u5b57\u804a\u5929\uff1f"
						   },
						   "zh-Hant":{
							  "label":"Voice chat",
							  "userNotice":"Determines with whom you can use the text chat feature",
							  "parentNotice":"\u60a8\u7684\u5b50\u5973\u53ef\u4ee5\u548c\u8ab0\u9032\u884c Epic \u6587\u5b57\u804a\u5929\uff1f"
						   }
						},
						"options":[
						   {
							  "value":"nobody",
							  "translations":{
								 "ru":{
									"label":"\u041d\u0438 \u0441 \u043a\u0435\u043c",
									"userNotice":"You cannot use text chat with anybody",
									"parentNotice":"\u0422\u0435\u043a\u0441\u0442\u043e\u0432\u044b\u0439 \u0447\u0430\u0442 Epic \u043e\u0442\u043a\u043b\u044e\u0447\u0451\u043d \u0434\u043b\u044f \u0432\u0430\u0448\u0435\u0433\u043e \u0440\u0435\u0431\u0451\u043d\u043a\u0430."
								 },
								 "en":{
									"label":"Nobody",
									"userNotice":"You cannot use text chat with anybody",
									"parentNotice":"Epic text chat is disabled for your child."
								 },
								 "ar":{
									"label":"\u0644\u0627 \u0623\u062d\u062f",
									"userNotice":"You cannot use text chat with anybody",
									"parentNotice":"\u0627\u0644\u062f\u0631\u062f\u0634\u0629 \u0627\u0644\u0646\u0635\u064a\u0629 \u0644\u0640 Epic \u0645\u0639\u0637\u0644\u0629 \u0644\u0637\u0641\u0644\u0643."
								 },
								 "de":{
									"label":"Niemand",
									"userNotice":"You cannot use text chat with anybody",
									"parentNotice":"Der Epic-Textchat ist f\u00fcr Ihr Kind deaktiviert."
								 },
								 "es":{
									"label":"Nadie",
									"userNotice":"You cannot use text chat with anybody",
									"parentNotice":"El menor no podr\u00e1 usar el chat de texto de Epic."
								 },
								 "es-ES":{
									"label":"Nadie",
									"userNotice":"You cannot use text chat with anybody",
									"parentNotice":"El menor no podr\u00e1 usar el chat de texto de Epic."
								 },
								 "es-MX":{
									"label":"Nadie",
									"userNotice":"You cannot use text chat with anybody",
									"parentNotice":"Se deshabilita el chat de texto de Epic para tu hijo o hija."
								 },
								 "fr":{
									"label":"Personne",
									"userNotice":"You cannot use text chat with anybody",
									"parentNotice":"Votre enfant ne peut pas utiliser le chat textuel d'Epic."
								 },
								 "it":{
									"label":"Nessuno",
									"userNotice":"You cannot use text chat with anybody",
									"parentNotice":"La funzionalit\u00e0 di chat di testo di Epic \u00e8 disattivata per il tuo minore."
								 },
								 "ja":{
									"label":"\u8ab0\u3068\u3082\u3057\u306a\u3044",
									"userNotice":"You cannot use text chat with anybody",
									"parentNotice":"\u304a\u5b50\u69d8\u306eEpic\u30c6\u30ad\u30b9\u30c8\u30c1\u30e3\u30c3\u30c8\u306f\u7121\u52b9\u5316\u3055\u308c\u307e\u3059\u3002"
								 },
								 "ko":{
									"label":"\ubaa8\ub450\ubd88\uac00\ub2a5",
									"userNotice":"You cannot use text chat with anybody",
									"parentNotice":"\uc790\ub140\ub294 \uc5d0\ud53d \ubb38\uc790 \ucc44\ud305\uc744 \uc0ac\uc6a9\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4."
								 },
								 "pl":{
									"label":"Nikt",
									"userNotice":"You cannot use text chat with anybody",
									"parentNotice":"Czat tekstowy Epic jest wy\u0142\u0105czony dla dziecka."
								 },
								 "pt-BR":{
									"label":"Ningu\u00e9m",
									"userNotice":"You cannot use text chat with anybody",
									"parentNotice":"Bate-papo por texto da Epic desativado para seu filho ou filha."
								 },
								 "th":{
									"label":"\u0e17\u0e38\u0e01\u0e04\u0e19",
									"userNotice":"You cannot use text chat with anybody",
									"parentNotice":"\u0e01\u0e32\u0e23\u0e41\u0e0a\u0e17\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e02\u0e2d\u0e07 Epic \u0e08\u0e30\u0e1b\u0e34\u0e14\u0e43\u0e0a\u0e49\u0e07\u0e32\u0e19\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e1a\u0e38\u0e15\u0e23\u0e2b\u0e25\u0e32\u0e19\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13"
								 },
								 "tr":{
									"label":"Hi\u00e7 kimse",
									"userNotice":"You cannot use text chat with anybody",
									"parentNotice":"Epic yaz\u0131l\u0131 sohbet, \u00e7ocu\u011funuz i\u00e7in tamamen devre d\u0131\u015f\u0131 b\u0131rak\u0131l\u0131r."
								 },
								 "zh-CN":{
									"label":"\u6ca1\u6709\u4eba",
									"userNotice":"You cannot use text chat with anybody",
									"parentNotice":"\u4e3a\u60a8\u7684\u5b69\u5b50\u7981\u7528 Epic \u6587\u5b57\u4ea4\u6d41\u529f\u80fd\u3002"
								 },
								 "zh-Hant":{
									"label":"\u7686\u4e0d\u53ef",
									"userNotice":"You cannot use text chat with anybody",
									"parentNotice":"\u60a8\u7684\u5b50\u5973\u4e0d\u80fd\u4f7f\u7528 Epic \u6587\u5b57\u804a\u5929\u529f\u80fd\u3002"
								 }
							  }
						   },
						   {
							  "value":"friends",
							  "translations":{
								 "en":{
									"label":"Friends Only",
									"userNotice":"You can use text chat with friends only",
									"parentNotice":"Your child can text chat only with players in their Epic friends list and platform friends list."
								 },
								 "ar":{
									"label":"\u0627\u0644\u0623\u0635\u062f\u0642\u0627\u0621 \u0641\u0642\u0637",
									"userNotice":"You can use text chat with friends only",
									"parentNotice":"\u064a\u0645\u0643\u0646 \u0644\u0637\u0641\u0644\u0643 \u0627\u0644\u062f\u0631\u062f\u0634\u0629 \u0627\u0644\u0646\u0635\u064a\u0629 \u0641\u0642\u0637 \u0645\u0639 \u0627\u0644\u0644\u0627\u0639\u0628\u064a\u0646 \u0627\u0644\u0645\u0648\u062c\u0648\u062f\u064a\u0646 \u0641\u064a \u0642\u0627\u0626\u0645\u0629 \u0623\u0635\u062f\u0642\u0627\u0621 Epic \u062e\u0627\u0635\u062a\u0647 \u0648\u0642\u0627\u0626\u0645\u0629 \u0623\u0635\u062f\u0642\u0627\u0626\u0647 \u0639\u0644\u0649 \u0645\u0646\u0635\u0629 \u0627\u0644\u0644\u0639\u0628."
								 },
								 "de":{
									"label":"Nur Freunde",
									"userNotice":"You can use text chat with friends only",
									"parentNotice":"Ihr Kind kann nur mit Spielern per Text chatten, die auf seiner Epic Games-Freundesliste und Plattform-Freundesliste sind."
								 },
								 "es":{
									"label":"Solo amigos",
									"userNotice":"You can use text chat with friends only",
									"parentNotice":"El menor podr\u00e1 usar el chat de texto solo con los jugadores de su lista de amigos de Epic y con los de su lista de amigos de la plataforma."
								 },
								 "es-ES":{
									"label":"Solo amigos",
									"userNotice":"You can use text chat with friends only",
									"parentNotice":"El menor podr\u00e1 usar el chat de texto solo con los jugadores de su lista de amigos de Epic y con los de su lista de amigos de la plataforma."
								 },
								 "es-MX":{
									"label":"Solo amigos",
									"userNotice":"You can use text chat with friends only",
									"parentNotice":"Tu hijo o hija solo puede usar el chat de texto con los jugadores de su lista de amigos de Epic y su lista de amigos de su plataforma."
								 },
								 "fr":{
									"label":"Amis uniquement",
									"userNotice":"You can use text chat with friends only",
									"parentNotice":"Votre enfant peut seulement utiliser le chat textuel avec les joueurs dans sa liste d'amis Epic et dans sa liste d'amis de plateforme."
								 },
								 "it":{
									"label":"Solo amici",
									"userNotice":"You can use text chat with friends only",
									"parentNotice":"Il tuo minore pu\u00f2 comunicare via chat solo con i giocatori che fanno parte della sua lista di amici di Epic e della piattaforma."
								 },
								 "ja":{
									"label":"\u30d5\u30ec\u30f3\u30c9\u306e\u307f\u3068\u3059\u308b",
									"userNotice":"You can use text chat with friends only",
									"parentNotice":"\u304a\u5b50\u69d8\u306f\u3001Epic\u306e\u30d5\u30ec\u30f3\u30c9\u30ea\u30b9\u30c8\u3084\u30d7\u30e9\u30c3\u30c8\u30d5\u30a9\u30fc\u30e0\u306e\u30d5\u30ec\u30f3\u30c9\u30ea\u30b9\u30c8\u306e\u30d7\u30ec\u30a4\u30e4\u30fc\u306e\u307f\u3068\u30c6\u30ad\u30b9\u30c8\u30c1\u30e3\u30c3\u30c8\u3067\u304d\u307e\u3059\u3002"
								 },
								 "ko":{
									"label":"\uce5c\uad6c\ub9cc \uac00\ub2a5",
									"userNotice":"You can use text chat with friends only",
									"parentNotice":"\uc790\ub140\uac00 \uc5d0\ud53d \uce5c\uad6c \ubaa9\ub85d\uacfc \ud50c\ub7ab\ud3fc \uce5c\uad6c \ubaa9\ub85d\uc5d0 \uc788\ub294 \ud50c\ub808\uc774\uc5b4\uc640\ub9cc \ubb38\uc790 \ucc44\ud305\uc744 \ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."
								 },
								 "pl":{
									"label":"Tylko znajomi",
									"userNotice":"You can use text chat with friends only",
									"parentNotice":"Twoje dziecko mo\u017ce rozmawia\u0107 przez czat tekstowy z ka\u017cd\u0105 osob\u0105 ze swojej listy znajomych w Epic i na platformie."
								 },
								 "pt-BR":{
									"label":"Somente amigos",
									"userNotice":"You can use text chat with friends only",
									"parentNotice":"Seu filho ou filha pode conversar por bate-papo por texto apenas com jogadores nas listas de amigos da Epic e da plataforma usada."
								 },
								 "ru":{
									"label":"\u0422\u043e\u043b\u044c\u043a\u043e \u0441 \u0434\u0440\u0443\u0437\u044c\u044f\u043c\u0438",
									"userNotice":"You can use text chat with friends only",
									"parentNotice":"\u0412\u0430\u0448 \u0440\u0435\u0431\u0451\u043d\u043e\u043a \u043c\u043e\u0436\u0435\u0442 \u043e\u0431\u0449\u0430\u0442\u044c\u0441\u044f \u0432 \u0442\u0435\u043a\u0441\u0442\u043e\u0432\u043e\u043c \u0447\u0430\u0442\u0435 \u0442\u043e\u043b\u044c\u043a\u043e \u0441 \u0438\u0433\u0440\u043e\u043a\u0430\u043c\u0438 \u0438\u0437 \u0441\u0432\u043e\u0435\u0433\u043e \u0441\u043f\u0438\u0441\u043a\u0430 \u0434\u0440\u0443\u0437\u0435\u0439 Epic \u0438 \u0438\u0437 \u0441\u043f\u0438\u0441\u043a\u0430 \u0434\u0440\u0443\u0437\u0435\u0439 \u0434\u043b\u044f \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u044b."
								 },
								 "th":{
									"label":"\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e19\u0e40\u0e17\u0e48\u0e32\u0e19\u0e31\u0e49\u0e19",
									"userNotice":"You can use text chat with friends only",
									"parentNotice":"\u0e1a\u0e38\u0e15\u0e23\u0e2b\u0e25\u0e32\u0e19\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e2a\u0e32\u0e21\u0e32\u0e23\u0e16\u0e41\u0e0a\u0e17\u0e2a\u0e48\u0e07\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e01\u0e31\u0e1a\u0e1c\u0e39\u0e49\u0e40\u0e25\u0e48\u0e19\u0e43\u0e19\u0e23\u0e32\u0e22\u0e0a\u0e37\u0e48\u0e2d\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e19 Epic Games \u0e41\u0e25\u0e30\u0e23\u0e32\u0e22\u0e0a\u0e37\u0e48\u0e2d\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e19\u0e1a\u0e19\u0e41\u0e1e\u0e25\u0e15\u0e1f\u0e2d\u0e23\u0e4c\u0e21\u0e40\u0e17\u0e48\u0e32\u0e19\u0e31\u0e49\u0e19"
								 },
								 "tr":{
									"label":"Sadece Arkada\u015flar",
									"userNotice":"You can use text chat with friends only",
									"parentNotice":"\u00c7ocu\u011funuz yaln\u0131zca Epic arkada\u015f listesindeki ve platform arkada\u015f listesindeki oyuncularla yaz\u0131l\u0131 sohbet edebilir."
								 },
								 "zh-CN":{
									"label":"\u4ec5\u597d\u53cb",
									"userNotice":"You can use text chat with friends only",
									"parentNotice":"\u60a8\u7684\u5b69\u5b50\u53ea\u80fd\u4e0e\u5728\u5176 Epic \u597d\u53cb\u5217\u8868\u4e2d\u7684\u73a9\u5bb6\u4ee5\u53ca\u5176\u5e73\u53f0\u597d\u53cb\u5217\u8868\u4e2d\u7684\u73a9\u5bb6\u8fdb\u884c\u6587\u5b57\u4ea4\u6d41\u3002"
								 },
								 "zh-Hant":{
									"label":"\u50c5\u9650\u597d\u53cb",
									"userNotice":"You can use text chat with friends only",
									"parentNotice":"\u60a8\u7684\u5b50\u5973\u53ea\u80fd\u5920\u548c\u4ed6\u5011\u7684 Epic \u597d\u53cb\u540d\u55ae\u53ca\u5e73\u53f0\u597d\u53cb\u540d\u55ae\u4e2d\u7684\u73a9\u5bb6\u9032\u884c\u6587\u5b57\u804a\u5929\u3002"
								 }
							  }
						   },
						   {
							  "value":"friends-and-teammates",
							  "translations":{
								 "en":{
									"label":"Friends & Teammates",
									"userNotice":"You can use text chat with friends and teammates",
									"parentNotice":"Your child can text chat with players in their Epic friends list and platform friends list, and those on their team."
								 },
								 "ar":{
									"label":"\u0627\u0644\u0623\u0635\u062f\u0642\u0627\u0621 \u0648\u0632\u0645\u0644\u0627\u0621 \u0627\u0644\u0641\u0631\u064a\u0642",
									"userNotice":"You can use text chat with friends and teammates",
									"parentNotice":"\u064a\u0645\u0643\u0646 \u0644\u0637\u0641\u0644\u0643 \u0627\u0644\u062f\u0631\u062f\u0634\u0629 \u0627\u0644\u0646\u0635\u064a\u0629 \u0645\u0639 \u0627\u0644\u0644\u0627\u0639\u0628\u064a\u0646 \u0627\u0644\u0645\u0648\u062c\u0648\u062f\u064a\u0646 \u0641\u064a \u0642\u0627\u0626\u0645\u0629 \u0623\u0635\u062f\u0642\u0627\u0621 Epic \u062e\u0627\u0635\u062a\u0647 \u0648\u0642\u0627\u0626\u0645\u0629 \u0623\u0635\u062f\u0642\u0627\u0626\u0647 \u0639\u0644\u0649 \u0645\u0646\u0635\u0629 \u0627\u0644\u0644\u0639\u0628\u060c \u0648\u0645\u0639 \u0623\u0648\u0644\u0626\u0643 \u0627\u0644\u0645\u0648\u062c\u0648\u062f\u064a\u0646 \u0641\u064a \u0641\u0631\u064a\u0642\u0647."
								 },
								 "de":{
									"label":"Freunde und Teammitglieder",
									"userNotice":"You can use text chat with friends and teammates",
									"parentNotice":"Ihr Kind kann mit Spielern per Text chatten, die auf seiner Epic Games-Freundesliste und Plattform-Freundesliste und in seinem Team sind."
								 },
								 "es":{
									"label":"Amigos y compa\u00f1eros de equipo",
									"userNotice":"You can use text chat with friends and teammates",
									"parentNotice":"El menor podr\u00e1 usar el chat de texto con los jugadores de su lista de amigos de Epic, con los de su lista de amigos de la plataforma y con los de su equipo."
								 },
								 "es-ES":{
									"label":"Amigos y compa\u00f1eros de equipo",
									"userNotice":"You can use text chat with friends and teammates",
									"parentNotice":"El menor podr\u00e1 usar el chat de texto con los jugadores de su lista de amigos de Epic, con los de su lista de amigos de la plataforma y con los de su equipo."
								 },
								 "es-MX":{
									"label":"Amigos y compa\u00f1eros de equipo",
									"userNotice":"You can use text chat with friends and teammates",
									"parentNotice":"Tu hijo o hija puede usar el chat de texto con los jugadores de su lista de amigos de Epic y su lista de amigos de su plataforma, as\u00ed como con los miembros de su equipo."
								 },
								 "fr":{
									"label":"Amis et co\u00e9quipiers",
									"userNotice":"You can use text chat with friends and teammates",
									"parentNotice":"Votre enfant peut utiliser le chat textuel avec les joueurs dans sa liste d'amis Epic et dans sa liste d'amis de plateforme, ainsi qu'avec les membres de son \u00e9quipe."
								 },
								 "it":{
									"label":"Amici e compagni di squadra",
									"userNotice":"You can use text chat with friends and teammates",
									"parentNotice":"Il tuo minore pu\u00f2 comunicare via chat con i giocatori che fanno parte della sua lista di amici di Epic e della piattaforma, nonch\u00e9 con i suoi compagni di squadra."
								 },
								 "ja":{
									"label":"\u30d5\u30ec\u30f3\u30c9\u3068\u30c1\u30fc\u30e0\u30e1\u30a4\u30c8",
									"userNotice":"You can use text chat with friends and teammates",
									"parentNotice":"\u304a\u5b50\u69d8\u306f\u3001Epic\u306e\u30d5\u30ec\u30f3\u30c9\u30ea\u30b9\u30c8\u3084\u30d7\u30e9\u30c3\u30c8\u30d5\u30a9\u30fc\u30e0\u306e\u30d5\u30ec\u30f3\u30c9\u30ea\u30b9\u30c8\u306e\u30d7\u30ec\u30a4\u30e4\u30fc\u3084\u30c1\u30fc\u30e0\u4e0a\u306e\u30d7\u30ec\u30a4\u30e4\u30fc\u3068\u30c6\u30ad\u30b9\u30c8\u30c1\u30e3\u30c3\u30c8\u3067\u304d\u307e\u3059\u3002"
								 },
								 "ko":{
									"label":"\uce5c\uad6c \ubc0f \ud300\uc6d0",
									"userNotice":"You can use text chat with friends and teammates",
									"parentNotice":"\uc790\ub140\uac00 \uc5d0\ud53d \uce5c\uad6c \ubaa9\ub85d\uacfc \ud50c\ub7ab\ud3fc \uce5c\uad6c \ubaa9\ub85d\uc5d0 \uc788\ub294 \ud50c\ub808\uc774\uc5b4 \ubc0f \ud300\uc6d0\uacfc \ubb38\uc790 \ucc44\ud305\uc744 \ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."
								 },
								 "pl":{
									"label":"Znajomi i cz\u0142onkowie dru\u017cyny",
									"userNotice":"You can use text chat with friends and teammates",
									"parentNotice":"Twoje dziecko mo\u017ce rozmawia\u0107 przez czat tekstowy z ka\u017cd\u0105 osob\u0105 ze swojej listy znajomych w Epic i na platformie oraz z osobami ze swojej dru\u017cyny."
								 },
								 "pt-BR":{
									"label":"Amigos e colegas de equipe",
									"userNotice":"You can use text chat with friends and teammates",
									"parentNotice":"Seu filho ou filha pode conversar por bate-papo por texto com jogadores nas listas de amigos da Epic e da plataforma usada e com aqueles em sua equipe."
								 },
								 "ru":{
									"label":"\u0414\u0440\u0443\u0437\u044c\u044f \u0438 \u043a\u043e\u043c\u0430\u043d\u0434\u0430",
									"userNotice":"You can use text chat with friends and teammates",
									"parentNotice":"\u0412\u0430\u0448 \u0440\u0435\u0431\u0451\u043d\u043e\u043a \u043c\u043e\u0436\u0435\u0442 \u043e\u0431\u0449\u0430\u0442\u044c\u0441\u044f \u0432 \u0442\u0435\u043a\u0441\u0442\u043e\u0432\u043e\u043c \u0447\u0430\u0442\u0435 \u0441 \u0438\u0433\u0440\u043e\u043a\u0430\u043c\u0438 \u0438\u0437 \u0441\u0432\u043e\u0435\u0433\u043e \u0441\u043f\u0438\u0441\u043a\u0430 \u0434\u0440\u0443\u0437\u0435\u0439 Epic, \u0438\u0437 \u0441\u043f\u0438\u0441\u043a\u0430 \u0434\u0440\u0443\u0437\u0435\u0439 \u0434\u043b\u044f \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u044b \u0438 \u0447\u043b\u0435\u043d\u0430\u043c\u0438 \u0441\u0432\u043e\u0435\u0439 \u043a\u043e\u043c\u0430\u043d\u0434\u044b."
								 },
								 "th":{
									"label":"\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e19\u0e41\u0e25\u0e30\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e19\u0e23\u0e48\u0e27\u0e21\u0e17\u0e35\u0e21",
									"userNotice":"You can use text chat with friends and teammates",
									"parentNotice":"\u0e1a\u0e38\u0e15\u0e23\u0e2b\u0e25\u0e32\u0e19\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e2a\u0e32\u0e21\u0e32\u0e23\u0e16\u0e41\u0e0a\u0e17\u0e2a\u0e48\u0e07\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e01\u0e31\u0e1a\u0e1c\u0e39\u0e49\u0e40\u0e25\u0e48\u0e19\u0e43\u0e19\u0e23\u0e32\u0e22\u0e0a\u0e37\u0e48\u0e2d\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e19 Epic Games \u0e41\u0e25\u0e30\u0e23\u0e32\u0e22\u0e0a\u0e37\u0e48\u0e2d\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e19\u0e1a\u0e19\u0e41\u0e1e\u0e25\u0e15\u0e1f\u0e2d\u0e23\u0e4c\u0e21 \u0e41\u0e25\u0e30\u0e1c\u0e39\u0e49\u0e40\u0e25\u0e48\u0e19\u0e43\u0e19\u0e17\u0e35\u0e21\u0e02\u0e2d\u0e07\u0e15\u0e19\u0e44\u0e14\u0e49"
								 },
								 "tr":{
									"label":"Arkada\u015flar ve Tak\u0131m Arkada\u015flar\u0131",
									"userNotice":"You can use text chat with friends and teammates",
									"parentNotice":"\u00c7ocu\u011funuz, Epic arkada\u015f listesindeki, platform arkada\u015f listesindeki ve tak\u0131m\u0131ndaki oyuncularla yaz\u0131l\u0131 sohbet edebilir."
								 },
								 "zh-CN":{
									"label":"\u597d\u53cb\u4e0e\u961f\u53cb",
									"userNotice":"You can use text chat with friends and teammates",
									"parentNotice":"\u60a8\u7684\u5b69\u5b50\u53ef\u4ee5\u4e0e\u5728\u5176 Epic \u597d\u53cb\u5217\u8868\u4e2d\u7684\u73a9\u5bb6\uff0c\u5176\u5e73\u53f0\u597d\u53cb\u5217\u8868\u4e2d\u7684\u73a9\u5bb6\uff0c\u4ee5\u53ca\u548c\u5176\u4e00\u8d77\u7ec4\u961f\u7684\u73a9\u5bb6\u8fdb\u884c\u6587\u5b57\u4ea4\u6d41\u3002"
								 },
								 "zh-Hant":{
									"label":"\u597d\u53cb\u8207\u968a\u53cb",
									"userNotice":"You can use text chat with friends and teammates",
									"parentNotice":"\u60a8\u7684\u5b50\u5973\u53ef\u4ee5\u548c\u4ed6\u5011\u7684 Epic \u597d\u53cb\u540d\u55ae\u53ca\u5e73\u53f0\u597d\u53cb\u540d\u55ae\u4e2d\u7684\u73a9\u5bb6\uff0c\u4ee5\u53ca\u540c\u968a\u4e2d\u7684\u73a9\u5bb6\u9032\u884c\u6587\u5b57\u804a\u5929\u3002"
								 }
							  }
						   },
						   {
							  "value":"everybody",
							  "translations":{
								 "en":{
									"label":"Everybody",
									"userNotice":"You can use text chat with everybody",
									"parentNotice":"Your child can text chat with any player."
								 },
								 "ar":{
									"label":"\u0627\u0644\u062c\u0645\u064a\u0639",
									"userNotice":"You can use text chat with everybody",
									"parentNotice":"\u064a\u0645\u0643\u0646 \u0644\u0637\u0641\u0644\u0643 \u0627\u0644\u062f\u0631\u062f\u0634\u0629 \u0627\u0644\u0646\u0635\u064a\u0629 \u0645\u0639 \u0623\u064a \u0644\u0627\u0639\u0628."
								 },
								 "de":{
									"label":"Alle",
									"userNotice":"You can use text chat with everybody",
									"parentNotice":"Ihr Kind kann mit allen Spielern per Text chatten."
								 },
								 "es":{
									"label":"Todos",
									"userNotice":"You can use text chat with everybody",
									"parentNotice":"El menor podr\u00e1 usar el chat de texto con cualquier jugador."
								 },
								 "es-ES":{
									"label":"Todos",
									"userNotice":"You can use text chat with everybody",
									"parentNotice":"El menor podr\u00e1 usar el chat de texto con cualquier jugador."
								 },
								 "es-MX":{
									"label":"Todos",
									"userNotice":"You can use text chat with everybody",
									"parentNotice":"Tu hijo o hija puede usar el chat de texto con cualquier jugador."
								 },
								 "fr":{
									"label":"Tout le monde",
									"userNotice":"You can use text chat with everybody",
									"parentNotice":"Votre enfant peut utiliser le chat textuel avec tous les joueurs."
								 },
								 "it":{
									"label":"Tutti",
									"userNotice":"You can use text chat with everybody",
									"parentNotice":"Il tuo minore pu\u00f2 comunicare via chat con qualsiasi giocatore."
								 },
								 "ja":{
									"label":"\u5168\u54e1\u3068\u3059\u308b",
									"userNotice":"You can use text chat with everybody",
									"parentNotice":"\u304a\u5b50\u69d8\u306f\u3001\u3059\u3079\u3066\u306e\u30d7\u30ec\u30a4\u30e4\u30fc\u3068\u30c6\u30ad\u30b9\u30c8\u30c1\u30e3\u30c3\u30c8\u3067\u304d\u307e\u3059\u3002"
								 },
								 "ko":{
									"label":"\ubaa8\ub450 \uac00\ub2a5",
									"userNotice":"You can use text chat with everybody",
									"parentNotice":"\uc790\ub140\uac00 \ubaa8\ub4e0 \ud50c\ub808\uc774\uc5b4\uc640 \ubb38\uc790 \ucc44\ud305\uc744 \ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."
								 },
								 "pl":{
									"label":"Wszyscy",
									"userNotice":"You can use text chat with everybody",
									"parentNotice":"Twoje dziecko mo\u017ce rozmawia\u0107 przez czat tekstowy z ka\u017cdym graczem."
								 },
								 "pt-BR":{
									"label":"Todos",
									"userNotice":"You can use text chat with everybody",
									"parentNotice":"Seu filho ou filha pode conversar por bate-papo por texto com qualquer jogador."
								 },
								 "ru":{
									"label":"\u0421\u043e\u0432\u0441\u0435\u043c\u0438",
									"userNotice":"You can use text chat with everybody",
									"parentNotice":"\u0412\u0430\u0448 \u0440\u0435\u0431\u0451\u043d\u043e\u043a \u043c\u043e\u0436\u0435\u0442 \u043e\u0431\u0449\u0430\u0442\u044c\u0441\u044f \u0432 \u0442\u0435\u043a\u0441\u0442\u043e\u0432\u043e\u043c \u0447\u0430\u0442\u0435 \u0441 \u043b\u044e\u0431\u044b\u043c \u0438\u0433\u0440\u043e\u043a\u043e\u043c."
								 },
								 "th":{
									"label":"\u0e17\u0e38\u0e01\u0e04\u0e19",
									"userNotice":"You can use text chat with everybody",
									"parentNotice":"\u0e1a\u0e38\u0e15\u0e23\u0e2b\u0e25\u0e32\u0e19\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e2a\u0e32\u0e21\u0e32\u0e23\u0e16\u0e41\u0e0a\u0e17\u0e2a\u0e48\u0e07\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e01\u0e31\u0e1a\u0e1c\u0e39\u0e49\u0e40\u0e25\u0e48\u0e19\u0e04\u0e19\u0e43\u0e14\u0e01\u0e47\u0e44\u0e14\u0e49"
								 },
								 "tr":{
									"label":"Herkes",
									"userNotice":"You can use text chat with everybody",
									"parentNotice":"\u00c7ocu\u011funuz t\u00fcm oyuncularla yaz\u0131l\u0131 sohbet edebilir."
								 },
								 "zh-CN":{
									"label":"\u6240\u6709\u4eba",
									"userNotice":"You can use text chat with everybody",
									"parentNotice":"\u60a8\u7684\u5b69\u5b50\u53ef\u4ee5\u4e0e\u4efb\u4f55\u73a9\u5bb6\u8fdb\u884c\u6587\u5b57\u4ea4\u6d41\u3002"
								 },
								 "zh-Hant":{
									"label":"\u6240\u6709\u4eba",
									"userNotice":"You can use text chat with everybody",
									"parentNotice":"\u60a8\u7684\u5b50\u5973\u53ef\u4ee5\u548c\u4efb\u610f\u73a9\u5bb6\u9032\u884c\u6587\u5b57\u804a\u5929\u3002"
								 }
							  }
						   }
						],
						"restrictiveOrder":"firstRestrictive",
						"userHidden":false,
						"userReadOnly":false,
						"required":false,
						"ageBracket":{
						   "consentTypeRequired":"none",
						   "consentTypeUnderParentalControl":"opt-in-unverified",
						   "defaultValue":"everybody",
						   "defaultParentLimit":"everybody"
						}
					 }
				  },
				  {
					 "namespace":"chat",
					 "settingName":"filter-out-mature-language",
					 "preferredValue":true,
					 "preferredValueUpdatedAt":1678023125163,
					 "preferredValueFromOrgLevel":false,
					 "parentLimit":false,
					 "parentLimitFromOrgLevel":true,
					 "effectiveValue":true,
					 "effectiveSource":"preference",
					 "isOrgLevel":false,
					 "definition":{
						"orgId":"cc5b83aa-cb5c-4b4b-a800-a7dd64edacc0",
						"productId":"6fdb114c-3fbc-4ced-bc5b-55bcdba5c8f6",
						"namespace":"chat",
						"settingName":"filter-out-mature-language",
						"valueType":"boolean",
						"allowProductOverrides":"ageBrackets",
						"inheritFromOrg":true,
						"translations":{
						   "en":{
							  "label":"Filter out mature language in Epic text chat",
							  "userNotice":"Mature language in text chat will be filtered and replaced with heart symbols",
							  "parentNotice":"<b>On:</b> Mature language in text chat will be filtered and replaced with heart symbols."
						   },
						   "ar":{
							  "label":"\u0645\u0631\u0634\u062d \u0644\u0645\u0646\u0639 \u0627\u0644\u0623\u0644\u0641\u0627\u0638 \u0627\u0644\u062e\u0627\u0631\u062c\u0629 \u0641\u064a \u0627\u0644\u062f\u0631\u062f\u0634\u0629 \u0627\u0644\u0646\u0635\u064a\u0629 \u0644\u0640 Epic",
							  "userNotice":"<b>\u062a\u0634\u063a\u064a\u0644:</b> \u0633\u062a\u062a\u0645 \u062a\u0635\u0641\u064a\u0629 \u0627\u0644\u0623\u0644\u0641\u0627\u0638 \u0627\u0644\u062e\u0627\u0631\u062c\u0629 \u0645\u0646 \u0627\u0644\u062f\u0631\u062f\u0634\u0629 \u0627\u0644\u0646\u0635\u064a\u0629 \u0648\u0627\u0633\u062a\u0628\u062f\u0627\u0644\u0647\u0627 \u0628\u0631\u0645\u0648\u0632 \u0642\u0644\u0648\u0628.",
							  "parentNotice":"<b>\u062a\u0634\u063a\u064a\u0644:</b> \u0633\u062a\u062a\u0645 \u062a\u0635\u0641\u064a\u0629 \u0627\u0644\u0623\u0644\u0641\u0627\u0638 \u0627\u0644\u062e\u0627\u0631\u062c\u0629 \u0645\u0646 \u0627\u0644\u062f\u0631\u062f\u0634\u0629 \u0627\u0644\u0646\u0635\u064a\u0629 \u0648\u0627\u0633\u062a\u0628\u062f\u0627\u0644\u0647\u0627 \u0628\u0631\u0645\u0648\u0632 \u0642\u0644\u0648\u0628."
						   },
						   "de":{
							  "label":"Anst\u00f6\u00dfige Sprache im Epic-Textchat filtern",
							  "userNotice":"<b>Ein:</b> Im Text-Chat wird anst\u00f6\u00dfige Sprache gefiltert und durch Herz-Symbole ersetzt.",
							  "parentNotice":"<b>Ein:</b> Im Text-Chat wird anst\u00f6\u00dfige Sprache gefiltert und durch Herz-Symbole ersetzt."
						   },
						   "es":{
							  "label":"Filtrar lenguaje adulto en el chat de texto de Epic",
							  "userNotice":"<b>Activado:</b> se filtrar\u00e1 el lenguaje adulto en el chat de texto y se reemplazar\u00e1 por s\u00edmbolos de corazones.",
							  "parentNotice":"<b>Activado:</b> se filtrar\u00e1 el lenguaje adulto en el chat de texto y se reemplazar\u00e1 por s\u00edmbolos de corazones."
						   },
						   "es-ES":{
							  "label":"Filtrar lenguaje adulto en el chat de texto de Epic",
							  "userNotice":"<b>Activado:</b> se filtrar\u00e1 el lenguaje adulto en el chat de texto y se reemplazar\u00e1 por s\u00edmbolos de corazones.",
							  "parentNotice":"<b>Activado:</b> se filtrar\u00e1 el lenguaje adulto en el chat de texto y se reemplazar\u00e1 por s\u00edmbolos de corazones."
						   },
						   "es-MX":{
							  "label":"Filtrar lenguaje adulto en el chat de texto de Epic",
							  "userNotice":"<b>Activado:</b> El lenguaje adulto se filtrar\u00e1 en el chat de texto y se reemplazar\u00e1 con corazones.",
							  "parentNotice":"<b>Activado:</b> El lenguaje adulto se filtrar\u00e1 en el chat de texto y se reemplazar\u00e1 con corazones."
						   },
						   "fr":{
							  "label":"Filtrer le langage grossier dans le chat textuel d'Epic",
							  "userNotice":"<b>Activ\u00e9\u00a0:</b> le langage grossier pr\u00e9sent dans le chat textuel sera filtr\u00e9 et remplac\u00e9 par des symboles de c\u0153urs.",
							  "parentNotice":"<b>Activ\u00e9\u00a0:</b> le langage grossier pr\u00e9sent dans le chat textuel sera filtr\u00e9 et remplac\u00e9 par des symboles de c\u0153urs."
						   },
						   "it":{
							  "label":"Filtra linguaggio adatto agli adulti nella chat di testo di Epic",
							  "userNotice":"<b>Attivatto:</b> il linguaggio maturo in chat sar\u00e0 filtrato e sostituito con dei simboli a forma di cuore.",
							  "parentNotice":"<b>Attivatto:</b> il linguaggio maturo in chat sar\u00e0 filtrato e sostituito con dei simboli a forma di cuore."
						   },
						   "ja":{
							  "label":"Epic\u30c6\u30ad\u30b9\u30c8\u30c1\u30e3\u30c3\u30c8\u3067\u6210\u4eba\u5411\u3051\u306e\u8a00\u8449\u9063\u3044\u306b\u30d5\u30a3\u30eb\u30bf\u30fc\u3092\u304b\u3051\u307e\u3059",
							  "userNotice":"<b>\u30aa\u30f3\uff1a</b>\u30c6\u30ad\u30b9\u30c8\u30c1\u30e3\u30c3\u30c8\u306e\u6210\u4eba\u5411\u3051\u306e\u8a00\u8449\u9063\u3044\u304c\u30d5\u30a3\u30eb\u30bf\u30ea\u30f3\u30b0\u3055\u308c\u3001\u30cf\u30fc\u30c8\u30de\u30fc\u30af\u306b\u7f6e\u304d\u63db\u3048\u3089\u308c\u307e\u3059\u3002",
							  "parentNotice":"<b>\u30aa\u30f3\uff1a</b>\u30c6\u30ad\u30b9\u30c8\u30c1\u30e3\u30c3\u30c8\u306e\u6210\u4eba\u5411\u3051\u306e\u8a00\u8449\u9063\u3044\u304c\u30d5\u30a3\u30eb\u30bf\u30ea\u30f3\u30b0\u3055\u308c\u3001\u30cf\u30fc\u30c8\u30de\u30fc\u30af\u306b\u7f6e\u304d\u63db\u3048\u3089\u308c\u307e\u3059\u3002"
						   },
						   "ko":{
							  "label":"\uc5d0\ud53d \ubb38\uc790 \ucc44\ud305\uc5d0\uc11c \uc695\uc124 \ubc0f \ube44\ud558 \ub2e8\uc5b4 \ud544\ud130\ub9c1",
							  "userNotice":"<b>\ucf1c\uae30:</b> \ubb38\uc790 \ucc44\ud305\uc5d0\uc11c \uc695\uc124 \ubc0f \ube44\ud558 \ub2e8\uc5b4\uac00 \ud544\ud130\ub9c1\ub418\uace0 \ud558\ud2b8 \uae30\ud638\ub85c \ub300\uccb4\ub429\ub2c8\ub2e4.",
							  "parentNotice":"<b>\ucf1c\uae30:</b> \ubb38\uc790 \ucc44\ud305\uc5d0\uc11c \uc695\uc124 \ubc0f \ube44\ud558 \ub2e8\uc5b4\uac00 \ud544\ud130\ub9c1\ub418\uace0 \ud558\ud2b8 \uae30\ud638\ub85c \ub300\uccb4\ub429\ub2c8\ub2e4."
						   },
						   "pl":{
							  "label":"Odfiltruj nieprzyzwoity j\u0119zyk w czasie tekstowym Epic",
							  "userNotice":"<b>W\u0142.:</b> nieprzyzwoite s\u0142owa w tek\u015bcie czatu b\u0119d\u0105 odfiltrowywane i zamieniane na symbole serca.",
							  "parentNotice":"<b>W\u0142.:</b> nieprzyzwoite s\u0142owa w tek\u015bcie czatu b\u0119d\u0105 odfiltrowywane i zamieniane na symbole serca."
						   },
						   "pt-BR":{
							  "label":"Filtrar linguagem adulta no bate-papo por texto da Epic",
							  "userNotice":"<b>Ligado:</b> a linguagem adulta no bate-papo por texto ser\u00e1 filtrada e substitu\u00edda por s\u00edmbolos de cora\u00e7\u00e3o.",
							  "parentNotice":"<b>Ligado:</b> a linguagem adulta no bate-papo por texto ser\u00e1 filtrada e substitu\u00edda por s\u00edmbolos de cora\u00e7\u00e3o."
						   },
						   "ru":{
							  "label":"\u0424\u0438\u043b\u044c\u0442\u0440\u043e\u0432\u0430\u0442\u044c \u0433\u0440\u0443\u0431\u044b\u0435 \u0432\u044b\u0440\u0430\u0436\u0435\u043d\u0438\u044f \u0432 \u0442\u0435\u043a\u0441\u0442\u043e\u0432\u043e\u043c \u0447\u0430\u0442\u0435 Epic",
							  "userNotice":"<b>\u0412\u043a\u043b.:</b> \u0432 \u0447\u0430\u0442\u0435 \u0431\u0443\u0434\u0443\u0442 \u0432\u043a\u043b\u044e\u0447\u0435\u043d\u044b \u0444\u0438\u043b\u044c\u0442\u0440\u044b, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u0437\u0430\u043c\u0435\u043d\u044f\u044e\u0442 \u0432\u0441\u044e \u0433\u0440\u0443\u0431\u0443\u044e \u0440\u0435\u0447\u044c \u043d\u0430 \u0441\u0435\u0440\u0434\u0435\u0447\u043a\u0438.",
							  "parentNotice":"<b>\u0412\u043a\u043b.:</b> \u0432 \u0447\u0430\u0442\u0435 \u0431\u0443\u0434\u0443\u0442 \u0432\u043a\u043b\u044e\u0447\u0435\u043d\u044b \u0444\u0438\u043b\u044c\u0442\u0440\u044b, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u0437\u0430\u043c\u0435\u043d\u044f\u044e\u0442 \u0432\u0441\u044e \u0433\u0440\u0443\u0431\u0443\u044e \u0440\u0435\u0447\u044c \u043d\u0430 \u0441\u0435\u0440\u0434\u0435\u0447\u043a\u0438."
						   },
						   "th":{
							  "label":"\u0e01\u0e23\u0e2d\u0e07\u0e20\u0e32\u0e29\u0e32\u0e2b\u0e22\u0e32\u0e1a\u0e04\u0e32\u0e22\u0e2d\u0e2d\u0e01\u0e44\u0e1b\u0e08\u0e32\u0e01\u0e41\u0e0a\u0e17\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21",
							  "userNotice":"<b>\u0e40\u0e1b\u0e34\u0e14:</b> \u0e20\u0e32\u0e29\u0e32\u0e2b\u0e22\u0e32\u0e1a\u0e04\u0e32\u0e22\u0e43\u0e19\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e41\u0e0a\u0e17\u0e08\u0e30\u0e16\u0e39\u0e01\u0e01\u0e23\u0e2d\u0e07 \u0e41\u0e25\u0e30\u0e41\u0e17\u0e19\u0e17\u0e35\u0e48\u0e14\u0e49\u0e27\u0e22\u0e2a\u0e31\u0e0d\u0e25\u0e31\u0e01\u0e29\u0e13\u0e4c\u0e2b\u0e31\u0e27\u0e43\u0e08",
							  "parentNotice":"<b>\u0e40\u0e1b\u0e34\u0e14:</b> \u0e20\u0e32\u0e29\u0e32\u0e2b\u0e22\u0e32\u0e1a\u0e04\u0e32\u0e22\u0e43\u0e19\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e41\u0e0a\u0e17\u0e08\u0e30\u0e16\u0e39\u0e01\u0e01\u0e23\u0e2d\u0e07 \u0e41\u0e25\u0e30\u0e41\u0e17\u0e19\u0e17\u0e35\u0e48\u0e14\u0e49\u0e27\u0e22\u0e2a\u0e31\u0e0d\u0e25\u0e31\u0e01\u0e29\u0e13\u0e4c\u0e2b\u0e31\u0e27\u0e43\u0e08"
						   },
						   "tr":{
							  "label":"Epic yaz\u0131l\u0131 sohbetteki uygunsuz konu\u015fmalar\u0131 filtreleyin",
							  "userNotice":"<b>A\u00e7\u0131k:</b> Yaz\u0131l\u0131 sohbetteki uygunsuz konu\u015fmalar filtrelenir ve kalp simgeleriyle de\u011fi\u015ftirilir.",
							  "parentNotice":"<b>A\u00e7\u0131k:</b> Yaz\u0131l\u0131 sohbetteki uygunsuz konu\u015fmalar filtrelenir ve kalp simgeleriyle de\u011fi\u015ftirilir."
						   },
						   "zh-CN":{
							  "label":"\u5728 Epic \u6587\u5b57\u804a\u5929\u4e2d\u8fc7\u6ee4\u6210\u4eba\u8bed\u8a00",
							  "userNotice":"<b>\u5f00\uff1a</b>\u6587\u5b57\u4ea4\u6d41\u4e2d\u7684\u6210\u4eba\u8bed\u8a00\u5c06\u88ab\u8fc7\u6ee4\u5e76\u66ff\u6362\u4e3a\u5fc3\u5f62\u7b26\u53f7\u3002",
							  "parentNotice":"<b>\u5f00\uff1a</b>\u6587\u5b57\u4ea4\u6d41\u4e2d\u7684\u6210\u4eba\u8bed\u8a00\u5c06\u88ab\u8fc7\u6ee4\u5e76\u66ff\u6362\u4e3a\u5fc3\u5f62\u7b26\u53f7\u3002"
						   },
						   "zh-Hant":{
							  "label":"\u904e\u6ffe Epic \u6587\u5b57\u804a\u5929\u4e2d\u7684\u6210\u4eba\u7528\u8a9e",
							  "userNotice":"<b>\u958b\u555f\uff1a</b>\u6587\u5b57\u804a\u5929\u4e2d\u7684\u6210\u4eba\u7528\u8a9e\u6703\u88ab\u904e\u6ffe\uff0c\u4e26\u4ee5\u5fc3\u578b\u7b26\u865f\u53d6\u4ee3\u3002",
							  "parentNotice":"<b>\u958b\u555f\uff1a</b>\u6587\u5b57\u804a\u5929\u4e2d\u7684\u6210\u4eba\u7528\u8a9e\u6703\u88ab\u904e\u6ffe\uff0c\u4e26\u4ee5\u5fc3\u578b\u7b26\u865f\u53d6\u4ee3\u3002"
						   }
						},
						"options":[
						   
						],
						"restrictiveOrder":"falsePermissive",
						"userHidden":false,
						"userReadOnly":false,
						"required":false,
						"ageBracket":{
						   "consentTypeRequired":"none",
						   "consentTypeUnderParentalControl":"opt-in-unverified",
						   "defaultValue":false,
						   "defaultParentLimit":false
						}
					 }
				  },
				  {
					 "namespace":"prm",
					 "settingName":"experience",
					 "preferredValue":true,
					 "preferredValueFromOrgLevel":true,
					 "effectiveValue":true,
					 "effectiveSource":"default",
					 "isOrgLevel":true,
					 "definition":{
						"orgId":"cc5b83aa-cb5c-4b4b-a800-a7dd64edacc0",
						"productId":"6fdb114c-3fbc-4ced-bc5b-55bcdba5c8f6",
						"namespace":"prm",
						"settingName":"experience",
						"valueType":"boolean",
						"allowProductOverrides":"ageBrackets",
						"inheritFromOrg":true,
						"translations":{
						   "en":{
							  "label":"Content can be targeted for experience purposes",
							  "userNotice":"Determines if you can be targeted content, based on personal data, for experience purposes",
							  "parentNotice":"Determines if your child can be targeted content, based on personal data, for experience purposes"
						   }
						},
						"options":[
						   
						],
						"restrictiveOrder":"falseRestrictive",
						"userHidden":false,
						"userReadOnly":false,
						"required":false,
						"ageBracket":{
						   "consentTypeRequired":"none",
						   "defaultValue":true,
						   "enforcedLimit":true
						}
					 }
				  },
				  {
					 "namespace":"prm",
					 "settingName":"functional",
					 "preferredValue":true,
					 "preferredValueFromOrgLevel":true,
					 "effectiveValue":true,
					 "effectiveSource":"default",
					 "isOrgLevel":true,
					 "definition":{
						"orgId":"cc5b83aa-cb5c-4b4b-a800-a7dd64edacc0",
						"productId":"6fdb114c-3fbc-4ced-bc5b-55bcdba5c8f6",
						"namespace":"prm",
						"settingName":"functional",
						"valueType":"boolean",
						"allowProductOverrides":"ageBrackets",
						"inheritFromOrg":true,
						"translations":{
						   "en":{
							  "label":"Content can be targeted for functional purposes",
							  "userNotice":"Determines if you can be targeted content, based on personal data, for functional purposes",
							  "parentNotice":"Determines if your child can be targeted content, based on personal data, for functional purposes"
						   }
						},
						"options":[
						   
						],
						"restrictiveOrder":"falseRestrictive",
						"userHidden":false,
						"userReadOnly":false,
						"required":false,
						"ageBracket":{
						   "consentTypeRequired":"none",
						   "defaultValue":true,
						   "enforcedLimit":true
						}
					 }
				  },
				  {
					 "namespace":"profile",
					 "settingName":"allow-non-squad-users-to-see-my-username",
					 "preferredValue":false,
					 "preferredValueUpdatedAt":1678023125161,
					 "preferredValueFromOrgLevel":false,
					 "effectiveValue":false,
					 "effectiveSource":"preference",
					 "isOrgLevel":false,
					 "definition":{
						"orgId":"cc5b83aa-cb5c-4b4b-a800-a7dd64edacc0",
						"productId":"6fdb114c-3fbc-4ced-bc5b-55bcdba5c8f6",
						"namespace":"profile",
						"settingName":"allow-non-squad-users-to-see-my-username",
						"valueType":"boolean",
						"allowProductOverrides":"ageBrackets",
						"inheritFromOrg":true,
						"translations":{
						   "en":{
							  "label":"Display username to non-squad users",
							  "userNotice":"Determines if your username can be shown to non-squad users",
							  "parentNotice":"Determines if your child''s username can be shown to non-squad users"
						   }
						},
						"options":[
						   
						],
						"restrictiveOrder":"falseRestrictive",
						"userHidden":false,
						"userReadOnly":false,
						"required":false,
						"ageBracket":{
						   "consentTypeRequired":"none",
						   "defaultValue":true
						}
					 }
				  },
				  {
					 "namespace":"profile",
					 "settingName":"can-receive-gifts",
					 "preferredValue":true,
					 "preferredValueUpdatedAt":1677621341867,
					 "preferredValueFromOrgLevel":false,
					 "parentLimit":true,
					 "parentLimitFromOrgLevel":true,
					 "effectiveValue":true,
					 "effectiveSource":"preference",
					 "isOrgLevel":false,
					 "definition":{
						"orgId":"cc5b83aa-cb5c-4b4b-a800-a7dd64edacc0",
						"productId":"6fdb114c-3fbc-4ced-bc5b-55bcdba5c8f6",
						"namespace":"profile",
						"settingName":"can-receive-gifts",
						"valueType":"boolean",
						"allowProductOverrides":"ageBrackets",
						"inheritFromOrg":true,
						"translations":{
						   "en":{
							  "label":"Can Receive Gifts",
							  "userNotice":"Can Receive Gifts",
							  "parentNotice":"Can Receive Gifts"
						   }
						},
						"options":[
						   
						],
						"restrictiveOrder":"falseRestrictive",
						"userHidden":false,
						"userReadOnly":false,
						"required":false,
						"ageBracket":{
						   "consentTypeRequired":"none",
						   "consentTypeUnderParentalControl":"opt-in-unverified",
						   "defaultValue":true,
						   "defaultParentLimit":true,
						   "enforcedLimit":true
						}
					 }
				  },
				  {
					 "namespace":"stats",
					 "settingName":"show-in-leaderboard",
					 "preferredValue":true,
					 "preferredValueUpdatedAt":1664569691901,
					 "preferredValueFromOrgLevel":false,
					 "effectiveValue":true,
					 "effectiveSource":"preference",
					 "isOrgLevel":false,
					 "definition":{
						"orgId":"cc5b83aa-cb5c-4b4b-a800-a7dd64edacc0",
						"productId":"6fdb114c-3fbc-4ced-bc5b-55bcdba5c8f6",
						"namespace":"stats",
						"settingName":"show-in-leaderboard",
						"valueType":"boolean",
						"allowProductOverrides":"ageBrackets",
						"inheritFromOrg":true,
						"translations":{
						   "en":{
							  "label":"Show on career leaderboard",
							  "userNotice":"Show on career leaderboard",
							  "parentNotice":"Show on career leaderboard"
						   }
						},
						"options":[
						   
						],
						"restrictiveOrder":"falseRestrictive",
						"userHidden":false,
						"userReadOnly":false,
						"required":false,
						"ageBracket":{
						   "consentTypeRequired":"none",
						   "defaultValue":true,
						   "enforcedLimit":true
						}
					 }
				  },
				  {
					 "namespace":"profile",
					 "settingName":"playtime-reporting-frequency",
					 "preferredValue":"never",
					 "preferredValueFromOrgLevel":true,
					 "parentLimit":"never",
					 "parentLimitFromOrgLevel":true,
					 "effectiveValue":"never",
					 "effectiveSource":"default",
					 "isOrgLevel":true,
					 "definition":{
						"orgId":"cc5b83aa-cb5c-4b4b-a800-a7dd64edacc0",
						"productId":"6fdb114c-3fbc-4ced-bc5b-55bcdba5c8f6",
						"namespace":"profile",
						"settingName":"playtime-reporting-frequency",
						"valueType":"option",
						"allowProductOverrides":"ageBrackets",
						"inheritFromOrg":true,
						"translations":{
						   "ko":{
							  "label":"\uc8fc\uac04 \ud50c\ub808\uc774 \uc2dc\uac04 \ucd94\uc801 \ubcf4\uace0\uc11c \ubc1b\uae30",
							  "parentNotice":"\uc8fc\uac04 \ud50c\ub808\uc774 \uc2dc\uac04 \ucd94\uc801 \ubcf4\uace0\uc11c \ubc1b\uae30"
						   },
						   "pl":{
							  "label":"Otrzymuj cotygodniowy raport z czasem rozgrywki",
							  "parentNotice":"Otrzymuj cotygodniowy raport z czasem rozgrywki"
						   },
						   "pt-BR":{
							  "label":"Receber relat\u00f3rios semanais de tempo de jogo",
							  "parentNotice":"Receber relat\u00f3rios semanais de tempo de jogo"
						   },
						   "ru":{
							  "label":"\u041f\u043e\u043b\u0443\u0447\u0430\u0442\u044c \u0435\u0436\u0435\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u044b\u0435 \u043e\u0442\u0447\u0451\u0442\u044b \u043e \u0432\u0440\u0435\u043c\u0435\u043d\u0438 \u0438\u0433\u0440\u044b",
							  "parentNotice":"\u041f\u043e\u043b\u0443\u0447\u0430\u0442\u044c \u0435\u0436\u0435\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u044b\u0435 \u043e\u0442\u0447\u0451\u0442\u044b \u043e \u0432\u0440\u0435\u043c\u0435\u043d\u0438 \u0438\u0433\u0440\u044b"
						   },
						   "th":{
							  "label":"\u0e23\u0e31\u0e1a\u0e23\u0e32\u0e22\u0e07\u0e32\u0e19\u0e15\u0e34\u0e14\u0e15\u0e32\u0e21\u0e40\u0e27\u0e25\u0e32\u0e43\u0e19\u0e01\u0e32\u0e23\u0e40\u0e25\u0e48\u0e19\u0e40\u0e01\u0e21\u0e23\u0e32\u0e22\u0e2a\u0e31\u0e1b\u0e14\u0e32\u0e2b\u0e4c",
							  "parentNotice":"\u0e23\u0e31\u0e1a\u0e23\u0e32\u0e22\u0e07\u0e32\u0e19\u0e15\u0e34\u0e14\u0e15\u0e32\u0e21\u0e40\u0e27\u0e25\u0e32\u0e43\u0e19\u0e01\u0e32\u0e23\u0e40\u0e25\u0e48\u0e19\u0e40\u0e01\u0e21\u0e23\u0e32\u0e22\u0e2a\u0e31\u0e1b\u0e14\u0e32\u0e2b\u0e4c"
						   },
						   "tr":{
							  "label":"Haftal\u0131k oynama s\u00fcresi izleme raporlar\u0131 al\u0131n",
							  "parentNotice":"Haftal\u0131k oynama s\u00fcresi izleme raporlar\u0131 al\u0131n"
						   },
						   "zh-CN":{
							  "label":"\u63a5\u6536\u6bcf\u5468\u53d1\u9001\u7684\u6e38\u620f\u65f6\u95f4\u8ddf\u8e2a\u62a5\u544a",
							  "parentNotice":"\u63a5\u6536\u6bcf\u5468\u53d1\u9001\u7684\u6e38\u620f\u65f6\u95f4\u8ddf\u8e2a\u62a5\u544a"
						   },
						   "zh-Hant":{
							  "label":"\u63a5\u6536\u6bcf\u9031\u904a\u73a9\u6642\u9593\u8ffd\u8e64\u5831\u544a",
							  "parentNotice":"\u63a5\u6536\u6bcf\u9031\u904a\u73a9\u6642\u9593\u8ffd\u8e64\u5831\u544a"
						   },
						   "en":{
							  "label":"Receive weekly playtime tracking reports",
							  "parentNotice":"Receive weekly playtime tracking reports"
						   },
						   "ar":{
							  "label":"\u062a\u0644\u0642\u0649 \u062a\u0642\u0627\u0631\u064a\u0631 \u062a\u062a\u0628\u0639 \u0648\u0642\u062a \u0627\u0644\u0644\u0639\u0628 \u0627\u0644\u0623\u0633\u0628\u0648\u0639\u064a\u0629",
							  "parentNotice":"\u062a\u0644\u0642\u0649 \u062a\u0642\u0627\u0631\u064a\u0631 \u062a\u062a\u0628\u0639 \u0648\u0642\u062a \u0627\u0644\u0644\u0639\u0628 \u0627\u0644\u0623\u0633\u0628\u0648\u0639\u064a\u0629"
						   },
						   "de":{
							  "label":"W\u00f6chentliche Spielzeitberichte erhalten",
							  "parentNotice":"W\u00f6chentliche Spielzeitberichte erhalten"
						   },
						   "es":{
							  "label":"Recibir informes semanales de seguimiento del tiempo de juego",
							  "parentNotice":"Recibir informes semanales de seguimiento del tiempo de juego"
						   },
						   "es-ES":{
							  "label":"Recibir informes semanales de seguimiento del tiempo de juego",
							  "parentNotice":"Recibir informes semanales de seguimiento del tiempo de juego"
						   },
						   "es-MX":{
							  "label":"Recibir reportes semanales de seguimiento del tiempo de juego",
							  "parentNotice":"Recibir reportes semanales de seguimiento del tiempo de juego"
						   },
						   "fr":{
							  "label":"Recevoir des rapports hebdomadaires de suivi du temps du jeu",
							  "parentNotice":"Recevoir des rapports hebdomadaires de suivi du temps du jeu"
						   },
						   "it":{
							  "label":"Ricevi rapporti settimanali che tengono traccia del tempo di gioco",
							  "parentNotice":"Ricevi rapporti settimanali che tengono traccia del tempo di gioco"
						   },
						   "ja":{
							  "label":"\u9031\u6bce\u306e\u30d7\u30ec\u30a4\u6642\u9593\u8ffd\u8de1\u30ec\u30dd\u30fc\u30c8\u3092\u53d7\u3051\u53d6\u308b",
							  "parentNotice":"\u9031\u6bce\u306e\u30d7\u30ec\u30a4\u6642\u9593\u8ffd\u8de1\u30ec\u30dd\u30fc\u30c8\u3092\u53d7\u3051\u53d6\u308b"
						   }
						},
						"options":[
						   {
							  "value":"weekly",
							  "translations":{
								 "zh-CN":{
									"label":"Weekly",
									"parentNotice":"<b>\u5f00\uff1a</b>\u6211\u4eec\u5c06\u5411\u4e0e\u6b64\u8d26\u6237\u5173\u8054\u7684\u5bb6\u957f\u6216\u76d1\u62a4\u4eba\u4e4b\u7535\u5b50\u90ae\u4ef6\u5730\u5740\uff0c\u6bcf\u5468\u53d1\u9001\u6e38\u620f\u65f6\u95f4\u8ddf\u8e2a\u62a5\u544a\u3002\u5982\u679c\u6b64\u8d26\u6237\u672a\u4e0e\u4efb\u4f55\u5bb6\u957f\u6216\u6216\u76d1\u62a4\u4eba\u7684\u7535\u5b50\u90ae\u4ef6\u5730\u5740\u76f8\u5173\u8054\uff0c\u6211\u4eec\u4f1a\u5c06\u6e38\u620f\u65f6\u95f4\u8ddf\u8e2a\u62a5\u544a\u53d1\u9001\u81f3\u6b64\u8d26\u6237\u7684\u7535\u5b50\u90ae\u4ef6\u5730\u5740\u3002"
								 },
								 "zh-Hant":{
									"label":"Weekly",
									"parentNotice":"<b>\u958b\u555f\uff1a</b>\u6211\u5011\u6703\u5c07\u6bcf\u9031\u904a\u73a9\u6642\u9593\u8ffd\u8e64\u5831\u544a\u5bc4\u9001\u81f3\u8207\u6b64\u5e33\u865f\u9023\u7d50\u7684\u5bb6\u9577\u6216\u76e3\u8b77\u4eba\u7684\u96fb\u5b50\u90f5\u4ef6\u3002\u82e5\u6c92\u6709\u5bb6\u9577\u6216\u76e3\u8b77\u4eba\u96fb\u5b50\u90f5\u4ef6\u5730\u5740\uff0c\u6211\u5011\u6703\u5c07\u904a\u73a9\u6642\u9593\u5831\u544a\u5bc4\u9001\u5230\u9019\u500b\u5e33\u865f\u7684\u96fb\u5b50\u90f5\u4ef6\u5730\u5740\u3002"
								 },
								 "en":{
									"label":"Weekly",
									"parentNotice":"<b>On:</b> We'll send a weekly playtime report to the parent or guardian associated with this account. If there isn't a parent or guardian email address, we'll send the playtime report to this account\u2019s email address."
								 },
								 "ar":{
									"label":"Weekly",
									"parentNotice":"<b>\u062a\u0634\u063a\u064a\u0644:</b> \u0633\u0646\u0631\u0633\u0644 \u062a\u0642\u0631\u064a\u0631\u064b\u0627 \u0628\u0648\u0642\u062a \u0627\u0644\u0644\u0639\u0628 \u0627\u0644\u0623\u0633\u0628\u0648\u0639\u064a \u0625\u0644\u0649 \u0627\u0644\u0648\u0627\u0644\u062f\u064a\u0646 \u0623\u0648 \u0627\u0644\u0648\u0635\u064a \u0627\u0644\u0645\u0631\u062a\u0628\u0637 \u0628\u0647\u0630\u0627 \u0627\u0644\u062d\u0633\u0627\u0628. \u0625\u0630\u0627 \u0644\u0645 \u064a\u0648\u062c\u062f \u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0644\u0644\u0648\u0627\u0644\u062f\u064a\u0646 \u0623\u0648 \u0627\u0644\u0648\u0635\u064a\u060c \u0641\u0633\u0646\u0631\u0633\u0644 \u062a\u0642\u0631\u064a\u0631\u064b\u0627 \u0628\u0648\u0642\u062a \u0627\u0644\u0644\u0639\u0628 \u0625\u0644\u0649 \u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0627\u0644\u062e\u0627\u0635 \u0628\u0647\u0630\u0627 \u0627\u0644\u062d\u0633\u0627\u0628."
								 },
								 "de":{
									"label":"Weekly",
									"parentNotice":"<b>Ein:</b> Wir senden einen w\u00f6chentlichen Spielzeitbericht an die mit diesem Konto verbundenen Eltern oder Erziehungsberechtigten. Wenn keine E-Mail-Adresse eines Elternteils oder Erziehungsberechtigten hinterlegt ist, senden wir den Spielzeitbericht an die E-Mail-Adresse dieses Kontos."
								 },
								 "es":{
									"label":"Weekly",
									"parentNotice":"<b>Activado:</b> enviaremos un informe del tiempo de juego semanal al padre, madre o tutor asociado a esta cuenta. Si no hay una direcci\u00f3n de correo electr\u00f3nico del padre, madre o tutor, enviaremos el informe de tiempo de juego a la direcci\u00f3n de correo electr\u00f3nico de la cuenta."
								 },
								 "es-ES":{
									"label":"Weekly",
									"parentNotice":"<b>Activado:</b> enviaremos un informe del tiempo de juego semanal al padre, madre o tutor asociado a esta cuenta. Si no hay una direcci\u00f3n de correo electr\u00f3nico del padre, madre o tutor, enviaremos el informe de tiempo de juego a la direcci\u00f3n de correo electr\u00f3nico de la cuenta."
								 },
								 "es-MX":{
									"label":"Weekly",
									"parentNotice":"<b>Activado:</b> enviaremos un informe semanal del tiempo de juego al padre, madre o tutor asociado a esta cuenta. Si esta cuenta no tiene asociada una direcci\u00f3n de correo electr\u00f3nico del padre, madre o tutor, enviaremos el informe al correo de esta cuenta."
								 },
								 "fr":{
									"label":"Weekly",
									"parentNotice":"<b>Activ\u00e9\u00a0:</b> nous enverrons un rapport hebdomadaire sur le temps de jeu \u00e0 l'adresse e-mail du parent ou du tuteur l\u00e9gal associ\u00e9e \u00e0 ce compte. Si aucune adresse e-mail de parent ou de tuteur l\u00e9gal n'est associ\u00e9e \u00e0 ce compte, nous enverrons le rapport de temps de jeu \u00e0 l'adresse e-mail du compte."
								 },
								 "it":{
									"label":"Weekly",
									"parentNotice":"<b>Attivato:</b> invieremo un rapporto settimanale sul tempo di gioco all'indirizzo e-mail del genitore o tutore associato a questo account. Se non ci fosse un indirizzo e-mail di un genitore o tutore, invieremo un rapporto settimanale sul tempo di gioco a questo indirizzo e-mail."
								 },
								 "ja":{
									"label":"Weekly",
									"parentNotice":"<b>\u30aa\u30f3\uff1a</b>\u9031\u6bce\u306e\u30d7\u30ec\u30a4\u6642\u9593\u30ec\u30dd\u30fc\u30c8\u304c\u3001\u30a2\u30ab\u30a6\u30f3\u30c8\u306b\u767b\u9332\u3055\u308c\u3066\u3044\u308b\u89aa\u307e\u305f\u306f\u4fdd\u8b77\u8005\u306b\u9001\u4fe1\u3055\u308c\u307e\u3059\u3002\u89aa\u307e\u305f\u306f\u4fdd\u8b77\u8005\u306e\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u304c\u767b\u9332\u3055\u308c\u3066\u3044\u306a\u3044\u5834\u5408\u306f\u3001\u30a2\u30ab\u30a6\u30f3\u30c8\u306b\u8a2d\u5b9a\u3055\u308c\u3066\u3044\u308b\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u306b\u30d7\u30ec\u30a4\u6642\u9593\u30ec\u30dd\u30fc\u30c8\u304c\u9001\u4fe1\u3055\u308c\u307e\u3059\u3002"
								 },
								 "ko":{
									"label":"Weekly",
									"parentNotice":"<b>\ucf1c\uae30:</b> \uc774 \uacc4\uc815\uc5d0 \uc5f0\uacb0\ub41c \ubd80\ubaa8 \ub610\ub294 \ubcf4\ud638\uc790\uc5d0\uac8c \uc8fc\uac04 \ud50c\ub808\uc774 \uc2dc\uac04 \ubcf4\uace0\uc11c\ub97c \ubcf4\ub0c5\ub2c8\ub2e4. \ubd80\ubaa8 \ub610\ub294 \ubcf4\ud638\uc790\uc758 \uc774\uba54\uc77c \uc8fc\uc18c\uac00 \uc5c6\ub294 \uacbd\uc6b0, \uc774 \uacc4\uc815\uc758 \uc774\uba54\uc77c \uc8fc\uc18c\ub85c \ud50c\ub808\uc774 \uc2dc\uac04 \ubcf4\uace0\uc11c\ub97c \ubcf4\ub0c5\ub2c8\ub2e4."
								 },
								 "pl":{
									"label":"Weekly",
									"parentNotice":"<b>W\u0142.:</b> b\u0119dziemy wysy\u0142a\u0107 cotygodniowy raport z czasem rozgrywki do rodzica lub opiekuna powi\u0105zanego z tym kontem. Je\u015bli nie podano \u017cadnego adresu e-mail rodzica lub opiekuna, b\u0119dziemy wysy\u0142a\u0107 raport z czasem rozgrywki na adres e-mail tego konta."
								 },
								 "pt-BR":{
									"label":"Weekly",
									"parentNotice":"<b>Ligado:</b> enviaremos um relat\u00f3rio semanal de tempo de jogo para os pais ou respons\u00e1veis associados a esta conta. Caso n\u00e3o haja um endere\u00e7o de e-mail dos pais ou respons\u00e1veis, enviaremos o relat\u00f3rio semanal de tempo de jogo para o endere\u00e7o de e-mail da conta."
								 },
								 "ru":{
									"label":"Weekly",
									"parentNotice":"<b>\u0412\u043a\u043b.:</b> \u043a\u0430\u0436\u0434\u0443\u044e \u043d\u0435\u0434\u0435\u043b\u044e \u043c\u044b \u0431\u0443\u0434\u0435\u043c \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u044f\u0442\u044c \u043e\u0442\u0447\u0451\u0442\u044b \u043e \u0432\u0440\u0435\u043c\u0435\u043d\u0438 \u0438\u0433\u0440\u044b \u0440\u043e\u0434\u0438\u0442\u0435\u043b\u044e \u0438\u043b\u0438 \u043e\u043f\u0435\u043a\u0443\u043d\u0443, \u0441\u0432\u044f\u0437\u0430\u043d\u043d\u043e\u043c\u0443 \u0441 \u044d\u0442\u043e\u0439 \u0443\u0447\u0451\u0442\u043d\u043e\u0439 \u0437\u0430\u043f\u0438\u0441\u044c\u044e. \u0415\u0441\u043b\u0438 \u043a \u044d\u0442\u043e\u0439 \u0443\u0447\u0451\u0442\u043d\u043e\u0439 \u0437\u0430\u043f\u0438\u0441\u0438 \u043d\u0435 \u043f\u0440\u0438\u0432\u044f\u0437\u0430\u043d \u0430\u0434\u0440\u0435\u0441 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u043e\u0439 \u043f\u043e\u0447\u0442\u044b \u0440\u043e\u0434\u0438\u0442\u0435\u043b\u044f \u0438\u043b\u0438 \u043e\u043f\u0435\u043a\u0443\u043d\u0430, \u043c\u044b \u0431\u0443\u0434\u0435\u043c \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u044f\u0442\u044c \u043e\u0442\u0447\u0451\u0442\u044b \u043d\u0430 \u0430\u0434\u0440\u0435\u0441 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u043e\u0439 \u043f\u043e\u0447\u0442\u044b \u044d\u0442\u043e\u0439 \u0443\u0447\u0451\u0442\u043d\u043e\u0439 \u0437\u0430\u043f\u0438\u0441\u0438."
								 },
								 "th":{
									"label":"Weekly",
									"parentNotice":"<b>\u0e40\u0e1b\u0e34\u0e14:</b> \u0e40\u0e23\u0e32\u0e08\u0e30\u0e2a\u0e48\u0e07\u0e23\u0e32\u0e22\u0e07\u0e32\u0e19\u0e40\u0e27\u0e25\u0e32\u0e43\u0e19\u0e01\u0e32\u0e23\u0e40\u0e25\u0e48\u0e19\u0e40\u0e01\u0e21\u0e23\u0e32\u0e22\u0e2a\u0e31\u0e1b\u0e14\u0e32\u0e2b\u0e4c\u0e43\u0e2b\u0e49\u0e1c\u0e39\u0e49\u0e1b\u0e01\u0e04\u0e23\u0e2d\u0e07\u0e2b\u0e23\u0e37\u0e2d\u0e1c\u0e39\u0e49\u0e14\u0e39\u0e41\u0e25\u0e17\u0e35\u0e48\u0e40\u0e01\u0e35\u0e48\u0e22\u0e27\u0e02\u0e49\u0e2d\u0e07\u0e01\u0e31\u0e1a\u0e1a\u0e31\u0e0d\u0e0a\u0e35\u0e19\u0e35\u0e49 \u0e2b\u0e32\u0e01\u0e44\u0e21\u0e48\u0e21\u0e35\u0e2d\u0e35\u0e40\u0e21\u0e25\u0e1c\u0e39\u0e49\u0e1b\u0e01\u0e04\u0e23\u0e2d\u0e07\u0e2b\u0e23\u0e37\u0e2d\u0e1c\u0e39\u0e49\u0e14\u0e39\u0e41\u0e25 \u0e40\u0e23\u0e32\u0e08\u0e30\u0e2a\u0e48\u0e07\u0e23\u0e32\u0e22\u0e07\u0e32\u0e19\u0e40\u0e27\u0e25\u0e32\u0e43\u0e19\u0e01\u0e32\u0e23\u0e40\u0e25\u0e48\u0e19\u0e40\u0e01\u0e21\u0e44\u0e1b\u0e17\u0e35\u0e48\u0e2d\u0e35\u0e40\u0e21\u0e25\u0e02\u0e2d\u0e07\u0e1a\u0e31\u0e0d\u0e0a\u0e35\u0e19\u0e35\u0e49\u0e41\u0e17\u0e19"
								 },
								 "tr":{
									"label":"Weekly",
									"parentNotice":"<b>A\u00e7\u0131k:</b> Bu hesap ile ili\u015fkili ebeveyn veya vasiye haftal\u0131k bir oynama s\u00fcresi raporu g\u00f6nderece\u011fiz. Herhangi bir ebeveyn veya vasi e-posta adresi yoksa, oynama s\u00fcresi raporunu bu hesab\u0131n e-posta adresine g\u00f6nderece\u011fiz."
								 }
							  }
						   },
						   {
							  "value":"never",
							  "translations":{
								 "en":{
									"label":"Never",
									"parentNotice":"<b>Off:</b> You won't receive weekly playtime tracking reports."
								 },
								 "ar":{
									"label":"Never",
									"parentNotice":"<b>\u0625\u064a\u0642\u0627\u0641:</b> \u0644\u0646 \u062a\u062a\u0644\u0642\u0649 \u062a\u0642\u0627\u0631\u064a\u0631 \u062a\u062a\u0628\u0639 \u0648\u0642\u062a \u0627\u0644\u0644\u0639\u0628 \u0627\u0644\u0623\u0633\u0628\u0648\u0639\u064a\u0629."
								 },
								 "de":{
									"label":"Never",
									"parentNotice":"<b>Aus:</b> Sie erhalten keine w\u00f6chentlichen Spielzeitberichte."
								 },
								 "es":{
									"label":"Never",
									"parentNotice":"<b>Desactivado:</b> no recibir\u00e1s informes semanales de seguimiento del tiempo de juego."
								 },
								 "es-ES":{
									"label":"Never",
									"parentNotice":"<b>Desactivado:</b> no recibir\u00e1s informes semanales de seguimiento del tiempo de juego."
								 },
								 "es-MX":{
									"label":"Never",
									"parentNotice":"<b>Desactivado:</b> No recibir\u00e1s informes semanales de seguimiento del tiempo de juego."
								 },
								 "fr":{
									"label":"Never",
									"parentNotice":"<b>D\u00e9sactiv\u00e9\u00a0:</b> vous ne recevrez pas les rapports hebdomadaires de suivi du temps du jeu."
								 },
								 "it":{
									"label":"Never",
									"parentNotice":"<b>Disattivato:</b> non riceverai rapporti settimanali che tengono traccia del tempo di gioco."
								 },
								 "ja":{
									"label":"Never",
									"parentNotice":"<b>\u30aa\u30d5\uff1a</b>\u9031\u6bce\u306e\u30d7\u30ec\u30a4\u6642\u9593\u8ffd\u8de1\u30ec\u30dd\u30fc\u30c8\u3092\u53d7\u3051\u53d6\u308a\u307e\u305b\u3093\u3002"
								 },
								 "ko":{
									"label":"Never",
									"parentNotice":"<b>\ub044\uae30:</b> \uc8fc\uac04 \ud50c\ub808\uc774 \uc2dc\uac04 \ucd94\uc801 \ubcf4\uace0\uc11c\ub97c \ubc1b\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4."
								 },
								 "pl":{
									"label":"Never",
									"parentNotice":"<b>Wy\u0142.:</b> nie otrzymasz cotygodniowego raportu z czasem rozgrywki."
								 },
								 "pt-BR":{
									"label":"Never",
									"parentNotice":"<b>Desligado:</b> voc\u00ea n\u00e3o receber\u00e1 relat\u00f3rios semanais de tempo de jogo."
								 },
								 "ru":{
									"label":"Never",
									"parentNotice":"<b>\u0412\u044b\u043a\u043b.:</b> \u0432\u044b \u043d\u0435 \u0431\u0443\u0434\u0435\u0442\u0435 \u043f\u043e\u043b\u0443\u0447\u0430\u0442\u044c \u0435\u0436\u0435\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u044b\u0435 \u043e\u0442\u0447\u0451\u0442\u044b \u043e \u0432\u0440\u0435\u043c\u0435\u043d\u0438 \u0438\u0433\u0440\u044b."
								 },
								 "th":{
									"label":"Never",
									"parentNotice":"<b>\u0e1b\u0e34\u0e14:</b> \u0e04\u0e38\u0e13\u0e08\u0e30\u0e44\u0e21\u0e48\u0e44\u0e14\u0e49\u0e23\u0e31\u0e1a\u0e23\u0e32\u0e22\u0e07\u0e32\u0e19\u0e15\u0e34\u0e14\u0e15\u0e32\u0e21\u0e40\u0e27\u0e25\u0e32\u0e43\u0e19\u0e01\u0e32\u0e23\u0e40\u0e25\u0e48\u0e19\u0e40\u0e01\u0e21\u0e23\u0e32\u0e22\u0e2a\u0e31\u0e1b\u0e14\u0e32\u0e2b\u0e4c"
								 },
								 "tr":{
									"label":"Never",
									"parentNotice":"<b>Kapal\u0131:</b> Haftal\u0131k oynama s\u00fcresi izleme raporlar\u0131 almayacaks\u0131n\u0131z."
								 },
								 "zh-CN":{
									"label":"Never",
									"parentNotice":"<b>\u5173\uff1a</b>\u60a8\u5c06\u4e0d\u4f1a\u6536\u5230\u6bcf\u5468\u53d1\u9001\u7684\u6e38\u620f\u65f6\u95f4\u8ddf\u8e2a\u62a5\u544a\u3002"
								 },
								 "zh-Hant":{
									"label":"Never",
									"parentNotice":"<b>\u95dc\u9589\uff1a</b>\u60a8\u5c07\u4e0d\u6703\u6536\u5230\u6bcf\u9031\u904a\u73a9\u6642\u9593\u8ffd\u8e64\u5831\u544a\u3002"
								 }
							  }
						   }
						],
						"restrictiveOrder":"firstRestrictive",
						"userHidden":true,
						"userReadOnly":false,
						"required":false,
						"ageBracket":{
						   "consentTypeRequired":"none",
						   "consentTypeUnderParentalControl":"opt-in-unverified",
						   "defaultValue":"never",
						   "defaultParentLimit":"never"
						}
					 }
				  },
				  {
					 "namespace":"prm",
					 "settingName":"marketing",
					 "preferredValue":true,
					 "preferredValueFromOrgLevel":true,
					 "effectiveValue":true,
					 "effectiveSource":"default",
					 "isOrgLevel":true,
					 "definition":{
						"orgId":"cc5b83aa-cb5c-4b4b-a800-a7dd64edacc0",
						"productId":"6fdb114c-3fbc-4ced-bc5b-55bcdba5c8f6",
						"namespace":"prm",
						"settingName":"marketing",
						"valueType":"boolean",
						"allowProductOverrides":"ageBrackets",
						"inheritFromOrg":true,
						"translations":{
						   "en":{
							  "label":"Content can be targeted for marketing purposes",
							  "userNotice":"Determines if you can be targeted content, based on personal data, for marketing purposes",
							  "parentNotice":"Determines if your child can be targeted content, based on personal data, for marketing purposes"
						   }
						},
						"options":[
						   
						],
						"restrictiveOrder":"falseRestrictive",
						"userHidden":false,
						"userReadOnly":false,
						"required":false,
						"ageBracket":{
						   "consentTypeRequired":"none",
						   "defaultValue":true,
						   "enforcedLimit":true
						}
					 }
				  },
				  {
					 "namespace":"profile",
					 "settingName":"can-see-player-usernames-from-other-squads",
					 "preferredValue":false,
					 "preferredValueUpdatedAt":1678023125162,
					 "preferredValueFromOrgLevel":false,
					 "effectiveValue":false,
					 "effectiveSource":"preference",
					 "isOrgLevel":false,
					 "definition":{
						"orgId":"cc5b83aa-cb5c-4b4b-a800-a7dd64edacc0",
						"productId":"6fdb114c-3fbc-4ced-bc5b-55bcdba5c8f6",
						"namespace":"profile",
						"settingName":"can-see-player-usernames-from-other-squads",
						"valueType":"boolean",
						"allowProductOverrides":"ageBrackets",
						"inheritFromOrg":true,
						"translations":{
						   "en":{
							  "label":"Can see usernames of players from other squads",
							  "userNotice":"Determines if you can see usernames of players from other squads",
							  "parentNotice":"Determines if your child can see usernames of players from other squads"
						   }
						},
						"options":[
						   
						],
						"restrictiveOrder":"falseRestrictive",
						"userHidden":false,
						"userReadOnly":false,
						"required":false,
						"ageBracket":{
						   "consentTypeRequired":"none",
						   "defaultValue":true
						}
					 }
				  }
			   ]
			},
			"meta":{
			   "requestId":"40031710-d00d-11ed-9981-498b9f6c7772",
			   "timestamp":"2023-03-31T21:44:44.545Z"
			}
		 })
	})
}