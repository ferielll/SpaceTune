const router = require("express").Router();
const { Song } = require("../../models/Song");
const { PlayList } = require("../../models/Playlist");
const auth = require("../Tracks/auth");

router.get("/",  async (req, res) => {
	const search = req.query.search;
	if (search !== "") {
		const songs = await Song.find({
			name: { $regex: search, $options: "i" },
		}).limit(10);
		const playlists = await PlayList.find({
			name: { $regex: search, $options: "i" },
		}).limit(10);
		const result = { songs, playlists };
		res.status(200).send(result);
	} else {
		res.status(200).send({});
	}
});

module.exports = router;