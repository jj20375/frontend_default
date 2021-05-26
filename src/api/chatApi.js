import axios from "../config/httpConfig";
import { apiConfig } from "../../env";


export const SendMessageApi = (data) => {
    return axios.post(`${apiConfig}/channel/message`, data);
}