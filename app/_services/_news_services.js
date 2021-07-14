import axios from "axios";
import { configConstants } from "../_constants";

export const newsService = {
    getDatanews,
    getDatanewsById
};

const { urlApi, headers } = configConstants;
const api = `${urlApi}/c_newsandpromo`;

async function getDatanews(param) {
    return await axios
        .get(
            `${api}/getDatanews/${param.cons}/${param.product_cd}/${param.isHome}`,
            {
                headers
            }
        )
        .then(res => {
            return res.data;
        });
}

async function getDatanewsById(param) {
    return await axios
        .get(`${api}/getDatabyID/${param.cons}/${param.id}`, {
            headers
        })
        .then(res => {
            return res.data;
        });
}
