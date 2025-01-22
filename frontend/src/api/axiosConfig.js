import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // Replace with your API's base URL
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Automatically include cookies in requests
});


api.interceptors.response.use(
    response => response,
    async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem('id');
            localStorage.removeItem('role');
            alert("Session Expired\nPlease Login Again!")
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;