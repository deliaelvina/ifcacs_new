import axios from "axios";
import { configConstants } from "../_constants";

export const contactService = {
    getEmergency
};

const { urlApi, headers } = configConstants;
const api = `${urlApi}/c_contact`;

async function getEmergency(param) {
    return await axios
        .get(`${api}/getDataEmergency/${param.cons}`, {
            headers
        })
        .then(res => {
            return res.data;
        });
}
