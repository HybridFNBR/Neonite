const path = require('path');
const crypto = require("crypto");
const fs = require('fs');
const hotfixPath = path.join(__dirname, '../../hotfixes/');
const {getVersionInfo} = require("../../config/defs")

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
		const {version, versionGlobal} = getVersionInfo(req);
		res.setHeader("content-type", "application/octet-stream")
		let DefaultGame = fs.readFileSync(path.join(__dirname, '../../hotfixes/DefaultGame.ini'), 'utf-8');
		if (versionGlobal >= 20) {
			DefaultGame = DefaultGame.replace(
				";+CurveTable=/TacticalSprintGame/DataTables/TacticalSprintGameData;RowUpdate;Default.TacticalSprint.Sprint.Energy.CostPerSecond;0.0;0.0",
				"+CurveTable=/TacticalSprintGame/DataTables/TacticalSprintGameData;RowUpdate;Default.TacticalSprint.Sprint.Energy.CostPerSecond;0.0;0.0"
			);
		}
		const replacements = {
			"7.30": [
			  "+FrontEndPlaylistData=(PlaylistName=Playlist_Music_Low, PlaylistAccess=(bEnabled=false, CategoryIndex=1, DisplayPriority=-999))",
			  "+FrontEndPlaylistData=(PlaylistName=Playlist_Music_Low, PlaylistAccess=(bEnabled=true, CategoryIndex=1, DisplayPriority=-999))"
			],
			"7.40": [
				"+FrontEndPlaylistData=(PlaylistName=Playlist_Music_High, PlaylistAccess=(bEnabled=false, CategoryIndex=1, DisplayPriority=-999))",
				"+FrontEndPlaylistData=(PlaylistName=Playlist_Music_High, PlaylistAccess=(bEnabled=true, CategoryIndex=1, DisplayPriority=-999))"
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
			"14.60": [
			  "+FrontEndPlaylistData=(PlaylistName=Playlist_Junior_32, PlaylistAccess=(bEnabled=false, CategoryIndex=1, DisplayPriority=-999))",
			  "+FrontEndPlaylistData=(PlaylistName=Playlist_Junior_32, PlaylistAccess=(bEnabled=true, CategoryIndex=1, DisplayPriority=-999))"
			],
        };
		  
        if (replacements[version]) {
            const [defaultvalue, replacedValue] = replacements[version];
            DefaultGame = DefaultGame.replace(defaultvalue, replacedValue);
		}
		res.send(DefaultGame)
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
		const {version} = getVersionInfo(req);
		let DefaultRuntimeOptions = fs.readFileSync(path.join(__dirname, '../../hotfixes/DefaultRuntimeOptions.ini'), 'utf-8');
		if (version == 26.20) {
			DefaultRuntimeOptions = DefaultRuntimeOptions.replace(
				';+ExperimentalBucketPercentList=(ExperimentNum=27,Name="ShowMultiProductItemShop",BucketPercents=(100,0,0),WinningBucketIndex=-1)',
				'+ExperimentalBucketPercentList=(ExperimentNum=27,Name="ShowMultiProductItemShop",BucketPercents=(100,0,0),WinningBucketIndex=-1)'
			);
		}
		res.send(DefaultRuntimeOptions)
	},

	defaultInput: function(req, res){
		res.setHeader("content-type", "application/octet-stream")
		const InputPath = path.join('hotfixes/DefaultInput.ini');
		const fileStream = require('fs').createReadStream(InputPath);
		fileStream.pipe(res)
	},

	user: function (req, res) {
		return res.json([])
	},

	userFile: function async(req, res, next) {
		res.status(200).send()
	},

	userPutFile:function (req, res, next) {
		res.status(200).send()
	},
};