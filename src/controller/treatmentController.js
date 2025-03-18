import treatmentService from "./../service/treatmentService";

const readFunction = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;

            let data = await treatmentService.getArticleWithPaginateService(+page, +limit);
            return res.status(200).json(data);

        } else {
            let data = await treatmentService.getAllTreatmentArticleService();
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
        let data = await treatmentService.createNewTreatmentArticleService(req.body);
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
        let data = await treatmentService.handleDeleteTreatmentArticleService(req.body.id);
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
        let data = await treatmentService.handleUpdateTreatmentArticleService(req.body);
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
    readFunction, createFunction, deleteFunction, updateFunction
}