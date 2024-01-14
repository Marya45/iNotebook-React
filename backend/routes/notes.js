const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
// const Notes = require('../models/Note');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');


//ROUTE 1: Get all the notes using : GET "/api/notes/getuser" . Login required
router.get('/fetchallnotes',fetchuser ,async (req,res)=>{
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    } catch(error){
        console.error(error.message);
        return res.status(500).send("Internal Server error occured");
    }
})


//ROUTE 2: Add a new note using : POST "/api/notes/addnote" . Login required
router.post('/addnote',fetchuser , [
    body('title','Enter a valid title').isLength({min: 3}),
    body('description','Descriptioin length should be atleast 5').isLength({min: 5}),
    ],async (req,res)=>{

        try {
            const {title,description,tag} = req.body;
            // If there are errors return bad request and the error
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors : errors.array()});
            }
            //creating a new note and saving it
            const note = new Note({
                title,description,tag,user: req.user.id
            })
    
            const savedNote = await note.save();
            res.json(savedNote);
        } catch(error){
            console.error(error.message);
            return res.status(500).send("Internal Server error occured");
        }
})


//ROUTE 3: Update an existing note using : PUT "/api/notes/updatenote" . Login required
router.put('/updatenote/:id',fetchuser ,async (req,res)=>{

    const {title,description,tag} = req.body;
    // Create a new note object
    let newNote = {};
    if(title){
        newNote.title = title;
    }
    if(description){
        newNote.description = description;
    }
    if(tag){
        newNote.tag = tag;
    }

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    // console.log(note);
    if(!note){
        return res.status(404).send("Not found");
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new: true});
    res.json({note});
})



module.exports = router;