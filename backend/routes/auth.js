const express = require('express')
const router = express.Router();

router.get('/', (req,res)=>{
    obj={
        a: 'hello',
        number: 4
    }
    res.json(obj);
})

module.exports = router;