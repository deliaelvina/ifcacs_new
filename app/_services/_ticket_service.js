import axios from "axios";
import { configConstants } from "../_constants";

export const ticketService = {
    getDebtor
};

const { urlApi, headers } = configConstants;
const api = `${urlApi}/c_ticket_entry`;

async function getDebtor(param) {

    const data = {
        entity: param.entity,
        project: param.project,
        email: param.email
    };
    return await axios
        .post(`${api}/getDebtor/${param.cons}`, data, {
            headers
        })
        .then(res => {
            return res.data;
        });
}
