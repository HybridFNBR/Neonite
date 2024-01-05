const path = require('path');
var fs = require('fs')
var ini = require('ini')

/**
 * 
 * @param {Express.Application} app 
 */


function getSeasonInfo(req) {
    const userAgent = req.headers["user-agent"];
    const season = userAgent.split('-')[1];
    const seasonglobal = season.split('.')[0];
    return { season, seasonglobal };
}

module.exports = (app) => {
    app.get('/fortnite/api/calendar/v1/timeline', (req, res) => {
        const { season, seasonglobal } = getSeasonInfo(req);
        var config = ini.parse(fs.readFileSync(path.join(__dirname, '../config.ini'), 'utf-8'));
        const timeline = {
            channels: {
                "standalone-store": {},
                "client-matchmaking": {},
                tk: {
                    states: [
                        {
                            validFrom: "2019-12-31T23:59:59.999Z",
                            activeEvents: [],
                            state: {
                                k: [
                                    "A9AFB4A346420DB1399A2FB2065528F5:Zjzo+CaLNmCygplzQo2wUL4LT33DEiL6qZWE2R0EYMg=",
                                    "79F7D9C856E8CF354109D3298F076C06:Ak3TOM0i0Mq/KYxd7SDlSuS7o55USaf+urL6WqnmalY=",
                                    "8C623F6A49CFF9ADC7895A466CA1C896:kLmYdLi+jOBs2k+B/UxrCcPSdvuNYTha0xl9+SvUzJU=",
                                    "0C2DFF3432352A23684E05B0794DFFC7:FG55cmgdBnszsr5pS0aBC44NVl7OyI+AuOXxALyaNKA=",
                                    "37B3D2284CB3924E6592C2D1D11451E4:CMJclyQ1I9iY+VkDiajhGxxYQmZGHrTAlEl/wtlT+pk=",
                                    "F71D60AE5231E90CEA7F53D90DC4F007:ver8B06IS0up7tNYy03zkhCl+CrTl3czgmXPYYONcM8=",
                                    "FBAC0AD8C03AAB2DC3BC077597517179:5oj8B4R53plPxRictMN6QkQ741CibMbmzRJYIDIQ5iM=",
                                    "8734362B2A2A8B0FBC9EDE6160627E1D:8ZsoLeTeezxjoIxnNfUrNf61XfqMEKfnyTb3u4o/X6g=",
                                    "F51C8301B1C9BE9D4C4F48ED2C0FE067:+MsgNTH4cF1Mr4mjNVZVgsf3GBgjSjYn2yRZn2fE70A=",
                                    "C60475E046D0F0FBCFE6DE6F9E040E0E:Wc6IzWuqnm7EHqcSx14i6KwXwl4+PmQq180ESMdR+08=",
                                    "6A2047910081947B9A5DCF542A9AEBE5:V/jMTWL+zbqeIlKCE9+SM3+X69aYbt/cN0+G1D0GBQU=",
                                    "71C3BFE2AF0BC8DE7BC3735614CE6263:hNLsvUTUw0cw1WrfOEjm7oSGPfpEZer6R0G7F2El6Q0=",
                                    "7F5ACEFE3F67BC0CCEB59A4E8EB82BAF:iDG2HB2LypEtzw5/EjKVpJmQ1o30BE3nVv01rOTyq64=",
                                    "8D578CF915DB851F9BE73C937D3565E4:Xk8kUK9cut4tXr0VQjufZdoepp+TzGmlDA7fzYA1rAc=",
                                    "BE20AAF89FE897368E52AAA193DEEB53:jHRZho9v4IKzFzk51RD0nAVFCZ27vIwcstPkdQeSupc=",
                                    "BE20AAF89FE897368E52AAA193DEEB53:jHRZho9v4IKzFzk51RD0nAVFCZ27vIwcstPkdQeSupc=:SkyFire_Playlist",
                                    "955C5EA2C28764221AF554097C5CE9E6:jzkT7NbAZpMlRIC/qnSOUAcAz6CXh00ZF3EK+GfWbGQ=:SkyFire_Event",
                                    "B3A4B83DA3274522D4B9F117DCF9A0B3:y5n7vfr0uucr+psZzb2F3g45pWUsv3i3j/M6bl78Z9A=",
                                    "9972857939D69D9799D6800D0D70ACE4:J5NKMyEoVZ2zBlCiTGN65eKAAHStaOO+bVGbJfsFI/k=",
                                    "1398A4C2E6C3954EDDC49F85C5AB251B:qF0+04jSaU0kgws/RigbWpwnyPQMDnK+4Vf4G0tmTns=:Collision_Playlist",
                                    "1301F2838EB647C3D111CC1A61C7D8C3:OuEyyvjyHEYgHt7u8KA2UvKxsCBLlwmwq01D/ErBAWc=:Collision_Event",
                                    "C624A3D18A8A2494288EE915D11518B7:/q+bDo9akBx2JId6QvLQW1YoN4jBEEn+QdzBXjB3OpQ=",
                                    "F00E08CB606091AEFAB37D9B0A01B833:uEmoAK5xdbd8KefVf9o7uJiGcGTYk2r9QevsGe4vBII=",
                                    "020BFB18192345A6CF1AB75A66D879DD:T9UgbPCAqJBtxypUfcH/MqLBL5D8dc2rh8H6/La3FDk=",
                                    "0C81D16F6CF41C862D0B097DBE5E624A:qIzymfmYIWAQbAhalU2MQOR6vwmj42xHgtW41rhIev4=",
                                    "11A2A4F6D2D907D8718A91CB05AF99F0:psD4DdrmKRTtrbaAkoDjTtrC0zZAclPsWm93aw/e6hA=",
                                    "23DEA89BDC537501407CE442F9D7488B:MBhNDIgF/lTCfsqwj8VvjD1WBYdv1MvrwT+k8MCyDzg=",
                                    "2830AEF5C09E976B74EE1E194E3B988B:UduuLiZnBhH43ymHQqejG91JFUIoYCydpUpQ6SWBWgY=",
                                    "40B325F1EBCD65F9B8AA3E5F27EAA4FE:NSejpmJhzFwD65Zzt6habPR6vlesovU2DlEo5lyVM8M=",
                                    "605624BEED560EAFCF45CAD7E2FB4E48:kfYhFrpDNLuCuE016d+F3Oh0NAcQl+TJbb/TFRfEjy4=",
                                    "704725A33203935E6E576D64D44905D4:tKWz7Ob1wPsOnzQzOqdJ7Cd5e9P+VVXJL7DIdww6VrM=",
                                    "737D758CBCCFF589BCDA9236930EDA52:KToMoMliD/DoJnxL11MpgqgCsHHUJFhJxj8nkixIKiw=",
                                    "7DD96358E6FCB34A5221D2E77087D23D:1H4kxS6zepB460v5K2/w2lyuCdj4Qsni15F1qSSPVdQ=",
                                    "875A2044382363BB04B7E1B02DB7F905:2YtCtIxaCocZA54jyloILrq30zwBJx3UTRVykYiVy3k=",
                                    "8B57E50789D21E269BDBE46184F88FA0:G4bUrNa7X6RXd3/vvJyRLQr7dhSiPo2+yuKrp24RXN0=",
                                    "8BCF8182A37A4EE321F5078954A75122:wLfDsgM7jhjuvKHr3zFxWs4pDn12nRiG4RVQfuNSTuM=",
                                    "8E48CAF3A86554ADE0DD49326AD1F26B:UGuqIW16b+CxBHFpGPedPqsFisX3KygBTq84QFi4ZEE=",
                                    "8F7AAC929AED8C9231EA30CEC0A2A75D:1HeufgQ+oYCTosTR/ILGHFnypvS+udjy1Tsyffya+qs=",
                                    "98742D3B15A7227BA2A55CBD8C3A56A1:Kvq/pUKqQb1OGD76rGoOd0odcSmRtej5KvG4r+ofOHY=",
                                    "BA2A14985A7E28544995069FC9359C81:lIJvTL75n/NrsjEe4Nd+L4UQCiPcYvHaDbc5q7xJVbM=",
                                    "BF54C54672DEFBD71B744A72053E4168:TL25+NVV64p19Xu6A7+VVMfNwEseRZiEZ8J0QBfIkWs=",
                                    "C4982170B633DB6D2FE340A488EE425B:1XxlJtR4sc6vP0MpkwKrwCrHHTAi+GP2Pu5Az7yftcs=",
                                    "C4CF3F4B73862D7CA4AD87ADEB4D073F:hPF2H1xHMyX4NRGMyy7tSpS1yf2NHs1vStN/Wq7T6aA=",
                                    "CD9A2158EBA8DEC4F51A16F0F19D0F06:HKidNu7ZYT9Gsckip7xIrqxKC4lIeQ0kLGkljdqj1kE=",
                                    "CED82F0AF09F2650E043A0B9CFD1BE98:ZHNIVGxs07Yus1Jm6EhAiZmpUsil0HusHS2HH0vvo+8=",
                                    "DAAD9ACDD8C3690CE4D11DA2D7663DFB:OL1/ndG9SEBobBCmm/+Aqy67S8A6sebpFV4we3HFjoI=",
                                    "E0C536FDC9A4B19843DCFD22638CE81A:cirXcwpB+vzrBT5pKkrJYbdGrWRBkCg+UJ+x20yU1J0=",
                                    "EE02264B5DA4FA57A4C708F9DD615A87:DjEzloaeCgNBk0f3zT6m7+6TNrxu7EAolqvbsNykcuw=",
                                    "EE1B544782238B556744A68B8AB52CD7:PGQPn8LVr8FLUROgBSOsmYcFi/BmNVWoBQ+kAl3uuIw=",
                                    "EEEAD34DAD77926A1A7B3772FED7F0CC:jylPxC+85DXLiAlYK9bpdxMRP/kmq4Exqplkc4u27EE=",
                                    "F0B824739EC4211794DDC5EF2BCAFC9B:LXBvnxBXfdFlqcr8jBqbnblCnh3kvedCvkfJjIi/lEI=",
                                    "FBB56B6E711D7FC3CA29B46F712AA3A5:wtIigakPrMzOC6ZZ4Am7gJa+CNEhe7DPAr1ZOE/WZZ8=",
                                    "FD61445874602D111434BFC323F72EED:fa0mRPNJPo9IM2JDITSlqseFIFccVhbjA/s7FxL+D/0=",
                                    "FE4831E9E7D7012FEE138782AFA1109A:VoS2hBjPp+T+uFx1EfTAuvB6gjlEd2eA8yoh53VsjAA=",
                                    "FEE2FF88D47ACD4788C23A72025AE3CB:cUGhkqZYUbnXJ4uNhMKeuDMmpzO/QqyQJXIW7d1X4mU=",
                                    "52366B48F1048E512A4ADB69B1830522:4/yBC527LoHOBvjPVZZOG3vqIFRZMYJKlKuD1OgYK9Q=",
                                    "9E380D6486FDC2BD798C4AC03EA99956:IG7ZP06IgAnipEmMYxb7jdt7HuXHo5u8zUpomvJYgjM=",
                                ]
                            }
                        }
                    ],
                    cacheExpire: "9999-12-31T23:59:59.999Z"
                },
                "featured-islands": {},
                "community-votes": {},
                "client-events": {
                    states: [{
                        validFrom: "2019-12-31T23:59:59.999Z",
                        activeEvents: [
                            {
                                eventType: "heard0stone78hole65stick178feet", // C2S4-related (Comics)
                                activeUntil: "9999-12-31T23:59:59.999Z",
                                activeSince: "2019-12-31T23:59:59.999Z"
                            },
                            {
                                eventType: "RBFI", // IslandScripting (CH1) related
                                activeUntil: "9999-12-01T21:10:00.000Z",
                                activeSince: "2020-11-21T07:00:00.000Z"
                            },
                            {
                                eventType: `EventFlag.LobbySeason${seasonglobal}`,
                                activeUntil: "9999-12-31T23:59:59.999Z",
                                activeSince: "2021-06-05T14:00:00.000Z"
                            },
                            {
                                eventType: "LCCS02", // S18 Corruption
                                activeUntil: "2023-10-18T07:00:00.000Z",
                                activeSince: "2022-10-10T06:00:00.000Z"
                            },
                            {   eventType: "LCCS01", // S18 Corruption?
                                activeUntil: "2023-10-18T07:00:00.000Z",
                                activeSince: "2022-10-10T06:00:00.000Z"
                            },
                            {
                                eventType: "WL0", //water level 0(season 13)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "2015-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "WSL0", //Snow Level(season 11)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "WSL1", //Snow Level(season 11)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "WSL2", //Snow Level(season 11)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "WSL3", //Snow Level(season 11)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "2015-09-14T07:00:00.000Z"
                            },
                            /*{      
                                eventType: "SM1",//scorch marks 13.40
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "2015-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "TC1",//thorhammer 'poi' 13.40
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "2015-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "TR1",//unhides the rift in the sky in season13(13.40)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "2015-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "WL1", //water level 1(season 13)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "WL2", //water level 2(season 13)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "WL3", //water level 3(season 13)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "WL4", //water level 4(season 13)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "WL5", //water level 5(season 13)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "WL6", //water level 6(season 13)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "WL7", //water level 7(season 13)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "RLS0", //Rift Landmark Sphere 0(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "RLS1", //Rift Landmark Sphere 1(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "RLS2", //Rift Landmark Sphere 2(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "RLS3", //Rift Landmark Sphere 3(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "SL_01", //Stark Lab - SL_01(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "SL_02", //Stark Lab - SL_02(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "HSS0", //Hightower Sphere Stage 0(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "HSS1", //Hightower Sphere Stage 1(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "HSS2", //Hightower Sphere Stage 2(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "HSS3", //Hightower Sphere Stage 3(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "HC_01", //Hellicarrier - Bus Mod(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "HC_02", //Hellicarrier - Mod Stage1(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "SH01", //Stark Hangar(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "SH02", //Stark Hangar(Ch2S4 related)
                                activeUntil: "9999-09-14T07:00:00.000Z",
                                activeSince: "9999-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "BVJ01", //Make Galactus visable in the skybox(Ch2S4 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-14T07:00:00.000Z"
                            },
                            {
                                eventType: "WPICK02", //Wombat Complete Portal(Ch2S5 Portal related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CPICK02", //Cherry Plum Tiramisu Complete Portal(Ch2S5 Portal related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "FPICK02", //French Fry Complete Portal(Ch2S5 Portal related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "TPICK02", //Typhoon Complete Portal(Ch2S5 Portal related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "NPICK02", //Nightmare Complete Portal(Ch2S5 Portal related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "KPICK02", //Kepler Complete Portal(Ch2S5 Portal related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "SKPICK02", //Skirmish Complete Portal(Ch2S5 Portal related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "SFPICK02", //SmallFry Complete Portal(Ch2S5 Portal related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "RPFS1", //Dino Egg Cracking(Ch2S6 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "FTF01", //Fortified POI: Misty Meadows(Ch2S6 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "FTF02", //Fortified POI: Sweaty Sands(Ch2S6 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "FTF03", //Fortified POI: Retail Row(Ch2S6 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "ADP07", //16.50 Foreshadowing Abductions(Ch2S6 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CC01", //Crop Circle 01(Ch2S6 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CC02", //Crop Circle 02(Ch2S6 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CC03", //Crop Circle 03(Ch2S6 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "WLCM1", //Welcome Party full-swing(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "WLCM2", //Welcome Party is over(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "STL01", //Holly Settlement House 1(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "STL02", //Holly Settlement House 2(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "STL03", //Holly Settlement House 3(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "AVOC1", //Egg spawn 1(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "AVOC3", //Egg spawn 3(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "GRAN01", //Mural Stage 1(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "GRAN02", //Mural Stage 2(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "SWRMDUP", //Slurpy Warm Up Event: Beam Turning On(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "SDOPN", //Slurpy Warm Up Event: Doors Opening(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "SMVE", //Mothership Move To: Slurpy(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "ABDSLP", //Slurpy: Abduction(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CWRMDUP", //Coral Warm Up Event: Beam Turning On(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CDOPN", //Coral Warm Up Event: Doors Opening(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "ABDCRL", //Coral: Abduction(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "FMVE", //Mothership Move To: Farm(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "ABDFRM", //Farm: Abduction(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "FDS", //Farm Default State(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "FWRMDUP", //Farm Warm Up Event: Beam Turning On(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "FDOPN", //Farm Warm Up Event: Doors Opening(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "BPAQ", //Bomb Parts Assembling(Ch2S7 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CCSP01", //Cube Corruption Spread Paused(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "LCCS01", //Lobby Corruption Spread 1(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "LCCS02", //Lobby Corruption Spread 2(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "LCCSP01", //Lobby Corruption Spread Paused(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CTCS01", //Cube Town Corruption Spread(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "GCFP01", //Golden Cube Final Placement(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "GCMFP01", //Golden Cube Move Final Placement(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CSAWS01", //Crash Site 1 AwakenedState(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CSAWS02", //Crash Site 2 AwakenedState(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CSAWS03", //Crash Site 3 AwakenedState(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CSAWS04", //Crash Site 4 AwakenedState(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CSAWS05", //Crash Site 5 AwakenedState(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "GCA01", //Golden Cube Awaken 1(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "GCA02", //Golden Cube Awaken 2(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "GCA03", //Golden Cube Awaken 3(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "GCA04", //Golden Cube Awaken 4(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "GCA05", //Golden Cube Awaken 5(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CT01", //Cube Town Phase 1(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CT02", //Cube Town Phase 2(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "CT03", //Cube Town Phase 3(Ch2S8 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "2021_SM01", //Snow Stage 01(Ch3S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "2021_SM02", //Snow Stage 02(Ch3S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "2021_SM03", //Snow Stage 03(Ch3S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "2021_SM04", //Snow Stage 04(Ch3S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "2021_SM05", //Snow Stage 05(Ch3S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "2021_SM06", //Snow Stage 06(Ch3S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "2021_SM07", //Snow Stage 07(Ch3S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "2021_SM08", //Snow Stage 08(Ch3S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "2021_SM09", //Snow Stage 09(Ch3S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "AS01", //Armadillo Start(Ch3S2 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "AL02", //Armadillo Lobby Leadup(Ch3S2 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "AL01", //Armadillo In-Game Leadup(Ch3S2 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "ARLU01", //ArmadilloRoll Lead Up(Ch3S2 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "FNBD05", //Fortnite Birthday Map Changes(Ch3S4 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "S22_Vortex_Active", //S22 Nanomist Vortex(Ch3S4 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "S22_Vortex_Active", //S22 Nanomist Vortex(Ch3S4 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "RR01", //Radish Root(Ch3S4 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "DataLayerTest0", //DataLayerTest0(Ch4S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "DataLayerTest1", //DataLayerTest1(Ch4S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "DataLayerTest2", //DataLayerTest2(Ch4S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "NYE_Loader", //New Years Eve Loader(Ch4S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "NYE", //New Years Eve Event 2022(Ch4S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "RGCONSTUCTION02", //Rift Gate Construction Stage 2(Ch4S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "RG01", //RiftGate_Stage_01(Ch4S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "RG02", //RiftGate_Stage_02(Ch4S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "ST01", //ST_Stage_01(Ch4S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "ST02", //ST_Stage_02(Ch4S1 related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "MLQ24", 
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "9999-09-09T07:00:00.000Z"
                            },
                            {
                                eventType: "EventFlag.LTE_Festivus", // Fetivus Event(Ch1S7 Related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-10-29T00:00:00.000Z"
                            },
                            {
                                eventType: "EventFlag.BR_S5_Cube_TurnOn", // Cube Lightning(Ch1S5 Related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-10-29T00:00:00.000Z"
                            },
                            {
                                eventType: "EventFlag.BR_S5_Cube_Rune1", // Cube Rune 1(Ch1S5 Related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-10-29T00:00:00.000Z"
                            },
                            {
                                eventType: "EventFlag.BR_S6_Island_MoveTo1", // Cube Move to Rune 1(Ch1S6 Related)
                                activeUntil: "2023-11-00T07:00:00.000Z",
                                activeSince: "2020-10-29T00:00:00.000Z"
                            },
                            {
                                eventType: "EventFlag.BR_S6_Island_Drain", //IslandRune1(Ch1S6 Related)
                                activeUntil: "9999-09-09T07:00:00.000Z",
                                activeSince: "2020-10-29T00:00:00.000Z"
                            },*/ //having this many event flags active at once causes other ones to break.
                        ],
                        state: {
                            activeStorefronts: [],
                            eventNamedWeights: {},
                            activeEvents: [],
                            seasonNumber: seasonglobal,
                            seasonTemplateId: `AthenaSeason:athenaseason${seasonglobal}`,
                            matchXpBonusPoints: 0,
                            eventPunchCardTemplateId: "",
                            seasonBegin: "2021-06-05T14:00:00Z",
                            seasonEnd: "9999-12-31T23:59:59.999Z",
                            seasonDisplayedEnd: "2021-09-30T04:00:00Z",
                            dailyStoreEnd: "9999-12-31T23:59:59.999Z",
                            weeklyStoreEnd: "9999-12-31T23:59:59.999Z",
                            sectionStoreEnds: {},
                            rmtPromotion: "melody"
                        }
                    }],
                    cacheExpire: new Date(new Date().getTime() + 1000).toISOString() //refresh every second(might be a bit over kill)
                }
            },
            cacheIntervalMins: 0.1,
            currentTime: new Date().toISOString()
        }

        if(season == 7.30){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "F0", // Marshmello Event countdown (idk if this works, havent tried it)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "FEST_POSTER", // Marshmello event posters
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },                
            )
        }           

        if(season == 8.51){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "EventFlag.UnvaultingCountdown", // Unvaulting Event countdown (idk if this works, havent tried it)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "GWS1", // Unvaulting Event countdown (idk if this works, havent tried it)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },                
            )
        }   

        if(season == 9.40 || season == 9.41){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "CDTime", // Final Showdown countdown (idk if this works, havent tried it)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "CVD1", // Final Showdown countdown (idk if this works, havent tried it)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                }              
            )
        }   
        
        if(season == 10.40){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "NN1", // The End Countdown
                    activeUntil: "9999-10-05T00:41:00.000Z",
                    activeSince: "2020-10-05T00:00:00.000Z"
                },
                {  
                    eventType: "survey_br_nick_001", // nightnight blackhole lobby mini event
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "9999-09-14T07:00:00.000Z"
                }                
            )
        }   
        
        if(season == 11.30 || season == 11.31){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "GALCD", // Star Wars event Countdown
                    activeUntil: "9999-10-05T00:41:00.000Z",
                    activeSince: "2020-10-05T00:00:00.000Z"
                },
                {
                    eventType: "Gal_Crashes", // Starwars spaceship crashes (season 11)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2015-09-14T07:00:00.000Z"
                },
                {
                    eventType: "EventFlag.LTE_WinterFest", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                },
                {
                    eventType: "EventFlag.Winterfest.Tree", // C2S1-related (Winterfest 2019)
                    activeUntil: "9999-12-31T23:59:59.999Z",
                    activeSince: "2019-12-31T23:59:59.999Z"
                }           
            )
        }   
        
        if(season == 12.41){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "JCD01", // Travis Related (Countdown)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "JH01", // Travis Related (Head)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "JS01", // Travis Related (Stage Delivery Trucks)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "JS02", // Travis Related (Stage Partially Built)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "9999-11-21T07:00:00.000Z"
                },
                {
                    eventType: "JS03", // Travis Related (Stage Finished Stage)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "JCH01", // Travis Related (Countdown)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "JP01", // Travis Teaser posters Appear (Stage)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "JL1", // Travis LeadUp 2 (Stage)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "JL2", // Travis LeadUp 2 (Stage)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "JLL", // Travis Load level (Level)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                }                
            )
        }           

        if(season == 12.61){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "FLA01", // C2S2-related (Timers)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "FLCD01", // C2S2-related (Timers)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },  
                {
                    eventType: "FCD01", // C2S2-related (Timers)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                }                          
            )
        }          

        if(season == 14.60){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "FLA01", // C2S4-related (Timers)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "FSE01", // C2S4-related (Timers)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "FSE02", // C2S4-related (Timers)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "JSE02", // C2S4-related (Timers)
                    activeUntil: "9999-12-01T21:10:00.000Z",
                    activeSince: "2020-11-21T07:00:00.000Z"
                },
                {
                    eventType: "JFE01", // C2S4-related (Countdown)
                    activeUntil: "9999-12-02T09:00:00.000Z",
                    activeSince: "2020-12-01T21:16:00.000Z"
                }
            )
        }        

        if(season == 17.30){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "BEL01", // Rift Tour-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z", // #1 2021-08-06T22:05:00.000Z // #2 2021-08-07T18:05:00.000Z // #3 2021-08-08T04:05:00.000Z // #4 2021-08-08T14:05:00.000Z // #5 2021-08-08T22:05:00.000Z
                    activeSince: "2021-07-27T06:00:00.000Z" // #1 2021-07-27T06:00:00.000Z // #2 2021-08-06T23:15:00.000Z // #3 2021-08-07T19:15:00.000Z // #4 2021-08-08T05:15:00.000Z // #5 2021-08-08T15:15:00.000Z
                },
                {
                    eventType: "BET01", // Rift Tour-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z", // #1 2021-08-06T22:05:00.000Z // #2 2021-08-07T18:05:00.000Z // #3 2021-08-08T04:05:00.000Z // #4 2021-08-08T14:05:00.000Z // #5 2021-08-08T22:05:00.000Z
                    activeSince: "2021-07-27T06:00:00.000Z" // #1 2021-07-27T06:00:00.000Z // #2 2021-08-06T23:15:00.000Z // #3 2021-08-07T19:15:00.000Z // #4 2021-08-08T05:15:00.000Z // #5 2021-08-08T15:15:00.000Z
                },
                {
                    eventType: "BEL02", // Rift Tour-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z", // #1 2021-08-06T22:05:00.000Z // #2 2021-08-07T18:05:00.000Z // #3 2021-08-08T04:05:00.000Z // #4 2021-08-08T14:05:00.000Z // #5 2021-08-08T22:05:00.000Z
                    activeSince: "2021-07-27T06:00:00.000Z" // #1 2021-07-27T06:00:00.000Z // #2 2021-08-06T23:15:00.000Z // #3 2021-08-07T19:15:00.000Z // #4 2021-08-08T05:15:00.000Z // #5 2021-08-08T15:15:00.000Z
                },
                {
                    eventType: "BEP02", // Rift Tour-related (Buffet Enable Pads?)
                    activeUntil: "2021-09-14T07:00:00.000Z", 
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "BPLS", // Rift Tour-related (Buffet Party Landingship)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "BTP", // Rift Tour-related (Buffet Teaser Poster)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "BAP", // Rift Tour-related (Buffet Announce Poster)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "BTL01", // Rift Tour-related (Buffet TOD Leadup 1)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                }
            )
        }

        if(season == 17.50){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "KEL01", // Operation Sky Fire Event-related
                    activeUntil: "9999-09-09T07:00:00.000Z",
                    activeSince: "2023-10-29T00:00:00.000Z"
                },
                {
                    eventType: "KEL02", // Operation Sky Fire Event-related
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                }
            )
        }

        if(season == 18.40){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "GGL01", // Chapter 2 Finale Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "GGL02", // Chapter 2 Finale Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                }
            )
        }

        if(season == 20.40){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "AL01", // Collision Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "AL02", // Collision Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                }
            )
        }

        if(season == 22.40){
            timeline.channels['client-events']['states'][0]['activeEvents'].push(
                {
                    eventType: "RL01", // Fracture Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RL02", // Fracture Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RL12", // Fracture Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RL13", // Fracture Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RL14", // Fracture Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RL15", // Fracture Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "RL16", // Fracture Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                }
            )
        }

        if(season == 23.10){
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "CalendarEvent_Season23_Winterfest", // Winterfest 2022
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                },
                {
                    eventType: "EventFlag.LTE_WinterFestTab", // Winterfest 2022
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2021-07-27T06:00:00.000Z"
                }            
            )
        }        

        if(season == 27.11){
            timeline.channels["client-events"]["states"][0]["activeEvents"].push(
                {
                    eventType: "DL01", // Durian Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                },
                {
                    eventType: "DL02", // Durian Event-related (Countdown)
                    activeUntil: "9999-09-14T07:00:00.000Z",
                    activeSince: "2020-09-09T07:00:00.000Z"
                }           
            )
        }

        if(seasonglobal == 7 || seasonglobal == 11 || seasonglobal == 15 || seasonglobal == 19){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "TopSecret", //Holiday Bus (S7/S11/S15/S19)
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2015-09-14T07:00:00.000Z"
            })
        }

        if(seasonglobal == 14 || seasonglobal == 18 || seasonglobal == 22){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "EventFlag.HalloweenBattleBus", //Halloween Bus (S14/S18/S22)
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2015-09-14T07:00:00.000Z"
            })
        }

        if(config.RufusWeek2 == true){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "RufusWeek2", // Rufus Week 2(Chapter 4 Season OG)
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            },)
        }
        if(config.RufusWeek3 == true){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "RufusWeek3", // Rufus Week 3(Chapter 4 Season OG)
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            },)
        }
        if(config.RufusWeek4 == true){
            timeline.channels['client-events']['states'][0]['activeEvents'].push({
                eventType: "RufusWeek4", // Rufus Week 4(Chapter 4 Season OG)
                activeUntil: "9999-09-14T07:00:00.000Z",
                activeSince: "2000-09-14T07:00:00.000Z"
            },)
        }
        res.json(timeline)
    })
}
