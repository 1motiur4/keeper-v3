import axios from "axios";
import qs from 'qs';

const notesURL = "http://localhost:5000/notes/";

export const fetchNotes = () => {
    return axios.get(notesURL);

}

export const addNote = (newNote) => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    const data = qs.stringify({
        title: newNote.title,
        content: newNote.content
    });
    return axios.post(notesURL,
        data, headers
    )
}

export const deleteNote = (id) => {
    return axios.delete(notesURL, { params: { id: id } })
}

export const fetchNote = (id) => {
    return axios.get(notesURL + id)
}

export const editNote = (id, updatedNote) => {
    const data = qs.stringify(updatedNote);
    return axios.put(notesURL + id, data)
}