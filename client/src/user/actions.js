import axios from "axios";
import qs from 'qs';

const notesURL = "http://localhost:5000/notes/";

export const createNewUser = (newUser) => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    const data = qs.stringify({
        username: newUser.username,
        password: newUser.password
    });
    return axios.post(notesURL + "register/", data, headers);
}