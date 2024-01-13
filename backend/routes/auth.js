const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Kingisagoodb$oy'

// Creating a user using : POST "/api/auth/createuser" . No login required
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min: 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password length should be atleast 5').isLength({min: 5}),
    ] ,async (req,res)=>{
// If there are errors return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()});
    }
    try {
        // Check whether user with this email exists already
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({error: "A user with this email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        //Create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });

        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET);
        res.json({authtoken});

    } catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

module.exports = router;