'use strict';

const Post = require('../../models/Post');
exports.createPost=async (request, response)=>{
    new Post(request.body)
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
    try{
        await Post.findOneAndUpdate({_id:request.params.postId},request.body)
        response.send({success:true})

    }catch(error){
        response.json({success:false,message:error});

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
    try{
        await Post.findOneAndDelete({_id:request.params.postId})
        response.send({success:true,message:"post delete succesfully"})
    }
    catch(error){
        response.json({success:false,message:error});

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
