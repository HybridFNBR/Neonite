const path = require('path');
const crypto = require("crypto");
const fs = require('fs');



const hotfixPath = path.join(__dirname, '../hotfixes/');

module.exports = (app) => {
	/*
	 * Dynamic Cloudstorage Implementation: @VastBlastt
	 */
	app.get('/fortnite/api/cloudstorage/system', async (req, res) => {

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
	});

	app.get('/fortnite/api/cloudstorage/system/DefaultGame.ini', (req, res) => {
		season = req.headers["user-agent"].split('-')[1]
		res.setHeader("content-type", "application/octet-stream")
		let index = fs.readFileSync(path.join(__dirname, '../hotfixes/DefaultGame.ini'), 'utf-8');

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
		});

	app.get('/fortnite/api/cloudstorage/system/:filename', (req, res) => {
		const fileName = req.params.filename;
		const filePath = hotfixPath + fileName;

		if (fs.existsSync(filePath)) {
			res.sendFile(filePath);
			return;
		} else {
			res.status(404).end();
			return;
		}
	});

	app.get('/fortnite/api/cloudstorage/user/:accountId', (req, res) => {
		res.json([]);
	});
	app.get('/fortnite/api/cloudstorage/user/:accountId/:fileName', (req, res) => {
		res.status(204).send();
	});
	app.put('/fortnite/api/cloudstorage/user/:accountId/:fileName', (req, res) => {
		res.status(204).send();
	});
}