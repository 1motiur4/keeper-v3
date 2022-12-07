import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
    //hook for creating note
    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setNote(prevNote => {
            return {
                ...prevNote,
                [name]: value
            }
        })
    }

    //hook for expanding box
    const [isExpanded, setExpanded] = useState(false);

    function expand() {
        setExpanded(true);
    }

    function submitNote(event) {
        props.onAdd(note);
        setNote({
            title: "",
            content: ""
        });
        event.preventDefault();
    }

    return (
        <div>
            <form className="create-note">

                {isExpanded ? (
                    <input
                        name="title"
                        onChange={handleChange}
                        value={note.title}
                        placeholder="Title" />
                ) : null}
                <textarea name="content" onChange={handleChange} onClick={expand} value={note.content} placeholder="Write something cool" rows={isExpanded ? 3 : 1} />
                <Zoom in={isExpanded}>
                    <Fab onClick={submitNote}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    )
}

export default CreateArea;