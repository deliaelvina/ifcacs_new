import axios from "axios";
import { configConstants } from "../_constants";

export const dashboardService = {
    getInvoice
};

const { urlApi, headers } = configConstants;
const api = `${urlApi}/c_dashboard`;

async function getInvoice(param) {
    return await axios
        .get(`${api}/getInvoice/${param.cons}/${param.email}`, {
            headers
        })
        .then(res => {
            return res.data;
        });
}
