"user strict";

const  { Song, validate } = require('../../models/Song');
const User = require('../../models/User');

exports.createSong=async(request , response) => {
    new Song(request.body)
    .save()
    .then((doc) => {
        if(doc) {
            response.json({
                success: true,
                content: doc,
            });
        } else {
            response.json({
                success: false,
            });
        }
    })
    .catch((error) => {
        response.json(error);
    });
}

exports.getAllSongs=async(req,res)=> {
    const songs = await Song.find();
	res.status(200).send({ data: songs });
}

exports.updateSong=async(request,response) => {
    try {
        await Song.findByIdAndUpdate(
            {_id: request.params.songId},
            request.body
        );
        response.send({ success: true });
    } catch (error) {
        response.json({ success: false, message: error});
    }
}

exports.deleteSong=async(request,response)=>{
    try {
        await Song.findOneAndDelete({_id:request.params.songId})
        response.send({success:true,message: "song deleted successfuly"})
    }
    catch(error) {
        response.json({success:false , message: error});
    }
}

exports.likeSong=async(req , res)=>{
    let resMessage = "";
	const song = await Song.findById(req.params.id);
	if (!song) return res.status(400).send({ message: "song does not exist" });

	const user = await User.findById(req.user._id);
	const index = user.likedSongs.indexOf(song._id);
	if (index === -1) {
		user.likedSongs.push(song._id);
		resMessage = "Added to your liked songs";
	} else {
		user.likedSongs.splice(index, 1);
		resMessage = "Removed from your liked songs";
	}

	await user.save();
	res.status(200).send({ message: resMessage });
}

exports.getLikedSongs=async(req , res)=>{
    const user = await User.findById(req.user._id);
	const songs = await Song.find({ _id: user.likedSongs });
	res.status(200).send({ data: songs });
}