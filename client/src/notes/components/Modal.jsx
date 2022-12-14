import React from 'react';

function Modal(props) {
    function handleSaveClick(event) {
        event.preventDefault();
        props.onSave(props.id);
    }

    function handleCancelClick(event) {
        event.preventDefault();
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