"use strict";


const Post = require('../../models/Post');
const mongoose = require("mongoose");

let responseObj = {
  "status": "",
  "msg": "",
  "body": {

  }
}

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
    .then((doc) => {
      if (doc) {
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
};

exports.updatePost =async (request,response)=>{
    try{
        await Post.findOneAndUpdate({_id:request.params.postId},request.body)
        response.send({success:true})

    }catch(error){
        response.json({success:false,message:error});

    }

    // try {
    //     const post = await Post.findById(request.params.postId);
    //     if (post.user.equals(request.body.user)) {
    //         console.log("feriel");
    //       try {
    //         const updatedPost = await Post.findByIdAndUpdate(
    //             request.params.postId,
    //           {
    //             $set: request.body,
    //           },
    //           { new: true }
    //         );
    //         console.log(updatedPost);
    //         response.status(200).json(updatedPost);
    //       } catch (err) {
    //         response.status(500).json(err);
    //       }
    //     } else {
    //         response.status(401).json("You can update only your post!");
    //     }
    //   } catch (err) {
    //     response.status(500).json(err);
    //   }
}

exports.getAllPosts =async (request,response)=>{
  const username = request.query.user;
    try
    {
      let posts
      if (username)
      {
        posts = await Post.find({ username });
      } else {
        posts = await Post.find();
      }
        // let posts=await Post.find()
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

    // try {
    //     const post = await Post.findById(request.params.postId);
    //     if (post.user.equals(request.body.user)) {
    //         console.log("feriel");
    //       try {
    //         await post.delete();
    //         response.status(200).json("Post has been deleted...");
    //       } catch (err) {
    //         response.status(500).json(err);
    //       }
    //     } else {
    //         response.status(401).json("You can delete only your post!");
    //     }
    //   } catch (err) {
    //     response.status(500).json(err);
    //   }
}

exports.getPostsByUserId= async (request,response)=>{
    try{
        let post=await Post.findOne({user:request.params.userId})
        response.send(post)
    }catch(error){
        response.json({success:false,message:error});

    }
}

// router.get("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

exports.getPostById= async (request,response)=>{
  try{
      let post=await Post.findById(request.params.postId)
      response.status(200).json(post)
  }catch(error){
      response.status(500).json(error);
  }
}

exports.search = async (request,response)=>{
  try {
    if(!request.body) {
      responseObj = {
        "status": "error",
        "msg": "Input is missing",
        "body": {}
      }
      response.status(500).send(responseObj);
    } else {
      Post.find({title:{$regex:`^${request.body.search.text.trim()}`, $options: 'i'}}, (err , docs) => {
        if(err) {
          responseObj = {
              "status": "error",
              "msg": "Input is missing.",
              "body": {}
          }
          response.status(500).send(responseObj);
      }else{
          responseObj = {
              "status": "success",
              "msg": "record found.",
              "body": docs
          }
          response.status(200).send(responseObj);
        }
      })
    }

    }catch(error) {
      console.log('Error::',error);
    }
  }

  exports.pagination = async (request,response) => {
    try {
      if(!request.body) {
        responseObj = {
          "status": "error",
          "msg": "Input is missing",
          "body": {}
        }
        response.status(500).send(responseObj);
      } else {
        //pagination
        //page number
        //no of records

        const currentPage = request.body.currentPage;
        const pageSize = request.body.pageSize;

        const skip = pageSize * (currentPage-1);
        const limit = pageSize;

        Post.find({}).skip(skip).limit(limit).exec((err,docs) => {
          if(err) {
            responseObj = {
                "status": "error",
                "msg": "Input is missing.",
                "body": {}
            }
            response.status(500).send(responseObj);
        }else{
            responseObj = {
                "status": "success",
                "msg": "record found.",
                "body": docs
            }
            response.status(200).send(responseObj);
          }
        })
        
      }
  
      }catch(error) {
        console.log('Error::',error);
      }
  }

  exports.sortDesc = async (request , response) => {
    try
    {
        Post.find({}).sort({created_date: -1}).exec((err , docs) => {
          if(err) {
            responseObj = {
                "status": "error",
                "msg": "Error occured.",
                "body": err
            }
            response.status(500).send(responseObj);
        }else{
            responseObj = {
                "status": "success",
                "msg": "Fetch record",
                "body": docs
            }
            response.status(200).send(responseObj);
        }
        })
    }catch(error){
        response.json({success:false,message:error});

    }
  }

  exports.sortAsc = async (request , response) => {
    try
    {
        Post.find({}).sort({created_date: 1}).exec((err , docs) => {
          if(err) {
            responseObj = {
                "status": "error",
                "msg": "Error occured.",
                "body": err
            }
            response.status(500).send(responseObj);
        }else{
            responseObj = {
                "status": "success",
                "msg": "Fetch record",
                "body": docs
            }
            response.status(200).send(responseObj);
        }
        })
    }catch(error){
        response.json({success:false,message:error});

    }
  }

