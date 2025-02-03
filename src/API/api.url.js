export const baseURL = "http://localhost:5000/"
const api = {
    register: {
        url: '/api/user/register',
        method: 'post',
    },
    login: {
        url: '/api/user/login',
        method: 'post',
    },
}
export default api;