import apiService from "./../service/apiService";

const readFunction = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;

            let data = await apiService.getArticleWithPaginateService(+page, +limit);
            return res.status(200).json(data);

        } else {
            let data = await apiService.getAllOrganArticleService();
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
        let data = await apiService.createNewOrganArticleService(req.body);
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
        let data = await apiService.handleDeleteOrganArticleService(req.body.id);
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
        let data = await apiService.handleUpdateOrganArticleService(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EC: -1,
            EM: "Error from server"
        })
    }
}

const getServiceByIdFunction = async (req, res) => {
    try {
        const serviceId = req.params.id;
        let data = await apiService.getServiceByIdService(+serviceId);
        return res.status(200).json(data);

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EC: -1,
            EM: "Error from server"
        })
    }
}



module.exports = {
    readFunction, createFunction, deleteFunction, updateFunction,
    getServiceByIdFunction
}