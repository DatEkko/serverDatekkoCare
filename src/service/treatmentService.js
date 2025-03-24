import db from '../models/index';

const getArticleWithPaginateService = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.Treatment.findAndCountAll({
            order: [['id', 'DESC']],
            offset: offset,
            limit: limit,
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

const getAllTreatmentArticleService = async () => {
    try {
        let data = await db.Treatment.findAll({
        });

        if (data && data.length > 0) {
            return {
                EC: 0,
                EM: "Get all treament article success",
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

const createNewTreatmentArticleService = async (data) => {
    try {
        if (!data.name || !data.content || !data.author) {
            return {
                EC: -2,
                EM: "Thiếu dữ liệu đầu vào",
                DT: []
            }
        }

        await db.Treatment.create({
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

const handleDeleteTreatmentArticleService = async (id) => {
    try {
        if (!id) {
            return {
                EC: -2,
                EM: "Thiếu dữ liệu đầu vào",
                DT: []
            }
        }

        await db.Treatment.destroy({
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

const handleUpdateTreatmentArticleService = async (data) => {
    try {
        if (!data.name || !data.description || !data.cre) {
            return {
                EC: -2,
                EM: "Thiếu dữ liệu đầu vào",
                DT: []
            }
        }

        await db.Treatment.update(data, {
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

module.exports = {
    getArticleWithPaginateService, getAllTreatmentArticleService,
    createNewTreatmentArticleService, handleDeleteTreatmentArticleService,
    handleUpdateTreatmentArticleService
}