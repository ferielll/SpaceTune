"use strict";

const Comment = require('../../models/comment');




exports.createComment=async(request , response)=>{
    new Comment(request.body)
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
};

exports.updateComment = async (request , response) => {
    try {
        await Comment.findByIdAndUpdate(
            {_id: request.params.commentId},
            request.body
        );
        response.send({ success: true });
    } catch (error) {
        response.json({ success: false, message: error});
    }
};

exports.getAllComments = async (request , response) => {
    try 
    {
        let comments = await Comment.find()
        response.send(comments)
    } catch(error) {
        response.json({success: false , message: error});
    }
}

exports.deleteComment = async (request , response) => {
    try {
        await Comment.findOneAndDelete({_id:request.params.commentId})
        response.send({success:true,message: "comment deleted successfuly"})
    }
    catch(error) {
        response.json({success:false , message: error});
    }
}

exports.getCommentById = async (request,response) => {
    try {
        let comment = await Comment.findById(request.params.commentId)
        response.status(200).json(comment)
    } catch(error){
        response.status(500).json(error);
    }
}

exports.getCommentByPostId = async (request,response) => {
    try {
        let comment = await Comment.find({post:request.params.postId}).populate('postowner')
        console.log(comment)
        response.status(200).json(comment)
    } catch(error){
        response.status(500).json(error);
    }
}

exports.getCommentByUserId = async (request , response) => {
    try {
        let comment = await Comment.findOne({user:request.params.userId})
        response.status(200).json(comment)
    } catch(error) {
        response.status(500).json(error);
    }
}
