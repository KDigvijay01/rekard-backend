const express= require('express')
const router = require('express').Router();

const hostelsController = require('./index');
// const hostelsValidator = require('./validator')
const bodyParser=require('body-parser');

const {entry_in,entry_out,checkForIn,checkForOut,info}= require('./index');
router.use(bodyParser.urlencoded({extended: true}))
router.use(express.json())

router.post('/in',async (req, res) => {
    const data = req.body;
    const check=await checkForIn(data);
    // console.log("check..",check);
    
    if(check.data.length===0){
        const intotheReg=await entry_in(data)
        console.log("into the register...");
        res.send(intotheReg)
    } else {
        res.send("already in ...")
    }
});


router.post('/out',async (req, res) => {
    const data = req.body;
    const check=await checkForOut(data);
    
    if(check.data.length!==0){
        const date=new Date();
        const now=date.toISOString().split('T')[0] + ' '+ date.toTimeString().split(' ')[0];
        const outOf=await entry_out(now,data)
        console.log("out to the register...");
        res.send(outOf);
    } else {
        res.send("already out...")
    }
});

router.get('/info',async (req, res)=>{
    const roll_no= req.query.roll_no;
    const l1=req.query.l1;
    const l2=req.query.l2;
    console.log("this is l1",l1,l2)
    const fullInfo=await info(roll_no,l1,l2);
    console.log("showing full info");
    res.send(fullInfo)
});





module.exports = router;