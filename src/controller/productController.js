import productService from "./../service/productService";

const readFunction = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;

            let data = await productService.getProductPaginateService(+page, +limit);
            return res.status(200).json(data);

        } else {
            let data = await productService.getAllProductService();
            return res.status(200).json(data)
        }

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EC: -1,
            EM: "Error from server"
        })
    }
}

const createFunction = async (req, res) => {
    try {
        let data = await productService.createNewProductService(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EC: -1,
            EM: "Error from server"
        })
    }
}

const deleteFunction = async (req, res) => {
    try {
        let data = await productService.handleDeleteProductService(req.body.id);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EC: -1,
            EM: "Error from server"
        })
    }
}

const updateFunction = async (req, res) => {
    try {
        let data = await productService.handleUpdateProductService(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EC: -1,
            EM: "Error from server"
        })
    }
}

const getListProductPageById = async (req, res) => {
    try {
        const { id } = req.params;
        let data = await productService.getListProductByIdService(+id);
        return res.status(200).json(data)

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EC: -1,
            EM: "Error from server"
        })
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        let data = await productService.getProductByIdService(+id);
        return res.status(200).json(data)

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EC: -1,
            EM: "Error from server"
        })
    }
}

const getRelatedProduct = async (req, res) => {
    try {
        let data = await productService.getRelatedProductService(req.body);
        return res.status(200).json(data)

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EC: -1,
            EM: "Error from server"
        })
    }
}

module.exports = {
    readFunction, createFunction, deleteFunction,
    updateFunction, getListProductPageById,
    getProductById, getRelatedProduct
}