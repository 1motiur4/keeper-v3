import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Note(props) {
    function handleDeleteClick() {
        props.onDelete(props.id);
    }

    function handleEditClick() {
        props.onEdit(props.id);
    }

    return (
        <div className="note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick={handleDeleteClick}>
                <DeleteIcon />
            </button>
            <button onClick={handleEditClick}>
                Edit
            </button>
        </div>
    )
}

export default Note;