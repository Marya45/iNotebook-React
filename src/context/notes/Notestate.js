import React, { useState } from 'react';
import NoteContext from './noteContext';

//it will provide all state of note
const NoteState = (props)=>{
    
    return(
        <NoteContext.Provider value={{}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;