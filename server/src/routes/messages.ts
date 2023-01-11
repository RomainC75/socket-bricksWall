var express = require('express');
var router = express.Router();

router.get('/',(req,res,next)=>{
    try {
        res.status(200).json({message: "yes"})
    } catch (error) {
        
    }
})

module.exports = router