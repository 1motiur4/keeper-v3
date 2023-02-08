import axios from "axios";
import qs from 'qs';

const notesURL = "http://localhost:5000/notes/";
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};

export const createNewUser = (newUser) => {
    const data = qs.stringify({
        username: newUser.username,
        password: newUser.password
    });
    return axios.post(notesURL + "register/", data, headers);
}

export const loginUser = (user) => {
    const data = qs.stringify({
        username: user.username,
        password: user.password
    });
    return axios.post(notesURL + "login/", data, headers);
}