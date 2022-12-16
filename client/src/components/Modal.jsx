import React from 'react';

function Modal(props) {
    function handleSaveClick(event) {
        props.onSave(props.id);

        // If the execution of the previous line fails, this line won't execute
        // I generally preventDefault before executing anything else unless there is a need for that 
        // (which is really specific and not your case here)
        event.preventDefault();
    }

    function handleCancelClick() {
        // No prevent default here ??
        props.onCancel();
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <form className="edit-note">
                    <input name="title" onChange={props.onChange} defaultValue={props.title}></input>
                    <textarea name="content" onChange={props.onChange} defaultValue={props.content}></textarea>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default Modal;