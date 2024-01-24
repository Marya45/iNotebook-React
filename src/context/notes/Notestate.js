import React, { useState } from 'react';
import NoteContext from './noteContext';

//it will provide all state of note
const NoteState = (props)=>{

    const host = "http://localhost:5000"; 

    const notesInitial = []

    const [notes,setNotes] = useState(notesInitial);

    // Get all notes
    const getNotes = async ()=>{
      // API CALL
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTJjZWRiZWEwYWUyYzY3ZjZkM2M5ZSIsImlhdCI6MTcwNjA5ODkwOCwiZXhwIjoxNzA2MTA2MTA4fQ.Noov5CYEV9yu9XF6YH4Keah439cnjYtHX05qBk9UFCE"
        },
      });
      const json = await response.json();
      console.log(json);
      setNotes(json);
    }

    // Add a note
    const addNote = async (title,description,tag)=>{
      // API CALL
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTJjZWRiZWEwYWUyYzY3ZjZkM2M5ZSIsImlhdCI6MTcwNjA5ODkwOCwiZXhwIjoxNzA2MTA2MTA4fQ.Noov5CYEV9yu9XF6YH4Keah439cnjYtHX05qBk9UFCE"
        },
        body: JSON.stringify({title,description,tag}), 
      });
      // const json = await response.json();

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
    const deleteNote = async (id)=>{
      // API CALL
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTJjZWRiZWEwYWUyYzY3ZjZkM2M5ZSIsImlhdCI6MTcwNjA5ODkwOCwiZXhwIjoxNzA2MTA2MTA4fQ.Noov5CYEV9yu9XF6YH4Keah439cnjYtHX05qBk9UFCE"
        },
      });
      const json = await response.json();
      console.log("Deleting node with id "+id);

      const newNotes = notes.filter((note)=>{return note._id!==id});
      setNotes(newNotes);
    }
    
    // Edit a note
    const editNote = async (id,title,description,tag)=>{
      // API CALL
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTJjZWRiZWEwYWUyYzY3ZjZkM2M5ZSIsImlhdCI6MTcwNjA5ODkwOCwiZXhwIjoxNzA2MTA2MTA4fQ.Noov5CYEV9yu9XF6YH4Keah439cnjYtHX05qBk9UFCE"
        },
        body: JSON.stringify({title,description,tag}), 
      });
      const json = await response.json();


      //Logic to edit in client
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id === id){
          element.title = title;
          element.description = description;
          element.tag = tag;
        }
      }
    }
    
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;