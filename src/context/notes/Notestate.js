import React, { useState } from 'react';
import NoteContext from './noteContext';

//it will provide all state of note
const NoteState = (props)=>{

    // const host = "http://localhost:5000"; 
    const host = "https://inotebook-zie0.onrender.com"; 

    const notesInitial = []

    const [notes,setNotes] = useState(notesInitial);

    // Get all notes
    const getNotes = async ()=>{
      // API CALL
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        },
      });
      const json = await response.json();
      // console.log(json);
      setNotes(json);
    }

    // Add a note
    const addNote = async (title,description,tag)=>{
      // API CALL
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}), 
      });
      const note = await response.json();
      setNotes(notes.concat(note)); //concat return an array while push updates an array
      // console.log("Adding a new note");
    }
    
    // Delete a note
    const deleteNote = async (id)=>{
      // API CALL
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        },
      });
      // eslint-disable-next-line
      const json = await response.json();
      // console.log(json);
      // console.log("Deleting node with id "+id);

      const newNotes = notes.filter((note)=>{return note._id!==id});
      setNotes(newNotes);
    }
    
    // Edit a note
    const editNote = async (id,title,description,tag)=>{
      // API CALL
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });
      // eslint-disable-next-line
      const json = await response.json();
      // console.log(json);

      let newNotes = JSON.parse(JSON.stringify(notes));
      //Logic to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id === id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    }
    
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;