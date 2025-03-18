import db from '../models/index';

const getArticleWithPaginateService = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.Disease.findAndCountAll({
            order: [['id', 'DESC']],
            offset: offset,
            limit: limit,
            include: [
                {
                    model: db.Organ,
                    attributes: ["id", "name"], // Chỉ lấy ID và tên của Organ (tuỳ chỉnh theo nhu cầu)
                },
            ],

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
            include: [
                {
                    model: db.Organ,
                    attributes: ["id", "name"]
                },
            ],
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
        if (!data.name || !data.content || !data.author || !data.organ_id) {
            return {
                EC: -2,
                EM: "Thiếu dữ liệu đầu vào",
                DT: []
            }
        }

        await db.Disease.create({
            name: data.name,
            organ_id: +data.organ_id,
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
        if (!data.name || !data.description || !data.cre || !data.organ_id) {
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

module.exports = {
    getAllDiseaseArticleService, getArticleWithPaginateService,
    createNewDiseaseArticleService, handleDeleteDiseaseArticleService,
    handleUpdateDiseaseArticleService
}