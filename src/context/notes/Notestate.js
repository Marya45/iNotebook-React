import React, { useState } from 'react';
import NoteContext from './noteContext';

//it will provide all state of note
const NoteState = (props)=>{

    const notesInitial = [
        {
          "_id": "65a389f209d7bb50e7e4dd94",
          "user": "65a2cedbea0ae2c67f6d3c9e",
          "title": "My title",
          "description": "This is a description",
          "tag": "Personal",
          "date": "2024-01-14T07:14:58.330Z",
          "__v": 0
        },
        {
          "_id": "65a90d09cfe28c379fc178d4",
          "user": "65a2cedbea0ae2c67f6d3c9e",
          "title": "My title 2",
          "description": "This is a description 2",
          "tag": "tag",
          "date": "2024-01-18T11:35:37.248Z",
          "__v": 0
        },
        {
          "_id": "65a389f209d7bb50e7e4dd941",
          "user": "65a2cedbea0ae2c67f6d3c9e",
          "title": "My title",
          "description": "This is a description",
          "tag": "Personal",
          "date": "2024-01-14T07:14:58.330Z",
          "__v": 0
        },
        {
          "_id": "65a90d09cfe28c379fc178d42",
          "user": "65a2cedbea0ae2c67f6d3c9e",
          "title": "My title 2",
          "description": "This is a description 2",
          "tag": "tag",
          "date": "2024-01-18T11:35:37.248Z",
          "__v": 0
        },
        {
          "_id": "65a389f209d7bb50e7e4dd943",
          "user": "65a2cedbea0ae2c67f6d3c9e",
          "title": "My title",
          "description": "This is a description",
          "tag": "Personal",
          "date": "2024-01-14T07:14:58.330Z",
          "__v": 0
        },
        {
          "_id": "65a90d09cfe28c379fc178d44",
          "user": "65a2cedbea0ae2c67f6d3c9e",
          "title": "My title 2",
          "description": "This is a description 2",
          "tag": "tag",
          "date": "2024-01-18T11:35:37.248Z",
          "__v": 0
        }
      ]

    const [notes,setNotes] = useState(notesInitial);

    // Add a note
    const addNote = (title,description,tag)=>{
      console.log("Adding a new note");
      const note = {
        "_id": "65a90d09cfe28c379fc178d445",
        "user": "65a2cedbea0ae2c67f6d3c9e",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2024-01-18T11:35:37.248Z",
        "__v": 0
      }

      setNotes(notes.concat(note)); //concat return an array while push updates an array

    }
    
    // Delete a note
    const deleteNote = (id)=>{
      console.log("Deleting node with id "+id);

      const newNotes = notes.filter((note)=>{return note._id!==id});
      setNotes(newNotes);
    }
    
    // Edit a note
    const editNote = ()=>{

    }
    
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;