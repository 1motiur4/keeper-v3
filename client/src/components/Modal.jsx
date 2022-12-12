import React, { useState } from 'react';

function Modal(props) {
    const [modalChanges, setModalChanges] = useState({
        id: props.id,
        title: props.title,
        content: props.content
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setModalChanges(prevNote => {
            return {
                ...prevNote,
                [name]: value
            }
        })
    }

    function handleSaveClick(event) {
        props.onSave(props.id);
        event.preventDefault();
    }

    function handleCancelClick() {
        props.onCancel();
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <form className="edit-note">
                    <input onChange={handleChange} defaultValue={props.title}></input>
                    <textarea onChange={handleChange} defaultValue={props.content}></textarea>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default Modal;