const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Kingisagoodb$oy';

//ROUTE 1: Creating a user using : POST "/api/auth/createuser" . No login required
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min: 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password length should be atleast 5').isLength({min: 5}),
    ] ,async (req,res)=>{

    let success = false;

    // If there are errors return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success,errors : errors.array()});
    }
    try {
        // Check whether user with this email exists already
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({success,error: "A user with this email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        //Create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });

        // const data = {
        //     user:{
        //         id: user._id
        //     }
        // }
        // const authtoken = jwt.sign(data,JWT_SECRET);
        const authtoken = jwt.sign({
            id: user._id
          }, JWT_SECRET, { expiresIn: '2h' });
        success=true;
        res.json({success,authtoken});

    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server error occured");
    }
})


//ROUTE 2: Authenticate a user using : POST "/api/auth/login" . No login required
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),
    ] ,async (req,res)=>{

    let success = false;
    
    // If there are errors return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()});
    }

    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            success=false;
            return res.status(400).json({success,error: "Please enter valid credentials"});
        }
        
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success=false;
            return res.status(400).json({success,error: "Please enter valid credentials"});
        } 

        // const data = {
        //     user:{
        //         id: user._id
        //     }
        // }
        // const authtoken = jwt.sign(data,JWT_SECRET);
        const authtoken = jwt.sign({
            id: user._id
          }, JWT_SECRET, { expiresIn: '2h' });
        success=true;
        res.json({success,authtoken});

    } catch(error){
        console.error(error.message);
        return res.status(500).send("Internal Server error occured");
    }

})


//ROUTE 3: Get loggedin user details using : POST "/api/auth/getuser" . Login required
router.post('/getuser',fetchuser,async (req,res)=>{
    try {   
        const userId = req.user.id;
        // console.log(userId);
        const user = await User.findById(userId).select("-password");
        res.json({user});
    } catch(error){
        console.error(error.message);
        return res.status(500).send("Internal Server error occured");
    }
})



module.exports = router;