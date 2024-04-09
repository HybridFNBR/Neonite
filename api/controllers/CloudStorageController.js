const path = require('path');
const crypto = require("crypto");
const fs = require('fs');
const hotfixPath = path.join(__dirname, '../../hotfixes/');

function getSeasonInfo(req) {
	const userAgent = req.headers["user-agent"];
	const season = userAgent.split('-')[1];
	const seasonglobal = season.split('.')[0];
	return { season, seasonglobal };
  }

module.exports = {
    cloudstoragesystem: async function (req, res) {
		const output = [];
		const dir = await fs.promises.opendir(hotfixPath);
		for await (const dirent of dir) {
		  const fileName = dirent.name;
		  const filePath = hotfixPath + fileName;
		  const fileData = fs.readFileSync(filePath);
	
		  output.push({
			"uniqueFilename": fileName,
			"filename": fileName,
			"hash": crypto.createHash("sha1").update(fileData).digest("hex"),
			"hash256": crypto.createHash("sha256").update(fileData).digest("hex"),
			"length": fileData.length,
			"contentType": "text/plain",
			"uploaded": fs.statSync(filePath).mtime,
			"storageType": "S3",
			"doNotCache": false
		  });
		}
	
		res.json(output);

    },

    defaultGame: function(req, res){
		const {seasonglobal, season} = getSeasonInfo(req);
		res.setHeader("content-type", "application/octet-stream")
		let index = fs.readFileSync(path.join(__dirname, '../../hotfixes/DefaultGame.ini'), 'utf-8');
		if (seasonglobal >= 20) {
			index = index.replace(
				";+CurveTable=/TacticalSprintGame/DataTables/TacticalSprintGameData;RowUpdate;Default.TacticalSprint.Sprint.Energy.CostPerSecond;0.0;0.0",
				"+CurveTable=/TacticalSprintGame/DataTables/TacticalSprintGameData;RowUpdate;Default.TacticalSprint.Sprint.Energy.CostPerSecond;0.0;0.0"
			);
		}
		const replacements = {
			"7.30": [
			  "+FrontEndPlaylistData=(PlaylistName=Playlist_Music_Low, PlaylistAccess=(bEnabled=false, CategoryIndex=1, DisplayPriority=-999))",
			  "+FrontEndPlaylistData=(PlaylistName=Playlist_Music_Low, PlaylistAccess=(bEnabled=true, CategoryIndex=1, DisplayPriority=-999))"
			],
			"8.51": [
			  "+FrontEndPlaylistData=(PlaylistName=Playlist_Music_Med, PlaylistAccess=(bEnabled=false, CategoryIndex=1, DisplayPriority=-999))",
			  "+FrontEndPlaylistData=(PlaylistName=Playlist_Music_Med, PlaylistAccess=(bEnabled=true, CategoryIndex=1, DisplayPriority=-999))"
			],
			"9.40": [
			  "+FrontEndPlaylistData=(PlaylistName=Playlist_Music_Higher, PlaylistAccess=(bEnabled=false, CategoryIndex=1, DisplayPriority=-999))",
			  "+FrontEndPlaylistData=(PlaylistName=Playlist_Music_Higher, PlaylistAccess=(bEnabled=true, CategoryIndex=1, DisplayPriority=-999))"
			],
			"9.41": [
				"+FrontEndPlaylistData=(PlaylistName=Playlist_Music_Higher, PlaylistAccess=(bEnabled=false, CategoryIndex=1, DisplayPriority=-999))",
				"+FrontEndPlaylistData=(PlaylistName=Playlist_Music_Higher, PlaylistAccess=(bEnabled=true, CategoryIndex=1, DisplayPriority=-999))"
			],
			"10.40": [
			  "+FrontEndPlaylistData=(PlaylistName=Playlist_Music_Highest, PlaylistAccess=(bEnabled=false, CategoryIndex=1, DisplayPriority=-999))",
			  "+FrontEndPlaylistData=(PlaylistName=Playlist_Music_Highest, PlaylistAccess=(bEnabled=true, CategoryIndex=1, DisplayPriority=-999))"
			],
			"11.30": [
			  "+FrontEndPlaylistData=(PlaylistName=Playlist_Music_Lowest, PlaylistAccess=(bEnabled=false, CategoryIndex=1, DisplayPriority=-999))",
			  "+FrontEndPlaylistData=(PlaylistName=Playlist_Music_Lowest, PlaylistAccess=(bEnabled=true, CategoryIndex=1, DisplayPriority=-999))"
			],
			"12.41": [
			  "+FrontEndPlaylistData=(PlaylistName=Playlist_Music_High, PlaylistAccess=(bEnabled=false, CategoryIndex=1, DisplayPriority=-999))",
			  "+FrontEndPlaylistData=(PlaylistName=Playlist_Music_High, PlaylistAccess=(bEnabled=true, CategoryIndex=1, DisplayPriority=-999))"
			],
			"12.61": [
			  "+FrontEndPlaylistData=(PlaylistName=Playlist_Fritter_64, PlaylistAccess=(bEnabled=false, CategoryIndex=1, DisplayPriority=-999))",
			  "+FrontEndPlaylistData=(PlaylistName=Playlist_Fritter_64, PlaylistAccess=(bEnabled=true, CategoryIndex=1, DisplayPriority=-999))"
			],
        };
		  
        if (replacements[season]) {
            const [defaultvalue, replacedValue] = replacements[season];
            index = index.replace(defaultvalue, replacedValue);
            res.send(index);
        }
        else{
            res.send(index)
        }
    },

	config: function(req, res){
		return res.status(204).end()
	},
	
	defaultEngine: function(req, res){
		res.setHeader("content-type", "application/octet-stream")
		const EnginePath = path.join('hotfixes/DefaultEngine.ini');
		const fileStream = require('fs').createReadStream(EnginePath);
		fileStream.pipe(res)
	},

	defaultRuntimeOptions: function(req, res){
		res.setHeader("content-type", "application/octet-stream")
		const RuntimeOptionsPath = path.join('hotfixes/DefaultRuntimeOptions.ini');
		const fileStream = require('fs').createReadStream(RuntimeOptionsPath);
		fileStream.pipe(res)
	},

	defaultInput: function(req, res){
		res.setHeader("content-type", "application/octet-stream")
		const InputPath = path.join('hotfixes/DefaultInput.ini');
		const fileStream = require('fs').createReadStream(InputPath);
		fileStream.pipe(res)
	},

	user: function (req, res) {
		const {seasonglobal} = getSeasonInfo(req);
		return res.json({
			"uniqueFilename": "ClientSettings.Sav",
			"filename": "ClientSettings.Sav",
			"hash": crypto.createHash("sha1").update(fs.readFileSync(path.join(__dirname, `../../ClientSettings/s${seasonglobal}/ClientSettings.sav`))).digest("hex"),
			"hash256": crypto.createHash("sha256").update(fs.readFileSync(path.join(__dirname, `../../ClientSettings/s${seasonglobal}/ClientSettings.sav`))).digest("hex"),
			"length": path.join(__dirname, `../../ClientSettings/s${seasonglobal}/ClientSettings.sav`).length,
			"contentType": "text/plain",
			"uploaded": fs.statSync(path.join(__dirname, `../../ClientSettings/s${seasonglobal}/ClientSettings.sav`)).mtime,
			"storageType": "S3",
			"doNotCache": false
		})
	},

	userFile: function (req, res, next) {
		const {seasonglobal} = getSeasonInfo(req);
		const ReadClientSettings = fs.readFileSync(path.join(__dirname, `../../ClientSettings/s${seasonglobal}/ClientSettings.sav`));
		const timestamp = Date.now();
		res.send(ReadClientSettings + `?v=${timestamp}`
		//dont ask why or how, this just fixes a crashing issue when client settings arnt indexed properly when they dont exist on first launch.
	)},

	userPutFile:function (req, res, next) {
	},
};