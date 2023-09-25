import axios from "../utils/axios";

export const callLogin = (body) => {
    return axios.post(`/api/user/login`, body);
}
export const callLogout = () => {
    return axios.get(`/api/user/logout`);
}
export const callFetchAccount = () => {
    return axios.get(`/api/user/current`);
}
export const callRefreshToken = () => {
    return axios.get(`/api/user/refreshtoken`);
}
export const callUpdateAccount = (body) => {
    return axios.put(`/api/user`, body);
}
export const callAllUser = () => {
    return axios.put(`/api/chat`);
}
