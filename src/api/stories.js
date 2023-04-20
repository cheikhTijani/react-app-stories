import axios from "axios";
// baseURL: 'http://localhost:3001'

export default axios.create({
    baseURL: `https://stories-rest-api.onrender.com`
});