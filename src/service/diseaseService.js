import { where } from 'sequelize';
import db from '../models/index';

const getArticleWithPaginateService = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.Disease.findAndCountAll({
            order: [['id', 'DESC']],
            offset: offset,
            limit: limit,
            include: [{
                model: db.Allcode,
                attributes: ['key_code', 'value'] // Chỉ lấy cột cần thiết
            }]
        })

        let totalPages = Math.ceil(count / limit);

        let data = {
            totalRows: count,
            totalPages: totalPages,
            article: rows
        }

        return {
            EC: 0,
            EM: "Lấy data thành công",
            DT: data
        }

    } catch (e) {
        console.log(e);
        return {
            EC: -2,
            EM: "Có gì đó sai sai"
        }
    }
}

const getAllDiseaseArticleService = async () => {
    try {
        let data = await db.Disease.findAll({
            include: [{
                model: db.Allcode,
                attributes: ['key_code', 'value'] // Chỉ lấy cột cần thiết
            }]
        });

        if (data && data.length > 0) {
            return {
                EC: 0,
                EM: "Get all disease article success",
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

const createNewDiseaseArticleService = async (data) => {
    try {
        if (!data.name || !data.content || !data.author) {
            return {
                EC: -2,
                EM: "Thiếu dữ liệu đầu vào",
                DT: []
            }
        }

        await db.Disease.create({
            name: data.name,
            description: data.content,
            cre: data.author,
            image: data.image,
            type_project: data.type_project
        });

        return {
            EC: 0,
            EM: "Tạo mới thành công",
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

const handleDeleteDiseaseArticleService = async (id) => {
    try {
        if (!id) {
            return {
                EC: -2,
                EM: "Thiếu dữ liệu đầu vào",
                DT: []
            }
        }

        await db.Disease.destroy({
            where: {
                id: id
            }
        });

        return {
            EC: 0,
            EM: "Xóa thành công",
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

const handleUpdateDiseaseArticleService = async (data) => {
    try {
        if (!data.name || !data.description || !data.cre) {
            return {
                EC: -2,
                EM: "Thiếu dữ liệu đầu vào",
                DT: []
            }
        }

        await db.Disease.update(data, {
            where: {
                id: data.id
            }
        });

        return {
            EC: 0,
            EM: "Cập nhật thành công",
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

const getKoiProjectService = async () => {
    try {
        let data = await db.Disease.findAll({
            where: {
                type_project: 3
            }
        });

        if (data && data.length > 0) {
            return {
                EC: 0,
                EM: "Get KOI project success",
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

const getMaintainProjectService = async () => {
    try {
        let data = await db.Disease.findAll({
            where: {
                type_project: 2
            }
        });

        if (data && data.length > 0) {
            return {
                EC: 0,
                EM: "Get Maintain project success",
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

const getDesignProjectService = async () => {
    try {
        let data = await db.Disease.findAll({
            where: {
                type_project: 1
            }
        });

        if (data && data.length > 0) {
            return {
                EC: 0,
                EM: "Get Design project success",
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
    getAllDiseaseArticleService, getArticleWithPaginateService,
    createNewDiseaseArticleService, handleDeleteDiseaseArticleService,
    handleUpdateDiseaseArticleService, getKoiProjectService, getMaintainProjectService,
    getDesignProjectService
}