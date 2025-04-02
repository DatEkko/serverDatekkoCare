import { where } from 'sequelize';
import db from './../models/index';

const getAllCodeProjectService = async () => {
    try {
        let data = await db.Allcode.findAll({
            where: {
                type: "PROJECT"
            }
        });
        if (data && data.length > 0) {
            return {
                EC: 0,
                EM: "Get allcode success",
                DT: data
            }
        }

        return {
            EC: 1,
            EM: "No data",
            DT: []
        }

    } catch (e) {
        console.log(e);
        return {
            EC: -2,
            EM: "Có gì đó sai sai"
        }
    }
}

const getAllCodeProductService = async () => {
    try {
        let data = await db.Allcode.findAll({
            where: {
                type: "PRODUCT"
            }
        });
        if (data && data.length > 0) {
            return {
                EC: 0,
                EM: "Get allcode success",
                DT: data
            }
        }

        return {
            EC: 1,
            EM: "No data",
            DT: []
        }

    } catch (e) {
        console.log(e);
        return {
            EC: -2,
            EM: "Có gì đó sai sai"
        }
    }
}

const getAllCodeConditionService = async () => {
    try {
        let data = await db.Allcode.findAll({
            where: {
                type: "CONDITION"
            }
        });
        if (data && data.length > 0) {
            return {
                EC: 0,
                EM: "Get allcode success",
                DT: data
            }
        }

        return {
            EC: 1,
            EM: "No data",
            DT: []
        }

    } catch (e) {
        console.log(e);
        return {
            EC: -2,
            EM: "Có gì đó sai sai"
        }
    }
}

module.exports = {
    getAllCodeProjectService, getAllCodeProductService,
    getAllCodeConditionService
}