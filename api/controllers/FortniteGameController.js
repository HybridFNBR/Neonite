
const { default: axios } = require("axios");
const path = require('path');
var fs = require('fs')
var ini = require('ini')
const contentPages = path.join(__dirname, '../../responses/fortnitegame.json');

function getSeasonInfo(req) {
    const userAgent = req.headers['user-agent'];
    const season = userAgent?.split('-')[1];
    const seasonglobal = season?.split('.')[0];
    return { season, seasonglobal };
  }

module.exports = {
    fortniteGame: async function(req, res){
        const content = (await axios.get('https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game').catch(() => {})).data;
        const { season, seasonglobal } = getSeasonInfo(req);
        var fortnitegame = JSON.parse(fs.readFileSync(contentPages, 'utf8'));
        fortnitegame = Object.assign({}, fortnitegame, { eventscreens: content.eventscreens });
        const backgrounds = fortnitegame.dynamicbackgrounds.backgrounds.backgrounds;
        var config = ini.parse(fs.readFileSync(path.join(__dirname, '../../config.ini'), 'utf-8'));
        if(config.custom_background == true){
            backgrounds[0].stage = "defaultnotris"
            backgrounds[0].backgroundimage = config.image_url
            return res.json(fortnitegame);
        }
        if(config.custom_background == false)
        {
            switch (seasonglobal) {
                case "10":
                    backgrounds[0].stage = "seasonx";
                break;
                case "11":
                    if (season === "11.31" || season === "11.40") {
                        backgrounds[0].stage = "Winter19";
                    } 
                    else {
                        backgrounds[0].stage = "season11";
                    }
                break;
                case "12":
                    backgrounds[0].stage = "season12";
                break;
                case "13":
                    backgrounds[0].stage = "season13";
                break;
                case "14":
                    backgrounds[0].stage = "season14";
                break;
                case "15":
                    backgrounds[0].stage = "season15";
                break;
                case "16":
                    backgrounds[0].stage = "season16";
                break;
                case "17":
                    backgrounds[0].stage = "season17";
                break;
                case "18":
                    backgrounds[0].stage = "season18";
                break;
                case "19":
                    if (season === "19.01") /*if it doesnt work i didnt get chance to test it cause the build has not been uploaded - unrealhybrid*/ {
                        backgrounds[0].stage = "winter2021";
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp19-lobby-xmas-2048x1024-f85d2684b4af.png";
                    } 
                    else {
                        backgrounds[0].stage = "season19";
                    }
                break;
                case "20":
                    if (season === "20.40") {
                        backgrounds[0].stage = "season20";
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp20-40-armadillo-glowup-lobby-2048x2048-2048x2048-3b83b887cc7f.jpg";
                    } 
                    else {
                        backgrounds[0].stage = "season20";
                    }
                break;
                case "21":
                    if (season === "21.30") {
                        backgrounds[0].stage = "season2130";
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/nss-lobbybackground-2048x1024-f74a14565061.jpg";
                    } 
                    else {
                        backgrounds[0].stage = "season2100";
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/s21-lobby-background-2048x1024-2e7112b25dc3.jpg";
                    }
                break;
                case "22":
                    backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp22-lobby-square-2048x2048-2048x2048-e4e90c6e8018.jpg";
                break;
                case "23":
                    if(season === "23.10")
                    {   
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp23-winterfest-lobby-square-2048x2048-2048x2048-277a476e5ca6.png"
                    }
                    else{
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp23-lobby-2048x1024-2048x1024-26f2c1b27f63.png"
                    }
                case "26":
                    if(season === "26.30")
                    {  
                        backgrounds[0].stage = "season2630"
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/s26-lobby-timemachine-final-2560x1440-a3ce0018e3fa.jpg"
                    }
                    else{
                        backgrounds[0].stage = "season2600"
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/0814-ch4s4-lobby-2048x1024-2048x1024-e3c2cf8d342d.png"
                    }
                break;
                case "27":
                    if(season === "27.11"){
                        backgrounds[0].stage = "defaultnotris"
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/durianlobby2-4096x2048-242a51b6a8ee.jpg"
                    }
                    else{
                        backgrounds[0].stage = "season2700"
                    }
                break;
                default:
                    backgrounds[0].backgroundimage = content.dynamicbackgrounds.backgrounds.backgrounds[0].backgroundimage;
                    backgrounds[0].stage = content.dynamicbackgrounds.backgrounds.backgrounds[0].stage;
            }
            return res.json(fortnitegame);
        }
    },

    sparks: async function(req, res){
        const data = (await axios.get('https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game/spark-tracks').catch(() => {})).data;
        res.json(data);
    },

    motd: function(req, res){
        res.status(204)
    }
}