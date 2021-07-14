import axios from "axios";
import { configConstants } from "../_constants";

export const overtimeService = {
    getUsage,
    getLot,
    getOver,
    getRate
};

const { urlApi, headers } = configConstants;
const api = `${urlApi}/c_overtime`;

async function getUsage(data) {
    return await axios
        .post(`${api}/getUsage/IFCAPB`, data, {
            headers
        })
        .then(res => {
            return res.data;
        });
}

async function getLot(param) {
    const data = {
        entity_cd: param.entity_cd,
        project_no: param.project_no,
        email : param.email
    };

    return await axios
        .post(`${api}/zoom_lot_no/${param.cons}`, data, {
            headers
        })
        .then(res => {
            return res.data;
        });
}

async function getOver(param) {
    const data = {
        entity_cd: param.entity_cd,
        project_no: param.project_no,
    };

    return await axios
        .post(`${api}/zoom_over/${param.cons}`, data, {
            headers
        })
        .then(res => {
            return res.data;
        });
}


async function getRate(param) {

    return await axios
        .post(`${api}/zoom_rate/${param.cons}`, param, {
            headers
        })
        .then(res => {
            return res.data;
        });
}

