"use strict";


const Item = require('../../models/Item');
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
exports.createItem=async(request, response)=>{
 
    new Item({
        _id: new mongoose.Types.ObjectId(),
        name: request.body.name,
        type: request.body.type,
        isUsed: request.body.isUsed,
        user: request.body.user,
        description: request.body.description,
        price: request.body.price,
        photos : request.file.path,
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

exports.updateItem =async (request,response)=>{
    // try{
    //     await Item.findOneAndUpdate({_id:request.params.itemId},request.body)
    //     response.send({success:true})

    // }catch(error){
    //     response.json({success:false,message:error});

    // }

    try {
        
       
          try {
            const updatedItem = await Item.findByIdAndUpdate(
                request.params.itemId,
              {
                $set: request.body,
              },
              { new: true }
            );
            console.log(updatedItem);
            response.status(200).json(updatedItem);
          } catch (err) {
            response.status(500).json(err);
          }
         
      } catch (err) {
        response.status(500).json(err);
      }
}

exports.getAllItems =async (request,response)=>{
    try
    {
        let items=await Item.find()
        response.send(items)
    }catch(error){
        response.json({success:false,message:error});

    }
}

exports.getUsedItems =async (request,response)=>{
    try
    {
        let items=await Item.find({isUsed:true})
        response.send(items)
    }catch(error){
        response.json({success:false,message:error});

    }
}
exports.getNewItems =async (request,response)=>{
    try
    {
        let items=await Item.find({isUsed:false})
        response.send(items)
    }catch(error){
        response.json({success:false,message:error});

    }
}

exports.deleteItem=async (request,response)=>{
    // try{
    //     await Item.findOneAndDelete({_id:request.params.itemId})
    //     response.send({success:true,message:"item delete succesfully"})
    // }
    // catch(error){
    //     response.json({success:false,message:error});

    // }
    try {
        
          try {
            await Item.findOneAndDelete({_id:request.params.itemId});
            response.status(200).json("Item has been deleted...");
          } catch (err) {
            response.status(500).json(err);
          }
        
      } catch (err) {
        response.status(500).json(err);
      }
}

exports.getItemsByUserId= async (request,response)=>{
    try{
        let item=await Item.findOne({user:request.params.userId})
        response.send(item)
    }catch(error){
        response.json({success:false,message:error});

    }
}

exports.getItemById= async (request,response)=>{
  try{
      let item=await Item.findById(request.params.Id)
      response.send(item)
  }catch(error){
      response.json({success:false,message:error});

  }
}


exports.scrapeItems=async(request, res)=>{
  
    try {
        const response = await axios.get('https://www.gear4music.com/search/?str_search_phrase='+request.body.name);
 
        const html = response.data;
 
        const $ = cheerio.load(html);
 
        const items = [];
 
  $('#main > div > section > ul > li').each((_idx, el) => {
            const item = $(el)
            const title = item.find(' a > div > div > h3').text()
            const price = item.find(' div > span > span.c-val').text()
            const url = item.find(' a').attr('href')
            const image = item.find(' a > span > img').attr('src')
            items.push({title:title,price:price,url:url,image:image})
        });
          
         res.send(items);
    } catch (error) {
        throw error;
    }
    
 };
 
 