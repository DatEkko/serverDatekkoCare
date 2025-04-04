import allCodeService from "../service/allCodeService";

const getAllCodeProject = async (req, res) => {
    try {

        let data = await allCodeService.getAllCodeProjectService();
        return res.status(200).json(data)

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EC: -1,
            EM: "Error from server"
        })
    }
}

const getAllCodeProduct = async (req, res) => {
    try {

        let data = await allCodeService.getAllCodeProductService();
        return res.status(200).json(data)

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EC: -1,
            EM: "Error from server"
        })
    }
}

const getAllCodeCondition = async (req, res) => {
    try {

        let data = await allCodeService.getAllCodeConditionService();
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
    getAllCodeProject, getAllCodeProduct, getAllCodeCondition
}