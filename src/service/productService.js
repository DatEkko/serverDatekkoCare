import db from '../models/index';
const { Op, Sequelize } = require("sequelize");

const getProductPaginateService = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.Product.findAndCountAll({
            order: [['id', 'DESC']],
            offset: offset,
            limit: limit,
            include: [
                { model: db.Allcode, as: "TypeProduct", attributes: ["key_code", "value"] },
                { model: db.Allcode, as: "TypeCondition", attributes: ["key_code", "value"] }
            ]
        })

        let totalPages = Math.ceil(count / limit);

        let data = {
            totalRows: count,
            totalPages: totalPages,
            products: rows
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

const getAllProductService = async () => {
    try {
        let data = await db.Product.findAll({
            include: [
                { model: db.Allcode, as: "TypeProduct", attributes: ["key_code", "value"] },
                { model: db.Allcode, as: "TypeCondition", attributes: ["key_code", "value"] }
            ]
        });

        if (data && data.length > 0) {
            return {
                EC: 0,
                EM: "Get all product success",
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

const createNewProductService = async (data) => {
    try {
        if (!data.name || !data.type_product || !data.type_condition || !data.price || !data.description) {
            return {
                EC: -2,
                EM: "Thiếu dữ liệu đầu vào",
                DT: []
            }
        }

        await db.Product.create({
            type_product: +data.type_product,
            type_condition: +data.type_condition,
            price: +data.price,
            name: data.name,
            description: data.description,
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

const handleDeleteProductService = async (id) => {
    try {
        if (!id) {
            return {
                EC: -2,
                EM: "Thiếu dữ liệu đầu vào",
                DT: []
            }
        }

        await db.Product.destroy({
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

const handleUpdateProductService = async (data) => {
    try {
        if (!data.name || !data.type_product || !data.type_condition || !data.price || !data.description) {
            return {
                EC: -2,
                EM: "Thiếu dữ liệu đầu vào",
                DT: []
            }
        }

        await db.Product.update(data, {
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

const getListProductByIdService = async (id) => {
    try {
        let data = await db.Product.findAll({
            where: {
                [Op.or]: [
                    { type_product: id },  // Tìm theo type_product
                    { type_condition: id } // Hoặc tìm theo type_condition
                ]
            },
            include: [
                { model: db.Allcode, as: "TypeProduct", attributes: ["key_code", "value"] },
                { model: db.Allcode, as: "TypeCondition", attributes: ["key_code", "value"] }
            ]
        });

        if (data && data.length > 0) {
            return {
                EC: 0,
                EM: "Get all product success",
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

const getProductByIdService = async (id) => {
    try {
        let data = await db.Product.findOne({
            where: {
                id: +id
            },
            include: [
                { model: db.Allcode, as: "TypeProduct", attributes: ["key_code", "value"] },
                { model: db.Allcode, as: "TypeCondition", attributes: ["key_code", "value"] }
            ]
        });

        if (data) {
            return {
                EC: 0,
                EM: "Get product success",
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

const getRelatedProductService = async (data) => {
    try {
        let relatedProducts = await db.Product.findAll({
            where: {
                type_product: +data.type_product, // Lọc theo type_product
                id: { [db.Sequelize.Op.ne]: data.id } // Loại bỏ sản phẩm có id trùng với đầu vào
            },
            limit: 4,
            include: [
                { model: db.Allcode, as: "TypeProduct", attributes: ["key_code", "value"] },
                { model: db.Allcode, as: "TypeCondition", attributes: ["key_code", "value"] }
            ]
        });

        if (relatedProducts.length > 0) {
            return {
                EC: 0,
                EM: "Get related products success",
                DT: relatedProducts
            };
        }

        return {
            EC: 1,
            EM: "No related products found",
            DT: []
        };

    } catch (e) {
        console.log(e);
        return {
            EC: -2,
            EM: "Có gì đó sai sai"
        };
    }
};

const getListProductShowCaseByIdService = async (id, limit) => {
    try {
        let data = await db.Product.findAll({
            where: {
                [Op.or]: [
                    { type_product: +id },  // Tìm theo type_product
                    { type_condition: +id } // Hoặc tìm theo type_condition
                ]
            },
            limit: limit,
            include: [
                { model: db.Allcode, as: "TypeProduct", attributes: ["key_code", "value"] },
                { model: db.Allcode, as: "TypeCondition", attributes: ["key_code", "value"] }
            ]
        });

        if (data && data.length > 0) {
            return {
                EC: 0,
                EM: "Get all product success",
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

const getRandomProductService = async (limit) => {
    try {
        let data = await db.Product.findAll({
            order: Sequelize.literal('RAND()'),
            limit: limit,
            include: [
                { model: db.Allcode, as: "TypeProduct", attributes: ["key_code", "value"] },
                { model: db.Allcode, as: "TypeCondition", attributes: ["key_code", "value"] }
            ]
        });

        if (data && data.length > 0) {
            return {
                EC: 0,
                EM: "Get all product success",
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
    getProductPaginateService, getAllProductService,
    createNewProductService, handleDeleteProductService,
    handleUpdateProductService, getListProductByIdService,
    getProductByIdService, getRelatedProductService,
    getListProductShowCaseByIdService, getRandomProductService
}