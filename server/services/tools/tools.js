"use strict";


const BeatMaker = require('../../models/BeatMaker');
const TabGenerator = require('../../models/TabGenerator');

const EarTraining = require('../../models/EarTraining');
const User=require("../../models/User");
const mongoose = require("mongoose");
const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
exports.createBeat=async(request, response)=>{
    new BeatMaker(
       request.body
    )
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
exports.getBeatByUser=async(request, response)=>{
  BeatMaker.find({user:request.params.userId})
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
}
exports.createEarTraining=async(request, response)=>{
    new EarTraining(
       request.body
    )
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
}
exports.addEarTrainingToUser=async(request, response)=>{
  User.findByIdAndUpdate(request.params.userId,{$push:{earTraining:request.params.earTrainingId}})
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
}
exports.updateEarTrainingScoreForUser=async(request, response)=>{
  User.findByIdAndUpdate(request.params.userId,{
    $set:{"earTraining.$[elem].score":request.body.score},
  },{arrayFilters:[{"elem.exercice":request.body.exerciceId}]})
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
}
exports.createTab=async(name,photo)=>{
return await tabGenerator.create({name:name,photo:photo}).save()
}
exports.getTab=async(name)=>{
return await tabGenerator.find({name:name})
}
exports.scrapeTabs=async(request, response)=>{
//trim the name and make it lowercase
let name=request.body.name.trim().toLowerCase()

  //if tab exists return tabs else create tabs
  let tab=await TabGenerator.findOne({name:name})
  if(tab){
    response.json({
      success: true,
      content: tab,
    });
  }else {

 

  const SUBMIT_SELECTOR = 'body > div > header > div > div.gtd-header__right > form > button';
  const TABS_URL = 'https://www.guitaretab.com/';
  const INPUT_SELECTOR="body > div > header > div > div.gtd-header__right > form"
  if (request.body !== undefined) {
    (() => {
      puppeteer.launch({ headless: true })
      .then(async (browser) => {

        let page = await browser.newPage()
        page.setViewport({ width: 1366, height: 768 });
        await page.goto(TABS_URL, { waitUntil: 'domcontentloaded' })
        await page.click(INPUT_SELECTOR)
        await page.keyboard.type(name);
        await page.click(SUBMIT_SELECTOR);
       // await  page.waitForNavigation()

              try{
                await page.waitForSelector('.gt-link--primary')
                const selectors = (await page.$$('.gt-link--primary')) || "";
               
                  await selectors[0].click()                  
                  const element = await page.waitForSelector('.gt-tab-content'); 
                  await element.screenshot({path: `uploads/${name.replace(/\s+/g, '-')}.png`});

                  let tab= await new TabGenerator({name:name,photo:`uploads/${name.replace(/\s+/g, '-')}.png`}).save()
                  response.json({
                    success: true,
                    content: tab,
                  });
                
              }catch(err){
                response.json({
                  success: false,
                });
              }

           

              
       
      })

    })()

  }
  }
}
