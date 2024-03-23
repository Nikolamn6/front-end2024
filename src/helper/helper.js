import axios from 'axios';
// import jwt_decode from 'jwt-decode';
import { jwtDecode } from "jwt-decode";

// axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwtDecode(token)
    return decode;
}

export async function authenticate(username){
    try {
        return await axios.post('http://localhost:8080/api/authenticate', { username })
    } catch (error) {
        return { error : "Username doesn't exist...!"}
    }
}

export async function getUser({ username }){
    try {
        const { data } = await axios.get(`http://localhost:8080/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error : "Password doesn't Match...!"}
    }
}

export async function registerUser(credentials){
    try {
        // const { data : { msg }, status } = await axios.post(`http://localhost:8080/api/register`, credentials);
        const response = await axios.post(`http://localhost:8080/api/register`, credentials);

        let { username, email } = credentials;

        if(response.status === 201){
            await axios.post('http://localhost:8080/api/registerMail', { username, userEmail : email, text : response.data.msg})
        }

        return Promise.resolve(response.data.msg);
    } catch (error) {
        return Promise.reject({ error });
    }
}

export async function verifyPassword({ username, password }){
    // try {
    //     if(username){
    //         const { data } = await axios.post('http://localhost:8080/api/login', { username, password });
    //         return Promise.resolve({ data });
    //     }
    // } catch (error) {
    //     return Promise.reject({ error : "Password doesn't Match...!"})
    // }

    try {
        if (username) {
            const { data } = await axios.post('http://localhost:8080/api/login', { username, password });

            localStorage.setItem("userInfo", JSON.stringify(data));

            return Promise.resolve({ data });
        }
    } catch (error) {
        console.error('Error in verifyPassword:', error);

        if (error.response) {
            console.error('Server responded with:', error.response.data);
        }

        return Promise.reject({ error: "Password doesn't Match...!" });
    }
}

export async function updateUser(response){
    try {
        
        const token = await localStorage.getItem('token');
        const data = await axios.put('http://localhost:8080/api/updateuser', response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Profile...!"})
    }
}

export async function generateOTP(username){
    try {
        const {data : { code }, status } = await axios.get('http://localhost:8080/api/generateOTP', { params : { username }});

        if(status === 201){
            let { data : { email }} = await getUser({ username });
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('http://localhost:8080/api/registerMail', { username, userEmail: email, text, subject : "Password Recovery OTP"})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}

export async function verifyOTP({ username, code }){
    try {
       const { data, status } = await axios.get('http://localhost:8080/api/verifyOTP', { params : { username, code }})
       return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function resetPassword({ username, password }){
    try {
        const { data, status } = await axios.put('http://localhost:8080/api/resetPassword', { username, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}

export async function addBlog(credentials){
    try {
        const response = await axios.post("http://localhost:8080/api/postBlog", credentials, { headers: { "Content-Type": "multipart/form-data"}});

        return Promise.resolve(response.data.msg);
    } catch (error) {
        return Promise.reject({ error });
    }
}

export async function addGallery(credentials){
    try {
        const response = await axios.post("http://localhost:8080/api/postGallery", credentials, { headers: { "Content-Type": "multipart/form-data"}});

        return Promise.resolve(response.data.msg);
    } catch (error) {
        return Promise.reject({ error });
    }
}