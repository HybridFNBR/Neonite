const path = require('path');
const crypto = require("crypto");
const fs = require('fs');
const hotfixPath = path.join(__dirname, '../../hotfixes/');
const { getVersionInfo } = require("../../config/defs")

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

	config: function (req, res) {
		return res.status(204).end()
	},

	hotfixFiles: function (req, res) {
		res.setHeader("content-type", "application/octet-stream");
		const { version, versionGlobal } = getVersionInfo(req);
		const filePath = path.join(__dirname, '../../hotfixes/', req.params.fileName);
		let fileContent = fs.readFileSync(filePath, 'utf-8')	
		switch (req.params.fileName) {
			case 'DefaultEngine.ini':
				if (version === "32.11" || version === "35.20" || version === "37.51" || version === "38.11") {
					fileContent = fileContent.replace(
						';Fort.Event.bForceOffLoadingScreen=1',
						'Fort.Event.bForceOffLoadingScreen=1'
					);
				}
			break;
			case 'DefaultRuntimeOptions.ini':
				if (version === "26.20") {
					fileContent = fileContent.replace(
						';+ExperimentalBucketPercentList=(ExperimentNum=27,Name="ShowMultiProductItemShop",BucketPercents=(100,0,0),WinningBucketIndex=-1)',
						'+ExperimentalBucketPercentList=(ExperimentNum=27,Name="ShowMultiProductItemShop",BucketPercents=(100,0,0),WinningBucketIndex=-1)'
					);
				}
				else if (version === "17.30") {
					fileContent = fileContent.replace(
						'bEnableSocialTab=false',
						'bEnableSocialTab=true'
					);
				}
			case 'DefaultGame.ini':
				if (versionGlobal >= 20) {
					fileContent = fileContent.replace(
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
					"8.50": [
						"+FrontEndPlaylistData=(PlaylistName=Playlist_Music_Med, PlaylistAccess=(bEnabled=false, CategoryIndex=1, DisplayPriority=-999))",
						"+FrontEndPlaylistData=(PlaylistName=Playlist_Music_Med, PlaylistAccess=(bEnabled=true, CategoryIndex=1, DisplayPriority=-999))"
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
					fileContent = fileContent.replace(defaultvalue, replacedValue);
				}
			break;
		}
		
		res.send(fileContent);
	},


	user: async function (req, res) {
		const accountId = req.params.accountId;
		const {versionGlobal} = getVersionInfo(req);
		const cloudStoragePath = path.join(__dirname, `../../profile/${accountId}/cloudstorage/S${versionGlobal}`);
		if (!fs.existsSync(cloudStoragePath)) {
			fs.mkdirSync(cloudStoragePath, { recursive: true });
		}

		const output = [];

		try {
			const files = fs.readdirSync(cloudStoragePath);

			for (const fileName of files) {
				const filePath = path.join(cloudStoragePath, fileName);
				const fileData = fs.readFileSync(filePath);
				const stats = fs.statSync(filePath);

				output.push({
					"uniqueFilename": fileName,
					"filename": fileName,
					"hash": crypto.createHash("sha1").update(fileData).digest("hex"),
					"hash256": crypto.createHash("sha256").update(fileData).digest("hex"),
					"length": fileData.length,
					"contentType": "application/octet-stream",
					"uploaded": stats.mtime,
					"storageType": "S3",
					"doNotCache": false
				});
			}
		} catch (err) {
		}

		return res.json(output);
	},

	userFile: async function (req, res) {
		const {versionGlobal} = getVersionInfo(req);
		const accountId = req.params.accountId;
		const fileName = req.params.fileName;
		const filePath = path.join(__dirname, `../../profile/${accountId}/cloudstorage/S${versionGlobal}/${fileName}`);

		if (!fs.existsSync(filePath)) {
			const errors = require('../../structs/errors');
			return res.status(404).json(errors.create(
				errors.defs.cloudstorage.file_not_found,
				fileName,
				accountId
			));
		}

		const fileData = fs.readFileSync(filePath);
		res.setHeader("content-type", "application/octet-stream");
		res.status(200).send(fileData);
	},

	userPutFile: function (req, res) {
		const {versionGlobal} = getVersionInfo(req);
		const accountId = req.params.accountId;
		const fileName = req.params.fileName;
		const cloudStoragePath = path.join(__dirname, `../../profile/${accountId}/cloudstorage/S${versionGlobal}`);
		const filePath = path.join(cloudStoragePath, fileName);
		if (!fs.existsSync(cloudStoragePath)) {
			fs.mkdirSync(cloudStoragePath, { recursive: true });
		}

		try {
			const fileData = req.rawBody;

			if (!fileData || fileData.length === 0) {
				throw new Error('No file data received');
			}

			fs.writeFileSync(filePath, fileData);
			return res.status(204).end();

		} catch (err) {
			return res.status(500).json({ error: 'Upload failed' });
		}
	},
};