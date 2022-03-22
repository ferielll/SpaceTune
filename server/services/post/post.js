'use strict';


const Post = require('../../models/Post');
const mongoose = require("mongoose");

exports.createPost=async(request, response)=>{
    new Post({
        _id: new mongoose.Types.ObjectId(),
        subject: request.body.subject,
        username: request.body.username,
        content: request.body.content,
        user: request.body.user,
        title: request.body.title,
        Image: request.file.path
    })
    .save()
    .then(doc => {
      if (doc) {
        response.json({
          success: true,
          content:doc
        });
      } else {
        response.json({
          success: false,
        });
      }
    })
    .catch(error => {
      response.json(error);
    });
}

exports.updatePost =async (request,response)=>{
    // try{
    //     await Post.findOneAndUpdate({_id:request.params.postId},request.body)
    //     response.send({success:true})

    // }catch(error){
    //     response.json({success:false,message:error});

    // }

    try {
        const post = await Post.findById(request.params.postId);
        if (post.user.equals(request.body.user)) {
            console.log("feriel");
          try {
            const updatedPost = await Post.findByIdAndUpdate(
                request.params.postId,
              {
                $set: request.body,
              },
              { new: true }
            );
            console.log(updatedPost);
            response.status(200).json(updatedPost);
          } catch (err) {
            response.status(500).json(err);
          }
        } else {
            response.status(401).json("You can update only your post!");
        }
      } catch (err) {
        response.status(500).json(err);
      }
}

exports.getAllPosts =async (request,response)=>{
    try
    {
        let posts=await Post.find()
        response.send(posts)
    }catch(error){
        response.json({success:false,message:error});

    }
}

exports.deletePost=async (request,response)=>{
    // try{
    //     await Post.findOneAndDelete({_id:request.params.postId})
    //     response.send({success:true,message:"post delete succesfully"})
    // }
    // catch(error){
    //     response.json({success:false,message:error});

    // }
    try {
        const post = await Post.findById(request.params.postId);
        if (post.user.equals(request.body.user)) {
            console.log("feriel");
          try {
            await post.delete();
            response.status(200).json("Post has been deleted...");
          } catch (err) {
            response.status(500).json(err);
          }
        } else {
            response.status(401).json("You can delete only your post!");
        }
      } catch (err) {
        response.status(500).json(err);
      }
}

exports.getPostsByUserId= async (request,response)=>{
    try{
        let post=await Post.findOne({user:request.params.userId})
        response.send(post)
    }catch(error){
        response.json({success:false,message:error});

    }
}
