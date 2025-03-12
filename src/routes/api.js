import express from "express";
import apiController from "./../controller/apiController";

const router = express.Router();

/**
 * 
 * @param {*} app 
 */

const initApiRoutes = (app) => {
    router.get('/read', apiController.readFunction);
    router.post('/create', apiController.createFunction);
    router.delete('/delete', apiController.deleteFunction);
    router.put('/update', apiController.updateFunction);

    return app.use("/api/v1", router)
}

export default initApiRoutes;