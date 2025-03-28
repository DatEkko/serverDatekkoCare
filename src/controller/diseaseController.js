import diseaseService from "./../service/diseaseService";

const readFunction = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;

            let data = await diseaseService.getArticleWithPaginateService(+page, +limit);
            return res.status(200).json(data);

        } else {
            let data = await diseaseService.getAllDiseaseArticleService();
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
        let data = await diseaseService.createNewDiseaseArticleService(req.body);
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
        let data = await diseaseService.handleDeleteDiseaseArticleService(req.body.id);
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
        let data = await diseaseService.handleUpdateDiseaseArticleService(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EC: -1,
            EM: "Error from server"
        })
    }
}

const getKoiProject = async (req, res) => {
    try {
        let data = await diseaseService.getKoiProjectService();
        return res.status(200).json(data)

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EC: -1,
            EM: "Error from server"
        })
    }
}

const getMaintainProject = async (req, res) => {
    try {
        let data = await diseaseService.getMaintainProjectService();
        return res.status(200).json(data)

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EC: -1,
            EM: "Error from server"
        })
    }
}

const getDesignProject = async (req, res) => {
    try {
        let data = await diseaseService.getDesignProjectService();
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
    readFunction, createFunction, deleteFunction, updateFunction,
    getKoiProject, getMaintainProject, getDesignProject
}