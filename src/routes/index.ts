const express= require('express');
const router = express()
const Note =require('../models/note')
router.get('/', async(req,res)=>{
    const notes = await Note.find().sort({ date: "desc" }).lean();
    res.render('index',{notes});
})

router.get('/abouts',(req,res)=>{
    res.render('abouts');
})
module.exports=router;