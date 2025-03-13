import { where } from 'sequelize';
import db from './../models/index';

const getAllOrganArticleService = async () => {
    try {
        let data = await db.Organ.findAll();
        if (data && data.length > 0) {
            return {
                EC: 0,
                EM: "Get all organ article success",
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

const createNewOrganArticleService = async (data) => {
    try {
        if (!data.name || !data.content || !data.author) {
            return {
                EC: -2,
                EM: "Thiếu dữ liệu đầu vào",
                DT: []
            }
        }

        await db.Organ.create({
            name: data.name,
            description: data.content,
            cre: data.author,
            image: data.image
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

const handleDeleteOrganArticleService = async (id) => {
    try {
        if (!id) {
            return {
                EC: -2,
                EM: "Thiếu dữ liệu đầu vào",
                DT: []
            }
        }

        await db.Organ.destroy({
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

const handleUpdateOrganArticleService = async (data) => {
    try {
        if (!data.name || !data.description || !data.cre) {
            return {
                EC: -2,
                EM: "Thiếu dữ liệu đầu vào",
                DT: []
            }
        }

        await db.Organ.update(data, {
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

const getArticleWithPaginateService = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.Organ.findAndCountAll({
            order: [['id', 'DESC']],
            offset: offset,
            limit: limit
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

module.exports = {
    getAllOrganArticleService, createNewOrganArticleService,
    handleDeleteOrganArticleService, handleUpdateOrganArticleService,
    getArticleWithPaginateService
}