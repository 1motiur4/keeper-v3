import React from 'react';

function Modal(props) {
    return (
        <div class="modalBackground">
            <div class="modalContainer">
                <form className="edit-note">
                    <input value="Test title"></input>
                    <textarea>Test content</textarea>
                    <button>Save</button>
                    <button>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default Modal;