import React, { useState } from 'react';
import NoteContext from './noteContext';

//it will provide all state of note
const NoteState = (props)=>{
    const s1 = {
        "name" : "Rohan",
        "class" : "5d"
    }
    const [state,setState] = useState(s1);
    const update = ()=>{
        setTimeout(() => {
            setState({
                "name" : "King",
                "class" : "10d"
            });
        }, 1000);
    }
    return(
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;